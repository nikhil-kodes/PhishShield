import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Camera, 
  Save,
  Eye,
  EyeOff,
  Award,
  Shield
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { toast } from 'react-hot-toast';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors, isSubmitting: isSubmittingProfile },
    reset: resetProfile,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isSubmitting: isSubmittingPassword },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmitProfile = async (data: ProfileFormData) => {
    try {
      await updateUser(data);
      setIsEditingProfile(false);
      resetProfile(data);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const onSubmitPassword = async (data: PasswordFormData) => {
    try {
      // In a real app, this would call an API endpoint to change the password
      toast.success('Password changed successfully');
      setIsChangingPassword(false);
      resetPassword();
    } catch (error) {
      toast.error('Failed to change password');
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="text-2xl bg-gradient-primary text-white">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-xl">{user?.name}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="font-medium">Credits</span>
                  </div>
                  <span className="text-lg font-bold text-primary">{user?.credits || 0}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-success" />
                    <span className="font-medium">Protected</span>
                  </div>
                  <span className="text-lg font-bold text-success">99.9%</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal details and contact information
                    </CardDescription>
                  </div>
                  {!isEditingProfile && (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditingProfile(true)}
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          {...registerProfile('name')}
                          disabled={!isEditingProfile}
                          className={`pl-10 ${profileErrors.name ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {profileErrors.name && (
                        <p className="text-sm text-destructive">{profileErrors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          {...registerProfile('email')}
                          disabled={!isEditingProfile}
                          className={`pl-10 ${profileErrors.email ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {profileErrors.email && (
                        <p className="text-sm text-destructive">{profileErrors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phoneNumber"
                        type="tel"
                        {...registerProfile('phoneNumber')}
                        disabled={!isEditingProfile}
                        className={`pl-10 ${profileErrors.phoneNumber ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {profileErrors.phoneNumber && (
                      <p className="text-sm text-destructive">{profileErrors.phoneNumber.message}</p>
                    )}
                  </div>

                  {isEditingProfile && (
                    <div className="flex gap-2 pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmittingProfile}
                        className="bg-gradient-primary text-white"
                      >
                        {isSubmittingProfile ? (
                          'Saving...'
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditingProfile(false);
                          resetProfile();
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Password Change */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Password & Security
                    </CardTitle>
                    <CardDescription>
                      Change your password to keep your account secure
                    </CardDescription>
                  </div>
                  {!isChangingPassword && (
                    <Button
                      variant="outline"
                      onClick={() => setIsChangingPassword(true)}
                    >
                      Change Password
                    </Button>
                  )}
                </div>
              </CardHeader>
              
              {isChangingPassword && (
                <CardContent>
                  <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="currentPassword"
                          type={showPasswords.current ? 'text' : 'password'}
                          {...registerPassword('currentPassword')}
                          className={`pl-10 pr-10 ${passwordErrors.currentPassword ? 'border-destructive' : ''}`}
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('current')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPasswords.current ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {passwordErrors.currentPassword && (
                        <p className="text-sm text-destructive">{passwordErrors.currentPassword.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="newPassword"
                          type={showPasswords.new ? 'text' : 'password'}
                          {...registerPassword('newPassword')}
                          className={`pl-10 pr-10 ${passwordErrors.newPassword ? 'border-destructive' : ''}`}
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('new')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPasswords.new ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {passwordErrors.newPassword && (
                        <p className="text-sm text-destructive">{passwordErrors.newPassword.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showPasswords.confirm ? 'text' : 'password'}
                          {...registerPassword('confirmPassword')}
                          className={`pl-10 pr-10 ${passwordErrors.confirmPassword ? 'border-destructive' : ''}`}
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('confirm')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPasswords.confirm ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {passwordErrors.confirmPassword && (
                        <p className="text-sm text-destructive">{passwordErrors.confirmPassword.message}</p>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmittingPassword}
                        className="bg-gradient-primary text-white"
                      >
                        {isSubmittingPassword ? (
                          'Changing...'
                        ) : (
                          'Change Password'
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsChangingPassword(false);
                          resetPassword();
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}