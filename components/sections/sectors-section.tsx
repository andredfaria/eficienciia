"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, HardHat, ShoppingCart, Home, CheckCircle } from "lucide-react";

// TODO: substituir resultados por dados reais de clientes quando disponíveis

interface Sector {
  id: string;
  label: string;
  icon: ReactNode;
  description: string;
  applications: string[];
}

const sectors: Sector[] = [
  {
    id: "teleatendimento",
    label: "Teleatendimento",
    icon: <Phone className="h-4 w-4" />,
    description:
      "Empresas com alto volume de chamadas enfrentam custos crescentes e queda na satisfação. Nossos agentes de IA assumem as interações repetitivas e liberam sua equipe para o que realmente importa.",
    applications: [
      "Triagem automática de chamadas",
      "Respostas FAQ com IA generativa",
      "Escalonamento inteligente para humanos",
      "Análise de sentimento em tempo real",
    ],
  },
  {
    id: "construcao",
    label: "Construção Civil",
    icon: <HardHat className="h-4 w-4" />,
    description:
      "Projetos arquitetônicos e obras envolvem documentação extensa, orçamentos complexas e coordenação de múltiplos fornecedores. A IA reduz retrabalho e acelera aprovações.",
    applications: [
      "Análise e extração de dados de projetos",
      "Geração automática de orçamentos",
      "Gestão de documentação técnica com IA",
      "Alertas de desvio de cronograma",
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: <ShoppingCart className="h-4 w-4" />,
    description:
      "Abandono de carrinho, SAC sobrecarregado e campanhas genéricas custam receita todos os dias. Automatizamos a recuperação de vendas e o atendimento para que você escale sem escalar custos.",
    applications: [
      "Remarketing automático por comportamento",
      "Atendimento e SAC 24/7 via WhatsApp",
      "Segmentação inteligente de campanhas",
      "Recomendação de produtos personalizada",
    ],
  },
  {
    id: "imobiliaria",
    label: "Imobiliárias",
    icon: <Home className="h-4 w-4" />,
    description:
      "Corretores gastam horas qualificando leads que nunca vão comprar. Nossa IA filtra, qualifica e agenda automaticamente — o corretor só fala com quem está pronto para decidir.",
    applications: [
      "Qualificação automática de leads",
      "Agendamento de visitas por IA",
      "Follow-up automático no WhatsApp",
      "Análise de perfil e match com imóveis",
    ],
  },
];

export function SectorsSection() {
  const [activeId, setActiveId] = useState<string>(sectors[0].id);
  const activeSector = sectors.find((s) => s.id === activeId) ?? sectors[0];

  return (
    <section id="sectors" className="py-12 md:py-10 bg-background relative">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.2]" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8 md:mb-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3">
            IA aplicada ao{" "}
            <span className="text-primary">seu setor</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Cada setor tem desafios únicos. Veja como a Eficienci IA resolve os seus.
          </p>
        </motion.div>

        {/* Tab buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:10"
          role="tablist"
          aria-label="Setores de atuação"
        >
          {sectors.map((sector) => (
            <button
              key={sector.id}
              onClick={() => setActiveId(sector.id)}
              role="tab"
              aria-selected={activeId === sector.id}
              aria-controls={`panel-${sector.id}`}
              id={`tab-${sector.id}`}
              className={`inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full border text-xs md:text-sm font-medium transition-all duration-200 min-h-[40px] md:min-h-[44px] ${
                activeId === sector.id
                  ? "bg-primary/10 border-primary text-primary shadow-[0_0_12px_hsl(var(--primary)/.2)]"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {sector.icon}
              <span className="hidden xs:inline">{sector.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        {/* animate (not whileInView) so it re-triggers on every tab change */}
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          role="tabpanel"
          id={`panel-${activeId}`}
          aria-labelledby={`tab-${activeId}`}
          className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm shadow-sm p-4 md:p-6 lg:p-8"
        >
          <div className="space-y-5 md:space-y-6">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {activeSector.description}
            </p>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                Aplicações
              </h4>
              <ul className="space-y-2">
                {activeSector.applications.map((app) => (
                  <li key={app} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    {app}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
