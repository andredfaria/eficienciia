import { SiteHeader as Header } from '@/components/home/site-chrome';
import { BrandValuesSection } from '@/components/sections/brand-values-section';
import { ContactSection } from '@/components/sections/contact-section';
import { SiteFooter as Footer } from '@/components/home/site-chrome';

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
