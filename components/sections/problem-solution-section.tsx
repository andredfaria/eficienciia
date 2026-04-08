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
      title: "Diagnóstico completo do negócio",
      description: "Saiba exatamente onde a IA vai gerar retorno antes de investir um centavo. Mapeamos processos, gargalos e oportunidades com profundidade técnica.",
      highlight: "Estratégia"
    },
    {
      category: "Consultoria Estratégica",
      icon: <FileBarChart className="h-12 w-12 text-primary" />,
      title: "Roadmap priorizado por impacto",
      description: "Receba um plano de ação claro: o que implementar primeiro, quanto custa, quanto retorna e em qual prazo. Sem surpresas no caminho.",
      highlight: "Planejamento"
    },
    {
      category: "Consultoria Estratégica",
      icon: <TrendingUp className="h-12 w-12 text-primary" />,
      title: "Relatórios e métricas de IA",
      description: "Acompanhe o desempenho de cada automação com dashboards e relatórios que mostram ROI real — não só atividade, mas resultado.",
      highlight: "Dados"
    },
    {
      category: "Implementação",
      icon: <Smartphone className="h-12 w-12 text-primary" />,
      title: "Integração multi-plataforma",
      description: "Conecte WhatsApp, CRM, ERP e sistemas internos em um fluxo único e automatizado. Sua equipe para de copiar dados entre telas.",
      highlight: "Integração"
    },
    {
      category: "Implementação",
      icon: <Cog className="h-12 w-12 text-primary" />,
      title: "Ferramentas de IA sob medida",
      description: "Construímos exatamente o que o seu processo precisa — sem forçar sua operação a se adaptar a uma ferramenta genérica.",
      highlight: "Customização"
    },
    {
      category: "Implementação",
      icon: <Zap className="h-12 w-12 text-primary" />,
      title: "Automação de processos repetitivos",
      description: "Elimine tarefas manuais que consomem tempo do seu time. Cada processo automatizado libera capacidade para o que gera mais valor.",
      highlight: "Automação"
    },
    {
      category: "Plug & Play",
      icon: <Bot className="h-12 w-12 text-primary" />,
      title: "Atendimento automático via WhatsApp",
      description: "Ative um agente de IA que responde, qualifica e escalona chamados 24/7 — sem contratar mais atendentes.",
      highlight: "Bots de atendimento"
    },
    {
      category: "Plug & Play",
      icon: <MessageSquare className="h-12 w-12 text-primary" />,
      title: "Remarketing automático inteligente",
      description: "Recupere vendas perdidas com mensagens personalizadas enviadas na hora certa para o perfil certo. IA decide o timing e o conteúdo.",
      highlight: "Remarketing"
    },
    {
      category: "Plug & Play",
      icon: <FolderCode className="h-12 w-12 text-primary" />,
      title: "Central de atendimento integrada",
      description: "WhatsApp, e-mail e CRM em um só lugar, com histórico unificado e respostas assistidas por IA. Gestão simples, atendimento consistente.",
      highlight: "Gestão"
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
            O que entregamos <span className="text-primary">na prática</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Cada solução foi construída a partir de problemas reais que nossos clientes enfrentavam.
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