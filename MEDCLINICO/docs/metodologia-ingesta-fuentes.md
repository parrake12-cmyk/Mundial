# Metodologia de ingesta de fuentes abiertas

El objetivo no es reemplazar un libro por fichas cortas. El objetivo es convertir informacion confiable en una base navegable, trazable e interactiva.

## Capas de informacion

1. **Base de enfermedades**
   - Nombre, sistema, organo, definicion y campos clinicos.
   - Sirve para buscar, filtrar y abrir una ficha.

2. **Fuentes abiertas importadas**
   - MedlinePlus XML: temas en ingles/espanol, resumen, sinonimos, grupos, enlaces y organizaciones.
   - Disease Ontology: clasificacion formal de enfermedades.
   - Human Phenotype Ontology: signos, sintomas y fenotipos estructurados.
   - Open Targets / NCBI / PubMed: asociaciones y literatura para capas futuras.

3. **Capa editorial**
   - Decide que coincidencias son buenas.
   - Evita ruido por sinonimos ambiguos.
   - Marca calidad: pendiente, revisada, validada.

4. **Capa educativa**
   - Explica fisiopatologia.
   - Ordena diagnostico diferencial.
   - Relaciona pruebas con hallazgos.
   - Genera preguntas y mini-casos.

## Primer avance implementado

- Se descargo MedlinePlus Health Topic XML generado el 2026-05-20.
- Se proceso a `backend/data/external/medlineplus_topics.json`.
- Se cruzo con las 123 enfermedades locales.
- Resultado: `backend/data/external/disease_medlineplus_matches.json`.
- Cobertura actual: 86/123 enfermedades con coincidencia fuerte.
- Endpoints:
  - `/fuentes/medlineplus`
  - `/fuentes/medlineplus/:diseaseCode`

## Comandos

```powershell
cd "C:\Users\Usuario\OneDrive\Documentos\Nueva carpeta\backend"
npm run ingest:medlineplus
npm run build:diseases
npm run import:diseases
npm start
```

## Diferencia frente a un libro

Un libro organiza informacion por capitulos. La plataforma debe organizarla por relaciones:

- enfermedad -> sintomas
- enfermedad -> pruebas
- enfermedad -> criterios
- enfermedad -> diferenciales
- enfermedad -> fuentes abiertas
- enfermedad -> urgencias
- enfermedad -> preguntas
- enfermedad -> casos

La interactividad real aparece cuando el usuario puede preguntar, filtrar, comparar, cruzar y practicar, no solo leer un parrafo.
