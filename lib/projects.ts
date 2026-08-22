export type ProjectGallery = {
  title: string
  images: Array<{
    src: string
    alt: string
  }>
}

export type Project = {
  slug: string
  title: string
  type: string
  year: number
  coverImage: string
  heroImage: string
  sections: Array<{
    title: string
    paragraphs: string[]
    bullets?: string[]
    image?: {
      src: string
      alt: string
    }
  }>
  galleries: ProjectGallery[]
  prototype?: {
    label: string
    url: string
    image: {
      src: string
      alt: string
    }
  }
}

const moodboard = Array.from({ length: 9 }, (_, index) => ({
  src: `/media/projects/moodboard/moodboard-${String(index + 1).padStart(2, "0")}.webp`,
  alt: `Moodboard ${index + 1}`,
}))

const wireframes = Array.from({ length: 6 }, (_, index) => ({
  src: `/media/projects/wireframe/wireframe-${String(index + 1).padStart(2, "0")}.webp`,
  alt: `Wireframe ${index + 1}`,
}))

const designs = Array.from({ length: 6 }, (_, index) => ({
  src: `/media/projects/design/design-${String(index + 1).padStart(2, "0")}.webp`,
  alt: `Design ${index + 1}`,
}))

const desktopGalleries: ProjectGallery[] = [
  { title: "Moodboard", images: moodboard },
  { title: "Wireframe", images: wireframes },
  { title: "Design", images: designs },
]

const mobileGalleries: ProjectGallery[] = [
  { title: "Inspirações", images: moodboard },
  { title: "Wireframe", images: wireframes },
  { title: "Design", images: designs },
]

export const projects: Project[] = [
  {
    slug: "fluentify",
    title: "Fluentify",
    type: "Site",
    year: 2024,
    coverImage: "/media/projects/bg-fluentify.png",
    heroImage: "/media/projects/bg-fluentify-interna.png",
    sections: [
      {
        title: "Introdução",
        paragraphs: [
          "Com o crescimento da demanda por aprendizado online, especialmente em idiomas, surgiu a oportunidade de redesenhar a experiência digital de uma plataforma de cursos de inglês.",
          "O desafio foi criar uma interface intuitiva, acessível e motivadora, que facilitasse o progresso dos alunos e refletisse a metodologia moderna da escola.",
          "Este case apresenta o processo de concepção, prototipagem e refinamento da UI, com foco na usabilidade, engajamento e clareza na navegação.",
        ],
      },
      {
        title: "Objetivo",
        paragraphs: [
          "Apresentar informações essenciais de forma clara, visual e interativa, permitindo que o usuário acompanhe métricas, tome decisões rápidas e identifique padrões ou anomalias com facilidade.",
          "O foco é garantir uma experiência intuitiva, com hierarquia visual bem definida, priorizando a usabilidade e a eficiência na leitura de dados.",
        ],
      },
      {
        title: "Style Guide",
        paragraphs: [
          "A cor Primary: usada nas interações, botão de CTA, a cor Secondary: usada em assets visuais e a cor Neutral: usada nos títulos em fundos claros e escuros.",
          "Foi usada as fontes Barlow para Headline (títulos e interações) e a fonte Inter para o body (corpo, tags, hats e outros textos menores).",
        ],
        image: { src: "/media/projects/img-grid-12-col.png", alt: "Grid Mobile" },
      },
      {
        title: "O Aprendizado",
        paragraphs: [
          "Nesse estudo de caso, o foco foi em UI e levo como aprendizado, usar patterns, praticar.",
          "Tipografia, o ideal é usar um ou dois tipos de fonte no máximo.",
          "White Space, usar do white space na interfaces.",
          "Cores, usar o manual da marca, representando o seu tom de voz.",
        ],
      },
    ],
    galleries: desktopGalleries,
  },
  {
    slug: "casa-nova",
    title: "Casa Nova",
    type: "Site",
    year: 2023,
    coverImage: "/media/projects/bg-casa-nova.png",
    heroImage: "/media/projects/bg-casa-nova-interna.png",
    sections: [
      {
        title: "Introdução",
        paragraphs: [
          "O projeto teve como objetivo repensar a presença digital de uma igreja local, conectando fé, comunidade e tecnologia por meio de uma interface acessível e acolhedora.",
          "A proposta foi criar um site que facilitasse o acesso a informações sobre cultos, eventos, ministérios e conteúdo espiritual, promovendo o envolvimento da comunidade tanto presencial quanto online.",
        ],
      },
      {
        title: "Objetivo",
        paragraphs: [
          "Desenvolver uma interface que comunique os valores da igreja de forma clara, moderna e inclusiva. O site deveria ser funcional para diferentes perfis de usuários — desde membros ativos até visitantes eventuais — com navegação intuitiva, fácil atualização de conteúdo e design responsivo.",
          "Além disso, o foco era transmitir acolhimento, espiritualidade e confiança por meio do visual.",
        ],
      },
      {
        title: "Style Guide",
        paragraphs: [
          "A cor Primary: usada nas interações, botão de CTA, a cor Secondary: usada em assets visuais e a cor Neutral: usada nos títulos em fundos claros e escuros.",
          "Foi usada as fontes Barlow para Headline (títulos e interações) e a fonte Inter para o body (corpo, tags, hats e outros textos menores).",
        ],
        image: { src: "/media/projects/img-grid-12-col.png", alt: "Grid Mobile" },
      },
      {
        title: "O Aprendizado",
        paragraphs: [],
        bullets: [
          "Empatia e escuta ativa: compreender o público-alvo da igreja exigiu sensibilidade para traduzir necessidades emocionais em soluções visuais.",
          "Design centrado no conteúdo: aprendi a dar protagonismo às mensagens e eventos sem sobrecarregar a interface.",
          "Consistência e simplicidade: reforçar padrões visuais claros tornou a navegação mais fluida e intuitiva.",
          "Responsividade e acessibilidade: garantir uma boa experiência em diferentes dispositivos foi fundamental, principalmente para públicos diversos em idade e familiaridade com tecnologia.",
          "Colaboração interdisciplinar: trabalhar com líderes, equipe técnica e voluntários da igreja fortaleceu minha capacidade de comunicação e adaptação.",
        ],
      },
    ],
    galleries: desktopGalleries,
  },
  {
    slug: "ui-boost-app",
    title: "UI Boost",
    type: "APP",
    year: 2022,
    coverImage: "/media/projects/bg-ui-boost.png",
    heroImage: "/media/projects/bg-app-uiboost-interna.png",
    sections: [
      {
        title: "Introdução",
        paragraphs: [
          "No mundo atual, onde o aprendizado contínuo e acessível é essencial para o crescimento pessoal e profissional, a demanda por ferramentas de estudo eficazes nunca foi tão alta. Com o avanço da tecnologia, aplicativos de estudo se tornaram um meio popular para estudantes e profissionais se capacitarem, oferecendo uma maneira conveniente de adquirir novos conhecimentos e habilidades.",
          "Neste contexto, o APP UI Boost surge como uma solução inovadora, projetada para atender às necessidades de um público diverso, desde estudantes do ensino fundamental até profissionais que buscam especialização em suas áreas. Com funcionalidades que vão além do simples acesso ao conteúdo, o aplicativo oferece uma experiência de aprendizado personalizada, utilizando inteligência artificial para adaptar os materiais ao ritmo e estilo de aprendizagem de cada usuário.",
        ],
      },
      {
        title: "Objetivo",
        paragraphs: [
          "O objetivo do APP UI Boost é fornecer uma plataforma de aprendizado acessível, interativa e personalizada que facilite a aquisição de conhecimento e habilidades para estudantes e profissionais. Ao integrar tecnologia de ponta com metodologias educacionais eficazes, buscamos otimizar o processo de aprendizagem, permitindo que os usuários maximizem seu potencial acadêmico e profissional de maneira eficiente e adaptada às suas necessidades individuais. Nosso foco é transformar o estudo em uma experiência mais envolvente, produtiva e alinhada com os desafios e demandas da educação moderna.",
        ],
      },
      {
        title: "User Flow",
        paragraphs: [],
        image: { src: "/media/projects/user-flow.png", alt: "User Flow" },
      },
      {
        title: "Style Guide",
        paragraphs: [
          "Por padrão o grid usado foi o de 8px (podendo ter uma variação de 4px) com margens laterais de 20px, grade de 4 colunas, gutter de 16px.",
          "O espaço seguro deixado para a barra de status bar é de 44px e da home navigator é de 34px.",
          "Foi usada as fontes Poppins para Headline (títulos e interações) e a fonte Inter para o body (corpo, tags, hats e outros textos menores).",
        ],
        image: { src: "/media/projects/img-grid.png", alt: "Grid" },
      },
      {
        title: "O Aprendizado",
        paragraphs: [
          "Paleta de Cores, usar cores que sejam harmoniosas, que transmitam a emoção correta e que ajudem na hierarquização da informação.",
          "Tipografia, o ideal é usar um ou dois tipos de fonte no máximo e que transmitam a mensagem desejada.",
          "White Space, usar do white space na interfaces.",
          "Cores, usar o manual da marca, representando o seu tom de voz.",
          "Utilização de bibliotecas e frameworks de design, como Material Design ou Human Interface Guidelines, que fornecem um conjunto de regras e padrões para a criação de interfaces.",
        ],
      },
    ],
    galleries: mobileGalleries,
    prototype: {
      label: "Acesse o Protótipo",
      url:
        "https://www.figma.com/proto/W1Mid9xrJ5Rus0ValiuLEd/Uiboost---APP?page-id=11325%3A5083&type=design&node-id=11325-7906&viewport=661%2C428%2C0.15&t=twJ2yti6DUEb9OWw-1&scaling=scale-down&starting-point-node-id=11325%3A9912&mode=design",
      image: {
        src: "/media/projects/img-prototipacao.png",
        alt: "Link do Protótipo",
      },
    },
  },
  {
    slug: "ui-boost-landing-page",
    title: "UI Boost",
    type: "Landing Page",
    year: 2022,
    coverImage: "/media/projects/bg-ui-boost-landing-page.png",
    heroImage: "/media/projects/bg-ui-boost-landing-page-interna.png",
    sections: [
      {
        title: "Introdução",
        paragraphs: [
          "Com o crescimento da procura por formação em design digital, surgiu a oportunidade de criar uma landing page estratégica para divulgar um curso de UI Design voltado a iniciantes e profissionais em transição de carreira.",
          "O desafio foi unir clareza, atratividade e conversão em uma única página, apresentando o conteúdo do curso de forma envolvente e objetiva.",
        ],
      },
      {
        title: "Objetivo",
        paragraphs: [
          "Desenvolver uma one page com foco em conversão, capaz de comunicar o valor do curso de forma rápida e visualmente impactante.",
          "A estrutura da página deveria guiar o usuário por uma jornada fluida — desde o entendimento da proposta do curso até a inscrição — utilizando boas práticas de UI como hierarquia visual, CTA claros, responsividade e identidade visual coerente com o público-alvo.",
        ],
      },
      {
        title: "Style Guide",
        paragraphs: [
          "Por padrão o grid usado foi o de 8px (podendo ter uma variação de 4px) com margens laterais de 20px, grade de 4 colunas, gutter de 16px.",
          "O espaço seguro deixado para a barra de status bar é de 44px e da home navigator é de 34px.",
          "Foi usada as fontes Poppins para Headline (títulos e interações) e a fonte Inter para o body (corpo, tags, hats e outros textos menores).",
        ],
        image: { src: "/media/projects/img-grid.png", alt: "Grid" },
      },
      {
        title: "O Aprendizado",
        paragraphs: [
          "Nesse estudo de caso, o foco foi em UI e levo como aprendizado, usar patterns, praticar.",
          "Tipografia, o ideal é usar um ou dois tipos de fonte no máximo.",
          "White Space, usar do white space na interfaces.",
          "Cores, usar o manual da marca, representando o seu tom de voz.",
        ],
      },
    ],
    galleries: mobileGalleries,
  },
]

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}
