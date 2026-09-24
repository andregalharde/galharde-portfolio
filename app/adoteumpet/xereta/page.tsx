import type { Metadata } from "next"

import { AdoptapetXeretaPage } from "@/components/adoptapet-xereta-page"

export const metadata: Metadata = {
  title: "Xereta para adoção | AdotaPet",
  description: "Conheça a Xereta, uma gata persa de três meses disponível para adoção em Guarulhos.",
}

export default function XeretaPage() {
  return <AdoptapetXeretaPage />
}
