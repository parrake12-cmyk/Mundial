function sanitizeResults(results = {}) {
  return Object.fromEntries(Object.entries(results || {}).filter(([, result]) => {
    return result?.verified === true
      && Number.isFinite(result.home)
      && Number.isFinite(result.away);
  }));
}

function mergePicks(currentPicks = {}, incomingPicks = {}) {
  const merged = { ...(currentPicks || {}) };
  for (const [matchNumber, players] of Object.entries(incomingPicks || {})) {
    merged[matchNumber] = { ...(merged[matchNumber] || {}) };
    for (const [player, pick] of Object.entries(players || {})) {
      const existing = merged[matchNumber][player];
      if (existing?.locked && !pick?.locked) {
        merged[matchNumber][player] = existing;
        continue;
      }
      merged[matchNumber][player] = { ...(existing || {}), ...(pick || {}) };
    }
  }
  return merged;
}

function mergeResults(currentResults = {}, incomingResults = {}) {
  const merged = { ...(currentResults || {}) };
  for (const [matchNumber, result] of Object.entries(incomingResults || {})) {
    if (!result || typeof result !== "object") continue;
    if (Number.isFinite(Number(result.home)) && Number.isFinite(Number(result.away))) {
      merged[matchNumber] = { ...(merged[matchNumber] || {}), ...result };
    }
  }
  return sanitizeResults(merged);
}

module.exports = {
  sanitizeResults,
  mergePicks,
  mergeResults,
};
