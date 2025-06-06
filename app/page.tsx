import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ProblemSolutionSection } from '@/components/sections/problem-solution-section';
import { ValueSection } from '@/components/sections/value-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProblemSolutionSection />
      {/* <ValueSection /> */}
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}