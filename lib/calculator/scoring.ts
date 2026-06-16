import type { Answers, Classification, CrmStatus, DataOrg } from './types';

const teamPoints: Record<Answers['teamSize'], number> = {
  '1': 5,
  '2-5': 15,
  '6-15': 25,
  '16+': 30,
};

const repPoints: Record<Answers['repHours'], number> = {
  '<1': 5,
  '1-2': 15,
  '3-4': 22,
  '5+': 30,
};

const costPoints: Record<Answers['costBand'], number> = {
  'ate-2k': 5,
  '2-4k': 12,
  '4-7k': 18,
  '7k+': 18,
};

const maturityPoints: Record<Answers['maturity'], number> = {
  'nao-sei': 2,
  'quero-comecar': 8,
  'ja-automatizo': 12,
};

function readinessPoints(crm: CrmStatus, dataOrg: DataOrg): number {
  const crmOk = crm === 'organizado';
  const crmNenhum = crm === 'nenhum';
  if (crmOk && dataOrg === 'organizados') return 10;
  if (crmNenhum && dataOrg === 'espalhados') return 0;
  return 5;
}

export function leadScore(a: Answers): number {
  return (
    teamPoints[a.teamSize] +
    repPoints[a.repHours] +
    costPoints[a.costBand] +
    maturityPoints[a.maturity] +
    readinessPoints(a.crm, a.dataOrg)
  );
}

export function classify(score: number): Classification {
  if (score >= 70) return 'quente';
  if (score >= 45) return 'qualificavel';
  return 'baixa-maturidade';
}
