'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  Code as CodeIcon,
  MousePointer2,
  Trophy,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

// --- Types ---
interface LogEntry {
  type: 'info' | 'success' | 'error' | 'warning';
  msg: string;
}

interface Point {
  x: number;
  y: number;
  z: number;
  speed: string;
  type: 'L' | 'C';
  inter?: { x: number; y: number; z: number };
}

// --- Constants ---
const INITIAL_CODE = `MODULE Modulo_Examen
  ! Punto de referencia (Origen de la figura)
  VAR robtarget pRef := [[0,0,0],[1,0,0,0],[0,0,0,0],[9E9,9E9,9E9,9E9,9E9,9E9]];

  PROC main()
    ! 1. Ir a punto de seguridad (10mm sobre nivel de trazado)
    ! Recordar: Nivel trazado = 1.0mm, Seguridad = 11.0mm
    MoveL Offs(pRef, 0, 0, 11), v100, fine, tool_fibron\\WObj:=wobj1;

    ! 2. Bajar a nivel de trazado (1.0mm)
    MoveL Offs(pRef, 0, 0, 1), v100, fine, tool_fibron\\WObj:=wobj1;

    ! 3. Trazar figura (v50)
    MoveL Offs(pRef, 50, 0, 1), v50, fine, tool_fibron\\WObj:=wobj1;
    MoveL Offs(pRef, 50, 50, 1), v50, fine, tool_fibron\\WObj:=wobj1;
    MoveL Offs(pRef, 0, 50, 1), v50, fine, tool_fibron\\WObj:=wobj1;
    MoveL Offs(pRef, 0, 0, 1), v50, fine, tool_fibron\\WObj:=wobj1;

    ! 4. Subir a punto de seguridad y finalizar
    MoveL Offs(pRef, 0, 0, 11), v100, fine, tool_fibron\\WObj:=wobj1;
  ENDPROC
ENDMODULE`;

const FIGURE_TARGET = [
  { x: 0, y: 0 },
  { x: 50, y: 0 },
  { x: 50, y: 50 },
  { x: 0, y: 50 },
  { x: 0, y: 0 }
];

export default function RapidTrazadoSimulator() {
  const [code, setCode] = useState(INITIAL_CODE);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [path, setPath] = useState<Point[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(-1);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- Logic ---
  const addLog = (type: LogEntry['type'], msg: string) => {
    setLogs(prev => [...prev, { type, msg }]);
  };

  const reset = () => {
    setLogs([]);
    setPath([]);
    setIsExecuting(false);
    setScore(null);
    setCurrentStep(-1);
    addLog('info', 'Simulador reiniciado. Esperando código RAPID.');
  };

  const validateCode = () => {
    reset();
    setIsExecuting(true);
    
    const lines = code.split('\n');
    let points: Point[] = [];
    let currentLogs: LogEntry[] = [];
    let errorsFound = false;

    addLog('info', 'Iniciando validación de código...');

    // Regex for MoveL Offs(pRef, x, y, z), speed, fine, tool_fibron\WObj:=wobjX;
    const moveLRegex = /MoveL\s+Offs\(pRef,\s*(-?\d+\.?\d*),\s*(-?\d+\.?\d*),\s*(-?\d+\.?\d*)\),\s*(v\d+),\s*fine,\s*tool_fibron\\WObj:=wobj\d+;/i;
    // Regex for MoveC Offs(pRef, x1, y1, z1), Offs(pRef, x2, y2, z2), speed, fine, tool_fibron\WObj:=wobjX;
    const moveCRegex = /MoveC\s+Offs\(pRef,\s*(-?\d+\.?\d*),\s*(-?\d+\.?\d*),\s*(-?\d+\.?\d*)\),\s*Offs\(pRef,\s*(-?\d+\.?\d*),\s*(-?\d+\.?\d*),\s*(-?\d+\.?\d*)\),\s*(v\d+),\s*fine,\s*tool_fibron\\WObj:=wobj\d+;/i;

    let hasSafetyStart = false;
    let hasSafetyEnd = false;
    let lastZ = 11;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.startsWith('!') || line.startsWith('MODULE') || line.startsWith('VAR') || line.startsWith('PROC') || line.startsWith('END')) continue;

      const matchL = line.match(moveLRegex);
      const matchC = line.match(moveCRegex);

      if (matchL) {
        const x = parseFloat(matchL[1]);
        const y = parseFloat(matchL[2]);
        const z = parseFloat(matchL[3]);
        const speed = matchL[4].toLowerCase();

        points.push({ x, y, z, speed, type: 'L' });
        processPoint(i, z, speed);
        lastZ = z;
      } else if (matchC) {
        const ix = parseFloat(matchC[1]);
        const iy = parseFloat(matchC[2]);
        const iz = parseFloat(matchC[3]);
        const x = parseFloat(matchC[4]);
        const y = parseFloat(matchC[5]);
        const z = parseFloat(matchC[6]);
        const speed = matchC[7].toLowerCase();

        points.push({ x, y, z, speed, type: 'C', inter: { x: ix, y: iy, z: iz } });
        processPoint(i, z, speed);
        lastZ = z;
      } else if (line.toLowerCase().includes('movel') || line.toLowerCase().includes('movec')) {
        addLog('error', `Línea ${i + 1}: Formato incorrecto. Verifique el uso de Offs, comas y tool_fibron.`);
        errorsFound = true;
      }
    }

    function processPoint(lineIdx: number, z: number, speed: string) {
      if (points.length === 1) {
        if (z >= 11) hasSafetyStart = true;
        else {
          addLog('error', `Línea ${lineIdx + 1}: El primer punto debe estar a altura de seguridad (>= 11mm).`);
          errorsFound = true;
        }
      }
      if (z < 1) {
        addLog('error', `Línea ${lineIdx + 1}: ¡COLISIÓN! Altura Z (${z}) menor a 1.0mm.`);
        errorsFound = true;
      }
      if (z === 1 && speed !== 'v50') {
        addLog('error', `Línea ${lineIdx + 1}: Para trazado (Z=1) la velocidad DEBE ser v50.`);
        errorsFound = true;
      }
    }

    if (points.length > 0 && points[points.length - 1].z >= 11) {
      hasSafetyEnd = true;
    } else if (points.length > 0) {
      addLog('error', `Último punto: Debe retornar a altura de seguridad (>= 11mm).`);
      errorsFound = true;
    }

    setPath(points);
    
    if (!errorsFound && points.length > 0) {
      addLog('success', 'Estructura básica de código correcta.');
      calculateScore(points);
    } else if (points.length === 0) {
      addLog('error', 'No se encontraron instrucciones MoveL válidas.');
    }

    setIsExecuting(false);
  };

  const calculateScore = (points: Point[]) => {
    let currentScore = 100;
    
    // Check if points match the square figure
    const tracePoints = points.filter(p => p.z === 1);
    if (tracePoints.length < FIGURE_TARGET.length) {
      currentScore -= 20;
      addLog('warning', 'La figura parece incompleta.');
    }

    // Velocity checks
    const hasWrongSpeed = points.some(p => p.z === 1 && p.speed !== 'v50');
    if (hasWrongSpeed) currentScore -= 10;

    setScore(Math.max(0, currentScore));
    if (currentScore === 100) {
      addLog('success', '¡Excelente! Has cumplido todos los requerimientos técnicos.');
    }
  };

  // --- Animation/Canvas ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Grid (Aligned with Origin)
    const SCALE = 5; // 1mm = 5px
    const GRID_STEP = 10 * SCALE; // Línea cada 10mm (50px)
    const ox = 80, oy = 370;

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    
    // Vertical lines from origin
    for (let x = ox; x <= canvas.width; x += GRID_STEP) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let x = ox - GRID_STEP; x >= 0; x -= GRID_STEP) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    
    // Horizontal lines from origin
    for (let y = oy; y <= canvas.height; y += GRID_STEP) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }
    for (let y = oy - GRID_STEP; y >= 0; y -= GRID_STEP) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Origin point
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(ox, oy, 4, 0, Math.PI * 2); ctx.fill();
    ctx.font = '12px sans-serif';
    ctx.fillText('pRef (0,0)', ox + 10, oy - 10);

    // Target Figure (Ghost)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    FIGURE_TARGET.forEach((p, i) => {
      if (i === 0) ctx.moveTo(ox + p.x * SCALE, oy - p.y * SCALE);
      else ctx.lineTo(ox + p.x * SCALE, oy - p.y * SCALE);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Actual Path
    if (path.length > 0) {
      ctx.lineWidth = 3;
      path.forEach((p, i) => {
        if (i === 0) return;
        const prev = path[i-1];
        
        // Color based on Z
        if (p.z === 1 && prev.z === 1) {
          ctx.strokeStyle = '#10b981'; // Trazado
        } else {
          ctx.strokeStyle = '#6366f1'; // Movimiento en el aire
        }

        ctx.beginPath();
        if (p.type === 'C' && p.inter) {
          // Quadratic curve approximation for circular movement
          // Note: RAPID MoveC is an arc through 3 points, here we approximate with quadratic curve for simplicity in canvas
          const cpX = ox + p.inter.x * SCALE;
          const cpY = oy - p.inter.y * SCALE;
          const endX = ox + p.x * SCALE;
          const endY = oy - p.y * SCALE;
          
          ctx.moveTo(ox + prev.x * SCALE, oy - prev.y * SCALE);
          ctx.quadraticCurveTo(cpX, cpY, endX, endY);
        } else {
          ctx.moveTo(ox + prev.x * SCALE, oy - prev.y * SCALE);
          ctx.lineTo(ox + p.x * SCALE, oy - p.y * SCALE);
        }
        ctx.stroke();

        // Points
        if (p.type === 'C' && p.inter) {
          ctx.fillStyle = '#f43f5e'; // Intermediate point color
          ctx.beginPath(); ctx.arc(ox + p.inter.x * SCALE, oy - p.inter.y * SCALE, 3, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = p.z === 1 ? '#10b981' : '#f59e0b';
        ctx.beginPath(); ctx.arc(ox + p.x * SCALE, oy - p.y * SCALE, 4, 0, Math.PI * 2); ctx.fill();
      });
    }

  }, [path]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 max-w-7xl mx-auto h-[calc(100vh-140px)] min-h-[750px]">
      {/* Code Editor Area */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <Card className="flex-[2] border-slate-800 bg-slate-950 shadow-2xl flex flex-col overflow-hidden">
          <CardHeader className="py-3 px-4 border-b border-slate-800 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CodeIcon className="size-5 text-primary" />
              <CardTitle className="text-sm font-bold text-slate-200 uppercase tracking-widest">RAPID Terminal</CardTitle>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-400">tool_fibron</Badge>
              <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-400">wobj1</Badge>
            </div>
          </CardHeader>
          <div className="flex-1 relative font-mono text-sm">
            <textarea
              spellCheck={false}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="absolute inset-0 w-full h-full p-4 bg-transparent text-amber-300 resize-none outline-none caret-white"
            />
          </div>
          <div className="p-3 border-t border-slate-800 flex gap-2">
            <Button onClick={validateCode} disabled={isExecuting} className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
              <Play className="size-4" /> Ejecutar Programa
            </Button>
            <Button onClick={reset} variant="outline" className="border-slate-700 text-slate-300 gap-2">
              <RotateCcw className="size-4" /> Limpiar
            </Button>
          </div>
        </Card>

        <Card className="flex-1 border-slate-800 bg-slate-900 overflow-hidden flex flex-col">
          <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between">
             <span className="text-[10px] font-bold text-slate-500 uppercase">Salida del Controlador</span>
             {score !== null && (
               <div className="flex items-center gap-2">
                 <Trophy className={`size-4 ${score === 100 ? 'text-yellow-500' : 'text-slate-500'}`} />
                 <span className="text-sm font-black text-white">Nota: {score}/100</span>
               </div>
             )}
          </div>
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-1.5">
              {logs.length === 0 && <p className="text-slate-600 italic text-xs">Esperando ejecución...</p>}
              {logs.map((log, i) => (
                <div key={i} className={`flex gap-2 text-xs p-2 rounded ${
                  log.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                  log.type === 'warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                  log.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                  'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                }`}>
                  {log.type === 'error' && <AlertCircle className="size-3.5 shrink-0" />}
                  {log.type === 'success' && <CheckCircle2 className="size-3.5 shrink-0" />}
                  {log.type === 'info' && <Info className="size-3.5 shrink-0" />}
                  <span>{log.msg}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Visualizer Area */}
      <div className="w-full lg:w-[500px] flex flex-col gap-4">
        <Card className="border-slate-800 bg-slate-900/50 flex-1 flex flex-col overflow-hidden">
          <CardHeader className="py-3 px-4 border-b border-slate-800">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <MousePointer2 className="size-4 text-primary" /> Visualización 2D (Plano XY)
            </CardTitle>
          </CardHeader>
          <div className="flex-1 flex items-center justify-center p-4 bg-slate-950">
            <canvas 
              ref={canvasRef} 
              width={450} 
              height={450} 
              className="border border-slate-800 rounded-lg shadow-inner bg-[#0f172a] w-full aspect-square"
            />
          </div>
          <div className="p-4 space-y-3 bg-slate-900/80">
             <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase">
                <div className="flex items-center gap-1"><div className="size-2 bg-emerald-500 rounded-full" /> Trazado (Z=1)</div>
                <div className="flex items-center gap-1"><div className="size-2 bg-indigo-500 rounded-full" /> Aire (Z=11)</div>
                <div className="flex items-center gap-1"><div className="size-2 border border-white/20 border-dashed w-4 h-2" /> Objetivo</div>
             </div>
          </div>
        </Card>

        <Button variant="outline" className="w-full border-slate-700 text-slate-300 gap-2 h-12 font-bold" onClick={() => {
          const blob = new Blob([code], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Modulo_Examen.mod';
          a.click();
        }}>
          <Save className="size-4" /> Descargar Código (.mod)
        </Button>
      </div>
    </div>
  );
}
