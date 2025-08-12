import { Header } from '@/components/header';
import { BrandValuesSection } from '@/components/sections/brand-values-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';

export default function ValoresPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-24" />
      <BrandValuesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
