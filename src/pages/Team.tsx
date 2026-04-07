import React from 'react';
import { 
  Users, 
  Smartphone, 
  Monitor, 
  ShieldCheck, 
  Plus, 
  MoreVertical,
  Activity,
  UserPlus,
  Cpu,
  HardDrive,
  Network
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';

export default function TeamPage() {
  const { user } = useAuth();
  
  const members = [
    { name: user?.name || 'Primary Admin', role: 'Security Ops', status: 'Online', device: 'Authenticated Host', id: user?.id?.slice(0, 8) || 'ADMIN' },
    { name: 'Sarah Connor', role: 'Threat Analyst', status: 'Online', device: 'Nodal Endpoint', id: 'TA-092' },
    { name: 'Marcus Wright', role: 'System Auditor', status: 'Idle', device: 'Virtual Instance', id: 'SA-441' },
    { name: 'Kyle Reese', role: 'Protocol Agent', status: 'Online', device: 'Mobile Node', id: 'PA-101' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
           <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground leading-none">Protection Cluster</h1>
           <p className="text-muted-foreground mt-2 font-mono text-xs uppercase tracking-widest text-blue-500">Managing 14 Active Endpoints</p>
        </div>
        <div className="flex items-center gap-2">
           <Button className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs tracking-widest h-11 px-8 rounded-xl shadow-xl shadow-blue-500/20">
             <UserPlus className="w-4 h-4 mr-2" /> Invite Asset
           </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         <Metric_Card label="Total Assets" value="24" icon={Users} />
         <Metric_Card label="Active Sessions" value="14" icon={Activity} />
         <Metric_Card label="System Integrity" value="99.2%" icon={ShieldCheck} />
         <Metric_Card label="Threat Vectors" value="0.04" icon={Network} />
      </div>

      <Card className="border-border/60 shadow-sm p-0 rounded-2xl overflow-hidden bg-background/50">
        <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20">
          <h3 className="font-black uppercase tracking-tight text-sm flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" /> Active Protection Nodes
          </h3>
          <Badge variant="outline" className="font-mono text-[9px] uppercase tracking-widest border-emerald-500/30 text-emerald-500">Live Telemetry Feed</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/50 border-b border-border">
              <tr className="text-[10px] uppercase font-black tracking-widest text-muted-foreground font-mono">
                <th className="px-6 py-4">Node Profile</th>
                <th className="px-6 py-4">Security Access</th>
                <th className="px-6 py-4">Device Identifier</th>
                <th className="px-6 py-4">Cluster Status</th>
                <th className="px-6 py-4 text-right">Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {members.map((m, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-all group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                       <Avatar className="h-9 w-9 border-2 border-blue-500/20 group-hover:border-blue-500 transition-all rounded-lg">
                          <AvatarFallback className="bg-muted text-[10px] font-black uppercase rounded-lg">{m.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                       </Avatar>
                       <div className="flex flex-col">
                          <span className="text-xs font-black uppercase text-foreground leading-none">{m.name}</span>
                          <span className="text-[9px] font-mono text-muted-foreground mt-1 uppercase tracking-tighter">ID-0x{m.id}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase bg-muted/50 px-2 py-0.5 rounded border border-border">{m.role}</span>
                  </td>
                  <td className="px-6 py-5 text-foreground">
                    <div className="flex items-center gap-2 font-mono text-[11px] font-bold">
                       {m.device === 'Authenticated Host' ? <Monitor className="w-4 h-4 text-zinc-500" /> : <Smartphone className="w-4 h-4 text-zinc-500" />}
                       {m.device}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${m.status === 'Online' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-500'}`} />
                       <span className="text-[10px] font-black uppercase font-mono">{m.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {[...Array(2)].map((_, i) => (
                <tr key={`ghost-${i}`} className="opacity-40 select-none">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3 grayscale">
                       <div className="h-9 w-9 rounded-lg bg-muted animate-pulse" />
                       <div className="flex flex-col gap-1">
                          <div className="h-3 w-20 bg-muted animate-pulse rounded" />
                          <div className="h-2 w-12 bg-muted animate-pulse rounded" />
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-5"><div className="h-4 w-16 bg-muted animate-pulse rounded" /></td>
                  <td className="px-6 py-5"><div className="h-4 w-24 bg-muted animate-pulse rounded" /></td>
                  <td className="px-6 py-5"><div className="h-4 w-12 bg-muted animate-pulse rounded" /></td>
                  <td className="px-6 py-5 text-right"><div className="h-8 w-8 bg-muted animate-pulse rounded ml-auto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <Card className="p-8 border-border/60 bg-background/50 flex flex-col gap-6">
            <h4 className="font-black uppercase tracking-tight text-sm flex items-center gap-2">
               <Cpu className="w-4 h-4 text-blue-500" /> System Load Balancing
            </h4>
            <div className="space-y-4">
               <Load_Meter label="Kernel Processing" val={42} />
               <Load_Meter label="Threat Database Sync" val={18} />
               <Load_Meter label="UI Thread Isolation" val={64} />
            </div>
         </Card>
         <Card className="p-8 border-border/60 bg-background/50 flex flex-col gap-6">
            <h4 className="font-black uppercase tracking-tight text-sm flex items-center gap-2">
               <HardDrive className="w-4 h-4 text-blue-500" /> Decentralized Storage
            </h4>
            <div className="flex flex-col gap-4">
               <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Local Cluster Pool</span>
                  <span className="font-mono text-sm text-foreground">1.4TB / 5.0TB</span>
               </div>
               <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[28%]" />
               </div>
               <p className="text-[9px] text-muted-foreground uppercase leading-relaxed font-medium">Distributed across 24 protection nodes worldwide. Redundancy at 99.9%.</p>
            </div>
         </Card>
      </div>
    </div>
  );
}

const Metric_Card = ({ label, value, icon: Icon }: any) => (
  <Card className="p-6 border-border/50 bg-background/50 hover:bg-muted/10 transition-all border-l-4 border-l-blue-500 group">
     <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
           <span className="text-[10px] font-mono font-black uppercase tracking-widest text-muted-foreground group-hover:text-blue-500 transition-colors">{label}</span>
           <span className="text-3xl font-mono font-black text-foreground">{value}</span>
        </div>
        <div className="p-3 bg-muted/30 rounded-xl group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-all">
           <Icon className="w-6 h-6" />
        </div>
     </div>
  </Card>
);

const Load_Meter = ({ label, val }: { label: string, val: number }) => (
  <div className="space-y-2">
     <div className="flex justify-between text-[10px] font-black uppercase tracking-tight">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground font-mono">{val}%</span>
     </div>
     <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-blue-500/40" style={{ width: `${val}%` }} />
     </div>
  </div>
);
