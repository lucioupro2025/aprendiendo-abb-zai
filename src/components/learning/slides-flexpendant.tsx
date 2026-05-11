'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Gamepad2, 
  Target, 
  Box, 
  Settings2, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Move,
  RotateCw,
  Maximize2
} from 'lucide-react';
import { QuizComponent } from './quiz-component';
import { quizFlexPendant } from '@/lib/slide-data';

/* ───────────────────────── SLIDE 52: TCP CALIBRATION ───────────────────────── */
export function SlideTCPCalibration() {
  const steps = [
    { 
      title: 'Crear tooldata', 
      desc: 'Define el nombre, masa y centro de gravedad (COG) en la ventana de datos del programa.', 
      icon: <Settings2 className="size-5 text-blue-500" /> 
    },
    { 
      title: 'Punta de referencia', 
      desc: 'Coloca una punta fija en la celda y una punta en la herramienta del robot.', 
      icon: <Target className="size-5 text-red-500" /> 
    },
    { 
      title: 'Método de 4 puntos', 
      desc: 'Toca la punta fija desde 4 ángulos distintos. El sistema calculará el centro geométrico.', 
      icon: <Maximize2 className="size-5 text-green-500" /> 
    },
    { 
      title: 'Verificar error medio', 
      desc: 'Un valor ideal es menor a 1.0 mm. Si es mayor, repite los puntos con más cuidado.', 
      icon: <CheckCircle2 className="size-5 text-emerald-500" /> 
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 px-3 py-1 text-sm font-semibold">
          Examen Práctico
        </Badge>
        <span className="text-muted-foreground text-sm">Operación FlexPendant</span>
      </div>
      
      <h2 className="text-3xl md:text-4xl font-bold text-primary flex items-center gap-3">
        <Target className="size-10 text-blue-600" /> Calibración del TCP
      </h2>
      
      <p className="text-lg text-muted-foreground leading-relaxed">
        El Punto Central de la Herramienta (TCP) es el "corazón" de la programación. Es el punto que sigue la trayectoria y sobre el cual el robot realiza las rotaciones.
      </p>

      <div className="grid grid-cols-1 gap-4 mt-6">
        {steps.map((step, idx) => (
          <Card key={idx} className="border-0 shadow-md bg-card/50 overflow-hidden group hover:shadow-lg transition-all">
            <div className="flex items-start gap-4 p-5">
              <div className="bg-background rounded-xl p-3 shadow-sm group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                  <span className="text-blue-500/50 text-sm font-mono">0{idx + 1}.</span> {step.title}
                </h3>
                <p className="text-muted-foreground leading-snug">{step.desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 mt-8">
        <div className="flex items-start gap-4">
          <AlertTriangle className="size-6 text-amber-500 shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-1">Tip de Examen:</h4>
            <p className="text-amber-800/80 dark:text-amber-300/80 text-sm leading-relaxed">
              Para que la calibración sea exitosa, asegúrate de que haya una diferencia de al menos 10 grados entre las orientaciones de los ejes 4 y 5 al marcar los puntos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── SLIDE 53: WORKOBJECT DEFINITION ───────────────────────── */
export function SlideWObjDefinition() {
  return (
    <div className="space-y-6 p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-3 py-1 text-sm font-semibold">
          Configuración
        </Badge>
        <span className="text-muted-foreground text-sm">Operación FlexPendant</span>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-primary flex items-center gap-3">
        <Box className="size-10 text-emerald-600" /> Definir WorkObject (3 Puntos)
      </h2>

      <p className="text-lg text-muted-foreground leading-relaxed">
        Definir un WorkObject físico permite que las coordenadas de tu programa se "peguen" a la pieza. Si la pieza se mueve, solo recalibras el WObj y el programa seguirá funcionando.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[
          { title: 'X0: Origen', desc: 'Ubica el TCP en la esquina que será el origen (0,0,0) de tu pieza.', color: 'border-blue-500' },
          { title: 'X1: Dirección X', desc: 'Mueve el robot sobre el borde largo para definir el sentido del eje X.', color: 'border-red-500' },
          { title: 'Y1: Dirección Y', desc: 'Mueve el robot sobre el borde lateral para definir el sentido del eje Y.', color: 'border-green-500' },
        ].map((pt, idx) => (
          <Card key={idx} className={`bg-card/50 border-t-4 ${pt.color} shadow-lg`}>
            <CardContent className="p-6">
              <div className="text-4xl font-black text-muted-foreground/10 mb-4">POINT {idx + 1}</div>
              <h3 className="font-bold text-xl mb-3">{pt.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{pt.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-900 text-white border-0 shadow-2xl mt-8 overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />
        <CardContent className="p-6">
          <h4 className="font-bold flex items-center gap-2 mb-4 text-emerald-400">
            <Settings2 className="size-5" /> Parámetros en el FlexPendant
          </h4>
          <div className="space-y-4 font-mono text-sm">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">User Frame Progress (ufprog):</span>
              <span className="text-emerald-400">TRUE (durante calibración)</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">User Frame Progress (ufprog):</span>
              <span className="text-slate-400">FALSE (al terminar)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Mechanical Unit:</span>
              <span className="text-blue-400">ROB_1</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ───────────────────────── SLIDE 54: REV COUNTER UPDATE ───────────────────────── */
export function SlideRevCounterUpdate() {
  return (
    <div className="space-y-6 p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 px-3 py-1 text-sm font-semibold">
          Mantenimiento
        </Badge>
        <span className="text-muted-foreground text-sm">Operación FlexPendant</span>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-primary flex items-center gap-3">
        <RotateCw className="size-10 text-orange-600" /> Actualización de Contadores
      </h2>

      <p className="text-lg text-muted-foreground leading-relaxed">
        Este ejercicio es clave en el examen. Se realiza cuando el robot pierde su "conciencia" de posición por falta de batería o desconexión.
      </p>

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <div className="flex-1 space-y-4">
          <div className="flex items-start gap-4">
            <div className="bg-orange-500 text-white rounded-full size-8 flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h3 className="font-bold text-lg">Alineación Física</h3>
              <p className="text-muted-foreground">Mueve manualmente cada eje (Jogging) hasta que las flechas o muescas físicas en el cuerpo del robot coincidan perfectamente.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-orange-500 text-white rounded-full size-8 flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h3 className="font-bold text-lg">Menú de Calibración</h3>
              <p className="text-muted-foreground">En el FlexPendant navega a: <span className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-xs">Menú &rarr; Calibration &rarr; ROB_1</span>.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-orange-500 text-white rounded-full size-8 flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <h3 className="font-bold text-lg">Rev. Counter Update</h3>
              <p className="text-muted-foreground">Selecciona los ejes a sincronizar (o "All") y presiona <span className="font-bold">Update</span>.</p>
            </div>
          </div>
        </div>

        <Card className="flex-1 bg-card/50 border-orange-500/20">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Gamepad2 className="size-5 text-orange-500" /> Modos de Movimiento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { mode: 'Axis/Joint', desc: 'Mueve eje por eje para alinear marcas.', icon: <RotateCw className="size-4" /> },
              { mode: 'Linear', desc: 'Mueve en línea recta (X, Y, Z).', icon: <Move className="size-4" /> },
              { mode: 'Reorientation', desc: 'Gira sobre el TCP fijo.', icon: <RotateCw className="size-4 rotate-45" /> },
            ].map((m) => (
              <div key={m.mode} className="flex items-center gap-3 p-3 rounded-lg bg-background shadow-sm border border-border/50">
                <div className="text-orange-500">{m.icon}</div>
                <div>
                  <div className="font-bold text-xs">{m.mode}</div>
                  <div className="text-[10px] text-muted-foreground">{m.desc}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 text-center shadow-inner mt-8">
        <p className="text-slate-400 text-sm italic italic">
          "Recuerda: Si los contadores no están actualizados, el robot no permitirá la ejecución del programa por seguridad."
        </p>
      </div>
    </div>
  );
}

/* ───────────────────────── SLIDE 55: QUIZ ───────────────────────── */
export function SlideQuizFlexPendant() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto h-full flex flex-col justify-center">
      <QuizComponent questions={quizFlexPendant} label="Evaluación: Operación FlexPendant" />
    </div>
  );
}
