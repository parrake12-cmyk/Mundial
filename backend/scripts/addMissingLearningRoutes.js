/**
 * Completa las rutas didacticas faltantes para REN-006, REN-007 y REN-008.
 * Sigue el patron de las rutas existentes (3 etapas con estructura didactica).
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'disease_learning_objects.json');
const objects = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const newRoutes = [
  {
    disease_code: 'REN-006',
    learning_objective: 'Comprender la lesion renal aguda como una caida rapida de la funcion renal, sus causas, mecanismos, manifestaciones y criteros de gravedad.',
    main_structure: 'Nefrona y flujo sanguineo renal',
    involved_regions: ['Glomerulo', 'Tubulos', 'Intersticio', 'Vasos renales', 'Flujo sanguineo renal'],
    normal_state: 'El rinon filtra, reabsorbe y secreta para mantener volumen, electrolitos y acido-base. La creatinina y la diuresis son estables.',
    initial_change: 'Disminucion rapida de la filtracion glomerular por hipoperfusion (prerrenal), dano parenquimatoso (intrinseca) o obstruccion (posrenal).',
    progression: 'Si persiste la causa, el dano tubular o cortical puede volverse irreversible. La hiperpotasemia, la sobrecarga de volumen y la uremia son complicaciones que definen la gravedad.',
    clinical_manifestations: ['Oliguria o anuria', 'Retencion de volumen: edema, disnea', 'Alteraciones electroliticas: hiperpotasemia', 'Acidosis metabolica', 'Uremia: confusion, nauseas, prurito', 'Hipertension o hipotension segun causa'],
    lab_findings: ['Creatinina elevada', 'Urea elevada', 'Potasio alterado', 'Bicarbonato bajo', 'Uroanalisis con sedimento patologico segun causa', 'Relacion BUN/creatinina orientadora'],
    diagnostic_tests: ['Creatinina serica con eGFR', 'Uroanalisis y sedimento', 'Electrolitos y gasometria', 'Ecografia renal para descartar obstruccion', 'Biomarcadores de dano tubular cuando disponibles'],
    differential_diagnosis: ['Prerrenal vs intrinseca vs posrenal', 'Lesion renal cronica agudizada', 'Necrosis tubular aguda', 'Nefritis intersticial aguda', 'Glomerulonefritis aguda', 'Nefropatia aterroembolica'],
    common_mistakes: ['Confundir LRA con ERC agudizada', 'Tratar la creatinina sin buscar la causa', 'No descartar obstruccion urinaria', 'Ignorar hiperpotasemia o sobrecarga de volumen', 'Usar nefrotoxicos en paciente con LRA'],
    explanation: 'La LRA conecta la perfusion renal, la integridad tubular y la via urinaria. La clasificacion prerrenal/intrinseca/posrenal guia el diagnostico. La creatinina y la diuresis son los marcadores principales. La gravedad se define por electrolitos, volumen y uremia.',
    stages: [
      {
        stage: 'Anatomia y funcion normal',
        description: 'El rinon recibe alto flujo sanguineo, filtra en el glomerulo y procesa el filtrado en los tubulos. La medula renal concentra la orina.',
        clinical_correlation: 'La creatinina y la diuresis son estables cuando la funcion renal es normal.'
      },
      {
        stage: 'Mecanismo de lesion',
        description: 'La hipoperfusion reduce la entrega de oxigeno al tubulo. El dano directo (nefrotoxicos, isquemia, inflamacion) lesiona el epitelio tubular. La obstruccion aumenta la presion intratubular.',
        clinical_correlation: 'La clasificacion prerrenal/intrinseca/posrenal orienta la causa y el tratamiento.'
      },
      {
        stage: 'Manifestaciones y confirmacion',
        description: 'La caida del eGFR produce oliguria, retencion de volumen, hiperpotasemia, acidosis y uremia. El sedimento urinario y la ecografia ayudan a filiar.',
        clinical_correlation: 'La gravedad se mide por KDIGO y por la presencia de complicaciones metabolicas o de volumen.'
      }
    ]
  },
  {
    disease_code: 'REN-007',
    learning_objective: 'Comprender la enfermedad renal diabetica como complicacion cronica de la diabetes, su mecanismo, progresion y hallazgos.',
    main_structure: 'Glomerulo y arteriolas renales',
    involved_regions: ['Glomerulo', 'Mesangio', 'Arteriola aferente', 'Arteriola eferente', 'Tubulos'],
    normal_state: 'El glomerulo filtra sin perder proteinas. La presion intraglomerular esta regulada por las arteriolas aferente y eferente.',
    initial_change: 'La hiperglucemia sostenida activa el sistema renina-angiotensina-aldosterona, dilata la arteriola aferente y aumenta la presion intraglomerular. Aparece hiperfiltracion y microalbuminuria.',
    progression: 'La proteinuria aumenta, el mesangio se expande, la membrana basal se engrosa y se desarrolla glomerulosclerosis. El eGFR cae tras anos de hiperfiltracion.',
    clinical_manifestations: ['Microalbuminuria inicial', 'Proteinuria franca', 'Edema por proteinuria', 'Hipertension', 'Disminucion del eGFR en etapas avanzadas', 'Riesgo cardiovascular aumentado'],
    lab_findings: ['Relacion albumina/creatinina en orina', 'eGFR', 'HbA1c', 'Perfil lipidico', 'Funcion renal', 'Uroanalisis'],
    diagnostic_tests: ['eGFR y albuminuria anual en diabeticos', 'HbA1c', 'Perfil lipidico', 'Funcion renal', 'Uroanalisis', 'Control de presion arterial'],
    differential_diagnosis: ['Otras glomerulopatias', 'Nefropatia hipertensiva', 'Enfermedad renal cronica no diabetica', 'Nefropatia por contraste', 'Otras causas de proteinuria'],
    common_mistakes: ['No buscar microalbuminuria en diabeticos', 'Atribuir toda ERC a la diabetes sin descartar otras causas', 'No controlar la presion arterial ni el sistema renina-angiotensina', 'Ignorar el riesgo cardiovascular'],
    explanation: 'La enfermedad renal diabetica conecta la hiperglucemia, la hemodinamia glomerular, la albuminuria y la perdida de eGFR. La microalbuminuria es el primer signo. El control glucemico y tensional reduce la progresion.',
    stages: [
      {
        stage: 'Anatomia y funcion normal',
        description: 'El glomerulo filtra sin perder proteinas. La presion intraglomerular esta regulada por las arteriolas aferente y eferente.',
        clinical_correlation: 'La albuminuria es normal y el eGFR es estable.'
      },
      {
        stage: 'Mecanismo de lesion',
        description: 'La hiperglucemia y el sistema renina-angiotensina producen hiperfiltracion, dilatacion de la arteriola aferente y aumento de la presion intraglomerular. Aparece microalbuminuria.',
        clinical_correlation: 'La microalbuminuria es el primer marcador de dano renal diabetico.'
      },
      {
        stage: 'Progresion y complicaciones',
        description: 'La proteinuria aumenta, el mesangio se expande, la membrana basal se engrosa y se desarrolla glomerulosclerosis. El eGFR cae.',
        clinical_correlation: 'La albuminuria franca y la caida del eGFR confirman la nefropatia diabetica establecida.'
      }
    ]
  },
  {
    disease_code: 'REN-008',
    learning_objective: 'Comprender la hidronefrosis y la uropatia obstructiva como consecuencia de la obstruccion del flujo urinario, sus causas, mecanismos y hallazgos.',
    main_structure: 'Sistema colector urinario',
    involved_regions: ['Pelvis renal', 'Calices', 'Ureter', 'Union pieloureteral', 'Vejiga', 'Uretra'],
    normal_state: 'La orina fluye desde la pelvis renal por el ureter hasta la vejiga y la uretra. No hay dilatacion del sistema colector.',
    initial_change: 'La obstruccion aumenta la presion upstream, dilata la pelvis renal y los calices, y reduce la filtracion glomerular por aumento de la presion intratubular.',
    progression: 'Si la obstruccion persiste, el parenquima renal se adelgaza, se pierden nefronas y se desarrolla atrofia renal con perdida irreversible de funcion.',
    clinical_manifestations: ['Dolor lumbar o en flanco', 'Colico nefritico si es agudo', 'Anuria si es bilateral', 'Infeccion urinaria asociada', 'Hematuria', 'Masa palpable en lactantes si es congenita'],
    lab_findings: ['Uroanalisis', 'Funcion renal', 'Electrolitos', 'Hemograma si hay infeccion', 'Cultivo de orina si hay sospecha'],
    diagnostic_tests: ['Ecografia renal y de vias urinarias', 'TAC abdominal si se necesita filiar', 'Urografia o RM si se requiere', 'Cistoscopia si se sospecha obstruccion distal'],
    differential_diagnosis: ['Litiasis urinaria', 'Tumor ureteral o vesical', 'Hiperplasia prostatica benigna', 'Estenosis ureteral', 'Megaurereter congenito', 'Reflujo vesicoureteral', 'Obstruccion por fibrosis retroperitoneal'],
    common_mistakes: ['No descartar obstruccion en LRA', 'Confundir dilatacion con reflujo', 'No buscar la causa de la obstruccion', 'Retrasar la descompresion si hay infeccion o falla renal'],
    explanation: 'La hidronefrosis conecta la anatomia del sistema colector, la presion intratubular y la perdida de parenquima. La ecografia es la prueba inicial. La descompresion oportuna previene el dano irreversible.',
    stages: [
      {
        stage: 'Anatomia y funcion normal',
        description: 'La orina fluye desde la pelvis renal por el ureter hasta la vejiga y la uretra. No hay dilatacion del sistema colector.',
        clinical_correlation: 'La ecografia no muestra dilatacion y la funcion renal es normal.'
      },
      {
        stage: 'Mecanismo de obstruccion',
        description: 'La obstruccion aumenta la presion upstream, dilata la pelvis renal y los calices, y reduce la filtracion glomerular por aumento de la presion intratubular.',
        clinical_correlation: 'La ecografia muestra dilatacion del sistema colector. El dolor o la anuria orientan a la causa y la duracion.'
      },
      {
        stage: 'Complicaciones y dano',
        description: 'Si la obstruccion persiste, el parenquima renal se adelgaza, se pierden nefronas y se desarrolla atrofia renal con perdida irreversible de funcion.',
        clinical_correlation: 'La funcion renal cae si la obstruccion es bilateral o en rinon unico. La infeccion asociada empeora el pronostico.'
      }
    ]
  }
];

// Filtrar solo los que no existen
const existingCodes = objects.map(o => o.disease_code);
const toAdd = newRoutes.filter(r => !existingCodes.includes(r.disease_code));

if (toAdd.length > 0) {
  objects.push(...toAdd);
  fs.writeFileSync(dataPath, JSON.stringify(objects, null, 2), 'utf8');
  console.log(`Agregadas ${toAdd.length} rutas didacticas:`, toAdd.map(r => r.disease_code).join(', '));
} else {
  console.log('Todas las rutas ya existen. No se agregaron nuevas.');
}