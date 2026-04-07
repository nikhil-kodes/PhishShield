import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Sun, 
  Moon, 
  Menu, 
  ChevronDown,
  Globe,
  Mail,
  Users,
  Code,
  ArrowRight,
  LogOut,
  LayoutDashboard,
  User as UserIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const getUserInitials = (name?: string) => {
    if (!name) return 'PS';
    try {
      return name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase();
    } catch (e) {
      return 'PS';
    }
  };

  const navLinks = [
    { name: 'Pricing', path: '/pricing' },
    { name: 'Docs', path: '/docs' },
    { name: 'Changelog', path: '/changelog' },
  ];

  const productFeatures = [
    { icon: Globe, title: 'Browser Extension', description: 'Real-time phishing detection', path: '/product/browser' },
    { icon: Mail, title: 'Email Shield', description: 'Protect your inbox', path: '/product/email' },
    { icon: Users, title: 'Team Dashboard', description: 'Monitor threats across your organisation', path: '/product/team' },
    { icon: Code, title: 'API Access', description: 'Integrate PhishShield into your own stack', path: '/product/api' }
  ];

  const isHome = location.pathname === '/';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] h-[64px] w-full flex items-center transition-all duration-500 ${
        (scrolled || !isHome)
          ? 'bg-background/80 backdrop-blur-xl border-b border-border py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 w-full flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <ShieldCheck className="w-6 h-6 text-blue-500 transition-transform group-hover:scale-110" />
          <span className={`font-mono font-black text-sm uppercase tracking-[0.2em] transition-colors ${
            (scrolled || !isHome) ? 'text-foreground' : 'text-white'
          }`}>
            PhishShield
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-8">
          <div 
            className="relative"
            onMouseEnter={() => setProductOpen(true)}
            onMouseLeave={() => setProductOpen(false)}
          >
            <button className={`flex items-center gap-1 text-[13px] font-bold uppercase tracking-wider transition-colors ${
              (scrolled || !isHome) ? 'text-muted-foreground hover:text-foreground' : 'text-white/70 hover:text-white'
            }`}>
              Platform <ChevronDown className={`w-3 h-3 transition-transform ${productOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {productOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-4 w-[480px] p-2 bg-background border border-border rounded-2xl shadow-2xl grid grid-cols-2 gap-2"
                >
                  {productFeatures.map((f, i) => (
                    <Link key={i} to={f.path} className="group flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-all">
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all"><f.icon className="w-5 h-5" /></div>
                      <div>
                        <div className="text-[13px] font-bold text-foreground">{f.title}</div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{f.description}</p>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`text-[13px] font-bold uppercase tracking-wider transition-colors ${
                (scrolled || !isHome) 
                  ? (location.pathname === link.path ? 'text-blue-500' : 'text-muted-foreground hover:text-foreground')
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* DESKTOP RIGHT ACTIONS */}
        <div className="hidden lg:flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-full ${
              (scrolled || !isHome) ? 'text-foreground' : 'text-white hover:bg-white/10'
            }`}
          >
            {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 pl-2 focus:outline-none group">
                  <div className="h-8 w-[1px] bg-border/50 mr-2" />
                  <Avatar className="h-8 w-8 border-2 border-blue-500/20 group-hover:border-blue-500 transition-all">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-blue-600 text-white text-[10px] font-black">
                      {getUserInitials(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 bg-background border-border rounded-xl">
                <DropdownMenuLabel className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground pb-1">Account</DropdownMenuLabel>
                <div className="flex items-center gap-3 p-2 mb-2">
                   <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground leading-none">{user.name}</span>
                      <span className="text-[10px] text-muted-foreground mt-1 truncate max-w-[140px] italic">{user.email}</span>
                   </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')} className="rounded-lg gap-2 cursor-pointer font-bold py-2.5">
                  <LayoutDashboard className="w-4 h-4 text-blue-500" /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')} className="rounded-lg gap-2 cursor-pointer font-bold py-2.5">
                  <UserIcon className="w-4 h-4 text-zinc-500" /> Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="rounded-lg gap-2 cursor-pointer font-bold py-2.5 text-red-500 focus:text-red-500">
                  <LogOut className="w-4 h-4" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className={`text-[13px] font-bold uppercase tracking-wider h-9 ${
                  (scrolled || !isHome) ? 'text-foreground' : 'text-white'
                }`}>Login</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 h-9 text-[12px] font-black uppercase tracking-widest shadow-xl">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE NAVIGATION */}
        <div className="lg:hidden flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className={ (scrolled || !isHome) ? 'text-foreground' : 'text-white' }>
            {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={ (scrolled || !isHome) ? 'text-foreground' : 'text-white' }><Menu className="w-5 h-5" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full bg-background flex flex-col p-8">
              <div className="flex flex-col gap-8 mt-12 flex-1">
                {isAuthenticated && user && (
                   <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-2xl border border-border">
                      <Avatar className="h-12 w-12 border-2 border-blue-500">
                         <AvatarFallback className="bg-blue-600 text-white font-black">{getUserInitials(user?.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                         <span className="font-black text-foreground uppercase tracking-tight">{user.name}</span>
                         <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                   </div>
                )}
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link key={link.path} to={link.path} className="text-2xl font-black uppercase tracking-tighter text-foreground hover:text-blue-500">{link.name}</Link>
                  ))}
                  {isAuthenticated && (
                     <Link to="/dashboard" className="text-2xl font-black uppercase tracking-tighter text-blue-500">Dashboard</Link>
                  )}
                </div>

                <div className="mt-auto flex flex-col gap-4">
                  {isAuthenticated ? (
                    <Button onClick={() => logout()} variant="outline" className="w-full h-14 text-lg font-bold uppercase tracking-widest border-2 text-red-500 border-red-500/20">Sign Out</Button>
                  ) : (
                    <>
                      <Link to="/login" className="w-full"><Button variant="outline" className="w-full h-14 text-lg font-bold uppercase tracking-widest border-2">Login</Button></Link>
                      <Link to="/signup" className="w-full"><Button className="w-full h-14 text-lg font-bold uppercase tracking-widest bg-blue-600">Get Started</Button></Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
