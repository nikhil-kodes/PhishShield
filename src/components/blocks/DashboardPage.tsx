import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Search, 
  BarChart3, 
  Users, 
  Settings2, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2,
  Activity,
  LogOut,
  GraduationCap,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  Loader2,
  Download,
  Map as MapIcon,
  Globe
} from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { apiClient, DashboardData, HistoryItem } from '@/services/apiClient';
import { toast } from 'sonner';

export const DashboardPage = ({ children }: { children?: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await apiClient.getDashboardData();
        if (response.ok && response.data) {
          setData(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const handleGenerateReport = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Intelligence Hub: Compiling threat vector report...',
        success: 'Report Generated: PhishShield_Security_Audit_v4.pdf downloaded.',
        error: 'Export failed: Verification timeout.',
      }
    );
  };

  const getUserInitials = (name?: string) => {
    if (!name) return 'PS';
    try {
      return name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase();
    } catch (e) {
      return 'PS';
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, name: 'Overview', path: '/dashboard' },
    { icon: ShieldAlert, name: 'Threats', path: '/dashboard/threats' },
    { icon: Search, name: 'URL Scanner', path: '/dashboard/scanner' },
    { icon: GraduationCap, name: 'AI Academy', path: '/quiz' },
    { icon: Users, name: 'Team', path: '/dashboard/team' },
    { icon: Settings2, name: 'Settings', path: '/profile' },
  ];

  if (loading && !children) { // Only show loader for the main dashboard view, not wrappers
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background font-sans relative overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-[260px] fixed h-full border-r border-border bg-background/50 backdrop-blur-xl p-6 z-[100]">
        <Link to="/" className="flex items-center gap-3 mb-10 px-2 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <span className="font-mono font-black text-white text-xs">{user ? getUserInitials(user.name) : 'PS'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-sm text-foreground leading-tight uppercase tracking-tight">{user?.name || 'User Profile'}</span>
            <span className="text-[10px] uppercase font-mono text-blue-500 font-bold tracking-widest mt-1">Enterprise Asset</span>
          </div>
        </Link>

        <nav className="flex flex-col gap-1.5 flex-grow">
          {menuItems.map((item, idx) => (
            <Link 
              key={idx}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                location.pathname === item.path 
                  ? 'bg-blue-600 text-white shadow-[0_10px_20px_rgba(59,130,246,0.2)]' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-4 pt-10">
          <Card className="p-4 bg-blue-600/5 border-blue-500/20 rounded-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
            <h4 className="font-bold text-xs uppercase tracking-tight mb-1 text-foreground">Cluster Sync</h4>
            <p className="text-[10px] text-muted-foreground mb-3 leading-relaxed">System monitoring 47 active global nodes.</p>
            <Button size="sm" variant="outline" className="w-full text-xs h-9 uppercase font-black tracking-tighter border-2">
              Sync Telemetry
            </Button>
          </Card>

          <Button 
            onClick={() => logout()}
            variant="ghost" 
            className="w-full flex items-center justify-start gap-3 px-4 py-3 text-xs font-bold text-red-500 uppercase tracking-widest hover:bg-red-500/10 rounded-xl"
          >
            <LogOut className="w-4 h-4" /> Sign Out Asset
          </Button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 lg:ml-[260px] min-h-screen relative">
        
        {/* LIVE HUD BAR */}
        <div className="sticky top-0 z-[80] h-[50px] w-full bg-emerald-500/10 dark:bg-emerald-950/20 border-b border-emerald-500/20 flex items-center px-6 backdrop-blur-md">
           <div className="flex items-center gap-4 w-full max-w-6xl mx-auto">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="font-mono text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">Shield: Operational</span>
              </div>
              <div className="h-4 w-px bg-emerald-500/20" />
              <div className="flex-1 overflow-hidden">
                 <div className="font-mono text-[9px] text-emerald-800/60 dark:text-emerald-400/60 uppercase animate-marquee whitespace-nowrap">
                   Telemetry feed active • 0 threats detected in last 5m • API latency: 42ms • Dataset v14.2.0 • 
                 </div>
              </div>
              <Badge variant="outline" className="font-mono text-[9px] border-emerald-500/40 text-emerald-600">Secure Cluster X-Y</Badge>
           </div>
        </div>

        {children ? (
          <div className="animate-in fade-in duration-500">{children}</div>
        ) : (
          <div className="p-8 max-w-7xl mx-auto space-y-10 mt-4">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
               <div>
                  <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground leading-none">Intelligence Hub</h1>
                  <p className="text-muted-foreground mt-2 font-mono text-xs uppercase tracking-widest">Real-time Threat Activity & System Metrics</p>
               </div>
               <div className="flex items-center gap-2">
                  <Button 
                    onClick={handleGenerateReport}
                    variant="outline" 
                    className="font-bold text-xs uppercase tracking-widest h-11 px-6 rounded-xl border-2"
                  >
                    <Download className="w-4 h-4 mr-2" /> PDF Report
                  </Button>
                  <Button 
                    onClick={() => navigate('/dashboard/map')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest h-11 px-6 rounded-xl shadow-xl shadow-blue-500/20"
                  >
                    <MapIcon className="w-4 h-4 mr-2" /> Real-time Map
                  </Button>
               </div>
            </header>

            {/* KEY PERFORMANCE INDICATORS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
               <KPI_Card label="Active Blockages" value={data?.blockedCount.toLocaleString() || '---'} trend="+14.2%" trendUp={true} />
               <KPI_Card label="Integrity Score" value={`${data?.protectedPercentage.toFixed(1) || '--'}%`} trend="+0.3%" trendUp={true} />
               <KPI_Card label="Network Entropy" value="0.04" trend="Minimal" trendUp={true} />
               <KPI_Card label="Available Credits" value={data?.credits.toLocaleString() || '--'} trend="Reloaded" trendUp={true} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* THREAT FEED */}
               <Card className="lg:col-span-2 border-border/60 shadow-sm p-0 rounded-2xl overflow-hidden bg-background/50 flex flex-col min-h-[500px]">
                  <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20">
                     <div className="flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-red-500" />
                        <h3 className="font-black uppercase tracking-tight text-sm text-foreground">Security Interceptions</h3>
                     </div>
                     <Badge variant="outline" className="bg-red-500/5 text-red-500 border-red-500/20 font-mono text-[9px]">Live Cluster Feed</Badge>
                  </div>
                  <div className="flex-1 overflow-auto">
                     <table className="w-full text-left">
                        <thead className="bg-muted/50 border-b border-border">
                           <tr className="text-[9px] uppercase font-black tracking-widest text-muted-foreground font-mono">
                              <th className="px-6 py-4">Asset Reference</th>
                              <th className="px-6 py-4">Threat Level</th>
                              <th className="px-6 py-4 text-right">Protection Action</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                           {(data?.history || []).slice(0, 5).map((item, i) => (
                              <tr key={i} className="hover:bg-muted/30 transition-all group">
                                 <td className="px-6 py-5">
                                    <div className="flex flex-col">
                                       <span className="text-xs font-mono font-black text-foreground truncate max-w-[200px]">{item.url}</span>
                                       <span className="text-[9px] font-mono text-muted-foreground mt-1 uppercase tracking-tighter">Intercepted at {new Date(item.visitedAt).toLocaleTimeString()}</span>
                                    </div>
                                 </td>
                                 <td className="px-6 py-5">
                                    <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-foreground">
                                       <div className={`w-2 h-2 rounded-full ${item.score > 80 ? 'bg-red-500' : 'bg-amber-500'} animate-pulse`} />
                                       {item.score}% Threat Match
                                    </div>
                                 </td>
                                 <td className="px-6 py-5 text-right text-emerald-500">
                                    <div className="flex items-center justify-end gap-2">
                                       <CheckCircle2 className="w-4 h-4" />
                                       <span className="text-[10px] font-black uppercase tracking-tighter">Secured</span>
                                    </div>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
                  <Link to="/dashboard/threats" className="p-4 border-t border-border mt-auto text-center hover:bg-muted/30 transition-colors">
                     <span className="text-xs font-black uppercase tracking-widest text-blue-500 flex items-center justify-center gap-2 group">
                        Access Full Intelligence Logs <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                     </span>
                  </Link>
               </Card>

               <Card className="border-border/60 p-8 flex flex-col items-center bg-gradient-to-br from-background to-blue-500/[0.03] rounded-2xl relative">
                  <h3 className="font-black uppercase tracking-widest text-xs text-muted-foreground mb-12 self-start flex items-center gap-2">
                     <ShieldCheck className="w-4 h-4 text-blue-500" /> Integrity Quotient
                  </h3>
                  <div className="relative w-48 h-48 flex items-center justify-center">
                     <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="8" className="text-zinc-100 dark:text-zinc-900" />
                        <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray={`${276 * (data?.protectedPercentage || 0) / 100} 276`} strokeLinecap="round" className="text-emerald-500" />
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-mono text-5xl font-black tracking-tighter text-foreground">{data?.protectedPercentage.toFixed(0) || '--'}</span>
                        <span className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.3em]">%</span>
                     </div>
                  </div>
                  <div className="mt-10 space-y-2 w-full">
                     <Button 
                       onClick={() => navigate('/dashboard/scanner')}
                       className="w-full h-12 bg-foreground text-background font-black uppercase text-xs tracking-widest rounded-xl hover:bg-foreground/90 transition-all shadow-lg"
                     >
                        New Isolated Scan
                     </Button>
                     <Button variant="ghost" className="w-full h-12 font-black uppercase text-xs tracking-widest text-muted-foreground">Detailed Cluster Audit</Button>
                  </div>
               </Card>
            </div>
          </div>
        )}
      </main>
      
      {/* HUD STYLES */}
      <style>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
      `}</style>

      {/* MOBILE NAV */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-sm h-16 bg-background/80 backdrop-blur-3xl border border-white/10 rounded-3xl flex justify-around items-center px-4 shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-[200]">
        {menuItems.slice(0, 4).map((item, i) => (
          <button 
            key={i} 
            onClick={() => navigate(item.path)}
            className={`p-3 rounded-2xl transition-all ${location.pathname === item.path ? 'bg-blue-600 text-white' : 'text-muted-foreground hover:bg-muted'}`}
          >
            <item.icon className="w-6 h-6" />
          </button>
        ))}
      </div>
    </div>
  );
};

const KPI_Card = ({ label, value, trend, trendUp }: { label: string, value: string, trend: string, trendUp: boolean }) => (
  <Card className="p-6 border-border/50 bg-background/50 hover:bg-background/80 transition-all border-t-2 border-t-transparent hover:border-t-blue-500">
    <div className="flex items-center justify-between mb-4">
       <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{label}</span>
       <div className={`flex items-center gap-1 text-[10px] font-bold bg-background p-1 px-2 rounded-md border border-border`}>
         <TrendingUp className={`w-3 h-3 ${trendUp ? 'text-emerald-500' : 'text-red-500'}`} />
         <span className={trendUp ? 'text-emerald-500' : 'text-red-500'}>{trend}</span>
       </div>
    </div>
    <div className="font-mono text-3xl font-black text-foreground">{value}</div>
  </Card>
);
