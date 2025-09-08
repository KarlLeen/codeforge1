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
  Heart,
  MessageCircle,
  ExternalLink,
  Github,
  Globe,
  Video,
  Users,
  Trophy,
  Eye,
  ArrowUpRight,
  Star,
  TrendingUp,
  Calendar,
  Code,
  Zap
} from 'lucide-react'

interface Project {
  id: string
  title: string
  tagline: string
  description: string
  teamName: string
  teamMembers: number
  category: string
  tags: string[]
  techStack: string[]
  hackathonId: string
  hackathonName: string
  track?: string
  githubRepo: string
  liveDemo?: string
  videoDemo?: string
  votes: number
  comments: number
  views: number
  submittedAt: string
  featured: boolean
  winner?: string
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'EcoTracker AI',
    tagline: 'AI-powered carbon footprint monitoring for businesses',
    description: 'A comprehensive platform that uses machine learning to track, analyze, and reduce corporate carbon emissions in real-time.',
    teamName: 'Green Innovators',
    teamMembers: 4,
    category: 'Web Application',
    tags: ['AI', 'Climate Tech', 'Sustainability', 'Analytics'],
    techStack: ['React', 'Python', 'TensorFlow', 'PostgreSQL'],
    hackathonId: '1',
    hackathonName: 'AI Innovation Challenge 2024',
    track: 'Climate Tech',
    githubRepo: 'https://github.com/team/ecotracker',
    liveDemo: 'https://ecotracker-demo.com',
    videoDemo: 'https://youtube.com/watch?v=demo1',
    votes: 127,
    comments: 23,
    views: 1420,
    submittedAt: '2024-03-16T14:30:00Z',
    featured: true,
    winner: '1st Place'
  },
  {
    id: '2',
    title: 'MedAssist Pro',
    tagline: 'AI diagnostic assistant for healthcare professionals',
    description: 'An intelligent medical diagnosis support system that helps doctors make more accurate diagnoses using computer vision and natural language processing.',
    teamName: 'HealthTech Heroes',
    teamMembers: 5,
    category: 'AI/Machine Learning',
    tags: ['Healthcare', 'AI', 'Computer Vision', 'NLP'],
    techStack: ['Python', 'FastAPI', 'PyTorch', 'React', 'MongoDB'],
    hackathonId: '1',
    hackathonName: 'AI Innovation Challenge 2024',
    track: 'Healthcare AI',
    githubRepo: 'https://github.com/team/medassist',
    liveDemo: 'https://medassist-demo.com',
    votes: 98,
    comments: 18,
    views: 987,
    submittedAt: '2024-03-16T16:45:00Z',
    featured: true,
    winner: '2nd Place'
  },
  {
    id: '3',
    title: 'LearnSmart',
    tagline: 'Personalized AI tutoring platform',
    description: 'An adaptive learning platform that creates personalized study plans and provides AI-powered tutoring for students of all ages.',
    teamName: 'EduTech Pioneers',
    teamMembers: 3,
    category: 'Web Application',
    tags: ['Education', 'AI', 'Personalization', 'Learning'],
    techStack: ['Next.js', 'Node.js', 'OpenAI API', 'Prisma'],
    hackathonId: '1',
    hackathonName: 'AI Innovation Challenge 2024',
    track: 'Education AI',
    githubRepo: 'https://github.com/team/learnsmart',
    liveDemo: 'https://learnsmart-demo.com',
    videoDemo: 'https://youtube.com/watch?v=demo3',
    votes: 76,
    comments: 12,
    views: 654,
    submittedAt: '2024-03-16T18:20:00Z',
    featured: false
  },
  {
    id: '4',
    title: 'CryptoGuard',
    tagline: 'Blockchain security scanner',
    description: 'Advanced smart contract vulnerability detection system using AI to identify security risks in blockchain applications.',
    teamName: 'Blockchain Defenders',
    teamMembers: 4,
    category: 'Blockchain/Web3',
    tags: ['Blockchain', 'Security', 'Smart Contracts', 'AI'],
    techStack: ['Solidity', 'Python', 'Web3.js', 'React'],
    hackathonId: '2',
    hackathonName: 'Blockchain for Good',
    githubRepo: 'https://github.com/team/cryptoguard',
    votes: 89,
    comments: 15,
    views: 743,
    submittedAt: '2024-03-22T12:15:00Z',
    featured: false
  },
  {
    id: '5',
    title: 'GreenEnergy Optimizer',
    tagline: 'Smart grid optimization for renewable energy',
    description: 'IoT-based system that optimizes renewable energy distribution in smart grids using predictive analytics and machine learning.',
    teamName: 'Energy Innovators',
    teamMembers: 6,
    category: 'IoT/Hardware',
    tags: ['IoT', 'Green Energy', 'Smart Grid', 'ML'],
    techStack: ['Arduino', 'Python', 'InfluxDB', 'Grafana'],
    hackathonId: '3',
    hackathonName: 'Green Tech Hackathon',
    githubRepo: 'https://github.com/team/greenenergy',
    liveDemo: 'https://greenenergy-dashboard.com',
    votes: 54,
    comments: 8,
    views: 432,
    submittedAt: '2024-04-06T10:30:00Z',
    featured: false
  }
]

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedHackathon, setSelectedHackathon] = useState('all')
  const [sortBy, setSortBy] = useState('votes')
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false)

  const categories = [
    'Web Application',
    'Mobile App',
    'AI/Machine Learning',
    'Blockchain/Web3',
    'IoT/Hardware',
    'Game',
    'Developer Tool',
    'Other'
  ]

  const hackathons = [
    'AI Innovation Challenge 2024',
    'Blockchain for Good',
    'Green Tech Hackathon',
    'FinTech Revolution'
  ]

  const filteredProjects = mockProjects
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           project.teamName.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
      const matchesHackathon = selectedHackathon === 'all' || project.hackathonName === selectedHackathon
      const matchesFeatured = !showOnlyFeatured || project.featured
      
      return matchesSearch && matchesCategory && matchesHackathon && matchesFeatured
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'votes':
          return b.votes - a.votes
        case 'comments':
          return b.comments - a.comments
        case 'views':
          return b.views - a.views
        case 'recent':
          return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        default:
          return 0
      }
    })

  const handleVote = (projectId: string) => {
    // In a real app, this would make an API call
    console.log('Voting for project:', projectId)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-background-secondary to-background-tertiary py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Project <span className="gradient-text">Gallery</span>
            </h1>
            <p className="text-xl text-foreground-muted mb-8">
              Discover amazing projects built by our community of innovators. Vote for your favorites and get inspired!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">{mockProjects.length}</div>
                <div className="text-foreground-muted">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-2">
                  {mockProjects.reduce((sum, p) => sum + p.votes, 0)}
                </div>
                <div className="text-foreground-muted">Total Votes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-2">
                  {new Set(mockProjects.map(p => p.hackathonId)).size}
                </div>
                <div className="text-foreground-muted">Hackathons</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {/* Search */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search projects, teams, or technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="h-4 w-4" />}
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="select min-w-[140px]"
                >
                  <option value="votes">Most Voted</option>
                  <option value="comments">Most Discussed</option>
                  <option value="views">Most Viewed</option>
                  <option value="recent">Most Recent</option>
                </select>
                
                <Button 
                  variant={showOnlyFeatured ? "primary" : "secondary"}
                  onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Featured
                </Button>
              </div>
            </div>

            {/* Category and Hackathon Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedHackathon}
                onChange={(e) => setSelectedHackathon(e.target.value)}
                className="select"
              >
                <option value="all">All Hackathons</option>
                {hackathons.map((hackathon) => (
                  <option key={hackathon} value={hackathon}>
                    {hackathon}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {filteredProjects.length} Projects Found
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} hover className="overflow-hidden">
                <div className="relative">
                  {project.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge variant="accent">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  
                  {project.winner && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge variant="success">
                        <Trophy className="h-3 w-3 mr-1" />
                        {project.winner}
                      </Badge>
                    </div>
                  )}

                  <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background-secondary/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-200">
                        {project.tagline}
                      </p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-sm text-foreground-muted line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex items-center text-sm text-foreground-muted">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="font-medium">{project.teamName}</span>
                      <span className="mx-2">•</span>
                      <span>{project.teamMembers} members</span>
                    </div>

                    <div className="flex items-center text-sm text-foreground-muted">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{project.hackathonName}</span>
                    </div>

                    {project.track && (
                      <Badge variant="primary" size="sm">
                        {project.track}
                      </Badge>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="default" size="sm">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="default" size="sm">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="accent" size="sm">
                          <Code className="h-3 w-3 mr-1" />
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-foreground-muted">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {project.votes}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {project.comments}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {project.views}
                        </div>
                      </div>
                      <div className="text-xs">
                        {formatDate(project.submittedAt)}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVote(project.id)}
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          Vote
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Comment
                        </Button>
                      </div>
                      
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" asChild>
                          <a href={project.githubRepo} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                        
                        {project.liveDemo && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                              <Globe className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        
                        {project.videoDemo && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={project.videoDemo} target="_blank" rel="noopener noreferrer">
                              <Video className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        
                        <Button variant="primary" size="sm">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="h-24 w-24 bg-background-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-foreground-muted" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Projects Found</h3>
              <p className="text-foreground-muted mb-6">
                Try adjusting your search criteria or filters to find more projects.
              </p>
              <Button variant="secondary" onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSelectedHackathon('all')
                setShowOnlyFeatured(false)
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ProjectsPage
