const STORAGE_KEY = "world-cup-couple-pool-v1";
const PLAYER_KEY = "world-cup-active-player-v1";
const OPENFOOTBALL_URL = "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json";
const STAGES = {
  "group-stage": "Fase de grupos",
  "round-of-32": "Dieciseisavos",
  "round-of-16": "Octavos",
  "quarter-finals": "Cuartos",
  "semi-finals": "Semifinales",
  "third-place": "Tercer puesto",
  final: "Final",
};

const FLAGS = {
  Algeria: "🇩🇿",
  Argentina: "🇦🇷",
  Australia: "🇦🇺",
  Austria: "🇦🇹",
  Belgium: "🇧🇪",
  "Bosnia and Herzegovina": "🇧🇦",
  Brazil: "🇧🇷",
  "Cabo Verde": "🇨🇻",
  Canada: "🇨🇦",
  Colombia: "🇨🇴",
  "Congo DR": "🇨🇩",
  "Cote d'Ivoire": "🇨🇮",
  Croatia: "🇭🇷",
  Curacao: "🇨🇼",
  Czechia: "🇨🇿",
  Ecuador: "🇪🇨",
  Egypt: "🇪🇬",
  England: "🏴",
  France: "🇫🇷",
  Germany: "🇩🇪",
  Ghana: "🇬🇭",
  Haiti: "🇭🇹",
  "IR Iran": "🇮🇷",
  Iraq: "🇮🇶",
  Japan: "🇯🇵",
  Jordan: "🇯🇴",
  "Korea Republic": "🇰🇷",
  Mexico: "🇲🇽",
  Morocco: "🇲🇦",
  Netherlands: "🇳🇱",
  "New Zealand": "🇳🇿",
  Norway: "🇳🇴",
  Panama: "🇵🇦",
  Paraguay: "🇵🇾",
  Portugal: "🇵🇹",
  Qatar: "🇶🇦",
  "Saudi Arabia": "🇸🇦",
  Scotland: "🏴",
  Senegal: "🇸🇳",
  "South Africa": "🇿🇦",
  Spain: "🇪🇸",
  Sweden: "🇸🇪",
  Switzerland: "🇨🇭",
  Tunisia: "🇹🇳",
  Turkiye: "🇹🇷",
  "United States": "🇺🇸",
  Uruguay: "🇺🇾",
  Uzbekistan: "🇺🇿",
};

const state = {
  fixtures: [],
  names: { a: "Kevin", b: "Ivonne" },
  picks: {
    1: {
      b: { outcome: "home" },
    },
  },
  results: {},
  liveScores: {},
};

let sharedSyncEnabled = false;
let sharedUpdatedAt = "";
let activePlayer = localStorage.getItem(PLAYER_KEY) || "a";
let hasLocalDraft = false;

const els = {
  playerAName: document.querySelector("#playerAName"),
  playerBName: document.querySelector("#playerBName"),
  playerAScore: document.querySelector("#playerAScore"),
  playerBScore: document.querySelector("#playerBScore"),
  leaderName: document.querySelector("#leaderName"),
  completedCount: document.querySelector("#completedCount"),
  missingPicks: document.querySelector("#missingPicks"),
  couponText: document.querySelector("#couponText"),
  matchesList: document.querySelector("#matchesList"),
  groupsGrid: document.querySelector("#groupsGrid"),
  bracketGrid: document.querySelector("#bracketGrid"),
  searchInput: document.querySelector("#searchInput"),
  stageFilter: document.querySelector("#stageFilter"),
  statusFilter: document.querySelector("#statusFilter"),
  upcomingList: document.querySelector("#upcomingList"),
  recentResults: document.querySelector("#recentResults"),
  pointsBreakdown: document.querySelector("#pointsBreakdown"),
  extrasList: document.querySelector("#extrasList"),
  syncBadge: document.querySelector("#syncBadge"),
  playerModeButtons: document.querySelectorAll(".identity-switch button"),
  refreshBtn: document.querySelector("#refreshBtn"),
  exportBtn: document.querySelector("#exportBtn"),
  importInput: document.querySelector("#importInput"),
};

async function init() {
  const [fixturesData, liveData] = await Promise.all([
    fetch("data/fixtures.json").then((res) => res.json()),
    fetch("data/openfootball-2026.json").then((res) => res.json()).catch(() => ({ matches: [] })),
  ]);

  state.fixtures = fixturesData.fixtures;
  const loadedSharedState = await loadSharedState();
  if (!loadedSharedState) restoreState();
  mergeSeedResults(liveData.matches || []);
  hydrateStageFilter();
  bindEvents();
  render();
  startSharedSync();
  refreshLiveScores();
  setInterval(refreshLiveScores, 45000);
}

function restoreState() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  applySavedState(saved);
}

async function loadSharedState() {
  try {
    const response = await fetch("/api/state", { cache: "no-store" });
    if (!response.ok) return false;
    const saved = await response.json();
    sharedSyncEnabled = true;
    sharedUpdatedAt = saved.updatedAt || "";
    applySavedState(saved);
    updateSyncBadge("Compartido");
    return true;
  } catch {
    updateSyncBadge("Guardado local");
    return false;
  }
}

function applySavedState(saved) {
  state.names = saved.names || state.names;
  state.picks = saved.picks || state.picks;
  state.results = saved.results || state.results;
}

function mergeSeedResults(matches) {
  for (const fixture of state.fixtures) {
    if (state.results[fixture.matchNumber]?.locked) continue;
    const found = matches.find((match) => {
      return normalize(match.team1) === normalize(fixture.homeTeam)
        && normalize(match.team2) === normalize(fixture.awayTeam)
        && match.score?.ft;
    });
    if (found) {
      state.results[fixture.matchNumber] = {
        home: found.score.ft[0],
        away: found.score.ft[1],
        locked: false,
      };
    }
  }
  persistLocal();
}

function bindEvents() {
  document.querySelectorAll(".tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tabs button").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".view").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      document.querySelector(`#${button.dataset.view}View`).classList.add("active");
    });
  });

  [els.searchInput, els.stageFilter, els.statusFilter].forEach((el) => {
    el.addEventListener("input", renderMatches);
  });

  els.playerAName.addEventListener("input", () => updateName("a", els.playerAName.value));
  els.playerBName.addEventListener("input", () => updateName("b", els.playerBName.value));
  els.playerModeButtons.forEach((button) => {
    button.addEventListener("click", () => setActivePlayer(button.dataset.player));
  });
  els.refreshBtn.addEventListener("click", refreshResults);
  els.exportBtn.addEventListener("click", exportState);
  els.importInput.addEventListener("change", importState);
}

function hydrateStageFilter() {
  for (const [value, label] of Object.entries(STAGES)) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    els.stageFilter.append(option);
  }
}

function updateName(player, name) {
  if (activePlayer !== "a") return;
  state.names[player] = name.trim() || (player === "a" ? "Kevin" : "Ivonne");
  persistLocal();
  apiAction({ action: "saveProfile", names: state.names });
  render();
}

function persistLocal() {
  const payload = {
    names: state.names,
    picks: state.picks,
    results: state.results,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

async function apiAction(payload) {
  if (!sharedSyncEnabled) return null;
  const response = await fetch("/api/state", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ player: activePlayer, ...payload }),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "No se pudo guardar");
  }
  const saved = await response.json();
  sharedUpdatedAt = saved.updatedAt || sharedUpdatedAt;
  applySavedState(saved);
  persistLocal();
  updateSyncBadge("Guardado");
  return saved;
}

function startSharedSync() {
  if (!sharedSyncEnabled) return;
  setInterval(async () => {
    if (hasLocalDraft) return;
    try {
      const response = await fetch("/api/state", { cache: "no-store" });
      if (!response.ok) return;
      const saved = await response.json();
      if (!saved.updatedAt || saved.updatedAt === sharedUpdatedAt) return;
      sharedUpdatedAt = saved.updatedAt;
      applySavedState(saved);
      persistLocal();
      render();
      updateSyncBadge("Sincronizado");
    } catch {
      sharedSyncEnabled = false;
      updateSyncBadge("Sin conexión");
    }
  }, 4000);
}

function updateSyncBadge(text) {
  if (els.syncBadge) els.syncBadge.textContent = text;
}

function render() {
  els.playerAName.value = state.names.a;
  els.playerBName.value = state.names.b;
  els.playerAName.disabled = activePlayer !== "a";
  els.playerBName.disabled = activePlayer !== "a";
  renderActivePlayer();
  const totals = calculateTotals();
  els.playerAScore.textContent = totals.a;
  els.playerBScore.textContent = totals.b;
  renderHeroStats(totals);
  renderMatches();
  renderGroups();
  renderBracket();
  renderSummary();
}

function setActivePlayer(player) {
  activePlayer = player === "b" ? "b" : "a";
  localStorage.setItem(PLAYER_KEY, activePlayer);
  render();
  toast(`Ahora editas como ${state.names[activePlayer]}.`);
}

function renderActivePlayer() {
  els.playerModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.player === activePlayer);
    button.textContent = state.names[button.dataset.player];
  });
}

function renderHeroStats(totals) {
  const completed = state.fixtures.filter((fixture) => hasResult(fixture.matchNumber)).length;
  const missing = countMissingPicks();
  const leader = leaderLabel(totals);
  els.leaderName.textContent = leader;
  els.completedCount.textContent = `${completed}/${state.fixtures.length}`;
  els.missingPicks.textContent = missing;
  els.couponText.textContent = couponMessage(totals, completed);
}

function renderMatches() {
  const query = normalize(els.searchInput.value);
  const stage = els.stageFilter.value;
  const status = els.statusFilter.value;

  const fixtures = state.fixtures.filter((fixture) => {
    const haystack = normalize([
      fixture.matchNumber,
      fixture.homeTeam,
      fixture.awayTeam,
      fixture.stadium,
      fixture.hostCity,
      STAGES[fixture.stage],
    ].join(" "));
    if (query && !haystack.includes(query)) return false;
    if (stage !== "all" && fixture.stage !== stage) return false;
    if (status === "done" && !hasResult(fixture.matchNumber)) return false;
    if (status === "pending" && hasResult(fixture.matchNumber)) return false;
    if (status === "today" && !isSameDate(fixture.kickoffUtc, new Date())) return false;
    return true;
  });

  els.matchesList.replaceChildren(...fixtures.map(renderMatchCard));
}

function renderMatchCard(fixture) {
  const template = document.querySelector("#matchTemplate").content.cloneNode(true);
  const card = template.querySelector(".match-card");
  const result = state.results[fixture.matchNumber] || {};
  const live = state.liveScores[fixture.matchNumber];
  const display = live || result;
  const done = hasResult(fixture.matchNumber) || live?.finished;
  const isLive = live && !live.finished && live.minute !== "notstarted";
  if (done) card.classList.add("done");
  if (isLive) card.classList.add("is-live");

  template.querySelector(".match-meta").innerHTML = `
    <div class="match-number">Partido ${fixture.matchNumber}</div>
    <div>${formatStage(fixture)}</div>
    <div>${formatDate(fixture.kickoffUtc)}</div>
    <div>${titleCase(fixture.hostCity.replaceAll("-", " "))}</div>
    <div class="${isLive ? "live-pill live-now" : "live-pill"}">${liveLabel(live)}</div>
  `;

  template.querySelector(".teams").innerHTML = `
    <div class="team-line">
      <span class="flag">${flagFor(fixture.homeTeam)}</span>
      <span class="team-name">${fixture.homeTeam}</span>
      <span class="score-badge">${displayScore(display, "home")}</span>
    </div>
    <div class="versus">vs</div>
    <div class="team-line away">
      <span class="flag">${flagFor(fixture.awayTeam)}</span>
      <span class="team-name">${fixture.awayTeam}</span>
      <span class="score-badge">${displayScore(display, "away")}</span>
    </div>
    <div class="stadium-line">${fixture.stadium}</div>
  `;

  const pickGrid = template.querySelector(".pick-grid");
  pickGrid.append(renderPickBox(fixture, "a"));
  pickGrid.append(renderPickBox(fixture, "b"));

  const resultRow = template.querySelector(".result-row");
  if (activePlayer === "a") {
    resultRow.append(
      scoreInput(fixture.matchNumber, "home", result.home),
      document.createTextNode("-"),
      scoreInput(fixture.matchNumber, "away", result.away),
      actionButton("Guardar", "save-pill", () => saveResult(fixture.matchNumber, card)),
      actionButton("Limpiar", "", () => clearResult(fixture.matchNumber))
    );
  } else {
    resultRow.classList.add("locked");
    resultRow.textContent = "Marcador editable solo por Kevin";
  }

  return card;
}

function renderPickBox(fixture, player) {
  const pick = state.picks[fixture.matchNumber]?.[player] || {};
  const box = document.createElement("div");
  box.className = "pick-box";
  const pickLocked = Boolean(pick.locked);
  const canEdit = player === activePlayer && !pickLocked;
  if (canEdit) box.classList.add("active-player");
  else box.classList.add("locked");
  if (pickLocked) box.classList.add("saved");
  const label = document.createElement("label");
  label.textContent = pickLocked ? `${state.names[player]} · guardado` : canEdit ? `${state.names[player]} · tu pick` : state.names[player];

  const controls = document.createElement("div");
  controls.className = "pick-controls";
  const outcome = document.createElement("select");
  outcome.innerHTML = `
    <option value="">Sin pick</option>
    <option value="home">${flagFor(fixture.homeTeam)} ${fixture.homeTeam}</option>
    <option value="draw">Empate</option>
    <option value="away">${flagFor(fixture.awayTeam)} ${fixture.awayTeam}</option>
  `;
  outcome.value = pick.outcome || "";
  outcome.disabled = !canEdit;
  outcome.addEventListener("change", () => savePick(fixture.matchNumber, player, { outcome: outcome.value }));

  controls.append(outcome);
  box.append(label, controls, pickPointsLine(fixture.matchNumber, player));
  if (canEdit) {
    const saveButton = actionButton("Guardar y bloquear", "save-pill", () => lockPick(fixture.matchNumber, player, saveButton));
    box.append(saveButton);
  } else if (pickLocked) {
    const note = document.createElement("div");
    note.className = "mini";
    note.textContent = "Pick bloqueado";
    box.append(note);
  } else {
    const note = document.createElement("div");
    note.className = "mini";
    note.textContent = `Solo ${state.names[player]} puede cambiar este pick`;
    box.append(note);
  }
  return box;
}

function scoreInput(matchNumber, key, value, onInput) {
  const input = document.createElement("input");
  input.className = "score-input";
  input.type = "number";
  input.min = "0";
  input.inputMode = "numeric";
  input.dataset.match = matchNumber;
  input.dataset.key = key;
  input.value = value ?? "";
  if (onInput) {
    input.addEventListener("input", () => onInput(input.value === "" ? "" : Number(input.value)));
  }
  return input;
}

function actionButton(text, className, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = text;
  button.className = className;
  button.addEventListener("click", onClick);
  return button;
}

function savePick(matchNumber, player, patch) {
  if (player !== activePlayer) {
    toast(`Solo ${state.names[player]} puede cambiar ese pick.`);
    return;
  }
  if (state.picks[matchNumber]?.[player]?.locked) {
    toast("Ese pick ya quedó bloqueado.");
    return;
  }
  state.picks[matchNumber] ||= {};
  state.picks[matchNumber][player] = { ...(state.picks[matchNumber][player] || {}), ...patch };
  hasLocalDraft = true;
  persistLocal();
  render();
}

async function lockPick(matchNumber, player, button) {
  const pick = state.picks[matchNumber]?.[player];
  if (!pick?.outcome) {
    toast("Escoge ganador o empate antes de guardar.");
    return;
  }
  if (button) {
    button.disabled = true;
    button.textContent = "Bloqueando...";
  }

  const lockedPick = {
    ...pick,
    locked: true,
    lockedAt: new Date().toISOString(),
  };
  state.picks[matchNumber][player] = lockedPick;
  hasLocalDraft = false;
  persistLocal();
  render();

  try {
    await apiAction({ action: "savePick", matchNumber, pick: lockedPick, lock: true });
    render();
    toast("Pick guardado y bloqueado.");
  } catch (error) {
    if (error.message === "El pick ya está bloqueado") {
      toast("Ese pick ya estaba bloqueado.");
      return;
    }
    state.picks[matchNumber][player] = pick;
    hasLocalDraft = true;
    persistLocal();
    render();
    toast(error.message);
  }
}

function saveResult(matchNumber, card) {
  const home = card.querySelector(`[data-match="${matchNumber}"][data-key="home"]`).value;
  const away = card.querySelector(`[data-match="${matchNumber}"][data-key="away"]`).value;
  if (home === "" || away === "") {
    toast("Falta un marcador.");
    return;
  }
  state.results[matchNumber] = { home: Number(home), away: Number(away), locked: true };
  persistLocal();
  apiAction({ action: "saveResult", matchNumber, result: state.results[matchNumber] })
    .then(() => {
      render();
      toast("Resultado guardado.");
    })
    .catch((error) => toast(error.message));
}

function clearResult(matchNumber) {
  delete state.results[matchNumber];
  persistLocal();
  apiAction({ action: "saveResult", matchNumber, clear: true })
    .then(() => render())
    .catch((error) => toast(error.message));
}

function renderGroups() {
  const groups = groupStandings();
  const cards = Object.entries(groups).map(([group, rows]) => {
    const card = document.createElement("article");
    card.className = "group-card";
    card.innerHTML = `
      <h2>Grupo ${group}</h2>
      <table>
        <thead><tr><th>Equipo</th><th>Pts</th><th>PJ</th><th>GF</th><th>GC</th><th>DG</th></tr></thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              <td><span class="table-team">${flagFor(row.team)} ${row.team}</span></td><td>${row.pts}</td><td>${row.played}</td>
              <td>${row.gf}</td><td>${row.ga}</td><td>${row.gf - row.ga}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
    return card;
  });
  els.groupsGrid.replaceChildren(...cards);
}

function groupStandings() {
  const groups = {};
  for (const fixture of state.fixtures.filter((item) => item.stage === "group-stage")) {
    groups[fixture.group] ||= {};
    ensureTeam(groups[fixture.group], fixture.homeTeam);
    ensureTeam(groups[fixture.group], fixture.awayTeam);
    const result = state.results[fixture.matchNumber];
    if (!result || result.home === undefined || result.away === undefined) continue;
    applyGroupResult(groups[fixture.group], fixture.homeTeam, fixture.awayTeam, result.home, result.away);
  }
  return Object.fromEntries(Object.entries(groups).map(([group, teams]) => [
    group,
    Object.values(teams).sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga) || b.gf - a.gf || a.team.localeCompare(b.team)),
  ]));
}

function ensureTeam(group, team) {
  group[team] ||= { team, played: 0, pts: 0, gf: 0, ga: 0 };
}

function applyGroupResult(group, home, away, homeScore, awayScore) {
  group[home].played += 1;
  group[away].played += 1;
  group[home].gf += homeScore;
  group[home].ga += awayScore;
  group[away].gf += awayScore;
  group[away].ga += homeScore;
  if (homeScore > awayScore) group[home].pts += 3;
  else if (awayScore > homeScore) group[away].pts += 3;
  else {
    group[home].pts += 1;
    group[away].pts += 1;
  }
}

function renderBracket() {
  const rounds = ["round-of-32", "round-of-16", "quarter-finals", "semi-finals", "third-place", "final"];
  const columns = rounds.map((round) => {
    const column = document.createElement("section");
    column.className = "bracket-round";
    column.innerHTML = `<h2>${STAGES[round]}</h2>`;
    state.fixtures.filter((fixture) => fixture.stage === round).forEach((fixture) => {
      const result = state.results[fixture.matchNumber];
      const done = hasResult(fixture.matchNumber);
      const item = document.createElement("article");
      item.className = "bracket-match";
      item.innerHTML = `
        <div class="mini">#${fixture.matchNumber} · ${formatDate(fixture.kickoffUtc)}</div>
        <div class="${done && result.home > result.away ? "winner" : ""}">${flagFor(fixture.homeTeam)} ${fixture.homeTeam} ${done ? result.home : ""}</div>
        <div class="${done && result.away > result.home ? "winner" : ""}">${flagFor(fixture.awayTeam)} ${fixture.awayTeam} ${done ? result.away : ""}</div>
        <div class="mini">${titleCase(fixture.hostCity.replaceAll("-", " "))}</div>
      `;
      column.append(item);
    });
    return column;
  });
  els.bracketGrid.replaceChildren(...columns);
}

function renderSummary() {
  const now = new Date().getTime();
  const upcoming = state.fixtures
    .filter((fixture) => new Date(fixture.kickoffUtc).getTime() >= now && !hasResult(fixture.matchNumber))
    .slice(0, 8);
  const recent = state.fixtures
    .filter((fixture) => hasResult(fixture.matchNumber))
    .sort((a, b) => b.matchNumber - a.matchNumber)
    .slice(0, 8);

  els.upcomingList.replaceChildren(...upcoming.map(summaryItem));
  els.recentResults.replaceChildren(...recent.map(summaryItem));
  renderPointsBreakdown();
  renderExtras();
}

function summaryItem(fixture) {
  const result = state.results[fixture.matchNumber];
  const item = document.createElement("div");
  item.className = "summary-item";
  item.innerHTML = `
    <div class="mini">#${fixture.matchNumber} · ${formatDate(fixture.kickoffUtc)}</div>
    <strong>${flagFor(fixture.homeTeam)} ${fixture.homeTeam} ${result ? result.home : ""} - ${result ? result.away : ""} ${flagFor(fixture.awayTeam)} ${fixture.awayTeam}</strong>
  `;
  return item;
}

function renderPointsBreakdown() {
  const rows = state.fixtures
    .filter((fixture) => hasResult(fixture.matchNumber))
    .map((fixture) => {
      const a = scorePick(fixture.matchNumber, "a");
      const b = scorePick(fixture.matchNumber, "b");
      return { fixture, a, b };
    })
    .filter((row) => row.a || row.b)
    .slice(-12)
    .reverse();

  els.pointsBreakdown.replaceChildren(...rows.map(({ fixture, a, b }) => {
    const item = document.createElement("div");
    item.className = "summary-item";
    item.innerHTML = `
      <div class="mini">#${fixture.matchNumber}</div>
      <strong>${flagFor(fixture.homeTeam)} ${fixture.homeTeam} vs ${flagFor(fixture.awayTeam)} ${fixture.awayTeam}</strong>
      <div>${state.names.a}: ${a} · ${state.names.b}: ${b}</div>
    `;
    return item;
  }));
}

function renderExtras() {
  const totals = calculateTotals();
  const items = [
    ["Líder", leaderLabel(totals)],
    ["Diferencia", `${Math.abs(totals.a - totals.b)} puntos`],
    ["Picks faltantes", `${countMissingPicks()} selecciones`],
    ["Aciertos", `${winnerPickCount("a")} de ${state.names.a} · ${winnerPickCount("b")} de ${state.names.b}`],
    ["Partido final", "El campeón del reto reclama su cupón"],
  ];

  els.extrasList.replaceChildren(...items.map(([label, value]) => {
    const item = document.createElement("div");
    item.className = "summary-item";
    item.innerHTML = `<div class="mini">${label}</div><strong>${value}</strong>`;
    return item;
  }));
}

function countMissingPicks() {
  return state.fixtures.reduce((total, fixture) => {
    const matchPicks = state.picks[fixture.matchNumber] || {};
    return total + (matchPicks.a?.outcome ? 0 : 1) + (matchPicks.b?.outcome ? 0 : 1);
  }, 0);
}

function winnerPickCount(player) {
  return state.fixtures.reduce((total, fixture) => {
    return total + scorePick(fixture.matchNumber, player);
  }, 0);
}

function leaderLabel(totals) {
  if (totals.a > totals.b) return state.names.a;
  if (totals.b > totals.a) return state.names.b;
  return "Empate";
}

function couponMessage(totals, completed) {
  if (completed >= state.fixtures.length) {
    const winner = leaderLabel(totals);
    return winner === "Empate"
      ? "Final empatada: toca desempate dramático, como manda el fútbol."
      : `${winner}, reclama tu cupón de campeón mundialista.`;
  }
  const leader = leaderLabel(totals);
  if (leader === "Empate") return "La final del cupón sigue abierta. Nadie puede cantar victoria todavía.";
  return `${leader} va liderando, pero el cupón solo se reclama después de la final.`;
}

function pickPointsLine(matchNumber, player) {
  const line = document.createElement("div");
  line.className = "mini";
  line.textContent = scoringResult(matchNumber) ? `${scorePick(matchNumber, player)} punto por ganador/empate` : "Esperando resultado";
  return line;
}

function calculateTotals() {
  return state.fixtures.reduce((totals, fixture) => {
    totals.a += scorePick(fixture.matchNumber, "a");
    totals.b += scorePick(fixture.matchNumber, "b");
    return totals;
  }, { a: 0, b: 0 });
}

function scorePick(matchNumber, player) {
  const result = scoringResult(matchNumber);
  const pick = state.picks[matchNumber]?.[player];
  if (!result || !pick) return 0;

  const resultOutcome = outcomeFor(result.home, result.away);
  return pick.outcome === resultOutcome ? 1 : 0;
}

function scoringResult(matchNumber) {
  const live = state.liveScores[matchNumber];
  if (live && (live.finished || live.minute !== "notstarted")) {
    return { home: live.homeScore, away: live.awayScore };
  }
  return state.results[matchNumber];
}

function outcomeFor(home, away) {
  if (home > away) return "home";
  if (away > home) return "away";
  return "draw";
}

function hasResult(matchNumber) {
  const result = state.results[matchNumber];
  return result && Number.isFinite(result.home) && Number.isFinite(result.away);
}

function formatStage(fixture) {
  return fixture.stage === "group-stage" ? `Grupo ${fixture.group}` : STAGES[fixture.stage];
}

function formatDate(value) {
  return new Intl.DateTimeFormat("es-CO", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function displayScore(score, side) {
  if (!score) return "-";
  const liveKey = side === "home" ? "homeScore" : "awayScore";
  const resultKey = side === "home" ? "home" : "away";
  const value = score[liveKey] ?? score[resultKey];
  return Number.isFinite(value) ? value : "-";
}

function liveLabel(live) {
  if (!live) return "Sin marcador en vivo";
  if (live.finished) return "Finalizado";
  if (live.minute === "notstarted") return "No iniciado";
  if (/half/i.test(live.minute)) return "Descanso";
  if (/^[0-9]+/.test(String(live.minute))) return `${live.minute}'`;
  return String(live.minute);
}

function flagFor(team) {
  if (!team) return "🏆";
  if (FLAGS[team]) return FLAGS[team];
  if (/winner|loser|group|match|third place|runners-up/i.test(team)) return "🏆";
  return "⚽";
}

function normalize(value) {
  const clean = String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  const aliases = {
    "bosnia & herzegovina": "bosnia and herzegovina",
    "bosnia herzegovina": "bosnia and herzegovina",
    "cabo verde": "cape verde",
    "cape verde": "cape verde",
    "czech republic": "czechia",
    "cote d ivoire": "cote divoire",
    "dr congo": "congo dr",
    "iran": "ir iran",
    "ivory coast": "cote divoire",
    "south korea": "korea republic",
    "turkey": "turkiye",
    "usa": "united states",
  };
  return aliases[clean] || clean;
}

function titleCase(value) {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

function isSameDate(value, date) {
  const target = new Date(value);
  return target.getFullYear() === date.getFullYear()
    && target.getMonth() === date.getMonth()
    && target.getDate() === date.getDate();
}

function exportState() {
  const blob = new Blob([JSON.stringify({
    exportedAt: new Date().toISOString(),
    names: state.names,
    picks: state.picks,
    results: state.results,
  }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quiniela-mundial-2026.json";
  link.click();
  URL.revokeObjectURL(url);
}

async function importState(event) {
  const file = event.target.files[0];
  if (!file) return;
  const data = JSON.parse(await file.text());
  state.names = data.names || state.names;
  state.picks = data.picks || {};
  state.results = data.results || {};
  persistLocal();
  if (activePlayer === "a") {
    await apiAction({ action: "saveProfile", names: state.names }).catch(() => null);
  }
  render();
  toast("Quiniela importada.");
  event.target.value = "";
}

async function refreshResults() {
  try {
    const data = await fetch(`${OPENFOOTBALL_URL}?t=${Date.now()}`).then((res) => res.json());
    mergeSeedResults(data.matches || []);
    render();
    toast("Resultados actualizados.");
  } catch (error) {
    console.error(error);
    toast("No se pudieron actualizar resultados.");
  }
}

async function refreshLiveScores() {
  try {
    const data = await fetch("/api/live", { cache: "no-store" }).then((res) => res.json());
    state.liveScores = Object.fromEntries((data.games || []).map((game) => [game.matchNumber, game]));
    render();
  } catch (error) {
    console.error(error);
  }
}

function toast(message) {
  document.querySelector(".toast")?.remove();
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  document.body.append(el);
  setTimeout(() => el.remove(), 1800);
}

init().catch((error) => {
  console.error(error);
  toast("No se pudo cargar el calendario.");
});
