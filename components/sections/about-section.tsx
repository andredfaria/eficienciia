"use client";

import { motion } from "framer-motion";
import { ExternalLink, FolderOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  const founders = [
    {
      name: "André de Faria Carvalho",
      role: "Engenheiro de Software",
      bio: "Especialista em Inteligência Artificial Generativa, AWS e Microsserviços. Aplica seu conhecimento técnico no desenvolvimento de soluções inovadoras.",
      image: "/andre.jpg",
      linkedin: "https://www.linkedin.com/in/andre-de-faria/",
    },
    // {
    //   name: "Lincoln Marques",
    //   role: "Desenvolvedor Full Stack",
    //   bio: "Especialista em NextJS, ReactJS e NodeJS. Sua expertise contribui para a criação de aplicações web robustas e eficientes.",
    //   image:
    //     "https://media.licdn.com/dms/image/v2/C4E03AQFmeKBCvDybDw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1617041129961?e=1754524800&v=beta&t=lBpQhQAY8Q1ICCWeOjlhBzXcXnLCtSTGgyI9sACMIEI",
    //   linkedin: "https://linkedin.com/",
    // },
    {
      name: "João Victor Oliveira",
      role: "Especialista em Produto e Growth",
      bio: "Combina visão estratégica de produto com expertise em crescimento para transformar ideias inovadoras em soluções de mercado.",
      image: "/joao.jpeg",
      linkedin: "https://www.linkedin.com/in/joaovictor-oliveira/",
    },
  ];

  return (
    <section id="about" className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Quem somos nós?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nossa equipe tem experiência em engenharia de software, inteligência
            artificial, ciência de dados e estratégia de produto. Nós somos a
            Eficienci IA, uma empresa que automatiza processos e evolui ideias em produtos
            escaláveis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-72">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover w-full h-full "
                />
                grayscale
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{founder.name}</h3>
                <p className="text-primary font-medium mb-3">{founder.role}</p>
                <p className="text-muted-foreground mb-4">{founder.bio}</p>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  LinkedIn
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold mb-4">
            Conheça nossos projetos
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Veja alguns dos projetos que desenvolvemos e como automatizamos operações com soluções de IA inovadoras.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link href="/project">
              <FolderOpen className="mr-2 h-5 w-5" />
              Ver Projetos
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}