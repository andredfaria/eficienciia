// Versão: CRM e gestão de leads (/automacao-crm)
import { form, offer, proof, testimonials } from './shared';
import type { LandingContent } from './types';

export const crm: LandingContent = {
  slug: 'crm',
  path: '/automacao-crm',
  seo: {
    title: 'Eficienci IA | Automação de CRM e gestão de leads com IA',
    description:
      'CRM que se preenche sozinho, funil organizado e follow-up automático para nenhum lead se perder. Diagnóstico por R$ 100, abatido na implementação.',
  },
  service: {
    name: 'Automação de CRM e gestão de leads com IA',
    description:
      'Captura automática de leads de anúncios, formulários e WhatsApp no CRM, qualificação com IA, follow-up por etapa e painel do funil. Começa com um diagnóstico de R$ 100, abatido na implementação.',
  },

  hero: {
    eyebrow: 'Automação de CRM e gestão de leads com IA',
    title: 'Nenhum lead perdido entre o anúncio e a venda.',
    subtitle:
      'Cada contato entra no CRM sozinho, com origem, interesse e próximo passo. O follow-up acontece no tempo certo e você enxerga o funil inteiro em um painel, sem ninguém digitar nada.',
    primary: { href: '#contato', label: 'Quero meu diagnóstico' },
    secondary: { href: '/calculadora', label: 'Calcular quanto estou perdendo' },
    micro: ['R$ 100, abatido 100% na implementação', 'Resultado em até 7 dias', 'Garantia de devolução'],
    demo: {
      header: 'Atendimento · Sua empresa',
      status: 'online agora',
      tag: 'Exemplo',
      messages: [
        { from: 'lead', text: 'Oi! Preenchi o formulário do anúncio. Queria saber o valor do plano empresarial.' },
        { from: 'agent', text: 'Oi, Rafael! Obrigado pelo contato. Quantas pessoas da sua equipe usariam o serviço?' },
        { from: 'lead', text: 'Umas 12 pessoas. Precisamos começar no mês que vem.' },
        { from: 'agent', text: 'Ótimo. Te enviei a proposta por aqui e a Júlia, do comercial, te liga amanhã às 9h. Pode ser?' },
        { from: 'lead', text: 'Pode sim, obrigado!' },
      ],
      crm: {
        label: 'Oportunidade no CRM',
        badge: 'Etapa: proposta',
        title: 'Rafael M. · Plano empresarial',
        fields: [
          { key: 'Origem', value: 'Meta Ads · formulário' },
          { key: 'Tamanho', value: '12 pessoas' },
          { key: 'Prazo', value: 'mês que vem' },
          { key: 'Próximo', value: 'ligação 9h ✓' },
        ],
      },
    },
  },

  proof: {
    ...proof,
    stats: proof.stats.map((s) => (s.static ? { ...s, text: 'captura e follow-up ativos, inclusive à noite e no fim de semana' } : s)),
  },

  leaks: {
    eyebrow: 'O problema',
    title: 'Onde seus leads estão se perdendo hoje',
    support: 'Se você se reconhece em duas ou mais situações abaixo, tem venda escapando do seu funil.',
    counterLabel: 'vazamentos identificados',
    checkHint: 'Me identifico',
    items: [
      'O lead preenche o formulário do anúncio e ninguém sabe em qual planilha ele foi parar.',
      'O CRM está desatualizado porque depende de alguém digitar tudo depois da conversa.',
      'O follow-up depende da memória do vendedor. E a memória falha justamente no lead mais quente.',
      'Você não sabe dizer em qual etapa do funil as vendas estão travando.',
      'Cada vendedor organiza os contatos do seu jeito, e quando alguém sai, a carteira vai junto.',
      'Você investe em anúncio, mas não sabe quais campanhas trazem cliente de verdade.',
    ],
    result: 'Você marcou {n} vazamentos. Vale um diagnóstico.',
    resultCta: 'Quero meu diagnóstico',
  },

  method: {
    eyebrow: 'Por que tanto CRM não dá resultado',
    titleBefore: 'IA em processo ',
    titleScramble: 'bagunçado',
    titleAfter: ' só erra mais rápido.',
    support:
      'Comprar um CRM é fácil. O difícil é fazer o time usar e manter o funil limpo. Por isso começamos pelo seu processo comercial e só depois automatizamos. Esse é o Ciclo 4E.',
    loopLabel: 'Ciclo contínuo',
    steps: [
      { title: 'Escutar', text: 'Mapeamos de onde vêm seus leads, como passam pelo funil, onde param e quanto isso custa por mês.' },
      {
        title: 'Explorar',
        text: 'Desenhamos o funil e as automações: o que entra sozinho no CRM, quando cada follow-up acontece e quem é avisado.',
      },
      { title: 'Executar', text: 'Conectamos anúncios, formulários, WhatsApp e CRM em entregas curtas, sem parar a operação.' },
      { title: 'Evoluir', text: 'Todo mês medimos, ajustamos o que não performa e ampliamos o que funciona. Você não fica sozinho.' },
    ],
  },

  beforeAfter: {
    title: 'O mesmo lead, dois finais diferentes',
    tag: 'Exemplo',
    modes: [
      {
        id: 'sem',
        label: 'Sem automação',
        events: [
          { time: 'Segunda, 10:02', text: 'lead preenche o formulário do anúncio' },
          { time: 'Quarta, 16:30', text: 'alguém encontra o contato na planilha' },
          { time: 'Quarta, 16:45', text: '"Já contratei outra empresa"' },
        ],
        status: 'Venda perdida',
        positive: false,
      },
      {
        id: 'com',
        label: 'Com Eficienci IA',
        events: [
          { time: 'Segunda, 10:02', text: 'lead preenche o formulário do anúncio' },
          { time: 'Segunda, 10:02', text: 'entra no CRM com origem, campanha e interesse' },
          { time: 'Segunda, 10:03', text: 'recebe a primeira mensagem e o vendedor é avisado' },
          { time: 'Quinta, 09:00', text: 'follow-up automático com a proposta' },
        ],
        status: 'Oportunidade na mesa',
        positive: true,
      },
    ],
  },

  solutions: {
    eyebrow: 'A solução',
    title: 'O que passa a funcionar no seu funil',
    cards: [
      {
        title: 'Leads entram sozinhos no CRM',
        text: 'Formulários, anúncios, site e WhatsApp caem direto no CRM, com origem e campanha.',
        result: 'Nenhum contato perdido em planilha.',
        anim: 'table',
      },
      {
        title: 'Follow-up no tempo certo',
        text: 'Mensagens e lembretes por etapa até o lead responder, comprar ou dizer que não tem interesse.',
        result: 'A venda que esfriava volta para a mesa.',
        anim: 'followup',
      },
      {
        title: 'Qualificação automática',
        text: 'A IA identifica interesse, orçamento e urgência e prioriza quem está pronto para comprar.',
        result: 'O time começa o dia pelos leads mais quentes.',
        anim: 'clock',
      },
      {
        title: 'Distribuição para o vendedor certo',
        text: 'Cada oportunidade vai para a pessoa certa, com todo o histórico, e ninguém fica sem retorno.',
        result: 'Carteira organizada, mesmo quando alguém sai.',
        anim: 'handoff',
      },
      {
        title: 'Funil inteiro em um painel',
        text: 'Quantos leads entraram, de qual campanha, quantos responderam, quantos fecharam e onde o processo travou.',
        result: 'Você decide com número, não com achismo.',
        anim: 'funnel',
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
    diagnostic: {
      ...offer.diagnostic,
      title: 'Diagnóstico Comercial',
      items: [
        'Reunião de mapeamento com você e o time',
        'Análise das suas fontes de lead, do CRM e do funil',
        'Relatório com os pontos de perda e o retorno estimado',
        'Plano de implementação com valor fechado',
      ],
    },
    steps: [
      {
        ...offer.steps[0],
        items: [
          'Funil e etapas configurados no CRM',
          'Integração com anúncios, formulários e WhatsApp',
          'Treinamento do time comercial',
          'Entregas por etapas, testadas antes de ir ao ar',
        ],
      },
      offer.steps[1],
    ],
    guarantee: {
      ...offer.guarantee,
      text: 'Se não encontrarmos pelo menos 5 horas por mês que podem ser automatizadas no seu comercial, devolvemos seus R$ 100.',
    },
  },

  testimonials,

  fit: {
    yes: {
      title: 'É para você se…',
      items: [
        'Recebe leads de vários canais todos os dias.',
        'Tem um CRM que ninguém atualiza, ou ainda controla tudo em planilha.',
        'Já investe em anúncio e quer saber o que dá retorno.',
        'Decide rápido e quer ver resultado medido em número.',
      ],
      sectors: ['Imobiliárias', 'Construção e projetos', 'Clínicas e saúde', 'Educação', 'Serviços B2B', 'Venda consultiva'],
    },
    no: {
      title: 'Não é para você se…',
      items: [
        'Ainda não tem um produto ou serviço validado.',
        'Procura um robô genérico só para "testar IA".',
        'Não pretende mudar nada no processo comercial atual.',
      ],
    },
  },

  faq: {
    title: 'Perguntas que todo dono faz',
    items: [
      {
        q: 'Já tenho CRM. Preciso trocar?',
        a: 'Na maioria dos casos, não. Integramos com o que você já usa, e o diagnóstico confirma isso antes de qualquer investimento.',
      },
      {
        q: 'Não tenho CRM. Vocês implementam?',
        a: 'Sim. No diagnóstico indicamos a opção que cabe no seu momento e no seu orçamento, e a implementação já entrega o funil configurado.',
      },
      {
        q: 'Minha equipe vai mesmo usar?',
        a: 'Boa parte do registro passa a ser automática, então o time digita muito menos. E o treinamento faz parte da implementação.',
      },
      {
        q: 'Dá para saber quais campanhas trazem venda?',
        a: 'Sim. Cada lead entra com a origem e a campanha, e o painel mostra o caminho de cada um até a venda.',
      },
      {
        q: 'Por que pagar pelo diagnóstico?',
        a: 'Porque é trabalho de verdade, com análise do seu funil e um plano com retorno estimado. E o valor volta para você: é 100% abatido na implementação, ou devolvido pela garantia.',
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
    title: 'Descubra quantos leads seu funil está deixando escapar.',
    support: 'Em uma conversa de mapeamento, mostramos o que dá para automatizar e quanto isso vale para o seu negócio.',
    checks: [
      'Diagnóstico por R$ 100, abatido na implementação',
      'Devolução garantida se não acharmos 5 horas por mês para automatizar',
      'Plano com valor e prazo fechados, sem compromisso de seguir',
    ],
    whatsappLead: 'Prefere conversar agora?',
    whatsappLink: 'Chame no WhatsApp',
    form,
  },
};
