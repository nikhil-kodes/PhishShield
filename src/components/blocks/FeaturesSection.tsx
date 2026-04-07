import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ShieldAlert, Activity, CheckCircle2 } from 'lucide-react';
import { Area, AreaChart, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { month: 'Oct', threats: 12000, scanned: 250000 },
  { month: 'Nov', threats: 15400, scanned: 320000 },
  { month: 'Dec', threats: 18000, scanned: 380000 },
  { month: 'Jan', threats: 14200, scanned: 410000 },
  { month: 'Feb', threats: 19800, scanned: 540000 },
  { month: 'Mar', threats: 24500, scanned: 720000 }
];

export const FeaturesSection = () => {
  return (
    <section className="w-full py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-sans tracking-tight text-foreground mb-4">
            Full-spectrum protection.<br />Zero compromise.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to secure your organization from phishing attacks, neatly packaged into a single lightning-fast platform.
          </p>
        </div>

        {/* Feature Grid based on features-9.tsx style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border border-border rounded-2xl overflow-hidden bg-background">
          
          {/* PANEL 1 - Live Threat Map */}
          <div className="col-span-1 lg:col-span-2 relative min-h-[400px] flex flex-col p-8 bg-zinc-50 dark:bg-zinc-950 overflow-hidden border-b border-border">
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                 style={{ 
                   backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h2v2H1V1zm4 0h2v2H5V1zm4 0h2v2H9V1zm4 0h2v2h-2V1zm4 0h2v2h-2V1zM1 5h2v2H1V5zm4 0h2v2H5V5zm4 0h2v2H9V5zm4 0h2v2h-2V5zm4 0h2v2h-2V5z' fill='%23a1a1aa' fill-rule='evenodd' opacity='0.4'/%3E%3C/svg%3E")`,
                   backgroundSize: '20px 20px'
                 }} 
            />
            
            <div className="relative z-10 flex flex-col h-full pointer-events-none">
              <div className="flex items-center gap-2 mb-2 text-foreground">
                <MapPin className="w-5 h-5 text-blue-500" />
                <h3 className="font-bold text-lg">Global threat detection — live</h3>
              </div>
              <p className="text-muted-foreground text-sm max-w-md">
                Every phishing attempt is geolocated and blocked in under 50ms, anywhere in the world.
              </p>

              {/* Threat Alert floating card */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-auto self-end max-w-xs sm:max-w-sm p-4 bg-background border border-border rounded-xl shadow-2xl flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">Phishing attempt blocked</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/10 text-red-500 border border-red-500/20">THREAT</span>
                </div>
                <div className="font-mono text-xs text-muted-foreground bg-muted p-2 rounded">
                  hxxps://paypa1-secure[.]com
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Kinshasa, DR Congo • 2s ago
                </div>
              </motion.div>
            </div>
          </div>

          {/* PANEL 2 - Email & Browser Support (Chat) */}
          <div className="col-span-1 p-8 bg-background border-r border-border border-b lg:border-b-0 flex flex-col h-[400px]">
            <div className="flex items-center gap-2 mb-2 text-foreground">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-lg">Instant threat explanations</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Empower your team with AI-driven insights when they encounter suspicious links.
            </p>

            <div className="mt-auto flex flex-col gap-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="self-start max-w-[85%] p-3 rounded-2xl rounded-tl-sm bg-zinc-900 dark:bg-zinc-800 text-white text-sm"
              >
                Is this email from support@paypa1.com safe?
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="self-end max-w-[85%] p-3 rounded-2xl rounded-tr-sm bg-blue-600 text-white text-sm flex gap-2 items-start shadow-lg"
              >
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-200" />
                <span>
                  <strong>Threat detected.</strong> This domain is a known phishing impersonation of PayPal. Do not click any links.
                </span>
              </motion.div>
            </div>
          </div>

          {/* PANEL 3 - Activity Chart */}
          <div className="col-span-1 p-8 bg-zinc-50 dark:bg-zinc-950 flex flex-col h-[400px]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-foreground">
                <Activity className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold text-lg">Threat activity feed — real time</h3>
              </div>
              
              {/* Floating Legend */}
              <div className="flex flex-col gap-1 text-[10px] uppercase font-mono font-bold tracking-wider">
                <div className="flex items-center gap-2 justify-end text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> Scanned
                </div>
                <div className="flex items-center gap-2 justify-end text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Blocked
                </div>
              </div>
            </div>
            
            <div className="mt-auto h-[200px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorScanned" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--foreground)', fontSize: '12px', fontFamily: 'monospace' }}
                  />
                  
                  <Area type="monotone" dataKey="scanned" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorScanned)" />
                  <Area type="monotone" dataKey="threats" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorThreats)" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="absolute bottom-0 w-full flex justify-between text-[10px] text-muted-foreground font-mono px-2 pt-2 border-t border-border/50">
                <span>OCT</span>
                <span>NOV</span>
                <span>DEC</span>
                <span>JAN</span>
                <span>FEB</span>
                <span>MAR</span>
              </div>
            </div>
          </div>

          {/* CENTER BANNER - Across both columns */}
          <div className="col-span-1 lg:col-span-2 flex flex-col items-center justify-center p-6 bg-background border-t border-border text-center">
            <div className="flex items-center justify-center gap-2 text-emerald-500 mb-1">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-bold text-lg text-foreground">99.99% Uptime SLA</span>
            </div>
            <p className="text-sm text-muted-foreground font-mono">Monitored across 47 global nodes</p>
          </div>

        </div>
      </div>
    </section>
  );
};
