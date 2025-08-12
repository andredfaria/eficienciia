import { HeroSection } from '@/components/sections/hero-section';
import { ProblemSolutionSection } from '@/components/sections/problem-solution-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      {/* Tech grid background */}
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.35]" />
      <Header />
      <HeroSection />
      <ProblemSolutionSection />
      <ContactSection />
      <Footer />
    </main>
  );
}