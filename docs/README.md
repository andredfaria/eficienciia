### Documentação — Página Institucional Eficienci IA

## 1) Resumo do Projeto

- **Objetivo**: Apresentar a Eficienci IA como parceira estratégica para automatizar processos e evoluir MVPs em produtos de IA robustos, escaláveis e prontos para o mercado, destacando proposta de valor, portfólio e canal de contato.
- **Público-alvo**: Fundadores, PMs e líderes técnicos/negócio que buscam evoluir MVPs de IA para produtos de produção; empresas interessadas em soluções sob medida de IA, automação e dados.
- **Escopo geral**: Site institucional estático com arquitetura de componentes, animações leves, responsividade, SEO básico, listagem de projetos e formulário de contato integrado a serviço third‑party (FormSubmit). Sem back-end próprio neste escopo.

---

## 2) Padrão do Projeto

### 2.1 Estrutura de pastas

```text
.
├─ app/                   # App Router (Next.js 13) — páginas e layout
│  ├─ layout.tsx         # Layout raiz: fontes, Toaster, metadados
│  ├─ page.tsx           # Página inicial
│  └─ project/
│     └─ page.tsx        # Página de projetos
├─ components/
│  ├─ header.tsx         # Cabeçalho com navegação responsiva
│  ├─ sections/          # Seções principais da landing
│  │  ├─ hero-section.tsx
│  │  ├─ value-section.tsx
│  │  ├─ about-section.tsx
│  │  ├─ projects-section.tsx
│  │  ├─ contact-section.tsx
│  │  └─ footer.tsx
│  └─ ui/                # Componentes base (shadcn/ui)
├─ hooks/
│  └─ use-toast.ts       # Hook de notificação
├─ lib/
│  └─ utils.ts           # Utilitários (ex.: `cn`)
├─ public/               # Imagens e ícones públicos
├─ docs/                 # Documentação do projeto
├─ app/globals.css       # Estilos globais e design tokens (CSS vars)
├─ tailwind.config.ts    # Configuração Tailwind + tokens extendidos
├─ postcss.config.js     # Pipeline de CSS
├─ next.config.js        # Configuração Next (export estático)
├─ package.json          # Scripts e dependências
└─ .eslintrc.json        # Regras de lint
```

### 2.2 Convenções de código

- **Linguagem**: TypeScript. Componentes React com tipagem explícita de props quando útil.
- **Arquivos e nomes**:
  - Componentes React em `PascalCase` no diretório `components/` e `components/sections/`.
  - Hooks em `camelCase` no diretório `hooks/` com prefixo `use`.
  - Utilidades em `lib/` com nomes descritivos.
  - Assets estáticos em `public/`.
- **Imports**: Utilize aliases de caminho definidos (ex.: `@/components`, `@/lib`, `@/hooks`).
- **Estilização**: Tailwind CSS; combine utilitários via `cn` quando necessário; evite CSS ad‑hoc fora de `globals.css` sem necessidade.
- **Componentes cliente**: Use `"use client"` no topo quando houver estado/efeitos ou interações do browser.
- **Acessibilidade**: Rotas e componentes com `aria-*` apropriados; focar em contraste, navegação via teclado e semântica HTML.
- **Lint**: Execute `npm run lint` antes de commits; siga as sugestões do ESLint/Next.

### 2.3 Guidelines de desenvolvimento

- **Estrutura de seções**: Priorize componentes pequenos, coesos e reutilizáveis em `components/sections` e `components/ui`.
- **Responsividade**: Mobile-first; valide breakpoints comuns (sm, md, lg, xl) e layouts de grid responsivos.
- **Performance**: Imagens em `public/`; `next/image` quando possível. Animações com `framer-motion` leves e com `viewport` para ativação sob demanda.
- **SEO básico**: Defina `metadata` em `app/layout.tsx`; títulos, descrições e ícones consistentes; headings hierárquicos (`h1`-`h3`).
- **Formulários**: Validação com `react-hook-form` + `zod`. Integrações via API externa (FormSubmit). Em caso de back-end próprio futuro, migrar para rotas `app/api/*`.
- **Commits/PRs**: Mensagens curtas e descritivas; abra PRs pequenos, com descrição do impacto visual e técnico.

---

## 3) Detalhes de Layout

### 3.1 Esquema visual e estilo

- **Arquitetura**: Landing modular com seções — Header, Hero, Value, About, Projects, Contact, Footer.
- **Interações**: Navegação sticky com transição ao rolar; animações de entrada suaves (`framer-motion`).
- **Componentização**: Base em `shadcn/ui` para consistência de espaçamentos, estados e acessibilidade.

### 3.2 Cores (design tokens)

Definidas via CSS variables em `app/globals.css` e expostas no Tailwind via `tailwind.config.ts`:

```text
--background, --foreground, --card, --popover, --primary, --secondary,
--muted, --accent, --destructive, --border, --input, --ring,
--chart-1 ... --chart-5, --radius
```

- Modo escuro por classe (`dark`): tokens alternativos mapeados no mesmo arquivo.
- Utilize as cores via Tailwind: `bg-background`, `text-foreground`, `text-primary`, etc.

### 3.3 Tipografia

- **Fonte**: Inter (Google Fonts) carregada via `next/font/google` com variável `--font-inter`.
- **Escala**: Headings com ênfase em `Hero` (`text-4xl` a `text-6xl`), body em `text-base`/`text-lg`.

### 3.4 Elementos principais

- **Header**: Fixo, com blur e sombra ao rolar; menu responsivo (hambúrguer) em mobile.
- **Hero**: Gradientes sutis, partículas/ornamentos, CTA principal “Automatize com IA”.
- **Value**: Grade de motivos/benefícios com ícones (`lucide-react`) e paleta `chart-*`.
- **About**: Cards de fundadores com imagem, bio e link para LinkedIn.
- **Projects**: Cards com imagem, badges de status/tecnologias e CTAs (Demo/Código).
- **Contact**: Formulário validado com `zod` e envio via FormSubmit; feedback com `Toaster`.
- **Footer**: Links úteis e direitos autorais.

---

## 4) Tecnologias Usadas

### 4.1 Front-end

- **Framework**: Next.js 13.5 (App Router) — `react` 18
- **Linguagem**: TypeScript 5.2
- **Estilos**: Tailwind CSS 3.3 + `tailwindcss-animate`
- **UI kit**: shadcn/ui (Radix UI)
- **Animações**: framer-motion 11
- **Ícones**: lucide-react
- **Formulários/validação**: react-hook-form + zod
- **Gráficos**: recharts (quando necessário)

### 4.2 Back-end

- Não há back-end próprio neste projeto. O formulário de contato usa **FormSubmit** (terceiro) para envio de e‑mails.
- Caso seja necessário evoluir, recomenda-se rotas `app/api/*` (Next.js), serviços externos (ex.: Supabase), ou microsserviços.

### 4.3 Build e Deploy

- **Build**: `npm run build` (Next) com `output: 'export'` → export estático.
- **Servir**: `npm run start` para preview; deploy em provedores de estáticos (ex.: Vercel, Netlify, GitHub Pages) ou CDN.
- **Imagens**: `images: { unoptimized: true }` em `next.config.js` para compatibilidade com export estático.
- **Lint**: `npm run lint` (ESLint + `eslint-config-next`).

---

## Anexos rápidos

- Scripts úteis (`package.json`):

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

- Boas práticas para PRs:
  - Descrever impacto visual (prints/gifs) e mudanças técnicas.
  - Validar responsividade e acessibilidade.
  - Passar lint antes de abrir o PR.

---

Mantido em `docs/README.md`. Atualize este documento ao introduzir novas seções, padrões visuais ou dependências.
