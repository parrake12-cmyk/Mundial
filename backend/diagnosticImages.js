const kvasirSegSource = {
  source_name: 'Kvasir-SEG / Simula Research Laboratory',
  source_url: 'https://datasets.simula.no/kvasir-seg/',
  license: 'Dataset abierto para investigacion y educacion; requiere citar el paper Kvasir-SEG'
};

const kvasirSource = {
  source_name: 'Kvasir / Simula Research Laboratory',
  source_url: 'https://datasets.simula.no/kvasir/',
  license: 'Uso restringido a investigacion y educacion; requiere citar el paper Kvasir'
};

const diagnosticImages = [
  {
    id: 'ANAT-001',
    disease_code: null,
    case_code: null,
    title: 'Mapa anatómico de órganos internos',
    modality: 'Anatomía',
    local_path: 'images/diagnostics/internal-organs.png',
    source_name: 'Wikimedia Commons',
    source_url: 'https://commons.wikimedia.org/wiki/File:Internal_organs.png',
    license: 'CC0 1.0',
    educational_note: 'Imagen base para ubicar órganos y relacionar cada enfermedad con su zona anatómica.'
  },
  {
    id: 'KVASIR-ZLINE-001',
    disease_code: 'DIG-003',
    case_code: null,
    title: 'Línea Z normal en endoscopia alta',
    modality: 'Endoscopia',
    local_path: 'images/diagnostics/datasets/kvasir-samples/z-line.jpg',
    ...kvasirSource,
    educational_note: 'Landmark real de Kvasir para ubicar la unión escamocolumnar antes de buscar esofagitis o Barrett.'
  },
  {
    id: 'KVASIR-ESOPHAGITIS-001',
    disease_code: 'DIG-003',
    case_code: null,
    title: 'Esofagitis en endoscopia alta',
    modality: 'Endoscopia',
    local_path: 'images/diagnostics/datasets/kvasir-samples/esophagitis.jpg',
    ...kvasirSource,
    educational_note: 'Imagen real representativa del dataset Kvasir para relacionar ERGE con ruptura mucosa en esófago distal.'
  },
  {
    id: 'KVASIR-PYLORUS-GASTRITIS-001',
    disease_code: 'DIG-004',
    case_code: null,
    title: 'Píloro normal en gastroscopia',
    modality: 'Endoscopia',
    local_path: 'images/diagnostics/datasets/kvasir-samples/pylorus.jpg',
    ...kvasirSource,
    educational_note: 'Landmark real para orientar estómago distal y salida al duodeno al estudiar gastritis o dispepsia.'
  },
  {
    id: 'KVASIR-PYLORUS-ULCER-001',
    disease_code: 'DIG-005',
    case_code: null,
    title: 'Píloro normal como referencia anatómica',
    modality: 'Endoscopia',
    local_path: 'images/diagnostics/datasets/kvasir-samples/pylorus.jpg',
    ...kvasirSource,
    educational_note: 'Referencia real para ubicar antro, píloro y duodeno antes de buscar úlcera o sangrado.'
  },
  {
    id: 'KVASIR-UC-001',
    disease_code: 'RARE-004',
    case_code: null,
    title: 'Colitis ulcerosa en colonoscopia',
    modality: 'Colonoscopia',
    local_path: 'images/diagnostics/datasets/kvasir-samples/ulcerative-colitis.jpg',
    ...kvasirSource,
    educational_note: 'Imagen real representativa de colitis ulcerosa con inflamación, sangrado y ulceración mucosa.'
  },
  {
    id: 'KVASIR-CECUM-EII-001',
    disease_code: 'DIG-007',
    case_code: null,
    title: 'Ciego normal en colonoscopia',
    modality: 'Colonoscopia',
    local_path: 'images/diagnostics/datasets/kvasir-samples/cecum.jpg',
    ...kvasirSource,
    educational_note: 'Landmark real para confirmar orientación en colonoscopia antes de interpretar inflamación o lesiones.'
  },
  {
    id: 'KVASIR-DIG-EII-UC-001',
    disease_code: 'DIG-007',
    case_code: null,
    title: 'Colitis ulcerosa como patrón de EII',
    modality: 'Colonoscopia',
    local_path: 'images/diagnostics/datasets/kvasir-samples/ulcerative-colitis.jpg',
    ...kvasirSource,
    educational_note: 'Imagen real para comparar inflamación difusa de colitis ulcerosa frente a lesiones focales.'
  },
  {
    id: 'KVASIR-CECUM-CRC-001',
    disease_code: 'ONC-003',
    case_code: null,
    title: 'Ciego normal como referencia de colonoscopia completa',
    modality: 'Colonoscopia',
    local_path: 'images/diagnostics/datasets/kvasir-samples/cecum.jpg',
    ...kvasirSource,
    educational_note: 'Referencia real para hablar de intubación cecal, calidad del examen y búsqueda sistemática de pólipos.'
  },
  {
    id: 'KVASIR-POLYP-SAMPLE-001',
    disease_code: 'ONC-003',
    case_code: null,
    title: 'Pólipo colorrectal en Kvasir',
    modality: 'Colonoscopia',
    local_path: 'images/diagnostics/datasets/kvasir-samples/polyp.jpg',
    ...kvasirSource,
    educational_note: 'Imagen real representativa de pólipo, útil para hablar de detección, resección y prevención de cáncer colorrectal.'
  },
  {
    id: 'KVASIR-DYED-LIFTED-POLYP-001',
    disease_code: 'ONC-003',
    case_code: null,
    title: 'Pólipo teñido y elevado',
    modality: 'Colonoscopia terapéutica',
    local_path: 'images/diagnostics/datasets/kvasir-samples/dyed-and-lifted-polyp.jpg',
    ...kvasirSource,
    educational_note: 'Imagen real de técnica de resección mucosa con elevación y tinte para delimitar la lesión.'
  },
  {
    id: 'KVASIR-DYED-RESECTION-MARGIN-001',
    disease_code: 'ONC-003',
    case_code: null,
    title: 'Margen de resección teñido',
    modality: 'Colonoscopia terapéutica',
    local_path: 'images/diagnostics/datasets/kvasir-samples/dyed-resection-margin.jpg',
    ...kvasirSource,
    educational_note: 'Imagen real para discutir completitud de resección y seguimiento de lesiones premalignas.'
  },
  {
    id: 'KVASIR-SEG-POLYP-001',
    disease_code: 'ONC-003',
    case_code: null,
    title: 'Pólipo colorrectal en colonoscopia',
    modality: 'Colonoscopia',
    local_path: 'images/diagnostics/datasets/kvasir-seg/cju5k7r0yf98c09878csbxb4d.jpg',
    ...kvasirSegSource,
    educational_note: 'Imagen real de dataset para reconocer lesión polipoidea y relacionarla con tamizaje/prevención de cáncer colorrectal.'
  },
  {
    id: 'KVASIR-SEG-POLYP-001-MASK',
    disease_code: 'ONC-003',
    case_code: null,
    title: 'Máscara de segmentación del pólipo',
    modality: 'Segmentación',
    local_path: 'images/diagnostics/datasets/kvasir-seg/masks/cju5k7r0yf98c09878csbxb4d.jpg',
    ...kvasirSegSource,
    educational_note: 'Máscara real del dataset para mostrar el área anotada del pólipo.'
  },
  {
    id: 'KVASIR-SEG-POLYP-002',
    disease_code: 'ONC-003',
    case_code: null,
    title: 'Pólipo colorrectal con anotación disponible',
    modality: 'Colonoscopia',
    local_path: 'images/diagnostics/datasets/kvasir-seg/cju5knbbqfipk080128cggukq.jpg',
    ...kvasirSegSource,
    educational_note: 'Ejemplo real para entrenar observación de forma, borde y contraste con mucosa vecina.'
  },
  {
    id: 'KVASIR-SEG-POLYP-002-MASK',
    disease_code: 'ONC-003',
    case_code: null,
    title: 'Máscara de segmentación del pólipo',
    modality: 'Segmentación',
    local_path: 'images/diagnostics/datasets/kvasir-seg/masks/cju5knbbqfipk080128cggukq.jpg',
    ...kvasirSegSource,
    educational_note: 'Anotación binaria real para comparar imagen original y región de interés.'
  },
  {
    id: 'KVASIR-SEG-EII-POLYP-001',
    disease_code: 'DIG-007',
    case_code: null,
    title: 'Colonoscopia real: lesión polipoidea',
    modality: 'Colonoscopia',
    local_path: 'images/diagnostics/datasets/kvasir-seg/cju5woy82m07m08505dmjg7g1.jpg',
    ...kvasirSegSource,
    educational_note: 'Imagen real útil para practicar inspección de mucosa y diferenciar hallazgo focal de inflamación difusa.'
  },
  {
    id: 'KVASIR-SEG-EII-POLYP-001-MASK',
    disease_code: 'DIG-007',
    case_code: null,
    title: 'Máscara de segmentación de la lesión',
    modality: 'Segmentación',
    local_path: 'images/diagnostics/datasets/kvasir-seg/masks/cju5woy82m07m08505dmjg7g1.jpg',
    ...kvasirSegSource,
    educational_note: 'Máscara real para enseñar región de interés y límites de anotación.'
  },
  {
    id: 'KVASIR-SEG-CROHN-POLYP-001',
    disease_code: 'RARE-003',
    case_code: null,
    title: 'Colonoscopia real: lesión focal anotada',
    modality: 'Colonoscopia',
    local_path: 'images/diagnostics/datasets/kvasir-seg/cju8c2rqzs5t80850d0zky5dy.jpg',
    ...kvasirSegSource,
    educational_note: 'Imagen real de colonoscopia para discutir lesiones focales, biopsia y correlación con patrón clínico.'
  },
  {
    id: 'KVASIR-SEG-CROHN-POLYP-001-MASK',
    disease_code: 'RARE-003',
    case_code: null,
    title: 'Máscara de segmentación de la lesión',
    modality: 'Segmentación',
    local_path: 'images/diagnostics/datasets/kvasir-seg/masks/cju8c2rqzs5t80850d0zky5dy.jpg',
    ...kvasirSegSource,
    educational_note: 'Máscara real para comparar lesión visible y anotación.'
  },
  {
    id: 'RESP-001-DX1',
    disease_code: 'RESP-001',
    case_code: 'RESP-001-C1',
    title: 'Radiografía de tórax con neumonía lobar',
    modality: 'Radiografía',
    local_path: '',
    source_name: 'Wikimedia Commons',
    source_url: 'https://commons.wikimedia.org/wiki/File:X-ray_of_lobar_pneumonia.jpg',
    license: 'CC0 1.0',
    educational_note: 'Ejemplo diagnóstico para observar consolidación pulmonar compatible con neumonía.'
  },
  {
    id: 'CARD-001-DX1',
    disease_code: 'CARD-001',
    case_code: 'CARD-001-C1',
    title: 'ECG de infarto agudo de miocardio',
    modality: 'Electrocardiograma',
    local_path: '',
    source_name: 'Wikimedia Commons',
    source_url: 'https://commons.wikimedia.org/wiki/File:Myocardial_infarction_ECG.svg',
    license: 'Licencia abierta en Wikimedia Commons',
    educational_note: 'Recurso para relacionar dolor torácico, biomarcadores y cambios electrocardiográficos.'
  },
  {
    id: 'ENDO-001-DX1',
    disease_code: 'ENDO-001',
    case_code: 'ENDO-001-C1',
    title: 'Páncreas endocrino y exocrino',
    modality: 'Histología',
    local_path: '',
    source_name: 'Wikimedia Commons',
    source_url: 'https://commons.wikimedia.org/wiki/File:The_Endocrine_and_Exocrine_Pancreas_(47725286761).jpg',
    license: 'CC0 1.0',
    educational_note: 'Imagen elaborada para explicar la relación entre páncreas, islotes endocrinos y diabetes.'
  },
  {
    id: 'INF-002-DX1',
    disease_code: 'INF-002',
    case_code: 'INF-002-C1',
    title: 'Radiografía de tórax con opacidades pulmonares',
    modality: 'Radiografía',
    local_path: '',
    source_name: 'Wikimedia Commons / CDC',
    source_url: 'https://commons.wikimedia.org/wiki/File:SARS_xray.jpg',
    license: 'Dominio público',
    educational_note: 'Ejemplo de compromiso pulmonar infeccioso visible en imagen de tórax.'
  }
];

module.exports = diagnosticImages;
