import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveMatchResult, buildGroupStandings } from './resultUtils.mjs';

test('resolveMatchResult uses live scores when available', () => {
  const result = resolveMatchResult({
    matchNumber: 12,
    stateResults: {},
    liveScores: { 12: { homeScore: 2, awayScore: 1, finished: true } },
  });

  assert.deepEqual(result, { home: 2, away: 1 });
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
