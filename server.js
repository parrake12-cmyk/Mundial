const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const PORT = Number(process.env.PORT || 4173);
const ROOT = __dirname;
const DATA_DIR = process.env.DATA_DIR || path.join(ROOT, "data");
const STATE_FILE = path.join(DATA_DIR, "state.json");
const VERIFIED_RESULTS_FILE = path.join(ROOT, "data", "verified-results.json");
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ENABLED = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
const LIVE_SCORES_URL = process.env.LIVE_SCORES_URL || "";

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

const defaultState = {
  names: { a: "Kevin", b: "Ivonne" },
  picks: {
    1: {
      b: { outcome: "home" },
    },
  },
  results: {},
  updatedAt: new Date().toISOString(),
};

function ensureStateFile() {
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  if (!fs.existsSync(STATE_FILE)) {
    const bundledState = path.join(ROOT, "data", "state.json");
    const initialState = fs.existsSync(bundledState)
      ? JSON.parse(fs.readFileSync(bundledState, "utf8"))
      : defaultState;
    fs.writeFileSync(STATE_FILE, JSON.stringify(initialState, null, 2));
  }
}

function localReadState() {
  ensureStateFile();
  return mergeVerifiedResults(sanitizeState(JSON.parse(fs.readFileSync(STATE_FILE, "utf8"))));
}

function localWriteState(input) {
  const next = mergeVerifiedResults(sanitizeState({ ...input, updatedAt: new Date().toISOString() }));
  fs.writeFileSync(STATE_FILE, JSON.stringify(next, null, 2));
  return next;
}

function supabaseHeaders(extra = {}) {
  return {
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

async function supabaseRequest(pathname, options = {}) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${pathname}`, {
    ...options,
    headers: supabaseHeaders(options.headers),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase ${response.status}: ${text}`);
  }
  return response.json();
}

async function readState() {
  if (!SUPABASE_ENABLED) return localReadState();

  const rows = await supabaseRequest("app_state?id=eq.main&select=state,updated_at");
  if (rows[0]?.state) {
    return mergeVerifiedResults(sanitizeState({
      ...rows[0].state,
      updatedAt: rows[0].state.updatedAt || rows[0].updated_at,
    }));
  }

  return writeState(localReadState());
}

async function writeState(input) {
  const next = mergeVerifiedResults(sanitizeState({ ...input, updatedAt: new Date().toISOString() }));
  if (!SUPABASE_ENABLED) return localWriteState(next);

  const rows = await supabaseRequest("app_state", {
    method: "POST",
    headers: {
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify({
      id: "main",
      state: next,
      updated_at: next.updatedAt,
    }),
  });
  return rows[0]?.state || next;
}

function sanitizeState(input = {}) {
  return {
    ...input,
    results: sanitizeResults(input.results),
  };
}

function sanitizeResults(results = {}) {
  return Object.fromEntries(Object.entries(results).filter(([, result]) => {
    return result?.verified === true
      && Number.isFinite(result.home)
      && Number.isFinite(result.away);
  }));
}

function loadVerifiedResults() {
  if (!fs.existsSync(VERIFIED_RESULTS_FILE)) return {};
  const data = JSON.parse(fs.readFileSync(VERIFIED_RESULTS_FILE, "utf8"));
  return Object.fromEntries(Object.entries(data.results || {}).map(([matchNumber, result]) => [
    matchNumber,
    {
      home: Number(result.home),
      away: Number(result.away),
      locked: true,
      verified: true,
      source: data.source || "verified-results",
      sourceUrl: data.sourceUrl,
      verifiedAt: data.verifiedAt,
    },
  ]).filter(([, result]) => Number.isFinite(result.home) && Number.isFinite(result.away)));
}

function mergeVerifiedResults(state) {
  return {
    ...state,
    results: {
      ...state.results,
      ...loadVerifiedResults(),
    },
  };
}

function sanitizePick(pick, lock = false) {
  const home = pick?.home === "" || pick?.home === undefined ? "" : Number(pick.home);
  const away = pick?.away === "" || pick?.away === undefined ? "" : Number(pick.away);
  return {
    outcome: ["home", "away", "draw"].includes(pick?.outcome) ? pick.outcome : "",
    home: Number.isFinite(home) ? home : "",
    away: Number.isFinite(away) ? away : "",
    locked: lock || Boolean(pick?.locked),
    lockedAt: lock ? new Date().toISOString() : pick?.lockedAt,
  };
}

async function savePick(input) {
  const player = input.player === "b" ? "b" : "a";
  const matchNumber = String(Number(input.matchNumber));
  if (!matchNumber || matchNumber === "NaN") throw new Error("Partido inválido");

  const state = await readState();
  const existing = state.picks?.[matchNumber]?.[player];
  if (existing?.locked) throw new Error("El pick ya está bloqueado");

  const pick = sanitizePick(input.pick, Boolean(input.lock));
  if (input.lock && !pick.outcome) throw new Error("Escoge un ganador o empate antes de guardar");

  state.picks ||= {};
  state.picks[matchNumber] ||= {};
  state.picks[matchNumber][player] = pick;
  return writeState(state);
}

async function saveProfile(input) {
  if (input.player !== "a") throw new Error("Solo Kevin puede editar nombres");
  const state = await readState();
  state.names = input.names || state.names;
  return writeState(state);
}

async function saveResult(input) {
  if (input.player !== "a") throw new Error("Solo Kevin puede editar resultados");
  const matchNumber = String(Number(input.matchNumber));
  const state = await readState();
  state.results ||= {};
  if (input.clear) delete state.results[matchNumber];
  else {
    state.results[matchNumber] = {
      home: Number(input.result?.home),
      away: Number(input.result?.away),
      locked: true,
      verified: true,
      source: "manual",
      verifiedAt: new Date().toISOString(),
    };
  }
  return writeState(state);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 2_000_000) {
        req.destroy();
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function sendJson(res, status, data) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  };
  res.writeHead(status, headers);
  res.end(JSON.stringify(data));
}

async function readLiveScores() {
  if (!LIVE_SCORES_URL) {
    return {
      updatedAt: new Date().toISOString(),
      sourceAvailable: false,
      games: [],
    };
  }

  const response = await fetch(LIVE_SCORES_URL, {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`Live scores ${response.status}`);
  const data = await response.json();
  const games = Array.isArray(data.games) ? data.games : [];
  return {
    updatedAt: new Date().toISOString(),
    sourceAvailable: true,
    games: games.map((game) => {
      const homeScore = Number(game.home_score);
      const awayScore = Number(game.away_score);
      const finished = String(game.finished).toUpperCase() === "TRUE";
      const hasNumericScore = Number.isFinite(homeScore) && Number.isFinite(awayScore);
      return {
        matchNumber: Number(game.id),
        homeTeam: game.home_team_name_en,
        awayTeam: game.away_team_name_en,
        homeScore: hasNumericScore ? homeScore : null,
        awayScore: hasNumericScore ? awayScore : null,
        finished,
        confirmed: finished && hasNumericScore,
        minute: game.time_elapsed || "notstarted",
        homeScorers: game.home_scorers,
        awayScorers: game.away_scorers,
      };
    }).filter((game) => Number.isFinite(game.matchNumber)),
  };
}

function serveFile(req, res) {
  const urlPath = new URL(req.url, `http://${req.headers.host}`).pathname;
  const requestedPath = urlPath === "/" ? "/index.html" : urlPath;
  const filePath = path.normalize(path.join(ROOT, requestedPath));

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
    });
    res.end(content);
  });
}

function localUrls() {
  const urls = [`http://localhost:${PORT}`];
  for (const addresses of Object.values(os.networkInterfaces())) {
    for (const address of addresses || []) {
      if (address.family === "IPv4" && !address.internal) {
        urls.push(`http://${address.address}:${PORT}`);
      }
    }
  }
  return urls;
}

if (!SUPABASE_ENABLED) ensureStateFile();

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/api/state" && req.method === "GET") {
      sendJson(res, 200, await readState());
      return;
    }

    if (req.url === "/api/live" && req.method === "GET") {
      sendJson(res, 200, await readLiveScores());
      return;
    }

    if (req.url === "/api/state" && req.method === "POST") {
      const body = JSON.parse(await readBody(req) || "{}");
      try {
        let next;
        if (body.action === "savePick") next = await savePick(body);
        else if (body.action === "saveProfile") next = await saveProfile(body);
        else if (body.action === "saveResult") next = await saveResult(body);
        else throw new Error("Acción inválida");
        sendJson(res, 200, next);
      } catch (error) {
        sendJson(res, 403, { error: error.message });
      }
      return;
    }

    serveFile(req, res);
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: "Server error" });
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("Kevin vs Ivonne · Mundial 2026");
  console.log(localUrls().join("\n"));
});
