import { describe, it, expect } from 'vitest';
import { recommend, financials, computeResult } from './recommend';
import type { Answers } from './types';

const prontoQuente: Answers = {
  segment: 'outro',
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
