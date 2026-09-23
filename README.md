# Catania

Um jogo de tabuleiro multiplayer inspirado na Sicília, jogado no browser. Recolhe recursos, funda aldeias e foge do Fogo do Etna.

## O jogo

As regras completas estão em [REGRAS.md](REGRAS.md). O [rulebook original em PDF](Catania-Rulebook.pdf) (em inglês) é de uma versão anterior das regras.

Em cada turno, cada jogador recolhe recursos (cereais, vinho, peixe, calcário, azeite) em até 2 territórios da ilha, colocando lá um trabalhador. Em cada território escolhe 1 carta, ou 2 cartas — e nesse caso tira o disco do topo da torre partilhada para a pilha desse recurso. As pilhas mantêm-se em sequência (o disco mais baixo em cima é o valor atual), por isso recolher 2 deprecia o recurso (ou mantém-no, se o disco for mais alto). Depois das recolhas (ou de passar), o jogador pode fazer a ação extra: fundar uma aldeia. Exige pelo menos 5 cartas na mão com 2+ tipos de recurso: a maioria fica na aldeia (em empate, o jogador escolhe), todas as minorias são descartadas, e o jogador escolhe uma delas para valorizar (o disco de cima, o mais baixo, volta à torre e o valor sobe).

Quando um disco vermelho 🔴 sai da torre, o **Fogo do Etna** entra em erupção e move-se para um hexágono adjacente sem trabalhadores, bloqueando-o. O jogo termina numa última ronda depois de um jogador fundar a sua 3ª aldeia; a pontuação final é a soma de cartas × valor do disco em cada aldeia fundada.

Suporta mesas de 2 e 4 jogadores, e modo solo contra 1 ou 3 bots. Há um tutorial interativo (🎓 no ecrã inicial e no lobby) com uma ronda de treino contra bots.

## Stack

- **Servidor:** Node.js + [ws](https://github.com/websockets/ws) — HTTP estático e WebSocket num único processo (`server.js`)
- **Cliente:** HTML/CSS/JS vanilla, ficheiro único (`public/index.html`)
- Sem build step, sem dependências de frontend

## Executar localmente

Requer Node.js 18+.

```bash
npm install
npm start
```

O servidor arranca em `http://localhost:3000` (porta configurável via `PORT`).

## Estrutura

```
server.js          # lógica do jogo, lobby, WebSocket e servidor HTTP
public/index.html  # cliente (UI, tabuleiro, lógica de interação)
public/manifest.json, icon*.png, icon.svg  # app instalável (PWA)
REGRAS.md          # regras do jogo
```

## Licença

O jogo (código, regras e textos) é CC BY 4.0 — David Marques.

### Ícones de terceiros

Os ícones dos recursos (cereais, vinho, peixe, calcário, azeite), do Vulcão Etna, do fogo, das aldeias e do trabalhador são do [OpenMoji](https://openmoji.org), o projeto de emojis de código aberto do HfG Schwäbisch Gmünd, e estão licenciados [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Estão embutidos como SVG em `public/index.html` (constante `SVG_URI`).

A CC BY-SA 4.0 obriga a:

- dar crédito ao OpenMoji (esta secção);
- partilhar com a mesma licença (CC BY-SA 4.0) qualquer versão alterada destes ícones.

A licença do jogo não muda por os incluir: a obrigação de partilha é só sobre os ícones.

O ícone da app (`public/icon.svg` e `public/icon-*.png`) é um desenho original do Catania e segue a licença do jogo.
