'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { QuizComponent } from './quiz-component';
import { CodeExerciseComponent } from './code-exercise-component';
import { quizTransferencia, codeExercises } from '@/lib/slide-data';

/* ═══════════════════════════════════════════════════════════════
   SLIDE 24: De lo Virtual a lo Real (Introduccion)
   ═══════════════════════════════════════════════════════════════ */

function FallingRobotAnimation() {
  const [phase, setPhase] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const phases = [
    { robotY: 40, surfaceY: 140, label: 'Simulacion perfecta', color: '#22c55e', status: '✓ Todo funciona' },
    { robotY: 80, surfaceY: 140, label: 'Acercando al real...', color: '#f59e0b', status: '⚠ Datos reales' },
    { robotY: 155, surfaceY: 140, label: 'SIN VALIDACION', color: '#ef4444', status: '💥 COLISION!' },
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPhase((p) => (p + 1) % 3);
    }, 2200);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const p = phases[phase];

  return (
    <svg viewBox="0 0 260 200" className="w-full" role="img" aria-label="Animacion virtual vs real">
      <rect width="260" height="200" fill="#f8fafc" rx="10" />

      {/* Surface */}
      <rect x="60" y={p.surfaceY} width="140" height="10" rx="2" fill={phase < 2 ? '#94a3b8' : '#ef4444'} />
      <text x="130" y={p.surfaceY + 28} textAnchor="middle" fill="#64748b" fontSize="9">Superficie real (con imperfecciones)</text>

      {/* Robot body */}
      <g transform={`translate(120, ${p.robotY})`}>
        <rect x="-20" y="-25" width="40" height="30" rx="6" fill="#1e293b" stroke={p.color} strokeWidth="2" />
        <circle cx="0" cy="-32" r="10" fill="#334155" stroke={p.color} strokeWidth="2" />
        <line x1="0" y1="5" x2="0" y2="20" stroke={p.color} strokeWidth="3" strokeLinecap="round" />
        <circle cx="0" cy="22" r="4" fill={p.color} />
        {/* Alert icon when crashing */}
        {phase === 2 && (
          <>
            <text x="30" y="-15" fill="#ef4444" fontSize="18" fontWeight="bold">⚡</text>
            <line x1="-12" y1="-20" x2="12" y2="-8" stroke="#ef4444" strokeWidth="2" />
            <line x1="12" y1="-20" x2="-12" y2="-8" stroke="#ef4444" strokeWidth="2" />
          </>
        )}
      </g>

      {/* Status */}
      <rect x="15" y="10" width="230" height="24" rx="4" fill={phase === 0 ? '#f0fdf4' : phase === 1 ? '#fffbeb' : '#fef2f2'} stroke={p.color} strokeWidth="1" />
      <text x="130" y="26" textAnchor="middle" fill={p.color} fontSize="11" fontWeight="bold">{p.status}</text>

      {/* Labels */}
      <text x="20" y="90" fill="#475569" fontSize="8">Simulador:</text>
      <text x="20" y="102" fill="#22c55e" fontSize="8" fontWeight="bold">Z=100.00mm</text>
      <text x="20" y="118" fill="#475569" fontSize="8">Real:</text>
      <text x="20" y="130" fill="#ef4444" fontSize="8" fontWeight="bold">Z= 98.73mm (-1.27mm)</text>

      <text x="130" y="190" textAnchor="middle" fill="#64748b" fontSize="9" fontStyle="italic">{p.label}</text>
    </svg>
  );
}

export function SlideTransferIntro() {
  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">De lo Virtual a lo Real</h2>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700 border border-red-200">CRITICO</span>
      </div>
      <p className="text-sm text-muted-foreground">
        La fase mas peligrosa del despliegue robotico: cuando la simulacion choca con la realidad.
      </p>

      {/* Animated demo */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <FallingRobotAnimation />
        </CardContent>
      </Card>

      {/* Analogy card */}
      <Card className="border-0 shadow-sm border-l-4 border-l-amber-400">
        <CardContent className="p-4 space-y-2">
          <h4 className="font-bold text-sm text-amber-700 flex items-center gap-2">
            <span className="text-lg">🍳</span> Analogia: La Receta y la Cocina
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 space-y-1">
              <p className="font-semibold text-xs text-blue-800">📋 La Receta (RobotStudio)</p>
              <ul className="text-xs text-blue-700 space-y-0.5">
                <li>• Ingredientes exactos y perfectos</li>
                <li>• Temperatura controlada</li>
                <li>• Tiempos ideales</li>
                <li>• Resultado: siempre perfecto</li>
              </ul>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 space-y-1">
              <p className="font-semibold text-xs text-orange-800">🏠 La Cocina Real (Controlador)</p>
              <ul className="text-xs text-orange-700 space-y-0.5">
                <li>• Los ingredientes varian</li>
                <li>• El horno tiene zonas calientes</li>
                <li>• La humedad cambia</li>
                <li>• Resultado: hay que ajustar</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key concept */}
      <div className="p-4 rounded-lg bg-red-50 border border-red-200 space-y-2">
        <h4 className="font-bold text-sm text-red-800">El robot NO tiene intuicion</h4>
        <p className="text-xs text-red-700">
          El controlador ejecutara cualquier instruccion sintacticamente correcta, <strong>incluso si conduce a un impacto catastrofico</strong>.
          Si el punto Z=-10mm esta dentro del pizarron, el robot intentara alcanzarlo rompiendo la herramienta.
        </p>
        <p className="text-xs text-red-700 font-semibold">
          La seguridad final reside en el criterio del operador y el respeto a las etapas de validacion.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SLIDE 25: Conexion e Infraestructura
   ═══════════════════════════════════════════════════════════════ */

export function SlideConnection() {
  const [connected, setConnected] = useState(false);
  const [ip, setIp] = useState('---.---.---.---');

  const handleConnect = useCallback(() => {
    setIp('192.168.125.1');
    setConnected(true);
  }, []);

  const handleDisconnect = useCallback(() => {
    setIp('---.---.---.---');
    setConnected(false);
  }, []);

  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Conexion e Infraestructura</h2>
      <p className="text-sm text-muted-foreground">
        La integridad de los datos depende de una comunicacion estable. Cualquier interrupcion puede causar corrupciones dificiles de diagnosticar.
      </p>

      {/* Interactive connection diagram */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <svg viewBox="0 0 400 160" className="w-full" role="img" aria-label="Diagrama de conexion">
            <rect width="400" height="160" fill="#f8fafc" rx="10" />

            {/* PC / RobotStudio */}
            <rect x="20" y="30" width="100" height="70" rx="8" fill={connected ? '#dbeafe' : '#f1f5f9'} stroke={connected ? '#3b82f6' : '#94a3b8'} strokeWidth="2" />
            <text x="70" y="55" textAnchor="middle" fill={connected ? '#1e40af' : '#64748b'} fontSize="10" fontWeight="bold">💻 PC</text>
            <text x="70" y="70" textAnchor="middle" fill={connected ? '#3b82f6' : '#94a3b8'} fontSize="8">RobotStudio</text>
            <text x="70" y="88" textAnchor="middle" fill="#94a3b8" fontSize="7">Estacion Virtual</text>

            {/* Cable */}
            <line x1="120" y1="65" x2="280" y2="65" stroke={connected ? '#22c55e' : '#cbd5e1'} strokeWidth="3" strokeDasharray={connected ? 'none' : '6,4'}>
              <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="0.8s" repeatCount="indefinite" />
            </line>
            <rect x="170" y="50" width="60" height="30" rx="4" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
            <text x="200" y="63" textAnchor="middle" fill="#475569" fontSize="7" fontWeight="bold">Ethernet</text>
            <text x="200" y="74" textAnchor="middle" fill="#94a3b8" fontSize="6">Cable directo</text>

            {/* Controller */}
            <rect x="280" y="30" width="100" height="70" rx="8" fill={connected ? '#dcfce7' : '#f1f5f9'} stroke={connected ? '#22c55e' : '#94a3b8'} strokeWidth="2" />
            <text x="330" y="55" textAnchor="middle" fill={connected ? '#166534' : '#64748b'} fontSize="10" fontWeight="bold">🤖 Controlador</text>
            <text x="330" y="70" textAnchor="middle" fill={connected ? '#22c55e' : '#94a3b8'} fontSize="8">Puerto de Servicio</text>
            <text x="330" y="88" textAnchor="middle" fill="#94a3b8" fontSize="7">Robot Real (IRC5)</text>

            {/* Status indicator */}
            <circle cx="70" cy="115" r="5" fill={connected ? '#22c55e' : '#94a3b8'} />
            <text x="82" y="118" fill="#64748b" fontSize="8">{connected ? 'Conectado' : 'Desconectado'}</text>

            <circle cx="330" cy="115" r="5" fill={connected ? '#22c55e' : '#94a3b8'} />
            <text x="342" y="118" fill="#64748b" fontSize="8">{connected ? 'Online' : 'Offline'}</text>

            {/* IP Display */}
            {connected && (
              <text x="200" y="140" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">
                DHCP: {ip} asignada automaticamente
              </text>
            )}
          </svg>
        </CardContent>
      </Card>

      {/* Connect button */}
      <div className="flex justify-center">
        {!connected ? (
          <button onClick={handleConnect} className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95">
            🔌 Conectar con un Clic
          </button>
        ) : (
          <button onClick={handleDisconnect} className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95">
            ❌ Desconectar
          </button>
        )}
      </div>

      {/* Key points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3">
            <h4 className="font-semibold text-xs text-blue-700 mb-1">Estacion Virtual (RobotStudio)</h4>
            <ul className="text-xs text-muted-foreground space-y-0.5">
              <li>• Modelo 3D del robot y la celda</li>
              <li>• Logica del programa depurada</li>
              <li>• Puntos virtuales ideales</li>
              <li>• Fondo de edicion: <span className="font-mono text-blue-600">blanco</span></li>
            </ul>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3">
            <h4 className="font-semibold text-xs text-emerald-700 mb-1">Controlador Real (Hardware)</h4>
            <ul className="text-xs text-muted-foreground space-y-0.5">
              <li>• Robot fisico con tolerancias</li>
              <li>• Herramientas calibradas reales</li>
              <li>• Datos de carga (masa real)</li>
              <li>• Puerto de Servicio: <span className="font-mono text-emerald-600">DHCP interno</span></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SLIDE 26: Permisos y Seguridad
   ═══════════════════════════════════════════════════════════════ */

export function SlidePermissions() {
  const [step, setStep] = useState(0);
  const [backupDone, setBackupDone] = useState(false);
  const steps = [
    {
      title: 'Paso 1: Solicitar Acceso',
      desc: 'Desde RobotStudio, ejecutar "Solicitar acceso a escritura". La solicitud se envia al controlador fisico.',
      icon: '📝',
      action: 'Solicitar acceso a escritura',
      actionLabel: 'Solicitar Acceso',
    },
    {
      title: 'Paso 2: Validar en FlexPendant',
      desc: 'El operador debe validar la solicitud fisicamente en el teach pendant presionando "Grant" (Conceder).',
      icon: '✅',
      action: 'Presionar Grant en el FlexPendant',
      actionLabel: 'Conceder (Grant)',
    },
    {
      title: 'Paso 3: Verificar Acceso',
      desc: 'El entorno de RobotStudio cambiara de fondo gris (bloqueado) a fondo blanco (activo). Ahora puedes editar.',
      icon: '🎨',
      action: 'Verificar que el fondo sea blanco',
      actionLabel: 'Verificar Fondo',
    },
    {
      title: 'Paso 4: Crear Backup',
      desc: 'ANTES de cargar cualquier modulo, crear una copia de seguridad completa. Es tu unica ruta de restauracion.',
      icon: '💾',
      action: 'Generar backup completo del controlador',
      actionLabel: 'Crear Backup',
    },
  ];

  const handleAction = () => {
    if (step === 3) {
      setBackupDone(true);
    }
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Permisos y Seguridad</h2>
      <p className="text-sm text-muted-foreground">
        La jerarquia de seguridad previene modificaciones accidentales. Sin acceso de escritura, el controlador permanece en modo solo lectura.
      </p>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-1">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-1">
            <button onClick={() => i <= step && setStep(i)}
              className={`flex items-center justify-center size-9 rounded-full text-sm font-bold transition-all ${
                i === step ? 'bg-gradient-to-br from-red-500 to-orange-500 text-white scale-110 shadow-lg' :
                i < step ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground'
              }`}>
              {i < step ? '✓' : s.icon}
            </button>
            {i < steps.length - 1 && (
              <div className={`w-6 h-0.5 ${i < step ? 'bg-emerald-500' : 'bg-muted'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Current step content */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base">{steps[step].title}</h3>
            <span className="text-xs text-muted-foreground">Paso {step + 1} de {steps.length}</span>
          </div>
          <p className="text-sm text-muted-foreground">{steps[step].desc}</p>

          {/* Visual simulation */}
          <div className="bg-slate-900 rounded-lg p-4 text-white">
            {step === 0 && (
              <div className="text-center space-y-2">
                <div className="inline-block bg-slate-800 rounded-lg p-4 text-left font-mono text-xs">
                  <p className="text-slate-400">RobotStudio → Controlador</p>
                  <p className="text-amber-400 mt-2">⏳ Solicitando acceso a escritura...</p>
                  <p className="text-slate-500 mt-1">Esperando validacion en FlexPendant...</p>
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="text-center space-y-2">
                <div className="inline-block bg-slate-800 rounded-lg p-4 text-left font-mono text-xs w-full max-w-xs">
                  <p className="text-slate-400">FlexPendant (Teach Pendant)</p>
                  <div className="mt-2 space-y-2">
                    <div className="bg-red-900/40 border border-red-700 rounded p-2">
                      <p className="text-red-300 font-bold">⚠ Solicitud de escritura</p>
                      <p className="text-red-400 text-[10px]">PC RobotStudio solicita acceso</p>
                    </div>
                    <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded py-2 font-bold text-sm transition-colors">
                      GRANT (Conceder)
                    </button>
                    <button className="w-full bg-slate-700 text-slate-400 rounded py-1.5 text-sm">
                      Denegar
                    </button>
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="text-center space-y-2">
                <p className="text-xs text-slate-400 mb-2">Cambio visual en RobotStudio:</p>
                <div className="flex items-center gap-3 justify-center">
                  <div className="text-center">
                    <div className="w-20 h-14 rounded bg-slate-600 border-2 border-slate-500 flex items-center justify-center">
                      <span className="text-slate-400 text-xs">Bloqueado</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Antes (gris)</p>
                  </div>
                  <span className="text-emerald-400 text-xl">→</span>
                  <div className="text-center">
                    <div className="w-20 h-14 rounded bg-white border-2 border-emerald-500 flex items-center justify-center">
                      <span className="text-slate-900 text-xs font-bold">Activo ✓</span>
                    </div>
                    <p className="text-[10px] text-emerald-500 mt-1">Ahora (blanco)</p>
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="text-center space-y-2">
                <div className="inline-block bg-slate-800 rounded-lg p-4 text-left font-mono text-xs w-full max-w-xs">
                  <p className="text-slate-400">Backup del Controlador</p>
                  {backupDone ? (
                    <div className="mt-2 space-y-1">
                      <p className="text-emerald-400">✓ Sistema copiado</p>
                      <p className="text-emerald-400">✓ Modulos RAPID copiados</p>
                      <p className="text-emerald-400">✓ Calibracion copiada</p>
                      <p className="text-emerald-400">✓ ToolData copiado</p>
                      <p className="text-emerald-400">✓ WObjData copiado</p>
                      <p className="text-center mt-3 bg-emerald-600 text-white rounded py-1.5 font-bold">Backup Completo ✓</p>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <p className="text-amber-400">⏳ Generando backup...</p>
                      <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                        <div className="bg-amber-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-1">
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
              className="px-3 py-1.5 rounded-lg text-sm border bg-muted hover:bg-muted/80 disabled:opacity-40 disabled:cursor-not-allowed">
              Atras
            </button>
            {step < steps.length - 1 || !backupDone ? (
              <button onClick={handleAction}
                className="px-3 py-1.5 rounded-lg text-sm bg-gradient-to-r from-red-500 to-orange-500 text-white">
                {steps[step].actionLabel}
              </button>
            ) : (
              <span className="px-3 py-1.5 rounded-lg text-sm bg-emerald-100 text-emerald-700 font-semibold">
                Acceso completo ✓
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Warning */}
      <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs space-y-1">
        <p className="font-bold">⚠ MANDATORIO: Backup antes de cargar modulos</p>
        <p>Un error en la sincronizacion de datos de calibracion puede <strong>deshabilitar la celda</strong>. El Backup es su unica ruta de restauracion inmediata.</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SLIDE 27: Sincronizacion de Modulos (Code Exercises)
   ═══════════════════════════════════════════════════════════════ */

export function SlideSyncModules() {
  const exercises = codeExercises[27] ?? [];
  const [showMapping, setShowMapping] = useState(false);

  return (
    <div className="space-y-4 p-4 md:p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Sincronizacion de Modulos</h2>
      <p className="text-sm text-muted-foreground">
        Al copiar modulos de la estacion virtual al controlador real, surgiran errores semanticos. El compilador valida sintaxis, pero NO la coherencia fisica de los datos.
      </p>

      {/* Mapping table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <button onClick={() => setShowMapping(!showMapping)}
            className="w-full flex items-center justify-between text-sm font-semibold">
            <span>Tabla de Reemplazo de Identificadores</span>
            <span className="text-xs text-muted-foreground">{showMapping ? 'Ocultar' : 'Mostrar'}</span>
          </button>
          {showMapping && (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-1.5 pr-3 text-muted-foreground">Virtual (RobotStudio)</th>
                    <th className="text-left py-1.5 pr-3 text-muted-foreground">→</th>
                    <th className="text-left py-1.5 pr-3 text-red-700 font-bold">Real (Calibrado)</th>
                    <th className="text-left py-1.5 text-muted-foreground">Accion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-dashed">
                    <td className="py-1.5 pr-3 font-mono text-slate-600">tool1</td>
                    <td className="py-1.5 pr-3 text-amber-500">→</td>
                    <td className="py-1.5 pr-3 font-mono font-bold text-red-600">tPina</td>
                    <td className="py-1.5 text-muted-foreground">Reemplazo masivo (Ctrl+F)</td>
                  </tr>
                  <tr className="border-b border-dashed">
                    <td className="py-1.5 pr-3 font-mono text-slate-600">wobj0</td>
                    <td className="py-1.5 pr-3 text-amber-500">→</td>
                    <td className="py-1.5 pr-3 font-mono font-bold text-red-600">wPina</td>
                    <td className="py-1.5 text-muted-foreground">Alinear con sistema fisico</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 pr-3 font-mono text-slate-600">Masa=0 / CG=0</td>
                    <td className="py-1.5 pr-3 text-amber-500">→</td>
                    <td className="py-1.5 pr-3 font-mono font-bold text-red-600">Valores reales</td>
                    <td className="py-1.5 text-muted-foreground">Validar que no sean 0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analogy */}
      <Card className="border-0 shadow-sm border-l-4 border-l-violet-400">
        <CardContent className="p-3 space-y-1">
          <h4 className="font-bold text-xs text-violet-700 flex items-center gap-1">
            <span>🧠</span> Analogia: Cambio de Idioma
          </h4>
          <p className="text-xs text-muted-foreground">
            Es como traducir un libro del espanol al ingles. Las palabras se cambian (tool1 → tPina), pero el significado debe mantenerse.
            Si traduces mal un numero critico, la receta sale mal aunque la gramatica sea correcta.
          </p>
        </CardContent>
      </Card>

      {/* Exercises */}
      {exercises.map((ex, i) => (
        <CodeExerciseComponent key={i} exercise={ex} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SLIDE 28: Datos de Carga (LoadData)
   ═══════════════════════════════════════════════════════════════ */

export function SlideLoadData() {
  const [mass, setMass] = useState(0);
  const [cgX, setCgX] = useState(0);
  const [cgY, setCgY] = useState(0);
  const [cgZ, setCgZ] = useState(0);

  const isValid = mass > 0;
  const isBalanced = mass > 0 && Math.abs(cgX) < 5 && Math.abs(cgY) < 5 && Math.abs(cgZ) < 5;

  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Datos de Carga (LoadData)</h2>
      <p className="text-sm text-muted-foreground">
        La informacion de masa y centro de gravedad es critica. Si estos parametros son cero o invalidos, el robot se bloquea por seguridad motriz.
      </p>

      {/* Interactive balance visualization */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <svg viewBox="0 0 400 180" className="w-full" role="img" aria-label="Visualizacion de datos de carga">
            <rect width="400" height="180" fill="#f8fafc" rx="10" />

            {/* Balance beam */}
            <line x1="200" y1="60" x2="200" y2="130" stroke="#94a3b8" strokeWidth="3" />
            <polygon points="200,130 190,150 210,150" fill="#94a3b8" />

            {/* Beam - tilts based on CG */}
            {mass > 0 ? (
              <g>
                <line x1="60" y1={60 + cgX * 0.5} x2="340" y2={60 - cgX * 0.5} stroke="#475569" strokeWidth="4" strokeLinecap="round" />
                {/* Weight indicator */}
                <circle cx={200 + cgX * 1.2} cy={60 + 20} r={Math.min(mass * 0.3 + 8, 30)} fill={isBalanced ? '#22c55e' : '#f59e0b'} opacity="0.8" />
                <text x={200 + cgX * 1.2} y={65 + 20} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{mass}kg</text>
              </g>
            ) : (
              <>
                <line x1="60" y1="60" x2="340" y2="60" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
                <text x="200" y="55" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">⚠ SIN DATOS</text>
              </>
            )}

            {/* Status */}
            <rect x="20" y="145" width="360" height="25" rx="4" fill={mass === 0 ? '#fef2f2' : isBalanced ? '#f0fdf4' : '#fffbeb'} stroke={mass === 0 ? '#ef4444' : isBalanced ? '#22c55e' : '#f59e0b'} strokeWidth="1" />
            <text x="200" y="162" textAnchor="middle" fill={mass === 0 ? '#ef4444' : isBalanced ? '#166534' : '#92400e'} fontSize="10" fontWeight="bold">
              {mass === 0 ? '🚫 BLOQUEO: Masa = 0. Robot no puede ejecutar.' : isBalanced ? '✓ Datos validos. Robot listo para ejecutar.' : '⚠ CG desbalanceado. Verificar centro de gravedad.'}
            </text>
          </svg>
        </CardContent>
      </Card>

      {/* Parameter controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-xs font-semibold">Masa (kg)</span>
              <span className={`text-xs font-mono font-bold ${mass > 0 ? 'text-emerald-600' : 'text-red-500'}`}>{mass}</span>
            </div>
            <input type="range" min={0} max={10} step={0.1} value={mass}
              onChange={(e) => setMass(Number(e.target.value))}
              className="w-full accent-emerald-500" />
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-xs font-semibold">CG X (mm)</span>
              <span className="text-xs font-mono font-bold text-muted-foreground">{cgX}</span>
            </div>
            <input type="range" min={-20} max={20} step={1} value={cgX}
              onChange={(e) => setCgX(Number(e.target.value))}
              className="w-full accent-orange-500" />
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-xs font-semibold">CG Y (mm)</span>
              <span className="text-xs font-mono font-bold text-muted-foreground">{cgY}</span>
            </div>
            <input type="range" min={-20} max={20} step={1} value={cgY}
              onChange={(e) => setCgY(Number(e.target.value))}
              className="w-full accent-orange-500" />
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-xs font-semibold">CG Z (mm)</span>
              <span className="text-xs font-mono font-bold text-muted-foreground">{cgZ}</span>
            </div>
            <input type="range" min={-20} max={20} step={1} value={cgZ}
              onChange={(e) => setCgZ(Number(e.target.value))}
              className="w-full accent-orange-500" />
          </CardContent>
        </Card>
      </div>

      {/* Analogy */}
      <Card className="border-0 shadow-sm border-l-4 border-l-amber-400">
        <CardContent className="p-3 space-y-1">
          <h4 className="font-bold text-xs text-amber-700 flex items-center gap-1">
            <span>🏋️</span> Analogia: Levantar una caja sin saber su peso
          </h4>
          <p className="text-xs text-muted-foreground">
            Imagina que te piden levantar una caja cerrada. Si crees que pesa 1kg pero en realidad pesa 50kg, vas a lastimarte.
            El robot necesita saber exactamente cuanto pesa la herramienta para calcular la fuerza necesaria en cada articulacion.
            Si masa=0, el robot dice: <em>"No voy a mover nada porque no se que fuerza aplicar"</em> → Bloqueo por seguridad.
          </p>
        </CardContent>
      </Card>

      {/* Error diabolical warning */}
      <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs space-y-1">
        <p className="font-bold">💀 El "Error Diabolico"</p>
        <p>
          El error mas comun y peligroso es <strong>omitir la masa y el centro de gravedad</strong>.
          Si estos parametros son cero, el compilador NO lo detecta (la sintaxis es correcta), pero al ejecutar el programa
          el robot se <strong>bloquea inmediatamente por seguridad motriz</strong>.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SLIDE 29: Alineacion y Singularidades
   ═══════════════════════════════════════════════════════════════ */

export function SlideAlignment() {
  const [angle, setAngle] = useState(45);
  const [aligned, setAligned] = useState(false);
  const [showSingularity, setShowSingularity] = useState(false);

  const handleAlign = () => {
    setAligned(true);
    setAngle(0);
  };

  const handleReset = () => {
    setAligned(false);
    setAngle(45);
    setShowSingularity(false);
  };

  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Alineacion y Singularidades</h2>
      <p className="text-sm text-muted-foreground">
        Para tareas de contacto superficial, la herramienta debe permanecer perpendicular al plano. El eje Z de la herramienta debe ser "normal al plano".
      </p>

      {/* Alignment visualization */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <svg viewBox="0 0 400 200" className="w-full" role="img" aria-label="Visualizacion de alineacion">
            <rect width="400" height="200" fill="#f8fafc" rx="10" />

            {/* Work surface */}
            <rect x="80" y="140" width="240" height="8" rx="2" fill="#94a3b8" />
            <text x="200" y="165" textAnchor="middle" fill="#64748b" fontSize="9">Superficie de trabajo (WObjPina)</text>

            {/* Tool arm */}
            <g transform={`translate(200, 140) rotate(${-angle})`}>
              {/* Arm */}
              <rect x="-4" y="-80" width="8" height="80" rx="2" fill="#475569" />
              {/* Tool head */}
              <rect x="-10" y="-95" width="20" height="18" rx="3" fill="#1e293b" stroke={aligned ? '#22c55e' : angle === 0 ? '#22c55e' : '#f59e0b'} strokeWidth="2" />
              {/* Z-axis arrow */}
              <line x1="0" y1="-95" x2="0" y2="-120" stroke={aligned || angle === 0 ? '#22c55e' : '#ef4444'} strokeWidth="2" markerEnd="url(#zarrow)" />
              <text x="12" y="-115" fill={aligned || angle === 0 ? '#22c55e' : '#ef4444'} fontSize="9" fontWeight="bold">Z</text>
            </g>

            {/* Perpendicular reference */}
            <line x1="200" y1="140" x2="200" y2="40" stroke="#22c55e" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
            <text x="215" y="50" fill="#22c55e" fontSize="8" opacity="0.7">Perpendicular ideal</text>

            {/* Angle indicator */}
            {angle !== 0 && !aligned && (
              <>
                <path d="M 200 100 A 20 20 0 0 {angle > 0 ? 1 : 0} {200 + 20 * Math.sin(angle * Math.PI / 180)} {100 - 20 * Math.cos(angle * Math.PI / 180)}" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="225" y={100 - angle * 0.15} fill="#f59e0b" fontSize="9" fontWeight="bold">{angle}°</text>
              </>
            )}

            {/* Status */}
            <rect x="20" y="10" width="160" height="25" rx="4" fill={aligned || angle === 0 ? '#f0fdf4' : '#fffbeb'} stroke={aligned || angle === 0 ? '#22c55e' : '#f59e0b'} strokeWidth="1" />
            <text x="100" y="27" textAnchor="middle" fill={aligned || angle === 0 ? '#166534' : '#92400e'} fontSize="10" fontWeight="bold">
              {aligned || angle === 0 ? '✓ Perpendicular' : `⚠ Desalineado ${angle}°`}
            </text>

            <defs>
              <marker id="zarrow" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
                <polygon points="0,0 6,2 0,4" fill={aligned || angle === 0 ? '#22c55e' : '#ef4444'} />
              </marker>
            </defs>
          </svg>
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button onClick={() => setAngle(Math.max(0, angle - 5))} disabled={angle === 0 || aligned}
          className="px-3 py-1.5 rounded-lg text-sm bg-muted hover:bg-muted/80 disabled:opacity-40">-5°</button>
        <input type="range" min={0} max={90} step={5} value={angle} disabled={aligned}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="w-32 accent-orange-500" />
        <button onClick={() => setAngle(Math.min(90, angle + 5))} disabled={angle === 90 || aligned}
          className="px-3 py-1.5 rounded-lg text-sm bg-muted hover:bg-muted/80 disabled:opacity-40">+5°</button>
        <div className="w-px bg-border mx-1" />
        {!aligned ? (
          <button onClick={handleAlign} className="px-4 py-1.5 rounded-lg text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold">
            🎯 Alinear (Align)
          </button>
        ) : (
          <button onClick={handleReset} className="px-4 py-1.5 rounded-lg text-sm bg-muted font-semibold">
            Reiniciar
          </button>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Procedimiento real: Seleccionar $WObjPina$, mantener deadman switch + Start. El robot rota automaticamente hasta perpendicular.
      </p>

      {/* Singularity section */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 space-y-3">
          <button onClick={() => setShowSingularity(!showSingularity)} className="w-full flex items-center justify-between">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <span className="text-red-500">⚠</span> Singularidad de Muneca (Eje 5)
            </h4>
            <span className="text-xs text-muted-foreground">{showSingularity ? 'Ocultar' : 'Mostrar'}</span>
          </button>
          {showSingularity && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">
                Si durante la aproximacion el Eje 5 llega cerca de 0°, el movimiento lineal se <strong>bloquea</strong>.
                Es como intentar abrir una puerta cuyo bisagra esta en la misma linea que tu mano: no hay palanca.
              </p>
              <svg viewBox="0 0 400 80" className="w-full" role="img" aria-label="Singularidad eje 5">
                <rect width="400" height="80" fill="#f1f5f9" rx="6" />
                {/* Normal */}
                <g transform="translate(100, 40)">
                  <rect x="-3" y="-25" width="6" height="25" rx="1" fill="#475569" />
                  <rect x="-15" y="-35" width="30" height="12" rx="2" fill="#334155" />
                  <line x1="-3" y1="-5" x2="-3" y2="10" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                  <line x1="3" y1="-5" x2="3" y2="10" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                  <text x="0" y="30" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="bold">Eje 5 = 45° ✓</text>
                </g>
                {/* Singularity */}
                <g transform="translate(300, 40)">
                  <rect x="-3" y="-25" width="6" height="25" rx="1" fill="#475569" />
                  <rect x="-15" y="-35" width="30" height="12" rx="2" fill="#334155" />
                  <line x1="-3" y1="-5" x2="-3" y2="10" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                  <line x1="3" y1="-5" x2="3" y2="10" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                  <text x="0" y="35" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">Eje 5 ≈ 0° BLOQUEO</text>
                  <line x1="-20" y1="-40" x2="20" y2="-40" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,2" />
                </g>
                <text x="200" y="15" textAnchor="middle" fill="#64748b" fontSize="8">Los ejes se alinean → perdida de libertad → bloqueo</text>
              </svg>
              <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs">
                <strong>Solucion:</strong> Cambiar a modo Joint, rotar Eje 5 fuera de la zona critica, retomar movimiento lineal.
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SLIDE 30: Ejecucion y Verificacion (Code Exercise)
   ═══════════════════════════════════════════════════════════════ */

function SpeedGauge({ speed }: { speed: number }) {
  const angle = (speed / 100) * 180;
  const color = speed <= 25 ? '#22c55e' : speed <= 50 ? '#f59e0b' : speed <= 75 ? '#f97316' : '#ef4444';
  const label = speed <= 7 ? 'Muy Lento' : speed <= 25 ? 'Lento (recomendado)' : speed <= 50 ? 'Medio' : speed <= 75 ? 'Rapido' : 'MAX (peligroso)';
  const cx = 100, cy = 90, r = 70;

  return (
    <svg viewBox="0 0 200 130" className="w-48 mx-auto" role="img" aria-label="Velocimetro">
      <rect width="200" height="130" fill="#f8fafc" rx="8" />
      {/* Gauge background arc */}
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" />
      {/* Colored arc */}
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
        strokeDasharray={`${(angle / 180) * Math.PI * r} ${Math.PI * r}`} />
      {/* Needle */}
      <line x1={cx} y1={cy} x2={cx + (r - 15) * Math.cos(((180 - angle) * Math.PI) / 180)} y2={cy - (r - 15) * Math.sin(((180 - angle) * Math.PI) / 180)}
        stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="5" fill="#1e293b" />
      {/* Speed text */}
      <text x={cx} y={cy + 25} textAnchor="middle" fill={color} fontSize="18" fontWeight="bold">{speed}%</text>
      <text x={cx} y={cy + 38} textAnchor="middle" fill="#64748b" fontSize="8">{label}</text>
      {/* Scale marks */}
      {[0, 25, 50, 75, 100].map((v) => {
        const a = ((180 - (v / 100) * 180) * Math.PI) / 180;
        return (
          <text key={v} x={cx + (r + 10) * Math.cos(a)} y={cy - (r + 10) * Math.sin(a) + 3} textAnchor="middle" fill="#94a3b8" fontSize="7">{v}%</text>
        );
      })}
    </svg>
  );
}

export function SlideExecution() {
  const exercises = codeExercises[30] ?? [];
  const [speed, setSpeed] = useState(7);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const items = [
    { id: 'permisos', label: 'Acceso de escritura concedido (Grant)' },
    { id: 'backup', label: 'Backup completo generado' },
    { id: 'loaddata', label: 'Masa y CG verificados (no son 0)' },
    { id: 'sync', label: 'Identificadores reemplazados (tPina, wPina)' },
    { id: 'align', label: 'Comando Align ejecutado (perpendicular)' },
    { id: 'speed', label: `Velocidad al ${speed}% (recomendado: 7%-25%)` },
    { id: 'step', label: 'Modo Step-by-Step activado' },
    { id: 'contact', label: 'Primer contacto validado con presion correcta' },
  ];

  const allChecked = items.every((item) => checklist[item.id]);

  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Ejecucion y Verificacion</h2>
      <p className="text-sm text-muted-foreground">
        La primera ejecucion en el robot real es el momento mas critico. Velocidad baja, modo paso a paso, y validacion constante.
      </p>

      {/* Speed gauge */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 space-y-3">
          <h4 className="font-semibold text-sm text-center">Escalado de Velocidad</h4>
          <SpeedGauge speed={speed} />
          <div className="flex items-center justify-center gap-3 max-w-xs mx-auto">
            <button onClick={() => setSpeed(7)} className={`px-3 py-1 rounded text-xs font-bold ${speed === 7 ? 'bg-emerald-600 text-white' : 'bg-muted'}`}>7%</button>
            <button onClick={() => setSpeed(25)} className={`px-3 py-1 rounded text-xs font-bold ${speed === 25 ? 'bg-emerald-600 text-white' : 'bg-muted'}`}>25%</button>
            <button onClick={() => setSpeed(50)} className={`px-3 py-1 rounded text-xs font-bold ${speed === 50 ? 'bg-amber-600 text-white' : 'bg-muted'}`}>50%</button>
            <button onClick={() => setSpeed(100)} className={`px-3 py-1 rounded text-xs font-bold ${speed === 100 ? 'bg-red-600 text-white' : 'bg-muted'}`}>100%</button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            {speed <= 25
              ? '✓ Velocidad segura para primera ejecucion'
              : speed <= 50
                ? '⚠ Usar solo despues de validar la trayectoria'
                : '🚫 NO usar en primera ejecucion'}
          </p>
        </CardContent>
      </Card>

      {/* MoveJ vs MoveL approach */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <svg viewBox="0 0 400 100" className="w-full" role="img" aria-label="MoveJ vs MoveL approach">
            <rect width="400" height="100" fill="#f8fafc" rx="8" />
            {/* MoveJ - curved approach */}
            <circle cx="50" cy="50" r="8" fill="#f97316" />
            <text x="50" y="53" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">H</text>
            <path d="M 60 48 Q 120 10 200 45" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="6,3" />
            <circle cx="200" cy="45" r="6" fill="#f97316" opacity="0.5" />
            <text x="125" y="22" textAnchor="middle" fill="#f97316" fontSize="8" fontWeight="bold">MoveJ</text>
            <text x="125" y="32" textAnchor="middle" fill="#94a3b8" fontSize="7">(aproximacion rapida)</text>
            {/* MoveL - linear contact */}
            <line x1="200" y1="45" x2="300" y2="55" stroke="#22c55e" strokeWidth="2" />
            <circle cx="300" cy="55" r="8" fill="#22c55e" />
            <text x="300" y="58" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">P</text>
            <text x="250" y="40" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="bold">MoveL</text>
            <text x="250" y="50" textAnchor="middle" fill="#94a3b8" fontSize="7">(contacto lineal)</text>
            {/* Surface */}
            <line x1="180" y1="70" x2="380" y2="70" stroke="#94a3b8" strokeWidth="2" />
            <text x="280" y="82" textAnchor="middle" fill="#94a3b8" fontSize="7">Superficie de contacto</text>
            {/* Labels */}
            <text x="50" y="72" textAnchor="middle" fill="#94a3b8" fontSize="7">Home</text>
            <text x="300" y="72" textAnchor="middle" fill="#94a3b8" fontSize="7">Punto</text>
          </svg>
        </CardContent>
      </Card>

      {/* Teach Position analogy */}
      <Card className="border-0 shadow-sm border-l-4 border-l-cyan-400">
        <CardContent className="p-3 space-y-1">
          <h4 className="font-bold text-xs text-cyan-700 flex items-center gap-1">
            <span>🎯</span> Teach Position: Como marcar en el mapa con GPS
          </h4>
          <p className="text-xs text-muted-foreground">
            Imagina que en vez de escribir coordenadas GPS a mano, caminas hasta el lugar y presionas "Marcar ubicacion actual".
            Eso es Teach Position: llevas el robot fisicamente al punto deseado y presionas "Actualizar Posicion" en el FlexPendant.
            <strong> Es mucho mas preciso que escribir numeros.</strong>
          </p>
        </CardContent>
      </Card>

      {/* Interactive Checklist */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Checklist de Ejecucion Segura</h4>
            {allChecked && <span className="text-xs font-bold text-emerald-600">✓ Todo listo</span>}
          </div>
          <div className="space-y-1.5 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <label key={item.id} className="flex items-start gap-2 cursor-pointer group">
                <input type="checkbox" checked={checklist[item.id] ?? false}
                  onChange={(e) => setChecklist((prev) => ({ ...prev, [item.id]: e.target.checked }))}
                  className="mt-0.5 accent-emerald-500 rounded" />
                <span className={`text-xs ${checklist[item.id] ? 'text-emerald-700 line-through' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Code exercises */}
      {exercises.map((ex, i) => (
        <CodeExerciseComponent key={i} exercise={ex} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SLIDE 31: Quiz Transferencia
   ═══════════════════════════════════════════════════════════════ */

export function SlideQuizTransferencia() {
  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <QuizComponent questions={quizTransferencia} label="Transferencia" />
    </div>
  );
}
