# Checklist de ingesta de enfermedades

## Antes de crear o ampliar una ficha

- Confirmar nombre preferido.
- Registrar sinonimos.
- Elegir sistema y organo principal.
- Buscar fuente de resumen.
- Buscar fuente de teoria.
- Buscar fuente de clasificacion.
- Revisar si existe fuente en espanol.
- Revisar licencia o condiciones de reutilizacion.

## Campos editoriales recomendados

- `summary_source`
- `theory_sources`
- `classification_sources`
- `public_health_sources`
- `anatomy_sources`
- `visual_sources`
- `last_reviewed_at`
- `review_status`
- `editorial_notes`

## Estados sugeridos

- `seeded`: existe la enfermedad, pero con contenido minimo.
- `sourced`: ya tiene fuentes registradas.
- `reviewed`: resumen revisado contra fuentes.
- `expanded`: incluye teoria y clasificacion.
- `illustrated`: tiene recurso visual adecuado.
- `teachable`: lista para caso y preguntas.

## Regla practica

Una enfermedad puede publicarse como repositorio aunque aun no tenga caso clinico. El caso y las preguntas deben venir despues de que la ficha base tenga suficiente sustancia.
