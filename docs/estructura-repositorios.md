# Estructura recomendada de repositorios

## Carpetas de trabajo sugeridas

```text
docs/
  repositorios-enfermedades.md
  matriz-fuentes-enfermedades.md
  checklist-ingesta-enfermedades.md
  calidad-informacion-enfermedades.md
  estructura-repositorios.md

backend/data/
  source_catalog.json
  disease_sources.json
  diseases.json
  medical_assets.json
```

## Archivos que faltan crear despues

### `disease_sources.json`

Relaciona cada enfermedad con sus fuentes concretas.

Ejemplo:

```json
{
  "disease_code": "REN-001",
  "summary_sources": ["medlineplus_xml"],
  "theory_sources": ["ncbi_bookshelf", "health_alterations"],
  "classification_sources": ["disease_ontology", "icd11"],
  "public_health_sources": [],
  "anatomy_sources": ["openstax_ap"],
  "review_status": "seeded"
}
```

Ya existe como `backend/data/disease_sources.json` para el primer lote de enfermedades con casos y preguntas.

### `source_notes/`

Carpeta futura para apuntes de curacion:

- decisiones de inclusion;
- licencia;
- enfermedad cubierta;
- observaciones de calidad;
- enlaces candidatos.

## Flujo recomendado

1. Registrar una fuente general en `source_catalog.json`.
2. Asociar fuentes concretas a cada enfermedad en `disease_sources.json`.
3. Solo despues ampliar `diseases.json`.
4. Mantener casos, preguntas e imagenes como capas posteriores.
