"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  Code2, 
  Database, 
  Globe, 
  LockIcon, 
  Rocket 
} from "lucide-react";

export function ValueSection() {
  const valueProps = [
    {
      icon: <Code2 className="h-10 w-10 text-chart-1" />,
      title: "Código que cresce com você",
      description: "MVPs quebram. Nós reestruturamos seu código com padrões profissionais, para que ele suporte novas features, times maiores e crescimento real sem virar um caos."
    },
    {
      icon: <Rocket className="h-10 w-10 text-chart-2" />,
      title: "Pronto para escalar, sem medo de cair",
      description: "Sua ideia merece voar alto. Por isso, entregamos uma infraestrutura que cresce automaticamente com sua base de usuários, com balanceamento de carga, filas assíncronas e alta disponibilidade."
    },
    {
      icon: <Database className="h-10 w-10 text-chart-3" />,
      title: "IA com contexto, memória e precisão",
      description: "Criamos pipelines inteligentes com banco de dados vetorial e personalização por usuário, para que sua IA fale com contexto real — e não pareça um chatbot genérico."
    },
    {
      icon: <LockIcon className="h-10 w-10 text-chart-4" />,
      title: "Segurança de verdade, não um pensamento depois",
      description: "Protegemos seus dados com criptografia, autenticação segura e padrões LGPD/GDPR. Seu produto fica pronto para auditorias, integrações e confiança de investidores."
    },
    {
      icon: <Code2 className="h-10 w-10 text-chart-5" />,
      title: "Seu código, compreensível por qualquer dev",
      description: "Estruturamos seu projeto com Clean Code, testes automatizados e documentação clara — seu time não ficará preso a quem criou o MVP original."
    },
    {
      icon: <Globe className="h-10 w-10 text-chart-1" />,
      title: "Ranqueado, rápido e visível",
      description: "Aplicamos práticas modernas de SEO, performance web e acessibilidade. Seu produto aparece no Google, carrega em milissegundos e funciona para todos."
    }
  ];

  return (
    <section id="value" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Por que transformar seu MVP em um produto profissional?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A diferença entre um experimento e um negócio está nos detalhes técnicos 
            que garantem solidez, segurança e escalabilidade.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {prop.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">{prop.title}</h3>
                <p className="text-muted-foreground">{prop.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}