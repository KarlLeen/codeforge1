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
  Users,
  Plus,
  MessageCircle,
  Star,
  MapPin,
  Calendar,
  Code,
  Briefcase,
  Github,
  Linkedin,
  Mail,
  Filter,
  UserPlus,
  Heart,
  Eye
} from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  role: string
  skills: string[]
  github?: string
  linkedin?: string
  avatar: string
  lookingForTeam: boolean
  experience: 'beginner' | 'intermediate' | 'advanced'
  location: string
  timezone: string
}

interface Team {
  id: string
  name: string
  description: string
  hackathonId: string
  hackathonName: string
  leaderId: string
  members: TeamMember[]
  lookingFor: string[]
  maxMembers: number
  tags: string[]
  createdAt: string
  isOpen: boolean
}

const mockMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Full Stack Developer',
    skills: ['React', 'Node.js', 'Python', 'PostgreSQL'],
    github: 'sarahchen',
    linkedin: 'sarahchen',
    avatar: '/api/placeholder/60/60',
    lookingForTeam: true,
    experience: 'advanced',
    location: 'San Francisco, CA',
    timezone: 'PST'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    role: 'AI/ML Engineer',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision'],
    github: 'marcusj',
    avatar: '/api/placeholder/60/60',
    lookingForTeam: true,
    experience: 'intermediate',
    location: 'New York, NY',
    timezone: 'EST'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'UX/UI Designer',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    linkedin: 'elenarodriguez',
    avatar: '/api/placeholder/60/60',
    lookingForTeam: true,
    experience: 'advanced',
    location: 'Austin, TX',
    timezone: 'CST'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Blockchain Developer',
    skills: ['Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts'],
    github: 'davidkim',
    avatar: '/api/placeholder/60/60',
    lookingForTeam: false,
    experience: 'intermediate',
    location: 'Seattle, WA',
    timezone: 'PST'
  }
]

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'AI Innovators',
    description: 'Building next-generation AI solutions for healthcare. We\'re passionate about using machine learning to solve real-world medical challenges.',
    hackathonId: '1',
    hackathonName: 'AI Innovation Challenge 2024',
    leaderId: '1',
    members: [mockMembers[0], mockMembers[1]],
    lookingFor: ['UX Designer', 'Backend Developer'],
    maxMembers: 5,
    tags: ['AI', 'Healthcare', 'Machine Learning'],
    createdAt: '2024-03-10T10:00:00Z',
    isOpen: true
  },
  {
    id: '2',
    name: 'Green Tech Warriors',
    description: 'Developing sustainable technology solutions to combat climate change. Join us in building the future of clean tech!',
    hackathonId: '3',
    hackathonName: 'Green Tech Hackathon',
    leaderId: '2',
    members: [mockMembers[2]],
    lookingFor: ['IoT Developer', 'Data Scientist', 'Mobile Developer'],
    maxMembers: 4,
    tags: ['Climate Tech', 'IoT', 'Sustainability'],
    createdAt: '2024-03-12T14:30:00Z',
    isOpen: true
  },
  {
    id: '3',
    name: 'Blockchain Builders',
    description: 'Creating decentralized applications that make a positive social impact. Experience with Web3 technologies preferred.',
    hackathonId: '2',
    hackathonName: 'Blockchain for Good',
    leaderId: '3',
    members: [mockMembers[3]],
    lookingFor: ['Frontend Developer', 'Smart Contract Developer'],
    maxMembers: 3,
    tags: ['Blockchain', 'Web3', 'DeFi'],
    createdAt: '2024-03-08T16:45:00Z',
    isOpen: false
  }
]

const TeamsPage = () => {
  const [activeTab, setActiveTab] = useState('discover')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedExperience, setSelectedExperience] = useState('all')
  const [showAvailableOnly, setShowAvailableOnly] = useState(true)

  const allSkills = Array.from(new Set(mockMembers.flatMap(m => m.skills)))
  const experienceLevels = ['beginner', 'intermediate', 'advanced']

  const filteredMembers = mockMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesSkills = selectedSkills.length === 0 || 
                         selectedSkills.some(skill => member.skills.includes(skill))
    
    const matchesExperience = selectedExperience === 'all' || member.experience === selectedExperience
    const matchesAvailability = !showAvailableOnly || member.lookingForTeam
    
    return matchesSearch && matchesSkills && matchesExperience && matchesAvailability
  })

  const filteredTeams = mockTeams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         team.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesSearch
  })

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case 'beginner': return 'success'
      case 'intermediate': return 'warning'
      case 'advanced': return 'error'
      default: return 'default'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-background-secondary to-background-tertiary py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your <span className="gradient-text">Dream Team</span>
            </h1>
            <p className="text-xl text-foreground-muted mb-8">
              Connect with talented developers, designers, and innovators. Form teams and build amazing projects together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Users className="h-5 w-5 mr-2" />
                Find Teammates
              </Button>
              <Button variant="secondary" size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Create Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="border-b border-border mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('discover')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'discover'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-foreground-muted hover:text-foreground'
              }`}
            >
              Discover Members
            </button>
            <button
              onClick={() => setActiveTab('teams')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'teams'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-foreground-muted hover:text-foreground'
              }`}
            >
              Browse Teams
            </button>
            <button
              onClick={() => setActiveTab('my-team')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'my-team'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-foreground-muted hover:text-foreground'
              }`}
            >
              My Team
            </button>
          </nav>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder={`Search ${activeTab === 'discover' ? 'members' : 'teams'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            
            {activeTab === 'discover' && (
              <>
                <select
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="select min-w-[140px]"
                >
                  <option value="all">All Levels</option>
                  {experienceLevels.map((level) => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
                
                <Button
                  variant={showAvailableOnly ? "primary" : "secondary"}
                  onClick={() => setShowAvailableOnly(!showAvailableOnly)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Available Only
                </Button>
              </>
            )}
          </div>

          {activeTab === 'discover' && (
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Filter by Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {allSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={selectedSkills.includes(skill) ? "primary" : "default"}
                    className="cursor-pointer"
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {activeTab === 'discover' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Card key={member.id} hover>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{member.name}</h3>
                      <p className="text-sm text-foreground-muted">{member.role}</p>
                      <Badge 
                        variant={getExperienceColor(member.experience) as any} 
                        size="sm" 
                        className="mt-1"
                      >
                        {member.experience}
                      </Badge>
                    </div>
                    {member.lookingForTeam && (
                      <Badge variant="success" size="sm">
                        Available
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-foreground-muted">
                      <MapPin className="h-4 w-4 mr-2" />
                      {member.location} ({member.timezone})
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.slice(0, 4).map((skill) => (
                          <Badge key={skill} variant="default" size="sm">
                            {skill}
                          </Badge>
                        ))}
                        {member.skills.length > 4 && (
                          <Badge variant="default" size="sm">
                            +{member.skills.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex space-x-2">
                        {member.github && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={`https://github.com/${member.github}`} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {member.linkedin && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={`https://linkedin.com/in/${member.linkedin}`} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Button variant="primary" size="sm">
                        <UserPlus className="h-4 w-4 mr-1" />
                        Invite
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'teams' && (
          <div className="space-y-6">
            {filteredTeams.map((team) => (
              <Card key={team.id} hover>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h3 className="text-xl font-semibold">{team.name}</h3>
                        {team.isOpen ? (
                          <Badge variant="success">Open</Badge>
                        ) : (
                          <Badge variant="default">Closed</Badge>
                        )}
                      </div>
                      <p className="text-foreground-muted mb-3">{team.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-foreground-muted mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {team.hackathonName}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {team.members.length}/{team.maxMembers} members
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {team.tags.map((tag) => (
                          <Badge key={tag} variant="primary" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex -space-x-2">
                          {team.members.slice(0, 3).map((member) => (
                            <div
                              key={member.id}
                              className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background"
                              title={member.name}
                            ></div>
                          ))}
                          {team.members.length > 3 && (
                            <div className="h-8 w-8 rounded-full bg-background-tertiary border-2 border-background flex items-center justify-center text-xs font-medium">
                              +{team.members.length - 3}
                            </div>
                          )}
                        </div>
                        
                        {team.lookingFor.length > 0 && (
                          <div>
                            <span className="text-sm text-foreground-muted">Looking for: </span>
                            <span className="text-sm font-medium">{team.lookingFor.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Button variant="primary" disabled={!team.isOpen}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        {team.isOpen ? 'Request to Join' : 'Team Full'}
                      </Button>
                      <Button variant="secondary" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'my-team' && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>My Team</CardTitle>
                <CardDescription>
                  Manage your current team and invitations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-foreground-muted mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Active Team</h3>
                  <p className="text-foreground-muted mb-6">
                    You're not currently part of any team. Join an existing team or create your own!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={() => setActiveTab('teams')}>
                      <Search className="h-4 w-4 mr-2" />
                      Browse Teams
                    </Button>
                    <Button variant="secondary">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Team
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Empty States */}
        {activeTab === 'discover' && filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-foreground-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Members Found</h3>
            <p className="text-foreground-muted mb-6">
              Try adjusting your search criteria or filters to find more members.
            </p>
            <Button variant="secondary" onClick={() => {
              setSearchQuery('')
              setSelectedSkills([])
              setSelectedExperience('all')
              setShowAvailableOnly(false)
            }}>
              Clear Filters
            </Button>
          </div>
        )}

        {activeTab === 'teams' && filteredTeams.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-foreground-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Teams Found</h3>
            <p className="text-foreground-muted mb-6">
              No teams match your search criteria. Try a different search term.
            </p>
            <Button variant="secondary" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default TeamsPage
