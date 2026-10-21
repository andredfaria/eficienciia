// Todos os textos da home ficam aqui. Edite à vontade: os componentes só leem deste arquivo.

export const site = {
  name: 'Eficienci IA',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://eficienciia.com.br',
  tagline: 'Automação comercial com IA para empresas que vendem pelo WhatsApp',
  // [NUMERO] — DDI + DDD + número, só dígitos
  whatsappNumber: '5535991404064',
  whatsappMessage: 'Olá! Vim pelo site da Eficienci IA e quero entender o diagnóstico comercial.',
  // [WEBHOOK_URL] — defina NEXT_PUBLIC_LEAD_WEBHOOK_URL; o valor abaixo é o fallback atual (n8n)
  webhookUrl:
    process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL || 'https://n8n.eficienciia.com.br/webhook/salva-formulario',
  calculatorHref: '/calculadora',
  // [inserir] — deixe vazio para não exibir
  cnpj: '',
  // [cidade/UF]
  cityUf: 'Poços de Caldas/MG',
  // [e-mail de contato] — deixe vazio para não exibir
  email: '',
  instagram: 'https://www.instagram.com/eficienci.ia/',
  linkedin: 'https://www.linkedin.com/in/andre-de-faria/',
};

export const whatsappHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`;

export const seo = {
  title: 'Eficienci IA | Automação comercial com IA no WhatsApp',
  description:
    'Agentes de IA que respondem cada lead na hora, fazem follow-up e atualizam o CRM. Diagnóstico comercial por R$ 100, abatido na implementação.',
};

export const nav = {
  links: [
    { href: '#metodo', label: 'Como funciona' },
    { href: '#resultados', label: 'Resultados' },
    { href: '#oferta', label: 'Investimento' },
    { href: '#faq', label: 'Dúvidas' },
  ],
  cta: { href: '#contato', label: 'Diagnóstico por R$ 100' },
};

export const hero = {
  eyebrow: 'Automação comercial com IA para quem vende pelo WhatsApp',
  title: 'Seu WhatsApp vendendo como um time comercial inteiro.',
  subtitle:
    'Agentes de IA que respondem cada lead na hora, fazem o follow-up que ninguém lembra de fazer e registram tudo no CRM. Sua empresa vende mais sem contratar mais vendedor.',
  primary: { href: '#contato', label: 'Quero meu diagnóstico' },
  secondary: { href: '/calculadora', label: 'Calcular quanto estou perdendo' },
  micro: ['R$ 100, abatido 100% na implementação', 'Resultado em até 7 dias', 'Garantia de devolução'],
  demo: {
    header: 'Atendimento · Sua empresa',
    status: 'online agora',
    tag: 'Exemplo',
    messages: [
      { from: 'lead', text: 'Oi! Vi o anúncio do apartamento de 2 quartos. Ainda tem disponível?' },
      { from: 'agent', text: 'Oi, Camila! Tem sim. Para eu te mostrar as melhores opções: é para morar ou investir?' },
      { from: 'lead', text: 'Para morar. Até uns 450 mil.' },
      { from: 'agent', text: 'Perfeito. Separei 3 unidades nessa faixa. Quer visitar amanhã às 10h ou às 15h?' },
      { from: 'lead', text: '15h fica ótimo!' },
    ] as { from: 'lead' | 'agent'; text: string }[],
    crm: {
      label: 'Registrado no CRM',
      badge: 'Lead qualificado',
      title: 'Camila S. · Apto 2 quartos',
      fields: [
        { key: 'Orçamento', value: 'até R$ 450 mil' },
        { key: 'Objetivo', value: 'morar' },
        { key: 'Visita', value: 'amanhã, 15h' },
        { key: 'Vendedor', value: 'avisado ✓' },
      ],
    },
  },
};

export const proof = {
  stats: [
    { prefix: '+', value: 315, suffix: ' min', text: 'por mês devolvidos ao time em atendimento, follow-up e gestão de leads' },
    { prefix: '+R$ ', value: 10, suffix: ' mil', text: 'por ano economizados em sistemas que deixaram de ser necessários' },
    { static: '24/7', text: 'atendimento ativo, inclusive à noite e no fim de semana' },
  ] as { prefix?: string; value?: number; suffix?: string; static?: string; text: string }[],
  clientsLabel: 'Empresas que já operam com a Eficienci IA:',
  clients: ['YouCon Projetos', 'Indominus', 'Mattos Imobiliária'],
};

export const leaks = {
  eyebrow: 'O problema',
  title: 'Onde sua venda está vazando hoje',
  support: 'Se você se reconhece em duas ou mais situações abaixo, tem dinheiro parado no seu WhatsApp.',
  counterLabel: 'vazamentos identificados',
  checkHint: 'Me identifico',
  items: [
    'O lead chega às 21h e só recebe resposta no dia seguinte. Até lá, já falou com o concorrente.',
    'O follow-up depende da memória do vendedor. E a memória falha justamente no lead mais quente.',
    'A conversa está no WhatsApp, o dado numa planilha e o cliente no CRM. Ninguém sabe o que está em aberto.',
    'Você paga vários sistemas que não conversam entre si e o time ainda copia dado de uma tela para outra.',
    'Tudo passa por você. Se o dono para, o comercial para junto.',
    'Você investe em anúncio, mas não sabe quantos leads de fato viraram venda.',
  ],
  result: (n: number) => `Você marcou ${n} vazamentos. Vale um diagnóstico.`,
  resultCta: 'Quero meu diagnóstico',
};

export const method = {
  eyebrow: 'Por que tanta automação não dá resultado',
  titleBefore: 'IA em processo ',
  titleScramble: 'bagunçado',
  titleAfter: ' só erra mais rápido.',
  support:
    'Comprar ferramenta é fácil. O difícil é saber o que automatizar, em que ordem, e como o seu time vai usar. Por isso começamos pelo seu processo comercial e só depois colocamos os agentes para trabalhar. Esse é o Ciclo 4E.',
  loopLabel: 'Ciclo contínuo',
  steps: [
    { title: 'Escutar', text: 'Mapeamos como seus leads chegam, quem responde, onde esfriam e quanto isso custa por mês.' },
    { title: 'Explorar', text: 'Montamos o plano: o que automatizar primeiro, quanto custa e quanto retorna. Sem vender ferramenta por vender.' },
    { title: 'Executar', text: 'Colocamos os agentes no seu WhatsApp e no CRM em entregas curtas, sem parar a operação.' },
    { title: 'Evoluir', text: 'Todo mês medimos, ajustamos o que não performa e ampliamos o que funciona. Você não fica sozinho.' },
  ],
};

export const beforeAfter = {
  title: 'O mesmo lead, dois finais diferentes',
  tag: 'Exemplo',
  modes: [
    {
      id: 'sem',
      label: 'Sem automação',
      events: [
        { time: '21:14', text: 'lead chega' },
        { time: '09:40 do dia seguinte', text: 'vendedor responde' },
        { time: '09:41', text: '"Já fechei com outra empresa"' },
      ],
      status: 'Venda perdida',
      positive: false,
    },
    {
      id: 'com',
      label: 'Com Eficienci IA',
      events: [
        { time: '21:14', text: 'lead chega' },
        { time: '21:14', text: 'agente responde e qualifica' },
        { time: '21:16', text: 'visita agendada e CRM atualizado' },
        { time: '08:00', text: 'vendedor recebe o lead pronto' },
      ],
      status: 'Oportunidade na mesa',
      positive: true,
    },
  ],
};

export type SolutionAnim = 'clock' | 'followup' | 'table' | 'handoff' | 'funnel' | 'merge';

export const solutions = {
  eyebrow: 'A solução',
  title: 'O que passa a funcionar no seu comercial',
  cards: [
    {
      title: 'Resposta imediata, 24 horas',
      text: 'O agente responde, tira dúvidas e qualifica o lead no WhatsApp, no tom da sua empresa.',
      result: 'Nenhum lead espera até amanhã.',
      anim: 'clock',
    },
    {
      title: 'Follow-up que não esquece',
      text: 'Mensagens no momento certo até o lead responder, comprar ou dizer que não tem interesse.',
      result: 'A venda que esfriava volta para a mesa.',
      anim: 'followup',
    },
    {
      title: 'CRM que se preenche sozinho',
      text: 'Cada conversa vira registro: nome, interesse, orçamento e próximo passo.',
      result: 'Seu time para de digitar e volta a vender.',
      anim: 'table',
    },
    {
      title: 'Passagem certa para o vendedor',
      text: 'Quando o lead está pronto, vai para a pessoa certa, com todo o histórico da conversa.',
      result: 'O vendedor só fala com quem quer comprar.',
      anim: 'handoff',
    },
    {
      title: 'Funil inteiro em um painel',
      text: 'Quantos leads entraram, quantos responderam, quantos fecharam e onde o processo travou.',
      result: 'Você decide com número, não com achismo.',
      anim: 'funnel',
    },
    {
      title: 'Menos sistemas, menos custo',
      text: 'Conectamos o que você já usa e eliminamos ferramentas que fazem a mesma coisa.',
      result: 'É daqui que vem a economia de +R$ 10 mil por ano.',
      anim: 'merge',
    },
  ] as { title: string; text: string; result: string; anim: SolutionAnim }[],
};

export const offer = {
  eyebrow: 'Como começar',
  title: 'Três passos. Nenhum salto no escuro.',
  support: 'Você só investe na implementação depois de ver, no diagnóstico, quanto ela vai devolver.',
  diagnostic: {
    step: 'Passo 1',
    title: 'Diagnóstico Comercial',
    badge: 'Comece aqui',
    price: 'R$ 100',
    priceNote: '100% abatido se você seguir com a implementação',
    items: [
      'Reunião de mapeamento com você e o time',
      'Análise do seu WhatsApp, CRM e funil',
      'Relatório com os pontos de perda e o retorno estimado',
      'Plano de implementação com valor fechado',
    ],
    cta: 'Agendar diagnóstico',
  },
  steps: [
    {
      step: 'Passo 2',
      title: 'Implementação',
      highlight: 'Projeto fechado',
      text: 'Valor e prazo definidos no diagnóstico, sem surpresa no caminho',
      items: [
        'Agentes configurados com a linguagem da sua empresa',
        'Integração com WhatsApp e CRM',
        'Treinamento do time comercial',
        'Entregas por etapas, testadas antes de ir ao ar',
      ],
    },
    {
      step: 'Passo 3',
      title: 'Evolução mensal',
      highlight: 'Acompanhamento contínuo',
      text: 'O sistema melhora junto com a sua operação',
      items: [
        'Ajustes de fluxos e mensagens',
        'Novas automações conforme a demanda',
        'Relatório mensal de resultados',
        'Suporte direto com o time',
      ],
    },
  ],
  guarantee: {
    title: 'Garantia do diagnóstico',
    text: 'Se não encontrarmos pelo menos 5 horas por mês que podem ser automatizadas no seu comercial, devolvemos seus R$ 100.',
  },
  calculator: {
    text: 'Quer uma estimativa antes? Responda 8 perguntas em 2 minutos.',
    cta: 'Abrir calculadora',
  },
};

export const testimonials = {
  eyebrow: 'Resultados',
  title: 'Quem decide, recomenda',
  items: [
    {
      name: 'André Mattos',
      role: 'Gerente de Vendas · Mattos Imobiliária',
      photo: '/testimonials/andre-mattos.jpg',
      quote:
        'A Eficienci IA automatizou todo nosso pré-atendimento, integrando leads da Meta e redes sociais ao CRM, com IA generativa para qualificação e atendimento inicial. Com isso tivemos mais eficiência, escala, produtividade e controle de dados.',
    },
    {
      name: 'Thiago Cardim',
      role: 'CEO · YouCon Projetos',
      photo: '',
      quote:
        'A Eficienci IA transformou nossa operação na Youcon com uma estrutura robusta de banco de dados, implementação da cultura de IA na empresa e integração entre CRM e disparos de mensagens. Mais automação, eficiência e visão estratégica para o negócio.',
    },
    {
      name: 'Rafa Markovits',
      role: 'CEO · Indominus',
      photo: '',
      quote:
        'Entregas de qualidade e rápidas, além de um ótimo suporte. Nossos clientes tiveram ganhos de eficiência em suas operações por conta dos agentes e automações criados pela equipe.',
    },
  ],
};

export const fit = {
  yes: {
    title: 'É para você se…',
    items: [
      'Vende pelo WhatsApp e recebe leads todos os dias.',
      'Tem um time comercial sobrecarregado, ou é você quem vende.',
      'Já investe em anúncio e quer aproveitar cada lead.',
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
};

export const faq = {
  title: 'Perguntas que todo dono faz',
  items: [
    {
      q: 'O cliente vai perceber que está falando com uma IA?',
      a: 'O agente segue o tom da sua empresa e passa a conversa para uma pessoa sempre que o assunto pede. Você define essas regras com a gente.',
    },
    {
      q: 'E se a IA responder algo errado?',
      a: 'Ela só usa informações aprovadas por você. Todo mês acompanhamos as conversas e ajustamos o que for preciso.',
    },
    {
      q: 'Minha equipe vai mesmo usar?',
      a: 'Tudo acontece dentro do WhatsApp e do CRM que o time já usa, e o treinamento faz parte da implementação.',
    },
    {
      q: 'Já tenho CRM. Preciso trocar?',
      a: 'Na maioria dos casos, não. Integramos com o que você já usa, e o diagnóstico confirma isso antes de qualquer investimento.',
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
};

export const finalCta = {
  title: 'Descubra onde seu comercial está perdendo venda.',
  support:
    'Em uma conversa de mapeamento, mostramos o que dá para automatizar e quanto isso vale para o seu negócio.',
  checks: [
    'Diagnóstico por R$ 100, abatido na implementação',
    'Devolução garantida se não acharmos 5 horas por mês para automatizar',
    'Plano com valor e prazo fechados, sem compromisso de seguir',
  ],
  whatsappLead: 'Prefere conversar agora?',
  whatsappLink: 'Chame no WhatsApp',
  form: {
    title: 'Agende seu diagnóstico',
    name: 'Seu nome',
    phone: 'WhatsApp',
    phonePlaceholder: '(DD) 99999-9999',
    company: 'Empresa',
    team: 'Quantas pessoas atendem leads hoje?',
    teamOptions: ['Só eu', '2 a 5', '6 a 15', 'Mais de 15'],
    source: 'Por onde chega a maioria dos seus leads?',
    sourceOptions: [
      'Anúncios (Meta ou Google)',
      'Instagram e redes sociais',
      'Indicação',
      'Site e Google orgânico',
      'Outro',
    ],
    selectPlaceholder: 'Selecione',
    lgpd: 'Concordo com a Política de Privacidade e com o tratamento dos meus dados conforme a LGPD.',
    submit: 'Quero meu diagnóstico',
    micro: 'Retornamos pelo WhatsApp para agendar o melhor horário.',
    errors: {
      name: 'Informe seu nome.',
      phone: 'Informe um WhatsApp válido com DDD.',
      company: 'Informe o nome da empresa.',
      lgpd: 'É preciso concordar para continuarmos.',
      submit: 'Não conseguimos enviar agora. Tente de novo ou chame no WhatsApp.',
    },
    success: 'Recebemos! Vamos te chamar no WhatsApp em breve.',
    successCta: 'Abrir WhatsApp agora',
  },
};

export const footer = {
  links: [
    { label: 'WhatsApp', href: whatsappHref, external: true },
    { label: 'Instagram', href: site.instagram, external: true },
    { label: 'LinkedIn', href: site.linkedin, external: true },
    { label: 'Política de privacidade', href: '/privacidade', external: false },
  ],
};

export const fab = { tooltip: 'Fale com o time', label: 'Falar com o time da Eficienci IA no WhatsApp' };
