'use client';

import { useState } from 'react';
import { QuizComponent } from './quiz-component';
import { quizExamenNivel3 } from '@/lib/slide-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  ShieldAlert, 
  Target, 
  Zap,
  Info,
  Navigation,
  Crosshair
} from 'lucide-react';

/* ───────────────────────── FASE I: SINGULARITY ───────────────────────── */
export function SlideExamenSingularity() {
  const [resolved, setResolved] = useState(false);

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Zap className="size-6 text-primary" />
        </div>
        <h2 className="text-3xl font-extrabold text-primary">Fase I: El Bloqueo Cinemático</h2>
      </div>

      <p className="text-lg text-muted-foreground leading-relaxed">
        Al iniciar el examen, el robot estará en un estado de <span className="font-bold text-foreground">Singularidad</span>. Debes identificarlo y resolverlo para poder moverte.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2 border-amber-500/20 bg-amber-500/5 shadow-xl">
          <CardContent className="p-6 space-y-4">
            <h3 className="flex items-center gap-2 font-bold text-xl text-amber-600">
              <AlertTriangle className="size-5" /> ¿Qué es una Singularidad?
            </h3>
            <p className="text-muted-foreground">
              Ocurre cuando dos o más ejes se alinean (especialmente el eje 4 y 6), haciendo que el robot no pueda calcular la trayectoria lineal.
            </p>
            <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
              <span className="font-bold">Síntoma:</span> El robot se detiene y muestra un error de "Singularity" o "Conflicting orientation".
            </div>
          </CardContent>
        </Card>

        <Card className={`border-2 transition-all duration-500 ${resolved ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-primary/20 bg-card/50'}`}>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold text-xl text-primary">¿Cómo resolverlo?</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-2">
                <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                <span>Cambiar el modo de movimiento de <span className="font-bold text-foreground">Lineal</span> a <span className="font-bold text-foreground">Ejes (Joint)</span>.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                <span>Mover el eje 4 o el eje 5 ligeramente para romper la alineación.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                <span>Volver al modo Lineal una vez superado el punto crítico.</span>
              </li>
            </ul>
            {!resolved ? (
              <Button onClick={() => setResolved(true)} className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 mt-2">
                Simular Resolución
              </Button>
            ) : (
              <div className="p-4 bg-emerald-500/10 text-emerald-600 rounded-xl font-bold text-center animate-in fade-in zoom-in duration-300">
                ¡Robot liberado! Ahora puedes usar MoveL.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="p-5 rounded-xl bg-primary/5 border border-primary/10 italic text-muted-foreground">
        "Recuerda: En el examen tienes 6 minutos totales para la Fase I. No pierdas tiempo intentando moverte en lineal si estás bloqueado."
      </div>
    </div>
  );
}

/* ───────────────────────── FASE I: CALIBRACION WOBJ ───────────────────────── */
export function SlideExamenCalibracionWObj() {
  const [step, setStep] = useState(0);
  const steps = [
    { title: 'Punto de Origen (X1)', desc: 'Toca el vértice donde quieres situar el origen (0,0,0) del sistema.', icon: <Target className="size-6" /> },
    { title: 'Dirección Eje X (X2)', desc: 'Toca un punto a lo largo del borde que definirá el eje X positivo.', icon: <Navigation className="size-6" /> },
    { title: 'Dirección Eje Y (Y1)', desc: 'Toca un punto en el plano que definirá la dirección del eje Y.', icon: <Crosshair className="size-6" /> }
  ];

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-[#00D390]/10 rounded-lg">
          <Target className="size-6 text-[#00D390]" />
        </div>
        <h2 className="text-3xl font-extrabold text-[#00D390]">Fase I: Calibración de WorkObject</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {steps.map((s, i) => (
          <div key={i} className={`p-4 rounded-xl border-2 transition-all ${i === step ? 'border-[#00D390] bg-[#00D390]/10' : i < step ? 'border-[#00D390]/40 bg-[#00D390]/5 opacity-60' : 'border-muted opacity-40'}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-bold opacity-70">P{i+1}</span>
              <div className={i === step ? 'text-[#00D390]' : 'text-muted-foreground'}>{s.icon}</div>
            </div>
            <h4 className="font-bold text-sm mb-1">{s.title}</h4>
            <p className="text-xs text-muted-foreground leading-tight">{s.desc}</p>
          </div>
        ))}
      </div>

      <Card className="border-2 border-primary/20 bg-card/50 shadow-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-slate-900 p-8 flex items-center justify-center min-h-[300px] relative">
            {/* 3D Visualization Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
            
            <div className="relative w-64 h-48 border-4 border-slate-700 rounded-lg transform rotate-x-12 rotate-y-12 flex items-center justify-center">
              <div className="absolute -left-2 -top-2 size-6 rounded-full bg-slate-800 border-2 border-slate-600" />
              <div className="absolute -right-2 -top-2 size-6 rounded-full bg-slate-800 border-2 border-slate-600" />
              <div className="absolute -left-2 -bottom-2 size-6 rounded-full bg-slate-800 border-2 border-slate-600" />
              <div className="absolute -right-2 -bottom-2 size-6 rounded-full bg-slate-800 border-2 border-slate-600" />
              
              {step >= 0 && <div className="absolute left-0 top-0 size-8 bg-[#00D390] rounded-full blur-sm animate-pulse" />}
              {step >= 1 && <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-[#00D390] to-transparent shadow-[0_0_10px_#00D390]" />}
              {step >= 2 && <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#00D390] to-transparent shadow-[0_0_10px_#00D390]" />}
              
              <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Mesa de Trabajo</span>
            </div>

            <div className="absolute bottom-6 right-6 flex gap-2">
               <Button variant="outline" size="sm" onClick={() => setStep(0)} disabled={step === 0}><RotateCcw className="size-4" /></Button>
               <Button size="sm" onClick={() => setStep(Math.min(2, step + 1))} disabled={step === 2} className="bg-[#00D390] hover:bg-[#00D390]/90">
                 {step < 2 ? 'Siguiente Punto' : 'Calibración Completa'}
               </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
          <h5 className="font-bold text-primary mb-1 text-sm uppercase tracking-wider">Criterio Docente</h5>
          <p className="text-sm text-muted-foreground">Se evalúa que el origen y la orientación coincidan <span className="font-bold text-foreground">estrictamente</span> con la consigna dada.</p>
        </div>
        <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
          <h5 className="font-bold text-amber-600 mb-1 text-sm uppercase tracking-wider">Tip de Oro</h5>
          <p className="text-sm text-muted-foreground">Asegúrate de que la herramienta (fibrón) toque suavemente el punto sin colisionar.</p>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── FASE II: JOGGING FLUIDO ───────────────────────── */
export function SlideExamenJogging() {
  const [activeSystem, setActiveSystem] = useState('World');

  const systems = [
    { id: 'World', label: 'Mundo', color: 'bg-[#605DFF]', desc: 'Movimiento respecto a la base del robot.' },
    { id: 'Tool', label: 'Herramienta', color: 'bg-[#00D390]', desc: 'Movimiento respecto a la punta del fibrón.' },
    { id: 'Object', label: 'Objeto', color: 'bg-[#F43098]', desc: 'Movimiento respecto al WorkObject creado.' }
  ];

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-[#F43098]/10 rounded-lg">
          <Navigation className="size-6 text-[#F43098]" />
        </div>
        <h2 className="text-3xl font-extrabold text-[#F43098]">Fase II: Navegación y Reorientación</h2>
      </div>

      <p className="text-lg text-muted-foreground">
        El docente te pedirá moverte en un sistema y cambiar a otro <span className="font-bold text-foreground">bajo demanda</span>. Debes demostrar fluidez.
      </p>

      <div className="flex gap-2 p-1 bg-muted rounded-2xl mb-4">
        {systems.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSystem(s.id)}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${activeSystem === s.id ? `${s.color} text-white shadow-lg scale-105` : 'hover:bg-card/50 text-muted-foreground'}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <Card className="border-2 border-primary/20 bg-card/50 overflow-hidden shadow-xl">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-8">
          <div className="relative size-48 flex items-center justify-center bg-slate-900 rounded-full border-4 border-slate-800 shadow-inner">
             {/* Coordinate Axes Visual */}
             <div className={`absolute h-32 w-1 transition-all duration-500 ${activeSystem === 'World' ? 'bg-[#605DFF]' : activeSystem === 'Tool' ? 'bg-[#00D390] rotate-45' : 'bg-[#F43098] -rotate-12'} shadow-[0_0_15px_currentColor]`} />
             <div className={`absolute w-32 h-1 transition-all duration-500 ${activeSystem === 'World' ? 'bg-[#605DFF]' : activeSystem === 'Tool' ? 'bg-[#00D390] rotate-45' : 'bg-[#F43098] -rotate-12'} shadow-[0_0_15px_currentColor]`} />
             <span className="bg-slate-900 px-3 py-1 rounded-full text-[10px] font-black z-10 border border-slate-700">TCP ACTIVE</span>
          </div>
          <div className="flex-1 space-y-4">
            <h4 className="text-2xl font-bold text-primary">Sistema: {activeSystem}</h4>
            <p className="text-muted-foreground text-lg italic">
              {systems.find(s => s.id === activeSystem)?.desc}
            </p>
            <div className="space-y-2">
               <div className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Lo que el docente busca:</div>
               <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold">Cambio rápido en FlexPendant</span>
                  <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold">Seguridad del TCP</span>
                  <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold">Control de velocidad</span>
               </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-xl">
        <p className="text-sm text-amber-700 font-medium">
          <strong>Cuidado:</strong> Al reorientar, el TCP no debe chocar con la superficie. Mantén siempre una distancia de seguridad visual.
        </p>
      </div>
    </div>
  );
}

/* ───────────────────────── FASE III: MONITOREO REAL ───────────────────────── */
export function SlideExamenMonitoreo() {
  return (
    <div className="space-y-6 p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Info className="size-6 text-primary" />
        </div>
        <h2 className="text-3xl font-extrabold text-primary">Fase III: Monitoreo de Posición Real</h2>
      </div>

      <p className="text-lg text-muted-foreground">
        Debes usar las herramientas de monitorización del FlexPendant para confirmar que la posición real coincide con los parámetros solicitados.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-950 border-0 shadow-2xl overflow-hidden">
          <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">FlexPendant Monitor</span>
             <div className="flex gap-1">
                <div className="size-1.5 rounded-full bg-red-500" />
                <div className="size-1.5 rounded-full bg-amber-500" />
                <div className="size-1.5 rounded-full bg-emerald-500" />
             </div>
          </div>
          <CardContent className="p-6 font-mono">
            <div className="space-y-4">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500 text-xs">X</span>
                <span className="text-primary text-xl font-bold">250.42 mm</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500 text-xs">Y</span>
                <span className="text-primary text-xl font-bold">-12.05 mm</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500 text-xs">Z</span>
                <span className="text-primary text-xl font-bold">45.00 mm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 text-xs">WObj</span>
                <span className="text-[#F43098] text-sm font-bold">Mesa_UPRO</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h4 className="text-xl font-bold">¿Cómo validar?</h4>
          <div className="space-y-3">
            {[
              { t: 'Navegar', d: 'Menú Principal → Posición.' },
              { t: 'Verificar Sistema', d: 'Asegúrate de que el WObj mostrado sea el correcto.' },
              { t: 'Comparación Visual', d: 'Valida que el robot esté físicamente donde dicen los números.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-card/50 rounded-2xl border border-primary/10">
                <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black shrink-0">{i+1}</div>
                <div>
                  <div className="font-bold text-foreground">{item.t}</div>
                  <div className="text-sm text-muted-foreground">{item.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── FASE IV: DEFENSA ORAL ───────────────────────── */
export function SlideExamenDefensa() {
  const [qIndex, setQIndex] = useState(0);
  const questions = [
    { q: "¿Por qué es fundamental usar un WorkObject personalizado?", a: "Permite que los puntos programados se muevan automáticamente si desplazamos o rotamos la mesa de trabajo, sin tener que volver a reprogramar cada posición." },
    { q: "¿Qué sucede si sueltas el Deadman en medio de un movimiento?", a: "El robot realiza una parada de categoría 0 o 1 (según configuración), bloqueando los frenos mecánicos de inmediato por seguridad." },
    { q: "¿En qué situación usarías el sistema de coordenadas de Herramienta (Tool)?", a: "Cuando necesitamos mover el robot en la dirección exacta en la que apunta el fibrón, por ejemplo, para acercarnos o alejarnos de la superficie de dibujo." }
  ];

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Zap className="size-6 text-primary" />
        </div>
        <h2 className="text-3xl font-extrabold text-primary">Fase IV: Defensa Oral y Teoría</h2>
      </div>

      <div className="relative">
        <Card className="border-2 border-primary/20 bg-card/50 shadow-2xl overflow-hidden min-h-[250px] flex items-center">
          <CardContent className="p-8 w-full space-y-4">
            <div className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
              <Clock className="size-3" /> Pregunta Típica de Examen
            </div>
            <h3 className="text-2xl font-bold leading-tight">
              {questions[qIndex].q}
            </h3>
            <div className="pt-4 mt-4 border-t border-primary/10">
              <div className="text-xs font-bold text-muted-foreground uppercase mb-2">Respuesta Esperada:</div>
              <p className="text-muted-foreground leading-relaxed italic">
                "{questions[qIndex].a}"
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
           <Button variant="secondary" size="sm" onClick={() => setQIndex((qIndex - 1 + questions.length) % questions.length)} className="rounded-full shadow-lg">Anterior</Button>
           <Button variant="secondary" size="sm" onClick={() => setQIndex((qIndex + 1) % questions.length)} className="rounded-full shadow-lg">Siguiente Pregunta</Button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/20">
          <CheckCircle2 className="size-5 text-emerald-500 mt-1" />
          <p className="text-sm text-muted-foreground">Sé conciso y usa terminología técnica (TCP, WObj, Singularidad, Jogging).</p>
        </div>
        <div className="flex items-start gap-3 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/20">
          <CheckCircle2 className="size-5 text-emerald-500 mt-1" />
          <p className="text-sm text-muted-foreground">Relaciona la teoría con lo que hiciste físicamente durante la Fase I y II.</p>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── PENALIZACIONES Y SEGURIDAD ───────────────────────── */
export function SlideExamenPenalizaciones() {
  return (
    <div className="space-y-6 p-4 md:p-8 max-w-4xl mx-auto text-center">
       <ShieldAlert className="size-16 text-red-500 mx-auto mb-4" />
       <h2 className="text-4xl font-black text-foreground">Seguridad y Penalizaciones</h2>
       <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
         El cumplimiento de las tareas de seguridad es <span className="text-red-500 font-bold">obligatorio</span> para aprobar.
       </p>

       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-card border-2 border-red-500/20 rounded-2xl shadow-xl flex flex-col items-center gap-3">
             <div className="size-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 font-black text-2xl">-10</div>
             <h4 className="font-bold">Exceso de Tiempo</h4>
             <p className="text-xs text-muted-foreground">Superar los 6 minutos iniciales en la Fase I.</p>
          </div>
          <div className="p-6 bg-card border-2 border-red-500/40 rounded-2xl shadow-xl flex flex-col items-center gap-3">
             <div className="size-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-black text-2xl">-20</div>
             <h4 className="font-bold">Colisión Leve</h4>
             <p className="text-xs text-muted-foreground">Contacto excesivo con la superficie o piezas.</p>
          </div>
          <div className="p-6 bg-red-600 rounded-2xl shadow-2xl flex flex-col items-center gap-3 text-white">
             <ShieldAlert className="size-12" />
             <h4 className="font-bold text-lg uppercase tracking-tighter">REPROBACIÓN</h4>
             <p className="text-xs text-red-100">Omitir Deadman, colisión grave o riesgo físico.</p>
          </div>
       </div>

       <div className="mt-12">
         <QuizComponent questions={quizExamenNivel3} label="Penalizaciones" />
       </div>
    </div>
  );
}
