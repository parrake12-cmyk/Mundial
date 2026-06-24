// ai.js - Análisis inteligente de casos clínicos
function analyzeCase() {
  const text = normalizeText(clinicalInput.value.trim());
  if (!text) {
    analysisResult.innerHTML = '<p class="hint">Escribe un caso o una pregunta para recibir retroalimentación.</p>';
    return;
  }

  const diseaseData = getDiseaseData();
  const matches = diseaseData.map((disease) => {
    const symptomScore = String(disease.symptoms || '').split(',').reduce((sum, symptom) => {
      return sum + (text.includes(normalizeText(symptom.trim())) ? 1 : 0);
    }, 0);
    const organScore = text.includes(normalizeText(disease.organ)) ? 1 : 0;
    const systemScore = text.includes(normalizeText(disease.system)) ? 1 : 0;
    return { disease, score: symptomScore + organScore + systemScore };
  });

  matches.sort((a, b) => b.score - a.score);
  const best = matches[0];

  if (!best || best.score === 0) {
    analysisResult.innerHTML = `
      <h3>Retroalimentación</h3>
      <p>No hay una coincidencia clara con los datos actuales. Describe síntomas, órgano afectado o hallazgos clínicos.</p>
    `;
    return;
  }

  analysisResult.innerHTML = `
    <h3>Retroalimentación inteligente</h3>
    <p>El caso parece relacionarse con <strong>${escapeHTML(best.disease.name)}</strong>.</p>
    <p><strong>Ideas clave:</strong> ${escapeHTML(best.disease.symptoms.split(',').slice(0, 3).join(', '))}.</p>
    <p>Revisa la ficha de ${escapeHTML(best.disease.name)} y compara los síntomas con el caso clínico.</p>
  `;
}
