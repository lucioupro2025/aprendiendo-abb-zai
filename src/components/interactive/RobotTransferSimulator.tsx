'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, 
  Terminal, 
  Cpu, 
  Play, 
  Settings, 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight,
  Hand,
  Monitor,
  MousePointer2,
  Lock,
  Unlock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

type Figure = 'triangle' | 'square' | 'circle';

const FIGURES: Record<Figure, { code: string, points: { x: number, y: number, z: number }[] }> = {
  triangle: {
    code: `PROC DibujarTriangulo()
    MoveJ pHome, v500, z50, toolpina;
    MoveL Offs(p1, 0, 0, 100), v100, fine, toolpina;
    MoveL p1, v50, fine, toolpina;
    MoveL p2, v100, fine, toolpina;
    MoveL p3, v100, fine, toolpina;
    MoveL p1, v100, fine, toolpina;
    MoveL Offs(p1, 0, 0, 100), v100, fine, toolpina;
ENDPROC`,
    points: [
      { x: 50, y: 20, z: 10 }, { x: 30, y: 65, z: 0 }, { x: 70, y: 65, z: 0 }, 
      { x: 50, y: 30, z: 0 }, { x: 30, y: 65, z: 0 }, { x: 50, y: 20, z: 10 }
    ]
  },
  square: {
    code: `PROC DibujarCuadrado()
    MoveJ pHome, v500, z50, toolpina;
    MoveL Offs(p1, 0, 0, 100), v100, fine, toolpina;
    MoveL p1, v50, fine, toolpina;
    MoveL p2, v100, fine, toolpina;
    MoveL p3, v100, fine, toolpina;
    MoveL p4, v100, fine, toolpina;
    MoveL p1, v100, fine, toolpina;
    MoveL Offs(p1, 0, 0, 100), v100, fine, toolpina;
ENDPROC`,
    points: [
      { x: 50, y: 20, z: 10 }, { x: 30, y: 30, z: 0 }, { x: 70, y: 30, z: 0 }, 
      { x: 70, y: 70, z: 0 }, { x: 30, y: 70, z: 0 }, { x: 30, y: 30, z: 0 }, 
      { x: 50, y: 20, z: 10 }
    ]
  },
  circle: {
    code: `PROC DibujarCirculo()
    MoveJ pHome, v500, z50, toolpina;
    MoveL Offs(pStart, 0, 0, 100), v100, fine, toolpina;
    MoveL pStart, v50, fine, toolpina;
    ! MoveC requiere punto intermedio y final
    MoveC pMid, pEnd, v100, fine, toolpina;
    MoveC pMidBack, pStart, v100, fine, toolpina;
    MoveL Offs(pStart, 0, 0, 100), v100, fine, toolpina;
ENDPROC`,
    points: [
      { x: 50, y: 20, z: 10 }, { x: 50, y: 30, z: 0 }, 
      { x: 70, y: 50, z: 0 }, { x: 50, y: 70, z: 0 }, 
      { x: 30, y: 50, z: 0 }, { x: 50, y: 30, z: 0 }, 
      { x: 50, y: 20, z: 10 }
    ]
  }
};

type Step = 'physical' | 'connect' | 'sync' | 'grant' | 'run';

export default function RobotTransferSimulator() {
  const [step, setStep] = useState<Step>('physical');
  const [figure, setFigure] = useState<Figure>('triangle');
  const [isConnected, setIsConnected] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(25);
  const [isMotorsOn, setIsMotorsOn] = useState(false);
  const [isDeadmanPressed, setIsDeadmanPressed] = useState(false);
  const [robotPos, setRobotPos] = useState({ x: 50, y: 50, z: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [drawing, setDrawing] = useState<{ x: number, y: number }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Simulation Logic
  useEffect(() => {
    if (isRunning && isDeadmanPressed && isMotorsOn) {
      const points = FIGURES[figure].points;

      const interval = setInterval(() => {
        if (currentIndex < points.length) {
          const p = points[currentIndex];
          setRobotPos(p);
          if (p.z === 0) {
            setDrawing(prev => [...prev, { x: p.x, y: p.y }]);
          }
          setCurrentIndex(prev => prev + 1);
        } else {
          setIsRunning(false);
          setCurrentIndex(0);
          clearInterval(interval);
        }
      }, 10000 / speed);

      return () => clearInterval(interval);
    }
  }, [isRunning, isDeadmanPressed, isMotorsOn, speed, figure, currentIndex]);

  const nextStep = () => {
    if (step === 'physical') setStep('connect');
    if (step === 'connect') setStep('sync');
    if (step === 'sync') setStep('grant');
    if (step === 'grant') setStep('run');
  };

  return <div className="flex flex-col h-full bg-zinc-950 text-zinc-100 p-3 md:p-4 rounded-xl overflow-hidden border border-zinc-800 shadow-2xl overflow-y-auto md:overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 border-b border-zinc-800 pb-4 gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Simulador de Transferencia ABB
          </h2>
          <p className="text-zinc-500 text-[10px] md:text-sm">Aprende paso a paso cómo llevar tu código al robot real</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant={isConnected ? "default" : "outline"} className={`text-[10px] md:text-xs ${isConnected ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50" : ""}`}>
            {isConnected ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
            {isConnected ? "Controlador Conectado" : "Desconectado"}
          </Badge>
          <Badge variant={hasAccess ? "default" : "outline"} className={`text-[10px] md:text-xs ${hasAccess ? "bg-blue-500/20 text-blue-400 border-blue-500/50" : ""}`}>
            {hasAccess ? <Unlock className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
            {hasAccess ? "Acceso de Escritura" : "Solo Lectura"}
          </Badge>
        </div>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-6 flex-1 min-h-0">
        {/* Left Panel: Guide & Controls */}
        <div className="order-2 md:order-1 md:col-span-4 flex flex-col gap-4">
          <Card className="bg-zinc-900 border-zinc-800 p-4 flex flex-col gap-4 h-full">
            <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
              <Settings className="w-5 h-5" />
              Guía de Aprendizaje
            </div>

            <div className="space-y-3 md:space-y-4">
              <StepItem 
                active={step === 'physical'} 
                done={['connect', 'sync', 'grant', 'run'].includes(step)}
                title="1. Conexión Física"
                desc="Conecta el cable Ethernet al Puerto de Servicio."
              />
              <StepItem 
                active={step === 'connect'} 
                done={['sync', 'grant', 'run'].includes(step)}
                title="2. Vincular RobotStudio"
                desc="Selecciona 'Conexión con un clic' para detectar el robot."
              />
              <StepItem 
                active={step === 'sync'} 
                done={['grant', 'run'].includes(step)}
                title="3. Sincronizar RAPID"
                desc="Pestaña RAPID -> Sincronizar con RAPID."
              />
              <StepItem 
                active={step === 'grant'} 
                done={['run'].includes(step)}
                title="4. Autorizar Acceso"
                desc="Acepta la solicitud en el FlexPendant virtual."
              />
              <StepItem 
                active={step === 'run'} 
                done={false}
                title="5. Ejecución Segura"
                desc="Pulsa Deadman, enciende motores y dale a Play."
              />
            </div>

            <div className="mt-auto pt-4 border-t border-zinc-800">
              <AnimatePresence mode="wait">
                {step === 'physical' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm" onClick={nextStep}>
                      Conectar Cable Ethernet <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                )}
                {step === 'connect' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-sm" onClick={() => { setIsConnected(true); nextStep(); }}>
                      Conexión con un clic <Wifi className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                )}
                {step === 'sync' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-sm" onClick={() => { setIsSynced(true); nextStep(); }}>
                      Sincronizar a RAPID <Terminal className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                )}
                {step === 'grant' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-2">
                    <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded text-amber-500 text-[10px] flex items-center gap-2 leading-tight">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      Acepta en el FlexPendant...
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm" onClick={() => { setHasAccess(true); nextStep(); }}>
                      Conceder Acceso
                    </Button>
                  </motion.div>
                )}
                {step === 'run' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-zinc-500 uppercase font-bold">Velocidad (Seguridad: 25%)</label>
                      <input 
                        type="range" min="1" max="100" value={speed} 
                        onChange={(e) => setSpeed(parseInt(e.target.value))}
                        className="w-full accent-blue-500"
                      />
                      <div className="flex justify-between text-[10px] text-zinc-600 font-mono">
                        <span>1%</span>
                        <span className="text-blue-400 font-bold">{speed}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant={isMotorsOn ? "default" : "outline"} 
                        className={`h-9 text-[10px] ${isMotorsOn ? "bg-emerald-600" : "border-zinc-700"}`}
                        onClick={() => setIsMotorsOn(!isMotorsOn)}
                      >
                        <Cpu className="w-3 h-3 mr-1" /> Motores {isMotorsOn ? "ON" : "OFF"}
                      </Button>
                      <Button 
                        variant={isDeadmanPressed ? "default" : "outline"} 
                        className={`h-9 text-[10px] select-none touch-none ${isDeadmanPressed ? "bg-blue-600" : "border-zinc-700"}`}
                        onMouseDown={() => setIsDeadmanPressed(true)}
                        onMouseUp={() => setIsDeadmanPressed(false)}
                        onMouseLeave={() => setIsDeadmanPressed(false)}
                        onTouchStart={(e) => { e.preventDefault(); setIsDeadmanPressed(true); }}
                        onTouchEnd={() => setIsDeadmanPressed(false)}
                      >
                        <Hand className="w-3 h-3 mr-1" /> Deadman
                      </Button>
                    </div>
                    <Button 
                      disabled={!isMotorsOn || !isDeadmanPressed}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-30 h-10 text-xs font-bold"
                      onClick={() => { setIsRunning(true); setDrawing([]); setCurrentIndex(0); }}
                    >
                      <Play className="w-4 h-4 mr-2" /> INICIAR PROGRAMA
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </div>

        {/* Center Panel: Robot Viewport */}
        <div className="order-1 md:order-2 md:col-span-5 flex flex-col gap-4">
          <div className="relative aspect-square md:aspect-auto md:flex-1 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex items-center justify-center min-h-[300px]">
            <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
              <Badge variant="outline" className="bg-zinc-950/50 backdrop-blur text-[8px] md:text-[10px]">Vista: Real (IRB 1100)</Badge>
              {isRunning && <Badge className="bg-red-500 animate-pulse text-[8px] md:text-[10px] w-fit">EJECUTANDO</Badge>}
            </div>

            {/* Simulated Whiteboard */}
            <div className="w-[85%] aspect-square bg-zinc-800 rounded-sm border-2 border-zinc-700 relative overflow-hidden shadow-inner">
               <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-5">
                 {Array.from({length: 100}).map((_, i) => <div key={i} className="border border-zinc-100" />)}
               </div>
               
               {/* Drawing */}
               <svg className="absolute inset-0 w-full h-full">
                  <polyline 
                    points={drawing.map(p => `${(p.x/100)*100}% ${(p.y/100)*100}%`).join(' ')}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
               </svg>

               {/* Robot Pointer (TCP) */}
               <motion.div 
                 animate={{ 
                   left: `${robotPos.x}%`, 
                   top: `${robotPos.y}%`,
                   scale: 1 + (robotPos.z / 50)
                 }}
                 transition={{ type: "spring", stiffness: 100, damping: 20 }}
                 className="absolute w-6 h-6 -ml-3 -mt-3 flex items-center justify-center z-20"
               >
                 <div className="w-full h-full bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)] flex items-center justify-center">
                    <MousePointer2 className="w-3 h-3 text-white" />
                 </div>
                 {/* Tool "Fibrón" indicator */}
                 <div className="absolute top-full w-1 h-6 bg-zinc-400 origin-top" style={{ transform: 'rotateX(45deg)' }} />
               </motion.div>
            </div>

            {/* Instruction Feedback */}
            <AnimatePresence>
              {isRunning && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur p-2 rounded border border-blue-500/50 text-[9px] font-mono text-blue-300 z-10 whitespace-nowrap"
                >
                  MoveL pInicio, v{speed*10}, fine, toolpina...
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Panel: RAPID Code & Status */}
        <div className="order-3 md:col-span-3 flex flex-col gap-4">
          <Card className="bg-zinc-900 border-zinc-800 p-4 flex flex-col h-full min-h-[250px] md:min-h-0">
            <div className="flex items-center gap-2 text-purple-400 font-semibold mb-3">
              <Terminal className="w-5 h-5" />
              Editor RAPID
            </div>
            <div className="flex-1 bg-black rounded p-2 md:p-3 font-mono text-[9px] md:text-[11px] overflow-y-auto text-zinc-400 border border-zinc-800">
               <pre className="whitespace-pre-wrap">
                 {FIGURES[figure].code.split('\n').map((line, i) => (
                   <div key={i} className="flex gap-2 hover:bg-zinc-800/50">
                     <span className="text-zinc-700 w-3 select-none">{i+1}</span>
                     <span className="break-all">{line}</span>
                   </div>
                 ))}
               </pre>
            </div>
            
            <div className="mt-3 flex flex-col gap-2">
              <label className="text-[10px] uppercase text-zinc-600 font-bold">Figura</label>
              <div className="grid grid-cols-3 gap-1">
                {(['triangle', 'square', 'circle'] as Figure[]).map(f => (
                  <Button 
                    key={f}
                    variant={figure === f ? "default" : "outline"} 
                    className={`h-7 text-[9px] capitalize px-1 ${figure === f ? 'bg-purple-600' : 'border-zinc-800'}`}
                    onClick={() => { setFigure(f); setDrawing([]); }}
                    disabled={isRunning}
                  >
                    {f === 'triangle' && 'Tr.'}
                    {f === 'square' && 'Cuad.'}
                    {f === 'circle' && 'Círc.'}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-3 p-2 bg-zinc-950 rounded border border-zinc-800">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-zinc-500 uppercase font-bold">Sync:</span>
                {isSynced ? (
                  <span className="text-emerald-400 flex items-center font-bold">OK</span>
                ) : (
                  <span className="text-zinc-500">PENDIENTE</span>
                )}
              </div>
              <Progress value={isSynced ? 100 : 0} className="h-1 mt-1.5" />
            </div>
          </Card>
        </div>
      </div>
    </div>;
}

function StepItem({ active, done, title, desc }: { active: boolean, done: boolean, title: string, desc: string }) {
  return <div className={`relative pl-8 transition-opacity ${!active && !done ? 'opacity-40' : 'opacity-100'}`}>
      <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
        done ? 'bg-emerald-500 border-emerald-500 text-white' : 
        active ? 'border-blue-500 text-blue-500' : 'border-zinc-800 text-zinc-800'
      }`}>
        {done ? <CheckCircle2 className="w-4 h-4" /> : <div className="text-[10px] font-bold">{title[0]}</div>}
      </div>
      {active && (
        <motion.div 
          layoutId="active-step"
          className="absolute left-[-4px] top-0 w-[2px] h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        />
      )}
      <div className={`text-sm font-semibold ${active ? 'text-blue-400' : done ? 'text-emerald-400' : 'text-zinc-500'}`}>
        {title}
      </div>
      <div className="text-[11px] text-zinc-500 leading-tight mt-0.5">{desc}</div>
    </div>;
}
