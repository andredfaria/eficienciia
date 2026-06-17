# Melhorias na Calculadora de ROI — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Capturar o segmento do lead (só captura) e validar telefone/e-mail no gate de contato da calculadora.

**Architecture:** O `segment` segue o padrão do campo `volume` já existente — entra em `Answers` mas é ignorado por `compute`/`scoring`/`recommend`. A validação fica em `lib/calculator/validate.ts` (lógica pura testável; mora em `lib/` para ser pega pelo glob do vitest) e é consumida pelo `ContactGate`.

**Tech Stack:** Next.js 13 (App Router), React, TypeScript, framer-motion, Vitest. Runtime: Bun.

## Global Constraints

- Testes rodam com `bun run test` (= `vitest run`). O glob é `lib/**/*.test.ts` — **arquivos de teste só são detectados dentro de `lib/`**.
- Type-check gate: `bunx tsc --noEmit` (precisa sair com código 0). `strict: true` está ligado.
- `segment` NÃO entra em nenhum cálculo, score ou recomendação — apenas captura.
- Nomenclatura em português, dark mode hardcoded, primary = neon cyan.
- Commits frequentes, mensagens em português, com trailer:
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`

---

## File Structure

- `lib/calculator/types.ts` — adiciona `Segment` e o campo `segment` em `Answers`
- `lib/calculator/compute.test.ts`, `scoring.test.ts`, `recommend.test.ts` — fixtures `Answers` ganham `segment`
- `components/calculator/questions.ts` — config da pergunta de segmento (primeira)
- `components/calculator/calculator.tsx` — `segmento` top-level no payload do webhook
- `app/calculadora/page.tsx` — textos "7 perguntas" → "8 perguntas"
- `lib/calculator/validate.ts` — NOVO: validação de e-mail/telefone + máscara (puro)
- `lib/calculator/validate.test.ts` — NOVO: testes de `validate.ts`
- `components/calculator/contact-gate.tsx` — erros por campo + máscara no telefone

---

## Task 1: Tipo `Segment` + campo em `Answers` (+ fixtures)

**Files:**
- Modify: `lib/calculator/types.ts`
- Modify (test fixtures): `lib/calculator/compute.test.ts`, `lib/calculator/scoring.test.ts`, `lib/calculator/recommend.test.ts`

**Interfaces:**
- Consumes: nada.
- Produces: `export type Segment` (10 valores literais) e o campo obrigatório `segment: Segment` em `Answers`. As Tasks 2–4 dependem desses nomes.

- [ ] **Step 1: Verificar baseline verde**

Run: `bun run test`
Expected: PASS (17 tests).

- [ ] **Step 2: Adicionar o tipo `Segment` e o campo em `Answers`**

Em `lib/calculator/types.ts`, após a linha `export type Maturity = ...` (linha 7), adicionar:

```ts
export type Segment =
  | 'comercio-varejo'
  | 'ecommerce'
  | 'servicos'
  | 'saude'
  | 'educacao'
  | 'industria'
  | 'tecnologia'
  | 'imobiliario'
  | 'financeiro'
  | 'outro';
```

Dentro de `export interface Answers {`, adicionar como primeiro campo (acima de `teamSize`):

```ts
  segment: Segment;      // contexto qualitativo; nao entra no calculo
```

- [ ] **Step 3: Atualizar as 4 fixtures `Answers` nos testes**

Adicionar `segment: 'outro',` em cada literal `Answers` abaixo (não usar nos spreads — eles herdam):

`lib/calculator/compute.test.ts`, fixture `base`:
```ts
const base: Answers = {
  segment: 'outro',
  teamSize: '6-15',
  repHours: '3-4',
  volume: 'alto',
  costBand: '4-7k',
  crm: 'organizado',
  dataOrg: 'organizados',
  maturity: 'ja-automatizo',
};
```

`lib/calculator/scoring.test.ts`, fixture `quente` (adicionar `segment: 'outro',` como primeira linha do objeto) e fixture `frio` (idem, primeira linha do objeto).

`lib/calculator/recommend.test.ts`, fixture `prontoQuente` (adicionar `segment: 'outro',` como primeira linha do objeto).

- [ ] **Step 4: Rodar testes — devem continuar passando**

Run: `bun run test`
Expected: PASS (17 tests) — `segment` não altera nenhum cálculo.

- [ ] **Step 5: Type-check**

Run: `bunx tsc --noEmit`
Expected: exit 0 (sem erros).

- [ ] **Step 6: Commit**

```bash
git add lib/calculator/types.ts lib/calculator/compute.test.ts lib/calculator/scoring.test.ts lib/calculator/recommend.test.ts
git commit -m "feat: adicionar tipo Segment e campo segment em Answers

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 2: Pergunta de segmento (1ª) + payload + texto da página

**Files:**
- Modify: `components/calculator/questions.ts`
- Modify: `components/calculator/calculator.tsx:46-63` (montagem do `payload`)
- Modify: `app/calculadora/page.tsx`

**Interfaces:**
- Consumes: `Segment` e `Answers.segment` (Task 1). O sistema de tipos de `questions.ts` (`QuestionConfig<K>`) já infere as opções a partir de `Answers[K]`, então o `value` de cada opção precisa ser um `Segment` válido.
- Produces: pergunta `segment` como `QUESTIONS[0]`; campo `segmento` no payload do webhook.

- [ ] **Step 1: Inserir a pergunta de segmento como primeira de `QUESTIONS`**

Em `components/calculator/questions.ts`, dentro de `export const QUESTIONS: Question[] = [`, inserir como **primeiro** elemento do array (antes do bloco `teamSize`):

```ts
  {
    id: 'segment',
    title: 'Qual o segmento da sua empresa?',
    help: 'Pra adaptarmos a recomendação ao seu setor.',
    options: [
      { value: 'comercio-varejo', label: 'Comércio / Varejo' },
      { value: 'ecommerce', label: 'E-commerce' },
      { value: 'servicos', label: 'Serviços' },
      { value: 'saude', label: 'Saúde / Clínicas' },
      { value: 'educacao', label: 'Educação' },
      { value: 'industria', label: 'Indústria' },
      { value: 'tecnologia', label: 'Tecnologia / SaaS' },
      { value: 'imobiliario', label: 'Imobiliário' },
      { value: 'financeiro', label: 'Financeiro / Contábil' },
      { value: 'outro', label: 'Outro' },
    ],
  },
```

- [ ] **Step 2: Adicionar `segmento` ao payload do webhook**

Em `components/calculator/calculator.tsx`, no objeto `payload` (dentro de `handleContactSubmit`), adicionar a linha logo após `origem: 'calculadora-roi',`:

```ts
      segmento: (answers as Answers).segment,
```

(`Answers` já está importado no arquivo via `import { computeResult, type Answers } from '@/lib/calculator';`.)

- [ ] **Step 3: Atualizar os textos da página de "7" para "8" perguntas**

Em `app/calculadora/page.tsx`:
- No `<p>` do subtítulo, trocar `Responda 7 perguntas rápidas` por `Responda 8 perguntas rápidas`.

(O bloco `≈ 2 minutos` continua igual — 8 perguntas curtas seguem em ~2 min.)

- [ ] **Step 4: Type-check**

Run: `bunx tsc --noEmit`
Expected: exit 0. (Se algum `value` de opção não casar com `Segment`, o erro aparece aqui.)

- [ ] **Step 5: Smoke manual (dev server)**

Run: `bun dev` e abrir `/calculadora`.
Expected:
- 1ª pergunta é "Qual o segmento da sua empresa?" com 10 opções.
- Barra de progresso mostra "Passo 1 de 8".
- Selecionar segmento avança para "Quantas pessoas tocam o operacional?".

- [ ] **Step 6: Commit**

```bash
git add components/calculator/questions.ts components/calculator/calculator.tsx app/calculadora/page.tsx
git commit -m "feat: capturar segmento do lead como 1a pergunta da calculadora

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 3: `validate.ts` — e-mail, telefone BR e máscara (TDD)

**Files:**
- Create: `lib/calculator/validate.ts`
- Test: `lib/calculator/validate.test.ts`

**Interfaces:**
- Consumes: nada.
- Produces (assinaturas exatas que a Task 4 consome):
  - `isValidEmail(email: string): boolean`
  - `digitsOnly(value: string): string`
  - `isValidBRPhone(phone: string): boolean` — true para 10 ou 11 dígitos
  - `maskBRPhone(phone: string): string` — formata progressivamente, trunca em 11 dígitos

- [ ] **Step 1: Escrever os testes (falhando)**

Criar `lib/calculator/validate.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { isValidEmail, digitsOnly, isValidBRPhone, maskBRPhone } from './validate';

describe('isValidEmail', () => {
  it('aceita e-mail bem formado', () => {
    expect(isValidEmail('joao@empresa.com.br')).toBe(true);
  });
  it('rejeita sem dominio', () => {
    expect(isValidEmail('joao@empresa')).toBe(false);
  });
  it('rejeita com espaco', () => {
    expect(isValidEmail('joao @empresa.com')).toBe(false);
  });
  it('rejeita vazio', () => {
    expect(isValidEmail('')).toBe(false);
  });
});

describe('digitsOnly', () => {
  it('remove tudo que nao e digito', () => {
    expect(digitsOnly('(35) 99140-4064')).toBe('35991404064');
  });
});

describe('isValidBRPhone', () => {
  it('aceita 11 digitos (celular com DDD)', () => {
    expect(isValidBRPhone('(35) 99140-4064')).toBe(true);
  });
  it('aceita 10 digitos (fixo com DDD)', () => {
    expect(isValidBRPhone('(35) 3214-0640')).toBe(true);
  });
  it('rejeita 9 digitos', () => {
    expect(isValidBRPhone('991404064')).toBe(false);
  });
  it('rejeita 12 digitos', () => {
    expect(isValidBRPhone('359914040640')).toBe(false);
  });
});

describe('maskBRPhone', () => {
  it('formata 11 digitos como (XX) XXXXX-XXXX', () => {
    expect(maskBRPhone('35991404064')).toBe('(35) 99140-4064');
  });
  it('formata 10 digitos como (XX) XXXX-XXXX', () => {
    expect(maskBRPhone('3532140640')).toBe('(35) 3214-0640');
  });
  it('formata parcial enquanto digita', () => {
    expect(maskBRPhone('35')).toBe('(35');
    expect(maskBRPhone('359')).toBe('(35) 9');
  });
  it('trunca em 11 digitos', () => {
    expect(maskBRPhone('359914040649999')).toBe('(35) 99140-4064');
  });
});
```

- [ ] **Step 2: Rodar os testes — devem falhar**

Run: `bun run test lib/calculator/validate.test.ts`
Expected: FAIL (`validate` não existe / funções não definidas).

- [ ] **Step 3: Implementar `lib/calculator/validate.ts`**

```ts
export function isValidEmail(email: string): boolean {
  // pragmático: algo@algo.dominio, sem espaços
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

export function isValidBRPhone(phone: string): boolean {
  const d = digitsOnly(phone);
  return d.length === 10 || d.length === 11;
}

export function maskBRPhone(phone: string): string {
  const d = digitsOnly(phone).slice(0, 11);
  if (d.length === 0) return '';
  if (d.length <= 2) return `(${d}`;
  const ddd = d.slice(0, 2);
  const rest = d.slice(2);
  if (rest.length <= 4) return `(${ddd}) ${rest}`;
  // 11 dígitos -> 5+4; 10 dígitos -> 4+4
  const splitAt = rest.length >= 9 ? 5 : 4;
  return `(${ddd}) ${rest.slice(0, splitAt)}-${rest.slice(splitAt)}`;
}
```

- [ ] **Step 4: Rodar os testes — devem passar**

Run: `bun run test lib/calculator/validate.test.ts`
Expected: PASS (todos os casos acima).

- [ ] **Step 5: Suite completa + type-check**

Run: `bun run test && bunx tsc --noEmit`
Expected: PASS (todos os testes) e exit 0.

- [ ] **Step 6: Commit**

```bash
git add lib/calculator/validate.ts lib/calculator/validate.test.ts
git commit -m "feat: helpers de validacao e mascara de telefone/email

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 4: Validação por campo + máscara no `ContactGate`

**Files:**
- Modify: `components/calculator/contact-gate.tsx`

**Interfaces:**
- Consumes: `isValidEmail`, `isValidBRPhone`, `maskBRPhone` de `@/lib/calculator/validate` (Task 3). `ContactData` e `onSubmit` continuam iguais.
- Produces: nenhum novo símbolo exportado (mudança interna do componente).

- [ ] **Step 1: Importar os helpers**

Em `components/calculator/contact-gate.tsx`, adicionar após o import de `formatHoras`:

```ts
import { isValidEmail, isValidBRPhone, maskBRPhone } from '@/lib/calculator/validate';
```

- [ ] **Step 2: Trocar o estado de erro único por erros-por-campo + telefone controlado**

Substituir a linha:

```ts
  const [error, setError] = useState('');
```

por:

```ts
  type FieldErrors = { name?: string; telefone?: string; email?: string };
  const [errors, setErrors] = useState<FieldErrors>({});
  const [telefone, setTelefone] = useState('');
```

- [ ] **Step 3: Reescrever `handleSubmit` com validação por campo**

Substituir todo o corpo de `handleSubmit` por:

```ts
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: ContactData = {
      name: String(fd.get('name') ?? '').trim(),
      telefone: telefone.trim(),
      email: String(fd.get('email') ?? '').trim(),
      empresa: String(fd.get('empresa') ?? '').trim(),
    };

    const next: FieldErrors = {};
    if (!data.name) next.name = 'Informe seu nome.';
    if (!isValidBRPhone(data.telefone)) next.telefone = 'Informe um WhatsApp válido com DDD.';
    if (!isValidEmail(data.email)) next.email = 'Informe um e-mail válido.';

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onSubmit(data);
  };
```

- [ ] **Step 4: Tornar o input de telefone controlado com máscara e exibir erros por campo**

No JSX, remover o bloco de erro genérico (`{error && (...)}`).

Para o `Input` do telefone (id `contact-gate-telefone`), trocar para controlado:

```tsx
            <Input
              id="contact-gate-telefone"
              name="telefone"
              type="tel"
              inputMode="numeric"
              placeholder="(35) 99999-9999"
              className="h-11 mt-1"
              value={telefone}
              onChange={(e) => setTelefone(maskBRPhone(e.target.value))}
              required
            />
            {errors.telefone && (
              <p className="mt-1 text-xs text-red-500">{errors.telefone}</p>
            )}
```

Abaixo do `Input` de nome (id `contact-gate-name`), adicionar:

```tsx
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
```

Abaixo do `Input` de e-mail (id `contact-gate-email`), adicionar:

```tsx
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
```

(Mantém o atributo `required` nos inputs como fallback do browser; a validação JS é a fonte de verdade.)

- [ ] **Step 5: Type-check**

Run: `bunx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 6: Smoke manual (dev server)**

Run: `bun dev`, abrir `/calculadora`, responder as 8 perguntas até o gate.
Expected:
- Digitar no WhatsApp formata como `(35) 99140-4064`.
- Submeter com e-mail `abc` e telefone `123` → mostra erro abaixo de cada campo, não envia.
- Preencher nome + WhatsApp válido + e-mail válido → libera o resultado.

- [ ] **Step 7: Commit**

```bash
git add components/calculator/contact-gate.tsx
git commit -m "feat: validacao por campo e mascara de telefone no gate da calculadora

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 5: Verificação final

**Files:** nenhum (apenas verificação).

- [ ] **Step 1: Suite completa de testes**

Run: `bun run test`
Expected: PASS (17 originais + 13 novos de `validate.test.ts` = 30).

- [ ] **Step 2: Type-check completo**

Run: `bunx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 3: Build de produção**

Run: `bun run build`
Expected: build conclui sem erro; rota `/calculadora` presente na saída.

- [ ] **Step 4: Checklist manual final em `/calculadora`**

- Segmento é a 1ª pergunta, "Passo 1 de 8".
- Fluxo completo até o resultado funciona.
- Validação do gate bloqueia dados inválidos e aceita válidos.
- (Opcional) Inspecionar o payload no n8n / DevTools: contém `segmento` e `respostas.segment`.
