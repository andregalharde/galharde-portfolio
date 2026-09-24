# Adote um Pet Case Study Design

## Objetivo

Transformar `/projetos/fluentify` no case **Adote um Pet**, seguindo o nó
`514:447` do arquivo GLD Portfolio no Figma. A implementação também deve
servir de estrutura reutilizável para os próximos cases, sem copiar páginas.

## Limites

- Manter Header e Footer compartilhados pelo layout da aplicação.
- Preservar a rota existente `/projetos/fluentify`, que já é usada pelo
  primeiro banner da home.
- Usar `2026` na home e dentro do case.
- Manter os outros projetos no layout editorial existente.
- Armazenar os quatro assets de imagem recebidos do Figma em
  `public/media/cases/adote-um-pet/`; nenhuma URL temporária do Figma será
  usada no site.

## Modelo de conteúdo reutilizável

`Project` recebe um campo opcional `caseStudy`. Quando presente, ele fornece:

- identificação e introdução do case;
- caminhos e textos alternativos das imagens;
- blocos de solução, princípios, desafios e resultados;
- tipografia e paleta do guia visual;
- tokens de cor para a variação visual do template.

Assim, um próximo case só preenche um objeto de conteúdo e pode reutilizar o
mesmo componente `CaseStudyTemplate`.

## Estrutura visual

1. Hero claro: categoria, título, descrição, resumo, ano, disciplina e arte
   principal.
2. Introdução editorial e visual de produto.
3. Solução em painel azul e painel claro de afinidade.
4. Guia de estilo com tipografia e cores editáveis.
5. Desafios em painel escuro.
6. Resultados em lista editorial.

No desktop, o template respeita a composição em colunas do Figma. Em telas
menores, os pares de conteúdo passam para uma coluna, preservando a leitura e
as imagens sem recorte indevido.

## Verificação

- Teste de rota deve comprovar que `/projetos/fluentify` passa a renderizar o
  conteúdo Adote um Pet, as imagens locais e o ano 2026.
- O teste do slider confirma que o primeiro banner continua apontando para
  essa rota e usa 2026.
- Rodar `npm.cmd test`, `npm.cmd run lint` e `npm.cmd run build`.
