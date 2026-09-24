# Design — Starter reutilizável

Este documento é a fonte das regras visuais permanentes do starter. As decisões específicas de marca, conteúdo, páginas e integrações pertencem ao `PROJECT-SPEC.md` de cada novo projeto.

## 1. Princípios

- Priorizar clareza, hierarquia, ritmo e legibilidade.
- Manter a base neutra até que o projeto defina uma identidade.
- Usar componentes apenas quando houver uma responsabilidade reutilizável.
- Evitar aparência de template: excesso de cards, badges, sombras, efeitos e elementos decorativos.
- Não criar gradientes, imagens, logos ou afirmações de cliente sem conteúdo aprovado.
- Projetar primeiro para telas pequenas; ampliar a composição de forma intencional no desktop.

## 2. Fonte de verdade

Há dois níveis de decisão:

1. `DESIGN.md` define regras estáveis de qualidade, tokens, responsividade e acessibilidade.
2. `PROJECT-SPEC.md` registra as decisões que mudam em cada cliente: identidade, fonte, conteúdo, rotas, conversão, integrações, SEO e aceite.

Quando os documentos entrarem em conflito, atualize conscientemente o `PROJECT-SPEC.md` e documente a exceção. Não altere componentes de forma isolada para contornar o sistema.

## 3. Tokens semânticos

Todos os valores visuais reutilizáveis vivem em `app/globals.css`. Componentes consomem papéis semânticos, nunca valores de marca espalhados.

### Cores

| Papel | Token principal |
| --- | --- |
| Fundo da página | `--background` |
| Texto principal | `--foreground` |
| Superfície agrupada | `--card` |
| Superfície discreta | `--muted` |
| Ação principal | `--primary` |
| Ação secundária | `--secondary` |
| Erro/destrutivo | `--destructive` |
| Divisores e contornos | `--border` |
| Campos | `--input` |
| Foco | `--ring` |

Cada superfície de ação possui um token `*-foreground` compatível. Ao trocar a paleta, valide contraste WCAG AA em texto, controles, hover, foco e estado desabilitado.

### Tipografia

- `--font-sans` é a única família usada pelos componentes.
- Plus Jakarta Sans é carregada em `app/layout.tsx` por `next/font/google` e vinculada por `--font-plus-jakarta`.
- Para trocar a fonte, registre a decisão no `PROJECT-SPEC.md`, substitua o import do `next/font` e mantenha o contrato de `--font-sans`.
- A escala usa `display`, `heading`, `title`, `body` e `small`.
- Títulos usam tracking negativo discreto; texto corrido prioriza entrelinha e largura de leitura.
- Texto auxiliar não deve substituir labels nem carregar informação essencial sozinho.

### Espaçamento e layout

- A escala primitiva usa `--space-*` e é exposta ao Tailwind por aliases semânticos.
- `--container-max` limita a largura da página.
- `--container-gutter` controla margens laterais responsivas.
- `--content-readable` limita linhas de texto.
- `--space-section` e `--space-section-compact` definem o ritmo vertical.
- Controles usam `--control-height` e tokens próprios de padding.

Não introduza margens, gaps ou paddings arbitrários repetidos em componentes. Se um novo valor tiver uso sistêmico, nomeie seu papel antes de adicioná-lo.

### Bordas, raios e sombras

- `--border-width` e `--border` controlam contornos.
- `--radius-control` e `--radius-card` expressam os dois papéis principais de raio.
- `--shadow-card` e `--shadow-elevated` são discretas e não substituem hierarquia de layout.
- Foco usa `--focus-width`, `--focus-offset` e `--ring`.

## 4. Componentes

### Container e Section

`Container` centraliza largura máxima e gutter. `Section` fornece espaçamento vertical e um elemento semântico configurável. Evite wrappers extras quando nenhum dos dois contratos for necessário.

### Header e Footer

- Usar landmarks semânticos e navegação nomeada.
- Preservar a capitalização escrita dos itens do menu.
- Manter alvos confortáveis para toque e foco visível.
- Adicionar menus móveis complexos somente quando a quantidade de destinos justificar.

### Button

- Variantes: `default`, `secondary`, `outline`, `ghost` e `link`.
- Manter uma ação principal por área visual.
- Estados obrigatórios: padrão, hover, active, focus-visible e disabled.
- Usar `asChild` para links com aparência de botão; não aninhar `<a>` em `<button>`.

### Card

Usar apenas para conteúdo que funcione como unidade independente. Texto comum, seções e grids não devem virar cards por padrão.

### CTA

Composição curta de título, descrição e até duas ações. O componente não define hero, mídia, fundo decorativo nem estratégia de conversão.

### ContactForm

- Labels permanecem visíveis.
- `required`, `type`, `autocomplete` e descrições devem refletir o propósito dos campos.
- Placeholder não substitui label.
- O starter intercepta o submit e não envia nem armazena dados.
- Backend, mensagem de sucesso, loading e tratamento de erro só entram quando uma integração real estiver definida no `PROJECT-SPEC.md`.

## 5. Responsividade

- Começar pela menor largura suportada.
- Evitar overflow horizontal em conteúdo, navegação e formulários.
- Usar grids apenas quando melhorarem a leitura; uma coluna continua sendo a base.
- Desktop pode ampliar hierarquia e composição, mas não deve depender de hover para revelar conteúdo essencial.

## 6. Acessibilidade

- Uma página deve ter um único `h1` e hierarquia de títulos lógica.
- Usar `header`, `nav`, `main`, `section`, `form` e `footer` conforme a função real.
- Manter o skip link para `#main-content`.
- Toda interação deve funcionar com teclado.
- Estado não pode depender apenas de cor.
- Respeitar `prefers-reduced-motion`.
- Revisar contraste, foco, labels, nomes acessíveis e mensagens de validação antes de publicar.

## 7. Movimento

Transições devem dar feedback e nunca atrasar leitura. Use `--motion-fast`, `--motion-standard` e `--ease-standard`. Não adicione movimento contínuo ou decorativo sem uma finalidade registrada.

## 8. Checklist visual

- [ ] O `PROJECT-SPEC.md` foi preenchido antes do layout do cliente.
- [ ] Cores, fonte, espaçamento, raios e sombras vêm de tokens.
- [ ] A hierarquia funciona em mobile e desktop.
- [ ] Cards aparecem apenas onde agrupam conteúdo independente.
- [ ] Há foco visível e navegação completa por teclado.
- [ ] Contraste e labels foram revisados.
- [ ] Não há conteúdo, imagem ou efeito sem propósito aprovado.
