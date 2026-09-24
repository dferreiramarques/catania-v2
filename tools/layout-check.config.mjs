// Configuração do layout-check para o Catania.
// O harness está no design system: bitnikgames-design-system/tools/layout-check.js
//
//   node ../bitnikgames-design-system/tools/layout-check.js tools/layout-check.config.mjs --tag antes
//   (… conversão …)
//   node ../bitnikgames-design-system/tools/layout-check.js tools/layout-check.config.mjs --tag depois
//   node ../bitnikgames-design-system/tools/layout-check.js compare tools/layout-check/antes tools/layout-check/depois
//
// As funções de cenário/tutorial correm DENTRO da página (são serializadas),
// por isso cada uma é autossuficiente e usa as globais do cliente
// (tutStart, tutLoad, tutMidGame, TUT, G, openRules, openVillageModal…).

export default {
  name: 'Catania',
  server: { cmd: 'node', args: ['server.js'], cwd: '..', env: { PORT: '3027' } },
  url: 'http://localhost:3027/',

  // Sem o aviso de "primeira vez" no lobby (dava falsas diferenças)
  storage: { cat_tut_hint_off: '1' },
  ready: () => typeof tutStart === 'function' && !!document.getElementById('s-name'),

  selectors: {
    // No telemóvel o #s-game faz scroll por dentro (overflow-y: auto), não o documento
    screen: '#s-game.active, #s-victory.active',
    zones: {
      topo: '.gtop', jogadores: '#pbar', adversarios: '#opp-hands',
      mesa: '.gboard', mao: '.hand-footer', lateral: '.gside',
    },
    rows: ['#pbar > :first-child', '#opp-hands > :first-child', '#hcards > :first-child'],
    noScroll: ['.hand-footer'],
    // "fora do ecrã" no quadro de vitória = não cabe sem scroll
    pieces: { hex: '#bwrap svg g[onclick]', carta: '#hcards .card', vitoria: '#s-victory.active .vbox', registo: '.log-sec.open' },
    modal: '.rules-ovl.on .rules-box, #village-modal.on .vmod-box, .movl.on .mbox, #s-victory.active .vbox',
    // Não podem ficar cortados: botões de ação, nomes dos adversários (bots) e a faixa de valores
    noTruncate: ['.abtn', '.opp-hand .onm', '.rpiles'],
    coach: '#tut-coach.on',
    rings: '.tut-ring',
  },
  // Abaixo disto é falha: território < alvo de toque, cartas ilegíveis
  minPieceWidth: { hex: 44, carta: 40 },
  // Estas zonas não podem mudar de altura entre estes cenários
  stableAcross: ['inicio', 'meio', 'cheio'],
  stableIgnore: ['lateral'],

  scenarios: {
    // Início de jogo, 4 jogadores, o nome mais comprido que o input aceita (16)
    inicio: () => {
      document.getElementById('pin').value = 'Maximiliano Albu';
      tutStart();
      document.body.classList.remove('tut-on');
      ['tut-layer', 'tut-coach'].forEach(id => document.getElementById(id).classList.remove('on'));
      clearInterval(TUT.tick); removeEventListener('resize', tutPlace);
    },
    // Ronda 5: aldeias fundadas, trabalhadores na ilha, registo cheio
    meio: () => {
      document.getElementById('pin').value = 'Maximiliano Albu';
      tutStart();
      document.body.classList.remove('tut-on');
      ['tut-layer', 'tut-coach'].forEach(id => document.getElementById(id).classList.remove('on'));
      clearInterval(TUT.tick); removeEventListener('resize', tutPlace);
      tutLoad(tutMidGame(TUT.name));
    },
    // Pior caso: todos com mãos grandes e 2 aldeias
    cheio: () => {
      document.getElementById('pin').value = 'Maximiliano Albu';
      tutStart();
      document.body.classList.remove('tut-on');
      ['tut-layer', 'tut-coach'].forEach(id => document.getElementById(id).classList.remove('on'));
      clearInterval(TUT.tick); removeEventListener('resize', tutPlace);
      const g = tutMidGame(TUT.name);
      g.players.forEach(p => {
        Object.assign(p.hand, { cereais: 3, vinho: 2, peixe: 3, calcario: 2, azeite: 3 });
        if (p.villages.length < 2) p.villages.push({ res: 'calcario', cards: 5 });
      });
      tutLoad(g);
    },
    // Modal de fundar aldeia (com empate na maioria, para mostrar a escolha)
    fundar: () => {
      document.getElementById('pin').value = 'Maximiliano Albu';
      tutStart();
      document.body.classList.remove('tut-on');
      ['tut-layer', 'tut-coach'].forEach(id => document.getElementById(id).classList.remove('on'));
      clearInterval(TUT.tick); removeEventListener('resize', tutPlace);
      const g = tutMidGame(TUT.name);
      Object.assign(g.players[0].hand, { azeite: 2, cereais: 2, peixe: 1, vinho: 1 });
      tutLoad(g);
      openVillageModal(G);
    },
    regras: () => {
      document.getElementById('pin').value = 'Maximiliano Albu';
      tutStart();
      document.body.classList.remove('tut-on');
      ['tut-layer', 'tut-coach'].forEach(id => document.getElementById(id).classList.remove('on'));
      clearInterval(TUT.tick); removeEventListener('resize', tutPlace);
      tutLoad(tutMidGame(TUT.name));
      openRules();
    },
    // Registo aberto (no telemóvel é uma bottom sheet; em desktop está na barra lateral)
    registo: () => {
      document.getElementById('pin').value = 'Maximiliano Albu';
      tutStart();
      document.body.classList.remove('tut-on');
      ['tut-layer', 'tut-coach'].forEach(id => document.getElementById(id).classList.remove('on'));
      clearInterval(TUT.tick); removeEventListener('resize', tutPlace);
      tutLoad(tutMidGame(TUT.name));
      toggleLog(true);
    },
    // Jogo a sério, fora do tutorial: lobby → Solo vs 3 Bots → o servidor manda o estado
    online: async () => {
      const wait = ms => new Promise(r => setTimeout(r, ms));
      document.getElementById('pin').value = 'Maximiliano Albu';
      enterLobby();
      for (let i = 0; i < 50 && !document.querySelector('#tgrid .tcard'); i++) await wait(100);
      send({ type: 'JOIN_LOBBY', lobbyId: 'cat-solo-3', playerName: myName });
      for (let i = 0; i < 50 && !G; i++) await wait(100);
    },
    // Ecrã de vitória com 4 jogadores e 3 aldeias cada
    vitoria: () => {
      document.getElementById('pin').value = 'Maximiliano Albu';
      tutStart();
      document.body.classList.remove('tut-on');
      ['tut-layer', 'tut-coach'].forEach(id => document.getElementById(id).classList.remove('on'));
      clearInterval(TUT.tick); removeEventListener('resize', tutPlace);
      const g = tutMidGame(TUT.name);
      const top = r => g.piles[r].discs[g.piles[r].discs.length - 1];
      g.players.forEach((p, i) => {
        while (p.villages.length < 3) p.villages.push({ res: ['azeite', 'peixe', 'cereais'][p.villages.length], cards: 3 + i });
        p.score = p.villages.reduce((s, v) => s + v.cards * top(v.res), 0);
      });
      g.phase = 'GAME_OVER';
      tutLoad(g);
    },
  },

  // O tutorial percorrido como um jogador: carrega no último botão do balão
  // (o principal; nos passos só com atalhos, "Escolher por mim"). Nos passos
  // dos bots não há botão até acabarem — o harness tenta de novo.
  tutorial: {
    start: () => { document.getElementById('pin').value = 'Maximiliano Albu'; tutStart(); },
    step: () => (typeof TUT !== 'undefined' && TUT ? TUT_STEPS[TUT.i].id : null),
    last: () => TUT.i === TUT_STEPS.length - 1,
    advance: () => {
      const b = [...document.querySelectorAll('#tut-acts .btn')].pop();
      if (!b) return false;
      b.click();
      return true;
    },
    settleMs: 350,
  },
};
