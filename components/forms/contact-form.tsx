"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { preventVisualFormSubmission } from "@/lib/visual-form"

function ContactForm() {
  return (
    <form className="grid gap-component-lg" onSubmit={preventVisualFormSubmission}>
      <div className="grid gap-component-sm sm:grid-cols-2">
        <div className="grid gap-component-xs">
          <Label htmlFor="contact-name">Nome <span aria-hidden="true">*</span></Label>
          <Input id="contact-name" name="name" autoComplete="name" required />
        </div>
        <div className="grid gap-component-xs">
          <Label htmlFor="contact-email">E-mail <span aria-hidden="true">*</span></Label>
          <Input id="contact-email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>
      <div className="grid gap-component-xs">
        <Label htmlFor="contact-subject">Assunto <span aria-hidden="true">*</span></Label>
        <Input id="contact-subject" name="subject" autoComplete="off" required />
      </div>
      <div className="grid gap-component-xs">
        <Label htmlFor="contact-message">Mensagem <span aria-hidden="true">*</span></Label>
        <Textarea
          id="contact-message"
          name="message"
          aria-describedby="contact-message-help"
          required
        />
        <p id="contact-message-help" className="text-small text-muted-foreground">
          Inclua apenas o necessário para demonstrar o campo.
        </p>
      </div>
      <div className="flex flex-col items-start gap-component-sm">
        <Button type="submit">Enviar demonstração</Button>
        <p className="text-small text-muted-foreground">
          Demonstração visual: nenhum dado é enviado ou armazenado.
        </p>
      </div>
    </form>
  )
}

export { ContactForm }
