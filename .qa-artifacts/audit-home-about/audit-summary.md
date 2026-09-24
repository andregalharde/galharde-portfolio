# Auditoria da Home e da página Sobre

Data: 2026-09-01

## Escopo

Auditoria combinada de UX, direção visual e riscos de acessibilidade nas rotas `/` e `/sobre`, em 1440 × 1000 e 390 × 844. Nenhum arquivo do produto foi alterado.

Objetivo principal observado: permitir que potenciais clientes e recrutadores entendam rapidamente o posicionamento de André, encontrem provas de trabalho, validem experiência e iniciem contato.

## Visão geral

A base visual é forte, coerente e reconhecível. A maior oportunidade não é mudar a identidade, mas explicar melhor quem André é antes de pedir que o visitante interprete os cases. A Home prioriza prova visual, mas deixa o posicionamento implícito. A página Sobre tem boa estrutura editorial, porém a imagem inicial e alguns detalhes da trajetória não reforçam confiança com a mesma força.

## Pontos fortes

- Hierarquia visual limpa, com tipografia consistente, paleta própria e uso disciplinado de grid.
- Os cases têm imagens fortes, links amplos e leitura fácil em desktop e mobile.
- Não houve overflow horizontal nos dois viewports auditados.
- Há skip link, um `main`, navegação identificada, headings estruturados e `alt` presente em todas as imagens.
- O menu mobile abre de forma clara e mantém os destinos essenciais.
- A galeria da página Sobre respeita `prefers-reduced-motion` e pausa durante interação.
- O bloco vermelho de contato é direto, legível e transforma e-mail e LinkedIn em ações evidentes.

## Riscos e oportunidades priorizadas

### P1 — resolver primeiro

1. **Tornar o posicionamento visível na primeira dobra da Home.** O `h1` “Cases em destaque” existe apenas para leitores de tela; visualmente, o visitante recebe uma imagem de case antes de saber que André é UI Designer e qual valor oferece. Recomenda-se uma assinatura curta e visível integrada ao hero, sem retirar protagonismo do case.

2. **Dar contexto à grade de marcas e reduzir seu peso no mobile.** A seção tem `aria-label`, mas nenhum título visível. No mobile, hero e logos somam aproximadamente 830 px, fazendo “Projetos” começar em `y=902`. Manter as marcas antes dos projetos, mas adicionar uma legenda curta e compactar altura/padding das células.

3. **Abrir a página Sobre com uma prova mais pessoal e profissional.** O estádio ocupa metade do primeiro viewport e não conecta imediatamente com “UI Designer”. Usar o retrato já existente como primeira imagem da galeria cria reconhecimento e confiança; estádio, castelo e Bambina podem continuar como contexto pessoal nas posições seguintes.

4. **Explicitar o terceiro registro de experiência.** A linha “Atendimento ao cliente — 2005–2017” aparece com a coluna de empresa vazia. Mesmo que represente continuidade na Themediagroup, no desktop e sobretudo no mobile ela parece informação ausente. Repetir a empresa ou agrupar visualmente os dois cargos.

5. **Corrigir áreas de toque e semântica dos carrosséis.** Foram medidos controles de 64 × 24 px no hero, 56 × 27 px na galeria e 40 × 40 px no menu mobile. Aumentar a área clicável para pelo menos 44 × 44 px, preservando o traço visual. Na galeria Sobre, os marcadores usam `role="tab"`, mas não implementam navegação por setas nem associação completa com painéis; implementar o padrão de tabs ou trocar por botões agrupados.

### P2 — melhorar depois

6. **Diferenciar melhor os dois projetos UI Boost.** O título repetido exige que o visitante leia a categoria pequena. Considerar títulos como “UI Boost — App” e “UI Boost — Landing Page”, mantendo os nomes e rotas atuais.

7. **Reduzir repetição de contato na página Sobre.** O bloco vermelho “Vamos conversar” é seguido imediatamente pelo footer preto com outra chamada de conversa. Manter um CTA forte e tornar o segundo mais institucional ou mais compacto nessa rota.

8. **Dar um próximo passo à primeira dobra da Sobre.** Além do CTA global de contato, um link contextual curto — currículo ou projetos — ajudaria quem chegou diretamente pela rota `/sobre`.

## Passos auditados

1. **Home — entrada desktop:** saudável visualmente; posicionamento profissional fica implícito.
2. **Home — marcas e projetos:** prova forte; marcas sem contexto e cards UI Boost pouco diferenciados.
3. **Home — mobile e menu:** reflow estável e menu claro; projetos aparecem tarde e alguns controles têm área de toque pequena.
4. **Sobre — entrada desktop/mobile:** hierarquia forte; imagem inicial pouco conectada à proposta profissional.
5. **Sobre — trajetória:** escaneável; terceiro vínculo profissional visualmente ambíguo.
6. **Sobre — contato e fechamento:** conversão clara; chamada duplicada com o footer.

## Limites da evidência

- A auditoria usa renderização local e inspeção do DOM atual; não mede comportamento de usuários reais nem conversão.
- Acessibilidade foi avaliada por estrutura, tamanhos e estados observáveis. Não é uma certificação WCAG e ainda requer teste completo por teclado e leitor de tela.
- O círculo preto com “N” presente em algumas capturas é o indicador de desenvolvimento do Next.js, não faz parte da interface publicada.
- A captura full-page mobile da Sobre apresentou uma falha de rasterização na galeria e foi rejeitada; os screenshots focados e o primeiro viewport carregado foram usados no lugar.

## Evidências

- `01-home-desktop-top.png`
- `01-home-desktop-full.png`
- `03-home-mobile-top.png`
- `08-home-mobile-menu.png`
- `09-home-mobile-projects.png`
- `02-about-desktop-top.png`
- `02-about-desktop-full.png`
- `06-about-desktop-trajectory.png`
- `07-about-desktop-contact.png`
- `04-about-mobile-top.png`
- `10-about-mobile-trajectory.png`
- `11-about-mobile-contact.png`
- `audit-data.json`
