import { LandingPage, landingMetadata } from '@/components/home/landing-page';
import { processos } from '@/components/home/content/processos';

export const metadata = landingMetadata(processos);

export default function AutomacaoProcessosPage() {
  return <LandingPage content={processos} />;
}
