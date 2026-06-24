import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveMatchResult, buildGroupStandings, matchLiveScoreToFixture } from './resultUtils.mjs';

test('resolveMatchResult uses live scores when available', () => {
  const result = resolveMatchResult({
    matchNumber: 12,
    stateResults: {},
    liveScores: { 12: { homeScore: 2, awayScore: 1, finished: true } },
  });

  assert.deepEqual(result, { home: 2, away: 1 });
});

test('matchLiveScoreToFixture aligns live data by team names', () => {
  const fixtures = [
    { matchNumber: 1, homeTeam: 'Mexico', awayTeam: 'South Africa' },
    { matchNumber: 2, homeTeam: 'Brazil', awayTeam: 'Argentina' },
  ];

  const matchNumber = matchLiveScoreToFixture({ home_team_name_en: 'Mexico', away_team_name_en: 'South Africa' }, fixtures);

  assert.equal(matchNumber, 1);
});

test('matchLiveScoreToFixture prefers team-name matching over a conflicting direct match number', () => {
  const fixtures = [
    { matchNumber: 23, homeTeam: 'Portugal', awayTeam: 'Congo DR' },
    { matchNumber: 48, homeTeam: 'Colombia', awayTeam: 'Congo DR' },
  ];

  const matchNumber = matchLiveScoreToFixture({ matchNumber: 23, home_team_name_en: 'Colombia', away_team_name_en: 'Democratic Republic of the Congo' }, fixtures);

  assert.equal(matchNumber, 48);
});

test('buildGroupStandings awards points from live scores', () => {
  const fixtures = [
    { matchNumber: 1, stage: 'group-stage', group: 'A', homeTeam: 'Mexico', awayTeam: 'South Africa' },
    { matchNumber: 2, stage: 'group-stage', group: 'A', homeTeam: 'Brazil', awayTeam: 'Argentina' },
  ];

  const standings = buildGroupStandings(fixtures, {}, {
    1: { homeScore: 2, awayScore: 0, finished: true },
    2: { homeScore: 1, awayScore: 1, finished: true },
  });

  assert.equal(standings.A[0].team, 'Mexico');
  assert.equal(standings.A[0].pts, 3);

  const standingsByTeam = Object.fromEntries(standings.A.map((entry) => [entry.team, entry]));
  assert.equal(standingsByTeam['South Africa']?.pts, 0);
  assert.equal(standingsByTeam.Brazil?.pts, 1);
  assert.equal(standingsByTeam.Argentina?.pts, 1);
});
