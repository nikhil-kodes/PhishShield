import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  Globe, 
  Database, 
  Map as MapIcon, 
  Maximize2, 
  Share2,
  ChevronRight,
  Zap,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function RealTimeMapPage() {
  const [threats, setThreats] = useState<any[]>([]);
  const [initializing, setInitializing] = useState(true);

  // Generate mock real-time threats
  useEffect(() => {
    const interval = setInterval(() => {
      const newThreat = {
        id: Math.random().toString(36).substr(2, 9),
        origin: ['Kiev', 'Shanghai', 'Nairobi', 'San Francisco', 'Lagos', 'Brasília'][Math.floor(Math.random() * 6)],
        target: 'PhishShield Cluster-X',
        type: ['Phishing', 'DDoS Pattern', 'SQL Injection Attempt', 'Credential Harvest'][Math.floor(Math.random() * 4)],
        severity: Math.random() > 0.7 ? 'CRITICAL' : 'HIGH',
        time: new Date().toLocaleTimeString(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20
      };
      setThreats(prev => [newThreat, ...prev].slice(0, 8));
    }, 3000);

    setTimeout(() => setInitializing(false), 2000);
    return () => clearInterval(interval);
  }, []);

  if (initializing) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-[#09090b] text-white">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500 mb-6" />
        <h2 className="text-xl font-black uppercase tracking-[0.3em] font-mono">Synchronizing Global Nodes</h2>
        <div className="mt-8 flex gap-1 animate-pulse">
           {[1,2,3,4,5].map(i => <div key={i} className="w-4 h-1 bg-blue-500/40 rounded-full" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#09090b] text-white overflow-hidden font-mono">
      
      {/* HEADER HUD */}
      <div className="h-16 flex items-center justify-between px-8 border-b border-white/5 bg-black/40 backdrop-blur-3xl z-50">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                 <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-xs uppercase tracking-widest whitespace-nowrap">Global Threat Matrix v4.2</span>
           </div>
           <div className="h-6 w-px bg-white/10" />
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">Cluster Security: ACTIVE</span>
           </div>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="ghost" size="sm" className="font-bold text-[10px] uppercase tracking-widest border border-white/5 hover:bg-white/5">
              <Maximize2 className="w-3 h-3 mr-2" /> Fullscreen Hud
           </Button>
           <Button className="bg-blue-600 hover:bg-blue-700 font-bold text-[10px] uppercase tracking-widest px-6 shadow-xl">
              <Share2 className="w-3 h-3 mr-2" /> Telemetry Stream
           </Button>
        </div>
      </div>

      <div className="flex-1 relative flex">
         
         {/* SIDEBAR FEED */}
         <div className="w-[320px] bg-black/60 border-r border-white/5 p-6 space-y-6 z-40 relative">
            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center justify-between">
               Live Incident Feed <Zap className="w-3 h-3 text-amber-500" />
            </h3>
            <div className="space-y-3">
               <AnimatePresence initial={false}>
                  {threats.map((t, i) => (
                    <motion.div 
                      key={t.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`p-4 rounded-xl border ${t.severity === 'CRITICAL' ? 'border-red-500/30 bg-red-500/5' : 'border-blue-500/20 bg-blue-500/5'} relative overflow-hidden group hover:border-white/20 transition-all`}
                    >
                      <div className="flex items-center justify-between mb-2">
                         <span className={`text-[9px] font-black uppercase tracking-widest ${t.severity === 'CRITICAL' ? 'text-red-500' : 'text-blue-500'}`}>{t.severity}</span>
                         <span className="text-[8px] text-muted-foreground uppercase">{t.time}</span>
                      </div>
                      <div className="text-sm font-black uppercase tracking-tight text-white mb-0.5">{t.type}</div>
                      <div className="text-[10px] text-muted-foreground mt-1 lowercase flex items-center justify-between">
                         <span>Origin: {t.origin}</span>
                         <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  ))}
               </AnimatePresence>
            </div>
         </div>

         {/* MAIN MAP INTERFACE */}
         <div className="flex-1 relative overflow-hidden bg-[radial-gradient(circle_at_center,_#111_0%,_#09090b_100%)]">
            {/* GRID OVERLAY */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#3b82f6 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />

            {/* MOCKED MAP SVG */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 1000 600">
               {/* Simplified World Path Mock */}
               <path d="M150,200 Q200,100 300,150 T500,200 T700,100 T850,250 T700,500 T400,450 T150,400 T150,200" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="text-blue-500" />
               <circle cx="200" cy="150" r="2" fill="#3b82f6" />
               <circle cx="450" cy="220" r="2" fill="#3b82f6" />
               <circle cx="700" cy="180" r="2" fill="#3b82f6" />
               <circle cx="550" cy="400" r="2" fill="#3b82f6" />
            </svg>

            {/* THREAT PULSES */}
            <AnimatePresence>
               {threats.map((t) => (
                 <motion.div 
                   key={`pulse-${t.id}`}
                   initial={{ scale: 0, opacity: 1 }}
                   animate={{ scale: [1, 2.5], opacity: 0 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 2, ease: "easeOut" }}
                   className={`absolute w-12 h-12 rounded-full border ${t.severity === 'CRITICAL' ? 'border-red-500' : 'border-blue-500'}`}
                   style={{ left: `${t.x}%`, top: `${t.y}%` }}
                 />
               ))}
               {threats.map((t) => (
                 <motion.div 
                   key={`dot-${t.id}`}
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   className={`absolute w-3 h-3 rounded-full ${t.severity === 'CRITICAL' ? 'bg-red-500 shadow-[0_0_15px_#ef4444]' : 'bg-blue-500 shadow-[0_0_15px_#3b82f6]'}`}
                   style={{ left: `${t.x}%`, top: `${t.y}%` }}
                 >
                    <div className="absolute top-4 left-4 p-2 bg-black/80 backdrop-blur-xl rounded border border-white/10 text-[8px] font-black uppercase whitespace-nowrap pointer-events-none">
                       {t.origin} → {t.id}
                    </div>
                 </motion.div>
               ))}
            </AnimatePresence>

            {/* MAP HUD OVERLAYS */}
            <div className="absolute top-8 right-8 space-y-4 pointer-events-none">
               <Card className="p-4 bg-black/80 border-white/5 backdrop-blur-2xl w-48">
                  <div className="text-[8px] font-black uppercase text-muted-foreground pb-2 mb-2 border-b border-white/5">System Load</div>
                  <div className="space-y-3">
                     <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-white uppercase">US-EAST-1</span>
                        <span className="text-[9px] font-mono text-emerald-500">LOW</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-white uppercase">EU-WEST-4</span>
                        <span className="text-[9px] font-mono text-amber-500">MED</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-white uppercase">AP-SOUTH-2</span>
                        <span className="text-[9px] font-mono text-emerald-500">LOW</span>
                     </div>
                  </div>
               </Card>
               <Card className="p-4 bg-black/80 border-white/5 backdrop-blur-2xl w-48">
                  <div className="text-[8px] font-black uppercase text-muted-foreground pb-2 mb-2 border-b border-white/5">Global Health</div>
                  <div className="flex items-center gap-1">
                     {[1,2,3,4,5,6,7,8,9,10].map(i => <div key={i} className={`h-4 w-1 rounded-full ${i < 9 ? 'bg-emerald-500' : 'bg-zinc-800'}`} />)}
                     <span className="ml-2 font-mono text-[10px] text-white">94%</span>
                  </div>
               </Card>
            </div>
         </div>
      </div>
    </div>
  );
}
