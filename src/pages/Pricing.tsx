import { PricingPage as PricingBlock } from '@/components/blocks/PricingPage';
import { FooterSection } from '@/components/blocks/FooterSection';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PricingBlock />
      <FooterSection />
    </div>
  );
}
