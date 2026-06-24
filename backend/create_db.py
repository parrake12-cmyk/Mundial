import json
import sqlite3
from pathlib import Path

base_path = Path(__file__).resolve().parent

def load_json(filename):
    with open(base_path / 'data' / filename, encoding='utf8') as handle:
        return json.load(handle)

image_catalog = {
    'REN-001': 'images/healthicons/kidneys.svg',
    'RESP-001': 'images/healthicons/lungs.svg',
    'HEP-001': 'images/healthicons/liver.svg',
    'CARD-001': 'images/healthicons/heart-organ.svg',
    'ENDO-001': 'images/healthicons/pancreas.svg',
    'CARD-002': 'images/healthicons/blood-vessel.svg',
    'RESP-002': 'images/healthicons/lungs.svg',
    'HEMA-001': 'images/healthicons/blood-cells.svg',
    'INF-001': 'images/healthicons/bacteria.svg',
    'INF-002': 'images/healthicons/lungs.svg',
    'ONC-001': 'images/healthicons/tumour.svg',
    'DIG-001': 'images/healthicons/intestine.svg',
    'DIG-002': 'images/healthicons/gallbladder.svg',
    'NEU-001': 'images/healthicons/neurology.svg',
    'DERM-001': 'images/healthicons/tissue.svg',
    'ORL-001': 'images/healthicons/ear.svg',
    'ENDO-002': 'images/healthicons/thyroid.svg',
    'CARD-003': 'images/healthicons/heart-organ.svg',
    'RESP-003': 'images/healthicons/lungs.svg',
    'DIG-003': 'images/healthicons/stomach.svg',
    'MUS-001': 'images/healthicons/joints.svg',
    'INF-003': 'images/healthicons/bladder.svg',
    'PSY-001': 'images/healthicons/neurology.svg',
    'ONC-002': 'images/healthicons/breasts.svg',
    'NUT-001': 'images/healthicons/body.svg'
}

conn = sqlite3.connect(base_path / 'medlearn.db')
cur = conn.cursor()

cur.execute('''
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
''')

existing_columns = [row[1] for row in cur.execute("PRAGMA table_info(diseases)").fetchall()]
if 'image_url' not in existing_columns:
    cur.execute('ALTER TABLE diseases ADD COLUMN image_url TEXT')
for column in ['causes', 'complications', 'prevention', 'treatment_overview', 'pathophysiology', 'staging', 'differential_diagnosis', 'red_flags', 'monitoring', 'patient_education', 'last_reviewed_at', 'source_notes']:
    if column not in existing_columns:
        cur.execute(f'ALTER TABLE diseases ADD COLUMN {column} TEXT')
if 'quality_level' not in existing_columns:
    cur.execute('ALTER TABLE diseases ADD COLUMN quality_level INTEGER')

cur.execute('''
CREATE TABLE IF NOT EXISTS medical_assets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  disease_code TEXT,
  asset_type TEXT,
  title TEXT,
  description TEXT,
  source_name TEXT,
  source_url TEXT,
  license TEXT,
  local_path TEXT,
  affected_area TEXT,
  educational_note TEXT
);
''')

cur.execute('''
DELETE FROM medical_assets
WHERE id NOT IN (
  SELECT MIN(id)
  FROM medical_assets
  GROUP BY disease_code, title, description, local_path
);
''')

cur.execute('''
CREATE UNIQUE INDEX IF NOT EXISTS idx_medical_assets_unique
ON medical_assets (disease_code, title, description, local_path);
''')

cur.execute('''
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
''')

cur.execute('''
CREATE TABLE IF NOT EXISTS learning_questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  case_code TEXT,
  disease_code TEXT,
  question TEXT,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  correct_option TEXT,
  explanation TEXT
);
''')

cur.execute('''
DELETE FROM learning_questions
WHERE id NOT IN (
  SELECT MIN(id)
  FROM learning_questions
  GROUP BY case_code, disease_code, question
);
''')

cur.execute('''
CREATE UNIQUE INDEX IF NOT EXISTS idx_learning_questions_unique
ON learning_questions (case_code, disease_code, question);
''')

cur.executemany('''
INSERT INTO diseases (
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
  image_url = excluded.image_url
''', [(
    d['disease_code'],
    d['name'],
    d['system'],
    d['organ'],
    d['definition'],
    d.get('causes', ''),
    d['symptoms'],
    d['risk_factors'],
    d['diagnostic_tests'],
    d.get('complications', ''),
    d.get('prevention', ''),
    d.get('treatment_overview', ''),
    d.get('pathophysiology', ''),
    d.get('staging', ''),
    d.get('differential_diagnosis', ''),
    d.get('red_flags', ''),
    d.get('monitoring', ''),
    d.get('patient_education', ''),
    d.get('quality_level', 0),
    d.get('last_reviewed_at', ''),
    d.get('source_notes', ''),
    d['educational_explanation'],
    d['source'],
    image_catalog.get(d['disease_code'], d.get('image_url', ''))
) for d in load_json('diseases.json')])

cur.executemany(
    'UPDATE diseases SET image_url = ? WHERE disease_code = ?',
    [(image_url, disease_code) for disease_code, image_url in image_catalog.items()]
)

cur.executemany('''
INSERT OR IGNORE INTO medical_assets (
  disease_code, asset_type, title, description, source_name, source_url, license, local_path, affected_area, educational_note
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
''', [(
    a['disease_code'],
    a['asset_type'],
    a['title'],
    a['description'],
    a['source_name'],
    a['source_url'],
    a['license'],
    a['local_path'],
    a['affected_area'],
    a['educational_note']
) for a in load_json('medical_assets.json')])

cur.executemany('''
INSERT OR IGNORE INTO clinical_cases (
  case_code, disease_code, age, sex, reason, symptoms, history, vital_signs, lab_results, probable_diagnosis, final_diagnosis, teaching_note
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
''', [(
    c['case_code'],
    c['disease_code'],
    c['age'],
    c['sex'],
    c['reason'],
    c['symptoms'],
    c['history'],
    c['vital_signs'],
    c['lab_results'],
    c['probable_diagnosis'],
    c['final_diagnosis'],
    c['teaching_note']
) for c in load_json('clinical_cases.json')])

cur.executemany('''
INSERT OR IGNORE INTO learning_questions (
  case_code, disease_code, question, option_a, option_b, option_c, option_d, correct_option, explanation
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
''', [(
    q['case_code'],
    q['disease_code'],
    q['question'],
    q['option_a'],
    q['option_b'],
    q['option_c'],
    q['option_d'],
    q['correct_option'],
    q['explanation']
) for q in load_json('learning_questions.json')])

conn.commit()
conn.close()
print('Base de datos creada o actualizada desde JSON en', base_path / 'medlearn.db')
