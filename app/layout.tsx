import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import type { ReactNode } from "react"

import { SiteShell } from "@/components/layout/site-shell"
import { siteConfig } from "@/lib/site-config"
import { portfolioIntroBootstrap } from "@/lib/portfolio-intro"

import "./globals.css"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://galharde-portfolio.vercel.app"),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: "/brand/share-icon.png", width: 512, height: 512, alt: "Símbolo de André Galharde" }],
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/brand/share-icon.png"],
  },
  icons: {
    icon: [
      { url: "/brand/favicon-light.ico", media: "(prefers-color-scheme: light)" },
      { url: "/brand/favicon-dark.ico", media: "(prefers-color-scheme: dark)" },
    ],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteConfig.themeColor,
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className={plusJakartaSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: portfolioIntroBootstrap }} />
      </head>
      <body id="top" className="flex min-h-svh flex-col">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
