# QA — galeria circular da página Sobre

Data: 2026-09-14. Escopo: somente o slider de fotos em `/sobre`.

## Referência e evidências

- Referência: imagem fornecida pelo usuário, `C:/Users/ANDRE~1.GAL/AppData/Local/Temp/codex-clipboard-MbNABM.png`, 332 × 131 px. É uma captura reduzida, sem dimensões CSS ou densidade original informadas.
- Desktop: `.qa-artifacts/brand-refresh/about-circle-desktop.png`, recorte da seção em viewport 1440 × 1000; captura de seção 1425 × 600 px, escala CSS 1.
- Mobile: `.qa-artifacts/brand-refresh/about-circle-mobile.png`, recorte da seção em viewport 390 × 844, escala CSS 1.
- Estado visual comparado: retrato inicial, movimento reduzido para congelar a imagem. A captura mobile também mostra o foco de teclado no botão.
- A referência e as duas capturas foram abertas juntas para comparação. A comparação considera proporções relativas, não igualdade de pixels: a referência não informa seu viewport original. O círculo ocupa aproximadamente 29% da largura da composição desktop em ambas.
- Região focal: círculo branco, recorte do retrato, botão laranja no quadrante superior direito e legenda centralizada. Todos são legíveis na captura desktop; não foi necessário um recorte adicional.

## Superfícies verificadas

- Tipografia e conteúdo: textos, fonte, títulos e demais seções preservados; legenda existente centralizada abaixo da foto. Nenhuma numeração visível no controle.
- Layout: círculo de 416 px no desktop, 327 px em viewport 390 e 257 px em viewport 320. Proporção 1:1 e borda de 50%; nenhum overflow horizontal nesses tamanhos.
- Cores: fundo branco da foto, fundo marfim existente e laranja do token de ação no botão.
- Imagens: quatro arquivos originais preservados. Retrato passa a ser a primeira foto; paisagens e foto da Bambina usam o recorte circular. O retrato existente conserva pequenos detalhes de fundo do próprio arquivo, sem alterações destrutivas.
- Escopo: diferenças de posição do texto e altura total em relação à captura reduzida são esperadas porque o pedido limita a alteração ao slider.

## Interações e validação

- Clique no círculo laranja avança pelas quatro fotos e volta à primeira.
- Setas esquerda/direita do teclado navegam nos dois sentidos; botão tem nome acessível e foco visível.
- Preferência por movimento reduzido mantém o autoplay desativado; lógica existente de pausa por hover/foco preservada.
- Sem erros de JavaScript observados na sessão de verificação.
- ESLint dos arquivos alterados: aprovado. Build de produção e TypeScript: aprovados.
- Expectativas da suíte existente foram atualizadas; a suíte completa não foi reexecutada nesta alteração.

## Resultado

Sem problemas P0/P1/P2 no escopo solicitado. O recorte acompanha a referência e o controle funciona. Não se afirma equivalência pixel a pixel com o Figma a partir da miniatura fornecida.

final result: passed
