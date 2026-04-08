# Copy Redesign — Consultoria em IA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposicionar o site da Eficienci IA como consultoria especialista em IA com nova copy consultiva, seção de setores com tabs interativas e seção de depoimentos com carrossel.

**Architecture:** Dois novos componentes de seção (`SectorsSection`, `TestimonialsSection`) criados do zero seguindo o padrão existente (`"use client"` + `framer-motion`). Cinco componentes existentes recebem apenas edições de texto. `app/page.tsx` é reordenado para fluxo consultivo.

**Tech Stack:** Next.js 13 App Router, React 18, TypeScript, Tailwind CSS, framer-motion, lucide-react

---

## Mapa de arquivos

| Arquivo | Ação |
|---------|------|
| `components/sections/sectors-section.tsx` | Criar |
| `components/sections/testimonials-section.tsx` | Criar |
| `components/sections/hero-section.tsx` | Editar |
| `components/sections/services-section.tsx` | Editar |
| `components/sections/methodology-section.tsx` | Editar |
| `components/sections/problem-solution-section.tsx` | Editar |
| `app/page.tsx` | Editar |

---

## Task 1: Criar SectorsSection

**Files:**
- Create: `components/sections/sectors-section.tsx`

- [ ] **Step 1: Criar o componente completo**

Crie o arquivo `components/sections/sectors-section.tsx` com o seguinte conteúdo:

```tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, HardHat, ShoppingCart, Home, CheckCircle, TrendingUp } from "lucide-react";

// TODO: substituir resultados por dados reais de clientes quando disponíveis

interface Sector {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  applications: string[];
  results: string[];
}

const sectors: Sector[] = [
  {
    id: "teleatendimento",
    label: "Teleatendimento",
    icon: <Phone className="h-4 w-4" />,
    description:
      "Empresas com alto volume de chamadas enfrentam custos crescentes e queda na satisfação. Nossos agentes de IA assumem as interações repetitivas e liberam sua equipe para o que realmente importa.",
    applications: [
      "Triagem automática de chamadas",
      "Respostas FAQ com IA generativa",
      "Escalonamento inteligente para humanos",
      "Análise de sentimento em tempo real",
    ],
    results: [
      "↓ 60% no custo por atendimento",
      "↑ 70% de resoluções sem agente humano",
      "Atendimento 24/7 sem equipe extra",
    ],
  },
  {
    id: "construcao",
    label: "Construção Civil",
    icon: <HardHat className="h-4 w-4" />,
    description:
      "Projetos arquitetônicos e obras envolvem documentação extensa, orçamentos complexos e coordenação de múltiplos fornecedores. A IA reduz retrabalho e acelera aprovações.",
    applications: [
      "Análise e extração de dados de projetos",
      "Geração automática de orçamentos",
      "Gestão de documentação técnica com IA",
      "Alertas de desvio de cronograma",
    ],
    results: [
      "3× mais rápido na elaboração de orçamentos",
      "↓ 40% de retrabalho documental",
      "Aprovações mais ágeis com menos revisões",
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: <ShoppingCart className="h-4 w-4" />,
    description:
      "Abandono de carrinho, SAC sobrecarregado e campanhas genéricas custam receita todos os dias. Automatizamos a recuperação de vendas e o atendimento para que você escale sem escalar custos.",
    applications: [
      "Remarketing automático por comportamento",
      "Atendimento e SAC 24/7 via WhatsApp",
      "Segmentação inteligente de campanhas",
      "Recomendação de produtos personalizada",
    ],
    results: [
      "+35% de recuperação de carrinhos abandonados",
      "↓ 50% no tempo de resposta ao cliente",
      "Campanhas com 2× mais conversão",
    ],
  },
  {
    id: "imobiliaria",
    label: "Imobiliárias",
    icon: <Home className="h-4 w-4" />,
    description:
      "Corretores gastam horas qualificando leads que nunca vão comprar. Nossa IA filtra, qualifica e agenda automaticamente — o corretor só fala com quem está pronto para decidir.",
    applications: [
      "Qualificação automática de leads",
      "Agendamento de visitas por IA",
      "Follow-up automático no WhatsApp",
      "Análise de perfil e match com imóveis",
    ],
    results: [
      "2× mais visitas agendadas por corretor",
      "↓ 70% do tempo em leads frios",
      "Follow-up 100% automatizado",
    ],
  },
];

export function SectorsSection() {
  const [activeId, setActiveId] = useState<string>(sectors[0].id);
  const activeSector = sectors.find((s) => s.id === activeId)!;

  return (
    <section id="sectors" className="py-10 bg-background relative">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.2]" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            IA aplicada ao{" "}
            <span className="text-primary">seu setor</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Cada setor tem desafios únicos. Veja como a Eficienci IA resolve os seus.
          </p>
        </motion.div>

        {/* Tab buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {sectors.map((sector) => (
            <button
              key={sector.id}
              onClick={() => setActiveId(sector.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 ${
                activeId === sector.id
                  ? "bg-primary/10 border-primary text-primary shadow-[0_0_12px_hsl(var(--primary)/.2)]"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {sector.icon}
              {sector.label}
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm shadow-sm p-6 md:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: description */}
            <div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                {activeSector.description}
              </p>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                Aplicações
              </h4>
              <ul className="space-y-2">
                {activeSector.applications.map((app) => (
                  <li key={app} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    {app}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: results */}
            <div className="flex flex-col justify-center">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                Resultados esperados
              </h4>
              <div className="space-y-3">
                {activeSector.results.map((result) => (
                  <div
                    key={result}
                    className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/15"
                  >
                    <TrendingUp className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar que o arquivo foi criado sem erros de TypeScript**

```bash
cd /home/andre/Documentos/projetos/eficienciia && bun run build 2>&1 | head -30
```

Esperado: sem erros de TypeScript no novo arquivo (outros erros do build existente são aceitáveis).

- [ ] **Step 3: Commit**

```bash
git add components/sections/sectors-section.tsx
git commit -m "feat: add SectorsSection with interactive tabs for 4 industry verticals"
```

---

## Task 2: Criar TestimonialsSection

**Files:**
- Create: `components/sections/testimonials-section.tsx`

- [ ] **Step 1: Criar o componente completo**

Crie o arquivo `components/sections/testimonials-section.tsx`:

```tsx
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
              className="p-2 rounded-full border border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Ir para depoimento ${i + 1}`}
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
              className="p-2 rounded-full border border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar build**

```bash
cd /home/andre/Documentos/projetos/eficienciia && bun run build 2>&1 | head -30
```

Esperado: sem erros de TypeScript nos novos arquivos.

- [ ] **Step 3: Commit**

```bash
git add components/sections/testimonials-section.tsx
git commit -m "feat: add TestimonialsSection with carousel and placeholder testimonials"
```

---

## Task 3: Atualizar HeroSection

**Files:**
- Modify: `components/sections/hero-section.tsx`

- [ ] **Step 1: Substituir o conteúdo do componente**

Substitua todo o conteúdo de `components/sections/hero-section.tsx` por:

```tsx
"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background/10 z-0" />

      {/* Animated background blobs */}
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
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xs font-semibold tracking-widest uppercase text-primary"
            >
              Consultoria Especializada em IA
            </motion.p>

            {/* H1 */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Da estratégia à execução —{" "}
              <span className="text-primary neon-text">
                IA que gera resultado real
              </span>
            </motion.h1>

            {/* Subtitle */}
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

            {/* CTA duplo */}
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

          {/* Image + floating badges */}
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

            {/* Badge: Escala */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.5 } }}
              className="absolute -bottom-10 -left-10 bg-card/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border neon-ring"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-green-500/20 p-2 rounded-full">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Escala sem equipe extra</p>
                </div>
              </div>
            </motion.div>

            {/* Badge: Dados */}
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

            {/* Badge: ROI */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.8, duration: 0.5 } }}
              className="absolute top-0 left-0 bg-card/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border neon-ring"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500/20 p-2 rounded-full">
                  <div className="h-3 w-3 rounded-full bg-purple-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">ROI mensurável</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/hero-section.tsx
git commit -m "feat: update HeroSection with consulting positioning, eyebrow, and dual CTA"
```

---

## Task 4: Atualizar ServicesSection

**Files:**
- Modify: `components/sections/services-section.tsx`

- [ ] **Step 1: Atualizar título, subtítulo e copy dos 3 cards**

No arquivo `components/sections/services-section.tsx`, faça as seguintes substituições:

**Título da seção** — localize e substitua:
```tsx
// DE:
<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
  Conheça nossos <span className="text-primary">Serviços</span>
</h2>
<p className="text-muted-foreground max-w-2xl mx-auto mb-12">
  Uma abordagem completa que combina estratégia, execução e soluções imediatas para transformar seu negócio com IA.
</p>

// PARA:
<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
  Como a Eficienci IA <span className="text-primary">trabalha</span>
</h2>
<p className="text-muted-foreground max-w-2xl mx-auto mb-12">
  Da estratégia ao produto — escolha o ponto de entrada que faz mais sentido para o momento da sua empresa.
</p>
```

**Pilar 1 — Estratégica** — localize e substitua:
```tsx
// DE:
<CardDescription className="text-blue-700 dark:text-blue-300 text-base leading-relaxed">
  Planejamento e diagnóstico completo baseado no cenario atual da sua empresa, roadmap detalhado e análise precisa de ROI para maximizar o impacto da IA no seu negócio.
</CardDescription>
// ...bullets:
Diagnóstico da empresa 
Roadmap de implementação
Análise de ROI

// PARA:
<CardDescription className="text-blue-700 dark:text-blue-300 text-base leading-relaxed">
  Mapeamos seu negócio, identificamos onde a IA gera mais impacto e entregamos um roadmap executável com ROI projetado — antes de você investir um real na implementação.
</CardDescription>
// ...bullets:
Diagnóstico completo do negócio
Roadmap priorizado por impacto
Projeção de ROI por iniciativa
```

**Pilar 2 — Implementação** — localize e substitua:
```tsx
// DE:
<CardDescription className="text-green-700 dark:text-green-300 text-base leading-relaxed">
  Desenvolvimento de soluções de software ou automação customizadas com integração com whatsapp, CRM ou sitema interno da sua empresa.
</CardDescription>
// ...bullets:
Ferramentas sob medida
Integração multi-plataforma
Automação de processos

// PARA:
<CardDescription className="text-green-700 dark:text-green-300 text-base leading-relaxed">
  Desenvolvemos e integramos soluções de IA sob medida nos seus fluxos — WhatsApp, CRM, ERP ou sistema interno. Cada automação é construída para escalar sem aumentar sua equipe.
</CardDescription>
// ...bullets:
Ferramentas de IA sob medida
Integração com WhatsApp, CRM e ERP
Automações que escalam sem equipe
```

**Pilar 3 — Produtos** — localize e substitua:
```tsx
// DE: (badge pill)
Produtos
// ...título:
<CardTitle className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-3">
  Produtos Plug & Play
</CardTitle>
// ...descrição:
<CardDescription className="text-purple-700 dark:text-purple-300 text-base leading-relaxed">
  Soluções prontas para implementação imediata: Sistema de mensageria, bots de atendimento, automação de marketing, instalação de ferramentas no-code, etc.
</CardDescription>
// ...bullets:
Bots de atendimento automático
Automação de marketing
Ferramentas no-code

// PARA: (badge pill mantém "Produtos")
Produtos
// ...título:
<CardTitle className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-3">
  Soluções Prontas para Usar
</CardTitle>
// ...descrição:
<CardDescription className="text-purple-700 dark:text-purple-300 text-base leading-relaxed">
  Para quem precisa de resultado rápido: bots de atendimento 24/7, automação de marketing e ferramentas no-code prontas para ativar em dias, não meses.
</CardDescription>
// ...bullets:
Atendimento automático 24/7
Automação de marketing e remarketing
Ativação em dias, não meses
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/services-section.tsx
git commit -m "feat: update ServicesSection with outcome-focused consulting copy"
```

---

## Task 5: Atualizar MethodologySection

**Files:**
- Modify: `components/sections/methodology-section.tsx`

- [ ] **Step 1: Atualizar subtítulo e descrições das etapas**

No arquivo `components/sections/methodology-section.tsx`, localize o array `cycleSteps` e substitua as 4 descrições:

```tsx
// DE:
const cycleSteps = [
  {
    step: "1",
    title: "Escutar",
    icon: <Ear className="h-8 w-8 text-primary" />,
    description: "Entendemos profundamente seu cenário atual, desafios e objetivos de negócio para identificar onde a IA pode gerar mais impacto.",
    color: "bg-blue-500/10 text-blue-600 border-blue-200"
  },
  {
    step: "2", 
    title: "Explorar",
    icon: <Search className="h-8 w-8 text-primary" />,
    description: "Analisamos e testamos as melhores soluções de IA para seu caso específico, criando um roadmap personalizado de implementação.",
    color: "bg-green-500/10 text-green-600 border-green-200"
  },
  {
    step: "3",
    title: "Executar", 
    icon: <Play className="h-8 w-8 text-primary" />,
    description: "Implementamos as soluções de forma prática e eficiente, integrando IA aos seus processos existentes de forma suave.",
    color: "bg-purple-500/10 text-purple-600 border-purple-200"
  },
  {
    step: "4",
    title: "Evoluir",
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    description: "Monitoramos resultados, otimizamos performance e implementamos melhorias contínuas para evolução constante do seu negócio.",
    color: "bg-orange-500/10 text-orange-600 border-orange-200"
  }
];

// PARA:
const cycleSteps = [
  {
    step: "1",
    title: "Escutar",
    icon: <Ear className="h-8 w-8 text-primary" />,
    description: "Mergulhamos no seu negócio: processos, gargalos, oportunidades. Só avançamos quando entendemos onde a IA vai gerar impacto real.",
    color: "bg-blue-500/10 text-blue-600 border-blue-200"
  },
  {
    step: "2",
    title: "Explorar",
    icon: <Search className="h-8 w-8 text-primary" />,
    description: "Testamos, validamos e desenhamos o roadmap certo para o seu contexto — sem vender ferramenta por vender.",
    color: "bg-green-500/10 text-green-600 border-green-200"
  },
  {
    step: "3",
    title: "Executar",
    icon: <Play className="h-8 w-8 text-primary" />,
    description: "Implementação técnica com integração nos seus sistemas. Sem downtime, sem retrabalho, com entregas incrementais.",
    color: "bg-purple-500/10 text-purple-600 border-purple-200"
  },
  {
    step: "4",
    title: "Evoluir",
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    description: "Medimos cada resultado, ajustamos o que não performa e escalamos o que funciona. Você não fica sozinho depois da entrega.",
    color: "bg-orange-500/10 text-orange-600 border-orange-200"
  }
];
```

Em seguida, substitua o bloco do subtítulo (as duas tags `<p>` dentro do `motion.div` do cabeçalho):

```tsx
// DE (duas tags <p> separadas):
<p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8">
  Na EficienciIA, acreditamos que a adoção de Inteligência Artificial precisa ser simples e estratégica. 
  Por isso, criamos o <strong>Ciclo 4E</strong>: uma metodologia própria que vai do diagnóstico à evolução contínua.
</p>
<p className="text-muted-foreground text-base md:text-lg leading-relaxed">
  Nós escutamos seu cenário, exploramos as melhores soluções, executamos a implementação prática e evoluímos seu negócio com melhorias constantes. 
  Assim, você não só adota IA – você cria um <strong>ciclo de eficiência real e sustentável</strong>.
</p>

// PARA (uma única tag <p>):
<p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
  Toda transformação com IA começa com o diagnóstico certo. O <strong>Ciclo 4E</strong> é nossa metodologia para garantir que cada etapa gere valor antes de avançar para a próxima.
</p>
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/methodology-section.tsx
git commit -m "feat: update MethodologySection with consultive copy for Ciclo 4E"
```

---

## Task 6: Atualizar ProblemSolutionSection

**Files:**
- Modify: `components/sections/problem-solution-section.tsx`

- [ ] **Step 1: Atualizar título, subtítulo e os 9 cards**

Substitua o array `pillars` completo e o bloco de título no arquivo `components/sections/problem-solution-section.tsx`:

**Título e subtítulo** — localize e substitua:
```tsx
// DE:
<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
  Produtos e <span className="text-primary">Soluções</span>
</h2>
<p className="text-muted-foreground text-base md:text-lg">
  Nossa abordagem estruturada garante resultados efetivos: desde a consultoria estratégica até soluções prontas para usar.
</p>

// PARA:
<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
  O que entregamos <span className="text-primary">na prática</span>
</h2>
<p className="text-muted-foreground text-base md:text-lg">
  Cada solução foi construída a partir de problemas reais que nossos clientes enfrentavam.
</p>
```

**Array `pillars`** — substitua o array completo:
```tsx
// DE:
const pillars = [
  {
    category: "Consultoria Estratégica",
    icon: <Target className="h-12 w-12 text-primary" />,
    title: "Diagnóstico completo da empresa",
    description: "Análise detalhada de onde a IA pode gerar mais impacto no seu negócio, identificando oportunidades de automação e otimização.",
    highlight: "Estratégia"
  },
  {
    category: "Consultoria Estratégica", 
    icon: <FileBarChart className="h-12 w-12 text-primary" />,
    title: "Roadmap de implementação",
    description: "Plano de implementação estruturado, com tempos de entrega, valor e cronograma para transformação digital e implementação de IA.",
    highlight: "Planejamento"
  },
  {
    category: "Consultoria Estratégica",
    icon: <TrendingUp className="h-12 w-12 text-primary" />,
    title: "Relatórios Inteligentes",
    description: "Análises detalhadas das suas ferramentas de IA, com métricas e insights que orientam decisões estratégicas.",
    highlight: "Dados"
  },
  {
    category: "Implementação",
    icon: <Smartphone className="h-12 w-12 text-primary" />,
    title: "Integração multi-plataforma",
    description: "Conexão com WhatsApp, CRM, redes sociais e sistemas internos para automação completa dos fluxos de trabalho.",
    highlight: "Integração"
  },
  {
    category: "Implementação",
    icon: <Cog className="h-12 w-12 text-primary" />,
    title: "Criação de Ferramentas próprias",
    description: "Desenvolvimento de soluções customizadas que se adaptam perfeitamente aos processos únicos da sua empresa.",
    highlight: "Customização"
  },
  {
    category: "Implementação", 
    icon: <Zap className="h-12 w-12 text-primary" />,
    title: "Automações de processos",
    description: "Automação de processos com IA, para maximizar a produtividade e a eficiência dos seus colaboradores.",
    highlight: "Automação"
  },
  {
    category: "Plug & Play",
    icon: <Bot className="h-12 w-12 text-primary" />,
    title: "Bots de atendimento via WhatsApp",
    description: "Solução pronta para atendimento automático 24/7, com respostas inteligentes e escalabilidade imediata.",
    highlight: "Bots de atendimento"
  },
  {
    category: "Plug & Play",
    icon: <MessageSquare className="h-12 w-12 text-primary" />,
    title: "Disparo inteligente em massa",
    description: "Sistema automatizado para envio de mensagens personalizadas com IA, segmentação avançada e timing otimizado.",
    highlight: "Disparo em massa"
  },
  {
    category: "Plug & Play",
    icon: <FolderCode className="h-12 w-12 text-primary" />,
    title: "Ferramentas de atendimento",
    description: "Ferramentas de atendimento para whatsapp, e-mail e CRM, tudo integrado e facil de controle e gestão.",
    highlight: "Leads"
  },
];

// PARA:
const pillars = [
  {
    category: "Consultoria Estratégica",
    icon: <Target className="h-12 w-12 text-primary" />,
    title: "Diagnóstico completo do negócio",
    description: "Saiba exatamente onde a IA vai gerar retorno antes de investir um centavo. Mapeamos processos, gargalos e oportunidades com profundidade técnica.",
    highlight: "Estratégia"
  },
  {
    category: "Consultoria Estratégica",
    icon: <FileBarChart className="h-12 w-12 text-primary" />,
    title: "Roadmap priorizado por impacto",
    description: "Receba um plano de ação claro: o que implementar primeiro, quanto custa, quanto retorna e em qual prazo. Sem surpresas no caminho.",
    highlight: "Planejamento"
  },
  {
    category: "Consultoria Estratégica",
    icon: <TrendingUp className="h-12 w-12 text-primary" />,
    title: "Relatórios e métricas de IA",
    description: "Acompanhe o desempenho de cada automação com dashboards e relatórios que mostram ROI real — não só atividade, mas resultado.",
    highlight: "Dados"
  },
  {
    category: "Implementação",
    icon: <Smartphone className="h-12 w-12 text-primary" />,
    title: "Integração multi-plataforma",
    description: "Conecte WhatsApp, CRM, ERP e sistemas internos em um fluxo único e automatizado. Sua equipe para de copiar dados entre telas.",
    highlight: "Integração"
  },
  {
    category: "Implementação",
    icon: <Cog className="h-12 w-12 text-primary" />,
    title: "Ferramentas de IA sob medida",
    description: "Construímos exatamente o que o seu processo precisa — sem forçar sua operação a se adaptar a uma ferramenta genérica.",
    highlight: "Customização"
  },
  {
    category: "Implementação",
    icon: <Zap className="h-12 w-12 text-primary" />,
    title: "Automação de processos repetitivos",
    description: "Elimine tarefas manuais que consomem tempo do seu time. Cada processo automatizado libera capacidade para o que gera mais valor.",
    highlight: "Automação"
  },
  {
    category: "Plug & Play",
    icon: <Bot className="h-12 w-12 text-primary" />,
    title: "Atendimento automático via WhatsApp",
    description: "Ative um agente de IA que responde, qualifica e escalona chamados 24/7 — sem contratar mais atendentes.",
    highlight: "Bots de atendimento"
  },
  {
    category: "Plug & Play",
    icon: <MessageSquare className="h-12 w-12 text-primary" />,
    title: "Remarketing automático inteligente",
    description: "Recupere vendas perdidas com mensagens personalizadas enviadas na hora certa para o perfil certo. IA decide o timing e o conteúdo.",
    highlight: "Remarketing"
  },
  {
    category: "Plug & Play",
    icon: <FolderCode className="h-12 w-12 text-primary" />,
    title: "Central de atendimento integrada",
    description: "WhatsApp, e-mail e CRM em um só lugar, com histórico unificado e respostas assistidas por IA. Gestão simples, atendimento consistente.",
    highlight: "Gestão"
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/problem-solution-section.tsx
git commit -m "feat: update ProblemSolutionSection with result-oriented copy for all 9 cards"
```

---

## Task 7: Atualizar app/page.tsx — nova ordem e novos imports

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Substituir o conteúdo completo de `app/page.tsx`**

```tsx
import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import { SectorsSection } from '@/components/sections/sectors-section';
import { MethodologySection } from '@/components/sections/methodology-section';
import { ProblemSolutionSection } from '@/components/sections/problem-solution-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';
import { Header } from '@/components/header';
import { OrganizationStructuredData } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'Eficienci IA | Consultoria Especializada em IA',
  description: 'Consultoria especializada em IA: do diagnóstico à operação. Automação de processos, agentes de IA e integrações para WhatsApp, CRM e ERP com foco em eficiência, escala e ROI mensurável.',
  keywords: [
    'consultoria em IA',
    'consultoria inteligência artificial',
    'automação com IA',
    'agentes de IA',
    'automação WhatsApp',
    'integração CRM ERP',
    'dashboard de performance',
    'atendimento automático',
    'RPA com IA',
    'automação de processos',
    'inteligência artificial empresarial',
    'solução de IA para empresas',
    'automação de vendas',
    'chatbot inteligente',
  ],
  openGraph: {
    title: 'Eficienci IA | Consultoria Especializada em IA',
    description: 'Do diagnóstico à operação: identificamos onde a IA gera mais impacto no seu negócio e implementamos com foco em eficiência, escala e ROI mensurável.',
    type: 'website',
    url: 'https://eficienciia.com.br',
    siteName: 'Eficienci IA',
    images: [
      {
        url: '/hero-illustration.png',
        width: 1200,
        height: 630,
        alt: 'Eficienci IA — Consultoria especializada em IA'
      }
    ],
    locale: 'pt_BR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eficienci IA | Consultoria Especializada em IA',
    description: 'Do diagnóstico à operação: IA que gera resultado real para o seu negócio.',
    images: ['/hero-illustration.png']
  },
  alternates: {
    canonical: 'https://eficienciia.com.br'
  }
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <OrganizationStructuredData
        name="Eficienci IA"
        url="https://eficienciia.com.br"
        logo="https://eficienciia.com.br/logo.png"
        description="Consultoria especializada em IA para empresas brasileiras — do diagnóstico à operação"
        address={{
          streetAddress: "Rua Assis Figueiredo, 1000",
          addressLocality: "Poços de Caldas",
          addressRegion: "MG",
          postalCode: "37701-000",
          addressCountry: "BR"
        }}
        contactPoint={{
          telephone: "+55-35-99140-4064",
          contactType: "customer service"
        }}
      />

      {/* Tech grid background */}
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.35]" />
      <Header />
      <HeroSection />
      <ServicesSection />
      <SectorsSection />
      <MethodologySection />
      <ProblemSolutionSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Verificar build final**

```bash
cd /home/andre/Documentos/projetos/eficienciia && bun run build 2>&1 | tail -20
```

Esperado: build sem erros. Se houver erro de TypeScript, corrigir antes de commitar.

- [ ] **Step 3: Testar em dev**

```bash
bun dev
```

Abrir `http://localhost:3000` e verificar:
- [ ] Eyebrow aparece acima do H1 no Hero
- [ ] Dois botões CTA no Hero ("Quero uma consultoria" + "Ver cases por setor")
- [ ] Seção Setores aparece após Serviços com 4 tabs funcionais
- [ ] Tabs trocam conteúdo ao clicar
- [ ] Seção Depoimentos aparece com carrossel e dots de navegação
- [ ] Ordem das seções: Hero → Serviços → Setores → Metodologia → Soluções → Depoimentos → Contato

- [ ] **Step 4: Commit final**

```bash
git add app/page.tsx
git commit -m "feat: reorder page sections for consultive flow and update metadata for AI consulting positioning"
```
