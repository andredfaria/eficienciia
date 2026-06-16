import type { Answers, Estimate } from './types';
import {
  DIAS_UTEIS_MES,
  HORAS_UTEIS_MES,
  FATOR_BASE,
  FATOR_MIN,
  FATOR_MAX,
  PESSOAS_MIDPOINT,
  HORAS_REP_MIDPOINT,
  CUSTO_PESSOA_MES,
} from './constants';

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export function automationFactor(a: Answers): number {
  let f = FATOR_BASE;
  if (a.dataOrg === 'organizados') f += 0.05;
  else if (a.dataOrg === 'espalhados') f -= 0.1;

  const temCrm = a.crm === 'organizado' || a.crm === 'baguncado';
  f += temCrm ? 0.05 : -0.05;

  if (a.maturity === 'ja-automatizo') f += 0.05;

  return clamp(f, FATOR_MIN, FATOR_MAX);
}

export function computeEstimate(a: Answers): Estimate {
  const nPessoas = PESSOAS_MIDPOINT[a.teamSize];
  const horasDia = HORAS_REP_MIDPOINT[a.repHours];
  const custoMes = CUSTO_PESSOA_MES[a.costBand];

  const custoHora = custoMes / HORAS_UTEIS_MES;
  const tempoRepMes = horasDia * DIAS_UTEIS_MES * nPessoas;
  const custoRepMes = tempoRepMes * custoHora;

  const fator = automationFactor(a);
  const horasLiberadasMes = tempoRepMes * fator;
  const economiaMes = custoRepMes * fator;

  return {
    fator,
    horasLiberadasMes,
    economiaMes,
    economiaAno: economiaMes * 12,
  };
}
