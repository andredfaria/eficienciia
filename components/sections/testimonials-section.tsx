"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, ExternalLink } from "lucide-react";
import Image from "next/image";

type Sector = "teleatendimento" | "construcao" | "ecommerce" | "imobiliaria" | "tecnologia";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  sector: Sector;
  initials: string;
  image: string;
  link: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "A Eficienci IA transformou nossa operação na Youcon com uma estrutura robusta de banco de dados, implementação da cultura de IA na empresa e integração entre CRM e disparos de mensagens. Mais automação, eficiência e visão estratégica para o negócio.",
    name: "Thiago Cardim",
    role: "CEO",
    company: "YouCon Projetos",
    sector: "construcao",
    initials: "TC",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQFaeC7IRyBYiQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724012840249?e=1779926400&v=beta&t=6SBZUJ-Ge45kQcu8s9JXDVDY1HTdvqYhLFWuChufOvs",
    link: "https://youconprojetos.com.br",
  },
  {
    quote:
      "André é um ótimo profissional com entregas de qualidade e rápidas. Além disso presta um ótimo suporte. Nossos clientes tiveram ganhos de eficiência em suas operações por conta dos agentes e automações criados pelo André.",
    name: "Rafa Markovits",
    role: "CEO",
    company: "Indominus",
    sector: "tecnologia",
    initials: "RM",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQHlcd30SK6UMA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723574877265?e=1779926400&v=beta&t=4exTjik5i1IY2eED-0OcW-wHH_zRYNQeRPib83sx8rc",
    link: "https://indominus.com.br",
  },
  {
    quote:
      "A Eficienci IA automatizou todo nosso pré-atendimento, integrando leads da Meta e redes sociais ao CRM enviando para uma plataforma de atendimento com IA generativa para qualificação e atendimento inicial,com isso tivemos mais eficiência, escala, produtividade e controle de dados",
    name: "André Mattos",
    role: "Gerente de Vendas",
    company: "Mattos Imobiliária",
    sector: "imobiliaria",
    initials: "AM",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQHNj7P74WRncw/profile-displayphoto-crop_800_800/B4DZ12rmXyIEAM-/0/1775812635185?e=1779926400&v=beta&t=Ba7i-wa5aI4veQN6iIWxkUFey3rG0xlxIcrHfrDGb8k",
    link: "https://www.mattosimobiliaria.com.br",
  },
]

const sectorColors: Record<Sector, string> = {
  teleatendimento: "from-blue-500 to-cyan-500",
  construcao: "from-orange-500 to-amber-500",
  ecommerce: "from-green-500 to-emerald-500",
  imobiliaria: "from-purple-500 to-violet-500",
  tecnologia: "from-indigo-500 to-purple-500",
};

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [activeIndex]);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () =>
    setActiveIndex((i) => (i + 1) % testimonials.length);

  const active = testimonials[activeIndex];

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
          <div className="relative rounded-2xl border border-primary/20 bg-card/80 backdrop-blur-sm shadow-lg p-8 md:p-10 neon-ring">
            <Quote className="h-10 w-10 text-primary/30 mb-4" />

            <AnimatePresence mode="wait">
              <motion.p
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-lg md:text-xl text-foreground leading-relaxed italic mb-8"
              >
                &ldquo;{active.quote}&rdquo;
              </motion.p>
            </AnimatePresence>

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
                  className={`relative h-14 w-14 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br ${sectorColors[active.sector]}`}
                >
                  {!imgError && (
                    <Image
                      src={active.image}
                      alt={active.name}
                      fill
                      className="object-cover"
                      unoptimized
                      onError={() => setImgError(true)}
                    />
                  )}
                  {imgError && (
                    <div className="flex h-full w-full items-center justify-center text-white font-bold text-sm">
                      {active.initials}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">
                    {active.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-primary truncate">
                      {active.role} &middot; {active.company}
                    </p>
                    <a
                      href={active.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
                      aria-label={`Abrir site de ${active.name}`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              aria-label="Depoimento anterior"
              className="p-2 rounded-full border border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

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
