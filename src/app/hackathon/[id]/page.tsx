'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  Clock,
  Star,
  Share2,
  Heart,
  ExternalLink,
  Github,
  Globe,
  Award,
  Target,
  CheckCircle,
  AlertCircle,
  User,
  Building
} from 'lucide-react'

// Mock hackathon data
const mockHackathon = {
  id: 1,
  title: 'AI Innovation Challenge 2024',
  description: 'Build the next generation of AI-powered applications that solve real-world problems. This hackathon focuses on creating innovative solutions using artificial intelligence, machine learning, and deep learning technologies.',
  longDescription: `Join us for the most exciting AI hackathon of the year! We're looking for innovative teams to build groundbreaking AI applications that can make a real difference in the world.

Whether you're interested in computer vision, natural language processing, robotics, or any other AI domain, this is your chance to showcase your skills and compete for amazing prizes.

The hackathon will feature workshops, mentorship sessions, and networking opportunities with industry leaders. Don't miss this opportunity to learn, build, and connect with the AI community.`,
  organizer: {
    name: 'TechCorp',
    logo: '/api/placeholder/40/40',
    website: 'https://techcorp.com',
    description: 'Leading technology company focused on AI innovation'
  },
  startDate: '2024-03-15T09:00:00Z',
  endDate: '2024-03-17T18:00:00Z',
  registrationDeadline: '2024-03-10T23:59:59Z',
  location: 'San Francisco, CA',
  venue: 'TechCorp Innovation Center',
  participants: 1250,
  maxParticipants: 1500,
  prizes: [
    { place: '1st Place', amount: '$25,000', description: 'Grand Prize Winner' },
    { place: '2nd Place', amount: '$15,000', description: 'Runner Up' },
    { place: '3rd Place', amount: '$10,000', description: 'Third Place' },
    { place: 'Best AI Innovation', amount: '$5,000', description: 'Most innovative AI solution' },
    { place: 'People\'s Choice', amount: '$3,000', description: 'Community favorite' }
  ],
  totalPrizePool: '$58,000',
  status: 'upcoming',
  tags: ['AI', 'Machine Learning', 'Innovation', 'Computer Vision', 'NLP'],
  tracks: [
    {
      name: 'Healthcare AI',
      description: 'AI solutions for healthcare and medical applications',
      icon: '🏥'
    },
    {
      name: 'Climate Tech',
      description: 'AI for environmental and climate solutions',
      icon: '🌍'
    },
    {
      name: 'Education AI',
      description: 'AI-powered educational tools and platforms',
      icon: '📚'
    },
    {
      name: 'Open Innovation',
      description: 'Any AI application that solves real-world problems',
      icon: '💡'
    }
  ],
  judges: [
    {
      name: 'Dr. Sarah Chen',
      title: 'AI Research Director',
      company: 'Google AI',
      image: '/api/placeholder/60/60'
    },
    {
      name: 'Michael Rodriguez',
      title: 'VP of Engineering',
      company: 'OpenAI',
      image: '/api/placeholder/60/60'
    },
    {
      name: 'Prof. Lisa Wang',
      title: 'Computer Science Professor',
      company: 'Stanford University',
      image: '/api/placeholder/60/60'
    }
  ],
  schedule: [
    {
      day: 'Day 1 - March 15',
      events: [
        { time: '09:00', title: 'Registration & Breakfast', type: 'general' },
        { time: '10:00', title: 'Opening Ceremony', type: 'ceremony' },
        { time: '11:00', title: 'Team Formation & Networking', type: 'networking' },
        { time: '12:00', title: 'Hacking Begins!', type: 'hacking' },
        { time: '13:00', title: 'Lunch Break', type: 'break' },
        { time: '15:00', title: 'AI Workshop: Getting Started with TensorFlow', type: 'workshop' },
        { time: '18:00', title: 'Dinner & Networking', type: 'networking' }
      ]
    },
    {
      day: 'Day 2 - March 16',
      events: [
        { time: '09:00', title: 'Breakfast', type: 'break' },
        { time: '10:00', title: 'Mentor Office Hours', type: 'mentoring' },
        { time: '13:00', title: 'Lunch Break', type: 'break' },
        { time: '15:00', title: 'Workshop: Deploying AI Models', type: 'workshop' },
        { time: '18:00', title: 'Dinner & Entertainment', type: 'networking' },
        { time: '20:00', title: 'Late Night Coding Session', type: 'hacking' }
      ]
    },
    {
      day: 'Day 3 - March 17',
      events: [
        { time: '09:00', title: 'Breakfast', type: 'break' },
        { time: '10:00', title: 'Final Sprint', type: 'hacking' },
        { time: '12:00', title: 'Submission Deadline', type: 'deadline' },
        { time: '13:00', title: 'Lunch & Demo Prep', type: 'break' },
        { time: '14:00', title: 'Project Presentations', type: 'presentation' },
        { time: '16:00', title: 'Judging & Deliberation', type: 'judging' },
        { time: '17:00', title: 'Awards Ceremony', type: 'ceremony' },
        { time: '18:00', title: 'Closing & Networking', type: 'networking' }
      ]
    }
  ],
  requirements: [
    'Teams of 2-5 members',
    'All code must be written during the hackathon',
    'Open source libraries and APIs are allowed',
    'Projects must be submitted by the deadline',
    'Demo presentation required'
  ],
  resources: [
    { name: 'API Documentation', url: '#', type: 'docs' },
    { name: 'Starter Templates', url: '#', type: 'code' },
    { name: 'Design Assets', url: '#', type: 'design' },
    { name: 'Mentor Directory', url: '#', type: 'mentors' }
  ],
  sponsors: [
    { name: 'Google Cloud', logo: '/api/placeholder/120/60', tier: 'platinum' },
    { name: 'AWS', logo: '/api/placeholder/120/60', tier: 'gold' },
    { name: 'Microsoft Azure', logo: '/api/placeholder/120/60', tier: 'gold' },
    { name: 'NVIDIA', logo: '/api/placeholder/120/60', tier: 'silver' }
  ]
}

const HackathonDetailPage = () => {
  const params = useParams()
  const [isRegistered, setIsRegistered] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'ceremony': return 'text-accent'
      case 'workshop': return 'text-primary'
      case 'hacking': return 'text-success'
      case 'deadline': return 'text-error'
      case 'judging': return 'text-warning'
      default: return 'text-foreground-muted'
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'prizes', label: 'Prizes & Judges' },
    { id: 'projects', label: 'Projects' },
    { id: 'resources', label: 'Resources' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background-tertiary">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23262626" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-6">
              <Badge variant="success">
                <CheckCircle className="h-3 w-3 mr-1" />
                {mockHackathon.status}
              </Badge>
              <div className="flex items-center space-x-2 text-foreground-muted">
                <Building className="h-4 w-4" />
                <span>{mockHackathon.organizer.name}</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {mockHackathon.title}
            </h1>
            
            <p className="text-xl text-foreground-muted mb-8 max-w-3xl">
              {mockHackathon.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">March 15-17, 2024</div>
                  <div className="text-sm text-foreground-muted">3 days</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">{mockHackathon.location}</div>
                  <div className="text-sm text-foreground-muted">{mockHackathon.venue}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Trophy className="h-5 w-5 text-accent" />
                <div>
                  <div className="font-medium">{mockHackathon.totalPrizePool}</div>
                  <div className="text-sm text-foreground-muted">Total prizes</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {mockHackathon.tags.map((tag) => (
                <Badge key={tag} variant="primary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => setIsRegistered(!isRegistered)}
              >
                {isRegistered ? 'Registered ✓' : 'Register Now'}
              </Button>
              <Button variant="secondary" size="lg" className="text-lg px-8">
                <Heart className="h-5 w-5 mr-2" />
                Save Event
              </Button>
              <Button variant="ghost" size="lg" className="text-lg px-8">
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="border-b border-border bg-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-foreground-muted hover:text-foreground hover:border-border-light'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>About This Hackathon</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-foreground-muted whitespace-pre-line">
                          {mockHackathon.longDescription}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Tracks & Challenges</CardTitle>
                      <CardDescription>
                        Choose from these exciting tracks or create something entirely new
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mockHackathon.tracks.map((track) => (
                          <div key={track.name} className="p-4 border border-border rounded-lg hover:bg-background-tertiary transition-colors">
                            <div className="flex items-start space-x-3">
                              <span className="text-2xl">{track.icon}</span>
                              <div>
                                <h4 className="font-medium mb-1">{track.name}</h4>
                                <p className="text-sm text-foreground-muted">{track.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Rules & Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {mockHackathon.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-foreground-muted">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'schedule' && (
                <div className="space-y-6">
                  {mockHackathon.schedule.map((day) => (
                    <Card key={day.day}>
                      <CardHeader>
                        <CardTitle>{day.day}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {day.events.map((event, index) => (
                            <div key={index} className="flex items-start space-x-4 pb-4 border-b border-border last:border-b-0 last:pb-0">
                              <div className="text-sm font-mono text-foreground-muted min-w-[60px]">
                                {event.time}
                              </div>
                              <div className="flex-1">
                                <div className={`font-medium ${getEventTypeColor(event.type)}`}>
                                  {event.title}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === 'prizes' && (
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Prize Pool</CardTitle>
                      <CardDescription>
                        Total prize pool of {mockHackathon.totalPrizePool} across multiple categories
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockHackathon.prizes.map((prize, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                            <div>
                              <div className="font-medium">{prize.place}</div>
                              <div className="text-sm text-foreground-muted">{prize.description}</div>
                            </div>
                            <div className="text-xl font-bold text-accent">{prize.amount}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Judges</CardTitle>
                      <CardDescription>
                        Meet our panel of expert judges
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mockHackathon.judges.map((judge, index) => (
                          <div key={index} className="flex items-start space-x-4">
                            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0"></div>
                            <div>
                              <div className="font-medium">{judge.name}</div>
                              <div className="text-sm text-foreground-muted">{judge.title}</div>
                              <div className="text-sm text-primary">{judge.company}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'projects' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Submitted Projects</CardTitle>
                    <CardDescription>
                      Projects will be visible here once submissions open
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <AlertCircle className="h-12 w-12 text-foreground-muted mx-auto mb-4" />
                      <p className="text-foreground-muted">
                        Project submissions haven't started yet. Check back after the hackathon begins!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'resources' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Resources & Tools</CardTitle>
                    <CardDescription>
                      Everything you need to get started
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockHackathon.resources.map((resource, index) => (
                        <a
                          key={index}
                          href={resource.url}
                          className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-background-tertiary transition-colors"
                        >
                          <ExternalLink className="h-5 w-5 text-primary" />
                          <span className="font-medium">{resource.name}</span>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Registration Status */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="text-2xl font-bold text-primary">
                      {mockHackathon.participants.toLocaleString()}
                    </div>
                    <div className="text-sm text-foreground-muted">
                      of {mockHackathon.maxParticipants.toLocaleString()} registered
                    </div>
                    <div className="w-full bg-background-tertiary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(mockHackathon.participants / mockHackathon.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-foreground-subtle">
                      Registration closes March 10, 2024
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Organizer */}
              <Card>
                <CardHeader>
                  <CardTitle>Organizer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex-shrink-0"></div>
                    <div>
                      <div className="font-medium">{mockHackathon.organizer.name}</div>
                      <div className="text-sm text-foreground-muted mb-2">
                        {mockHackathon.organizer.description}
                      </div>
                      <a 
                        href={mockHackathon.organizer.website}
                        className="text-sm text-primary hover:underline flex items-center"
                      >
                        <Globe className="h-3 w-3 mr-1" />
                        Visit Website
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sponsors */}
              <Card>
                <CardHeader>
                  <CardTitle>Sponsors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockHackathon.sponsors.map((sponsor, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{sponsor.name}</span>
                        <Badge variant={sponsor.tier === 'platinum' ? 'accent' : sponsor.tier === 'gold' ? 'warning' : 'default'}>
                          {sponsor.tier}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HackathonDetailPage
