# Hero Dynamic Phrase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tornar a parte em destaque do H1 no HeroSection dinâmica, rotacionando 7 frases com animação slide + fade usando framer-motion.

**Architecture:** Adicionar `useState` + `useEffect` com intervalo de 3500ms ao componente `HeroSection` existente. O `<span>` estático da frase é substituído por um `AnimatePresence` + `motion.span` com `key={currentIndex}` para triggar animação a cada troca. Remover o travessão (`—`) do texto fixo do H1.

**Tech Stack:** React (useState, useEffect), framer-motion (AnimatePresence, motion), Next.js App Router

---

### Task 1: Implementar frase dinâmica no HeroSection

**Files:**
- Modify: `components/sections/hero-section.tsx`

- [ ] **Step 1: Verificar o arquivo atual**

Abrir `components/sections/hero-section.tsx` e confirmar que a linha 41 contém:
```tsx
Da estratégia à execução —{" "}
```
e a linha 42-44:
```tsx
<span className="text-primary neon-text">
  IA que gera resultado real
</span>
```

- [ ] **Step 2: Substituir o conteúdo completo do arquivo**

Substituir `components/sections/hero-section.tsx` pelo conteúdo abaixo:

```tsx
"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const phrases = [
  "IA que gera resultado real",
  "IA que gera ROI mensurável",
  "IA que escala sem equipe extra",
  "IA que automatiza o que trava",
  "IA pra você se destacar",
  "IA com eficiência real",
  "IA do diagnóstico à entrega",
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background/10 z-0" />
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 tech-grid opacity-[0.25]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xs font-semibold tracking-widest uppercase text-primary"
            >
              Consultoria Especializada em IA
            </motion.p>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Da estratégia à execução{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentIndex}
                  className="text-primary neon-text inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                >
                  {phrases[currentIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Identificamos as melhores oportunidades de automação no seu
              negócio e implementamos soluções de IA com foco em eficiência,
              escala e ROI mensurável.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <Button
                size="lg"
                className="rounded-full text-lg group hover:shadow-[0_0_0_1px_hsl(var(--primary)/.45),0_0_20px_hsl(var(--primary)/.35),0_0_40px_hsl(var(--primary)/.25)]"
                onClick={() =>
                  window.open(
                    "https://wa.me/5535991404064?text=Olá%20vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20informações%20sobre%20a%20EFICIENCI%20IA,%20QUERO%20AUTOMATICAR%20MEU%20NEGOCIO",
                    "_blank"
                  )
                }
              >
                Quero uma consultoria
                <ChevronRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-full text-lg"
                onClick={() => {
                  document
                    .getElementById("sectors")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Ver cases por setor
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="relative"
          >
            <Image
              src="/hero-illustration.png"
              alt="Consultoria em IA e automação empresarial — Eficienci IA"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl object-cover neon-ring"
              priority
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.5 } }}
              className="absolute -bottom-10 -left-10 bg-card/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border neon-ring"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-green-500/20 p-2 rounded-full">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <p className="text-sm font-medium">Escala sem equipe extra</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.5 } }}
              className="absolute top-0 right-0 bg-card/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-border neon-ring"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500/20 p-2 rounded-full">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                </div>
                <p className="text-sm font-medium">Dados protegidos</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.8, duration: 0.5 } }}
              className="absolute top-0 left-0 bg-card/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border neon-ring"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500/20 p-2 rounded-full">
                  <div className="h-3 w-3 rounded-full bg-purple-500" />
                </div>
                <p className="text-sm font-medium">ROI mensurável</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verificar que o servidor dev compila sem erros**

```bash
bun dev
```

Abrir `http://localhost:3000` e confirmar:
- H1 exibe "Da estratégia à execução IA que gera resultado real" (sem travessão)
- A cada ~3.5s a frase muda com animação slide + fade
- Sem erros no console do browser

- [ ] **Step 4: Commit**

```bash
git add components/sections/hero-section.tsx docs/superpowers/specs/2026-04-14-hero-dynamic-phrase-design.md docs/superpowers/plans/2026-04-14-hero-dynamic-phrase.md
git commit -m "feat: add dynamic rotating phrase animation to HeroSection"
```
