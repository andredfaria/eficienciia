# Design — Melhorias na Calculadora de ROI

Data: 2026-06-16
Branch: `feat/calculadora-roi`

## Contexto

A calculadora de ROI já está funcional (`lib/calculator/` + `components/calculator/`),
com 17 testes passando. O fluxo é: 7 perguntas → gate de contato → resultado, enviando
o lead para o webhook n8n.

Este design cobre duas melhorias acordadas, mantendo o escopo enxuto (YAGNI):

1. **Capturar o segmento do lead** (só captura — não entra no cálculo).
2. **Validar telefone e e-mail no gate** (abordagem própria, sem dependências).

Itens explicitamente **fora de escopo** agora: persistir respostas, editar respostas a
partir do gate, revisão de copy/CTAs, exibir ROI%, ajustar precisão do cálculo.

## 1. Segmento do lead (captura)

### Comportamento
- Nova pergunta "Qual o segmento da sua empresa?" como **primeira** pergunta do fluxo.
- 10 opções fixas (grid de botões, igual às demais perguntas), com "Outro" no fim.
- Apenas captura: **não** participa de `compute`, `scoring` nem `recommend` — segue
  exatamente o padrão já existente do campo `volume`.

### Mudanças

**`lib/calculator/types.ts`**
```ts
export type Segment =
  | 'comercio-varejo' | 'ecommerce' | 'servicos' | 'saude'
  | 'educacao' | 'industria' | 'tecnologia' | 'imobiliario'
  | 'financeiro' | 'outro';
```
No `Answers`, adicionar:
```ts
segment: Segment;  // contexto qualitativo; nao entra no calculo
```

**`components/calculator/questions.ts`**
- Inserir o config de `segment` como **primeiro** elemento de `QUESTIONS`
  (a ordem do array define a ordem do fluxo).
- Título: "Qual o segmento da sua empresa?"
- Help: "Pra adaptarmos a recomendação ao seu setor."
- Opções (value → label):
  - `comercio-varejo` → "Comércio / Varejo"
  - `ecommerce` → "E-commerce"
  - `servicos` → "Serviços"
  - `saude` → "Saúde / Clínicas"
  - `educacao` → "Educação"
  - `industria` → "Indústria"
  - `tecnologia` → "Tecnologia / SaaS"
  - `imobiliario` → "Imobiliário"
  - `financeiro` → "Financeiro / Contábil"
  - `outro` → "Outro"

**`components/calculator/calculator.tsx`** (payload do webhook)
- `respostas: answers` já carrega o segmento automaticamente.
- Adicionar campo top-level `segmento: (answers as Answers).segment` para facilitar
  o filtro no n8n.

**`app/calculadora/page.tsx`**
- Atualizar os textos "7 perguntas" → "8 perguntas".

### Verificação
- O `computeResult` continua ignorando `segment` (sem novos cálculos), então os testes
  existentes seguem válidos. Garantir que o type-check passa (campo obrigatório em `Answers`).

## 2. Validação de telefone e e-mail (gate)

### Comportamento
- No submit do `ContactGate`:
  - **E-mail**: precisa ter formato válido (regex simples e pragmático).
  - **Telefone (WhatsApp)**: precisa ter 10 ou 11 dígitos (DDD + número), após remover
    caracteres não numéricos.
- **Máscara** aplicada ao telefone enquanto digita: `(35) 99140-4064` / `(35) 9140-4064`.
- Erros exibidos **por campo** (substitui o erro único atual), com mensagem específica.
- Campos válidos: nome (não vazio), e-mail (formato), telefone (dígitos). Empresa segue opcional.

### Mudanças

**Novo `components/calculator/validate.ts`** (lógica pura, testável)
```ts
export function isValidEmail(email: string): boolean
export function digitsOnly(phone: string): string
export function isValidBRPhone(phone: string): boolean   // 10 ou 11 dígitos
export function maskBRPhone(phone: string): string       // formata progressivamente
```

**`components/calculator/contact-gate.tsx`**
- Estado de erros por campo: `{ name?, telefone?, email? }` em vez de `error: string`.
- Telefone vira input controlado: `value` no estado, `onChange` aplica `maskBRPhone`.
- No submit, validar cada campo e popular o objeto de erros; só chama `onSubmit` se vazio.
- Exibir a mensagem de erro abaixo de cada Input correspondente.

**Novo `components/calculator/validate.test.ts`**
- `isValidEmail`: aceita `a@b.com`, rejeita `a@b`, `a b@c.com`, vazio.
- `isValidBRPhone`: aceita 10 e 11 dígitos, rejeita 9 e 12; ignora máscara.
- `maskBRPhone`: formata progressivamente; trunca em 11 dígitos.

### Verificação
- Testes de `validate.ts` passando junto dos 17 existentes.
- Smoke manual: submeter com e-mail inválido e telefone curto mostra erros por campo;
  preencher corretamente libera o resultado.

## Arquivos tocados (resumo)
- `lib/calculator/types.ts` — tipo `Segment` + campo em `Answers`
- `components/calculator/questions.ts` — pergunta de segmento (1ª)
- `components/calculator/calculator.tsx` — `segmento` no payload
- `app/calculadora/page.tsx` — "7" → "8" perguntas
- `components/calculator/validate.ts` — novo (validação/máscara)
- `components/calculator/validate.test.ts` — novo (testes)
- `components/calculator/contact-gate.tsx` — erros por campo + máscara
