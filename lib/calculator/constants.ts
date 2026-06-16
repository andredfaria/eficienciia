import type { TeamSize, RepHours, CostBand, Pillar } from './types';

export const DIAS_UTEIS_MES = 22;
export const HORAS_UTEIS_MES = 176;

export const FATOR_BASE = 0.4;
export const FATOR_MIN = 0.25;
export const FATOR_MAX = 0.55;

// Limiares de classificacao do lead score (ajustaveis)
export const SCORE_QUENTE = 70;
export const SCORE_QUALIFICAVEL = 45;

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
