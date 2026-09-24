export type ProjectGallery = {
  title: string
  images: Array<{
    src: string
    alt: string
  }>
}

export type ProjectStyleGuide = {
  palettes: Array<{
    label: string
    colors: Array<{
      label: string
      hex: string
    }>
  }>
  grid: Array<{
    label: string
    value: string
  }>
  typography: Array<{
    label: string
    styles: string[]
  }>
}

export type CaseStudyImage = {
  src: string
  alt: string
}

export type CaseStudy = {
  eyebrow: string
  title: string
  subtitle: string
  summary: string
  year: number
  discipline: string
  introduction: { title: string; paragraphs: string[] }
  media: { hero: CaseStudyImage; productPreview: CaseStudyImage; campaign: CaseStudyImage; solution: CaseStudyImage }
  solution: { eyebrow: string; title: string; description: string; principles: string[]; affinityTitle: string; affinityDescription: string }
  styleGuide: { title: string; description: string; typeface: string; colors: Array<{ label: string; hex: string }> }
  challenges: { title: string; description: string; items: Array<{ title: string; body: string }> }
  results: { title: string; description: string; items: Array<{ title: string; body: string }> }
  liveExperience?: "adotapet-home"
}

export type Project = {
  slug: string
  tone: "parchment" | "warm" | "saffron" | "graphite"
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
    styleGuide?: ProjectStyleGuide
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
  caseStudy?: CaseStudy
}

export type ProjectIntroduction = {
  slug: string
  eyebrow: string
  title: string
  headline: string
  description: string
  heroImage: string
  logoImage: string
  colors: Array<{
    label: string
    hex: string
  }>
}

const projectIntroductions: ProjectIntroduction[] = [
  {
    slug: "digitart",
    eyebrow: "Identidade visual · 2026",
    title: "Digitart",
    headline: "Uma identidade criada para avançar no digital.",
    description:
      "A Digitart é uma agência especializada na criação de sites. Sua identidade visual une precisão tecnológica e energia criativa, traduzidas por uma linguagem direta, dinâmica e preparada para o ambiente digital.",
    heroImage: "/media/hero/digitart.png",
    logoImage: "/media/cases/digitart/digitart-wordmark.svg",
    colors: [
      { label: "Azul digital", hex: "#1741CA" },
      { label: "Amarelo", hex: "#DEB019" },
      { label: "Azul profundo", hex: "#0B1E5D" },
      { label: "Azul claro", hex: "#E8EDFC" },
    ],
  },
]

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

const desktopPalettes: ProjectStyleGuide["palettes"] = [
  { label: "Primary", colors: [{ label: "Black", hex: "#000000" }] },
  {
    label: "Neutral",
    colors: [
      { label: "Neutral-700", hex: "#2F3037" },
      { label: "Neutral-600", hex: "#545662" },
      { label: "Neutral-300", hex: "#CFD2DF" },
    ],
  },
]

const desktopTypography: ProjectStyleGuide["typography"] = [
  { label: "Headline", styles: ["Barlow Bold", "Barlow Regular"] },
  { label: "Body", styles: ["Inter Bold", "Inter Medium", "Inter Regular"] },
]

const uiBoostTypography: ProjectStyleGuide["typography"] = [
  { label: "Headline", styles: ["Poppins Bold", "Poppins Regular"] },
  { label: "Body", styles: ["Inter Bold", "Inter Medium", "Inter Regular"] },
]

const uiBoostGrid: ProjectStyleGuide["grid"] = [
  { label: "Colunas", value: "4" },
  { label: "Margem", value: "20px" },
  { label: "Gutter", value: "16px" },
]

function uiBoostPalettes(
  primary: ProjectStyleGuide["palettes"][number]["colors"],
  neutralLabels: [string, string, string],
): ProjectStyleGuide["palettes"] {
  return [
    { label: "Primary", colors: primary },
    {
      label: "Secondary",
      colors: [
        { label: "Dark", hex: "#6818D1" },
        { label: "Default", hex: "#721AE6" },
        { label: "Light", hex: "#D3B8F7" },
      ],
    },
    {
      label: "Neutral",
      colors: [
        { label: neutralLabels[0], hex: "#313131" },
        { label: neutralLabels[1], hex: "#626262" },
        { label: neutralLabels[2], hex: "#939393" },
      ],
    },
    {
      label: "Negative",
      colors: [
        { label: "Dark", hex: "#DE3961" },
        { label: "Default", hex: "#F64F77" },
        { label: "Light", hex: "#FC6F91" },
      ],
    },
    {
      label: "Warning",
      colors: [
        { label: "Dark", hex: "#F49F1F" },
        { label: "Default", hex: "#F8AE3F" },
        { label: "Default", hex: "#FFD569" },
      ],
    },
    {
      label: "Informational",
      colors: [
        { label: "Dark", hex: "#5A67DF" },
        { label: "Dark", hex: "#7683F6" },
        { label: "Light", hex: "#9CA5FB" },
      ],
    },
    {
      label: "Successful",
      colors: [
        { label: "Dark", hex: "#26CECE" },
        { label: "Default", hex: "#44E4E4" },
        { label: "Light", hex: "#4FF6F6" },
      ],
    },
  ]
}

export const projects: Project[] = [
  {
    slug: "adote-um-pet",
    tone: "parchment",
    title: "Adote um Pet",
    type: "Produto digital",
    year: 2026,
    coverImage: "/media/hero/adote-um-pet.png",
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
        styleGuide: {
          palettes: desktopPalettes,
          grid: [
            { label: "Colunas", value: "12" },
            { label: "Margem", value: "32px" },
            { label: "Gutter", value: "72px" },
          ],
          typography: desktopTypography,
        },
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
    caseStudy: {
      eyebrow: "Case 01 · produto digital",
      title: "Adote um Pet.",
      subtitle: "Experiência digital para adoção responsável.",
      summary: "Uma plataforma mais humana para aproximar pessoas, pets e histórias que merecem continuar.",
      year: 2026,
      discipline: "UX/UI design",
      introduction: {
        title: "Quando a escolha certa encontra uma experiência simples.",
        paragraphs: [
          "Adotar um pet é uma decisão afetiva. A experiência digital precisava tornar esse momento mais claro, acolhedor e seguro.",
          "O projeto organizou descoberta, compatibilidade e contato em uma jornada contínua, sem transformar a adoção em uma burocracia.",
        ],
      },
      media: {
        hero: { src: "/media/cases/adote-um-pet/hero.jpg", alt: "Dois cães correndo em um caminho ao ar livre" },
        productPreview: { src: "/media/cases/adote-um-pet/product-preview.png", alt: "Tela do produto Adote um Pet em um celular" },
        campaign: { src: "/media/cases/adote-um-pet/campaign.jpg", alt: "Gato sendo acolhido por uma pessoa" },
        solution: { src: "/media/cases/adote-um-pet/solution.jpg", alt: "Cão em um ambiente doméstico" },
      },
      solution: {
        eyebrow: "Solução",
        title: "Adoção não deveria parecer um processo frio.",
        description: "A interface usa informação progressiva, linguagem próxima e elementos visuais otimistas para ajudar cada pessoa a avançar com confiança.",
        principles: ["Busca orientada por afinidade", "Perfis completos e objetivos", "Contato claro com os abrigos"],
        affinityTitle: "Menos fricção. Mais afinidade.",
        affinityDescription: "Filtros, histórias e informações essenciais trabalham juntos para que a escolha seja mais consciente e natural.",
      },
      styleGuide: {
        title: "Uma linguagem otimista e confiável.",
        description: "A direção visual combina contraste, cor e tipografia para tornar a jornada leve sem reduzir a seriedade da decisão.",
        typeface: "Poppins",
        colors: [
          { label: "Azul", hex: "#284CFF" }, { label: "Terracota", hex: "#ED5F2F" }, { label: "Blush", hex: "#FCF5F2" }, { label: "Pêssego", hex: "#FD997B" }, { label: "Tinta", hex: "#0A0D14" },
        ],
      },
      challenges: {
        title: "Projetar confiança sem perder a leveza.",
        description: "Cada decisão de interface precisava equilibrar informação, afeto e autonomia para aproximar pessoas e animais com responsabilidade.",
        items: [
          { title: "Clareza", body: "Organizar informações essenciais sem sobrecarregar." }, { title: "Compatibilidade", body: "Ajudar a pessoa a reconhecer afinidade real." }, { title: "Confiança", body: "Trazer transparência antes do primeiro contato." }, { title: "Acessibilidade", body: "Manter leitura e interação simples em todos os dispositivos." }, { title: "Escala", body: "Criar uma base visual pronta para novos abrigos e conteúdos." },
        ],
      },
      results: {
        title: "Uma base de produto pronta para crescer.",
        description: "O projeto organizou pesquisa, navegação e contato em um sistema coerente de interface.",
        items: [
          { title: "Jornada organizada", body: "Da busca ao contato, as decisões foram conectadas em uma experiência contínua." }, { title: "Sistema reutilizável", body: "Padrões de interface prontos para novas páginas, conteúdo e evolução do produto." }, { title: "Direção tangível", body: "Fluxos e linguagem visual documentados para transformar estratégia em telas." },
        ],
      },
      liveExperience: "adotapet-home",
    },
  },
  {
    slug: "casa-nova",
    tone: "warm",
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
        image: { src: "/media/projects/img-grid-12-col.png", alt: "Grid Desktop" },
        styleGuide: {
          palettes: desktopPalettes,
          grid: [
            { label: "Colunas", value: "12" },
            { label: "Margem", value: "72px" },
            { label: "Gutter", value: "32px" },
          ],
          typography: desktopTypography,
        },
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
    tone: "saffron",
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
          "A cor Primary: usada nas interações, botão de CTA, a cor Secondary: usada em assets visuais e a cor Neutral: usada nos títulos em fundos claros e escuros.",
          "Por padrão o grid usado foi o de 8px (podendo ter uma variação de 4px) com margens laterais de 20px, grade de 4 colunas, gutter de 16px.",
          "O espaço seguro deixado para a barra de status bar é de 44px e da home navigator é de 34px.",
          "Foi usada as fontes Poppins para Headline (títulos e interações) e a fonte Inter para o body (corpo, tags, hats e outros textos menores).",
        ],
        image: { src: "/media/projects/img-grid.png", alt: "Grid" },
        styleGuide: {
          palettes: uiBoostPalettes(
            [
              { label: "Dark", hex: "#EE56BB" },
              { label: "Default", hex: "#F974CC" },
              { label: "Light", hex: "#FF9FDE" },
            ],
            ["700", "500", "100"],
          ),
          grid: uiBoostGrid,
          typography: uiBoostTypography,
        },
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
    tone: "graphite",
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
          "A cor Primary: usada nas interações, botão de CTA, a cor Secondary: usada em assets visuais e a cor Neutral: usada nos títulos em fundos claros e escuros.",
          "Por padrão o grid usado foi o de 8px (podendo ter uma variação de 4px) com margens laterais de 20px, grade de 4 colunas, gutter de 16px.",
          "O espaço seguro deixado para a barra de status bar é de 44px e da home navigator é de 34px.",
          "Foi usada as fontes Poppins para Headline (títulos e interações) e a fonte Inter para o body (corpo, tags, hats e outros textos menores).",
        ],
        image: { src: "/media/projects/img-grid.png", alt: "Grid" },
        styleGuide: {
          palettes: uiBoostPalettes(
            [
              { label: "Dark", hex: "#E7564D" },
              { label: "Default", hex: "#FE5F55" },
              { label: "Light", hex: "#FFCDCA" },
            ],
            ["Neutral-700", "Neutral-500", "Neutral-100"],
          ),
          grid: uiBoostGrid,
          typography: uiBoostTypography,
        },
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

export function getProjectIntroductionBySlug(slug: string) {
  return projectIntroductions.find((project) => project.slug === slug)
}
