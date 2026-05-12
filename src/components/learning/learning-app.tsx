'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  ChevronLeft, ChevronRight, Menu, Home, BookOpen,
  CheckCircle, HelpCircle, Code, MousePointerClick, Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { slides, sections } from '@/lib/slide-data';
import { getAssetPath } from '@/lib/utils';

// Slide components
import { SlideCover, SlideTOC } from './slides-cover-toc';
import {
  SlideMovimientosOverview, SlideJointMovement, SlideLinearMovement,
  SlideReorientation, SlideQuizMovimientos,
} from './slides-movimientos';
import {
  SlideCoordenadasOverview, SlideBaseSystem, SlideWorldSystem,
  SlideObjectSystem, SlideToolSystem, SlideQuizCoordenadas,
} from './slides-coordenadas';
import {
  SlideMoveJMoveL, SlideMovementParams, SlideCompleteCode,
  SlideWorkObjects, SlideCreateWorkObject, SlideQuizWorkObjects,
  SlideCreatingPaths, SlideProgramPaths, SlideCalibrationCounter,
  SlideCalibrationSteps, SlideQuizCalibracion, SlideTriangleCenter,
  SlideDrawingRobot, SlideSummary,
} from './slides-rest';
import {
  SlideTransferIntro, SlideConnection, SlidePermissions,
  SlideSyncModules, SlideLoadData, SlideAlignment,
  SlideExecution, SlideQuizTransferencia,
} from './slides-transferencia';
import {
  SlideMoveC, SlideOffsExamen, SlideAproximacionSegura,
  SlideRobtarget, SlideHombreMuerto, SlideCodigoExamen,
  SlideTipsExamen, SlideQuizExamen,
} from './slides-examen';
import {
  SlideExamenSingularity, SlideExamenCalibracionWObj, SlideExamenJogging,
  SlideExamenMonitoreo, SlideExamenDefensa, SlideExamenPenalizaciones
} from './slides-examen-nivel3';
import { 
  SlideTCPCalibration, 
  SlideWObjDefinition, 
  SlideRevCounterUpdate 
} from './slides-flexpendant';
import {
  SlideRSWorkflow,
  SlideOrientationConfig,
  SlideSyncSim
} from './slides-advanced-rs';
import { QuizView } from './quiz-view';

import RobotTransferSimulator from '@/components/interactive/RobotTransferSimulator';

// ============================================================
// Helpers
// ============================================================

function getTypeIcon(type: string) {
  switch (type) {
    case 'quiz': return <HelpCircle className="size-3.5" />;
    case 'code': return <Code className="size-3.5" />;
    case 'interactive': return <MousePointerClick className="size-3.5" />;
    default: return <Layers className="size-3.5" />;
  }
}

// ============================================================
// Slide renderer
// ============================================================

function SlideView({ slideId, onGoToSlide }: { slideId: number; onGoToSlide: (id: number) => void }) {
  const slide = slides.find(s => s.id === slideId) || slides[0];
  
  switch (slideId) {
    case 0: return <SlideCover />;
    case 1: return <SlideTOC onGoToSlide={onGoToSlide} />;
    case 2: return <SlideMovimientosOverview />;
    case 3: return <SlideJointMovement />;
    case 4: return <SlideLinearMovement />;
    case 5: return <SlideReorientation />;
    case 6: return <SlideQuizMovimientos />;
    case 7: return <SlideCoordenadasOverview />;
    case 8: return <SlideBaseSystem />;
    case 9: return <SlideWorldSystem />;
    case 10: return <SlideObjectSystem />;
    case 11: return <SlideToolSystem />;
    case 12: return <SlideQuizCoordenadas />;
    case 13: return <SlideMoveJMoveL />;
    case 14: return <SlideMovementParams />;
    case 15: return <SlideCompleteCode />;
    case 16: return <SlideWorkObjects />;
    case 17: return <SlideCreateWorkObject />;
    case 18: return <SlideQuizWorkObjects />;
    case 19: return <SlideCreatingPaths />;
    case 20: return <SlideProgramPaths />;
    case 21: return <SlideCalibrationCounter />;
    case 22: return <SlideCalibrationSteps />;
    case 23: return <SlideQuizCalibracion />;
    case 24: return <SlideTransferIntro />;
    case 25: return <SlideConnection />;
    case 26: return <SlidePermissions />;
    case 27: return <SlideSyncModules />;
    case 28: return <SlideLoadData />;
    case 29: return <SlideAlignment />;
    case 30: return <SlideExecution />;
    case 31: return <SlideQuizTransferencia />;
    case 32: return <SlideTriangleCenter />;
    case 33: return <SlideDrawingRobot />;
    case 34: return <QuizView slide={slide} />;
    case 35: return <SlideAproximacionSegura />; // Reusing this as it fits optimization/safety
    case 36: return <SlideMoveC />;
    case 37: return <SlideOffsExamen />;
    case 38: return <SlideAproximacionSegura />;
    case 39: return <SlideRobtarget />;
    case 40: return <SlideHombreMuerto />;
    case 41: return <SlideCodigoExamen />;
    case 42: return <SlideTipsExamen />;
    case 43: return <SlideQuizExamen />;
    case 44: return <SlideExamenSingularity />;
    case 45: return <SlideExamenCalibracionWObj />;
    case 46: return <SlideExamenJogging />;
    case 47: return <SlideExamenMonitoreo />;
    case 48: return <SlideExamenDefensa />;
    case 49: return <SlideExamenPenalizaciones />;
    case 50: return <SlideTCPCalibration />;
    case 51: return <SlideWObjDefinition />;
    case 52: return <SlideRevCounterUpdate />;
    case 53: return <QuizView slide={slide} />;
    case 54: return <SlideRSWorkflow />;
    case 55: return <SlideOrientationConfig />;
    case 56: return <SlideSyncSim />;
    case 57: return <SlideSummary />;
    case 58: return <QuizView slide={slide} />;
    case 59: return <div className="h-[700px] w-full max-w-6xl mx-auto"><RobotTransferSimulator /></div>;
    default: return <div className="p-8 text-center text-muted-foreground">Diapositiva no encontrada</div>;
  }
}

// ============================================================
// Section progress
// ============================================================

function sectionProgress(startId: number, visited: Set<number>): number {
  const next = sections.find((s) => s.startId > startId);
  const endId = next ? next.startId : Math.max(...slides.map(s => s.id)) + 1;
  const sectionSlides = slides.filter((s) => s.id >= startId && s.id < endId && s.section !== '');
  if (sectionSlides.length === 0) return 0;
  return Math.round((sectionSlides.filter((s) => visited.has(s.id)).length / sectionSlides.length) * 100);
}

// ============================================================
// Main app
// ============================================================

export function LearningApp() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));

  const total = slides.length;
  const slide = slides.find(s => s.id === currentSlide) || slides[0];
  const overallProgress = Math.round((visited.size / total) * 100);

  const goTo = useCallback((id: number) => {
    setCurrentSlide(id);
    setVisited((prev) => new Set(prev).add(id));
    setSidebarOpen(false);
  }, []);

  const goNext = useCallback(() => {
    const currentIndex = slides.findIndex(s => s.id === currentSlide);
    if (currentIndex < slides.length - 1) {
      goTo(slides[currentIndex + 1].id);
    }
  }, [goTo, currentSlide]);

  const goPrev = useCallback(() => {
    const currentIndex = slides.findIndex(s => s.id === currentSlide);
    if (currentIndex > 0) {
      goTo(slides[currentIndex - 1].id);
    }
  }, [goTo, currentSlide]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); goNext(); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goPrev(); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  // Scroll content to top when changing slides
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSlide]);

  // Sidebar width for offset calculations
  const sidebarW = sidebarCollapsed ? 'w-16' : 'w-60';

  // Sidebar content (shared desktop/mobile)
  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 py-5">
        <img 
          src={getAssetPath('/logo-pinnapp.png')} 
          alt="Pinnapp" 
          className="size-10 object-contain shrink-0" 
        />
        <div className="min-w-0">
          <h2 className="text-base font-bold text-white truncate">Pinnapp</h2>
          <p className="text-xs text-slate-400 truncate">Aprendizaje Pro</p>
        </div>
      </div>

      <div className="mx-4 h-px bg-slate-700" />

      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-400">Progreso</span>
          <span className="text-xs text-slate-300 font-semibold">{overallProgress}%</span>
        </div>
        <Progress value={overallProgress} className="h-1.5 bg-slate-700 [&>div]:bg-gradient-to-r [&>div]:from-orange-400 [&>div]:to-red-400" />
      </div>

      <div className="mx-4 h-px bg-slate-700" />

      <ScrollArea className="flex-1 px-3 py-2">
        <nav className="space-y-1" role="navigation" aria-label="Secciones">
          {sections.map((sec) => {
            const prog = sectionProgress(sec.startId, visited);
            const isActive = slide.section === sec.name;
            const count = slides.filter((s) => s.section === sec.name).length;
            const done = slides.filter((s) => s.section === sec.name && visited.has(s.id)).length;
            return (
              <button key={sec.name} onClick={() => goTo(sec.startId)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${isActive ? 'bg-slate-700/70 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                <div className={`w-1 rounded-full bg-gradient-to-b ${sec.color} shrink-0 transition-all ${isActive ? 'h-8' : 'h-6 group-hover:h-7'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium truncate">{sec.name}</span>
                    {prog === 100 && <CheckCircle className="size-3 text-emerald-400 shrink-0" />}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 h-1 rounded-full bg-slate-700 overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${sec.color} transition-all`} style={{ width: `${prog}%` }} />
                    </div>
                    <span className="text-[10px] text-slate-500 tabular-nums">{done}/{count}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
        <div className="pt-3 pb-2 space-y-1">
          <div className="h-px bg-slate-700 mb-3" />
          <button onClick={() => goTo(0)} className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-sm">
            <Home className="size-4" /> Inicio
          </button>
          <button onClick={() => goTo(1)} className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-sm">
            <BookOpen className="size-4" /> Contenido
          </button>
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <>
      {/* ===== Desktop Sidebar ===== */}
      <aside className={`hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-30 bg-slate-900 text-white transition-all duration-300 ${sidebarW}`}>
        <div className="flex items-center justify-end px-2 py-2">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800 h-7 w-7"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            {sidebarCollapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </Button>
        </div>
        {sidebarCollapsed ? (
          <ScrollArea className="flex-1 px-2">
            <div className="space-y-1">
              {sections.map((sec) => (
                <button key={sec.name} onClick={() => goTo(sec.startId)} title={sec.name}
                  className="w-full flex flex-col items-center py-1.5 rounded-lg hover:bg-slate-800 transition-all">
                  <div className={`w-1.5 h-5 rounded-full bg-gradient-to-b ${sec.color}`} />
                  <span className="text-[8px] text-slate-400 mt-0.5">{sec.icon}</span>
                </button>
              ))}
            </div>
          </ScrollArea>
        ) : sidebarContent}
      </aside>

      {/* ===== Mobile Header ===== */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center gap-2 px-3 py-2.5 border-b bg-white/95 backdrop-blur-sm lg:hidden">
        <Button variant="ghost" size="icon" className="shrink-0" onClick={() => setSidebarOpen(true)}>
          <Menu className="size-5" />
        </Button>
        <div className="min-w-0 flex-1">
          <h1 className="text-sm font-semibold truncate">{slide?.title}</h1>
          {slide?.section && <p className="text-xs text-muted-foreground truncate">{slide.section}</p>}
        </div>
        {slide?.type !== 'cover' && slide?.type !== 'toc' && (
          <Badge variant="secondary" className="gap-1 shrink-0 text-[10px]">{getTypeIcon(slide?.type || 'content')}</Badge>
        )}
      </header>

      {/* ===== Main Content ===== */}
      <main
        className={`pt-16 pb-16 lg:pt-0 lg:pb-14 min-h-screen lg:min-h-0 transition-[padding,margin] duration-300 ${
          sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-60'
        }`}
      >
        <div className="py-4">
          <SlideView slideId={currentSlide} onGoToSlide={goTo} />
        </div>
      </main>

      {/* ===== Bottom Nav ===== */}
      <nav
        className={`fixed bottom-0 right-0 z-40 flex items-center justify-between px-3 py-2.5 border-t bg-white/95 backdrop-blur-sm transition-[left] duration-300 left-0 lg:left-auto ${
          sidebarCollapsed ? 'lg:left-16' : 'lg:left-60'
        }`}
        role="navigation"
        aria-label="Navegacion de diapositivas"
      >
        <div className="flex items-center gap-1.5 flex-1">
          <Button
            variant="outline"
            size="lg"
            onClick={goPrev}
            disabled={slides.findIndex(s => s.id === currentSlide) === 0}
            className="flex-1 md:flex-none gap-2 h-12 text-base font-semibold"
          >
            <ChevronLeft className="size-5" />
            <span className="hidden sm:inline">Anterior</span>
          </Button>
          <Button
            onClick={goNext}
            disabled={slides.findIndex(s => s.id === currentSlide) === slides.length - 1}
            className="flex-1 md:flex-none gap-2 h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight className="size-5" />
          </Button>
        </div>
        <div className="hidden md:flex items-center gap-2 px-2">
          <span className="text-sm font-medium tabular-nums">{slides.findIndex(s => s.id === currentSlide) + 1}</span>
          <span className="text-sm text-muted-foreground">/</span>
          <span className="text-sm tabular-nums text-muted-foreground">{total}</span>
          <div className="hidden sm:block w-24 md:w-36">
            <Progress value={((slides.findIndex(s => s.id === currentSlide) + 1) / total) * 100} className="h-1.5" />
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-1 justify-end">
          <Button variant="ghost" size="icon" className="shrink-0" onClick={() => goTo(0)}>
            <Home className="size-4" />
          </Button>
          <Button size="sm" onClick={goNext} disabled={slides.findIndex(s => s.id === currentSlide) === total - 1} className="gap-1 shrink-0">
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </nav>

      {/* ===== Mobile Sidebar (Sheet) ===== */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-72 bg-slate-900 border-slate-700">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          {sidebarContent}
        </SheetContent>
      </Sheet>
    </>
  );
}
