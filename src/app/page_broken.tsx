'use client'

import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  Clock,
  Star,
  ArrowRight,
  Zap,
  Globe,
  Code,
  Plus
} from 'lucide-react'

// Mock data for hackathons
const mockHackathons = [
  {
    id: 1,
    title: 'AI Innovation Challenge 2024',
    description: 'Build the next generation of AI-powered applications that solve real-world problems.',
    organizer: 'TechCorp',
    startDate: '2024-03-15',
    endDate: '2024-03-17',
    location: 'San Francisco, CA',
    participants: 1250,
    prizes: '$50,000',
    status: 'upcoming',
    tags: ['AI', 'Machine Learning', 'Innovation'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop',
    featured: true
  },
  {
    id: 2,
    title: 'Blockchain for Good',
    description: 'Create blockchain solutions that make a positive impact on society and the environment.',
    organizer: 'CryptoFoundation',
    startDate: '2024-03-22',
    endDate: '2024-03-24',
    location: 'Virtual',
    participants: 890,
    prizes: '$30,000',
    status: 'active',
    tags: ['Blockchain', 'Sustainability', 'Social Impact'],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop'
  },
  {
    id: 3,
    title: 'Mobile App Revolution',
    description: 'Design and develop innovative mobile applications that enhance daily life.',
    organizer: 'AppDev Inc',
    startDate: '2024-04-05',
    endDate: '2024-04-07',
    location: 'Austin, TX',
    participants: 750,
    prizes: '$25,000',
    status: 'upcoming',
    tags: ['Mobile', 'iOS', 'Android', 'UX/UI'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop'
  },
  {
    id: 4,
    title: 'FinTech Innovation Summit',
    description: 'Revolutionary financial technology solutions for the modern banking industry.',
    organizer: 'FinanceForward',
    startDate: '2024-02-28',
    endDate: '2024-03-02',
    location: 'New York, NY',
    participants: 1100,
    prizes: '$40,000',
    status: 'active',
    tags: ['FinTech', 'Banking', 'Payments'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop'
  }
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const filteredHackathons = mockHackathons.filter(hackathon => {
    const matchesSearch = hackathon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hackathon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hackathon.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesFilter = selectedFilter === 'all' || hackathon.status === selectedFilter
    
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'upcoming': return 'primary'
      case 'ended': return 'secondary'
      default: return 'default'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background-tertiary">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23262626\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Build the Future at{' '}
              <span className="gradient-text">HackHub</span>
            </h1>
            <p className="text-xl text-foreground-muted mb-8 max-w-2xl mx-auto">
              Discover hackathons, connect with innovators, and showcase your projects on the world's first 
              decentralized hackathon platform powered by IPFS.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8">
                <Search className="h-5 w-5 mr-2" />
                Explore Events
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Plus className="h-5 w-5 mr-2" />
                Host a Hackathon
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-foreground-muted">Developers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">500+</div>
                <div className="text-foreground-muted">Hackathons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">$2M+</div>
                <div className="text-foreground-muted">Prize Pool</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <Input
                  placeholder="Search hackathons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="h-4 w-4" />}
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 bg-background-secondary border border-border rounded-lg text-foreground"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="ended">Ended</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hackathons */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Hackathons</h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Join thousands of developers in these premier hackathon events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHackathons.map((hackathon) => (
              <Card key={hackathon.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative">
                  <div className="absolute top-4 right-4">
                    <Badge variant={getStatusColor(hackathon.status)}>
                      {hackathon.status}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{hackathon.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {hackathon.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-foreground-muted">
                      <Calendar className="h-4 w-4 mr-2" />
                      {hackathon.startDate} - {hackathon.endDate}
                    </div>
                    <div className="flex items-center text-sm text-foreground-muted">
                      <MapPin className="h-4 w-4 mr-2" />
                      {hackathon.location}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-foreground-muted">
                        <Users className="h-4 w-4 mr-1" />
                        {hackathon.participants} participants
                      </div>
                      <div className="flex items-center text-success font-semibold">
                        <Trophy className="h-4 w-4 mr-1" />
                        {hackathon.prizes}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {hackathon.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button className="w-full mt-4">
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose HackHub?</h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              The first decentralized hackathon platform built for the future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Decentralized Storage</h3>
              <p className="text-foreground-muted">
                All hackathon data stored permanently on IPFS, ensuring censorship resistance and permanence.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-foreground-muted">
                Modern web technologies ensure blazing fast performance and seamless user experience.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Developer First</h3>
              <p className="text-foreground-muted">
                Built by developers, for developers. Dark mode, clean UI, and powerful features.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background-tertiary">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23262626\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Build the Future at{' '}
              <span className="gradient-text">HackHub</span>
            </h1>
            <p className="text-xl text-foreground-muted mb-8 max-w-2xl mx-auto">
              Discover hackathons, connect with innovators, and showcase your projects on the world's first 
              decentralized hackathon platform powered by IPFS.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8">
                <Search className="h-5 w-5 mr-2" />
                Explore Events
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Plus className="h-5 w-5 mr-2" />
                Host a Hackathon
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-foreground-muted">Developers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">500+</div>
                <div className="text-foreground-muted">Hackathons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">$2M+</div>
                <div className="text-foreground-muted">Prize Pool</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <Input
                  placeholder="Search hackathons, technologies, or themes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="h-4 w-4" />}
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="select min-w-[120px]"
                >
                  <option value="all">All Events</option>
                  <option value="active">Active</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="ended">Ended</option>
                </select>
                <Button variant="secondary">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              {['AI/ML', 'Blockchain', 'Web3', 'Climate Tech', 'FinTech', 'IoT', 'Gaming'].map((tag) => (
                <Badge key={tag} variant="default" className="cursor-pointer hover:bg-primary/10 hover:text-primary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hackathons */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Hackathons</h2>
              <p className="text-foreground-muted">Don't miss these amazing opportunities</p>
            </div>
            <Button variant="ghost">
              View All <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHackathons.map((hackathon) => (
              <Card key={hackathon.id} hover className="overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20">
                  {hackathon.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="accent">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge variant={getStatusColor(hackathon.status) as any}>
                      {hackathon.status}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background-secondary/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {hackathon.title}
                    </h3>
                    <p className="text-sm text-gray-200 line-clamp-2">
                      {hackathon.description}
                    </p>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-foreground-muted">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}
                    </div>
                    
                    <div className="flex items-center text-sm text-foreground-muted">
                      <MapPin className="h-4 w-4 mr-2" />
                      {hackathon.location}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-foreground-muted">
                        <Users className="h-4 w-4 mr-2" />
                        {hackathon.participants.toLocaleString()} participants
                      </div>
                      <div className="flex items-center text-accent font-medium">
                        <Trophy className="h-4 w-4 mr-2" />
                        {hackathon.prizes}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {hackathon.tags.map((tag) => (
                        <Badge key={tag} variant="primary" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button className="w-full">
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose HackHub?</h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Experience the future of hackathons with our decentralized platform built on IPFS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Decentralized</h3>
              <p className="text-foreground-muted">
                Built on IPFS for permanent, censorship-resistant storage of your projects and achievements.
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-foreground-muted">
                Modern, responsive interface with real-time updates and seamless user experience.
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="h-12 w-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="h-6 w-6 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Developer First</h3>
              <p className="text-foreground-muted">
                Built by developers, for developers. Comprehensive tools for project submission and collaboration.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
