import { motion } from 'framer-motion';
import { ArrowRight, Shield, Brain, Users, Zap, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: 'Real-time Protection',
      description: 'Advanced AI scans every link and email in real-time to protect you from phishing attacks.'
    },
    {
      icon: Brain,
      title: 'Smart AI Assistant',
      description: 'Get instant answers about suspicious content from our multilingual AI chatbot.'
    },
    {
      icon: Users,
      title: 'Gamified Learning',
      description: 'Learn cybersecurity through engaging quizzes and earn credits for your knowledge.'
    },
    {
      icon: Zap,
      title: 'Risk Scoring',
      description: 'Advanced algorithms provide clear risk scores from 0-100 for every threat.'
    }
  ];

  const benefits = [
    'Blocks 99.9% of phishing attempts',
    'Real-time threat detection',
    'Multi-language support',
    '24/7 AI assistant',
    'Gamified security training'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
                >
                  <Shield className="h-4 w-4" />
                  AI-Powered Cybersecurity
                </motion.div>
                
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Protect Yourself from{' '}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Phishing Attacks
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  PhishShield AI uses advanced artificial intelligence to detect and block phishing attempts in real-time. 
                  Stay safe online with our intelligent protection system.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button asChild size="lg" className="btn-hero group">
                  <Link to="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" asChild>
                  <Link to="/#demo">
                    Watch Demo
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center gap-6 pt-4"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Trusted by <span className="font-semibold text-foreground">10,000+</span> users worldwide
                </p>
              </motion.div>
            </motion.div>

            {/* Right Column - 3D Element Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/20 shadow-strong">
                {/* Placeholder for Spline 3D model */}
                <div className="text-center space-y-4">
                  <div className="relative">
                    <Shield className="h-24 w-24 text-primary mx-auto animate-pulse-soft" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-30 animate-pulse-soft"></div>
                  </div>
                  <p className="text-lg font-semibold text-primary">3D Security Visualization</p>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Interactive 3D model showcasing real-time threat detection
                  </p>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-medium shadow-medium"
              >
                99.9% Protected
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-medium"
              >
                AI Powered
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold">
              Advanced Protection Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive cybersecurity suite combines AI intelligence with user-friendly interfaces 
              to provide unmatched protection against modern threats.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full card-hover">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold">
                  Why Choose PhishShield AI?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Join thousands of users who trust PhishShield AI to protect their digital lives. 
                  Our advanced technology and user-focused design deliver unparalleled security.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <Button asChild size="lg" className="btn-hero">
                <Link to="/signup">
                  Start Protecting Yourself Today
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-96 bg-gradient-card flex items-center justify-center">
                    <div className="text-center space-y-4 p-8">
                      <div className="text-6xl font-bold text-primary">99.9%</div>
                      <p className="text-xl font-semibold">Threat Detection Rate</p>
                      <p className="text-muted-foreground">
                        Our AI successfully identifies and blocks phishing attempts with industry-leading accuracy
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 text-white"
          >
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to Secure Your Digital Life?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join PhishShield AI today and experience the future of cybersecurity. 
              Protect yourself and your loved ones from online threats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-primary">
                <Link to="/signup">
                  Get Started Free
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">PhishShield AI</span>
              </div>
              <p className="text-muted-foreground">
                Advanced AI-powered protection against phishing and cyber threats.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="#features" className="block hover:text-primary transition-colors">Features</a>
                <a href="#pricing" className="block hover:text-primary transition-colors">Pricing</a>
                <a href="#security" className="block hover:text-primary transition-colors">Security</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="#about" className="block hover:text-primary transition-colors">About</a>
                <a href="#contact" className="block hover:text-primary transition-colors">Contact</a>
                <a href="#careers" className="block hover:text-primary transition-colors">Careers</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="#privacy" className="block hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#terms" className="block hover:text-primary transition-colors">Terms of Service</a>
                <a href="#cookies" className="block hover:text-primary transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 PhishShield AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}