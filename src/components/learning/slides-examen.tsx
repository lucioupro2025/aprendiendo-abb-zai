'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { QuizComponent } from './quiz-component';
import { CodeExerciseComponent } from './code-exercise-component';
import { codeExercises } from '@/lib/slide-data';
import { quizExamen } from '@/lib/slide-data';

/* ═══════════════════════════════════════════════════════════════
   SLIDE: MoveC (Circular Movement)
   ═══════════════════════════════════════════════════════════════ */

export function SlideMoveC() {
  const [activePoint, setActivePoint] = useState<number | null>(null);

  // SVG coordinates for the arc visualization
  // P1 (start) at left, P2 (CirPoint) at top, P3 (ToPoint) at right
  const p1 = { x: 60, y: 160 };
  const p2 = { x: 200, y: 30 };
  const p3 = { x: 340, y: 160 };

  // Calculate arc: we need the center of the circle passing through P1, P2, P3
  // Midpoints
  const mx12 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
  const mx23 = { x: (p2.x + p3.x) / 2, y: (p2.y + p3.y) / 2 };

  // Slopes
  const s12 = (p2.y - p1.y) / (p2.x - p1.x);
  const s23 = (p2.y - p3.y) / (p2.x - p3.x);

  // Perpendicular slope midpoints
  const ps12 = -1 / s12;
  const ps23 = -1 / s23;

  // Center of circle
  const cx = (ps23 * mx23.x - ps12 * mx12.x + mx12.y - mx23.y) / (ps23 - ps12);
  const cy = mx12.y + ps12 * (cx - mx12.x);
  const radius = Math.sqrt((cx - p1.x) ** 2 + (cy - p1.y) ** 2);

  // Arc angles
  const startAngle = Math.atan2(p1.y - cy, p1.x - cx);
  const midAngle = Math.atan2(p2.y - cy, p2.x - cx);
  const endAngle = Math.atan2(p3.y - cy, p3.x - cx);

  // Build SVG arc path using two arcs (through P2)
  const largeArc1 = Math.abs(midAngle - startAngle) > Math.PI ? 1 : 0;
  const sweepDir = endAngle > startAngle ? 1 : 0;

  const points = [
    {
      label: 'P1 (Inicio)',
      coord: p1,
      color: '#3b82f6',
      desc: 'Posicion actual del robot antes de ejecutar MoveC. Viene de la instruccion anterior (MoveJ o MoveL).',
      role: 'Punto de partida - no se especifica en MoveC',
    },
    {
      label: 'P2 (CirPoint)',
      coord: p2,
      color: '#f59e0b',
      desc: 'Punto intermedio por donde debe pasar el arco. Define la curvatura del movimiento circular.',
      role: 'Primer parametro de MoveC',
    },
    {
      label: 'P3 (ToPoint)',
      coord: p3,
      color: '#22c55e',
      desc: 'Punto destino final del movimiento circular. El robot termina su trayectoria aqui.',
      role: 'Segundo parametro de MoveC',
    },
  ];

  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">MoveC - Movimiento Circular</h2>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-100 text-violet-700 border border-violet-200">EXAMEN</span>
      </div>
      <p className="text-sm text-muted-foreground">
        El movimiento circular permite trazar arcos entre tres puntos. El robot ya debe estar en P1 antes de ejecutar la instruccion.
      </p>

      {/* Interactive SVG */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <svg viewBox="0 0 400 220" className="w-full" role="img" aria-label="Diagrama MoveC movimiento circular">
            <rect width="400" height="220" fill="#f8fafc" rx="10" />

            {/* Grid lines */}
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`vg${i}`} x1={i * 50} y1="0" x2={i * 50} y2="220" stroke="#e2e8f0" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
              <line key={`hg${i}`} x1="0" y1={i * 50 + 10} x2="400" y2={i * 50 + 10} stroke="#e2e8f0" strokeWidth="0.5" />
            ))}

            {/* Arc path - two segments P1→P2 and P2→P3 */}
            <path
              d={`M ${p1.x} ${p1.y} A ${radius} ${radius} 0 ${largeArc1} ${sweepDir} ${p2.x} ${p2.y} A ${radius} ${radius} 0 ${largeArc1} ${sweepDir} ${p3.x} ${p3.y}`}
              fill="none"
              stroke={activePoint !== null ? points[activePoint].color : '#64748b'}
              strokeWidth="3"
              strokeDasharray={activePoint === null ? 'none' : '6,4'}
              opacity={activePoint === null ? 0.8 : 1}
            />

            {/* Dashed reference lines to show circle center */}
            {activePoint !== null && (
              <line x1={cx} y1={cy} x2={points[activePoint].coord.x} y2={points[activePoint].coord.y}
                stroke={points[activePoint].color} strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
            )}

            {/* Points */}
            {points.map((pt, i) => (
              <g key={i}>
                {/* Glow effect when active */}
                {activePoint === i && (
                  <circle cx={pt.coord.x} cy={pt.coord.y} r="16" fill={pt.color} opacity="0.15" />
                )}
                <circle
                  cx={pt.coord.x} cy={pt.coord.y} r="8"
                  fill={activePoint === i ? pt.color : '#fff'}
                  stroke={pt.color} strokeWidth="3"
                  className="cursor-pointer transition-all"
                  onClick={() => setActivePoint(activePoint === i ? null : i)}
                />
                {/* Label */}
                <text x={pt.coord.x} y={pt.coord.y + 24} textAnchor="middle"
                  fill={activePoint === i ? pt.color : '#64748b'}
                  fontSize="10" fontWeight={activePoint === i ? 'bold' : 'normal'}>
                  {pt.label}
                </text>
              </g>
            ))}

            {/* Direction arrow */}
            <g transform={`translate(${p2.x + 20}, ${p2.y - 10})`}>
              <text fill="#64748b" fontSize="12">&#x279C;</text>
            </g>

            {/* Legend */}
            <rect x="10" y="5" width="180" height="22" rx="4" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
            <text x="16" y="20" fill="#64748b" fontSize="8">Haz clic en cada punto para ver su funcion</text>
          </svg>
        </CardContent>
      </Card>

      {/* Point selector buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {points.map((pt, i) => (
          <button
            key={i}
            onClick={() => setActivePoint(activePoint === i ? null : i)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
              activePoint === i
                ? `bg-white shadow-md`
                : 'bg-muted/50 hover:bg-muted'
            }`}
            style={{ borderColor: activePoint === i ? pt.color : 'transparent', color: activePoint === i ? pt.color : '#64748b' }}
          >
            {pt.label}
          </button>
        ))}
      </div>

      {/* Active point info */}
      {activePoint !== null && (
        <Card className="border-0 shadow-sm" style={{ borderLeft: `4px solid ${points[activePoint].color}` }}>
          <CardContent className="p-4 space-y-2">
            <h4 className="font-bold text-sm" style={{ color: points[activePoint].color }}>
              {points[activePoint].label}
            </h4>
            <p className="text-xs text-muted-foreground">{points[activePoint].desc}</p>
            <div className="inline-block px-2 py-1 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
              {points[activePoint].role}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Code example */}
      <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-amber-300">
        <pre className="whitespace-pre">{`// Movimiento circular: arco de P1 a P3 pasando por P2
MoveC CirPoint, ToPoint, v100, fine, tool1 \\WObj:=wPina;
// El robot ya debe estar en P1 (de la instruccion anterior)`}</pre>
      </div>

      {/* Comparison table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <h4 className="font-bold text-sm mb-3">Comparacion de Movimientos</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-3 text-muted-foreground font-semibold">Instruccion</th>
                  <th className="text-left py-2 pr-3 text-muted-foreground font-semibold">Tipo</th>
                  <th className="text-left py-2 pr-3 text-muted-foreground font-semibold">Parametros</th>
                  <th className="text-left py-2 text-muted-foreground font-semibold">Uso</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-dashed">
                  <td className="py-2 pr-3 font-mono font-bold text-blue-600">MoveJ</td>
                  <td className="py-2 pr-3">Joint (articulacion)</td>
                  <td className="py-2 pr-3 font-mono text-[10px]">ToPoint, velocidad, zona, tool</td>
                  <td className="py-2 text-muted-foreground">Rapido, no-lineal. Aproximaciones</td>
                </tr>
                <tr className="border-b border-dashed">
                  <td className="py-2 pr-3 font-mono font-bold text-emerald-600">MoveL</td>
                  <td className="py-2 pr-3">Lineal</td>
                  <td className="py-2 pr-3 font-mono text-[10px]">ToPoint, velocidad, zona, tool</td>
                  <td className="py-2 text-muted-foreground">Linea recta. Contacto con superficie</td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-mono font-bold text-amber-600">MoveC</td>
                  <td className="py-2 pr-3">Circular</td>
                  <td className="py-2 pr-3 font-mono text-[10px]">CirPoint, ToPoint, velocidad, zona, tool</td>
                  <td className="py-2 text-muted-foreground">Arcos y curvas</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Key note */}
      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
        <strong>Importante:</strong> MoveC no especifica el punto de inicio (P1). El robot debe llegar a P1 mediante una instruccion anterior (MoveJ o MoveL). Si el robot no esta en P1, la trayectoria sera incorrecta.
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SLIDE: Offs() Function for Exam
   ═══════════════════════════════════════════════════════════════ */

export function SlideOffsExamen() {
  const [activeCorner, setActiveCorner] = useState<number | null>(null);

  // Grid: 20x20mm square
  const originX = 80;
  const originY = 40;
  const gridSize = 120; // visual representation of 20mm
  const cornerSize = 24;

  // Corner positions (visual)
  const corners = [
    { x: originX, y: originY + gridSize, label: 'P_inicio', code: 'MoveL P_inicio', offs: '(0, 0, 0)', dx: 0, dy: 0, color: '#3b82f6', desc: 'Punto de referencia. Es el UNICO punto que grabas fisicamente.' },
    { x: originX + gridSize, y: originY + gridSize, label: 'Esquina 2', code: 'MoveL Offs(P_inicio, 20, 0, 0)', offs: '(+20, 0, 0)', dx: 20, dy: 0, color: '#f59e0b', desc: '+20mm en el eje X desde P_inicio. Lado superior del cuadrado.' },
    { x: originX + gridSize, y: originY, label: 'Esquina 3', code: 'MoveL Offs(P_inicio, 20, 20, 0)', offs: '(+20, +20, 0)', dx: 20, dy: 20, color: '#ef4444', desc: '+20mm en X y +20mm en Y. Esquina opuesta al inicio.' },
    { x: originX, y: originY, label: 'Esquina 4', code: 'MoveL Offs(P_inicio, 0, 20, 0)', offs: '(0, +20, 0)', dx: 0, dy: 20, color: '#22c55e', desc: '+20mm en Y desde P_inicio. Cierra el cuadrado.' },
  ];

  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">Offs() - Desfase de Puntos</h2>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200">EXAMEN</span>
      </div>
      <p className="text-sm text-muted-foreground">
        La funcion Offs() permite calcular posiciones a partir de un punto de referencia, sin necesidad de grabar cada punto fisicamente.
      </p>

      {/* Interactive SVG Grid */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <svg viewBox="0 0 360 220" className="w-full" role="img" aria-label="Diagrama Offs cuadrado 20x20mm">
            <rect width="360" height="220" fill="#f8fafc" rx="10" />

            {/* Grid lines (5mm divisions = visual 30px) */}
            {Array.from({ length: 5 }).map((_, i) => (
              <g key={`grid${i}`}>
                <line x1={originX + i * 30} y1={originY} x2={originX + i * 30} y2={originY + gridSize}
                  stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2,2" />
                <line x1={originX} y1={originY + i * 30} x2={originX + gridSize} y2={originY + i * 30}
                  stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2,2" />
              </g>
            ))}

            {/* Square outline */}
            <rect x={originX} y={originY} width={gridSize} height={gridSize}
              fill="none" stroke={activeCorner !== null ? corners[activeCorner].color : '#94a3b8'}
              strokeWidth="2" rx="2" />

            {/* 20mm labels */}
            <text x={originX + gridSize / 2} y={originY + gridSize + 20} textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="bold">20mm (X)</text>
            <text x={originX - 12} y={originY + gridSize / 2 + 4} textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="bold" transform={`rotate(-90, ${originX - 12}, ${originY + gridSize / 2})`}>20mm (Y)</text>

            {/* Axis arrows */}
            <line x1={originX - 30} y1={originY + gridSize + 5} x2={originX + gridSize + 20} y2={originY + gridSize + 5}
              stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrowX)" />
            <text x={originX + gridSize + 28} y={originY + gridSize + 9} fill="#3b82f6" fontSize="10" fontWeight="bold">X</text>

            <line x1={originX - 5} y1={originY + gridSize + 25} x2={originX - 5} y2={originY - 15}
              stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#arrowY)" />
            <text x={originX - 5} y={originY - 22} textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">Y</text>

            {/* Arrows markers */}
            <defs>
              <marker id="arrowX" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
                <polygon points="0,0 6,2 0,4" fill="#3b82f6" />
              </marker>
              <marker id="arrowY" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
                <polygon points="0,0 6,2 0,4" fill="#22c55e" />
              </marker>
            </defs>

            {/* Corners */}
            {corners.map((c, i) => (
              <g key={i} className="cursor-pointer" onClick={() => setActiveCorner(activeCorner === i ? null : i)}>
                {/* Animated highlight */}
                {activeCorner === i && (
                  <circle cx={c.x} cy={c.y} r={cornerSize + 8} fill={c.color} opacity="0.1">
                    <animate attributeName="r" values={`${cornerSize + 4};${cornerSize + 14};${cornerSize + 4}`} dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.15;0.05;0.15" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={c.x} cy={c.y} r={cornerSize / 2}
                  fill={activeCorner === i ? c.color : '#fff'}
                  stroke={c.color} strokeWidth="2.5" />
                {/* Corner label */}
                <text x={i === 0 ? c.x - 5 : i === 1 ? c.x + 5 : i === 2 ? c.x + 5 : c.x - 5}
                  y={i < 2 ? c.y + 22 : c.y - 14}
                  textAnchor="middle" fill={activeCorner === i ? c.color : '#64748b'}
                  fontSize="8" fontWeight={activeCorner === i ? 'bold' : 'normal'}>
                  {c.offs}
                </text>
              </g>
            ))}

            {/* Traversal path arrows */}
            <path d={`M ${corners[0].x + 10} ${corners[0].y - 5} L ${corners[1].x - 10} ${corners[1].y - 5}`}
              fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#pathArrow)" />
            <path d={`M ${corners[1].x + 5} ${corners[1].y - 10} L ${corners[2].x + 5} ${corners[2].y + 10}`}
              fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#pathArrow)" />
            <path d={`M ${corners[2].x - 10} ${corners[2].y + 5} L ${corners[3].x + 10} ${corners[3].y + 5}`}
              fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#pathArrow)" />
            <path d={`M ${corners[3].x - 5} ${corners[3].y + 10} L ${corners[0].x - 5} ${corners[0].y - 10}`}
              fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#pathArrow)" />
            <defs>
              <marker id="pathArrow" markerWidth="5" markerHeight="3" refX="5" refY="1.5" orient="auto">
                <polygon points="0,0 5,1.5 0,3" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </CardContent>
      </Card>

      {/* Corner selector buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {corners.map((c, i) => (
          <button
            key={i}
            onClick={() => setActiveCorner(activeCorner === i ? null : i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              activeCorner === i ? 'bg-white shadow-md' : 'bg-muted/50 hover:bg-muted'
            }`}
            style={{ borderColor: activeCorner === i ? c.color : 'transparent', color: activeCorner === i ? c.color : '#64748b' }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Corner code cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {corners.map((c, i) => (
          <Card key={i} className="border-0 shadow-sm transition-all" style={{
            borderLeft: `4px solid ${activeCorner === i ? c.color : '#e2e8f0'}`,
            opacity: activeCorner !== null && activeCorner !== i ? 0.5 : 1,
          }}>
            <CardContent className="p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold" style={{ color: c.color }}>{c.label}</span>
                <span className="text-[10px] text-muted-foreground font-mono">{c.offs}</span>
              </div>
              <div className="bg-slate-900 rounded p-2 font-mono text-[10px] text-amber-300">
                {c.code}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key benefit */}
      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
        <strong>Ventaja clave:</strong> Solo grabas 1 punto (P_inicio), calculas los demas con Offs(). Esto ahorra tiempo y reduce errores al transferir al robot real.
      </div>

      {/* Offs syntax */}
      <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs">
        <span className="text-slate-500">{'// Sintaxis general:'}</span>
        {'\n'}
        <span className="text-emerald-400">Offs</span>
        {'( robtarget, '}
        <span className="text-sky-400">X</span>
        {', '}
        <span className="text-sky-400">Y</span>
        {', '}
        <span className="text-sky-400">Z</span>
        {' )'}
        {'\n'}
        <span className="text-slate-500">{'// Desfasa el punto en +X, +Y, +Z milimetros'}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SLIDE: Safe Approach Technique (Aproximacion Segura)
   ═══════════════════════════════════════════════════════════════ */

export function SlideAproximacionSegura() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Paso 1: Aproximacion rapida (en el aire)',
      desc: 'Mover el robot a un punto 20mm POR ENCIMA de la superficie usando MoveJ a velocidad rapida.',
      code: 'MoveJ Offs(P_inicio, 0, 0, 20), v500, z10,\n     toolPina \\WObj:=wPina;',
      explain: 'MoveJ es rapido pero no lineal. Nos acercamos 20mm arriba con zona z10 (no precisa).',
      robotY: 50,
      surfaceY: 140,
      color: '#3b82f6',
      speed: 'v500',
      zone: 'z10',
      move: 'MoveJ',
    },
    {
      title: 'Paso 2: Descenso lento al contacto',
      desc: 'Bajar verticalmente hasta tocar la superficie con MoveL, velocidad lenta y zona fine.',
      code: 'MoveL P_inicio, v100, fine,\n     toolPina \\WObj:=wPina;',
      explain: 'MoveL es lineal y preciso. Bajamos lento (v100) con fine para asegurar el contacto exacto.',
      robotY: 135,
      surfaceY: 140,
      color: '#f59e0b',
      speed: 'v100',
      zone: 'fine',
      move: 'MoveL',
    },
    {
      title: 'Paso 3: Dibujar en la superficie',
      desc: 'Ejecutar los movimientos de dibujo (MoveL, MoveC) directamente sobre la superficie.',
      code: 'MoveL Offs(P_inicio, 20, 0, 0), v50, fine,\n     toolPina \\WObj:=wPina;',
      explain: 'Velocidad baja (v50) para dibujar con precision. Todos los movimientos en la superficie usan fine.',
      robotY: 138,
      surfaceY: 140,
      color: '#22c55e',
      speed: 'v50',
      zone: 'fine',
      move: 'MoveL',
    },
    {
      title: 'Paso 4: Retirada segura (20mm arriba)',
      desc: 'Subir 20mm para alejarse de la superficie antes de mover el robot a otro lugar.',
      code: 'MoveL Offs(P_inicio, 0, 0, 20), v100, fine,\n     toolPina \\WObj:=wPina;',
      explain: 'Retirada lenta y precisa. Nunca usar MoveJ estando cerca de la superficie.',
      robotY: 50,
      surfaceY: 140,
      color: '#8b5cf6',
      speed: 'v100',
      zone: 'fine',
      move: 'MoveL',
    },
  ];

  const current = steps[step];

  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">Aproximacion Segura</h2>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700 border border-red-200">CRITICO</span>
      </div>
      <p className="text-sm text-muted-foreground">
        Tecnica de 4 pasos para acercarse y retirarse de una superficie de forma segura. NUNCA vayas directo al pizarron con MoveJ rapido.
      </p>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-1">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-1">
            <button onClick={() => setStep(i)}
              className={`flex items-center justify-center size-8 rounded-full text-xs font-bold transition-all ${
                i === step ? 'bg-gradient-to-br from-red-500 to-orange-500 text-white scale-110 shadow-lg' :
                i < step ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground'
              }`}>
              {i < step ? '✓' : i + 1}
            </button>
            {i < steps.length - 1 && (
              <div className={`w-4 h-0.5 ${i < step ? 'bg-emerald-500' : 'bg-muted'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Interactive SVG */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <svg viewBox="0 0 360 200" className="w-full" role="img" aria-label="Visualizacion aproximacion segura">
            <rect width="360" height="200" fill="#f8fafc" rx="10" />

            {/* Surface / Whiteboard */}
            <rect x="40" y={current.surfaceY} width="280" height="12" rx="2" fill="#94a3b8" />
            <text x="180" y={current.surfaceY + 30} textAnchor="middle" fill="#64748b" fontSize="9">Pizarron / Superficie</text>

            {/* 20mm reference line */}
            <line x1="40" y1={current.surfaceY - 40} x2="320" y2={current.surfaceY - 40}
              stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,3" />
            <text x="325" y={current.surfaceY - 36} fill="#94a3b8" fontSize="8">+20mm</text>
            <line x1="36" y1={current.surfaceY - 40} x2="36" y2={current.surfaceY} stroke="#94a3b8" strokeWidth="1" />
            <text x="24" y={current.surfaceY - 15} fill="#94a3b8" fontSize="7">20</text>

            {/* Robot arm */}
            <g transform={`translate(180, ${current.robotY})`}>
              {/* Vertical arm */}
              <rect x="-4" y="-45" width="8" height="45" rx="2" fill="#334155" />
              {/* Tool head */}
              <rect x="-12" y="-55" width="24" height="14" rx="3" fill="#1e293b" stroke={current.color} strokeWidth="2" />
              {/* Pen/tip */}
              <line x1="0" y1="-41" x2="0" y2="-30" stroke={current.color} strokeWidth="3" strokeLinecap="round" />
              {/* Contact indicator */}
              {step >= 1 && step <= 2 && (
                <circle cx="0" cy="-30" r="3" fill={current.color} opacity="0.7">
                  <animate attributeName="r" values="2;4;2" dur="1s" repeatCount="indefinite" />
                </circle>
              )}
            </g>

            {/* Status badge */}
            <rect x="60" y="10" width="240" height="28" rx="4"
              fill={step === 0 ? '#dbeafe' : step === 1 ? '#fffbeb' : step === 2 ? '#f0fdf4' : '#f5f3ff'}
              stroke={current.color} strokeWidth="1" />
            <text x="180" y="29" textAnchor="middle" fill={current.color} fontSize="10" fontWeight="bold">
              {current.title.split(': ')[1] || current.title}
            </text>

            {/* Speed/Zone indicators */}
            <text x="60" y="185" fill="#64748b" fontSize="8">
              <tspan fontWeight="bold">Mov:</tspan> {current.move}
            </text>
            <text x="130" y="185" fill="#64748b" fontSize="8">
              <tspan fontWeight="bold">Vel:</tspan> {current.speed}
            </text>
            <text x="200" y="185" fill="#64748b" fontSize="8">
              <tspan fontWeight="bold">Zona:</tspan> {current.zone}
            </text>
          </svg>
        </CardContent>
      </Card>

      {/* Step content */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 space-y-3">
          <h3 className="font-bold text-sm" style={{ color: current.color }}>{current.title}</h3>
          <p className="text-xs text-muted-foreground">{current.desc}</p>

          {/* Code for this step */}
          <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-amber-300">
            {current.code}
          </div>

          {/* Explanation */}
          <div className="p-2 rounded-lg text-xs text-muted-foreground bg-slate-50">
            {current.explain}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
          className="px-3 py-1.5 rounded-lg text-sm border bg-muted hover:bg-muted/80 disabled:opacity-40 disabled:cursor-not-allowed">
          Anterior
        </button>
        {step < steps.length - 1 ? (
          <button onClick={() => setStep(step + 1)}
            className="px-4 py-1.5 rounded-lg text-sm bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold">
            Siguiente paso
          </button>
        ) : (
          <span className="px-4 py-1.5 rounded-lg text-sm bg-emerald-100 text-emerald-700 font-semibold">
            Tecnica completa ✓
          </span>
        )}
      </div>

      {/* Warning callout */}
      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
        <strong>Nunca vayas directo al pizarron con MoveJ rapido!</strong> Siempre usa la aproximacion en dos fases: MoveJ rapido en el aire + MoveL lento al contacto. Un MoveJ directo a la superficie puede causar una colision destructiva.
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SLIDE: Robtarget Data Structure
   ═══════════════════════════════════════════════════════════════ */

export function SlideRobtarget() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const components = [
    {
      title: 'Posicion',
      icon: '📍',
      color: '#3b82f6',
      fields: ['X: Coordenada horizontal', 'Y: Coordenada de profundidad', 'Z: Coordenada vertical (altura)'],
      example: 'X: 512.3, Y: 0.0, Z: 785.2',
      desc: 'Las coordenadas (X, Y, Z) definen DONDE esta el punto en el espacio 3D. Se expresan en milimetros.',
    },
    {
      title: 'Orientacion',
      icon: '🧭',
      color: '#f59e0b',
      fields: ['Q1: Rotacion eje 1', 'Q2: Rotacion eje 2', 'Q3: Rotacion eje 3', 'Q4: Rotacion eje 4'],
      example: 'Q1: 0.0, Q2: 0.0, Q3: 0.707, Q4: 0.707',
      desc: 'Los cuaterniones (Q1-Q4) definen HACIA DONDE mira la herramienta. Determinan la inclinacion del TCP.',
    },
    {
      title: 'Configuracion',
      icon: '⚙️',
      color: '#ef4444',
      fields: ['cf1: Configuracion del eje 1', 'cf4: Configuracion del eje 4', 'cf6: Configuracion del eje 6'],
      example: 'cf1: 0, cf4: 0, cf6: 0',
      desc: 'Los valores cf1, cf4, cf6 definen la POSTURA del robot (como estan dobladas las articulaciones). El mismo punto puede alcanzarse con posturas diferentes.',
    },
    {
      title: 'Ejes Externos',
      icon: '🔗',
      color: '#22c55e',
      fields: ['epos: Posicion de ejes externos', 'ej1-ej6: Valores de cada eje'],
      example: 'epos: epos_a1 := 0, epos_a2 := 0',
      desc: 'Coordina posicionamiento con ejes adicionales como posicionadores o transportadores. No se usa en el examen basico.',
    },
  ];

  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">Robtarget - Estructura de Datos</h2>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-100 text-violet-700 border border-violet-200">EXAMEN</span>
      </div>
      <p className="text-sm text-muted-foreground">
        Un robtarget es mucho mas que coordenadas. Incluye posicion, orientacion, configuracion de articulaciones y ejes externos.
      </p>

      {/* Visual breakdown */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <svg viewBox="0 0 400 130" className="w-full" role="img" aria-label="Estructura robtarget">
            <rect width="400" height="130" fill="#f8fafc" rx="10" />

            {/* Main robtarget box */}
            <rect x="80" y="10" width="240" height="110" rx="8" fill="#1e293b" />
            <text x="200" y="32" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">robtarget</text>

            {/* Component boxes */}
            <rect x="95" y="42" width="105" height="28" rx="4" fill="#3b82f6" opacity="0.9" />
            <text x="147" y="60" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Posicion (X,Y,Z)</text>

            <rect x="208" y="42" width="105" height="28" rx="4" fill="#f59e0b" opacity="0.9" />
            <text x="260" y="60" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Orientacion (Q1-Q4)</text>

            <rect x="95" y="76" width="105" height="28" rx="4" fill="#ef4444" opacity="0.9" />
            <text x="147" y="94" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Config (cf1,cf4,cf6)</text>

            <rect x="208" y="76" width="105" height="28" rx="4" fill="#22c55e" opacity="0.9" />
            <text x="260" y="94" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Ejes Externos</text>

            {/* Label */}
            <text x="200" y="125" textAnchor="middle" fill="#94a3b8" fontSize="8" fontStyle="italic">Haz clic en cada componente para ver los detalles</text>
          </svg>
        </CardContent>
      </Card>

      {/* Interactive expandable cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {components.map((comp, i) => (
          <Card key={i} className="border-0 shadow-sm cursor-pointer transition-all hover:shadow-md"
            style={{ borderLeft: `4px solid ${expanded === i ? comp.color : '#e2e8f0'}` }}
            onClick={() => setExpanded(expanded === i ? null : i)}>
            <CardContent className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{comp.icon}</span>
                  <h4 className="font-bold text-sm" style={{ color: comp.color }}>{comp.title}</h4>
                </div>
                <span className="text-xs text-muted-foreground">{expanded === i ? '▲' : '▼'}</span>
              </div>

              {expanded === i && (
                <div className="space-y-2 animate-in">
                  <p className="text-xs text-muted-foreground">{comp.desc}</p>
                  <div className="space-y-1">
                    {comp.fields.map((f, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: comp.color }} />
                        <span className="text-muted-foreground">{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-slate-900 rounded p-2 font-mono text-[10px] text-amber-300">
                    {comp.example}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full robtarget example */}
      <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-amber-300">
        <span className="text-slate-500">{'// Estructura completa de un robtarget:'}</span>
        {'\n'}
        <span className="text-sky-400">CONST robtarget</span> P_inicio := [ TRUE, {'\n'}
        {'  '}
        <span className="text-blue-400">{'[512.3, 0.0, 785.2]'}</span>
        <span className="text-slate-500">{'  ,  '}</span>
        <span className="text-amber-400">{'[0,0,0.707,0.707]'}</span>
        <span className="text-slate-500">{'  ,  '}</span>
        <span className="text-red-400">{'[0,0,0]'}</span>
        <span className="text-slate-500">{'  ,  '}</span>
        <span className="text-emerald-400">{'[9E9,9E9,9E9,9E9,9E9]'}{'  ]'}</span>
        <span className="text-slate-500">;</span>
      </div>

      {/* Key emphasis */}
      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
        <strong>Examen:</strong> Un robtarget no es solo coordenadas. Incluye postura y orientacion. Dos puntos con las mismas X, Y, Z pero diferente configuracion (cf) pueden ser inalcanzables o peligrosos.
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SLIDE: Dead Man's Switch (Hombre Muerto)
   ═══════════════════════════════════════════════════════════════ */

export function SlideHombreMuerto() {
  const [switchState, setSwitchState] = useState<'half' | 'released' | 'full'>('half');

  const states = {
    released: {
      label: 'SUELTO',
      status: 'PARADA',
      color: '#ef4444',
      bg: '#fef2f2',
      desc: 'Si sueltas el enabling device, el robot se detiene inmediatamente. Es un mecanismo de seguridad.',
      emoji: '🛑',
    },
    half: {
      label: 'MITAD PRESIONADO',
      status: 'OK - MOVIMIENTO',
      color: '#22c55e',
      bg: '#f0fdf4',
      desc: 'Presionando a la mitad, el robot puede moverse. Esta es la posicion correcta de operacion.',
      emoji: '✅',
    },
    full: {
      label: 'TODO ADENTRO',
      status: 'PARADA',
      color: '#ef4444',
      bg: '#fef2f2',
      desc: 'Si lo aprietas a FONDO (por nerviosismo), el robot se detiene. El switch tiene 3 posiciones, no 2.',
      emoji: '⛔',
    },
  };

  const current = states[switchState];

  // Visual switch position (0 = released, 0.5 = half, 1 = full)
  const switchPos = switchState === 'released' ? 0 : switchState === 'half' ? 0.5 : 1;

  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">Hombre Muerto (Enabling Device)</h2>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700 border border-red-200">SEGURIDAD</span>
      </div>
      <p className="text-sm text-muted-foreground">
        El enabling device (interruptor de habilitacion) es un switch de 3 posiciones en la parte trasera del teach pendant. Es fundamental para la seguridad del operador.
      </p>

      {/* Interactive SVG Switch */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <svg viewBox="0 0 400 200" className="w-full" role="img" aria-label="Diagrama enabling device hombre muerto">
            <rect width="400" height="200" fill="#f8fafc" rx="10" />

            {/* Teach pendant body */}
            <rect x="120" y="20" width="160" height="120" rx="12" fill="#334155" stroke="#475569" strokeWidth="2" />
            <text x="200" y="45" textAnchor="middle" fill="#94a3b8" fontSize="8">FLEXPENDANT</text>

            {/* Screen */}
            <rect x="145" y="52" width="110" height="40" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
            <text x="200" y="70" textAnchor="middle" fill="#64748b" fontSize="7">Modo Manual</text>
            <text x="200" y="83" textAnchor="middle" fill={current.color} fontSize="8" fontWeight="bold">{current.status}</text>

            {/* Switch housing */}
            <rect x="155" y="100" width="90" height="30" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />

            {/* Switch positions markers */}
            <line x1="175" y1="128" x2="175" y2="135" stroke="#94a3b8" strokeWidth="1" />
            <text x="175" y="145" textAnchor="middle" fill="#94a3b8" fontSize="7">Suelto</text>

            <line x1="200" y1="128" x2="200" y2="135" stroke="#94a3b8" strokeWidth="1" />
            <text x="200" y="145" textAnchor="middle" fill="#94a3b8" fontSize="7">Mitad</text>

            <line x1="225" y1="128" x2="225" y2="135" stroke="#94a3b8" strokeWidth="1" />
            <text x="225" y="145" textAnchor="middle" fill="#94a3b8" fontSize="7">Fondo</text>

            {/* Switch button */}
            <rect x={155 + 5 + switchPos * 70} y="103" width="25" height="24" rx="4"
              fill={current.color} stroke="white" strokeWidth="1.5" opacity="0.9">
              <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
            </rect>

            {/* Status indicator */}
            <rect x="50" y="160" width="300" height="28" rx="6"
              fill={current.bg} stroke={current.color} strokeWidth="1.5" />
            <text x="200" y="179" textAnchor="middle" fill={current.color} fontSize="11" fontWeight="bold">
              {current.emoji} {current.label}: {current.status}
            </text>
          </svg>
        </CardContent>
      </Card>

      {/* State selector buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {([
          { key: 'released' as const, label: 'Suelto', emoji: '🛑' },
          { key: 'half' as const, label: 'Mitad', emoji: '✅' },
          { key: 'full' as const, label: 'Todo adentro', emoji: '⛔' },
        ]).map((s) => (
          <button
            key={s.key}
            onClick={() => setSwitchState(s.key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border-2 ${
              switchState === s.key ? 'shadow-md' : 'hover:bg-muted/50'
            }`}
            style={{
              borderColor: switchState === s.key ? states[s.key].color : '#e2e8f0',
              color: switchState === s.key ? states[s.key].color : '#64748b',
              backgroundColor: switchState === s.key ? states[s.key].bg : 'transparent',
            }}
          >
            {s.emoji} {s.label}
          </button>
        ))}
      </div>

      {/* State description */}
      <Card className="border-0 shadow-sm" style={{ borderLeft: `4px solid ${current.color}` }}>
        <CardContent className="p-4 space-y-2">
          <h4 className="font-bold text-sm" style={{ color: current.color }}>
            {current.emoji} {current.label}
          </h4>
          <p className="text-xs text-muted-foreground">{current.desc}</p>
        </CardContent>
      </Card>

      {/* Critical warning */}
      <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm space-y-1">
        <p className="font-bold">Si lo aprietas a fondo por nerviosismo, el robot se detiene!</p>
        <p className="text-xs">
          El switch tiene <strong>3 posiciones</strong>, no 2. La posicion correcta es a la MITAD, no a fondo.
          Muchos principiantes por nerviosismo aprietan el switch completamente, lo que provoca una parada inmediata.
        </p>
      </div>

      {/* Exam tips */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 space-y-2">
          <h4 className="font-bold text-sm flex items-center gap-2">
            <span>📝</span> Tips para el Examen
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-0.5">•</span>
              <span>El enabling device esta en la <strong>parte trasera</strong> del teach pendant</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-0.5">•</span>
              <span>Tiene <strong>3 posiciones</strong>: suelto (parada), mitad (OK), fondo (parada)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-0.5">•</span>
              <span>Debe mantenerse presionado a la <strong>mitad</strong> mientras el robot se mueve</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-0.5">•</span>
              <span>Si lo sueltas O lo aprietas a fondo, el robot <strong>se detiene inmediatamente</strong></span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SLIDE: Complete Exam Code Example
   ═══════════════════════════════════════════════════════════════ */

export function SlideCodigoExamen() {
  const [activeLine, setActiveLine] = useState<number | null>(null);

  const codeLines = [
    {
      code: 'PROC main()',
      explain: 'Inicio del programa principal. Todo programa RAPID comienza con PROC main().',
      color: '#8b5cf6',
    },
    {
      code: '  // Paso 1: Aproximacion rapida 20mm arriba',
      explain: 'Comentario: primer paso es acercarse rapido en el aire, no directo al pizarron.',
      color: '#64748b',
    },
    {
      code: '  MoveJ Offs(P_inicio, 0, 0, 20), v500, z10,',
      explain: 'MoveJ rapido (v500) a 20mm sobre P_inicio. Zona z10 permite paso sin detenerse. Es la aproximacion segura en el aire.',
      color: '#3b82f6',
    },
    {
      code: '      toolPina \\WObj:=wPina;',
      explain: 'Continuacion: especifica la herramienta (toolPina) y el objeto de trabajo (wPina). Se pasan como parametros con barra invertida.',
      color: '#3b82f6',
    },
    {
      code: '',
      explain: '',
      color: 'transparent',
    },
    {
      code: '  // Paso 2: Descenso lento al contacto',
      explain: 'Comentario: bajamos lento y preciso hasta tocar la superficie del pizarron.',
      color: '#64748b',
    },
    {
      code: '  MoveL P_inicio, v100, fine,',
      explain: 'MoveL lineal lento (v100) con zona fine. El robot se detiene exactamente en P_inicio (sobre la superficie).',
      color: '#f59e0b',
    },
    {
      code: '      toolPina \\WObj:=wPina;',
      explain: 'Continuacion del MoveL: misma herramienta y work object.',
      color: '#f59e0b',
    },
    {
      code: '',
      explain: '',
      color: 'transparent',
    },
    {
      code: '  // Paso 3: Dibujar primer lado (+20mm en X)',
      explain: 'Comentario: empezamos a dibujar el cuadrado moviendonos 20mm en X.',
      color: '#64748b',
    },
    {
      code: '  MoveL Offs(P_inicio, 20, 0, 0), v50, fine,',
      explain: 'Primer lado del cuadrado: MoveL con Offs(+20,0,0) para avanzar 20mm en X. Velocidad baja (v50) para dibujar con precision.',
      color: '#22c55e',
    },
    {
      code: '      toolPina \\WObj:=wPina;',
      explain: 'Continuacion del MoveL del primer lado.',
      color: '#22c55e',
    },
    {
      code: '',
      explain: '',
      color: 'transparent',
    },
    {
      code: '  // Paso 4: Arco circular',
      explain: 'Comentario: dibujamos un arco usando MoveC.',
      color: '#64748b',
    },
    {
      code: '  MoveC CirPoint, ToPoint, v50, fine,',
      explain: 'MoveC circular: el arco pasa por CirPoint y termina en ToPoint. Velocidad v50, zona fine para precision en el dibujo.',
      color: '#ef4444',
    },
    {
      code: '      toolPina \\WObj:=wPina;',
      explain: 'Continuacion del MoveC: misma herramienta y work object.',
      color: '#ef4444',
    },
    {
      code: '',
      explain: '',
      color: 'transparent',
    },
    {
      code: '  // Paso 5: Retirada 20mm arriba',
      explain: 'Comentario: despues de dibujar, subimos 20mm para alejarnos de la superficie.',
      color: '#64748b',
    },
    {
      code: '  MoveL Offs(P_inicio, 0, 0, 20), v100, fine,',
      explain: 'Retirada: MoveL con Offs(+0,0,+20) para subir 20mm. Velocidad v100 (lento), zona fine. Seguro antes de mover el robot.',
      color: '#8b5cf6',
    },
    {
      code: '      toolPina \\WObj:=wPina;',
      explain: 'Continuacion de la retirada.',
      color: '#8b5cf6',
    },
    {
      code: 'ENDPROC',
      explain: 'Fin del programa principal. Todo PROC debe terminar con ENDPROC.',
      color: '#8b5cf6',
    },
  ];

  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">Codigo Completo del Examen</h2>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white border border-red-300">ESTILO DEL EXAMEN</span>
      </div>
      <p className="text-sm text-muted-foreground">
        Programa RAPID completo para dibujar un cuadrado con un arco en un pizarron. Haz clic en cada linea para ver la explicacion.
      </p>

      {/* Code with interactive lines */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs overflow-x-auto">
            {codeLines.map((line, i) => (
              <div
                key={i}
                onClick={() => line.explain && setActiveLine(activeLine === i ? null : i)}
                className={`${line.explain ? 'cursor-pointer hover:bg-slate-800 rounded px-1 -mx-1' : ''} transition-colors ${
                  activeLine === i ? 'bg-slate-800 rounded px-1 -mx-1' : ''
                }`}
              >
                <span className="inline-block w-6 text-right mr-3 text-slate-600 select-none text-[10px]">
                  {line.code ? `${i + 1}` : ''}
                </span>
                {line.code.startsWith('//') ? (
                  <span className="text-slate-500">{line.code}</span>
                ) : line.code.startsWith('PROC') || line.code === 'ENDPROC' ? (
                  <span className="text-sky-400">{line.code}</span>
                ) : line.code.startsWith('MoveJ') ? (
                  <span><span className="text-blue-400">{line.code.replace(/^(MoveJ)\b/, '$1')}</span></span>
                ) : line.code.startsWith('MoveL') ? (
                  <span className="text-emerald-400">{line.code}</span>
                ) : line.code.startsWith('MoveC') ? (
                  <span className="text-red-400">{line.code}</span>
                ) : line.code.trim() ? (
                  <span className="text-amber-300">{line.code}</span>
                ) : (
                  <span>{'\n'}</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Line explanation */}
      {activeLine !== null && codeLines[activeLine].explain && (
        <Card className="border-0 shadow-sm" style={{ borderLeft: `4px solid ${codeLines[activeLine].color}` }}>
          <CardContent className="p-4 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: codeLines[activeLine].color + '20', color: codeLines[activeLine].color }}>
                Linea {activeLine + 1}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{codeLines[activeLine].explain}</p>
          </CardContent>
        </Card>
      )}

      {/* Structure summary */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 space-y-2">
          <h4 className="font-bold text-sm">Estructura del programa</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="flex items-start gap-2 p-2 rounded bg-blue-50">
              <span className="font-bold text-blue-700">1.</span>
              <span className="text-blue-800">Aproximacion MoveJ (rapido, en el aire)</span>
            </div>
            <div className="flex items-start gap-2 p-2 rounded bg-amber-50">
              <span className="font-bold text-amber-700">2.</span>
              <span className="text-amber-800">Descenso MoveL (lento, al contacto)</span>
            </div>
            <div className="flex items-start gap-2 p-2 rounded bg-emerald-50">
              <span className="font-bold text-emerald-700">3.</span>
              <span className="text-emerald-800">Dibujo MoveL (primer lado del cuadrado)</span>
            </div>
            <div className="flex items-start gap-2 p-2 rounded bg-red-50">
              <span className="font-bold text-red-700">4.</span>
              <span className="text-red-800">Arco MoveC (CirPoint, ToPoint)</span>
            </div>
            <div className="flex items-start gap-2 p-2 rounded bg-violet-50">
              <span className="font-bold text-violet-700">5.</span>
              <span className="text-violet-800">Retirada MoveL (+20mm arriba)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code exercise */}
      {codeExercises[27] && (
        <CodeExerciseComponent exercise={codeExercises[27][0]} />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SLIDE: Final Exam Tips (Checklist)
   ═══════════════════════════════════════════════════════════════ */

export function SlideTipsExamen() {
  const initialChecks = [
    { id: 'rev', label: 'Cuentarrevoluciones actualizado', desc: 'Verificar que el contador de revoluciones este calibrado despues de cualquier corte de energia.' },
    { id: 'perm', label: 'Permisos de escritura concedidos', desc: 'Solicitar acceso desde RobotStudio y conceder con Grant en el FlexPendant.' },
    { id: 'backup', label: 'Backup realizado', desc: 'Crear un backup completo ANTES de cargar cualquier modulo. Es la unica ruta de restauracion.' },
    { id: 'vel', label: 'Primera ejecucion al 7%', desc: 'La primera vez que se ejecuta en el robot real, la velocidad debe ser maximo 7%.' },
    { id: 'step', label: 'Modo Step-by-Step', desc: 'Usar modo paso a paso para verificar cada instruccion antes de ejecucion continua.' },
    { id: 'verify', label: 'Verificar puntos sin chocar', desc: 'Ejecutar el programa a velocidad reducida y verificar que cada punto es correcto sin colisiones.' },
    { id: 'sync', label: 'Sincronizar con RAPID', desc: 'Asegurar que los modulos estan sincronizados correctamente en el controlador.' },
    { id: 'align', label: 'Alinear herramienta perpendicular', desc: 'La herramienta debe estar perpendicular a la superficie antes de grabar puntos.' },
  ];

  const [checks, setChecks] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checkedCount = Object.values(checks).filter(Boolean).length;
  const totalCount = initialChecks.length;
  const allChecked = checkedCount === totalCount;

  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">Tips para el Examen Practico</h2>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">CHECKLIST</span>
      </div>
      <p className="text-sm text-muted-foreground">
        Revisa cada punto antes de tu examen practico. Marca los que tengas listos.
      </p>

      {/* Progress */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Progreso de preparacion</span>
          <span className={`font-bold ${allChecked ? 'text-emerald-600' : 'text-muted-foreground'}`}>
            {checkedCount}/{totalCount}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${
              allChecked ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
            style={{ width: `${(checkedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-2">
        {initialChecks.map((item) => {
          const isChecked = checks[item.id] ?? false;
          return (
            <Card
              key={item.id}
              className={`border-0 shadow-sm cursor-pointer transition-all hover:shadow-md ${
                isChecked ? 'opacity-90' : ''
              }`}
              style={{
                borderLeft: `4px solid ${isChecked ? '#22c55e' : '#e2e8f0'}`,
              }}
              onClick={() => toggleCheck(item.id)}
            >
              <CardContent className="p-3 space-y-1">
                <div className="flex items-center gap-3">
                  {/* Custom checkbox */}
                  <div className={`flex items-center justify-center size-5 rounded border-2 transition-all shrink-0 ${
                    isChecked
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-slate-300 bg-white'
                  }`}>
                    {isChecked && (
                      <svg viewBox="0 0 12 12" className="size-3 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="2,6 5,9 10,3" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm font-medium transition-all ${
                    isChecked ? 'text-emerald-700 line-through' : 'text-foreground'
                  }`}>
                    {item.label}
                  </span>
                  {isChecked && (
                    <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">LISTO</span>
                  )}
                </div>
                <p className={`text-xs pl-8 transition-all ${
                  isChecked ? 'text-emerald-600' : 'text-muted-foreground'
                }`}>
                  {item.desc}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Completion message */}
      {allChecked && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm text-center space-y-2">
          <div className="text-3xl">🎉</div>
          <p className="font-bold text-lg">Estas listo para el examen!</p>
          <p className="text-xs text-emerald-600">
            Todos los puntos estan marcados. Recuerda mantener la calma y seguir el protocolo paso a paso.
          </p>
        </div>
      )}

      {/* Warning */}
      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
        <strong>Recuerda:</strong> En el examen practico, la seguridad es lo primero. Si no estas seguro de algo, pregunta al profesor antes de actuar.
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SLIDE: Comprehensive Exam Quiz
   ═══════════════════════════════════════════════════════════════ */

export function SlideQuizExamen() {
  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">Quiz Examen Practico</h2>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-violet-500 to-purple-500 text-white border border-violet-300">COMPLETO</span>
      </div>
      <p className="text-sm text-muted-foreground">
        Pon a prueba todo lo que aprendiste. Este quiz cubre todos los temas clave del examen practico de programacion ABB.
      </p>
      <QuizComponent questions={quizExamen} label="Examen Practico" />
    </div>
  );
}
