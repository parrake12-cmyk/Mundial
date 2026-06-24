const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..', '..');
const learningPath = path.join(__dirname, '..', 'data', 'disease_learning_objects.json');
const diseasesJsPath = path.join(rootDir, 'diseases.js');

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s/-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function readGlossaryDefinitions() {
  const source = fs.readFileSync(diseasesJsPath, 'utf8');
  const match = source.match(/const glossaryDefinitions = (\{[\s\S]*?\n\});/);
  if (!match) {
    throw new Error('No se encontro glossaryDefinitions en diseases.js');
  }

  return Function(`"use strict"; return (${match[1]});`)();
}

function hasDefinition(term, glossaryKeys) {
  const key = normalizeText(term);
  if (!key) return false;
  if (glossaryKeys.has(key)) return true;
  return [...glossaryKeys].some((item) => key.includes(item) || item.includes(key));
}

function addTerm(map, code, term) {
  const clean = String(term || '').trim();
  const key = normalizeText(clean);
  if (!key || key.length < 3 || key.length > 42) return;
  if (key.split(' ').length > 4) return;
  if (!map.has(key)) {
    map.set(key, { label: clean, codes: new Set() });
  }
  map.get(key).codes.add(code);
}

const learningObjects = JSON.parse(fs.readFileSync(learningPath, 'utf8'));
const glossary = readGlossaryDefinitions();
const glossaryKeys = new Set(Object.keys(glossary).map(normalizeText));
const termMap = new Map();

for (const route of learningObjects) {
  const code = route.disease_code;
  addTerm(termMap, code, route.organ_focus?.organ);
  for (const region of route.organ_focus?.primary_regions || []) addTerm(termMap, code, region);

  for (const stage of route.stages || []) {
    for (const target of stage.visual_targets || []) addTerm(termMap, code, target);
    for (const lab of stage.key_labs || []) addTerm(termMap, code, lab);
  }

  for (const item of route.imaging_pathway || []) {
    addTerm(termMap, code, item.modality);
    for (const target of item.what_to_look_for || []) addTerm(termMap, code, target);
  }

  for (const item of route.differential_map || []) {
    addTerm(termMap, code, item.condition);
  }
}

const terms = [...termMap.values()];
const missing = terms
  .filter((item) => !hasDefinition(item.label, glossaryKeys))
  .sort((a, b) => b.codes.size - a.codes.size || a.label.localeCompare(b.label));

const covered = terms.length - missing.length;
const percent = terms.length ? Math.round((covered / terms.length) * 100) : 100;

console.log(`Terminos detectados en rutas: ${terms.length}`);
console.log(`Terminos con definicion contextual: ${covered}/${terms.length} (${percent}%)`);
console.log(`Terminos por definir: ${missing.length}`);

if (missing.length) {
  console.log('');
  console.log('Prioridad sugerida:');
  for (const item of missing.slice(0, 30)) {
    const codes = [...item.codes].slice(0, 6).join(', ');
    const suffix = item.codes.size > 6 ? `, +${item.codes.size - 6}` : '';
    console.log(`- ${item.label}: ${item.codes.size} ruta(s) (${codes}${suffix})`);
  }
}
