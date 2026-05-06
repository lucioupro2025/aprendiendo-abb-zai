export interface SlideData {
  id: number;
  title: string;
  section: string;
  sectionColor: string;
  type: 'content' | 'quiz' | 'interactive' | 'code' | 'cover' | 'toc';
}

export const slides: SlideData[] = [
  // Cover
  { id: 0, title: 'Robot ABB IRB1100', section: '', sectionColor: '', type: 'cover' },

  // Table of Contents
  { id: 1, title: 'Contenido', section: '', sectionColor: '', type: 'toc' },

  // Section 1: Movimientos
  { id: 2, title: 'Modos de Movimiento', section: 'Movimientos', sectionColor: 'from-orange-500 to-red-500', type: 'content' },
  { id: 3, title: 'Movimiento de Ejes (Joint)', section: 'Movimientos', sectionColor: 'from-orange-500 to-red-500', type: 'interactive' },
  { id: 4, title: 'Movimiento Lineal', section: 'Movimientos', sectionColor: 'from-orange-500 to-red-500', type: 'interactive' },
  { id: 5, title: 'Movimiento de Reorientacion', section: 'Movimientos', sectionColor: 'from-orange-500 to-red-500', type: 'interactive' },
  { id: 6, title: 'Quiz: Movimientos', section: 'Movimientos', sectionColor: 'from-orange-500 to-red-500', type: 'quiz' },

  // Section 2: Sistemas de Coordenadas
  { id: 7, title: 'Sistemas de Coordenadas', section: 'Coordenadas', sectionColor: 'from-emerald-500 to-teal-500', type: 'content' },
  { id: 8, title: 'Sistema Base', section: 'Coordenadas', sectionColor: 'from-emerald-500 to-teal-500', type: 'content' },
  { id: 9, title: 'Sistema Mundo', section: 'Coordenadas', sectionColor: 'from-emerald-500 to-teal-500', type: 'content' },
  { id: 10, title: 'Sistema Objeto', section: 'Coordenadas', sectionColor: 'from-emerald-500 to-teal-500', type: 'interactive' },
  { id: 11, title: 'Sistema Herramienta', section: 'Coordenadas', sectionColor: 'from-emerald-500 to-teal-500', type: 'content' },
  { id: 12, title: 'Quiz: Coordenadas', section: 'Coordenadas', sectionColor: 'from-emerald-500 to-teal-500', type: 'quiz' },

  // Section 3: Programacion RAPID
  { id: 13, title: 'Instrucciones MoveJ y MoveL', section: 'RAPID', sectionColor: 'from-violet-500 to-purple-500', type: 'code' },
  { id: 14, title: 'Parametros de Movimiento', section: 'RAPID', sectionColor: 'from-violet-500 to-purple-500', type: 'interactive' },
  { id: 15, title: 'Completa el Codigo', section: 'RAPID', sectionColor: 'from-violet-500 to-purple-500', type: 'code' },

  // Section 4: Objetos de Trabajo
  { id: 16, title: 'Objetos de Trabajo (WObj)', section: 'Work Objects', sectionColor: 'from-sky-500 to-cyan-500', type: 'content' },
  { id: 17, title: 'Creando un WorkObject', section: 'Work Objects', sectionColor: 'from-sky-500 to-cyan-500', type: 'code' },
  { id: 18, title: 'Quiz: Work Objects', section: 'Work Objects', sectionColor: 'from-sky-500 to-cyan-500', type: 'quiz' },

  // Section 5: Trayectorias
  { id: 19, title: 'Creando Trayectorias', section: 'Trayectorias', sectionColor: 'from-amber-500 to-yellow-500', type: 'content' },
  { id: 20, title: 'Programa con Trayectorias', section: 'Trayectorias', sectionColor: 'from-amber-500 to-yellow-500', type: 'code' },

  // Section 6: Calibracion
  { id: 21, title: 'Calibracion: Contador de Revoluciones', section: 'Calibracion', sectionColor: 'from-rose-500 to-pink-500', type: 'content' },
  { id: 22, title: 'Pasos de Calibracion', section: 'Calibracion', sectionColor: 'from-rose-500 to-pink-500', type: 'interactive' },
  { id: 23, title: 'Quiz: Calibracion', section: 'Calibracion', sectionColor: 'from-rose-500 to-pink-500', type: 'quiz' },

  // Section 7: Figuras Geometricas
  { id: 24, title: 'Centro del Triangulo Equilatero', section: 'Figuras', sectionColor: 'from-lime-500 to-green-500', type: 'interactive' },
  { id: 25, title: 'Dibujando con el Robot', section: 'Figuras', sectionColor: 'from-lime-500 to-green-500', type: 'code' },

  // Section 8: Repaso
  { id: 26, title: 'Resumen General', section: 'Repaso', sectionColor: 'from-slate-500 to-zinc-500', type: 'content' },
  { id: 27, title: 'Quiz Final', section: 'Repaso', sectionColor: 'from-slate-500 to-zinc-500', type: 'quiz' },
];

export const sections = [
  { name: 'Movimientos', color: 'from-orange-500 to-red-500', startId: 2 },
  { name: 'Coordenadas', color: 'from-emerald-500 to-teal-500', startId: 7 },
  { name: 'RAPID', color: 'from-violet-500 to-purple-500', startId: 13 },
  { name: 'Work Objects', color: 'from-sky-500 to-cyan-500', startId: 16 },
  { name: 'Trayectorias', color: 'from-amber-500 to-yellow-500', startId: 19 },
  { name: 'Calibracion', color: 'from-rose-500 to-pink-500', startId: 21 },
  { name: 'Figuras', color: 'from-lime-500 to-green-500', startId: 24 },
  { name: 'Repaso', color: 'from-slate-500 to-zinc-500', startId: 26 },
];

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface CodeExercise {
  id: string;
  title: string;
  description: string;
  codeTemplate: string;
  blanks: { id: string; answer: string; options?: string[] }[];
  hint?: string;
}

// ============================================================
// QUIZ DATA
// ============================================================

export const quizMovimientos: QuizQuestion[] = [
  {
    id: 'mov1',
    question: 'Cual es el tipo de movimiento que mueve cada articulacion de manera independiente?',
    options: ['Movimiento Lineal', 'Movimiento de Ejes (Joint)', 'Movimiento de Reorientacion', 'Movimiento Circular'],
    correct: 1,
    explanation: 'El movimiento de ejes (Joint) permite mover cada articulacion del manipulador de manera independiente.',
  },
  {
    id: 'mov2',
    question: 'Que tipo de movimiento se usa cuando necesitamos reorientar la herramienta manteniendo su posicion?',
    options: ['Joint', 'Lineal', 'Reorientacion', 'Circular'],
    correct: 2,
    explanation: 'El movimiento de reorientacion permite girar la herramienta alrededor de un eje manteniendo la posicion.',
  },
  {
    id: 'mov3',
    question: 'En que modo de movimiento se utiliza el robot cuando el movimiento lineal esta bloqueado?',
    options: ['Lineal', 'Reorientacion', 'Circular', 'Ejes (Joint)'],
    correct: 3,
    explanation: 'El movimiento de ejes se utiliza cuando el movimiento lineal se encuentra bloqueado y para realizar calibraciones.',
  },
  {
    id: 'mov4',
    question: 'Cual es la ventaja principal del movimiento lineal?',
    options: ['Es mas rapido', 'Mueve el robot en linea recta entre puntos', 'Gira el robot 360 grados', 'Apaga el robot'],
    correct: 1,
    explanation: 'El movimiento lineal es muy util cuando debemos mover el robot de un punto a otro en linea recta.',
  },
  {
    id: 'mov5',
    question: 'Antes de operar con cualquier manipulador industrial, en que modo debemos asegurarnos de que este?',
    options: ['Modo automatico', 'Modo manual', 'Modo de calibracion', 'Modo de seguridad'],
    correct: 1,
    explanation: 'Siempre debemos asegurarnos de que el robot este en modo manual antes de operarlo.',
  },
];

export const quizCoordenadas: QuizQuestion[] = [
  {
    id: 'coord1',
    question: 'En el sistema de coordenadas base, hacia donde apunta el eje X?',
    options: ['Hacia la izquierda del robot', 'Hacia arriba', 'Hacia la direccion de la herramienta', 'Hacia atras'],
    correct: 2,
    explanation: 'En el sistema base, el eje X apunta hacia la direccion de la herramienta del robot.',
  },
  {
    id: 'coord2',
    question: 'Que sistema de coordenadas se utiliza para definir posiciones absolutas en el espacio 3D?',
    options: ['Sistema Base', 'Sistema Herramienta', 'Sistema Mundo', 'Sistema Objeto'],
    correct: 2,
    explanation: 'El sistema mundo (world) define posiciones y orientaciones absolutas en el espacio tridimensional.',
  },
  {
    id: 'coord3',
    question: 'Cual sistema de coordenadas es especialmente util cuando el objeto puede moverse o cambiar su orientacion?',
    options: ['Sistema Base', 'Sistema Mundo', 'Sistema Herramienta', 'Sistema Objeto'],
    correct: 3,
    explanation: 'El sistema objeto permite especificar posiciones en relacion al propio sistema de coordenadas del objeto.',
  },
  {
    id: 'coord4',
    question: 'El sistema de coordenadas herramienta se define en relation a:',
    options: ['La base del robot', 'El centro de la celda', 'La herramienta o extremo del robot', 'El objeto de trabajo'],
    correct: 2,
    explanation: 'El sistema herramienta esta vinculado directamente con la herramienta o extremo del robot.',
  },
  {
    id: 'coord5',
    question: 'En el sistema base, hacia donde apunta el eje Z?',
    options: ['Hacia adelante', 'Hacia la izquierda', 'Hacia arriba', 'Hacia abajo'],
    correct: 2,
    explanation: 'En el sistema base, el eje Z apunta hacia arriba.',
  },
];

export const quizWorkObjects: QuizQuestion[] = [
  {
    id: 'wobj1',
    question: 'Que ventaja tiene usar un objeto de trabajo (wobj) personalizado en vez de wobj0?',
    options: ['El robot se mueve mas rapido', 'Los puntos se mueven con el objeto si se reubica', 'No tiene ventaja', 'Permite apagar el robot'],
    correct: 1,
    explanation: 'Al conectar los puntos a un objeto de trabajo y este a la mesa, si movemos la mesa los puntos se mueven con ella.',
  },
  {
    id: 'wobj2',
    question: 'Que parametro en las instrucciones MoveJ y MoveL indica el objeto de trabajo?',
    options: ['\\Tool', '\\Speed', '\\WObj', '\\Zone'],
    correct: 2,
    explanation: 'El parametro \\WObj de las instrucciones de movimiento indica el objeto de trabajo a utilizar.',
  },
  {
    id: 'wobj3',
    question: 'Cual es el objeto de trabajo por defecto en robots ABB?',
    options: ['wobj_base', 'wobj0', 'wobj_mundo', 'wobj_default'],
    correct: 1,
    explanation: 'wobj0 es el marco por defecto que coincide con la base del manipulador y no puede ser modificado.',
  },
];

export const quizCalibracion: QuizQuestion[] = [
  {
    id: 'cal1',
    question: 'Para que sirve la pila/bateria en el interior del robot?',
    options: ['Alimentar el motor', 'Mantener viva la RAM que almacena las vueltas del motor', 'Encender el teach pendant', 'Alimentar los sensores'],
    correct: 1,
    explanation: 'La funcion de la pila es mantener "viva" la memoria RAM para no perder la cantidad de vueltas que dio cada eje del motor.',
  },
  {
    id: 'cal2',
    question: 'Que es lo que los encoders absolutos NO pueden determinar por si solos?',
    options: ['La posicion angular dentro de 360 grados', 'Cuantas vueltas dio el motor', 'La velocidad del eje', 'La temperatura'],
    correct: 1,
    explanation: 'El encoder conoce la posicion angular dentro de la vuelta, pero no sabe cuantas vueltas dio el motor.',
  },
  {
    id: 'cal3',
    question: 'Cual es el primer paso para calibrar el contador de revoluciones?',
    options: ['Apagar el robot', 'Llevar las articulaciones a cero (marcas fisicas)', 'Cambiar la bateria', 'Reiniciar el controlador'],
    correct: 1,
    explanation: 'Antes de tocar cualquier cosa, debemos mover manualmente el robot en modo joint y ubicar cada eje donde coincidan las marcas fisicas.',
  },
  {
    id: 'cal4',
    question: 'Por que los motores de los robots necesitan un reductor de velocidad?',
    options: ['Para ir mas rapido', 'Para otorgar gran torque a la articulacion', 'Para ahorrar energia', 'Para reducir ruido'],
    correct: 1,
    explanation: 'El reductor de velocidad otorga gran torque a la articulacion, pero hace que el motor gire muchas vueltas por cada movimiento.',
  },
];

export const quizFinal: QuizQuestion[] = [
  {
    id: 'final1',
    question: 'Que instruccion RAPID se usa para movimiento lineal?',
    options: ['MoveJ', 'MoveL', 'MoveC', 'MoveA'],
    correct: 1,
    explanation: 'MoveL realiza un movimiento lineal entre dos puntos.',
  },
  {
    id: 'final2',
    question: 'Que significa el parametro zona con valor "fine"?',
    options: ['Zona de 50mm', 'El robot se detiene exactamente en el punto', 'Zona de 10mm', 'Movimiento circular'],
    correct: 1,
    explanation: 'Fine significa que el robot se detiene exactamente en el punto (punto de paro).',
  },
  {
    id: 'final3',
    question: 'Que valor tiene la tangente de 30 grados?',
    options: ['1/sqrt(3)', 'sqrt(3)/3', '1/sqrt(2)', 'sqrt(3)'],
    correct: 0,
    explanation: 'La tangente de 30 grados es 1/sqrt(3) = sqrt(3)/3, lo cual equivale aproximadamente a 0.577.',
  },
  {
    id: 'final4',
    question: 'Cual es la instruccion RAPID para esperar un tiempo determinado?',
    options: ['Delay', 'WaitTime', 'Sleep', 'Pause'],
    correct: 1,
    explanation: 'WaitTime es la instruccion RAPID para hacer una pausa en la ejecucion del programa.',
  },
  {
    id: 'final5',
    question: 'Que funcion RAPID permite "desfasar" un punto respecto a una superficie?',
    options: ['Offset', 'RelTool', 'Offs', 'Translate'],
    correct: 2,
    explanation: 'La funcion Offs permite desfasar un robtarget una distancia determinada en las coordenadas x, y, z.',
  },
  {
    id: 'final6',
    question: 'En un triangulo equilatero de lado L, cual es la altura h?',
    options: ['L', 'L * sqrt(3)/2', 'L / 2', 'L * sqrt(2)/2'],
    correct: 1,
    explanation: 'En un triangulo equilatero, la altura h = L * sin(60) = L * sqrt(3)/2.',
  },
];

// ============================================================
// CODE EXERCISES
// ============================================================

export const codeExercises: CodeExercise[] = [
  {
    id: 'code1',
    title: 'Movimiento basico entre puntos',
    description: 'Completa el codigo para que el robot vaya de Home a P1 con movimiento joint y luego a P2 con movimiento lineal.',
    codeTemplate: 'MoveJ __BLANK1__, v200, z10, tool1;\nMoveL __BLANK2__, v200, fine, tool1;',
    blanks: [
      { id: 'BLANK1', answer: 'Home', options: ['Home', 'P1', 'P2', 'P3'] },
      { id: 'BLANK2', answer: 'P2', options: ['Home', 'P1', 'P2', 'P3'] },
    ],
    hint: 'La primera instruccion mueve a Home con MoveJ, la segunda a P2 con MoveL.',
  },
  {
    id: 'code2',
    title: 'Parametros de velocidad y zona',
    description: 'Completa el codigo para un movimiento rapido a P1 (zona 20) y luego un movimiento preciso a P2.',
    codeTemplate: 'MoveJ P1, __BLANK1__, __BLANK2__, tool1;\nMoveL P2, v50, __BLANK3__, tool1;',
    blanks: [
      { id: 'BLANK1', answer: 'v500', options: ['v50', 'v200', 'v500', 'v1000'] },
      { id: 'BLANK2', answer: 'z20', options: ['fine', 'z5', 'z10', 'z20'] },
      { id: 'BLANK3', answer: 'fine', options: ['fine', 'z5', 'z10', 'z20'] },
    ],
    hint: 'Para movimiento rapido usa v500 con zona z20. Para posicion precisa usa fine.',
  },
  {
    id: 'code3',
    title: 'Programa con trayectoria y espera',
    description: 'Completa el programa que ejecuta una trayectoria, espera 5 segundos y vuelve al inicio.',
    codeTemplate: 'PROC main()\n  Trayecto_Mesa;\n  MoveJ __BLANK1__, v200, fine, tool1;\n  __BLANK2__ 5;\n  Trayecto_Tuercas;\n  MoveJ Home, v200, fine, tool1;\nENDPROC',
    blanks: [
      { id: 'BLANK1', answer: 'Home', options: ['Home', 'P1', 'P2', 'Start'] },
      { id: 'BLANK2', answer: 'WaitTime', options: ['WaitTime', 'Delay', 'Sleep', 'Pause'] },
    ],
    hint: 'Para esperar 5 segundos en RAPID se usa la instruccion WaitTime.',
  },
  {
    id: 'code4',
    title: 'Movimiento con WorkObject',
    description: 'Completa el codigo para mover el robot usando un objeto de trabajo personalizado.',
    codeTemplate: 'MoveJ P1, v200, z10, tool1 \\WObj:=__BLANK1__;\nMoveL P2, v200, fine, tool1 \\WObj:=__BLANK2__;',
    blanks: [
      { id: 'BLANK1', answer: 'wobj_mesa', options: ['wobj0', 'wobj_mesa', 'wobj_base', 'tool1'] },
      { id: 'BLANK2', answer: 'wobj_mesa', options: ['wobj0', 'wobj_mesa', 'wobj_base', 'tool1'] },
    ],
    hint: 'El parametro \\WObj permite especificar el objeto de trabajo personalizado.',
  },
  {
    id: 'code5',
    title: 'Desfase con Offs',
    description: 'Completa el codigo para moverse a un punto desfasado 20mm sobre la superficie de la mesa.',
    codeTemplate: 'MoveJ __BLANK1__, v100, fine, tool1;\n\n! P1_desfasado esta 20mm sobre P1\nMoveL Offs(P1, __BLANK2__, __BLANK3__, __BLANK4__), v50, fine, tool1 \\WObj:=wobj_mesa;',
    blanks: [
      { id: 'BLANK1', answer: 'Home', options: ['Home', 'P1', 'P2', 'Offs'] },
      { id: 'BLANK2', answer: '0', options: ['0', '20', '10', '5'] },
      { id: 'BLANK3', answer: '0', options: ['0', '20', '10', '5'] },
      { id: 'BLANK4', answer: '20', options: ['0', '20', '10', '5'] },
    ],
    hint: 'Offs(punto, x, y, z) desfasa el punto. Para 20mm sobre la superficie, desfasamos 20 en Z.',
  },
  {
    id: 'code6',
    title: 'Estructura de un programa RAPID',
    description: 'Completa la estructura basica de un programa en RAPID.',
    codeTemplate: 'MODULE MainModule\n  __BLANK1__ main()\n    MoveJ Home, v200, fine, tool1;\n    MoveL P1, v200, z10, tool1;\n    __BLANK2__ 3;\n    MoveJ Home, v200, fine, tool1;\n  __BLANK3__\n__BLANK4__',
    blanks: [
      { id: 'BLANK1', answer: 'PROC', options: ['PROC', 'FUNC', 'TASK', 'VAR'] },
      { id: 'BLANK2', answer: 'WaitTime', options: ['WaitTime', 'Delay', 'Sleep', 'Wait'] },
      { id: 'BLANK3', answer: 'ENDPROC', options: ['ENDPROC', 'END', 'RETURN', 'ENDFUNC'] },
      { id: 'BLANK4', answer: 'ENDMODULE', options: ['ENDMODULE', 'END', 'MODULE', 'ENDPROC'] },
    ],
    hint: 'Un programa RAPID tiene la estructura: MODULE > PROC ... ENDPROC > ENDMODULE.',
  },
];

// ============================================================
// HELPER: Get quiz data by slide id
// ============================================================

export function getQuizForSlide(slideId: number): QuizQuestion[] | null {
  switch (slideId) {
    case 6:
      return quizMovimientos;
    case 12:
      return quizCoordenadas;
    case 18:
      return quizWorkObjects;
    case 23:
      return quizCalibracion;
    case 27:
      return quizFinal;
    default:
      return null;
  }
}

// ============================================================
// HELPER: Get code exercise by slide id
// ============================================================

export function getCodeForSlide(slideId: number): CodeExercise | null {
  switch (slideId) {
    case 13:
    case 15:
    case 17:
    case 20:
    case 25:
      return codeExercises[Math.floor((slideId - 13) / 2) % codeExercises.length];
    default:
      return null;
  }
}

// ============================================================
// HELPER: Get section slides
// ============================================================

export function getSectionSlides(sectionName: string): SlideData[] {
  return slides.filter((s) => s.section === sectionName);
}
