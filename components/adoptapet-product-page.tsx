"use client"

import type { CSSProperties, FormEvent } from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { AdoptapetIcon as Icon, AdoptapetShell } from "./adoptapet-shell"
import styles from "./adoptapet-product-page.module.css"

const assetRoot = "/media/cases/adote-um-pet/landing"

const pets = [
  { name: "Bambina", location: "Jardim Imperial, Atibaia", gender: "Fêmea", age: "1 mês", image: `${assetRoot}/pet-bambina.png`, position: "50% 36%" },
  { name: "Lolo", location: "Jardim Emuarama, Embu das Artes", gender: "Fêmea", age: "1 mês", image: `${assetRoot}/pet-lolo.png`, position: "50% 50%" },
  { name: "Charlote", location: "São Miguel, São Paulo", gender: "Macho", age: "3 meses", image: `${assetRoot}/pet-charlote.png`, position: "50% 38%" },
  { name: "Linda", location: "Jardim Paulista, Guarulhos", gender: "Macho", age: "3 meses", image: `${assetRoot}/pet-linda.png`, position: "50% 35%" },
  { name: "Teresa", location: "Jardim Celeste, Pernambuco", gender: "Fêmea", age: "1 mês", image: `${assetRoot}/pet-teresa.png`, position: "50% 39%" },
  { name: "Rainha", location: "Cachoeirinha, São Paulo", gender: "Fêmea", age: "4 meses", image: `${assetRoot}/pet-rainha.png`, position: "50% 45%" },
  { name: "Dudu", location: "São Miguel, São Paulo", gender: "Macho", age: "3 meses", image: `${assetRoot}/pet-dudu.png`, position: "50% 50%" },
]

const processSteps = [
  { icon: "icon-process-register.svg", title: "Encontre o pet ideal para você", body: "Tudo começa escolhendo os animalzinhos disponíveis pra você." },
  { icon: "icon-process-find.svg", title: "Crie o seu cadastro e solicite seu requerimento", body: "Com um cadastro sem burocracia, você solicita o desejo para a ONG." },
  { icon: "icon-process-approve.svg", title: "Aguarde aprovação para ir buscar seu Pet", body: "Após solicitar o desejo aguarde 24 horas e, sendo aprovado, já pode buscar seu Pet." },
]

const testimonials = [
  { name: "Lucas Ferreira", quote: "Estou super apaixonado no meu gato, ele é super carinhoso e adora comer.", avatar: "avatar-lucas-source.png" },
  { name: "Júlia Matos", quote: "Queria passar para agradecer pelo cachorrinho que eu adotei, ele é perfeito.", avatar: "avatar-julia-source.png" },
  { name: "Andre Galharde", quote: "Se eu já tivesse conhecido esse gatinho antes eu já tinha adotado ele.", avatar: "avatar-andre-source.png" },
  { name: "Fernanda", quote: "Tudo começa escolhendo os animalzinhos disponíveis pra você.", avatar: "avatar-fernanda-source.png" },
]

const faqs = [
  { question: "Como eu faço para adotar um Pet?", answer: "Qualquer dúvida entre em contato com a nossa central de ajuda" },
  { question: "Quais são os cuidados necessário?", answer: "Reserve tempo, espaço, alimentação, acompanhamento veterinário e muito carinho para a adaptação do novo pet." },
  { question: "Como eu faço para adotar um Pet?", answer: "Escolha o pet que combina com você, faça o cadastro e envie sua solicitação para a ONG responsável." },
  { question: "Posso adotar mais de um Pet?", answer: "Sim. Cada pedido é avaliado individualmente para garantir o bem-estar dos animais e da família." },
]

export function AdoptapetProductPage() {
  const [petSlide, setPetSlide] = useState(0)
  const [testimonialSlide, setTestimonialSlide] = useState(0)
  const [openFaq, setOpenFaq] = useState(0)
  const [favorites, setFavorites] = useState<string[]>([])
  const lastTestimonialSlide = Math.max(0, testimonials.length - 3)

  const petRailStyle = { "--pet-slide": petSlide } as CSSProperties
  const testimonialRailStyle = { "--testimonial-slide": testimonialSlide } as CSSProperties

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    document.querySelector("#adoptapet-pets")?.scrollIntoView({ behavior: "smooth" })
  }

  function toggleFavorite(name: string) {
    setFavorites((current) => current.includes(name) ? current.filter((pet) => pet !== name) : [...current, name])
  }

  return (
    <AdoptapetShell ariaLabel="Experiência demonstrativa AdotaPet">
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent} id="adoptapet-home">
            <div className={styles.heroCopy}>
              <p className={styles.kickerCoral}>AU AU :)</p>
              <h2>Encontre um pet<br />ideal para você</h2>
              <p>Resgate um animalzinho que esteja abandonado para te fazer companhia e contribua para a humanidade.</p>
            </div>
            <Link href="/adoteumpet/xereta" className={styles.heroPet} aria-label="Conhecer Xereta">
              <div className={styles.heroPetOutline} aria-hidden="true" />
              <Image src={`${assetRoot}/hero-cat.png`} alt="Gato laranja deitado" width={588} height={366} priority className={styles.heroCat} />
              <div className={styles.heroPetMeta}>
                <div><strong>Xereta</strong><span>Guarulhos, São Paulo</span></div>
                <span className={styles.heroFact}><Icon name="icon-gender-coral.svg" />Fêmea</span>
                <span className={styles.heroFact}><Icon name="icon-age-coral.svg" />3 meses</span>
              </div>
            </Link>
          </div>

          <form className={styles.searchBar} aria-label="Buscar pets" onSubmit={submitSearch}>
            <label><Icon name="icon-location.svg" /><span><strong>Cidade</strong><input name="city" placeholder="Busque por cidade" /></span></label>
            <label><Icon name="icon-house.svg" /><span><strong>Bairro</strong><input name="district" placeholder="Busque por bairro" /></span></label>
            <label><Icon name="icon-pet-type.svg" /><span><strong>Tipo de pet</strong><select name="petType" defaultValue=""><option value="" disabled>Escolha seu pet</option><option>Cachorro</option><option>Gato</option></select></span></label>
            <label><Icon name="icon-breed.svg" /><span><strong>Raça</strong><input name="breed" placeholder="Busque por raça" /></span></label>
            <button type="submit"><Icon name="icon-search.svg" />Buscar pet</button>
          </form>
        </div>
      </div>

      <section className={styles.petsSection} id="adoptapet-pets" aria-labelledby="adoptapet-pets-title" aria-roledescription="carousel">
        <div className={styles.petsInner}>
          <div className={styles.centeredHeading}><p className={styles.kickerPeach}>PETS PRA VOCÊ</p><h2 id="adoptapet-pets-title">Descubra o pet que faz sentido para você</h2><p>Aproveite as oportunidades abaixo e encontre o seu Pet ideal.</p></div>
          <div className={styles.petViewport}>
            <div className={styles.petRail} style={petRailStyle} aria-live="polite">
              {pets.map((pet) => {
                const favorite = favorites.includes(pet.name)
                return <article className={styles.petCard} key={pet.name}>
                  <div className={styles.petImage}><Image src={pet.image} alt={pet.name} fill sizes="(min-width: 900px) 336px, 78vw" style={{ objectPosition: pet.position }} /></div>
                  <div className={styles.petCardHeading}><div><h3>{pet.name}</h3><p>{pet.location}</p></div><button type="button" aria-label={`${favorite ? "Remover" : "Adicionar"} ${pet.name} ${favorite ? "dos" : "aos"} favoritos`} aria-pressed={favorite} onClick={() => toggleFavorite(pet.name)}><Icon name="icon-heart.svg" /></button></div>
                  <div className={styles.petFacts}><span><Icon name="icon-gender.svg" />{pet.gender}</span><span><Icon name="icon-age.svg" />{pet.age}</span></div>
                </article>
              })}
            </div>
          </div>
          <div className={styles.carouselControls}>
            <button type="button" aria-label="Ver pets anteriores" onClick={() => setPetSlide((value) => Math.max(0, value - 1))} disabled={petSlide === 0}><Icon name="icon-arrow-left-blue.svg" /></button>
            <button type="button" aria-label="Ver próximos pets" onClick={() => setPetSlide((value) => Math.min(pets.length - 1, value + 1))} disabled={petSlide === pets.length - 1}><Icon name="icon-arrow-right.svg" /></button>
          </div>
        </div>
      </section>

      <section className={styles.processSection} id="adoptapet-process" aria-labelledby="adoptapet-process-title">
        <div className={styles.processInner}>
          <div className={styles.centeredHeading}><p className={styles.kickerBlue}>NOSSO PROCESSO DE ADOÇÃO</p><h2 id="adoptapet-process-title">Entenda como é fácil adotar um pet</h2><p>Nós estamos aqui para simplificar a vinda do seu amiguinho.</p></div>
          <div className={styles.processGrid}>{processSteps.map((step) => <article key={step.title}><Icon name={step.icon} /><h3>{step.title}</h3><p>{step.body}</p></article>)}</div>
        </div>
      </section>

      <section className={styles.banner} aria-label="Convite para adoção">
        <div className={styles.bannerStage}>
          <Image className={styles.bannerCopyPeach} src={`${assetRoot}/banner-copy-peach.svg`} alt="" width={523} height={346} aria-hidden="true" />
          <div className={styles.bannerCopy}>
            <Image src={`${assetRoot}/banner-copy-blue.svg`} alt="" fill sizes="(min-width: 1440px) 558px, 39vw" aria-hidden="true" />
            <div className={styles.bannerCopyContent}><h2>Faça a sua parte e adote um animalzinho</h2><a href="#adoptapet-pets"><Icon name="icon-adopt-blue.svg" />Adote um Pet</a></div>
          </div>
          <Image className={styles.bannerDogsCoral} src={`${assetRoot}/banner-dogs-coral-fill.svg`} alt="" width={402} height={266} aria-hidden="true" />
          <Image className={styles.bannerCatOutline} src={`${assetRoot}/banner-cat-coral-outline.svg`} alt="" width={561} height={372} aria-hidden="true" />
          <Image className={styles.bannerDogsOutline} src={`${assetRoot}/banner-dogs-blue-outline.svg`} alt="" width={559} height={370} aria-hidden="true" />
          <div className={styles.bannerDogs} style={{ WebkitMaskImage: `url("${assetRoot}/banner-dogs-mask.svg")`, maskImage: `url("${assetRoot}/banner-dogs-mask.svg")` }}>
            <div className={styles.bannerDogsPhoto}><Image src={`${assetRoot}/banner-cat.png`} alt="Dois cachorros sorrindo" fill sizes="(min-width: 1440px) 492px, 34vw" /></div>
          </div>
          <div className={styles.bannerCat} style={{ WebkitMaskImage: `url("${assetRoot}/banner-cat-mask.svg")`, maskImage: `url("${assetRoot}/banner-cat-mask.svg")` }}>
            <div className={styles.bannerCatPhoto}><Image src={`${assetRoot}/banner-dogs.png`} alt="Gato brincando deitado" fill sizes="(min-width: 1440px) 531px, 37vw" /></div>
            <Image className={styles.bannerCatBlueOverlap} src={`${assetRoot}/banner-cat-blue-overlap.svg`} alt="" width={478} height={317} aria-hidden="true" />
            <Image className={styles.bannerCatCreamCutout} src={`${assetRoot}/banner-cat-cream-cutout.svg`} alt="" width={478} height={317} aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className={styles.testimonials} aria-labelledby="adoptapet-testimonials-title" aria-roledescription="carousel">
        <div className={styles.testimonialsInner}>
          <div className={styles.testimonialHeading}><div><p className={styles.kickerBlue}>FEEDBACK DE QUEM JÁ ADOTOU</p><h2 id="adoptapet-testimonials-title">O que algumas pessoas que adotaram estão falando</h2></div><div className={styles.carouselControls}><button type="button" aria-label="Depoimento anterior" onClick={() => setTestimonialSlide((value) => Math.max(0, value - 1))} disabled={testimonialSlide === 0}><Icon name="icon-testimonial-left.svg" /></button><button type="button" aria-label="Próximo depoimento" onClick={() => setTestimonialSlide((value) => Math.min(lastTestimonialSlide, value + 1))} disabled={testimonialSlide === lastTestimonialSlide}><Icon name="icon-testimonial-right.svg" /></button></div></div>
          <div className={styles.testimonialViewport}><div className={styles.testimonialRail} style={testimonialRailStyle} aria-live="polite">{testimonials.map((item) => <blockquote key={item.name}><Image src={`${assetRoot}/${item.avatar}`} alt="" width={58} height={58} /><strong>{item.name}</strong><p>{item.quote}</p></blockquote>)}</div></div>
        </div>
      </section>

      <section className={styles.faq} id="adoptapet-faq" aria-labelledby="adoptapet-faq-title">
        <div className={styles.faqInner}>
          <div><p className={styles.kickerCoral}>FAQ</p><h2 id="adoptapet-faq-title">Dúvidas Frequentes</h2><p>Qualquer dúvida entre em contato com a nossa central de ajuda <a href="mailto:contato@adotapet.com.br">contato@adotapet.com.br</a></p></div>
          <div className={styles.faqList} aria-label="Perguntas frequentes">{faqs.map((item, index) => { const open = openFaq === index; return <div className={styles.faqItem} key={`${item.question}-${index}`}><h3><button type="button" aria-expanded={open} aria-controls={`adoptapet-faq-answer-${index}`} onClick={() => setOpenFaq(open ? -1 : index)}><span>{item.question}</span><Icon name="icon-faq.svg" className={open ? styles.faqIconOpen : ""} /></button></h3><div id={`adoptapet-faq-answer-${index}`} hidden={!open}><p>{item.answer}{index === 0 ? <> <a href="mailto:contato@adotapet.com.br">contato@adotapet.com.br</a></> : null}</p></div></div> })}</div>
        </div>
      </section>

    </AdoptapetShell>
  )
}
