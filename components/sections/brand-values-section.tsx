"use client";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Sparkles,
  Award,
  ShieldCheck,
  Users,
  Rocket,
} from "lucide-react";

export function BrandValuesSection() {
  return (
    <section id="valores" className="relative py-24 overflow-hidden">
      {/* Background ornaments */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-10 -right-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-secondary/25 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/0" />
        <div className="absolute inset-0 tech-grid opacity-[0.18]" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12"
        >

          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent neon-text">
              Posicionamento de Marca
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground text-lg max-w-3xl">
            Profissional, inovadora e clara: comunicamos valor real sem jargões, com foco no que resolve o seu problema e gera resultados.
          </p>
        </motion.div>

        {/* Missão e Visão */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            {
              title: "Missão",
              desc:
                "Acelerar a eficiência e a inovação dos nossos clientes com soluções de IA sob medida e de alta performance.",
              Icon: Target,
            },
            {
              title: "Visão",
              desc:
                "Ser referência em IA aplicada, reconhecida por excelência técnica, inovação e impacto mensurável em negócios.",
              Icon: Eye,
            },
          ].map(({ title, desc, Icon }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md hover:neon-ring"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/60 via-secondary to-primary/60 opacity-90" />
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3 text-primary neon-ring">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Valores */}
        <div className="py-12">
          <h3 className="text-3xl font-bold mb-6">Valores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Inovação",
                desc:
                  "Vanguarda tecnológica: exploramos e aplicamos o que há de mais atual em IA e engenharia.",
                Icon: Sparkles,
              },
              {
                title: "Excelência",
                desc: "Qualidade de ponta a ponta: do discovery à operação e suporte contínuo.",
                Icon: Award,
              },
              {
                title: "Integridade",
                desc: "Transparência e responsabilidade em cada decisão técnica e de negócio.",
                Icon: ShieldCheck,
              },
              {
                title: "Foco em Resultados",
                desc: "Metas claras, indicadores definidos e ROI comprovado.",
                Icon: Rocket,
              },
            ].map(({ title, desc, Icon }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
              className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition hover:neon-ring"
              >
                <div className="mb-3 flex items-center gap-3">
                <div className="rounded-md bg-primary/10 p-2 text-primary neon-ring">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-semibold text-lg">{title}</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
