import Image from "next/image"

import { siteConfig } from "@/lib/site-config"
import { FooterIllustration } from "@/components/footer-illustration"

function Footer() {
  return (
    <footer id="contato" className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <div className="site-footer__logo-frame">
              <Image src="/brand/logo-galharde.svg" alt="Galharde" width={135} height={38} unoptimized className="site-footer__logo" />
            </div>


          </div>

          <div className="site-footer__closing">
            <p className="site-footer__availability">Disponível para novos projetos</p>
            <h2>Ideias fortes começam<br />com uma boa conversa.</h2>
            <a href={siteConfig.emailHref} className="site-footer__contact">
              <span>Vamos conversar</span>
              <span className="portfolio-cta__arrow" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="site-footer__legal">
            <nav className="site-footer__social" aria-label="Redes sociais">
              <ul>
                  <li>
                    <a href={siteConfig.emailHref} aria-label="Enviar e-mail">
                      <Image src="/brand/footer/envelope.svg" alt="" width={24} height={24} />
                    </a>
                  </li>
                <li>
                  <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
                    <Image src="/brand/footer/instagram.svg" alt="" width={24} height={24} />
                  </a>
                </li>
                <li>
                  <a href={siteConfig.behanceUrl} target="_blank" rel="noreferrer" aria-label="Behance">
                    Bē
                  </a>
                </li>
                <li>
                  <a href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <Image src="/brand/footer/linkedin.svg" alt="" width={24} height={24} />
                  </a>
                </li>
              </ul>
            </nav>
          <p><strong>© 2026 Galharde.</strong> Todos os Direitos Reservados.</p>
          <a href="#top" className="site-footer__back-to-top-link">
            <span>Voltar ao topo</span>
            <span className="site-footer__back-to-top-arrow" aria-hidden="true" />
          </a>
        </div>

        <div className="site-footer__artwork">
          <FooterIllustration />
        </div>
      </div>
    </footer>
  )
}

export { Footer }
