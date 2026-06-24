# Metodologia por subdivisiones didacticas

## Enfoque actual

La aplicacion prioriza el aprendizaje de enfermedades por sistemas antes de trabajar casos clinicos. La secuencia principal es:

1. Sistema o departamento.
2. Organo base.
3. Conexiones anatomicas relevantes.
4. Anatomia base.
5. Cambio por enfermedad.
6. Complicacion o avance.
7. Que buscar en imagen, laboratorio o prueba.
8. Rasgos que diferencian enfermedades parecidas.

## Casos clinicos

Los casos clinicos quedan pausados como fase posterior. No se eliminan del proyecto, pero no deben conducir la experiencia principal hasta que el banco de enfermedades tenga suficiente estructura didactica.

## Subdivision piloto: renal / urologica

Enfermedades iniciales para trabajar como familia:

- REN-001: Enfermedad renal cronica.
- REN-002: Glomerulonefritis.
- REN-003: Sindrome nefrotico.
- REN-004: Pielonefritis aguda.
- REN-005: Litiasis renal.
- INF-003: Infeccion del tracto urinario.
- URO-001: Hiperplasia prostatica benigna.
- URO-002: Prostatitis.

Avance actual de la subdivision piloto:

- 123 enfermedades catalogadas con ruta didactica interna.
- Todos los sistemas del banco actual quedan al 100% de cobertura: renal, urologico, neurologico, respiratorio, cardiovascular, endocrino, digestivo, hepatobiliar, dermatologico, infeccioso, hematologico, inmunologico, toxicologico, metabolico, reumatologico, musculoesqueletico, ginecologico, obstetrico, oftalmologico, auditivo, oncologico, pediatrico y psiquiatrico.
- Visores anatomicos disponibles para cerebro, nervio periferico/union neuromuscular, via aerea superior, higado, rinon, tracto urinario, prostata, pulmon, corazon, sistema vascular/circulatorio, pancreas y eje endocrino.
- Casos clinicos ocultos de la navegacion principal hasta consolidar mas banco de enfermedades.
- Cada ruta usa 3 capas comunes: anatomia base, cambio por enfermedad y progresion o complicacion.
- Verificacion local: las 123 rutas responden desde `/aprendizaje/enfermedades/:codigo` con 3 etapas.
- Endpoint de cobertura disponible: `/aprendizaje/resumen`.
- Auditoria local disponible: `npm run audit:learning` dentro de `backend`.

Codigos con ruta didactica interna al corte actual:

- AUD-002, AUD-003, CARD-001, CARD-002, CARD-003, CARD-004, CARD-005, CARD-006, CARD-007, CARD-008, DERM-001, DERM-002.
- DERM-003, DERM-004, DERM-005, DIG-001, DIG-002, DIG-003, DIG-004, DIG-005, DIG-006, DIG-007, DIG-008, DIG-009.
- ENDO-001, ENDO-002, ENDO-003, ENDO-004, ENDO-005, ENDO-006, ENDO-007, GEN-001, GEN-002, GEN-003, GEN-004, GEN-005.
- GEN-006, GEN-007, GEN-008, GEN-009, GEN-010, GINE-001, GINE-002, GINE-003, HEMA-001, HEMA-002, HEMA-003, HEMA-004.
- HEP-001, HEP-002, HEP-003, INF-001, INF-002, INF-003, INF-004, INF-005, INF-006, INF-007, INF-008, INF-009.
- INF-010, INF-011, MET-001, MET-002, MET-003, MET-004, MUS-001, MUS-002, MUS-003, MUS-004, MUS-005, MUS-006.
- NEU-001, NEU-002, NEU-003, NEU-004, NEU-005, NEU-006, NUT-001, OBS-001, OFT-001, OFT-002, OFT-003, OFT-004.
- ONC-001, ONC-002, ONC-003, ONC-004, ONC-005, ONC-006, ORL-001, PED-001, PED-002, PED-003, PED-004, PED-005.
- PED-006, PSY-001, PSY-002, PSY-003, PSY-004, RARE-001, RARE-002, RARE-003, RARE-004, RARE-005, RARE-006, RARE-007.
- REN-001, REN-002, REN-003, REN-004, REN-005, RESP-001, RESP-002, RESP-003, RESP-004, RESP-005, RESP-006, RESP-007.
- RESP-008, URO-001, URO-002.

Campos didacticos por enfermedad:

- Organo principal.
- Estructuras afectadas.
- Funcion alterada.
- Anatomia base.
- Cambio inicial.
- Cambio establecido.
- Complicacion o progresion.
- Pruebas/laboratorios que ayudan.
- Que buscar visualmente.
- Diferenciales cercanos.
- Error comun de aprendizaje.

## Criterio para avanzar a otro sistema

Un sistema se considera listo para pasar al siguiente cuando al menos sus enfermedades principales tienen:

- Ruta visual de 3 etapas.
- Estructuras anatomicas principales.
- Laboratorios o pruebas clave.
- Diferenciales cercanos.
- Guia breve de lectura visual.

## Siguientes focos sugeridos

1. Profundizar articulos internos por enfermedad: definicion, terminologia, fisiopatologia, pruebas, diferenciales y seguimiento.
2. Ampliar glosario contextual con terminos por enfermedad y definiciones en sobreposicion dentro de la app.
3. Mejorar fuentes y trazabilidad como bibliografia citada, sin depender de paginas externas para el contenido principal.
4. Revisar visuales por sistema; el modelado anatomico realista queda como fase posterior dedicada.
5. Construir modo estudio: tarjetas, preguntas, comparadores y rutas por sistema antes de reactivar casos clinicos.
