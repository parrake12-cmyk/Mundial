const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const db = require('./database');
const diagnosticImages = require('./diagnosticImages');
const knowledgeSources = require('./knowledgeSources');
const sourceCatalog = require('./data/source_catalog.json');
const diseaseSources = require('./data/disease_sources.json');
const medlinePlusTopics = require('./data/external/medlineplus_topics.json');
const medlinePlusMatches = require('./data/external/disease_medlineplus_matches.json');
const diseaseLearningObjectsPath = path.join(__dirname, 'data', 'disease_learning_objects.json');
const diagnosticTestBankPath = path.join(__dirname, 'data', 'diagnostic_test_bank.json');
const laboratorySampleBankPath = path.join(__dirname, 'data', 'laboratory_sample_bank.json');
const endoscopyAtlasBankPath = path.join(__dirname, 'data', 'endoscopy_atlas_bank.json');
const diagnosticProfilesPath = path.join(__dirname, 'data', 'disease_diagnostic_profiles.json');
const analyteCatalogPath = path.join(__dirname, 'data', 'analyte_catalog.json');
const analytePopulationProfilesPath = path.join(__dirname, 'data', 'analyte_population_profiles.json');
const interactiveModulesPath = path.join(__dirname, 'data', 'disease_interactive_modules.json');
const renalImageCatalogPath = path.join(__dirname, 'data', 'renal_image_catalog.json');

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origen no permitido por CORS'));
  }
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

function readDiseaseLearningObjects() {
  return JSON.parse(fs.readFileSync(diseaseLearningObjectsPath, 'utf8'));
}

function readDiagnosticTestBank() {
  return JSON.parse(fs.readFileSync(diagnosticTestBankPath, 'utf8'));
}

function readLaboratorySampleBank() {
  return JSON.parse(fs.readFileSync(laboratorySampleBankPath, 'utf8'));
}

function readEndoscopyAtlasBank() {
  return JSON.parse(fs.readFileSync(endoscopyAtlasBankPath, 'utf8'));
}

function readDiagnosticProfiles() {
  return JSON.parse(fs.readFileSync(diagnosticProfilesPath, 'utf8'));
}

function readAnalyteCatalog() {
  return JSON.parse(fs.readFileSync(analyteCatalogPath, 'utf8'));
}

function readAnalytePopulationProfiles() {
  return JSON.parse(fs.readFileSync(analytePopulationProfilesPath, 'utf8'));
}

function readInteractiveModules() {
  return JSON.parse(fs.readFileSync(interactiveModulesPath, 'utf8'));
}

function readRenalImageCatalog() {
  return JSON.parse(fs.readFileSync(renalImageCatalogPath, 'utf8'));
}

app.get('/enfermedades', (req, res) => {
  const sql = `
    SELECT
      d.*,
      COALESCE(c.case_count, 0) AS case_count,
      COALESCE(a.asset_count, 0) AS asset_count,
      COALESCE(q.question_count, 0) AS question_count,
      COALESCE(NULLIF(d.image_url, ''), a.primary_asset, 'images/default.svg') AS primary_image
    FROM diseases d
    LEFT JOIN (
      SELECT disease_code, COUNT(DISTINCT case_code) AS case_count
      FROM clinical_cases
      GROUP BY disease_code
    ) c ON c.disease_code = d.disease_code
    LEFT JOIN (
      SELECT
        disease_code,
        COUNT(DISTINCT title) AS asset_count,
        MIN(NULLIF(local_path, '')) AS primary_asset
      FROM medical_assets
      GROUP BY disease_code
    ) a ON a.disease_code = d.disease_code
    LEFT JOIN (
      SELECT disease_code, COUNT(*) AS question_count
      FROM learning_questions
      GROUP BY disease_code
    ) q ON q.disease_code = d.disease_code
    ORDER BY d.name
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/repositorio/resumen', (req, res) => {
  const summary = {};
  db.serialize(() => {
    db.get('SELECT COUNT(*) AS total FROM diseases', [], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      summary.diseases = row.total;
    });
    db.get('SELECT COUNT(DISTINCT case_code) AS total FROM clinical_cases', [], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      summary.cases = row.total;
    });
    db.get('SELECT COUNT(DISTINCT disease_code || title) AS total FROM medical_assets', [], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      summary.assets = row.total;
    });
    db.get('SELECT COUNT(*) AS total FROM learning_questions', [], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      summary.questions = row.total;
    });
    db.all('SELECT system, COUNT(*) AS total FROM diseases GROUP BY system ORDER BY system', [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      summary.systems = rows;
      res.json(summary);
    });
  });
});

app.get('/recursos/:diseaseCode', (req, res) => {
  const sql = `
    SELECT
      disease_code,
      asset_type,
      title,
      description,
      source_name,
      source_url,
      license,
      local_path,
      affected_area,
      educational_note
    FROM medical_assets
    WHERE disease_code = ?
    GROUP BY disease_code, title, description, local_path
    ORDER BY title
  `;
  db.all(sql, [req.params.diseaseCode], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/imagenes/enfermedad/:diseaseCode', (req, res) => {
  const images = diagnosticImages.filter((image) => {
    return !image.case_code && (!image.disease_code || image.disease_code === req.params.diseaseCode);
  });
  res.json(images);
});

app.get('/imagenes/caso/:caseCode', (req, res) => {
  const images = diagnosticImages.filter((image) => image.case_code === req.params.caseCode);
  res.json(images);
});

app.get('/imagenes/diagnosticas', (req, res) => {
  res.json(diagnosticImages);
});

app.get('/fuentes/conocimiento', (req, res) => {
  res.json(knowledgeSources);
});

app.get('/fuentes/catalogo', (req, res) => {
  res.json(sourceCatalog);
});

app.get('/fuentes/enfermedades', (req, res) => {
  res.json(diseaseSources);
});

app.get('/fuentes/enfermedades/:diseaseCode', (req, res) => {
  const diseaseCode = req.params.diseaseCode;
  const records = diseaseSources.filter((item) => item.disease_code === diseaseCode);
  if (records.length === 0) {
    return res.status(404).json({ error: 'No hay fuentes registradas para esta enfermedad.' });
  }

  const sourceIds = records.map((r) => r.source_id).filter(Boolean);
  const sources = sourceCatalog.filter((source) => sourceIds.includes(source.id));
  res.json({ disease_code: diseaseCode, total: records.length, links: records, sources });
});

app.get('/fuentes/medlineplus', (req, res) => {
  const summary = {
    total_topics: medlinePlusTopics.length,
    matched_diseases: medlinePlusMatches.filter((item) => item.matches.length > 0).length,
    generated_from: 'MedlinePlus Health Topic XML 2026-05-20'
  };
  res.json(summary);
});

app.get('/fuentes/medlineplus/:diseaseCode', (req, res) => {
  const record = medlinePlusMatches.find((item) => item.disease_code === req.params.diseaseCode);
  if (!record) {
    return res.status(404).json({ error: 'No hay coincidencias MedlinePlus para esta enfermedad.' });
  }

  const topics = record.matches.map((match) => {
    const topic = medlinePlusTopics.find((item) => item.id === match.medline_id);
    return {
      ...match,
      summary: topic ? topic.summary : '',
      also_called: topic ? topic.also_called : [],
      groups: topic ? topic.groups : [],
      sites: topic ? topic.sites.slice(0, 12) : []
    };
  });

  res.json({ ...record, topics });
});

app.get('/aprendizaje/enfermedades/:diseaseCode', (req, res) => {
  let diseaseLearningObjects = [];
  try {
    diseaseLearningObjects = readDiseaseLearningObjects();
  } catch (error) {
    return res.status(500).json({ error: 'No se pudo leer la ruta de aprendizaje local.' });
  }

  const record = diseaseLearningObjects.find((item) => item.disease_code === req.params.diseaseCode);
  if (!record) {
    return res.status(404).json({ error: 'No hay objeto de aprendizaje para esta enfermedad.' });
  }

  res.json(record);
});

app.get('/aprendizaje/resumen', (req, res) => {
  let diseaseLearningObjects = [];
  try {
    diseaseLearningObjects = readDiseaseLearningObjects();
  } catch (error) {
    return res.status(500).json({ error: 'No se pudo leer la ruta de aprendizaje local.' });
  }

  const routedCodes = new Set(diseaseLearningObjects.map((item) => item.disease_code));
  db.all('SELECT disease_code, name, system, organ FROM diseases ORDER BY system, name', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const bySystem = rows.reduce((acc, disease) => {
      const system = disease.system || 'Sin sistema';
      if (!acc[system]) {
        acc[system] = {
          system,
          total: 0,
          routed: 0,
          missing: []
        };
      }

      acc[system].total += 1;
      if (routedCodes.has(disease.disease_code)) {
        acc[system].routed += 1;
      } else {
        acc[system].missing.push({
          disease_code: disease.disease_code,
          name: disease.name,
          organ: disease.organ
        });
      }

      return acc;
    }, {});

    const systems = Object.values(bySystem)
      .map((system) => ({
        ...system,
        coverage: system.total === 0 ? 0 : Number((system.routed / system.total).toFixed(3))
      }))
      .sort((a, b) => a.system.localeCompare(b.system));

    res.json({
      total_diseases: rows.length,
      learning_routes: diseaseLearningObjects.length,
      systems
    });
  });
});

app.get('/pruebas/enfermedad/:diseaseCode', (req, res) => {
  let testBank = [];
  try {
    testBank = readDiagnosticTestBank();
  } catch (error) {
    return res.status(500).json({ error: 'No se pudo leer el banco local de pruebas diagnosticas.' });
  }

  const diseaseCode = req.params.diseaseCode;
  const tests = testBank.filter((test) => (test.disease_codes || []).includes(diseaseCode));
  res.json({
    disease_code: diseaseCode,
    total: tests.length,
    tests
  });
});

app.get('/pruebas/sistema/:system', (req, res) => {
  let testBank = [];
  try {
    testBank = readDiagnosticTestBank();
  } catch (error) {
    return res.status(500).json({ error: 'No se pudo leer el banco local de pruebas diagnosticas.' });
  }

  const system = String(req.params.system || '').toLowerCase();
  const tests = testBank.filter((test) => String(test.system || '').toLowerCase() === system);
  res.json({
    system: req.params.system,
    total: tests.length,
    tests
  });
});

app.get('/muestras/enfermedad/:diseaseCode', (req, res) => {
  let sampleBank = [];
  try {
    sampleBank = readLaboratorySampleBank();
  } catch (error) {
    return res.status(500).json({ error: 'No se pudo leer el banco local de muestras de laboratorio.' });
  }

  const diseaseCode = req.params.diseaseCode;
  const samples = sampleBank.filter((sample) => (sample.disease_codes || []).includes(diseaseCode));
  res.json({
    disease_code: diseaseCode,
    total: samples.length,
    samples
  });
});

app.get('/muestras/sistema/:system', (req, res) => {
  let sampleBank = [];
  try {
    sampleBank = readLaboratorySampleBank();
  } catch (error) {
    return res.status(500).json({ error: 'No se pudo leer el banco local de muestras de laboratorio.' });
  }

  const system = String(req.params.system || '').toLowerCase();
  const samples = sampleBank.filter((sample) => String(sample.system || '').toLowerCase() === system);
  res.json({
    system: req.params.system,
    total: samples.length,
    samples
  });
});

app.get('/analitos', (req, res) => {
  try {
    const analytes = readAnalyteCatalog();
    const profiles = readAnalytePopulationProfiles();
    const profileByAnalyte = new Map(profiles.map((profile) => [profile.analyte_id, profile]));
    const system = String(req.query.system || '').toLowerCase();
    const specimen = String(req.query.specimen || '').toLowerCase();
    const filtered = analytes.filter((analyte) => {
      const matchesSystem = !system || (analyte.systems || []).some((item) => String(item).toLowerCase() === system);
      const matchesSpecimen = !specimen || String(analyte.specimen_type || '').toLowerCase().includes(specimen);
      return matchesSystem && matchesSpecimen;
    }).map((analyte) => ({
      ...analyte,
      population_profile: profileByAnalyte.get(analyte.analyte_id) || null
    }));
    res.json({ total: filtered.length, analytes: filtered });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo leer el banco local de analitos.' });
  }
});

app.get('/analitos/enfermedad/:diseaseCode', (req, res) => {
  try {
    const diseaseCode = req.params.diseaseCode;
    const analytes = readAnalyteCatalog().filter((analyte) => (analyte.disease_codes || []).includes(diseaseCode));
    const profiles = readAnalytePopulationProfiles();
    const profileByAnalyte = new Map(profiles.map((profile) => [profile.analyte_id, profile]));
    res.json({
      disease_code: diseaseCode,
      total: analytes.length,
      analytes: analytes.map((analyte) => ({
        ...analyte,
        population_profile: profileByAnalyte.get(analyte.analyte_id) || null
      }))
    });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo leer el banco local de analitos.' });
  }
});

app.get('/interactivo/enfermedad/:diseaseCode', (req, res) => {
  try {
    const diseaseCode = req.params.diseaseCode;
    const record = readInteractiveModules().find((item) => item.disease_code === diseaseCode);
    if (!record) return res.status(404).json({ error: 'No hay modulos interactivos para esta enfermedad.' });
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron leer los modulos interactivos.' });
  }
});

app.get('/imagenes/atlas/renal', (req, res) => {
  try {
    const catalog = readRenalImageCatalog();
    const images = catalog.images.filter((image) => ['ready_for_preview', 'approved'].includes(image.status));
    res.json({
      atlas_id: catalog.atlas_id,
      title: catalog.title,
      total: images.length,
      images
    });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo leer el catálogo renal.' });
  }
});

app.get('/endoscopia/enfermedad/:diseaseCode', (req, res) => {
  let atlasBank = [];
  try {
    atlasBank = readEndoscopyAtlasBank();
  } catch (error) {
    return res.status(500).json({ error: 'No se pudo leer el atlas local de endoscopia.' });
  }

  const diseaseCode = req.params.diseaseCode;
  const procedures = atlasBank.filter((procedure) => (procedure.disease_codes || []).includes(diseaseCode));
  res.json({
    disease_code: diseaseCode,
    total: procedures.length,
    procedures
  });
});

app.get('/endoscopia', (req, res) => {
  let atlasBank = [];
  try {
    atlasBank = readEndoscopyAtlasBank();
  } catch (error) {
    return res.status(500).json({ error: 'No se pudo leer el atlas local de endoscopia.' });
  }

  res.json({
    total: atlasBank.length,
    procedures: atlasBank
  });
});

app.get('/diagnostico/enfermedad/:diseaseCode', (req, res) => {
  const diseaseCode = req.params.diseaseCode;
  let profiles = [];
  try {
    profiles = readDiagnosticProfiles();
  } catch (error) {
    return res.status(500).json({ error: 'No se pudo leer el banco de perfiles diagnosticos.' });
  }

  const profile = profiles.find((p) => p.disease_code === diseaseCode);
  if (!profile) {
    return res.status(404).json({ error: 'No hay perfil diagnostico para esta enfermedad.' });
  }

  const sourceIds = profile.source_ids || [];
  const sources = sourceCatalog.filter((source) => sourceIds.includes(source.id));

  let testBank = [];
  try {
    testBank = readDiagnosticTestBank();
  } catch (error) {
    // continuar sin pruebas
  }
  const tests = testBank.filter((test) => (test.disease_codes || []).includes(diseaseCode));

  let sampleBank = [];
  try {
    sampleBank = readLaboratorySampleBank();
  } catch (error) {
    // continuar sin muestras
  }
  const samples = sampleBank.filter((sample) => (sample.disease_codes || []).includes(diseaseCode));

  res.json({
    ...profile,
    sources,
    diagnostic_tests: tests,
    laboratory_samples: samples
  });
});

app.get('/casos', (req, res) => {
  const sql = `
    SELECT
      c.*,
      d.name AS disease_name,
      d.system,
      d.organ,
      COALESCE(q.question_count, 0) AS question_count
    FROM clinical_cases c
    LEFT JOIN diseases d ON d.disease_code = c.disease_code
    LEFT JOIN (
      SELECT case_code, COUNT(*) AS question_count
      FROM learning_questions
      GROUP BY case_code
    ) q ON q.case_code = c.case_code
    ORDER BY d.system, d.name, c.id
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const enrichedRows = rows.map((row) => ({
      ...row,
      diagnostic_count: diagnosticImages.filter((image) => image.case_code === row.case_code).length
    }));
    res.json(enrichedRows);
  });
});

app.get('/casos/:diseaseCode', (req, res) => {
  const sql = 'SELECT * FROM clinical_cases WHERE disease_code = ? ORDER BY id';
  db.all(sql, [req.params.diseaseCode], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/learning/:caseCode', (req, res) => {
  const sql = 'SELECT * FROM learning_questions WHERE case_code = ? ORDER BY id';
  db.all(sql, [req.params.caseCode], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor backend iniciado en http://localhost:${port}`);
});
