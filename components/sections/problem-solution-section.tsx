"use client";

import { motion } from "framer-motion";
import { LayoutIcon, LockIcon, Scale, ServerIcon, DollarSign, Globe, Code, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ProblemSolutionSection() {
  const solutions = [
    {
      icon: <LayoutIcon className="h-12 w-12 text-chart-1" />,
      title: "Arquitetura Sólida",
      description:
        "Transformamos código experimental em arquiteturas robustas, escaláveis e bem documentadas.",
    },
    {
      icon: <Scale className="h-12 w-12 text-chart-2" />,
      title: "Escalabilidade Pronta",
      description:
        "Preparamos sua infraestrutura para suportar de dezenas a milhões de usuários.",
    },
    {
      icon: <LockIcon className="h-12 w-12 text-chart-3" />,
      title: "Segurança Implementada",
      description:
        "Protegemos seus dados com criptografia, autenticação segura e padrões LGPD/GDPR. Seu produto fica pronto para auditorias, integrações e confiança de investidores.",
    },
    {
      icon: <DollarSign className="h-12 w-12 text-chart-4" />,
      title: "Integração com infraestrutura Financeira",
      description:
        "Integramos com a infraestrutura financeira para facilitar o uso do produto.",
    },
    {
      icon: <ServerIcon className="h-12 w-12 text-chart-5" />,
      title: "Especialização em IA",
      description:
        "Otimizamos seus modelos e pipelines de IA para performance, custo e experiência personalizada.",
    },
    {
      icon: <Globe className="h-12 w-12 text-chart-3" />,
      title: "Sua ideia no mercado",
      description:
        "Transformamos sua ideia em produto, com a infraestrutura técnica que ela merece. Aplicamos práticas modernas de SEO e marketing digital para garantir o sucesso do seu produto.",
    },
    {
      icon: <Database className="h-12 w-12 text-chart-1" />,
      title: "IA com contexto",
      description:
        "Criamos pipelines inteligentes com banco de dados vetorial e personalização por usuário, para que sua IA fale com contexto real — e não pareça um chatbot genérico.",
    },
    {
      icon: <Code className="h-12 w-12 text-chart-2" />,
      title: "Código que cresce com você",
      description:
        "MVPs quebram. Nós reestruturamos seu código com padrões profissionais, para que ele suporte novas features, times maiores e crescimento real sem virar um caos.",
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
    <section id="solution" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Resolvemos o gap entre MVP e produto</h2>
          <p className="text-xl text-muted-foreground">
            
          </p>
        </motion.div>

        <div className="relative">
          {/* Visual connection between problem and solution */}
          {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-16 bg-primary/30 hidden lg:block" /> */}
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {solutions.map((solution, index) => (
              <motion.div key={solution.title} variants={itemVariants}>
                <Card className="h-full bg-card border border-border shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <div className="mb-4">{solution.icon}</div>
                    <CardTitle className="text-xl">{solution.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-base">
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