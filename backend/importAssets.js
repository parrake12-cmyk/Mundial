const db = require('./database');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data', 'medical_assets.json');
const assets = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const createTable = `
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
`;

db.serialize(() => {
  db.run(createTable);
  db.run(`
    DELETE FROM medical_assets
    WHERE id NOT IN (
      SELECT MIN(id)
      FROM medical_assets
      GROUP BY disease_code, title, description, local_path
    )
  `);
  db.run(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_medical_assets_unique
    ON medical_assets (disease_code, title, description, local_path)
  `);
  const stmt = db.prepare(`INSERT OR IGNORE INTO medical_assets (
    disease_code, asset_type, title, description, source_name, source_url, license, local_path, affected_area, educational_note
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  assets.forEach((asset) => {
    stmt.run(
      asset.disease_code,
      asset.asset_type,
      asset.title,
      asset.description,
      asset.source_name,
      asset.source_url,
      asset.license,
      asset.local_path,
      asset.affected_area,
      asset.educational_note
    );
  });

  stmt.finalize();
  console.log(`Importados ${assets.length} recursos desde ${dataPath}`);
});
