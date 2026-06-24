// diseases.js - Manejo de enfermedades y controles del repositorio
let diseaseData = [];
let selectedDiseaseCode = null;

const glossaryDefinitions = {
  'acido': 'Contenido gastrico con pH bajo que ayuda a digerir alimentos, pero puede irritar esofago o mucosa si supera las barreras protectoras.',
  'albumina': 'Proteina producida por el higado que ayuda a mantener volumen intravascular; baja en inflamacion, malnutricion o falla hepatica.',
  'apendice': 'Prolongacion estrecha que nace del ciego. Puede inflamarse si se obstruye su luz interna.',
  'bazo': 'Organo linfoide que filtra sangre y participa en respuesta inmune; puede crecer en hipertension portal.',
  'bilirrubina': 'Pigmento producido al degradar hemoglobina. Su aumento puede causar ictericia.',
  'calprotectina': 'Marcador en heces que sugiere inflamacion intestinal cuando esta elevado.',
  'ciego': 'Primera porcion del colon, ubicada en la fosa iliaca derecha. De alli nace el apendice.',
  'coledoco': 'Conducto principal que lleva bilis desde higado/vesicula hacia el duodeno.',
  'colon': 'Parte final del intestino grueso; absorbe agua y forma las heces.',
  'duodeno': 'Primera porcion del intestino delgado, conectada al estomago y a la salida biliar/pancreatica.',
  'ecografia': 'Prueba de imagen con ultrasonido. En abdomen ayuda a ver vesicula, via biliar, higado y algunas inflamaciones.',
  'endoscopia': 'Exploracion con camara dentro del tubo digestivo para ver mucosa, tomar biopsias o tratar sangrados.',
  'esfinter esofagico inferior': 'Anillo muscular entre esofago y estomago que limita el reflujo.',
  'esofago': 'Tubo muscular que lleva alimentos desde la boca hasta el estomago.',
  'estomago': 'Organo que recibe alimentos, produce acido y los mezcla antes de pasarlos al duodeno.',
  'fosa iliaca derecha': 'Region inferior derecha del abdomen, zona tipica de dolor en apendicitis.',
  'gastritis': 'Inflamacion de la mucosa del estomago, usualmente por H. pylori, AINEs, alcohol u otros irritantes.',
  'hepatocitos': 'Celulas principales del higado; metabolizan, producen bilis y sintetizan proteinas.',
  'higado': 'Organo que metaboliza nutrientes y toxicos, produce bilis y sintetiza proteinas como albumina y factores de coagulacion.',
  'inr': 'Prueba de coagulacion. Si sube en enfermedad hepatica aguda puede sugerir deterioro funcional.',
  'intestino delgado': 'Segmento digestivo donde ocurre gran parte de la absorcion de nutrientes.',
  'lipasa': 'Enzima pancreatica que suele elevarse en pancreatitis aguda.',
  'luz apendicular': 'Espacio interno del apendice. Si se obstruye, aumenta la presion y puede iniciar apendicitis.',
  'mucosa': 'Capa interna que recubre organos huecos como estomago, intestino y esofago.',
  'mucosa gastrica': 'Revestimiento interno del estomago, protegido por moco y bicarbonato frente al acido.',
  'pancreas': 'Organo que produce enzimas digestivas e insulina. Su inflamacion aguda se llama pancreatitis.',
  'pared engrosada': 'Hallazgo de imagen que sugiere inflamacion, edema o infiltracion en una pared organica.',
  'peritoneo': 'Membrana que recubre la cavidad abdominal. Si se inflama produce dolor intenso y signos peritoneales.',
  'vesicula': 'Saco bajo el higado que almacena y concentra bilis.',
  'via biliar': 'Sistema de conductos que transporta bilis desde el higado y vesicula al intestino.',
  'vellosidades': 'Proyecciones del intestino delgado que aumentan superficie de absorcion.',
  'ampolla': 'Elevacion de liquido entre epidermis y dermis superficial; aparece en quemaduras de espesor parcial o friccion.',
  'barrera cutanea': 'Funcion protectora de la epidermis que evita perdida de agua y entrada de irritantes o microorganismos.',
  'candida': 'Hongo que puede sobreinfectar pliegues humedos, especialmente en dermatitis del panal.',
  'comedon': 'Tapon folicular de queratina y sebo; puede ser abierto o cerrado.',
  'dermis': 'Capa intermedia de la piel con vasos, nervios, colageno y estructuras anexas.',
  'edema': 'Acumulacion de liquido en tejidos; en piel produce aumento de volumen o tension.',
  'emoliente': 'Producto hidratante que restaura barrera cutanea y reduce sequedad.',
  'epidermis': 'Capa mas externa de la piel; actua como barrera frente a irritantes, infecciones y perdida de agua.',
  'eritema': 'Enrojecimiento de la piel por aumento del flujo sanguineo o inflamacion.',
  'escama': 'Lamina superficial de queratina desprendida; comun en psoriasis y dermatitis.',
  'excoriacion': 'Raspado o erosion superficial producido por rascado.',
  'foliculo pilosebaceo': 'Unidad formada por pelo y glandula sebacea; es el sitio central del acne.',
  'inmunidad tipo 2': 'Patron inmunologico asociado a alergia, prurito e inflamacion atopica.',
  'liquenificacion': 'Engrosamiento de la piel por rascado cronico.',
  'necrosis': 'Muerte de tejido; en quemaduras profundas o infecciones graves indica dano severo.',
  'piel': 'Organo de barrera que incluye epidermis, dermis, anexos y tejido subcutaneo.',
  'placa': 'Lesion elevada o engrosada de superficie amplia; tipica en psoriasis.',
  'prurito': 'Sensacion de picazon que induce rascado.',
  'pustula': 'Lesion elevada con contenido purulento.',
  'tejido subcutaneo': 'Capa profunda bajo la dermis con grasa, vasos y tejido conectivo.',
  'unidad pilosebacea': 'Conjunto de foliculo piloso y glandula sebacea donde se originan comedones y acne.'
  ,
  'adenopatia': 'Aumento de tamano de ganglios linfaticos por infeccion, inflamacion o neoplasia.',
  'aerosoles': 'Particulas respiratorias pequenas que pueden permanecer suspendidas y transmitir infecciones.',
  'antigeno ns1': 'Proteina del dengue detectable temprano en sangre durante los primeros dias de enfermedad.',
  'baciloscopia': 'Examen microscopico de esputo para buscar bacilos acido-alcohol resistentes como tuberculosis.',
  'carga viral': 'Cantidad de material genetico viral en sangre o muestra; sirve para seguimiento de infecciones como VIH o hepatitis.',
  'cd4': 'Linfocitos T colaboradores que coordinan respuesta inmune; VIH los destruye progresivamente.',
  'chancro': 'Ulcera generalmente indolora de sifilis primaria en el sitio de inoculacion.',
  'choque': 'Estado de mala perfusion tisular; en infecciones puede ocurrir por sepsis o fuga vascular.',
  'coriza': 'Congestion y secrecion nasal; clasica en sarampion junto con tos y conjuntivitis.',
  'dermatoma': 'Zona de piel inervada por una raiz nerviosa sensitiva; herpes zoster suele seguir un dermatoma.',
  'exantema': 'Erupcion cutanea generalizada, frecuente en infecciones virales.',
  'ganglio sensitivo': 'Estructura nerviosa donde permanecen latentes algunos virus, como varicela-zoster.',
  'gota gruesa': 'Prueba microscopica de sangre concentrada para detectar parasitos de malaria.',
  'hemocultivo': 'Cultivo de sangre para identificar microorganismos en bacteriemia o sepsis.',
  'hipoxemia': 'Baja concentracion de oxigeno en sangre.',
  'ictericia': 'Color amarillo de piel y ojos por aumento de bilirrubina.',
  'infeccion latente': 'Presencia de un microorganismo controlado o dormido, sin enfermedad activa evidente.',
  'linfocito cd4': 'Celula inmune que coordina defensas; blanco principal del VIH.',
  'meninges': 'Membranas que rodean cerebro y medula espinal.',
  'neuralgia postherpetica': 'Dolor persistente despues de herpes zoster por dano o sensibilizacion nerviosa.',
  'pcr': 'Prueba molecular que detecta material genetico de microorganismos; tambien puede referirse a proteina C reactiva segun contexto.',
  'plasmodium': 'Parasito causante de malaria que pasa por higado y globulos rojos.',
  'prueba antigenica': 'Prueba que detecta proteinas de un virus o microorganismo.',
  'puncion lumbar': 'Procedimiento para obtener liquido cefalorraquideo y estudiar meningitis u otras enfermedades neurologicas.',
  'saturacion': 'Porcentaje de hemoglobina con oxigeno; se mide con oximetro.',
  'sepsis': 'Disfuncion organica causada por respuesta desregulada a una infeccion.',
  'shock septico': 'Sepsis con hipotension persistente y alteracion de perfusion que requiere soporte urgente.',
  'treponema pallidum': 'Bacteria espiroqueta que causa sifilis.',
  'vesicula cutanea': 'Lesion pequena elevada con liquido claro en la piel.',
  'viremia': 'Presencia de virus en sangre.',
  'virus varicela-zoster': 'Virus que causa varicela en infeccion primaria y herpes zoster al reactivarse.',
  'adrenalina': 'Medicamento de primera linea para anafilaxia con compromiso respiratorio o circulatorio.',
  'alergeno': 'Sustancia que desencadena respuesta alergica en una persona sensibilizada.',
  'anafilaxia': 'Reaccion alergica sistemica rapida que puede comprometer respiracion, circulacion o varios organos.',
  'carboxihemoglobina': 'Hemoglobina unida a monoxido de carbono; reduce transporte de oxigeno.',
  'celula de reed-sternberg': 'Celula tumoral caracteristica del linfoma de Hodgkin.',
  'eritrocito': 'Globulo rojo encargado de transportar oxigeno mediante hemoglobina.',
  'ferritina': 'Proteina que refleja reservas de hierro corporal; baja sugiere deficit de hierro.',
  'folato': 'Vitamina necesaria para sintesis de ADN y maduracion normal de celulas sanguineas.',
  'hemoglobina': 'Proteina de los globulos rojos que transporta oxigeno.',
  'ige': 'Inmunoglobulina E; anticuerpo asociado a alergias inmediatas y anafilaxia.',
  'linfoblasto': 'Celula linfoide inmadura; se acumula en leucemia linfoblastica aguda.',
  'mastocito': 'Celula inmune que libera histamina y otros mediadores en reacciones alergicas.',
  'medula osea': 'Tejido dentro de huesos donde se producen globulos rojos, blancos y plaquetas.',
  'monoxido de carbono': 'Gas toxico sin olor que se une a hemoglobina con alta afinidad y causa hipoxia.',
  'neutropenia': 'Disminucion de neutrofilos que aumenta riesgo de infecciones bacterianas o fungicas.',
  'plaquetas': 'Fragmentos celulares que participan en coagulacion; bajas aumentan riesgo de sangrado.',
  'reticulocito': 'Globulo rojo joven; ayuda a evaluar respuesta de medula osea.',
  'triptasa': 'Marcador liberado por mastocitos que puede apoyar diagnostico retrospectivo de anafilaxia.',
  'urticaria': 'Ronchas elevadas y pruriginosas por liberacion de mediadores inflamatorios.',
  'vitamina b12': 'Vitamina necesaria para sintesis de ADN y funcion neurologica.',
  'adiposidad visceral': 'Grasa acumulada alrededor de organos abdominales; se asocia a resistencia insulinica y riesgo cardiovascular.',
  'ck': 'Creatina quinasa; enzima muscular que sube en rabdomiolisis o dano muscular.',
  'colesterol ldl': 'Particula lipoproteica que transporta colesterol hacia tejidos y participa en aterosclerosis.',
  'deshidratacion': 'Deficit de agua corporal que puede reducir perfusion y alterar electrolitos.',
  'electrolitos': 'Minerales como sodio, potasio y cloro que regulan agua, nervios, musculo y ritmo cardiaco.',
  'hdl': 'Lipoproteina de alta densidad; participa en transporte reverso de colesterol.',
  'imc': 'Indice de masa corporal; relacion peso/talla usada como tamizaje de exceso o deficit ponderal.',
  'insulinorresistencia': 'Respuesta reducida a la insulina; obliga al cuerpo a producir mas insulina y favorece hiperglucemia.',
  'osmolaridad': 'Medida de concentracion de solutos en sangre; ayuda a valorar estados de agua y sodio.',
  'pth': 'Hormona paratiroidea; regula calcio y fosforo, aumenta cuando falta vitamina D o calcio.',
  'rabdomiolisis': 'Destruccion muscular que libera CK y mioglobina, con riesgo de lesion renal.',
  'sarcopenia': 'Perdida de masa y fuerza muscular, frecuente en desnutricion, edad avanzada o enfermedad cronica.',
  'tejido adiposo': 'Tejido que almacena energia como grasa y produce señales hormonales e inflamatorias.',
  'termorregulacion': 'Capacidad del cuerpo de mantener temperatura central mediante sudor, vasodilatacion, escalofrios y conducta.',
  'trigliceridos': 'Tipo de grasa en sangre; niveles muy altos pueden provocar pancreatitis.',
  'vitamina d': 'Vitamina/hormona necesaria para absorcion de calcio y salud osteomuscular.',
  'anti-ccp': 'Autoanticuerpo dirigido contra peptidos citrulinados; apoya diagnostico y pronostico en artritis reumatoide.',
  'ana': 'Anticuerpos antinucleares; prueba sensible para lupus y otras enfermedades autoinmunes.',
  'anquilosis': 'Fusion o rigidez permanente de una articulacion.',
  'cartilago': 'Tejido liso que cubre superficies articulares y permite movimiento con baja friccion.',
  'cristales de urato': 'Depositos de urato monosodico que desencadenan inflamacion intensa en gota.',
  'densitometria dxa': 'Prueba que mide densidad mineral osea para diagnosticar osteoporosis.',
  'entesis': 'Zona donde tendon o ligamento se inserta en hueso; se inflama en espondiloartritis.',
  'factor reumatoide': 'Autoanticuerpo asociado a artritis reumatoide, aunque no es completamente especifico.',
  'hla-b27': 'Marcador genetico asociado a espondilitis anquilosante y otras espondiloartritis.',
  'pannus': 'Tejido sinovial inflamatorio que invade cartilago y hueso en artritis reumatoide.',
  'sacroiliaca': 'Articulacion entre sacro y pelvis; sitio clave en espondilitis anquilosante.',
  'sinovia': 'Membrana que recubre articulaciones y produce liquido sinovial.',
  'sinovitis': 'Inflamacion de la sinovia, con dolor, calor, hinchazon y rigidez.',
  'tofo': 'Deposito visible o palpable de cristales de urato en gota cronica.',
  'uveitis': 'Inflamacion ocular que puede causar dolor, ojo rojo y sensibilidad a la luz.',
  'vsg': 'Velocidad de sedimentacion globular; marcador inespecifico de inflamacion.',
  'adherencia pelvica': 'Banda de tejido cicatricial que une organos o superficies dentro de la pelvis.',
  'endometrio': 'Revestimiento interno del utero que cambia con el ciclo menstrual y se desprende en menstruacion.',
  'eclampsia': 'Convulsiones en contexto de preeclampsia, sin otra causa neurologica principal.',
  'embarazo ectopico': 'Embarazo implantado fuera de la cavidad uterina, usualmente en trompa.',
  'hellp': 'Complicacion severa del embarazo con hemolisis, enzimas hepaticas elevadas y plaquetas bajas.',
  'miometrio': 'Capa muscular del utero donde se originan los miomas.',
  'mioma': 'Tumor benigno del musculo uterino que puede crecer hacia cavidad, pared o superficie uterina.',
  'placenta': 'Organo temporal del embarazo que permite intercambio entre madre y feto.',
  'placentacion': 'Proceso por el que la placenta invade y adapta vasos uterinos para sostener embarazo.',
  'proteinuria': 'Presencia elevada de proteina en orina; puede indicar daño renal o preeclampsia.',
  'trompa uterina': 'Conducto que conecta ovario y utero; puede afectarse en EIP o embarazo ectopico.',
  'utero': 'Organo muscular donde se implanta y desarrolla el embarazo.',
  'angiografia retinal': 'Prueba con contraste para ver flujo y fuga en vasos de la retina.',
  'audiometria': 'Prueba que mide umbrales de audicion y ayuda a clasificar hipoacusia.',
  'canales semicirculares': 'Estructuras del oido interno que detectan movimientos de rotacion de la cabeza.',
  'campimetria': 'Prueba que mide campo visual, clave en glaucoma.',
  'coclea': 'Organo del oido interno que convierte vibraciones sonoras en señales nerviosas.',
  'conjuntiva': 'Membrana transparente que cubre parte blanca del ojo y cara interna de parpados.',
  'cristalino': 'Lente natural del ojo que enfoca luz sobre la retina.',
  'edema macular': 'Acumulacion de liquido en la macula que causa vision borrosa.',
  'lente intraocular': 'Lente artificial implantada para reemplazar cristalino opaco en cirugia de catarata.',
  'macula': 'Zona central de la retina responsable de vision fina y lectura.',
  'nervio auditivo': 'Nervio que lleva señales sonoras desde coclea al cerebro.',
  'nervio optico': 'Nervio que lleva informacion visual desde retina al cerebro.',
  'nistagmo': 'Movimiento ocular involuntario rítmico, util para evaluar vertigo.',
  'oct': 'Tomografia de coherencia optica; imagen de capas de retina o nervio optico.',
  'oido medio': 'Cavidad detras del timpano con huesecillos que transmiten sonido.',
  'otolitos': 'Cristales del utriculo que ayudan a detectar gravedad; si se desplazan causan VPPB.',
  'otoscopia': 'Examen visual del conducto auditivo y timpano con otoscopio.',
  'presion intraocular': 'Presion dentro del ojo; elevada puede dañar nervio optico en glaucoma.',
  'retina': 'Tejido nervioso sensible a luz en el fondo del ojo.',
  'retinografia': 'Fotografia del fondo de ojo para evaluar retina y vasos.',
  'timpano': 'Membrana que vibra con sonido y separa conducto externo de oido medio.',
  'trompa de eustaquio': 'Conducto que conecta oido medio con nasofaringe y equilibra presion.',
  'alucinacion': 'Percepcion sin estimulo externo, como escuchar voces cuando no hay una fuente sonora real.',
  'anhedonia': 'Disminucion marcada de interes o placer en actividades que antes resultaban gratificantes.',
  'biopsia': 'Toma de tejido para estudio microscopico; confirma muchas neoplasias y define tipo celular.',
  'bronquiectasia': 'Dilatacion cronica de bronquios por dano de pared e infeccion repetida, con tos y secreciones.',
  'bronquiolo': 'Rama pequena de la via aerea que conduce aire hacia alveolos; se inflama en bronquiolitis.',
  'cea': 'Antigeno carcinoembrionario; marcador que puede ayudar en seguimiento de cancer colorrectal, no como tamizaje aislado.',
  'cftr': 'Canal de cloro alterado en fibrosis quistica; su falla vuelve espesas secreciones de pulmon y pancreas.',
  'citologia': 'Estudio de celulas, como el Papanicolaou cervical, para detectar lesiones precancerosas.',
  'colposcopia': 'Exploracion ampliada del cuello uterino para localizar lesiones y dirigir biopsia.',
  'delirio': 'Creencia fija falsa que se mantiene pese a evidencia en contra; puede aparecer en psicosis.',
  'enzimas pancreaticas': 'Proteinas digestivas producidas por pancreas; pueden requerirse como reemplazo en insuficiencia pancreatica.',
  'estadificacion': 'Proceso de medir extension de un cancer: tumor local, ganglios y metastasis.',
  'ganglio centinela': 'Primer ganglio que drena un tumor; ayuda a estimar diseminacion regional.',
  'gleason': 'Sistema histologico que gradua agresividad del cancer de prostata segun patron glandular.',
  'her2': 'Receptor de crecimiento que puede estar sobreexpresado en algunos canceres de mama y orientar terapia dirigida.',
  'hipomania': 'Elevacion anormal de animo y energia menos intensa que mania, sin deterioro grave ni psicosis obligada.',
  'ideacion suicida': 'Pensamientos sobre morir o hacerse dano; requiere evaluacion clinica directa de riesgo y proteccion.',
  'isrs': 'Inhibidores selectivos de recaptacion de serotonina; grupo de antidepresivos usados en depresion y ansiedad.',
  'absceso': 'Coleccion localizada de pus por infeccion; puede requerir drenaje ademas de antibioticos.',
  'alt/ast': 'Enzimas hepaticas que suben cuando hay dano o inflamacion de hepatocitos.',
  'alveolos': 'Sacos microscopicos del pulmon donde ocurre intercambio de oxigeno y dioxido de carbono.',
  'anemia': 'Disminucion de hemoglobina o globulos rojos que reduce transporte de oxigeno.',
  'arritmia': 'Alteracion del ritmo cardiaco; puede ser lenta, rapida, irregular o peligrosa segun origen y contexto.',
  'bronquios': 'Conductos respiratorios que llevan aire desde traquea hacia zonas mas pequenas del pulmon.',
  'cerebro': 'Organo central del sistema nervioso; integra movimiento, sensibilidad, cognicion, emociones y conducta.',
  'confusion': 'Alteracion de atencion, orientacion o pensamiento; puede indicar infeccion, hipoxia, farmacos, metabolismo o dano neurologico.',
  'corazon': 'Bomba muscular que impulsa sangre a pulmones y resto del cuerpo mediante cavidades, valvulas y sistema electrico.',
  'creatinina': 'Producto muscular eliminado por rinon; se usa para estimar filtracion renal junto con edad, sexo y otras variables.',
  'diagnostico clinico': 'Diagnostico basado en historia y examen fisico; puede apoyarse en pruebas cuando hay duda o gravedad.',
  'dolor': 'Experiencia sensitiva y emocional de dano real o potencial; localizacion, inicio e irradiacion orientan diagnostico.',
  'ecg': 'Electrocardiograma; registra actividad electrica cardiaca y ayuda a detectar isquemia, arritmias y bloqueos.',
  'estenosis': 'Estrechamiento de un conducto, vaso, valvula o luz organica que dificulta paso de aire, sangre o contenido.',
  'fiebre': 'Elevacion regulada de temperatura corporal, usualmente por infeccion o inflamacion.',
  'ganglios': 'Estructuras linfaticas que filtran linfa y participan en respuesta inmune; pueden crecer por infeccion, inflamacion o cancer.',
  'glucosa': 'Azucar principal en sangre; fuente de energia y marcador clave en diabetes, hipoglucemia o estres metabolico.',
  'hba1c': 'Hemoglobina glucosilada; estima promedio de glucosa de los ultimos 2 a 3 meses.',
  'hemograma': 'Analisis de sangre que mide globulos rojos, blancos y plaquetas; orienta anemia, infeccion, inflamacion o sangrado.',
  'hueso': 'Tejido mineralizado que da soporte, protege organos y participa en metabolismo de calcio y fosforo.',
  'leucocitos': 'Globulos blancos de defensa; pueden subir por infeccion/inflamacion o bajar por medula, farmacos o enfermedad.',
  'lipidos': 'Grasas sanguineas como colesterol y trigliceridos; se relacionan con riesgo cardiovascular y metabolismo.',
  'mania': 'Estado de animo elevado o irritable con energia aumentada, poco sueño, impulsividad y deterioro funcional.',
  'metastasis': 'Diseminacion de celulas malignas desde un tumor primario hacia organos o ganglios distantes.',
  'moco': 'Secrecion que atrapa particulas y protege mucosas; si aumenta o se espesa puede obstruir vias o conductos.',
  'musculo': 'Tejido contractil que permite movimiento, postura, respiracion y funciones viscerales.',
  'neumonia': 'Infeccion del parenquima pulmonar que inflama alveolos y puede producir consolidacion e hipoxemia.',
  'polipo': 'Crecimiento que sobresale de una mucosa; algunos polipos colorrectales pueden progresar a cancer.',
  'pulmon': 'Organo respiratorio donde bronquios y alveolos permiten ventilacion e intercambio gaseoso.',
  'prueba de sudor': 'Prueba que mide cloro en sudor; es clave para diagnosticar fibrosis quistica.',
  'psa': 'Antigeno prostatico especifico; marcador producido por prostata que se interpreta con edad, riesgo y contexto.',
  'psicosis': 'Perdida de contacto con la realidad, con delirios, alucinaciones o pensamiento desorganizado.',
  'receptores hormonales': 'Proteinas tumorales que responden a estrogeno o progesterona; orientan tratamiento en cancer de mama.',
  'rinon': 'Organo que filtra sangre, regula agua/electrolitos, elimina desechos y participa en presion arterial y eritropoyesis.',
  'sangrado': 'Salida de sangre de vasos; puede ser visible u oculto y causar anemia, choque o necesidad de control urgente.',
  'seguimiento': 'Control clinico posterior para verificar respuesta, detectar complicaciones y ajustar manejo.',
  'sintomas negativos': 'Perdida de funciones como iniciativa, expresion emocional o motivacion, frecuente en esquizofrenia.',
  'vasos': 'Conductos sanguineos arteriales, venosos o capilares que transportan sangre y sostienen perfusion de tejidos.',
  'vph': 'Virus del papiloma humano; algunos tipos causan lesiones precancerosas y cancer cervicouterino.',
  'vrs': 'Virus respiratorio sincitial; causa frecuente de bronquiolitis en lactantes.'
};

const diseaseSourceLinks = {
  'REN-001': [
    ['NIDDK Kidney Disease', 'https://www.niddk.nih.gov/health-information/kidney-disease'],
    ['MedlinePlus CKD', 'https://medlineplus.gov/chronickidneydisease.html'],
    ['NCBI CKD StatPearls', 'https://www.ncbi.nlm.nih.gov/books/NBK535404/'],
    ['KDIGO 2024 CKD', 'https://kdigo.org/wp-content/uploads/2024/03/KDIGO-2024-CKD-Guideline.pdf']
  ],
  'REN-002': [
    ['MedlinePlus Glomerulonephritis', 'https://medlineplus.gov/ency/article/000484.htm'],
    ['MedlinePlus Espanol', 'https://medlineplus.gov/spanish/ency/article/000484.htm'],
    ['NCBI Glomerulonephritis', 'https://www.ncbi.nlm.nih.gov/books/NBK560644/']
  ],
  'REN-003': [
    ['NIDDK Nephrotic Syndrome', 'https://www.niddk.nih.gov/health-information/kidney-disease/nephrotic-syndrome-adults'],
    ['NCBI Nephrotic Syndrome', 'https://www.ncbi.nlm.nih.gov/books/NBK470444/']
  ],
  'REN-004': [
    ['NIDDK Kidney Infection', 'https://www.niddk.nih.gov/health-information/urologic-diseases/kidney-infection-pyelonephritis'],
    ['MedlinePlus Kidney Infection', 'https://medlineplus.gov/ency/article/000522.htm'],
    ['NCBI Acute Pyelonephritis', 'https://www.ncbi.nlm.nih.gov/books/NBK519537/']
  ],
  'REN-005': [
    ['NIDDK Kidney Stones', 'https://www.niddk.nih.gov/health-information/urologic-diseases/kidney-stones'],
    ['MedlinePlus Kidney Stones', 'https://medlineplus.gov/kidneystones.html'],
    ['NCBI Nephrolithiasis', 'https://www.ncbi.nlm.nih.gov/books/NBK559227/']
  ],
  'REN-006': [
    ['MedlinePlus Acute Kidney Failure', 'https://medlineplus.gov/ency/article/000501.htm'],
    ['National Kidney Foundation AKI', 'https://www.kidney.org/kidney-topics/acute-kidney-injury-aki'],
    ['KDIGO AKI', 'https://kdigo.org/guidelines/acute-kidney-injury/']
  ],
  'REN-007': [
    ['NIDDK Diabetic Kidney Disease', 'https://www.niddk.nih.gov/health-information/diabetes/overview/preventing-problems/diabetic-kidney-disease'],
    ['MedlinePlus Diabetes and Kidney Disease', 'https://medlineplus.gov/diabetesandkidneydisease.html'],
    ['KDIGO Diabetes in CKD', 'https://kdigo.org/guidelines/diabetes-ckd/']
  ],
  'REN-008': [
    ['MedlinePlus Hydronephrosis', 'https://medlineplus.gov/ency/article/000506.htm'],
    ['National Kidney Foundation Hydronephrosis', 'https://www.kidney.org/kidney-topics/hydronephrosis'],
    ['NIDDK Urinary Tract', 'https://www.niddk.nih.gov/health-information/urologic-diseases/urinary-tract-how-it-works']
  ],
  'ENDO-001': [
    ['MedlinePlus Type 2 Diabetes', 'https://medlineplus.gov/diabetestype2.html'],
    ['MedlinePlus Espanol', 'https://medlineplus.gov/spanish/diabetestype2.html'],
    ['NIDDK Diabetes', 'https://www.niddk.nih.gov/health-information/diabetes/overview/symptoms-causes']
  ],
  'CARD-002': [
    ['MedlinePlus Hypertension', 'https://medlineplus.gov/ency/article/000468.htm'],
    ['MedlinePlus BP Medicines', 'https://medlineplus.gov/bloodpressuremedicines.html']
  ],
  'CARD-001': [
    ['MedlinePlus Heart Attack', 'https://medlineplus.gov/heartattack.html'],
    ['MedlinePlus Encyclopedia', 'https://medlineplus.gov/ency/article/000195.htm']
  ],
  'RESP-002': [
    ['NHLBI Asthma', 'https://www.nhlbi.nih.gov/health/asthma'],
    ['NHLBI Diagnosis', 'https://www.nhlbi.nih.gov/health/asthma/diagnosis'],
    ['MedlinePlus Asthma', 'https://medlineplus.gov/asthma.html']
  ],
  'RESP-001': [
    ['CDC Pneumonia', 'https://www.cdc.gov/pneumonia/about/index.html'],
    ['MedlinePlus Pneumonia', 'https://medlineplus.gov/pneumonia.html']
  ],
  'DIG-001': [
    ['MedlinePlus Appendicitis', 'https://medlineplus.gov/appendicitis.html'],
    ['MedlinePlus Apendicitis', 'https://medlineplus.gov/spanish/appendicitis.html'],
    ['MedlinePlus Tests', 'https://medlineplus.gov/lab-tests/appendicitis-tests/']
  ],
  'DIG-004': [
    ['MedlinePlus Enfermedades del estomago', 'https://medlineplus.gov/spanish/stomachdisorders.html']
  ],
  'DIG-005': [
    ['MedlinePlus Ulcera peptica', 'https://medlineplus.gov/spanish/pepticulcer.html']
  ],
  'DIG-006': [
    ['MedlinePlus Pancreatitis', 'https://medlineplus.gov/spanish/pancreatitis.html']
  ],
  'DIG-007': [
    ['MedlinePlus Colitis ulcerativa', 'https://medlineplus.gov/spanish/ulcerativecolitis.html'],
    ['MedlinePlus Enfermedad de Crohn', 'https://medlineplus.gov/spanish/crohnsdisease.html']
  ],
  'DIG-008': [
    ['MedlinePlus Sindrome del intestino irritable', 'https://medlineplus.gov/spanish/irritablebowelsyndrome.html']
  ],
  'DIG-009': [
    ['MedlinePlus Diverticulosis y diverticulitis', 'https://medlineplus.gov/spanish/diverticulosisanddiverticulitis.html']
  ],
  'RARE-002': [
    ['MedlinePlus Enfermedad celiaca', 'https://medlineplus.gov/spanish/celiacdisease.html']
  ],
  'RARE-003': [
    ['MedlinePlus Enfermedad de Crohn', 'https://medlineplus.gov/spanish/crohnsdisease.html']
  ],
  'RARE-004': [
    ['MedlinePlus Colitis ulcerativa', 'https://medlineplus.gov/spanish/ulcerativecolitis.html']
  ],
  'INF-002': [
    ['CDC COVID Symptoms', 'https://www.cdc.gov/covid/signs-symptoms/'],
    ['CDC COVID Treatment', 'https://www.cdc.gov/covid/treatment/index.html']
  ],
  'INF-003': [
    ['MedlinePlus UTI Espanol', 'https://medlineplus.gov/spanish/ency/article/000521.htm']
  ],
  'HEMA-001': [
    ['MedlinePlus Anemia', 'https://medlineplus.gov/anemia.html'],
    ['MedlinePlus Iron Deficiency', 'https://medlineplus.gov/ency/article/000584.htm'],
    ['MedlinePlus Iron', 'https://medlineplus.gov/iron.html']
  ],
  'PSY-001': [
    ['NIMH Depression', 'https://www.nimh.nih.gov/health/publications/depression'],
    ['MedlinePlus Depression', 'https://medlineplus.gov/depression.html'],
    ['MedlinePlus Major Depression', 'https://medlineplus.gov/ency/article/000945.htm']
  ],
  'MUS-001': [
    ['NIAMS Rheumatoid Arthritis', 'https://www.niams.nih.gov/health-topics/rheumatoid-arthritis/diagnosis-treatment-and-steps-to-take'],
    ['MedlinePlus RA', 'https://medlineplus.gov/rheumatoidarthritis.html']
  ],
  'ENDO-002': [
    ['MedlinePlus Hypothyroidism', 'https://medlineplus.gov/hypothyroidism.html'],
    ['MedlinePlus Encyclopedia', 'https://medlineplus.gov/ency/article/000353.htm']
  ],
  'NEU-001': [
    ['MedlinePlus Epilepsy', 'https://medlineplus.gov/epilepsy.html'],
    ['MedlinePlus Seizures', 'https://medlineplus.gov/seizures.html'],
    ['MedlinePlus Encyclopedia', 'https://medlineplus.gov/ency/article/000694.htm']
  ],
  'RESP-004': [
    ['MedlinePlus COPD', 'https://medlineplus.gov/copd.html'],
    ['NHLBI COPD Diagnosis', 'https://www.nhlbi.nih.gov/health/copd/diagnosis'],
    ['NHLBI COPD Treatment', 'https://www.nhlbi.nih.gov/health/copd/treatment']
  ],
  'DIG-003': [
    ['NIDDK GERD', 'https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults'],
    ['NIDDK GERD Diagnosis', 'https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/diagnosis'],
    ['MedlinePlus GERD', 'https://medlineplus.gov/gerd.html'],
    ['MedlinePlus Reflujo gastroesofagico', 'https://medlineplus.gov/spanish/gerd.html']
  ],
  'CARD-004': [
    ['MedlinePlus Heart Failure', 'https://medlineplus.gov/heartfailure.html'],
    ['MedlinePlus Encyclopedia', 'https://medlineplus.gov/ency/article/000158.htm']
  ],
  'CARD-003': [
    ['MedlinePlus AFib', 'https://medlineplus.gov/atrialfibrillation.html'],
    ['MedlinePlus Encyclopedia', 'https://medlineplus.gov/ency/article/000184.htm']
  ]
};

async function fetchDiseases() {
  renderLoadingState();

  try {
    const response = await fetch('/enfermedades');
    if (!response.ok) throw new Error('No se pudo cargar la lista de enfermedades.');

    diseaseData = await response.json();
    populateSystemFilter();
    renderSystemChips();
    renderStats();
    renderList();
    renderDiseaseRoute();

    if (diseaseData.length === 0) {
      diseaseDetail.innerHTML = '<p class="hint">No hay enfermedades disponibles en el backend.</p>';
    }
  } catch (error) {
    diseaseDetail.innerHTML = `<p class="hint">Error de conexion: ${escapeHTML(error.message)}</p>`;
    diseaseList.innerHTML = '<p class="hint">Revisa que el servidor este iniciado en http://localhost:3000.</p>';
  }
}

function renderSystemChips() {
  const counts = diseaseData.reduce((acc, disease) => {
    const system = disease.system || 'Sin sistema';
    acc[system] = (acc[system] || 0) + 1;
    return acc;
  }, {});
  const systems = Object.keys(counts).sort();

  systemChips.innerHTML = `
    <button class="system-chip ${systemFilter.value ? '' : 'active'}" type="button" data-system="">
      Todos <span>${diseaseData.length}</span>
    </button>
    ${systems.map((system) => `
      <button class="system-chip ${systemFilter.value === system ? 'active' : ''}" type="button" data-system="${escapeHTML(system)}">
        ${escapeHTML(system)} <span>${counts[system]}</span>
      </button>
    `).join('')}
  `;

  systemChips.querySelectorAll('.system-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      systemFilter.value = chip.dataset.system || '';
      renderSystemChips();
      renderList();
    });
  });
}

function renderLoadingState() {
  diseaseList.innerHTML = '<p class="hint">Cargando enfermedades...</p>';
  statsStrip.innerHTML = '';
  resultCount.textContent = '0';
}

function populateSystemFilter() {
  const systems = Array.from(new Set(diseaseData.map((disease) => disease.system).filter(Boolean))).sort();
  systemFilter.innerHTML = '<option value="">Todos los sistemas</option>';

  systems.forEach((system) => {
    const option = document.createElement('option');
    option.value = system;
    option.textContent = system;
    systemFilter.appendChild(option);
  });
}

function renderStats() {
  const totalAssets = diseaseData.reduce((sum, disease) => sum + Number(disease.asset_count || 0), 0);
  const reviewedCount = diseaseData.filter(isReviewedDisease).length;
  const visualCount = diseaseData.filter((disease) => !getImageForDisease(disease).endsWith('default.svg')).length;

  statsStrip.innerHTML = `
    <div><strong>${diseaseData.length}</strong><span>enfermedades</span></div>
    <div><strong>${reviewedCount}</strong><span>revisadas</span></div>
    <div><strong>${totalAssets}</strong><span>recursos</span></div>
    <div><strong>${visualCount}</strong><span>con visual</span></div>
  `;
}

function getFilteredDiseases() {
  const query = normalizeText(searchInput.value);
  const system = systemFilter.value;
  const coverage = coverageFilter.value;

  return diseaseData.filter((disease) => {
    const haystack = normalizeText([
      disease.name,
      disease.disease_code,
      disease.system,
      disease.organ,
      disease.symptoms,
      disease.definition,
      disease.causes,
      disease.complications,
      disease.prevention,
      disease.treatment_overview
    ].join(' '));

    const matchesQuery = !query || haystack.includes(query);
    const matchesSystem = !system || disease.system === system;
    const hasAsset = Number(disease.asset_count || 0) > 0;
    const hasDedicatedImage = !getImageForDisease(disease).endsWith('default.svg');
    const reviewed = isReviewedDisease(disease);

    const matchesCoverage =
      !coverage ||
      (coverage === 'reviewed' && reviewed) ||
      (coverage === 'needs-review' && !reviewed) ||
      (coverage === 'complete' && hasAsset && hasDedicatedImage) ||
      (coverage === 'needs-image' && !hasDedicatedImage);

    return matchesQuery && matchesSystem && matchesCoverage;
  });
}

function createCard(disease) {
  const button = document.createElement('button');
  const isActive = selectedDiseaseCode === disease.disease_code;
  button.className = `card-button ${isActive ? 'active' : ''}`;
  button.type = 'button';
  button.innerHTML = `
    <img src="${escapeHTML(getImageForDisease(disease))}" alt="" onerror="handleImageError(this)" />
    <span class="card-copy">
      <span class="card-title">${escapeHTML(disease.name)}</span>
      <span class="card-meta">${escapeHTML(disease.system)} - ${escapeHTML(disease.organ)}</span>
      <span class="coverage-row">
        <span>${Number(disease.asset_count || 0)} recursos</span>
        <span>${!getImageForDisease(disease).endsWith('default.svg') ? 'visual' : 'sin visual'}</span>
        ${renderQualityPill(disease)}
      </span>
    </span>
    <span class="badge">${escapeHTML(disease.disease_code)}</span>
  `;
  button.addEventListener('click', () => openDiseasePage(disease.disease_code));
  return button;
}

function isReviewedDisease(disease) {
  return Number(disease.quality_level || 0) >= 4;
}

function renderQualityPill(disease) {
  const qualityLevel = Number(disease.quality_level || 0);
  if (qualityLevel >= 4) return `<span class="quality-pill reviewed">rev ${qualityLevel}</span>`;
  if (qualityLevel > 0) return `<span class="quality-pill draft">rev ${qualityLevel}</span>`;
  return '<span class="quality-pill pending">pendiente</span>';
}

function renderList() {
  const filteredDiseases = getFilteredDiseases();
  diseaseList.innerHTML = '';
  resultCount.textContent = `${filteredDiseases.length}`;
  renderSystemChips();

  if (filteredDiseases.length === 0) {
    diseaseList.innerHTML = '<p class="hint">No hay resultados con los filtros actuales.</p>';
    return;
  }

  filteredDiseases.forEach((disease) => {
    diseaseList.appendChild(createCard(disease));
  });
}

function renderDetail(disease) {
  diseaseRepositoryPanel.hidden = true;
  diseaseDetailPanel.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const renalAtlasShortcut = renderRenalAtlasShortcut(disease);
  const atlasStepNumber = renalAtlasShortcut ? 3 : null;
  const progressionStepNumber = renalAtlasShortcut ? 4 : 3;

  diseaseDetail.innerHTML = `
    <button id="backToDiseasesButton" class="secondary-button" type="button">Volver al repositorio</button>
    <div class="detail-hero">
      <img src="${escapeHTML(getImageForDisease(disease))}" alt="Imagen de ${escapeHTML(disease.name)}" onerror="handleImageError(this)" />
      <div>
        <span class="badge">${escapeHTML(disease.disease_code)}</span>
        <h2>${escapeHTML(disease.name)}</h2>
        <p>${escapeHTML(disease.system)} - ${escapeHTML(disease.organ)}</p>
      </div>
    </div>
    ${renderDiseaseSectionNav(Boolean(renalAtlasShortcut))}
    <div class="disease-article">
      <div class="article-main disease-flow">
        <section id="enfermedad-resumen" class="disease-focus-section">
          <header class="disease-section-heading">
            <span class="badge">1. Enfermedad</span>
            <h3>Resumen clinico y mecanismo</h3>
            <p>Definicion, fisiopatologia, manifestaciones y senales clave antes de entrar a pruebas o imagenes.</p>
          </header>
          <div id="internalArticlePanel" class="info-section internal-article">
            ${renderInternalArticle(disease)}
          </div>
        </section>

        <section id="enfermedad-diagnostico" class="disease-focus-section">
          <header class="disease-section-heading">
            <span class="badge">2. Diagnostico</span>
            <h3>Examenes, muestras y criterios</h3>
            <p>Resultados esperados, muestras utiles y comparacion entre hallazgos normales y alterados.</p>
          </header>
          <div id="diagnosticTestPanel" class="diagnostic-test-panel">
            <p class="hint">Buscando pruebas diagnosticas internas...</p>
          </div>
        </section>

        ${renalAtlasShortcut ? `
          <section id="enfermedad-atlas-normal" class="disease-focus-section">
            <header class="disease-section-heading">
              <span class="badge">${atlasStepNumber}. Atlas normal</span>
              <h3>Anatomia base para comparar</h3>
              <p>La vista normal queda separada para que despues la progresion de la enfermedad tenga un punto de referencia.</p>
            </header>
            ${renalAtlasShortcut}
          </section>
        ` : ''}

        <section id="enfermedad-progresion" class="disease-focus-section">
          <header class="disease-section-heading">
            <span class="badge">${progressionStepNumber}. Progresion</span>
            <h3>Atlas visual de la enfermedad</h3>
            <p>Imagenes y focos interactivos para ubicar que estructura cambia, como progresa y que dato clinico lo acompana.</p>
          </header>
          <div id="learningObjectPanel" class="learning-object">
            <p class="hint">Buscando ruta visual/interactiva para esta enfermedad...</p>
          </div>
        </section>
      </div>
      <aside class="article-aside">
        ${renderInfoSection('Signos de alarma', disease.red_flags)}
        ${renderInfoSection('Seguimiento', disease.monitoring)}
        ${renderInfoSection('Educacion para el paciente', disease.patient_education)}
        ${renderReferenceSection(disease)}
      </aside>
    </div>
  `;

  document.getElementById('backToDiseasesButton').addEventListener('click', closeDiseasePage);
  document.getElementById('openRenalAtlasButton')?.addEventListener('click', () => {
    window.location.hash = 'atlas/renal';
  });
  loadLearningObjectPanel(disease);
  loadDiagnosticTestPanel(disease);
}

function renderDiseaseSectionNav(hasAtlasShortcut) {
  const links = [
    ['#enfermedad-resumen', 'Enfermedad'],
    ['#enfermedad-diagnostico', 'Diagnostico'],
    hasAtlasShortcut ? ['#enfermedad-atlas-normal', 'Atlas normal'] : null,
    ['#enfermedad-progresion', 'Progresion visual']
  ].filter(Boolean);

  return `
    <nav class="disease-section-nav" aria-label="Secciones de la enfermedad">
      ${links.map(([href, label]) => `<a href="${href}">${label}</a>`).join('')}
    </nav>
  `;
}

function renderRenalAtlasShortcut(disease) {
  const diseaseText = normalizeText(`${disease.disease_code} ${disease.name} ${disease.organ} ${disease.system}`);
  if (!diseaseText.includes('ren') && !diseaseText.includes('rinon') && !diseaseText.includes('urin')) return '';

  return `
    <section class="renal-atlas-shortcut">
      <div>
        <span class="badge">Atlas renal general</span>
        <h3>Separar anatomia base de enfermedad</h3>
        <p>Abre las vistas normales del rinon: externa, longitudinal, transversal, vasos/colector y nefrona. Despues puedes volver a aplicar esos mapas a esta enfermedad.</p>
      </div>
      <button id="openRenalAtlasButton" type="button">Abrir atlas renal</button>
    </section>
  `;
}

function renderInfoSection(title, content) {
  if (!content) return '';

  return `
    <section class="info-section">
      <h3>${escapeHTML(title)}</h3>
      <p>${escapeHTML(content)}</p>
    </section>
  `;
}

function renderInternalArticle(disease, learningData = null) {
  const stages = learningData?.stages || [];
  const terminology = getTerminologyItems(disease, learningData);
  const visualTargets = stages
    .flatMap((stage) => stage.visual_targets || [])
    .filter(Boolean)
    .slice(0, 10);
  const keyLabs = stages
    .flatMap((stage) => stage.key_labs || [])
    .filter(Boolean)
    .slice(0, 10);
  const imagingItems = learningData?.imaging_pathway || [];
  const differentialItems = learningData?.differential_map || [];
  const mechanismItems = [
    disease.causes,
    disease.pathophysiology,
    learningData?.organ_focus?.why_it_matters
  ].filter(Boolean);
  const clinicalSignals = [
    disease.symptoms ? `Manifestaciones: ${disease.symptoms}` : '',
    disease.risk_factors ? `Factores de riesgo: ${disease.risk_factors}` : ''
  ].filter(Boolean);

  return `
    <div class="article-title-row">
      <span class="badge">Articulo didactico interno</span>
      <span class="card-meta">Sintesis propia con fuentes citadas</span>
    </div>
    <h3>${escapeHTML(disease.name)}: lectura clinica y visual</h3>
    <div class="definition-primer">
      <h4>Definicion</h4>
      <p>${escapeHTML(disease.definition || learningData?.learning_goal || 'Ficha educativa interna en construccion.')}</p>
      ${learningData?.learning_goal ? `<p class="article-emphasis">${escapeHTML(learningData.learning_goal)}</p>` : ''}
    </div>
    ${terminology.length ? `
      <div class="term-strip" aria-label="Terminologia clave">
        ${terminology.map(renderTermChip).join('')}
      </div>
    ` : ''}
    <div class="article-body-grid">
      ${renderArticleBlock('Organo y mecanismo', [
        `Organo base: ${disease.organ || learningData?.organ_focus?.organ || 'pendiente'}.`,
        mechanismItems.join(' ')
      ])}
      ${renderArticleBlock('Manifestaciones y riesgo', clinicalSignals)}
      ${renderArticleBlock('Pruebas y laboratorios', [
        disease.diagnostic_tests || '',
        keyLabs.length ? `Claves de la ruta: ${keyLabs.join(', ')}` : ''
      ])}
      ${renderArticleBlock('Que mirar en la imagen', [
        visualTargets.length ? visualTargets.join(', ') : 'Revisar organo principal, estructuras vecinas y signos de progresion.'
      ])}
      ${renderArticleBlock('Progresion y complicaciones', [
        disease.complications || '',
        disease.staging || ''
      ])}
      ${renderArticleBlock('Idea para no perderse', [
        learningData?.organ_focus?.why_it_matters || disease.educational_explanation || ''
      ])}
    </div>
    ${stages.length ? renderTeachingPathway(stages) : ''}
    ${imagingItems.length ? `
      ${renderArticleDisclosure('Lectura de imagen y pruebas', `
        <div class="article-table">
          ${imagingItems.map((item) => `
            <div class="article-table-row">
              <strong>${escapeHTML(item.modality)}</strong>
              <span>${escapeHTML(item.role)}</span>
              <small>${escapeHTML((item.what_to_look_for || []).join(', '))}</small>
              ${item.common_mistake ? `<em>${escapeHTML(item.common_mistake)}</em>` : ''}
            </div>
          `).join('')}
        </div>
      `)}
    ` : ''}
    ${differentialItems.length || disease.differential_diagnosis ? `
      ${renderArticleDisclosure('Diferenciales cercanos', `
        ${disease.differential_diagnosis ? `<p>${escapeHTML(disease.differential_diagnosis)}</p>` : ''}
        <div class="differential-table">
          ${differentialItems.map((item) => `
            <div class="differential-row">
              <strong>${escapeHTML(item.condition)}</strong>
              <span><b>Comparte:</b> ${escapeHTML((item.shared_features || []).join(', '))}</span>
              <span><b>Se separa por:</b> ${escapeHTML((item.separating_features || []).join(', '))}</span>
            </div>
          `).join('')}
        </div>
      `)}
    ` : ''}
    ${disease.treatment_overview || disease.prevention ? `
      ${renderArticleDisclosure('Manejo educativo general', `
        ${disease.treatment_overview ? `<p>${escapeHTML(disease.treatment_overview)}</p>` : ''}
        ${disease.prevention ? `<p>${escapeHTML(disease.prevention)}</p>` : ''}
      `)}
    ` : ''}
  `;
}

function renderTeachingPathway(stages) {
  return renderArticleDisclosure('Ruta de aprendizaje paso a paso', `
      <div class="pathway-grid">
        ${stages.map((stage, index) => `
          <section class="pathway-step">
            <span>${index + 1}</span>
            <h5>${escapeHTML(stage.title)}</h5>
            <p>${escapeHTML(stage.clinical_state)}</p>
            ${stage.teaching_prompt ? `<small>${escapeHTML(stage.teaching_prompt)}</small>` : ''}
          </section>
        `).join('')}
      </div>
  `);
}

function renderArticleDisclosure(title, content, open = false) {
  if (!content.trim()) return '';
  return `
    <details class="article-subsection article-disclosure" ${open ? 'open' : ''}>
      <summary>
        <h4>${escapeHTML(title)}</h4>
        <span class="disclosure-state" aria-hidden="true"></span>
      </summary>
      <div class="article-disclosure-body">
        ${content}
      </div>
    </details>
  `;
}

function renderTermChip(term) {
  const definition = getGlossaryDefinition(term);
  if (!definition) return `<span>${escapeHTML(term)}</span>`;

  return `
    <button class="term-chip" type="button" aria-label="${escapeHTML(term)}: ${escapeHTML(definition)}">
      ${escapeHTML(term)}
      <span class="term-popover" role="tooltip">
        <strong>${escapeHTML(term)}</strong>
        ${escapeHTML(definition)}
      </span>
    </button>
  `;
}

function getGlossaryDefinition(term) {
  const key = normalizeText(term);
  if (glossaryDefinitions[key]) return glossaryDefinitions[key];

  const partialKey = Object.keys(glossaryDefinitions).find((item) => key.includes(item) || item.includes(key));
  return partialKey ? glossaryDefinitions[partialKey] : '';
}

function getTerminologyItems(disease, learningData = null) {
  const items = [
    disease.organ,
    ...(learningData?.organ_focus?.primary_regions || []),
    ...((learningData?.stages || []).flatMap((stage) => stage.visual_targets || [])),
    ...((learningData?.stages || []).flatMap((stage) => stage.key_labs || []))
  ];
  const seen = new Set();
  return items
    .filter(Boolean)
    .map((item) => String(item).trim())
    .filter((item) => {
      const key = normalizeText(item);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 12);
}

function renderArticleBlock(title, paragraphs) {
  const content = paragraphs.filter(Boolean).join(' ');
  if (!content) return '';
  return `
    <section class="article-block">
      <h4>${escapeHTML(title)}</h4>
      <p>${escapeHTML(content)}</p>
    </section>
  `;
}

function updateInternalArticle(disease, learningData) {
  const panel = document.getElementById('internalArticlePanel');
  if (!panel) return;
  panel.innerHTML = renderInternalArticle(disease, learningData);
}

function renderReferenceSection(disease) {
  const revision = disease.source_notes || disease.source || 'Sintesis educativa interna pendiente de revision editorial.';
  return `
    <section class="info-section source-links">
      <h3>Referencias y trazabilidad</h3>
      <p>${escapeHTML(revision)}</p>
      ${renderSourceLinksContent(disease)}
    </section>
  `;
}

function renderSourceLinks(disease) {
  const content = renderSourceLinksContent(disease);
  if (!content) return '';

  return `
    <section class="info-section source-links">
      <h3>Repositorios abiertos</h3>
      ${content}
    </section>
  `;
}

function renderSourceLinksContent(disease) {
  const links = diseaseSourceLinks[disease.disease_code] || [];
  if (links.length === 0) return '';

  return `
    ${links.map(([label, url]) => `
      <a href="${escapeHTML(url)}" target="_blank" rel="noreferrer">${escapeHTML(label)}</a>
    `).join('')}
  `;
}

async function loadLearningObjectPanel(disease) {
  const panel = document.getElementById('learningObjectPanel');
  if (!panel) return;
  const diseaseCode = disease.disease_code;

  try {
    const response = await fetch(`/aprendizaje/enfermedades/${encodeURIComponent(diseaseCode)}`);
    if (!response.ok) {
      const fallbackData = createFallbackLearningObject(disease);
      panel.innerHTML = `
        <div class="learning-header">
          <div>
            <span class="badge">Ruta visual base</span>
            <h3>${escapeHTML(fallbackData.module_title)}</h3>
            <p>${escapeHTML(fallbackData.learning_goal)}</p>
          </div>
        </div>
        ${renderAnatomyVisualizer(fallbackData, diseaseCode)}
        ${renderLearningSupportPanel('Diseno visual sugerido', renderVisualDesignBlueprint(fallbackData.organ_focus?.organ))}
      `;
      bindAnatomyVisualizer(panel, fallbackData, diseaseCode);
      updateInternalArticle(disease, fallbackData);
      return;
    }

    const data = await response.json();
    panel.innerHTML = `
      <div class="learning-header">
        <div>
          <span class="badge">Ruta visual</span>
          <h3>${escapeHTML(data.module_title)}</h3>
          <p>${escapeHTML(data.learning_goal)}</p>
        </div>
      </div>
      ${renderAnatomyVisualizer(data, diseaseCode)}
      ${renderLearningSupportPanel('Diseno visual sugerido', renderVisualDesignBlueprint(data.organ_focus?.organ))}
      ${renderLearningSupportPanel('Mapa del organo y regiones', `
        <div class="organ-map">
          <strong>${escapeHTML(data.organ_focus.organ)}</strong>
          <p>${escapeHTML(data.organ_focus.why_it_matters)}</p>
          <div class="marker-row">
            ${(data.organ_focus.primary_regions || []).map((region) => `<span>${escapeHTML(region)}</span>`).join('')}
          </div>
        </div>
      `)}
      ${renderLearningSupportPanel('Etapas y datos clave', `
        <div class="stage-track">
          ${(data.stages || []).map((stage, index) => `
            <article class="stage-card">
              <span class="stage-number">${escapeHTML(getDidacticStageLabel(index))}</span>
              <h4>${escapeHTML(stage.title)}</h4>
              <p>${escapeHTML(stage.clinical_state)}</p>
              <dl>
                <dt>Buscar en imagen</dt>
                <dd>${escapeHTML((stage.visual_targets || []).join(', '))}</dd>
                <dt>Laboratorio clave</dt>
                <dd>${escapeHTML((stage.key_labs || []).join(', '))}</dd>
              </dl>
            </article>
          `).join('')}
        </div>
      `)}
      ${renderLearningSupportPanel('Imagen, pruebas y diferenciales', `
        <div class="learning-grid">
          <section>
            <h4>Ruta de imagen</h4>
            ${(data.imaging_pathway || []).map((item) => `
              <div class="mini-block">
                <strong>${escapeHTML(item.modality)}</strong>
                <p>${escapeHTML(item.role)}</p>
                <small>${escapeHTML((item.what_to_look_for || []).join(' | '))}</small>
              </div>
            `).join('')}
          </section>
          <section>
            <h4>Diferenciales que se parecen</h4>
            ${(data.differential_map || []).map((item) => `
              <div class="mini-block">
                <strong>${escapeHTML(item.condition)}</strong>
                <p><b>Comparten:</b> ${escapeHTML((item.shared_features || []).join(', '))}</p>
                <p><b>Separan:</b> ${escapeHTML((item.separating_features || []).join(', '))}</p>
              </div>
            `).join('')}
          </section>
        </div>
      `)}
    `;
    bindAnatomyVisualizer(panel, data, diseaseCode);
    updateInternalArticle(disease, data);
  } catch (error) {
    panel.innerHTML = '';
  }
}

function renderLearningSupportPanel(title, content, open = false) {
  if (!content.trim()) return '';
  return `
    <details class="visual-support-panel" ${open ? 'open' : ''}>
      <summary>
        <strong>${escapeHTML(title)}</strong>
        <span class="disclosure-state" aria-hidden="true"></span>
      </summary>
      <div class="visual-support-body">
        ${content}
      </div>
    </details>
  `;
}

async function loadDiagnosticTestPanel(disease) {
  const panel = document.getElementById('diagnosticTestPanel');
  if (!panel) return;
  const diseaseCode = encodeURIComponent(disease.disease_code);

  try {
    const [testsData, samplesData, endoscopyData] = await Promise.all([
      fetchJsonOrEmpty(`/pruebas/enfermedad/${diseaseCode}`, 'tests'),
      fetchJsonOrEmpty(`/muestras/enfermedad/${diseaseCode}`, 'samples'),
      fetchJsonOrEmpty(`/endoscopia/enfermedad/${diseaseCode}`, 'procedures')
    ]);
    const tests = testsData.tests || [];
    const samples = samplesData.samples || [];
    const procedures = endoscopyData.procedures || [];
    if (!tests.length && !samples.length && !procedures.length) {
      panel.innerHTML = '';
      return;
    }

    panel.innerHTML = renderDiagnosticTestPanel(tests, samples, procedures);
  } catch (error) {
    panel.innerHTML = '';
  }
}

async function fetchJsonOrEmpty(url, collectionKey) {
  const response = await fetch(url);
  if (!response.ok) return { [collectionKey]: [] };
  return response.json();
}

function renderDiagnosticTestPanel(tests, samples = [], procedures = []) {
  return `
    <div class="learning-header">
      <div>
        <span class="badge">Banco interno de pruebas</span>
        <h3>Pruebas, muestras y lectura visual</h3>
        <p>Que pedir, como tomarlo, que buscar y como conectarlo con imagen o endoscopia.</p>
      </div>
    </div>
    ${tests.length ? `
      <section class="diagnostic-bank-section">
        <h4>Pruebas diagnosticas</h4>
        <div class="test-bank-grid">
          ${tests.map(renderDiagnosticTestCard).join('')}
        </div>
      </section>
    ` : ''}
    ${samples.length ? `
      <section class="diagnostic-bank-section">
        <h4>Muestras de laboratorio</h4>
        <div class="test-bank-grid compact">
          ${samples.map(renderLaboratorySampleCard).join('')}
        </div>
      </section>
    ` : ''}
    ${procedures.length ? `
      <section class="diagnostic-bank-section">
        <h4>Atlas endoscopico</h4>
        <div class="test-bank-grid compact">
          ${procedures.map(renderEndoscopyProcedureCard).join('')}
        </div>
      </section>
    ` : ''}
  `;
}

function renderDiagnosticTestCard(test) {
  return `
    <details class="test-card test-card-collapsible">
      <summary class="test-card-summary">
        <div class="test-card-heading">
          <span class="badge">${escapeHTML(test.modality || 'Prueba')}</span>
          <h4>${escapeHTML(test.name)}</h4>
          <span class="test-card-toggle" aria-hidden="true"></span>
        </div>
        <p class="test-question">${escapeHTML(test.clinical_question || '')}</p>
      </summary>
      <div class="test-card-body">
        <div class="test-card-columns">
          ${renderTestList('Cuando usarla', test.when_to_use)}
          ${renderTestList('Hallazgos anormales', test.abnormal_findings)}
          ${renderTestList('Limites', test.limits)}
          ${renderTestList('Errores comunes', test.common_mistakes)}
        </div>
        ${test.normal_pattern ? `
          <section class="test-note">
            <h5>Patron normal</h5>
            <p>${escapeHTML(test.normal_pattern)}</p>
          </section>
        ` : ''}
        ${(test.learning_steps || []).length ? `
          <section class="test-note">
            <h5>Lectura paso a paso</h5>
            <ol>
              ${(test.learning_steps || []).map((step) => `<li>${escapeHTML(step)}</li>`).join('')}
            </ol>
          </section>
        ` : ''}
        ${(test.reference_ranges || []).length ? `
          <section class="test-note">
            <h5>Rangos / criterios utiles</h5>
            ${(test.reference_ranges || []).map((range) => `
              <p><strong>${escapeHTML(range.label)}:</strong> normal: ${escapeHTML(range.normal)}; alterado: ${escapeHTML(range.abnormal)}.</p>
            `).join('')}
          </section>
        ` : ''}
        ${(test.dataset_candidates || []).length || test.internal_asset_status ? `
          <section class="test-note test-dataset-note">
            <h5>Carga de imagenes o datasets</h5>
            ${test.internal_asset_status ? `<p>${escapeHTML(test.internal_asset_status)}</p>` : ''}
            ${(test.dataset_candidates || []).map((candidate) => `
              <p><strong>${escapeHTML(candidate.name)}:</strong> ${escapeHTML(candidate.status)}. ${escapeHTML(candidate.note || '')}</p>
            `).join('')}
          </section>
        ` : ''}
      </div>
    </details>
  `;
}

function renderTestList(title, items = []) {
  if (!items.length) return '';
  return `
    <section>
      <h5>${escapeHTML(title)}</h5>
      <ul>
        ${items.map((item) => `<li>${escapeHTML(item)}</li>`).join('')}
      </ul>
    </section>
  `;
}

function renderLaboratorySampleCard(sample) {
  return `
    <details class="test-card compact test-card-collapsible">
      <summary class="test-card-summary">
        <div class="test-card-heading">
          <span class="badge">${escapeHTML(sample.sample_type || 'Muestra')}</span>
          <h4>${escapeHTML(sample.name)}</h4>
          <span class="test-card-toggle" aria-hidden="true"></span>
        </div>
        <p class="test-question">${escapeHTML(sample.clinical_question || '')}</p>
        <div class="sample-meta">
          ${sample.container ? `<span><strong>Recipiente:</strong> ${escapeHTML(sample.container)}</span>` : ''}
          ${sample.turnaround ? `<span><strong>Tiempo:</strong> ${escapeHTML(sample.turnaround)}</span>` : ''}
        </div>
      </summary>
      <div class="test-card-body">
        <div class="test-card-columns">
          ${renderTestList('Preparacion', sample.patient_preparation)}
          ${renderTestList('Toma de muestra', sample.collection_steps)}
          ${renderTestList('Alertas preanaliticas', sample.preanalytic_alerts)}
          ${renderTestList('Claves de lectura', sample.interpretation_clues)}
        </div>
        ${(sample.comparison_patterns || []).length ? `
          <section class="test-note sample-comparison-note">
            <h5>Comparacion normal vs enfermedad</h5>
            <div class="sample-comparison-grid">
              ${(sample.comparison_patterns || []).map((pattern) => `
                <div>
                  <strong>${escapeHTML(pattern.label || '')}</strong>
                  <p><span>Base:</span> ${escapeHTML(pattern.baseline || '')}</p>
                  <p><span>Alterado:</span> ${escapeHTML(pattern.disease_pattern || '')}</p>
                  ${pattern.teaching_point ? `<p><span>Clave:</span> ${escapeHTML(pattern.teaching_point)}</p>` : ''}
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}
        ${(sample.case_examples || []).length ? `
          <section class="test-note sample-case-note">
            <h5>Muestras tipo caso</h5>
            ${(sample.case_examples || []).map((example) => `
              <p><strong>${escapeHTML(example.disease_code || '')} - ${escapeHTML(example.scenario || '')}:</strong> ${escapeHTML(example.results || '')} ${example.interpretation ? `<em>${escapeHTML(example.interpretation)}</em>` : ''}</p>
            `).join('')}
          </section>
        ` : ''}
        ${(sample.dataset_candidates || []).length ? `
          <section class="test-note test-dataset-note">
            <h5>Repositorios candidatos</h5>
            ${(sample.dataset_candidates || []).map((candidate) => `
              <p><strong>${escapeHTML(candidate.name || '')}:</strong> ${escapeHTML(candidate.status || '')}. ${escapeHTML(candidate.note || '')}</p>
            `).join('')}
          </section>
        ` : ''}
        ${sample.educational_note ? `
          <section class="test-note">
            <h5>Nota didactica</h5>
            <p>${escapeHTML(sample.educational_note)}</p>
          </section>
        ` : ''}
      </div>
    </details>
  `;
}

function renderEndoscopyProcedureCard(procedure) {
  return `
    <details class="test-card compact test-card-collapsible">
      <summary class="test-card-summary">
        <div class="test-card-heading">
          <span class="badge">${escapeHTML(procedure.procedure_type || 'Endoscopia')}</span>
          <h4>${escapeHTML(procedure.name)}</h4>
          <span class="test-card-toggle" aria-hidden="true"></span>
        </div>
        ${(procedure.anatomic_route || []).length ? `
          <p class="test-question">${escapeHTML(procedure.anatomic_route.join(' -> '))}</p>
        ` : ''}
      </summary>
      <div class="test-card-body">
        <div class="test-card-columns">
          ${renderTestList('Indicaciones', procedure.core_indications)}
          ${renderTestList('Landmarks normales', procedure.normal_landmarks)}
          ${renderTestList('Biopsia / toma', procedure.biopsy_strategy)}
          ${renderTestList('Errores comunes', procedure.common_mistakes)}
        </div>
        ${(procedure.visual_findings || []).length ? `
          <section class="test-note">
            <h5>Hallazgos visuales</h5>
            ${(procedure.visual_findings || []).map((finding) => `
              <p><strong>${escapeHTML(finding.label)}:</strong> ${escapeHTML(finding.pattern)} ${finding.teaching_point ? escapeHTML(finding.teaching_point) : ''}</p>
            `).join('')}
          </section>
        ` : ''}
        ${(procedure.dataset_candidates || []).length ? `
          <section class="test-note test-dataset-note">
            <h5>Datasets candidatos</h5>
            ${(procedure.dataset_candidates || []).map((candidate) => `
              <p><strong>${escapeHTML(candidate.name)}:</strong> ${escapeHTML(candidate.status)}. ${escapeHTML(candidate.use_case || '')}</p>
            `).join('')}
          </section>
        ` : ''}
      </div>
    </details>
  `;
}

function createFallbackLearningObject(disease) {
  const regions = inferAnatomyRegions(disease);
  return {
    disease_code: disease.disease_code,
    module_title: `${disease.name}: organo, conexiones y progresion visual`,
    learning_goal: 'Ubicar el organo principal, sus estructuras relacionadas y como la enfermedad puede cambiar la funcion o el tejido.',
    organ_focus: {
      organ: disease.organ || disease.system || 'Organo afectado',
      primary_regions: regions,
      why_it_matters: disease.educational_explanation || disease.definition || 'Modelo educativo para conectar anatomia, sintomas y caso clinico.'
    },
    stages: [
      {
        title: 'Anatomia base',
        clinical_state: `Primero identifica ${disease.organ || 'el organo'} y sus conexiones principales.`,
        visual_targets: regions,
        key_labs: []
      },
      {
        title: 'Cambio por enfermedad',
        clinical_state: disease.pathophysiology || disease.causes || disease.definition,
        visual_targets: [disease.organ, disease.system, 'tejido afectado'].filter(Boolean),
        key_labs: []
      },
      {
        title: 'Complicaciones o avance',
        clinical_state: disease.complications || disease.red_flags || disease.symptoms,
        visual_targets: ['zona afectada', 'estructuras vecinas', 'signos de progresion'],
        key_labs: []
      }
    ]
  };
}

function inferAnatomyRegions(disease) {
  const organText = normalizeText(`${disease.organ} ${disease.system} ${disease.name}`);
  if (organText.includes('rinon') || organText.includes('renal') || organText.includes('urin')) {
    return ['corteza renal', 'medula renal', 'pelvis renal', 'ureter', 'vasos renales', 'nefrona'];
  }
  if (organText.includes('higado') || organText.includes('hepat')) {
    return ['parenquima hepatico', 'vena porta', 'via biliar', 'bazo', 'cavidad peritoneal'];
  }
  if (organText.includes('cerebro') || organText.includes('neurolog') || organText.includes('nerv')) {
    return ['corteza cerebral', 'territorios arteriales', 'tronco encefalico', 'vasos cerebrales'];
  }
  if (organText.includes('pulmon') || organText.includes('resp')) {
    return ['bronquios', 'alveolos', 'pleura', 'vasos pulmonares'];
  }
  if (organText.includes('corazon') || organText.includes('cardio')) {
    return ['miocardio', 'arterias coronarias', 'valvulas', 'vasos principales'];
  }
  if (organText.includes('pancreas') || organText.includes('diabetes')) {
    return ['pancreas', 'islotes beta', 'vasos sanguineos', 'tejidos perifericos'];
  }
  return [disease.organ, disease.system, 'tejido afectado', 'estructuras vecinas'].filter(Boolean);
}

function renderAnatomyVisualizer(data, diseaseCode, selectedIndex = 0, selectedView = '') {
  const stages = data.stages || [];
  const stage = stages[selectedIndex] || stages[0] || {};
  const organ = data.organ_focus?.organ || '';
  const regions = data.organ_focus?.primary_regions || [];
  const didacticLabel = getDidacticStageLabel(selectedIndex);
  const organViews = getOrganViews(organ, diseaseCode);
  const activeView = organViews.length
    ? (organViews.some((view) => view.id === selectedView) ? selectedView : organViews[0].id)
    : selectedView;

  return `
    <div class="anatomy-visualizer" data-disease-code="${escapeHTML(diseaseCode)}" data-view-mode="${escapeHTML(activeView)}">
      <div class="visual-stage">
        ${renderOrganSvg(organ, regions, stage, selectedIndex, Math.max(stages.length, 1), activeView, diseaseCode)}
      </div>
      <div class="visual-controls">
        <div>
          <span class="badge">${escapeHTML(didacticLabel)}</span>
          <h4>${escapeHTML(stage.title || 'Vista anatómica')}</h4>
          <p>${escapeHTML(stage.clinical_state || data.organ_focus?.why_it_matters || '')}</p>
        </div>
        <div class="stage-buttons" role="group" aria-label="Etapas visuales">
          ${stages.map((item, index) => `
            <button class="stage-toggle ${index === selectedIndex ? 'active' : ''}" type="button" data-stage-index="${index}">
              ${index + 1}. ${escapeHTML(getDidacticStageLabel(index))}
            </button>
          `).join('')}
        </div>
        ${renderOrganViewControls(organViews, activeView)}
        <div class="visual-findings">
          <strong>Buscar en la imagen</strong>
          <ul>
            ${(stage.visual_targets || regions).map((target) => `<li>${escapeHTML(target)}</li>`).join('')}
          </ul>
        </div>
        ${renderVisualViewMap(organ, activeView, diseaseCode)}
        ${renderVisualReadingGuide(organ, stage, selectedIndex, activeView, diseaseCode)}
        ${renderVisualLegend(organ, activeView, stage, diseaseCode)}
      </div>
    </div>
  `;
}

function getDidacticStageLabel(index) {
  const labels = ['Anatomia base', 'Cambio por enfermedad', 'Progresion o complicacion'];
  return labels[index] || `Avance ${index + 1}`;
}

function isRenalContext(organ = '', diseaseCode = '') {
  const key = normalizeText(`${organ} ${diseaseCode}`);
  return String(diseaseCode || '').startsWith('REN-')
    || key.includes('rinon')
    || key.includes('renal')
    || key.includes('urin')
    || key.includes('ureter')
    || key.includes('glomer')
    || key.includes('nefro');
}

function getRenalDiseaseViewIds(diseaseCode = '') {
  const viewMap = {
    'REN-001': ['section', 'nephron', 'vascular', 'external'],
    'REN-002': ['nephron', 'section', 'vascular'],
    'REN-003': ['nephron', 'section', 'vascular'],
    'REN-004': ['section', 'urinary', 'external'],
    'REN-005': ['urinary', 'section', 'transverse', 'vascular'],
    'REN-006': ['nephron', 'vascular', 'section', 'urinary'],
    'REN-007': ['nephron', 'section', 'vascular'],
    'REN-008': ['urinary', 'transverse', 'section', 'external']
  };
  return viewMap[diseaseCode] || ['section', 'vascular', 'nephron', 'urinary'];
}

function getOrganViews(organ, diseaseCode = '') {
  if (isRenalContext(organ, diseaseCode)) {
    const atlasViews = getRenalAtlasViews();
    const labels = {
      external: 'Vista externa',
      section: 'Corte longitudinal',
      transverse: 'Hilio/seno',
      vascular: 'Vasos y colector',
      nephron: 'Nefrona',
      urinary: 'Via urinaria'
    };
    return getRenalDiseaseViewIds(diseaseCode)
      .map((viewId) => atlasViews.find((view) => view.id === viewId))
      .filter(Boolean)
      .map((view) => ({ id: view.id, label: labels[view.id] || view.title.replace(/^\d+\.\s*/, '') }));
  }
  return [];
}

function renderOrganViewControls(views, selectedView) {
  if (!views.length) return '';
  return `
    <div class="view-buttons" role="group" aria-label="Vistas del atlas anatomico">
      ${views.map((view) => `
        <button class="view-toggle ${view.id === selectedView ? 'active' : ''}" type="button" data-view-mode="${escapeHTML(view.id)}">
          ${escapeHTML(view.label)}
        </button>
      `).join('')}
    </div>
  `;
}

function renderVisualDesignBlueprint(organ = '') {
  const organName = organ || 'organo principal';
  const layers = [
    {
      title: '1. Organo completo',
      text: `Reconocer forma, limites, ubicacion y relaciones externas de ${organName}.`
    },
    {
      title: '2. Corte interno',
      text: 'Abrir el organo para ubicar tejidos, cavidades, capas y zonas funcionales.'
    },
    {
      title: '3. Flujos y conductos',
      text: 'Seguir arterias, venas, drenaje, conductos y conexiones con estructuras vecinas.'
    },
    {
      title: '4. Cambio por enfermedad',
      text: 'Comparar anatomia normal contra inflamacion, obstruccion, isquemia, fibrosis o dano avanzado.'
    }
  ];

  return `
    <div class="visual-blueprint">
      <div>
        <span class="badge">Estructura del atlas</span>
        <strong>Capas visuales que debe tener cada organo</strong>
      </div>
      <div class="visual-blueprint-grid">
        ${layers.map((layer) => `
          <article>
            <h4>${escapeHTML(layer.title)}</h4>
            <p>${escapeHTML(layer.text)}</p>
          </article>
        `).join('')}
      </div>
    </div>
  `;
}

function getViewAnatomyMap(organ, selectedView = 'external', diseaseCode = '') {
  const organKey = normalizeText(organ);
  if (isRenalContext(organ, diseaseCode)) {
    const maps = {
      external: {
        title: 'Mapa de vista externa',
        items: ['Capsula renal', 'Hilio renal', 'Arteria renal', 'Vena renal', 'Ureter proximal', 'Nefrona como unidad funcional']
      },
      section: {
        title: 'Mapa de corte interno',
        items: ['Capsula fibrosa', 'Corteza renal', 'Medula renal', 'Columna renal', 'Papila renal', 'Calices menor/mayor', 'Pelvis renal', 'Hilio renal', 'Vasos renales', 'Ureter']
      },
      vascular: {
        title: 'Mapa vascular y colector',
        items: ['Arteria renal', 'Arterias segmentarias', 'Arterias interlobares', 'Arterias arcuatas', 'Vena renal', 'Calices menores/mayores', 'Pelvis renal', 'Ureter']
      },
      transverse: {
        title: 'Mapa de corte transversal',
        items: ['Capsula', 'Corteza', 'Medula', 'Seno renal', 'Pelvis renal', 'Arteria renal', 'Vena renal', 'Ureter']
      },
      nephron: {
        title: 'Mapa de nefrona',
        items: ['Arteriola aferente', 'Glomerulo', 'Capsula de Bowman', 'Arteriola eferente', 'Tubulo proximal', 'Asa de Henle', 'Tubulo distal', 'Conducto colector']
      },
      urinary: {
        title: 'Mapa de via urinaria',
        items: ['Rinones', 'Pelvis renal', 'Ureteres', 'Union ureterovesical', 'Vejiga', 'Uretra']
      }
    };
    return maps[selectedView] || maps.external;
  }
  if (organKey.includes('apend')) {
    return {
      title: 'Mapa apendicular',
      items: ['Ciego', 'Ileon terminal', 'Valvula ileocecal', 'Apendice vermiforme', 'Luz apendicular', 'Mesoapendice', 'Grasa periapendicular', 'Peritoneo']
    };
  }
  return null;
}

function renderVisualViewMap(organ, selectedView = 'external', diseaseCode = '') {
  const map = getViewAnatomyMap(organ, selectedView, diseaseCode);
  if (!map) return '';
  return `
    <div class="visual-view-map">
      <strong>${escapeHTML(map.title)}</strong>
      <div>
        ${map.items.map((item) => `<span>${escapeHTML(item)}</span>`).join('')}
      </div>
    </div>
  `;
}

function renderVisualReadingGuide(organ, stage, selectedIndex, selectedView = 'external', diseaseCode = '') {
  const organKey = normalizeText(organ);
  const kidneyByView = {
    external: 'Ubica primero la silueta, el hilio renal, los vasos renales y el ureter proximal.',
    section: 'Lee de afuera hacia adentro: capsula, corteza, medula, piramides, calices y pelvis renal.',
    transverse: 'Reconoce el hilio como puerta: arteria, vena y pelvis/ureter entran o salen por la cara medial.',
    vascular: 'Sigue el flujo: arteria renal en rojo, retorno venoso en azul y salida urinaria en amarillo.',
    nephron: 'Empieza por el glomerulo: filtra; luego sigue el tubulo, el asa y el colector para entender reabsorcion y concentracion.',
    urinary: 'Sigue la salida de orina: pelvis renal, ureter, union ureterovesical, vejiga y uretra.'
  };
  const appendixStep = 'Ubica ciego e ileon terminal; despues sigue el apendice, su luz y la grasa periapendicular.';
  const steps = [
    organKey.includes('cerebro')
      ? 'Ubica primero el territorio vascular: ACA, ACM o ACP.'
      : organKey.includes('higado')
        ? 'Ubica el parenquima y luego sigue vena porta, via biliar y bazo.'
        : isRenalContext(organ, diseaseCode)
          ? (kidneyByView[selectedView] || kidneyByView.external)
          : organKey.includes('apend')
            ? appendixStep
          : 'Ubica el organo principal y sus conexiones.',
    selectedIndex === 0
      ? 'Compara la anatomia base con signos sutiles: aun puede verse casi normal.'
      : selectedIndex === 1
        ? 'Busca el cambio dominante: inflamacion, obstruccion, isquemia o fibrosis.'
        : 'Integra complicaciones: tejido danado, estructuras vecinas y repercusion sistemica.',
    stage.teaching_prompt || 'Relaciona la imagen con sintomas, laboratorio y caso clinico.'
  ];

  return `
    <div class="visual-reading-guide">
      <strong>Como leer esta vista</strong>
      <ol>
        ${steps.map((step) => `<li>${escapeHTML(step)}</li>`).join('')}
      </ol>
    </div>
  `;
}

function renderVisualLegend(organ, selectedView = 'external', stage = {}, diseaseCode = '') {
  const organKey = normalizeText(organ);
  const stageText = normalizeText([
    stage.title,
    stage.clinical_state,
    stage.teaching_prompt,
    ...(stage.visual_targets || [])
  ].filter(Boolean).join(' '));
  const kidneyObstructiveStage = stageText.includes('obstru') || stageText.includes('calculo') || stageText.includes('hidronefrosis') || stageText.includes('bloque');
  let items = [
    ['#2563eb', organKey.includes('higado') ? 'Flujo portal / venoso' : 'Flujo vascular principal'],
    ['#dc2626', organKey.includes('cerebro') ? 'Nucleo isquemico' : 'Zona de dano o inflamacion'],
    ['#f59e0b', organKey.includes('cerebro') ? 'Penumbra o tejido en riesgo' : 'Fibrosis, obstruccion o progresion'],
    ['#16a34a', organKey.includes('higado') ? 'Via biliar' : 'Estructura funcional relacionada']
  ];

  if (isRenalContext(organ, diseaseCode)) {
    const kidneyLegends = {
      external: [
        ['#dc2626', 'Parenquima renal externo'],
        ['#fecaca', 'Hilio y depresion medial'],
        ['#2563eb', 'Vena renal / retorno venoso'],
        ['#dc2626', 'Arteria renal / entrada arterial'],
        ['#f59e0b', 'Ureter y drenaje urinario'],
        ['#fef3c7', 'Cicatriz, fibrosis o perdida de nefronas']
      ],
      section: [
        ['#fca5a5', 'Corteza renal'],
        ['#b91c1c', 'Medula y piramides renales'],
        ['#facc15', 'Calices, pelvis renal y ureter'],
        ['#fb923c', 'Inflamacion o zona alterada'],
        ['#fef3c7', 'Fibrosis o cicatriz']
      ],
      vascular: [
        ['#dc2626', 'Arteria renal: segmentarias, interlobares y arcuatas'],
        ['#2563eb', 'Vena renal y retorno venoso intrarrenal'],
        ['#f59e0b', 'Sistema colector: calices, pelvis renal y ureter'],
        ['#fef3c7', 'Papila renal y trayecto inicial de la orina'],
        ['#78350f', kidneyObstructiveStage ? 'Punto de obstruccion: UPJ, ureter o UVJ segun enfermedad' : 'Cambio por enfermedad: fibrosis, perdida de nefronas o adelgazamiento cortical']
      ],
      transverse: [
        ['#dc2626', 'Corteza y parenquima periférico'],
        ['#fca5a5', 'Medula y seno renal'],
        ['#facc15', 'Pelvis renal y ureter'],
        ['#dc2626', 'Arteria renal'],
        ['#2563eb', 'Vena renal']
      ],
      nephron: [
        ['#dc2626', 'Entrada arterial / glomerulo'],
        ['#2563eb', 'Salida vascular y capilares'],
        ['#f59e0b', 'Tubulo proximal y distal'],
        ['#facc15', 'Asa de Henle y colector'],
        ['#78350f', 'Zona de dano tubular si aplica']
      ],
      urinary: [
        ['#be185d', 'Rinones y parenquima'],
        ['#d97706', 'Pelvis, ureteres, vejiga y uretra'],
        ['#78350f', kidneyObstructiveStage ? 'Punto probable de obstruccion' : 'Zona a vigilar segun enfermedad'],
        ['#dc2626', 'Inflamacion o dano si progresa']
      ]
    };
    items = kidneyLegends[selectedView] || kidneyLegends.external;
  }
  if (organKey.includes('apend')) {
    items = [
      ['#9a3412', 'Ciego e inicio del colon'],
      ['#a16207', 'Ileon terminal y mesoapendice'],
      ['#b91c1c', 'Apendice y pared inflamada'],
      ['#78350f', 'Luz obstruida / apendicolito'],
      ['#7f1d1d', 'Perforacion, absceso o peritonitis si progresa']
    ];
  }

  return `
    <div class="visual-legend" aria-label="Leyenda del modelo visual">
      <strong>Leyenda rapida</strong>
      ${items.map(([color, label]) => `
        <span><i style="background:${color}"></i>${escapeHTML(label)}</span>
      `).join('')}
    </div>
  `;
}

function bindAnatomyVisualizer(panel, data, diseaseCode) {
  panel.querySelectorAll('.stage-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.stageIndex || 0);
      const visualizer = button.closest('.anatomy-visualizer');
      if (!visualizer) return;
      const currentView = visualizer.dataset.viewMode || 'external';
      visualizer.outerHTML = renderAnatomyVisualizer(data, diseaseCode, index, currentView);
      bindAnatomyVisualizer(panel, data, diseaseCode);
    });
  });
  panel.querySelectorAll('.view-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const viewMode = button.dataset.viewMode || 'external';
      const visualizer = button.closest('.anatomy-visualizer');
      if (!visualizer) return;
      const activeStage = visualizer.querySelector('.stage-toggle.active');
      const index = Number(activeStage?.dataset.stageIndex || 0);
      visualizer.outerHTML = renderAnatomyVisualizer(data, diseaseCode, index, viewMode);
      bindAnatomyVisualizer(panel, data, diseaseCode);
    });
  });
}

function renderOrganSvg(organ, regions, stage, selectedIndex, totalStages, selectedView = 'external', diseaseCode = '') {
  const organKey = normalizeText(organ);
  const stageRatio = totalStages <= 1 ? 0 : selectedIndex / (totalStages - 1);
  const severity = Math.round(stageRatio * 100);
  const label = stage.title || organ || 'Modelo anatomico';

  if (organKey.includes('higado')) {
    return renderLiverSvg(regions, stage, severity, label);
  }
  if (isRenalContext(organ, diseaseCode)) {
    return renderKidneySvg(regions, stage, severity, label, selectedView, diseaseCode);
  }
  if (organKey.includes('vejiga') || organKey.includes('ureter') || organKey.includes('urin')) {
    return renderUrinaryTractSvg(regions, stage, severity, label);
  }
  if (organKey.includes('prostata')) {
    return renderProstateSvg(regions, stage, severity, label);
  }
  if (organKey.includes('neuromuscular') || organKey.includes('perifer') || organKey.includes('motora')) {
    return renderPeripheralNerveSvg(regions, stage, severity, label);
  }
  if (organKey.includes('cerebro') || organKey.includes('nerv')) {
    return renderBrainSvg(regions, stage, severity, label);
  }
  if (organKey.includes('pulmon') || organKey.includes('bronqu') || organKey.includes('resp')) {
    return renderLungSvg(regions, stage, severity, label);
  }
  if (organKey.includes('nasal') || organKey.includes('nariz') || organKey.includes('seno')) {
    return renderUpperAirwaySvg(regions, stage, severity, label);
  }
  if (organKey.includes('corazon') || organKey.includes('cardio') || organKey.includes('coron')) {
    return renderHeartSvg(regions, stage, severity, label);
  }
  if (organKey.includes('vaso') || organKey.includes('arter') || organKey.includes('circulatorio') || organKey.includes('miocardio') || organKey.includes('valvula')) {
    return renderVascularSvg(regions, stage, severity, label);
  }
  if (organKey.includes('pancreas') || organKey.includes('diabetes')) {
    return renderPancreasSvg(regions, stage, severity, label);
  }
  if (organKey.includes('apend')) {
    return renderAppendixAtlas(regions, stage, severity, label);
  }
  if (organKey.includes('estomago') || organKey.includes('duodeno') || organKey.includes('esofago') || organKey.includes('intest') || organKey.includes('colon') || organKey.includes('vesicula') || organKey.includes('biliar')) {
    return renderDigestiveSvg(regions, stage, severity, label);
  }
  if (organKey.includes('tiroid') || organKey.includes('suprarren') || organKey.includes('hipof') || organKey.includes('ovario') || organKey.includes('endocr')) {
    return renderEndocrineSvg(regions, stage, severity, label);
  }
  return renderGenericOrganSvg(organ, regions, stage, severity, label);
}

function renderLiverSvg(regions, stage, severity, label) {
  const nodules = severity > 25;
  const ascites = severity > 65;
  const portal = severity > 35;
  return `
    <svg class="organ-svg liver-svg" viewBox="0 0 620 390" role="img" aria-label="${escapeHTML(label)}">
      <rect width="620" height="390" rx="22" fill="#f8fbff" />
      <ellipse cx="315" cy="340" rx="230" ry="22" fill="#e5edf7" />
      ${ascites ? '<path d="M90 312 C180 360 430 360 540 310 L540 355 L90 355 Z" fill="#bfdbfe" opacity="0.72" />' : ''}
      <path class="organ-main" d="M142 157 C160 82 260 60 356 83 C429 101 501 111 530 160 C558 207 523 260 461 281 C393 304 306 276 237 282 C178 287 117 240 142 157 Z" fill="#c0564a" stroke="#87382f" stroke-width="4" />
      <path d="M245 145 C301 126 378 140 440 178" fill="none" stroke="#87382f" stroke-width="4" opacity="0.45" />
      <path d="M318 82 C306 133 310 203 332 276" fill="none" stroke="#87382f" stroke-width="3" opacity="0.35" />
      <path class="${portal ? 'highlight-vessel' : ''}" d="M312 277 C316 235 319 199 304 168 C286 132 248 119 212 118" fill="none" stroke="#2563eb" stroke-width="9" stroke-linecap="round" />
      <path d="M336 274 C347 225 373 192 418 170" fill="none" stroke="#16a34a" stroke-width="7" stroke-linecap="round" />
      <path d="M418 171 C430 193 430 220 410 246" fill="none" stroke="#16a34a" stroke-width="5" stroke-linecap="round" />
      <ellipse class="${portal ? 'organ-alert' : ''}" cx="118" cy="236" rx="${portal ? 47 : 34}" ry="${portal ? 78 : 60}" fill="#8b5a44" stroke="#5f382b" stroke-width="4" />
      ${nodules ? renderSvgDots([[205,138],[260,110],[332,135],[395,157],[455,200],[240,234],[345,232],[425,250]], '#7f1d1d') : ''}
      <g class="svg-labels">
        <text x="154" y="66">Higado</text>
        <text x="188" y="112">Parenquima</text>
        <text x="78" y="142">Bazo</text>
        <text x="198" y="318">Vena porta</text>
        <text x="398" y="310">Via biliar</text>
        ${ascites ? '<text x="452" y="354">Ascitis</text>' : ''}
      </g>
      ${renderSvgCallouts(regions, stage.visual_targets || [])}
    </svg>
  `;
}

function renderKidneySvg(regions, stage, severity, label, viewMode = 'external', diseaseCode = '') {
  return renderRenalDiseaseAtlasImage(regions, stage, severity, label, viewMode, diseaseCode);
}

function getRenalDiseaseLayer(diseaseCode = '', viewMode = 'section', severity = 0) {
  if (severity <= 0) return null;
  const common = {
    'REN-001': { label: 'Fibrosis / perdida de nefronas', tone: 'fibrosis' },
    'REN-002': { label: 'Inflamacion glomerular', tone: 'inflammation' },
    'REN-003': { label: 'Fuga de proteinas', tone: 'protein' },
    'REN-004': { label: 'Infeccion del parenquima', tone: 'infection' },
    'REN-005': { label: 'Calculo / obstruccion', tone: 'obstruction' },
    'REN-006': { label: 'Dano tubular agudo', tone: 'injury' },
    'REN-007': { label: 'Dano microvascular diabetico', tone: 'fibrosis' },
    'REN-008': { label: 'Dilatacion por obstruccion', tone: 'obstruction' }
  };
  const byDisease = common[diseaseCode] || { label: 'Cambio por enfermedad', tone: 'inflammation' };
  const positions = {
    external: { x: 58, y: 47, w: 24, h: 34 },
    section: { x: 48, y: 46, w: 34, h: 42 },
    transverse: { x: 55, y: 52, w: 36, h: 34 },
    vascular: { x: 56, y: 51, w: 34, h: 38 },
    nephron: { x: diseaseCode === 'REN-003' || diseaseCode === 'REN-002' ? 20 : 46, y: diseaseCode === 'REN-003' || diseaseCode === 'REN-002' ? 27 : 58, w: 22, h: 22 },
    urinary: { x: diseaseCode === 'REN-005' || diseaseCode === 'REN-008' ? 62 : 36, y: diseaseCode === 'REN-005' || diseaseCode === 'REN-008' ? 55 : 22, w: diseaseCode === 'REN-005' || diseaseCode === 'REN-008' ? 18 : 22, h: diseaseCode === 'REN-005' || diseaseCode === 'REN-008' ? 32 : 20 }
  };
  const position = positions[viewMode] || positions.section;
  return { ...byDisease, ...position, advanced: severity > 65 };
}

function renderRenalDiseaseAtlasImage(regions, stage, severity, label, viewMode = 'external', diseaseCode = '') {
  const atlasViews = getRenalAtlasViews();
  const view = atlasViews.find((item) => item.id === viewMode) || atlasViews[0];
  const layer = getRenalDiseaseLayer(diseaseCode, view.id, severity);
  return `
    <div class="renal-image-atlas renal-disease-atlas renal-disease-${escapeHTML(diseaseCode || 'generic')} renal-stage-${severity > 65 ? 'advanced' : severity > 20 ? 'change' : 'base'}" role="img" aria-label="${escapeHTML(label)}">
      <div class="atlas-image-core">
        <img src="${escapeHTML(view.image)}" alt="${escapeHTML(view.title)}" />
        ${layer ? `
          <span
            class="renal-disease-layer renal-disease-layer-${escapeHTML(layer.tone)} ${layer.advanced ? 'advanced' : ''}"
            style="left:${layer.x}%; top:${layer.y}%; width:${layer.w}%; height:${layer.h}%;"
            aria-hidden="true"
          ></span>
          <span class="renal-disease-caption renal-disease-caption-${escapeHTML(layer.tone)}" style="left:${Math.min(84, layer.x + 8)}%; top:${Math.max(12, layer.y - 13)}%;">
            ${escapeHTML(layer.label)}
          </span>
        ` : ''}
      </div>
    </div>
  `;
}

function renderKidneyExternalSvg(regions, stage, severity, label) {
  const fibrosis = severity > 30;
  const stageText = normalizeText([
    stage.title,
    stage.clinical_state,
    stage.teaching_prompt,
    ...(stage.visual_targets || [])
  ].filter(Boolean).join(' '));
  const obstruction = severity > 20 && (stageText.includes('obstru') || stageText.includes('calculo') || stageText.includes('hidronefrosis') || stageText.includes('bloque'));
  const chronicDamage = severity > 20 && !obstruction;
  const advanced = severity > 65;
  return `
    <svg class="organ-svg kidney-svg" viewBox="145 38 390 335" role="img" aria-label="${escapeHTML(label)}">
      <defs>
        <radialGradient id="kidneyOuter" cx="38%" cy="30%" r="72%">
          <stop offset="0%" stop-color="#fca5a5" />
          <stop offset="46%" stop-color="#dc2626" />
          <stop offset="100%" stop-color="#7f1d1d" />
        </radialGradient>
        <linearGradient id="ureterShade" x1="0" x2="1">
          <stop offset="0%" stop-color="#fed7aa" />
          <stop offset="55%" stop-color="#f97316" />
          <stop offset="100%" stop-color="#7c2d12" />
        </linearGradient>
      </defs>
      <rect width="620" height="390" rx="22" fill="#f8fbff" />
      <ellipse cx="318" cy="344" rx="230" ry="22" fill="#e5edf7" />
      <path d="M254 70 C172 94 153 203 198 273 C237 334 327 315 338 243 C344 203 320 178 348 141 C374 106 318 52 254 70 Z" fill="url(#kidneyOuter)" stroke="#7f1d1d" stroke-width="4" />
      <path d="M410 70 C492 94 511 203 466 273 C427 334 337 315 326 243 C320 203 344 178 316 141 C290 106 346 52 410 70 Z" fill="url(#kidneyOuter)" stroke="#7f1d1d" stroke-width="4" />
      <path d="M278 116 C238 143 230 211 257 252 C282 290 320 265 315 228 C311 198 286 187 306 155" fill="#fecaca" stroke="#991b1b" stroke-width="3" opacity="0.78" />
      <path d="M386 116 C426 143 434 211 407 252 C382 290 344 265 349 228 C353 198 378 187 358 155" fill="#fecaca" stroke="#991b1b" stroke-width="3" opacity="0.78" />
      <path d="M224 111 C189 151 187 226 225 276" fill="none" stroke="#fee2e2" stroke-width="10" opacity="0.3" />
      <path d="M440 111 C475 151 477 226 439 276" fill="none" stroke="#fee2e2" stroke-width="10" opacity="0.3" />
      <path class="${obstruction ? 'organ-alert-line' : ''}" d="M320 232 C316 276 304 312 273 352" fill="none" stroke="url(#ureterShade)" stroke-width="9" stroke-linecap="round" />
      <path class="${obstruction ? 'organ-alert-line' : ''}" d="M346 232 C350 276 362 312 393 352" fill="none" stroke="url(#ureterShade)" stroke-width="9" stroke-linecap="round" />
      <path d="M328 174 C295 159 254 159 218 176" fill="none" stroke="#2563eb" stroke-width="8" stroke-linecap="round" />
      <path d="M337 174 C370 159 411 159 447 176" fill="none" stroke="#dc2626" stroke-width="8" stroke-linecap="round" />
      ${chronicDamage ? '<path class="renal-cortical-loss" d="M235 90 C176 128 175 236 223 287 M429 90 C488 128 489 236 441 287" fill="none" stroke="#f59e0b" stroke-width="6" stroke-linecap="round" opacity="0.72" />' : ''}
      ${fibrosis ? renderSvgDots([[250,104],[223,172],[250,250],[405,104],[438,172],[407,250]], '#fef3c7') : ''}
      <g class="svg-labels">
        <text x="212" y="54">Rinones: vista externa</text>
        <text x="203" y="354">Ureter</text>
        <text x="188" y="151">Vena renal</text>
        <text x="386" y="151">Arteria renal</text>
        <text x="376" y="270">Capsula renal</text>
        ${chronicDamage ? '<text x="240" y="86">Fibrosis cortical</text>' : ''}
        ${advanced && chronicDamage ? '<text x="374" y="306">Rinon cicatricial</text>' : ''}
        ${obstruction ? '<text x="374" y="330">Drenaje bloqueado</text>' : ''}
      </g>
    </svg>
  `;
}

function renderKidneySectionSvg(regions, stage, severity, label) {
  const stageText = normalizeText([
    stage.title,
    stage.clinical_state,
    stage.teaching_prompt,
    ...(stage.visual_targets || [])
  ].filter(Boolean).join(' '));
  const obstruction = severity > 20 && (stageText.includes('obstru') || stageText.includes('calculo') || stageText.includes('hidronefrosis') || stageText.includes('bloque'));
  const inflammation = severity > 20 && !stageText.includes('cronica') && !stageText.includes('fibrosis') && !stageText.includes('cicatric');
  const chronicDamage = severity > 20 && !obstruction;
  const scarring = severity > 55;
  return `
    <svg class="organ-svg kidney-svg" viewBox="120 28 405 340" role="img" aria-label="${escapeHTML(label)}">
      <defs>
        <linearGradient id="renalCortex" x1="0" x2="1">
          <stop offset="0%" stop-color="#fecaca" />
          <stop offset="52%" stop-color="#dc2626" />
          <stop offset="100%" stop-color="#7f1d1d" />
        </linearGradient>
        <radialGradient id="renalPelvis" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stop-color="#fff7ed" />
          <stop offset="100%" stop-color="#facc15" />
        </radialGradient>
      </defs>
      <rect width="620" height="390" rx="22" fill="#f8fbff" />
      <ellipse cx="315" cy="348" rx="238" ry="22" fill="#e5edf7" />
      <path d="M304 48 C187 78 151 207 207 295 C255 370 391 337 410 244 C421 189 382 157 413 108 C446 55 372 31 304 48 Z" fill="url(#renalCortex)" stroke="#7f1d1d" stroke-width="5" />
      <path d="M306 78 C218 103 188 209 229 278 C267 338 370 316 384 238 C392 195 362 168 386 126 C409 86 357 64 306 78 Z" fill="#fca5a5" stroke="#991b1b" stroke-width="3" opacity="0.86" />
      ${chronicDamage ? '<path d="M306 80 C226 105 198 206 237 271 C272 325 361 303 374 236 C381 196 354 170 377 130" fill="none" stroke="#f59e0b" stroke-width="8" stroke-linecap="round" opacity="0.55" />' : ''}
      <path d="M313 156 C289 182 274 210 275 247 C298 239 326 238 351 249 C350 211 338 181 313 156 Z" fill="url(#renalPelvis)" stroke="#92400e" stroke-width="3" />
      <path d="M331 245 C346 273 356 309 352 358" fill="none" stroke="#facc15" stroke-width="13" stroke-linecap="round" />
      <g class="renal-pyramids" stroke="#7f1d1d" stroke-width="2.5">
        <path d="M258 116 L289 188 L232 178 Z" fill="#b91c1c" opacity="0.8" />
        <path d="M329 96 L333 181 L284 145 Z" fill="#b91c1c" opacity="0.78" />
        <path d="M383 137 L340 199 L333 134 Z" fill="#b91c1c" opacity="0.78" />
        <path d="M235 214 L291 225 L252 282 Z" fill="#b91c1c" opacity="0.72" />
        <path d="M381 224 L326 229 L356 291 Z" fill="#b91c1c" opacity="0.72" />
      </g>
      <path d="M214 178 C254 191 274 210 275 247" fill="none" stroke="#fed7aa" stroke-width="6" stroke-linecap="round" />
      <path d="M414 179 C370 193 350 211 351 249" fill="none" stroke="#fed7aa" stroke-width="6" stroke-linecap="round" />
      ${inflammation ? '<path class="organ-alert" d="M210 109 C244 90 289 91 318 119 C280 132 249 162 230 198 C207 178 198 140 210 109 Z" fill="#fb923c" opacity="0.38" stroke="#ea580c" stroke-width="3" />' : ''}
      ${scarring ? renderSvgDots([[241,132],[270,102],[361,122],[389,202],[246,258],[337,288],[302,67]], '#fef3c7') : ''}
      <g class="renal-leader-labels">
        <text x="218" y="44" class="renal-title">Corte longitudinal del rinon</text>
        <path d="M202 83 L254 112" />
        <text x="128" y="84">Capsula fibrosa</text>
        <path d="M224 112 L276 132" />
        <text x="150" y="116">Corteza renal</text>
        <path d="M220 176 L258 181" />
        <text x="136" y="180">Columna renal</text>
        <path d="M216 220 L275 218" />
        <text x="134" y="224">Caliz menor</text>
        <path d="M231 255 L292 242" />
        <text x="130" y="260">Caliz mayor</text>
        <path d="M354 120 L382 96" />
        <text x="392" y="100">Medula renal</text>
        <path d="M348 174 L315 156" />
        <text x="392" y="178">Papila renal</text>
        <path d="M352 236 L321 222" />
        <text x="392" y="240">Pelvis renal</text>
        <path d="M364 312 L345 285" />
        <text x="390" y="316">Ureter</text>
        <path d="M368 194 L405 194" />
        <text x="412" y="198">Hilio renal</text>
        <path d="M366 150 L392 138" />
        <text x="402" y="142">Vasos renales</text>
        ${chronicDamage ? '<path d="M196 318 L252 300" /><text x="124" y="322">Fibrosis cortical</text>' : ''}
        ${obstruction ? '<path d="M352 338 L334 252" /><text x="390" y="338">Dilatacion proximal</text>' : ''}
      </g>
    </svg>
  `;
}

function renderKidneyTransverseSvg(regions, stage, severity, label) {
  const stageText = normalizeText([
    stage.title,
    stage.clinical_state,
    stage.teaching_prompt,
    ...(stage.visual_targets || [])
  ].filter(Boolean).join(' '));
  const active = severity > 20;
  const obstruction = active && (stageText.includes('obstru') || stageText.includes('calculo') || stageText.includes('hidronefrosis'));
  return `
    <svg class="organ-svg kidney-svg" viewBox="0 0 620 390" role="img" aria-label="${escapeHTML(label)}">
      <defs>
        <radialGradient id="renalTransverseCortex" cx="42%" cy="38%" r="72%">
          <stop offset="0%" stop-color="#fecaca" />
          <stop offset="62%" stop-color="#dc2626" />
          <stop offset="100%" stop-color="#7f1d1d" />
        </radialGradient>
      </defs>
      <rect width="620" height="390" rx="22" fill="#f8fbff" />
      <ellipse cx="310" cy="340" rx="226" ry="22" fill="#e5edf7" />
      <path d="M310 58 C218 62 154 124 154 207 C154 292 229 331 310 331 C391 331 466 292 466 207 C466 124 402 62 310 58 Z" fill="url(#renalTransverseCortex)" stroke="#7f1d1d" stroke-width="5" />
      <path d="M310 88 C240 92 193 139 193 207 C193 277 250 300 310 300 C370 300 427 277 427 207 C427 139 380 92 310 88 Z" fill="#fca5a5" stroke="#991b1b" stroke-width="3" opacity="0.88" />
      <path d="M310 118 C278 142 258 170 260 206 C263 247 286 267 310 276 C334 267 357 247 360 206 C362 170 342 142 310 118 Z" fill="#fee2e2" stroke="#991b1b" stroke-width="3" />
      <path d="M310 153 C293 169 286 188 290 214 C300 208 320 208 330 214 C334 188 327 169 310 153 Z" fill="#facc15" stroke="#92400e" stroke-width="3" />
      <path d="M332 213 C374 210 425 211 502 213" fill="none" stroke="#facc15" stroke-width="13" stroke-linecap="round" />
      <path d="M356 181 C402 166 445 154 515 154" fill="none" stroke="#dc2626" stroke-width="10" stroke-linecap="round" />
      <path d="M355 233 C402 249 445 260 515 260" fill="none" stroke="#2563eb" stroke-width="10" stroke-linecap="round" />
      <path d="M238 146 C259 127 282 114 310 108 M224 198 C249 186 272 182 295 188 M241 266 C263 282 286 292 310 298 M380 146 C359 127 336 114 310 108 M394 198 C371 186 348 182 325 188 M379 266 C357 282 334 292 310 298" fill="none" stroke="#7f1d1d" stroke-width="4" opacity="0.52" />
      ${active ? '<path d="M198 104 C176 157 176 250 202 303" fill="none" stroke="#f59e0b" stroke-width="7" stroke-linecap="round" opacity="0.58" />' : ''}
      ${obstruction ? '<circle cx="432" cy="213" r="15" fill="#78350f" stroke="#451a03" stroke-width="4" />' : ''}
      <g class="renal-leader-labels">
        <text x="214" y="40" class="renal-title">Corte transversal renal</text>
        <path d="M174 105 L224 126" />
        <text x="80" y="108">Capsula</text>
        <path d="M176 164 L239 160" />
        <text x="68" y="168">Corteza</text>
        <path d="M178 222 L265 207" />
        <text x="74" y="226">Medula</text>
        <path d="M240 318 L296 272" />
        <text x="82" y="322">Seno renal</text>
        <path d="M348 205 L319 190" />
        <text x="372" y="202">Pelvis renal</text>
        <path d="M504 154 L454 162" />
        <text x="504" y="142">Arteria renal</text>
        <path d="M504 260 L456 253" />
        <text x="504" y="282">Vena renal</text>
        <path d="M502 213 L442 213" />
        <text x="504" y="220">Ureter</text>
        ${obstruction ? '<text x="368" y="242">Punto estrecho</text>' : ''}
      </g>
    </svg>
  `;
}

function renderKidneyVascularSvg(regions, stage, severity, label) {
  const stageText = normalizeText([
    stage.title,
    stage.clinical_state,
    stage.teaching_prompt,
    ...(stage.visual_targets || [])
  ].filter(Boolean).join(' '));
  const obstruction = severity > 20 && (stageText.includes('obstru') || stageText.includes('calculo') || stageText.includes('hidronefrosis') || stageText.includes('bloque'));
  const advanced = severity > 65;
  const chronicDamage = severity > 20 && !obstruction;
  return `
    <div class="renal-image-atlas renal-stage-${severity > 65 ? 'advanced' : severity > 20 ? 'change' : 'base'}" role="img" aria-label="${escapeHTML(label)}">
      <div class="atlas-image-core">
        <img src="assets/renal-atlas/renal-vascular-collector-created-v1.png" alt="Atlas renal generado: vasos y sistema colector" />
        <div class="atlas-annotation artery-main" style="left: 51%; top: 18%;">Arteria renal</div>
        <div class="atlas-annotation artery-branch" style="left: 65%; top: 35%;">Segmentarias</div>
        <div class="atlas-annotation artery-arc" style="left: 73%; top: 50%;">Interlobares / arcuatas</div>
        <div class="atlas-annotation vein-main" style="left: 42%; top: 20%;">Vena renal</div>
        <div class="atlas-annotation calyces" style="left: 41%; top: 56%;">Calices menores/mayores</div>
        <div class="atlas-annotation pelvis" style="left: 50%; top: 61%;">Pelvis renal</div>
        <div class="atlas-annotation ureter-label" style="left: 52%; top: 83%;">Ureter</div>
        ${chronicDamage ? '<div class="renal-damage-zone left"></div><div class="renal-damage-zone right"></div><div class="atlas-annotation disease-label" style="left: 25%; top: 28%;">Fibrosis / perdida de nefronas</div>' : ''}
        ${advanced && chronicDamage ? '<div class="atlas-annotation advanced-label" style="left: 75%; top: 72%;">Corteza adelgazada</div>' : ''}
        ${obstruction ? '<div class="atlas-annotation obstruction-label" style="left: 51%; top: 71%;">Punto de obstruccion</div>' : ''}
      </div>
    </div>
  `;
}

function renderKidneyNephronSvg(regions, stage, severity, label) {
  const active = severity > 20;
  const advanced = severity > 65;
  return `
    <svg class="organ-svg kidney-svg nephron-svg" viewBox="0 0 620 390" role="img" aria-label="${escapeHTML(label)}">
      <rect width="620" height="390" rx="22" fill="#f8fbff" />
      <ellipse cx="315" cy="344" rx="235" ry="24" fill="#e5edf7" />
      <path d="M104 106 C136 62 207 67 227 118 C244 161 216 206 170 209 C123 212 78 184 80 145 C81 130 90 116 104 106 Z" fill="#fecaca" stroke="#991b1b" stroke-width="4" />
      <circle cx="158" cy="140" r="42" fill="#fee2e2" stroke="#7f1d1d" stroke-width="4" />
      <path d="M126 140 C150 118 174 118 197 140 C174 164 150 164 126 140 Z" fill="#dc2626" opacity="0.76" />
      <path d="M72 132 C94 132 106 136 126 140" fill="none" stroke="#dc2626" stroke-width="8" stroke-linecap="round" />
      <path d="M197 140 C222 145 237 154 251 171" fill="none" stroke="#2563eb" stroke-width="8" stroke-linecap="round" />
      <path d="M205 179 C259 169 290 190 270 219 C252 246 206 232 226 205 C242 183 309 180 330 214 C349 247 300 268 259 257" fill="none" stroke="#f59e0b" stroke-width="10" stroke-linecap="round" />
      <path d="M330 214 C381 232 397 271 358 293 C321 315 282 291 299 262" fill="none" stroke="#f59e0b" stroke-width="10" stroke-linecap="round" />
      <path d="M358 293 C402 278 438 285 454 320" fill="none" stroke="#facc15" stroke-width="11" stroke-linecap="round" />
      <path d="M454 320 C486 255 488 170 452 96" fill="none" stroke="#facc15" stroke-width="12" stroke-linecap="round" />
      <path d="M452 96 C509 119 533 177 509 238 C496 273 477 300 454 320" fill="none" stroke="#facc15" stroke-width="9" stroke-linecap="round" opacity="0.78" />
      <path d="M250 171 C290 151 347 151 388 174 M263 257 C317 278 385 268 454 320" fill="none" stroke="#2563eb" stroke-width="4" stroke-dasharray="8 8" opacity="0.7" />
      ${active ? '<path d="M112 101 C140 83 192 89 214 121" fill="none" stroke="#f59e0b" stroke-width="7" stroke-linecap="round" opacity="0.7" />' : ''}
      ${advanced ? '<path d="M214 189 C278 165 330 176 352 218 C379 269 313 304 258 278" fill="none" stroke="#78350f" stroke-width="7" stroke-linecap="round" opacity="0.72" />' : ''}
      <g class="renal-leader-labels">
        <text x="226" y="42" class="renal-title">Nefrona y filtracion</text>
        <path d="M108 96 L145 118" />
        <text x="42" y="90">Capsula de Bowman</text>
        <path d="M124 140 L154 140" />
        <text x="44" y="154">Glomerulo</text>
        <path d="M74 132 L102 132" />
        <text x="40" y="122">Aferente</text>
        <path d="M250 171 L228 166" />
        <text x="250" y="160">Eferente</text>
        <path d="M276 218 L245 212" />
        <text x="286" y="220">Tubulo proximal</text>
        <path d="M452 96 L480 124" />
        <text x="490" y="112">Asa de Henle</text>
        <path d="M454 320 L418 310" />
        <text x="470" y="328">Colector</text>
        <path d="M362 174 L388 174" />
        <text x="395" y="180">Capilares</text>
        ${active ? '<text x="236" y="336">Relaciona filtracion, reabsorcion, secrecion y concentracion</text>' : ''}
      </g>
    </svg>
  `;
}

function renderUrinaryTractSvg(regions, stage, severity, label) {
  const infection = severity > 20;
  const obstruction = severity > 60;
  return `
    <svg class="organ-svg urinary-svg" viewBox="0 0 620 390" role="img" aria-label="${escapeHTML(label)}">
      <rect width="620" height="390" rx="22" fill="#f8fbff" />
      <ellipse cx="315" cy="344" rx="235" ry="24" fill="#e5edf7" />
      <path d="M237 75 C176 95 164 176 196 229 C223 273 288 260 296 206 C301 173 285 155 304 126 C323 98 282 62 237 75 Z" fill="#b91c1c" stroke="#7f1d1d" stroke-width="4" />
      <path d="M383 75 C444 95 456 176 424 229 C397 273 332 260 324 206 C319 173 335 155 316 126 C297 98 338 62 383 75 Z" fill="#b91c1c" stroke="#7f1d1d" stroke-width="4" />
      <path class="${obstruction ? 'organ-alert-line' : ''}" d="M294 205 C284 243 274 282 288 318" fill="none" stroke="#f59e0b" stroke-width="8" stroke-linecap="round" />
      <path class="${obstruction ? 'organ-alert-line' : ''}" d="M326 205 C336 243 346 282 332 318" fill="none" stroke="#f59e0b" stroke-width="8" stroke-linecap="round" />
      <path d="M265 315 C282 288 338 288 356 315 C374 345 344 362 310 362 C276 362 247 345 265 315 Z" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="4" />
      <path d="M309 360 C309 377 312 383 316 390" stroke="#1d4ed8" stroke-width="7" stroke-linecap="round" />
      ${infection ? '<path class="organ-alert" d="M270 317 C286 300 334 300 350 318 C360 342 339 353 310 353 C281 353 260 342 270 317 Z" fill="#f97316" opacity="0.55" stroke="#c2410c" stroke-width="3" />' : ''}
      ${obstruction ? '<circle cx="290" cy="257" r="14" fill="#78350f" stroke="#451a03" stroke-width="4" />' : ''}
      <g class="svg-labels">
        <text x="206" y="48">Via urinaria: rinones, ureteres y vejiga</text>
        <text x="184" y="108">Rinon</text>
        <text x="348" y="108">Rinon</text>
        <text x="248" y="262">Ureter</text>
        <text x="354" y="262">Ureter</text>
        <text x="280" y="382">Vejiga</text>
        ${infection ? '<text x="356" y="334">Inflamacion/infeccion</text>' : ''}
        ${obstruction ? '<text x="120" y="262">Calculo / bloqueo</text>' : ''}
      </g>
      ${renderSvgCallouts(regions, stage.visual_targets || [])}
    </svg>
  `;
}

function renderProstateSvg(regions, stage, severity, label) {
  const obstruction = severity > 25;
  const severe = severity > 65;
  return `
    <svg class="organ-svg prostate-svg" viewBox="0 0 620 390" role="img" aria-label="${escapeHTML(label)}">
      <rect width="620" height="390" rx="22" fill="#f8fbff" />
      <ellipse cx="315" cy="344" rx="235" ry="24" fill="#e5edf7" />
      <path d="M255 92 C280 62 340 62 365 92 C393 126 374 176 310 176 C246 176 227 126 255 92 Z" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="4" />
      <path d="M310 174 V344" fill="none" stroke="#1d4ed8" stroke-width="9" stroke-linecap="round" />
      <path class="${obstruction ? 'organ-alert' : ''}" d="M246 218 C250 170 287 146 310 181 C334 146 371 170 375 218 C379 269 344 301 310 301 C276 301 242 269 246 218 Z" fill="#d8b4fe" stroke="#7e22ce" stroke-width="4" />
      <path d="M310 177 C300 218 300 259 310 301 C320 259 320 218 310 177 Z" fill="#f8fafc" stroke="#7e22ce" stroke-width="3" />
      ${obstruction ? '<path class="organ-alert-line" d="M310 177 C304 217 304 258 310 301" fill="none" stroke="#f59e0b" stroke-width="7" stroke-linecap="round" />' : ''}
      ${severe ? '<path d="M266 151 C235 177 228 235 250 286 M354 151 C385 177 392 235 370 286" fill="none" stroke="#ef4444" stroke-width="5" stroke-linecap="round" opacity="0.7" />' : ''}
      <g class="svg-labels">
        <text x="238" y="50">Prostata y salida urinaria</text>
        <text x="270" y="112">Vejiga</text>
        <text x="194" y="248">Prostata</text>
        <text x="323" y="254">Uretra</text>
        ${obstruction ? '<text x="338" y="310">Obstruccion</text>' : ''}
      </g>
      ${renderSvgCallouts(regions, stage.visual_targets || [])}
    </svg>
  `;
}

function renderBrainSvg(regions, stage, severity, label) {
  const ischemia = severity > 20;
  const edema = severity > 60;
  return `
    <svg class="organ-svg brain-svg" viewBox="0 0 620 390" role="img" aria-label="${escapeHTML(label)}">
      <defs>
        <radialGradient id="brainCortex" cx="46%" cy="38%" r="72%">
          <stop offset="0%" stop-color="#fde2e8" />
          <stop offset="62%" stop-color="#f3aac0" />
          <stop offset="100%" stop-color="#d97d9d" />
        </radialGradient>
        <radialGradient id="whiteMatter" cx="48%" cy="45%" r="62%">
          <stop offset="0%" stop-color="#fff7ed" />
          <stop offset="100%" stop-color="#f8cfc0" />
        </radialGradient>
        <linearGradient id="penumbraGradient" x1="0%" x2="100%">
          <stop offset="0%" stop-color="#f97316" stop-opacity="0.82" />
          <stop offset="100%" stop-color="#facc15" stop-opacity="0.38" />
        </linearGradient>
      </defs>
      <rect width="620" height="390" rx="22" fill="#f8fbff" />
      <ellipse cx="315" cy="344" rx="235" ry="24" fill="#e5edf7" />

      <path class="brain-outline" d="M174 193 C132 151 147 91 203 78 C225 38 298 47 326 86 C365 47 442 66 462 119 C514 136 525 218 477 251 C462 307 376 319 331 283 C291 322 205 302 191 244 C160 235 151 208 174 193 Z" fill="url(#brainCortex)" stroke="#8a3f5c" stroke-width="4" />
      <path d="M214 188 C185 156 196 114 232 104 C252 77 299 86 319 116 C348 84 405 96 424 134 C459 146 467 203 431 226 C419 265 363 273 331 249 C305 279 248 267 235 229 C206 222 197 202 214 188 Z" fill="url(#whiteMatter)" stroke="#be6b82" stroke-width="2" opacity="0.78" />
      <path d="M327 87 C316 128 316 178 323 225 C326 247 329 266 332 284" fill="none" stroke="#8a3f5c" stroke-width="3" opacity="0.62" />

      <g class="brain-gyri" fill="none" stroke="#8a3f5c" stroke-width="3" stroke-linecap="round" opacity="0.56">
        <path d="M195 132 C227 115 251 116 273 137" />
        <path d="M198 166 C239 146 271 154 295 180" />
        <path d="M194 205 C233 201 259 217 276 247" />
        <path d="M248 92 C278 101 296 125 299 157" />
        <path d="M352 98 C386 93 416 112 431 143" />
        <path d="M342 143 C382 134 420 149 447 180" />
        <path d="M345 190 C386 185 426 205 449 238" />
        <path d="M347 239 C377 252 406 251 433 235" />
        <path d="M237 262 C267 280 303 278 330 253" />
      </g>

      <g class="brain-territories" opacity="0.72">
        <path d="M233 95 C264 76 306 88 319 121 C297 130 273 145 253 167 C229 157 214 133 233 95 Z" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
        <path d="M189 142 C222 125 262 146 285 183 C308 220 288 260 245 255 C202 250 171 214 181 176 C184 162 187 151 189 142 Z" fill="#dcfce7" stroke="#16a34a" stroke-width="2" />
        <path d="M350 116 C394 98 448 130 462 181 C475 229 429 262 378 246 C340 234 329 196 344 161 C348 151 350 134 350 116 Z" fill="#fef3c7" stroke="#d97706" stroke-width="2" />
      </g>

      ${ischemia ? '<path class="penumbra-zone" d="M198 137 C239 105 293 126 306 176 C318 224 271 257 225 238 C184 221 168 167 198 137 Z" fill="url(#penumbraGradient)" stroke="#f97316" stroke-width="3" />' : ''}
      ${ischemia ? '<path class="ischemia-zone" d="M213 151 C245 130 283 145 290 181 C298 215 262 238 231 223 C203 209 189 172 213 151 Z" fill="#b91c1c" opacity="0.78" stroke="#7f1d1d" stroke-width="3" />' : ''}

      <g class="brain-vessels" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M317 285 C318 260 319 236 319 214" stroke="#1d4ed8" stroke-width="10" />
        <path class="${ischemia ? 'highlight-vessel' : ''}" d="M319 214 C292 193 262 178 224 171" stroke="#16a34a" stroke-width="8" />
        <path d="M319 214 C349 193 382 178 426 172" stroke="#d97706" stroke-width="8" />
        <path d="M319 214 C320 180 321 143 322 110" stroke="#2563eb" stroke-width="7" />
        <path d="M288 247 C305 232 332 232 350 247" stroke="#1d4ed8" stroke-width="6" />
        <path d="M288 247 C266 251 245 263 226 282" stroke="#1d4ed8" stroke-width="5" />
        <path d="M350 247 C374 252 395 263 414 282" stroke="#1d4ed8" stroke-width="5" />
      </g>

      <g class="brainstem-cerebellum">
        <path d="M304 282 C299 309 299 332 315 351 C332 333 333 309 327 282 Z" fill="#f4a3b9" stroke="#8a3f5c" stroke-width="3" />
        <path d="M365 270 C421 261 458 291 456 324 C417 337 371 325 349 293 Z" fill="#f6bfd0" stroke="#8a3f5c" stroke-width="3" />
        <path d="M374 290 C397 283 427 290 447 308 M371 309 C398 300 424 307 441 322" fill="none" stroke="#8a3f5c" stroke-width="2" opacity="0.58" />
      </g>

      ${edema ? '<path class="mass-effect" d="M183 101 C226 57 301 58 332 91 C322 133 323 197 331 257" fill="none" stroke="#ef4444" stroke-width="6" stroke-linecap="round" opacity="0.85" />' : ''}
      <g class="svg-labels">
        <text x="218" y="46">Cerebro: corteza, vasos y territorios</text>
        <text x="246" y="116">ACA</text>
        <text x="196" y="162">ACM</text>
        <text x="424" y="158">ACP</text>
        <text x="281" y="372">Tronco encefalico</text>
        <text x="405" y="348">Cerebelo</text>
        ${ischemia ? '<text x="182" y="254">Nucleo isquemico + penumbra</text>' : ''}
      </g>
      ${renderSvgCallouts(regions, stage.visual_targets || [])}
    </svg>
  `;
}

function renderPeripheralNerveSvg(regions, stage, severity, label) {
  const inflammation = 0.2 + severity / 150;
  const blockOffset = Math.max(0, severity - 20);
  return `
    <svg class="organ-svg nerve-svg" viewBox="0 0 420 280" role="img" aria-label="${escapeHTML(label)}">
      <defs>
        <linearGradient id="nerveFiber" x1="0" x2="1">
          <stop offset="0%" stop-color="#f7d08a" />
          <stop offset="50%" stop-color="#f4a261" />
          <stop offset="100%" stop-color="#d97745" />
        </linearGradient>
        <filter id="nerveGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect x="24" y="34" width="372" height="212" rx="28" fill="#f8fbff" />
      <path d="M62 142 C126 88 184 88 238 142 S326 196 374 142" fill="none" stroke="url(#nerveFiber)" stroke-width="18" stroke-linecap="round" />
      <path d="M62 142 C126 88 184 88 238 142 S326 196 374 142" fill="none" stroke="#6d4c41" stroke-width="3" stroke-dasharray="12 14" opacity="0.45" />
      <g opacity="${inflammation}" filter="url(#nerveGlow)">
        <circle cx="142" cy="104" r="${18 + severity / 6}" fill="#ef4444" opacity="0.36" />
        <circle cx="246" cy="150" r="${14 + severity / 8}" fill="#ef4444" opacity="0.30" />
        <circle cx="312" cy="184" r="${10 + severity / 10}" fill="#ef4444" opacity="0.24" />
      </g>
      <g transform="translate(272 74)">
        <path d="M0 70 C28 22 64 18 92 48" fill="none" stroke="#b45309" stroke-width="10" stroke-linecap="round" />
        <ellipse cx="104" cy="50" rx="34" ry="18" fill="#fca5a5" opacity="0.9" />
        <path d="M110 34 L122 66 M96 35 L105 67" stroke="#7f1d1d" stroke-width="3" opacity="${0.25 + blockOffset / 120}" />
        <text x="42" y="105" text-anchor="middle">Union neuromuscular</text>
      </g>
      <g class="svg-callouts">
        ${renderSvgCallouts(regions, stage.visual_targets || [])}
      </g>
      <text x="210" y="260" text-anchor="middle">${escapeHTML(label)} - severidad ${severity}%</text>
    </svg>
  `;
}

function renderLungSvg(regions, stage, severity, label) {
  const consolidation = severity > 25;
  const severe = severity > 65;
  return `
    <svg class="organ-svg lung-svg" viewBox="0 0 620 390" role="img" aria-label="${escapeHTML(label)}">
      <rect width="620" height="390" rx="22" fill="#f8fbff" />
      <ellipse cx="315" cy="344" rx="235" ry="24" fill="#e5edf7" />
      <path d="M306 70 V128" stroke="#64748b" stroke-width="13" stroke-linecap="round" />
      <path d="M306 126 C260 156 229 195 211 270" fill="none" stroke="#64748b" stroke-width="9" stroke-linecap="round" />
      <path d="M306 126 C352 156 383 195 401 270" fill="none" stroke="#64748b" stroke-width="9" stroke-linecap="round" />
      <path d="M210 120 C143 151 126 275 176 319 C225 363 289 303 280 224 C274 171 252 125 210 120 Z" fill="#c7eaff" stroke="#1d4ed8" stroke-width="4" />
      <path d="M402 120 C469 151 486 275 436 319 C387 363 323 303 332 224 C338 171 360 125 402 120 Z" fill="#c7eaff" stroke="#1d4ed8" stroke-width="4" />
      <g class="bronchial-tree" fill="none" stroke="#0f766e" stroke-width="4" stroke-linecap="round" opacity="0.82">
        <path d="M252 188 C227 202 211 228 205 262 M252 188 C244 221 248 253 265 286" />
        <path d="M361 188 C386 202 402 228 408 262 M361 188 C369 221 365 253 348 286" />
        <path d="M222 238 C205 239 191 248 181 263 M393 238 C410 239 424 248 434 263" />
      </g>
      <g class="alveoli" opacity="0.9">
        ${renderSvgDots([[194,285],[215,298],[236,286],[377,286],[398,299],[419,285]], '#ffffff')}
      </g>
      ${consolidation ? '<path class="organ-alert" d="M171 229 C205 206 249 221 261 262 C272 299 235 328 198 315 C162 302 143 252 171 229 Z" fill="#f97316" opacity="0.58" stroke="#c2410c" stroke-width="3" />' : ''}
      ${severe ? '<path d="M160 317 C212 347 270 336 291 298 M324 298 C346 336 404 347 456 317" fill="none" stroke="#ef4444" stroke-width="5" stroke-linecap="round" opacity="0.75" />' : ''}
      <g class="svg-labels">
        <text x="210" y="50">Pulmones: via aerea, alveolos y pleura</text>
        <text x="278" y="95">Traquea</text>
        <text x="208" y="178">Bronquios</text>
        <text x="174" y="338">Alveolos</text>
        <text x="430" y="338">Pleura</text>
        ${consolidation ? '<text x="126" y="222">Consolidacion</text>' : ''}
      </g>
      ${renderSvgCallouts(regions, stage.visual_targets || [])}
    </svg>
  `;
}

function renderUpperAirwaySvg(regions, stage, severity, label) {
  const mucosa = severity > 20;
  const sinus = severity > 55;
  return `
    <svg class="organ-svg upper-airway-svg" viewBox="0 0 620 390" role="img" aria-label="${escapeHTML(label)}">
      <rect width="620" height="390" rx="22" fill="#f8fbff" />
      <path d="M310 61 C247 64 204 109 196 174 C189 232 221 286 279 312 C328 334 388 318 423 277 C457 236 458 171 426 122 C400 82 360 59 310 61 Z" fill="#fde7d7" stroke="#b45309" stroke-width="4" />
      <path d="M301 102 C278 143 271 179 281 221 C289 255 277 284 242 301" fill="none" stroke="#7c2d12" stroke-width="6" stroke-linecap="round" />
      <path d="M319 102 C346 142 352 184 339 224 C329 256 340 284 376 302" fill="none" stroke="#7c2d12" stroke-width="6" stroke-linecap="round" />
      <path d="M271 168 C239 151 230 111 253 91 C284 64 331 83 331 126" fill="#dbeafe" stroke="#2563eb" stroke-width="4" opacity="0.85" />
      <path d="M349 169 C382 151 390 111 367 91 C337 64 289 83 289 126" fill="#dbeafe" stroke="#2563eb" stroke-width="4" opacity="0.85" />
      <path d="M253 208 C282 195 333 194 365 208" fill="none" stroke="#0f766e" stroke-width="8" stroke-linecap="round" opacity="0.8" />
      <path d="M287 232 C304 240 325 240 343 232" fill="none" stroke="#0f766e" stroke-width="7" stroke-linecap="round" opacity="0.75" />
      ${mucosa ? '<path class="organ-alert" d="M248 202 C284 184 336 184 372 202 C350 228 272 228 248 202 Z" fill="#f97316" opacity="0.55" stroke="#c2410c" stroke-width="3" />' : ''}
      ${sinus ? '<g class="organ-alert" opacity="0.62"><path d="M244 124 C253 92 297 86 317 112 C304 141 269 151 244 124 Z" fill="#ef4444" /><path d="M376 124 C367 92 323 86 303 112 C316 141 351 151 376 124 Z" fill="#ef4444" /></g>' : ''}
      <path d="M309 270 C303 307 293 337 278 357 M328 270 C336 306 348 336 365 357" fill="none" stroke="#64748b" stroke-width="9" stroke-linecap="round" />
      <g class="svg-labels">
        <text x="204" y="46">Via aerea superior: nariz y senos paranasales</text>
        <text x="219" y="94">Seno maxilar/frontal</text>
        <text x="382" y="205">Mucosa nasal</text>
        <text x="227" y="240">Cornetes</text>
        <text x="359" y="352">Faringe</text>
        ${mucosa ? '<text x="212" y="180">Edema / secrecion</text>' : ''}
      </g>
      ${renderSvgCallouts(regions, stage.visual_targets || [])}
    </svg>
  `;
}

function renderHeartSvg(regions, stage, severity, label) {
  const ischemia = severity > 25;
  const failure = severity > 65;
  return `
    <svg class="organ-svg heart-svg" viewBox="0 0 620 390" role="img" aria-label="${escapeHTML(label)}">
      <rect width="620" height="390" rx="22" fill="#f8fbff" />
      <ellipse cx="315" cy="344" rx="235" ry="24" fill="#e5edf7" />
      <path d="M301 114 C258 66 179 92 168 161 C155 245 244 295 312 342 C383 294 471 244 454 159 C440 91 361 66 321 116 Z" fill="#ef8080" stroke="#991b1b" stroke-width="4" />
      <path d="M312 125 C292 171 292 232 314 331" fill="none" stroke="#991b1b" stroke-width="4" opacity="0.45" />
      <path d="M236 155 C269 174 291 203 303 249" fill="none" stroke="#7f1d1d" stroke-width="3" opacity="0.55" />
      <path d="M389 155 C354 176 332 205 322 249" fill="none" stroke="#7f1d1d" stroke-width="3" opacity="0.55" />
      <path class="${ischemia ? 'highlight-vessel' : ''}" d="M315 116 C283 136 257 176 249 235" fill="none" stroke="#f59e0b" stroke-width="8" stroke-linecap="round" />
      <path d="M321 118 C359 139 389 178 395 238" fill="none" stroke="#f59e0b" stroke-width="7" stroke-linecap="round" />
      <path d="M304 89 C303 63 318 47 344 45 C376 43 393 67 389 98" fill="none" stroke="#2563eb" stroke-width="11" stroke-linecap="round" />
      <path d="M275 93 C245 70 216 72 198 94" fill="none" stroke="#dc2626" stroke-width="10" stroke-linecap="round" />
      ${ischemia ? '<path class="ischemia-zone" d="M219 201 C252 188 291 211 296 250 C301 289 266 311 232 294 C199 277 188 222 219 201 Z" fill="#b91c1c" opacity="0.62" stroke="#7f1d1d" stroke-width="3" />' : ''}
      ${failure ? '<path class="organ-alert-line" d="M182 252 C212 318 279 346 312 342 C351 342 418 316 449 252" fill="none" stroke="#1d4ed8" stroke-width="6" stroke-linecap="round" opacity="0.78" />' : ''}
      <g class="svg-labels">
        <text x="214" y="46">Corazon: camaras y coronarias</text>
        <text x="196" y="147">Auricula</text>
        <text x="233" y="286">Ventriculo</text>
        <text x="339" y="147">Aorta / salida</text>
        <text x="132" y="223">Coronaria</text>
        ${ischemia ? '<text x="151" y="312">Miocardio en riesgo</text>' : ''}
      </g>
      ${renderSvgCallouts(regions, stage.visual_targets || [])}
    </svg>
  `;
}

function renderVascularSvg(regions, stage, severity, label) {
  const narrowing = severity > 20;
  const lowFlow = severity > 60;
  return `
    <svg class="organ-svg vascular-svg" viewBox="0 0 620 390" role="img" aria-label="${escapeHTML(label)}">
      <rect width="620" height="390" rx="22" fill="#f8fbff" />
      <ellipse cx="315" cy="344" rx="235" ry="24" fill="#e5edf7" />
      <path d="M96 190 C165 104 253 104 310 190 C368 276 455 276 524 190" fill="none" stroke="#ef4444" stroke-width="30" stroke-linecap="round" opacity="0.92" />
      <path d="M96 190 C165 104 253 104 310 190 C368 276 455 276 524 190" fill="none" stroke="#fecaca" stroke-width="${narrowing ? 8 : 18}" stroke-linecap="round" />
      <path d="M306 90 C281 61 232 77 226 119 C218 169 273 199 311 228 C351 199 406 169 397 118 C390 77 341 61 316 91 Z" fill="#fca5a5" stroke="#991b1b" stroke-width="4" />
      <path d="M149 248 C132 283 117 314 99 338 M470 248 C491 283 509 314 532 338" fill="none" stroke="#dc2626" stroke-width="18" stroke-linecap="round" />
      <path d="M190 107 C169 81 140 62 109 52 M430 107 C454 81 484 62 516 52" fill="none" stroke="#2563eb" stroke-width="16" stroke-linecap="round" opacity="0.72" />
      ${narrowing ? '<path class="organ-alert" d="M357 244 C385 224 428 231 446 263 C420 283 379 279 357 244 Z" fill="#f59e0b" opacity="0.72" stroke="#b45309" stroke-width="3" />' : ''}
      ${lowFlow ? '<g opacity="0.75"><path d="M93 191 C140 225 190 227 238 204" fill="none" stroke="#7f1d1d" stroke-width="6" stroke-dasharray="10 12" /><path d="M382 204 C430 227 481 225 528 191" fill="none" stroke="#7f1d1d" stroke-width="6" stroke-dasharray="10 12" /></g>' : ''}
      <g class="svg-labels">
        <text x="180" y="42">Sistema cardiovascular: flujo, presion y perfusion</text>
        <text x="278" y="80">Corazon</text>
        <text x="82" y="156">Arteria</text>
        <text x="444" y="156">Vena / retorno</text>
        <text x="83" y="358">Extremidad</text>
        <text x="451" y="358">Perfusion distal</text>
        ${narrowing ? '<text x="390" y="236">Estenosis / placa</text>' : ''}
        ${lowFlow ? '<text x="226" y="250">Hipoperfusion</text>' : ''}
      </g>
      ${renderSvgCallouts(regions, stage.visual_targets || [])}
    </svg>
  `;
}

function renderPancreasSvg(regions, stage, severity, label) {
  const betaStress = severity > 25;
  const vascular = severity > 65;
  return `
    <svg class="organ-svg pancreas-svg" viewBox="0 0 620 390" role="img" aria-label="${escapeHTML(label)}">
      <rect width="620" height="390" rx="22" fill="#f8fbff" />
      <ellipse cx="315" cy="344" rx="235" ry="24" fill="#e5edf7" />
      <path d="M145 215 C181 155 270 144 348 161 C415 176 478 171 513 205 C540 231 517 267 463 265 C398 263 359 230 296 237 C238 244 161 266 145 215 Z" fill="#f4b46d" stroke="#b45309" stroke-width="4" />
      <path d="M142 206 C112 183 105 145 129 120 C160 88 216 102 228 148" fill="none" stroke="#8b5cf6" stroke-width="10" stroke-linecap="round" opacity="0.72" />
      <path d="M214 157 C240 188 253 215 258 245 M308 160 C305 186 312 211 336 239 M410 178 C393 203 392 230 414 257" fill="none" stroke="#b45309" stroke-width="3" opacity="0.48" />
      <path d="M168 286 C245 270 353 270 452 286" fill="none" stroke="#dc2626" stroke-width="8" stroke-linecap="round" opacity="0.65" />
      ${renderSvgDots([[222,195],[284,184],[345,199],[409,212],[465,221]], betaStress ? '#dc2626' : '#fff7ed')}
      ${betaStress ? '<path class="organ-alert" d="M196 171 C250 142 318 151 362 185 C317 196 269 199 216 211 Z" fill="#f87171" opacity="0.45" stroke="#dc2626" stroke-width="3" />' : ''}
      ${vascular ? '<path class="organ-alert-line" d="M166 285 C243 310 354 310 455 286" fill="none" stroke="#f59e0b" stroke-width="6" stroke-linecap="round" opacity="0.78" />' : ''}
      <g class="svg-labels">
        <text x="210" y="54">Pancreas: islotes, conducto y vasos</text>
        <text x="126" y="108">Duodeno</text>
        <text x="260" y="146">Cuerpo</text>
        <text x="438" y="198">Cola</text>
        <text x="206" y="320">Vasos / dano metabolico</text>
        ${betaStress ? '<text x="230" y="236">Islotes beta estresados</text>' : ''}
      </g>
      ${renderSvgCallouts(regions, stage.visual_targets || [])}
    </svg>
  `;
}

function renderAppendixAtlas(regions, stage, severity, label) {
  const stageText = normalizeText([
    stage.title,
    stage.clinical_state,
    stage.teaching_prompt,
    ...(stage.visual_targets || [])
  ].filter(Boolean).join(' '));
  const inflamed = severity > 20;
  const complicated = severity > 65 || stageText.includes('perfor') || stageText.includes('absceso') || stageText.includes('periton');

  return `
    <div class="appendix-image-atlas appendix-stage-${complicated ? 'complicated' : inflamed ? 'inflamed' : 'base'}" role="img" aria-label="${escapeHTML(label)}">
      <div class="appendix-image-core">
        <img src="assets/appendix-atlas-cecum-v1.png" alt="Atlas apendicular generado: ciego, ileon terminal y apendice" />
        <svg class="appendix-leaders" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path class="cecum" d="M25 46 L39 48" />
          <path class="ileum" d="M23 32 L31 39" />
          <path class="appendix" d="M78 64 L57 64" />
          <path class="meso" d="M79 51 L66 55" />
          ${inflamed ? '<path class="inflammation" d="M80 74 L67 70" />' : ''}
          ${inflamed ? '<path class="obstruction" d="M30 66 L50 62" />' : ''}
          ${complicated ? '<path class="complication" d="M79 84 L72 78" />' : ''}
        </svg>
        <div class="appendix-annotation cecum" style="left: 18%; top: 44%;">Ciego</div>
        <div class="appendix-annotation ileum" style="left: 17%; top: 29%;">Ileon terminal</div>
        <div class="appendix-annotation appendix" style="left: 86%; top: 64%;">Apendice vermiforme</div>
        <div class="appendix-annotation meso" style="left: 86%; top: 50%;">Mesoapendice</div>
        ${inflamed ? '<div class="appendix-inflammation-zone"></div><div class="appendix-annotation inflammation" style="left: 84%; top: 74%;">Pared engrosada / grasa inflamada</div>' : ''}
        ${inflamed ? '<div class="appendix-obstruction-dot"></div><div class="appendix-annotation obstruction" style="left: 17%; top: 66%;">Luz obstruida</div>' : ''}
        ${complicated ? '<div class="appendix-complication-zone"></div><div class="appendix-annotation complication" style="left: 84%; top: 86%;">Perforacion / absceso</div>' : ''}
      </div>
    </div>
  `;
}

function renderDigestiveSvg(regions, stage, severity, label) {
  const inflamed = severity > 20;
  const complicated = severity > 65;
  return `
    <svg class="organ-svg digestive-svg" viewBox="0 0 620 390" role="img" aria-label="${escapeHTML(label)}">
      <rect width="620" height="390" rx="22" fill="#f8fbff" />
      <ellipse cx="315" cy="344" rx="235" ry="24" fill="#e5edf7" />
      <path d="M303 42 C293 82 292 113 311 143" fill="none" stroke="#94a3b8" stroke-width="13" stroke-linecap="round" />
      <path d="M278 138 C224 143 208 206 250 235 C293 265 359 245 368 195 C376 150 329 132 278 138 Z" fill="#fdba74" stroke="#b45309" stroke-width="4" />
      <path d="M370 196 C421 202 446 233 437 275 C430 309 397 324 363 309" fill="none" stroke="#f59e0b" stroke-width="18" stroke-linecap="round" />
      <path d="M258 255 C206 267 181 311 213 333 C248 358 305 328 283 292 C268 267 323 263 355 286 C398 317 458 292 449 245" fill="none" stroke="#fb923c" stroke-width="18" stroke-linecap="round" />
      <path d="M173 172 C137 185 128 229 154 255 C177 278 218 269 231 238" fill="none" stroke="#a16207" stroke-width="17" stroke-linecap="round" />
      <path d="M186 259 C190 284 180 303 161 315" fill="none" stroke="#a16207" stroke-width="12" stroke-linecap="round" />
      <path d="M421 96 C468 101 503 138 506 188 C509 237 477 276 433 288" fill="none" stroke="#84cc16" stroke-width="15" stroke-linecap="round" opacity="0.75" />
      <ellipse cx="469" cy="114" rx="26" ry="18" fill="#65a30d" opacity="0.8" />
      ${inflamed ? '<g opacity="0.62"><circle cx="280" cy="188" r="34" fill="#ef4444" /><circle cx="187" cy="244" r="24" fill="#ef4444" /><circle cx="408" cy="273" r="24" fill="#ef4444" /></g>' : ''}
      ${complicated ? '<path class="organ-alert-line" d="M155 318 C226 279 412 279 476 318" fill="none" stroke="#7f1d1d" stroke-width="7" stroke-linecap="round" opacity="0.78" />' : ''}
      <g class="svg-labels">
        <text x="202" y="36">Tubo digestivo: esofago, estomago, intestino y via biliar</text>
        <text x="318" y="80">Esofago</text>
        <text x="228" y="128">Estomago</text>
        <text x="438" y="92">Vesicula / via biliar</text>
        <text x="392" y="237">Intestino delgado</text>
        <text x="139" y="173">Colon</text>
        <text x="132" y="333">Apendice</text>
        ${inflamed ? '<text x="245" y="294">Inflamacion / lesion mucosa</text>' : ''}
        ${complicated ? '<text x="235" y="350">Perforacion, sangrado u obstruccion</text>' : ''}
      </g>
      ${renderSvgCallouts(regions, stage.visual_targets || [])}
    </svg>
  `;
}

function renderEndocrineSvg(regions, stage, severity, label) {
  const active = severity > 20;
  const crisis = severity > 65;
  return `
    <svg class="organ-svg endocrine-svg" viewBox="0 0 620 390" role="img" aria-label="${escapeHTML(label)}">
      <rect width="620" height="390" rx="22" fill="#f8fbff" />
      <ellipse cx="315" cy="344" rx="235" ry="24" fill="#e5edf7" />
      <circle cx="310" cy="68" r="24" fill="#c4b5fd" stroke="#6d28d9" stroke-width="4" />
      <path d="M286 136 C254 105 213 131 221 175 C229 218 281 212 310 184 C340 212 391 218 400 175 C408 131 366 105 334 136 C326 146 294 146 286 136 Z" fill="#f9a8d4" stroke="#be185d" stroke-width="4" />
      <path d="M174 241 C153 221 119 233 117 267 C115 303 156 314 181 292 C204 314 245 303 243 267 C241 233 207 221 186 241 Z" fill="#fdba74" stroke="#c2410c" stroke-width="4" />
      <path d="M427 240 C407 219 371 233 370 267 C369 303 410 314 435 292 C460 314 501 303 499 267 C497 233 461 219 441 240 Z" fill="#fde68a" stroke="#b45309" stroke-width="4" />
      <path d="M310 92 C310 112 310 121 310 132 M293 184 C250 211 211 232 183 251 M328 184 C371 211 407 232 434 251" fill="none" stroke="#64748b" stroke-width="5" stroke-dasharray="9 10" />
      ${active ? '<g opacity="0.76"><circle cx="310" cy="68" r="34" fill="#8b5cf6" opacity="0.22" /><path d="M247 172 C276 188 343 188 373 172" fill="none" stroke="#be185d" stroke-width="8" stroke-linecap="round" opacity="0.45" /><circle cx="183" cy="268" r="34" fill="#f97316" opacity="0.24" /><circle cx="435" cy="268" r="34" fill="#f59e0b" opacity="0.24" /></g>' : ''}
      ${crisis ? '<path class="organ-alert-line" d="M114 322 C201 291 417 291 506 322" fill="none" stroke="#ef4444" stroke-width="7" stroke-linecap="round" opacity="0.78" />' : ''}
      <g class="svg-labels">
        <text x="207" y="38">Sistema endocrino: eje, glandulas y hormonas</text>
        <text x="272" y="64">Hipofisis</text>
        <text x="251" y="129">Tiroides</text>
        <text x="116" y="238">Ovario / gonada</text>
        <text x="390" y="238">Suprarrenal</text>
        ${active ? '<text x="249" y="221">Señal hormonal alterada</text>' : ''}
        ${crisis ? '<text x="234" y="347">Crisis metabolica / sistemica</text>' : ''}
      </g>
      ${renderSvgCallouts(regions, stage.visual_targets || [])}
    </svg>
  `;
}

function renderGenericOrganSvg(organ, regions, stage, severity, label) {
  const affected = severity > 25;
  return `
    <svg class="organ-svg generic-svg" viewBox="0 0 620 390" role="img" aria-label="${escapeHTML(label)}">
      <rect width="620" height="390" rx="22" fill="#f8fbff" />
      <ellipse cx="315" cy="340" rx="225" ry="22" fill="#e5edf7" />
      <path class="${affected ? 'organ-alert' : ''}" d="M312 74 C408 74 477 142 477 218 C477 294 410 322 312 322 C214 322 145 294 145 218 C145 142 216 74 312 74 Z" fill="#bfdbfe" stroke="#1e40af" stroke-width="4" />
      <path d="M178 218 H446 M312 90 V310 M214 126 C264 165 357 165 410 126 M214 310 C264 271 357 271 410 310" fill="none" stroke="#1e40af" stroke-width="4" opacity="0.35" />
      ${affected ? renderSvgDots([[235,158],[318,140],[386,188],[268,245],[354,266]], '#f97316') : ''}
      <g class="svg-labels">
        <text x="218" y="52">${escapeHTML(organ || 'Organo afectado')}</text>
        <text x="188" y="360">Estructuras relacionadas</text>
      </g>
      ${renderSvgCallouts(regions, stage.visual_targets || [])}
    </svg>
  `;
}

function renderSvgDots(points, color) {
  return points.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="${color}" opacity="0.72" />`).join('');
}

function renderSvgCallouts(regions, targets) {
  const labels = [...regions, ...targets].slice(0, 4);
  return `
    <g class="svg-callouts">
      ${labels.map((label, index) => `
        <g transform="translate(${24}, ${248 + index * 28})">
          <rect width="180" height="22" rx="11" fill="white" stroke="#cbd5e1" />
          <circle cx="14" cy="11" r="5" fill="#2563eb" />
          <text x="26" y="15">${escapeHTML(String(label).slice(0, 24))}</text>
        </g>
      `).join('')}
    </g>
  `;
}

function renderVisualAtlas() {
  if (!atlasGrid || atlasGrid.dataset.rendered === 'true') return;

  const atlasItems = [
    {
      organ: 'Cerebro',
      title: 'ACV isquemico',
      regions: ['corteza', 'sustancia blanca', 'ACA', 'ACM', 'ACP', 'tronco'],
      stages: ['Base vascular', 'Isquemia territorial', 'Edema/complicacion']
    },
    {
      organ: 'Higado',
      title: 'Cirrosis hepatica',
      regions: ['parenquima', 'vena porta', 'via biliar', 'bazo', 'ascitis'],
      stages: ['Compensada', 'Hipertension portal', 'Descompensada']
    },
    {
      organ: 'Pulmon',
      title: 'Neumonia / obstruccion respiratoria',
      regions: ['traquea', 'bronquios', 'alveolos', 'pleura', 'vasos'],
      stages: ['Ventilacion base', 'Consolidacion', 'Compromiso extenso']
    },
    {
      organ: 'Corazon',
      title: 'Isquemia miocardica',
      regions: ['auriculas', 'ventriculos', 'coronarias', 'aorta', 'miocardio'],
      stages: ['Perfusion base', 'Isquemia', 'Falla/complicacion']
    },
    {
      organ: 'Pancreas',
      title: 'Diabetes y funcion endocrina',
      regions: ['pancreas', 'islotes beta', 'conducto', 'duodeno', 'vasos'],
      stages: ['Funcion base', 'Estres beta', 'Dano metabolico']
    }
  ];

  const atlasData = atlasItems.map((item) => ({
    item,
    data: {
      organ_focus: {
        organ: item.organ,
        primary_regions: item.regions,
        why_it_matters: item.title
      },
      stages: item.stages.map((title, index) => ({
        title,
        clinical_state: index === 0
          ? 'Vista anatomica base para ubicar estructuras.'
          : index === 1
            ? 'Etapa intermedia: aparece el cambio fisiopatologico dominante.'
            : 'Etapa avanzada: se integran dano, estructuras vecinas y complicaciones.',
        visual_targets: item.regions.slice(0, 4)
      }))
    }
  }));

  atlasGrid.innerHTML = `
    ${renderRenalAtlasOverview()}
    <div class="atlas-section-title">
      <span class="badge">Borradores por sistema</span>
      <h3>Otros modelos visuales en preparacion</h3>
    </div>
    ${atlasData.map(({ item, data }) => {
    return `
      <article class="atlas-card">
        <div>
          <span class="badge">${escapeHTML(item.organ)}</span>
          <h3>${escapeHTML(item.title)}</h3>
        </div>
        ${renderAnatomyVisualizer(data, `ATLAS-${item.organ}`, 1)}
      </article>
    `;
    }).join('')}
  `;

  atlasGrid.querySelectorAll('.atlas-card').forEach((card, index) => {
    bindAnatomyVisualizer(card, atlasData[index].data, `ATLAS-${atlasData[index].item.organ}`);
  });
  bindRenalAtlasInteraction(atlasGrid);

  atlasGrid.dataset.rendered = 'true';
}

function bindRenalAtlasInteraction(root) {
  root.querySelectorAll('.renal-focus-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const viewId = tab.dataset.focusView;
      const focus = tab.closest('.renal-atlas-focus');
      if (!focus || !viewId) return;

      focus.querySelectorAll('.renal-focus-tab').forEach((item) => {
        const active = item === tab;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      focus.querySelectorAll('.renal-focus-panel').forEach((panel) => {
        const active = panel.dataset.focusPanel === viewId;
        panel.classList.toggle('active', active);
        panel.hidden = !active;
      });
    });
  });

  root.querySelectorAll('.interactive-renal-card').forEach((card) => {
    const figure = card.querySelector('.renal-interactive-figure');
    const readout = card.querySelector('.renal-zone-readout');
    const zoomButton = card.querySelector('.renal-zoom-toggle');
    const resetButton = card.querySelector('.renal-reset-zone');
    const markerButton = card.querySelector('.renal-marker-toggle');

    const selectRenalZone = (zoneId) => {
      const button = card.querySelector(`.renal-hotspot[data-zone-id="${zoneId}"]`);
      if (!button) return;

      card.querySelectorAll('.renal-hotspot, .renal-structure-button').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      card.querySelectorAll(`.renal-structure-button[data-zone-target="${zoneId}"]`).forEach((item) => item.classList.add('active'));
      figure.style.setProperty('--zoom-origin', button.dataset.zoom || '50% 50%');
      figure.style.setProperty('--active-x', `${button.style.left || '50%'}`);
      figure.style.setProperty('--active-y', `${button.style.top || '50%'}`);
      figure.dataset.activeTone = button.dataset.zoneTone || 'tissue';
      if (readout) {
        readout.innerHTML = `
          <strong>${escapeHTML(button.dataset.label || '')}</strong>
          <span>${escapeHTML(button.dataset.detail || '')}</span>
        `;
      }
    };

    card.querySelectorAll('.renal-hotspot').forEach((button) => {
      button.addEventListener('click', () => selectRenalZone(button.dataset.zoneId));
    });

    card.querySelectorAll('.renal-structure-button').forEach((button) => {
      button.addEventListener('click', () => selectRenalZone(button.dataset.zoneTarget));
      button.addEventListener('mouseenter', () => selectRenalZone(button.dataset.zoneTarget));
      button.addEventListener('focus', () => selectRenalZone(button.dataset.zoneTarget));
    });

    zoomButton?.addEventListener('click', () => {
      figure.classList.toggle('zoomed');
      zoomButton.textContent = figure.classList.contains('zoomed') ? 'Reducir' : 'Ampliar zona';
    });

    resetButton?.addEventListener('click', () => {
      figure.classList.remove('zoomed');
      if (zoomButton) zoomButton.textContent = 'Ampliar zona';
    });

    markerButton?.addEventListener('click', () => {
      figure.classList.toggle('markers-hidden');
      markerButton.textContent = figure.classList.contains('markers-hidden') ? 'Mostrar puntos' : 'Ocultar puntos';
    });
  });
}

function getRenalLabelPoint(zone, index, total) {
  const rawLabelX = Number.isFinite(zone.labelX) ? zone.labelX : (zone.x < 50 ? 33 : 67);
  const labelX = rawLabelX < 50 ? Math.max(rawLabelX, 33) : Math.min(rawLabelX, 67);
  const fallbackY = 12 + (index * (76 / Math.max(total - 1, 1)));
  const labelY = Number.isFinite(zone.labelY) ? zone.labelY : Math.min(92, Math.max(8, fallbackY));
  return { x: labelX, y: labelY };
}

function getRenalZoneTone(zone) {
  const text = `${zone.id || ''} ${zone.label || ''}`.toLowerCase();
  if (text.includes('arter') || text.includes('aorta') || text.includes('aferente') || text.includes('eferente')) return 'arterial';
  if (text.includes('vena') || text.includes('cava')) return 'venous';
  if (text.includes('ureter') || text.includes('vejiga') || text.includes('uretra') || text.includes('pelvis') || text.includes('caliz') || text.includes('calices') || text.includes('uvj')) return 'urinary';
  if (text.includes('glomer') || text.includes('bowman') || text.includes('tubulo') || text.includes('henle') || text.includes('colector') || text.includes('vasa') || text.includes('capilar')) return 'nephron';
  if (text.includes('capsula') || text.includes('corteza') || text.includes('medula') || text.includes('piramide') || text.includes('papila') || text.includes('columna') || text.includes('sinus') || text.includes('seno') || text.includes('rinon')) return 'tissue';
  return 'relation';
}

function getRenalToneLabel(tone) {
  const labels = {
    tissue: 'Tejido renal',
    urinary: 'Via urinaria',
    arterial: 'Arterial',
    venous: 'Venoso',
    nephron: 'Nefrona',
    relation: 'Relaciones'
  };
  return labels[tone] || 'Estructuras';
}

function renderRenalStructureGroups(view) {
  const toneOrder = ['tissue', 'urinary', 'arterial', 'venous', 'nephron', 'relation'];
  const groups = view.zones.reduce((acc, zone, index) => {
    const tone = getRenalZoneTone(zone);
    if (!acc[tone]) acc[tone] = [];
    acc[tone].push({ zone, index });
    return acc;
  }, {});

  return toneOrder
    .filter((tone) => groups[tone]?.length)
    .map((tone) => `
      <div class="renal-structure-group renal-structure-${tone}">
        <span class="renal-structure-group-title">
          <i aria-hidden="true"></i>${escapeHTML(getRenalToneLabel(tone))}
        </span>
        <div>
          ${groups[tone].map(({ zone, index }) => `
            <button
              class="renal-structure-button renal-structure-${tone} ${index === 0 ? 'active' : ''}"
              type="button"
              data-zone-target="${escapeHTML(zone.id)}"
            >
              <em>${index + 1}</em>
              ${escapeHTML(zone.label)}
            </button>
          `).join('')}
        </div>
      </div>
    `).join('');
}

function getRenalAtlasViews() {
  return [
    {
      id: 'external',
      title: '1. Anatomia externa y relaciones',
      purpose: 'Ubicar rinones derecho e izquierdo, capsula, suprarrenales, grandes vasos, hilio y ureteres.',
      image: 'assets/renal-atlas/renal-external-focused-v2.png',
      targets: ['Rinones', 'Suprarrenales', 'Aorta', 'Vena cava', 'Vasos renales', 'Ureteres'],
      zones: [
        { id: 'left-kidney', label: 'Rinon izquierdo', x: 28, y: 45, labelX: 9, labelY: 18, zoom: '28% 45%', detail: 'Organo retroperitoneal que filtra sangre y regula agua, electrolitos y acido-base.' },
        { id: 'right-kidney', label: 'Rinon derecho', x: 69, y: 43, labelX: 82, labelY: 18, zoom: '69% 43%', detail: 'Suele ubicarse un poco mas bajo por relacion con el higado.' },
        { id: 'adrenal', label: 'Glandulas suprarrenales', x: 69, y: 22, labelX: 82, labelY: 8, zoom: '69% 22%', detail: 'Glandulas endocrinas apoyadas sobre el polo superior renal.' },
        { id: 'capsule', label: 'Capsula renal', x: 73, y: 37, labelX: 84, labelY: 31, zoom: '73% 37%', detail: 'Capa fibrosa externa que protege el rinon y define su contorno.' },
        { id: 'aorta', label: 'Aorta abdominal', x: 56, y: 50, labelX: 82, labelY: 45, zoom: '56% 50%', detail: 'Gran vaso arterial que origina las arterias renales.' },
        { id: 'cava', label: 'Vena cava inferior', x: 49, y: 45, labelX: 10, labelY: 40, zoom: '49% 45%', detail: 'Gran vaso venoso que recibe el retorno de las venas renales.' },
        { id: 'renal-vessels', label: 'Vasos renales', x: 61, y: 38, labelX: 82, labelY: 58, zoom: '61% 38%', detail: 'Arteria y vena atraviesan el hilio hacia el parenquima renal.' },
        { id: 'ureters', label: 'Ureteres proximales', x: 37, y: 66, labelX: 11, labelY: 72, zoom: '37% 66%', detail: 'Conductos que descienden desde la pelvis renal hacia la vejiga.' }
      ]
    },
    {
      id: 'section',
      title: '2. Corte longitudinal',
      purpose: 'Abrir el rinon para leer corteza, medula, piramides, papilas, calices y pelvis renal.',
      image: 'assets/renal-atlas/renal-longitudinal-focused-v2.png',
      targets: ['Capsula', 'Corteza', 'Medula', 'Piramide', 'Papila', 'Calices', 'Pelvis', 'Vasos', 'Ureter'],
      zones: [
        { id: 'capsule', label: 'Capsula', x: 32, y: 17, labelX: 7, labelY: 16, zoom: '32% 17%', detail: 'Borde fibroso externo que rodea el parenquima renal.' },
        { id: 'cortex', label: 'Corteza renal', x: 40, y: 27, labelX: 7, labelY: 27, zoom: '40% 27%', detail: 'Zona externa del parenquima; contiene glomerulos y tubulos corticales.' },
        { id: 'medulla', label: 'Medula renal', x: 47, y: 31, labelX: 7, labelY: 38, zoom: '47% 31%', detail: 'Zona interna organizada en piramides que dirigen orina hacia papilas.' },
        { id: 'pyramid', label: 'Piramide renal', x: 45, y: 46, labelX: 7, labelY: 49, zoom: '45% 46%', detail: 'Cono medular con tubulos y conductos colectores orientados hacia una papila.' },
        { id: 'column', label: 'Columna renal', x: 43, y: 57, labelX: 7, labelY: 60, zoom: '43% 57%', detail: 'Tejido cortical que se introduce entre piramides medulares.' },
        { id: 'papilla', label: 'Papila renal', x: 51, y: 41, labelX: 7, labelY: 72, zoom: '51% 41%', detail: 'Punta de la piramide; entrega orina al caliz menor.' },
        { id: 'minor-calyx', label: 'Caliz menor', x: 54, y: 39, labelX: 82, labelY: 21, zoom: '54% 39%', detail: 'Copa pequena que recibe orina directamente desde una papila.' },
        { id: 'major-calyx', label: 'Caliz mayor', x: 55, y: 53, labelX: 82, labelY: 33, zoom: '55% 53%', detail: 'Union de varios calices menores antes de llegar a la pelvis.' },
        { id: 'pelvis', label: 'Pelvis renal', x: 60, y: 51, labelX: 82, labelY: 46, zoom: '60% 51%', detail: 'Embudo colector central que continua con el ureter.' },
        { id: 'vein', label: 'Vena renal', x: 73, y: 46, labelX: 82, labelY: 58, zoom: '73% 46%', detail: 'Retorno venoso renal hacia la vena cava inferior.' },
        { id: 'artery', label: 'Arteria renal', x: 74, y: 39, labelX: 82, labelY: 70, zoom: '74% 39%', detail: 'Entrada de sangre arterial desde la aorta hacia el parenquima renal.' },
        { id: 'ureter', label: 'Ureter', x: 68, y: 73, labelX: 82, labelY: 84, zoom: '68% 73%', detail: 'Conducto que lleva orina desde la pelvis renal hacia la vejiga.' }
      ]
    },
    {
      id: 'transverse',
      title: '3. Corte del hilio y seno renal',
      purpose: 'Entender la entrada y salida medial: vasos renales, seno, calices, pelvis y ureter.',
      image: 'assets/renal-atlas/renal-transverse-focused-v2.png',
      targets: ['Capsula', 'Corteza', 'Piramides', 'Seno renal', 'Calices', 'Pelvis', 'Arteria', 'Vena', 'Ureter'],
      zones: [
        { id: 'capsule', label: 'Capsula', x: 33.4, y: 10, labelX: 8, labelY: 14, zoom: '33% 10%', detail: 'Borde externo del rinon en el corte abierto.' },
        { id: 'cortex', label: 'Corteza', x: 36.9, y: 25, labelX: 8, labelY: 27, zoom: '37% 25%', detail: 'Anillo periferico del parenquima renal.' },
        { id: 'pyramid', label: 'Piramide medular', x: 32.2, y: 50, labelX: 8, labelY: 40, zoom: '32% 50%', detail: 'Porcion triangular de medula que converge hacia una papila.' },
        { id: 'papilla', label: 'Papila', x: 42.9, y: 52, labelX: 8, labelY: 53, zoom: '43% 52%', detail: 'Punta de la piramide que drena hacia el caliz menor.' },
        { id: 'sinus', label: 'Seno renal', x: 57.1, y: 52, labelX: 8, labelY: 66, zoom: '57% 52%', detail: 'Espacio central con grasa, vasos, calices y pelvis renal.' },
        { id: 'minor-calyx', label: 'Caliz menor', x: 47.6, y: 42, labelX: 82, labelY: 20, zoom: '48% 42%', detail: 'Recibe orina desde una papila renal.' },
        { id: 'major-calyx', label: 'Caliz mayor', x: 54.8, y: 58, labelX: 82, labelY: 34, zoom: '55% 58%', detail: 'Confluencia de calices menores antes de la pelvis renal.' },
        { id: 'pelvis', label: 'Pelvis renal', x: 67.8, y: 54, labelX: 82, labelY: 48, zoom: '68% 54%', detail: 'Embudo amarillo central que recoge orina antes del ureter.' },
        { id: 'artery', label: 'Arteria renal', x: 88, y: 43, labelX: 82, labelY: 62, zoom: '88% 43%', detail: 'Vaso rojo que entra al hilio y se ramifica dentro del rinon.' },
        { id: 'vein', label: 'Vena renal', x: 88, y: 51, labelX: 82, labelY: 74, zoom: '88% 51%', detail: 'Vaso azul que recoge el retorno venoso del rinon.' },
        { id: 'ureter', label: 'Ureter', x: 76.2, y: 82, labelX: 82, labelY: 87, zoom: '76% 82%', detail: 'Salida inferior del sistema colector hacia la vejiga.' }
      ]
    },
    {
      id: 'vascular',
      title: '4. Vasos y sistema colector',
      purpose: 'Seguir entrada arterial, retorno venoso y drenaje de orina desde calices hacia ureter.',
      image: 'assets/renal-atlas/renal-vascular-collector-focused-v2.png',
      targets: ['Arteria renal', 'Ramas segmentarias', 'Arcuatas', 'Vena renal', 'Papilas', 'Calices', 'Pelvis', 'Ureter'],
      zones: [
        { id: 'artery', label: 'Arteria renal', x: 91.3, y: 41, labelX: 82, labelY: 17, zoom: '91% 41%', detail: 'Entrada arterial principal hacia ramas segmentarias.' },
        { id: 'segmental', label: 'Ramas segmentarias', x: 63.3, y: 37, labelX: 82, labelY: 29, zoom: '63% 37%', detail: 'Ramas que distribuyen flujo hacia regiones renales.' },
        { id: 'arcuate', label: 'Vasos arcuatos', x: 33.8, y: 33, labelX: 8, labelY: 18, zoom: '34% 33%', detail: 'Vasos del borde corticomedular que rodean las bases piramidales.' },
        { id: 'interlobar', label: 'Interlobares', x: 49.4, y: 52, labelX: 8, labelY: 31, zoom: '49% 52%', detail: 'Vasos que ascienden entre piramides por las columnas renales.' },
        { id: 'vein', label: 'Vena renal', x: 92.9, y: 49, labelX: 82, labelY: 42, zoom: '93% 49%', detail: 'Retorno venoso intrarrenal hacia vena renal principal.' },
        { id: 'papilla', label: 'Papilas', x: 36.9, y: 57, labelX: 8, labelY: 45, zoom: '37% 57%', detail: 'Puntas de las piramides donde desembocan conductos colectores.' },
        { id: 'minor-calyx', label: 'Calices menores', x: 38.5, y: 45, labelX: 8, labelY: 58, zoom: '39% 45%', detail: 'Colectores pequenos que abrazan cada papila.' },
        { id: 'major-calyx', label: 'Calices mayores', x: 54, y: 55, labelX: 82, labelY: 55, zoom: '54% 55%', detail: 'Confluencias que llevan orina hacia la pelvis renal.' },
        { id: 'pelvis', label: 'Pelvis renal', x: 63.3, y: 57, labelX: 82, labelY: 68, zoom: '63% 57%', detail: 'Embudo central del sistema colector.' },
        { id: 'ureter', label: 'Ureter', x: 71.1, y: 84, labelX: 82, labelY: 84, zoom: '71% 84%', detail: 'Salida urinaria desde pelvis renal hacia vejiga.' }
      ]
    },
    {
      id: 'nephron',
      title: '5. Nefrona y filtracion',
      purpose: 'Bajar a la unidad funcional: glomerulo, tubulos, asa de Henle, capilares y colector.',
      image: 'assets/renal-atlas/renal-nephron-focused-v2.png',
      targets: ['Aferente', 'Glomerulo', 'Bowman', 'Proximal', 'Henle', 'Distal', 'Capilares', 'Colector'],
      zones: [
        { id: 'afferent', label: 'Arteriola aferente', x: 12, y: 18, labelX: 8, labelY: 12, zoom: '12% 18%', detail: 'Lleva sangre hacia el glomerulo para iniciar la filtracion.' },
        { id: 'glomerulus', label: 'Glomerulo', x: 22, y: 28, labelX: 8, labelY: 25, zoom: '22% 28%', detail: 'Ovillo capilar donde inicia la filtracion del plasma.' },
        { id: 'bowman', label: 'Capsula de Bowman', x: 18, y: 29, labelX: 8, labelY: 38, zoom: '18% 29%', detail: 'Capsula que recibe el ultrafiltrado glomerular.' },
        { id: 'efferent', label: 'Arteriola eferente', x: 27, y: 19, labelX: 8, labelY: 51, zoom: '27% 19%', detail: 'Sale del glomerulo y alimenta capilares peritubulares.' },
        { id: 'proximal', label: 'Tubulo proximal', x: 43, y: 42, labelX: 8, labelY: 64, zoom: '43% 42%', detail: 'Segmento de reabsorcion masiva de agua, sodio, glucosa y solutos.' },
        { id: 'henle', label: 'Asa de Henle', x: 49, y: 82, labelX: 8, labelY: 78, zoom: '49% 82%', detail: 'Crea gradiente medular para concentrar la orina.' },
        { id: 'distal', label: 'Tubulo distal', x: 72, y: 35, labelX: 82, labelY: 24, zoom: '72% 35%', detail: 'Ajusta electrolitos y se conecta con el colector.' },
        { id: 'capillaries', label: 'Capilares peritubulares', x: 64, y: 50, labelX: 82, labelY: 40, zoom: '64% 50%', detail: 'Red vascular que permite intercambio con tubulos.' },
        { id: 'vasa-recta', label: 'Vasa recta', x: 58, y: 70, labelX: 82, labelY: 57, zoom: '58% 70%', detail: 'Vasos rectos que ayudan a conservar el gradiente medular.' },
        { id: 'collector', label: 'Conducto colector', x: 82, y: 71, labelX: 82, labelY: 76, zoom: '82% 71%', detail: 'Ajusta agua y electrolitos antes de entregar orina final.' }
      ]
    },
    {
      id: 'urinary',
      title: '6. Via urinaria completa',
      purpose: 'Seguir el recorrido de la orina desde pelvis renal hasta vejiga y uretra.',
      image: 'assets/renal-atlas/renal-urinary-tract-focused-v3.png',
      targets: ['Rinones', 'Pelvis renal', 'Ureteres', 'Union ureterovesical', 'Vejiga', 'Uretra'],
      zones: [
        { id: 'left-kidney', label: 'Rinon izquierdo', x: 20, y: 16, zoom: '20% 16%', detail: 'Organo retroperitoneal con corteza, medula y sistema colector; filtra sangre, regula volumen y origina la orina.' },
        { id: 'right-kidney', label: 'Rinon derecho', x: 80, y: 16, zoom: '80% 16%', detail: 'Par renal contralateral; su hilio medial conecta vasos renales y pelvis renal.' },
        { id: 'pelvis', label: 'Pelvis renal', x: 34, y: 22, zoom: '34% 22%', detail: 'Embudo colector intrarrenal que recibe calices mayores y se continua con el ureter.' },
        { id: 'left-ureter', label: 'Ureter izquierdo', x: 33, y: 50, zoom: '33% 50%', detail: 'Tubo muscular retroperitoneal con peristalsis; conduce orina desde pelvis renal hasta vejiga.' },
        { id: 'right-ureter', label: 'Ureter derecho', x: 67, y: 50, zoom: '67% 50%', detail: 'Ureter contralateral; sus estrechamientos fisiologicos son sitios frecuentes de impactacion de calculos.' },
        { id: 'uvj', label: 'Union ureterovesical', x: 67, y: 74, zoom: '67% 74%', detail: 'Entrada oblicua del ureter en la vejiga; ayuda a limitar el reflujo vesicoureteral.' },
        { id: 'bladder', label: 'Vejiga', x: 50, y: 72, zoom: '50% 72%', detail: 'Reservorio muscular revestido por urotelio; almacena orina y se contrae durante la miccion.' },
        { id: 'urethra', label: 'Uretra', x: 50, y: 90, zoom: '50% 90%', detail: 'Conducto de salida vesical; su relacion con esfinteres determina continencia y vaciamiento.' }
      ]
    }
  ];
}

function renderRenalAtlasOverview() {
  const views = getRenalAtlasViews();
  const baseStage = {
    title: 'Anatomia renal normal',
    clinical_state: 'Atlas general del rinon: estructura, cortes, flujos y unidad funcional sin marcar enfermedad.',
    visual_targets: []
  };
  const regions = ['capsula renal', 'corteza', 'medula', 'seno renal', 'pelvis renal', 'ureter', 'nefrona'];

  return `
    <section class="renal-atlas-overview">
      <div class="renal-atlas-header">
        <div>
          <span class="badge">Atlas renal general</span>
          <h3>Riñon: vistas base antes de estudiar enfermedad</h3>
          <p>Estas laminas separan anatomia normal, cortes, flujos y nefrona. La enfermedad se aplica despues, como una capa encima del atlas.</p>
        </div>
        <div class="renal-atlas-principles">
          <span>Anatomia base</span>
          <span>Cortes</span>
          <span>Flujos</span>
          <span>Unidad funcional</span>
        </div>
      </div>
      ${renderRenalAtlasFocus(views, regions, baseStage)}
      <div class="renal-atlas-subhead">
        <h4>Laminas de apoyo</h4>
        <p>Las mismas vistas quedan abiertas abajo para comparar estructuras sin cambiar de pestaña.</p>
      </div>
      <div class="renal-view-grid">
        ${views.map((view) => renderRenalAtlasViewCard(view, regions, baseStage)).join('')}
      </div>
    </section>
  `;
}

function renderRenalAtlasFocus(views, regions, baseStage) {
  return `
    <div class="renal-atlas-focus">
      <div class="renal-focus-tabs" role="tablist" aria-label="Vistas principales del atlas renal">
        ${views.map((view, index) => `
          <button
            class="renal-focus-tab ${index === 0 ? 'active' : ''}"
            type="button"
            role="tab"
            aria-selected="${index === 0 ? 'true' : 'false'}"
            data-focus-view="${escapeHTML(view.id)}"
          >
            ${escapeHTML(view.title.replace(/^\d+\.\s*/, ''))}
          </button>
        `).join('')}
      </div>
      <div class="renal-focus-panels">
        ${views.map((view, index) => `
          <div class="renal-focus-panel ${index === 0 ? 'active' : ''}" data-focus-panel="${escapeHTML(view.id)}" ${index === 0 ? '' : 'hidden'}>
            ${renderRenalAtlasViewCard(view, regions, baseStage, true)}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderRenalAtlasViewCard(view, regions, baseStage) {
  const initialZone = view.zones[0];
  const defaultHideMarkers = view.zones.length > 8;
  return `
    <article class="renal-view-card interactive-renal-card" data-view-id="${escapeHTML(view.id)}">
      <div
        class="renal-view-figure renal-interactive-figure ${defaultHideMarkers ? 'markers-hidden' : ''}"
        style="--zoom-origin:${escapeHTML(initialZone.zoom)}; --active-x:${initialZone.x}%; --active-y:${initialZone.y}%;"
        data-active-tone="${escapeHTML(getRenalZoneTone(initialZone))}"
      >
        <img src="${escapeHTML(view.image)}" alt="${escapeHTML(view.title)}" />
        <div class="renal-hotspot-layer" aria-label="Zonas seleccionables de ${escapeHTML(view.title)}">
          <span class="renal-focus-target" aria-hidden="true"></span>
          ${view.zones.map((zone, index) => `
            <button
              class="renal-hotspot renal-hotspot-${getRenalZoneTone(zone)} ${index === 0 ? 'active' : ''}"
              type="button"
              style="left:${zone.x}%; top:${zone.y}%;"
              data-zone-id="${escapeHTML(zone.id)}"
              data-zone-tone="${escapeHTML(getRenalZoneTone(zone))}"
              data-label="${escapeHTML(zone.label)}"
              data-detail="${escapeHTML(zone.detail)}"
              data-zoom="${escapeHTML(zone.zoom)}"
              aria-label="${escapeHTML(zone.label)}"
            ></button>
          `).join('')}
        </div>
      </div>
      <div class="renal-view-copy">
        <h4>${escapeHTML(view.title)}</h4>
        <p>${escapeHTML(view.purpose)}</p>
        <div class="renal-zone-readout" aria-live="polite">
          <strong>${escapeHTML(initialZone.label)}</strong>
          <span>${escapeHTML(initialZone.detail)}</span>
        </div>
        <div class="renal-view-actions">
          <button class="secondary-button renal-zoom-toggle" type="button">Ampliar zona</button>
          <button class="secondary-button renal-reset-zone" type="button">Vista completa</button>
          <button class="secondary-button renal-marker-toggle" type="button">${defaultHideMarkers ? 'Mostrar puntos' : 'Ocultar puntos'}</button>
        </div>
        <div class="renal-structure-list" aria-label="Estructuras de ${escapeHTML(view.title)}">
          ${renderRenalStructureGroups(view)}
        </div>
      </div>
    </article>
  `;
}

async function loadClinicalBridgePanel(disease) {
  const panel = document.getElementById('clinicalBridgePanel');
  if (!panel) return;

  try {
    const cases = await fetchCases(disease.disease_code);
    if (!cases.length) {
      panel.innerHTML = `
        <div class="bridge-empty">
          <span class="badge">Caso clinico</span>
          <h3>Sin caso asociado todavia</h3>
          <p>Esta ficha queda como teoria base. Cuando se agregue un caso, aqui se vera como cambia la enfermedad en un paciente real.</p>
        </div>
      `;
      return;
    }

    const caseData = {
      ...cases[0],
      disease_name: disease.name,
      system: disease.system,
      organ: disease.organ
    };
    const diagnosticImages = await fetchCaseDiagnosticImages(caseData.case_code);

    panel.innerHTML = renderClinicalBridge(disease, caseData, diagnosticImages);
    panel.querySelector('[data-open-case]')?.addEventListener('click', () => openCaseModal(caseData));
    panel.querySelector('[data-solve-case]')?.addEventListener('click', () => loadQuiz(caseData.case_code));
  } catch (error) {
    panel.innerHTML = '';
  }
}

function renderClinicalBridge(disease, caseData, diagnosticImages) {
  const imagePreview = diagnosticImages[0]?.local_path
    ? `<img src="${escapeHTML(diagnosticImages[0].local_path)}" alt="${escapeHTML(diagnosticImages[0].title)}" onerror="handleImageError(this)" />`
    : `<img src="${escapeHTML(getImageForDisease(disease))}" alt="Imagen de ${escapeHTML(disease.name)}" onerror="handleImageError(this)" />`;

  return `
    <div class="bridge-heading">
      <div>
        <span class="badge">Teoria + paciente</span>
        <h3>Como se comporta en un caso clinico</h3>
        <p>Compara lo que dice la ficha con los datos reales del paciente y practica el razonamiento.</p>
      </div>
      <button type="button" class="secondary-button" data-open-case>Abrir caso completo</button>
    </div>
    <div class="bridge-layout">
      <article class="case-snapshot">
        ${imagePreview}
        <div>
          <strong>${escapeHTML(caseData.case_code)} · ${escapeHTML(caseData.age)} años · ${escapeHTML(caseData.sex)}</strong>
          <p>${escapeHTML(caseData.reason)}</p>
          <button type="button" data-solve-case>Resolver preguntas</button>
        </div>
      </article>
      <div class="comparison-grid">
        ${renderComparisonBlock('En teoria', disease.symptoms, 'Sintomas esperados')}
        ${renderComparisonBlock('En el paciente', caseData.symptoms, 'Sintomas encontrados')}
        ${renderComparisonBlock('Criterios y pruebas', disease.diagnostic_tests, 'Que se suele pedir')}
        ${renderComparisonBlock('Evidencia del caso', caseData.lab_results, 'Que datos trae este paciente')}
      </div>
    </div>
    <div class="case-reasoning">
      <div>
        <h4>Diagnostico probable</h4>
        <p>${escapeHTML(caseData.probable_diagnosis)}</p>
      </div>
      <div>
        <h4>Diagnostico final</h4>
        <p>${escapeHTML(caseData.final_diagnosis)}</p>
      </div>
      <div>
        <h4>Clave didactica</h4>
        <p>${escapeHTML(caseData.teaching_note)}</p>
      </div>
    </div>
  `;
}

function renderComparisonBlock(title, content, eyebrow) {
  return `
    <section class="comparison-block">
      <span>${escapeHTML(eyebrow)}</span>
      <h4>${escapeHTML(title)}</h4>
      <p>${escapeHTML(content || 'Pendiente de ampliar.')}</p>
    </section>
  `;
}

function openDiseasePage(diseaseCode) {
  window.location.hash = `enfermedad/${encodeURIComponent(diseaseCode)}`;
}

function closeDiseasePage() {
  selectedDiseaseCode = null;
  diseaseDetailPanel.hidden = true;
  diseaseRepositoryPanel.hidden = false;
  diseaseDetail.innerHTML = '<p class="hint">Selecciona una enfermedad para abrir su ficha.</p>';
  renderList();

  if (window.location.hash.startsWith('#enfermedad/')) {
    history.pushState('', document.title, window.location.pathname + window.location.search);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderDiseaseRoute() {
  const hash = decodeURIComponent(window.location.hash || '');
  if (hash === '#atlas/renal') {
    return;
  }

  if (!hash.startsWith('#enfermedad/')) {
    diseaseDetailPanel.hidden = true;
    diseaseRepositoryPanel.hidden = false;
    return;
  }

  if (diseaseData.length === 0) {
    return;
  }

  const diseaseCode = hash.replace('#enfermedad/', '');
  const disease = diseaseData.find((item) => item.disease_code === diseaseCode);

  if (!disease) {
    closeDiseasePage();
    return;
  }

  selectedDiseaseCode = disease.disease_code;
  renderDetail(disease);
  renderList();
}

function getDiseaseData() {
  return diseaseData;
}
