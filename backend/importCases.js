const db = require('./database');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data', 'clinical_cases.json');
const cases = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const createTable = `
CREATE TABLE IF NOT EXISTS clinical_cases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  case_code TEXT UNIQUE,
  disease_code TEXT,
  age INTEGER,
  sex TEXT,
  reason TEXT,
  symptoms TEXT,
  history TEXT,
  vital_signs TEXT,
  lab_results TEXT,
  probable_diagnosis TEXT,
  final_diagnosis TEXT,
  teaching_note TEXT
);
`;

db.serialize(() => {
  db.run(createTable);
  const stmt = db.prepare(`INSERT OR IGNORE INTO clinical_cases (
    case_code, disease_code, age, sex, reason, symptoms, history, vital_signs, lab_results, probable_diagnosis, final_diagnosis, teaching_note
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  cases.forEach((clinicalCase) => {
    stmt.run(
      clinicalCase.case_code,
      clinicalCase.disease_code,
      clinicalCase.age,
      clinicalCase.sex,
      clinicalCase.reason,
      clinicalCase.symptoms,
      clinicalCase.history,
      clinicalCase.vital_signs,
      clinicalCase.lab_results,
      clinicalCase.probable_diagnosis,
      clinicalCase.final_diagnosis,
      clinicalCase.teaching_note
    );
  });

  stmt.finalize();
  console.log(`Importados ${cases.length} casos clínicos desde ${dataPath}`);
});
