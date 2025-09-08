'use client'

import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent } from '@/components/ui/Card'
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
    tags: ['Blockchain', 'Sustainability', 'Social Impact']
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
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Build the Future at{' '}
              <span className="gradient-text">CodeForge</span>
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  icon={<Search className="h-4 w-4" />}
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedFilter}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedFilter(e.target.value)}
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
            <h2 className="text-3xl font-bold mb-4">Why Choose CodeForge?</h2>
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
