"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AudioLines, Calendar, ChartColumnBig, Database, DollarSign, Globe, Mail, MessageCircle, ServerIcon } from "lucide-react";

export function ProblemSolutionSection() {
  const solutions = [
    {
      category: "Whatsapp",
      icon: <MessageCircle className="h-12 w-12 text-primary" />,
      title: "Atendimento automático",
      description:
        "Atenda automaticamente, 24/7, reduzindo custos e escalando sem limites. Responde dúvidas, consulta dados e encaminha solicitações.",
    },
    {
      category: "Whatsapp",
      icon: <Calendar className="h-12 w-12 text-primary" />,
      title: "Agendamento automático",
      description:
        "Agenda e confirma consultas, remarcações e exames. Sincroniza horários com o seu calendário e sistemas em tempo real.",
    },
    {
      category: "Whatsapp",
      icon: <DollarSign className="h-12 w-12 text-primary" />,
      title: "Remarketing automático",
      description:
        "Recupere carrinhos e reengaje leads com jornadas multicanal baseadas em eventos, segmentos e janelas de tempo.",
    },
    {
      category: "Automação",
      icon: <ServerIcon className="h-12 w-12 text-primary" />,
      title: "Integração entre CRM e ERP",
      description:
        "Conecte CRM/ERP para ler e atualizar contatos, negócios, pedidos e tickets, mantendo os dados sempre consistentes.",
    },
    {
        category: "Automação",
      icon: <AudioLines className="h-12 w-12 text-primary" />,
      title: "Áudio automático (envio e recepção)",
      description:
        "Envie e transcreva áudios automaticamente. Suporte a TTS e STT com múltiplas vozes e idiomas.",
    },
    {
      category: "Automação",
      icon: <Mail className="h-12 w-12 text-primary" />,
      title: "E-mails automatizados",
      description:
        "Crie fluxos transacionais e de marketing com templates, variáveis dinâmicas e testes A/B para maximizar conversão.",
    },
    {
      category: "Dados",
      icon: <Globe className="h-12 w-12 text-primary" />,
      title: "Estruturação e organização de bases",
      description:
        "Normalize, higienize e enriqueça bases de dados para relatórios confiáveis e modelos de IA mais precisos.",
    },
    {
      category: "Dados",
      icon: <Database className="h-12 w-12 text-primary" />,
      title: "Coleta de dados em conversa",
      description:
        "Capta dados consentidos durante a conversa (nome, preferências, objetivos) para personalizar jornadas e próximas interações.",
    },
    {
      category: "Dados",
      icon: <ChartColumnBig className="h-12 w-12 text-primary" />,
      title: "Dashboard de performance",
      description:
        "Visualize métricas de atendimento, conversão e eficiência para tomar decisões estratégicas.",
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

  return (
    <section id="solution" className="py-20 bg-background relative">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.2]" />
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-14 max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Soluções de IA e Automação</h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Agentes de IA, automação no WhatsApp e integrações entre CRM/ERP para atendimento 24/7, eficiência operacional e crescimento previsível.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
            {solutions.map((solution, index) => (
              <motion.div key={solution.title} variants={itemVariants}>
                <Card className="group h-full rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all hover:neon-ring min-h-[320px] md:min-h-[340px]">
                  <CardHeader className="pb-1">
                    <div className="mb-3">
                      <span className="inline-flex items-center rounded-full border border-border/60 bg-background/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                        {solution.category}
                      </span>
                    </div>
                    <div className="mb-5 inline-flex items-center justify-center rounded-xl bg-primary/10 p-4 text-primary neon-ring">
                      {solution.icon}
                    </div>
                    <CardTitle className="text-2xl tracking-tight">{solution.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-base md:text-lg leading-relaxed">
                      {solution.description}
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