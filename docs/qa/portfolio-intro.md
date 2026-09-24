# Intro do portfólio — validação

Data: 11 de setembro de 2026.

## Atualização do ritmo para 3,6 segundos

Linha do tempo atual: ponto de 0 a 160 ms; expansão até 500 ms; foto completa de 500 a 1.300 ms; retração até 1.600 ms; montagem do símbolo até 2.000 ms; letras de 2.000 a 2.600 ms; logo completo de 2.600 a 3.200 ms; saída até 3.600 ms. A saída de segurança foi ajustada para 3.800 ms para não interromper a nova duração.

Medições no navegador: foto completa por 782 ms em 1366 px e 780 ms em 390 px; logo completo por 590 ms e 580 ms, respectivamente. As diferenças dos valores nominais correspondem à amostragem por frames. Em 1920 px, o encerramento foi observado aos 3.631 ms e o intervalo total das letras foi de 600 ms. Sem transbordamento horizontal nos três tamanhos.

Clique para pular, Escape, movimento reduzido e não repetição foram verificados novamente no navegador. Os cinco testes da intro, lint, build e verificação do diff passaram. A prévia atualizada está na porta 3001, com HTTP 200 confirmado.

Esta alteração é restrita ao ritmo e ao limite de segurança. A contagem ainda começa no bootstrap: o caso de carregamento lento identificado na investigação anterior não foi alterado por este ajuste.

## Registro histórico da versão inicial de 2,8 segundos

Os resultados e as capturas abaixo pertencem à validação inicial, anterior ao ajuste de ritmo acima.

Prévia final: http://localhost:3001/ (build de produção, HTTP 200).

## Implementação

- Sequência de 2.800 ms: ponto, expansão com recorte circular da foto, retração, deslocamento ao símbolo, letras e saída suave.
- As oito letras usam os paths originais do Figma. Revelação total de 600 ms: 320 ms por letra, com intervalos de 40 ms.
- Referências: Figma `341a2M4Ey0nZluritwqE5y`, storyboard `1070:1250` e logo `1068:53`. Os exports originais estão em `public/brand/intro/`.
- Foto existente: `public/media/hero/andre-portrait.png`. O arquivo tem 156 × 156 px; sua resolução limita a nitidez ampliada. Nenhuma foto foi substituída.
- Componente e CSS isolados; integração no SiteShell e script inicial no layout. Nenhuma dependência adicionada.
- A primeira entrada consome a sessão. Entrar diretamente em outra página não mostra a intro, inclusive ao navegar depois para a home.
- O diálogo permite pular por clique, Enter e Escape. Tab e Shift+Tab mantêm o foco no botão. Movimento reduzido abre a home diretamente.
- Temporizador independente libera a tela em até três segundos, mesmo sem hidratação. Um observador próprio de erro da foto cobre falhas anteriores à hidratação.

## Verificação visual no navegador

Chromium, com viewports de 1920 × 1080, 1366 × 768 e 390 × 844.

A sequência foi executada em tempo normal nos três tamanhos. Foram inspecionadas capturas da intro e da home; os seis estágios foram também inspecionados com animações pausadas em 1366 px. Capturas em tempo normal têm atraso de aquisição e seus nomes não representam timestamps exatos.

- Ponto, retrato circular e logo permanecem contidos e centralizados.
- A fotografia não sofre distorção de proporção.
- As letras aparecem da esquerda para a direita.
- A home aparece carregada após a saída.
- Não foi encontrado transbordamento horizontal.

Evidências locais:

- [Sequência em seis frames](../../.qa-artifacts/intro/1366-sequence.png)
- [Logo em 1920 px](../../.qa-artifacts/intro/1920-250.png)
- [Foto no mobile](../../.qa-artifacts/intro/390-250.png)
- [Logo no mobile](../../.qa-artifacts/intro/390-1820.png)

## Testes funcionais no navegador

Executados em 1366 × 768 e 390 × 844:

| Cenário | Resultado |
| --- | --- |
| Pular por clique | Diálogo fechado; foco no conteúdo principal |
| Tab, Shift+Tab e Enter | Foco no botão; intro encerrada |
| Escape | Intro encerrada |
| Recarregar na mesma sessão | Não repete |
| Entrada direta em `/projetos/digitart` | Não mostra intro |
| Navegar do case à home | Não mostra intro |
| Home → case → voltar | Não repete |
| Entrada direta em `/sobre` | Não mostra intro |
| `prefers-reduced-motion: reduce` | Home direta, sem cobertura |
| Cancelar as 13 animações da intro | Temporizador fecha o diálogo e libera a tela |
| Bloquear a requisição da foto | Após a correção, diálogo fechado e cobertura removida na checagem de 650 ms |
| Restaurar a foto e iniciar nova sessão | Intro abre, foto fica visível e intro termina normalmente |

Amostragem da execução natural: foto visível entre aproximadamente 0,5 e 1,3 s; letras entrando em sequência a partir de aproximadamente 1,8 s; todas visíveis por 2,36 s; diálogo já fechado na amostra de 2,86 s.

Os erros de rede das simulações de foto bloqueada são intencionais. Fora dessas simulações, não foram observados erros de JavaScript na versão de produção; houve aviso de preload de imagem da home durante mudanças de viewport.

## Verificação por código

- `npm.cmd test`: 56 testes passaram na implementação final, incluindo cinco testes do bootstrap.
- `npm.cmd run lint`: passou.
- `npm.cmd run build`: passou, incluindo TypeScript e geração das rotas.
- `git diff --check`: passou; apenas avisos de conversão de fim de linha do Git.
- Os testes do bootstrap cobrem sessão, entrada por outras páginas, movimento reduzido, storage indisponível, Escape antes da hidratação e saída por tempo.

O teste automatizado não substitui a inspeção visual descrita acima. Mobile foi validado por viewport de navegador, sem teste em aparelho físico ou Safari.

## Rever a intro

Abra a home em uma nova sessão de navegação. Na mesma aba, recarregar não repete a intro por definição. Para desenvolvimento, remova apenas a chave `gld:intro:session` do sessionStorage antes de recarregar a home.
