// Conteúdo comum a todas as versões da landing page (contato, menu, oferta, provas, depoimentos, formulário).
// O que muda de uma página para outra fica em geral.ts, whatsapp.ts, crm.ts e processos.ts.

export const site = {
  name: 'Eficienci IA',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://eficienciia.com.br',
  tagline: 'Automação com IA para empresas que querem crescer sem inchar a operação',
  // [NUMERO] — DDI + DDD + número, só dígitos
  whatsappNumber: '5535991404064',
  whatsappMessage: 'Olá! Vim pelo site da Eficienci IA e quero entender o diagnóstico.',
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

/** As versões da landing page. Aparecem no menu "Soluções" e no rodapé. */
export const landingPages = [
  { slug: 'geral', href: '/', label: 'Visão geral', description: 'Onde a IA gera mais retorno no seu negócio' },
  { slug: 'whatsapp', href: '/automacao-whatsapp', label: 'Automação de WhatsApp', description: 'Atendimento e vendas 24/7 no WhatsApp' },
  { slug: 'crm', href: '/automacao-crm', label: 'CRM e gestão de leads', description: 'Funil organizado e CRM que se preenche sozinho' },
  { slug: 'processos', href: '/automacao-processos', label: 'Processos internos', description: 'Fim do trabalho manual repetitivo na operação' },
];

export const nav = {
  solutionsLabel: 'Soluções',
  links: [
    { href: '#metodo', label: 'Como funciona' },
    { href: '#resultados', label: 'Resultados' },
    { href: '#oferta', label: 'Investimento' },
    { href: '#faq', label: 'Dúvidas' },
  ],
  cta: { href: '#contato', label: 'Diagnóstico por R$ 160' },
};

export const proof = {
  stats: [
    { prefix: '+', value: 315, suffix: ' min', text: 'por mês devolvidos ao time em atendimento, follow-up e gestão de leads' },
    { prefix: '+R$ ', value: 10, suffix: ' mil', text: 'por ano economizados em sistemas que deixaram de ser necessários' },
    { static: '24/7', text: 'automações ativas, inclusive à noite e no fim de semana' },
  ] as { prefix?: string; value?: number; suffix?: string; static?: string; text: string }[],
  clientsLabel: 'Empresas que já operam com a Eficienci IA:',
  clients: ['YouCon Projetos', 'Indominus', 'Mattos Imobiliária'],
};

export const offer = {
  eyebrow: 'Como começar',
  title: 'Três passos. Nenhum salto no escuro.',
  support: 'Você só investe na implementação depois de ver, no diagnóstico, quanto ela vai devolver.',
  diagnostic: {
    step: 'Passo 1',
    title: 'Diagnóstico',
    badge: 'Comece aqui',
    price: 'R$ 160',
    priceNote: '100% abatido se você seguir com a implementação',
    items: [
      'Reunião de mapeamento com você e o time',
      'Análise dos seus processos, sistemas e funil',
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
        'Agentes e automações configurados com a linguagem da sua empresa',
        'Integração com os sistemas que você já usa',
        'Treinamento do time',
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
    text: 'Se não encontrarmos pelo menos 5 horas por mês que podem ser automatizadas na sua operação, devolvemos seus R$ 160.',
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

export const form = {
  title: 'Agende seu diagnóstico',
  name: 'Seu nome',
  phone: 'WhatsApp',
  phonePlaceholder: '(DD) 99999-9999',
  company: 'Empresa',
  team: 'Quantas pessoas atendem leads hoje?',
  teamOptions: ['Só eu', '2 a 5', '6 a 15', 'Mais de 15'],
  source: 'Por onde chega a maioria dos seus leads?',
  sourceOptions: ['Anúncios (Meta ou Google)', 'Instagram e redes sociais', 'Indicação', 'Site e Google orgânico', 'Outro'],
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
};

export const footer = {
  links: [
    { label: 'WhatsApp', href: whatsappHref, external: true },
    { label: 'Instagram', href: site.instagram, external: true },
    { label: 'LinkedIn', href: site.linkedin, external: true },
    { label: 'Calculadora', href: '/calculadora', external: false },
    { label: 'Política de privacidade', href: '/privacidade', external: false },
  ],
};

export const fab = { tooltip: 'Fale com o time', label: 'Falar com o time da Eficienci IA no WhatsApp' };
