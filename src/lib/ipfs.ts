import { create } from 'ipfs-http-client'

// IPFS client configuration
const IPFS_API_URL = process.env.NEXT_PUBLIC_IPFS_API_URL || 'https://ipfs.infura.io:5001'
const IPFS_GATEWAY_URL = process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL || 'https://ipfs.io/ipfs/'

// Create IPFS client
const ipfs = create({
  url: IPFS_API_URL,
  headers: {
    authorization: process.env.IPFS_PROJECT_SECRET 
      ? `Basic ${Buffer.from(`${process.env.IPFS_PROJECT_ID}:${process.env.IPFS_PROJECT_SECRET}`).toString('base64')}`
      : undefined
  }
})

export interface IPFSFile {
  path: string
  content: string | Uint8Array
}

export interface IPFSUploadResult {
  hash: string
  path: string
  size: number
  url: string
}

export interface HackathonMetadata {
  id: string
  title: string
  description: string
  organizer: {
    name: string
    website?: string
    description?: string
  }
  startDate: string
  endDate: string
  location: string
  maxParticipants: number
  tracks: Array<{
    name: string
    description: string
    icon: string
  }>
  prizes: Array<{
    place: string
    amount: string
    description: string
  }>
  requirements: string[]
  createdAt: string
  updatedAt: string
  version: string
}

export interface ProjectMetadata {
  id: string
  title: string
  description: string
  teamName: string
  teamMembers: Array<{
    name: string
    email: string
    role: string
    github?: string
  }>
  hackathonId: string
  category: string
  tags: string[]
  techStack: string[]
  githubRepo: string
  liveDemo?: string
  videoDemo?: string
  submittedAt: string
  version: string
}

export interface JudgeScore {
  projectId: string
  judgeId: string
  hackathonId: string
  scores: Record<string, number>
  comments: string
  overallScore: number
  submittedAt: string
  signature?: string
}

/**
 * Upload a single file or data to IPFS
 */
export async function uploadToIPFS(content: string | Uint8Array, filename?: string): Promise<IPFSUploadResult> {
  try {
    const file: IPFSFile = {
      path: filename || 'file',
      content: typeof content === 'string' ? new TextEncoder().encode(content) : content
    }

    const result = await ipfs.add(file)
    
    return {
      hash: result.cid.toString(),
      path: result.path,
      size: result.size,
      url: `${IPFS_GATEWAY_URL}${result.cid.toString()}`
    }
  } catch (error) {
    console.error('Error uploading to IPFS:', error)
    throw new Error('Failed to upload to IPFS')
  }
}

/**
 * Upload multiple files to IPFS
 */
export async function uploadMultipleToIPFS(files: IPFSFile[]): Promise<IPFSUploadResult[]> {
  try {
    const results: IPFSUploadResult[] = []
    
    for await (const result of ipfs.addAll(files)) {
      results.push({
        hash: result.cid.toString(),
        path: result.path,
        size: result.size,
        url: `${IPFS_GATEWAY_URL}${result.cid.toString()}`
      })
    }
    
    return results
  } catch (error) {
    console.error('Error uploading multiple files to IPFS:', error)
    throw new Error('Failed to upload files to IPFS')
  }
}

/**
 * Retrieve content from IPFS
 */
export async function getFromIPFS(hash: string): Promise<string> {
  try {
    const chunks = []
    for await (const chunk of ipfs.cat(hash)) {
      chunks.push(chunk)
    }
    
    const content = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0))
    let offset = 0
    for (const chunk of chunks) {
      content.set(chunk, offset)
      offset += chunk.length
    }
    
    return new TextDecoder().decode(content)
  } catch (error) {
    console.error('Error retrieving from IPFS:', error)
    throw new Error('Failed to retrieve from IPFS')
  }
}

/**
 * Pin content to ensure it stays available
 */
export async function pinToIPFS(hash: string): Promise<void> {
  try {
    await ipfs.pin.add(hash)
  } catch (error) {
    console.error('Error pinning to IPFS:', error)
    throw new Error('Failed to pin to IPFS')
  }
}

/**
 * Upload hackathon metadata to IPFS
 */
export async function uploadHackathonMetadata(metadata: HackathonMetadata): Promise<IPFSUploadResult> {
  const jsonContent = JSON.stringify(metadata, null, 2)
  const filename = `hackathon-${metadata.id}-${Date.now()}.json`
  
  const result = await uploadToIPFS(jsonContent, filename)
  await pinToIPFS(result.hash)
  
  return result
}

/**
 * Upload project metadata to IPFS
 */
export async function uploadProjectMetadata(metadata: ProjectMetadata): Promise<IPFSUploadResult> {
  const jsonContent = JSON.stringify(metadata, null, 2)
  const filename = `project-${metadata.id}-${Date.now()}.json`
  
  const result = await uploadToIPFS(jsonContent, filename)
  await pinToIPFS(result.hash)
  
  return result
}

/**
 * Upload judge scores to IPFS
 */
export async function uploadJudgeScore(score: JudgeScore): Promise<IPFSUploadResult> {
  const jsonContent = JSON.stringify(score, null, 2)
  const filename = `score-${score.projectId}-${score.judgeId}-${Date.now()}.json`
  
  const result = await uploadToIPFS(jsonContent, filename)
  await pinToIPFS(result.hash)
  
  return result
}

/**
 * Create a directory structure on IPFS for a hackathon
 */
export async function createHackathonDirectory(hackathonId: string, files: {
  metadata: HackathonMetadata
  projects?: ProjectMetadata[]
  scores?: JudgeScore[]
}): Promise<IPFSUploadResult[]> {
  const ipfsFiles: IPFSFile[] = []
  
  // Add hackathon metadata
  ipfsFiles.push({
    path: `hackathon-${hackathonId}/metadata.json`,
    content: JSON.stringify(files.metadata, null, 2)
  })
  
  // Add projects if provided
  if (files.projects) {
    files.projects.forEach((project, index) => {
      ipfsFiles.push({
        path: `hackathon-${hackathonId}/projects/project-${project.id}.json`,
        content: JSON.stringify(project, null, 2)
      })
    })
  }
  
  // Add scores if provided
  if (files.scores) {
    files.scores.forEach((score, index) => {
      ipfsFiles.push({
        path: `hackathon-${hackathonId}/scores/score-${score.projectId}-${score.judgeId}.json`,
        content: JSON.stringify(score, null, 2)
      })
    })
  }
  
  const results = await uploadMultipleToIPFS(ipfsFiles)
  
  // Pin the root directory
  const rootHash = results.find(r => r.path === `hackathon-${hackathonId}`)
  if (rootHash) {
    await pinToIPFS(rootHash.hash)
  }
  
  return results
}

/**
 * Get IPFS gateway URL for a hash
 */
export function getIPFSUrl(hash: string): string {
  return `${IPFS_GATEWAY_URL}${hash}`
}

/**
 * Validate IPFS hash format
 */
export function isValidIPFSHash(hash: string): boolean {
  // Basic validation for IPFS CID
  return /^Qm[1-9A-HJ-NP-Za-km-z]{44}$|^bafy[a-z2-7]{55}$/.test(hash)
}

/**
 * Generate metadata for hackathon storage
 */
export function generateHackathonMetadata(hackathonData: any): HackathonMetadata {
  return {
    id: hackathonData.id || `hackathon-${Date.now()}`,
    title: hackathonData.title,
    description: hackathonData.description,
    organizer: {
      name: hackathonData.organizerName,
      website: hackathonData.organizerWebsite,
      description: hackathonData.organizerDescription
    },
    startDate: hackathonData.startDate,
    endDate: hackathonData.endDate,
    location: hackathonData.location,
    maxParticipants: parseInt(hackathonData.maxParticipants),
    tracks: hackathonData.tracks || [],
    prizes: hackathonData.prizes || [],
    requirements: hackathonData.requirements || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: '1.0.0'
  }
}

/**
 * Generate metadata for project storage
 */
export function generateProjectMetadata(projectData: any): ProjectMetadata {
  return {
    id: projectData.id || `project-${Date.now()}`,
    title: projectData.title,
    description: projectData.description,
    teamName: projectData.teamName,
    teamMembers: projectData.teamMembers,
    hackathonId: projectData.hackathonId,
    category: projectData.category,
    tags: projectData.tags || [],
    techStack: projectData.techStack || [],
    githubRepo: projectData.githubRepo,
    liveDemo: projectData.liveDemo,
    videoDemo: projectData.videoDemo,
    submittedAt: new Date().toISOString(),
    version: '1.0.0'
  }
}

export default {
  uploadToIPFS,
  uploadMultipleToIPFS,
  getFromIPFS,
  pinToIPFS,
  uploadHackathonMetadata,
  uploadProjectMetadata,
  uploadJudgeScore,
  createHackathonDirectory,
  getIPFSUrl,
  isValidIPFSHash,
  generateHackathonMetadata,
  generateProjectMetadata
}
