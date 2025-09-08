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
  Calendar,
  MapPin,
  Trophy,
  Users,
  Target,
  Settings,
  Eye,
  Save,
  Upload,
  Plus,
  X,
  CheckCircle
} from 'lucide-react'

interface FormData {
  // Basic Info
  title: string
  description: string
  longDescription: string
  tags: string[]
  
  // Event Details
  startDate: string
  endDate: string
  registrationDeadline: string
  location: string
  venue: string
  maxParticipants: string
  
  // Organizer Info
  organizerName: string
  organizerDescription: string
  organizerWebsite: string
  
  // Tracks & Challenges
  tracks: Array<{
    name: string
    description: string
    icon: string
  }>
  
  // Prizes
  prizes: Array<{
    place: string
    amount: string
    description: string
  }>
  
  // Schedule
  schedule: Array<{
    day: string
    events: Array<{
      time: string
      title: string
      type: string
    }>
  }>
  
  // Requirements & Resources
  requirements: string[]
  resources: Array<{
    name: string
    url: string
    type: string
  }>
  
  // Additional Settings
  isPublic: boolean
  allowTeamFormation: boolean
  requireApproval: boolean
}

const CreateHackathonPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    longDescription: '',
    tags: [],
    startDate: '',
    endDate: '',
    registrationDeadline: '',
    location: '',
    venue: '',
    maxParticipants: '',
    organizerName: '',
    organizerDescription: '',
    organizerWebsite: '',
    tracks: [],
    prizes: [],
    schedule: [],
    requirements: [],
    resources: [],
    isPublic: true,
    allowTeamFormation: true,
    requireApproval: false
  })

  const [newTag, setNewTag] = useState('')
  const [newTrack, setNewTrack] = useState({ name: '', description: '', icon: '💡' })
  const [newPrize, setNewPrize] = useState({ place: '', amount: '', description: '' })
  const [newRequirement, setNewRequirement] = useState('')

  const totalSteps = 6

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Event details and description' },
    { number: 2, title: 'Schedule', description: 'Dates, location, and timeline' },
    { number: 3, title: 'Tracks & Prizes', description: 'Competition categories and rewards' },
    { number: 4, title: 'Requirements', description: 'Rules and resources' },
    { number: 5, title: 'Settings', description: 'Privacy and participation settings' },
    { number: 6, title: 'Review', description: 'Preview and publish' }
  ]

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      updateFormData({ tags: [...formData.tags, newTag.trim()] })
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    updateFormData({ tags: formData.tags.filter(tag => tag !== tagToRemove) })
  }

  const addTrack = () => {
    if (newTrack.name.trim() && newTrack.description.trim()) {
      updateFormData({ tracks: [...formData.tracks, { ...newTrack }] })
      setNewTrack({ name: '', description: '', icon: '💡' })
    }
  }

  const removeTrack = (index: number) => {
    updateFormData({ tracks: formData.tracks.filter((_, i) => i !== index) })
  }

  const addPrize = () => {
    if (newPrize.place.trim() && newPrize.amount.trim()) {
      updateFormData({ prizes: [...formData.prizes, { ...newPrize }] })
      setNewPrize({ place: '', amount: '', description: '' })
    }
  }

  const removePrize = (index: number) => {
    updateFormData({ prizes: formData.prizes.filter((_, i) => i !== index) })
  }

  const addRequirement = () => {
    if (newRequirement.trim()) {
      updateFormData({ requirements: [...formData.requirements, newRequirement.trim()] })
      setNewRequirement('')
    }
  }

  const removeRequirement = (index: number) => {
    updateFormData({ requirements: formData.requirements.filter((_, i) => i !== index) })
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
    console.log('Submitting hackathon:', formData)
    alert('Hackathon created successfully! (This would integrate with IPFS in production)')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">Create Hackathon</h1>
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

          {/* Form Content */}
          <Card>
            <CardContent className="p-8">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>
                    <p className="text-foreground-muted mb-6">
                      Let's start with the essential details about your hackathon.
                    </p>
                  </div>

                  <Input
                    label="Event Title *"
                    placeholder="AI Innovation Challenge 2024"
                    value={formData.title}
                    onChange={(e) => updateFormData({ title: e.target.value })}
                  />

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Short Description *
                    </label>
                    <textarea
                      className="textarea"
                      placeholder="A brief description of your hackathon (max 200 characters)"
                      value={formData.description}
                      onChange={(e) => updateFormData({ description: e.target.value })}
                      maxLength={200}
                      rows={3}
                    />
                    <div className="text-xs text-foreground-subtle mt-1">
                      {formData.description.length}/200 characters
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Detailed Description *
                    </label>
                    <textarea
                      className="textarea"
                      placeholder="Provide a comprehensive description of your hackathon, including goals, themes, and what participants can expect..."
                      value={formData.longDescription}
                      onChange={(e) => updateFormData({ longDescription: e.target.value })}
                      rows={6}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Tags
                    </label>
                    <div className="flex gap-2 mb-3">
                      <Input
                        placeholder="Add a tag (e.g., AI, Blockchain)"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <Button onClick={addTag} variant="secondary">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="primary" className="flex items-center gap-1">
                          {tag}
                          <button onClick={() => removeTag(tag)}>
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Organizer Name *"
                      placeholder="Your Company/Organization"
                      value={formData.organizerName}
                      onChange={(e) => updateFormData({ organizerName: e.target.value })}
                    />
                    <Input
                      label="Organizer Website"
                      placeholder="https://yourcompany.com"
                      value={formData.organizerWebsite}
                      onChange={(e) => updateFormData({ organizerWebsite: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Organizer Description
                    </label>
                    <textarea
                      className="textarea"
                      placeholder="Brief description of the organizing company/team"
                      value={formData.organizerDescription}
                      onChange={(e) => updateFormData({ organizerDescription: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Schedule */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Schedule & Location</h2>
                    <p className="text-foreground-muted mb-6">
                      Set the dates, location, and capacity for your event.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="Start Date *"
                      type="datetime-local"
                      value={formData.startDate}
                      onChange={(e) => updateFormData({ startDate: e.target.value })}
                    />
                    <Input
                      label="End Date *"
                      type="datetime-local"
                      value={formData.endDate}
                      onChange={(e) => updateFormData({ endDate: e.target.value })}
                    />
                    <Input
                      label="Registration Deadline *"
                      type="datetime-local"
                      value={formData.registrationDeadline}
                      onChange={(e) => updateFormData({ registrationDeadline: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Location *"
                      placeholder="San Francisco, CA or Virtual"
                      value={formData.location}
                      onChange={(e) => updateFormData({ location: e.target.value })}
                      icon={<MapPin className="h-4 w-4" />}
                    />
                    <Input
                      label="Venue"
                      placeholder="Specific venue name or platform"
                      value={formData.venue}
                      onChange={(e) => updateFormData({ venue: e.target.value })}
                    />
                  </div>

                  <Input
                    label="Maximum Participants"
                    type="number"
                    placeholder="1000"
                    value={formData.maxParticipants}
                    onChange={(e) => updateFormData({ maxParticipants: e.target.value })}
                    icon={<Users className="h-4 w-4" />}
                  />
                </div>
              )}

              {/* Step 3: Tracks & Prizes */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Tracks & Prizes</h2>
                    <p className="text-foreground-muted mb-6">
                      Define competition tracks and prize structure.
                    </p>
                  </div>

                  {/* Tracks */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Competition Tracks</h3>
                    <div className="space-y-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                        <div className="md:col-span-1">
                          <select
                            className="select h-10"
                            value={newTrack.icon}
                            onChange={(e) => setNewTrack({ ...newTrack, icon: e.target.value })}
                          >
                            <option value="💡">💡</option>
                            <option value="🏥">🏥</option>
                            <option value="🌍">🌍</option>
                            <option value="📚">📚</option>
                            <option value="🚀">🚀</option>
                            <option value="🎮">🎮</option>
                            <option value="💰">💰</option>
                            <option value="🔒">🔒</option>
                          </select>
                        </div>
                        <div className="md:col-span-4">
                          <Input
                            placeholder="Track name"
                            value={newTrack.name}
                            onChange={(e) => setNewTrack({ ...newTrack, name: e.target.value })}
                          />
                        </div>
                        <div className="md:col-span-6">
                          <Input
                            placeholder="Track description"
                            value={newTrack.description}
                            onChange={(e) => setNewTrack({ ...newTrack, description: e.target.value })}
                          />
                        </div>
                        <div className="md:col-span-1">
                          <Button onClick={addTrack} variant="secondary" className="w-full">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {formData.tracks.map((track, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{track.icon}</span>
                            <div>
                              <div className="font-medium">{track.name}</div>
                              <div className="text-sm text-foreground-muted">{track.description}</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeTrack(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prizes */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Prize Structure</h3>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-4">
                      <div className="md:col-span-3">
                        <Input
                          placeholder="Prize name (e.g., 1st Place)"
                          value={newPrize.place}
                          onChange={(e) => setNewPrize({ ...newPrize, place: e.target.value })}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Input
                          placeholder="Amount (e.g., $5,000)"
                          value={newPrize.amount}
                          onChange={(e) => setNewPrize({ ...newPrize, amount: e.target.value })}
                        />
                      </div>
                      <div className="md:col-span-6">
                        <Input
                          placeholder="Description"
                          value={newPrize.description}
                          onChange={(e) => setNewPrize({ ...newPrize, description: e.target.value })}
                        />
                      </div>
                      <div className="md:col-span-1">
                        <Button onClick={addPrize} variant="secondary" className="w-full">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {formData.prizes.map((prize, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <div className="font-medium">{prize.place}</div>
                              <div className="text-sm text-foreground-muted">{prize.description}</div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="text-lg font-bold text-accent">{prize.amount}</div>
                              <Button variant="ghost" size="sm" onClick={() => removePrize(index)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Requirements */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Requirements & Resources</h2>
                    <p className="text-foreground-muted mb-6">
                      Set the rules and provide helpful resources for participants.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Requirements & Rules</h3>
                    <div className="flex gap-2 mb-4">
                      <Input
                        placeholder="Add a requirement (e.g., Teams of 2-5 members)"
                        value={newRequirement}
                        onChange={(e) => setNewRequirement(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                      />
                      <Button onClick={addRequirement} variant="secondary">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {formData.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span>{requirement}</span>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeRequirement(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Settings */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Event Settings</h2>
                    <p className="text-foreground-muted mb-6">
                      Configure privacy and participation settings.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <div className="font-medium">Public Event</div>
                        <div className="text-sm text-foreground-muted">
                          Anyone can discover and register for this event
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.isPublic}
                        onChange={(e) => updateFormData({ isPublic: e.target.checked })}
                        className="w-4 h-4"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <div className="font-medium">Allow Team Formation</div>
                        <div className="text-sm text-foreground-muted">
                          Enable team discovery and formation features
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.allowTeamFormation}
                        onChange={(e) => updateFormData({ allowTeamFormation: e.target.checked })}
                        className="w-4 h-4"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <div className="font-medium">Require Approval</div>
                        <div className="text-sm text-foreground-muted">
                          Manually approve participant registrations
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.requireApproval}
                        onChange={(e) => updateFormData({ requireApproval: e.target.checked })}
                        className="w-4 h-4"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Review */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Review & Publish</h2>
                    <p className="text-foreground-muted mb-6">
                      Review your hackathon details before publishing to IPFS.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Card variant="glass">
                      <CardHeader>
                        <CardTitle>{formData.title}</CardTitle>
                        <CardDescription>{formData.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-foreground-muted">Dates:</span> {formData.startDate} - {formData.endDate}
                          </div>
                          <div>
                            <span className="text-foreground-muted">Location:</span> {formData.location}
                          </div>
                          <div>
                            <span className="text-foreground-muted">Max Participants:</span> {formData.maxParticipants}
                          </div>
                          <div>
                            <span className="text-foreground-muted">Tracks:</span> {formData.tracks.length}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex items-center space-x-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-primary">Ready to Publish</div>
                        <div className="text-sm text-foreground-muted">
                          Your hackathon will be stored on IPFS and made discoverable on the platform.
                        </div>
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
                    <Button onClick={nextStep}>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} variant="accent">
                      <Upload className="h-4 w-4 mr-2" />
                      Publish to IPFS
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

export default CreateHackathonPage
