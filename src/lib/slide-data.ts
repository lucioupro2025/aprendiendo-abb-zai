export interface SlideData {
  id: number;
  title: string;
  section: string;
  sectionColor: string;
  type: 'content' | 'quiz' | 'interactive' | 'code' | 'cover' | 'toc';
}

export const slides: SlideData[] = [
  { id: 0, title: 'Robot ABB IRB1100', section: '', sectionColor: '', type: 'cover' },
  { id: 1, title: 'Contenido del Curso', section: '', sectionColor: '', type: 'toc' },

  { id: 2, title: 'Modos de Movimiento', section: 'Movimientos', sectionColor: 'from-orange-500 to-red-500', type: 'content' },
  { id: 3, title: 'Movimiento de Ejes (Joint)', section: 'Movimientos', sectionColor: 'from-orange-500 to-red-500', type: 'interactive' },
  { id: 4, title: 'Movimiento Lineal', section: 'Movimientos', sectionColor: 'from-orange-500 to-red-500', type: 'interactive' },
  { id: 5, title: 'Movimiento de Reorientacion', section: 'Movimientos', sectionColor: 'from-orange-500 to-red-500', type: 'interactive' },
  { id: 6, title: 'Quiz: Movimientos', section: 'Movimientos', sectionColor: 'from-orange-500 to-red-500', type: 'quiz' },

  { id: 7, title: 'Sistemas de Coordenadas', section: 'Coordenadas', sectionColor: 'from-emerald-500 to-teal-500', type: 'content' },
  { id: 8, title: 'Sistema Base', section: 'Coordenadas', sectionColor: 'from-emerald-500 to-teal-500', type: 'content' },
  { id: 9, title: 'Sistema Mundo', section: 'Coordenadas', sectionColor: 'from-emerald-500 to-teal-500', type: 'content' },
  { id: 10, title: 'Sistema Objeto', section: 'Coordenadas', sectionColor: 'from-emerald-500 to-teal-500', type: 'content' },
  { id: 11, title: 'Sistema Herramienta', section: 'Coordenadas', sectionColor: 'from-emerald-500 to-teal-500', type: 'content' },
  { id: 12, title: 'Quiz: Coordenadas', section: 'Coordenadas', sectionColor: 'from-emerald-500 to-teal-500', type: 'quiz' },

  { id: 13, title: 'Instrucciones MoveJ y MoveL', section: 'RAPID', sectionColor: 'from-violet-500 to-purple-500', type: 'code' },
  { id: 14, title: 'Parametros de Movimiento', section: 'RAPID', sectionColor: 'from-violet-500 to-purple-500', type: 'interactive' },
  { id: 15, title: 'Completa el Codigo', section: 'RAPID', sectionColor: 'from-violet-500 to-purple-500', type: 'code' },

  { id: 16, title: 'Objetos de Trabajo (WObj)', section: 'Work Objects', sectionColor: 'from-sky-500 to-cyan-500', type: 'content' },
  { id: 17, title: 'Creando un WorkObject', section: 'Work Objects', sectionColor: 'from-sky-500 to-cyan-500', type: 'code' },
  { id: 18, title: 'Quiz: Work Objects', section: 'Work Objects', sectionColor: 'from-sky-500 to-cyan-500', type: 'quiz' },

  { id: 19, title: 'Creando Trayectorias', section: 'Trayectorias', sectionColor: 'from-amber-500 to-yellow-500', type: 'content' },
  { id: 20, title: 'Programa con Trayectorias', section: 'Trayectorias', sectionColor: 'from-amber-500 to-yellow-500', type: 'code' },

  { id: 21, title: 'Calibracion del Contador de Revoluciones', section: 'Calibracion', sectionColor: 'from-rose-500 to-pink-500', type: 'content' },
  { id: 22, title: 'Pasos de Calibracion', section: 'Calibracion', sectionColor: 'from-rose-500 to-pink-500', type: 'interactive' },
  { id: 23, title: 'Quiz: Calibracion', section: 'Calibracion', sectionColor: 'from-rose-500 to-pink-500', type: 'quiz' },

  // ═══════════ NUEVA SECCION: Transferencia y Sincronizacion ═══════════
  { id: 24, title: 'De lo Virtual a lo Real', section: 'Transferencia', sectionColor: 'from-red-600 to-orange-600', type: 'interactive' },
  { id: 25, title: 'Conexion e Infraestructura', section: 'Transferencia', sectionColor: 'from-red-600 to-orange-600', type: 'interactive' },
  { id: 26, title: 'Permisos y Seguridad', section: 'Transferencia', sectionColor: 'from-red-600 to-orange-600', type: 'interactive' },
  { id: 27, title: 'Sincronizacion de Modulos', section: 'Transferencia', sectionColor: 'from-red-600 to-orange-600', type: 'code' },
  { id: 28, title: 'Datos de Carga (LoadData)', section: 'Transferencia', sectionColor: 'from-red-600 to-orange-600', type: 'interactive' },
  { id: 29, title: 'Alineacion y Singularidades', section: 'Transferencia', sectionColor: 'from-red-600 to-orange-600', type: 'interactive' },
  { id: 30, title: 'Ejecucion y Verificacion', section: 'Transferencia', sectionColor: 'from-red-600 to-orange-600', type: 'code' },
  { id: 31, title: 'Quiz: Transferencia', section: 'Transferencia', sectionColor: 'from-red-600 to-orange-600', type: 'quiz' },
  // ═══════════ FIN NUEVA SECCION ═══════════

  { id: 32, title: 'Centro del Triangulo Equilatero', section: 'Figuras', sectionColor: 'from-lime-500 to-green-500', type: 'interactive' },
  { id: 33, title: 'Dibujando con el Robot', section: 'Figuras', sectionColor: 'from-lime-500 to-green-500', type: 'code' },

  // ═══════════ NUEVA SECCION: Preparacion para el Examen ═══════════
  { id: 36, title: 'MoveC - Movimiento Circular', section: 'Examen', sectionColor: 'from-fuchsia-500 to-pink-500', type: 'interactive' },
  { id: 37, title: 'Offs() - Desfase de Puntos', section: 'Examen', sectionColor: 'from-fuchsia-500 to-pink-500', type: 'interactive' },
  { id: 38, title: 'Aproximacion Segura', section: 'Examen', sectionColor: 'from-fuchsia-500 to-pink-500', type: 'interactive' },
  { id: 39, title: 'Robtarget - Estructura de Datos', section: 'Examen', sectionColor: 'from-fuchsia-500 to-pink-500', type: 'interactive' },
  { id: 40, title: 'Hombre Muerto (Enabling Device)', section: 'Examen', sectionColor: 'from-fuchsia-500 to-pink-500', type: 'interactive' },
  { id: 41, title: 'Codigo Completo del Examen', section: 'Examen', sectionColor: 'from-fuchsia-500 to-pink-500', type: 'code' },
  { id: 42, title: 'Tips para el Examen', section: 'Examen', sectionColor: 'from-fuchsia-500 to-pink-500', type: 'interactive' },
  { id: 43, title: 'Quiz: Examen Practico', section: 'Examen', sectionColor: 'from-fuchsia-500 to-pink-500', type: 'quiz' },
  // ═══════════ FIN NUEVA SECCION ═══════════

  { id: 44, title: 'Resumen General', section: 'Repaso', sectionColor: 'from-slate-500 to-zinc-500', type: 'content' },
  { id: 45, title: 'Quiz Final', section: 'Repaso', sectionColor: 'from-slate-500 to-zinc-500', type: 'quiz' },
];

export const sections = [
  { name: 'Movimientos', color: 'from-orange-500 to-red-500', startId: 2, icon: '🔄' },
  { name: 'Coordenadas', color: 'from-emerald-500 to-teal-500', startId: 7, icon: '📐' },
  { name: 'RAPID', color: 'from-violet-500 to-purple-500', startId: 13, icon: '💻' },
  { name: 'Work Objects', color: 'from-sky-500 to-cyan-500', startId: 16, icon: '📦' },
  { name: 'Trayectorias', color: 'from-amber-500 to-yellow-500', startId: 19, icon: '🛤️' },
  { name: 'Calibracion', color: 'from-rose-500 to-pink-500', startId: 21, icon: '⚙️' },
  { name: 'Transferencia', color: 'from-red-600 to-orange-600', startId: 24, icon: '📡' },
  { name: 'Figuras', color: 'from-lime-500 to-green-500', startId: 32, icon: '📏' },
  { name: 'Examen', color: 'from-fuchsia-500 to-pink-500', startId: 36, icon: '📝' },
  { name: 'Repaso', color: 'from-slate-500 to-zinc-500', startId: 44, icon: '🏆' },
];

// ---- QUIZ DATA ----

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const quizMovimientos: QuizQuestion[] = [
  {
    question: 'Cual es el tipo de movimiento que mueve cada articulacion de manera independiente?',
    options: ['Movimiento Lineal', 'Movimiento de Ejes (Joint)', 'Movimiento de Reorientacion', 'Movimiento Circular (MoveC)'],
    correct: 1,
    explanation: 'El movimiento de ejes (Joint) permite mover cada articulacion del manipulador de manera independiente.',
  },
  {
    question: 'Que tipo de movimiento se usa para reorientar la herramienta manteniendo su posicion?',
    options: ['Joint', 'Lineal', 'Reorientacion', 'Circular'],
    correct: 2,
    explanation: 'El movimiento de reorientacion permite girar la herramienta alrededor de un eje manteniendo la posicion.',
  },
  {
    question: 'En que modo se utiliza el robot cuando el movimiento lineal esta bloqueado?',
    options: ['Lineal', 'Reorientacion', 'Circular', 'Ejes (Joint)'],
    correct: 3,
    explanation: 'El movimiento de ejes se utiliza cuando el movimiento lineal se encuentra bloqueado.',
  },
  {
    question: 'Cual es la ventaja principal del movimiento lineal?',
    options: ['Es mas rapido', 'Mueve en linea recta entre puntos', 'Gira 360 grados', 'Apaga el robot'],
    correct: 1,
    explanation: 'El movimiento lineal es muy util cuando debemos mover el robot de un punto a otro en linea recta.',
  },
  {
    question: 'Antes de operar con cualquier manipulador industrial, en que modo debemos asegurarnos de que este?',
    options: ['Modo automatico', 'Modo manual', 'Modo de calibracion', 'Modo de seguridad'],
    correct: 1,
    explanation: 'Siempre debemos asegurarnos de que el robot este en modo manual antes de operarlo.',
  },
];

export const quizCoordenadas: QuizQuestion[] = [
  {
    question: 'En el sistema base, hacia donde apunta el eje X?',
    options: ['Hacia la izquierda', 'Hacia arriba', 'Hacia la herramienta', 'Hacia atras'],
    correct: 2,
    explanation: 'En el sistema base, el eje X apunta hacia la direccion de la herramienta del robot.',
  },
  {
    question: 'Que sistema define posiciones absolutas en el espacio 3D?',
    options: ['Sistema Base', 'Sistema Herramienta', 'Sistema Mundo', 'Sistema Objeto'],
    correct: 2,
    explanation: 'El sistema mundo (world) define posiciones y orientaciones absolutas en el espacio tridimensional.',
  },
  {
    question: 'Cual sistema es util cuando el objeto puede moverse?',
    options: ['Sistema Base', 'Sistema Mundo', 'Sistema Herramienta', 'Sistema Objeto'],
    correct: 3,
    explanation: 'El sistema objeto especifica posiciones en relacion al propio sistema del objeto.',
  },
  {
    question: 'El sistema herramienta se define en relacion a:',
    options: ['La base del robot', 'El centro de la celda', 'La herramienta o extremo', 'El objeto de trabajo'],
    correct: 2,
    explanation: 'El sistema herramienta esta vinculado directamente con la herramienta o extremo del robot.',
  },
  {
    question: 'En el sistema base, hacia donde apunta el eje Z?',
    options: ['Hacia adelante', 'Hacia la izquierda', 'Hacia arriba', 'Hacia abajo'],
    correct: 2,
    explanation: 'En el sistema base, el eje Z apunta hacia arriba.',
  },
];

export const quizWorkObjects: QuizQuestion[] = [
  {
    question: 'Que ventaja tiene usar un WObj personalizado en vez de wobj0?',
    options: ['El robot se mueve mas rapido', 'Los puntos se mueven con el objeto', 'No tiene ventaja', 'Permite apagar el robot'],
    correct: 1,
    explanation: 'Al conectar los puntos a un objeto de trabajo, si movemos la mesa los puntos se mueven con ella.',
  },
  {
    question: 'Que parametro indica el objeto de trabajo en MoveJ/MoveL?',
    options: ['\\Tool', '\\Speed', '\\WObj', '\\Zone'],
    correct: 2,
    explanation: 'El parametro \\WObj de las instrucciones de movimiento indica el objeto de trabajo.',
  },
  {
    question: 'Cual es el objeto de trabajo por defecto en robots ABB?',
    options: ['wobj_base', 'wobj0', 'wobj_mundo', 'wobj_default'],
    correct: 1,
    explanation: 'wobj0 es el marco por defecto que coincide con la base del manipulador.',
  },
];

export const quizCalibracion: QuizQuestion[] = [
  {
    question: 'Para que sirve la pila en el interior del robot?',
    options: ['Alimentar el motor', 'Mantener viva la RAM con las vueltas del motor', 'Encender el teach pendant', 'Alimentar sensores'],
    correct: 1,
    explanation: 'La pila mantiene viva la memoria RAM para no perder la cantidad de vueltas que dio cada eje.',
  },
  {
    question: 'Que NO pueden determinar los encoders absolutos por si solos?',
    options: ['Posicion angular dentro de 360 grados', 'Cuantas vueltas dio el motor', 'La velocidad del eje', 'La temperatura'],
    correct: 1,
    explanation: 'El encoder conoce la posicion dentro de la vuelta, pero no sabe cuantas vueltas dio el motor.',
  },
  {
    question: 'Cual es el primer paso para calibrar el contador de revoluciones?',
    options: ['Apagar el robot', 'Llevar articulaciones a cero (marcas fisicas)', 'Cambiar la bateria', 'Reiniciar el controlador'],
    correct: 1,
    explanation: 'Debemos mover manualmente el robot y ubicar cada eje donde coincidan las marcas fisicas.',
  },
  {
    question: 'Por que los motores necesitan un reductor de velocidad?',
    options: ['Para ir mas rapido', 'Para otorgar gran torque', 'Para ahorrar energia', 'Para reducir ruido'],
    correct: 1,
    explanation: 'El reductor otorga gran torque a la articulacion, pero hace que el motor gire muchas vueltas.',
  },
];

export const quizTransferencia: QuizQuestion[] = [
  {
    question: 'Cual es el metodo mandatorio para conectar la PC al controlador ABB?',
    options: ['WiFi', 'Bluetooth', 'Cable Ethernet al Puerto de Servicio', 'USB'],
    correct: 2,
    explanation: 'El metodo mandatorio es un cable Ethernet directo al Puerto de Servicio del controlador, que activa el DHCP interno.',
  },
  {
    question: 'Que sucede si los datos de masa y centro de gravedad estan en cero?',
    options: ['El robot funciona mas rapido', 'El robot se bloquea por seguridad motriz', 'No pasa nada', 'El robot se apaga'],
    correct: 1,
    explanation: 'Si la masa y el centro de gravedad son cero o invalidos, el robot se bloquea por seguridad motriz al intentar ejecutar el programa.',
  },
  {
    question: 'Donde debe validarse fisicamente la solicitud de acceso a escritura?',
    options: ['En la PC con RobotStudio', 'En el FlexPendant presionando Grant', 'En el controlador automaticamente', 'No necesita validacion'],
    correct: 1,
    explanation: 'El operador debe validar la solicitud fisicamente en el FlexPendant presionando Grant (Conceder).',
  },
  {
    question: 'Que indica que el entorno de RobotStudio tiene acceso de escritura activo?',
    options: ['El fondo es gris', 'El fondo cambia de gris a blanco', 'Aparece un icono verde', 'Suena una alarma'],
    correct: 1,
    explanation: 'Cuando se concede el acceso, el entorno cambia de fondo gris (bloqueado) a blanco (activo).',
  },
  {
    question: 'Cual es la primera velocidad recomendada para la primera ejecucion en el robot real?',
    options: ['100% de velocidad nominal', '50% de velocidad nominal', '7% o 25% de velocidad nominal', 'No importa la velocidad'],
    correct: 2,
    explanation: 'La primera ejecucion debe realizarse al 7% o 25% de la velocidad nominal por seguridad.',
  },
  {
    question: 'Que se debe hacer si el robot alcanza una singularidad de muneca (Eje 5 cerca de 0 grados)?',
    options: ['Apagar y prender el robot', 'Cambiar a modo Joint, rotar Eje 5 y retomar', 'Seguir el movimiento forzando', 'Reiniciar RobotStudio'],
    correct: 1,
    explanation: 'Se debe cambiar a Coordenadas de Articulacion (Joint), rotar el Eje 5 fuera de la zona critica y retomar el movimiento.',
  },
  {
    question: 'Cual es la forma profesional de actualizar las coordenadas de un punto en el robot real?',
    options: ['Modificar el valor Z a mano por teclado', 'Usar Teach Position (Actualizar Posicion) fisicamente', 'Copiar del simulador', 'No se pueden modificar'],
    correct: 1,
    explanation: 'El estandar profesional es llevar el robot fisicamente al punto y usar Teach Position en el FlexPendant.',
  },
  {
    question: 'Por que es OBLIGATORIO hacer un Backup antes de cargar modulos?',
    options: ['Es una recomendacion opcional', 'Un error en sincronizacion puede deshabilitar la celda', 'Para ahorrar espacio', 'El controlador lo pide cada 24 horas'],
    correct: 1,
    explanation: 'Un error en la sincronizacion de datos de calibracion puede deshabilitar la celda; el Backup es la unica ruta de restauracion inmediata.',
  },
];

export const quizFinal: QuizQuestion[] = [
  {
    question: 'Que instruccion RAPID se usa para movimiento lineal?',
    options: ['MoveJ', 'MoveL', 'MoveC', 'MoveA'],
    correct: 1,
    explanation: 'MoveL realiza un movimiento lineal entre dos puntos.',
  },
  {
    question: 'Que significa el parametro zona con valor "fine"?',
    options: ['Zona de 50mm', 'El robot se detiene exactamente en el punto', 'Zona de 10mm', 'Movimiento circular'],
    correct: 1,
    explanation: 'Fine significa que el robot se detiene exactamente en el punto (punto de paro).',
  },
  {
    question: 'Que valor tiene la tangente de 30 grados?',
    options: ['1/sqrt(3)', 'sqrt(3)/3', '1/sqrt(2)', 'sqrt(3)'],
    correct: 0,
    explanation: 'La tangente de 30 grados es 1/sqrt(3), lo cual equivale aproximadamente a 0.577.',
  },
  {
    question: 'Cual es la instruccion RAPID para esperar un tiempo determinado?',
    options: ['Delay', 'WaitTime', 'Sleep', 'Pause'],
    correct: 1,
    explanation: 'WaitTime es la instruccion RAPID para hacer una pausa en la ejecucion.',
  },
  {
    question: 'Que funcion RAPID permite desfasar un punto respecto a una superficie?',
    options: ['Offset', 'RelTool', 'Offs', 'Translate'],
    correct: 2,
    explanation: 'La funcion Offs permite desfasar un robtarget una distancia en x, y, z.',
  },
  {
    question: 'En un triangulo equilatero de lado L, cual es la altura h?',
    options: ['L', 'L * sqrt(3)/2', 'L / 2', 'L * sqrt(2)/2'],
    correct: 1,
    explanation: 'En un triangulo equilatero, la altura h = L * sin(60) = L * sqrt(3)/2.',
  },
];

export const quizExamen: QuizQuestion[] = [
  {
    question: 'Cuantos puntos necesita MoveC para definir un arco circular?',
    options: ['1 punto (el de destino)', '2 puntos (CirPoint y ToPoint)', '3 puntos (P1, CirPoint, ToPoint)', '0 puntos, es automatico'],
    correct: 1,
    explanation: 'MoveC necesita 2 puntos: CirPoint (punto intermedio por donde pasa el arco) y ToPoint (punto destino). El punto de inicio P1 es la posicion actual del robot.',
  },
  {
    question: 'Que hace la funcion Offs(P_inicio, 20, 0, 0)?',
    options: ['Mueve 20mm en Z', 'Mueve 20mm en X', 'Rota 20 grados', 'No hace nada'],
    correct: 1,
    explanation: 'Offs(punto, X, Y, Z) desfasa un punto. Offs(P_inicio, 20, 0, 0) desplaza 20mm en el eje X respecto a P_inicio.',
  },
  {
    question: 'Por que se usa una aproximacion segura (20mm arriba) antes de tocar la superficie?',
    options: ['Porque el robot no sabe donde esta', 'Para evitar colisiones y tener tiempo de reaccion', 'Porque es mas rapido', 'No es necesario'],
    correct: 1,
    explanation: 'La aproximacion segura permite acercarse rapido (MoveJ) y luego descender lento (MoveL fine) al contacto, evitando colisiones violentas.',
  },
  {
    question: 'Que componentes contiene un robtarget ademas de X, Y, Z?',
    options: ['Solo las coordenadas', 'Orientacion (Q1-Q4), Configuracion (cf1,cf4,cf6), Ejes externos', 'Velocidad y zona', 'Nombre y tipo'],
    correct: 1,
    explanation: 'Un robtarget completo incluye: Posicion (X,Y,Z), Orientacion (Q1,Q2,Q3,Q4), Configuracion (cf1,cf4,cf6) y Ejes externos (epos).',
  },
  {
    question: 'Que sucede si aprietas el enabling device (hombre muerto) a FONDO?',
    options: ['El robot se mueve mas rapido', 'El robot se detiene (PARADA)', 'No pasa nada', 'El robot cambia de modo'],
    correct: 1,
    explanation: 'Si aprietas el enabling device a fondo, el robot se detiene inmediatamente. Solo funciona a la mitad de su recorrido.',
  },
  {
    question: 'A que velocidad se recomienda la PRIMERA ejecucion de un programa en el robot real?',
    options: ['100%', '50%', '7%', '25%'],
    correct: 2,
    explanation: 'La primera ejecucion debe ser al 7% de velocidad nominal para poder reaccionar ante cualquier imprevisto de forma segura.',
  },
  {
    question: 'Cual es la ventaja de usar Offs() para dibujar un cuadrado de 20x20mm?',
    options: ['El robot dibuja mas rapido', 'Solo necesitas grabar 1 punto y calculas los demas', 'No necesitas herramienta', 'El cuadrado sale perfecto automaticamente'],
    correct: 1,
    explanation: 'Con Offs(), solo grabas P_inicio y calculas los demas vertices sumando desfases (+20mm en X, +20mm en Y), ahorrando tiempo y errores.',
  },
  {
    question: 'Que instruccion se usa para retirarse 20mm de la superficie despues de dibujar?',
    options: ['MoveJ Offs(P, 0, 0, 20), v200, z10, tool1 \\WObj:=wPina;', 'MoveL Offs(P, 0, 0, 20), v100, fine, tool1 \\WObj:=wPina;', 'MoveC Offs(P, 0, 0, 20), v100, fine, tool1 \\WObj:=wPina;', 'WaitTime 20;'],
    correct: 1,
    explanation: 'Se usa MoveL con Offs(P, 0, 0, 20) para subir 20mm de la superficie con movimiento lineal y zona fine.',
  },
];

export const quizMap: Record<number, QuizQuestion[]> = {
  6: quizMovimientos,
  12: quizCoordenadas,
  18: quizWorkObjects,
  23: quizCalibracion,
  31: quizTransferencia,
  43: quizExamen,
  45: quizFinal,
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
      title: 'Movimiento basico entre puntos',
      description: 'Completa el codigo para que el robot vaya de Home a P1 con movimiento joint y luego a P2 con movimiento lineal.',
      template: 'MoveJ __B1__, v200, z10, tool1;\nMoveL __B2__, v200, fine, tool1;',
      blanks: [
        { id: 'B1', answer: 'Home', options: ['Home', 'P1', 'P2', 'P3'] },
        { id: 'B2', answer: 'P2', options: ['Home', 'P1', 'P2', 'P3'] },
      ],
      hint: 'MoveJ mueve a Home (joint), MoveL mueve a P2 (lineal).',
    },
    {
      title: 'Estructura de un programa RAPID',
      description: 'Completa la estructura basica de un programa en RAPID.',
      template: 'MODULE MainModule\n  __B1__ main()\n    MoveJ Home, v200, fine, tool1;\n    __B2__ 3;\n    MoveJ Home, v200, fine, tool1;\n  __B3__\n__B4__',
      blanks: [
        { id: 'B1', answer: 'PROC', options: ['PROC', 'FUNC', 'TASK', 'VAR'] },
        { id: 'B2', answer: 'WaitTime', options: ['WaitTime', 'Delay', 'Sleep', 'Wait'] },
        { id: 'B3', answer: 'ENDPROC', options: ['ENDPROC', 'END', 'RETURN', 'ENDFUNC'] },
        { id: 'B4', answer: 'ENDMODULE', options: ['ENDMODULE', 'END', 'MODULE', 'ENDPROC'] },
      ],
      hint: 'Un programa RAPID tiene: MODULE > PROC...ENDPROC > ENDMODULE.',
    },
  ],
  17: [
    {
      title: 'Movimiento con WorkObject',
      description: 'Completa el codigo para mover el robot usando un objeto de trabajo personalizado.',
      template: 'MoveJ P1, v200, z10, tool1 \\WObj:=__B1__;\nMoveL P2, v200, fine, tool1 \\WObj:=__B2__;',
      blanks: [
        { id: 'B1', answer: 'wobj_mesa', options: ['wobj0', 'wobj_mesa', 'wobj_base', 'tool1'] },
        { id: 'B2', answer: 'wobj_mesa', options: ['wobj0', 'wobj_mesa', 'wobj_base', 'tool1'] },
      ],
      hint: 'El parametro \\WObj especifica el objeto de trabajo personalizado.',
    },
  ],
  20: [
    {
      title: 'Programa con trayectoria y espera',
      description: 'Completa el programa que ejecuta una trayectoria, espera y vuelve al inicio.',
      template: 'PROC main()\n  Trayecto_Mesa;\n  MoveJ __B1__, v200, fine, tool1;\n  __B2__ 5;\n  Trayecto_Tuercas;\n  MoveJ Home, v200, fine, tool1;\nENDPROC',
      blanks: [
        { id: 'B1', answer: 'Home', options: ['Home', 'P1', 'P2', 'Start'] },
        { id: 'B2', answer: 'WaitTime', options: ['WaitTime', 'Delay', 'Sleep', 'Pause'] },
      ],
      hint: 'Para esperar 5 segundos en RAPID se usa WaitTime.',
    },
    {
      title: 'Desfase con Offs',
      description: 'Completa para moverse a un punto desfasado 20mm sobre la superficie.',
      template: 'MoveJ Home, v100, fine, tool1;\nMoveL Offs(P1, __B1__, __B2__, __B3__), v50, fine,\n      tool1 \\WObj:=wobj_mesa;',
      blanks: [
        { id: 'B1', answer: '0', options: ['0', '20', '10', '5'] },
        { id: 'B2', answer: '0', options: ['0', '20', '10', '5'] },
        { id: 'B3', answer: '20', options: ['0', '20', '10', '5'] },
      ],
      hint: 'Offs(punto, x, y, z) desfasa. Para 20mm sobre la superficie: desfasa z=20.',
    },
  ],
  // ═══════════ NUEVOS EJERCICIOS: Transferencia ═══════════
  27: [
    {
      title: 'Reemplazo de identificadores virtuales',
      description: 'Al transferir de RobotStudio al controlador real, debes reemplazar los identificadores virtuales por los reales calibrados.',
      template: 'MoveJ P_Home, v200, z10, __B1__ \\WObj:=__B2__;\nMoveL Offs(P_Punto1, 0, 0, 20), v50, fine, __B3__\n      \\WObj:=__B4__;',
      blanks: [
        { id: 'B1', answer: 'tPina', options: ['tool1', 'tPina', 'gripper1', 'wobj0'] },
        { id: 'B2', answer: 'wPina', options: ['wobj0', 'wPina', 'wobj_mesa', 'wobj_base'] },
        { id: 'B3', answer: 'tPina', options: ['tool1', 'tPina', 'gripper1', 'wobj0'] },
        { id: 'B4', answer: 'wPina', options: ['wobj0', 'wPina', 'wobj_mesa', 'wobj_base'] },
      ],
      hint: 'Reemplaza tool1 por la herramienta real calibrada (tPina) y wobj0 por el WObj real (wPina).',
    },
    {
      title: 'Protocolo de permisos',
      description: 'Ordena los pasos correctos para obtener acceso de escritura al controlador real.',
      template: 'Paso 1: __B1__\nPaso 2: Validar en FlexPendant con __B2__\nPaso 3: Verificar fondo __B3__ (activo)\nPaso 4: Crear __B4__ completo',
      blanks: [
        { id: 'B1', answer: 'Solicitar acceso', options: ['Solicitar acceso', 'Apagar robot', 'Ejecutar programa', 'Borrar modulos'] },
        { id: 'B2', answer: 'Grant', options: ['Grant', 'Start', 'Stop', 'Enter'] },
        { id: 'B3', answer: 'blanco', options: ['blanco', 'gris', 'negro', 'azul'] },
        { id: 'B4', answer: 'Backup', options: ['Backup', 'Modulo', 'Tool', 'Programa'] },
      ],
      hint: 'El flujo es: Solicitar acceso → Grant en FlexPendant → Fondo blanco → Backup ANTES de cargar.',
    },
  ],
  30: [
    {
      title: 'Ejecucion segura en el robot real',
      description: 'Completa los pasos para una ejecucion segura en el controlador fisico por primera vez.',
      template: 'PROC main()\n  MoveJ Home, v200, fine, __B1__;\n  // Primera ejecucion: velocidad al __B2__\n  MoveL P_Contacto, v50, fine, tPina\n      \\WObj:=wPina;\n  // Usar modo __B3__ para validar\n  // Si punto incorrecto: usar __B4__\nENDPROC',
      blanks: [
        { id: 'B1', answer: 'tPina', options: ['tool1', 'tPina', 'wPina', 'gripper'] },
        { id: 'B2', answer: '7%', options: ['100%', '50%', '7%', '25%'] },
        { id: 'B3', answer: 'Step', options: ['Step', 'Auto', 'Continuous', 'Manual'] },
        { id: 'B4', answer: 'Teach', options: ['Teach', 'Delete', 'Rename', 'Copy'] },
      ],
      hint: 'Primera ejecucion: velocidad 7%, modo Step-by-Step, y si el punto esta mal usar Teach Position.',
    },
  ],
  // ═══════════ FIN NUEVOS EJERCICIOS ═══════════
  41: [
    {
      title: 'Codigo del examen: cuadrado con arco',
      description: 'Completa el codigo que el profesor espera ver en el examen para dibujar un cuadrado con arco.',
      template: `PROC main()
  MoveJ Offs(P_inicio, 0, 0, __B1__), v100, fine, toolPina
      \\WObj:=wPina;
  MoveL P_inicio, v50, fine, toolPina \\WObj:=wPina;
  MoveL Offs(P_inicio, 20, 0, 0), v100, z1, toolPina
      \\WObj:=wPina;
  __B2__ P_medio, P_fin, v100, fine, toolPina
      \\WObj:=wPina;
  MoveL Offs(P_fin, 0, 0, __B3__), v100, fine, toolPina
      \\WObj:=wPina;
ENDPROC`,
      blanks: [
        { id: 'B1', answer: '20', options: ['10', '20', '30', '50'] },
        { id: 'B2', answer: 'MoveC', options: ['MoveJ', 'MoveL', 'MoveC', 'MoveA'] },
        { id: 'B3', answer: '20', options: ['10', '20', '30', '50'] },
      ],
      hint: 'Aproximacion 20mm arriba, MoveC para el arco, retirada 20mm arriba.',
    },
  ],
  33: [
    {
      title: 'Parametros de velocidad y zona',
      description: 'Movimiento rapido a P1 (zona 20) y luego preciso a P2.',
      template: 'MoveJ P1, __B1__, __B2__, tool1;\nMoveL P2, v50, __B3__, tool1;',
      blanks: [
        { id: 'B1', answer: 'v500', options: ['v50', 'v200', 'v500', 'v1000'] },
        { id: 'B2', answer: 'z20', options: ['fine', 'z5', 'z10', 'z20'] },
        { id: 'B3', answer: 'fine', options: ['fine', 'z5', 'z10', 'z20'] },
      ],
      hint: 'Rapido: v500 + z20. Preciso: fine.',
    },
  ],
};
