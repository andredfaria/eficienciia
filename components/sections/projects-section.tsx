"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function ProjectsSection() {
  const projects = [
    {
      title: "Concursy - Plataforma de Venda de simulados para concursos",
      description: "Empresa focada em venda de simulados para concursos.",
      image: "/concursy.png",
      technologies: [
        "Next.js",
        "Supabase",
        "TailwindCSS",
        "Shadcn UI",
        "Stripe",
        "Hotmart",
      ],
      demoUrl: "https://www.concursy.com.br/",
      githubUrl: "https://github.com/andredfaria/concursy",
      status: "Em produção",
    },
    {
      title: "Sistema de Gerenciamento e analise de QR code",
      description:
        "Altere o destino do seu código QR a qualquer momento sem reimprimir. Redirecionando você para o futuro.",
      image: "/qrcode.png",
      technologies: ["Next.js", "Supabase", "Stripe", "Hotmart", "Vercel"],
      demoUrl: "https://qrscode.vercel.app/",
      status: "Concluído",
    },
    {
      title: "Crie Posts Engajantes para Seu Restaurante",
      description:
        "Assistente de Instagram que gera posts de forma automática e personalizada para restaurantes.",
      image: "/food.png",
      technologies: ["React", "Node.js", "Postgres", "GPT-4", "DALL-E"],
      demoUrl: "https://foodpost-generator.vercel.app/",
      status: "Em desenvolvimento",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nossos Projetos
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conheça alguns dos projetos que desenvolvemos, transformando ideias
            inovadoras em soluções robustas e escaláveis de inteligência
            artificial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.status === "Em desenvolvimento"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      asChild
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Código
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold mb-4">
            Quer ver seu projeto aqui?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Entre em contato conosco e vamos transformar sua ideia em uma
            solução robusta e escalável.
          </p>
          <Button
              size="lg"
              className="rounded-full"
              asChild
            >
              <Link href="/#contact">
                Entre em contato
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
        </motion.div>
      </div>
    </section>
  );
} 