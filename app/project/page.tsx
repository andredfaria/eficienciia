import { Header } from '@/components/header';
import { Footer } from '@/components/sections/footer';
import { ProjectsSection } from '@/components/sections/projects-section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Projetos | Eficienci IA",
  description:
    "Conheça os projetos desenvolvidos pela Eficienci IA - Do MVP ao Produto Robusto.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <ProjectsSection />
      </div>
      <Footer />
    </main>
  );
} 