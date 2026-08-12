// cases.js - Manejo de casos clinicos
let currentCaseCode = null;
let caseRepository = [];
let modalReturnFocus = null;

function showModal() {
  modalReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  modalOverlay.classList.remove('hidden');
  modalOverlay.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => modalOverlay.querySelector('.modal')?.focus());
}

async function fetchCaseRepository() {
  try {
    const response = await fetch('/casos');
    if (!response.ok) throw new Error('No se pudo cargar el repositorio de casos.');
    caseRepository = await response.json();
    populateCaseSystemFilter();
    renderCaseList();
  } catch (error) {
    caseList.innerHTML = `<p class="hint">Error al cargar casos: ${escapeHTML(error.message)}</p>`;
  }
}

async function fetchCaseDiagnosticImages(caseCode) {
  const response = await fetch(`/imagenes/caso/${encodeURIComponent(caseCode)}`);
  if (!response.ok) return [];
  return response.json();
}

function populateCaseSystemFilter() {
  const systems = Array.from(new Set(caseRepository.map((item) => item.system).filter(Boolean))).sort();
  caseSystemFilter.innerHTML = '<option value="">Todos los sistemas</option>';

  systems.forEach((system) => {
    const option = document.createElement('option');
    option.value = system;
    option.textContent = system;
    caseSystemFilter.appendChild(option);
  });
}

function getFilteredCases() {
  const query = normalizeText(caseSearchInput.value);
  const system = caseSystemFilter.value;

  return caseRepository.filter((item) => {
    const haystack = normalizeText([
      item.case_code,
      item.disease_name,
      item.system,
      item.organ,
      item.reason,
      item.symptoms,
      item.lab_results
    ].join(' '));

    return (!query || haystack.includes(query)) && (!system || item.system === system);
  });
}

function renderCaseList() {
  const filteredCases = getFilteredCases();
  caseCount.textContent = `${filteredCases.length}`;
  caseList.innerHTML = '';

  if (!filteredCases.length) {
    caseList.innerHTML = '<p class="hint">No hay casos con los filtros actuales.</p>';
    return;
  }

  filteredCases.forEach((caseData) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'case-row';
    button.innerHTML = `
      <span>
        <strong>${escapeHTML(caseData.case_code)}</strong>
        <small>${escapeHTML(caseData.disease_name)} · ${escapeHTML(caseData.system)} · ${escapeHTML(caseData.organ)}</small>
      </span>
      <span>${escapeHTML(caseData.reason)}</span>
      <span class="coverage-row">
        <span>${Number(caseData.question_count || 0)} preguntas</span>
        <span>${Number(caseData.diagnostic_count || 0)} imágenes dx</span>
      </span>
    `;
    button.addEventListener('click', () => openCaseModal(caseData));
    caseList.appendChild(button);
  });
}

async function fetchResources(diseaseCode) {
  const response = await fetch(`/recursos/${encodeURIComponent(diseaseCode)}`);
  if (!response.ok) throw new Error('No se pudieron cargar los recursos.');
  return response.json();
}

async function fetchCases(diseaseCode) {
  const response = await fetch(`/casos/${encodeURIComponent(diseaseCode)}`);
  if (!response.ok) throw new Error('No se pudieron cargar los casos clínicos.');
  return response.json();
}

function renderDiagnosticImage(image) {
  const visual = image.local_path
    ? `<img src="${escapeHTML(image.local_path)}" alt="${escapeHTML(image.title)}" onerror="handleImageError(this)" />`
    : `<div class="image-pending">Fuente pendiente</div>`;

  return `
    <article class="diagnostic-image">
      ${visual}
      <div>
        <strong>${escapeHTML(image.title)}</strong>
        <p>${escapeHTML(image.modality)} · ${escapeHTML(image.license)}</p>
        <p>${escapeHTML(image.educational_note)}</p>
        <a href="${escapeHTML(image.source_url)}" target="_blank" rel="noreferrer">${escapeHTML(image.source_name)}</a>
      </div>
    </article>
  `;
}

async function openCaseModal(caseData) {
  showModal();
  modalContent.innerHTML = '<p>Cargando caso clínico...</p>';

  const images = await fetchCaseDiagnosticImages(caseData.case_code);
  currentCaseCode = caseData.case_code;

  modalContent.innerHTML = `
    <div class="modal-heading">
      <div>
        <span class="badge">${escapeHTML(caseData.case_code)}</span>
        <h2 id="modalTitle">${escapeHTML(caseData.disease_name)}</h2>
        <p>${escapeHTML(caseData.system)} · ${escapeHTML(caseData.organ)}</p>
      </div>
    </div>
    ${renderCaseBody(caseData)}
    <div class="resource-card">
      <h3>Imágenes diagnósticas</h3>
      ${images.length ? images.map(renderDiagnosticImage).join('') : '<p class="hint">Este caso aún no tiene imagen diagnóstica asignada.</p>'}
    </div>
    <div id="quizContainer"></div>
  `;

  document
    .getElementById('solveCaseButton')
    .addEventListener('click', () => loadQuiz(caseData.case_code));
}

function renderCaseBody(caseData) {
  return `
    <div class="case-card">
      <h3>Caso clínico</h3>
      <p><strong>Motivo de consulta:</strong> ${escapeHTML(caseData.reason)}</p>
      <p><strong>Síntomas:</strong> ${escapeHTML(caseData.symptoms)}</p>
      <p><strong>Antecedentes:</strong> ${escapeHTML(caseData.history)}</p>
      <p><strong>Signos vitales:</strong> ${escapeHTML(caseData.vital_signs)}</p>
      <p><strong>Resultados de laboratorio:</strong> ${escapeHTML(caseData.lab_results)}</p>
      <button id="solveCaseButton">Resolver preguntas</button>
    </div>
  `;
}

function renderResource(resource) {
  const image = resource.local_path
    ? `<img src="${escapeHTML(resource.local_path)}" alt="${escapeHTML(resource.title)}" onerror="handleImageError(this)" />`
    : '';

  return `
    <article class="resource-item">
      ${image}
      <div>
        <strong>${escapeHTML(resource.title)}</strong>
        <p>${escapeHTML(resource.description)}</p>
        <p><em>${escapeHTML(resource.educational_note)}</em></p>
      </div>
    </article>
  `;
}

function openModal(disease) {
  renderDetail(disease);
  showModal();
  modalContent.innerHTML = '<p>Cargando caso clínico...</p>';

  Promise.all([fetchResources(disease.disease_code), fetchCases(disease.disease_code)])
    .then(([resources, cases]) => {
      const caseData = cases[0];
      if (caseData) {
        caseData.disease_name = disease.name;
        caseData.system = disease.system;
        caseData.organ = disease.organ;
      }
      currentCaseCode = caseData ? caseData.case_code : null;
      return Promise.all([Promise.resolve(resources), Promise.resolve(caseData), caseData ? fetchCaseDiagnosticImages(caseData.case_code) : Promise.resolve([])]);
    })
    .then(([resources, caseData, diagnosticImages]) => {
      modalContent.innerHTML = `
        <div class="modal-heading">
          <img src="${escapeHTML(getImageForDisease(disease))}" alt="Imagen de ${escapeHTML(disease.name)}" onerror="handleImageError(this)" />
          <div>
            <span class="badge">${escapeHTML(disease.disease_code)}</span>
            <h2 id="modalTitle">${escapeHTML(disease.name)}</h2>
            <p>${escapeHTML(disease.system)} · ${escapeHTML(disease.organ)}</p>
          </div>
        </div>

        <p>${escapeHTML(disease.definition)}</p>

        <div class="resource-card">
          <h3>Recursos anatómicos</h3>
          ${resources.length ? resources.map(renderResource).join('') : '<p>No hay recursos disponibles para esta enfermedad.</p>'}
        </div>

        ${caseData ? renderCaseBody(caseData) : '<div class="case-card"><h3>Caso clínico asociado</h3><p>No hay casos clínicos disponibles para esta enfermedad.</p></div>'}

        <div class="resource-card">
          <h3>Imágenes diagnósticas del caso</h3>
          ${diagnosticImages.length ? diagnosticImages.map(renderDiagnosticImage).join('') : '<p class="hint">Este caso aún no tiene imagen diagnóstica asignada.</p>'}
        </div>

        <div id="quizContainer"></div>
      `;

      if (caseData) {
        document
          .getElementById('solveCaseButton')
          .addEventListener('click', () => loadQuiz(caseData.case_code));
      }
    })
    .catch((error) => {
      modalContent.innerHTML = `<p class="hint">Error al cargar el caso: ${escapeHTML(error.message)}</p>`;
    });
}

function closeModal() {
  modalOverlay.classList.add('hidden');
  modalOverlay.setAttribute('aria-hidden', 'true');
  modalContent.innerHTML = '';
  if (modalReturnFocus?.isConnected) modalReturnFocus.focus();
  modalReturnFocus = null;
}

modalOverlay.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeModal();
    return;
  }
  if (event.key !== 'Tab') return;
  const focusable = Array.from(modalOverlay.querySelectorAll(
    'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )).filter((element) => !element.closest('[hidden]'));
  if (!focusable.length) {
    event.preventDefault();
    modalOverlay.querySelector('.modal')?.focus();
    return;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

function getCurrentCaseCode() {
  return currentCaseCode;
}
