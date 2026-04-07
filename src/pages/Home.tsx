import { HeroSection } from '@/components/blocks/HeroSection';
import { FeaturesSection } from '@/components/blocks/FeaturesSection';
import { FooterSection } from '@/components/blocks/FooterSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <FooterSection />
    </div>
  );
}
