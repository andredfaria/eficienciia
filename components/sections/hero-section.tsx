"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroSection() {
  const rotatingWords = [
    "Automatize",
    "Otimize",
    "Escale",
    "Preveja",
    "Personalize",
    "Proteja",
    "Integre",
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const currentWord = rotatingWords[wordIndex];

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background/10 z-0" />

      {/* Animated background particles/grid */}
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
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span id="troca-palavra" className="inline-flex relative min-w-[9ch] mr-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWord}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block text-primary neon-text"
                  >
                    {currentWord}
                  </motion.span>
                </AnimatePresence>
              </span>
              <br/> seu negócio com IA
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Acelere a eficiência, reduza custos e escale com agentes autônomos e automações de IA.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button
                size="lg"
                className="rounded-full text-lg group hover:shadow-[0_0_0_1px_hsl(var(--primary)/.45),0_0_20px_hsl(var(--primary)/.35),0_0_40px_hsl(var(--primary)/.25)]"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Automatize com IA
                <ChevronRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
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
              alt="AI and Cloud Infrastructure"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl object-cover neon-ring"
              priority
            />

            {/* Floating elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.6,
                  duration: 0.5,
                },
              }}
              className="absolute -bottom-10 -left-10 bg-card/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border neon-ring"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-green-500/20 p-2 rounded-full">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Escalável</p>
                  <p className="text-xs text-muted-foreground"></p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.7,
                  duration: 0.5,
                },
              }}
              className="absolute top-0 right-0 bg-card/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-border neon-ring"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500/20 p-2 rounded-full">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                </div>
                <p className="text-sm font-medium">Segurança</p>
                <p className="text-xs text-muted-foreground"></p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.8,
                  duration: 0.5,
                },
              }}
              className="absolute top-0 left-0 bg-card/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border neon-ring"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500/20 p-2 rounded-full">
                  <div className="h-3 w-3 rounded-full bg-purple-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Eficiente</p>
                  <p className="text-xs text-muted-foreground"></p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}