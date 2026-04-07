import React, { useState } from 'react';
import { ShieldCheck, Check, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-background py-24 px-4 flex flex-col items-center">
      
      {/* HERO COMPACT */}
      <div className="text-center max-w-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Start free. Scale as your team grows. No surprise bills.
        </p>

        {/* TOGGLE */}
        <div className="flex items-center justify-center gap-3">
          <span className={`text-sm ${!isAnnual ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 rounded-full bg-muted border border-border relative flex items-center px-1 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            <div className={`w-5 h-5 rounded-full bg-blue-600 transition-transform shadow-md ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
          <span className={`text-sm flex items-center gap-2 ${isAnnual ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
            Annual
            <Badge className="bg-emerald-500/10 text-emerald-500 text-[10px] uppercase border hover:bg-emerald-500/10 border-emerald-500/20">Save 20%</Badge>
          </span>
        </div>
      </div>

      {/* PRICING CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full text-left mb-24">
        
        {/* FREE */}
        <Card className="p-8 flex flex-col bg-background/50 border-border">
          <div className="mb-6">
            <h3 className="text-xl font-bold font-sans text-foreground mb-2">Free</h3>
            <p className="text-sm text-muted-foreground min-h-[40px]">For individuals and security researchers</p>
          </div>
          <div className="mb-6 text-foreground">
            <span className="text-4xl font-bold font-mono">$0</span><span className="text-muted-foreground">/mo</span>
          </div>
          <ul className="flex flex-col gap-4 mb-8 flex-1 text-sm text-foreground">
            {['1 user flex', '500 URL scans/mo', 'Browser extension coverage', 'Community support'].map((feat, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
          <Button variant="outline" className="w-full mt-auto font-semibold">Get Started Free</Button>
        </Card>

        {/* PRO (RECOMMENDED) */}
        <Card className="p-8 flex flex-col relative scale-[1.02] shadow-2xl border-2 border-blue-600 bg-zinc-50 dark:bg-zinc-950/50">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Badge className="bg-blue-600 text-white hover:bg-blue-600 text-xs shadow-lg uppercase tracking-wide">Most Popular</Badge>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-bold font-sans text-foreground mb-2">Pro</h3>
            <p className="text-sm text-muted-foreground min-h-[40px]">For professionals who need real coverage</p>
          </div>
          <div className="mb-6 text-foreground">
            <span className="text-4xl font-bold font-mono">${isAnnual ? '9.60' : '12'}</span><span className="text-muted-foreground">/mo</span>
          </div>
          <ul className="flex flex-col gap-4 mb-8 flex-1 text-sm text-foreground">
            {['1 user', 'Unlimited scans', 'Email protection', 'Priority support', 'API access (1k req/day)', 'Advanced reports'].map((feat, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
          <Button className="w-full mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-[0_0_20px_rgba(37,99,235,0.2)]">Start 14-day Trial</Button>
        </Card>

        {/* ENTERPRISE */}
        <Card className="p-8 flex flex-col bg-background/50 border-border">
          <div className="mb-6">
            <h3 className="text-xl font-bold font-sans text-foreground mb-2">Enterprise</h3>
            <p className="text-sm text-muted-foreground min-h-[40px]">For security teams and large organisations</p>
          </div>
          <div className="mb-6 text-foreground">
            <span className="text-4xl font-bold font-mono">Custom</span>
          </div>
          <ul className="flex flex-col gap-4 mb-8 flex-1 text-sm text-foreground">
            {['Unlimited users', 'Unlimited scans', 'SIEM integration', 'SSO / SAML', 'Dedicated SRE', 'SLA 99.99%'].map((feat, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
          <Button variant="outline" className="w-full mt-auto font-semibold">Talk to Sales</Button>
        </Card>
      </div>

      {/* TRUST LOGOS */}
      <div className="max-w-4xl w-full text-center mb-16 border-t border-border pt-12">
        <p className="text-xs uppercase font-mono tracking-widest text-muted-foreground mb-6">Trusted by teams at</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale select-none">
          {['Nexus', 'Cipher', 'Quantum', 'Vanguard', 'Apex', 'Horizon'].map((brand) => (
            <span key={brand} className="font-bold text-xl md:text-2xl text-foreground font-sans tracking-tight">
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl w-full mt-12 bg-background">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground">Frequently asked questions</h2>
        </div>
        <Accordion type="single" collapsible className="w-full text-left">
          {[
            {
              q: "How does billing work?",
              a: "You will be charged at the beginning of each billing cycle (monthly or annually). You can upgrade, downgrade, or cancel your plan at any time from your dashboard."
            },
            {
              q: "Can I cancel at any time?",
              a: "Yes, you can cancel your subscription at any time. If you cancel before the end of your current billing cycle, you'll still have access to paid features until the cycle concludes."
            },
            {
              q: "How is my data handled and protected?",
              a: "We only log anonymised telemetry relevant to identifying threats. We do not track your browsing history or read personal emails. We are fully SOC2 Type II and GDPR compliant."
            },
            {
              q: "Which browsers does the extension support?",
              a: "Currently, PhishShield natively supports Google Chrome, Mozilla Firefox, Microsoft Edge, and Brave. Safari support is currently in beta."
            },
            {
              q: "Do you offer SOC2 compliance reports?",
              a: "Yes. Our SOC2 Type II report is available upon request for Pro and Enterprise customers under an NDA."
            }
          ].map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border py-2">
              <AccordionTrigger className="text-sm font-semibold hover:no-underline text-foreground">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

    </div>
  );
};
