import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  Download, 
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { apiClient, HistoryItem } from '@/services/apiClient';

export default function ThreatsPage() {
  const [threats, setThreats] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchThreats = async () => {
      try {
        const res = await apiClient.getDashboardData();
        if (res.ok && res.data) {
          setThreats(res.data.history);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchThreats();
  }, []);

  const filteredThreats = threats.filter(t => 
    t.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground">Threat Intelligence</h1>
          <p className="text-muted-foreground mt-2 font-mono text-xs uppercase tracking-widest text-red-500">Global Blocklist Activity</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="font-bold text-xs uppercase tracking-widest h-11 border-2">
            <Download className="w-4 h-4 mr-2" /> Export Logs
          </Button>
        </div>
      </header>

      <Card className="border-border/60 shadow-sm p-0 rounded-2xl overflow-hidden bg-background/50">
        <div className="p-4 border-b border-border flex flex-col md:flex-row justify-between items-center gap-4 bg-muted/20">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search threat signatures..." 
              className="pl-10 h-10 bg-background border-2 font-mono text-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button variant="ghost" size="sm" className="font-bold text-[10px] uppercase tracking-widest border border-border">
              <Filter className="w-3 h-3 mr-1.5" /> All Severities
            </Button>
            <Button variant="ghost" size="sm" className="font-bold text-[10px] uppercase tracking-widest border border-border">
              <ArrowUpDown className="w-3 h-3 mr-1.5" /> Newest First
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/50 border-b border-border">
              <tr className="text-[10px] uppercase font-black tracking-widest text-muted-foreground font-mono">
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Asset/URL</th>
                <th className="px-6 py-4">Threat Type</th>
                <th className="px-6 py-4">Certainty</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredThreats.map((t, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-all font-medium">
                  <td className="px-6 py-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.score > 80 ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'}`}>
                      {t.score > 80 ? <ShieldAlert className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-mono text-xs text-foreground font-bold">{t.url}</div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="uppercase font-black text-[9px] tracking-tighter">Phishing Signature</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 w-24">
                      <div className="flex justify-between text-[9px] font-mono font-bold text-muted-foreground uppercase">
                        <span>Score</span>
                        <span>{t.score}%</span>
                      </div>
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${t.score > 80 ? 'bg-red-500' : 'bg-amber-500'}`} 
                          style={{ width: `${t.score}%` }} 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[10px] text-muted-foreground font-mono">
                    {new Date(t.visitedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredThreats.length === 0 && !loading && (
            <div className="py-24 text-center">
              <ShieldCheck className="w-12 h-12 text-emerald-500/40 mx-auto mb-4" />
              <h3 className="text-sm font-black uppercase text-foreground">Cluster is Pure</h3>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">No malicious signatures detected in this view.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
