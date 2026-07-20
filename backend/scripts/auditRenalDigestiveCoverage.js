/**
 * Script de auditoria para enfermedades renales, digestivas y hepatobiliares.
 * Verifica cobertura de fichas, rutas didacticas, fuentes y consistencia de datos.
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const diseases = JSON.parse(fs.readFileSync(path.join(dataDir, 'diseases.json'), 'utf8'));
const learningObjects = JSON.parse(fs.readFileSync(path.join(dataDir, 'disease_learning_objects.json'), 'utf8'));
const diseaseSources = JSON.parse(fs.readFileSync(path.join(dataDir, 'disease_sources.json'), 'utf8'));
const sourceCatalog = JSON.parse(fs.readFileSync(path.join(dataDir, 'source_catalog.json'), 'utf8'));

const targetCodes = [
  'REN-001','REN-002','REN-003','REN-004','REN-005','REN-006','REN-007','REN-008',
  'DIG-001','DIG-002','DIG-003','DIG-004','DIG-005','DIG-006','DIG-007','DIG-008','DIG-009',
  'RARE-002','RARE-003','RARE-004',
  'HEP-001','HEP-002','HEP-003'
];

const requiredFields = [
  'name','system','organ','definition','causes','symptoms','risk_factors',
  'diagnostic_tests','complications','prevention','treatment_overview',
  'educational_explanation','pathophysiology','staging','differential_diagnosis',
  'red_flags','monitoring','patient_education','quality_level','last_reviewed_at',
  'source','source_notes'
];

let errors = [];
let warnings = [];
let passed = [];

// 1. Verificar que todos los codigos existan
for (const code of targetCodes) {
  const disease = diseases.find(d => d.disease_code === code);
  if (!disease) {
    errors.push(`CRITICO: ${code} no existe en diseases.json`);
    continue;
  }

  // 2. Verificar campos completos
  const missingFields = requiredFields.filter(f => !disease[f] || disease[f].toString().trim() === '');
  if (missingFields.length > 0) {
    if (missingFields.length > 5) {
      errors.push(`${code}: faltan ${missingFields.length} campos: ${missingFields.join(', ')}`);
    } else {
      warnings.push(`${code}: campos incompletos: ${missingFields.join(', ')}`);
    }
  } else {
    passed.push(`${code}: ficha completa`);
  }

  // 3. Verificar ruta didactica
  const hasRoute = learningObjects.find(lo => lo.disease_code === code);
  if (!hasRoute) {
    errors.push(`${code}: sin ruta didactica`);
  } else {
    passed.push(`${code}: ruta didactica OK`);
  }

  // 4. Verificar fuentes
  const sources = diseaseSources.filter(ds => ds.disease_code === code);
  if (sources.length === 0) {
    errors.push(`${code}: sin fuentes registradas`);
  } else {
    for (const src of sources) {
      if (src.source_id) {
        const catalogEntry = sourceCatalog.find(sc => sc.id === src.source_id);
        if (!catalogEntry) {
          warnings.push(`${code}: fuente ${src.source_id} no existe en source_catalog.json`);
        }
      }
    }
    passed.push(`${code}: ${sources.length} fuente(s) registrada(s)`);
  }
}

// 5. Verificar duplicados
const seen = new Set();
for (const d of diseases) {
  if (seen.has(d.disease_code)) {
    errors.push(`CRITICO: codigo duplicado: ${d.disease_code}`);
  }
  seen.add(d.disease_code);
}

// 6. Verificar total de enfermedades
if (diseases.length !== 126) {
  warnings.push(`Total de enfermedades: ${diseases.length} (esperado: 126)`);
}

// Reporte
console.log('=== AUDITORIA RENAL-DIGESTIVO-HEPATOBILIAR ===\n');
console.log(`Total enfermedades objetivo: ${targetCodes.length}`);
console.log(`Total enfermedades en archivo: ${diseases.length}\n`);

console.log('--- ERRORES CRITICOS ---');
if (errors.length === 0) {
  console.log('No hay errores criticos.');
} else {
  errors.forEach(e => console.log('  [ERROR]', e));
}

console.log('\n--- ADVERTENCIAS ---');
if (warnings.length === 0) {
  console.log('No hay advertencias.');
} else {
  warnings.forEach(w => console.log('  [WARN]', w));
}

console.log('\n--- VERIFICACIONES OK ---');
passed.forEach(p => console.log('  [OK]', p));

console.log(`\n--- RESUMEN ---`);
console.log(`Errores: ${errors.length}`);
console.log(`Advertencias: ${warnings.length}`);
console.log(`Verificaciones OK: ${passed.length}`);

if (errors.length > 0) {
  process.exit(1);
}