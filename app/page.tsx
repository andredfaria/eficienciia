import { LandingPage, landingMetadata } from '@/components/home/landing-page';
import { geral } from '@/components/home/content/geral';

export const metadata = landingMetadata(geral);

export default function Home() {
  return <LandingPage content={geral} />;
}
