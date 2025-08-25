"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  Ear, 
  Search, 
  Play, 
  TrendingUp, 
  ArrowRight,
  RefreshCw
} from "lucide-react";

export function MethodologySection() {
  const cycleSteps = [
    {
      step: "1",
      title: "Escutar",
      icon: <Ear className="h-8 w-8 text-primary" />,
      description: "Entendemos profundamente seu cenário atual, desafios e objetivos de negócio para identificar onde a IA pode gerar mais impacto.",
      color: "bg-blue-500/10 text-blue-600 border-blue-200"
    },
    {
      step: "2", 
      title: "Explorar",
      icon: <Search className="h-8 w-8 text-primary" />,
      description: "Analisamos e testamos as melhores soluções de IA para seu caso específico, criando um roadmap personalizado de implementação.",
      color: "bg-green-500/10 text-green-600 border-green-200"
    },
    {
      step: "3",
      title: "Executar", 
      icon: <Play className="h-8 w-8 text-primary" />,
      description: "Implementamos as soluções de forma prática e eficiente, integrando IA aos seus processos existentes de forma suave.",
      color: "bg-purple-500/10 text-purple-600 border-purple-200"
    },
    {
      step: "4",
      title: "Evoluir",
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      description: "Monitoramos resultados, otimizamos performance e implementamos melhorias contínuas para evolução constante do seu negócio.",
      color: "bg-orange-500/10 text-orange-600 border-orange-200"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="methodology" className="py-10 bg-background relative">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.2]" />
      
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            O <span className="text-primary">Ciclo 4E</span> da EficienciIA
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8">
            Na EficienciIA, acreditamos que a adoção de Inteligência Artificial precisa ser simples e estratégica. 
            Por isso, criamos o <strong>Ciclo 4E</strong>: uma metodologia própria que vai do diagnóstico à evolução contínua.
          </p>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Nós escutamos seu cenário, exploramos as melhores soluções, executamos a implementação prática e evoluímos seu negócio com melhorias constantes. 
            Assim, você não só adota IA – você cria um <strong>ciclo de eficiência real e sustentável</strong>.
          </p>
        </motion.div>

        {/* Ciclo 4E Visual */}
        <div className="relative mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {cycleSteps.map((step, index) => (
              <motion.div key={step.title} variants={itemVariants} className="relative">
                {/* Arrow connector */}
                {index < cycleSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 z-10 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-primary/60" />
                  </div>
                )}
                
                <Card className="group h-full rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-1 transition-all hover:neon-ring text-center">
                  <CardHeader className="pb-4">
                    <div className="mb-4 flex justify-center">
                      <div className={`inline-flex items-center justify-center rounded-full border px-3 py-1 text-sm font-medium ${step.color}`}>
                        {step.step}
                      </div>
                    </div>
                    <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-4 text-primary neon-ring mx-auto">
                      {step.icon}
                    </div>
                    <CardTitle className="text-xl font-bold tracking-tight">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Ciclo contínuo indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
              <RefreshCw className="h-5 w-5 text-primary animate-spin" />
              <span className="text-primary font-medium">Ciclo de Inovação Contínua</span>
            </div>
          </motion.div>
        </div>

        {/* Call to action */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground text-lg mb-6">
            Cada cliente entra em um ciclo de inovação contínua, sempre crescendo em maturidade com a IA.
          </p>
          <div className="inline-flex items-center gap-2 text-primary font-medium">
            <span>Pronto para começar seu ciclo de eficiência?</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </motion.div> */}
      </div>
    </section>
  );
} 