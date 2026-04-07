import React from 'react';
import { motion } from 'framer-motion';

export interface HeroOdysseyProps extends React.HTMLAttributes<HTMLDivElement> {
  hue?: number;
}

export const HeroOdyssey: React.FC<HeroOdysseyProps> = ({ 
  hue = 210, 
  className, 
  children, 
  ...props 
}) => {
  return (
    <div 
      className={`relative w-full overflow-hidden ${className || ''}`} 
      style={{ '--lightning-hue': hue } as React.CSSProperties}
      {...props}
    >
      {/* Fallback styling for the WebGL canvas effect */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle at center, hsl(${hue}, 80%, 20%) 0%, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
};

export const FeatureItem = ({ label, value, className }: { label: string, value: string, className?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
      className={`hidden md:flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 dark:bg-black/40 backdrop-blur-xl shadow-2xl ${className}`}
    >
      <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_white]" />
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground dark:text-zinc-400">{label}</span>
        <span className="font-mono text-sm font-medium text-foreground dark:text-white">{value}</span>
      </div>
    </motion.div>
  );
};

export const ElasticHueSlider = ({ value, onChange }: { value: number, onChange: (val: number) => void }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between text-xs text-muted-foreground dark:text-zinc-400">
        <span>Hue</span>
        <span className="font-mono">{value}</span>
      </div>
      <input 
        type="range" 
        min="0" 
        max="360" 
        value={value} 
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`
        }}
      />
    </div>
  );
};
