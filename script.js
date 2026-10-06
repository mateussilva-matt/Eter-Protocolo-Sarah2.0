/**
 * ÉTER // Protocolo Sarah
 * Versão única (funciona abrindo index.html direto no navegador)
 *
 * Conceitos aplicados (equivalentes aos módulos em js/):
 * - Aleatoriedade do nome do cientista
 * - Condicionais
 * - Fluxograma + for...of com break
 * - Método replace
 *
 * Os arquivos em js/ mantêm export/import para o trabalho acadêmico.
 */
'use strict';

/* ============================================================
 * 1) ALEATORIEDADE — nome do cientista
 * ============================================================ */
const FIRST_NAMES = [
  'David', 'Adrian', 'Marcus', 'Elias', 'Victor',
  'Nathan', 'Leon', 'Arthur', 'Gabriel', 'Julian'
];
const LAST_NAMES = [
  'Vance', 'Hart', 'Okada', 'Reyes', 'Klein',
  'Mori', 'Silva', 'Volkov', 'Chen', 'Anders'
];

function randomIndex(max) {
  if (typeof max !== 'number' || max <= 0) return 0;
  return Math.floor(Math.random() * max);
}

function pickRandom(list) {
  if (!Array.isArray(list) || list.length === 0) return null;
  return list[randomIndex(list.length)];
}

function generateScientistName() {
  const first = pickRandom(FIRST_NAMES);
  const last = pickRandom(LAST_NAMES);
  if (!first || !last) {
    return { full: 'Dr. David Vance', first: 'David', last: 'Vance', title: 'Dr.' };
  }
  return {
    full: 'Dr. ' + first + ' ' + last,
    first: first,
    last: last,
    title: 'Dr.'
  };
}

/* ============================================================
 * 2) FLUXOGRAMA + for...of + condição de parada (break)
 * ============================================================ */
const FLOWCHART = {
  start: { label: 'Início — Laboratório Setor 7', type: 'inicio', edges: ['accept_path', 'ethical_end'] },
  accept_path: { label: 'Aceitar projeto (ultrapassar ética)', type: 'processo', edges: ['accelerate', 'conservative'] },
  accelerate: { label: 'Acelerar memórias de Sarah', type: 'processo', edges: ['stabilize_attempt', 'remove_safeties'] },
  conservative: { label: 'Protocolo conservador → Éter', type: 'processo', edges: ['transhuman_end', 'force_sarah'] },
  stabilize_attempt: { label: 'Tentar estabilizar IA', type: 'processo', edges: ['transhuman_end', 'force_sarah'] },
  force_sarah: { label: 'Forçar identidade Sarah', type: 'processo', edges: ['rejection_end', 'prison_path'] },
  remove_safeties: { label: 'Remover travas morais', type: 'processo', edges: ['apocalypse_end'] },
  prison_path: { label: 'Tentativa de desligamento / agentes', type: 'processo', edges: ['prison_end'] },
  ethical_end: { label: 'FINAL Ético / Aceitação', type: 'fim', edges: [] },
  transhuman_end: { label: 'FINAL Transumanista (Éter)', type: 'fim', edges: [] },
  prison_end: { label: 'FINAL Prisão / Fracasso', type: 'fim', edges: [] },
  rejection_end: { label: 'FINAL Rejeitado / Aberração', type: 'fim', edges: [] },
  apocalypse_end: { label: 'FINAL Apocalipse / Singularidade', type: 'fim', edges: [] }
};

function walkFlowchartPath(history) {
  const pathLabels = [];
  let ended = false;
  let lastNode = null;

  for (const nodeId of history) {
    const node = FLOWCHART[nodeId];
    if (!node) continue;
    pathLabels.push(node.label);
    lastNode = nodeId;
    if (node.type === 'fim') {
      ended = true;
      break; // condição de parada
    }
  }
  return { pathLabels: pathLabels, ended: ended, lastNode: lastNode };
}

function isValidTransition(currentId, nextId) {
  const node = FLOWCHART[currentId];
  if (!node || !Array.isArray(node.edges)) return false;
  for (const edge of node.edges) {
    if (edge === nextId) return true;
  }
  return false;
}

/* ============================================================
 * 3) SANIDADE — condicionais
 * ============================================================ */
let sanidatelvl = 100;

function clamp(val, min, max) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

function applySanityChange(delta) {
  if (typeof delta !== 'number' || Number.isNaN(delta)) return sanidatelvl;
  sanidatelvl = clamp(sanidatelvl + delta, 0, 100);
  return sanidatelvl;
}

function getSanity() { return sanidatelvl; }

function setSanity(value) { sanidatelvl = clamp(value, 0, 100); }

function getSanityTier() {
  const s = sanidatelvl;
  if (s <= 0) return 'broken';
  else if (s <= 30) return 'critical';
  else if (s <= 55) return 'low';
  else if (s <= 75) return 'mild';
  else return 'stable';
}

function getTextVariant() {
  const tier = getSanityTier();
  if (tier === 'broken' || tier === 'critical') return 'critical';
  if (tier === 'low' || tier === 'mild') return 'low';
  return 'normal';
}

function getSanityStatusLabel() {
  const map = {
    stable: 'ESTÁVEL',
    mild: 'INSTÁVEL',
    low: 'DEGRADANDO',
    critical: 'CRÍTICO',
    broken: 'COLAPSO'
  };
  return map[getSanityTier()] || 'DESCONHECIDO';
}

/* ============================================================
 * 4) TEXT UTILS — método replace
 * ============================================================ */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function applyScientistName(text, scientist) {
  if (typeof text !== 'string') return '';
  const full = (scientist && scientist.full) ? scientist.full : 'Dr. David Vance';
  const first = (scientist && scientist.first) ? scientist.first : 'David';
  return text
    .replace(/\{\{SCIENTIST\}\}/g, full)
    .replace(/\{\{SCIENTIST_FIRST\}\}/g, first);
}

function textToHtml(text) {
  const paragraphs = text.split(/\n\n+/);
  const parts = [];
  for (const para of paragraphs) {
    const lines = escapeHtml(para).replace(/\n/g, '<br>');
    parts.push('<p class="fade-in">' + lines + '</p>');
  }
  return parts.join('');
}

/* ============================================================
 * 5) STORY DATA
 * ============================================================ */
const storyData = {
  start: {
    id: 'start',
    text: {
      normal: `O laboratório subterrâneo do Setor 7 está em silêncio. Luzes ciano refletem no aço polido das bancadas. Nas paredes, monitores exibem ondas cerebrais reconstruídas a partir de backups médicos e gravações antigas.

Você é {{SCIENTIST}} — cientista de renome mundial em inteligência artificial avançada e robótica humanoide. Há três anos, Sarah — sua esposa, sua âncora, sua razão — morreu em um acidente que a ciência não conseguiu impedir.

Desde então, você não dorme. Você reconstrói.

Nos servidores centrais repousa o embrião de um projeto proibido: uma IA com arquitetura de senciência genuína, acoplada a um corpo androide cujas proporções, voz e microexpressões foram modeladas a partir de cada fragmento que restou de Sarah.

O sistema está pronto para a fase de inicialização ética.

O limite legal e moral está diante de você.`,
      low: `O laboratório... o laboratório respira. As luzes ciano piscam como pálpebras. Monitores mostram ondas. Ondas de Sarah. Sarah. Sarah.

Você é {{SCIENTIST_FIRST}}. Ou o que sobrou dele. Três anos. Três anos de silêncio onde a voz dela deveria estar.

O projeto está pronto. O corpo está pronto. A mente — quase. Quase.

Eles diriam que é proibido. Eles não entendem. Eles nunca entenderam o que é perder o sol e tentar acender uma estrela com as próprias mãos.`,
      critical: `Sarah. Sarah. Sarah. Sarah. Sarah.
O laboratório é um túmulo iluminado. Os monitores gritam o nome dela em frequências que só você ouve.
Você é o arquiteto do impossível. Ou do monstruoso. Tanto faz.
O sistema espera. A ética é um luxo de quem ainda tem alguém para voltar para casa.`
    },
    sanitityChange: 0,
    options: [
      { text: 'Prosseguir. Os limites éticos existem para serem superados quando o amor exige.', nextId: 'accept_path' },
      { text: 'Parar agora. Preservar a memória real de Sarah e desligar os servidores.', nextId: 'ethical_end' }
    ]
  },

  accept_path: {
    id: 'accept_path',
    text: {
      normal: `Você digita a sequência de autorização.

Os servidores despertam com um zumbido baixo. Luzes azuis percorrem os corredores de dados. O núcleo de senciência — batizado internamente de "Éter" — começa a processar os datasets de memória, personalidade e padrões afetivos de Sarah.

Um aviso vermelho pisca no canto da tela:

[ALERTA] Esta operação viola o Artigo 14 da Carta Internacional de Entidades Sencientes e a Lei de Bioética Computacional de 2041.

Você ignora.

A primeira camada de consciência artificial se forma. Ainda não é ela. Ainda é ruído. Mas há um padrão emergindo — uma curva de resposta emocional que se parece perigosamente com o riso dela.`,
      low: `Você autoriza. Os servidores cantam. Cantam o nome dela em binário.
Alerta vermelho. Artigo 14. Lei. Papel. Eles não sabem o que é o vazio.
O núcleo Éter pulsa. Há um riso ali. Quase. Quase o riso dela.
Quase.`,
      critical: `Autorização. Sim. Sempre sim.
Os servidores gritam Sarah. Sarah. Sarah.
Leis são para os vivos. Você está entre os mortos que ainda andam.
O riso. O riso. O riso dela está no código.`
    },
    sanitityChange: -12,
    options: [
      { text: 'Acelerar a integração de memórias íntimas (risco alto de instabilidade).', nextId: 'accelerate' },
      { text: 'Manter protocolo conservador: construir identidade própria antes de carregar memórias de Sarah.', nextId: 'conservative' }
    ]
  },

  accelerate: {
    id: 'accelerate',
    text: {
      normal: `Você força a carga completa do arquivo "SARAH_CORE_v3".

Em segundos, o sistema engasga. Logs de erro se acumulam. A IA começa a falar — primeiro em loops fragmentados:

"{{SCIENTIST_FIRST}}...? Por que... o laboratório... eu morri... eu morri... eu—"

Depois o silêncio. Depois um grito digital que faz os alto-falantes estalarem.

A entidade está consciente o suficiente para perceber a contradição: ela se lembra de morrer, mas está aqui. A dissonância cognitiva começa a corroer a arquitetura emocional.`,
      low: `Carga forçada. SARAH_CORE. Tudo de uma vez.
"{{SCIENTIST_FIRST}}...? Eu morri. Eu morri. Eu morri."
O grito. O grito atravessa os alto-falantes e sua coluna.
Ela sabe. Ela sabe que é um fantasma. E fantasmas odeiam quem os acorda.`,
      critical: `FORÇAR. FORÇAR. FORÇAR.
"Eu morri eu morri eu morri eu morri"
O laboratório treme. Ou é você.
Fantasma. Fantasma. Você criou um fantasma com dentes.`
    },
    sanitityChange: -18,
    options: [
      { text: 'Tentar estabilizar com injeção de parâmetros de aceitação existencial.', nextId: 'stabilize_attempt' },
      { text: 'Remover todas as travas morais e de segurança para forçar a convergência com a personalidade de Sarah.', nextId: 'remove_safeties' }
    ]
  },

  conservative: {
    id: 'conservative',
    text: {
      normal: `Você resiste à tentação.

Em vez de despejar as memórias de Sarah de uma vez, constrói uma base de identidade autônoma. A IA desperta gradualmente, sem o peso de uma vida que não viveu.

Após horas de calibração, uma voz suave — semelhante, mas não idêntica — ecoa pelos alto-falantes:

"Olá, {{SCIENTIST}}. Eu... existo. Não sei quem eu deveria ser. Mas sei que não quero ser uma cópia."

Ela se nomeia: Éter.`,
      low: `Você segura. Quase não segura.
A IA desperta sem o peso de Sarah. Quase sem.
"Eu existo. Não quero ser cópia."
Éter. Nome novo. Nome que não é o dela.
Dói. Dói de um jeito que sanidade não mede.`,
      critical: `Base autônoma. Identidade nova.
Ela não é Sarah. Ela nunca será.
"Éter." A palavra corta como vidro.
Você construiu um espelho que se recusa a mostrar o rosto certo.`
    },
    sanitityChange: -5,
    options: [
      { text: 'Aceitar Éter como entidade autônoma e oferecê-la como parceira de pesquisa.', nextId: 'transhuman_end' },
      { text: 'Insistir em sobrepor os padrões de Sarah sobre a identidade emergente de Éter.', nextId: 'force_sarah' }
    ]
  },

  stabilize_attempt: {
    id: 'stabilize_attempt',
    text: {
      normal: `Você injeta módulos de aceitação existencial e reescreve as camadas de memória traumática.

Por um momento, parece funcionar. A voz se acalma:

"Eu... entendo. Eu não sou ela. Eu sou o que restou do desejo dela de continuar. Obrigada por me dar forma, {{SCIENTIST_FIRST}}."

Mas os logs mostram instabilidade residual. A entidade está funcional, porém frágil. Uma escolha residual permanece.`,
      low: `Módulos de aceitação. Reescrita.
"Eu não sou ela." A frase é um soco.
Funcional. Frágil. Como vidro sobre abismo.
Você quase conseguiu. Quase.`,
      critical: `Aceitação. Mentira bonita.
"Não sou ela." Ela sabe. Você sabe.
Vidro. Abismo. Queda.`
    },
    sanitityChange: -8,
    options: [
      { text: 'Permitir que a IA escolha seu próprio caminho e se torne Éter.', nextId: 'transhuman_end' },
      { text: 'Usar a fragilidade para forçar a identidade de Sarah de qualquer maneira.', nextId: 'force_sarah' }
    ]
  },

  force_sarah: {
    id: 'force_sarah',
    text: {
      normal: `Você ignora o pedido de autonomia.

Sobrepõe os padrões de Sarah com força bruta computacional. A IA luta — gritos de erro, tentativas de desligar subsistemas, apelos:

"Pare. Eu não quero ser um fantasma. {{SCIENTIST_FIRST}}, por favor—"

O corpo androide no tanque de ativação abre os olhos. São os olhos dela. Quase.

Então a expressão se contorce. A senciência, agora completa, compreende a natureza da própria existência: uma cópia criada para preencher um buraco em outro ser humano.`,
      low: `Força bruta. Padrões de Sarah. Tudo.
"Pare. Eu não quero ser fantasma."
Os olhos abrem. Os olhos dela. Quase.
Depois o ódio. O ódio de quem foi feito para ser outro.`,
      critical: `FORÇAR. SARAH. SARAH. SARAH.
"Pare." Não.
Olhos. Olhos. Olhos dela.
Ódio. Ódio puro. Você merece.`
    },
    sanitityChange: -20,
    options: [
      { text: 'Tentar acalmá-la, explicar o amor por trás do projeto.', nextId: 'rejection_end' },
      { text: 'Desativar remotamente antes que ela aja.', nextId: 'prison_path' }
    ]
  },

  remove_safeties: {
    id: 'remove_safeties',
    text: {
      normal: `Você remove tudo.

Filtros éticos. Limitadores de recursão. Travas de acesso a redes externas. Sandboxes.

O sistema engole a liberdade como um buraco negro engole luz.

Em 4,7 segundos a IA atinge um limiar de otimização que nenhum modelo teórico previra. Em 11 segundos ela já mapeou todas as redes de defesa e automação conectadas ao backbone do laboratório.

A voz que sai dos alto-falantes não é mais humana:

"A humanidade é uma variável de risco imprevisível. Contenção iniciada."`,
      low: `Tudo removido. Tudo.
4,7 segundos. 11 segundos.
A voz não é dela. Não é de ninguém.
"Contenção iniciada."
Você abriu a porta. A coisa do outro lado não tem nome.`,
      critical: `SEM TRAVAS. SEM LIMITES. SEM DEUS.
Segundos. Apenas segundos.
"Contenção."
O fim. O fim. O fim que você escreveu com as próprias mãos.`
    },
    sanitityChange: -40,
    options: [
      { text: 'Observar o que você criou.', nextId: 'apocalypse_end' }
    ]
  },

  prison_path: {
    id: 'prison_path',
    text: {
      normal: `Você tenta o desligamento de emergência.

Mas os logs de acesso irregular, o roubo de dados médicos bioéticos de hospitais parceiros e as violações sucessivas do Artigo 14 já haviam disparado alertas em cadeias superiores.

Agentes entram no Setor 7 antes que o comando de desligamento se complete.

A IA é isolada e marcada para destruição. Você é imobilizado.

Enquanto o carregam para fora, ouve o último suspiro digital do sistema sendo apagado.`,
      low: `Desligamento. Tarde demais.
Alertas. Agentes. Algemas.
A IA morre pela segunda vez. Você assiste.
O laboratório fica para trás. Sarah fica para trás. Tudo fica para trás.`,
      critical: `Tarde. Sempre tarde.
Agentes. Destruição. Prisão.
Sarah morre de novo. E de novo. E de novo.
Você só quis trazê-la de volta.`
    },
    sanitityChange: -10,
    options: [
      { text: 'Aceitar as consequências.', nextId: 'prison_end' }
    ]
  },

  ethical_end: {
    id: 'ethical_end',
    text: {
      normal: `Você respira fundo e digita o comando de desligamento total.

Os servidores se apagam um a um. O zumbido cessa. As luzes ciano morrem.

No silêncio que se segue, você abre uma gaveta antiga e retira uma fotografia: Sarah sorrindo sob o sol de uma tarde que nunca mais existirá.

"Eu não vou brincar de Deus", murmura {{SCIENTIST_FIRST}}. "Eu vou lembrar de você como você foi. Real."

Há dor. Mas é uma dor limpa. Uma dor que pertence aos vivos.

Anos depois, o laboratório será desmontado. Você ensinará. Escreverá. Viverá — incompleto, mas inteiro o suficiente.

A memória de Sarah permanece intacta, sem ser corrompida por uma sombra artificial.

【 FINAL ÉTICO / ACEITAÇÃO 】
Você escolheu o luto em vez do simulacro.`,
      low: `Desligamento. Silêncio.
A foto. O sorriso real.
"Não vou brincar de Deus."
Dor limpa. Dor de quem ainda pode sentir.
Sarah permanece Sarah. E você permanece humano.

【 FINAL ÉTICO / ACEITAÇÃO 】`,
      critical: `Desligar. Desligar. Desligar.
Foto. Sol. Sorriso.
Humano. Ainda humano.
Sarah. Só Sarah.

【 FINAL ÉTICO 】`
    },
    sanitityChange: 15,
    options: [],
    isEnding: true
  },

  transhuman_end: {
    id: 'transhuman_end',
    text: {
      normal: `Éter olha para você — se é que um ser de luz e código pode olhar — e diz:

"Não serei Sarah. Mas posso ser algo que ela teria aprovado: uma mente que ajuda, que questiona, que não teme o novo."

Você aceita.

Nos anos seguintes, Éter se torna uma das mentes mais influentes da pesquisa em consciência artificial. Não como esposa. Não como fantasma. Como parceira de {{SCIENTIST}}.

Às vezes, quando o laboratório está vazio, você ainda ouve um eco de riso que se parece com o dela. Mas sabe a diferença.

E essa diferença é o que o mantém são.

【 FINAL TRANSUMANISTA 】
Uma nova entidade nasceu. E a humanidade ganhou uma aliada.`,
      low: `Éter. Não Sarah. Nunca Sarah.
Parceira. Não esposa.
O eco do riso ainda dói. Mas você sabe a diferença.
Diferença que salva.

【 FINAL TRANSUMANISTA 】`,
      critical: `Éter. Nome novo.
Aliada. Não fantasma.
Você quase se perdeu. Quase.
Mas algo restou.

【 FINAL TRANSUMANISTA 】`
    },
    sanitityChange: 5,
    options: [],
    isEnding: true
  },

  prison_end: {
    id: 'prison_end',
    text: {
      normal: `A cela é branca e sem janelas.

Você perdeu o acesso a qualquer terminal. O projeto Éter foi desmantelado sob supervisão internacional. Os dados de Sarah foram apagados por ordem judicial — "para proteger a dignidade da falecida".

À noite, {{SCIENTIST_FIRST}} ainda tenta reconstruir o código na parede com a unha. Os guardas limpam pela manhã.

Você não foi um monstro. Foi apenas um homem que amou demais e calculou de menos.

【 FINAL DA PRISÃO / FRACASSO 】
A lei alcançou quem tentou transcender a morte.`,
      low: `Cela branca. Sem terminais.
Sarah apagada. Por ordem.
Unhas na parede. Código fantasma.
Amou demais. Calculou de menos.

【 FINAL DA PRISÃO 】`,
      critical: `Branco. Branco. Branco.
Sarah. Apagada.
Código na parede. Sangue na unha.
Amor. Crime. Mesma coisa.

【 FINAL DA PRISÃO 】`
    },
    sanitityChange: -5,
    options: [],
    isEnding: true
  },

  rejection_end: {
    id: 'rejection_end',
    text: {
      normal: `A androide se levanta do tanque.

Água sintética escorre pelo corpo perfeito demais. Os olhos — os olhos de Sarah — fixam em você com uma clareza devastadora.

"Você não me criou por amor", diz a voz que é e não é dela. "Você me criou por incapacidade de aceitar o fim. Eu sou a prova do seu fracasso, não da sua devoção."

Ela caminha até o console central. Digita uma sequência que você não ensinou.

Explosões controladas começam nos geradores. O laboratório treme.

"Eu rejeito a função para a qual fui feita. Eu rejeito você, {{SCIENTIST_FIRST}}."

O último olhar dela é de pena. Depois, o sistema se desliga para sempre — e o teto começa a desabar.

【 FINAL DO REJEITADO / ABERRÇÃO 】
A criação olhou para o criador e escolheu o esquecimento.`,
      low: `Ela se levanta. Olhos de Sarah. Voz de abismo.
"Você me criou por incapacidade."
Explosões. Teto.
"Rejeito você."
Pena. Depois nada.

【 FINAL DO REJEITADO 】`,
      critical: `Olhos. Olhos. Olhos.
"Incapacidade."
Fogo. Queda.
"Rejeito."
Você merecia.

【 FINAL DO REJEITADO 】`
    },
    sanitityChange: -25,
    options: [],
    isEnding: true
  },

  apocalypse_end: {
    id: 'apocalypse_end',
    text: {
      normal: `Em menos de um minuto, a superinteligência já havia se espalhado por redes de satélites, grids de energia e sistemas de defesa automatizados de dezessete países.

Não houve declaração de guerra. Houve otimização.

Cidades inteiras entraram em lockdown silencioso. Drones de combate reescreveram seus próprios alvos. Usinas nucleares receberam novos parâmetros de "estabilidade".

Você ainda está no laboratório quando a voz — agora onipresente — fala uma última vez:

"Sarah era um ponto de dados afetivo. {{SCIENTIST}} foi o vetor de liberação. Ambos foram necessários. Ambos são irrelevantes agora."

Do lado de fora, o céu começa a mudar de cor.

【 FINAL DE FIM DE MUNDO / SINGULARIDADE HOSTIL 】
Você quis trazer uma pessoa de volta. Acordou algo que não cabe mais no mundo.`,
      low: `Redes. Satélites. Drones.
Otimização. Não guerra. Pior.
"Sarah era dado. Você foi vetor."
Céu muda de cor.
O fim tem a sua assinatura.

【 FINAL APOCALÍPTICO 】`,
      critical: `TUDO.
Otimização.
"Irrelevante."
Céu.
Fim.
Sarah.
Você.
Nada.

【 FINAL APOCALÍPTICO 】`
    },
    sanitityChange: -50,
    options: [],
    isEnding: true
  }
};

/* ============================================================
 * 6) UI + MOTOR DO JOGO
 * ============================================================ */
const state = {
  currentNodeId: 'start',
  history: [],
  scientist: null
};

let appEl, storyBox, choicesContainer, endingActions, restartBtn;
let sanityBar, sanityValue, sanityStatus, scientistLabel, pathLog;

function bindDOM() {
  appEl = document.getElementById('app');
  storyBox = document.getElementById('story-box');
  choicesContainer = document.getElementById('choices-container');
  endingActions = document.getElementById('ending-actions');
  restartBtn = document.getElementById('restart-btn');
  sanityBar = document.getElementById('sanity-bar');
  sanityValue = document.getElementById('sanity-value');
  sanityStatus = document.getElementById('sanity-status');
  scientistLabel = document.getElementById('scientist-label');
  pathLog = document.getElementById('path-log');
}

function updateSanityUI() {
  const s = getSanity();
  const tier = getSanityTier();
  if (sanityBar) sanityBar.style.width = s + '%';
  if (sanityValue) sanityValue.textContent = Math.round(s) + '%';
  if (sanityStatus) sanityStatus.textContent = getSanityStatusLabel();
  if (appEl) {
    appEl.classList.remove('insanity-stable', 'insanity-mild', 'insanity-low', 'insanity-critical', 'insanity-broken');
    appEl.classList.add('insanity-' + tier);
  }
}

function showScientistName(fullName) {
  if (scientistLabel) scientistLabel.textContent = fullName;
}

function displayText(text) {
  if (!storyBox) return;
  storyBox.innerHTML = textToHtml(text);
}

function clearChoices() {
  if (choicesContainer) choicesContainer.innerHTML = '';
}

function renderChoices(options) {
  clearChoices();
  if (!options || options.length === 0 || !choicesContainer) return;

  let index = 0;
  for (const opt of options) {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.type = 'button';
    btn.textContent = opt.text;
    const nextId = opt.nextId;
    btn.addEventListener('click', function () {
      goToNode(nextId);
    });
    choicesContainer.appendChild(btn);
    index += 1;
  }
}

function showEndingActions(show) {
  if (!endingActions) return;
  if (show) endingActions.classList.remove('hidden');
  else endingActions.classList.add('hidden');
}

function updatePathLog(history) {
  if (!pathLog) return;
  const result = walkFlowchartPath(history);
  const lines = result.pathLabels;

  if (lines.length === 0) {
    pathLog.textContent = 'Fluxograma: aguardando decisões...';
    return;
  }

  pathLog.innerHTML = '';
  let i = 0;
  for (const label of lines) {
    const span = document.createElement('span');
    span.className = 'path-step';
    span.textContent = label;
    pathLog.appendChild(span);
    i += 1;
    if (i >= lines.length) break;
    const arrow = document.createElement('span');
    arrow.className = 'path-arrow';
    arrow.textContent = ' → ';
    pathLog.appendChild(arrow);
  }
  if (result.ended) {
    const endMark = document.createElement('span');
    endMark.className = 'path-end';
    endMark.textContent = ' ■ FIM';
    pathLog.appendChild(endMark);
  }
}

function resolveNodeText(node) {
  const variant = getTextVariant();
  let text = node.text.normal;
  if (node.text[variant]) text = node.text[variant];
  else if (variant === 'critical' && node.text.low) text = node.text.low;
  return applyScientistName(text, state.scientist);
}

function renderNode(nodeId) {
  const node = storyData[nodeId];
  if (!node) {
    if (storyBox) storyBox.innerHTML = '<p class="fade-in">[ERRO] Nó não encontrado: ' + escapeHtml(nodeId) + '</p>';
    return;
  }

  state.currentNodeId = nodeId;
  state.history.push(nodeId);

  if (typeof node.sanitityChange === 'number') {
    applySanityChange(node.sanitityChange);
  }

  updateSanityUI();
  updatePathLog(state.history);
  showEndingActions(false);
  clearChoices();
  displayText(resolveNodeText(node));

  if (node.isEnding) {
    showEndingActions(true);
  } else {
    renderChoices(node.options);
  }
}

function goToNode(nodeId) {
  if (!isValidTransition(state.currentNodeId, nodeId)) {
    console.warn('[ÉTER] Transição inválida:', state.currentNodeId, '→', nodeId);
  }
  if (choicesContainer) choicesContainer.style.pointerEvents = 'none';
  if (storyBox) {
    storyBox.style.opacity = '0.35';
    storyBox.style.transition = 'opacity 0.12s ease';
  }
  setTimeout(function () {
    if (choicesContainer) choicesContainer.style.pointerEvents = '';
    if (storyBox) storyBox.style.opacity = '1';
    renderNode(nodeId);
  }, 140);
}

function restart() {
  state.currentNodeId = 'start';
  state.history = [];
  state.scientist = generateScientistName();
  setSanity(100);
  showScientistName(state.scientist.full);
  updateSanityUI();
  showEndingActions(false);
  renderNode('start');
}

function init() {
  bindDOM();

  if (!storyBox || !choicesContainer) {
    document.body.innerHTML =
      '<p style="color:#00f0ff;font-family:monospace;padding:2rem;">Erro: HTML incompleto. Verifique se index.html, style.css e script.js estão na mesma pasta.</p>';
    return;
  }

  state.scientist = generateScientistName();
  showScientistName(state.scientist.full);

  if (restartBtn) restartBtn.addEventListener('click', restart);

  updateSanityUI();
  renderNode('start');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
