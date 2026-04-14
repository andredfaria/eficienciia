# Design: Frase Dinâmica no HeroSection

**Data:** 2026-04-14  
**Componente:** `components/sections/hero-section.tsx`

## Objetivo

Tornar a parte em destaque do `<h1>` dinâmica, rotacionando frases relacionadas ao valor da IA para o negócio do cliente.

## H1 Final

```
Da estratégia à execução [FRASE DINÂMICA]
```

O travessão (`—`) é removido. A frase dinâmica mantém `text-primary neon-text`.

## Lista de Frases

```ts
const phrases = [
  "IA que gera resultado real",
  "IA que gera ROI mensurável",
  "IA que escala sem equipe extra",
  "IA que automatiza o que trava",
  "IA pra você se destacar",
  "IA com eficiência real",
  "IA do diagnóstico à entrega",
];
```

## Implementação Técnica

- **Lib:** `framer-motion` (já instalada) — `AnimatePresence` + `motion.span`
- **Estado:** `useState<number>` para índice atual
- **Intervalo:** `useEffect` com `setInterval` de 3500ms; limpo no cleanup
- **Troca:** `key={currentIndex}` no `motion.span` garante desmount/mount pelo `AnimatePresence`

## Animação (Slide + Fade)

| Estado  | Propriedades                         | Duração  |
|---------|--------------------------------------|----------|
| Entrada | `opacity: 0, y: 20` → `opacity: 1, y: 0` | 0.4s ease-out |
| Saída   | `opacity: 1, y: 0` → `opacity: 0, y: -20` | 0.3s ease-in |

`AnimatePresence mode="wait"` garante que a frase atual saia completamente antes da nova entrar.

## Arquivos Alterados

- `components/sections/hero-section.tsx` — único arquivo a ser modificado
