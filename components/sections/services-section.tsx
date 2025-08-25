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
    <section id="services" className="py-10 bg-background relative">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.2]" />
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
      {/* Highlighted Pillars Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Conheça nossos <span className="text-primary">Serviços</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Uma abordagem completa que combina estratégia, execução e soluções imediatas para transformar seu negócio com IA.
          </p>
        </motion.div>

        {/* Enhanced Pillar Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
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
              <div className="absolute px-6 py-2 -top-4 left-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg whitespace-nowrap">
                Estratégica
              </div>
              
              <CardHeader className="pb-4 pt-8">
                <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-blue-600/10 p-4 text-blue-600 border border-blue-200 dark:border-blue-800">
                  <Target className="h-12 w-12" />
                </div>
                <CardTitle className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3">
                  Consultoria Estratégica de IA
                </CardTitle>
                <CardDescription className="text-blue-700 dark:text-blue-300 text-base leading-relaxed">
                  Planejamento e diagnóstico completo baseado no cenario atual da sua empresa, roadmap detalhado e análise precisa de ROI para maximizar o impacto da IA no seu negócio.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Diagnóstico da empresa 
                  </div>
                  <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Roadmap de implementação
                  </div>
                  <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Análise de ROI
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
              <div className="absolute px-6 py-2 -top-4 left-6 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg whitespace-nowrap">
              Implementação
              </div>
              
              <CardHeader className="pb-4 pt-8">
                <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-green-600/10 p-4 text-green-600 border border-green-200 dark:border-green-800">
                  <Cog className="h-12 w-12" />
                </div>
                <CardTitle className="text-xl font-bold text-green-900 dark:text-green-100 mb-3">
                  Implementação e Automação
                </CardTitle>
                <CardDescription className="text-green-700 dark:text-green-300 text-base leading-relaxed">
                  Desenvolvimento de soluções de software ou automação customizadas com integração com whatsapp, CRM ou sitema interno da sua empresa.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Ferramentas sob medida
                  </div>
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Integração multi-plataforma
                  </div>
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Automação de processos
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
              <div className="absolute px-6 py-2 -top-4 left-6 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg whitespace-nowrap">
              Produtos
              </div>
              
              <CardHeader className="pb-4 pt-8">
                <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-purple-600/10 p-4 text-purple-600 border border-purple-200 dark:border-purple-800">
                  <Zap className="h-12 w-12" />
                </div>
                <CardTitle className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-3">
                  Produtos Plug & Play
                </CardTitle>
                <CardDescription className="text-purple-700 dark:text-purple-300 text-base leading-relaxed">
                  Soluções prontas para implementação imediata: Sistema de mensageria, bots de atendimento, automação de marketing, instalação de ferramentas no-code, etc.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-purple-600 dark:text-purple-400">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    Bots de atendimento automático
                  </div>
                  <div className="flex items-center text-sm text-purple-600 dark:text-purple-400">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    Automação de marketing
                  </div>
                  <div className="flex items-center text-sm text-purple-600 dark:text-purple-400">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    Ferramentas no-code
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