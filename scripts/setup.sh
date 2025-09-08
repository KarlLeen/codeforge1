#!/bin/bash

# HackHub Setup Script
echo "🚀 Setting up HackHub - Decentralized Hackathon Platform"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env.local
    echo "⚠️  Please edit .env.local with your configuration"
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p public/uploads
mkdir -p .next

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your IPFS and database configuration"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "For production deployment:"
echo "- Docker: docker-compose up"
echo "- Vercel: Connect your GitHub repo to Vercel"
echo "- Manual: npm run build && npm start"
echo ""
echo "📚 Documentation: README.md"
echo "🐛 Issues: https://github.com/your-username/hackhub/issues"
echo ""
echo "Happy hacking! 🎯"
