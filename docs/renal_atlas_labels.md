# Etiquetado del atlas renal

Este documento define las etiquetas anatomicas base para la vista renal. La idea es usarlo antes de llenar la imagen con leyendas, para evitar nombres incorrectos o demasiado generales.

## Capas anatomicas

### 1. Tejido renal

- Capsula renal: capa externa que envuelve el rinon.
- Corteza renal: zona externa del parenquima; contiene glomerulos y tubulos corticales.
- Medula renal: zona interna organizada en piramides renales.
- Piramides renales: estructuras medulares que drenan hacia la papila renal.
- Papila renal: punta de la piramide; entrega orina al caliz menor.

### 2. Sistema colector urinario

Ruta didactica:

1. Papila renal
2. Caliz menor
3. Caliz mayor
4. Pelvis renal
5. Union pieloureteral
6. Ureter
7. Union ureterovesical
8. Vejiga

Etiquetas recomendadas en la imagen:

- Calices menores
- Calices mayores
- Pelvis renal
- Ureter proximal
- Ureter distal, si se muestra via urinaria completa

### 3. Arterias renales

Ruta didactica:

1. Aorta abdominal
2. Arteria renal
3. Arterias segmentarias
4. Arterias interlobares
5. Arterias arcuatas
6. Arterias corticales radiadas
7. Arteriola aferente
8. Glomerulo

Etiquetas recomendadas en la imagen:

- Arteria renal
- Ramas segmentarias
- Arterias interlobares
- Arterias arcuatas
- Arterias corticales radiadas

### 4. Venas renales

Ruta didactica simplificada:

1. Venas corticales radiadas
2. Venas arcuatas
3. Venas interlobares
4. Vena renal
5. Vena cava inferior

Etiquetas recomendadas en la imagen:

- Vena renal
- Ramas venosas intrarrenales
- Retorno venoso

## Puntos frecuentes de obstruccion

Estos puntos no siempre aparecen en todas las enfermedades, pero sirven para calculos, hidronefrosis, tumores, estenosis o compresiones:

- Union pieloureteral: transicion entre pelvis renal y ureter.
- Ureter proximal: cerca del hilio renal.
- Cruce con vasos iliacos: punto anatomico de estrechamiento relativo.
- Union ureterovesical: entrada del ureter a la vejiga.

## Aplicacion por enfermedad

### Enfermedad renal cronica

No se debe marcar una sola obstruccion si no aplica. Mejor mostrar:

- Corteza adelgazada
- Perdida de nefronas
- Fibrosis intersticial
- Cambios vasculares
- Rinon reducido o cicatricial en etapas avanzadas

### Glomerulonefritis

Enfatizar:

- Glomerulo
- Capilares glomerulares
- Filtracion alterada
- Sangre/proteina en orina como consecuencia funcional

### Sindrome nefrotico

Enfatizar:

- Barrera de filtracion glomerular
- Podocitos
- Albumina en filtrado
- Edema como consecuencia sistemica

### Litiasis / obstruccion urinaria

Enfatizar:

- Caliz o pelvis renal si el calculo esta dentro del rinon
- Union pieloureteral
- Ureter
- Dilatacion proximal / hidronefrosis

## Regla de diseno

No poner todas las etiquetas al tiempo sobre la imagen. Usar capas activables:

- Anatomia base
- Vasos
- Sistema colector
- Enfermedad
- Obstruccion / complicacion

## Estado actual en la app

El atlas renal general vive en el modulo `Atlas visual`, separado de `REN-001`.
`REN-001` queda como aplicacion por enfermedad; el atlas base no debe marcar fibrosis, obstruccion ni progresion salvo cuando se active una capa patologica especifica.

### Vistas base creadas

- `assets/renal-atlas/renal-external-created-v1.png`: anatomia externa y relaciones, imagen creada para atlas.
- `assets/renal-atlas/renal-longitudinal-created-v1.png`: corte longitudinal, imagen creada para atlas.
- `assets/renal-atlas/renal-transverse-created-v1.png`: corte transversal del hilio, imagen creada para atlas.
- `assets/renal-atlas/renal-vascular-collector-created-v1.png`: vasos y sistema colector, imagen creada para atlas con hotspots HTML.
- `assets/renal-atlas/renal-nephron-created-v1.png`: nefrona y filtracion, imagen creada para atlas.
- `assets/renal-atlas/renal-urinary-tract-focused-v3.png`: via urinaria completa, imagen creada con mayor definicion de calices/pelvis, ureteres, pared vesical y uretra.

### Interaccion actual

- Cada vista tiene puntos seleccionables.
- Al seleccionar una zona, aparece una explicacion breve.
- Cada vista permite ampliar la zona seleccionada y volver a vista completa.
- Las etiquetas visibles son leyendas anatomicas base, no etiquetas de enfermedad.

### Siguiente capa pendiente

Despues de estabilizar las vistas normales, se pueden agregar capas por enfermedad:

- ERC: corteza adelgazada, fibrosis intersticial, perdida de nefronas.
- Glomerulonefritis: glomerulo, capilares, hematuria/proteinuria funcional.
- Sindrome nefrotico: barrera de filtracion, podocitos, albumina en filtrado.
- Litiasis/obstruccion: punto de estrechamiento, dilatacion proximal e hidronefrosis.

## Fuentes revisadas

- NCBI Bookshelf, StatPearls: Anatomy, Abdomen and Pelvis: Kidneys. https://www.ncbi.nlm.nih.gov/books/NBK482385/
- NCBI Bookshelf, StatPearls: Anatomy, Abdomen and Pelvis: Ureter. https://www.ncbi.nlm.nih.gov/books/NBK532980/
- NCBI Bookshelf, StatPearls: Physiology, Urination. https://www.ncbi.nlm.nih.gov/sites/books/n/statpearls/article-43110/
- Kidney collecting system anatomy applied to endourology, PMC. https://pmc.ncbi.nlm.nih.gov/articles/PMC10953598/
