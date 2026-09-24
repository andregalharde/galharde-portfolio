# Galharde — aplicação da marca e direção de KV

## Templates compartilhados

- `components/layout/header.tsx`: `public/brand/logo-galharde.svg`, com proporção 135:38, no topo; após rolar mais de 16 px, troca para `public/brand/logo-minimal.svg`, com proporção 26:38.
- `components/layout/footer.tsx`: `public/brand/logo-minimal-white.svg`, com proporção 26:38, diretamente sobre o fundo escuro e com o ponto laranja original. O arquivo foi copiado da exportação fornecida `logo-minimal-whte.svg`, que permanece preservada.
- `components/layout/site-shell.tsx`: aplica os dois templates às páginas do portfólio. Novas páginas devem usar esse shell, sem repetir header e footer dentro de cada página.
- A experiência independente `/adoteumpet` continua usando sua própria identidade e seu shell.
- A introdução animada usa os paths exatos de `logo-galharde.svg`, extraídos em `lib/portfolio-intro-vectors.ts`. Ao trocar a marca, atualizar essa extração e conferir o alinhamento da animação.
- O favicon usa `public/brand/favicon-light.ico` no tema claro e `public/brand/favicon-dark.ico` no tema escuro, selecionados por `prefers-color-scheme` no layout global. Os arquivos originais e as exportações anteriores foram preservados.

## Leitura do logo

O símbolo combina um corpo circular aberto, uma curva inferior separada e um ponto laranja no quadrante superior direito. O nome em minúsculas tem curvas suaves e hastes simples; o símbolo concentra o caráter mais expressivo da assinatura.

Os arquivos fornecidos usam grafite `#1C1917` e laranja `#E73D16`. O marfim já presente no site oferece um fundo coerente. O espaço entre as partes do símbolo é tão importante quanto suas áreas preenchidas: permite trabalhar enquadramentos sem fechar toda a composição.

## Direção recomendada: círculo aberto + ponto de foco

Ampliar o arco do símbolo e recortá-lo nas bordas da composição. Usar a abertura para orientar a leitura e um único ponto laranja como foco. A marca completa deve continuar pequena e íntegra em sua área de assinatura.

- **Banners e capas:** arco grande em uma lateral, texto no espaço livre e ponto laranja próximo do assunto principal.
- **Fotografia:** abertura circular como enquadramento, preservando a visibilidade do rosto e evitando cortes em olhos ou boca.
- **Divisores e encerramentos:** aproveitar a curva inferior como base gráfica para a composição.
- **Movimento:** o ponto surge, percorre um trecho curto do arco e se acomoda na posição da assinatura. Respeitar a preferência por movimento reduzido.

Esse caminho é o mais reconhecível porque deriva diretamente do desenho do símbolo. Pode substituir os contornos orgânicos decorativos do footer em uma próxima etapa; o novo KV ainda é uma proposta e não foi aplicado ao site.

## Outras duas possibilidades

1. **Ritmo modular:** repetir a curva inferior em uma malha espaçada para fundos e materiais de apoio. É versátil, mas a repetição precisa de moderação para não competir com os projetos.
2. **Ponto editorial:** usar principalmente o círculo laranja como marcador de títulos, números e transições. É discreto, porém menos exclusivo quando aparece sem os arcos do símbolo.

## Critérios de composição propostos

- Usar um arco dominante e um ponto de foco por peça como ponto de partida.
- Priorizar grafite e marfim; reservar o laranja aos acentos.
- Derivar os recortes dos paths originais, sem substituir o símbolo por círculos genéricos.
- Ampliar e recortar apenas os grafismos decorativos; preservar a proporção e a integridade do logo de assinatura.
- Manter textos fora das áreas de maior peso do grafismo e usar a malha de 8 px já adotada no projeto.
- Avaliar a direção primeiro em uma capa, um banner e um encerramento antes de expandi-la para todo o site.
