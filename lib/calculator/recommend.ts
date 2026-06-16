import type {
  Answers,
  Classification,
  Financials,
  Pillar,
  Recommendation,
  CalculatorResult,
} from './types';
import { INVESTIMENTO_REF } from './constants';
import { computeEstimate } from './compute';
import { leadScore, classify } from './scoring';

export function recommend(a: Answers, classification: Classification): Recommendation {
  if (classification === 'baixa-maturidade') {
    return { pillar: 'solucoes-prontas', classification, reasonKey: 'inicial' };
  }

  const temCrm = a.crm === 'organizado' || a.crm === 'baguncado';
  if (!temCrm) {
    return { pillar: 'implementacao-automacao', classification, reasonKey: 'sem-crm' };
  }
  if (a.dataOrg === 'espalhados') {
    return { pillar: 'consultoria-estrategica', classification, reasonKey: 'dados-espalhados' };
  }
  return { pillar: 'implementacao-automacao', classification, reasonKey: 'pronto' };
}

export function financials(economiaMes: number, pillar: Pillar): Financials {
  const investimentoRef = INVESTIMENTO_REF[pillar];
  const paybackMeses = economiaMes > 0 ? investimentoRef / economiaMes : Infinity;
  const roiAnoPct = ((economiaMes * 12 - investimentoRef) / investimentoRef) * 100;
  return { investimentoRef, paybackMeses, roiAnoPct };
}

export function computeResult(a: Answers): CalculatorResult {
  const estimate = computeEstimate(a);
  const score = leadScore(a);
  const classification = classify(score);
  const recommendation = recommend(a, classification);
  const fin = financials(estimate.economiaMes, recommendation.pillar);
  return { estimate, score, recommendation, financials: fin };
}
