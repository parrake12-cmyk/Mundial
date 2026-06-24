# MedLearn Clínico

Aplicación educativa para estudiar enfermedades, recursos anatómicos, casos clínicos y preguntas interactivas.

## Idea principal

La enfermedad es la primera capa de aprendizaje: definición, síntomas, factores de riesgo, pruebas diagnósticas, órgano afectado e imagen relacionada. El caso clínico es una segunda capa que se abre cuando el estudiante ya quiere practicar razonamiento clínico.

## Características

- Repositorio de enfermedades con búsqueda, filtros por sistema y cobertura.
- Fichas de enfermedad independientes del caso clínico.
- Casos clínicos asociados cuando existen.
- Preguntas interactivas con retroalimentación inmediata.
- Recursos anatómicos e iconografía médica local.
- Análisis inteligente básico por coincidencia de síntomas, órgano y sistema.

## Estructura del proyecto

- `index.html`: interfaz principal.
- `styles.css`: estilos de la aplicación.
- `app.js`: coordinación general.
- `diseases.js`: repositorio, filtros y ficha de enfermedad.
- `cases.js`: repositorio independiente de casos, modal de recursos, imágenes diagnósticas y preguntas.
- `quiz.js`: preguntas interactivas.
- `ai.js`: análisis básico de texto clínico.
- `utils.js`: utilidades generales.
- `images/`: imágenes locales.
- `images/healthicons/`: SVG descargados desde Health Icons.
- `images/diagnostics/`: imágenes anatómicas o diagnósticas.
- `backend/`: servidor Express, SQLite y scripts de carga.

## Imágenes

Se integró un primer repositorio público de imágenes:

- Fuente: https://github.com/resolvetosavelives/healthicons
- Carpeta usada: `public/icons/svg/outline/body`
- Carpeta local: `images/healthicons/`
- Catálogo de asignación: `backend/imageCatalog.js`
- Sincronización con SQLite: `npm run sync:images`

Health Icons publica iconos abiertos para proyectos de salud. En `images/healthicons/SOURCES.md` queda la referencia de origen.

## Imágenes diagnósticas

El proyecto ya separa dos tipos de visuales:

- Iconografía anatómica: ayuda a reconocer órgano o sistema.
- Imagen diagnóstica/elaborada: radiografía, ECG, histología, anatomía real o simulación educativa.

Las imágenes diagnósticas se declaran en `backend/diagnosticImages.js`. Cada registro puede estar asociado a una enfermedad, a un caso clínico o a ambos.

Campos principales:

- `disease_code`
- `case_code`
- `title`
- `modality`
- `local_path`
- `source_url`
- `license`
- `educational_note`

Si `local_path` está vacío, la app muestra la fuente como pendiente de descarga local. Esto permite revisar licencia y calidad antes de meter la imagen definitivamente al proyecto.

## Backend

El backend usa Node.js, Express y SQLite.

Endpoints principales:

- `GET /enfermedades`
- `GET /recursos/:diseaseCode`
- `GET /casos/:diseaseCode`
- `GET /learning/:caseCode`
- `GET /repositorio/resumen`
- `GET /casos`
- `GET /imagenes/enfermedad/:diseaseCode`
- `GET /imagenes/caso/:caseCode`
- `GET /imagenes/diagnosticas`

## Cómo ejecutar

Desde la raíz del proyecto:

```powershell
node backend\server.js
```

Luego abre:

```text
http://localhost:3000
```

También puedes iniciar desde la carpeta backend:

```powershell
cd backend
npm start
```

## Cargar o reconstruir datos

```powershell
cd backend
python create_db.py
npm install
npm run import:all
```

Para sincronizar solo las imágenes:

```powershell
cd backend
npm run sync:images
```

## Nota

Este proyecto es educativo y no debe usarse como herramienta de diagnóstico médico ni como guía de tratamiento.
