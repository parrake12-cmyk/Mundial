const knowledgeSources = [
  {
    name: 'MedlinePlus Health Topic XML',
    category: 'Resumen clinico',
    type: 'Enfermedades y temas de salud',
    url: 'https://medlineplus.gov/xml.html',
    language: 'Ingles y espanol',
    license_note: 'Uso permitido con atribucion a MedlinePlus.gov segun guia de NLM.',
    value: 'Buen punto de entrada para descripciones claras, sinonimos y enlaces oficiales.'
  },
  {
    name: 'MedlinePlus Web Service',
    category: 'Resumen clinico',
    type: 'Busqueda de temas de salud',
    url: 'https://medlineplus.gov/about/developers/webservices/',
    language: 'Ingles y espanol',
    license_note: 'Servicio publico de NLM; requiere citar MedlinePlus.gov.',
    value: 'Permite enlazar cada enfermedad con su tema oficial correspondiente.'
  },
  {
    name: 'WHO Fact Sheets',
    category: 'Salud publica',
    type: 'Notas descriptivas de enfermedades',
    url: 'https://www.who.int/news-room/fact-sheets',
    language: 'Multilingue',
    license_note: 'Revisar condiciones de uso de OMS antes de reutilizar texto.',
    value: 'Aporta panorama global, carga de enfermedad, prevencion y datos clave.'
  },
  {
    name: 'CDC Temas de salud A-Z',
    category: 'Salud publica',
    type: 'Indice de enfermedades y condiciones',
    url: 'https://www.cdc.gov/spanish/az/temas-salud.html',
    language: 'Espanol',
    license_note: 'Contenido institucional; revisar reutilizacion por recurso.',
    value: 'Util para enfermedades infecciosas, cronicas y material educativo en espanol.'
  },
  {
    name: 'NCBI Bookshelf',
    category: 'Libros',
    type: 'Libros y capitulos biomedicos',
    url: 'https://www.ncbi.nlm.nih.gov/books',
    language: 'Principalmente ingles',
    license_note: 'Hay subconjuntos open access; revisar licencia por libro o capitulo.',
    value: 'Base fuerte para fisiopatologia, anatomia, diagnostico y guias clinicas.'
  },
  {
    name: 'GeneReviews',
    category: 'Libros',
    type: 'Revisiones de enfermedades geneticas',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK1116/',
    language: 'Ingles',
    license_note: 'Consultar copyright y permisos de NCBI Bookshelf por capitulo.',
    value: 'Fuente de alto valor para enfermedades hereditarias, manejo y consejo genetico.'
  },
  {
    name: 'Clinical Methods',
    category: 'Libros',
    type: 'Libro de semiologia clinica',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK201/',
    language: 'Ingles',
    license_note: 'Disponible en NCBI Bookshelf; revisar permisos del titulo.',
    value: 'Sirve para mejorar sintomas, signos, examen fisico y razonamiento clinico.'
  },
  {
    name: 'Health Alterations',
    category: 'Libros',
    type: 'Libro abierto de alteraciones de salud',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK613074/',
    language: 'Ingles',
    license_note: 'Disponible en NCBI Bookshelf; revisar licencia del titulo.',
    value: 'Ayuda a convertir fichas breves en explicaciones por sistemas mas completas.'
  },
  {
    name: 'Human Disease Ontology',
    category: 'Clasificacion',
    type: 'Ontologia de enfermedades',
    url: 'https://github.com/DiseaseOntology/HumanDiseaseOntology',
    language: 'Ingles',
    license_note: 'Repositorio abierto; revisar LICENSE del proyecto.',
    value: 'Sirve para normalizar nombres, jerarquias, sinonimos y familias de enfermedad.'
  },
  {
    name: 'ICD-11 Browser',
    category: 'Clasificacion',
    type: 'Clasificacion internacional de enfermedades',
    url: 'https://icd.who.int/',
    language: 'Multilingue',
    license_note: 'Consultar licencia de ICD-11 antes de reutilizar contenido.',
    value: 'Aporta clasificacion clinica oficial y estructura por capitulos.'
  },
  {
    name: 'OpenStax Anatomy & Physiology 2e',
    category: 'Anatomia',
    type: 'Libro abierto de anatomia y fisiologia',
    url: 'https://openstax.org/details/books/anatomy-and-physiology-2e',
    language: 'Ingles',
    license_note: 'CC BY-NC-SA 4.0 segun OpenStax.',
    value: 'Excelente para organos, sistemas, fisiologia e imagenes educativas.'
  },
  {
    name: 'Servier Medical Art',
    category: 'Visual',
    type: 'Ilustraciones medicas',
    url: 'https://smart.servier.com/',
    language: 'Visual',
    license_note: 'CC BY 4.0 segun Servier Medical Art.',
    value: 'Ilustraciones elaboradas de organos, celulas, tejidos y procesos.'
  },
  {
    name: 'BioIcons',
    category: 'Visual',
    type: 'SVG cientificos y biomedicos',
    url: 'https://bioicons.com/',
    language: 'Visual',
    license_note: 'CC BY 4.0 salvo indicacion diferente.',
    value: 'Banco de SVG cientificos para reforzar procesos y estructuras.'
  }
];

module.exports = knowledgeSources;
