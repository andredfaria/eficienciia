# Calculadora de ROI / Eficiência — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar uma calculadora interativa em `/calculadora` que estima economia de tempo/custo e ROI com automação, qualifica o lead (score + gates) e o roteia para um dos 3 pilares de oferta, capturando contato antes de revelar os números financeiros.

**Architecture:** Lógica de cálculo/qualificação isolada em funções puras testáveis (`lib/calculator/`), com testes Vitest (a parte de dinheiro é onde bugs doem). A UI é um wizard client-side (`components/calculator/`) montado em uma rota App Router; o estado vive no orquestrador `calculator.tsx`. O envio do lead reaproveita o webhook n8n `salva-formulario`.

**Tech Stack:** Next.js 13 (App Router), React 18, TypeScript, shadcn/ui (`Card`, `Button`, `Progress`, `Input`), framer-motion, Tailwind (dark mode neon-cyan), Vitest (runtime bun).

**Spec:** `docs/superpowers/specs/2026-06-16-calculadora-roi-design.md`

**Nota de reconciliação com a spec:** a pergunta de **volume** (Q3) é capturada como contexto qualitativo para o time comercial (vai no payload do webhook), mas **não entra na matemática determinística** nem no lead score — isso mantém o cálculo conservador e simples, conforme o princípio "sem promessas irreais".

---

### Task 1: Configurar Vitest

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: Adicionar Vitest como devDependency**

Run:
```bash
bun add -d vitest@^2
```
Expected: `vitest` aparece em `devDependencies` do `package.json`.

- [ ] **Step 2: Adicionar script de teste**

Em `package.json`, dentro de `"scripts"`, adicionar a linha (após `"lint"`):
```json
    "test": "vitest run",
```

- [ ] **Step 3: Criar config do Vitest**

Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
  test: {
    include: ['lib/**/*.test.ts'],
    environment: 'node',
  },
});
```

- [ ] **Step 4: Verificar que o runner roda (sem testes ainda)**

Run: `bun run test`
Expected: Vitest inicia e reporta "No test files found" (exit 0) ou similar — confirma que está instalado.

- [ ] **Step 5: Commit**

```bash
git add package.json vitest.config.ts bun.lockb
git commit -m "chore: adicionar Vitest para a logica da calculadora"
```

---

### Task 2: Tipos e constantes da calculadora

**Files:**
- Create: `lib/calculator/types.ts`
- Create: `lib/calculator/constants.ts`

- [ ] **Step 1: Criar os tipos**

Create `lib/calculator/types.ts`:
```ts
export type TeamSize = '1' | '2-5' | '6-15' | '16+';
export type RepHours = '<1' | '1-2' | '3-4' | '5+';
export type Volume = 'baixo' | 'medio' | 'alto' | 'muito-alto';
export type CostBand = 'ate-2k' | '2-4k' | '4-7k' | '7k+';
export type CrmStatus = 'organizado' | 'baguncado' | 'planilha' | 'nenhum';
export type DataOrg = 'organizados' | 'parciais' | 'espalhados';
export type Maturity = 'ja-automatizo' | 'quero-comecar' | 'nao-sei';

export interface Answers {
  teamSize: TeamSize;
  repHours: RepHours;
  volume: Volume;        // contexto qualitativo; nao entra no calculo
  costBand: CostBand;
  crm: CrmStatus;
  dataOrg: DataOrg;
  maturity: Maturity;
}

export type Pillar =
  | 'consultoria-estrategica'
  | 'implementacao-automacao'
  | 'solucoes-prontas';

export type Classification = 'quente' | 'qualificavel' | 'baixa-maturidade';
export type ReasonKey = 'pronto' | 'sem-crm' | 'dados-espalhados' | 'inicial';

export interface Estimate {
  fator: number;
  horasLiberadasMes: number;
  economiaMes: number;
  economiaAno: number;
}

export interface Financials {
  investimentoRef: number;
  paybackMeses: number;
  roiAnoPct: number;
}

export interface Recommendation {
  pillar: Pillar;
  classification: Classification;
  reasonKey: ReasonKey;
}

export interface CalculatorResult {
  estimate: Estimate;
  score: number;
  recommendation: Recommendation;
  financials: Financials;
}
```

- [ ] **Step 2: Criar as constantes**

Create `lib/calculator/constants.ts`:
```ts
import type { TeamSize, RepHours, CostBand, Pillar } from './types';

export const DIAS_UTEIS_MES = 22;
export const HORAS_UTEIS_MES = 176;

export const FATOR_BASE = 0.4;
export const FATOR_MIN = 0.25;
export const FATOR_MAX = 0.55;

export const PESSOAS_MIDPOINT: Record<TeamSize, number> = {
  '1': 1,
  '2-5': 3.5,
  '6-15': 10,
  '16+': 20,
};

export const HORAS_REP_MIDPOINT: Record<RepHours, number> = {
  '<1': 0.5,
  '1-2': 1.5,
  '3-4': 3.5,
  '5+': 6,
};

export const CUSTO_PESSOA_MES: Record<CostBand, number> = {
  'ate-2k': 2000,
  '2-4k': 3000,
  '4-7k': 5500,
  '7k+': 8500,
};

// Investimento de referencia por pilar (ajustavel com numeros reais depois)
export const INVESTIMENTO_REF: Record<Pillar, number> = {
  'implementacao-automacao': 25000,
  'consultoria-estrategica': 12000,
  'solucoes-prontas': 5000,
};
```

- [ ] **Step 3: Commit**

```bash
git add lib/calculator/types.ts lib/calculator/constants.ts
git commit -m "feat: tipos e constantes da calculadora de ROI"
```

---

### Task 3: Fator de automação e estimativa de economia (TDD)

**Files:**
- Create: `lib/calculator/compute.ts`
- Test: `lib/calculator/compute.test.ts`

- [ ] **Step 1: Escrever o teste que falha**

Create `lib/calculator/compute.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { automationFactor, computeEstimate } from './compute';
import type { Answers } from './types';

const base: Answers = {
  teamSize: '6-15',
  repHours: '3-4',
  volume: 'alto',
  costBand: '4-7k',
  crm: 'organizado',
  dataOrg: 'organizados',
  maturity: 'ja-automatizo',
};

describe('automationFactor', () => {
  it('cenario ideal soma os modificadores e respeita o teto', () => {
    // 0.40 + 0.05 (dados) + 0.05 (crm) + 0.05 (maturidade) = 0.55
    expect(automationFactor(base)).toBeCloseTo(0.55, 5);
  });

  it('cenario ruim aplica penalidades e respeita o piso', () => {
    const ruim: Answers = { ...base, crm: 'nenhum', dataOrg: 'espalhados', maturity: 'nao-sei' };
    // 0.40 - 0.10 (dados) - 0.05 (sem crm) = 0.25 (piso)
    expect(automationFactor(ruim)).toBeCloseTo(0.25, 5);
  });

  it('nunca passa do teto de 0.55', () => {
    expect(automationFactor(base)).toBeLessThanOrEqual(0.55);
  });
});

describe('computeEstimate', () => {
  it('calcula horas liberadas e economia mensal/anual', () => {
    // n=10, horas/dia=3.5, custo_mes=5500
    // custo_hora = 5500/176 = 31.25
    // tempo_rep_mes = 3.5 * 22 * 10 = 770h
    // fator = 0.55 -> horas_liberadas = 423.5
    // economia_mes = 770 * 31.25 * 0.55 = 13234.375
    const e = computeEstimate(base);
    expect(e.fator).toBeCloseTo(0.55, 5);
    expect(e.horasLiberadasMes).toBeCloseTo(423.5, 2);
    expect(e.economiaMes).toBeCloseTo(13234.375, 2);
    expect(e.economiaAno).toBeCloseTo(13234.375 * 12, 2);
  });
});
```

- [ ] **Step 2: Rodar o teste para confirmar que falha**

Run: `bun run test`
Expected: FAIL — `automationFactor`/`computeEstimate` não existem (import error).

- [ ] **Step 3: Implementar**

Create `lib/calculator/compute.ts`:
```ts
import type { Answers, Estimate } from './types';
import {
  DIAS_UTEIS_MES,
  HORAS_UTEIS_MES,
  FATOR_BASE,
  FATOR_MIN,
  FATOR_MAX,
  PESSOAS_MIDPOINT,
  HORAS_REP_MIDPOINT,
  CUSTO_PESSOA_MES,
} from './constants';

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export function automationFactor(a: Answers): number {
  let f = FATOR_BASE;
  if (a.dataOrg === 'organizados') f += 0.05;
  else if (a.dataOrg === 'espalhados') f -= 0.1;

  const temCrm = a.crm === 'organizado' || a.crm === 'baguncado';
  f += temCrm ? 0.05 : -0.05;

  if (a.maturity === 'ja-automatizo') f += 0.05;

  return clamp(f, FATOR_MIN, FATOR_MAX);
}

export function computeEstimate(a: Answers): Estimate {
  const nPessoas = PESSOAS_MIDPOINT[a.teamSize];
  const horasDia = HORAS_REP_MIDPOINT[a.repHours];
  const custoMes = CUSTO_PESSOA_MES[a.costBand];

  const custoHora = custoMes / HORAS_UTEIS_MES;
  const tempoRepMes = horasDia * DIAS_UTEIS_MES * nPessoas;
  const custoRepMes = tempoRepMes * custoHora;

  const fator = automationFactor(a);
  const horasLiberadasMes = tempoRepMes * fator;
  const economiaMes = custoRepMes * fator;

  return {
    fator,
    horasLiberadasMes,
    economiaMes,
    economiaAno: economiaMes * 12,
  };
}
```

- [ ] **Step 4: Rodar o teste para confirmar que passa**

Run: `bun run test`
Expected: PASS (3 testes de factor + 1 de estimate).

- [ ] **Step 5: Commit**

```bash
git add lib/calculator/compute.ts lib/calculator/compute.test.ts
git commit -m "feat: fator de automacao e estimativa de economia"
```

---

### Task 4: Lead score e classificação (TDD)

**Files:**
- Create: `lib/calculator/scoring.ts`
- Test: `lib/calculator/scoring.test.ts`

- [ ] **Step 1: Escrever o teste que falha**

Create `lib/calculator/scoring.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { leadScore, classify } from './scoring';
import type { Answers } from './types';

const quente: Answers = {
  teamSize: '16+',      // 30
  repHours: '5+',       // 30
  volume: 'muito-alto',
  costBand: '7k+',      // 18 (alto)
  crm: 'organizado',
  dataOrg: 'organizados', // prontidao 10
  maturity: 'ja-automatizo', // 12
};

describe('leadScore', () => {
  it('cenario maximo soma 100', () => {
    expect(leadScore(quente)).toBe(100);
  });

  it('cenario minimo soma 17', () => {
    const frio: Answers = {
      teamSize: '1',        // 5
      repHours: '<1',       // 5
      volume: 'baixo',
      costBand: 'ate-2k',   // 5 (baixo)
      crm: 'nenhum',
      dataOrg: 'espalhados', // prontidao 0
      maturity: 'nao-sei',  // 2
    };
    expect(leadScore(frio)).toBe(17);
  });

  it('prontidao parcial vale 5 (crm planilha + dados parciais)', () => {
    const parcial: Answers = { ...quente, crm: 'planilha', dataOrg: 'parciais' };
    // 30+30+18+12 = 90 + 5 = 95
    expect(leadScore(parcial)).toBe(95);
  });
});

describe('classify', () => {
  it('>= 70 e quente', () => expect(classify(70)).toBe('quente'));
  it('45..69 e qualificavel', () => {
    expect(classify(45)).toBe('qualificavel');
    expect(classify(69)).toBe('qualificavel');
  });
  it('< 45 e baixa-maturidade', () => expect(classify(44)).toBe('baixa-maturidade'));
});
```

- [ ] **Step 2: Rodar o teste para confirmar que falha**

Run: `bun run test`
Expected: FAIL — `leadScore`/`classify` não existem.

- [ ] **Step 3: Implementar**

Create `lib/calculator/scoring.ts`:
```ts
import type { Answers, Classification, CrmStatus, DataOrg } from './types';

const teamPoints: Record<Answers['teamSize'], number> = {
  '1': 5,
  '2-5': 15,
  '6-15': 25,
  '16+': 30,
};

const repPoints: Record<Answers['repHours'], number> = {
  '<1': 5,
  '1-2': 15,
  '3-4': 22,
  '5+': 30,
};

const costPoints: Record<Answers['costBand'], number> = {
  'ate-2k': 5,
  '2-4k': 12,
  '4-7k': 18,
  '7k+': 18,
};

const maturityPoints: Record<Answers['maturity'], number> = {
  'nao-sei': 2,
  'quero-comecar': 8,
  'ja-automatizo': 12,
};

function readinessPoints(crm: CrmStatus, dataOrg: DataOrg): number {
  const crmOk = crm === 'organizado';
  const crmNenhum = crm === 'nenhum';
  if (crmOk && dataOrg === 'organizados') return 10;
  if (crmNenhum && dataOrg === 'espalhados') return 0;
  return 5;
}

export function leadScore(a: Answers): number {
  return (
    teamPoints[a.teamSize] +
    repPoints[a.repHours] +
    costPoints[a.costBand] +
    maturityPoints[a.maturity] +
    readinessPoints(a.crm, a.dataOrg)
  );
}

export function classify(score: number): Classification {
  if (score >= 70) return 'quente';
  if (score >= 45) return 'qualificavel';
  return 'baixa-maturidade';
}
```

- [ ] **Step 4: Rodar o teste para confirmar que passa**

Run: `bun run test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/calculator/scoring.ts lib/calculator/scoring.test.ts
git commit -m "feat: lead score e classificacao"
```

---

### Task 5: Recomendação, financials e orquestrador (TDD)

**Files:**
- Create: `lib/calculator/recommend.ts`
- Create: `lib/calculator/index.ts`
- Test: `lib/calculator/recommend.test.ts`

- [ ] **Step 1: Escrever o teste que falha**

Create `lib/calculator/recommend.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { recommend, financials, computeResult } from './recommend';
import type { Answers } from './types';

const prontoQuente: Answers = {
  teamSize: '16+', repHours: '5+', volume: 'muito-alto', costBand: '7k+',
  crm: 'organizado', dataOrg: 'organizados', maturity: 'ja-automatizo',
};

describe('recommend (gates tem prioridade sobre score)', () => {
  it('pronto + quente -> implementacao-automacao / pronto', () => {
    const r = recommend(prontoQuente, 'quente');
    expect(r.pillar).toBe('implementacao-automacao');
    expect(r.reasonKey).toBe('pronto');
  });

  it('sem crm -> implementacao-automacao / sem-crm (mesmo quente)', () => {
    const r = recommend({ ...prontoQuente, crm: 'nenhum' }, 'quente');
    expect(r.pillar).toBe('implementacao-automacao');
    expect(r.reasonKey).toBe('sem-crm');
  });

  it('dados espalhados (com crm) -> consultoria-estrategica / dados-espalhados', () => {
    const r = recommend({ ...prontoQuente, dataOrg: 'espalhados' }, 'qualificavel');
    expect(r.pillar).toBe('consultoria-estrategica');
    expect(r.reasonKey).toBe('dados-espalhados');
  });

  it('baixa-maturidade -> solucoes-prontas / inicial (gate de classificacao vence)', () => {
    const r = recommend({ ...prontoQuente, crm: 'nenhum' }, 'baixa-maturidade');
    expect(r.pillar).toBe('solucoes-prontas');
    expect(r.reasonKey).toBe('inicial');
  });
});

describe('financials', () => {
  it('payback e roi com investimento de referencia do pilar', () => {
    // implementacao-automacao -> 25000; economiaMes 5000
    const f = financials(5000, 'implementacao-automacao');
    expect(f.investimentoRef).toBe(25000);
    expect(f.paybackMeses).toBeCloseTo(5, 5);
    expect(f.roiAnoPct).toBeCloseTo(((5000 * 12 - 25000) / 25000) * 100, 5);
  });

  it('economia zero retorna payback Infinity sem quebrar', () => {
    const f = financials(0, 'solucoes-prontas');
    expect(f.paybackMeses).toBe(Infinity);
  });
});

describe('computeResult', () => {
  it('retorna estimate, score, recommendation e financials coerentes', () => {
    const res = computeResult(prontoQuente);
    expect(res.score).toBe(100);
    expect(res.recommendation.classification).toBe('quente');
    expect(res.recommendation.pillar).toBe('implementacao-automacao');
    expect(res.financials.paybackMeses).toBeGreaterThan(0);
    expect(res.estimate.economiaMes).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Rodar o teste para confirmar que falha**

Run: `bun run test`
Expected: FAIL — módulo `recommend` não existe.

- [ ] **Step 3: Implementar**

Create `lib/calculator/recommend.ts`:
```ts
import type {
  Answers,
  Classification,
  Financials,
  Pillar,
  Recommendation,
  CalculatorResult,
} from './types';
import { INVESTIMENTO_REF } from './constants';
import { computeEstimate } from './compute';
import { leadScore, classify } from './scoring';

export function recommend(a: Answers, classification: Classification): Recommendation {
  if (classification === 'baixa-maturidade') {
    return { pillar: 'solucoes-prontas', classification, reasonKey: 'inicial' };
  }

  const temCrm = a.crm === 'organizado' || a.crm === 'baguncado';
  if (!temCrm) {
    return { pillar: 'implementacao-automacao', classification, reasonKey: 'sem-crm' };
  }
  if (a.dataOrg === 'espalhados') {
    return { pillar: 'consultoria-estrategica', classification, reasonKey: 'dados-espalhados' };
  }
  return { pillar: 'implementacao-automacao', classification, reasonKey: 'pronto' };
}

export function financials(economiaMes: number, pillar: Pillar): Financials {
  const investimentoRef = INVESTIMENTO_REF[pillar];
  const paybackMeses = economiaMes > 0 ? investimentoRef / economiaMes : Infinity;
  const roiAnoPct = ((economiaMes * 12 - investimentoRef) / investimentoRef) * 100;
  return { investimentoRef, paybackMeses, roiAnoPct };
}

export function computeResult(a: Answers): CalculatorResult {
  const estimate = computeEstimate(a);
  const score = leadScore(a);
  const classification = classify(score);
  const recommendation = recommend(a, classification);
  const fin = financials(estimate.economiaMes, recommendation.pillar);
  return { estimate, score, recommendation, financials: fin };
}
```

Create `lib/calculator/index.ts`:
```ts
export * from './types';
export * from './constants';
export * from './compute';
export * from './scoring';
export * from './recommend';
```

- [ ] **Step 4: Rodar o teste para confirmar que passa**

Run: `bun run test`
Expected: PASS (todas as suites).

- [ ] **Step 5: Commit**

```bash
git add lib/calculator/recommend.ts lib/calculator/index.ts lib/calculator/recommend.test.ts
git commit -m "feat: recomendacao, financials e orquestrador computeResult"
```

---

### Task 6: Configuração das perguntas (dados)

**Files:**
- Create: `components/calculator/questions.ts`

- [ ] **Step 1: Criar a config das perguntas**

Create `components/calculator/questions.ts`:
```ts
import type { Answers } from '@/lib/calculator';

export type QuestionId = keyof Answers;

export interface Option {
  value: string;
  label: string;
}

export interface Question {
  id: QuestionId;
  title: string;
  help: string;
  options: Option[];
}

export const QUESTIONS: Question[] = [
  {
    id: 'teamSize',
    title: 'Quantas pessoas tocam o operacional?',
    help: 'Considere atendimento, suporte, cadastro e tarefas manuais.',
    options: [
      { value: '1', label: '1 pessoa' },
      { value: '2-5', label: '2 a 5' },
      { value: '6-15', label: '6 a 15' },
      { value: '16+', label: '16 ou mais' },
    ],
  },
  {
    id: 'repHours',
    title: 'Quanto tempo, por dia, some em tarefas repetitivas?',
    help: 'Por pessoa: copiar/colar, responder a mesma coisa, lançar dados à mão.',
    options: [
      { value: '<1', label: 'Menos de 1h' },
      { value: '1-2', label: '1 a 2h' },
      { value: '3-4', label: '3 a 4h' },
      { value: '5+', label: '5h ou mais' },
    ],
  },
  {
    id: 'volume',
    title: 'Qual o volume de atendimentos/processos manuais por dia?',
    help: 'Uma noção geral já ajuda.',
    options: [
      { value: 'baixo', label: 'Baixo' },
      { value: 'medio', label: 'Médio' },
      { value: 'alto', label: 'Alto' },
      { value: 'muito-alto', label: 'Muito alto' },
    ],
  },
  {
    id: 'costBand',
    title: 'Custo médio mensal por pessoa (salário + encargos)?',
    help: 'Uma estimativa por colaborador envolvido.',
    options: [
      { value: 'ate-2k', label: 'Até R$ 2.000' },
      { value: '2-4k', label: 'R$ 2.000 a 4.000' },
      { value: '4-7k', label: 'R$ 4.000 a 7.000' },
      { value: '7k+', label: 'Acima de R$ 7.000' },
    ],
  },
  {
    id: 'crm',
    title: 'Você já usa um CRM?',
    help: 'Onde ficam seus contatos e o histórico de clientes hoje?',
    options: [
      { value: 'organizado', label: 'Sim, organizado' },
      { value: 'baguncado', label: 'Sim, mas bagunçado' },
      { value: 'planilha', label: 'Só planilha' },
      { value: 'nenhum', label: 'Não uso' },
    ],
  },
  {
    id: 'dataOrg',
    title: 'Como estão seus dados e processos hoje?',
    help: 'Pense em quão fácil é encontrar e confiar nas informações.',
    options: [
      { value: 'organizados', label: 'Organizados' },
      { value: 'parciais', label: 'Parcialmente' },
      { value: 'espalhados', label: 'Espalhados' },
    ],
  },
  {
    id: 'maturity',
    title: 'Qual seu momento com automação?',
    help: 'Sem julgamento — só para recomendar o passo certo.',
    options: [
      { value: 'ja-automatizo', label: 'Já automatizo algo' },
      { value: 'quero-comecar', label: 'Quero começar' },
      { value: 'nao-sei', label: 'Não sei por onde' },
    ],
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add components/calculator/questions.ts
git commit -m "feat: configuracao das perguntas da calculadora"
```

---

### Task 7: Componente de pergunta + progresso

**Files:**
- Create: `components/calculator/question-step.tsx`

- [ ] **Step 1: Implementar o componente**

Create `components/calculator/question-step.tsx`:
```tsx
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { Question } from './questions';

interface QuestionStepProps {
  question: Question;
  index: number;
  total: number;
  selected?: string;
  onSelect: (value: string) => void;
  onBack: () => void;
}

export function QuestionStep({
  question,
  index,
  total,
  selected,
  onSelect,
  onBack,
}: QuestionStepProps) {
  const progress = Math.round(((index + 1) / total) * 100);

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Passo {index + 1} de {total}</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      <h2 className="text-xl md:text-2xl font-bold mb-1">{question.title}</h2>
      <p className="text-sm text-muted-foreground mb-6">{question.help}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={cn(
              'rounded-lg border p-4 text-left text-sm font-medium transition-all',
              'hover:border-primary hover:bg-primary/5',
              selected === opt.value
                ? 'border-primary bg-primary/10 neon-ring'
                : 'border-border bg-card/60',
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={index === 0}
          className="text-muted-foreground"
        >
          ← Voltar
        </Button>
      </div>
    </motion.div>
  );
}
```

Nota: avanço é automático ao selecionar (sem botão "Continuar"), conforme a spec de UX. O orquestrador (Task 10) trata a transição.

- [ ] **Step 2: Verificar o build de tipos**

Run: `bun run lint`
Expected: sem erros novos referentes a este arquivo (lint não bloqueia build, mas confirma que compila).

- [ ] **Step 3: Commit**

```bash
git add components/calculator/question-step.tsx
git commit -m "feat: componente de pergunta com barra de progresso"
```

---

### Task 8: Gate de contato (prévia + formulário)

**Files:**
- Create: `components/calculator/format.ts`
- Create: `components/calculator/contact-gate.tsx`

- [ ] **Step 1: Criar helper de formatação**

Create `components/calculator/format.ts`:
```ts
export function formatBRL(n: number): string {
  const rounded = Math.round(n / 50) * 50; // arredonda para parecer estimativa
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(rounded);
}

export function formatHoras(n: number): string {
  return `${Math.round(n)} h`;
}
```

- [ ] **Step 2: Implementar o gate de contato**

Create `components/calculator/contact-gate.tsx`:
```tsx
'use client';

import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatHoras } from './format';

export interface ContactData {
  name: string;
  telefone: string;
  email: string;
  empresa: string;
}

interface ContactGateProps {
  horasLiberadasMes: number;
  isSubmitting: boolean;
  onSubmit: (data: ContactData) => void;
}

export function ContactGate({ horasLiberadasMes, isSubmitting, onSubmit }: ContactGateProps) {
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: ContactData = {
      name: String(fd.get('name') ?? '').trim(),
      telefone: String(fd.get('telefone') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      empresa: String(fd.get('empresa') ?? '').trim(),
    };
    if (!data.name || !data.telefone || !data.email) {
      setError('Preencha nome, WhatsApp e e-mail para liberar o resultado.');
      return;
    }
    setError('');
    onSubmit(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="mb-6 rounded-lg border border-primary/30 bg-primary/5 p-5 text-center neon-ring">
        <p className="text-sm text-muted-foreground">Identificamos cerca de</p>
        <p className="my-1 text-3xl font-bold text-primary">
          {formatHoras(horasLiberadasMes)}/mês
        </p>
        <p className="text-sm text-muted-foreground">
          que sua equipe gasta em tarefas automatizáveis.
        </p>
      </div>

      <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
        <Lock className="h-4 w-4 text-primary" />
        Deixe seu contato para liberar a economia em R$, o ROI estimado e a recomendação.
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input name="name" placeholder="Seu nome" className="h-11" />
          <Input name="telefone" type="tel" placeholder="WhatsApp" className="h-11" />
        </div>
        <Input name="email" type="email" placeholder="E-mail" className="h-11" />
        <Input name="empresa" placeholder="Empresa (opcional)" className="h-11" />
        <Button type="submit" className="h-11 w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Liberando...' : 'Ver minha estimativa completa'}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Sem spam. Usamos seus dados só para enviar o resultado e, se quiser, falar com você.
        </p>
      </form>
    </motion.div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/calculator/format.ts components/calculator/contact-gate.tsx
git commit -m "feat: gate de contato com previa de valor"
```

---

### Task 9: Visão de resultado + recomendação

**Files:**
- Create: `components/calculator/result-content.ts`
- Create: `components/calculator/result-view.tsx`

- [ ] **Step 1: Criar o mapa de copy de recomendação**

Create `components/calculator/result-content.ts`:
```ts
import type { Pillar, ReasonKey } from '@/lib/calculator';

interface ResultCopy {
  headline: string;
  message: string;
  ctaPrimary: string;
  ctaSecondary: string;
  pillarLabel: string;
}

const PILLAR_LABEL: Record<Pillar, string> = {
  'consultoria-estrategica': 'Consultoria Estratégica de IA',
  'implementacao-automacao': 'Implementação e Automação',
  'solucoes-prontas': 'Soluções Prontas para Usar',
};

export const RESULT_COPY: Record<ReasonKey, Omit<ResultCopy, 'pillarLabel'> & { pillar: Pillar }> = {
  pronto: {
    pillar: 'implementacao-automacao',
    headline: 'Sua operação tem alto potencial de automação.',
    message:
      'Você tem volume e estrutura para um projeto de automação com retorno claro. O próximo passo é um diagnóstico para desenhar o escopo.',
    ctaPrimary: 'Agendar diagnóstico gratuito',
    ctaSecondary: 'Receber este relatório no WhatsApp',
  },
  'sem-crm': {
    pillar: 'implementacao-automacao',
    headline: 'Há economia clara aqui — mas comece pelo CRM.',
    message:
      'Sem um CRM organizado, a automação não se sustenta. Recomendamos implantar/integrar o CRM como primeiro passo da automação.',
    ctaPrimary: 'Falar sobre o primeiro passo',
    ctaSecondary: 'Receber este relatório no WhatsApp',
  },
  'dados-espalhados': {
    pillar: 'consultoria-estrategica',
    headline: 'O potencial existe — mas estruture os dados antes.',
    message:
      'Antes de automatizar, vale organizar dados e processos para o ganho ser real e duradouro. Uma consultoria de diagnóstico aponta o caminho.',
    ctaPrimary: 'Falar sobre o primeiro passo',
    ctaSecondary: 'Receber este relatório no WhatsApp',
  },
  inicial: {
    pillar: 'solucoes-prontas',
    headline: 'Comece com ganhos rápidos.',
    message:
      'Seu cenário ainda é enxuto para um projeto completo de automação — e tudo bem. Soluções prontas (bots e no-code) entregam valor em dias.',
    ctaPrimary: 'Ver soluções prontas para começar',
    ctaSecondary: 'Receber um guia gratuito',
  },
};

export function pillarLabel(pillar: Pillar): string {
  return PILLAR_LABEL[pillar];
}
```

- [ ] **Step 2: Implementar a visão de resultado**

Create `components/calculator/result-view.tsx`:
```tsx
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { CalculatorResult } from '@/lib/calculator';
import { formatBRL, formatHoras } from './format';
import { RESULT_COPY, pillarLabel } from './result-content';

interface ResultViewProps {
  result: CalculatorResult;
  onCtaClick: (kind: 'primary' | 'secondary') => void;
}

export function ResultView({ result, onCtaClick }: ResultViewProps) {
  const { estimate, recommendation, financials } = result;
  const copy = RESULT_COPY[recommendation.reasonKey];
  const showFinanceira = recommendation.classification !== 'baixa-maturidade';

  const metrics = [
    { label: 'Economia/mês', value: formatBRL(estimate.economiaMes) },
    { label: 'Economia/ano', value: formatBRL(estimate.economiaAno) },
    { label: 'Horas liberadas/mês', value: formatHoras(estimate.horasLiberadasMes) },
    {
      label: 'Payback estimado',
      value: Number.isFinite(financials.paybackMeses)
        ? `${Math.max(1, Math.round(financials.paybackMeses))} meses`
        : '—',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <p className="mb-1 text-xs uppercase tracking-wide text-primary">Estimativa</p>
      <h2 className="mb-2 text-xl md:text-2xl font-bold">{copy.headline}</h2>
      <p className="mb-6 text-sm text-muted-foreground">{copy.message}</p>

      {showFinanceira && (
        <div className="mb-6 grid grid-cols-2 gap-3">
          {metrics.map((m) => (
            <Card key={m.label} className="bg-card/60 p-4 text-center neon-ring">
              <p className="text-lg md:text-2xl font-bold text-primary">{m.value}</p>
              <p className="text-xs text-muted-foreground">{m.label}</p>
            </Card>
          ))}
        </div>
      )}

      <Card className="mb-6 border-primary/30 bg-primary/5 p-5">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Recomendação para o seu momento
        </p>
        <p className="text-lg font-bold">{pillarLabel(recommendation.pillar)}</p>
      </Card>

      <p className="mb-4 text-center text-xs text-muted-foreground">
        Estimativa baseada nas suas respostas. Os números reais dependem de um diagnóstico.
      </p>

      <div className="flex flex-col gap-3">
        <Button className="h-11 w-full" onClick={() => onCtaClick('primary')}>
          {copy.ctaPrimary}
        </Button>
        <Button
          variant="outline"
          className="h-11 w-full"
          onClick={() => onCtaClick('secondary')}
        >
          {copy.ctaSecondary}
        </Button>
      </div>
    </motion.div>
  );
}
```

Nota: `RESULT_COPY[reasonKey].pillar` é redundante com `recommendation.pillar` (sempre coincidem por construção em `recommend()`); usamos `recommendation.pillar` como fonte da verdade no label.

- [ ] **Step 3: Commit**

```bash
git add components/calculator/result-content.ts components/calculator/result-view.tsx
git commit -m "feat: visao de resultado e copy de recomendacao"
```

---

### Task 10: Orquestrador da calculadora + envio ao webhook

**Files:**
- Create: `components/calculator/calculator.tsx`

- [ ] **Step 1: Implementar o orquestrador**

Create `components/calculator/calculator.tsx`:
```tsx
'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { computeResult, type Answers } from '@/lib/calculator';
import { QUESTIONS } from './questions';
import { QuestionStep } from './question-step';
import { ContactGate, type ContactData } from './contact-gate';
import { ResultView } from './result-view';

const WEBHOOK_URL = 'https://n8n.eficienciia.com.br/webhook/salva-formulario';
const CONTACT_FALLBACK = '#contact';

type Stage = 'questions' | 'gate' | 'result';

export function Calculator() {
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState<Stage>('questions');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estimate parcial (horas) precisa de respostas completas; só calculamos no gate/result.
  const result = useMemo(
    () => (stage !== 'questions' ? computeResult(answers as Answers) : null),
    [stage, answers],
  );

  const handleSelect = (value: string) => {
    const q = QUESTIONS[step];
    const next = { ...answers, [q.id]: value } as Partial<Answers>;
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setStage('gate');
    }
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  const handleContactSubmit = async (contact: ContactData) => {
    setIsSubmitting(true);
    const res = computeResult(answers as Answers);
    const payload = {
      ...contact,
      origem: 'calculadora-roi',
      respostas: answers,
      lead_score: res.score,
      classificacao: res.recommendation.classification,
      recomendacao: res.recommendation.pillar,
      motivo: res.recommendation.reasonKey,
      estimativas: {
        economia_mes: Math.round(res.estimate.economiaMes),
        economia_ano: Math.round(res.estimate.economiaAno),
        horas_liberadas_mes: Math.round(res.estimate.horasLiberadasMes),
        payback_meses: Number.isFinite(res.financials.paybackMeses)
          ? Math.round(res.financials.paybackMeses)
          : null,
        roi_ano_pct: Math.round(res.financials.roiAnoPct),
      },
    };
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      // Não bloqueia a exibição do resultado se o webhook falhar.
    } finally {
      setIsSubmitting(false);
      setStage('result');
    }
  };

  const handleCtaClick = () => {
    window.location.href = CONTACT_FALLBACK;
  };

  return (
    <div className="mx-auto w-full max-w-xl rounded-xl border border-border bg-card/80 p-5 md:p-8 backdrop-blur-md">
      <AnimatePresence mode="wait">
        {stage === 'questions' && (
          <QuestionStep
            key={QUESTIONS[step].id}
            question={QUESTIONS[step]}
            index={step}
            total={QUESTIONS.length}
            selected={answers[QUESTIONS[step].id]}
            onSelect={handleSelect}
            onBack={handleBack}
          />
        )}
        {stage === 'gate' && result && (
          <ContactGate
            key="gate"
            horasLiberadasMes={result.estimate.horasLiberadasMes}
            isSubmitting={isSubmitting}
            onSubmit={handleContactSubmit}
          />
        )}
        {stage === 'result' && result && (
          <ResultView key="result" result={result} onCtaClick={handleCtaClick} />
        )}
      </AnimatePresence>
    </div>
  );
}
```

Nota: o CTA usa `window.location.href = '#contact'` como destino padrão (a seção de contato existe na home). Ajustar para link de agendamento quando houver.

- [ ] **Step 2: Verificar compilação**

Run: `bun run lint`
Expected: sem erros novos referentes a `components/calculator/`.

- [ ] **Step 3: Commit**

```bash
git add components/calculator/calculator.tsx
git commit -m "feat: orquestrador da calculadora com envio ao webhook"
```

---

### Task 11: Rota /calculadora

**Files:**
- Create: `app/calculadora/page.tsx`

- [ ] **Step 1: Implementar a página**

Create `app/calculadora/page.tsx`:
```tsx
import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/sections/footer';
import { Calculator } from '@/components/calculator/calculator';

export const metadata: Metadata = {
  title: 'Calculadora de Eficiência | Eficienci IA',
  description:
    'Descubra em 2 minutos quanto sua operação pode economizar com automação: estimativa de horas, custo e ROI, com a recomendação certa para o seu momento.',
  alternates: { canonical: 'https://eficienciia.com.br/calculadora' },
};

export default function CalculadoraPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-background py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.16]" />
        <div className="container relative mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-2xl md:text-4xl font-bold">
              Quanto sua operação pode economizar com automação?
            </h1>
            <p className="mx-auto max-w-2xl text-sm md:text-lg text-muted-foreground">
              Responda 7 perguntas rápidas e receba uma estimativa de economia de tempo,
              custo e ROI — com a recomendação certa para o seu momento.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">≈ 2 minutos · sem compromisso</p>
          </div>
          <Calculator />
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Subir o dev server e validar manualmente**

Run: `bun dev`
Then: abrir `http://localhost:3000/calculadora`.
Expected:
- as 7 perguntas avançam ao clicar;
- ao responder a última, aparece o gate com "≈ X h/mês";
- preencher nome+WhatsApp+email e enviar revela o resultado com 4 métricas + recomendação;
- testar 3 cenários (sem CRM → "comece pelo CRM"; dados espalhados → Consultoria; cenário mínimo → Soluções Prontas).

- [ ] **Step 3: Commit**

```bash
git add app/calculadora/page.tsx
git commit -m "feat: rota /calculadora com a calculadora de ROI"
```

---

### Task 12: Entrada de navegação (header + home)

**Files:**
- Modify: `components/header.tsx:122-128`
- Modify: `components/sections/hero-section.tsx`

- [ ] **Step 1: Adicionar item de menu no header**

Em `components/header.tsx`, no array `navItems` (linhas 122-128), adicionar antes de `Blog`:
```ts
    { href: "/calculadora", label: "Calculadora", isHash: false },
```
Resultado:
```ts
  const navItems = [
    { href: "#services", label: "Serviços", isHash: true },
    { href: "#methodology", label: "Metodologia", isHash: true },
    { href: "#solution", label: "Soluções", isHash: true },
    { href: "/calculadora", label: "Calculadora", isHash: false },
    { href: "/blog", label: "Blog", isHash: false },
    { href: "#contact", label: "Contato", isHash: true },
  ];
```

- [ ] **Step 2: Adicionar CTA no hero**

Em `components/sections/hero-section.tsx`, localizar o bloco de botões de CTA (buscar por `Button` / `Link` no JSX do hero) e adicionar um CTA secundário apontando para `/calculadora`. Padrão a inserir junto aos CTAs existentes:
```tsx
<Link href="/calculadora">
  <Button variant="outline" className="h-11">
    Calcular minha economia
  </Button>
</Link>
```
Garantir que `import Link from 'next/link'` exista no topo do arquivo (adicionar se faltar).

- [ ] **Step 3: Validar navegação**

Run: `bun dev`
Expected: o item "Calculadora" aparece no header (desktop e mobile) e leva a `/calculadora`; o botão no hero também leva à rota.

- [ ] **Step 4: Commit**

```bash
git add components/header.tsx components/sections/hero-section.tsx
git commit -m "feat: links de entrada para a calculadora (header e hero)"
```

---

## Self-Review

**Spec coverage:**
- Estrutura da tela → Tasks 7–11. ✓
- Fluxo/sequência das perguntas → Task 6 (ordem) + Task 10 (transições, gate, parcial vs final). ✓
- Copy pt-BR → Task 6 (perguntas), Task 8 (gate), Task 9 (resultado), Task 11 (hero). ✓
- Fórmula de cálculo (constantes ajustáveis) → Tasks 2–3. ✓
- Lead scoring + classificação + recomendação com gates → Tasks 4–5. ✓
- UX (1 pergunta/tela, progresso, cards, valor antes do contato) → Tasks 7, 8, 10. ✓
- Payload do webhook → Task 10. ✓
- Decisão "contato antes do resultado" → Task 8/10 (gate antes do stage `result`). ✓
- Volume (Q3) sem uso na matemática → reconciliado no header do plano e Task 6. ✓

**Placeholder scan:** sem TBD/TODO; todo passo de código traz o código completo. INVESTIMENTO_REF, CTA href e CTA do hero têm valores concretos com nota de ajuste futuro. ✓

**Type consistency:** `Answers`, `Estimate`, `Financials`, `Recommendation`, `CalculatorResult`, `Pillar`, `ReasonKey`, `Classification` definidos na Task 2 e usados consistentemente em 3–10. `computeResult` (Task 5) é a fonte única consumida pela UI (Task 10). `ContactData` definido na Task 8 e importado na Task 10. `formatBRL`/`formatHoras` definidos na Task 8 e usados em 8–9. ✓
