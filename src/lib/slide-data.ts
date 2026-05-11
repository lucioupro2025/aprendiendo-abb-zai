export interface SlideData {
  id: number;
  title: string;
  section: string;
  sectionColor: string;
  type: 'content' | 'quiz' | 'interactive' | 'code' | 'cover' | 'toc' | 'learning';
}

export const slides: SlideData[] = [
  { id: 0, title: 'Robot ABB IRB1100', section: '', sectionColor: '', type: 'cover' },
  { id: 1, title: 'Contenido del Curso', section: '', sectionColor: '', type: 'toc' },

  { id: 2, title: 'Modos de Movimiento', section: 'Movimientos', sectionColor: 'from-[#605DFF] to-[#00D390]', type: 'content' },
  { id: 3, title: 'Movimiento de Ejes (Joint)', section: 'Movimientos', sectionColor: 'from-[#605DFF] to-[#00D390]', type: 'interactive' },
  { id: 4, title: 'Movimiento Lineal', section: 'Movimientos', sectionColor: 'from-[#605DFF] to-[#00D390]', type: 'interactive' },
  { id: 5, title: 'Movimiento de Reorientacion', section: 'Movimientos', sectionColor: 'from-[#605DFF] to-[#00D390]', type: 'interactive' },
  { id: 6, title: 'Quiz: Movimientos', section: 'Movimientos', sectionColor: 'from-[#605DFF] to-[#00D390]', type: 'quiz' },

  { id: 7, title: 'Sistemas de Coordenadas', section: 'Coordenadas', sectionColor: 'from-[#00D390] to-[#605DFF]', type: 'content' },
  { id: 8, title: 'Sistema Base', section: 'Coordenadas', sectionColor: 'from-[#00D390] to-[#605DFF]', type: 'content' },
  { id: 9, title: 'Sistema Mundo', section: 'Coordenadas', sectionColor: 'from-[#00D390] to-[#605DFF]', type: 'content' },
  { id: 10, title: 'Sistema Objeto', section: 'Coordenadas', sectionColor: 'from-[#00D390] to-[#605DFF]', type: 'content' },
  { id: 11, title: 'Sistema Herramienta', section: 'Coordenadas', sectionColor: 'from-[#00D390] to-[#605DFF]', type: 'content' },
  { id: 12, title: 'Quiz: Coordenadas', section: 'Coordenadas', sectionColor: 'from-[#00D390] to-[#605DFF]', type: 'quiz' },

  { id: 13, title: 'Instrucciones MoveJ y MoveL', section: 'RAPID', sectionColor: 'from-[#F43098] to-[#605DFF]', type: 'code' },
  { id: 14, title: 'Parametros de Movimiento', section: 'RAPID', sectionColor: 'from-[#F43098] to-[#605DFF]', type: 'interactive' },
  { id: 15, title: 'Completa el Codigo', section: 'RAPID', sectionColor: 'from-[#F43098] to-[#605DFF]', type: 'code' },

  { id: 16, title: 'Objetos de Trabajo (WObj)', section: 'Work Objects', sectionColor: 'from-[#605DFF] to-[#F43098]', type: 'content' },
  { id: 17, title: 'Creando un WorkObject', section: 'Work Objects', sectionColor: 'from-[#605DFF] to-[#F43098]', type: 'code' },
  { id: 18, title: 'Quiz: Work Objects', section: 'Work Objects', sectionColor: 'from-[#605DFF] to-[#F43098]', type: 'quiz' },

  { id: 19, title: 'Creando Trayectorias', section: 'Trayectorias', sectionColor: 'from-[#00D390] to-[#F43098]', type: 'content' },
  { id: 20, title: 'Programa con Trayectorias', section: 'Trayectorias', sectionColor: 'from-[#00D390] to-[#F43098]', type: 'code' },

  { id: 21, title: 'Calibracion del Contador de Revoluciones', section: 'Calibracion', sectionColor: 'from-[#605DFF] to-[#00D390]', type: 'content' },
  { id: 22, title: 'Pasos de Calibracion', section: 'Calibracion', sectionColor: 'from-[#605DFF] to-[#00D390]', type: 'interactive' },
  { id: 23, title: 'Quiz: Calibracion', section: 'Calibracion', sectionColor: 'from-[#605DFF] to-[#00D390]', type: 'quiz' },

  { id: 24, title: 'De lo Virtual a lo Real', section: 'Transferencia', sectionColor: 'from-[#F43098] to-[#00D390]', type: 'interactive' },
  { id: 25, title: 'Conexion e Infraestructura', section: 'Transferencia', sectionColor: 'from-[#F43098] to-[#00D390]', type: 'interactive' },
  { id: 26, title: 'Permisos y Seguridad', section: 'Transferencia', sectionColor: 'from-[#F43098] to-[#00D390]', type: 'interactive' },
  { id: 27, title: 'Sincronizacion de Modulos', section: 'Transferencia', sectionColor: 'from-[#F43098] to-[#00D390]', type: 'code' },
  { id: 28, title: 'Datos de Carga (LoadData)', section: 'Transferencia', sectionColor: 'from-[#F43098] to-[#00D390]', type: 'interactive' },
  { id: 29, title: 'Alineacion y Singularidades', section: 'Transferencia', sectionColor: 'from-[#F43098] to-[#00D390]', type: 'interactive' },
  { id: 30, title: 'Ejecucion y Verificacion', section: 'Transferencia', sectionColor: 'from-[#F43098] to-[#00D390]', type: 'code' },
  { id: 31, title: 'Quiz: Transferencia', section: 'Transferencia', sectionColor: 'from-[#F43098] to-[#00D390]', type: 'quiz' },

  { id: 32, title: 'Centro del Triangulo Equilatero', section: 'Figuras', sectionColor: 'from-[#605DFF] to-[#F43098]', type: 'interactive' },
  { id: 33, title: 'Dibujando con el Robot', section: 'Figuras', sectionColor: 'from-[#605DFF] to-[#F43098]', type: 'code' },

  { id: 36, title: 'MoveC - Movimiento Circular', section: 'Examen', sectionColor: 'from-[#F43098] to-[#605DFF]', type: 'interactive' },
  { id: 37, title: 'Offs() - Desfase de Puntos', section: 'Examen', sectionColor: 'from-[#F43098] to-[#605DFF]', type: 'interactive' },
  { id: 38, title: 'Aproximacion Segura', section: 'Examen', sectionColor: 'from-[#F43098] to-[#605DFF]', type: 'interactive' },
  { id: 39, title: 'Robtarget - Estructura de Datos', section: 'Examen', sectionColor: 'from-[#F43098] to-[#605DFF]', type: 'interactive' },
  { id: 40, title: 'Hombre Muerto (Enabling Device)', section: 'Examen', sectionColor: 'from-[#F43098] to-[#605DFF]', type: 'interactive' },
  { id: 41, title: 'Codigo Completo del Examen', section: 'Examen', sectionColor: 'from-[#F43098] to-[#605DFF]', type: 'code' },
  { id: 42, title: 'Tips para el Examen', section: 'Examen', sectionColor: 'from-[#F43098] to-[#605DFF]', type: 'interactive' },
  { id: 43, title: 'Quiz: Examen Practico', section: 'Examen', sectionColor: 'from-[#F43098] to-[#605DFF]', type: 'quiz' },
  
  { id: 44, title: 'Fase I: Singularity (Bloqueo)', section: 'Examen', sectionColor: 'from-[#F43098] to-[#605DFF]', type: 'interactive' },
  { id: 45, title: 'Fase I: Calibración WObj', section: 'Examen', sectionColor: 'from-[#F43098] to-[#605DFF]', type: 'interactive' },
  { id: 46, title: 'Fase II: Jogging Fluido', section: 'Examen', sectionColor: 'from-[#F43098] to-[#605DFF]', type: 'interactive' },
  { id: 47, title: 'Fase III: Monitoreo Real', section: 'Examen', sectionColor: 'from-[#F43098] to-[#605DFF]', type: 'interactive' },
  { id: 48, title: 'Fase IV: Defensa Oral', section: 'Examen', sectionColor: 'from-[#F43098] to-[#605DFF]', type: 'interactive' },
  
  { id: 50, title: 'FlexPendant: Calibración TCP', section: 'FlexPendant', sectionColor: 'from-[#605DFF] to-[#00D390]', type: 'learning' },
  { id: 51, title: 'FlexPendant: Definición de WObj', section: 'FlexPendant', sectionColor: 'from-[#605DFF] to-[#00D390]', type: 'learning' },
  { id: 52, title: 'FlexPendant: Contadores de Revolución', section: 'FlexPendant', sectionColor: 'from-[#605DFF] to-[#00D390]', type: 'learning' },
  { id: 53, title: 'Quiz: FlexPendant', section: 'FlexPendant', sectionColor: 'from-[#605DFF] to-[#00D390]', type: 'quiz' },
  
  { id: 54, title: 'RobotStudio Workflow', section: 'Avanzado', sectionColor: 'from-purple-500 to-blue-500', type: 'learning' },
  { id: 55, title: 'Orientación y Config.', section: 'Avanzado', sectionColor: 'from-purple-500 to-blue-500', type: 'learning' },
  { id: 56, title: 'Sincronización RS', section: 'Avanzado', sectionColor: 'from-purple-500 to-blue-500', type: 'learning' },
  
  { id: 57, title: 'Resumen del Curso', section: 'Final', sectionColor: 'from-slate-800 to-slate-950', type: 'learning' },
  { id: 58, title: 'Examen Final', section: 'Final', sectionColor: 'from-slate-800 to-slate-950', type: 'quiz' }
];

export const sections = [
  { name: 'Movimientos', color: 'from-[#605DFF] to-[#00D390]', startId: 2, icon: '🔄' },
  { name: 'Coordenadas', color: 'from-[#00D390] to-[#605DFF]', startId: 7, icon: '📐' },
  { name: 'RAPID', color: 'from-[#F43098] to-[#605DFF]', startId: 13, icon: '💻' },
  { name: 'Work Objects', color: 'from-[#605DFF] to-[#F43098]', startId: 16, icon: '📦' },
  { name: 'Trayectorias', color: 'from-[#00D390] to-[#F43098]', startId: 19, icon: '🛤️' },
  { name: 'Calibracion', color: 'from-[#605DFF] to-[#00D390]', startId: 21, icon: '⚙️' },
  { name: 'Transferencia', color: 'from-[#F43098] to-[#00D390]', startId: 24, icon: '📡' },
  { name: 'Figuras', color: 'from-[#605DFF] to-[#F43098]', startId: 32, icon: '📏' },
  { name: 'Examen', color: 'from-[#F43098] to-[#605DFF]', startId: 36, icon: '📝' },
  { name: 'FlexPendant', color: 'from-[#605DFF] to-[#00D390]', startId: 50, icon: '🎮' },
  { name: 'Avanzado', color: 'from-purple-500 to-blue-500', startId: 54, icon: '⚡' },
  { name: 'Final', color: 'from-slate-800 to-slate-950', startId: 57, icon: '🏁' },
];

export interface QuizQuestion {
  q: string;
  a: string[];
  c: number;
}

export const quizMovimientos: QuizQuestion[] = [
  { q: "Cual es el tipo de movimiento que mueve cada articulacion de manera independiente?", a: ["Lineal", "Ejes (Joint)", "Reorientacion", "Circular"], c: 1 },
  { q: "Que tipo de movimiento se usa para reorientar la herramienta?", a: ["Joint", "Lineal", "Reorientacion", "Circular"], c: 2 },
  { q: "En que modo se utiliza el robot cuando el movimiento lineal esta bloqueado?", a: ["Lineal", "Reorientacion", "Circular", "Ejes (Joint)"], c: 3 },
  { q: "Cual es la ventaja principal del movimiento lineal?", a: ["Mas rapido", "Linea recta entre puntos", "Gira 360 grados", "Apaga el robot"], c: 1 }
];

export const quizCoordenadas: QuizQuestion[] = [
  { q: "En el sistema base, hacia donde apunta el eje X?", a: ["Izquierda", "Arriba", "Direccion herramienta", "Atras"], c: 2 },
  { q: "Que sistema define posiciones absolutas en el espacio 3D?", a: ["Base", "Herramienta", "Mundo", "Objeto"], c: 2 },
  { q: "Cual sistema es util cuando el objeto puede moverse?", a: ["Base", "Mundo", "Herramienta", "Objeto"], c: 3 }
];

export const quizWorkObjects: QuizQuestion[] = [
  { q: "Que ventaja tiene usar un WObj personalizado?", a: ["Mas rapido", "Los puntos se mueven con el objeto", "No tiene ventaja", "Apaga el robot"], c: 1 },
  { q: "Que parametro indica el objeto de trabajo en MoveJ/MoveL?", a: ["\\Tool", "\\Speed", "\\WObj", "\\Zone"], c: 2 },
  { q: "Cual es el objeto de trabajo por defecto?", a: ["wobj_base", "wobj0", "wobj_mundo", "wobj_default"], c: 1 }
];

export const quizCalibracion: QuizQuestion[] = [
  { q: "Para que sirve la pila en el interior del robot?", a: ["Motor", "Mantener viva la RAM (contadores)", "Pantalla", "Sensores"], c: 1 },
  { q: "Primer paso para calibrar el contador de revoluciones?", a: ["Apagar", "Llevar a marcas fisicas", "Cambiar bateria", "Reiniciar"], c: 1 }
];

export const quizTransferencia: QuizQuestion[] = [
  { q: "Metodo mandatorio para conectar la PC al controlador?", a: ["WiFi", "Bluetooth", "Ethernet Puerto Servicio", "USB"], c: 2 },
  { q: "Que sucede si masa y centro de gravedad son cero?", a: ["Mas rapido", "Bloqueo por seguridad motriz", "No pasa nada", "Apaga"], c: 1 },
  { q: "Velocidad recomendada para la primera ejecucion real?", a: ["100%", "50%", "7% o 25%", "80%"], c: 2 }
];

export const quizExamen: QuizQuestion[] = [
  { q: "Cuantos puntos necesita MoveC para definir un arco?", a: ["1", "2 (Cir y To)", "3", "0"], c: 1 },
  { q: "Que hace la funcion Offs(P, 20, 0, 0)?", a: ["Mueve 20mm en Z", "Mueve 20mm en X", "Rota 20 grados", "Nada"], c: 1 },
  { q: "Cual es el puntaje minimo necesario para aprobar?", a: ["60%", "100%", "70%", "50%"], c: 2 }
];

export const quizFlexPendant: QuizQuestion[] = [
  { q: "Metodo para definir el TCP con precision?", a: ["1 punto", "4 puntos", "3 puntos", "Automatico"], c: 1 },
  { q: "Error medio maximo aceptable para calibracion ideal?", a: ["5.0 mm", "2.5 mm", "1.0 mm", "10 mm"], c: 2 },
  { q: "Puntos necesarios para crear un WorkObject fisico?", a: ["Origen, Eje X y Eje Y", "Solo Origen", "Origen y Z", "4 puntos"], c: 0 },
  { q: "Cuando actualizar contadores de revolucion?", a: ["Cada vez que se apaga", "Perdida de sincronizacion/bateria", "Cambio de tool", "Anualmente"], c: 1 }
];

export const quizFinal: QuizQuestion[] = [
  { q: "Cuantos ejes de libertad tiene el IRB 1100?", a: ["4", "6", "7", "2"], c: 1 },
  { q: "Controlador del IRB 1100?", a: ["IRC5", "OmniCore", "S4C+", "C5G"], c: 1 },
  { q: "Extension de archivo de modulo RAPID?", a: [".mod/.modx", ".rap", ".txt", ".robot"], c: 0 },
  { q: "Rutina punto de entrada?", a: ["Start", "Init", "Main", "Entry"], c: 2 },
  { q: "Mantiene valor tras reiniciar?", a: ["VAR", "PERS", "CONST", "LOCAL"], c: 1 },
  { q: "Indica eje externo no usado?", a: ["0", "-1", "9E9", "NULL"], c: 2 },
  { q: "TCP por defecto (tool0)?", a: ["Punta gripper", "Centro brida", "Base", "Eje 3"], c: 1 },
  { q: "Zonedata punto de paro?", a: ["z1", "z10", "z100", "fine"], c: 3 },
  { q: "Funcion de desfase?", a: ["Offset", "Shift", "Offs", "Move"], c: 2 },
  { q: "Accion en RS que 'ata' mesa a WObj?", a: ["Sync", "Conectar a objeto de trabajo", "Agrupar", "Fijar"], c: 1 },
  { q: "Herramienta 'normal' a superficie?", a: ["Paralela", "Inclinada 45", "Eje Z perpendicular", "Horizontal"], c: 2 },
  { q: "Funcion de confdata?", a: ["Postura especifica ejes", "Velocidad", "Definir TCP", "Reset contador"], c: 0 },
  { q: "Boton RS para pasar puntos a codigo?", a: ["Compilar", "Sincronizar con RAPID", "Play", "Save"], c: 1 }
];

export const quizMap: Record<number, QuizQuestion[]> = {
  6: quizMovimientos,
  12: quizCoordenadas,
  18: quizWorkObjects,
  23: quizCalibracion,
  31: quizTransferencia,
  43: quizExamen,
  53: quizFlexPendant,
  58: quizFinal,
};

// ---- CODE EXERCISE DATA ----

export interface CodeBlank {
  id: string;
  answer: string;
  options: string[];
}

export interface CodeExercise {
  title: string;
  description: string;
  template: string;
  blanks: CodeBlank[];
  hint: string;
}

export const codeExercises: Record<number, CodeExercise[]> = {
  15: [
    {
      title: 'Movimiento basico',
      description: 'Home a P1 (joint) y P1 a P2 (lineal).',
      template: 'MoveJ __B1__, v200, z10, tool1;\nMoveL __B2__, v200, fine, tool1;',
      blanks: [
        { id: 'B1', answer: 'Home', options: ['Home', 'P1', 'P2'] },
        { id: 'B2', answer: 'P2', options: ['Home', 'P1', 'P2'] },
      ],
      hint: 'MoveJ a Home, MoveL a P2.',
    }
  ],
  20: [
    {
      title: 'Desfase con Offs',
      description: 'Desfase de 20mm en Z.',
      template: 'MoveL Offs(P1, 0, 0, __B1__), v50, fine, tool1 \\WObj:=wobj_mesa;',
      blanks: [{ id: 'B1', answer: '20', options: ['0', '10', '20', '30'] }],
      hint: 'Tercer parametro de Offs es Z.',
    }
  ]
};
