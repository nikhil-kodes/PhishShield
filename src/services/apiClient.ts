// API Client for PhishShield AI
// Handles all HTTP requests with authentication and error handling

interface ApiResponse<T = any> {
  ok: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  avatar?: string;
  credits: number;
  createdAt: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

interface DashboardData {
  protectedPercentage: number;
  blockedCount: number;
  attemptsDetected: number;
  history: HistoryItem[];
  carouselTips: string[];
  credits: number;
}

interface HistoryItem {
  id: string;
  url: string;
  score: number;
  visitedAt: string;
  favicon?: string;
  status: 'safe' | 'suspicious' | 'dangerous' | 'unknown';
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionId: number;
  explanation: string;
  image?: string;
}

interface QuizResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  creditsEarned: number;
}

class ApiClient {
  private baseURL: string;
  private mockMode: boolean;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || '/api';
    this.mockMode = import.meta.env.VITE_MOCK_API === 'true' || true; // Default to mock for demo
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  private removeAuthToken(): void {
    localStorage.removeItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    if (this.mockMode) {
      return this.mockRequest<T>(endpoint, options);
    }

    try {
      const token = this.getAuthToken();
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
      });

      const data = await response.json();
      return { ok: response.ok, data, error: data.error };
    } catch (error) {
      return { ok: false, error: 'Network error occurred' };
    }
  }

  // Mock API for demo purposes
  private async mockRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));

    const method = options.method || 'GET';
    const body = options.body ? JSON.parse(options.body as string) : null;

    // Mock responses
    if (endpoint === '/auth/login' && method === 'POST') {
      if (body.email === 'user@phishshield.ai' && body.password === 'password') {
        const token = 'mock-jwt-token';
        this.setAuthToken(token);
        return {
          ok: true,
          data: {
            token,
            user: {
              id: '1',
              name: 'John Doe',
              email: 'user@phishshield.ai',
              credits: 125,
              createdAt: '2024-01-15T10:00:00Z'
            }
          } as T
        };
      }
      return { ok: false, error: 'Invalid credentials' };
    }

    if (endpoint === '/auth/signup' && method === 'POST') {
      const token = 'mock-jwt-token';
      this.setAuthToken(token);
      return {
        ok: true,
        data: {
          token,
          user: {
            id: '2',
            name: body.name,
            email: body.email,
            phoneNumber: body.phoneNumber,
            credits: 0,
            createdAt: new Date().toISOString()
          }
        } as T
      };
    }

    if (endpoint === '/dashboard/summary' && method === 'GET') {
      return {
        ok: true,
        data: {
          protectedPercentage: 92.3,
          blockedCount: 125,
          attemptsDetected: 143,
          credits: 85,
          history: [
            {
              id: '1',
              url: 'https://phishy-bank.com/login',
              score: 92,
              visitedAt: '2024-09-26T13:04:00Z',
              status: 'dangerous'
            },
            {
              id: '2',
              url: 'https://legitimate-site.com',
              score: 15,
              visitedAt: '2024-09-26T12:30:00Z',
              status: 'safe'
            },
            {
              id: '3',
              url: 'https://suspicious-link.net',
              score: 65,
              visitedAt: '2024-09-26T11:45:00Z',
              status: 'suspicious'
            }
          ],
          carouselTips: [
            "Never share your OTP with anyone",
            "Always check the sender's email domain",
            "Hover over links before clicking to see the real URL",
            "Be cautious of urgent messages requesting personal info",
            "Use two-factor authentication whenever possible"
          ]
        } as T
      };
    }

    if (endpoint.startsWith('/quiz') && method === 'GET') {
      return {
        ok: true,
        data: [
          {
            id: '1',
            question: 'What should you do if you receive an urgent email asking for your password?',
            options: [
              'Reply immediately with your password',
              'Ignore the email and verify through official channels',
              'Forward it to your friends',
              'Click on any links to verify'
            ],
            correctOptionId: 1,
            explanation: 'Never share passwords via email. Always verify through official channels like calling the company directly.'
          },
          {
            id: '2',
            question: 'Which of these URLs is most likely to be a phishing attempt?',
            options: [
              'https://amazon.com/account',
              'https://arnazon.com/account',
              'https://www.amazon.com/login',
              'https://smile.amazon.com'
            ],
            correctOptionId: 1,
            explanation: 'The second URL uses "arnazon" instead of "amazon" - a common phishing technique called typosquatting.'
          }
        ] as T
      };
    }

    if (endpoint === '/quiz/submit' && method === 'POST') {
      const correctAnswers = Math.floor(Math.random() * 5) + 1;
      return {
        ok: true,
        data: {
          score: (correctAnswers / 5) * 100,
          correctAnswers,
          totalQuestions: 5,
          creditsEarned: correctAnswers * 10
        } as T
      };
    }

    if (endpoint === '/user/me' && method === 'GET') {
      return {
        ok: true,
        data: {
          id: '1',
          name: 'John Doe',
          email: 'user@phishshield.ai',
          phoneNumber: '+1234567890',
          credits: 125,
          createdAt: '2024-01-15T10:00:00Z'
        } as T
      };
    }

    if (endpoint === '/chat' && method === 'POST') {
      const responses = [
        "I can help you identify potential phishing attempts. Can you share the suspicious link or email?",
        "That looks like a legitimate website, but always verify the URL carefully.",
        "This appears to be a phishing attempt. Notice the misspelled domain name.",
        "Great question! Always be cautious of emails asking for personal information."
      ];
      
      return {
        ok: true,
        data: {
          message: responses[Math.floor(Math.random() * responses.length)]
        } as T
      };
    }

    return { ok: false, error: 'Endpoint not found' };
  }

  // Auth methods
  async login(credentials: LoginRequest): Promise<ApiResponse<{ token: string; user: User }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async signup(userData: SignupRequest): Promise<ApiResponse<{ token: string; user: User }>> {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<void> {
    this.removeAuthToken();
  }

  // Dashboard methods
  async getDashboardData(): Promise<ApiResponse<DashboardData>> {
    return this.request('/dashboard/summary');
  }

  // Quiz methods
  async getQuizQuestions(count: number = 5): Promise<ApiResponse<QuizQuestion[]>> {
    return this.request(`/quiz?count=${count}`);
  }

  async submitQuizResults(answers: Record<string, number>): Promise<ApiResponse<QuizResult>> {
    return this.request('/quiz/submit', {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  }

  // User methods
  async getUserProfile(): Promise<ApiResponse<User>> {
    return this.request('/user/me');
  }

  async updateUserProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request('/user/me', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Chat methods
  async sendChatMessage(message: string): Promise<ApiResponse<{ message: string }>> {
    return this.request('/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  // Helper method to check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}

export const apiClient = new ApiClient();
export type { User, DashboardData, HistoryItem, QuizQuestion, QuizResult, ApiResponse };