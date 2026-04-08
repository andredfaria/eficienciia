# Copy Redesign — Eficienci IA

**Data:** 2026-04-08
**Objetivo:** Reposicionar o site como consultoria especialista em IA, destacando resultados reais, setores de atuação e o valor da automação de processos.

---

## Contexto

O site atual comunica a Eficienci IA como uma empresa de automação com IA (tom: "automatize seu negócio"). O novo posicionamento é **parceiro estratégico em consultoria de IA** com credibilidade técnica — do diagnóstico à operação.

**Abordagem escolhida:** Reordenação estratégica + copy nova (fluxo consultivo, sem redesign visual).

---

## Nova Ordem das Seções (`app/page.tsx`)

```
Header
HeroSection
ServicesSection
SectorsSection        ← nova
MethodologySection
ProblemSolutionSection
TestimonialsSection   ← nova
ContactSection
Footer
```

**Lógica do fluxo:** quem somos → onde atuamos → como trabalhamos → o que entregamos → o que clientes dizem → fale conosco.

---

## 1. HeroSection — `components/sections/hero-section.tsx`

### Mudanças

- Adicionar **eyebrow** acima do H1: `CONSULTORIA ESPECIALIZADA EM IA` (texto pequeno, uppercase, cor `text-primary`, `tracking-widest`)
- Reescrever **H1**: remover palavras rotativas no topo — manter a animação mas mudar o contexto:
  - Linha fixa nova: `"Da estratégia à execução —"`
  - Linha animada (palavra rotativa em `text-primary`): mantém as palavras atuais (Automatize, Otimize, Escale, Preveja, Personalize, Proteja, Integre), mas com novo prefixo estático
  - **Decisão:** H1 estático: linha 1 `"Da estratégia à execução —"`, linha 2 `"IA que gera resultado real"` em `text-primary`. Remover o mecanismo de palavras rotativas do Hero.
- Reescrever **subtítulo**: `"Identificamos as melhores oportunidades de automação no seu negócio e implementamos soluções de IA com foco em eficiência, escala e ROI mensurável."`
- **CTA duplo:**
  - Principal (botão primário, já existente): `"Quero uma consultoria →"` — mantém link WhatsApp atual
  - Secundário (botão outline, novo): `"Ver cases por setor"` — link âncora `#sectors`

### Floating badges (já existentes)
Atualizar textos dos badges flutuantes:
- `"Escalável"` → `"Escala sem equipe extra"`
- `"Segurança"` → `"Dados protegidos"`
- `"Eficiente"` → `"ROI mensurável"`

---

## 2. ServicesSection — `components/sections/services-section.tsx`

### Título da seção
- De: `"Conheça nossos Serviços"`
- Para: `"Como a Eficienci IA trabalha"`
- Subtítulo: `"Da estratégia ao produto — escolha o ponto de entrada que faz mais sentido para o momento da sua empresa."`

### Copy dos 3 pilares

**Pilar 1 — Estratégica (azul)**
- Título: `"Consultoria Estratégica de IA"` *(mantém)*
- Descrição: `"Mapeamos seu negócio, identificamos onde a IA gera mais impacto e entregamos um roadmap executável com ROI projetado — antes de você investir um real na implementação."`
- Bullets: `"Diagnóstico completo do negócio"` / `"Roadmap priorizado por impacto"` / `"Projeção de ROI por iniciativa"`

**Pilar 2 — Implementação (verde)**
- Título: `"Implementação e Automação"` *(mantém)*
- Descrição: `"Desenvolvemos e integramos soluções de IA sob medida nos seus fluxos — WhatsApp, CRM, ERP ou sistema interno. Cada automação é construída para escalar sem aumentar sua equipe."`
- Bullets: `"Ferramentas de IA sob medida"` / `"Integração com WhatsApp, CRM e ERP"` / `"Automações que escalam sem equipe"`

**Pilar 3 — Produtos (roxo)**
- Título: `"Soluções Prontas para Usar"` *(era "Produtos Plug & Play")*
- Descrição: `"Para quem precisa de resultado rápido: bots de atendimento 24/7, automação de marketing e ferramentas no-code prontas para ativar em dias, não meses."`
- Bullets: `"Atendimento automático 24/7"` / `"Automação de marketing e remarketing"` / `"Ativação em dias, não meses"`

> ⚠️ Copy dos cards aprovada em estrutura. Pode ser refinada pelo cliente antes do deploy.

---

## 3. SectorsSection — `components/sections/sectors-section.tsx` (NOVO)

### Estrutura do componente
- Seção nova, criada do zero
- Layout: **tabs interativas** — 4 tabs, uma por setor, com estado local (`useState`)
- Título: `"IA aplicada ao seu setor"`
- Subtítulo: `"Cada setor tem desafios únicos. Veja como a Eficienci IA resolve os seus."`

### Setores e conteúdo

**Tab 1 — Teleatendimento & Contact Centers** (`📞`)
- Descrição: `"Empresas com alto volume de chamadas enfrentam custos crescentes e queda na satisfação. Nossos agentes de IA assumem as interações repetitivas e liberam sua equipe para o que realmente importa."`
- Aplicações: Triagem automática de chamadas / Respostas FAQ com IA generativa / Escalonamento inteligente para humanos / Análise de sentimento em tempo real
- Resultados esperados (placeholders): `"↓ 60% no custo por atendimento"` / `"↑ 70% de resoluções sem agente humano"` / `"Atendimento 24/7 sem equipe extra"`

**Tab 2 — Construção Civil & Arquitetura** (`🏗️`)
- Descrição: `"Projetos arquitetônicos e obras envolvem documentação extensa, orçamentos complexos e coordenação de múltiplos fornecedores. A IA reduz retrabalho e acelera aprovações."`
- Aplicações: Análise e extração de dados de projetos / Geração automática de orçamentos / Gestão de documentação técnica com IA / Alertas de desvio de cronograma
- Resultados esperados: `"3× mais rápido na elaboração de orçamentos"` / `"↓ 40% de retrabalho documental"` / `"Aprovações mais ágeis com menos revisões"`

**Tab 3 — E-commerce** (`🛒`)
- Descrição: `"Abandono de carrinho, SAC sobrecarregado e campanhas genéricas custam receita todos os dias. Automatizamos a recuperação de vendas e o atendimento para que você escale sem escalar custos."`
- Aplicações: Remarketing automático por comportamento / Atendimento e SAC 24/7 via WhatsApp / Segmentação inteligente de campanhas / Recomendação de produtos personalizada
- Resultados esperados: `"+35% de recuperação de carrinhos abandonados"` / `"↓ 50% no tempo de resposta ao cliente"` / `"Campanhas com 2× mais conversão"`

**Tab 4 — Imobiliárias** (`🏠`)
- Descrição: `"Corretores gastam horas qualificando leads que nunca vão comprar. Nossa IA filtra, qualifica e agenda automaticamente — o corretor só fala com quem está pronto para decidir."`
- Aplicações: Qualificação automática de leads / Agendamento de visitas por IA / Follow-up automático no WhatsApp / Análise de perfil e match com imóveis
- Resultados esperados: `"2× mais visitas agendadas por corretor"` / `"↓ 70% do tempo em leads frios"` / `"Follow-up 100% automatizado"`

### Nota sobre números
Todos os resultados são **placeholders representativos**. Substituir por dados reais assim que disponíveis. Adicionar `// TODO: substituir por dados reais de clientes` nos comentários do componente.

---

## 4. MethodologySection — `components/sections/methodology-section.tsx`

### Título e subtítulo
- Título: `"O Ciclo 4E da Eficienci IA"` *(mantém — é marca própria)*
- Subtítulo atual (duas partes) → unificar em: `"Toda transformação com IA começa com o diagnóstico certo. O Ciclo 4E é nossa metodologia para garantir que cada etapa gere valor antes de avançar para a próxima."`

### Copy das 4 etapas

| Etapa | Nova descrição |
|-------|---------------|
| **Escutar** | "Mergulhamos no seu negócio: processos, gargalos, oportunidades. Só avançamos quando entendemos onde a IA vai gerar impacto real." |
| **Explorar** | "Testamos, validamos e desenhamos o roadmap certo para o seu contexto — sem vender ferramenta por vender." |
| **Executar** | "Implementação técnica com integração nos seus sistemas. Sem downtime, sem retrabalho, com entregas incrementais." |
| **Evoluir** | "Medimos cada resultado, ajustamos o que não performa e escalamos o que funciona. Você não fica sozinho depois da entrega." |

---

## 5. ProblemSolutionSection — `components/sections/problem-solution-section.tsx`

### Título e subtítulo
- Título: `"O que entregamos na prática"`
- Subtítulo: `"Cada solução foi construída a partir de problemas reais que nossos clientes enfrentavam."`

### Copy dos 9 cards
Ajuste pontual no tom — de descritivo para orientado a resultado. Exemplos de padrão:
- Antes: `"Análise detalhada de onde a IA pode gerar mais impacto..."`
- Depois: `"Saiba exatamente onde a IA vai gerar retorno antes de investir um centavo."`

Reescrever todos os 9 cards seguindo o padrão: iniciar com verbo imperativo orientado ao benefício do cliente, terminar com consequência concreta. Os cards mantêm estrutura e categorias (Consultoria Estratégica / Implementação / Plug & Play).

---

## 6. TestimonialsSection — `components/sections/testimonials-section.tsx` (NOVO)

### Estrutura do componente
- Seção nova, posicionada entre `ProblemSolutionSection` e `ContactSection`
- Layout: **depoimento único em destaque + carrossel** (estado local com `useState` para índice ativo)
- Título: `"O que nossos clientes dizem"`
- Subtítulo: `"Resultados reais de empresas que transformaram sua operação com IA."`

### Estrutura de cada depoimento (array de objetos)
```ts
interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  sector: 'teleatendimento' | 'construcao' | 'ecommerce' | 'imobiliaria';
  initials: string; // para avatar com iniciais (sem foto por enquanto)
}
```

### Placeholders iniciais (4 depoimentos)
1. `"Reduzimos 60% do volume de atendimento manual em apenas 3 semanas. A equipe passou a focar em casos complexos e a satisfação do cliente subiu junto."` — Marcos R., Dir. Operacional, Teleatendimento
2. `"Os orçamentos que levavam 2 dias agora saem em 20 minutos. Transformou completamente nossa operação de projetos."` — Carla T., Sócia, Construção Civil
3. `"Nossa taxa de recompra subiu 40% após a automação de remarketing. O ROI apareceu em 6 semanas."` — Felipe L., CEO, E-commerce
4. `"Nossos corretores dobraram o número de visitas agendadas. A IA qualifica os leads, eles fecham negócio."` — Ana P., Diretora Comercial, Imobiliária

> ⚠️ Todos os placeholders devem ser substituídos por depoimentos reais assim que disponíveis.

### Navegação
- Dots de paginação clicáveis (4 pontos)
- Setas prev/next opcionais
- Sem autoplay — navegação manual pelos dots/setas

---

## Arquivos a modificar/criar

| Arquivo | Tipo de mudança |
|---------|----------------|
| `app/page.tsx` | Reordenar componentes + importar 2 novos |
| `components/sections/hero-section.tsx` | Editar copy + adicionar eyebrow + CTA duplo |
| `components/sections/services-section.tsx` | Editar copy (título + 3 cards) |
| `components/sections/sectors-section.tsx` | **Criar do zero** — tabs interativas |
| `components/sections/methodology-section.tsx` | Editar copy (subtítulo + 4 etapas) |
| `components/sections/problem-solution-section.tsx` | Editar copy (título + 9 cards) |
| `components/sections/testimonials-section.tsx` | **Criar do zero** — carrossel de depoimentos |

---

## Decisões de implementação

- Todos os novos componentes seguem o padrão existente: `"use client"`, `framer-motion` para animações de entrada, `motion.div` com `whileInView`
- A seção de Setores usa `useState` para controle das tabs — sem biblioteca externa
- A seção de Depoimentos usa `useState` para índice ativo — sem biblioteca de carrossel
- Nenhuma mudança no design system (cores, tokens CSS, componentes `ui/`)
- Copy em português do Brasil em todo o site
