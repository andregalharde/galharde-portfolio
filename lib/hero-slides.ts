export type HeroSlide = {
  slug: string
  title: string
  year: number
  ctaLabel: string
  image: string
  imageAlt: string
  imagePosition?: string
  campaign?: {
    eyebrow: string
    headline: string
    theme: "digitart"
  }
  href: string
}

// Conteúdo editável da hero. Cada item aponta para um case real do portfólio.
export const heroSlides: HeroSlide[] = [
  {
    slug: "adote-um-pet",
    title: "Adote um Pet",
    year: 2026,
    ctaLabel: "Acessar case",
    image: "/media/hero/adote-um-pet.png",
    imageAlt: "Banner do case Adote um Pet",
    href: "/projetos/adote-um-pet",
  },
  {
    slug: "digitart",
    title: "Digitart",
    year: 2026,
    ctaLabel: "Conhecer projeto",
    image: "/media/hero/digitart.png",
    imageAlt: "Banner da identidade visual Digitart",
    imagePosition: "60% center",
    campaign: {
      eyebrow: "Agência de sites",
      headline: "Sites que movem marcas para frente.",
      theme: "digitart",
    },
    href: "/projetos/digitart",
  },
  {
    slug: "ui-boost-app",
    title: "Entrelinha",
    year: 2024,
    ctaLabel: "Acessar case",
    image: "/media/hero/entrelinha.png",
    imageAlt: "Banner do case Entrelinha",
    href: "/projetos/ui-boost-app",
  },
]
