import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Loader2, 
  Globe, 
  Lock, 
  Server,
  Activity,
  History,
  Copy,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function URLScannerPage() {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<{ score: number, status: string, details: string[] } | null>(null);

  const handleScan = () => {
    if (!url) return;
    setScanning(true);
    setResult(null);
    
    // Simulations
    setTimeout(() => {
      const isSuspicious = url.includes('bit.ly') || url.includes('tinyurl') || url.includes('verify');
      setResult({
        score: isSuspicious ? Math.floor(Math.random() * 40) : 95 + Math.floor(Math.random() * 5),
        status: isSuspicious ? 'DANGEROUS' : 'SECURE',
        details: [
          'Domain Age: 1.4 years',
          'SSL Certificate: Valid (DigiCert)',
          'Origin: North America',
          'Database Sync: Neutral Match'
        ]
      });
      setScanning(false);
    }, 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
           <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground leading-none">Security Scanner</h1>
           <p className="text-muted-foreground mt-2 font-mono text-xs uppercase tracking-widest">Isolated URL Vulnerability Analysis</p>
        </div>
      </header>

      {/* SCANNER INPUT */}
      <Card className="p-10 border-2 border-border/80 bg-background/50 shadow-2xl relative overflow-hidden backdrop-blur-xl group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="max-w-3xl mx-auto space-y-8 text-center relative z-10">
           <div className="flex flex-col items-center gap-4">
              <div className={`p-4 rounded-2xl ${scanning ? 'bg-blue-500/10' : 'bg-muted'} transition-colors`}>
                 <Globe className={`w-8 h-8 ${scanning ? 'text-blue-500 animate-spin' : 'text-foreground'}`} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">Analyse Global Domain</h2>
              <p className="text-muted-foreground text-sm max-w-sm font-medium">Verify any URL via our AI-powered threat intelligence layer before interacting.</p>
           </div>

           <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                 <Input 
                   placeholder="https://example-site.com/secure-login"
                   className={`pl-12 h-14 bg-background border-2 font-mono text-xs transition-all ${scanning ? 'opacity-50' : ''}`}
                   value={url}
                   onChange={(e) => setUrl(e.target.value)}
                   disabled={scanning}
                 />
              </div>
              <Button 
                onClick={handleScan}
                disabled={scanning}
                className="h-14 px-10 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs tracking-widest shadow-xl disabled:opacity-50"
              >
                {scanning ? 'Analysing Signature...' : 'Initialise Scan'}
              </Button>
           </div>
        </div>
      </Card>

      {/* RESULTS DISPLAY */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
           <Card className={`p-8 flex flex-col items-center justify-center relative overflow-hidden border-2 ${result.score < 50 ? 'border-red-500' : 'border-emerald-500'}`}>
              <div className={`absolute top-0 left-0 w-full h-1 ${result.score < 50 ? 'bg-red-500' : 'bg-emerald-500'}`} />
              <h3 className="font-black uppercase tracking-widest text-[10px] text-muted-foreground mb-8 self-start flex items-center gap-2">
                 {result.score < 50 ? <ShieldAlert className="w-4 h-4 text-red-500" /> : <ShieldCheck className="w-4 h-4 text-emerald-500" />} Integrity Result
              </h3>
              
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="10" className="text-zinc-100 dark:text-zinc-900" />
                  <circle 
                    cx="50" cy="50" r="44" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="10" 
                    strokeDasharray={`${276 * result.score / 100} 276`} 
                    strokeLinecap="round" 
                    className={result.score < 50 ? 'text-red-500' : 'text-emerald-500'}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-mono text-5xl font-black tracking-tighter text-foreground">{result.score}</span>
                  <span className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.3em] -mt-1 ml-1">% TRUST</span>
                </div>
              </div>
              
              <div className="mt-10 px-6 py-2 bg-muted rounded-full font-mono text-[10px] font-black uppercase text-foreground">
                 STATUS: {result.status}
              </div>
           </Card>

           <Card className="lg:col-span-2 p-8 border-border/60 bg-background space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                 <h3 className="font-black uppercase tracking-tight text-sm flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-500" /> Security Intelligence Report
                 </h3>
                 <Button variant="ghost" size="sm" className="h-8 text-[10px] uppercase font-black tracking-widest"><Copy className="w-3 h-3 mr-2" /> Copy Protocol ID</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-4">
                    <div className="text-[10px] font-mono font-black uppercase tracking-widest text-muted-foreground">Domain Fingerprint</div>
                    <div className="space-y-3">
                       {result.details.map((d, i) => (
                         <div key={i} className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl border border-border">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                            <span className="text-[11px] font-bold text-foreground uppercase tracking-tight font-mono">{d}</span>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="text-[10px] font-mono font-black uppercase tracking-widest text-muted-foreground">Reputation Database</div>
                    <div className="space-y-3">
                       <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-xl border border-border">
                          <Lock className="w-4 h-4 text-emerald-500" />
                          <span className="text-[11px] font-bold text-muted-foreground uppercase flex-1">Google Safe Browsing</span>
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                       </div>
                       <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-xl border border-border">
                          <Server className="w-4 h-4 text-emerald-500" />
                          <span className="text-[11px] font-bold text-muted-foreground uppercase flex-1">VirusTotal Aggregate</span>
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                       </div>
                       <div className="flex items-center gap-3 p-3 bg-red-500/5 rounded-xl border border-red-500/20">
                          <History className="w-4 h-4 text-red-500" />
                          <span className="text-[11px] font-bold text-red-500 uppercase flex-1">Suspect Pattern Match</span>
                          <AlertTriangle className="w-3 h-3 text-red-500" />
                       </div>
                    </div>
                 </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border flex justify-end">
                 <Button className="font-black uppercase text-[10px] tracking-widest bg-muted text-foreground hover:bg-muted/80">
                    Advance Isolation <ChevronRight className="w-3 h-3 ml-2" />
                 </Button>
              </div>
           </Card>
        </div>
      )}
    </div>
  );
}
