// utils.js - Utilidades generales
function escapeHTML(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function normalizeText(value) {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

const diseaseImageCatalog = {
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
};

function getImageForDisease(disease) {
  const diseaseCode = typeof disease === 'string' ? disease : disease?.disease_code;
  const imagePath = typeof disease === 'string' ? '' : disease?.primary_image || disease?.image_url;
  const fallbackPath = diseaseImageCatalog[diseaseCode] || 'images/default.svg';
  if (!imagePath || !imagePath.trim() || imagePath.endsWith('default.svg')) {
    return fallbackPath;
  }
  return imagePath;
}

function handleImageError(image) {
  image.onerror = null;
  image.src = 'images/default.svg';
}
