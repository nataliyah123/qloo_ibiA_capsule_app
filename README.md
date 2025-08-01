# Capsule: Build Your Next Self

A cross-platform application that delivers curated 7-day "Capsules" — micro-curriculums that blend Books, Podcasts, Restaurants, Travel/POI, and Sport/Fitness activities to help users craft a cohesive personal identity.

## 🌟 Features

- **Personalized Onboarding**: Rate 20 seed entities to generate your unique 128-dimensional taste profile
- **AI-Curated Capsules**: 7-day journeys with 5 tightly linked artifacts across all domains
- **Smart Coach Chat**: Context-aware AI assistant powered by your taste profile and current progress
- **Generative Badges**: Unique SVG badges earned upon Capsule completion
- **Remix Functionality**: Swap out artifacts you don't love with similar alternatives
- **Daily Reflections**: Capture insights through text or 30-second audio recordings
- **Cross-Platform**: Responsive web design optimized for desktop, tablet, and mobile

## 🚀 Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Radix UI** for accessible components
- **Zustand** for state management
- **React Query** for data fetching

### Backend (Planned)
- **NestJS 10** with TypeScript
- **PostgreSQL 15** with Prisma ORM
- **Redis 7** for caching
- **TRPC** for type-safe APIs

### External APIs
- **Qloo API** for taste profiling and recommendations
- **OpenAI GPT-4** for coach chat functionality
- **Strava API** (optional sport sync)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── onboarding/        # Onboarding flow
│   └── capsule/           # Capsule experience
├── components/
│   ├── ui/                # Reusable UI components
│   ├── providers/         # Context providers
│   ├── onboarding/        # Onboarding-specific components
│   └── capsule/           # Capsule-specific components
├── lib/
│   ├── stores/            # Zustand stores
│   ├── data/              # Mock data and seed entities
│   ├── api/               # API integration layer
│   ├── types.ts           # TypeScript type definitions
│   └── utils.ts           # Utility functions
└── hooks/                 # Custom React hooks
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd capsule-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in the required environment variables:
   ```env
   QLOO_API_KEY=your_qloo_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   DATABASE_URL=your_database_url
   REDIS_URL=your_redis_url
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Core User Flow

### 1. Onboarding (60 seconds)
- Rate 20 carefully curated entities across 5 domains
- Generate personalized taste vector via Qloo Taste API
- Store 128-dimensional preference profile

### 2. Capsule Generation
- Apply cross-domain weights: `{books: 0.25, podcasts: 0.20, dining: 0.20, travel: 0.20, sports: 0.15}`
- Receive 5 tightly linked artifacts with daily micro-quests
- Load personalized 7-day journey in under 2 seconds

### 3. Daily Execution
- Complete daily activities and micro-quests
- Engage with curated content across all domains
- Capture nightly reflections (text or audio)

### 4. Coach Interaction
- Access floating chat drawer with AI assistant
- Get personalized insights based on taste profile
- Receive smart suggestions and reflection prompts

### 5. Completion & Rewards
- Unlock unique generative SVG badge
- Option to remix disliked artifacts
- Start new Capsule journey

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#8B5CF6) - Growth and transformation
- **Secondary**: Blue (#3B82F6) - Trust and reliability  
- **Accent**: Green (#10B981) - Success and completion
- **Gradients**: Dynamic combinations for visual interest

### Typography
- **Font**: Inter (system fallback)
- **Hierarchy**: Clear heading and body text distinction
- **Spacing**: 8px grid system for consistent layouts

### Components
- **Cards**: Backdrop blur with subtle borders
- **Buttons**: Gradient backgrounds with hover states
- **Progress**: Visual indicators for journey tracking
- **Animations**: Framer Motion for smooth interactions

## 📱 Responsive Design

- **Mobile First**: < 768px optimized layouts
- **Tablet**: 768px - 1024px adaptive design
- **Desktop**: > 1024px full-featured experience
- **Touch Friendly**: Large tap targets and gestures

## 🔗 API Integration

### Qloo API Endpoints
```typescript
// Taste profiling
POST /v2/taste
{
  "ratings": { "entity_id": rating_value }
}

// Recommendations  
POST /v2/recommendations
{
  "taste_vector": [128-dim array],
  "weights": { domain_weights }
}

// Similarity (for remix)
POST /v2/similarity
{
  "entity_id": "target_id",
  "type": "entity_type"
}
```

### Caching Strategy
- **Redis TTL**: 1 hour for API responses
- **Local Storage**: User preferences and progress
- **Query Cache**: 5 minutes for UI state

## 🧪 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# Future Commands (Backend)
npm run dev:mobile   # Start Expo development
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed development data
```

## 🚀 Deployment

### Web Application (Vercel)
```bash
npm run build
```
- Automatic deployments via GitHub integration
- Environment variables configured in Vercel dashboard
- Global CDN with optimal performance

### Backend Services (Planned)
- **API**: Render or Fly.io
- **Database**: PostgreSQL on Railway or Supabase
- **Cache**: Redis Cloud or Upstash
- **Mobile**: Expo EAS Build → App Stores

## 📊 Performance Targets

- **Onboarding**: Complete in under 60 seconds
- **Capsule Load**: Under 2 seconds after onboarding
- **Remix Speed**: Under 200ms response time
- **Coach Chat**: 2s cached, 4s fresh responses
- **Bundle Size**: < 500KB initial load

## 🔒 Security & Privacy

- **Data Encryption**: All sensitive data encrypted at rest
- **API Security**: Rate limiting and authentication
- **User Privacy**: Anonymized analytics only
- **GDPR Compliant**: User data export and deletion

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Full API docs and component library
- **Community**: Discord server for developers
- **Issues**: GitHub Issues for bugs and feature requests
- **Email**: support@capsule-app.com

---

**Built with ❤️ by the Capsule team**

Transform yourself, one Capsule at a time.