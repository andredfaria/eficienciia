// Versão: processos internos (/automacao-processos)
import { form, offer, proof, testimonials } from './shared';
import type { LandingContent } from './types';

export const processos: LandingContent = {
  slug: 'processos',
  path: '/automacao-processos',
  seo: {
    title: 'Eficienci IA | Automação de processos internos com IA',
    description:
      'Automatize lançamentos, conferências, relatórios e cópia de dados entre sistemas. Diagnóstico por R$ 100, abatido na implementação.',
  },
  service: {
    name: 'Automação de processos internos com IA',
    description:
      'Agentes de IA e integrações que eliminam tarefas manuais repetitivas: lançamento de dados, conferência de documentos, relatórios automáticos e rotinas entre sistemas. Começa com um diagnóstico de R$ 100, abatido na implementação.',
  },

  hero: {
    eyebrow: 'Automação de processos internos com IA',
    title: 'O trabalho repetitivo da sua empresa, feito sozinho.',
    subtitle:
      'Agentes de IA que lançam dados, conferem documentos, geram relatórios e conectam seus sistemas. Seu time para de copiar e colar e volta para o que gera resultado.',
    primary: { href: '#contato', label: 'Quero meu diagnóstico' },
    secondary: { href: '/calculadora', label: 'Calcular quanto posso economizar' },
    micro: ['R$ 100, abatido 100% na implementação', 'Resultado em até 7 dias', 'Garantia de devolução'],
    demo: {
      header: 'Assistente interno · Financeiro',
      status: 'online agora',
      tag: 'Exemplo',
      messages: [
        { from: 'lead', text: 'Chegaram 3 notas fiscais do fornecedor Alfa por e-mail. Pode lançar?' },
        { from: 'agent', text: 'Lançadas no ERP. Uma veio com valor diferente do pedido de compra. Quer que eu avise o comprador?' },
        { from: 'lead', text: 'Pode avisar, por favor.' },
        { from: 'agent', text: 'Avisado. Também atualizei as contas a pagar e agendei os vencimentos.' },
        { from: 'lead', text: 'Perfeito, obrigado!' },
      ],
      crm: {
        label: 'Registrado no ERP',
        badge: 'Processo concluído',
        title: 'Fornecedor Alfa · 3 notas',
        fields: [
          { key: 'Lançamento', value: '3 notas no ERP' },
          { key: 'Conferência', value: '1 divergência' },
          { key: 'Comprador', value: 'avisado ✓' },
          { key: 'Vencimentos', value: 'agendados ✓' },
        ],
      },
    },
  },

  proof,

  leaks: {
    eyebrow: 'O problema',
    title: 'Onde sua operação está perdendo tempo hoje',
    support: 'Se você se reconhece em duas ou mais situações abaixo, tem horas do seu time indo embora todo mês.',
    counterLabel: 'gargalos identificados',
    checkHint: 'Me identifico',
    items: [
      'Alguém passa horas copiando dados de um sistema para outro, todo santo dia.',
      'Notas, pedidos e documentos chegam por e-mail e precisam ser conferidos um a um.',
      'O relatório do mês leva dias para ficar pronto e chega desatualizado.',
      'Cada área usa uma planilha diferente e ninguém confia no número final.',
      'O processo depende de uma pessoa. Se ela sai de férias, tudo atrasa.',
      'Você paga vários sistemas que não conversam entre si.',
    ],
    result: 'Você marcou {n} gargalos. Vale um diagnóstico.',
    resultCta: 'Quero meu diagnóstico',
  },

  method: {
    eyebrow: 'Por que tanta automação não dá resultado',
    titleBefore: 'IA em processo ',
    titleScramble: 'bagunçado',
    titleAfter: ' só erra mais rápido.',
    support:
      'Comprar ferramenta é fácil. O difícil é saber o que automatizar, em que ordem, e como o seu time vai usar. Por isso começamos pelo seu processo e só depois colocamos os agentes para trabalhar. Esse é o Ciclo 4E.',
    loopLabel: 'Ciclo contínuo',
    steps: [
      { title: 'Escutar', text: 'Mapeamos as tarefas repetitivas de cada área: quem faz, quanto tempo levam e onde erram.' },
      {
        title: 'Explorar',
        text: 'Priorizamos o que automatizar primeiro pelo tempo devolvido e pelo retorno. Sem vender ferramenta por vender.',
      },
      { title: 'Executar', text: 'Conectamos seus sistemas e colocamos os agentes para trabalhar em entregas curtas, sem parar a operação.' },
      { title: 'Evoluir', text: 'Todo mês medimos, ajustamos o que não performa e ampliamos o que funciona. Você não fica sozinho.' },
    ],
  },

  beforeAfter: {
    title: 'O mesmo fechamento, dois finais diferentes',
    tag: 'Exemplo',
    modes: [
      {
        id: 'sem',
        label: 'Sem automação',
        events: [
          { time: 'Dia 1, 08:00', text: 'o time começa a juntar dados de 4 planilhas' },
          { time: 'Dia 3, 18:00', text: 'o relatório fica pronto, com erros de digitação' },
          { time: 'Dia 4, 10:00', text: 'a diretoria decide com número errado' },
        ],
        status: 'Três dias de retrabalho',
        positive: false,
      },
      {
        id: 'com',
        label: 'Com Eficienci IA',
        events: [
          { time: 'Dia 1, 06:00', text: 'dados consolidados automaticamente' },
          { time: 'Dia 1, 06:05', text: 'relatório gerado e conferido' },
          { time: 'Dia 1, 07:00', text: 'divergências enviadas para quem resolve' },
          { time: 'Dia 1, 08:00', text: 'a diretoria recebe o painel atualizado' },
        ],
        status: 'Fechamento no primeiro dia',
        positive: true,
      },
    ],
  },

  solutions: {
    eyebrow: 'A solução',
    title: 'O que passa a funcionar na sua operação',
    cards: [
      {
        title: 'Dados que se lançam sozinhos',
        text: 'Notas, pedidos e cadastros entram no ERP, no CRM ou na planilha sem ninguém digitar.',
        result: 'Um dado, digitado uma vez só.',
        anim: 'table',
      },
      {
        title: 'Documentos conferidos pela IA',
        text: 'A IA lê e-mails, PDFs e notas, confere com o pedido e aponta divergências.',
        result: 'Erro encontrado antes de virar prejuízo.',
        anim: 'clock',
      },
      {
        title: 'Relatórios prontos no horário',
        text: 'Relatórios e indicadores gerados automaticamente e enviados para quem precisa.',
        result: 'Fechamento em horas, não em dias.',
        anim: 'funnel',
      },
      {
        title: 'Tarefas para a pessoa certa',
        text: 'Aprovações, pendências e alertas chegam a quem resolve, no WhatsApp ou no e-mail.',
        result: 'Nada fica parado esperando alguém lembrar.',
        anim: 'handoff',
      },
      {
        title: 'Rotinas automáticas',
        text: 'Cobranças, vencimentos e lembretes internos disparados no momento certo.',
        result: 'A rotina anda mesmo quando alguém está de férias.',
        anim: 'followup',
      },
      {
        title: 'Menos sistemas, menos custo',
        text: 'Conectamos o que você já usa e eliminamos ferramentas que fazem a mesma coisa.',
        result: 'É daqui que vem a economia de +R$ 10 mil por ano.',
        anim: 'merge',
      },
    ],
  },

  offer: {
    ...offer,
    diagnostic: { ...offer.diagnostic, title: 'Diagnóstico de Processos' },
  },

  testimonials,

  fit: {
    yes: {
      title: 'É para você se…',
      items: [
        'Tem tarefas repetitivas que tomam horas do time toda semana.',
        'Usa vários sistemas e planilhas que não conversam entre si.',
        'Quer crescer sem aumentar a equipe na mesma proporção.',
        'Decide rápido e quer ver resultado medido em número.',
      ],
      sectors: ['Financeiro e contabilidade', 'Construção e projetos', 'Indústria e distribuição', 'Imobiliárias', 'Clínicas e saúde', 'Serviços B2B'],
    },
    no: {
      title: 'Não é para você se…',
      items: [
        'Ainda não tem um produto ou serviço validado.',
        'Procura um robô genérico só para "testar IA".',
        'Não pretende mudar nada nos processos atuais.',
      ],
    },
  },

  faq: {
    title: 'Perguntas que todo dono faz',
    items: [
      {
        q: 'Que tipo de processo dá para automatizar?',
        a: 'Tarefas repetitivas com regra clara: lançar dados, conferir documentos, gerar relatórios, enviar lembretes e mover informação entre sistemas. O diagnóstico mostra quais valem a pena primeiro.',
      },
      {
        q: 'Preciso trocar meus sistemas?',
        a: 'Na maioria dos casos, não. Integramos com o que você já usa, e o diagnóstico confirma isso antes de qualquer investimento.',
      },
      {
        q: 'E se a automação errar?',
        a: 'Ela segue regras aprovadas por você e avisa uma pessoa quando algo foge do padrão. Todo mês revisamos e ajustamos o que for preciso.',
      },
      {
        q: 'A automação vai substituir alguém do time?',
        a: 'A ideia é tirar do time o trabalho repetitivo, para que as pessoas cuidem do que precisa de análise, relacionamento e decisão.',
      },
      {
        q: 'Por que pagar pelo diagnóstico?',
        a: 'Porque é trabalho de verdade, com análise dos seus processos e um plano com retorno estimado. E o valor volta para você: é 100% abatido na implementação, ou devolvido pela garantia.',
      },
      {
        q: 'Quanto tempo leva?',
        a: 'O diagnóstico fica pronto em até 7 dias. O prazo da implementação vem fechado no plano, junto com o valor.',
      },
      {
        q: 'Meus dados ficam seguros?',
        a: 'Os dados ficam nos seus sistemas, com acesso controlado, e todo o tratamento segue a LGPD.',
      },
    ],
  },

  finalCta: {
    title: 'Descubra quantas horas sua operação pode ganhar por mês.',
    support: 'Em uma conversa de mapeamento, mostramos o que dá para automatizar e quanto isso vale para a sua empresa.',
    checks: [
      'Diagnóstico por R$ 100, abatido na implementação',
      'Devolução garantida se não acharmos 5 horas por mês para automatizar',
      'Plano com valor e prazo fechados, sem compromisso de seguir',
    ],
    whatsappLead: 'Prefere conversar agora?',
    whatsappLink: 'Chame no WhatsApp',
    form: {
      ...form,
      team: 'Quantas pessoas trabalham na operação hoje?',
      teamOptions: ['Só eu', '2 a 10', '11 a 50', 'Mais de 50'],
      source: 'Qual área mais sofre com trabalho manual?',
      sourceOptions: ['Financeiro', 'Comercial', 'Operação e logística', 'RH e administrativo', 'Outra'],
    },
  },
};
