# Imágenes diagnósticas y anatómicas

Esta carpeta queda reservada para imágenes anatómicas, diagnósticas o elaboradas que muestran cómo se afecta un órgano o sistema.

## Archivo local cargado

- `internal-organs.png`
- Fuente: https://commons.wikimedia.org/wiki/File:Internal_organs.png
- Uso: imagen anatómica base para ubicar órganos internos.

## Datasets digestivos cargados

### Kvasir

- Carpeta local: `datasets/kvasir-samples/`
- Fuente oficial: https://datasets.simula.no/kvasir/
- Paper: https://doi.org/10.1145/3083187.3083212
- Uso documentado por la fuente: investigación y educación; requiere citar el paper.
- Archivos cargados:
  - `esophagitis.jpg`
  - `z-line.jpg`
  - `pylorus.jpg`
  - `cecum.jpg`
  - `polyp.jpg`
  - `ulcerative-colitis.jpg`
  - `dyed-and-lifted-polyp.jpg`
  - `dyed-resection-margin.jpg`

### Kvasir-SEG

- Carpeta local: `datasets/kvasir-seg/`
- Fuente oficial: https://datasets.simula.no/kvasir-seg/
- Paper: https://dl.acm.org/doi/10.1007/978-3-030-37734-2_37
- Uso: imágenes reales de colonoscopia con máscaras de segmentación de pólipos.
- Archivo fuente descargado: `backend/data/external/kvasir/kvasir-seg.zip`
- Subconjunto cargado en la app:
  - `cju5k7r0yf98c09878csbxb4d.jpg`
  - `cju5knbbqfipk080128cggukq.jpg`
  - `cju5woy82m07m08505dmjg7g1.jpg`
  - `cju8c2rqzs5t80850d0zky5dy.jpg`
  - máscaras correspondientes en `datasets/kvasir-seg/masks/`

## Fuentes diagnósticas pendientes de descarga local

Las siguientes fuentes quedan conectadas desde `backend/diagnosticImages.js` para descargarlas y documentarlas con calma:

- Neumonía: https://commons.wikimedia.org/wiki/File:X-ray_of_lobar_pneumonia.jpg
- Infarto: https://commons.wikimedia.org/wiki/File:Myocardial_infarction_ECG.svg
- Diabetes/páncreas: https://commons.wikimedia.org/wiki/File:The_Endocrine_and_Exocrine_Pancreas_(47725286761).jpg
- Compromiso pulmonar infeccioso: https://commons.wikimedia.org/wiki/File:SARS_xray.jpg

La descarga automática directa desde Wikimedia puede activar límites de tráfico. Por eso el sistema soporta dos estados:

- `local_path`: imagen ya guardada dentro del proyecto.
- `source_url`: fuente externa documentada, pendiente de descarga local o revisión de licencia.
