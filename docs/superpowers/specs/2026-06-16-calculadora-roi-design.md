# Calculadora de ROI / Eficiência — Design

**Data:** 2026-06-16
**Status:** Aprovado para planejamento
**Escopo desta entrega:** design/spec estratégico (implementação em etapa posterior)

## Objetivo

Adicionar ao site institucional da Eficienci IA uma calculadora interativa que:

- ajuda o visitante a estimar quanto pode economizar com automação;
- mostra economia de tempo, economia de custo e ROI de forma clara e **conservadora**;
- qualifica o lead automaticamente (lead scoring);
- direciona o lead para a oferta mais adequada (um dos 3 pilares atuais do site).

**Princípios não-negociáveis:** sem promessas irreais; todo número rotulado como "estimativa"; tom consultivo, não agressivo; foco em eficiência operacional, não "IA pela IA".

## Decisões fixadas

| Decisão | Escolha |
|---------|---------|
| Entrega desta etapa | Apenas design/spec estratégico |
| Tratamento dos números | Faixas conservadoras + rótulo "estimativa" |
| Ofertas recomendadas | Pilares atuais do site |
| Momento de captura do lead | Pedir contato antes de revelar o resultado (com prévia de valor não-monetário) |

## Stack e integração

- **Rota nova:** `/calculadora` (App Router), componente client.
- **UI:** shadcn/ui (`Card`, `Button`, `Progress`, `Input`, `Slider`), framer-motion, dark mode neon-cyan — consistente com o site.
- **Entradas de tráfego:** CTA na home, item no header.
- **Captura de lead:** reaproveita o webhook `https://n8n.eficienciia.com.br/webhook/salva-formulario`, com campos extras (respostas, score, classificação, recomendação, estimativas). Avaliar webhook dedicado se o schema atual conflitar.

## Pilares de oferta (destino da recomendação)

1. **Consultoria Estratégica de IA** — diagnóstico + estruturação de dados/processos. Destino quando os dados estão espalhados.
2. **Implementação e Automação** — automação de processos + integração de CRM. Destino do lead pronto/quente; também cobre implantação de CRM como primeiro passo.
3. **Soluções Prontas para Usar** — bots no-code, atendimento 24/7, quick wins. Destino de cenários iniciais / baixa maturidade.

## 1. Estrutura da tela

Wizard de uma pergunta por passo, com barra de progresso.

```
┌─ HERO ─────────────────────────────────────────┐
│  Título + subtítulo + selo "≈ 2 minutos"        │
├─ WIZARD (1 pergunta por vez) ──────────────────┤
│  [▓▓▓▓░░░] passo 4 de 7                          │
│  Pergunta + opções (cards clicáveis / slider)   │
│  [Voltar]                          [Continuar →] │
├─ GATE DE CONTATO (prévia borrada) ─────────────┤
│  "Sua estimativa está pronta"                    │
│  Visível: "≈ X horas/mês recuperáveis"           │
│  Borrado: R$ e ROI + formulário de contato       │
├─ RESULTADO (revelado pós-contato) ─────────────┤
│  Economia mês / ano · Horas liberadas · ROI      │
│  Bloco de recomendação (1 dos 3 pilares)         │
│  CTA principal + CTA secundário                  │
└──────────────────────────────────────────────────┘
```

Blocos: Hero · Perguntas · Gate de contato · Resultado · Mensagens condicionais (qualificado / qualificável / baixa maturidade).

## 2. Fluxo e sequência das perguntas

| # | Pergunta | Mede | Tipo |
|---|----------|------|------|
| 1 | Quantas pessoas tocam a parte operacional/atendimento? | Tamanho da operação | Cards: 1 / 2–5 / 6–15 / 16+ |
| 2 | Quantas horas por dia, por pessoa, vão em tarefas repetitivas? | Tempo desperdiçado | Slider 0–8h ou cards <1 / 1–2 / 3–4 / 5+ |
| 3 | Qual o volume de atendimentos/processos manuais por dia? | Volume | Cards: baixo / médio / alto / muito alto |
| 4 | Custo médio mensal por pessoa (salário + encargos)? | Custo da hora | Faixas: até 2k / 2–4k / 4–7k / 7k+ |
| 5 | Você já usa um CRM? | Pré-requisito (gate) | Sim, organizado / Sim, bagunçado / Só planilha / Não |
| 6 | Como estão seus dados/processos hoje? | Organização (gate) | Organizados / Parciais / Espalhados |
| 7 | Qual seu momento com automação? | Maturidade | Já automatizo / Quero começar / Não sei por onde |

**Lógica condicional:**
- Q5 e Q6 não escondem perguntas — alimentam os *gates* de recomendação (CRM e organização de dados).
- **Resultado parcial:** no gate de contato, mostrar o headline não-monetário ("≈ N horas/mês recuperáveis") como prova de valor antes de pedir contato.
- **Resultado final:** R$ mês/ano + ROI + recomendação somente após o contato.
- Cada resposta soma pontos (lead score) e ajusta o fator de automação do cálculo.

## 3. Copy (pt-BR)

**Hero**
- Título: "Quanto sua operação pode economizar com automação?"
- Subtítulo: "Responda 7 perguntas rápidas e receba uma estimativa de economia de tempo, custo e ROI — com a recomendação certa para o seu momento."
- Selo: "≈ 2 minutos · sem compromisso"

**Perguntas (cabeçalho + ajuda)** — exemplos:
- Q1 — "Quantas pessoas tocam o operacional?" · *"Considere atendimento, suporte, cadastro e tarefas manuais."*
- Q2 — "Quanto tempo, por dia, some em tarefas repetitivas?" · *"Copiar/colar, responder a mesma coisa, lançar dados à mão."*
- Q5 — "Você já usa um CRM?" · *"Onde ficam seus contatos e o histórico de clientes hoje?"*

**Gate de contato**
- Título: "Sua estimativa está pronta"
- Prévia: "Identificamos cerca de **{horas}/mês** que sua equipe gasta em tarefas automatizáveis."
- Microcopy: "Deixe seu contato para liberar a economia em R$, o ROI estimado e a recomendação para o seu caso."
- Campos: Nome · WhatsApp · E-mail · Empresa (opcional)
- Botão: "Ver minha estimativa completa"
- Confiança: "Sem spam. Usamos seus dados só para enviar o resultado e, se quiser, falar com você."

**Resultado — qualificado (quente)**
- "Sua operação tem alto potencial de automação."
- "Estimativa: **R$ {mês}/mês** · **R$ {ano}/ano** · **{horas} h/mês** liberadas · payback estimado de **{meses} meses**."
- CTA: "Agendar diagnóstico gratuito" · secundário: "Receber este relatório no WhatsApp".

**Resultado — qualificável (morno)**
- Sem CRM: "Há economia clara aqui — mas o primeiro passo é organizar seu CRM. Sem isso, a automação não se sustenta."
- Dados espalhados: "Antes de automatizar, vale estruturar seus dados e processos para o ganho ser real e duradouro."
- CTA: "Falar sobre o primeiro passo".

**Resultado — baixa maturidade (inicial)**
- "Seu cenário ainda é enxuto para um projeto completo de automação — e tudo bem. Comece com ganhos rápidos."
- CTA: "Ver soluções prontas para começar" · secundário: "Receber um guia gratuito".

## 4. Fórmula de cálculo

```
// Constantes (ajustáveis)
DIAS_UTEIS_MES        = 22
HORAS_UTEIS_MES       = 176
FATOR_AUTOMACAO_BASE  = 0.40         // 40% do tempo repetitivo
CLAMP                 = [0.25, 0.55] // teto conservador
INVESTIMENTO_REF      = por pilar recomendado (ajustável)

// Entradas (ponto médio das faixas)
custo_hora      = custo_pessoa_mes / HORAS_UTEIS_MES
tempo_rep_mes   = horas_repetitivas_dia * DIAS_UTEIS_MES * n_pessoas
custo_rep_mes   = tempo_rep_mes * custo_hora

// Fator de automação modulado pelo cenário
fator = BASE
      + (dados_organizados ? +0.05 : dados_espalhados ? -0.10 : 0)
      + (tem_crm ? +0.05 : -0.05)
      + (maturidade_alta ? +0.05 : 0)
fator = clamp(fator, 0.25, 0.55)

// Resultados (rotulados "estimativa")
horas_liberadas_mes = tempo_rep_mes * fator
economia_mes        = custo_rep_mes * fator
economia_ano        = economia_mes * 12
payback_meses       = INVESTIMENTO_REF / economia_mes
roi_ano_pct         = (economia_ano - INVESTIMENTO_REF) / INVESTIMENTO_REF * 100
```

Tudo derivado de faixas (ponto médio). Fator conservador e com teto para não prometer demais. `INVESTIMENTO_REF` é a única peça comercial — constante por pilar, calibrável com números reais depois.

## 5. Lead scoring (0–100)

| Critério | Pontos |
|----------|--------|
| Pessoas: 1 / 2–5 / 6–15 / 16+ | 5 / 15 / 25 / 30 |
| Tempo repetitivo: <1h / 1–2h / 3–4h / 5h+ | 5 / 15 / 22 / 30 |
| Custo/pessoa: baixo / médio / alto | 5 / 12 / 18 |
| Maturidade: não sei / quero começar / já automatizo | 2 / 8 / 12 |
| Prontidão (CRM+dados): organizado / parcial / nenhum | 10 / 5 / 0 |

**Classificação por score (faixas contíguas, sem vão):**
- **≥ 70 → Quente**
- **45–69 → Qualificável**
- **< 45 → Baixa maturidade**

**Recomendação (gates de pré-requisito têm prioridade sobre o score):**
- **Quente + CRM ok + dados ok** → *Implementação e Automação* (sprint de automação). CTA: agendar diagnóstico.
- **Quente/Qualificável sem CRM** → *Implementação e Automação* começando pela implantação/integração de CRM.
- **Quente/Qualificável com dados espalhados** → *Consultoria Estratégica de IA* (diagnóstico + estruturação) primeiro.
- **Baixa maturidade (cenário inicial)** → *Soluções Prontas para Usar* (quick wins / no-code) ou material educativo.

**Prioridade dos gates:** os pré-requisitos (CRM, dados) têm prioridade sobre o score. Um lead quente sem CRM é roteado para "organizar primeiro" — é o que faz a calculadora parecer honesta e consultiva.

## 6. UX

- Uma pergunta por tela + barra de progresso → reduz fricção, aumenta conclusão.
- Cards clicáveis grandes (mobile-first); apenas custo usa faixas.
- Avançar automático ao escolher, com Voltar sempre visível.
- Mostrar valor antes do contato: o gate revela o headline em horas/mês.
- Resultado escaneável: 4 números grandes em cards + 1 bloco de recomendação com 1 CTA dominante.
- Honestidade visível: rótulo "estimativa" + "baseado nas suas respostas" em todo resultado.
- Reuso de estilo: `Card`, `Button`, `Progress`, `neon-ring`, animações framer-motion existentes.

## Payload para o webhook

Além dos campos de contato (nome, whatsapp, email, empresa), enviar:
- todas as respostas (q1..q7);
- `lead_score`, `classificacao` (quente/qualificavel/baixa_maturidade);
- `recomendacao` (pilar);
- `estimativas` (economia_mes, economia_ano, horas_liberadas_mes, payback_meses, roi_ano_pct).

## Fora de escopo (YAGNI)

- Backend próprio / persistência (usa n8n).
- A/B testing de copy.
- Múltiplos idiomas.
- Geração de PDF do relatório (pode entrar como evolução futura).
