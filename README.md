# CodeForge - Decentralized Hackathon Platform

A comprehensive hackathon platform built with Next.js, TypeScript, and IPFS for decentralized storage. CodeForge enables organizers to create events, participants to submit projects, judges to evaluate submissions, and communities to discover and interact with innovative projects.

## 🌟 Features

### Core Functionality
- **Hackathon Discovery**: Search, filter, and browse hackathons with advanced filtering
- **Event Management**: Comprehensive hackathon detail pages with schedules, prizes, and tracks
- **Project Submission**: Multi-step project submission workflow with team management
- **Project Gallery**: Community-driven project showcase with voting and comments
- **Judge Dashboard**: Secure scoring interface with weighted criteria evaluation
- **User Dashboard**: Personal activity overview and achievement tracking
- **Team Discovery**: Find teammates and form teams with skill-based matching

### Decentralized Features
- **IPFS Integration**: Store hackathon metadata, project submissions, and judge scores on IPFS
- **Permanent Storage**: Immutable project records and competition results
- **Decentralized Judging**: Cryptographically signed judge scores stored on IPFS
- **Content Verification**: Verify data integrity through IPFS content addressing

### Modern UI/UX
- **Dark Theme**: Beautiful dark mode interface optimized for developers
- **Responsive Design**: Mobile-first design that works on all devices
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Accessible**: WCAG compliant with keyboard navigation support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- IPFS node (optional, uses public gateways by default)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/codeforge.git
cd codeforge
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# IPFS Configuration (optional)
NEXT_PUBLIC_IPFS_API_URL=https://ipfs.infura.io:5001
NEXT_PUBLIC_IPFS_GATEWAY_URL=https://ipfs.io/ipfs/
IPFS_PROJECT_ID=your_project_id
IPFS_PROJECT_SECRET=your_project_secret

# Database (for production)
DATABASE_URL=postgresql://username:password@localhost:5432/codeforge

# Authentication (for production)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
hackathon-platform/
├── src/
│   ├── app/                    # Next.js 13+ App Router
│   │   ├── page.tsx           # Homepage with hackathon discovery
│   │   ├── hackathon/[id]/    # Hackathon detail pages
│   │   ├── create-hackathon/  # Organizer workflow
│   │   ├── submit-project/    # Project submission
│   │   ├── projects/          # Project gallery
│   │   ├── teams/             # Team discovery
│   │   ├── dashboard/         # User dashboard
│   │   └── judge/             # Judge interface
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   ├── layout/            # Layout components
│   │   └── ipfs/              # IPFS-specific components
│   └── lib/
│       └── ipfs.ts            # IPFS integration utilities
├── public/                     # Static assets
├── tailwind.config.js         # Tailwind CSS configuration
└── package.json
```

## 🎯 Key Pages & Features

### 1. Homepage (`/`)
- **Hackathon Discovery**: Browse and search active, upcoming, and past hackathons
- **Advanced Filtering**: Filter by status, technology, location, and more
- **Featured Events**: Highlighted hackathons with special recognition
- **Statistics Dashboard**: Platform-wide metrics and achievements

### 2. Hackathon Details (`/hackathon/[id]`)
- **Comprehensive Information**: Full event details, schedules, and requirements
- **Multi-tab Interface**: Overview, schedule, prizes, projects, and resources
- **Registration Management**: Join events and track participation status
- **Real-time Updates**: Live participant counts and submission tracking

### 3. Create Hackathon (`/create-hackathon`)
- **Multi-step Wizard**: Guided hackathon creation process
- **Rich Configuration**: Tracks, prizes, schedules, and requirements
- **IPFS Publishing**: Automatic metadata storage on IPFS
- **Preview Mode**: Review before publishing

### 4. Project Submission (`/submit-project`)
- **Team Management**: Add team members with roles and contact info
- **Technical Details**: Problem statement, solution, and tech stack
- **Media Upload**: GitHub repos, live demos, and video presentations
- **IPFS Storage**: Permanent project record storage

### 5. Project Gallery (`/projects`)
- **Community Showcase**: Browse all submitted projects
- **Interactive Features**: Voting, commenting, and sharing
- **Advanced Search**: Filter by technology, hackathon, and category
- **Winner Highlights**: Featured winning projects

### 6. Judge Dashboard (`/judge/dashboard`)
- **Secure Interface**: Judge-only access with authentication
- **Scoring System**: Weighted criteria evaluation
- **Batch Processing**: Efficient review of multiple submissions
- **IPFS Integrity**: Cryptographically signed score submission

### 7. User Dashboard (`/dashboard`)
- **Activity Overview**: Personal hackathon and project history
- **Achievement System**: Badges, rankings, and recognition
- **Statistics Tracking**: Votes, views, and engagement metrics
- **Settings Management**: Profile and notification preferences

### 8. Team Discovery (`/teams`)
- **Member Matching**: Find teammates based on skills and experience
- **Team Formation**: Create and join teams for hackathons
- **Skill Filtering**: Advanced search by technology and expertise
- **Communication Tools**: Direct messaging and collaboration features

## 🔧 Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **Lucide React**: Beautiful icons

### Decentralized Storage
- **IPFS**: InterPlanetary File System for permanent storage
- **Content Addressing**: Immutable data through cryptographic hashes
- **Pinning Services**: Ensure content availability

### Development Tools
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Autoprefixer**: Cross-browser compatibility

## 🌐 IPFS Integration

CodeForge leverages IPFS for decentralized storage of critical platform data:

### Stored on IPFS
- **Hackathon Metadata**: Event details, schedules, and requirements
- **Project Submissions**: Complete project information and media links
- **Judge Scores**: Evaluation results with cryptographic signatures
- **User Achievements**: Permanent record of accomplishments

### Benefits
- **Permanence**: Data cannot be deleted or modified
- **Transparency**: Public verification of all submissions and scores
- **Decentralization**: No single point of failure
- **Integrity**: Content addressing ensures data authenticity

### IPFS Configuration
```typescript
// Example IPFS usage
import { uploadHackathonMetadata, getFromIPFS } from '@/lib/ipfs'

// Store hackathon data
const result = await uploadHackathonMetadata(hackathonData)
console.log('IPFS Hash:', result.hash)
console.log('Gateway URL:', result.url)

// Retrieve data
const data = await getFromIPFS(hash)
const hackathon = JSON.parse(data)
```

## 🚀 Deployment

### Vercel (Recommended)
1. **Connect Repository**: Link your GitHub repo to Vercel
2. **Configure Environment**: Add environment variables in Vercel dashboard
3. **Deploy**: Automatic deployment on every push to main branch

### Docker
```bash
# Build image
docker build -t codeforge .

# Run container
docker run -p 3000:3000 codeforge
```

### Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **IPFS Community**: For building the decentralized web infrastructure
- **Next.js Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Open Source Community**: For the countless libraries and tools

---
Built with ❤️ for the developer community. Powered by IPFS for a decentralized future.
