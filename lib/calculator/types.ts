export type TeamSize = '1' | '2-5' | '6-15' | '16+';
export type RepHours = '<1' | '1-2' | '3-4' | '5+';
export type Volume = 'baixo' | 'medio' | 'alto' | 'muito-alto';
export type CostBand = 'ate-2k' | '2-4k' | '4-7k' | '7k+';
export type CrmStatus = 'organizado' | 'baguncado' | 'planilha' | 'nenhum';
export type DataOrg = 'organizados' | 'parciais' | 'espalhados';
export type Maturity = 'ja-automatizo' | 'quero-comecar' | 'nao-sei';

export type Segment =
  | 'comercio-varejo'
  | 'ecommerce'
  | 'servicos'
  | 'saude'
  | 'educacao'
  | 'industria'
  | 'tecnologia'
  | 'imobiliario'
  | 'financeiro'
  | 'outro';

export interface Answers {
  segment: Segment;      // contexto qualitativo; nao entra no calculo
  teamSize: TeamSize;
  repHours: RepHours;
  volume: Volume;        // contexto qualitativo; nao entra no calculo
  costBand: CostBand;
  crm: CrmStatus;
  dataOrg: DataOrg;
  maturity: Maturity;
}

export type Pillar =
  | 'consultoria-estrategica'
  | 'implementacao-automacao'
  | 'solucoes-prontas';

export type Classification = 'quente' | 'qualificavel' | 'baixa-maturidade';
export type ReasonKey = 'pronto' | 'sem-crm' | 'dados-espalhados' | 'inicial';

export interface Estimate {
  fator: number;
  horasLiberadasMes: number;
  economiaMes: number;
  economiaAno: number;
}

export interface Financials {
  investimentoRef: number;
  paybackMeses: number;
  roiAnoPct: number;
}

export interface Recommendation {
  pillar: Pillar;
  classification: Classification;
  reasonKey: ReasonKey;
}

export interface CalculatorResult {
  estimate: Estimate;
  score: number;
  recommendation: Recommendation;
  financials: Financials;
}
