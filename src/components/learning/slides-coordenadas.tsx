'use client';

import { Card, CardContent } from '@/components/ui/card';
import { QuizComponent } from './quiz-component';
import { quizCoordenadas } from '@/lib/slide-data';

/* ───────────────────────── SLIDE 7 ───────────────────────── */
export function SlideCoordenadasOverview() {
  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Sistemas de Coordenadas</h2>
      <p className="text-sm text-muted-foreground">
        Los sistemas de coordenadas permiten definir la posicion y orientacion del robot en el espacio 3D usando un marco de referencia.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {[
          { name: 'Sistema Base', desc: 'Origen en la base del robot. X hacia la herramienta, Y a la izquierda, Z hacia arriba.', color: 'from-blue-500 to-cyan-500' },
          { name: 'Sistema Mundo', desc: 'Referencia fija absoluta. Usado cuando el robot se desplaza o hay multiples robots.', color: 'from-emerald-500 to-teal-500' },
          { name: 'Sistema Objeto', desc: 'Origen en el objeto de trabajo. Los puntos se mueven con el objeto si se reubica.', color: 'from-amber-500 to-yellow-500' },
          { name: 'Sistema Herramienta', desc: 'Vinculado al extremo del robot. Define la posicion y orientacion de la herramienta.', color: 'from-violet-500 to-purple-500' },
        ].map((s) => (
          <Card key={s.name} className="border-0 shadow-sm overflow-hidden">
            <div className={`h-1 bg-gradient-to-r ${s.color}`} />
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-1">{s.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
        <strong>Nota:</strong> Cada fabricante puede asignar nombres diferentes a estos sistemas. Siempre consulta la documentacion del robot.
      </div>
    </div>
  );
}

/* ───────────────────────── SLIDE 8 ───────────────────────── */
export function SlideBaseSystem() {
  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Sistema Base</h2>
      <p className="text-sm text-muted-foreground">
        El origen se ubica en la base del robot. Los ejes se definen segun las especificaciones del fabricante.
      </p>
      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <svg viewBox="0 0 400 220" className="w-full" role="img" aria-label="Sistema de coordenadas base">
            <rect width="400" height="220" fill="#f8fafc" rx="8" />
            {/* Robot base */}
            <rect x="140" y="160" width="120" height="30" rx="4" fill="#64748b" />
            <text x="200" y="180" textAnchor="middle" fill="white" fontSize="10">BASE</text>
            {/* Robot arm simplified */}
            <line x1="200" y1="160" x2="200" y2="100" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
            <line x1="200" y1="100" x2="270" y2="80" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
            {/* Origin */}
            <circle cx="200" cy="160" r="4" fill="#1e293b" />
            {/* X axis (red, toward tool) */}
            <line x1="200" y1="160" x2="310" y2="110" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrowR)" />
            <text x="320" y="108" fill="#ef4444" fontSize="12" fontWeight="bold">X</text>
            {/* Y axis (green, to left) */}
            <line x1="200" y1="160" x2="110" y2="110" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#arrowG)" />
            <text x="98" y="108" fill="#22c55e" fontSize="12" fontWeight="bold">Y</text>
            {/* Z axis (blue, up) */}
            <line x1="200" y1="160" x2="200" y2="50" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrowB)" />
            <text x="210" y="48" fill="#3b82f6" fontSize="12" fontWeight="bold">Z</text>
            {/* Arrows */}
            <defs>
              <marker id="arrowR" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0,0 8,3 0,6" fill="#ef4444" /></marker>
              <marker id="arrowG" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0,0 8,3 0,6" fill="#22c55e" /></marker>
              <marker id="arrowB" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0,0 8,3 0,6" fill="#3b82f6" /></marker>
            </defs>
          </svg>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {[
          { axis: 'X', dir: 'Hacia la herramienta', color: 'text-red-600 bg-red-50 border-red-200' },
          { axis: 'Y', dir: 'Hacia la izquierda (desde atras)', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
          { axis: 'Z', dir: 'Hacia arriba', color: 'text-blue-600 bg-blue-50 border-blue-200' },
        ].map((a) => (
          <div key={a.axis} className={`p-3 rounded-lg border ${a.color}`}>
            <span className="font-bold text-lg">{a.axis}</span>
            <span className="text-xs block mt-0.5">{a.dir}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── SLIDE 9 ───────────────────────── */
export function SlideWorldSystem() {
  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Sistema Mundo</h2>
      <p className="text-sm text-muted-foreground">
        Define la posicion y orientacion absolutas de los objetos en el espacio 3D usando un punto de referencia fijo.
      </p>
      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <svg viewBox="0 0 400 160" className="w-full" role="img" aria-label="Sistema mundo">
            <rect width="400" height="160" fill="#f8fafc" rx="8" />
            {/* Two robots */}
            <rect x="60" y="110" width="60" height="15" rx="3" fill="#64748b" />
            <line x1="90" y1="110" x2="90" y2="70" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
            <line x1="90" y1="70" x2="130" y2="55" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
            <text x="90" y="145" textAnchor="middle" fill="#64748b" fontSize="9">Robot 1</text>

            <rect x="260" y="110" width="60" height="15" rx="3" fill="#64748b" />
            <line x1="290" y1="110" x2="290" y2="70" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
            <line x1="290" y1="70" x2="330" y2="55" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
            <text x="290" y="145" textAnchor="middle" fill="#64748b" fontSize="9">Robot 2</text>

            {/* Shared object */}
            <rect x="170" y="85" width="50" height="35" rx="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="195" y="107" textAnchor="middle" fill="#92400e" fontSize="8" fontWeight="bold">OBJ</text>

            {/* World axes at corner */}
            <line x1="20" y1="150" x2="60" y2="150" stroke="#ef4444" strokeWidth="2" />
            <line x1="20" y1="150" x2="20" y2="110" stroke="#3b82f6" strokeWidth="2" />
            <text x="65" y="154" fill="#ef4444" fontSize="10" fontWeight="bold">X</text>
            <text x="16" y="105" fill="#3b82f6" fontSize="10" fontWeight="bold">Z</text>
            <text x="22" y="167" fill="#64748b" fontSize="9">World (0,0,0)</text>
          </svg>
        </CardContent>
      </Card>
      <div className="space-y-2 text-sm">
        <p><strong>¿Para que sirve si el robot es fijo?</strong></p>
        <ul className="space-y-1 text-muted-foreground text-xs">
          <li>• Cuando el manipulador se desplaza en una direccion</li>
          <li>• Cuando varios robots trabajan con un mismo objeto</li>
          <li>• Para coordinar tareas dentro de una misma celda</li>
        </ul>
        <p className="text-xs text-muted-foreground pt-1">
          Por lo general, el sistema mundo coincide con el sistema base si no fue modificado.
        </p>
      </div>
    </div>
  );
}

/* ───────────────────────── SLIDE 10 ───────────────────────── */
export function SlideObjectSystem() {
  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Sistema Objeto (WorkObject)</h2>
      <p className="text-sm text-muted-foreground">
        Define un origen dentro del objeto de trabajo. Permite especificar posiciones en relacion al propio sistema del objeto, de modo que si el objeto se mueve, los puntos se mueven con el.
      </p>
      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <svg viewBox="0 0 400 180" className="w-full" role="img" aria-label="Sistema objeto">
            <rect width="400" height="180" fill="#f8fafc" rx="8" />
            {/* Table */}
            <rect x="100" y="80" width="200" height="80" rx="4" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="200" y="130" textAnchor="middle" fill="#475569" fontSize="11">Mesa de Trabajo</text>
            {/* Object origin (corner) */}
            <circle cx="100" cy="80" r="5" fill="#f97316" />
            <text x="110" y="75" fill="#f97316" fontSize="10" fontWeight="bold">Origen WObj</text>
            {/* Object axes */}
            <line x1="100" y1="80" x2="180" y2="80" stroke="#ef4444" strokeWidth="2" />
            <text x="185" y="84" fill="#ef4444" fontSize="10" fontWeight="bold">x</text>
            <line x1="100" y1="80" x2="100" y2="150" stroke="#3b82f6" strokeWidth="2" />
            <text x="104" y="160" fill="#3b82f6" fontSize="10" fontWeight="bold">z</text>
            {/* Points on corners */}
            {[
              { label: 'P1', x: 100, y: 80 },
              { label: 'P2', x: 300, y: 80 },
              { label: 'P3', x: 300, y: 160 },
              { label: 'P4', x: 100, y: 160 },
            ].map((p) => (
              <g key={p.label}>
                <circle cx={p.x} cy={p.y} r="8" fill="#f97316" fillOpacity="0.2" stroke="#f97316" strokeWidth="1.5" />
                <text x={p.x} y={p.y + 4} textAnchor="middle" fill="#ea580c" fontSize="9" fontWeight="bold">{p.label}</text>
              </g>
            ))}
          </svg>
        </CardContent>
      </Card>
      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
        <strong>Ventaja clave:</strong> Al conectar los puntos al objeto de trabajo y este a la mesa, si movemos o rotamos la mesa, los puntos P1-P4 se mueven automaticamente con ella. No hay que reprogramar!
      </div>
    </div>
  );
}

/* ───────────────────────── SLIDE 11 ───────────────────────── */
export function SlideToolSystem() {
  return (
    <div className="space-y-4 p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Sistema Herramienta</h2>
      <p className="text-sm text-muted-foreground">
        Definido en la herramienta o extremo del robot. Permite especificar la posicion y orientacion de la herramienta en el espacio 3D.
      </p>
      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <svg viewBox="0 0 400 180" className="w-full" role="img" aria-label="Sistema herramienta">
            <rect width="400" height="180" fill="#f8fafc" rx="8" />
            {/* Robot arm */}
            <line x1="80" y1="140" x2="200" y2="80" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
            {/* Tool */}
            <line x1="200" y1="80" x2="320" y2="50" stroke="#8b5cf6" strokeWidth="6" strokeLinecap="round" />
            {/* Gripper */}
            <line x1="320" y1="42" x2="350" y2="25" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round" />
            <line x1="320" y1="58" x2="350" y2="75" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round" />
            {/* TCP */}
            <circle cx="320" cy="50" r="5" fill="#ef4444" />
            <text x="335" y="48" fill="#ef4444" fontSize="10" fontWeight="bold">TCP</text>
            {/* Tool axes at TCP */}
            <line x1="320" y1="50" x2="370" y2="30" stroke="#ef4444" strokeWidth="2" />
            <text x="375" y="28" fill="#ef4444" fontSize="10" fontWeight="bold">X</text>
            <line x1="320" y1="50" x2="280" y2="30" stroke="#22c55e" strokeWidth="2" />
            <text x="272" y="28" fill="#22c55e" fontSize="10" fontWeight="bold">Y</text>
            <line x1="320" y1="50" x2="320" y2="15" stroke="#3b82f6" strokeWidth="2" />
            <text x="325" y="12" fill="#3b82f6" fontSize="10" fontWeight="bold">Z</text>
          </svg>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
        <div className="p-3 rounded-lg bg-muted/50 border">
          <strong>TCP (Tool Center Point):</strong>
          <p className="text-xs text-muted-foreground mt-1">Punto de referencia en la herramienta desde donde se calculan todas las posiciones.</p>
        </div>
        <div className="p-3 rounded-lg bg-muted/50 border">
          <strong>Calibracion de herramienta:</strong>
          <p className="text-xs text-muted-foreground mt-1">Se debe definir la posicion del TCP respecto a la interfase mecanica de la muneca.</p>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── SLIDE 12 (Quiz) ───────────────────────── */
export function SlideQuizCoordenadas() {
  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <QuizComponent questions={quizCoordenadas} label="Coordenadas" />
    </div>
  );
}
