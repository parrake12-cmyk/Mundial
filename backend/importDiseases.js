const db = require('./database');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data', 'diseases.json');
const diseases = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const createTable = `
CREATE TABLE IF NOT EXISTS diseases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  disease_code TEXT UNIQUE,
  name TEXT,
  system TEXT,
  organ TEXT,
  definition TEXT,
  causes TEXT,
  symptoms TEXT,
  risk_factors TEXT,
  diagnostic_tests TEXT,
  complications TEXT,
  prevention TEXT,
  treatment_overview TEXT,
  pathophysiology TEXT,
  staging TEXT,
  differential_diagnosis TEXT,
  red_flags TEXT,
  monitoring TEXT,
  patient_education TEXT,
  quality_level INTEGER,
  last_reviewed_at TEXT,
  source_notes TEXT,
  educational_explanation TEXT,
  source TEXT,
  image_url TEXT
);
`;

db.serialize(() => {
  db.run(createTable);
  [
    ['causes', 'TEXT'],
    ['complications', 'TEXT'],
    ['prevention', 'TEXT'],
    ['treatment_overview', 'TEXT'],
    ['pathophysiology', 'TEXT'],
    ['staging', 'TEXT'],
    ['differential_diagnosis', 'TEXT'],
    ['red_flags', 'TEXT'],
    ['monitoring', 'TEXT'],
    ['patient_education', 'TEXT'],
    ['quality_level', 'INTEGER'],
    ['last_reviewed_at', 'TEXT'],
    ['source_notes', 'TEXT']
  ].forEach(([column, type]) => {
    db.run(`ALTER TABLE diseases ADD COLUMN ${column} ${type}`, (err) => {
      if (err && !String(err.message).includes('duplicate column name')) {
        console.error(`Error agregando columna ${column}:`, err.message);
      }
    });
  });

  const stmt = db.prepare(`INSERT INTO diseases (
    disease_code, name, system, organ, definition, causes, symptoms, risk_factors, diagnostic_tests, complications, prevention, treatment_overview, pathophysiology, staging, differential_diagnosis, red_flags, monitoring, patient_education, quality_level, last_reviewed_at, source_notes, educational_explanation, source, image_url
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(disease_code) DO UPDATE SET
    name = excluded.name,
    system = excluded.system,
    organ = excluded.organ,
    definition = excluded.definition,
    causes = excluded.causes,
    symptoms = excluded.symptoms,
    risk_factors = excluded.risk_factors,
    diagnostic_tests = excluded.diagnostic_tests,
    complications = excluded.complications,
    prevention = excluded.prevention,
    treatment_overview = excluded.treatment_overview,
    pathophysiology = excluded.pathophysiology,
    staging = excluded.staging,
    differential_diagnosis = excluded.differential_diagnosis,
    red_flags = excluded.red_flags,
    monitoring = excluded.monitoring,
    patient_education = excluded.patient_education,
    quality_level = excluded.quality_level,
    last_reviewed_at = excluded.last_reviewed_at,
    source_notes = excluded.source_notes,
    educational_explanation = excluded.educational_explanation,
    source = excluded.source,
    image_url = excluded.image_url`);

  diseases.forEach((disease) => {
    stmt.run(
      disease.disease_code,
      disease.name,
      disease.system,
      disease.organ,
      disease.definition,
      disease.causes || '',
      disease.symptoms,
      disease.risk_factors,
      disease.diagnostic_tests,
      disease.complications || '',
      disease.prevention || '',
      disease.treatment_overview || '',
      disease.pathophysiology || '',
      disease.staging || '',
      disease.differential_diagnosis || '',
      disease.red_flags || '',
      disease.monitoring || '',
      disease.patient_education || '',
      disease.quality_level || 0,
      disease.last_reviewed_at || '',
      disease.source_notes || '',
      disease.educational_explanation,
      disease.source,
      disease.image_url || ''
    );
  });

  stmt.finalize();
  console.log(`Importadas ${diseases.length} enfermedades desde ${dataPath}`);
});
