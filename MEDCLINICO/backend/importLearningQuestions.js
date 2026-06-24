const db = require('./database');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data', 'learning_questions.json');
const questions = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const createTable = `
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
`;

db.serialize(() => {
  db.run(createTable);
  db.run(`
    DELETE FROM learning_questions
    WHERE id NOT IN (
      SELECT MIN(id)
      FROM learning_questions
      GROUP BY case_code, disease_code, question
    )
  `);
  db.run(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_learning_questions_unique
    ON learning_questions (case_code, disease_code, question)
  `);
  const stmt = db.prepare(`INSERT OR IGNORE INTO learning_questions (
    case_code, disease_code, question, option_a, option_b, option_c, option_d, correct_option, explanation
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  questions.forEach((item) => {
    stmt.run(
      item.case_code,
      item.disease_code,
      item.question,
      item.option_a,
      item.option_b,
      item.option_c,
      item.option_d,
      item.correct_option,
      item.explanation
    );
  });

  stmt.finalize();
  console.log(`Importadas ${questions.length} preguntas de aprendizaje desde ${dataPath}`);
});
