const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'disease_interactive_modules.json');
const records = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const requiredModules = ['panorama', 'mecanismo', 'manifestaciones', 'diagnostico', 'evolucion', 'aplicacion', 'atlas'];
const errors = [];

records.forEach((record) => {
  const ids = (record.modules || []).map((module) => module.module_id);
  requiredModules.forEach((id) => {
    if (!ids.includes(id)) errors.push(`${record.disease_code}: falta modulo ${id}`);
  });
  if (new Set(ids).size !== ids.length) errors.push(`${record.disease_code}: modulos duplicados`);
  (record.modules || []).forEach((module) => {
    if (!module.guiding_question) errors.push(`${record.disease_code}/${module.module_id}: falta pregunta guia`);
    if (!module.learning_objective) errors.push(`${record.disease_code}/${module.module_id}: falta objetivo`);
  });
  const atlas = (record.modules || []).find((module) => module.module_id === 'atlas');
  (atlas?.visual_tasks || []).forEach((task) => {
    if (task.asset_status !== 'pending_owner_assignment') errors.push(`${record.disease_code}/atlas: imagen asignada sin propietario`);
  });
});

console.log(`Enfermedades interactivas: ${records.length}`);
console.log(`Modulos esperados por enfermedad: ${requiredModules.length}`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Auditoria interactiva OK: sin errores.');
