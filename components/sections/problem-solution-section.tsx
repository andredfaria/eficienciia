"use client";

import { motion } from "framer-motion";
import { LayoutIcon, LockIcon, Scale, ServerIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ProblemSolutionSection() {
  const solutions = [
    {
      icon: <LayoutIcon className="h-12 w-12 text-chart-1" />,
      title: "Arquitetura Sólida",
      description: "Transformamos código experimental em arquiteturas robustas, escaláveis e bem documentadas."
    },
    {
      icon: <Scale className="h-12 w-12 text-chart-2" />,
      title: "Escalabilidade Pronta",
      description: "Preparamos sua infraestrutura para crescer automaticamente, suportando de dezenas a milhões de usuários."
    },
    {
      icon: <LockIcon className="h-12 w-12 text-chart-3" />,
      title: "Segurança Implementada",
      description: "Implementamos práticas de segurança de nível empresarial e conformidade com LGPD/GDPR desde o início."
    },
    {
      icon: <ServerIcon className="h-12 w-12 text-chart-4" />,
      title: "Especialização em IA",
      description: "Otimizamos seus modelos e pipelines de IA para performance, custo e experiência personalizada."
    }
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
    <section id="solution" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">O gap entre MVP e produto robusto</h2>
          <p className="text-xl text-muted-foreground">
            MVPs validam ideias, mas precisam de transformação para se tornarem produtos confiáveis 
            e escaláveis. Preenchemos esse gap com arquitetura, segurança e performance.
          </p>
        </motion.div>

        <div className="relative">
          {/* Visual connection between problem and solution */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-16 bg-primary/30 hidden lg:block" />
          
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