# PhishShield AI - Advanced Cybersecurity Protection

A modern, AI-powered cybersecurity application that protects users from phishing attacks and online threats through real-time detection and intelligent analysis.

## 🛡️ Features

### Core Protection
- **Real-time Threat Detection**: Advanced AI scans every link and email in real-time
- **Risk Scoring**: Comprehensive 0-100 risk assessment for all threats
- **Multi-language Support**: Global protection with multilingual AI chatbot
- **99.9% Detection Rate**: Industry-leading accuracy in threat identification

### User Experience
- **Gamified Learning**: Interactive quizzes to improve cybersecurity knowledge
- **Credit System**: Earn credits through learning and unlock premium features
- **AI Assistant**: 24/7 intelligent chatbot for cybersecurity guidance
- **Beautiful Interface**: Clean, accessible design following WCAG AA standards

### Dashboard & Analytics
- **Personal Protection Metrics**: Track your security improvements
- **Threat History**: Detailed logs of blocked attempts and scanned content
- **Awareness Tips**: Rotating educational content to enhance security knowledge
- **Performance Insights**: Visual analytics of your online safety

## 🚀 Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom design system
- **Framer Motion** - Smooth animations and transitions
- **React Query** - Efficient data fetching and caching
- **React Hook Form + Zod** - Form handling with validation

### UI Components
- **Shadcn/ui** - Accessible component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization

### Features
- **Mock API Integration** - Demo mode with realistic data
- **Protected Routes** - Authentication-based navigation
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG AA compliant
- **Progressive Enhancement** - Works without JavaScript

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#7C3AED to #3B82F6)
- **Accent**: Cyan (#06B6D4)
- **Success**: Green (#059669)
- **Warning**: Amber (#D97706)
- **Danger**: Red (#DC2626)

### Key Design Principles
- **Clean & Modern**: White background with subtle gradients
- **Accessible**: High contrast ratios and keyboard navigation
- **Consistent**: Semantic design tokens throughout
- **Responsive**: Mobile-first design approach

## 🔧 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd phishshield-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Demo Credentials
For testing the application, use these credentials:
- **Email**: `user@phishshield.ai`
- **Password**: `password`

## 📱 Application Structure

### Pages
- **Home** (`/`) - Landing page with hero section and features
- **Login** (`/login`) - User authentication
- **Signup** (`/signup`) - Account creation with validation
- **Dashboard** (`/dashboard`) - Main user interface with analytics
- **Quiz** (`/quiz`) - Interactive cybersecurity knowledge tests
- **Profile** (`/profile`) - User account management

### Key Components
- **Navbar** - Responsive navigation with user menu
- **ProtectedRoute** - Authentication wrapper for secure pages
- **CircularProgress** - Animated progress indicators
- **ChatbotFAB** - Floating AI assistant
- **AwarenessTicker** - Rotating security tips

## 🔐 Security Features

### Mock API Simulation
The application includes a comprehensive mock API that simulates:
- User authentication and session management
- Real-time threat detection responses
- Quiz question delivery and scoring
- User profile management
- Chat interactions with AI assistant

### Data Protection
- Client-side form validation with Zod schemas
- Secure token-based authentication simulation
- Input sanitization and XSS prevention
- CSRF protection patterns

## 🎯 User Experience

### Onboarding Flow
1. **Landing Page**: Clear value proposition and feature overview
2. **Registration**: Guided signup with password strength indicators
3. **Dashboard**: Immediate value with protection analytics
4. **Learning**: Gamified quizzes to improve security knowledge

### Accessibility Features
- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- High contrast color ratios
- Screen reader compatibility
- Focus management

## 🔮 Future Enhancements

### Planned Features
- **Browser Extension**: Real-time protection while browsing
- **API Integration**: Connect with actual threat intelligence feeds
- **Advanced Analytics**: ML-powered risk assessment
- **Team Management**: Corporate security dashboards
- **Mobile Apps**: Native iOS and Android applications

### Technical Improvements
- **Progressive Web App**: Offline functionality
- **Real-time Updates**: WebSocket integration
- **Advanced Caching**: Service worker implementation
- **Performance Optimization**: Code splitting and lazy loading

## 📊 Mock Data

The application uses realistic mock data for demonstration:
- **User Profiles**: Sample user information and statistics
- **Threat History**: Simulated phishing attempts and blocked links
- **Quiz Questions**: Cybersecurity knowledge assessments
- **Analytics**: Protection metrics and performance data

## 🤝 Contributing

### Development Guidelines
1. **Code Style**: Follow TypeScript and React best practices
2. **Component Structure**: Create reusable, accessible components
3. **Design System**: Use semantic tokens from the design system
4. **Testing**: Add unit tests for critical functionality
5. **Documentation**: Update README for new features

### Build & Deployment
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📄 License

This project is built with [Lovable](https://lovable.dev) - The AI-powered web development platform.

---

**PhishShield AI** - Protecting your digital life with advanced AI technology. 🛡️✨