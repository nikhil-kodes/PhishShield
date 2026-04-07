import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  ShieldAlert, 
  MonitorPlay, 
  Settings2, 
  AlertTriangle, 
  CheckCircle2, 
  Activity,
  ChevronRight,
  Globe,
  Database
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type PopupState = 'safe' | 'threat' | 'scanning';

interface PredictionData {
  url: string;
  score: number; // 0 to 100
  type: string;
  threats?: string[];
  lastChecked?: string;
  domainAge?: string;
}

export const ExtensionPopupPreview = () => {
  const [state, setState] = useState<PopupState>('threat');
  const [prediction, setPrediction] = useState<PredictionData>({
    url: 'https://github.com/phishshield',
    score: 99.8,
    type: 'verified',
    domainAge: '8 years'
  });

  // Effect to handle state mock data
  useEffect(() => {
    if (state === 'safe') {
      setPrediction({
        url: 'https://github.com/phishshield',
        score: 99.8,
        type: 'Safe',
        domainAge: '8 years',
        lastChecked: 'Just now'
      });
    } else if (state === 'threat') {
      setPrediction({
        url: 'hxxps://paypa1-secure[.]com',
        score: 1.2, // Very low score means threat
        type: 'Phishing',
        threats: ['PayPal Impersonation', 'Typosquatting', '14 Threat Feeds'],
        domainAge: '3 days',
        lastChecked: '2s ago'
      });
    }
  }, [state]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 90) return 'bg-emerald-500/10 border-emerald-500/20';
    if (score >= 60) return 'bg-amber-500/10 border-amber-500/20';
    return 'bg-red-500/10 border-red-500/20';
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-zinc-100 dark:bg-[#060608] min-h-screen">
      
      {/* Simulation Controls */}
      <Card className="mb-10 p-1 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-border flex gap-1">
        {['safe', 'threat', 'scanning'].map((s) => (
          <button 
            key={s} 
            onClick={() => setState(s as PopupState)}
            className={`px-4 py-1.5 text-xs rounded-md capitalize font-mono font-bold transition-all ${state === s ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {s}
          </button>
        ))}
      </Card>

      {/* EXTENSION CONTAINER */}
      <div className="relative w-[320px] h-[520px] bg-[#09090b] text-zinc-100 rounded-[24px] overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-zinc-800">
        
        {/* Header */}
        <div className="p-4 flex justify-between items-center bg-zinc-900/50 border-b border-zinc-800/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              PhishShield <span className="text-zinc-600">v2.4</span>
            </span>
          </div>
          <Settings2 className="w-4 h-4 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
        </div>

        {/* Prediction Status & Score Badge */}
        <div className="w-full px-4 py-3 bg-zinc-900/30 border-b border-zinc-900">
           <div className={`p-2 rounded-xl border flex items-center justify-between ${getScoreBackground(prediction.score)}`}>
              <div className="flex items-center gap-2">
                 <Activity className={`w-3 h-3 ${getScoreColor(prediction.score)}`} />
                 <span className="text-[10px] font-mono font-bold uppercase tracking-tighter text-zinc-300">AI Trust Score</span>
              </div>
              <span className={`font-mono font-black text-sm ${getScoreColor(prediction.score)}`}>
                {prediction.score}%
              </span>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            
            {state === 'scanning' ? (
              <motion.div 
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full p-8"
              >
                <div className="w-full max-w-[200px] h-[100px] bg-zinc-900/50 border border-zinc-800 rounded-2xl relative overflow-hidden flex items-center justify-center">
                   <div className="relative">
                      <Globe className="w-12 h-12 text-zinc-700 animate-pulse" />
                      <div className="absolute inset-x-[-20%] top-1/2 h-[1px] bg-primary shadow-[0_0_15px_#3b82f6] animate-scan" />
                   </div>
                   <motion.div 
                      animate={{ y: [0, 80, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-blue-500/20 to-transparent pointer-events-none"
                   />
                </div>
                <h3 className="mt-8 font-mono text-sm font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                   Analysing URL
                   <span className="flex gap-0.5">
                      <span className="w-1 h-1 bg-blue-400 animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1 h-1 bg-blue-400 animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1 h-1 bg-blue-400 animate-bounce"></span>
                   </span>
                </h3>
                <p className="mt-2 text-[10px] text-zinc-500 uppercase font-mono tracking-tight">Cross-referencing 47 threat feeds...</p>
              </motion.div>
            ) : (
              <motion.div 
                key={state}
                initial={{ opacity: 0, scale: 0.98, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -5 }}
                className="flex-1 flex flex-col p-5"
              >
                {/* Visual Header */}
                <div className="flex flex-col items-center text-center mt-4 mb-8">
                   <div className={`relative w-20 h-20 rounded-full flex items-center justify-center mb-4 overflow-hidden`}>
                      <div className={`absolute inset-0 opacity-20 ${state === 'safe' ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`} />
                      {state === 'safe' ? (
                        <ShieldCheck className="w-12 h-12 text-emerald-500 relative z-10 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                      ) : (
                        <ShieldAlert className="w-12 h-12 text-red-500 relative z-10 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                      )}
                   </div>
                   <h2 className={`text-xl font-black uppercase tracking-tight ${state === 'safe' ? 'text-white' : 'text-red-500'}`}>
                      {state === 'safe' ? "Endpoint Rooted" : "Threat Blocked"}
                   </h2>
                   <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">
                      {state === 'safe' ? "Security verified by AI Agent" : "Malicious activity confirmed"}
                   </p>
                </div>

                {/* URL Display */}
                <div className="bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl mb-6 flex flex-col gap-1 overflow-hidden group">
                   <span className="text-[9px] uppercase font-mono font-bold text-zinc-600">Current URL</span>
                   <div className={`font-mono text-[11px] truncate ${state === 'safe' ? 'text-zinc-400' : 'text-red-400'}`}>
                      {prediction.url}
                   </div>
                </div>

                {/* Telemetry Grid */}
                <div className="grid grid-cols-2 gap-2 mb-auto">
                   <div className="bg-zinc-900/30 border border-zinc-900 p-2.5 rounded-xl flex flex-col gap-1">
                      <span className="text-[8px] uppercase font-mono font-bold text-zinc-600">Status</span>
                      <div className="flex items-center gap-1.5">
                         <div className={`w-1.5 h-1.5 rounded-full ${state === 'safe' ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`} />
                         <span className="text-xs font-mono font-black uppercase tracking-tighter">
                            {state === 'safe' ? 'Secure' : 'Critical'}
                         </span>
                      </div>
                   </div>
                   <div className="bg-zinc-900/30 border border-zinc-900 p-2.5 rounded-xl flex flex-col gap-1">
                      <span className="text-[8px] uppercase font-mono font-bold text-zinc-600">Domain Age</span>
                      <span className="text-xs font-mono font-black uppercase tracking-tighter text-zinc-300">
                         {prediction.domainAge}
                      </span>
                   </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col gap-2 pb-2">
                  {state === 'safe' ? (
                    <>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white uppercase font-black text-xs h-11 tracking-widest">Re-Scan Asset</Button>
                      <Button variant="ghost" className="w-full text-red-500/70 hover:text-red-500 hover:bg-red-500/10 text-[10px] font-mono h-8 uppercase">Report as False Positive</Button>
                    </>
                  ) : (
                    <>
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white uppercase font-black text-xs h-11 tracking-widest shadow-[0_10px_20px_rgba(220,38,38,0.2)]">Quarantine & EXIT</Button>
                      <Button variant="ghost" className="w-full text-zinc-600 hover:text-zinc-400 text-[10px] font-mono h-8 uppercase">Proceed (Unsafe)</Button>
                    </>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-zinc-950 border-t border-zinc-900 flex justify-between items-center text-[8px] font-mono uppercase tracking-[0.1em] text-zinc-600 font-bold">
           <div className="flex items-center gap-1">
              <Database className="w-2 h-2" />
              Dataset v14.0.1
           </div>
           <div className="flex items-center gap-1">
              <Activity className="w-2 h-2" />
              Live Monitoring
           </div>
        </div>
      </div>
      
      {/* Visual Glitch Component for Background (Optional Cyber Effect) */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </div>
  );
};
import { Card } from '@/components/ui/card';
