import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Twitter, Github, Linkedin, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const FooterSection = () => {
  return (
    <footer className="w-full relative overflow-hidden bg-background">
      
      {/* Animated Glow Border */}
      <div className="absolute top-0 left-0 right-0 h-px hidden dark:block bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px block dark:hidden bg-zinc-200" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-[1280px] mx-auto px-6 py-16 lg:py-24"
      >
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-6 h-6 text-blue-500" />
              <span className="font-mono font-bold text-lg text-foreground">PhishShield</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Real-time phishing protection for the modern web. Detecting zero-day threats in under 50ms across your entire organization.
            </p>
            <div className="flex gap-2 mb-8">
              <Badge variant="outline" className="text-xs bg-muted/50 border-border text-muted-foreground">SOC2 Certified</Badge>
              <Badge variant="outline" className="text-xs bg-muted/50 border-border text-muted-foreground">GDPR Compliant</Badge>
            </div>
            <p className="text-xs font-mono text-muted-foreground opacity-70 mt-auto hidden lg:block">
              © {new Date().getFullYear()} PhishShield Inc. All rights reserved.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16 w-full lg:w-auto">
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-foreground text-sm">Product</h4>
              <nav className="flex flex-col gap-3 text-sm text-muted-foreground">
                <a href="#" className="hover:text-blue-500 transition-colors">Extension</a>
                <a href="#" className="hover:text-blue-500 transition-colors">Email Shield</a>
                <a href="#" className="hover:text-blue-500 transition-colors">Dashboard</a>
                <a href="#" className="hover:text-blue-500 transition-colors">API Access</a>
                <a href="#" className="hover:text-blue-500 transition-colors">Changelog</a>
              </nav>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-foreground text-sm">Company</h4>
              <nav className="flex flex-col gap-3 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">About Us</a>
                <a href="#" className="hover:text-foreground transition-colors">Blog</a>
                <a href="#" className="hover:text-foreground transition-colors">Press</a>
                <a href="#" className="hover:text-foreground transition-colors">Careers</a>
                <a href="#" className="hover:text-foreground transition-colors">Security</a>
              </nav>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-foreground text-sm">Resources</h4>
              <nav className="flex flex-col gap-3 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
                <a href="#" className="hover:text-foreground transition-colors">Status Page</a>
                <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-foreground transition-colors">Bug Bounty</a>
              </nav>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-foreground text-sm">Connect</h4>
              <div className="flex flex-wrap gap-3">
                <a href="#" className="p-2 rounded-md bg-muted/50 border border-border text-muted-foreground hover:text-foreground hover:border-blue-500/50 transition-colors tooltip" aria-label="Twitter / X">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-md bg-muted/50 border border-border text-muted-foreground hover:text-foreground hover:border-zinc-500/50 transition-colors" aria-label="GitHub">
                  <Github className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-md bg-muted/50 border border-border text-muted-foreground hover:text-foreground hover:border-blue-500/50 transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-md bg-muted/50 border border-border text-muted-foreground hover:text-foreground hover:border-[#5865F2]/50 transition-colors" aria-label="Discord">
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-mono text-muted-foreground opacity-70 block lg:hidden">
            © {new Date().getFullYear()} PhishShield Inc. All rights reserved.
          </p>
          
          <div className="text-xs text-muted-foreground font-mono">
            Built with <span className="text-red-500">❤️</span> for the open web
          </div>

          <a href="#" className="flex items-center gap-2 text-xs font-mono font-medium text-muted-foreground hover:text-foreground bg-muted/30 px-3 py-1.5 rounded-full border border-border transition-colors">
            System Status: 
            <span className="flex items-center text-emerald-500 gap-1 ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All systems operational
            </span>
          </a>
        </div>
      </motion.div>
    </footer>
  );
};
