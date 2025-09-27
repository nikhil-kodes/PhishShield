import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  MessageCircle, 
  Play,
  ExternalLink,
  Clock,
  Award,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/services/apiClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CircularProgress } from '@/components/ui/circular-progress';
import { Link } from 'react-router-dom';

interface AwarenessTip {
  id: number;
  text: string;
}

const ChatbotFAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{id: number, text: string, isUser: boolean}>>([
    { id: 1, text: "Hi! I'm your PhishShield AI assistant. How can I help you stay safe online today?", isUser: false }
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage = { id: Date.now(), text: message, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate AI response
    // const response = await apiClient.sendChatMessage(message);
    // if (response.ok && response.data) {
    //   const aiMessage = { id: Date.now() + 1, text: response.data.message, isUser: false };
    //   setMessages(prev => [...prev, aiMessage]);
    // }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="mb-4 w-80 bg-white rounded-2xl shadow-strong border border-border"
        >
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-lg">PhishShield Assistant</h3>
            <p className="text-sm text-muted-foreground">Ask me about cybersecurity</p>
          </div>
          
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button size="sm" onClick={sendMessage}>
                Send
              </Button>
            </div>
          </div>
        </motion.div>
      )}
      
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="w-14 h-14 rounded-full bg-gradient-primary text-white shadow-strong hover:shadow-strong hover:scale-105 transition-all duration-200"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};

const AwarenessTicker = ({ tips }: { tips: string[] }) => {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1">Security Tip</h3>
            <motion.p
              key={currentTip}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-muted-foreground"
            >
              {tips[currentTip]}
            </motion.p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Dashboard() {
  const { user } = useAuth();

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => apiClient.getDashboardData(),
    select: (response) => response.data,
  });

  const getRiskBadgeVariant = (status: string) => {
    switch (status) {
      case 'safe': return 'badge-safe';
      case 'suspicious': return 'badge-suspicious';
      case 'dangerous': return 'badge-dangerous';
      default: return 'badge-unknown';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded"></div>
          <div className="h-4 w-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Hello, {user?.name?.split(' ')[0]} 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                Here's your cybersecurity overview for today
              </p>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <Award className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">{user?.credits || 0} credits</span>
            </div>
          </div>
        </motion.div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <CircularProgress 
                  value={dashboardData?.protectedPercentage || 0} 
                  size={120}
                  color="success"
                  className="mx-auto mb-4"
                />
                <h3 className="font-semibold text-lg">Protected</h3>
                <p className="text-sm text-muted-foreground">
                  You're {dashboardData?.protectedPercentage || 0}% safer online
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">{dashboardData?.blockedCount || 0}</h3>
                <p className="text-sm text-muted-foreground">Threats Blocked</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-warning/10 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-10 w-10 text-warning" />
                </div>
                <h3 className="text-2xl font-bold">{dashboardData?.attemptsDetected || 0}</h3>
                <p className="text-sm text-muted-foreground">Attempts Detected</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Awareness Ticker */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AwarenessTicker tips={dashboardData?.carouselTips || []} />
            </motion.div>

            {/* History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Your latest browsing security checks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dashboardData?.history?.map((item, index) => {
                    const { date, time } = formatDate(item.visitedAt);
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.url}</p>
                          <p className="text-sm text-muted-foreground">
                            {date} at {time}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getRiskBadgeVariant(item.status)}>
                            {item.score}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quiz CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-gradient-primary text-white">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-2xl flex items-center justify-center">
                    <Play className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Take Security Quiz</h3>
                    <p className="text-white/90 text-sm">
                      Test your knowledge and earn credits to unlock features
                    </p>
                  </div>
                  <Button asChild variant="secondary" className="w-full">
                    <Link to="/quiz">
                      Start Quiz
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">This Week</span>
                    <span className="font-semibold">15 threats blocked</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">This Month</span>
                    <span className="font-semibold">127 scans completed</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Quiz Score</span>
                    <span className="font-semibold text-success">85%</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Floating Chatbot */}
        <ChatbotFAB />
      </div>
    </div>
  );
}