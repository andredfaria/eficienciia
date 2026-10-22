# Eficienci IA — site

Next.js 13 (App Router) + Tailwind + Framer Motion + Lenis.

```bash
bun install
bun dev          # desenvolvimento
bun run build    # build de produção
```

## Versões da landing page

| Rota | Público | Conteúdo |
|---|---|---|
| `/` | Geral (posicionamento da página anterior) | `components/home/content/geral.ts` |
| `/automacao-whatsapp` | Quem vende pelo WhatsApp | `components/home/content/whatsapp.ts` |
| `/automacao-crm` | CRM e gestão de leads | `components/home/content/crm.ts` |
| `/automacao-processos` | Processos manuais internos | `components/home/content/processos.ts` |

Todas usam os mesmos componentes, o mesmo header (logo, menu "Soluções" e CTA), as mesmas cores e o mesmo rodapé. Só o conteúdo muda. O que é igual em todas (contato, menu, oferta, provas, depoimentos e textos do formulário) fica em `content/shared.ts`, e cada versão pode sobrescrever o que quiser (veja `offer` em `whatsapp.ts`).

**Para criar uma nova versão:** copie um dos arquivos de `content/`, ajuste `slug`, `path` e os textos, crie `app/<rota>/page.tsx` igual aos existentes e adicione a página em `landingPages` (`content/shared.ts`), para ela aparecer no menu e no rodapé.

O formulário envia `landing` (o slug da versão) e `respostas` (pergunta → resposta), para que no n8n dê para saber de qual página veio cada lead.

## Placeholders pendentes

| Placeholder | Onde preencher | Situação |
|---|---|---|
| `[NUMERO]` (WhatsApp) | `components/home/content/shared.ts` → `site.whatsappNumber` | Preenchido com `5535991404064` (número que já estava no site). Confirme. |
| `[WEBHOOK_URL]` | variável `NEXT_PUBLIC_LEAD_WEBHOOK_URL` | Sem a variável, usa `https://n8n.eficienciia.com.br/webhook/salva-formulario`. |
| `[inserir]` (CNPJ) | `content/shared.ts` → `site.cnpj` | **Pendente.** Enquanto estiver vazio, não aparece no rodapé. |
| `[cidade/UF]` | `content/shared.ts` → `site.cityUf` | Preenchido com `Poços de Caldas/MG` (endereço do JSON-LD). Confirme. |
| `[e-mail de contato]` | `content/shared.ts` → `site.email` | **Pendente.** Enquanto estiver vazio, não aparece no rodapé nem na política. |
| GA4 | variável `NEXT_PUBLIC_GA_ID` | **Pendente.** Sem ela, o GA fica desligado. |
| Meta Pixel | variável `NEXT_PUBLIC_META_PIXEL_ID` | Configurada na Vercel (Production). Em outro ambiente, sem a variável o Pixel fica desligado. |
| Política de privacidade | `app/privacidade/page.tsx` | Texto base de LGPD, marcado como "em revisão jurídica". |
| Logos dos clientes | `components/home/proof-bar.tsx` | Hoje em texto. Quando houver logos, troque por versões monocromáticas. |
| Fotos dos depoimentos | `content/shared.ts` → `testimonials.items[].photo` | Só André Mattos tem foto. Os outros mostram iniciais. |

As variáveis `NEXT_PUBLIC_*` entram no build. Copie `.env.example` para `.env.local` (ou configure na hospedagem) **antes** de rodar `bun run build`.

## Como editar os textos

A copy de cada versão fica no arquivo dela em **`components/home/content/`**, separada por seção (`hero`, `proof`, `leaks`, `method`, `beforeAfter`, `solutions`, `offer`, `testimonials`, `fit`, `faq`, `finalCta`). O formato está em `content/types.ts`. Os componentes só leem desses arquivos, então:

- **Trocar uma frase:** edite a string correspondente. Não é preciso mexer no componente.
- **Adicionar ou remover itens** (vazamentos, perguntas do FAQ, itens da oferta, setores): edite o array. A seção se ajusta sozinha. O JSON-LD `FAQPage` é gerado a partir de `faq.items`.
- **Números de prova** (`proof.stats`): `value` é o número que faz o count-up; `prefix` e `suffix` são o texto em volta. Use só números reais.
- **Demonstração do hero** (`hero.demo`): use sempre 5 mensagens (cliente, agente, cliente, agente, cliente) e 4 campos no cartão. O ritmo da sequência fica em `DELAYS`, dentro de `components/home/hero-demo.tsx`.
- **Card de solução com link** (`solutions.cards[].href` e `linkLabel`): mostra um link para outra versão, como na página geral.
- **Palavra embaralhada do método:** `method.titleBefore`, `titleScramble` e `titleAfter`.

## Estrutura da home

`components/home/`: um componente por seção (`nav`, `hero` + `hero-demo`, `proof-bar`, `leaks`, `method`, `before-after`, `solutions`, `offer`, `testimonials`, `fit`, `faq`, `final-cta`, `footer`, `whatsapp-fab`), além de:

- `primitives.tsx`: Container, CTA (com efeito magnético), revelação ao entrar na tela, logo e check animado;
- `track.ts`: eventos `cta_click`, `calculator_click`, `whatsapp_click` e `generate_lead` (GA4 e Meta Pixel);
- `lead-context.tsx`: vazamentos marcados na seção "O problema", enviados junto com o formulário;
- `smooth-scroll.tsx`: Lenis (só no desktop com mouse e sem `prefers-reduced-motion`) e links âncora;
- `lazy-sections.tsx`: seções abaixo da dobra em chunks separados.

Os tokens de cor e de tipografia ficam escopados em `.ef`, em `app/globals.css`, para não colidir com o tema shadcn das outras páginas.

## Envio do formulário

`POST` em JSON para o webhook, com: `nome`, `whatsapp`, `empresa`, `pessoas_atendimento`, `origem_leads`, `lgpd_aceite`, `vazamentos[]`, UTMs (`utm_*`, `gclid`, `fbclid`), `pagina_origem`, `referrer` e `enviado_em`. Por compatibilidade com o fluxo atual do n8n, `name` e `telefone` também são enviados.
