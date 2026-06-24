# Plan de atlas visual didactico

Este documento define el rumbo visual de la app para que cada organo no se disene desde cero.

## Objetivo

Crear modelos visuales internos, didacticos y progresivos para estudiar enfermedades por organo, tejido, conductos, vasos, pruebas diagnosticas y cambios fisiopatologicos.

## Capas por organo

1. Organo completo
   - Forma general, orientacion, bordes, relaciones principales y ubicacion.
   - Ejemplo renal: rinones, hilio renal, vasos renales y ureter proximal.

2. Corte interno
   - Vista seccionada para entender capas, cavidades y tejidos.
   - Ejemplo renal: capsula, corteza, medula, piramides, calices, pelvis renal y ureter.

3. Flujos y conductos
   - Entrada, salida y recorrido de sangre, aire, bilis, orina, secreciones o impulsos.
   - Ejemplo renal: arteria renal, vena renal, ramas intrarrenales, calices, pelvis renal y ureter.

4. Cambio por enfermedad
   - Superponer inflamacion, obstruccion, fibrosis, isquemia, masas, edema, necrosis o dano funcional.
   - La enfermedad no debe ser solo un color encima del organo: debe explicar que estructura cambio y por que importa.

5. Lectura diagnostica
   - Relacionar el modelo con laboratorio, ecografia, TAC, RM, endoscopia u otra prueba.
   - Debe responder: que espero ver, que hallazgo cambia la gravedad y que dato descarta diferenciales.

## Leyenda visual base

La leyenda rapida debe cambiar segun el organo y la vista.

- Rojo: arteria, inflamacion activa, dano o territorio critico segun contexto.
- Azul: vena, retorno o flujo vascular venoso.
- Amarillo/naranja: conducto, drenaje, obstruccion, fibrosis o progresion.
- Rosado/marron: tejido del organo, parenquima, mucosa o musculo.
- Crema/blanco: cavidad, luz, pelvis, caliz, bronquio, conducto o espacio interno.

## Modulos visuales sugeridos

### Renal y urinario

- Vista externa de rinones.
- Corte longitudinal renal.
- Vasos renales y sistema colector.
- Via urinaria completa: rinon, ureter, vejiga y uretra.
- Progresiones: enfermedad renal cronica, glomerulonefritis, sindrome nefrotico, pielonefritis, calculos, obstruccion.

### Digestivo

- Tubo digestivo general.
- Corte de pared: mucosa, submucosa, muscular y serosa.
- Higado, via biliar y pancreas como bloque funcional.
- Colon/recto y apendice.
- Progresiones: apendicitis, colecistitis, pancreatitis, cirrosis, EII, obstruccion, cancer digestivo.

### Neurologico

- Cerebro externo por lobulos.
- Corte axial simplificado.
- Territorios vasculares.
- Vias motoras/sensitivas.
- Progresiones: ACV, meningitis, epilepsia, Parkinson, esclerosis multiple, migraña.

### Respiratorio

- Via aerea superior e inferior.
- Bronquio y alveolo en corte.
- Perfusion pulmonar.
- Progresiones: neumonia, asma, EPOC, embolia pulmonar, bronquiolitis, fibrosis quistica.

### Cardiovascular

- Corazon externo.
- Corte de camaras y valvulas.
- Coronarias.
- Sistema electrico.
- Progresiones: infarto, hipertension, fibrilacion auricular, falla cardiaca, valvulopatias.

## Fuentes y datasets a buscar despues

No usar imagenes con marca de agua o stock dentro de la app final.

Priorizar:

- Bancos publicos o academicos con licencia clara.
- Datasets medicos abiertos para imagen diagnostica.
- Fuentes oficiales para criterios, pruebas y definiciones.
- Modelos propios en SVG/canvas cuando el objetivo sea didactico y no diagnostico.

## Regla practica

Primero se disena el modulo visual del organo. Despues se conectan enfermedades, laboratorios, ecografia/TAC/RM y diferenciales. Esto evita que cada enfermedad quede como una ficha aislada.
