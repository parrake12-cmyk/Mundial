const TEAM_ALIASES = {
  'bosnia & herzegovina': 'Bosnia and Herzegovina',
  'bosnia herzegovina': 'Bosnia and Herzegovina',
  'cabo verde': 'Cabo Verde',
  'cape verde': 'Cabo Verde',
  'czech republic': 'Czechia',
  'cote d ivoire': 'Cote d\'Ivoire',
  'cote divoire': 'Cote d\'Ivoire',
  'dr congo': 'Congo DR',
  'congo dr': 'Congo DR',
  'iran': 'IR Iran',
  'ivory coast': 'Cote d\'Ivoire',
  'south korea': 'Korea Republic',
  'turkey': 'Turkiye',
  'usa': 'United States',
};

const TEAM_DISPLAY_NAMES = {
  'Algeria': 'Argelia',
  'Argentina': 'Argentina',
  'Australia': 'Australia',
  'Austria': 'Austria',
  'Belgium': 'Bélgica',
  'Bosnia and Herzegovina': 'Bosnia y Herzegovina',
  'Brazil': 'Brasil',
  'Cabo Verde': 'Cabo Verde',
  'Canada': 'Canadá',
  'Colombia': 'Colombia',
  'Congo DR': 'RD Congo',
  'Cote d\'Ivoire': 'Costa de Marfil',
  'Croatia': 'Croacia',
  'Curacao': 'Curazao',
  'Czechia': 'Chequia',
  'Ecuador': 'Ecuador',
  'Egypt': 'Egipto',
  'England': 'Inglaterra',
  'France': 'Francia',
  'Germany': 'Alemania',
  'Ghana': 'Ghana',
  'Haiti': 'Haití',
  'IR Iran': 'Irán',
  'Iraq': 'Irak',
  'Japan': 'Japón',
  'Jordan': 'Jordania',
  'Korea Republic': 'Corea del Sur',
  'Mexico': 'México',
  'Morocco': 'Marruecos',
  'Netherlands': 'Países Bajos',
  'New Zealand': 'Nueva Zelanda',
  'Norway': 'Noruega',
  'Panama': 'Panamá',
  'Paraguay': 'Paraguay',
  'Portugal': 'Portugal',
  'Qatar': 'Catar',
  'Saudi Arabia': 'Arabia Saudí',
  'Scotland': 'Escocia',
  'Senegal': 'Senegal',
  'South Africa': 'Sudáfrica',
  'Spain': 'España',
  'Sweden': 'Suecia',
  'Switzerland': 'Suiza',
  'Tunisia': 'Túnez',
  'Turkiye': 'Turquía',
  'United States': 'Estados Unidos',
  'Uruguay': 'Uruguay',
  'Uzbekistan': 'Uzbekistán',
};

function toSlug(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function normalizeTeamName(value) {
  const clean = toSlug(value);
  const canonical = TEAM_ALIASES[clean] || clean;
  return toSlug(canonical);
}

export function getDisplayTeamName(value) {
  const slug = normalizeTeamName(value);
  const match = Object.entries(TEAM_DISPLAY_NAMES).find(([teamName]) => normalizeTeamName(teamName) === slug);
  return match?.[1] || value || '';
}

export function matchLiveScoreToFixture(game, fixtures = []) {
  const home = normalizeTeamName(game?.home_team_name_en || game?.homeTeam || '');
  const away = normalizeTeamName(game?.away_team_name_en || game?.awayTeam || '');
  const directMatchNumber = Number(game?.matchNumber ?? game?.id ?? game?.match_number);
  if (Number.isFinite(directMatchNumber)) {
    const directFixture = fixtures.find((fixture) => fixture.matchNumber === directMatchNumber);
    if (directFixture) return directMatchNumber;
  }

  return fixtures.find((fixture) => {
    const fixtureHome = normalizeTeamName(fixture.homeTeam);
    const fixtureAway = normalizeTeamName(fixture.awayTeam);
    return (fixtureHome === home && fixtureAway === away) || (fixtureHome === away && fixtureAway === home);
  })?.matchNumber ?? null;
}

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
