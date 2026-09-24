import Image from "next/image"

const clientLogos = [
  { name: "Itaú", src: "/brand/clients/itau.svg", width: 62, height: 62 },
  { name: "Eucatex", src: "/brand/clients/eucatex.png", width: 174, height: 39, href: "https://www.eucatex.com.br/" },
  { name: "Natura", src: "/brand/clients/natura.png", width: 158, height: 36 },
  { name: "iFood", src: "/brand/clients/ifood.svg", width: 104, height: 55 },
  { name: "Nubank", src: "/brand/clients/nubank.svg", width: 124, height: 51 },
  { name: "Petrobras", src: "/brand/clients/petrobras.svg", width: 164, height: 32 },
] as const

export function ClientLogos() {
  return (
    <section className="brand-logos" aria-label="Logos">
      <ul className="brand-logos__grid">
        {clientLogos.map((logo) => (
          <li key={logo.name} className="brand-logos__item">
            {"href" in logo ? (
              <a className="brand-logos__link" href={logo.href} target="_blank" rel="noopener noreferrer">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="brand-logos__image"
                />
              </a>
            ) : (
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="brand-logos__image"
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
