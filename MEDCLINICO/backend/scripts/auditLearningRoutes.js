const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const diseasesPath = path.join(dataDir, 'diseases.json');
const learningPath = path.join(dataDir, 'disease_learning_objects.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const diseases = readJson(diseasesPath);
const learningObjects = readJson(learningPath);
const routedCodes = new Set(learningObjects.map((item) => item.disease_code));

const bySystem = diseases.reduce((acc, disease) => {
  const system = disease.system || 'Sin sistema';
  if (!acc[system]) {
    acc[system] = {
      total: 0,
      routed: 0,
      missing: []
    };
  }

  acc[system].total += 1;
  if (routedCodes.has(disease.disease_code)) {
    acc[system].routed += 1;
  } else {
    acc[system].missing.push(`${disease.disease_code} ${disease.name}`);
  }

  return acc;
}, {});

const systems = Object.entries(bySystem).sort(([a], [b]) => a.localeCompare(b));
const totalDiseases = diseases.length;
const totalRoutes = learningObjects.length;

console.log(`Enfermedades catalogadas: ${totalDiseases}`);
console.log(`Rutas didacticas internas: ${totalRoutes}`);
console.log('');
console.log('Cobertura por sistema:');

for (const [system, summary] of systems) {
  const percent = Math.round((summary.routed / summary.total) * 100);
  const missingPreview = summary.missing.slice(0, 5).join('; ');
  const suffix = summary.missing.length > 5 ? `; +${summary.missing.length - 5} mas` : '';
  console.log(`- ${system}: ${summary.routed}/${summary.total} (${percent}%)`);
  if (summary.missing.length > 0) {
    console.log(`  faltan: ${missingPreview}${suffix}`);
  }
}
