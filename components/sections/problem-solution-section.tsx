"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Bot,
  Cog,
  FileBarChart,
  MessageSquare,
  Smartphone,
  Target,
  TrendingUp,
  FolderCode,
  Zap
} from "lucide-react";

export function ProblemSolutionSection() {
  const pillars = [
    {
      category: "Consultoria Estratégica",
      icon: <Target className="h-12 w-12 text-primary" />,
      title: "Diagnóstico completo da empresa",
      description: "Análise detalhada de onde a IA pode gerar mais impacto no seu negócio, identificando oportunidades de automação e otimização.",
      highlight: "Estratégia"
    },
    {
      category: "Consultoria Estratégica", 
      icon: <FileBarChart className="h-12 w-12 text-primary" />,
      title: "Roadmap de implementação",
      description: "Plano de implementação estruturado, com tempos de entrega, valor e cronograma para transformação digital e implementação de IA.",
      highlight: "Planejamento"
    },
    {
      category: "Consultoria Estratégica",
      icon: <TrendingUp className="h-12 w-12 text-primary" />,
      title: "Relatórios Inteligentes",
      description: "Análises detalhadas das suas ferramentas de IA, com métricas e insights que orientam decisões estratégicas.",
      highlight: "Dados"
    },
    {
      category: "Implementação",
      icon: <Smartphone className="h-12 w-12 text-primary" />,
      title: "Integração multi-plataforma",
      description: "Conexão com WhatsApp, CRM, redes sociais e sistemas internos para automação completa dos fluxos de trabalho.",
      highlight: "Integração"
    },
    {
      category: "Implementação",
      icon: <Cog className="h-12 w-12 text-primary" />,
      title: "Criação de Ferramentas próprias",
      description: "Desenvolvimento de soluções customizadas que se adaptam perfeitamente aos processos únicos da sua empresa.",
      highlight: "Customização"
    },
    {
      category: "Implementação", 
      icon: <Zap className="h-12 w-12 text-primary" />,
      title: "Automações de processos",
      description: "Automação de processos com IA, para maximizar a produtividade e a eficiência dos seus colaboradores.",
      highlight: "Automação"
    },
    {
      category: "Plug & Play",
      icon: <Bot className="h-12 w-12 text-primary" />,
      title: "Bots de atendimento via WhatsApp",
      description: "Solução pronta para atendimento automático 24/7, com respostas inteligentes e escalabilidade imediata.",
      highlight: "Bots de atendimento"
    },
    {
      category: "Plug & Play",
      icon: <MessageSquare className="h-12 w-12 text-primary" />,
      title: "Disparo inteligente em massa",
      description: "Sistema automatizado para envio de mensagens personalizadas com IA, segmentação avançada e timing otimizado.",
      highlight: "Disparo em massa"
    },
    {
      category: "Plug & Play",
      icon: <FolderCode className="h-12 w-12 text-primary" />,
      title: "Ferramentas de atendimento",
      description: "Ferramentas de atendimento para whatsapp, e-mail e CRM, tudo integrado e facil de controle e gestão.",
      highlight: "Leads"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "Consultoria Estratégica":
        return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "Implementação":
        return "bg-green-500/10 text-green-600 border-green-200";
      case "Plug & Play":
        return "bg-purple-500/10 text-purple-600 border-purple-200";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-200";
    }
  };

  return (
    <section id="solution" className="py-10 bg-background relative">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.2]" />
      
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-14 max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Produtos e <span className="text-primary">Soluções</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Nossa abordagem estruturada garante resultados efetivos: desde a consultoria estratégica até soluções prontas para usar.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {pillars.map((pillar, index) => (
              <motion.div key={pillar.title} variants={itemVariants}>
                <Card className="group h-full rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all hover:neon-ring min-h-[320px] md:min-h-[340px]">
                  <CardHeader className="pb-3">
                    <div className="mb-3 flex items-center justify-between">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(pillar.category)}`}>
                        {pillar.category}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                        {pillar.highlight}
                      </span>
                    </div>
                    <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-4 text-primary neon-ring">
                      {pillar.icon}
                    </div>
                    <CardTitle className="text-lg tracking-tight leading-tight">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {pillar.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 