# HackHub Deployment Guide

This guide covers different deployment options for the HackHub hackathon platform.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/hackhub)

1. Click the deploy button above
2. Connect your GitHub account
3. Configure environment variables in Vercel dashboard
4. Deploy automatically

### Option 2: Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/hackhub)

### Option 3: Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/hackhub)

## 🔧 Manual Deployment

### Prerequisites
- Node.js 18+
- npm or yarn
- IPFS node (optional)

### Environment Setup

1. **Clone and install**
```bash
git clone https://github.com/your-username/hackhub.git
cd hackhub
npm install
```

2. **Configure environment**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Required
NEXT_PUBLIC_IPFS_GATEWAY_URL=https://ipfs.io/ipfs/
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Optional IPFS Configuration
IPFS_PROJECT_ID=your_infura_project_id
IPFS_PROJECT_SECRET=your_infura_project_secret
```

3. **Build and start**
```bash
npm run build
npm start
```

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)
```bash
# Clone repository
git clone https://github.com/your-username/hackhub.git
cd hackhub

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app
```

### Using Docker only
```bash
# Build image
docker build -t hackhub .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_IPFS_GATEWAY_URL=https://ipfs.io/ipfs/ \
  -e NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  hackhub
```

## ☁️ Cloud Deployment

### AWS (using Amplify)
1. Connect GitHub repository to AWS Amplify
2. Configure build settings:
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Google Cloud Platform
```bash
# Install gcloud CLI
gcloud app deploy app.yaml

# app.yaml
runtime: nodejs18
env: standard
automatic_scaling:
  min_instances: 1
  max_instances: 10
```

### Microsoft Azure
```bash
# Using Azure Static Web Apps
az staticwebapp create \
  --name hackhub \
  --resource-group myResourceGroup \
  --source https://github.com/your-username/hackhub \
  --location "East US 2" \
  --branch main \
  --app-location "/" \
  --output-location ".next"
```

## 🔒 Production Configuration

### Security Headers
Add to `next.config.js`:
```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
```

### Performance Optimization
```javascript
// next.config.js
module.exports = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  images: {
    domains: ['ipfs.io', 'gateway.pinata.cloud'],
    formats: ['image/webp', 'image/avif'],
  },
}
```

## 📊 Monitoring & Analytics

### Error Tracking (Sentry)
```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

### Analytics (Google Analytics)
```javascript
// pages/_app.js
import { GoogleAnalytics } from '@next/third-parties/google'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
    </>
  )
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build application
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 🌐 IPFS Configuration

### Using Infura IPFS
1. Sign up at [infura.io](https://infura.io)
2. Create new IPFS project
3. Add credentials to environment:
```env
IPFS_PROJECT_ID=your_project_id
IPFS_PROJECT_SECRET=your_project_secret
NEXT_PUBLIC_IPFS_API_URL=https://ipfs.infura.io:5001
```

### Using Pinata
```env
PINATA_API_KEY=your_api_key
PINATA_SECRET_API_KEY=your_secret_key
NEXT_PUBLIC_IPFS_GATEWAY_URL=https://gateway.pinata.cloud/ipfs/
```

### Self-hosted IPFS Node
```bash
# Install IPFS
wget https://dist.ipfs.io/go-ipfs/v0.17.0/go-ipfs_v0.17.0_linux-amd64.tar.gz
tar -xvzf go-ipfs_v0.17.0_linux-amd64.tar.gz
cd go-ipfs
sudo bash install.sh

# Initialize and start
ipfs init
ipfs daemon
```

## 🔍 Health Checks

### Basic Health Check Endpoint
```javascript
// pages/api/health.js
export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
    ipfs: process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL ? 'configured' : 'not configured'
  })
}
```

### Monitoring Script
```bash
#!/bin/bash
# monitor.sh
HEALTH_URL="https://your-domain.com/api/health"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_URL)

if [ $RESPONSE -eq 200 ]; then
    echo "✅ Service is healthy"
else
    echo "❌ Service is down (HTTP $RESPONSE)"
    # Send alert notification
fi
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

2. **IPFS Connection Issues**
```bash
# Test IPFS connectivity
curl -X POST "https://ipfs.infura.io:5001/api/v0/version"
```

3. **Memory Issues**
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Performance Issues
- Enable compression in reverse proxy
- Use CDN for static assets
- Implement proper caching headers
- Optimize images and fonts

### Security Checklist
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Environment variables secured
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation in place

## 📞 Support

- **Documentation**: [README.md](README.md)
- **Issues**: [GitHub Issues](https://github.com/your-username/hackhub/issues)
- **Discord**: [Community Server](https://discord.gg/hackhub)
- **Email**: support@hackhub.dev

---

Happy deploying! 🚀
