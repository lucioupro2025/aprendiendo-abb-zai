import RobotTransferSimulator from '@/components/interactive/RobotTransferSimulator';
import { Button } from '@/components/ui/button';
import { ChevronLeft, GraduationCap, Microscope } from 'lucide-react';
import Link from 'next/link';

export default function LabRoboticoPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col">
      {/* Navigation */}
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="hover:bg-zinc-800">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Microscope className="w-6 h-6 text-blue-500" />
              <span className="font-bold text-xl tracking-tight">Laboratorio Virtual <span className="text-blue-500">ABB</span></span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400 mr-4">
              <span className="text-blue-400">Simulación de Transferencia</span>
              <span className="hover:text-white cursor-pointer transition-colors">Programación RAPID</span>
              <span className="hover:text-white cursor-pointer transition-colors">Calibración WObj</span>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
              <GraduationCap className="w-4 h-4 mr-2" /> Certificar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 md:p-8 flex flex-col">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-2">Entrenamiento de Operación Real</h1>
          <p className="text-zinc-400 text-sm md:text-lg max-w-2xl leading-relaxed">
            Domina el flujo de trabajo desde <span className="text-white font-semibold italic">RobotStudio</span> hasta el 
            <span className="text-white font-semibold italic"> Controlador Real</span>. Sigue los pasos interactivos para completar tu primera transferencia segura.
          </p>
        </div>

        {/* The Simulator */}
        <div className="flex-1 min-h-[600px]">
          <RobotTransferSimulator />
        </div>

        {/* Extra Context / Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <h3 className="font-bold text-amber-500 mb-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Tip de Examen
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              El profesor siempre observa si pides el "Acceso de Escritura" (Grant Access) antes de intentar sincronizar. Si olvidas este paso, no podrás cargar el programa.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <h3 className="font-bold text-blue-500 mb-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              Lógica del Deadman
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Recuerda que el Deadman tiene 3 posiciones. En el simulador, mantén presionado el botón. En la vida real, si lo aprietas muy fuerte por miedo, el robot se detiene.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <h3 className="font-bold text-emerald-500 mb-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              Seguridad Z
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Usa siempre el comando <code className="text-emerald-400">Offs(pInicio, 0, 0, 100)</code> para que el robot se acerque al pizarrón desde el aire y no choque de frente.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 bg-zinc-950 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-zinc-600 text-sm">
            Diseñado para la Tecnicatura en Robótica - UPRO 2026. <br/>
            Guía Didáctica Interactiva para la Operación de Robots ABB.
          </p>
        </div>
      </footer>
    </div>
  );
}
