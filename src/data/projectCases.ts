import govBrImg from "../assets/gov-brr.png";

export type ProjectCaseSlug =
  | "govbr-redesign"
  | "finance-dashboard"
  | "ecommerce-app"
  | "educacao-online";

export type ProjectCase = {
  slug: ProjectCaseSlug;
  title: string;
  eyebrow: string;
  summary: string;
  tags: string[];
  heroImageSrc?: string;
  visualVariant: "gov" | "finance" | "commerce" | "education";
  introLabel?: string;
  overview: {
    context: string;
    problem: string;
    goal: string;
  };
  role: {
    scope: string;
    tools: string[];
    timeline: string;
    team: string;
  };
  process: Array<{
    title: string;
    text: string;
  }>;
  challengePoints?: string[];
  findings?: string[];
  strategicDirections?: string[];
  solution: Array<{
    title: string;
    text: string;
  }>;
  mobile?: {
    title: string;
    text: string[];
  };
  results: string[];
  conclusion?: string[];
  nextProject: ProjectCaseSlug;
};

export const projectCases: ProjectCase[] = [
  {
    slug: "govbr-redesign",
    title: "Gov.br Redesign",
    eyebrow: "Case Study",
    summary:
      "Redesign conceitual da principal porta de entrada para serviços públicos digitais no Brasil, com foco em clareza, hierarquia da informação e acesso mais direto aos serviços essenciais.",
    tags: ["UX/UI", "Research", "Prototype"],
    heroImageSrc: govBrImg,
    visualVariant: "gov",
    introLabel: "Projeto conceitual de estudo em UX/UI",
    overview: {
      context:
        "O Gov.br é a principal porta de entrada para autenticação, emissão de documentos e interação com serviços governamentais no Brasil. Por concentrar fluxos críticos em um único ambiente, a plataforma precisa garantir clareza, eficiência e acessibilidade para milhões de usuários com diferentes níveis de familiaridade digital.",
      problem:
        "A experiência atual apresenta excesso de informações simultâneas, baixa hierarquia visual e uma organização mais centrada no sistema do que no comportamento do usuário. Isso aumenta o esforço cognitivo, dificulta a identificação de ações prioritárias e torna tarefas simples mais demoradas do que o necessário.",
      goal:
        "Reestruturar a jornada de uso para reduzir a carga cognitiva, melhorar a hierarquia das informações e tornar o acesso aos serviços mais direto, intuitivo e eficiente.",
    },
    role: {
      scope: "UX/UI Designer",
      tools: ["Figma", "Research", "Wireframe", "Prototype"],
      timeline: "4 semanas",
      team: "Projeto conceitual individual",
    },
    challengePoints: [
      "Usuários com baixo nível de letramento digital.",
      "Diferentes perfis e objetivos de uso.",
      "Alta variedade de serviços e categorias.",
      "Demandas críticas, como acesso a documentos e autenticação.",
    ],
    process: [
      {
        title: "Análise da experiência atual",
        text:
          "A análise da plataforma mostrou um padrão recorrente de fricções: informações demais na mesma tela, pouca diferenciação entre ações principais e secundárias e uma navegação que exige interpretação constante do usuário.",
      },
      {
        title: "Descobertas-chave",
        text:
          "Ficou claro que o problema não estava na falta de funcionalidade, mas na forma como ela era apresentada. A linguagem, a estrutura e a distribuição visual não acompanhavam a lógica mental de quem queria apenas resolver uma tarefa.",
      },
      {
        title: "Direcionamento estratégico",
        text:
          "A partir da premissa de que o usuário não quer navegar, e sim resolver, o projeto passou a priorizar ações em vez de informações, organizar conteúdos com base em tarefas e tornar a navegação mais previsível e clara em cada etapa da jornada.",
      },
    ],
    findings: [
      "Excesso de informações simultâneas sem hierarquia clara.",
      "Navegação pouco progressiva, exigindo interpretação constante.",
      "Ações principais sem destaque suficiente.",
      "Estrutura e linguagem desalinhadas com a lógica mental do usuário.",
    ],
    strategicDirections: [
      "Priorizar ações em vez de informações.",
      "Organizar conteúdos com base em tarefas.",
      "Reduzir a carga cognitiva.",
      "Tornar a navegação previsível.",
      "Garantir clareza em cada etapa da jornada.",
    ],
    solution: [
      {
        title: "Hierarquia visual mais clara",
        text:
          "A proposta de redesign reorganiza a interface para destacar ações principais e reduzir a competição entre elementos na tela. Com isso, o usuário consegue identificar mais rapidamente o que fazer e onde clicar.",
      },
      {
        title: "Conteúdo orientado a tarefas",
        text:
          "A estrutura foi reformulada para seguir uma lógica orientada a tarefas, e não apenas a categorias internas do sistema. Isso aproxima a interface da intenção real do usuário e encurta o caminho até a conclusão da ação.",
      },
      {
        title: "Experiência mobile priorizada",
        text:
          "Como grande parte dos acessos acontece por dispositivos móveis, a nova experiência também foi pensada para interações mais rápidas, diretas e acessíveis em telas menores, reduzindo etapas e melhorando a escaneabilidade.",
      },
    ],
    mobile: {
      title: "Experiência mobile",
      text: [
        "Outro ponto central foi a priorização da experiência mobile, considerando que grande parte dos acessos acontece por dispositivos móveis e exige interações rápidas e diretas.",
        "A nova interface prioriza ações objetivas, reduz etapas e melhora a navegação em telas menores.",
        "Projetado para uso real: rápido, direto e acessível.",
      ],
    },
    results: [
      "Redução do tempo de decisão ao destacar melhor as ações principais.",
      "Aumento da eficiência ao tornar a jornada mais direta e previsível.",
      "Melhor compreensão da interface, com menos carga cognitiva e menor chance de erro.",
    ],
    conclusion: [
      "Este projeto propõe uma mudança de perspectiva: sair de uma estrutura centrada no sistema para uma experiência centrada no usuário.",
      "Mais do que uma atualização visual, trata-se de uma reestruturação estratégica da forma como os serviços são apresentados e consumidos.",
      "Simplificar não é remover funcionalidades, e sim garantir que elas possam ser utilizadas com clareza e direcionamento.",
    ],
    nextProject: "finance-dashboard",
  },
  {
    slug: "finance-dashboard",
    title: "Finance Dashboard",
    eyebrow: "Case Study",
    summary:
      "Dashboard financeiro pensado para leitura rápida, comparação de dados e tomada de decisão com menos ruído.",
    tags: ["UX/UI", "Dashboard"],
    visualVariant: "finance",
    overview: {
      context:
        "A proposta do dashboard era transformar dados fragmentados em uma leitura mais objetiva e acionável para o usuário.",
      problem:
        "O excesso de informação em interfaces financeiras costuma dificultar entendimento imediato e esconder prioridades importantes.",
      goal:
        "Organizar indicadores, gráficos e blocos de apoio em uma experiência que favorece leitura, foco e controle.",
    },
    role: {
      scope: "UX/UI Designer",
      tools: ["Figma", "Design System", "Dashboard Thinking"],
      timeline: "3 semanas",
      team: "Projeto conceitual individual",
    },
    process: [
      {
        title: "Priorização",
        text:
          "Separei os indicadores realmente essenciais daquilo que poderia entrar como apoio secundário.",
      },
      {
        title: "Fluxo de leitura",
        text:
          "Modelei a tela para funcionar em camadas, permitindo que o usuário entenda o panorama geral antes de aprofundar os dados.",
      },
      {
        title: "Consistência",
        text:
          "Padronizei componentes de cards, gráficos e blocos métricos para manter ritmo visual e previsibilidade.",
      },
    ],
    solution: [
      {
        title: "Resumo primeiro",
        text:
          "O dashboard abre com uma leitura sintética, criando contexto antes da exploração detalhada.",
      },
      {
        title: "Comparação facilitada",
        text:
          "Os blocos foram desenhados para favorecer contraste entre períodos, valores e status sem sobrecarregar a tela.",
      },
      {
        title: "Escala visual clara",
        text:
          "Títulos, métricas e gráficos seguem uma hierarquia que reduz esforço cognitivo e acelera interpretação.",
      },
    ],
    results: [
      "Experiência mais orientada à decisão.",
      "Leitura de dados mais rápida e menos cansativa.",
      "Maior consistência visual entre componentes analíticos.",
    ],
    nextProject: "ecommerce-app",
  },
  {
    slug: "ecommerce-app",
    title: "E-commerce App",
    eyebrow: "Case Study",
    summary:
      "Aplicativo com navegação simplificada e foco em usabilidade para tornar descoberta e checkout mais diretos.",
    tags: ["UX/UI", "Wireframe", "App"],
    visualVariant: "commerce",
    overview: {
      context:
        "O desafio foi organizar uma experiência mobile capaz de equilibrar descoberta de produto e eficiência de compra.",
      problem:
        "Muitos fluxos de e-commerce aumentam fricção no mobile por excesso de etapas, escolhas e interrupções no caminho.",
      goal:
        "Criar um fluxo mais fluido, com menos ruídos de interface e mais confiança durante a jornada de compra.",
    },
    role: {
      scope: "UX/UI Designer",
      tools: ["Figma", "Wireframe", "Prototype"],
      timeline: "3 semanas",
      team: "Projeto conceitual individual",
    },
    process: [
      {
        title: "Jornada",
        text:
          "Mapeei descoberta, detalhe de produto, carrinho e checkout para identificar onde a experiência perdia ritmo.",
      },
      {
        title: "Redução de fricção",
        text:
          "Agrupei informações, removi excesso de passos e busquei tornar cada decisão mais evidente para o usuário.",
      },
      {
        title: "Refino mobile",
        text:
          "Ajustei espaçamentos, áreas clicáveis e hierarquia de componentes para uma navegação mais intuitiva em telas menores.",
      },
    ],
    solution: [
      {
        title: "Descoberta mais clara",
        text:
          "A navegação ajuda o usuário a localizar categorias e produtos sem excesso de interferência visual.",
      },
      {
        title: "Detalhe objetivo",
        text:
          "As informações mais importantes do produto aparecem com prioridade, favorecendo comparação e decisão.",
      },
      {
        title: "Checkout mais direto",
        text:
          "O fluxo reduz interrupções e deixa a conclusão da compra mais previsível e segura.",
      },
    ],
    results: [
      "Jornada mobile mais fluida.",
      "Menos atrito entre navegação e compra.",
      "Maior sensação de clareza durante o checkout.",
    ],
    nextProject: "educacao-online",
  },
  {
    slug: "educacao-online",
    title: "Educação Online",
    eyebrow: "Case Study",
    summary:
      "Plataforma educacional pensada para consumo de conteúdo, navegação simples e boa retenção ao longo da jornada.",
    tags: ["UX/UI", "E-learning", "Web"],
    visualVariant: "education",
    overview: {
      context:
        "A proposta foi construir uma experiência de estudo que equilibrasse clareza de conteúdo, continuidade e senso de progresso.",
      problem:
        "Ambientes educacionais frequentemente perdem usuário por excesso de blocos, navegação confusa e pouca orientação sobre o próximo passo.",
      goal:
        "Organizar a plataforma para tornar o aprendizado mais leve, contínuo e fácil de acompanhar.",
    },
    role: {
      scope: "UX/UI Designer",
      tools: ["Figma", "UX Writing", "Prototype"],
      timeline: "4 semanas",
      team: "Projeto conceitual individual",
    },
    process: [
      {
        title: "Mapeamento de conteúdo",
        text:
          "Estruturei módulos, aulas e trilhas de forma a facilitar leitura de progresso e continuidade.",
      },
      {
        title: "Priorização de interface",
        text:
          "Defini uma hierarquia mais simples entre navegação, conteúdo principal e elementos de apoio.",
      },
      {
        title: "Acompanhamento",
        text:
          "Refinei estados e componentes para que o usuário entenda onde está, o que concluiu e qual é o próximo passo.",
      },
    ],
    solution: [
      {
        title: "Conteúdo no centro",
        text:
          "A tela valoriza a aula e reduz elementos paralelos para manter foco no aprendizado.",
      },
      {
        title: "Progresso visível",
        text:
          "A experiência deixa clara a trilha percorrida e reforça senso de continuidade entre módulos.",
      },
      {
        title: "Navegação simples",
        text:
          "Os caminhos principais foram simplificados para diminuir esforço e aumentar retenção.",
      },
    ],
    results: [
      "Experiência educacional mais organizada e leve.",
      "Maior clareza sobre progresso e continuidade.",
      "Interface mais focada no conteúdo e menos dispersa.",
    ],
    nextProject: "govbr-redesign",
  },
];

export const projectCaseMap = Object.fromEntries(
  projectCases.map((project) => [project.slug, project]),
) as Record<ProjectCaseSlug, ProjectCase>;
