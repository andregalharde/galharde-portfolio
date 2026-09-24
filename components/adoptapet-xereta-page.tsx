"use client"

import type { FormEvent, MouseEvent } from "react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import type { AdoptionInterestErrors, AdoptionInterestValues } from "@/lib/adoption-interest"
import { validateAdoptionInterest } from "@/lib/adoption-interest"

import { AdoptapetIcon, AdoptapetShell } from "./adoptapet-shell"
import styles from "./adoptapet-xereta-page.module.css"

const assetRoot = "/media/cases/adote-um-pet/xereta"
const emptyInterest: AdoptionInterestValues = { name: "", email: "", phone: "", message: "" }

const attributes = [
  { label: "Persa", icon: "icon-breed.svg" },
  { label: "3 meses", icon: "icon-age.svg" },
  { label: "Caramelo", icon: "icon-color.svg" },
  { label: "Fêmea", icon: "icon-gender.svg" },
]

const gallery = [
  { src: "xereta-gallery-1.png", alt: "Xereta, gata persa caramelo, deitada", className: styles.galleryOne },
  { src: "xereta-gallery-2.png", alt: "Xereta sentada olhando para a câmera", className: styles.galleryTwo },
  { src: "xereta-gallery-3.png", alt: "Xereta brincando deitada", className: styles.galleryThree },
  { src: "xereta-gallery-4.png", alt: "Retrato lateral de Xereta", className: styles.galleryFour },
]

const relatedPets = [
  { name: "Rainha", location: "Cachoeirinha, São Paulo", gender: "Fêmea", age: "4 meses", image: "rainha.png", position: "50% 35%" },
  { name: "Perigosa", location: "Engenho Velho, Embu das Artes", gender: "Fêmea", age: "3 meses", image: "perigosa.png", position: "50% 43%" },
  { name: "Charlote", location: "São Miguel, São Paulo", gender: "Macho", age: "3 meses", image: "charlote.png", position: "50% 43%" },
]

function DetailIcon({ name, className = "" }: { name: string; className?: string }) {
  return <Image src={`${assetRoot}/${name}`} alt="" width={40} height={40} className={className} aria-hidden="true" />
}

export function AdoptapetXeretaPage() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [values, setValues] = useState<AdoptionInterestValues>(emptyInterest)
  const [errors, setErrors] = useState<AdoptionInterestErrors>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!dialogOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [dialogOpen])

  function openDialog() {
    setSubmitted(false)
    setErrors({})
    setDialogOpen(true)
    dialogRef.current?.showModal()
    window.requestAnimationFrame(() => closeButtonRef.current?.focus())
  }

  function closeDialog() {
    dialogRef.current?.close()
    setDialogOpen(false)
    triggerRef.current?.focus()
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) closeDialog()
  }

  function updateField(field: keyof AdoptionInterestValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    if (field !== "message" && errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
  }

  function submitInterest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateAdoptionInterest(values)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setValues(emptyInterest)
    setErrors({})
    setSubmitted(true)
  }

  return (
    <AdoptapetShell ariaLabel="Detalhes de Xereta no AdotaPet" navBaseHref="/adoteumpet">
      <div className={styles.detailPage} id="adoptapet-home">
        <section className={styles.detailSurface} aria-labelledby="xereta-title">
          <div className={styles.detailInner}>
            <nav className={styles.breadcrumb} aria-label="Navegação estrutural">
              <Link href="/adoteumpet">home</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">seu pet está aqui</span>
            </nav>

            <div className={styles.mainGrid}>
              <div className={styles.petInformation}>
                <h1 id="xereta-title">Xereta</h1>
                <ul className={styles.attributeGrid} aria-label="Características de Xereta">
                  {attributes.map((attribute) => (
                    <li key={attribute.label}>
                      <span className={styles.attributeIcon}><DetailIcon name={attribute.icon} /></span>
                      <span>{attribute.label}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.informationDivider} />
                <button ref={triggerRef} type="button" className={styles.adoptCta} aria-haspopup="dialog" aria-controls="xereta-adoption-dialog" onClick={openDialog}>
                  <DetailIcon name="icon-adopt.svg" />
                  Me adote
                </button>
              </div>

              <div className={styles.gallery} aria-label="Fotos de Xereta">
                {gallery.map((image) => (
                  <div className={`${styles.galleryItem} ${image.className}`} key={image.src}>
                    <Image src={`${assetRoot}/${image.src}`} alt={image.alt} fill sizes="(min-width: 900px) 350px, 50vw" />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.storyGrid}>
              <section className={styles.addressBlock} aria-labelledby="xereta-address-title">
                <div className={styles.storyHeading}>
                  <span className={styles.locationIcon}><DetailIcon name="icon-location.svg" /></span>
                  <h2 id="xereta-address-title">Vila Venditti, Guarulhos</h2>
                </div>
                <address>
                  Rua Ana Soares Barcelos, 355 - Apto 113 - Torre 2<br />
                  Vila Venditti - Guarulhos - São Paulo
                </address>
              </section>

              <section className={styles.aboutBlock} aria-labelledby="xereta-about-title">
                <h2 id="xereta-about-title">Sobre o Pet</h2>
                <p>É uma gata da raça Persa e Himalaia, ela tem apenas 3 meses de idade. Ela adora brincar em caixas de areia e é bem reservada, calma.</p>
              </section>
            </div>
          </div>
        </section>

        <section className={styles.relatedSection} id="adoptapet-pets" aria-labelledby="related-pets-title">
          <div className={styles.relatedInner}>
            <h2 id="related-pets-title">Pets Relacionados</h2>
            <div className={styles.relatedGrid}>
              {relatedPets.map((pet) => (
                <article className={styles.relatedCard} key={pet.name}>
                  <div className={styles.relatedImage}>
                    <Image src={`${assetRoot}/${pet.image}`} alt={`${pet.name}, pet relacionado`} fill sizes="(min-width: 900px) 336px, 90vw" style={{ objectPosition: pet.position }} />
                  </div>
                  <div className={styles.relatedHeading}>
                    <div>
                      <h3>{pet.name}</h3>
                      <p>{pet.location}</p>
                    </div>
                    <div className={styles.relatedActions} aria-hidden="true">
                      <DetailIcon name="icon-arrow-up-right.svg" />
                      <DetailIcon name="icon-heart.svg" />
                    </div>
                  </div>
                  <div className={styles.relatedFacts}>
                    <span><AdoptapetIcon name="icon-gender.svg" />{pet.gender}</span>
                    <span><AdoptapetIcon name="icon-age.svg" />{pet.age}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <dialog
        ref={dialogRef}
        id="xereta-adoption-dialog"
        className={styles.dialog}
        aria-labelledby="adoption-dialog-title"
        aria-describedby="adoption-dialog-description"
        aria-modal="true"
        onCancel={(event) => {
          event.preventDefault()
          closeDialog()
        }}
        onClick={handleBackdropClick}
      >
        <div className={styles.dialogLayout}>
          <div className={styles.dialogFormPanel}>
            <button ref={closeButtonRef} type="button" className={styles.dialogClose} aria-label="Fechar formulário de adoção" onClick={closeDialog}>
              <span aria-hidden="true">×</span>
            </button>
            <div className={styles.dialogBrand} aria-hidden="true"><AdoptapetIcon name="icon-logo-coral.svg" /></div>
            <h2 id="adoption-dialog-title">Quero adotar a Xereta</h2>
            <p id="adoption-dialog-description">Preencha seus dados e a equipe entrará em contato com você para conversar sobre a adoção.</p>

            {submitted ? (
              <div className={styles.successState} role="status" aria-live="polite">
                <strong>Interesse registrado!</strong>
                <p>Obrigado por querer cuidar da Xereta. A equipe entrará em contato com você.</p>
                <button type="button" onClick={() => setSubmitted(false)}>Enviar outro interesse</button>
              </div>
            ) : (
              <form className={styles.interestForm} noValidate onSubmit={submitInterest}>
                <label>
                  <span>Nome</span>
                  <input name="name" autoComplete="name" required value={values.name} onChange={(event) => updateField("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "adoption-name-error" : undefined} />
                  {errors.name ? <span className={styles.fieldError} id="adoption-name-error" role="alert">{errors.name}</span> : null}
                </label>
                <label>
                  <span>E-mail</span>
                  <input name="email" type="email" autoComplete="email" required value={values.email} onChange={(event) => updateField("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "adoption-email-error" : undefined} />
                  {errors.email ? <span className={styles.fieldError} id="adoption-email-error" role="alert">{errors.email}</span> : null}
                </label>
                <label>
                  <span>Telefone</span>
                  <input name="phone" type="tel" autoComplete="tel" required value={values.phone} onChange={(event) => updateField("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "adoption-phone-error" : undefined} />
                  {errors.phone ? <span className={styles.fieldError} id="adoption-phone-error" role="alert">{errors.phone}</span> : null}
                </label>
                <label>
                  <span>Mensagem <small>(opcional)</small></span>
                  <textarea name="message" rows={3} value={values.message} onChange={(event) => updateField("message", event.target.value)} />
                </label>
                <button type="submit" className={styles.submitInterest}>Enviar interesse</button>
              </form>
            )}
          </div>
          <div className={styles.dialogImage}>
            <Image src={`${assetRoot}/adoption-dialog.jpg`} alt="Homem acolhendo um gato caramelo" fill sizes="(min-width: 700px) 50vw, 0px" />
          </div>
        </div>
      </dialog>
    </AdoptapetShell>
  )
}
