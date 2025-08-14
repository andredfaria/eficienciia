"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border relative">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.1]" />
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="text-2xl font-bold text-primary neon-text mb-4">
              Eficienci IA
            </div>
            <p className="text-muted-foreground max-w-md">
              IA sob medida, servidores de alta performance e automações inteligentes para gerar eficiência, previsibilidade e vantagem competitiva.
            </p>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-border mt-12 pt-6 text-center"
        >
          <p className="text-muted-foreground">
            © {currentYear} Eficienci IA. Todos os direitos reservados.
          </p>
          <p className="text-muted-foreground mt-2 font-medium">
            Soluções de IA personalizadas além da automação.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}