# Home editorial — 23/09/2026

Implementada sobre a base atual, com `public/ajustes.png` como direção visual.

## Escopo e conteúdo

- Hero com o texto solicitado e três arquivos existentes: retrato, castelo e estádio.
- Adote um Pet, Casa Nova e UI Boost APP usam `lib/projects.ts` e `ProjectCard`.
- Os seis logos existentes permanecem após os projetos.
- `AboutTrajectory` extrai o conteúdo de `/sobre` para uso compartilhado, sem alterar o histórico.
- Contato usa o e-mail e as redes de `siteConfig`. Footer claro somente na Home; demais páginas mantêm o footer original.
- Reutilizados `Container`, `Button`, tokens de cor/tipografia, imagens e grafismo do footer. Storybook e GSAP não estavam configurados neste checkout.
- O slider saiu da renderização da Home. Seus arquivos, dados e testes unitários foram preservados.

## Movimento

As animações de Hero e de página estão adiadas. `data-hero-reveal`, `data-hero-image` e `data-hero-image-inner` separam texto, posicionamento e camadas de imagem para a próxima etapa.

O indicador decorativo usa eventos passivos, requestAnimationFrame e ResizeObserver. Fica oculto na Hero, acompanha o scroll e alinha-se aos títulos de Projetos, Sobre e Contato. A preferência de movimento reduzido elimina a transição. A ilustração do footer fica estática na Home.

## Verificação

- `npm.cmd run lint`: aprovado.
- `npm.cmd run typecheck`: aprovado (script adicionado).
- `npm.cmd run build`: aprovado, 12 páginas geradas.
- 56 testes aprovados contra o build de produção na porta 3003.
- Para testar usando um servidor existente no PowerShell: `$env:TEST_BASE_URL='http://localhost:3003'; npm.cmd run test`.
- Browser: 320, 390, 768, 1024 e 1440px; sem overflow horizontal. Grid 1/2/3 colunas conforme breakpoint.
- Menu mobile abre e fecha ao selecionar âncoras. Voltar ao topo funciona. PDF do currículo responde 200.
- Indicador oculto no topo e alinhado aos três títulos (desvio medido: 0px em 1440px). Verificado também com reduced motion.
- Rotas verificadas: `/sobre`, os quatro cases de `lib/projects.ts`, `/projetos/digitart`, `/adoteumpet`, `/adoteumpet/xereta`; slug inexistente continua retornando 404.

Capturas finais em `.qa-artifacts/home-final-1440.png` e `.qa-artifacts/home-final-390.png`; capturas adicionais de tablet e 320px na mesma pasta.

O servidor de desenvolvimento preexistente na porta 3000 não foi encerrado. A primeira tentativa dos testes encontrou o lock desse servidor; a opção `TEST_BASE_URL` permite reutilizar um servidor sem disputar o lock.
