"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useState, FormEvent } from "react";


export function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      telefone: formData.get("telefone"),
      objetivos: formData.get("objetivos"),
      desafio: formData.get("desafio"),
      site: formData.get("site"),
    };

    try {
      const response = await fetch("https://n8n.eficienciia.com.br/webhook/salva-formulario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("Mensagem enviada com sucesso! Entraremos em contato em breve.");
        (e.target as HTMLFormElement).reset();
      } else {
        setMessage("Erro ao enviar mensagem. Tente novamente.");
      }
    } catch (error) {
      setMessage("Erro ao enviar mensagem. Verifique sua conexão e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-12 bg-background relative">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.16]" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
            Fale com Especialistas em IA
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Conte-nos sobre sua necessidade. Desenhamos soluções de IA personalizadas com foco em performance, ROI e escalabilidade.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-2xl mx-auto bg-card/80 backdrop-blur-md rounded-lg shadow-lg border border-border p-4 md:p-6 neon-ring"
        >
          <form 
            onSubmit={handleSubmit}
            className="space-y-3 md:space-y-4"
          >
            {message && (
              <div className={`p-3 rounded-lg text-sm ${
                message.includes("sucesso") 
                  ? "bg-green-500/10 text-green-500 border border-green-500/20" 
                  : "bg-red-500/10 text-red-500 border border-red-500/20"
              }`}>
                {message}
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="text-xs md:text-sm font-medium">Nome</label>
                <Input 
                  placeholder="Seu nome completo" 
                  className="h-11 md:h-9 mt-1"
                  name="name"
                />
              </div>

              <div>
                <label className="text-xs md:text-sm font-medium">Telefone</label>
                <Input 
                  placeholder="(11) 99999-9999" 
                  className="h-11 md:h-9 mt-1"
                  name="telefone"
                  type="tel"
                />
              </div>
            </div>

            <div>
              <label className="text-xs md:text-sm font-medium">Objetivos</label>
              <Textarea
                placeholder="Descreva brevemente o objetivo e o impacto esperado"
                className="resize-none h-20 md:h-20 mt-1"
                name="objetivos"
              />
            </div>

            <div>
              <label className="text-xs md:text-sm font-medium">Principal desafio de negócio</label>
              <Textarea
                placeholder="Quais indicadores você quer melhorar?"
                className="resize-none h-20 md:h-20 mt-1"
                name="desafio"
              />
            </div>

            <div>
              <label className="text-xs md:text-sm font-medium">Site ou rede social <span className="text-muted-foreground">(opcional)</span></label>
              <Input 
                placeholder="seusite.com.br" 
                className="h-11 md:h-9 mt-1"
                name="site"
              />
            </div>

            <Button type="submit" className="w-full h-11 md:h-9" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar"}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}