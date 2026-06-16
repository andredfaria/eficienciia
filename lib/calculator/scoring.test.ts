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
