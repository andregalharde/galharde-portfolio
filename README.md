# Starter reutilizável para sites

Base neutra em Next.js para iniciar portfólios, landing pages e sites institucionais sem repetir configuração técnica e sem herdar uma identidade de cliente.

O starter entrega arquitetura, tokens semânticos, componentes acessíveis, catálogo visual, metadata e documentação. Ele não entrega uma landing page pronta, conteúdo de cliente, imagens, backend ou integrações.

## Stack

- Next.js 16 com App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui com componentes locais
- Plus Jakarta Sans por `next/font/google`

Requer Node.js 20.9 ou superior. O desenvolvimento e a validação inicial foram feitos com Node.js 22.22.3 e npm 10.9.8.

## Começar

```powershell
nvm use 22.22.3
npm install
npm run dev
```

Abra `http://localhost:3000` para a Home e `http://localhost:3000/preview` para o catálogo de tokens, componentes, variantes e estados.

## Comandos

```powershell
npm run dev     # servidor de desenvolvimento
npm test        # contratos HTTP e de tokens com o runner nativo do Node
npm run lint    # ESLint
npm run build   # build de produção e verificação TypeScript
npm run start   # serve o build de produção
```

O primeiro build pode precisar acessar o Google Fonts para que `next/font` baixe e auto-hospede a Plus Jakarta Sans.

## Estrutura

```text
app/
  globals.css               # tokens e estilos globais
  layout.tsx                # fonte, metadata e shell compartilhado
  page.tsx                  # Home curta do starter
  preview/page.tsx          # catálogo de componentes
components/
  forms/contact-form.tsx    # formulário apenas visual
  layout/                   # Container, Header e Footer
  sections/                 # Section e CTA
  ui/                       # primitivas locais do shadcn/ui
lib/
  site-config.ts              # valores centrais de metadata e publicação
  utils.ts                  # composição segura de classes
public/
  favicon.svg               # favicon-base neutro
tests/
  starter.test.mjs          # contrato HTTP das rotas
  token-contract.test.mjs   # contrato dos tokens essenciais
DESIGN.md                   # regras visuais estáveis
PROJECT-SPEC.md             # fonte de verdade do projeto futuro
AGENTS.md / CLAUDE.md       # orientações geradas pelo Next.js para agentes
```

## Componentes disponíveis

- `Header` e `Footer`: landmarks e navegação compartilhada.
- `Container`: largura máxima e gutters responsivos.
- `Section`: ritmo vertical e elemento semântico configurável.
- `Button`: variantes shadcn `default`, `secondary`, `outline`, `ghost` e `link`.
- `Card`: primitivas para conteúdo realmente independente.
- `CTA`: título, descrição e até duas ações, sem definir um hero.
- `ContactForm`: campos acessíveis e validação HTML nativa, sem envio de dados.

Use `/preview` como referência durante a personalização. Não transforme a rota em conteúdo público do cliente sem uma decisão explícita.

## Como personalizar para um projeto

1. Preencha completamente `PROJECT-SPEC.md`.
2. Leia `DESIGN.md` antes de alterar layout ou componentes.
3. Substitua os tokens em `app/globals.css`; não espalhe cores, fontes, raios ou sombras pelos componentes.
4. Atualize nome, descrição, URL e theme color em `lib/site-config.ts`; revise Open Graph e favicon em `app/layout.tsx` e `public/`.
5. Troque a fonte somente por `next/font`, mantendo `--font-sans` como contrato dos componentes.
6. Substitua a Home e crie apenas as rotas aprovadas na especificação.
7. Conecte o `ContactForm` somente quando backend, privacidade, mensagens e estados estiverem definidos.
8. Remova `/preview` do site publicado se ela não fizer parte do escopo.

O starter começa com `noindex, nofollow` para evitar a indexação acidental dos valores genéricos. Mude essa diretiva somente depois de preencher o `PROJECT-SPEC.md`, configurar o domínio e revisar metadata e conteúdo. A rota `/preview` deve permanecer com `noindex` enquanto existir.

### Trocar Plus Jakarta Sans por Geist

Em `app/layout.tsx`, troque o import e a configuração do `next/font`, mantendo uma variável para a fonte carregada. Em `app/globals.css`, altere apenas a origem de `--font-sans`. Registre família, pesos, origem e licença no `PROJECT-SPEC.md`.

## Duplicar para um novo cliente

Depois do primeiro commit, mantenha este diretório como repositório-base. Para cada projeto:

```powershell
git clone <endereco-do-starter> nome-do-projeto
cd nome-do-projeto
git remote remove origin
git remote add origin <novo-repositorio>
npm install
```

Também é possível publicar o repositório como GitHub Template e usar **Use this template**. Em ambos os casos, preencha o `PROJECT-SPEC.md` antes de começar o layout e preserve o `DESIGN.md` como referência estável.

Não copie `node_modules`, `.next`, credenciais ou arquivos `.env` entre projetos.

## Verificação antes de entregar

```powershell
npm test
npm run lint
npm run build
```

Revise também `/` e `/preview` em largura mobile e desktop, navegue somente por teclado e teste a validação obrigatória do formulário.

## Primeiro commit local

```powershell
git status --short
git add .
git commit -m "feat: create reusable Next.js starter"
```

Caso o Git ainda não esteja configurado na máquina, defina seu nome e e-mail antes do commit usando a configuração local ou global de sua preferência.
