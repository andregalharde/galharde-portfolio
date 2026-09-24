# Migração do portfólio GLD — Design

## Objetivo

Converter o starter `gld-portfolio` em um portfólio de André Galharde, migrando somente o conteúdo existente em `galharde.portfolio`, sem modificar a origem nem reutilizar Bootstrap ou o layout antigo.

## Arquitetura aprovada

- A home apresenta o perfil e os quatro projetos.
- `/sobre` reúne a apresentação, experiência, educação e canais de contato já publicados.
- `/projetos/[slug]` é o único template de página de case. As quatro URLs são geradas a partir de uma única fonte de dados tipada.
- `lib/projects.ts` concentra todos os campos de cada projeto: texto, imagens, categorias de mídia, metadados e links externos. Adicionar ou substituir um case futuramente exigirá alterar apenas esse arquivo e os assets correspondentes.
- O currículo continua sendo o PDF existente, servido diretamente por um link para um arquivo em `public/documentos/`; não haverá página de currículo nem texto substituto.

## Conteúdo e mídia autorizados

- Perfil: UI Designer, apresentação, experiência profissional, educação, e-mail e LinkedIn da página `paginas/designer.html`.
- Cases: Fluentify (Site, 2024), Casa Nova (Site, 2023), UI Boost (APP, 2022) e UI Boost (Landing Page, 2022), com os textos já presentes nas respectivas páginas HTML.
- Links externos existentes: Behance, LinkedIn, e-mail, currículo PDF e protótipo Figma do APP UI Boost.
- Mídia: capas e telas internas de `imgs/`, fotos de perfil e as galerias existentes de moodboard, wireframe e design. Arquivos de fornecedor, Bootstrap e ícones antigos ficam fora do destino.

## Regras globais

- Não alterar `galharde.portfolio`.
- Não inventar textos, resultados, clientes, métricas, URLs ou imagens.
- Não importar CSS, JavaScript, componentes, classes ou dependências Bootstrap da origem.
- Conservar a capitalização normal dos itens de navegação.
- Usar os padrões do App Router do Next.js 16: `params` assíncronos, `generateStaticParams`, validação com `notFound`, metadata por case e imagens locais em `public`.
- Validar todos os links e texto acentuado no HTML renderizado, além de mobile, foco visível, lint, testes e build.

## Arquivos de implementação esperados

- `lib/projects.ts`: tipos e registros de projeto; sem JSX.
- `components/project-card.tsx`: cartão de projeto usado apenas na home.
- `components/project-gallery.tsx`: galeria semântica e reutilizável de imagens.
- `app/projetos/[slug]/page.tsx`: template dinâmico único para todos os cases.
- `app/sobre/page.tsx`: perfil e currículo externo.
- `app/page.tsx`, `components/layout/header.tsx`, `components/layout/footer.tsx`, `app/layout.tsx`, `lib/site-config.ts` e `app/globals.css`: casca do portfólio, metadata e composição responsiva.

