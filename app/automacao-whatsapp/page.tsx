import { LandingPage, landingMetadata } from '@/components/home/landing-page';
import { whatsapp } from '@/components/home/content/whatsapp';

export const metadata = landingMetadata(whatsapp);

export default function AutomacaoWhatsappPage() {
  return <LandingPage content={whatsapp} />;
}
