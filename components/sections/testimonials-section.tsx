"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// TODO: substituir placeholders por depoimentos reais de clientes

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  sector: "teleatendimento" | "construcao" | "ecommerce" | "imobiliaria";
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Reduzimos 60% do volume de atendimento manual em apenas 3 semanas. A equipe passou a focar em casos complexos e a satisfação do cliente subiu junto.",
    name: "Marcos R.",
    role: "Diretor de Operações",
    company: "Contact Center",
    sector: "teleatendimento",
    initials: "MR",
  },
  {
    quote:
      "Os orçamentos que levavam 2 dias agora saem em 20 minutos. Transformou completamente nossa operação de projetos.",
    name: "Carla T.",
    role: "Sócia",
    company: "Construtora",
    sector: "construcao",
    initials: "CT",
  },
  {
    quote:
      "Nossa taxa de recompra subiu 40% após a automação de remarketing. O ROI apareceu em 6 semanas.",
    name: "Felipe L.",
    role: "CEO",
    company: "E-commerce",
    sector: "ecommerce",
    initials: "FL",
  },
  {
    quote:
      "Nossos corretores dobraram o número de visitas agendadas. A IA qualifica os leads, eles fecham negócio.",
    name: "Ana P.",
    role: "Diretora Comercial",
    company: "Imobiliária",
    sector: "imobiliaria",
    initials: "AP",
  },
];

const sectorColors: Record<Testimonial["sector"], string> = {
  teleatendimento: "from-blue-500 to-cyan-500",
  construcao: "from-orange-500 to-amber-500",
  ecommerce: "from-green-500 to-emerald-500",
  imobiliaria: "from-purple-500 to-violet-500",
};

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () =>
    setActiveIndex((i) => (i + 1) % testimonials.length);

  const active = testimonials[activeIndex];
  if (true) return null;
  return (
    <section id="testimonials" className="py-10 bg-background relative">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.15]" />

      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            O que nossos{" "}
            <span className="text-primary">clientes dizem</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Resultados reais de empresas que transformaram sua operação com IA.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {/* Card */}
          <div className="relative rounded-2xl border border-primary/20 bg-card/80 backdrop-blur-sm shadow-lg p-8 md:p-10 neon-ring">
            {/* Quote icon */}
            <Quote className="h-10 w-10 text-primary/30 mb-4" />

            {/* Quote text with animation */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-lg md:text-xl text-foreground leading-relaxed italic mb-8"
              >
                "{active.quote}"
              </motion.p>
            </AnimatePresence>

            {/* Author */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`author-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4"
              >
                <div
                  className={`h-12 w-12 rounded-full bg-gradient-to-br ${sectorColors[active.sector]} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                >
                  {active.initials}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{active.name}</p>
                  <p className="text-sm text-primary">
                    {active.role} · {active.company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              aria-label="Depoimento anterior"
              className="p-2 rounded-full border border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Depoimentos">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Ir para depoimento ${i + 1}`}
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-6 h-2.5 bg-primary"
                      : "w-2.5 h-2.5 bg-border hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Próximo depoimento"
              className="p-2 rounded-full border border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
