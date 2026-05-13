"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  Target, 
  FileBarChart, 
  TrendingUp, 
  Cog, 
  Smartphone, 
  Zap, 
  Bot, 
  MessageSquare, 
  Users, 
  Globe
} from "lucide-react";

export function ServicesSection() {

  return (
    <section id="services" className="py-12 md:py-10 bg-background relative">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.2]" />
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
      {/* Highlighted Pillars Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-10 md:mb-16 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Como a Eficienci IA <span className="text-primary">trabalha</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto mb-10 md:mb-12">
            Da estratégia ao produto — escolha o ponto de entrada que faz mais sentido para o momento da sua empresa.
          </p>
        </motion.div>

        {/* Enhanced Pillar Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20"
        >
          {/* Pilar 1 - Consultoria Estratégica */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="group"
          >
            <Card className="relative h-full bg-gradient-to-br from-blue-50/80 to-blue-100/60 dark:from-blue-950/30 dark:to-blue-900/20 border-2 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 neon-ring-blue">
              {/* Número do Pilar */}
              <div className="absolute px-5 py-1.5 -top-3 md:-top-4 left-4 md:left-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs md:text-sm shadow-lg whitespace-nowrap">
                Estratégica
              </div>
              
              <CardHeader className="pb-3 md:pb-4 pt-7 md:pt-8">
                <div className="mb-3 md:mb-4 inline-flex items-center justify-center rounded-xl bg-blue-600/10 p-3 md:p-4 text-blue-600 border border-blue-200 dark:border-blue-800">
                  <Target className="h-10 w-10 md:h-12 md:w-12" />
                </div>
                <CardTitle className="text-lg md:text-xl font-bold text-blue-900 dark:text-blue-100 mb-2 md:mb-3">
                  Consultoria Estratégica de IA
                </CardTitle>
                <CardDescription className="text-blue-700 dark:text-blue-300 text-sm md:text-base leading-relaxed">
                  Mapeamos seu negócio, identificamos onde a IA gera mais impacto e entregamos um roadmap executável com ROI projetado — antes de você investir um real na implementação.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Diagnóstico completo do negócio
                  </div>
                  <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Roadmap priorizado por impacto
                  </div>
                  <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Projeção de ROI por iniciativa
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pilar 2 - Implementação */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="group"
          >
            <Card className="relative h-full bg-gradient-to-br from-green-50/80 to-green-100/60 dark:from-green-950/30 dark:to-green-900/20 border-2 border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1 neon-ring-green">
              {/* Número do Pilar */}
              <div className="absolute px-5 py-1.5 -top-3 md:-top-4 left-4 md:left-6 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xs md:text-sm shadow-lg whitespace-nowrap">
              Implementação
              </div>
              
              <CardHeader className="pb-3 md:pb-4 pt-7 md:pt-8">
                <div className="mb-3 md:mb-4 inline-flex items-center justify-center rounded-xl bg-green-600/10 p-3 md:p-4 text-green-600 border border-green-200 dark:border-green-800">
                  <Cog className="h-10 w-10 md:h-12 md:w-12" />
                </div>
                <CardTitle className="text-lg md:text-xl font-bold text-green-900 dark:text-green-100 mb-2 md:mb-3">
                  Implementação e Automação
                </CardTitle>
                <CardDescription className="text-green-700 dark:text-green-300 text-sm md:text-base leading-relaxed">
                  Desenvolvemos e integramos soluções de IA sob medida nos seus fluxos — WhatsApp, CRM, ERP ou sistema interno. Cada automação é construída para escalar sem aumentar sua equipe.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-2 md:pt-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Ferramentas de IA sob medida
                  </div>
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Integração com WhatsApp, CRM e ERP
                  </div>
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Automações que escalam sem equipe
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pilar 3 - Plug & Play */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="group"
          >
            <Card className="relative h-full bg-gradient-to-br from-purple-50/80 to-purple-100/60 dark:from-purple-950/30 dark:to-purple-900/20 border-2 border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 neon-ring-purple">
              {/* Número do Pilar */}
              <div className="absolute px-5 py-1.5 -top-3 md:-top-4 left-4 md:left-6 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs md:text-sm shadow-lg whitespace-nowrap">
              Produtos
              </div>
              
              <CardHeader className="pb-3 md:pb-4 pt-7 md:pt-8">
                <div className="mb-3 md:mb-4 inline-flex items-center justify-center rounded-xl bg-purple-600/10 p-3 md:p-4 text-purple-600 border border-purple-200 dark:border-purple-800">
                  <Zap className="h-10 w-10 md:h-12 md:w-12" />
                </div>
                <CardTitle className="text-lg md:text-xl font-bold text-purple-900 dark:text-purple-100 mb-2 md:mb-3">
                  Soluções Prontas para Usar
                </CardTitle>
                <CardDescription className="text-purple-700 dark:text-purple-300 text-sm md:text-base leading-relaxed">
                  Para quem precisa de resultado rápido: bots de atendimento 24/7, automação de marketing e ferramentas no-code prontas para ativar em dias, não meses.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-purple-600 dark:text-purple-400">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    Atendimento automático 24/7
                  </div>
                  <div className="flex items-center text-sm text-purple-600 dark:text-purple-400">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    Automação de marketing e remarketing
                  </div>
                  <div className="flex items-center text-sm text-purple-600 dark:text-purple-400">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    Ativação em dias, não meses
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 