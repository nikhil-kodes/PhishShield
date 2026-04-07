import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, ShieldCheck, Loader2, CheckCircle, X, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number'),
  phoneNumber: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isAuthenticated, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const password = watch('password');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data: SignupFormData) => {
    await signup({
      name: data.name,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
    });
  };

  const passwordChecks = [
    { label: 'At least 8 characters', valid: password?.length >= 8 },
    { label: 'One uppercase letter', valid: /[A-Z]/.test(password || '') },
    { label: 'One lowercase letter', valid: /[a-z]/.test(password || '') },
    { label: 'One number', valid: /\d/.test(password || '') },
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background dark:bg-[#09090b]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-background dark:bg-[#09090b] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <span className="text-2xl font-mono font-bold tracking-tighter text-foreground">
              PhishShield
            </span>
          </div>
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest text-center">
            Create Security Profile
          </p>
        </div>

        <Card className="border border-border bg-card/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold tracking-tight">Sign Up</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Begin your real-time phish-protection journey
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs uppercase font-mono tracking-wider font-semibold text-muted-foreground">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register('name')}
                  className={`bg-background/50 border-border focus:border-primary transition-all ${errors.name ? 'border-destructive' : ''}`}
                />
                {errors.name && (
                  <p className="text-[10px] uppercase font-mono font-bold text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase font-mono tracking-wider font-semibold text-muted-foreground">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register('email')}
                  className={`bg-background/50 border-border focus:border-primary transition-all ${errors.email ? 'border-destructive' : ''}`}
                />
                {errors.email && (
                  <p className="text-[10px] uppercase font-mono font-bold text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-xs uppercase font-mono tracking-wider font-semibold text-muted-foreground">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  {...register('phoneNumber')}
                  className={`bg-background/50 border-border focus:border-primary transition-all ${errors.phoneNumber ? 'border-destructive' : ''}`}
                />
                {errors.phoneNumber && (
                  <p className="text-[10px] uppercase font-mono font-bold text-destructive">{errors.phoneNumber.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs uppercase font-mono tracking-wider font-semibold text-muted-foreground">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password')}
                    className={`bg-background/50 border-border focus:border-primary transition-all pr-10 ${errors.password ? 'border-destructive' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[10px] uppercase font-mono font-bold text-destructive">{errors.password.message}</p>
                )}
                
                {/* Password strength and hint */}
                {password && (
                  <div className="grid grid-cols-2 gap-1 mt-2">
                    {passwordChecks.map((check, index) => (
                      <div key={index} className="flex items-center gap-1.5 text-[9px] uppercase font-mono tracking-tighter">
                        {check.valid ? (
                          <CheckCircle className="h-2.5 w-2.5 text-success" />
                        ) : (
                          <X className="h-2.5 w-2.5 text-muted-foreground/30" />
                        )}
                        <span className={check.valid ? 'text-success font-bold' : 'text-muted-foreground/50'}>
                          {check.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 uppercase"
                size="lg"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  'Establish Secure Account'
                )}
              </Button>

              <div className="text-center mt-6">
                <p className="text-xs text-muted-foreground">
                  Already secured?{' '}
                  <Link
                    to="/login"
                    className="text-primary font-bold hover:underline transition-all"
                  >
                    Return to Login
                  </Link>
                </p>
              </div>

              <div className="text-[9px] text-muted-foreground/50 text-center uppercase tracking-widest font-mono pt-4 border-t border-border/50">
                Data protected with military-grade encryption
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}