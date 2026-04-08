"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, HardHat, ShoppingCart, Home, CheckCircle, TrendingUp } from "lucide-react";

// TODO: substituir resultados por dados reais de clientes quando disponíveis

interface Sector {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  applications: string[];
  results: string[];
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
    results: [
      "↓ 60% no custo por atendimento",
      "↑ 70% de resoluções sem agente humano",
      "Atendimento 24/7 sem equipe extra",
    ],
  },
  {
    id: "construcao",
    label: "Construção Civil",
    icon: <HardHat className="h-4 w-4" />,
    description:
      "Projetos arquitetônicos e obras envolvem documentação extensa, orçamentos complexos e coordenação de múltiplos fornecedores. A IA reduz retrabalho e acelera aprovações.",
    applications: [
      "Análise e extração de dados de projetos",
      "Geração automática de orçamentos",
      "Gestão de documentação técnica com IA",
      "Alertas de desvio de cronograma",
    ],
    results: [
      "3× mais rápido na elaboração de orçamentos",
      "↓ 40% de retrabalho documental",
      "Aprovações mais ágeis com menos revisões",
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
    results: [
      "+35% de recuperação de carrinhos abandonados",
      "↓ 50% no tempo de resposta ao cliente",
      "Campanhas com 2× mais conversão",
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
    results: [
      "2× mais visitas agendadas por corretor",
      "↓ 70% do tempo em leads frios",
      "Follow-up 100% automatizado",
    ],
  },
];

export function SectorsSection() {
  const [activeId, setActiveId] = useState<string>(sectors[0].id);
  const activeSector = sectors.find((s) => s.id === activeId)!;

  return (
    <section id="sectors" className="py-10 bg-background relative">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.2]" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            IA aplicada ao{" "}
            <span className="text-primary">seu setor</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Cada setor tem desafios únicos. Veja como a Eficienci IA resolve os seus.
          </p>
        </motion.div>

        {/* Tab buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {sectors.map((sector) => (
            <button
              key={sector.id}
              onClick={() => setActiveId(sector.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 ${
                activeId === sector.id
                  ? "bg-primary/10 border-primary text-primary shadow-[0_0_12px_hsl(var(--primary)/.2)]"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {sector.icon}
              {sector.label}
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm shadow-sm p-6 md:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: description */}
            <div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                {activeSector.description}
              </p>
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

            {/* Right: results */}
            <div className="flex flex-col justify-center">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                Resultados esperados
              </h4>
              <div className="space-y-3">
                {activeSector.results.map((result) => (
                  <div
                    key={result}
                    className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/15"
                  >
                    <TrendingUp className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
