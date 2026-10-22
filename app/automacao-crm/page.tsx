import { LandingPage, landingMetadata } from '@/components/home/landing-page';
import { crm } from '@/components/home/content/crm';

export const metadata = landingMetadata(crm);

export default function AutomacaoCrmPage() {
  return <LandingPage content={crm} />;
}
