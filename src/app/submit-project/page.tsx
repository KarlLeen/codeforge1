'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import { 
  ArrowLeft,
  ArrowRight,
  Upload,
  Github,
  Globe,
  Video,
  FileText,
  Users,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  Link,
  Save,
  Send
} from 'lucide-react'

interface TeamMember {
  name: string
  email: string
  role: string
  github?: string
}

interface ProjectData {
  // Basic Info
  title: string
  description: string
  tagline: string
  
  // Team
  teamName: string
  teamMembers: TeamMember[]
  
  // Project Details
  category: string
  tags: string[]
  problemStatement: string
  solution: string
  techStack: string[]
  
  // Links & Files
  githubRepo: string
  liveDemo: string
  videoDemo: string
  presentation: string
  additionalLinks: Array<{
    title: string
    url: string
    type: string
  }>
  
  // Hackathon
  hackathonId: string
  track: string
  
  // Submission
  isPublic: boolean
  allowFeedback: boolean
}

const SubmitProjectPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [projectData, setProjectData] = useState<ProjectData>({
    title: '',
    description: '',
    tagline: '',
    teamName: '',
    teamMembers: [{ name: '', email: '', role: 'Developer' }],
    category: '',
    tags: [],
    problemStatement: '',
    solution: '',
    techStack: [],
    githubRepo: '',
    liveDemo: '',
    videoDemo: '',
    presentation: '',
    additionalLinks: [],
    hackathonId: '1', // This would come from URL params
    track: '',
    isPublic: true,
    allowFeedback: true
  })

  const [newTag, setNewTag] = useState('')
  const [newTech, setNewTech] = useState('')
  const [newLink, setNewLink] = useState({ title: '', url: '', type: 'other' })

  const totalSteps = 5

  const steps = [
    { number: 1, title: 'Project Info', description: 'Basic project details' },
    { number: 2, title: 'Team', description: 'Team members and roles' },
    { number: 3, title: 'Technical Details', description: 'Problem, solution, and tech stack' },
    { number: 4, title: 'Links & Demo', description: 'Repository, demo, and presentation' },
    { number: 5, title: 'Review & Submit', description: 'Final review and submission' }
  ]

  const categories = [
    'Web Application',
    'Mobile App',
    'Desktop Application',
    'API/Backend Service',
    'Blockchain/Web3',
    'AI/Machine Learning',
    'IoT/Hardware',
    'Game',
    'Developer Tool',
    'Other'
  ]

  const tracks = [
    'Healthcare AI',
    'Climate Tech',
    'Education AI',
    'Open Innovation'
  ]

  const updateProjectData = (updates: Partial<ProjectData>) => {
    setProjectData(prev => ({ ...prev, ...updates }))
  }

  const addTeamMember = () => {
    updateProjectData({
      teamMembers: [...projectData.teamMembers, { name: '', email: '', role: 'Developer' }]
    })
  }

  const removeTeamMember = (index: number) => {
    if (projectData.teamMembers.length > 1) {
      updateProjectData({
        teamMembers: projectData.teamMembers.filter((_, i) => i !== index)
      })
    }
  }

  const updateTeamMember = (index: number, updates: Partial<TeamMember>) => {
    const updatedMembers = projectData.teamMembers.map((member, i) =>
      i === index ? { ...member, ...updates } : member
    )
    updateProjectData({ teamMembers: updatedMembers })
  }

  const addTag = () => {
    if (newTag.trim() && !projectData.tags.includes(newTag.trim())) {
      updateProjectData({ tags: [...projectData.tags, newTag.trim()] })
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    updateProjectData({ tags: projectData.tags.filter(tag => tag !== tagToRemove) })
  }

  const addTech = () => {
    if (newTech.trim() && !projectData.techStack.includes(newTech.trim())) {
      updateProjectData({ techStack: [...projectData.techStack, newTech.trim()] })
      setNewTech('')
    }
  }

  const removeTech = (techToRemove: string) => {
    updateProjectData({ techStack: projectData.techStack.filter(tech => tech !== techToRemove) })
  }

  const addLink = () => {
    if (newLink.title.trim() && newLink.url.trim()) {
      updateProjectData({ additionalLinks: [...projectData.additionalLinks, { ...newLink }] })
      setNewLink({ title: '', url: '', type: 'other' })
    }
  }

  const removeLink = (index: number) => {
    updateProjectData({ additionalLinks: projectData.additionalLinks.filter((_, i) => i !== index) })
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Here you would submit to IPFS and your backend
    console.log('Submitting project:', projectData)
    alert('Project submitted successfully! (This would integrate with IPFS in production)')
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return projectData.title && projectData.description && projectData.category
      case 2:
        return projectData.teamName && projectData.teamMembers.every(m => m.name && m.email)
      case 3:
        return projectData.problemStatement && projectData.solution
      case 4:
        return projectData.githubRepo || projectData.liveDemo
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">Submit Project</h1>
              <div className="text-sm text-foreground-muted">
                Step {currentStep} of {totalSteps}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-background-tertiary rounded-full h-2 mb-6">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>

            {/* Step Indicators */}
            <div className="hidden md:flex justify-between">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.number <= currentStep 
                      ? 'bg-primary text-white' 
                      : 'bg-background-tertiary text-foreground-muted'
                  }`}>
                    {step.number < currentStep ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium">{step.title}</div>
                    <div className="text-xs text-foreground-muted">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hackathon Info */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-white font-bold">AI</span>
                </div>
                <div>
                  <h3 className="font-semibold">AI Innovation Challenge 2024</h3>
                  <p className="text-sm text-foreground-muted">Submission deadline: March 17, 2024 at 12:00 PM</p>
                </div>
                <Badge variant="warning" className="ml-auto">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  2 days left
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Form Content */}
          <Card>
            <CardContent className="p-8">
              {/* Step 1: Project Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Project Information</h2>
                    <p className="text-foreground-muted mb-6">
                      Tell us about your project and what makes it special.
                    </p>
                  </div>

                  <Input
                    label="Project Title *"
                    placeholder="AI-Powered Climate Monitor"
                    value={projectData.title}
                    onChange={(e) => updateProjectData({ title: e.target.value })}
                  />

                  <Input
                    label="Tagline"
                    placeholder="A brief, catchy description of your project"
                    value={projectData.tagline}
                    onChange={(e) => updateProjectData({ tagline: e.target.value })}
                  />

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Project Description *
                    </label>
                    <textarea
                      className="textarea"
                      placeholder="Describe your project, what it does, and why it's innovative..."
                      value={projectData.description}
                      onChange={(e) => updateProjectData({ description: e.target.value })}
                      rows={5}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Category *
                      </label>
                      <select
                        className="select"
                        value={projectData.category}
                        onChange={(e) => updateProjectData({ category: e.target.value })}
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Track
                      </label>
                      <select
                        className="select"
                        value={projectData.track}
                        onChange={(e) => updateProjectData({ track: e.target.value })}
                      >
                        <option value="">Select a track (optional)</option>
                        {tracks.map((track) => (
                          <option key={track} value={track}>
                            {track}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Tags
                    </label>
                    <div className="flex gap-2 mb-3">
                      <Input
                        placeholder="Add a tag (e.g., AI, Climate, Monitoring)"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <Button onClick={addTag} variant="secondary">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {projectData.tags.map((tag) => (
                        <Badge key={tag} variant="primary" className="flex items-center gap-1">
                          {tag}
                          <button onClick={() => removeTag(tag)}>
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Team */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Team Information</h2>
                    <p className="text-foreground-muted mb-6">
                      Add your team members and their roles in the project.
                    </p>
                  </div>

                  <Input
                    label="Team Name *"
                    placeholder="The Innovators"
                    value={projectData.teamName}
                    onChange={(e) => updateProjectData({ teamName: e.target.value })}
                    icon={<Users className="h-4 w-4" />}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Team Members</h3>
                      <Button onClick={addTeamMember} variant="secondary" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Member
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {projectData.teamMembers.map((member, index) => (
                        <div key={index} className="p-4 border border-border rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium">Member {index + 1}</h4>
                            {projectData.teamMembers.length > 1 && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeTeamMember(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              label="Name *"
                              placeholder="John Doe"
                              value={member.name}
                              onChange={(e) => updateTeamMember(index, { name: e.target.value })}
                            />
                            <Input
                              label="Email *"
                              type="email"
                              placeholder="john@example.com"
                              value={member.email}
                              onChange={(e) => updateTeamMember(index, { email: e.target.value })}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                              <label className="text-sm font-medium text-foreground mb-2 block">
                                Role *
                              </label>
                              <select
                                className="select"
                                value={member.role}
                                onChange={(e) => updateTeamMember(index, { role: e.target.value })}
                              >
                                <option value="Developer">Developer</option>
                                <option value="Designer">Designer</option>
                                <option value="Product Manager">Product Manager</option>
                                <option value="Data Scientist">Data Scientist</option>
                                <option value="DevOps">DevOps</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                            <Input
                              label="GitHub Username"
                              placeholder="johndoe"
                              value={member.github || ''}
                              onChange={(e) => updateTeamMember(index, { github: e.target.value })}
                              icon={<Github className="h-4 w-4" />}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Technical Details */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Technical Details</h2>
                    <p className="text-foreground-muted mb-6">
                      Describe the problem you're solving and your technical approach.
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Problem Statement *
                    </label>
                    <textarea
                      className="textarea"
                      placeholder="What problem does your project solve? Why is it important?"
                      value={projectData.problemStatement}
                      onChange={(e) => updateProjectData({ problemStatement: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Solution *
                    </label>
                    <textarea
                      className="textarea"
                      placeholder="How does your project solve the problem? What makes your approach unique?"
                      value={projectData.solution}
                      onChange={(e) => updateProjectData({ solution: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Tech Stack
                    </label>
                    <div className="flex gap-2 mb-3">
                      <Input
                        placeholder="Add technology (e.g., React, Python, TensorFlow)"
                        value={newTech}
                        onChange={(e) => setNewTech(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                      />
                      <Button onClick={addTech} variant="secondary">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {projectData.techStack.map((tech) => (
                        <Badge key={tech} variant="accent" className="flex items-center gap-1">
                          {tech}
                          <button onClick={() => removeTech(tech)}>
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Links & Demo */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Links & Demo</h2>
                    <p className="text-foreground-muted mb-6">
                      Provide links to your code, demo, and presentation materials.
                    </p>
                  </div>

                  <Input
                    label="GitHub Repository *"
                    placeholder="https://github.com/username/project"
                    value={projectData.githubRepo}
                    onChange={(e) => updateProjectData({ githubRepo: e.target.value })}
                    icon={<Github className="h-4 w-4" />}
                  />

                  <Input
                    label="Live Demo URL"
                    placeholder="https://your-project-demo.com"
                    value={projectData.liveDemo}
                    onChange={(e) => updateProjectData({ liveDemo: e.target.value })}
                    icon={<Globe className="h-4 w-4" />}
                  />

                  <Input
                    label="Video Demo"
                    placeholder="https://youtube.com/watch?v=..."
                    value={projectData.videoDemo}
                    onChange={(e) => updateProjectData({ videoDemo: e.target.value })}
                    icon={<Video className="h-4 w-4" />}
                  />

                  <Input
                    label="Presentation/Pitch Deck"
                    placeholder="https://docs.google.com/presentation/..."
                    value={projectData.presentation}
                    onChange={(e) => updateProjectData({ presentation: e.target.value })}
                    icon={<FileText className="h-4 w-4" />}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Additional Links</h3>
                      <Button onClick={addLink} variant="secondary" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Link
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-4">
                      <div className="md:col-span-4">
                        <Input
                          placeholder="Link title"
                          value={newLink.title}
                          onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                        />
                      </div>
                      <div className="md:col-span-6">
                        <Input
                          placeholder="URL"
                          value={newLink.url}
                          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <select
                          className="select"
                          value={newLink.type}
                          onChange={(e) => setNewLink({ ...newLink, type: e.target.value })}
                        >
                          <option value="other">Other</option>
                          <option value="docs">Documentation</option>
                          <option value="api">API</option>
                          <option value="blog">Blog Post</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {projectData.additionalLinks.map((link, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Link className="h-4 w-4 text-primary" />
                            <div>
                              <div className="font-medium">{link.title}</div>
                              <div className="text-sm text-foreground-muted">{link.url}</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeLink(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Review & Submit */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Review & Submit</h2>
                    <p className="text-foreground-muted mb-6">
                      Review your project details before submitting to IPFS.
                    </p>
                  </div>

                  <Card variant="glass">
                    <CardHeader>
                      <CardTitle>{projectData.title}</CardTitle>
                      <CardDescription>{projectData.tagline}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <span className="text-foreground-muted">Team:</span> {projectData.teamName} ({projectData.teamMembers.length} members)
                        </div>
                        <div>
                          <span className="text-foreground-muted">Category:</span> {projectData.category}
                        </div>
                        {projectData.track && (
                          <div>
                            <span className="text-foreground-muted">Track:</span> {projectData.track}
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {projectData.tags.map((tag) => (
                            <Badge key={tag} variant="primary" size="sm">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <div className="font-medium">Make Project Public</div>
                        <div className="text-sm text-foreground-muted">
                          Allow others to view and discover your project
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={projectData.isPublic}
                        onChange={(e) => updateProjectData({ isPublic: e.target.checked })}
                        className="w-4 h-4"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <div className="font-medium">Allow Community Feedback</div>
                        <div className="text-sm text-foreground-muted">
                          Let other participants comment and vote on your project
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={projectData.allowFeedback}
                        onChange={(e) => updateProjectData({ allowFeedback: e.target.checked })}
                        className="w-4 h-4"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-success/10 border border-success/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <div className="font-medium text-success">Ready to Submit</div>
                      <div className="text-sm text-foreground-muted">
                        Your project will be stored on IPFS and submitted to the hackathon.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button 
                  variant="secondary" 
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="flex gap-2">
                  <Button variant="ghost">
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  
                  {currentStep < totalSteps ? (
                    <Button 
                      onClick={nextStep}
                      disabled={!isStepValid(currentStep)}
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} variant="accent">
                      <Send className="h-4 w-4 mr-2" />
                      Submit Project
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default SubmitProjectPage
