import type { Answers } from '@/lib/calculator';

export type QuestionId = keyof Answers;

interface Option<V extends string> {
  value: V;
  label: string;
}

interface QuestionConfig<K extends QuestionId> {
  id: K;
  title: string;
  help: string;
  options: Option<Answers[K]>[];
}

export type Question = { [K in QuestionId]: QuestionConfig<K> }[QuestionId];

export const QUESTIONS: Question[] = [
  {
    id: 'segment',
    title: 'Qual o segmento da sua empresa?',
    help: 'Pra adaptarmos a recomendação ao seu setor.',
    options: [
      { value: 'comercio-varejo', label: 'Comércio / Varejo' },
      { value: 'ecommerce', label: 'E-commerce' },
      { value: 'servicos', label: 'Serviços' },
      { value: 'saude', label: 'Saúde / Clínicas' },
      { value: 'educacao', label: 'Educação' },
      { value: 'industria', label: 'Indústria' },
      { value: 'tecnologia', label: 'Tecnologia / SaaS' },
      { value: 'imobiliario', label: 'Imobiliário' },
      { value: 'financeiro', label: 'Financeiro / Contábil' },
      { value: 'outro', label: 'Outro' },
    ],
  },
  {
    id: 'teamSize',
    title: 'Quantas pessoas tocam o operacional?',
    help: 'Considere atendimento, suporte, cadastro e tarefas manuais.',
    options: [
      { value: '1', label: '1 pessoa' },
      { value: '2-5', label: '2 a 5' },
      { value: '6-15', label: '6 a 15' },
      { value: '16+', label: '16 ou mais' },
    ],
  },
  {
    id: 'repHours',
    title: 'Quanto tempo, por dia, some em tarefas repetitivas?',
    help: 'Por pessoa: copiar/colar, responder a mesma coisa, lançar dados à mão.',
    options: [
      { value: '<1', label: 'Menos de 1h' },
      { value: '1-2', label: '1 a 2h' },
      { value: '3-4', label: '3 a 4h' },
      { value: '5+', label: '5h ou mais' },
    ],
  },
  {
    id: 'volume',
    title: 'Qual o volume de atendimentos/processos manuais por dia?',
    help: 'Uma noção geral já ajuda.',
    options: [
      { value: 'baixo', label: 'Baixo' },
      { value: 'medio', label: 'Médio' },
      { value: 'alto', label: 'Alto' },
      { value: 'muito-alto', label: 'Muito alto' },
    ],
  },
  {
    id: 'costBand',
    title: 'Custo médio mensal por pessoa (salário + encargos)?',
    help: 'Uma estimativa por colaborador envolvido.',
    options: [
      { value: 'ate-2k', label: 'Até R$ 2.000' },
      { value: '2-4k', label: 'R$ 2.000 a 4.000' },
      { value: '4-7k', label: 'R$ 4.000 a 7.000' },
      { value: '7k+', label: 'Acima de R$ 7.000' },
    ],
  },
  {
    id: 'crm',
    title: 'Você já usa um CRM?',
    help: 'Onde ficam seus contatos e o histórico de clientes hoje?',
    options: [
      { value: 'organizado', label: 'Sim, organizado' },
      { value: 'baguncado', label: 'Sim, mas bagunçado' },
      { value: 'planilha', label: 'Só planilha' },
      { value: 'nenhum', label: 'Não uso' },
    ],
  },
  {
    id: 'dataOrg',
    title: 'Como estão seus dados e processos hoje?',
    help: 'Pense em quão fácil é encontrar e confiar nas informações.',
    options: [
      { value: 'organizados', label: 'Organizados' },
      { value: 'parciais', label: 'Parcialmente' },
      { value: 'espalhados', label: 'Espalhados' },
    ],
  },
  {
    id: 'maturity',
    title: 'Qual seu momento com automação?',
    help: 'Sem julgamento — só para recomendar o passo certo.',
    options: [
      { value: 'ja-automatizo', label: 'Já automatizo algo' },
      { value: 'quero-comecar', label: 'Quero começar' },
      { value: 'nao-sei', label: 'Não sei por onde' },
    ],
  },
];
