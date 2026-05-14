'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuizComponent } from './quiz-component';
import { quizMovimientos, quizCoordenadas, quizMap } from '@/lib/slide-data';

/* ───────────────────────── SLIDE 2 ───────────────────────── */
export function SlideMovimientosOverview() {
  return (
    <div className="space-y-6 p-4 md:p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-primary">Modos de Movimiento</h2>
      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
        Todo manipulador industrial posee los mismos modos de movimiento: movimiento de ejes, movimiento lineal y movimiento de reorientacion.
      </p>
      <div className="grid grid-cols-1 gap-4 pt-4">
        {[
          {
            title: 'Joint (Ejes)',
            desc: 'Mueve cada articulacion de manera independiente. Es el modo basico, usado cuando el lineal esta bloqueado y para calibraciones.',
            color: 'from-[#605DFF] to-[#00D390]',
          },
          {
            title: 'Lineal',
            desc: 'Mueve el TCP en linea recta entre dos puntos. Ideal para trayectorias precisas como soldadura o pegado.',
            color: 'from-[#00D390] to-[#F43098]',
          },
          {
            title: 'Reorientacion',
            desc: 'Rota la herramienta alrededor de un eje manteniendo la posicion. Util para reorientar sin moverse.',
            color: 'from-[#F43098] to-[#605DFF]',
          },
        ].map((m) => (
          <Card key={m.title} className="border-0 shadow-lg overflow-hidden bg-card/50 backdrop-blur-sm">
            <div className={`h-2 bg-gradient-to-r ${m.color}`} />
            <CardContent className="p-6">
              <h3 className="font-bold text-xl mb-2">{m.title}</h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{m.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="p-5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-base md:text-lg font-medium">
        <strong className="text-primary-foreground bg-primary px-2 py-0.5 rounded mr-2">Importante:</strong> 
        Antes de operar con cualquier manipulador industrial, asegurate de que este en modo manual.
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
    <div className="space-y-6 p-4 md:p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-primary">Movimiento de Ejes (Joint)</h2>
      <p className="text-lg text-muted-foreground">
        El movimiento de ejes permite mover cada articulacion de manera independiente. Toca un eje en el diagrama o en la lista.
      </p>

      {/* Robot SVG */}
      <Card className="border-0 shadow-xl bg-card/50 overflow-hidden">
        <CardContent className="p-4">
          <svg viewBox="0 0 400 200" className="w-full" role="img" aria-label="Robot con ejes">
            <rect width="400" height="200" fill="transparent" rx="8" />
            {/* Base */}
            <rect x="100" y="150" width="80" height="25" rx="3" fill="#605DFF" opacity="0.8" />
            {/* Arm */}
            <line x1="140" y1="150" x2="140" y2="90" stroke="#605DFF" strokeWidth="8" strokeLinecap="round" />
            <line x1="140" y1="90" x2="220" y2="65" stroke="#605DFF" strokeWidth="7" strokeLinecap="round" />
            <line x1="220" y1="65" x2="290" y2="45" stroke="#605DFF" strokeWidth="6" strokeLinecap="round" />
            <line x1="290" y1="45" x2="320" y2="25" stroke="#605DFF" strokeWidth="4" strokeLinecap="round" />
            {/* Tool */}
            <polygon points="320,20 328,32 320,36 312,32" fill="#F43098" />
            {/* Joints */}
            {[
              { id: 1, cx: 140, cy: 150 },
              { id: 2, cx: 140, cy: 90 },
              { id: 3, cx: 220, cy: 65 },
              { id: 4, cx: 290, cy: 45 },
              { id: 5, cx: 320, cy: 25 },
            ].map((j) => (
              <g key={j.id} onClick={() => setActive(active === j.id ? null : j.id)} style={{ cursor: 'pointer' }}>
                <circle cx={j.cx} cy={j.cy} r={active === j.id ? 15 : 12}
                  fill={active === j.id ? '#00D390' : 'rgba(96, 93, 255, 0.3)'}
                  stroke={active === j.id ? '#fff' : '#605DFF'} strokeWidth="2"
                  opacity={active !== null && active !== j.id ? 0.3 : 1}
                />
                <text x={j.cx} y={j.cy + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{j.id}</text>
              </g>
            ))}
            {active !== null && (
              <g>
                <rect x="20" y="10" width="180" height="50" rx="8" fill="#1d232a" stroke="#605DFF" strokeWidth="1" />
                <text x="35" y="30" fill="#00D390" fontSize="12" fontWeight="bold">
                  {joints[active - 1]?.label}
                </text>
                <text x="35" y="48" fill="#ecf9ff" fontSize="10">
                  {joints[active - 1]?.desc}
                </text>
              </g>
            )}
          </svg>
        </CardContent>
      </Card>

      {/* Joint info grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {joints.map((j) => (
          <button key={j.id} onClick={() => setActive(j.id)}
            className={`p-4 rounded-xl border-2 text-left transition-all active:scale-95 ${active === j.id ? 'border-[#00D390] bg-[#00D390]/10' : 'border-border bg-card/50'}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-lg">{j.label}</span>
              <Badge variant="outline" className="text-xs font-mono border-primary/30 text-primary">{j.range}</Badge>
            </div>
            <div className="text-sm text-muted-foreground leading-snug">{j.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── SLIDE 4 ───────────────────────── */
export function SlideLinearMovement() {
  return (
    <div className="space-y-6 p-4 md:p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-primary">Movimiento Lineal</h2>
      <p className="text-lg text-muted-foreground">
        El movimiento lineal mueve el TCP (Tool Center Point) en una linea recta entre dos puntos.
      </p>

      <Card className="border-0 shadow-xl bg-card/50 overflow-hidden">
        <CardContent className="p-4">
          <svg viewBox="0 0 400 160" className="w-full" role="img" aria-label="Movimiento lineal">
            <rect width="400" height="160" fill="transparent" rx="8" />
            {/* Points */}
            <circle cx="60" cy="100" r="14" fill="#605DFF" />
            <text x="60" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
            <circle cx="340" cy="40" r="14" fill="#00D390" />
            <text x="340" y="45" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B</text>
            {/* Linear path */}
            <line x1="74" y1="94" x2="326" y2="46" stroke="#ecf9ff" strokeWidth="4" strokeDasharray="10,5" />
            <text x="200" y="55" textAnchor="middle" fill="#ecf9ff" fontSize="14" fontWeight="bold" className="drop-shadow-md">MoveL</text>
            {/* Joint path (curved) */}
            <path d="M74,94 Q140,20 200,80 Q260,140 326,46" fill="none" stroke="#F43098" strokeWidth="3" strokeDasharray="4,4" opacity="0.6" />
            <text x="200" y="135" textAnchor="middle" fill="#F43098" fontSize="11" fontWeight="bold">MoveJ (curvo)</text>
          </svg>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-lg bg-[#00D390]/5 border-l-4 border-l-[#00D390]">
          <CardContent className="p-6">
            <h4 className="font-bold text-lg mb-3 text-[#00D390]">Ventajas</h4>
            <ul className="space-y-2 text-base text-muted-foreground">
              <li>• Trayectoria predecible en linea recta</li>
              <li>• Ideal para soldadura y pegado</li>
              <li>• Movimiento preciso entre puntos</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-[#F43098]/5 border-l-4 border-l-[#F43098]">
          <CardContent className="p-6">
            <h4 className="font-bold text-lg mb-3 text-[#F43098]">Limitaciones</h4>
            <ul className="space-y-2 text-base text-muted-foreground">
              <li>• Mas lento que el movimiento Joint</li>
              <li>• Puede no alcanzar si el punto esta lejos</li>
              <li>• Riesgo de singularidades cinematicas</li>
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
    <div className="space-y-6 p-4 md:p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-primary">Movimiento de Reorientacion</h2>
      <p className="text-lg text-muted-foreground">
        Este modo permite girar la herramienta alrededor de un eje manteniendo su posicion. Toca los botones para rotar.
      </p>

      <Card className="border-0 shadow-xl bg-card/50 overflow-hidden">
        <CardContent className="p-4">
          <svg viewBox="0 0 400 200" className="w-full" role="img" aria-label="Reorientacion de herramienta">
            <rect width="400" height="200" fill="transparent" rx="8" />
            {/* Fixed point */}
            <circle cx="200" cy="100" r="8" fill="#F43098" />
            <text x="200" y="135" textAnchor="middle" fill="#F43098" fontSize="12" fontWeight="bold">Punto Fijo</text>
            {/* Tool (rotating) */}
            <g transform={`rotate(${angle}, 200, 100)`}>
              <line x1="200" y1="100" x2="280" y2="60" stroke="#605DFF" strokeWidth="8" strokeLinecap="round" />
              <polygon points="280,52 295,68 278,75" fill="#605DFF" />
              <text x="300" y="60" fill="#605DFF" fontSize="12" fontWeight="bold">TCP</text>
            </g>
            {/* Rotation arrow */}
            <path d="M240,75 A50,50 0 0,1 240,125" fill="none" stroke="#00D390" strokeWidth="3" strokeDasharray="6,4" />
            <polygon points="240,125 234,115 246,115" fill="#00D390" />
          </svg>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2 justify-center pt-2">
        {[0, 45, 90, 135, 180, -45, -90, -135].map((a) => (
          <button key={a} onClick={() => setAngle(a)}
            className={`min-w-[70px] h-12 rounded-xl text-base font-mono font-bold border-2 transition-all active:scale-90 ${angle === a ? 'bg-[#605DFF] text-white border-[#605DFF]' : 'bg-card/50 border-border hover:border-[#605DFF]/50'}`}>
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
