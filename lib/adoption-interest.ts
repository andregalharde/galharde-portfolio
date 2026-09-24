export type AdoptionInterestValues = {
  name: string
  email: string
  phone: string
  message: string
}

export type AdoptionInterestErrors = Partial<Record<"name" | "email" | "phone", string>>

export function validateAdoptionInterest(values: AdoptionInterestValues): AdoptionInterestErrors {
  const errors: AdoptionInterestErrors = {}

  if (!values.name.trim()) errors.name = "Informe seu nome."
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = "Informe um e-mail válido."
  if (!values.phone.trim()) errors.phone = "Informe seu telefone."

  return errors
}
