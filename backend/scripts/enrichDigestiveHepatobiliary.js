/**
 * Script de enriquecimiento de fichas digestivas y hepatobiliares.
 * Completa campos vacios con sintesis educativas basadas en fuentes verificables.
 * No inventa criterios diagnosticos, intervalos universales ni cifras sin contexto.
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'diseases.json');
const diseases = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Mapa de enriquecimiento por codigo de enfermedad
const enrichment = {
  'HEP-001': {
    system: 'Hepatobiliar',
    pathophysiology: 'La lesion hepatocelular aguda produce inflamacion del parenquima hepatico. Segun la causa, puede haber necrosis, apoptosis, regeneracion celular y, en casos graves, falla hepatica. Los virus hepatotropos (A, B, C, E) infectan hepatocitos y desencadenan respuesta inmune que dana la celula. Los farmacos y toxinas producen dano directo o mediado por hipersensibilidad. La colestasis puede acompanar o dominar el cuadro segun el mecanismo.',
    differential_diagnosis: 'Colecistitis, coledocolitiasis, colangitis, cirrosis descompensada, sindrome de Budd-Chiari, enfermedad de Wilson, hemocromatosis, esteatosis hepatica severa, hepatitis autoimmune, sepsis con disfuncion hepatica, isquemia hepatica.',
    staging: 'La gravedad se evalua por clinica, bilirrubina, INR, encefalopatia y tiempo de protrombina. En falla hepatica aguda se usan criterios de King\'s College. La hepatitis viral se clasifica por aguda, cronica y segun serologia.',
    red_flags: 'Encefalopatia hepatica, coagulopatia con INR elevado, bilirrubina muy alta, hipoglucemia, ascitis rapida, sangrado, deterioro del nivel de conciencia. Estos datos orientan a falla hepatica aguda o grave.',
    monitoring: 'Seguimiento de transaminasas, bilirrubina, INR, plaquetas, glucosa y funcion renal. En hepatitis viral, serologia de seguimiento segun el tipo. Vigilar signos de cronificacion o falla hepatica.',
    patient_education: 'Explicar que la mayoria de hepatitis virales agudas se resuelven solas. Evitar alcohol, farmacos hepatotoxicos sin indicacion y consultar si aparece ictericia, sangrado, confusion o dolor abdominal intenso. La hepatitis A y B son prevenibles con vacuna.',
    quality_level: 4,
    last_reviewed_at: '2026-07-20',
    source_notes: 'Fuentes: MedlinePlus Hepatitis; NCBI Bookshelf/StatPearls Acute Liver Failure, Viral Hepatitis; AASLD guidelines. Contenido educativo, no guia de tratamiento individual.'
  },
  'DIG-002': {
    pathophysiology: 'La bilis contiene colesterol, sales biliares y lecitina. Cuando el colesterol se sobresatura, o cuando hay estasis vesicular o alteracion de las proteinas transportadoras, el colesterol precipita y forma cristales que crecen hasta convertirse en calculos. Los calculos pigmentarios se asocian a hemolisis o infeccion biliar.',
    differential_diagnosis: 'Colecistitis aguda, coledocolitiasis, colangitis, pancreatitis biliar, ulcera peptica, gastritis aguda, sindrome de intestino irritable, dolor musculo-esqueletico, hepatopatia aguda, isquemia mesenterica.',
    staging: 'La gravedad se clasifica por la presencia de sintomas (asintomatica, colico biliar, colecistitis, coledocolitiasis, pancreatitis biliar o colangitis). No hay estadificacion numerica universal para colelitiasis no complicada.',
    red_flags: 'Fiebre con escalofrios, dolor persistente mas de 6 horas, ictericia, signos de peritonitis, hipotension o confusion. Estos orientan a colecistitis, colangitis o coledocolitiasis con complicacion.',
    monitoring: 'En pacientes asintomaticos no se requiere seguimiento activo. Tras colecistectomia, vigilar complicaciones y, si hay calculos en via biliar, confirmar su resolucion. En pacientes que no se operan, seguimiento clinico.',
    patient_education: 'La mayoria de calculos asintomaticos no requieren cirugia. Consultar si aparece dolor intenso en hipocondrio derecho, fiebre o ictericia. Mantener peso saludable y evitar perdidas bruscas. La dieta baja en grasas no disuelve calculos pero puede reducir sintomas leves.',
    quality_level: 4,
    last_reviewed_at: '2026-07-20',
    source_notes: 'Fuentes: MedlinePlus Gallstones; NCBI Bookshelf/StatPearls Gallstones; ACG guidelines. Contenido educativo, no guia de tratamiento individual.'
  },
  'DIG-004': {
    pathophysiology: 'La mucosa gastrica tiene barreras defensivas (moco, bicarbonato, flujo sanguineo, prostaglandinas). Cuando el dano supera la defensa, aparece inflamacion. El Helicobacter pylori coloniza la mucosa y altera la barrera. Los AINEs inhiben ciclooxigenasa y reducen prostaglandinas. El alcohol, el estres y el reflujo biliar tambien pueden lesionar la mucosa.',
    differential_diagnosis: 'Ulcera peptica, ERGE, pancreatitis, colecistitis, enfermedad coronaria, dolor musculo-esqueletico, gastritis por Helicobacter pylori, cancer gastrico, linfoma gastrico MALT, isquemia mesenterica.',
    staging: 'La gastritis se clasifica por tipo (erosiva, no erosiva, atrofica), por causa (H. pylori, AINEs, autoinmune, quimica) y por distribucion anatopatologica (antral, corporal, pan gastrica). No hay estadificacion numerica universal.',
    red_flags: 'Hemorragia digestiva (hematemesis o melenas), dolor abdominal intenso y repentino, perdida de peso, disfagia, vomitos persistentes, masa palpable, anemia sin causa clara. Estos datos obligan a descartar complicaciones o neoplasia.',
    monitoring: 'En gastritis por H. pylori, confirmar erradicacion con prueba de aliento o antigeno fecal tras tratamiento. En gastritis atrofica autoinmune, vigilar niveles de vitamina B12 y hierro. En uso cronico de AINEs, evaluar riesgo gastrointestinal.',
    patient_education: 'Evitar AINEs sin indicacion, alcohol y tabaco. Completar tratamiento para H. pylori si fue indicado. Consultar si hay dolor persistente, sangrado, perdida de peso o vomitos recurrentes. La dieta no cura la gastritis pero puede aliviar sintomas.',
    quality_level: 4,
    last_reviewed_at: '2026-07-20',
    source_notes: 'Fuentes: MedlinePlus Gastritis; NCBI Bookshelf/StatPearls Gastritis; ACG guidelines on H. pylori. Contenido educativo, no guia de tratamiento individual.'
  },
  'DIG-005': {
    pathophysiology: 'El desequilibrio entre factores agresivos (acido, pepsina, H. pylori, AINEs) y defensivos (moco, bicarbonato, prostaglandinas, flujo sanguineo) produce perdida de la mucosa. La infeccion por H. pylori es la causa mas frecuente de ulcera duodenal. Los AINEs son la causa mas frecuente de ulcera gastrica en no infectados. La ulcera perfora la muscularis mucosae.',
    differential_diagnosis: 'Gastritis, ERGE, pancreatitis, colecistitis, enfermedad coronaria, cancer gastrico, linfoma gastrico, sindrome de Zollinger-Ellison, isquemia mesenterica, dolor funcional.',
    staging: 'Las ulceras se clasifican por localizacion (gastrica o duodenal), por causa (H. pylori, AINEs, otras) y por complicaciones (sangrado, perforacion, penetracion, obstruccion). Para sangrado se usan escalas como Forrest y Rockall.',
    red_flags: 'Hemorragia digestiva (hematemesis, melenas o hematoquecia), dolor abdominal intenso y repentino (perforacion), vomitos persistentes (obstruccion), perdida de peso, anemia. Estos datos requieren evaluacion urgente.',
    monitoring: 'Tras tratamiento de H. pylori, confirmar erradicacion. En ulceras por AINEs, revisar necesidad de gastroproteccion. En ulceras complicadas, endoscopia de control segun evolucion. Vigilar signos de recurrencia o complicacion.',
    patient_education: 'Evitar AINEs sin indicacion, alcohol y tabaco. Completar tratamiento para H. pylori. Consultar de inmediato si hay sangrado, dolor intenso o vomitos persistentes. La ulcera puede reaparecer si no se trata la causa.',
    quality_level: 4,
    last_reviewed_at: '2026-07-20',
    source_notes: 'Fuentes: MedlinePlus Peptic Ulcer; NCBI Bookshelf/StatPearls Peptic Ulcer Disease; ACG guidelines. Contenido educativo, no guia de tratamiento individual.'
  },
  'DIG-006': {
    pathophysiology: 'La activacion enzimatica intrapancreatica de tripsinogeno a tripsina inicia la autodigestion del pancreas. La lesion acinar libera enzimas y mediadores inflamatorios que producen edema, necrosis, hemorragia y respuesta sistemica. Los calculos biliares obstruyen el esfinter de Oddi y la hipertrigliceridemia produce lesiones lipidicas. La gravedad depende de la extension de la necrosis y la respuesta sistemica.',
    differential_diagnosis: 'Colecistitis, colangitis, ulcera peptica perforada, isquemia mesenterica, aneurisma aortico abdominal, infarto intestinal, pancreatitis cronica, cancer pancreatico, neumonia inferior, infarto miocardico inferior.',
    staging: 'Se clasifica por gravedad: leve (sin falla organica ni complicaciones), moderada (falla organica transitoria o complicacion local), grave (falla organica persistente). Se usan scores como Ranson, APACHE II, BISAP y el Atlanta Revised Classification.',
    red_flags: 'Dolor abdominal intenso e invalidante, hipotension, taquicardia, fiebre, confusion, oliguria, ictericia, signos de peritonitis, dificultad respiratoria. Estos datos orientan a pancreatitis grave o complicada.',
    monitoring: 'Vigilar amilasa, lipasa, funcion renal, electrolitos, glucosa, calcio, hemograma, gasimetria. Evaluar necrosis o colecciones con imagen. Seguimiento de falla organica y complicaciones locales (pseudoquiste, infeccion).',
    patient_education: 'Evitar alcohol si fue causa o factor asociado. Controlar trigliceridos si estan elevados. Consultar si aparece dolor abdominal intenso, fiebre o ictericia. Tras un episodio, definir si hay calculos biliares que requieren tratamiento.',
    quality_level: 4,
    last_reviewed_at: '2026-07-20',
    source_notes: 'Fuentes: MedlinePlus Pancreatitis; NCBI Bookshelf/StatPearls Acute Pancreatitis; AGA guidelines. Contenido educativo, no guia de tratamiento individual.'
  },
  'DIG-007': {
    pathophysiology: 'La enfermedad inflamatoria intestinal agrupa a enfermedad de Crohn y colitis ulcerosa. En Crohn hay inflamacion transmural que puede afectar cualquier tramo del tubo digestivo, con saltos. En colitis ulcerosa la inflamacion es mucosa y continua desde el recto. La disregulacion inmune, la barrera epitelial alterada y la microbiota producen inflamacion cronica que alterna brotes y remision.',
    differential_diagnosis: 'Enfermedad de Crohn vs colitis ulcerosa, colitis infecciosa (Salmonella, Shigella, Campylobacter, C. difficile), colitis isquemica, sindrome de intestino irritable, cancer colorrectal, apendicitis, diverticulitis, enteropatia por AINEs, colitis microscopica.',
    staging: 'La actividad se mide por indices como el Mayo Score (colitis ulcerosa) o el CDAI (Crohn). La extension se clasifica por endoscopia (Montreal). La gravedad incluye brote leve, moderado o grave, y la presencia de complicaciones (estenosos, fistulas, cancer).',
    red_flags: 'Sangrado rectal abundante, dolor abdominal intenso, fiebre, perdida de peso rapida, desnutricion, signos de megacolon toxico (dolor, distension, fiebre, taquicardia), anemia severa. Estos datos requieren evaluacion urgente.',
    monitoring: 'Seguimiento clinico, hemograma, PCR, calprotectina fecal, endoscopia segun evolucion, vigilancia de displasia o cancer segun riesgo y duracion. Controlar osteoporosis, anemia y deficiencias nutricionales.',
    patient_education: 'Explicar que es una enfermedad cronica con brotes y remision. Adherir al tratamiento, no suspender sin indicacion. Consultar si hay sangrado, fiebre, dolor intenso o diarrea persistente. La vigilancia endoscopica es importante por riesgo de cancer.',
    quality_level: 4,
    last_reviewed_at: '2026-07-20',
    source_notes: 'Fuentes: MedlinePlus Inflammatory Bowel Disease; NCBI Bookshelf/StatPearls Ulcerative Colitis, Crohn Disease; AGA guidelines. Contenido educativo, no guia de tratamiento individual.'
  },
  'DIG-008': {
    pathophysiology: 'El sindrome de intestino irritable es un trastorno funcional de la interaccion intestino-cerebro. Hay hipersensibilidad visceral, alteracion de la motilidad, cambios en la microbiota y disregulacion de la barrera epitelial. No produce inflamacion ni dano estructural. El estres, la dieta y las infecciones gastrointestinales previas pueden desencadenar o empeorar los sintomas.',
    differential_diagnosis: 'Enfermedad inflamatoria intestinal, colitis infecciosa, colitis microscopica, enfermedad celiaca, intolerancia a lactosa, malabsorcion, hipotiroidismo, diabetes con gastroparesia, cancer colorrectal, diverticulitis, endometriosis.',
    staging: 'No hay estadificacion. Se clasifica por patron intestinal: IBS-D (diarrea), IBS-C (estrenimiento), IBS-M (mixto) e IBS-U (no clasificado). La gravedad se mide por impacto en la calidad de vida.',
    red_flags: 'Sangre en heces, perdida de peso, anemia, fiebre, dolor que despierta de noche, inicio despues de los 50 anos, antecedentes familiares de cancer colorrectal o EII, diarrea nocturna. Estos datos obligan a descartar enfermedad organica.',
    monitoring: 'Seguimiento clinico. Si los sintomas cambian o aparecen signos de alarma, revaluar. No se requieren pruebas repetidas si el cuadro es estable y sin signos de alarma.',
    patient_education: 'Es una condicion cronica pero no peligrosa. Identificar alimentos que empeoran los sintomas. Manejar el estres. El ejercicio y el sueno ayudan. Consultar si cambian los sintomas o aparecen signos de alarma.',
    quality_level: 4,
    last_reviewed_at: '2026-07-20',
    source_notes: 'Fuentes: MedlinePlus Irritable Bowel Syndrome; NCBI Bookshelf/StatPearls Irritable Bowel Syndrome; ACG guidelines. Contenido educativo, no guia de tratamiento individual.'
  },
  'DIG-009': {
    pathophysiology: 'La diverticulosis consiste en herniaciones de la mucosa a traves de puntos debiles de la pared colica, especialmente donde entran los vasos. La diverticulitis aparece cuando un diverticulo se inflama, generalmente por obstruccion de su cuello con fecalito, estasis y sobrecrecimiento bacteriano. La inflamacion puede producir absceso, perforacion o fistula.',
    differential_diagnosis: 'Apendicitis (especialmente diverticulitis del lado derecho), colitis isquemica, colitis infecciosa, enfermedad inflamatoria intestinal, cancer colorrectal, isquemia mesenterica, dolor ginecologico, colico nefritico, peritonitis de otra causa.',
    staging: 'La gravedad se clasifica por la clasificacion de Hinchey: estadio 0 (sin signos peritoneales), I (absceso pericolico), II (absceso a distancia), III (peritonitis purulenta), IV (peritonitis fecal). Tambien se diferencia entre complicada y no complicada.',
    red_flags: 'Dolor abdominal intenso, fiebre, signos de peritonitis, sangrado rectal abundante, vomitos, imposibilidad de eliminar gases, deterioro del estado general. Estos datos orientan a diverticulitis complicada.',
    monitoring: 'Tras un episodio, confirmar resolucion con imagen si fue complicada. Recomendar colonoscopia tras la recuperacion para descartar otras lesiones. Vigilar recurrencia y complicaciones (estenosis, fistula).',
    patient_education: 'Una dieta rica en fibra puede reducir recurrencia. No se requiere evitar semillas o nueces por evidencia limitada. Consultar si aparece dolor abdominal, fiebre o cambio en el patron intestinal. La mayoria de episodios leves se manejan de forma ambulatoria.',
    quality_level: 4,
    last_reviewed_at: '2026-07-20',
    source_notes: 'Fuentes: MedlinePlus Diverticulosis and Diverticulitis; NCBI Bookshelf/StatPearls Diverticulitis; AGA guidelines. Contenido educativo, no guia de tratamiento individual.'
  },
  'RARE-002': {
    pathophysiology: 'La enfermedad celiaca es una enteropatia autoinmune desencadenada por el gluten en personas con predisposicion genetica (HLA-DQ2/DQ8). Las gliadinas resisten la digestion y cruzan la barrera epitelial. La desamidacion por la transglutaminasa tisular genera peptidos inmunogenicos que activan linfocitos T y producen inflamacion, atrofia vellositaria y malabsorcion.',
    differential_diagnosis: 'Enfermedad de Crohn, colitis microscopica, intolerancia a lactosa, enteropatia por medicamentos, sindrome de intestino irritable, deficiencia de disacaridasas, sobrecrecimiento bacteriano, pancreatopatia cronica, gastroenteritis eosinofilica.',
    staging: 'Se clasifica por serologia, histologia (Marsh-Oberhuber: 0 a 4) y sintomas. La atrofia vellositaria total (Marsh 3) es el hallazgo clasico, pero puede haber enfermedad sin atrofia. La gravedad se mide por sintomas, deficiencias nutricionales y respuesta a la dieta.',
    red_flags: 'Perdida de peso, anemia ferropenica sin causa clara, diarrea cronica, osteoporosis precoz, dermatitis herpetiforme, transaminasas elevadas, deficiencias multiples. En ninos: retraso del crecimiento, distension abdominal, irritabilidad.',
    monitoring: 'Seguimiento de serologia (anticuerpos anti-transglutaminasa), hemograma, hierro, vitamina B12, folato, vitamina D, calcio. Densitometria osea al diagnostico y segun evolucion. Biopsia de control no es rutina pero puede usarse en casos atipicos.',
    patient_education: 'La dieta sin gluten es el tratamiento. Debe ser estricta y de por vida. Consultar si reaparecen sintomas (posible transgresion dietaria o complicacion). Leer etiquetas de alimentos. La contaminacion cruzada importa. Las asociaciones de celiacos ofrecen recursos.',
    quality_level: 4,
    last_reviewed_at: '2026-07-20',
    source_notes: 'Fuentes: MedlinePlus Celiac Disease; NCBI Bookshelf/StatPearls Celiac Disease; ESPGHAN guidelines. Contenido educativo, no guia de tratamiento individual.'
  },
  'RARE-003': {
    pathophysiology: 'La enfermedad de Crohn es una enfermedad inflamatoria cronica de causa multifactorial (genetica, inmune, microbiota, ambiental). Produce inflamacion transmural que puede afectar cualquier tramo desde la boca hasta el ano, con lesiones saltantes y granulomas no caseificantes. La inflamacion produce ulceras, fisuras, fistulas, estenosis y fibrosis. Alterna brotes y remision.',
    differential_diagnosis: 'Colitis ulcerosa, colitis infecciosa, colitis isquemica, enfermedad celiaca, apendicitis, diverticulitis, cancer colorrectal, linfoma intestinal, tuberculosis intestinal, enteropatia por AINEs, sindrome de intestino irritable.',
    staging: 'Se clasifica por localizacion (ileal, colica, ileocolica, upper), por comportamiento (inflamatorio, estenosante, fistulizante) y por actividad (CDAI). La gravedad se mide por brote leve, moderado o grave y por complicaciones.',
    red_flags: 'Sangre en heces, perdida de peso, fiebre, dolor abdominal intenso, masa palpable, fistulas, absceso, desnutricion, anemia severa, retraso del crecimiento en ninos. Estos datos requieren evaluacion urgente.',
    monitoring: 'Seguimiento clinico, hemograma, PCR, calprotectina fecal, endoscopia segun evolucion, vigilancia de displasia o cancer segun riesgo y duracion. Controlar osteoporosis, anemia y deficiencias nutricionales. Vigilar fistulas y estenosis.',
    patient_education: 'Es una enfermedad cronica con brotes y remision. Adherir al tratamiento, no suspender sin indicacion. Consultar si hay dolor intenso, fiebre, sangrado o cambio en el patron intestinal. La cirugia puede ser necesaria para complicaciones. La vigilancia endoscopica es importante.',
    quality_level: 4,
    last_reviewed_at: '2026-07-20',
    source_notes: 'Fuentes: MedlinePlus Crohn Disease; NCBI Bookshelf/StatPearls Crohn Disease; AGA guidelines. Contenido educativo, no guia de tratamiento individual.'
  },
  'RARE-004': {
    pathophysiology: 'La colitis ulcerosa es una enfermedad inflamatoria cronica de causa multifactorial. Produce inflamacion mucosa y continua que inicia en el recto y se extiende proximalmente de forma variable. La disregulacion inmune, la barrera epitelial alterada y la microbiota producen inflamacion con ulceras, exudado y perdida de la arquitectura glandular. Alterna brotes y remision.',
    differential_diagnosis: 'Enfermedad de Crohn, colitis infecciosa (Salmonella, Shigella, Campylobacter, E. coli, C. difficile), colitis isquemica, colitis microscopica, cancer colorrectal, diverticulitis, sindrome de intestino irritable, colitis por radiacion, colitis por AINEs.',
    staging: 'Se clasifica por extension (proctitis ulcerosa, colitis izquierda, pancolitis) y por actividad (Mayo Score, Montreal). La gravedad incluye brote leve, moderado o grave, y la presencia de complicaciones (megacolon toxico, cancer).',
    red_flags: 'Sangre en heces abundante, dolor abdominal intenso, fiebre, perdida de peso, signos de megacolon toxico (dolor, distension, fiebre, taquicardia), anemia severa, deshidratacion. Estos datos requieren evaluacion urgente.',
    monitoring: 'Seguimiento clinico, hemograma, PCR, calprotectina fecal, endoscopia segun evolucion, vigilancia de displasia o cancer segun riesgo y duracion (generalmente a partir de 8 anos de enfermedad). Controlar osteoporosis, anemia y deficiencias nutricionales.',
    patient_education: 'Es una enfermedad cronica con brotes y remision. Adherir al tratamiento, no suspender sin indicacion. Consultar si hay sangrado, fiebre, dolor intenso o diarrea persistente. La vigilancia endoscopica es importante por riesgo de cancer colorrectal.',
    quality_level: 4,
    last_reviewed_at: '2026-07-20',
    source_notes: 'Fuentes: MedlinePlus Ulcerative Colitis; NCBI Bookshelf/StatPearls Ulcerative Colitis; AGA guidelines. Contenido educativo, no guia de tratamiento individual.'
  },
  'HEP-002': {
    pathophysiology: 'La cirrosis es la etapa final de la hepatopatia cronica. La lesion repetida produce necrosis hepatocelular, regeneracion nodular y fibrosis que distorsiona la arquitectura hepatica. La perdida de hepatocitos funcionales y el flujo sanguineo alterado producen hipertension portal y falla hepatocelular. Las causas mas frecuentes son alcohol, hepatitis B/C y esteatosis hepatica metabolica.',
    differential_diagnosis: 'Esteatosis hepatica metabolica sin cirrosis, hepatitis cronica, fibrosis hepatica no cirrotica, hipertension portal no cirrotica, sindrome de Budd-Chiari, enfermedad veno-oclusiva, hipertension portal prehepatica, cirrosis biliar primaria, colangitis esclerosante primaria.',
    staging: 'Se clasifica por Child-Pugh (A, B, C) y por MELD (Model for End-stage Liver Disease). La compensacion o descompensacion (ascitis, encefalopatia, sangrado variceal, ictericia) define el pronostico. La fibrosis se mide por elastografia o biopsia (METAVIR 0-4).',
    red_flags: 'Hemorragia digestiva por varices, encefalopatia hepatica, ascitis refractaria, peritonitis bacteriana espontanea, ictericia, coagulopatia, hipoglucemia, sindrome hepatorenal. Estos datos indican descompensacion y requieren urgencia.',
    monitoring: 'Vigilar funcion hepatica, coagulacion, hemograma, electrolitos, funcion renal, alfafetoproteina, ecografia abdominal para hepatocarcinoma, endoscopia para varices, densitometria osea. Vacunacion para hepatitis A y B, neumococo e influenza.',
    patient_education: 'Evitar alcohol y farmacos hepatotoxicos sin indicacion. Consultar si aparece ictericia, ascitis, sangrado, confusion o dolor abdominal. La cirrosis requiere seguimiento de por vida. La vacunacion y el cribado de hepatocarcinoma son importantes.',
    quality_level: 4,
    last_reviewed_at: '2026-07-20',
    source_notes: 'Fuentes: MedlinePlus Cirrhosis; NCBI Bookshelf/StatPearls Cirrhosis; AASLD guidelines. Contenido educativo, no guia de tratamiento individual.'
  },
  'HEP-003': {
    pathophysiology: 'La esteatosis hepatica metabolica (antes EHGNA) es la acumulacion de trigliceridos en hepatocitos sin alcohol u otra causa secundaria. Se asocia a obesidad, diabetes tipo 2, dislipidemia y sindrome metabolico. La lipotoxicidad, el estres oxidativo y la inflamacion producen esteatohepatitis (balloonamiento, inflamacion, fibrosis) que puede progresar a cirrosis.',
    differential_diagnosis: 'Esteatosis alcoholica, hepatitis cronica viral, hepatopatia metabolica (hemocromatosis, enfermedad de Wilson), hepatopatia autoinmune, efectos farmacologicos, desnutricion, nutricion parenteral, hepatitis aguda.',
    staging: 'La gravedad se mide por histologia (NAS score, SAF score) o por elastografia (FibroScan). Se clasifica en esteatosis simple, esteatohepatitis (NASH/MASH) y fibrosis (F0-F4). La cirrosis es la etapa final. El riesgo cardiovascular es la principal causa de mortalidad.',
    red_flags: 'Elevacion persistente de transaminasas, signos de cirrosis (ascitis, ictericia, sangrado, confusion), perdida de peso sin causa, dolor abdominal. La mayoria de pacientes estan asintomaticos y se detectan por analitica o imagen.',
    monitoring: 'Seguimiento de transaminasas, funcion hepatica, perfil lipidico, glucosa/HbA1c, elastografia segun evolucion. Vigilar signos de fibrosis progresiva o cirrosis. Controlar factores cardiovasculares (presion, lipidos, glucosa).',
    patient_education: 'La perdida de peso (5-10%), el ejercicio y la dieta mediterranea son la base del tratamiento. Controlar diabetes, hipertension y dislipidemia. Evitar alcohol. Consultar si hay dolor abdominal, ictericia o perdida de peso. No todos los pacientes progresan a cirrosis.',
    quality_level: 4,
    last_reviewed_at: '2026-07-20',
    source_notes: 'Fuentes: MedlinePlus Fatty Liver Disease; NCBI Bookshelf/StatPearls Nonalcoholic Fatty Liver Disease; AASLD guidelines. Contenido educativo, no guia de tratamiento individual.'
  }
};

// Aplicar enriquecimiento
let updated = 0;
for (const disease of diseases) {
  const update = enrichment[disease.disease_code];
  if (update) {
    Object.assign(disease, update);
    updated++;
  }
}

// Escribir de vuelta
fs.writeFileSync(dataPath, JSON.stringify(diseases, null, 2), 'utf8');
console.log(`Enriquecidas ${updated} enfermedades digestivas y hepatobiliares.`);
console.log('Codigos actualizados:', Object.keys(enrichment).join(', '));