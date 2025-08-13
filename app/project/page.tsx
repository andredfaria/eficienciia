import { Header } from '@/components/header';
import { Footer } from '@/components/sections/footer';
import { ProjectsSection } from '@/components/sections/projects-section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Projetos de IA e Automação | Eficienci IA",
  description:
    "Portfólio de projetos com agentes de IA, automações no WhatsApp e integrações CRM/ERP. Veja casos com dashboards, coleta de dados e remarketing.",
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