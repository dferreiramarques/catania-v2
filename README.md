# Catania

Um jogo de tabuleiro multiplayer inspirado na Sicília, jogado no browser. Recolhe recursos, funda aldeias e foge do Fogo do Etna antes que a torre de discos se esgote.

## O jogo

Cada jogador recolhe recursos (cereais, vinho, peixe, calcário, azeite) dos hexágonos da ilha, colocando tokens e avançando na torre de discos partilhada. Fundar uma aldeia exige pelo menos 5 cartas na mão com 2+ tipos de recurso: escolhe um tipo para fundar e um tipo minoritário para sacrificar, o que sobe o valor desse recurso na torre.

Quando um disco vermelho 🔴 sai da torre, o **Fogo do Etna** entra em erupção e move-se para um hexágono adjacente livre, bloqueando-o. O jogo termina numa última ronda depois de um jogador fundar a sua 3ª aldeia; a pontuação final é a soma de cartas × valor do disco em cada aldeia fundada.

Suporta mesas de 2 e 4 jogadores, e modo solo contra 1 ou 3 bots.

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
public/icons/       # ícones/assets estáticos
```

## Licença

CC BY 4.0 — David Marques
