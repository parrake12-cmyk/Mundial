// app.js - Archivo principal que coordina los módulos
const diseaseList = document.getElementById('diseaseList');
const diseaseDetail = document.getElementById('diseaseDetail');
const analyzeButton = document.getElementById('analyzeButton');
const clinicalInput = document.getElementById('clinicalInput');
const analysisResult = document.getElementById('analysisResult');
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');
const searchInput = document.getElementById('searchInput');
const systemFilter = document.getElementById('systemFilter');
const coverageFilter = document.getElementById('coverageFilter');
const statsStrip = document.getElementById('statsStrip');
const resultCount = document.getElementById('resultCount');
const systemChips = document.getElementById('systemChips');
const caseList = document.getElementById('caseList');
const caseCount = document.getElementById('caseCount');
const caseSearchInput = document.getElementById('caseSearchInput');
const caseSystemFilter = document.getElementById('caseSystemFilter');
const atlasGrid = document.getElementById('atlasGrid');
const moduleButtons = Array.from(document.querySelectorAll('.module-button'));
const modulePanels = Array.from(document.querySelectorAll('.module-panel'));

function showModule(moduleName) {
  moduleButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.moduleTarget === moduleName);
  });

  modulePanels.forEach((panel) => {
    panel.hidden = panel.dataset.module !== moduleName;
  });

  if (moduleName === 'diseases') {
    renderDiseaseRoute();
  }
  if (moduleName === 'atlas') {
    renderVisualAtlas();
  }
}

function handleAppRoute() {
  if (window.location.hash === '#atlas/renal') {
    showModule('atlas');
    setTimeout(() => {
      document.querySelector('.renal-atlas-overview')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
    return;
  }

  renderDiseaseRoute();
}

function initApp() {
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) closeModal();
  });
  analyzeButton.addEventListener('click', analyzeCase);
  searchInput.addEventListener('input', renderList);
  systemFilter.addEventListener('change', renderList);
  coverageFilter.addEventListener('change', renderList);
  caseSearchInput.addEventListener('input', renderCaseList);
  caseSystemFilter.addEventListener('change', renderCaseList);
  moduleButtons.forEach((button) => {
    button.addEventListener('click', () => showModule(button.dataset.moduleTarget));
  });
  window.addEventListener('hashchange', handleAppRoute);

  fetchDiseases();
  fetchCaseRepository();
  if (window.location.hash === '#atlas/renal') {
    showModule('atlas');
  } else {
    showModule('diseases');
  }
}

document.addEventListener('DOMContentLoaded', initApp);
