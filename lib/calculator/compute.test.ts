import { describe, it, expect } from 'vitest';
import { automationFactor, computeEstimate } from './compute';
import type { Answers } from './types';

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
