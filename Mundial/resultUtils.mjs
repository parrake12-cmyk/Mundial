export function resolveMatchResult({ matchNumber, stateResults = {}, liveScores = {} }) {
  const live = liveScores[matchNumber];
  if (live && (live.finished || live.minute !== 'notstarted')) {
    return {
      home: Number(live.homeScore ?? 0),
      away: Number(live.awayScore ?? 0),
    };
  }

  const manual = stateResults[matchNumber];
  if (manual && Number.isFinite(manual.home) && Number.isFinite(manual.away)) {
    return {
      home: Number(manual.home),
      away: Number(manual.away),
    };
  }

  return null;
}

export function hasResolvedResult(matchNumber, stateResults = {}, liveScores = {}) {
  return Boolean(resolveMatchResult({ matchNumber, stateResults, liveScores }));
}

export function buildGroupStandings(fixtures, stateResults = {}, liveScores = {}) {
  const groups = {};
  for (const fixture of fixtures.filter((item) => item.stage === 'group-stage')) {
    groups[fixture.group] ||= {};
    ensureTeam(groups[fixture.group], fixture.homeTeam);
    ensureTeam(groups[fixture.group], fixture.awayTeam);

    const result = resolveMatchResult({
      matchNumber: fixture.matchNumber,
      stateResults,
      liveScores,
    });

    if (!result) continue;
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

export function getMatchOutcome(home, away) {
  if (home > away) return 'home';
  if (away > home) return 'away';
  return 'draw';
}
