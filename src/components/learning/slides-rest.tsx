'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { QuizComponent } from './quiz-component';
import { CodeExerciseComponent } from './code-exercise-component';
import { quizWorkObjects, quizCalibracion, quizFinal, codeExercises } from '@/lib/slide-data';

/* ═══════════════════ SLIDE 13: MoveJ y MoveL ═══════════════════ */
export function SlideMoveJMoveL() {
  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Instrucciones MoveJ y MoveL</h2>
      <p className="text-sm text-muted-foreground">Las dos instrucciones principales para mover el robot en RAPID.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="border-0 shadow-sm">
          <div className="h-1 bg-gradient-to-r from-orange-500 to-amber-500" />
          <CardContent className="p-4 space-y-2">
            <h3 className="font-bold text-orange-600">MoveJ (Joint)</h3>
            <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-amber-300">
              MoveJ p10, v500, z50, tool1;
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Movimiento rapido en espacio de articulaciones</li>
              <li>• La trayectoria no es predecible</li>
              <li>• No requiere cinematica inversa al destino</li>
              <li>• Ideal para posiciones de inicio/fin</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
          <CardContent className="p-4 space-y-2">
            <h3 className="font-bold text-emerald-600">MoveL (Linear)</h3>
            <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-amber-300">
              MoveL p20, v200, fine, tool1;
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Movimiento en linea recta</li>
              <li>• Trayectoria predecible y precisa</li>
              <li>• Requiere cinematica inversa</li>
              <li>• Ideal para soldadura, pegado, trazado</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <h4 className="font-semibold text-sm mb-2">Parametros comunes</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1.5 pr-4 text-muted-foreground">Parametro</th>
                  <th className="text-left py-1.5 pr-4 text-muted-foreground">Ejemplo</th>
                  <th className="text-left py-1.5 text-muted-foreground">Descripcion</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                <tr className="border-b border-dashed"><td className="py-1.5 pr-4 font-bold">punto</td><td className="py-1.5 pr-4 text-amber-600">p10</td><td className="py-1.5 font-sans">Destino (robtarget)</td></tr>
                <tr className="border-b border-dashed"><td className="py-1.5 pr-4 font-bold">velocidad</td><td className="py-1.5 pr-4 text-amber-600">v200</td><td className="py-1.5 font-sans">mm/s (v50..v5000)</td></tr>
                <tr className="border-b border-dashed"><td className="py-1.5 pr-4 font-bold">zona</td><td className="py-1.5 pr-4 text-amber-600">z10 / fine</td><td className="py-1.5 font-sans">Radio de zona (fine = paro exacto)</td></tr>
                <tr><td className="py-1.5 pr-4 font-bold">herramienta</td><td className="py-1.5 pr-4 text-amber-600">tool1</td><td className="py-1.5 font-sans">TCP activo</td></tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ═══════════════════ SLIDE 14: Parámetros Interactivo ═══════════════════ */

/* ---------- Animated robot dot along waypoints ---------- */
function AnimatedRobotPath({ speed, zone }: { speed: number; zone: number }) {
  const dotRef = useRef<SVGCircleElement>(null);
  const innerRef = useRef<SVGCircleElement>(null);
  const animRef = useRef<number>(0);
  const progressRef = useRef(0);
  const trailRef = useRef<number[]>([]);

  const points = [
    { x: 50, y: 60, label: 'Inicio' },
    { x: 200, y: 60, label: 'P1' },
    { x: 350, y: 60, label: 'P2' },
  ];

  useEffect(() => {
    progressRef.current = 0;
    trailRef.current = [];

    function tick() {
      const duration = 6000 / (speed / 50);
      const step = 16 / duration;

      progressRef.current += step;
      if (progressRef.current >= 1) progressRef.current = 0;

      const currentProgress = progressRef.current;
      const segProgress = (currentProgress * 2) % 1;
      const segIndex = currentProgress < 0.5 ? 0 : 1;

      const p0 = points[segIndex];
      const p1 = points[segIndex + 1];

      let t = segProgress;
      if (zone === 0) {
        if (t < 0.6) {
          t = (t / 0.6) * 0.82;
        } else if (t < 0.85) {
          t = 0.82 + ((t - 0.6) / 0.25) * 0.05;
        } else {
          t = 0.87 + ((t - 0.85) / 0.15) * 0.13;
        }
      } else {
        const smooth = segProgress * segProgress * (3 - 2 * segProgress);
        const slowdown = zone < 5 ? 0.92 : zone < 20 ? 0.97 : 1;
        t = smooth * slowdown + segProgress * (1 - slowdown);
      }

      const cx = p0.x + (p1.x - p0.x) * t;
      const cy = p0.y + (p1.y - p0.y) * t;

      trailRef.current.push(cx);
      if (trailRef.current.length > 25) trailRef.current.shift();

      if (dotRef.current) {
        dotRef.current.setAttribute('cx', String(cx));
        dotRef.current.setAttribute('cy', String(cy));
      }
      if (innerRef.current) {
        innerRef.current.setAttribute('cx', String(cx));
        innerRef.current.setAttribute('cy', String(cy));
      }

      const trailGroup = document.getElementById('anim-trail');
      if (trailGroup) {
        trailGroup.innerHTML = trailRef.current
          .map((tx, i) => {
            const opacity = ((i + 1) / trailRef.current.length) * 0.5;
            const r = ((i + 1) / trailRef.current.length) * 3;
            return `<circle cx="${tx}" cy="60" r="${r}" fill="#f97316" opacity="${opacity}" />`;
          })
          .join('');
      }

      const speedText = document.getElementById('anim-speed');
      if (speedText) {
        let displaySpeed = speed;
        if (zone === 0) {
          if (t > 0.82 && t < 0.87) displaySpeed = Math.round(speed * 0.08);
          else if (t >= 0.6 && t <= 0.82) displaySpeed = Math.round(speed * 0.3);
        }
        speedText.textContent = `${displaySpeed} mm/s`;
      }

      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [speed, zone]);

  const zoneR = zone === 0 ? 0 : Math.min(zone * 0.5 + 5, 28);

  return (
    <svg viewBox="0 0 400 100" className="w-full" role="img" aria-label="Animacion de robot">
      <defs>
        <filter id="dot-glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="400" height="100" fill="#f8fafc" rx="8" />

      {/* Path line */}
      <line x1="50" y1="60" x2="350" y2="60" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6,4" />

      {/* Waypoints */}
      {points.map((p, i) => (
        <g key={i}>
          <text x={p.x} y="35" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">{p.label}</text>
          {i > 0 && zoneR > 0 && (
            <circle cx={p.x} cy="60" r={zoneR} fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="1" strokeDasharray="3,2" />
          )}
          {i > 0 && zone === 0 && (
            <circle cx={p.x} cy="60" r="8" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="1.5" />
          )}
          <circle cx={p.x} cy="60" r="4" fill={i === 0 ? '#f97316' : zone === 0 ? '#ef4444' : '#22c55e'} />
        </g>
      ))}

      {/* Trail */}
      <g id="anim-trail" />

      {/* Robot dot */}
      <circle ref={dotRef} cx="50" cy="60" r="8" fill="#f97316" filter="url(#dot-glow)" />
      <circle ref={innerRef} cx="50" cy="60" r="3" fill="white" />

      {/* Info text */}
      <text x="200" y="90" textAnchor="middle" fill="#64748b" fontSize="9">
        {zone === 0
          ? 'Con fine: el robot frena en cada punto (se detiene 0.5s)'
          : `Con z${zone}: el robot pasa sin detenerse`}
      </text>
      <text x="200" y="18" textAnchor="middle" fill="#f97316" fontSize="10" fontWeight="bold">
        Velocidad: <tspan id="anim-speed">{speed} mm/s</tspan>
      </text>
    </svg>
  );
}

export function SlideMovementParams() {
  const [speed, setSpeed] = useState(200);
  const [zone, setZone] = useState(10);

  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Parametros de Movimiento</h2>
      <p className="text-sm text-muted-foreground">Experimenta como cambian los parametros de velocidad y zona. La animacion arranca automaticamente.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Speed */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Velocidad</h4>
              <span className="font-mono text-sm font-bold text-orange-600">v{speed}</span>
            </div>
            <input type="range" min={50} max={1000} step={50} value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-orange-500" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>v50 (lento)</span><span>v1000 (rapido)</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Velocidad en mm/s. Para trayectoria de trabajo usar v100-v300. Para posiciones de transicion usar v500-v1000.
            </p>
          </CardContent>
        </Card>

        {/* Zone */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Zona</h4>
              <span className="font-mono text-sm font-bold text-emerald-600">{zone === 0 ? 'fine' : `z${zone}`}</span>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {[
                { label: 'fine', val: 0 },
                { label: 'z1', val: 1 },
                { label: 'z5', val: 5 },
                { label: 'z10', val: 10 },
                { label: 'z20', val: 20 },
                { label: 'z50', val: 50 },
              ].map((z) => (
                <button key={z.val} onClick={() => setZone(z.val)}
                  className={`px-2 py-1 rounded text-xs font-mono border transition-all ${zone === z.val ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-muted/50 border-transparent hover:bg-muted'}`}>
                  {z.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {zone === 0
                ? 'Fine: El robot se detiene exactamente en el punto. Usar cuando se necesita precision.'
                : `z${zone}: El robot pasa a ${zone}mm del punto sin detenerse. Reduce tiempo de ciclo.`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Animated visualization */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Animacion en tiempo real</h4>
            <div className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-xs text-muted-foreground">En vivo</span>
            </div>
          </div>
          <AnimatedRobotPath speed={speed} zone={zone} />
          <p className="text-xs text-muted-foreground">
            Cambia la velocidad y la zona para ver como se comporta el robot.
            {zone === 0
              ? ' Con fine, el robot desacelera y se detiene en cada punto.'
              : ' Con zona, el robot no se detiene y mantiene velocidad.'}
          </p>
        </CardContent>
      </Card>

      {/* Comparison table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <h4 className="font-semibold text-sm mb-3">Comparacion de zonas</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1.5 pr-3 text-muted-foreground">Zona</th>
                  <th className="text-left py-1.5 pr-3 text-muted-foreground">Comportamiento</th>
                  <th className="text-left py-1.5 text-muted-foreground">Uso tipico</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-dashed">
                  <td className="py-1.5 pr-3 font-mono font-bold text-red-600">fine</td>
                  <td className="py-1.5 pr-3">Se detiene exactamente</td>
                  <td className="py-1.5">Soldadura, pegado, pick &amp; place</td>
                </tr>
                <tr className="border-b border-dashed">
                  <td className="py-1.5 pr-3 font-mono font-bold text-emerald-600">z1 - z5</td>
                  <td className="py-1.5 pr-3">Pasa muy cerca</td>
                  <td className="py-1.5">Trabajo de precision</td>
                </tr>
                <tr className="border-b border-dashed">
                  <td className="py-1.5 pr-3 font-mono font-bold text-emerald-600">z10 - z20</td>
                  <td className="py-1.5 pr-3">No se detiene, pasa de largo</td>
                  <td className="py-1.5">Trayectorias generales</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-3 font-mono font-bold text-emerald-600">z50</td>
                  <td className="py-1.5 pr-3">Pasa lejos del punto</td>
                  <td className="py-1.5">Transicion rapida</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ═══════════════════ SLIDE 15: Completa el Codigo ═══════════════════ */
export function SlideCompleteCode() {
  const exercises = codeExercises[15] ?? [];
  return (
    <div className="space-y-4 p-4 md:p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Completa el Codigo RAPID</h2>
      <p className="text-sm text-muted-foreground">Selecciona la opcion correcta para cada espacio en blanco.</p>
      {exercises.map((ex, i) => (
        <CodeExerciseComponent key={i} exercise={ex} />
      ))}
    </div>
  );
}

/* ═══════════════════ SLIDE 16: Work Objects ═══════════════════ */
export function SlideWorkObjects() {
  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Objetos de Trabajo (WObj)</h2>
      <p className="text-sm text-muted-foreground">
        Un objeto de trabajo define un marco de referencia vinculado a un objeto fisico (como una mesa). Al conectar los puntos a un WObj, estos se mueven con el objeto.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="border-0 shadow-sm">
          <div className="h-1 bg-red-400" />
          <CardContent className="p-4">
            <h4 className="font-semibold text-sm text-red-700 mb-2">Sin WObj (wobj0)</h4>
            <svg viewBox="0 0 200 80" className="w-full mb-2">
              <rect width="200" height="80" fill="#fef2f2" rx="6" />
              <rect x="40" y="30" width="120" height="40" rx="3" fill="#fca5a5" />
              <text x="100" y="55" textAnchor="middle" fill="#991b1b" fontSize="9">Mesa (movida)</text>
              <line x1="160" y1="30" x2="180" y2="15" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arr)" />
              <text x="175" y="10" fill="#ef4444" fontSize="8">Los puntos quedan en el lugar viejo!</text>
              <defs><marker id="arr" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto"><polygon points="0,0 6,2 0,4" fill="#ef4444" /></marker></defs>
            </svg>
            <p className="text-xs text-muted-foreground">Si la mesa se mueve, los puntos no se actualizan. El programa falla.</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <div className="h-1 bg-emerald-400" />
          <CardContent className="p-4">
            <h4 className="font-semibold text-sm text-emerald-700 mb-2">Con WObj personalizado</h4>
            <svg viewBox="0 0 200 80" className="w-full mb-2">
              <rect width="200" height="80" fill="#f0fdf4" rx="6" />
              <rect x="40" y="30" width="120" height="40" rx="3" fill="#86efac" />
              <text x="100" y="55" textAnchor="middle" fill="#166534" fontSize="9">Mesa (movida)</text>
              <circle cx="40" cy="30" r="3" fill="#22c55e" />
              <circle cx="160" cy="30" r="3" fill="#22c55e" />
              <circle cx="160" cy="70" r="3" fill="#22c55e" />
              <text x="100" y="15" textAnchor="middle" fill="#22c55e" fontSize="8">Los puntos se mueven con la mesa!</text>
            </svg>
            <p className="text-xs text-muted-foreground">Los puntos viajan con el objeto. El programa sigue funcionando.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <h4 className="font-semibold text-sm mb-2">Pasos para crear un WObj</h4>
          <ol className="space-y-1 text-xs text-muted-foreground list-decimal list-inside">
            <li>Crear un objeto de trabajo y ubicarlo en una esquina de la mesa</li>
            <li>Referenciar los puntos de la mesa al objeto de trabajo creado</li>
            <li>Conectar el objeto de trabajo con la mesa</li>
            <li>Verificar que \\WObj coincida en MoveJ y MoveL</li>
            <li>Sincronizar la estacion con el programa y simular</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}

/* ═══════════════════ SLIDE 17: Creando WObj ═══════════════════ */
export function SlideCreateWorkObject() {
  const exercises = codeExercises[17] ?? [];
  return (
    <div className="space-y-4 p-4 md:p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Creando un WorkObject</h2>
      <p className="text-sm text-muted-foreground">Practica usando WObj en instrucciones de movimiento.</p>
      {exercises.map((ex, i) => (
        <CodeExerciseComponent key={i} exercise={ex} />
      ))}
    </div>
  );
}

/* ═══════════════════ SLIDE 18: Quiz Work Objects ═══════════════════ */
export function SlideQuizWorkObjects() {
  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <QuizComponent questions={quizWorkObjects} label="Work Objects" />
    </div>
  );
}

/* ═══════════════════ SLIDE 19: Trayectorias ═══════════════════ */
export function SlideCreatingPaths() {
  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Creando Trayectorias</h2>
      <p className="text-sm text-muted-foreground">Una trayectoria es una secuencia ordenada de puntos que el robot recorre.</p>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <svg viewBox="0 0 400 160" className="w-full" role="img" aria-label="Trayectoria">
            <rect width="400" height="160" fill="#f8fafc" rx="8" />
            {/* Points */}
            {[
              { label: 'Home', x: 50, y: 80 },
              { label: 'P1', x: 120, y: 40 },
              { label: 'P2', x: 200, y: 120 },
              { label: 'P3', x: 280, y: 40 },
              { label: 'P4', x: 350, y: 120 },
            ].map((p, i, arr) => {
              const next = arr[i + 1];
              const isJoint = i < 2;
              return (
                <g key={p.label}>
                  {next && (
                    <line x1={p.x} y1={p.y} x2={next.x} y2={next.y}
                      stroke={isJoint ? '#f97316' : '#22c55e'}
                      strokeWidth="2" strokeDasharray={isJoint ? '6,3' : 'none'} />
                  )}
                  <circle cx={p.x} cy={p.y} r="10" fill={isJoint ? '#fff7ed' : '#f0fdf4'} stroke={isJoint ? '#f97316' : '#22c55e'} strokeWidth="1.5" />
                  <text x={p.x} y={p.y + 3.5} textAnchor="middle" fill={isJoint ? '#ea580c' : '#166534'} fontSize="8" fontWeight="bold">{p.label}</text>
                </g>
              );
            })}
            {/* Legend */}
            <line x1="20" y1="150" x2="40" y2="150" stroke="#f97316" strokeWidth="2" strokeDasharray="6,3" />
            <text x="45" y="153" fill="#f97316" fontSize="8">Joint</text>
            <line x1="80" y1="150" x2="100" y2="150" stroke="#22c55e" strokeWidth="2" />
            <text x="105" y="153" fill="#22c55e" fontSize="8">Lineal</text>
          </svg>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 space-y-3">
          <h4 className="font-semibold text-sm">Ejemplo de configuracion (TP1)</h4>
          <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-amber-300 space-y-1">
            <p>Orden: Home → P1 → P2 → P3 → P4</p>
            <p>Movimiento: Home, P1 (Joint); P2, P3, P4 (Lineal)</p>
            <p>Zona: 10</p>
            <p>Velocidad: 200 mm/s</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <h4 className="font-semibold text-sm mb-2">Pasos para crear una trayectoria</h4>
          <ol className="space-y-1.5 text-xs text-muted-foreground">
            <li className="flex gap-2"><span className="font-bold text-foreground w-5">1.</span> Crear puntos en cada posicion deseada (esquinas, centros, etc.)</li>
            <li className="flex gap-2"><span className="font-bold text-foreground w-5">2.</span> Asignar nombres significativos (P1, P2, Home, etc.)</li>
            <li className="flex gap-2"><span className="font-bold text-foreground w-5">3.</span> Definir la secuencia: Home → P1 → P2 → ... → Home</li>
            <li className="flex gap-2"><span className="font-bold text-foreground w-5">4.</span> Configurar tipo de movimiento (Joint/Lineal) por punto</li>
            <li className="flex gap-2"><span className="font-bold text-foreground w-5">5.</span> Ajustar zona y velocidad</li>
            <li className="flex gap-2"><span className="font-bold text-foreground w-5">6.</span> Verificar alcanzabilidad y simular</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}

/* ═══════════════════ SLIDE 20: Programa Trayectorias ═══════════════════ */
export function SlideProgramPaths() {
  const exercises = codeExercises[20] ?? [];
  return (
    <div className="space-y-4 p-4 md:p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Programa con Trayectorias</h2>
      <p className="text-sm text-muted-foreground">Ejercicios de programacion con trayectorias y desfase.</p>
      {exercises.map((ex, i) => (
        <CodeExerciseComponent key={i} exercise={ex} />
      ))}
    </div>
  );
}

/* ═══════════════════ SLIDE 21: Calibracion ═══════════════════ */
export function SlideCalibrationCounter() {
  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Calibracion: Contador de Revoluciones</h2>
      <p className="text-sm text-muted-foreground">
        Los encoders absolutos conocen la posicion angular dentro de los 360°, pero no saben cuantas vueltas dio el motor (gracias al reductor de velocidad).
      </p>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <svg viewBox="0 0 400 140" className="w-full" role="img" aria-label="Diagrama de calibracion">
            <rect width="400" height="140" fill="#f8fafc" rx="8" />
            {/* Flow: Encoder → Motor+Reductor → Problema → Solucion */}
            <rect x="10" y="40" width="80" height="50" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="50" y="62" textAnchor="middle" fill="#1e40af" fontSize="9" fontWeight="bold">Encoder</text>
            <text x="50" y="76" textAnchor="middle" fill="#3b82f6" fontSize="8">posicion en 360°</text>

            <line x1="90" y1="65" x2="120" y2="65" stroke="#94a3b8" strokeWidth="1.5" />

            <rect x="120" y="40" width="100" height="50" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="170" y="58" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="bold">Motor + Reductor</text>
            <text x="170" y="76" textAnchor="middle" fill="#f59e0b" fontSize="8">¿Cuantas vueltas?</text>

            <line x1="220" y1="65" x2="250" y2="65" stroke="#ef4444" strokeWidth="1.5" />

            <rect x="250" y="40" width="70" height="50" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
            <text x="285" y="58" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="bold">RAM</text>
            <text x="285" y="76" textAnchor="middle" fill="#ef4444" fontSize="8">cuenta vueltas</text>

            <line x1="320" y1="65" x2="345" y2="65" stroke="#22c55e" strokeWidth="1.5" />

            <rect x="345" y="40" width="45" height="50" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
            <text x="367" y="58" textAnchor="middle" fill="#166534" fontSize="9" fontWeight="bold">Pila</text>
            <text x="367" y="76" textAnchor="middle" fill="#22c55e" fontSize="8"> alimenta</text>

            {/* Problem label */}
            <text x="170" y="115" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">⚠ Problema: Encoder no cuenta vueltas</text>
            <text x="170" y="130" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">✓ Solucion: RAM + Pila mantienen la cuenta</text>
          </svg>
        </CardContent>
      </Card>

      <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-sm">
        <strong>Por que es necesario calibrar?</strong> Si la bateria se descarga o hay una falla, la RAM pierde la cuenta de revoluciones y el robot no sabe donde esta. Hay que repetir el proceso de calibracion.
      </div>
    </div>
  );
}

/* ═══════════════════ SLIDE 22: Pasos de Calibracion ═══════════════════ */
export function SlideCalibrationSteps() {
  const [step, setStep] = useState(0);
  const steps = [
    { title: 'Llevar articulaciones a cero', desc: 'Mueve manualmente el robot en modo Joint y ubica cada eje donde coincidan las marcas fisicas.' },
    { title: 'Ir a Calibracion', desc: 'En el teach pendant, navega al menu principal y selecciona "Calibrar".' },
    { title: 'Cuentarrevoluciones', desc: 'Despliega "Metodos de calibracion" y selecciona "Cuentarrevoluciones".' },
    { title: 'Actualizar', desc: 'Selecciona todos los ejes y presiona "Actualizar". Espera el mensaje de exito.' },
  ];

  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Pasos de Calibracion</h2>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2">
        {steps.map((_, i) => (
          <button key={i} onClick={() => setStep(i)}
            className={`flex items-center justify-center size-9 rounded-full text-sm font-bold transition-all ${i === step ? 'bg-gradient-to-br from-rose-500 to-pink-500 text-white scale-110 shadow-lg' : i < step ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground'}`}>
            {i < step ? '✓' : i + 1}
          </button>
        ))}
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base">{steps[step].title}</h3>
            <span className="text-xs text-muted-foreground">Paso {step + 1} de {steps.length}</span>
          </div>
          <p className="text-sm text-muted-foreground">{steps[step].desc}</p>

          {/* Step visual */}
          <div className="bg-slate-900 rounded-lg p-4 text-white">
            {step === 0 && (
              <div className="text-center space-y-2">
                <svg viewBox="0 0 200 100" className="w-48 mx-auto">
                  <rect x="60" y="60" width="80" height="25" rx="3" fill="#64748b" />
                  <line x1="100" y1="60" x2="100" y2="30" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="100" cy="60" r="5" fill="#ef4444" />
                  <circle cx="100" cy="30" r="4" fill="#ef4444" />
                  <text x="118" y="28" fill="#ef4444" fontSize="8">MARCA 0</text>
                  <text x="118" y="58" fill="#ef4444" fontSize="8">MARCA 0</text>
                </svg>
                <p className="text-xs text-slate-400">Ubicar cada eje en su marca de cero</p>
              </div>
            )}
            {step === 1 && (
              <div className="text-center space-y-2">
                <div className="inline-block bg-slate-800 rounded-lg p-4 text-left font-mono text-xs">
                  <p className="text-slate-400">Menu Principal</p>
                  <p className="text-emerald-400 mt-1">► Calibracion</p>
                  <p className="text-slate-500">  Control</p>
                  <p className="text-slate-500">  Configuracion</p>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="text-center space-y-2">
                <div className="inline-block bg-slate-800 rounded-lg p-4 text-left font-mono text-xs">
                  <p className="text-slate-400">Metodos de Calibracion:</p>
                  <p className="text-slate-500">  Calibrar posicion...</p>
                  <p className="text-emerald-400 mt-1">► Cuentarrevoluciones</p>
                  <p className="text-slate-500">  Calibrar cargas...</p>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="text-center space-y-2">
                <div className="inline-block bg-slate-800 rounded-lg p-4 text-left font-mono text-xs space-y-1">
                  <p className="text-emerald-400">☑ Eje 1</p>
                  <p className="text-emerald-400">☑ Eje 2</p>
                  <p className="text-emerald-400">☑ Eje 3</p>
                  <p className="text-emerald-400">☑ Eje 4</p>
                  <p className="text-emerald-400">☑ Eje 5</p>
                  <p className="text-emerald-400">☑ Eje 6</p>
                  <p className="text-center mt-3 bg-emerald-600 text-white rounded py-1.5 font-bold">Actualizar</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-1">
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
              className="px-3 py-1.5 rounded-lg text-sm border border-transparent bg-muted hover:bg-muted/80 disabled:opacity-40 disabled:cursor-not-allowed">
              Atras
            </button>
            {step < steps.length - 1 ? (
              <button onClick={() => setStep(step + 1)}
                className="px-3 py-1.5 rounded-lg text-sm bg-gradient-to-r from-rose-500 to-pink-500 text-white">
                Siguiente paso
              </button>
            ) : (
              <span className="px-3 py-1.5 rounded-lg text-sm bg-emerald-100 text-emerald-700 font-semibold">
                ✓ Calibracion completada
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ═══════════════════ SLIDE 23: Quiz Calibracion ═══════════════════ */
export function SlideQuizCalibracion() {
  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <QuizComponent questions={quizCalibracion} label="Calibracion" />
    </div>
  );
}

/* ═══════════════════ SLIDE 24: Triangulo Equilatero ═══════════════════ */
export function SlideTriangleCenter() {
  const [L, setL] = useState(200);
  const h = (L * Math.sqrt(3)) / 2;
  const r = L / 3;
  const y0 = r; // center to base = r

  const vertices = [
    { label: 'V1', x: 0, y: -(2 * r) },
    { label: 'V2', x: -(L / 2), y: r },
    { label: 'V3', x: L / 2, y: r },
  ];

  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Centro del Triangulo Equilatero</h2>
      <p className="text-sm text-muted-foreground">Arrastra el slider para cambiar el lado L y ver como se calculan las coordenadas del centro y los vertices.</p>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-sm">Lado (L)</h4>
            <span className="font-mono text-sm font-bold text-emerald-600">{L} mm</span>
          </div>
          <input type="range" min={80} max={300} step={10} value={L}
            onChange={(e) => setL(Number(e.target.value))}
            className="w-full accent-emerald-500" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>80mm</span><span>300mm</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <svg viewBox="-180 -160 360 280" className="w-full max-w-md mx-auto">
            <rect x="-180" y="-160" width="360" height="280" fill="#f8fafc" rx="8" />
            {/* Triangle */}
            <polygon points={`${vertices[0].x},${vertices[0].y} ${vertices[1].x},${vertices[1].y} ${vertices[2].x},${vertices[2].y}`}
              fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
            {/* Height line */}
            <line x1="0" y1={vertices[0].y} x2="0" y2={vertices[1].y} stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5,3" />
            <text x="8" y={(vertices[0].y + vertices[1].y) / 2} fill="#3b82f6" fontSize="10">h={h.toFixed(1)}</text>
            {/* r line */}
            <line x1="0" y1="0" x2="0" y2={vertices[1].y} stroke="#f97316" strokeWidth="1.5" strokeDasharray="5,3" />
            <text x="8" y={r / 2} fill="#f97316" fontSize="10">r={r.toFixed(1)}</text>
            {/* Center */}
            <circle cx="0" cy="0" r="4" fill="#ef4444" />
            <text x="10" y="-5" fill="#ef4444" fontSize="10" fontWeight="bold">Centro (0,0)</text>
            {/* Vertices */}
            {vertices.map((v) => (
              <g key={v.label}>
                <circle cx={v.x} cy={v.y} r="4" fill="#1e293b" />
                <text x={v.x + (v.x > 0 ? 8 : v.x < 0 ? -40 : 8)} y={v.y - 8} fill="#1e293b" fontSize="10" fontWeight="bold">
                  {v.label}({v.x},{-v.y})
                </text>
              </g>
            ))}
          </svg>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <h4 className="font-semibold text-sm mb-2">Formulas</h4>
          <div className="space-y-1 font-mono text-xs">
            <p>h = L × √3 / 2 = <span className="text-primary font-bold">{L} × {Math.sqrt(3).toFixed(4)} / 2 = {h.toFixed(2)}</span></p>
            <p>r = L / 3 = <span className="text-primary font-bold">{L} / 3 = {r.toFixed(2)}</span></p>
            <p>V1 = (0, {-((2 * r)).toFixed(2)})  (arriba)</p>
            <p>V2 = ({(-(L / 2)).toFixed(2)}, {r.toFixed(2)})  (abajo-izquierda)</p>
            <p>V3 = ({(L / 2).toFixed(2)}, {r.toFixed(2)})  (abajo-derecha)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ═══════════════════ SLIDE 25: Dibujando con Robot ═══════════════════ */
export function SlideDrawingRobot() {
  const exercises = codeExercises[25] ?? [];
  return (
    <div className="space-y-4 p-4 md:p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Dibujando con el Robot</h2>
      <p className="text-sm text-muted-foreground">Ejercicios de programacion avanzada.</p>
      {exercises.map((ex, i) => (
        <CodeExerciseComponent key={i} exercise={ex} />
      ))}
    </div>
  );
}

/* ═══════════════════ SLIDE 26: Resumen ═══════════════════ */
export function SlideSummary() {
  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Resumen General</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { section: 'Movimientos', color: 'from-orange-500 to-red-500', points: ['Joint: mueve ejes independiente', 'Lineal: movimiento en linea recta', 'Reorientacion: gira la herramienta'] },
          { section: 'Coordenadas', color: 'from-emerald-500 to-teal-500', points: ['Base: origen en la base del robot', 'Mundo: referencia absoluta', 'Objeto: vinculado al workobject', 'Herramienta: en el TCP'] },
          { section: 'RAPID', color: 'from-violet-500 to-purple-500', points: ['MoveJ: movimiento joint', 'MoveL: movimiento lineal', 'Parametros: velocidad, zona, herramienta'] },
          { section: 'Work Objects', color: 'from-sky-500 to-cyan-500', points: ['WObj personalizado vs wobj0', 'Puntos se mueven con el objeto', 'Parametro \\WObj en MoveJ/MoveL'] },
          { section: 'Trayectorias', color: 'from-amber-500 to-yellow-500', points: ['Secuencia ordenada de puntos', 'Joint para transicion, Lineal para trabajo', 'Zona fine para precision'] },
          { section: 'Calibracion', color: 'from-rose-500 to-pink-500', points: ['Encoder no cuenta vueltas del motor', 'RAM + Pila mantienen la cuenta', 'Calibrar: marcas → menu → actualizar'] },
          { section: 'Figuras', color: 'from-lime-500 to-green-500', points: ['h = L×√3/2, r = L/3', 'Vertices relativos al centro', 'Usar Offs para desfase'] },
          { section: 'Repaso', color: 'from-slate-500 to-zinc-500', points: ['WaitTime para esperas', 'Offs para desfase de puntos', 'PROC/ENDPROC estructura RAPID'] },
        ].map((s) => (
          <Card key={s.section} className="border-0 shadow-sm overflow-hidden">
            <div className={`h-1 bg-gradient-to-r ${s.color}`} />
            <CardContent className="p-3">
              <h4 className="font-semibold text-sm mb-1.5">{s.section}</h4>
              <ul className="space-y-0.5">
                {s.points.map((p, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex gap-1.5">
                    <span className="text-primary mt-0.5">•</span>{p}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════ SLIDE 27: Quiz Final ═══════════════════ */
export function SlideQuizFinal() {
  return (
    <div className="space-y-4 p-4 md:p-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Quiz Final</h2>
        <p className="text-muted-foreground text-sm">Pon a prueba todo lo que aprendiste!</p>
      </div>
      <QuizComponent questions={quizFinal} label="Final" />
    </div>
  );
}
