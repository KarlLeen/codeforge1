'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import { 
  Search,
  Filter,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Github,
  Globe,
  Video,
  Users,
  Award,
  Eye,
  MessageSquare,
  Save,
  Send,
  Download,
  BarChart3,
  Target,
  Lightbulb,
  Code,
  Zap
} from 'lucide-react'

interface ScoringCriteria {
  id: string
  name: string
  description: string
  maxScore: number
  weight: number
}

interface ProjectSubmission {
  id: string
  title: string
  teamName: string
  category: string
  track: string
  tags: string[]
  description: string
  githubRepo: string
  liveDemo?: string
  videoDemo?: string
  presentation?: string
  submittedAt: string
  teamMembers: number
  judgeScore?: {
    scores: Record<string, number>
    comments: string
    overallScore: number
    completed: boolean
    submittedAt?: string
  }
}

const mockCriteria: ScoringCriteria[] = [
  {
    id: 'innovation',
    name: 'Innovation & Creativity',
    description: 'How novel and creative is the solution?',
    maxScore: 10,
    weight: 0.25
  },
  {
    id: 'technical',
    name: 'Technical Implementation',
    description: 'Quality of code, architecture, and technical execution',
    maxScore: 10,
    weight: 0.25
  },
  {
    id: 'impact',
    name: 'Impact & Usefulness',
    description: 'Potential real-world impact and practical value',
    maxScore: 10,
    weight: 0.25
  },
  {
    id: 'presentation',
    name: 'Presentation & Demo',
    description: 'Quality of presentation and demonstration',
    maxScore: 10,
    weight: 0.15
  },
  {
    id: 'completion',
    name: 'Completeness',
    description: 'How complete and polished is the project?',
    maxScore: 10,
    weight: 0.1
  }
]

const mockSubmissions: ProjectSubmission[] = [
  {
    id: '1',
    title: 'EcoTracker AI',
    teamName: 'Green Innovators',
    category: 'Web Application',
    track: 'Climate Tech',
    tags: ['AI', 'Climate Tech', 'Sustainability'],
    description: 'AI-powered carbon footprint monitoring for businesses using machine learning to track and reduce emissions.',
    githubRepo: 'https://github.com/team/ecotracker',
    liveDemo: 'https://ecotracker-demo.com',
    videoDemo: 'https://youtube.com/watch?v=demo1',
    presentation: 'https://docs.google.com/presentation/d/1',
    submittedAt: '2024-03-16T14:30:00Z',
    teamMembers: 4,
    judgeScore: {
      scores: { innovation: 9, technical: 8, impact: 9, presentation: 8, completion: 7 },
      comments: 'Excellent innovation in climate tech space. Strong technical implementation with good AI integration.',
      overallScore: 8.2,
      completed: true,
      submittedAt: '2024-03-17T10:30:00Z'
    }
  },
  {
    id: '2',
    title: 'MedAssist Pro',
    teamName: 'HealthTech Heroes',
    category: 'AI/Machine Learning',
    track: 'Healthcare AI',
    tags: ['Healthcare', 'AI', 'Computer Vision'],
    description: 'AI diagnostic assistant for healthcare professionals using computer vision and NLP.',
    githubRepo: 'https://github.com/team/medassist',
    liveDemo: 'https://medassist-demo.com',
    submittedAt: '2024-03-16T16:45:00Z',
    teamMembers: 5,
    judgeScore: {
      scores: { innovation: 8, technical: 9, impact: 10, presentation: 7, completion: 8 },
      comments: 'Outstanding potential impact in healthcare. Solid technical execution with room for UI improvements.',
      overallScore: 8.4,
      completed: true,
      submittedAt: '2024-03-17T11:15:00Z'
    }
  },
  {
    id: '3',
    title: 'LearnSmart',
    teamName: 'EduTech Pioneers',
    category: 'Web Application',
    track: 'Education AI',
    tags: ['Education', 'AI', 'Personalization'],
    description: 'Personalized AI tutoring platform that creates adaptive study plans for students.',
    githubRepo: 'https://github.com/team/learnsmart',
    liveDemo: 'https://learnsmart-demo.com',
    videoDemo: 'https://youtube.com/watch?v=demo3',
    submittedAt: '2024-03-16T18:20:00Z',
    teamMembers: 3
  },
  {
    id: '4',
    title: 'SmartCity Dashboard',
    teamName: 'Urban Innovators',
    category: 'IoT/Hardware',
    track: 'Open Innovation',
    tags: ['IoT', 'Smart City', 'Analytics'],
    description: 'Real-time city analytics dashboard using IoT sensors and predictive modeling.',
    githubRepo: 'https://github.com/team/smartcity',
    submittedAt: '2024-03-16T20:10:00Z',
    teamMembers: 4
  }
]

const JudgeDashboard = () => {
  const [selectedTrack, setSelectedTrack] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState<ProjectSubmission | null>(null)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [comments, setComments] = useState('')
  const [showCompleted, setShowCompleted] = useState(false)

  const tracks = ['Climate Tech', 'Healthcare AI', 'Education AI', 'Open Innovation']

  const filteredSubmissions = mockSubmissions.filter(submission => {
    const matchesTrack = selectedTrack === 'all' || submission.track === selectedTrack
    const matchesSearch = submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         submission.teamName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCompleted = !showCompleted || submission.judgeScore?.completed
    
    return matchesTrack && matchesSearch && (!showCompleted || matchesCompleted)
  })

  const completedCount = mockSubmissions.filter(s => s.judgeScore?.completed).length
  const totalCount = mockSubmissions.length
  const averageScore = mockSubmissions
    .filter(s => s.judgeScore?.completed)
    .reduce((sum, s) => sum + (s.judgeScore?.overallScore || 0), 0) / completedCount || 0

  const calculateOverallScore = (projectScores: Record<string, number>) => {
    return mockCriteria.reduce((total, criteria) => {
      const score = projectScores[criteria.id] || 0
      return total + (score * criteria.weight)
    }, 0)
  }

  const handleScoreChange = (criteriaId: string, score: number) => {
    setScores(prev => ({ ...prev, [criteriaId]: score }))
  }

  const handleSaveScore = () => {
    if (!selectedProject) return
    
    const overallScore = calculateOverallScore(scores)
    console.log('Saving score for project:', selectedProject.id, {
      scores,
      comments,
      overallScore
    })
    
    // In a real app, this would save to IPFS and backend
    alert('Score saved successfully!')
  }

  const handleSubmitScore = () => {
    if (!selectedProject) return
    
    const overallScore = calculateOverallScore(scores)
    console.log('Submitting final score for project:', selectedProject.id, {
      scores,
      comments,
      overallScore
    })
    
    // In a real app, this would finalize the score on IPFS
    alert('Score submitted and locked!')
    setSelectedProject(null)
  }

  const openProject = (project: ProjectSubmission) => {
    setSelectedProject(project)
    if (project.judgeScore) {
      setScores(project.judgeScore.scores)
      setComments(project.judgeScore.comments)
    } else {
      setScores({})
      setComments('')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedProject ? (
          <>
            {/* Dashboard Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Judge Dashboard</h1>
                  <p className="text-foreground-muted">
                    AI Innovation Challenge 2024 - Review and score project submissions
                  </p>
                </div>
                <Badge variant="warning">
                  <Clock className="h-3 w-3 mr-1" />
                  Judging ends in 6 hours
                </Badge>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-foreground-muted">Total Submissions</p>
                        <p className="text-2xl font-bold">{totalCount}</p>
                      </div>
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-foreground-muted">Completed</p>
                        <p className="text-2xl font-bold">{completedCount}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-success" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-foreground-muted">Remaining</p>
                        <p className="text-2xl font-bold">{totalCount - completedCount}</p>
                      </div>
                      <AlertCircle className="h-8 w-8 text-warning" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-foreground-muted">Average Score</p>
                        <p className="text-2xl font-bold">{averageScore.toFixed(1)}</p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-accent" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <Input
                  placeholder="Search projects or teams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="h-4 w-4" />}
                />
              </div>
              
              <select
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
                className="select min-w-[160px]"
              >
                <option value="all">All Tracks</option>
                {tracks.map((track) => (
                  <option key={track} value={track}>
                    {track}
                  </option>
                ))}
              </select>
              
              <Button
                variant={showCompleted ? "primary" : "secondary"}
                onClick={() => setShowCompleted(!showCompleted)}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Completed Only
              </Button>

              <Button variant="secondary">
                <Download className="h-4 w-4 mr-2" />
                Export Scores
              </Button>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
              {filteredSubmissions.map((project) => (
                <Card key={project.id} hover>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h3 className="text-lg font-semibold">{project.title}</h3>
                          <Badge variant="primary">{project.track}</Badge>
                          {project.judgeScore?.completed && (
                            <Badge variant="success">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Scored: {project.judgeScore.overallScore.toFixed(1)}/10
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-foreground-muted mb-3">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {project.teamName} ({project.teamMembers} members)
                          </div>
                          <div>{project.category}</div>
                          <div>Submitted {new Date(project.submittedAt).toLocaleDateString()}</div>
                        </div>
                        
                        <p className="text-foreground-muted mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="default" size="sm">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" asChild>
                            <a href={project.githubRepo} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-1" />
                              Code
                            </a>
                          </Button>
                          
                          {project.liveDemo && (
                            <Button variant="ghost" size="sm" asChild>
                              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                                <Globe className="h-4 w-4 mr-1" />
                                Demo
                              </a>
                            </Button>
                          )}
                          
                          {project.videoDemo && (
                            <Button variant="ghost" size="sm" asChild>
                              <a href={project.videoDemo} target="_blank" rel="noopener noreferrer">
                                <Video className="h-4 w-4 mr-1" />
                                Video
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <Button
                          onClick={() => openProject(project)}
                          variant={project.judgeScore?.completed ? "secondary" : "primary"}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {project.judgeScore?.completed ? 'Review Score' : 'Score Project'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSubmissions.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-foreground-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Projects Found</h3>
                <p className="text-foreground-muted">
                  Try adjusting your search criteria or filters.
                </p>
              </div>
            )}
          </>
        ) : (
          /* Scoring Interface */
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Button variant="ghost" onClick={() => setSelectedProject(null)}>
                  ← Back to Dashboard
                </Button>
                <h1 className="text-3xl font-bold mt-2">{selectedProject.title}</h1>
                <p className="text-foreground-muted">
                  {selectedProject.teamName} • {selectedProject.track}
                </p>
              </div>
              {selectedProject.judgeScore?.completed && (
                <Badge variant="success">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Project Details */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground-muted mb-4">
                      {selectedProject.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedProject.tags.map((tag) => (
                        <Badge key={tag} variant="primary" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button variant="secondary" asChild>
                        <a href={selectedProject.githubRepo} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          View Code
                        </a>
                      </Button>
                      
                      {selectedProject.liveDemo && (
                        <Button variant="secondary" asChild>
                          <a href={selectedProject.liveDemo} target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      
                      {selectedProject.videoDemo && (
                        <Button variant="secondary" asChild>
                          <a href={selectedProject.videoDemo} target="_blank" rel="noopener noreferrer">
                            <Video className="h-4 w-4 mr-2" />
                            Video Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Scoring Criteria */}
                <Card>
                  <CardHeader>
                    <CardTitle>Scoring Criteria</CardTitle>
                    <CardDescription>
                      Rate each criteria from 0-10. Scores will be weighted automatically.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {mockCriteria.map((criteria) => (
                        <div key={criteria.id} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{criteria.name}</h4>
                              <p className="text-sm text-foreground-muted">
                                {criteria.description} (Weight: {(criteria.weight * 100).toFixed(0)}%)
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold">
                                {scores[criteria.id] || 0}/{criteria.maxScore}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {Array.from({ length: criteria.maxScore }, (_, i) => i + 1).map((score) => (
                              <button
                                key={score}
                                onClick={() => handleScoreChange(criteria.id, score)}
                                className={`w-8 h-8 rounded-full border-2 transition-colors ${
                                  (scores[criteria.id] || 0) >= score
                                    ? 'bg-primary border-primary text-white'
                                    : 'border-border hover:border-primary'
                                }`}
                              >
                                {score}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Comments */}
                <Card>
                  <CardHeader>
                    <CardTitle>Judge Comments</CardTitle>
                    <CardDescription>
                      Provide detailed feedback for the team (optional but recommended)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <textarea
                      className="textarea"
                      placeholder="Share your thoughts on the project's strengths, areas for improvement, and overall impression..."
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      rows={6}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Scoring Summary */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Score Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockCriteria.map((criteria) => (
                        <div key={criteria.id} className="flex items-center justify-between">
                          <span className="text-sm">{criteria.name}</span>
                          <span className="font-medium">
                            {scores[criteria.id] || 0}/{criteria.maxScore}
                          </span>
                        </div>
                      ))}
                      
                      <hr className="border-border" />
                      
                      <div className="flex items-center justify-between text-lg font-bold">
                        <span>Overall Score</span>
                        <span className="text-primary">
                          {calculateOverallScore(scores).toFixed(1)}/10
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <Button
                    onClick={handleSaveScore}
                    variant="secondary"
                    className="w-full"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  
                  <Button
                    onClick={handleSubmitScore}
                    variant="primary"
                    className="w-full"
                    disabled={Object.keys(scores).length !== mockCriteria.length}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Final Score
                  </Button>
                  
                  <p className="text-xs text-foreground-subtle text-center">
                    Final scores will be stored on IPFS and cannot be changed
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default JudgeDashboard
