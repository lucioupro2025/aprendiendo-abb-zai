'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { sections, slides } from '@/lib/slide-data';
import { getAssetPath } from '@/lib/utils';

export function SlideCover() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] p-4">
      <div className="w-full max-w-xl">
        <div className="relative overflow-hidden rounded-2xl bg-slate-900 text-white p-8 md:p-12 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-48 h-48 rounded-full bg-white/10 blur-xl" />

          <div className="relative z-10 flex flex-col items-center text-center gap-5">
            <div className="size-64 flex items-center justify-center">
              <img 
                src={getAssetPath('/logo-pinnapp.png')} 
                alt="Pinnapp Logo" 
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2">
                Pinnapp
              </h1>
              <p className="text-lg text-white/80 font-medium">
                Guia Didactica Interactiva - Tecnicatura en Robotica
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-1">
              <Badge className="bg-white/20 text-white hover:bg-white/30 border-0 px-3 py-1">
                12 Secciones
              </Badge>
              <Badge className="bg-white/20 text-white hover:bg-white/30 border-0 px-3 py-1">
                8 Quizzes
              </Badge>
              <Badge className="bg-white/20 text-white hover:bg-white/30 border-0 px-3 py-1">
                Ejercicios de Codigo
              </Badge>
              <Badge className="bg-white/20 text-white hover:bg-white/30 border-0 px-3 py-1">
                Simulaciones Interactivas
              </Badge>
            </div>
            <p className="text-sm text-white/60 mt-2">
              Usa las flechas ← → o los botones de abajo para navegar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SlideTOC({ onGoToSlide }: { onGoToSlide: (id: number) => void }) {
  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Contenido del Curso</h2>
      <p className="text-muted-foreground text-sm">
        Selecciona una seccion para comenzar a aprender. Cada seccion incluye contenido teorico, ejemplos interactivos y quizzes.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {sections.map((sec) => (
          <button
            key={sec.name}
            onClick={() => onGoToSlide(sec.startId)}
            className="text-left p-4 rounded-xl border bg-card hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${sec.color} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                {sec.icon}
              </div>
              <div>
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                  {sec.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {slides.filter((s) => s.section === sec.name).length} diapositivas
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
