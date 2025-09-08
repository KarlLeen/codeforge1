'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { 
  User,
  Calendar,
  Trophy,
  Users,
  Settings,
  Bell,
  Star,
  Heart,
  MessageCircle,
  Github,
  Globe,
  Plus,
  Edit,
  Eye,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Code,
  Zap
} from 'lucide-react'

interface UserStats {
  hackathonsParticipated: number
  projectsSubmitted: number
  totalVotes: number
  totalViews: number
  achievements: string[]
  rank: string
}

interface UserProject {
  id: string
  title: string
  hackathonName: string
  status: 'submitted' | 'judging' | 'completed'
  votes: number
  views: number
  rank?: number
  prize?: string
  submittedAt: string
}

interface RegisteredHackathon {
  id: string
  title: string
  startDate: string
  endDate: string
  status: 'upcoming' | 'active' | 'ended'
  role: 'participant' | 'judge' | 'organizer'
  registeredAt: string
}

const mockUserStats: UserStats = {
  hackathonsParticipated: 8,
  projectsSubmitted: 12,
  totalVotes: 347,
  totalViews: 2840,
  achievements: ['First Submission', 'Top 10 Finalist', 'Community Favorite', 'Innovation Award'],
  rank: 'Advanced Hacker'
}

const mockProjects: UserProject[] = [
  {
    id: '1',
    title: 'EcoTracker AI',
    hackathonName: 'AI Innovation Challenge 2024',
    status: 'completed',
    votes: 127,
    views: 1420,
    rank: 1,
    prize: '1st Place - $25,000',
    submittedAt: '2024-03-16T14:30:00Z'
  },
  {
    id: '2',
    title: 'HealthBot Assistant',
    hackathonName: 'Healthcare Hackathon 2024',
    status: 'completed',
    votes: 89,
    views: 967,
    rank: 3,
    prize: '3rd Place - $5,000',
    submittedAt: '2024-02-20T16:45:00Z'
  },
  {
    id: '3',
    title: 'SmartLearn Platform',
    hackathonName: 'EdTech Innovation Summit',
    status: 'judging',
    votes: 45,
    views: 234,
    submittedAt: '2024-03-10T12:30:00Z'
  }
]

const mockRegistrations: RegisteredHackathon[] = [
  {
    id: '1',
    title: 'AI Innovation Challenge 2024',
    startDate: '2024-03-15T09:00:00Z',
    endDate: '2024-03-17T18:00:00Z',
    status: 'active',
    role: 'participant',
    registeredAt: '2024-03-01T10:00:00Z'
  },
  {
    id: '2',
    title: 'Blockchain for Good',
    startDate: '2024-03-22T09:00:00Z',
    endDate: '2024-03-24T18:00:00Z',
    status: 'upcoming',
    role: 'participant',
    registeredAt: '2024-03-05T14:30:00Z'
  },
  {
    id: '3',
    title: 'Green Tech Hackathon',
    startDate: '2024-04-05T09:00:00Z',
    endDate: '2024-04-07T18:00:00Z',
    status: 'upcoming',
    role: 'judge',
    registeredAt: '2024-03-12T11:15:00Z'
  }
]

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'projects', label: 'My Projects', icon: Code },
    { id: 'hackathons', label: 'Hackathons', icon: Calendar },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'upcoming': return 'primary'
      case 'ended': return 'default'
      case 'submitted': return 'warning'
      case 'judging': return 'primary'
      case 'completed': return 'success'
      default: return 'default'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'organizer': return 'accent'
      case 'judge': return 'warning'
      case 'participant': return 'primary'
      default: return 'default'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-foreground-muted">
              Welcome back! Here's your hackathon activity overview.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="primary">
              <Plus className="h-4 w-4 mr-2" />
              Join Hackathon
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-border mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-foreground-muted hover:text-foreground hover:border-border-light'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground-muted">Hackathons</p>
                      <p className="text-2xl font-bold">{mockUserStats.hackathonsParticipated}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground-muted">Projects</p>
                      <p className="text-2xl font-bold">{mockUserStats.projectsSubmitted}</p>
                    </div>
                    <Code className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground-muted">Total Votes</p>
                      <p className="text-2xl font-bold">{mockUserStats.totalVotes}</p>
                    </div>
                    <Heart className="h-8 w-8 text-error" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground-muted">Profile Views</p>
                      <p className="text-2xl font-bold">{mockUserStats.totalViews.toLocaleString()}</p>
                    </div>
                    <Eye className="h-8 w-8 text-success" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Projects</CardTitle>
                  <CardDescription>Your latest project submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockProjects.slice(0, 3).map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div>
                          <h4 className="font-medium">{project.title}</h4>
                          <p className="text-sm text-foreground-muted">{project.hackathonName}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-foreground-subtle">
                            <span className="flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              {project.votes}
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {project.views}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={getStatusColor(project.status) as any} size="sm">
                            {project.status}
                          </Badge>
                          {project.rank && (
                            <div className="text-xs text-accent mt-1">
                              #{project.rank}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Hackathons you're registered for</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRegistrations.filter(h => h.status !== 'ended').slice(0, 3).map((hackathon) => (
                      <div key={hackathon.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div>
                          <h4 className="font-medium">{hackathon.title}</h4>
                          <p className="text-sm text-foreground-muted">
                            {new Date(hackathon.startDate).toLocaleDateString()}
                          </p>
                          <Badge variant={getRoleColor(hackathon.role) as any} size="sm" className="mt-2">
                            {hackathon.role}
                          </Badge>
                        </div>
                        <Badge variant={getStatusColor(hackathon.status) as any} size="sm">
                          {hackathon.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Your latest accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {mockUserStats.achievements.map((achievement) => (
                    <Badge key={achievement} variant="accent" className="flex items-center">
                      <Award className="h-3 w-3 mr-1" />
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Projects</h2>
              <Button variant="primary">
                <Plus className="h-4 w-4 mr-2" />
                Submit New Project
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProjects.map((project) => (
                <Card key={project.id} hover>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold">{project.title}</h3>
                        <Badge variant={getStatusColor(project.status) as any} size="sm">
                          {project.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-foreground-muted">
                        {project.hackathonName}
                      </p>

                      {project.prize && (
                        <div className="flex items-center text-accent">
                          <Trophy className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">{project.prize}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm text-foreground-muted">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {project.votes}
                          </span>
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {project.views}
                          </span>
                        </div>
                        {project.rank && (
                          <span className="font-medium">#{project.rank}</span>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="secondary" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'hackathons' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Hackathons</h2>
              <Button variant="primary">
                <Plus className="h-4 w-4 mr-2" />
                Join Hackathon
              </Button>
            </div>

            <div className="space-y-4">
              {mockRegistrations.map((hackathon) => (
                <Card key={hackathon.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="text-lg font-semibold">{hackathon.title}</h3>
                          <Badge variant={getStatusColor(hackathon.status) as any}>
                            {hackathon.status}
                          </Badge>
                          <Badge variant={getRoleColor(hackathon.role) as any}>
                            {hackathon.role}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-foreground-muted">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}
                          </div>
                          <div>
                            Registered: {new Date(hackathon.registeredAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="secondary" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        {hackathon.role === 'judge' && hackathon.status === 'active' && (
                          <Button variant="primary" size="sm">
                            Judge Dashboard
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Achievements & Recognition</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Rank & Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="h-20 w-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{mockUserStats.rank}</h3>
                      <p className="text-foreground-muted">Current Rank</p>
                    </div>
                    <div className="w-full bg-background-tertiary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-sm text-foreground-muted">
                      75% to Expert Hacker
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Win Rate</span>
                      <span className="font-bold">25%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Top 3 Finishes</span>
                      <span className="font-bold">6</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Community Votes</span>
                      <span className="font-bold">{mockUserStats.totalVotes}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Profile Views</span>
                      <span className="font-bold">{mockUserStats.totalViews.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Badges & Awards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mockUserStats.achievements.map((achievement) => (
                    <div key={achievement} className="text-center p-4 border border-border rounded-lg">
                      <Award className="h-8 w-8 text-accent mx-auto mb-2" />
                      <p className="text-sm font-medium">{achievement}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Account Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Display Name
                    </label>
                    <input className="input" defaultValue="John Developer" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email
                    </label>
                    <input className="input" defaultValue="john@example.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Bio
                    </label>
                    <textarea className="textarea" rows={3} defaultValue="Full-stack developer passionate about AI and blockchain technology." />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      GitHub Username
                    </label>
                    <input className="input" defaultValue="johndeveloper" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-foreground-muted">Receive updates via email</div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Hackathon Reminders</div>
                      <div className="text-sm text-foreground-muted">Get reminded about upcoming events</div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Project Comments</div>
                      <div className="text-sm text-foreground-muted">Notify when someone comments on your projects</div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Marketing Updates</div>
                      <div className="text-sm text-foreground-muted">Receive news and updates</div>
                    </div>
                    <input type="checkbox" className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="secondary">Cancel</Button>
              <Button variant="primary">Save Changes</Button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default UserDashboard
