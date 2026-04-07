import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Menu, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { HeroOdyssey, FeatureItem, ElasticHueSlider } from '@/components/ui/hero-odyssey';

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const HeroSection = () => {
  const [hue, setHue] = useState(210);

  return (
    <HeroOdyssey hue={hue} className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background">
       {/* Background overlays */}
       <div className="absolute inset-0 bg-transparent dark:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#09090b]/80 to-[#09090b] pointer-events-none" />

       {/* FEATURE PILLS */}
       <FeatureItem className="absolute top-24 left-8" label="AI Threat Engine" value="Active" />
       <FeatureItem className="absolute top-24 right-8" label="Zero-Day Detection" value="99.97%" />
       <FeatureItem className="absolute bottom-24 left-8" label="< 50ms Response" value="Ultra-low latency" />
       <FeatureItem className="absolute bottom-24 right-8" label="SOC2 Compliant" value="Certified" />

       {/* Subtle Corner Control */}
       <div className="absolute bottom-8 right-8 z-50">
         <Sheet>
           <SheetTrigger asChild>
             <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white rounded-full bg-white/5 dark:bg-black/20 backdrop-blur-md border border-white/10">
               <Settings2 className="w-4 h-4" />
             </Button>
           </SheetTrigger>
           <SheetContent side="bottom" className="w-full max-w-sm mx-auto sm:right-8 sm:bottom-20 sm:left-auto sm:top-auto mb-4 rounded-xl border border-white/10 bg-white dark:bg-black/80 backdrop-blur-xl">
             <div className="p-4 flex flex-col space-y-4">
               <h3 className="text-sm font-medium text-foreground dark:text-white">Customize Background</h3>
               <ElasticHueSlider value={hue} onChange={setHue} />
             </div>
           </SheetContent>
         </Sheet>
       </div>



       {/* HERO CONTENT */}
       <motion.div 
         variants={staggerContainer}
         initial="hidden"
         animate="show"
         className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto mt-20"
       >
         <motion.div variants={fadeUp}>
           <Badge variant="outline" className="mb-8 border-white/10 bg-white/5 dark:bg-black/40 backdrop-blur-md px-4 py-1.5 text-sm gap-2 text-foreground dark:text-zinc-200">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             Now detecting 99.97% of phishing attempts
           </Badge>
         </motion.div>

         <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-light tracking-tight text-foreground dark:text-white mb-6 leading-tight">
           Stop Phishing.
           <br className="hidden md:block" />
           <span className="md:hidden"> </span>
           <span className="font-medium text-foreground/80 dark:text-zinc-300">Before It Starts.</span>
         </motion.h1>

         <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground dark:text-zinc-400 max-w-2xl mb-10">
           Real-time AI threat detection for your browser, inbox, and team — with zero false positives.
         </motion.p>

         <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
           <Link to="/signup" className="w-full sm:w-auto">
             <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg font-bold shadow-2xl hover:shadow-blue-500/20 transition-all">
               Start Free Trial
             </Button>
           </Link>
           <Link to="/pricing" className="w-full sm:w-auto">
             <Button variant="ghost" className="w-full sm:w-auto rounded-full px-8 py-6 text-lg text-foreground dark:text-white border border-white/10 bg-white/5 dark:bg-black/20 hover:bg-black/5 dark:hover:bg-white/10 group">
               See How It Works
               <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
             </Button>
           </Link>
         </motion.div>

         {/* Social Proof */}
         <motion.div variants={fadeUp} className="flex flex-col items-center gap-4">
           <div className="flex -space-x-3">
             {[1, 2, 3, 4, 5].map((i) => (
               <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-[#09090b] overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user avatar" className="w-full h-full object-cover opacity-80" />
               </div>
             ))}
           </div>
           <p className="text-sm font-mono text-muted-foreground dark:text-zinc-500">
             Trusted by 24,000+ security teams
           </p>
         </motion.div>
       </motion.div>
    </HeroOdyssey>
  );
};
