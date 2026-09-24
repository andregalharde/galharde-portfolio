import type { Metadata } from "next"

import { AdoptapetProductPage } from "@/components/adoptapet-product-page"

export const metadata: Metadata = {
  title: "AdotaPet",
  description: "Encontre um pet para adotar e conheça uma experiência digital pensada para aproximar pessoas e animais.",
}

export default function AdotaPetPage() {
  return <AdoptapetProductPage />
}
