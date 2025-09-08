'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { 
  Globe,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  ExternalLink,
  Copy,
  Download
} from 'lucide-react'

interface IPFSStatusProps {
  hash?: string
  title?: string
  type?: 'hackathon' | 'project' | 'score'
  showActions?: boolean
}

const IPFSStatus = ({ hash, title, type = 'project', showActions = true }: IPFSStatusProps) => {
  const [status, setStatus] = useState<'checking' | 'available' | 'unavailable'>('checking')
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const ipfsGatewayUrl = hash ? `https://ipfs.io/ipfs/${hash}` : null
  const alternativeGateways = [
    `https://gateway.pinata.cloud/ipfs/${hash}`,
    `https://cloudflare-ipfs.com/ipfs/${hash}`,
    `https://dweb.link/ipfs/${hash}`
  ]

  useEffect(() => {
    if (hash) {
      checkIPFSAvailability()
    }
  }, [hash])

  const checkIPFSAvailability = async () => {
    if (!hash) return

    setStatus('checking')
    try {
      // Try to fetch from IPFS gateway with a timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch(ipfsGatewayUrl!, {
        method: 'HEAD',
        signal: controller.signal
      })

      clearTimeout(timeoutId)
      
      if (response.ok) {
        setStatus('available')
      } else {
        setStatus('unavailable')
      }
    } catch (error) {
      setStatus('unavailable')
    }
    
    setLastChecked(new Date())
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // In a real app, you'd show a toast notification
  }

  const getStatusColor = () => {
    switch (status) {
      case 'available': return 'success'
      case 'unavailable': return 'error'
      case 'checking': return 'warning'
      default: return 'default'
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'available': return <CheckCircle className="h-4 w-4" />
      case 'unavailable': return <AlertCircle className="h-4 w-4" />
      case 'checking': return <Loader2 className="h-4 w-4 animate-spin" />
      default: return <Globe className="h-4 w-4" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'available': return 'Available on IPFS'
      case 'unavailable': return 'Not yet available'
      case 'checking': return 'Checking availability...'
      default: return 'Unknown status'
    }
  }

  if (!hash) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-6 text-center">
          <Globe className="h-8 w-8 text-foreground-muted mx-auto mb-2" />
          <p className="text-foreground-muted">Not yet stored on IPFS</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">IPFS Storage</CardTitle>
          <Badge variant={getStatusColor() as any} className="flex items-center gap-1">
            {getStatusIcon()}
            {getStatusText()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {title && (
          <div>
            <h4 className="font-medium mb-1">{title}</h4>
            <p className="text-sm text-foreground-muted capitalize">{type} metadata</p>
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            IPFS Hash (CID)
          </label>
          <div className="flex items-center space-x-2">
            <code className="flex-1 p-2 bg-background-tertiary rounded text-sm font-mono break-all">
              {hash}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(hash)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {lastChecked && (
          <p className="text-xs text-foreground-subtle">
            Last checked: {lastChecked.toLocaleTimeString()}
          </p>
        )}

        {showActions && (
          <div className="space-y-3">
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={checkIPFSAvailability}
                disabled={status === 'checking'}
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${status === 'checking' ? 'animate-spin' : ''}`} />
                Refresh Status
              </Button>
              
              {status === 'available' && (
                <Button
                  variant="primary"
                  size="sm"
                  asChild
                >
                  <a href={ipfsGatewayUrl!} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View on IPFS
                  </a>
                </Button>
              )}
            </div>

            {status === 'available' && (
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Alternative Gateways
                </label>
                <div className="space-y-1">
                  {alternativeGateways.map((gateway, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-foreground-muted">
                        Gateway {index + 1}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <a href={gateway} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {status === 'unavailable' && (
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <p className="text-sm text-warning">
                  Content may still be propagating across the IPFS network. 
                  This can take a few minutes for new uploads.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default IPFSStatus
