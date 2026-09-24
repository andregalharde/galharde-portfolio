import assert from "node:assert/strict"
import { test } from "node:test"

test("requires identity fields and validates email", async () => {
  const { validateAdoptionInterest } = await import("../lib/adoption-interest.ts")

  assert.deepEqual(
    validateAdoptionInterest({ name: "", email: "bad", phone: "", message: "texto" }),
    {
      name: "Informe seu nome.",
      email: "Informe um e-mail válido.",
      phone: "Informe seu telefone.",
    },
  )
})

test("accepts complete adoption interest data", async () => {
  const { validateAdoptionInterest } = await import("../lib/adoption-interest.ts")

  assert.deepEqual(
    validateAdoptionInterest({
      name: "Ana Souza",
      email: "ana@example.com",
      phone: "(11) 99999-9999",
      message: "Quero conhecer a Xereta.",
    }),
    {},
  )
})
