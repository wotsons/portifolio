import type { Experience } from "./types";

// Most recent first.
export const experience: Experience[] = [
  {
    company: "Smart NX",
    role: { "pt-BR": "Desenvolvedor Full-Stack", en: "Full-Stack Developer" },
    start: "2022-02",
    end: null,
    location: { "pt-BR": "Remoto", en: "Remote" },
    highlights: {
      "pt-BR": [
        "Desenvolvi e escalei funcionalidades ponta a ponta no Suite (plataforma omnichannel com mais de 4 milhões de chats mensais) utilizando React, TypeScript e Node.js.",
        "Atuei na manutenção, sustentação e evolução do sistema legado NX Callcenter, resolvendo falhas em produção e mantendo fluxos de telefonia e atendimento com PHP, jQuery, Java, PostgreSQL e Asterisk.",
        "Construí o WebChatPlus (widget embarcado em sites de clientes com React, Tailwind CSS e Webpack) e um editor rich-text de e-mails com Tiptap e normalização HTML.",
        "Implementei integrações de back-end, webhooks e filas assíncronas com RabbitMQ e Redis, conectando Meta (WhatsApp Business API), Zenvia, Telegram, SMS, e-mail e Asterisk.",
        "Estruturei estado global e cache com Redux Toolkit e TanStack Query, além de padronizar componentes de interface com suporte a temas (dark mode).",
        "Implantei do zero a suíte de testes automatizados com Vitest e React Testing Library, integrada a Husky, Docker e Bitbucket Pipelines (CI/CD), além de conduzir code reviews e refinamentos técnicos com produto, design e back-end.",
      ],
      en: [
        "Developed and scaled end-to-end features in Suite (an omnichannel platform handling over 4 million chats per month) using React, TypeScript and Node.js.",
        "Maintained and evolved the legacy NX Callcenter system, resolving production incidents and keeping telephony and support workflows running with PHP, jQuery, Java, PostgreSQL and Asterisk.",
        "Built WebChatPlus (an embeddable support widget for client websites using React, Tailwind CSS and Webpack) and a rich-text email template editor with Tiptap and HTML normalization.",
        "Implemented back-end integrations, webhooks and asynchronous queues with RabbitMQ and Redis, connecting Meta (WhatsApp Business API), Zenvia, Telegram, SMS, email and Asterisk.",
        "Structured global state and caching with Redux Toolkit and TanStack Query, and standardized UI components with theme support (dark mode).",
        "Built the automated testing suite from scratch with Vitest and React Testing Library, integrated with Husky, Docker and Bitbucket Pipelines (CI/CD), while leading code reviews and technical refinements with product, design and back-end teams.",
      ],
    },
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "RabbitMQ",
      "Redis",
      "PostgreSQL",
      "TanStack Query",
      "Vitest",
    ],
  },
  {
    company: "Loopis Jr",
    role: { "pt-BR": "Desenvolvedor Full-Stack Júnior", en: "Junior Full-Stack Developer" },
    start: "2021-12",
    end: "2022-02",
    location: { "pt-BR": "Cajazeiras, PB", en: "Cajazeiras, Brazil" },
    highlights: {
      "pt-BR": [
        "Desenvolvi aplicações web de e-commerce com React, JavaScript (ES6+) e Node.js, abrangendo catálogo, carrinho, checkout e painel administrativo.",
        "Construí e integrei APIs REST para estoque, autenticação, frete e pagamentos, convertendo protótipos do Figma em interfaces responsivas e otimizadas.",
      ],
      en: [
        "Developed e-commerce web applications with React, JavaScript (ES6+) and Node.js, covering product catalog, cart, checkout and admin panel.",
        "Built and integrated REST APIs for inventory, authentication, shipping and payments, turning Figma prototypes into responsive, optimized interfaces.",
      ],
    },
    stack: ["React", "JavaScript", "Node.js", "REST APIs", "Figma"],
  },
  {
    company: "IFPB",
    companyUrl: "https://www.ifpb.edu.br/cajazeiras",
    role: {
      "pt-BR": "Monitor de Algoritmos e Lógica de Programação",
      en: "Algorithms & Programming Logic Teaching Assistant",
    },
    start: "2021-07",
    end: "2022-03",
    location: { "pt-BR": "Cajazeiras, PB", en: "Cajazeiras, Brazil" },
    highlights: {
      "pt-BR": [
        "Auxiliei mais de 50 alunos com dificuldades em algoritmos e lógica de programação em C, contribuindo para a redução da reprovação na disciplina.",
      ],
      en: [
        "Helped 50+ students struggling with algorithms and programming logic in C, contributing to a lower failure rate in the course.",
      ],
    },
    stack: ["C"],
  },
];
