'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuizComponent } from './quiz-component';
import { quizMovimientos, quizCoordenadas, quizMap } from '@/lib/slide-data';

/* ───────────────────────── SLIDE 2 ───────────────────────── */
export function SlideMovimientosOverview() {
  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Modos de Movimiento</h2>
      <p className="text-sm text-muted-foreground">
        Todo manipulador industrial posee los mismos modos de movimiento: movimiento de ejes, movimiento lineal y movimiento de reorientacion.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        {[
          {
            title: 'Joint (Ejes)',
            desc: 'Mueve cada articulacion de manera independiente. Es el modo basico, usado cuando el lineal esta bloqueado y para calibraciones.',
            color: 'from-orange-500 to-amber-500',
          },
          {
            title: 'Lineal',
            desc: 'Mueve el TCP en linea recta entre dos puntos. Ideal para trayectorias precisas como soldadura o pegado.',
            color: 'from-emerald-500 to-teal-500',
          },
          {
            title: 'Reorientacion',
            desc: 'Rota la herramienta alrededor de un eje manteniendo la posicion. Util para reorientar sin moverse.',
            color: 'from-violet-500 to-purple-500',
          },
        ].map((m) => (
          <Card key={m.title} className="border-0 shadow-sm overflow-hidden">
            <div className={`h-1.5 bg-gradient-to-r ${m.color}`} />
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-1">{m.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
        <strong>Importante:</strong> Antes de operar con cualquier manipulador industrial, asegurate de que este en modo manual.
      </div>
    </div>
  );
}

/* ───────────────────────── SLIDE 3 ───────────────────────── */
export function SlideJointMovement() {
  const [active, setActive] = useState<number | null>(null);
  const joints = [
    { id: 1, label: 'Eje 1 (Base)', range: '360°', desc: 'Gira sobre el eje vertical' },
    { id: 2, label: 'Eje 2 (Hombro)', range: '-95° a 165°', desc: 'Mueve el hombro adelante/atras' },
    { id: 3, label: 'Eje 3 (Codo)', range: '-175° a 65°', desc: 'Flexiona el codo' },
    { id: 4, label: 'Eje 4', range: '-200° a 200°', desc: 'Rotacion de muneca' },
    { id: 5, label: 'Eje 5', range: '-125° a 125°', desc: 'Inclinacion de muneca' },
    { id: 6, label: 'Eje 6', range: '-400° a 400°', desc: 'Rotacion final de herramienta' },
  ];

  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Movimiento de Ejes (Joint)</h2>
      <p className="text-sm text-muted-foreground">
        El movimiento de ejes permite mover cada articulacion de manera independiente. Toca un eje en el diagrama para ver sus detalles.
      </p>

      {/* Robot SVG */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <svg viewBox="0 0 400 200" className="w-full" role="img" aria-label="Robot con ejes">
            <rect width="400" height="200" fill="#f8fafc" rx="8" />
            {/* Base */}
            <rect x="100" y="150" width="80" height="25" rx="3" fill="#64748b" />
            {/* Arm */}
            <line x1="140" y1="150" x2="140" y2="90" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
            <line x1="140" y1="90" x2="220" y2="65" stroke="#94a3b8" strokeWidth="7" strokeLinecap="round" />
            <line x1="220" y1="65" x2="290" y2="45" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
            <line x1="290" y1="45" x2="320" y2="25" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
            {/* Tool */}
            <polygon points="320,20 328,32 320,36 312,32" fill="#f97316" />
            {/* Joints */}
            {[
              { id: 1, cx: 140, cy: 150 },
              { id: 2, cx: 140, cy: 90 },
              { id: 3, cx: 220, cy: 65 },
              { id: 4, cx: 290, cy: 45 },
              { id: 5, cx: 320, cy: 25 },
            ].map((j) => (
              <g key={j.id} onClick={() => setActive(active === j.id ? null : j.id)} style={{ cursor: 'pointer' }}>
                <circle cx={j.cx} cy={j.cy} r={active === j.id ? 14 : 10}
                  fill={active === j.id ? '#f97316' : '#cbd5e1'}
                  stroke={active === j.id ? '#fff' : 'transparent'} strokeWidth="3"
                  opacity={active !== null && active !== j.id ? 0.3 : 1}
                />
                <text x={j.cx} y={j.cy + 4} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{j.id}</text>
              </g>
            ))}
            {active !== null && (
              <g>
                <rect x="20" y="10" width="160" height="45" rx="6" fill="#1e293b" fillOpacity="0.9" />
                <text x="30" y="30" fill="#f97316" fontSize="10" fontWeight="bold">
                  {joints[active - 1]?.label}
                </text>
                <text x="30" y="46" fill="#94a3b8" fontSize="9">
                  {joints[active - 1]?.desc}
                </text>
              </g>
            )}
          </svg>
        </CardContent>
      </Card>

      {/* Joint info grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {joints.map((j) => (
          <button key={j.id} onClick={() => setActive(j.id)}
            className={`p-2.5 rounded-lg border text-left transition-all ${active === j.id ? 'border-primary bg-primary/5' : 'border-transparent bg-muted/50'}`}>
            <div className="font-semibold text-xs">{j.label}</div>
            <div className="text-xs text-primary font-mono">{j.range}</div>
            <div className="text-xs text-muted-foreground">{j.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── SLIDE 4 ───────────────────────── */
export function SlideLinearMovement() {
  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Movimiento Lineal</h2>
      <p className="text-sm text-muted-foreground">
        El movimiento lineal mueve el TCP (Tool Center Point) en una linea recta entre dos puntos.
      </p>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <svg viewBox="0 0 400 160" className="w-full" role="img" aria-label="Movimiento lineal">
            <rect width="400" height="160" fill="#f8fafc" rx="8" />
            {/* Points */}
            <circle cx="60" cy="100" r="12" fill="#f97316" />
            <text x="60" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">A</text>
            <circle cx="340" cy="40" r="12" fill="#22c55e" />
            <text x="340" y="45" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">B</text>
            {/* Linear path */}
            <line x1="72" y1="94" x2="328" y2="46" stroke="#3b82f6" strokeWidth="3" strokeDasharray="8,4" />
            <text x="200" y="58" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">MoveL</text>
            {/* Joint path (curved) */}
            <path d="M72,94 Q140,20 200,80 Q260,140 328,46" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" opacity="0.5" />
            <text x="200" y="135" textAnchor="middle" fill="#ef4444" fontSize="9" opacity="0.7">MoveJ (curvo)</text>
            {/* Labels */}
            <text x="60" y="128" textAnchor="middle" fill="#64748b" fontSize="10">Inicio</text>
            <text x="340" y="68" textAnchor="middle" fill="#64748b" fontSize="10">Destino</text>
          </svg>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <h4 className="font-semibold text-sm mb-2 text-emerald-700">Ventajas</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Trayectoria predecible en linea recta</li>
              <li>• Ideal para soldadura y pegado</li>
              <li>• Movimiento preciso entre puntos</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <h4 className="font-semibold text-sm mb-2 text-red-700">Limitaciones</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Mas lento que el movimiento Joint</li>
              <li>• Puede no alcanzar si el punto esta lejos</li>
              <li>• Requiere calcular cinematica inversa</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ───────────────────────── SLIDE 5 ───────────────────────── */
export function SlideReorientation() {
  const [angle, setAngle] = useState(0);

  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Movimiento de Reorientacion</h2>
      <p className="text-sm text-muted-foreground">
        Este modo permite girar la herramienta alrededor de un eje manteniendo su posicion. Toca los botones para ver la rotacion.
      </p>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <svg viewBox="0 0 400 200" className="w-full" role="img" aria-label="Reorientacion de herramienta">
            <rect width="400" height="200" fill="#f8fafc" rx="8" />
            {/* Fixed point */}
            <circle cx="200" cy="100" r="6" fill="#64748b" />
            <text x="200" y="130" textAnchor="middle" fill="#64748b" fontSize="10">Posicion fija</text>
            {/* Tool (rotating) */}
            <g transform={`rotate(${angle}, 200, 100)`}>
              <line x1="200" y1="100" x2="280" y2="60" stroke="#8b5cf6" strokeWidth="6" strokeLinecap="round" />
              <polygon points="280,52 292,68 278,72" fill="#8b5cf6" />
              <text x="296" y="60" fill="#8b5cf6" fontSize="10" fontWeight="bold">TCP</text>
            </g>
            {/* Rotation arrow */}
            <path d="M240,75 A50,50 0 0,1 240,125" fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="4,3" />
            <polygon points="240,125 236,118 244,118" fill="#a78bfa" />
          </svg>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        {[0, 45, 90, 135, 180, -45, -90, -135, -180].map((a) => (
          <button key={a} onClick={() => setAngle(a)}
            className={`px-3 py-1.5 rounded-lg text-sm font-mono border transition-all ${angle === a ? 'bg-violet-600 text-white border-violet-600' : 'bg-muted/50 border-transparent hover:bg-muted'}`}>
            {a}°
          </button>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── SLIDE 6 (Quiz) ───────────────────────── */
export function SlideQuizMovimientos() {
  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <QuizComponent questions={quizMovimientos} label="Movimientos" />
    </div>
  );
}
