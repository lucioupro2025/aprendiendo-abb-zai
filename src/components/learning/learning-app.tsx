'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Home,
  BookOpen,
  CheckCircle,
  XCircle,
  HelpCircle,
  Code,
  MousePointerClick,
  Layers,
  Trophy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';
import {
  slides,
  sections,
  type SlideData,
} from '@/lib/slide-data';
import { renderSlideContent } from '@/components/learning/slide-content';

// ============================================================
// Types
// ============================================================

interface QuizResult {
  slideId: number;
  score: number;
  total: number;
  completed: boolean;
  answers: Record<string, number>;
}

// ============================================================
// Slide type icon helper
// ============================================================

function getSlideTypeIcon(type: SlideData['type']) {
  switch (type) {
    case 'quiz':
      return <HelpCircle className="size-3.5" />;
    case 'code':
      return <Code className="size-3.5" />;
    case 'interactive':
      return <MousePointerClick className="size-3.5" />;
    case 'content':
      return <Layers className="size-3.5" />;
    default:
      return <BookOpen className="size-3.5" />;
  }
}

function getSlideTypeLabel(type: SlideData['type']) {
  switch (type) {
    case 'quiz':
      return 'Quiz';
    case 'code':
      return 'Codigo';
    case 'interactive':
      return 'Interactivo';
    case 'content':
      return 'Contenido';
    case 'cover':
      return 'Inicio';
    case 'toc':
      return 'Indice';
  }
}

// ============================================================
// Section progress computation
// ============================================================

function computeSectionProgress(
  sectionStartId: number,
  visitedSlides: Set<number>,
  quizResults: QuizResult[]
): number {
  const sectionSlides = slides.filter((s) => s.section !== '' && s.id >= sectionStartId);
  const nextSection = sections.find((sec) => sec.startId > sectionStartId);
  const endId = nextSection ? nextSection.startId : slides.length;
  const relevant = sectionSlides.filter((s) => s.id >= sectionStartId && s.id < endId);

  if (relevant.length === 0) return 0;
  const visited = relevant.filter((s) => visitedSlides.has(s.id)).length;
  return Math.round((visited / relevant.length) * 100);
}

// ============================================================
// Main Component
// ============================================================

export function LearningApp() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visitedSlides, setVisitedSlides] = useState<Set<number>>(new Set([0]));
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);

  // Total slides
  const totalSlides = slides.length;
  const slide = slides[currentSlide];

  // Overall progress
  const overallProgress = useMemo(
    () => Math.round((visitedSlides.size / totalSlides) * 100),
    [visitedSlides, totalSlides]
  );

  const markVisited = useCallback((slideId: number) => {
    setVisitedSlides((prev) => {
      if (prev.has(slideId)) return prev;
      const next = new Set(prev);
      next.add(slideId);
      return next;
    });
  }, []);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => {
      const next = Math.min(prev + 1, totalSlides - 1);
      if (next !== prev) {
        // Mark the next slide as visited (deferred to avoid setting state in callback)
        setTimeout(() => {
          setVisitedSlides((v) => {
            if (v.has(next)) return v;
            const n = new Set(v);
            n.add(next);
            return n;
          });
        }, 0);
      }
      return next;
    });
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => {
      const next = Math.max(prev - 1, 0);
      if (next !== prev) {
        setTimeout(() => {
          setVisitedSlides((v) => {
            if (v.has(next)) return v;
            const n = new Set(v);
            n.add(next);
            return n;
          });
        }, 0);
      }
      return next;
    });
  }, []);

  const goToSlide = useCallback(
    (id: number) => {
      setCurrentSlide(id);
      markVisited(id);
      setSidebarOpen(false);
    },
    [markVisited]
  );

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrev();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Quiz score handlers
  const saveQuizResult = useCallback((result: QuizResult) => {
    setQuizResults((prev) => {
      const filtered = prev.filter((r) => r.slideId !== result.slideId);
      return [...filtered, result];
    });
  }, []);

  const getQuizResult = useCallback(
    (slideId: number): QuizResult | undefined => {
      return quizResults.find((r) => r.slideId === slideId);
    },
    [quizResults]
  );

  // ============================================================
  // Sidebar content (shared between desktop & mobile)
  // ============================================================

  const sidebarContent = useMemo(() => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-5">
        <div className="flex items-center justify-center size-9 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold text-sm shrink-0">
          R
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-white truncate">ABB IRB1100</h2>
          <p className="text-xs text-slate-400 truncate">Aprendizaje Interactivo</p>
        </div>
      </div>

      <Separator className="bg-slate-700" />

      {/* Overall progress */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-slate-400 font-medium">Progreso general</span>
          <span className="text-xs text-slate-300 font-semibold">{overallProgress}%</span>
        </div>
        <Progress value={overallProgress} className="h-1.5 bg-slate-700 [&>div]:bg-gradient-to-r [&>div]:from-orange-400 [&>div]:to-red-400" />
      </div>

      <Separator className="bg-slate-700" />

      {/* Sections list */}
      <ScrollArea className="flex-1 px-3 py-2">
        <nav className="space-y-1" role="navigation" aria-label="Sections">
          {sections.map((section) => {
            const sectionProgress = computeSectionProgress(
              section.startId,
              visitedSlides,
              quizResults
            );
            const isActive = slide.section === section.name;
            const sectionSlideCount = slides.filter(
              (s) => s.section === section.name
            ).length;
            const sectionVisited = slides.filter(
              (s) => s.section === section.name && visitedSlides.has(s.id)
            ).length;

            return (
              <button
                key={section.name}
                onClick={() => goToSlide(section.startId)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 group
                  ${isActive
                    ? 'bg-slate-700/70 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Color indicator */}
                <div
                  className={`w-1 h-8 rounded-full bg-gradient-to-b ${section.color} shrink-0 transition-all ${
                    isActive ? 'h-10' : 'group-hover:h-9'
                  }`}
                />

                {/* Section info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">
                      {section.name}
                    </span>
                    {sectionProgress === 100 && (
                      <CheckCircle className="size-3.5 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 h-1 rounded-full bg-slate-700 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${section.color} transition-all duration-300`}
                        style={{ width: `${sectionProgress}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 tabular-nums">
                      {sectionVisited}/{sectionSlideCount}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="pt-4 pb-2">
          <Separator className="bg-slate-700 mb-3" />
          <button
            onClick={() => goToSlide(0)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-sm"
          >
            <Home className="size-4" />
            <span>Pagina de Inicio</span>
          </button>
          <button
            onClick={() => goToSlide(1)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-sm"
          >
            <BookOpen className="size-4" />
            <span>Tabla de Contenido</span>
          </button>
        </div>
      </ScrollArea>
    </div>
  ), [slide.section, visitedSlides, quizResults, overallProgress, goToSlide]);

  // ============================================================
  // Render current slide placeholder
  // ============================================================

  const renderSlidePlaceholder = () => {
    if (!slide) return null;

    const gradientClass =
      slide.type === 'cover'
        ? 'from-orange-500 via-red-500 to-rose-500'
        : slide.sectionColor || 'from-slate-500 to-zinc-500';

    return (
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-2xl shadow-lg border-0 overflow-hidden">
          {/* Gradient top bar */}
          <div className={`h-2 bg-gradient-to-r ${gradientClass}`} />

          <CardContent className="p-6 md:p-10 text-center">
            {/* Type badge */}
            <Badge
              variant="secondary"
              className="mb-4 text-xs font-medium gap-1.5 px-3 py-1"
            >
              {getSlideTypeIcon(slide.type)}
              {getSlideTypeLabel(slide.type)}
            </Badge>

            {/* Section label */}
            {slide.section && (
              <p className="text-sm text-muted-foreground font-medium mb-2">
                {slide.section}
              </p>
            )}

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              {slide.title}
            </h1>

            {/* Quiz result summary if quiz */}
            {slide.type === 'quiz' && (() => {
              const result = getQuizResult(slide.id);
              if (!result) return null;
              return (
                <div className="mt-4 p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-center justify-center gap-3">
                    {result.completed ? (
                      <>
                        <Trophy className="size-5 text-amber-500" />
                        <span className="font-semibold text-lg">
                          {result.score}/{result.total}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        En progreso...
                      </span>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Placeholder message */}
            <div className="mt-6 p-6 rounded-xl bg-muted/40 border border-dashed border-muted-foreground/20">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                {slide.type === 'quiz' ? (
                  <HelpCircle className="size-8 opacity-40" />
                ) : slide.type === 'code' ? (
                  <Code className="size-8 opacity-40" />
                ) : slide.type === 'interactive' ? (
                  <MousePointerClick className="size-8 opacity-40" />
                ) : (
                  <BookOpen className="size-8 opacity-40" />
                )}
                <p className="text-sm">
                  {slide.type === 'cover'
                    ? 'Contenido de la portada se cargara aqui'
                    : slide.type === 'toc'
                      ? 'Tabla de contenido se cargara aqui'
                      : 'El contenido interactivo de esta diapositiva se implementara pronto'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // ============================================================
  // Bottom navigation bar
  // ============================================================

  const bottomNav = (
    <div className="flex items-center justify-between px-4 py-3 border-t bg-white/80 backdrop-blur-sm">
      {/* Left: Prev button */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrev}
              disabled={currentSlide === 0}
              className="gap-1.5 shrink-0"
            >
              <ChevronLeft className="size-4" />
              <span className="hidden sm:inline">Anterior</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Diapositiva anterior</TooltipContent>
        </Tooltip>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden shrink-0"
          onClick={() => setSidebarOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu className="size-4" />
        </Button>
      </div>

      {/* Center: Slide counter */}
      <div className="flex items-center gap-2 px-3">
        <span className="text-sm font-medium tabular-nums text-foreground">
          {currentSlide + 1}
        </span>
        <span className="text-sm text-muted-foreground">/</span>
        <span className="text-sm tabular-nums text-muted-foreground">
          {totalSlides}
        </span>
        {/* Mini progress */}
        <div className="hidden sm:block w-24 md:w-40">
          <Progress
            value={((currentSlide + 1) / totalSlides) * 100}
            className="h-1.5"
          />
        </div>
      </div>

      {/* Right: Next button + home */}
      <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => goToSlide(0)}
              aria-label="Ir al inicio"
            >
              <Home className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Ir al inicio</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              onClick={goToNext}
              disabled={currentSlide === totalSlides - 1}
              className="gap-1.5 shrink-0"
            >
              <span className="hidden sm:inline">Siguiente</span>
              <ChevronRight className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Diapositiva siguiente</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );

  // ============================================================
  // Render
  // ============================================================

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Desktop sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col bg-slate-900 text-white shrink-0
          transition-all duration-300 ease-in-out overflow-hidden
          ${desktopSidebarCollapsed ? 'w-16' : 'w-64'}
        `}
        aria-label="Menu lateral"
      >
        {/* Collapse toggle */}
        <div className="flex items-center justify-end px-2 py-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-white hover:bg-slate-800 h-7 w-7"
            onClick={() => setDesktopSidebarCollapsed(!desktopSidebarCollapsed)}
            aria-label={desktopSidebarCollapsed ? 'Expandir menu' : 'Colapsar menu'}
          >
            {desktopSidebarCollapsed ? (
              <ChevronRight className="size-4" />
            ) : (
              <ChevronLeft className="size-4" />
            )}
          </Button>
        </div>

        {!desktopSidebarCollapsed ? (
          sidebarContent
        ) : (
          <ScrollArea className="flex-1 px-2 py-1">
            <div className="space-y-1">
              {sections.map((section) => {
                const isActive = slide.section === section.name;
                const sectionProgress = computeSectionProgress(
                  section.startId,
                  visitedSlides,
                  quizResults
                );
                return (
                  <Tooltip key={section.name}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => goToSlide(section.startId)}
                        className={`
                          w-full flex flex-col items-center py-2 rounded-lg transition-all
                          ${isActive ? 'bg-slate-700/70' : 'hover:bg-slate-800'}
                        `}
                        aria-label={section.name}
                      >
                        <div
                          className={`w-2 h-6 rounded-full bg-gradient-to-b ${section.color} mb-1`}
                        />
                        <span className="text-[9px] text-slate-400 leading-tight text-center">
                          {section.name}
                        </span>
                        {sectionProgress === 100 && (
                          <CheckCircle className="size-3 text-emerald-400 mt-0.5" />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {section.name} ({sectionProgress}%)
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="flex items-center gap-3 px-4 py-3 border-b bg-white lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </Button>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="size-7 rounded-md bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
              R
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-semibold truncate">{slide.title}</h1>
              {slide.section && (
                <p className="text-xs text-muted-foreground truncate">
                  {slide.section}
                </p>
              )}
            </div>
          </div>
          {slide.type !== 'cover' && slide.type !== 'toc' && (
            <Badge variant="secondary" className="gap-1 shrink-0 text-[10px]">
              {getSlideTypeIcon(slide.type)}
              <span className="hidden sm:inline">{getSlideTypeLabel(slide.type)}</span>
            </Badge>
          )}
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {renderSlideContent(currentSlide, saveQuizResult, quizResults) || renderSlidePlaceholder()}
        </main>

        {/* Bottom navigation */}
        {bottomNav}
      </div>

      {/* Mobile sidebar (Sheet) */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-72 bg-slate-900 border-slate-700">
          <SheetTitle className="sr-only">Menu de navegacion</SheetTitle>
          {sidebarContent}
        </SheetContent>
      </Sheet>
    </div>
  );
}
