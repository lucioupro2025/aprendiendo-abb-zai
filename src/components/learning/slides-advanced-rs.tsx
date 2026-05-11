'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Laptop, 
  Layers, 
  Link as LinkIcon, 
  Rotate3d, 
  Zap, 
  Play, 
  RefreshCw,
  Box,
  Settings2,
  AlertCircle
} from 'lucide-react';

/* ───────────────────────── SLIDE: ROBOTSTUDIO WORKFLOW ───────────────────────── */
export function SlideRSWorkflow() {
  return (
    <div className="space-y-6 p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20 px-3 py-1 text-sm font-semibold">
          Avanzado (TP2)
        </Badge>
        <span className="text-muted-foreground text-sm">Entorno Virtual</span>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-primary flex items-center gap-3">
        <Laptop className="size-10 text-purple-600" /> RobotStudio Workflow
      </h2>

      <p className="text-lg text-muted-foreground leading-relaxed">
        Antes de programar en RAPID, debemos preparar la celda virtual. Un error común es no "atar" la geometría al sistema de coordenadas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="border-l-4 border-l-purple-500 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Layers className="size-5 text-purple-500" /> Frames en RobotStudio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
              <strong className="text-purple-600 dark:text-purple-400">User Frame:</strong> Define la posición de la mesa respecto al robot (Mundo).
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
              <strong className="text-purple-600 dark:text-purple-400">Object Frame:</strong> Define la posición de la pieza sobre la mesa.
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 text-white border-0 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <LinkIcon className="size-20" />
          </div>
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 text-purple-400 flex items-center gap-2">
              <Zap className="size-5" /> ¡Paso Crítico!
            </h3>
            <p className="text-slate-300 text-sm mb-4">
              Sin esta acción, si mueves la mesa en el simulador, los puntos <span className="text-white font-bold">NO</span> se moverán con ella.
            </p>
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 font-mono text-xs">
              Derecho en la mesa &rarr; <br/>
              "Conectar a objeto de trabajo" <br/>
              (Attach to WorkObject)
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ───────────────────────── SLIDE: ORIENTATION & CONFIG ───────────────────────── */
export function SlideOrientationConfig() {
  return (
    <div className="space-y-6 p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 px-3 py-1 text-sm font-semibold">
          TP2 - Geometría
        </Badge>
        <span className="text-muted-foreground text-sm">Matemática del Robot</span>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-primary flex items-center gap-3">
        <Rotate3d className="size-10 text-blue-600" /> Orientación y Configuración
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="space-y-6">
          <h3 className="text-xl font-bold border-b pb-2">Normal a la Superficie</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Significa que el eje <span className="font-bold text-primary">Z de la herramienta</span> debe estar perpendicular a la cara de la mesa. Si la mesa está inclinada 30°, la herramienta también debe inclinarse 30°.
          </p>
          <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-xl">
            <h4 className="font-bold text-xs text-blue-600 uppercase tracking-wider mb-2">Cuaterniones [q1, q2, q3, q4]</h4>
            <code className="text-xs block bg-white dark:bg-slate-950 p-2 rounded border">
              [1, 0, 0, 0] = Vertical abajo
            </code>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold border-b pb-2">Configuración (confdata)</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Un robot de 6 ejes puede llegar al mismo punto con distintas "posturas" (ej. codo arriba/abajo). El <span className="font-bold text-primary">confdata</span> evita errores de ambigüedad.
          </p>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl font-mono text-[10px]">
            <p className="text-muted-foreground mb-2">! Ejemplo: [0, -1, 1, 0]</p>
            <p>Define los cuadrantes de los ejes 1, 4, 6 y ejes externos.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── SLIDE: SYNC & SIMULATION ───────────────────────── */
export function SlideSyncSim() {
  return (
    <div className="space-y-6 p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-3 py-1 text-sm font-semibold">
          Finalización
        </Badge>
        <span className="text-muted-foreground text-sm">RobotStudio ↔ RAPID</span>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-primary flex items-center gap-3">
        <RefreshCw className="size-10 text-emerald-600" /> Sincronización y Simulación
      </h2>

      <div className="space-y-8 mt-8">
        <div className="relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-emerald-500/20 rounded-full" />
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 text-white rounded-full size-6 flex items-center justify-center text-xs font-bold">1</div>
              <h3 className="font-bold">Sincronizar con RAPID</h3>
            </div>
            <p className="text-sm text-muted-foreground ml-9">
              Los puntos creados gráficamente no existen en el código hasta que usas el botón <span className="font-bold text-emerald-600">Sincronizar con RAPID</span>. Esto genera el archivo <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">.modx</span>.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-emerald-500/20 rounded-full" />
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 text-white rounded-full size-6 flex items-center justify-center text-xs font-bold">2</div>
              <h3 className="font-bold">Configurar Simulación</h3>
            </div>
            <p className="text-sm text-muted-foreground ml-9">
              Asegúrate de que el punto de entrada sea la rutina <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">Main</span> antes de presionar <Play className="inline size-3 mb-0.5" /> Play.
            </p>
          </div>
        </div>

        <Card className="bg-amber-500/10 border border-amber-500/20 p-4">
          <CardContent className="p-0 flex items-start gap-3">
            <AlertCircle className="size-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
              <strong>Recordatorio:</strong> En el simulador de RobotStudio, los puntos se ven en 3D, pero en el código RAPID son solo datos dentro de un módulo. La sincronización es el puente entre lo visual y lo lógico.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
