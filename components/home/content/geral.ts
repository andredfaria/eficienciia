// Versão: público geral (/)
import { form, offer, proof, testimonials } from './shared';
import type { LandingContent } from './types';

export const geral: LandingContent = {
  slug: 'geral',
  path: '/',
  seo: {
    title: 'Eficienci IA | Consultoria e automação com IA para empresas',
    description:
      'Identificamos onde a IA gera mais retorno no seu negócio e implementamos: atendimento no WhatsApp, CRM automático e processos internos sem trabalho manual. Diagnóstico por R$ 100.',
  },
  service: {
    name: 'Consultoria e implementação de automação com IA',
    description:
      'Diagnóstico do negócio, plano priorizado por retorno e implementação de agentes de IA e automações em atendimento, CRM e processos internos. Diagnóstico de R$ 100, abatido na implementação.',
  },

  hero: {
    eyebrow: 'Consultoria especializada em IA',
    title: 'Da estratégia à execução: IA que gera resultado real.',
    subtitle:
      'Identificamos as melhores oportunidades de automação no seu negócio e implementamos soluções de IA com foco em eficiência, escala e retorno mensurável. Atendimento, vendas e processos internos funcionando sem depender de trabalho manual.',
    primary: { href: '#contato', label: 'Quero meu diagnóstico' },
    secondary: { href: '/calculadora', label: 'Calcular minha economia' },
    micro: ['R$ 100, abatido 100% na implementação', 'Resultado em até 7 dias', 'Garantia de devolução'],
    demo: {
      header: 'Assistente · Sua empresa',
      status: 'online agora',
      tag: 'Exemplo',
      messages: [
        { from: 'lead', text: 'Bom dia! Como fechou o dia de ontem?' },
        { from: 'agent', text: 'Bom dia! 23 leads atendidos, 6 visitas agendadas e 41 notas lançadas no ERP.' },
        { from: 'lead', text: 'Ficou algum pedido travado?' },
        { from: 'agent', text: 'Dois aguardando aprovação de crédito. Já avisei o financeiro e agendei o retorno.' },
        { from: 'lead', text: 'Perfeito, obrigado!' },
      ],
      crm: {
        label: 'Painel atualizado',
        badge: 'Tudo em dia',
        title: 'Resumo de ontem · 18h',
        fields: [
          { key: 'Atendimento', value: '23 leads respondidos' },
          { key: 'Comercial', value: '6 visitas agendadas' },
          { key: 'Financeiro', value: '41 notas lançadas' },
          { key: 'Pendências', value: '2 encaminhadas ✓' },
        ],
      },
    },
  },

  proof,

  leaks: {
    eyebrow: 'O problema',
    title: 'Onde sua empresa está perdendo tempo e dinheiro',
    support: 'Se você se reconhece em duas ou mais situações abaixo, tem horas e vendas indo embora todo mês.',
    counterLabel: 'gargalos identificados',
    checkHint: 'Me identifico',
    items: [
      'O time passa horas copiando dados de uma planilha para outro sistema.',
      'O cliente pergunta a mesma coisa todo dia, e alguém precisa parar o que está fazendo para responder.',
      'O lead chega fora do horário e só recebe resposta no dia seguinte.',
      'O relatório do mês leva dias para ficar pronto e chega desatualizado.',
      'Você paga vários sistemas que não conversam entre si, e cada um cobra uma mensalidade.',
      'Tudo passa por você. Se o dono para, a empresa para junto.',
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
      'Comprar ferramenta é fácil. O difícil é saber o que automatizar, em que ordem, e como o seu time vai usar. Por isso começamos pelo seu negócio e só depois colocamos a IA para trabalhar. Esse é o Ciclo 4E.',
    loopLabel: 'Ciclo contínuo',
    steps: [
      {
        title: 'Escutar',
        text: 'Mergulhamos no seu negócio: processos, gargalos e oportunidades. Só avançamos quando entendemos onde a IA vai gerar impacto real.',
      },
      {
        title: 'Explorar',
        text: 'Testamos, validamos e desenhamos o plano certo para o seu contexto, priorizado por retorno. Sem vender ferramenta por vender.',
      },
      {
        title: 'Executar',
        text: 'Implementamos com integração nos seus sistemas. Sem parar a operação, sem retrabalho, com entregas curtas.',
      },
      {
        title: 'Evoluir',
        text: 'Medimos cada resultado, ajustamos o que não performa e ampliamos o que funciona. Você não fica sozinho depois da entrega.',
      },
    ],
  },

  beforeAfter: {
    title: 'A mesma segunda-feira, dois finais diferentes',
    tag: 'Exemplo',
    modes: [
      {
        id: 'sem',
        label: 'Sem automação',
        events: [
          { time: '08:00', text: 'o time abre 3 planilhas para montar o relatório' },
          { time: '10:30', text: 'cliente pergunta o status do pedido e ninguém sabe responder' },
          { time: '17:00', text: 'o relatório fica pronto, já desatualizado' },
        ],
        status: 'Dia gasto em retrabalho',
        positive: false,
      },
      {
        id: 'com',
        label: 'Com Eficienci IA',
        events: [
          { time: '08:00', text: 'o relatório já está atualizado no painel' },
          { time: '08:05', text: 'clientes recebem o status do pedido no WhatsApp' },
          { time: '08:10', text: 'leads da noite já estão qualificados no CRM' },
          { time: '08:15', text: 'o time começa pelo que gera receita' },
        ],
        status: 'Time focado no que importa',
        positive: true,
      },
    ],
  },

  solutions: {
    eyebrow: 'A solução',
    title: 'O que a IA passa a fazer pela sua empresa',
    cards: [
      {
        title: 'Atendimento e vendas no WhatsApp',
        text: 'Um agente de IA que responde, qualifica e encaminha cada contato 24/7, no tom da sua empresa, sem contratar mais atendentes.',
        result: 'Nenhum cliente esperando resposta.',
        anim: 'clock',
        href: '/automacao-whatsapp',
        linkLabel: 'Ver automação de WhatsApp',
      },
      {
        title: 'CRM e gestão de leads',
        text: 'Cada contato vira registro, com funil organizado e follow-up automático no momento certo.',
        result: 'Nenhum lead esquecido no caminho.',
        anim: 'followup',
        href: '/automacao-crm',
        linkLabel: 'Ver automação de CRM',
      },
      {
        title: 'Processos internos sem trabalho manual',
        text: 'Lançamentos, conferências, relatórios e cópia de dados entre sistemas feitos sozinhos.',
        result: 'Seu time volta para o que gera valor.',
        anim: 'table',
        href: '/automacao-processos',
        linkLabel: 'Ver automação de processos',
      },
      {
        title: 'Integração entre sistemas',
        text: 'Conectamos WhatsApp, CRM, ERP e sistemas internos em um fluxo único. Sua equipe para de copiar dados entre telas.',
        result: 'Um dado, digitado uma vez só.',
        anim: 'handoff',
      },
      {
        title: 'Relatórios e métricas',
        text: 'Painéis que mostram o desempenho de cada automação e o retorno real, não só atividade.',
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

  offer,
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
      sectors: ['Imobiliárias', 'Construção e projetos', 'Clínicas e saúde', 'E-commerce', 'Educação', 'Serviços B2B'],
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
        q: 'O que é um agente de IA e como ele ajuda minha empresa?',
        a: 'É um software que executa tarefas repetitivas por você: responde clientes no WhatsApp, qualifica leads, atualiza o CRM, lança dados e gera relatórios. Ele trabalha 24 horas por dia, sempre do mesmo jeito, e passa para uma pessoa quando o assunto pede.',
      },
      {
        q: 'Por onde começar?',
        a: 'Pelo diagnóstico. Mapeamos seus processos e mostramos onde a automação dá mais retorno, com valor e prazo fechados antes de qualquer implementação.',
      },
      {
        q: 'Vocês atendem pequenas e médias empresas?',
        a: 'Sim, é o nosso foco. A ideia é colocar tecnologia de ponta ao alcance de empresas que não têm um time de TI próprio, com soluções práticas e retorno medido.',
      },
      {
        q: 'Preciso trocar meus sistemas?',
        a: 'Na maioria dos casos, não. Integramos com o que você já usa, e o diagnóstico confirma isso antes de qualquer investimento.',
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
    title: 'Descubra onde a IA gera mais retorno no seu negócio.',
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
      team: 'Quantas pessoas trabalham na empresa hoje?',
      teamOptions: ['Só eu', '2 a 10', '11 a 50', 'Mais de 50'],
      source: 'O que você quer automatizar primeiro?',
      sourceOptions: ['Atendimento e vendas no WhatsApp', 'CRM e gestão de leads', 'Processos internos', 'Ainda não sei'],
    },
  },
};
