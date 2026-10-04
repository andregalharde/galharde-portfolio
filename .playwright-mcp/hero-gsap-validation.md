# Hero GSAP — validação em 02/10/2026

- Quatro imagens fornecidas, na ordem André, Benfica, castelo, Bambina.
- Fotos: sequência repetida de 10 segundos; dissolução de 600ms; zoom de 1 para 1.04.
- Arco e bolinha originais: rotação conjunta de 24 segundos, centro SVG 296.91, 280.
- Navegador desktop: 661 frames em 11 segundos, todas as fotos vistas, sem intervalo sem imagem.
- Navegador mobile 390px: capturas e inspeção dos quatro recortes circulares.
- Fotos e órbita congelam fora da tela e retomam ao retornar.
- Evento visibilitychange simulado no navegador: hidden=true pausou, hidden=false retomou. A troca real de aba no navegador de automação não confirmou esse evento.
- Botão pausa ambas as animações, Enter retoma sem reiniciar a sequência.
- Movimento reduzido: primeira foto estática, órbita parada.
- Falha simulada de imagem: mantém uma fotografia válida estática.
- Lint, TypeScript, build e git diff --check passaram.
- Novo teste real de timeline passou. Suíte completa: 44 passaram, 14 falharam.
- Antes da implementação: 43 passaram, as mesmas 14 falharam. Nenhuma falha nova.

## Falhas preexistentes da suíte

1. publishes the home hero and preserves generated project routes
2. starts the homepage with the hero and no positioning strip
3. publishes the Figma about page with its editorial sections
4. uses the header CTA arrow states on the about curriculum button
5. publishes the editorial home with independent photographs and section anchors
6. links all three featured project cards to their existing case pages
7. preserves the six client logos after the featured projects
8. publishes an accessible responsive Galharde header
9. preserves case chrome and uses the light footer only on Home
10. uses the portfolio pill CTA with a separate arrow circle on Home and case actions
11. renders the light Home footer with a text back-to-top link above the organic artwork
12. links the footer Instagram and gives the borderless back-to-top control the legal text color
13. compacts the scrolled header around the full logo, menu, and CTA
14. uses the supplied SVG assets for the CTA arrow states
