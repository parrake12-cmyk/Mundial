# Repositorios y fuentes para laboratorios renales

Objetivo: alimentar muestras educativas comparando perfil base contra enfermedad renal. No se importan datos identificables; cada fuente requiere revision de licencia, variables y sesgo antes de incorporarse como dataset interno.

## Datasets tabulares utiles

### UCI Chronic Kidney Disease Dataset
- URL: https://archive.ics.uci.edu/dataset/336/chronic+kidney+disease
- Uso recomendado: ejemplos CKD/no CKD, patrones de creatinina, urea, sodio, potasio, hemoglobina, albumina/proteina urinaria y sedimento simplificado.
- Limitacion: dataset pequeno, no representa todos los fenotipos renales y tiene valores faltantes.

### NHANES Laboratory Data
- URL: https://wwwn.cdc.gov/nchs/nhanes/Default.aspx
- Uso recomendado: comparaciones poblacionales de eGFR, creatinina, albuminuria, hemoglobina, diabetes, hipertension y variables metabolicas.
- Limitacion: requiere unir ciclos, diccionarios de variables y ponderaciones si se hacen inferencias poblacionales.

### MIMIC-IV / PhysioNet
- URL: https://physionet.org/content/mimiciv/
- Uso recomendado: trayectorias hospitalarias de creatinina, urea, electrolitos, hemograma, uroanalisis, cultivos, diuresis y AKI.
- Limitacion: requiere credencial PhysioNet/CITI y consultas SQL cuidadosas; no es descarga anonima libre para cualquier usuario.

## Fuentes clinicas para definir patrones

### NIDDK Kidney Disease / Kidney Stones / Diabetic Kidney Disease
- URL: https://www.niddk.nih.gov/health-information/kidney-disease
- Uso recomendado: variables basicas, explicacion de eGFR, albuminuria, calculos, diabetes renal y educacion al paciente.

### MedlinePlus Lab Tests
- URL: https://medlineplus.gov/lab-tests/
- Uso recomendado: explicaciones de pruebas para estudiantes/pacientes y nombres estandarizados de examenes.

### National Kidney Foundation
- URL: https://www.kidney.org/kidney-topics
- Uso recomendado: eGFR, albuminuria, anemia renal, AKI y explicaciones de ERC.

## Estrategia de integracion

1. Usar UCI CKD para prototipos tabulares y comparaciones simples.
2. Usar NHANES para construir tablas normal/albuminuria/ERC con datos publicos.
3. Usar MIMIC-IV solo si se obtiene acceso; ideal para AKI, infeccion urinaria complicada y tendencias temporales.
4. Para litiasis, pielonefritis e hidronefrosis, iniciar con patrones educativos curados y luego buscar cohortes especificas por pregunta.
