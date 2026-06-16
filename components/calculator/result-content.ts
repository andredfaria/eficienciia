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
