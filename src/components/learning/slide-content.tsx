'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Trophy,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Zap,
  Crosshair,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  Eye,
  EyeOff,
  ArrowUpRight,
  Globe,
  Box,
  Wrench,
  Target,
  Play,
  Code,
  BookOpen,
  Layers,
  CircleDot,
  Move,
  RefreshCw,
  Bot,
  Cpu,
  Compass,
  Cuboid,
  Gauge,
  Triangle,
  Square,
  Circle,
  Battery,
  MemoryStick,
  Settings,
  PenTool,
  Hash,
  ClipboardList,
  Route,
  GraduationCap,
  Sparkles,
  ArrowDownUp,
  LayoutGrid,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  quizMovimientos,
  quizCoordenadas,
  quizWorkObjects,
  quizCalibracion,
  quizFinal,
  codeExercises,
  type QuizQuestion,
  type CodeExercise,
  type QuizResult,
  getQuizForSlide,
  getCodeForSlide,
} from '@/lib/slide-data';
import { sections } from '@/lib/slide-data';

// ============================================================
// QuizComponent (Reusable)
// ============================================================

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: (score: number, total: number) => void;
  savedResult?: QuizResult;
}

function QuizComponent({ questions, onComplete, savedResult }: QuizComponentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showFinal, setShowFinal] = useState(false);

  // If saved result exists and is completed, show summary directly
  if (savedResult?.completed) {
    const percentage = Math.round((savedResult.score / savedResult.total) * 100);
    return (
      <div className="flex flex-col items-center gap-6 py-6">
        <div className="flex items-center justify-center size-20 rounded-full bg-amber-100 dark:bg-amber-900/30">
          <Trophy className="size-10 text-amber-500" />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-1">Quiz Completado</h3>
          <p className="text-muted-foreground">Tu resultado anterior:</p>
        </div>
        <div className="flex items-center gap-4 text-center">
          <div className="px-6 py-4 rounded-xl bg-primary/10">
            <div className="text-3xl font-bold text-primary">{savedResult.score}</div>
            <div className="text-xs text-muted-foreground mt-1">Correctas</div>
          </div>
          <div className="text-2xl text-muted-foreground">/</div>
          <div className="px-6 py-4 rounded-xl bg-muted">
            <div className="text-3xl font-bold">{savedResult.total}</div>
            <div className="text-xs text-muted-foreground mt-1">Total</div>
          </div>
        </div>
        <div className={`text-sm font-medium px-4 py-2 rounded-full ${
          percentage >= 80
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
            : percentage >= 50
              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          {percentage}% - {percentage >= 80 ? 'Excelente' : percentage >= 50 ? 'Buen trabajo' : 'Sigue practicando'}
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setCurrentIndex(0);
            setSelectedOption(null);
            setConfirmed(false);
            setScore(0);
            setAnswers({});
            setShowFinal(false);
          }}
          className="mt-2"
        >
          <RefreshCw className="size-4 mr-2" />
          Intentar de nuevo
        </Button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleSelectOption = (optionIndex: number) => {
    if (confirmed) return;
    setSelectedOption(optionIndex);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;
    setConfirmed(true);
    const isCorrect = selectedOption === currentQuestion.correct;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: selectedOption }));
  };

  const handleNext = () => {
    if (currentIndex + 1 >= totalQuestions) {
      const finalScore = score;
      const finalAnswers = { ...answers, [currentQuestion.id]: selectedOption! };
      setShowFinal(true);
      onComplete(finalScore, totalQuestions);
      setAnswers(finalAnswers);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setConfirmed(false);
    }
  };

  // Final score screen
  if (showFinal) {
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <div className="flex flex-col items-center gap-6 py-6">
        <div className="flex items-center justify-center size-20 rounded-full bg-amber-100 dark:bg-amber-900/30">
          <Trophy className="size-10 text-amber-500" />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-1">Quiz Completado</h3>
          <p className="text-muted-foreground">Has terminado el quiz</p>
        </div>
        <div className="flex items-center gap-4 text-center">
          <div className="px-6 py-4 rounded-xl bg-primary/10">
            <div className="text-3xl font-bold text-primary">{score}</div>
            <div className="text-xs text-muted-foreground mt-1">Correctas</div>
          </div>
          <div className="text-2xl text-muted-foreground">/</div>
          <div className="px-6 py-4 rounded-xl bg-muted">
            <div className="text-3xl font-bold">{totalQuestions}</div>
            <div className="text-xs text-muted-foreground mt-1">Total</div>
          </div>
        </div>
        <div className={`text-sm font-medium px-4 py-2 rounded-full ${
          percentage >= 80
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
            : percentage >= 50
              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          {percentage}% - {percentage >= 80 ? 'Excelente' : percentage >= 50 ? 'Buen trabajo' : 'Sigue practicando'}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Progress indicator */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Pregunta {currentIndex + 1} de {totalQuestions}
        </span>
        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-400 transition-all duration-300"
            style={{ width: `${((currentIndex + (confirmed ? 1 : 0)) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="p-4 rounded-xl bg-muted/50 border">
        <div className="flex items-start gap-3">
          <HelpCircle className="size-5 text-primary shrink-0 mt-0.5" />
          <p className="text-base font-medium leading-relaxed">{currentQuestion.question}</p>
        </div>
      </div>

      {/* Options */}
      <div className="grid gap-3">
        {currentQuestion.options.map((option, index) => {
          let borderColor = 'border-border hover:border-primary/50 hover:bg-primary/5';
          if (confirmed) {
            if (index === currentQuestion.correct) {
              borderColor = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
            } else if (index === selectedOption && index !== currentQuestion.correct) {
              borderColor = 'border-red-500 bg-red-50 dark:bg-red-900/20';
            } else {
              borderColor = 'border-border opacity-50';
            }
          } else if (selectedOption === index) {
            borderColor = 'border-primary bg-primary/10';
          }

          return (
            <button
              key={index}
              onClick={() => handleSelectOption(index)}
              disabled={confirmed}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-150 ${borderColor} ${
                !confirmed ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <div className={`flex items-center justify-center size-8 rounded-full border-2 text-sm font-bold shrink-0 ${
                confirmed && index === currentQuestion.correct
                  ? 'border-emerald-500 bg-emerald-500 text-white'
                  : confirmed && index === selectedOption
                    ? 'border-red-500 bg-red-500 text-white'
                    : selectedOption === index
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted-foreground/30 text-muted-foreground'
              }`}>
                {confirmed && index === currentQuestion.correct ? (
                  <CheckCircle2 className="size-4" />
                ) : confirmed && index === selectedOption ? (
                  <XCircle className="size-4" />
                ) : (
                  String.fromCharCode(65 + index)
                )}
              </div>
              <span className="text-sm font-medium">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {confirmed && (
        <div className={`p-4 rounded-xl border ${
          selectedOption === currentQuestion.correct
            ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20'
            : 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20'
        }`}>
          <div className="flex items-start gap-2">
            <Lightbulb className={`size-5 shrink-0 mt-0.5 ${
              selectedOption === currentQuestion.correct ? 'text-emerald-600' : 'text-amber-600'
            }`} />
            <div>
              <p className="text-sm font-semibold mb-1">
                {selectedOption === currentQuestion.correct ? 'Correcto' : 'Incorrecto'}
              </p>
              <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-end gap-3">
        {!confirmed ? (
          <Button
            onClick={handleConfirm}
            disabled={selectedOption === null}
            className="gap-2"
          >
            Confirmar
          </Button>
        ) : (
          <Button onClick={handleNext} className="gap-2">
            {currentIndex + 1 >= totalQuestions ? 'Ver resultado' : 'Siguiente pregunta'}
            <ChevronRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

// ============================================================
// CodeExerciseComponent (Reusable)
// ============================================================

interface CodeExerciseComponentProps {
  exercise: CodeExercise;
}

function CodeExerciseComponent({ exercise }: CodeExerciseComponentProps) {
  const [blankAnswers, setBlankAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSelectBlank = (blankId: string, value: string) => {
    setBlankAnswers((prev) => ({ ...prev, [blankId]: value }));
    if (checked) setChecked(false);
  };

  const handleVerify = () => {
    setChecked(true);
  };

  // Build the code display with blanks replaced by select dropdowns or results
  const codeParts = exercise.codeTemplate.split(/(__BLANK\d+__)/g);

  const getBlankStatus = (blankId: string) => {
    if (!checked) return 'default';
    const userAnswer = blankAnswers[blankId] || '';
    const blank = exercise.blanks.find((b) => b.id === blankId);
    if (userAnswer === blank?.answer) return 'correct';
    return 'incorrect';
  };

  const renderCodeBlock = () => (
    <pre className="rounded-xl bg-slate-900 text-slate-100 p-5 text-sm leading-relaxed overflow-x-auto font-mono">
      <code>
        {codeParts.map((part, index) => {
          const blankMatch = part.match(/^__BLANK(\d+)__$/);
          if (blankMatch) {
            const blankId = part;
            const blank = exercise.blanks.find((b) => b.id === blankId);
            const status = getBlankStatus(blankId);
            const currentValue = blankAnswers[blankId] || '';

            if (checked) {
              const isCorrect = status === 'correct';
              return (
                <span
                  key={index}
                  className={`inline-block px-2 py-0.5 rounded font-bold mx-0.5 ${
                    isCorrect
                      ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500'
                      : 'bg-red-500/30 text-red-300 border border-red-500'
                  }`}
                >
                  {currentValue || '___'}
                </span>
              );
            }

            return (
              <select
                key={index}
                value={currentValue}
                onChange={(e) => handleSelectBlank(blankId, e.target.value)}
                className="inline-block bg-slate-700 text-slate-100 border border-slate-500 rounded px-2 py-0.5 text-sm font-mono mx-0.5 cursor-pointer hover:border-orange-400 focus:border-orange-400 focus:outline-none transition-colors"
              >
                <option value="">---</option>
                {blank?.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </code>
    </pre>
  );

  const allCorrect = exercise.blanks.every(
    (b) => blankAnswers[b.id] === b.answer
  );
  const answeredCount = exercise.blanks.filter((b) => blankAnswers[b.id]).length;

  return (
    <div className="flex flex-col gap-5">
      {/* Title and description */}
      <div>
        <h3 className="text-lg font-semibold mb-1">{exercise.title}</h3>
        <p className="text-sm text-muted-foreground">{exercise.description}</p>
      </div>

      {/* Code block */}
      {renderCodeBlock()}

      {/* Hint */}
      {exercise.hint && (
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHint(!showHint)}
            className="gap-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/20"
          >
            {showHint ? <EyeOff className="size-4" /> : <Lightbulb className="size-4" />}
            {showHint ? 'Ocultar pista' : 'Mostrar pista'}
          </Button>
          {showHint && (
            <div className="mt-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <Lightbulb className="size-4 inline mr-1.5" />
                {exercise.hint}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Verify button and result */}
      <div className="flex items-center gap-4">
        <Button
          onClick={handleVerify}
          disabled={answeredCount < exercise.blanks.length}
          className="gap-2"
        >
          <CheckCircle2 className="size-4" />
          Verificar
        </Button>
        {answeredCount < exercise.blanks.length && (
          <span className="text-xs text-muted-foreground">
            Completa todos los espacios ({answeredCount}/{exercise.blanks.length})
          </span>
        )}
        {checked && allCorrect && (
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 gap-1">
            <CheckCircle2 className="size-3" />
            Todo correcto
          </Badge>
        )}
        {checked && !allCorrect && (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 gap-1">
            <XCircle className="size-3" />
            Hay errores - revisa los espacios en rojo
          </Badge>
        )}
      </div>
    </div>
  );
}

// ============================================================
// SVG Components for Interactive Slides
// ============================================================

function RobotJointSVG() {
  const [activeJoint, setActiveJoint] = useState<number | null>(null);

  const joints = [
    { id: 1, label: 'Eje 1 (Base)', cx: 120, cy: 200, color: '#f97316', desc: 'Gira sobre el eje vertical. 360° de rotacion.' },
    { id: 2, label: 'Eje 2 (Hombro)', cx: 120, cy: 140, color: '#ef4444', desc: 'Mueve el hombro hacia adelante y atras.' },
    { id: 3, label: 'Eje 3 (Codo)', cx: 190, cy: 120, color: '#eab308', desc: 'Flexiona el codo extendiendo y retractando el brazo.' },
    { id: 4, label: 'Eje 4', cx: 250, cy: 100, color: '#22c55e', desc: 'Rotacion de la muneca. 360° disponibles.' },
    { id: 5, label: 'Eje 5', cx: 280, cy: 80, color: '#06b6d4', desc: 'Inclinacion de la muneca. 180° disponibles.' },
    { id: 6, label: 'Eje 6', cx: 310, cy: 60, color: '#8b5cf6', desc: 'Rotacion final. Alinea la herramienta.' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <svg viewBox="0 0 440 280" className="w-full max-w-lg mx-auto" role="img" aria-label="Diagrama de articulaciones del robot ABB IRB1100">
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="440" height="280" fill="url(#grid)" rx="8" />

        {/* Base platform */}
        <rect x="60" y="220" width="120" height="30" rx="4" fill="#64748b" stroke="#475569" strokeWidth="2" />
        <text x="120" y="255" textAnchor="middle" fill="#94a3b8" fontSize="10">BASE</text>

        {/* Robot arm segments */}
        {/* Base to shoulder */}
        <line x1="120" y1="200" x2="120" y2="140" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
        {/* Shoulder to elbow */}
        <line x1="120" y1="140" x2="190" y2="120" stroke="#cbd5e1" strokeWidth="7" strokeLinecap="round" />
        {/* Elbow to wrist */}
        <line x1="190" y1="120" x2="260" y2="90" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
        {/* Wrist to tool */}
        <line x1="260" y1="90" x2="310" y2="60" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />

        {/* Tool end */}
        <polygon points="310,55 320,70 310,75 300,70" fill="#f97316" stroke="#ea580c" strokeWidth="1" />

        {/* Joint circles - clickable */}
        {joints.map((joint) => (
          <g key={joint.id} onClick={() => setActiveJoint(activeJoint === joint.id ? null : joint.id)} className="cursor-pointer">
            <circle
              cx={joint.cx}
              cy={joint.cy}
              r={activeJoint === joint.id ? 16 : 12}
              fill={joint.color}
              stroke={activeJoint === joint.id ? '#fff' : 'transparent'}
              strokeWidth="3"
              opacity={activeJoint !== null && activeJoint !== joint.id ? 0.3 : 1}
              className="transition-all duration-200"
            />
            <text x={joint.cx} y={joint.cy + 4} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
              {joint.id}
            </text>
          </g>
        ))}

        {/* Joint info panel */}
        {activeJoint !== null && (() => {
          const joint = joints.find((j) => j.id === activeJoint);
          if (!joint) return null;
          return (
            <foreignObject x="0" y="0" width="440" height="40">
              <div className="mx-2 mt-1 px-3 py-1.5 rounded-lg bg-white/90 border shadow-sm text-center">
                <span className="font-semibold text-sm" style={{ color: joint.color }}>{joint.label}</span>
                <span className="text-xs text-muted-foreground ml-2">{joint.desc}</span>
              </div>
            </foreignObject>
          );
        })()}
      </svg>

      <p className="text-xs text-center text-muted-foreground">
        Haz clic en cada articulacion para ver su descripcion
      </p>
    </div>
  );
}

function LinearMovementSVG() {
  const [animPhase, setAnimPhase] = useState(0);

  const phases = [
    { label: 'Punto A - Inicio', desc: 'El robot se ubica en la posicion de inicio' },
    { label: 'Trayectoria Lineal', desc: 'El TCP se mueve en linea recta entre los puntos' },
    { label: 'Punto B - Destino', desc: 'El robot alcanza la posicion de destino' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <svg viewBox="0 0 440 240" className="w-full max-w-lg mx-auto" role="img" aria-label="Diagrama de movimiento lineal">
        <defs>
          <pattern id="linear-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
          </pattern>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#f97316" />
          </marker>
        </defs>
        <rect width="440" height="240" fill="url(#linear-grid)" rx="8" />

        {/* Title */}
        <text x="220" y="25" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">Movimiento Lineal (MoveL)</text>

        {/* Point A */}
        <circle cx="80" cy="160" r="18" fill="#22c55e" opacity="0.2" />
        <circle cx="80" cy="160" r="12" fill="#22c55e" />
        <text x="80" y="164" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">A</text>
        <text x="80" y="195" textAnchor="middle" fill="#64748b" fontSize="10">Inicio</text>

        {/* Straight line path */}
        <line x1="92" y1="160" x2="338" y2="80" stroke="#f97316" strokeWidth="3" strokeDasharray={animPhase >= 1 ? 'none' : '8,4'} markerEnd={animPhase >= 1 ? 'url(#arrowhead)' : ''} className="transition-all" />

        {/* Robot position on path */}
        {animPhase === 1 && (
          <circle r="8" fill="#f97316">
            <animateMotion dur="2s" repeatCount="indefinite" path="M80,160 L340,80" />
          </circle>
        )}

        {/* Curved path (comparison - what NOT to do with MoveJ) */}
        <path d="M 80 160 Q 200 220 340 80" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,3" />
        <text x="280" y="190" fill="#94a3b8" fontSize="9" transform="rotate(-25, 280, 190)">Trayectoria Joint</text>

        {/* Point B */}
        <circle cx="350" cy="76" r="18" fill="#ef4444" opacity="0.2" />
        <circle cx="350" cy="76" r="12" fill="#ef4444" />
        <text x="350" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">B</text>
        <text x="350" y="50" textAnchor="middle" fill="#64748b" fontSize="10">Destino</text>

        {/* Label for straight path */}
        <text x="200" y="100" fill="#f97316" fontSize="10" fontWeight="600">Trayectoria Lineal</text>
      </svg>

      {/* Phase controls */}
      <div className="flex gap-2 justify-center">
        {phases.map((phase, i) => (
          <Button
            key={i}
            variant={animPhase === i ? 'default' : 'outline'}
            size="sm"
            onClick={() => setAnimPhase(i)}
            className="text-xs"
          >
            {phase.label}
          </Button>
        ))}
      </div>
      <p className="text-xs text-center text-muted-foreground">{phases[animPhase].desc}</p>
    </div>
  );
}

function ReorientationSVG() {
  const [rotAngle, setRotAngle] = useState(0);
  const [showAnim, setShowAnim] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <svg viewBox="0 0 440 280" className="w-full max-w-lg mx-auto" role="img" aria-label="Diagrama de reorientacion de herramienta">
        <defs>
          <pattern id="reorient-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="440" height="280" fill="url(#reorient-grid)" rx="8" />

        <text x="220" y="25" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">Reorientacion de Herramienta</text>

        {/* Fixed position indicator */}
        <circle cx="220" cy="140" r="40" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4,4" />
        <circle cx="220" cy="140" r="3" fill="#64748b" />

        {/* Tool with rotation */}
        <g transform={`rotate(${rotAngle}, 220, 140)`}>
          {/* Tool arm */}
          <rect x="214" y="70" width="12" height="70" rx="3" fill="#6366f1" />
          {/* Tool head */}
          <polygon points="214,70 226,70 230,55 210,55" fill="#8b5cf6" />
          {/* Gripper left */}
          <rect x="208" y="42" width="6" height="18" rx="2" fill="#a78bfa" />
          {/* Gripper right */}
          <rect x="226" y="42" width="6" height="18" rx="2" fill="#a78bfa" />
          {/* Orientation arrow */}
          <line x1="220" y1="55" x2="220" y2="35" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowhead)" />
        </g>

        {/* Position text */}
        <text x="220" y="200" textAnchor="middle" fill="#64748b" fontSize="11">Posicion: FIJA (x, y, z)</text>
        <text x="220" y="220" textAnchor="middle" fill="#f97316" fontSize="11" fontWeight="600">
          Orientacion: {rotAngle}&deg;
        </text>

        {/* Coordinate system */}
        <g transform="translate(380, 240)">
          <line x1="0" y1="0" x2="25" y2="0" stroke="#ef4444" strokeWidth="2" />
          <text x="28" y="4" fill="#ef4444" fontSize="9">X</text>
          <line x1="0" y1="0" x2="0" y2="-25" stroke="#22c55e" strokeWidth="2" />
          <text x="4" y="-18" fill="#22c55e" fontSize="9">Z</text>
          <line x1="0" y1="0" x2="-18" y2="12" stroke="#3b82f6" strokeWidth="2" />
          <text x="-30" y="18" fill="#3b82f6" fontSize="9">Y</text>
        </g>
      </svg>

      {/* Controls */}
      <div className="flex gap-2 justify-center flex-wrap">
        <Button variant="outline" size="sm" onClick={() => setRotAngle(0)}>0&deg;</Button>
        <Button variant="outline" size="sm" onClick={() => setRotAngle(45)}>45&deg;</Button>
        <Button variant="outline" size="sm" onClick={() => setRotAngle(90)}>90&deg;</Button>
        <Button variant="outline" size="sm" onClick={() => setRotAngle(180)}>180&deg;</Button>
        <Button size="sm" onClick={() => setShowAnim(!showAnim)} className="gap-2">
          <Play className="size-3" />
          {showAnim ? 'Detener' : 'Animar'}
        </Button>
      </div>

      {showAnim && (
        <AnimateRotation
          onComplete={() => setShowAnim(false)}
          onAngleChange={setRotAngle}
        />
      )}

      <p className="text-xs text-center text-muted-foreground">
        La posicion se mantiene fija mientras la herramienta rota en su eje
      </p>
    </div>
  );
}

function AnimateRotation({ onComplete, onAngleChange }: { onComplete: () => void; onAngleChange: (a: number) => void }) {
  React.useEffect(() => {
    let frame = 0;
    const maxFrames = 120;
    let animId: number;

    const animate = () => {
      frame++;
      const progress = frame / maxFrames;
      const angle = progress * 360;
      onAngleChange(angle);
      if (frame >= maxFrames) {
        onComplete();
      } else {
        animId = requestAnimationFrame(animate);
      }
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [onComplete, onAngleChange]);

  return null;
}

function BaseSystemSVG() {
  return (
    <svg viewBox="0 0 400 300" className="w-full max-w-md mx-auto" role="img" aria-label="Sistema de coordenadas base del robot">
      <defs>
        <pattern id="base-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
        </pattern>
        <marker id="axis-arrow-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#ef4444" />
        </marker>
        <marker id="axis-arrow-green" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
        </marker>
        <marker id="axis-arrow-blue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#3b82f6" />
        </marker>
      </defs>
      <rect width="400" height="300" fill="url(#base-grid)" rx="8" />

      {/* Robot base representation */}
      <rect x="170" y="220" width="60" height="30" rx="4" fill="#64748b" stroke="#475569" strokeWidth="2" />
      <rect x="185" y="200" width="30" height="20" rx="3" fill="#94a3b8" />

      {/* Origin point */}
      <circle cx="200" cy="210" r="6" fill="#1e293b" />
      <text x="200" y="270" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">ORIGEN</text>

      {/* X axis - forward */}
      <line x1="200" y1="210" x2="340" y2="210" stroke="#ef4444" strokeWidth="3" markerEnd="url(#axis-arrow-red)" />
      <text x="348" y="215" fill="#ef4444" fontSize="14" fontWeight="bold">X</text>
      <text x="280" y="228" textAnchor="middle" fill="#ef4444" fontSize="9">Direccion herramienta</text>

      {/* Z axis - up */}
      <line x1="200" y1="210" x2="200" y2="50" stroke="#22c55e" strokeWidth="3" markerEnd="url(#axis-arrow-green)" />
      <text x="204" y="42" fill="#22c55e" fontSize="14" fontWeight="bold">Z</text>
      <text x="230" y="70" fill="#22c55e" fontSize="9">Hacia arriba</text>

      {/* Y axis - left (into screen shown as diagonal) */}
      <line x1="200" y1="210" x2="90" y2="160" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#axis-arrow-blue)" />
      <text x="78" y="155" fill="#3b82f6" fontSize="14" fontWeight="bold">Y</text>
      <text x="110" y="178" fill="#3b82f6" fontSize="9">Hacia izquierda</text>

      {/* Label */}
      <text x="200" y="25" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">Sistema de Coordenadas Base</text>
    </svg>
  );
}

function WorldSystemSVG() {
  return (
    <div className="flex flex-col gap-4">
      <svg viewBox="0 0 440 260" className="w-full max-w-lg mx-auto" role="img" aria-label="Sistema de coordenadas mundo">
        <defs>
          <pattern id="world-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
          </pattern>
          <marker id="w-arrow-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#ef4444" />
          </marker>
          <marker id="w-arrow-green" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
          </marker>
          <marker id="w-arrow-blue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#3b82f6" />
          </marker>
        </defs>
        <rect width="440" height="260" fill="url(#world-grid)" rx="8" />

        <text x="220" y="25" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">Sistema de Coordenadas Mundo</text>

        {/* Floor plane */}
        <rect x="40" y="120" width="360" height="120" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" rx="4" />
        <text x="220" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">PLANO DE TRABAJO</text>

        {/* Robot position 1 */}
        <rect x="80" y="160" width="40" height="25" rx="3" fill="#64748b" />
        <rect x="92" y="145" width="16" height="15" rx="2" fill="#94a3b8" />
        <circle cx="100" cy="160" r="4" fill="#f97316" />
        <text x="100" y="200" textAnchor="middle" fill="#475569" fontSize="9">Robot 1</text>

        {/* Robot position 2 */}
        <rect x="280" y="160" width="40" height="25" rx="3" fill="#64748b" />
        <rect x="292" y="145" width="16" height="15" rx="2" fill="#94a3b8" />
        <circle cx="300" cy="160" r="4" fill="#22c55e" />
        <text x="300" y="200" textAnchor="middle" fill="#475569" fontSize="9">Robot 2</text>

        {/* World origin */}
        <circle cx="220" cy="230" r="6" fill="#1e293b" />
        <text x="220" y="248" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="bold">Origen Mundo</text>

        {/* World axes */}
        <line x1="220" y1="230" x2="400" y2="230" stroke="#ef4444" strokeWidth="2" markerEnd="url(#w-arrow-red)" />
        <text x="408" y="234" fill="#ef4444" fontSize="12" fontWeight="bold">X</text>
        <line x1="220" y1="230" x2="220" y2="40" stroke="#22c55e" strokeWidth="2" markerEnd="url(#w-arrow-green)" />
        <text x="224" y="35" fill="#22c55e" fontSize="12" fontWeight="bold">Z</text>
        <line x1="220" y1="230" x2="40" y2="230" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6,3" />

        {/* Connection lines */}
        <line x1="100" y1="160" x2="220" y2="230" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
        <line x1="300" y1="160" x2="220" y2="230" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
      </svg>
    </div>
  );
}

function ObjectSystemSVG() {
  const [showObjectFrame, setShowObjectFrame] = useState(true);
  const [objectRot, setObjectRot] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <svg viewBox="0 0 440 300" className="w-full max-w-lg mx-auto" role="img" aria-label="Sistema de coordenadas objeto">
        <defs>
          <pattern id="obj-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
          </pattern>
          <marker id="obj-arrow-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#ef4444" />
          </marker>
          <marker id="obj-arrow-green" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
          </marker>
          <marker id="obj-arrow-blue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#3b82f6" />
          </marker>
        </defs>
        <rect width="440" height="300" fill="url(#obj-grid)" rx="8" />

        <text x="220" y="25" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">Sistema de Coordenadas Objeto</text>

        {/* Table surface */}
        <rect x="80" y="140" width="280" height="120" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="4" />
        <text x="220" y="248" textAnchor="middle" fill="#92400e" fontSize="10">MESA DE TRABAJO</text>

        {/* Workpiece (object) */}
        <g transform={`translate(220, 200) rotate(${objectRot})`}>
          <rect x="-25" y="-15" width="50" height="30" fill="#f97316" stroke="#ea580c" strokeWidth="2" rx="3" />
          <text x="0" y="4" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">PIEZA</text>

          {/* Object frame axes */}
          {showObjectFrame && (
            <g>
              <line x1="0" y1="0" x2="50" y2="0" stroke="#ef4444" strokeWidth="2" markerEnd="url(#obj-arrow-red)" />
              <text x="55" y="4" fill="#ef4444" fontSize="10" fontWeight="bold">X&apos;</text>
              <line x1="0" y1="0" x2="0" y2="-50" stroke="#22c55e" strokeWidth="2" markerEnd="url(#obj-arrow-green)" />
              <text x="5" y="-45" fill="#22c55e" fontSize="10" fontWeight="bold">Z&apos;</text>
              <line x1="0" y1="0" x2="-35" y2="20" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#obj-arrow-blue)" />
              <text x="-45" y="28" fill="#3b82f6" fontSize="10" fontWeight="bold">Y&apos;</text>
              <circle cx="0" cy="0" r="4" fill="#1e293b" />
            </g>
          )}
        </g>

        {/* Robot (small icon) */}
        <g transform="translate(370, 120)">
          <rect x="-15" y="0" width="30" height="20" rx="3" fill="#64748b" />
          <line x1="0" y1="0" x2="-20" y2="-40" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="-20" cy="-40" r="5" fill="#f97316" />
          <text x="0" y="32" textAnchor="middle" fill="#475569" fontSize="9">Robot</text>
        </g>

        {/* P1 point on object */}
        <circle cx="250" cy="185" r="5" fill="#22c55e" stroke="white" strokeWidth="2" />
        <text x="262" y="183" fill="#22c55e" fontSize="9">P1</text>

        {/* P2 point on object */}
        <circle cx="200" cy="210" r="5" fill="#22c55e" stroke="white" strokeWidth="2" />
        <text x="185" y="225" fill="#22c55e" fontSize="9">P2</text>
      </svg>

      <div className="flex gap-2 justify-center flex-wrap">
        <Button variant="outline" size="sm" onClick={() => setObjectRot(0)}>Sin rotacion</Button>
        <Button variant="outline" size="sm" onClick={() => setObjectRot(30)}>30&deg;</Button>
        <Button variant="outline" size="sm" onClick={() => setObjectRot(90)}>90&deg;</Button>
        <Button
          size="sm"
          onClick={() => setShowObjectFrame(!showObjectFrame)}
          variant={showObjectFrame ? 'default' : 'outline'}
        >
          {showObjectFrame ? 'Ocultar ejes' : 'Mostrar ejes'}
        </Button>
      </div>
      <p className="text-xs text-center text-muted-foreground">
        Si la pieza rota, los puntos P1 y P2 se mueven con ella automaticamente
      </p>
    </div>
  );
}

function ToolSystemSVG() {
  return (
    <svg viewBox="0 0 400 280" className="w-full max-w-md mx-auto" role="img" aria-label="Sistema de coordenadas herramienta">
      <defs>
        <pattern id="tool-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
        </pattern>
        <marker id="tool-arrow-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#ef4444" />
        </marker>
        <marker id="tool-arrow-green" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
        </marker>
        <marker id="tool-arrow-blue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#3b82f6" />
        </marker>
      </defs>
      <rect width="400" height="280" fill="url(#tool-grid)" rx="8" />

      <text x="200" y="25" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">Sistema de Coordenadas Herramienta</text>

      {/* Robot arm (simplified) */}
      <rect x="160" y="180" width="80" height="20" rx="4" fill="#64748b" stroke="#475569" strokeWidth="1.5" />
      <rect x="180" y="140" width="40" height="40" rx="4" fill="#94a3b8" stroke="#64748b" strokeWidth="1.5" />

      {/* Tool */}
      <rect x="188" y="60" width="24" height="80" rx="3" fill="#7c3aed" stroke="#6d28d9" strokeWidth="1.5" />

      {/* Tool end (gripper) */}
      <rect x="182" y="35" width="10" height="30" rx="2" fill="#a78bfa" stroke="#7c3aed" strokeWidth="1" />
      <rect x="208" y="35" width="10" height="30" rx="2" fill="#a78bfa" stroke="#7c3aed" strokeWidth="1" />

      {/* TCP point */}
      <circle cx="200" cy="30" r="6" fill="#f97316" stroke="#ea580c" strokeWidth="2" />
      <text x="200" y="22" textAnchor="middle" fill="#ea580c" fontSize="10" fontWeight="bold">TCP</text>

      {/* Tool coordinate frame at TCP */}
      <line x1="200" y1="30" x2="260" y2="30" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#tool-arrow-red)" />
      <text x="268" y="34" fill="#ef4444" fontSize="11" fontWeight="bold">X&apos;</text>

      <line x1="200" y1="30" x2="200" y2="10" stroke="#22c55e" strokeWidth="2.5" />
      <text x="205" y="8" fill="#22c55e" fontSize="11" fontWeight="bold">Z&apos;</text>
      <line x1="200" y1="30" x2="175" y2="50" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#tool-arrow-blue)" />
      <text x="162" y="58" fill="#3b82f6" fontSize="11" fontWeight="bold">Y&apos;</text>

      {/* Labels */}
      <text x="200" y="230" textAnchor="middle" fill="#475569" fontSize="10">El origen se ubica en la punta de la herramienta (TCP)</text>
      <text x="200" y="250" textAnchor="middle" fill="#64748b" fontSize="9">Los ejes se mueven con la herramienta en cualquier posicion</text>

      {/* Legend */}
      <g transform="translate(30, 245)">
        <circle cx="0" cy="0" r="4" fill="#f97316" />
        <text x="8" y="4" fill="#64748b" fontSize="8">TCP = Tool Center Point</text>
      </g>
    </svg>
  );
}

// ============================================================
// Slide Content Renderers
// ============================================================

function Slide0_Cover() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-2xl mx-auto">
        {/* Gradient cover card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-rose-600 text-white p-8 md:p-12 shadow-2xl">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-48 h-48 rounded-full bg-white/10 blur-xl" />

          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            {/* Robot icon */}
            <div className="size-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Cpu className="size-10" />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
                Robot ABB IRB1100
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-medium">
                Aprendizaje Interactivo de Programacion
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-2">
              <Badge className="bg-white/20 text-white hover:bg-white/30 border-0 px-3 py-1.5">
                <Bot className="size-3.5 mr-1.5" />
                8 Secciones
              </Badge>
              <Badge className="bg-white/20 text-white hover:bg-white/30 border-0 px-3 py-1.5">
                <HelpCircle className="size-3.5 mr-1.5" />
                5 Quizes
              </Badge>
              <Badge className="bg-white/20 text-white hover:bg-white/30 border-0 px-3 py-1.5">
                <Code className="size-3.5 mr-1.5" />
                Ejercicios Practicos
              </Badge>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 text-white/70 text-sm bg-white/10 rounded-xl px-6 py-3">
                <ArrowRight className="size-4" />
                Usa las flechas o el boton Siguiente para comenzar
                <ArrowRight className="size-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide1_TOC() {
  const sectionCards = sections.map((section, i) => ({
    ...section,
    icon: [
      <Move key="m" className="size-5" />,
      <Compass key="c" className="size-5" />,
      <Code key="co" className="size-5" />,
      <Cuboid key="cu" className="size-5" />,
      <Target key="t" className="size-5" />,
      <RefreshCw key="r" className="size-5" />,
      <Layers key="l" className="size-5" />,
      <BookOpen key="bo" className="size-5" />,
    ][i],
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-1">Contenido del Curso</h2>
        <p className="text-muted-foreground text-sm">Navega por las 8 secciones del curso de programacion ABB IRB1100</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sectionCards.map((section) => (
          <Card
            key={section.name}
            className="cursor-pointer hover:shadow-md transition-all duration-200 group border-0 shadow-sm"
          >
            <div className={`h-1.5 rounded-t-xl bg-gradient-to-r ${section.color}`} />
            <CardContent className="p-5">
              <div className={`flex items-center justify-center size-10 rounded-lg bg-gradient-to-br ${section.color} text-white mb-3 group-hover:scale-110 transition-transform`}>
                {section.icon}
              </div>
              <h3 className="font-semibold text-sm mb-1">{section.name}</h3>
              <p className="text-xs text-muted-foreground">
                {section.name === 'Movimientos' && 'Tipos de movimiento del robot'}
                {section.name === 'Coordenadas' && 'Sistemas de referencia'}
                {section.name === 'RAPID' && 'Programacion con MoveJ y MoveL'}
                {section.name === 'Work Objects' && 'Objetos de trabajo'}
                {section.name === 'Trayectorias' && 'Creando caminos'}
                {section.name === 'Calibracion' && 'Contador de revoluciones'}
                {section.name === 'Figuras' && 'Geometria con el robot'}
                {section.name === 'Repaso' && 'Quiz final y resumen'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Slide2_MovimientosOverview() {
  const cards = [
    {
      icon: <Zap className="size-6" />,
      title: 'Movimiento de Ejes (Joint)',
      desc: 'Mueve cada articulacion del robot de manera independiente. Cada eje rota hasta su posicion objetivo sin seguir una trayectoria recta.',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      icon: <ArrowRight className="size-6" />,
      title: 'Movimiento Lineal',
      desc: 'El TCP (Tool Center Point) se mueve en linea recta entre el punto de inicio y el punto de destino. Ideal para operaciones de precision.',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
    {
      icon: <RotateCcw className="size-6" />,
      title: 'Movimiento de Reorientacion',
      desc: 'Gira la herramienta alrededor de un eje manteniendo la posicion del TCP. Util cuando necesitas cambiar la orientacion de la herramienta.',
      color: 'from-violet-500 to-purple-500',
      bgColor: 'bg-violet-50 dark:bg-violet-900/20',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Modos de Movimiento</h2>
        <p className="text-muted-foreground text-sm">
          El robot ABB IRB1100 tiene tres tipos principales de movimiento. Cada uno tiene aplicaciones especificas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Card key={card.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className={`inline-flex items-center justify-center size-12 rounded-xl bg-gradient-to-br ${card.color} text-white mb-4`}>
                {card.icon}
              </div>
              <h3 className="font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <Lightbulb className="size-4 inline mr-2" />
          <strong>Importante:</strong> Antes de operar con cualquier manipulador industrial, asegurarse siempre de que el robot este en <strong>modo manual</strong>.
        </p>
      </div>
    </div>
  );
}

function Slide3_JointMovement() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Movimiento de Ejes (Joint)</h2>
        <p className="text-muted-foreground text-sm">
          El ABB IRB1100 tiene 6 ejes que se mueven de manera independiente. Cada articulacion tiene un rango de movimiento especifico.
        </p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <RobotJointSVG />
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { axis: 'Eje 1', range: '360&deg;', desc: 'Base - rotacion vertical' },
          { axis: 'Eje 2', range: '-95&deg; a 165&deg;', desc: 'Hombro' },
          { axis: 'Eje 3', range: '-175&deg; a 65&deg;', desc: 'Codo' },
          { axis: 'Eje 4', range: '-200&deg; a 200&deg;', desc: 'Muneca rotacion' },
          { axis: 'Eje 5', range: '-125&deg; a 125&deg;', desc: 'Muneca inclinacion' },
          { axis: 'Eje 6', range: '-400&deg; a 400&deg;', desc: 'Rotacion final' },
        ].map((item) => (
          <div key={item.axis} className="p-3 rounded-lg bg-muted/50 border">
            <div className="font-semibold text-sm">{item.axis}</div>
            <div className="text-xs text-primary font-mono">{item.range}</div>
            <div className="text-xs text-muted-foreground">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide4_LinearMovement() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Movimiento Lineal</h2>
        <p className="text-muted-foreground text-sm">
          El movimiento lineal mueve el TCP en una linea recta entre dos puntos. Es esencial cuando necesitamos una trayectoria precisa.
        </p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <LinearMovementSVG />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="size-5 text-emerald-500" />
              <h4 className="font-semibold text-sm">Ventajas</h4>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CircleDot className="size-3.5 shrink-0 mt-1 text-emerald-500" />
                Trayectoria predecible en linea recta
              </li>
              <li className="flex items-start gap-2">
                <CircleDot className="size-3.5 shrink-0 mt-1 text-emerald-500" />
                Ideal para soldadura y pegado
              </li>
              <li className="flex items-start gap-2">
                <CircleDot className="size-3.5 shrink-0 mt-1 text-emerald-500" />
                Movimiento preciso entre puntos
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="size-5 text-red-500" />
              <h4 className="font-semibold text-sm">Limitaciones</h4>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CircleDot className="size-3.5 shrink-0 mt-1 text-red-500" />
                Puede ser mas lento que el movimiento joint
              </li>
              <li className="flex items-start gap-2">
                <CircleDot className="size-3.5 shrink-0 mt-1 text-red-500" />
                No puede alcanzar puntos fuera del espacio de trabajo
              </li>
              <li className="flex items-start gap-2">
                <CircleDot className="size-3.5 shrink-0 mt-1 text-red-500" />
                Requiere calibracion precisa
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Slide5_Reorientation() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Movimiento de Reorientacion</h2>
        <p className="text-muted-foreground text-sm">
          La reorientacion permite girar la herramienta manteniendo su posicion en el espacio. Util para cambiar el angulo de agarre.
        </p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <ReorientationSVG />
        </CardContent>
      </Card>

      <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800">
        <p className="text-sm text-violet-800 dark:text-violet-200">
          <Lightbulb className="size-4 inline mr-2" />
          <strong>Consejo:</strong> El movimiento de reorientacion se activa manteniendo presionado el boton de reorientacion en el teach pendant mientras se mueve el joystick.
        </p>
      </div>
    </div>
  );
}

function Slide6_QuizMovimientos({
  onSaveQuizResult,
  quizResults,
}: {
  onSaveQuizResult: (result: any) => void;
  quizResults: any[];
}) {
  const savedResult = quizResults.find((r: any) => r.slideId === 6);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Quiz: Movimientos</h2>
        <p className="text-muted-foreground text-sm">
          Pon a prueba tus conocimientos sobre los modos de movimiento del robot.
        </p>
      </div>
      <QuizComponent
        questions={quizMovimientos}
        savedResult={savedResult}
        onComplete={(score, total) => {
          onSaveQuizResult({ slideId: 6, score, total, completed: true, answers: {} });
        }}
      />
    </div>
  );
}

function Slide7_CoordenadasOverview() {
  const systems = [
    {
      icon: <Crosshair className="size-5" />,
      title: 'Sistema Base',
      desc: 'Fijado a la base del robot. Define el origen desde donde se miden las coordenadas del manipulador.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: <Globe className="size-5" />,
      title: 'Sistema Mundo',
      desc: 'Define posiciones y orientaciones absolutas en el espacio tridimensional de la celda de trabajo.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: <Box className="size-5" />,
      title: 'Sistema Objeto',
      desc: 'Vinculado a un objeto especifico. Los puntos se mueven con el objeto si este cambia de posicion.',
      color: 'from-sky-500 to-cyan-500',
    },
    {
      icon: <Wrench className="size-5" />,
      title: 'Sistema Herramienta',
      desc: 'Definido en la punta de la herramienta (TCP). Se mueve con ella a cualquier posicion.',
      color: 'from-violet-500 to-purple-500',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Sistemas de Coordenadas</h2>
        <p className="text-muted-foreground text-sm">
          Los sistemas de coordenadas permiten definir posiciones y orientaciones del robot en el espacio. Conoce los 4 principales.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {systems.map((sys) => (
          <Card key={sys.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className={`flex items-center justify-center size-10 rounded-lg bg-gradient-to-br ${sys.color} text-white shrink-0`}>
                  {sys.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{sys.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{sys.desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Slide8_BaseSystem() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Sistema de Coordenadas Base</h2>
        <p className="text-muted-foreground text-sm">
          El sistema base esta fijado a la base del robot. Su origen se ubica en el centro de la base y define los ejes fundamentales.
        </p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <BaseSystemSVG />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-lg border-l-4 border-red-500 bg-red-50 dark:bg-red-900/10">
          <div className="font-semibold text-sm text-red-700 dark:text-red-400">Eje X</div>
          <p className="text-xs text-muted-foreground mt-1">Apunta hacia la direccion de la herramienta del robot.</p>
        </div>
        <div className="p-3 rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-900/10">
          <div className="font-semibold text-sm text-green-700 dark:text-green-400">Eje Z</div>
          <p className="text-xs text-muted-foreground mt-1">Apunta hacia arriba, perpendicular a la superficie de montaje.</p>
        </div>
        <div className="p-3 rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/10">
          <div className="font-semibold text-sm text-blue-700 dark:text-blue-400">Eje Y</div>
          <p className="text-xs text-muted-foreground mt-1">Completan el sistema de mano derecha. Hacia la izquierda del robot.</p>
        </div>
      </div>
    </div>
  );
}

function Slide9_WorldSystem() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Sistema de Coordenadas Mundo</h2>
        <p className="text-muted-foreground text-sm">
          El sistema mundo define posiciones absolutas en el espacio tridimensional. Es especialmente util en celdas con multiples robots.
        </p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <WorldSystemSVG />
        </CardContent>
      </Card>

      <div className="space-y-3">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border">
          <Target className="size-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm">Posiciones Absolutas</h4>
            <p className="text-xs text-muted-foreground">
              Cada punto definido en coordenadas mundo tiene una ubicacion fija en el espacio, independiente del robot.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border">
          <ArrowUpRight className="size-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm">Multiples Robots</h4>
            <p className="text-xs text-muted-foreground">
              Cuando hay varios robots en una celda, el sistema mundo permite coordinar movimientos usando un marco de referencia comun.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide10_ObjectSystem() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Sistema de Coordenadas Objeto</h2>
        <p className="text-muted-foreground text-sm">
          El sistema objeto esta vinculado a un objeto de trabajo. Si el objeto se mueve, los puntos asociados se mueven con el.
        </p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <ObjectSystemSVG />
        </CardContent>
      </Card>

      <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800">
        <p className="text-sm text-sky-800 dark:text-sky-200">
          <Lightbulb className="size-4 inline mr-2" />
          <strong>Caso practico:</strong> Si conectas los puntos de un programa a la mesa (usando un objeto de trabajo) y la mesa se mueve,
          todos los puntos del programa se ajustaran automaticamente. No necesitas reprogramar.
        </p>
      </div>
    </div>
  );
}

function Slide11_ToolSystem() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Sistema de Coordenadas Herramienta</h2>
        <p className="text-muted-foreground text-sm">
          El sistema herramienta se define en la punta de la herramienta (TCP). Sus ejes se mueven con la herramienta a cualquier posicion.
        </p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <ToolSystemSVG />
        </CardContent>
      </Card>

      <div className="space-y-3">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border">
          <Wrench className="size-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm">TCP (Tool Center Point)</h4>
            <p className="text-xs text-muted-foreground">
              El TCP es el punto de referencia de la herramienta. Es el origen del sistema de coordenadas herramienta.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border">
          <Target className="size-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm">Calibracion de Herramienta</h4>
            <p className="text-xs text-muted-foreground">
              Cuando se cambia de herramienta, es necesario definir el nuevo TCP y la masa de la herramienta para un funcionamiento correcto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide12_QuizCoordenadas({
  onSaveQuizResult,
  quizResults,
}: {
  onSaveQuizResult: (result: any) => void;
  quizResults: any[];
}) {
  const savedResult = quizResults.find((r: any) => r.slideId === 12);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Quiz: Coordenadas</h2>
        <p className="text-muted-foreground text-sm">
          Evalua tu comprension de los diferentes sistemas de coordenadas del robot.
        </p>
      </div>
      <QuizComponent
        questions={quizCoordenadas}
        savedResult={savedResult}
        onComplete={(score, total) => {
          onSaveQuizResult({ slideId: 12, score, total, completed: true, answers: {} });
        }}
      />
    </div>
  );
}

function Slide13_MoveJMoveL() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Instrucciones MoveJ y MoveL</h2>
        <p className="text-muted-foreground text-sm">
          Las dos instrucciones principales de movimiento en RAPID: MoveJ para movimiento de ejes y MoveL para movimiento lineal.
        </p>
      </div>

      {/* Code blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Zap className="size-4 text-orange-500" />
              MoveJ - Movimiento de Ejes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-xs leading-relaxed overflow-x-auto font-mono">
{`MoveJ Home, v200, z10, tool1;

! Parametros:
! - Home : punto destino (robtarget)
! - v200 : velocidad (200 mm/s)
! - z10  : zona de paso (10mm)
! - tool1: herramienta activa`}
            </pre>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <ArrowRight className="size-4 text-emerald-500" />
              MoveL - Movimiento Lineal
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-xs leading-relaxed overflow-x-auto font-mono">
{`MoveL P1, v100, fine, tool1;

! Parametros:
! - P1   : punto destino (robtarget)
! - v100 : velocidad (100 mm/s)
! - fine : punto de paro exacto
! - tool1: herramienta activa`}
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Comparison table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-semibold">Caracteristica</th>
                  <th className="text-left p-3 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Zap className="size-3.5 text-orange-500" />
                      MoveJ
                    </span>
                  </th>
                  <th className="text-left p-3 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <ArrowRight className="size-3.5 text-emerald-500" />
                      MoveL
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { prop: 'Trayectoria', mj: 'Curva (no lineal)', ml: 'Linea recta' },
                  { prop: 'Velocidad', mj: 'Mas rapido', ml: 'Mas lento' },
                  { prop: 'Precision', mj: 'Baja (zona de paso)', ml: 'Alta (punto exacto)' },
                  { prop: 'Uso principal', mj: 'Movimientos entre puntos lejanos', ml: 'Operaciones de precision' },
                  { prop: 'Consumo CPU', mj: 'Bajo', ml: 'Alto' },
                  { prop: 'Riesgo colision', mj: 'Menor (trayectoria predecible)', ml: 'Mayor (verificar espacio)' },
                ].map((row) => (
                  <tr key={row.prop} className="border-b last:border-0">
                    <td className="p-3 font-medium">{row.prop}</td>
                    <td className="p-3 text-muted-foreground">{row.mj}</td>
                    <td className="p-3 text-muted-foreground">{row.ml}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Zone explanation */}
      <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800">
        <p className="text-sm text-violet-800 dark:text-violet-200">
          <Lightbulb className="size-4 inline mr-2" />
          <strong>Zonas de paso (z):</strong> Define un area alrededor del punto destino donde el robot no se detiene completamente.
          Valores como <code className="bg-violet-200 dark:bg-violet-800 px-1 rounded text-xs">z10</code> significan 10mm.
          <code className="bg-violet-200 dark:bg-violet-800 px-1 rounded text-xs">fine</code> significa parada exacta.
        </p>
      </div>
    </div>
  );
}

// ============================================================
// Slide 14 - Movement Parameters (Interactive)
// ============================================================

function SpeedAnimationSVG({ speed }: { speed: number }) {
  const dotRef = useRef<SVGCircleElement>(null);
  const frameRef = useRef(0);
  const posRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      frameRef.current += 1;
      const speedFactor = speed / 200;
      posRef.current = (posRef.current + speedFactor * 3) % 320;
      if (dotRef.current) {
        dotRef.current.setAttribute('cx', String(60 + posRef.current));
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [speed]);

  return (
    <svg viewBox="0 0 440 120" className="w-full max-w-lg mx-auto" role="img" aria-label="Animacion de velocidad">
      <defs>
        <pattern id="speed-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="440" height="120" fill="url(#speed-grid)" rx="8" />
      <text x="220" y="20" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">Velocidad: v{speed} mm/s</text>
      {/* Path */}
      <line x1="60" y1="60" x2="380" y2="60" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="60" r="6" fill="#22c55e" />
      <text x="60" y="90" textAnchor="middle" fill="#64748b" fontSize="9">Inicio</text>
      <circle cx="380" cy="60" r="6" fill="#ef4444" />
      <text x="380" y="90" textAnchor="middle" fill="#64748b" fontSize="9">Fin</text>
      {/* Moving dot */}
      <circle ref={dotRef} cx={60} cy="60" r="7" fill="#f97316" />
    </svg>
  );
}

function ZoneVisualizationSVG({ zone }: { zone: string }) {
  const zoneMap: Record<string, number> = { fine: 0, z1: 1, z5: 5, z10: 10, z20: 20, z50: 50 };
  const radius = zoneMap[zone] || 0;
  const scaledRadius = Math.min(radius * 1.8, 60);

  return (
    <svg viewBox="0 0 300 160" className="w-full max-w-xs mx-auto" role="img" aria-label="Visualizacion de zona">
      <defs>
        <pattern id="zone-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="300" height="160" fill="url(#zone-grid)" rx="8" />
      <text x="150" y="20" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">Zona: {zone} {radius > 0 ? `(${radius}mm)` : '(parada exacta)'}</text>
      {/* Target point */}
      <circle cx="150" cy="90" r="5" fill="#ef4444" />
      <text x="150" y="145" textAnchor="middle" fill="#64748b" fontSize="9">
        {radius === 0 ? 'El robot se detiene exactamente aqui' : `El robot no se detiene dentro de ${radius}mm`}
      </text>
      {/* Zone circle */}
      {scaledRadius > 0 && (
        <circle cx="150" cy="90" r={scaledRadius} fill="#f97316" fillOpacity="0.15" stroke="#f97316" strokeWidth="2" strokeDasharray="4,3" />
      )}
      {/* Fine indicator */}
      {radius === 0 && (
        <circle cx="150" cy="90" r="14" fill="none" stroke="#22c55e" strokeWidth="3" />
      )}
    </svg>
  );
}

function Slide14_MovementParams() {
  const [speed, setSpeed] = useState(200);
  const [zone, setZone] = useState('z10');
  const zones = ['fine', 'z1', 'z5', 'z10', 'z20', 'z50'];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Parametros de Movimiento</h2>
        <p className="text-muted-foreground text-sm">
          Ajusta la velocidad y zona de paso para entender como afectan el movimiento del robot.
        </p>
      </div>

      {/* Speed slider */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Gauge className="size-4 text-orange-500" />
            Velocidad (v)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center gap-4">
            <Slider
              value={[speed]}
              onValueChange={(v) => setSpeed(v[0])}
              min={50}
              max={1000}
              step={50}
              className="flex-1"
            />
            <Badge variant="secondary" className="min-w-[60px] justify-center font-mono">
              v{speed}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Controla la velocidad del TCP (Tool Center Point) en mm/s. Valores menores = movimiento mas lento y preciso.
          </p>
          <SpeedAnimationSVG speed={speed} />
        </CardContent>
      </Card>

      {/* Zone buttons */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Target className="size-4 text-emerald-500" />
            Zona de Paso (z)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex flex-wrap gap-2">
            {zones.map((z) => (
              <Button
                key={z}
                variant={zone === z ? 'default' : 'outline'}
                size="sm"
                onClick={() => setZone(z)}
                className="text-xs font-mono"
              >
                {z}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Define la distancia maxima en mm a la que el robot puede pasar sin detenerse.
            <code className="bg-muted px-1 rounded text-xs ml-1">fine</code> = parada exacta.
          </p>
          <ZoneVisualizationSVG zone={zone} />
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================
// Slide 15 - Complete Code Exercises
// ============================================================

function Slide15_CompleteCode() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Ejercicios de Completar Codigo</h2>
        <p className="text-muted-foreground text-sm">
          Practica completando los espacios en blanco en cada ejercicio.
        </p>
      </div>
      <CodeExerciseComponent exercise={codeExercises[0]} />
      <div className="border-t" />
      <CodeExerciseComponent exercise={codeExercises[5]} />
    </div>
  );
}

// ============================================================
// Slide 16 - Work Objects (WObj)
// ============================================================

function Slide16_WorkObjects() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Objetos de Trabajo (WObj)</h2>
        <p className="text-muted-foreground text-sm">
          Conecta los puntos de tu programa a un objeto fisico que puede moverse.
        </p>
      </div>

      <Tabs defaultValue="sin">
        <TabsList>
          <TabsTrigger value="sin">Sin WObj</TabsTrigger>
          <TabsTrigger value="con">Con WObj</TabsTrigger>
        </TabsList>
        <TabsContent value="sin">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="size-4 text-red-500" />
                <span className="text-sm font-semibold text-red-600">Sin WorkObject (wobj0)</span>
              </div>
              <svg viewBox="0 0 440 180" className="w-full max-w-lg mx-auto" role="img" aria-label="Sin WObj">
                <defs>
                  <pattern id="wobj-no-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="440" height="180" fill="url(#wobj-no-grid)" rx="8" />
                {/* Table at original position */}
                <rect x="40" y="60" width="160" height="80" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="4" />
                <text x="120" y="110" textAnchor="middle" fill="#92400e" fontSize="10">MESA (original)</text>
                <circle cx="80" cy="85" r="5" fill="#22c55e" />
                <text x="92" y="88" fill="#22c55e" fontSize="9">P1</text>
                <circle cx="160" cy="120" r="5" fill="#22c55e" />
                <text x="172" y="123" fill="#22c55e" fontSize="9">P2</text>
                {/* Table moved */}
                <rect x="240" y="60" width="160" height="80" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="4" strokeDasharray="6,3" />
                <text x="320" y="110" textAnchor="middle" fill="#92400e" fontSize="10">MESA (nueva pos.)</text>
                {/* Arrow showing move */}
                <path d="M 200 100 L 240 100" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x="220" y="92" textAnchor="middle" fill="#ef4444" fontSize="9">Mover</text>
                {/* Old points still at original position */}
                <circle cx="80" cy="85" r="5" fill="#22c55e" stroke="#ef4444" strokeWidth="2" />
                <circle cx="160" cy="120" r="5" fill="#22c55e" stroke="#ef4444" strokeWidth="2" />
                {/* Problem indicator */}
                <text x="120" y="160" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">Los puntos NO se mueven con la mesa!</text>
              </svg>
              <p className="text-xs text-muted-foreground">
                Los puntos P1 y P2 quedan en las coordenadas absolutas. Si la mesa se mueve, el robot va a la posicion incorrecta.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="con">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="size-4 text-emerald-500" />
                <span className="text-sm font-semibold text-emerald-600">Con WorkObject personalizado</span>
              </div>
              <svg viewBox="0 0 440 180" className="w-full max-w-lg mx-auto" role="img" aria-label="Con WObj">
                <defs>
                  <pattern id="wobj-yes-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="440" height="180" fill="url(#wobj-yes-grid)" rx="8" />
                {/* Table at original position */}
                <rect x="40" y="60" width="160" height="80" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="4" />
                <text x="120" y="110" textAnchor="middle" fill="#92400e" fontSize="10">MESA (original)</text>
                <circle cx="80" cy="85" r="5" fill="#22c55e" />
                <text x="92" y="88" fill="#22c55e" fontSize="9">P1</text>
                <circle cx="160" cy="120" r="5" fill="#22c55e" />
                <text x="172" y="123" fill="#22c55e" fontSize="9">P2</text>
                {/* Table moved with points */}
                <rect x="240" y="60" width="160" height="80" fill="#fef3c7" stroke="#22c55e" strokeWidth="2" rx="4" />
                <text x="320" y="110" textAnchor="middle" fill="#92400e" fontSize="10">MESA (nueva pos.)</text>
                <circle cx="280" cy="85" r="5" fill="#22c55e" stroke="#22c55e" strokeWidth="2" />
                <text x="292" y="88" fill="#22c55e" fontSize="9">P1</text>
                <circle cx="360" cy="120" r="5" fill="#22c55e" stroke="#22c55e" strokeWidth="2" />
                <text x="372" y="123" fill="#22c55e" fontSize="9">P2</text>
                {/* Arrow showing move */}
                <path d="M 200 100 L 240 100" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x="220" y="92" textAnchor="middle" fill="#22c55e" fontSize="9">Mover</text>
                {/* Success */}
                <text x="220" y="160" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">Los puntos se mueven con la mesa!</text>
              </svg>
              <p className="text-xs text-muted-foreground">
                Al conectar los puntos al WObj de la mesa, si la mesa se mueve, todos los puntos se ajustan automaticamente.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Steps to create WObj */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <ClipboardList className="size-4 text-sky-500" />
            Pasos para crear un WorkObject
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ol className="space-y-2">
            {[
              'Ir a Menu > Programa > Datos > wobj',
              'Crear nuevo wobj (ej: wobj_mesa)',
              'Definir el sistema de coordenadas de la mesa',
              'Asignar los 3 puntos de calibracion (X1, X2, Y1)',
              'Confirmar y guardar',
              'Usar \\WObj:=wobj_mesa en las instrucciones de movimiento',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="flex items-center justify-center size-6 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Key points */}
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400">wobj0 = base por defecto</Badge>
        <Badge className="bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400">No modificable</Badge>
        <Badge className="bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400">Requiere 3 puntos de calibracion</Badge>
        <Badge className="bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400">Se usa con \\WObj:=</Badge>
      </div>
    </div>
  );
}

// ============================================================
// Slide 17 - Create WorkObject (Code Exercise)
// ============================================================

function Slide17_CreateWorkObject() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Creando un WorkObject</h2>
        <p className="text-muted-foreground text-sm">
          Practica usando el parametro \\WObj en las instrucciones de movimiento.
        </p>
      </div>
      <CodeExerciseComponent exercise={codeExercises[3]} />
    </div>
  );
}

// ============================================================
// Slide 18 - Quiz Work Objects
// ============================================================

function Slide18_QuizWorkObjects({ onSaveQuizResult, quizResults }: { onSaveQuizResult: (result: any) => void; quizResults: any[] }) {
  const savedResult = quizResults?.find((r: any) => r.slideId === 18);
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Quiz: Work Objects</h2>
        <p className="text-muted-foreground text-sm">Pon a prueba tus conocimientos sobre objetos de trabajo.</p>
      </div>
      <QuizComponent
        questions={quizWorkObjects}
        onComplete={(score, total) =>
          onSaveQuizResult({ slideId: 18, score, total, completed: true, answers: {} })
        }
        savedResult={savedResult}
      />
    </div>
  );
}

// ============================================================
// Slide 19 - Creating Paths
// ============================================================

function Slide19_CreatingPaths() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Creando Trayectorias</h2>
        <p className="text-muted-foreground text-sm">
          Aprende a crear rutas para que el robot siga una secuencia de puntos.
        </p>
      </div>

      {/* Path diagram */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <svg viewBox="0 0 440 200" className="w-full max-w-lg mx-auto" role="img" aria-label="Diagrama de trayectoria">
            <defs>
              <pattern id="path-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
              </pattern>
              <marker id="path-arrow-green" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
              </marker>
            </defs>
            <rect width="440" height="200" fill="url(#path-grid)" rx="8" />
            <text x="220" y="20" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">Trayectoria: Home - P1 - P2 - P3 - P4</text>
            {/* Points */}
            {/* Home */}
            <circle cx="50" cy="100" r="14" fill="#64748b" fillOpacity="0.2" />
            <circle cx="50" cy="100" r="10" fill="#64748b" />
            <text x="50" y="104" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">H</text>
            <text x="50" y="130" textAnchor="middle" fill="#64748b" fontSize="8">Home</text>
            {/* P1 */}
            <circle cx="140" cy="60" r="14" fill="#22c55e" fillOpacity="0.2" />
            <circle cx="140" cy="60" r="10" fill="#22c55e" />
            <text x="140" y="64" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">1</text>
            <text x="140" y="45" textAnchor="middle" fill="#64748b" fontSize="8">P1</text>
            {/* P2 */}
            <circle cx="230" cy="60" r="14" fill="#22c55e" fillOpacity="0.2" />
            <circle cx="230" cy="60" r="10" fill="#22c55e" />
            <text x="230" y="64" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">2</text>
            <text x="230" y="45" textAnchor="middle" fill="#64748b" fontSize="8">P2</text>
            {/* P3 */}
            <circle cx="320" cy="120" r="14" fill="#22c55e" fillOpacity="0.2" />
            <circle cx="320" cy="120" r="10" fill="#22c55e" />
            <text x="320" y="124" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">3</text>
            <text x="320" y="150" textAnchor="middle" fill="#64748b" fontSize="8">P3</text>
            {/* P4 */}
            <circle cx="400" cy="80" r="14" fill="#22c55e" fillOpacity="0.2" />
            <circle cx="400" cy="80" r="10" fill="#22c55e" />
            <text x="400" y="84" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">4</text>
            <text x="400" y="65" textAnchor="middle" fill="#64748b" fontSize="8">P4</text>
            {/* Joint path (orange dashed) */}
            <path d="M 60 100 Q 100 30 140 60" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="6,3" />
            <path d="M 150 60 L 220 60" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="6,3" />
            <path d="M 240 60 Q 280 120 320 120" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="6,3" />
            <path d="M 330 120 Q 370 60 400 80" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="6,3" />
            {/* Linear path overlay (green solid) for P2-P3 segment */}
            <line x1="240" y1="60" x2="310" y2="120" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#path-arrow-green)" />
            {/* Legend */}
            <line x1="30" y1="180" x2="60" y2="180" stroke="#f97316" strokeWidth="2" strokeDasharray="6,3" />
            <text x="65" y="183" fill="#f97316" fontSize="9">Joint (MoveJ)</text>
            <line x1="180" y1="180" x2="210" y2="180" stroke="#22c55e" strokeWidth="2.5" />
            <text x="215" y="183" fill="#22c55e" fontSize="9">Lineal (MoveL)</text>
          </svg>
        </CardContent>
      </Card>

      {/* Parameter cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Route className="size-4 text-orange-500" />
              <span className="text-xs font-semibold">Tipo de movimiento</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-xs">
              <Badge variant="outline" className="text-orange-600 border-orange-300">Joint</Badge>
              <span className="text-muted-foreground">vs</span>
              <Badge variant="outline" className="text-emerald-600 border-emerald-300">Lineal</Badge>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">
              Joint = rapido, curva. Lineal = recto, preciso.
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="size-4 text-emerald-500" />
              <span className="text-xs font-semibold">Zona</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs">
              <Badge variant="outline" className="font-mono">fine</Badge>
              <Badge variant="outline" className="font-mono">z10</Badge>
              <Badge variant="outline" className="font-mono">z20</Badge>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">
              fine = parada exacta. z = radio de paso.
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Gauge className="size-4 text-violet-500" />
              <span className="text-xs font-semibold">Velocidad</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs">
              <Badge variant="outline" className="font-mono">v150</Badge>
              <Badge variant="outline" className="font-mono">v200</Badge>
              <Badge variant="outline" className="font-mono">v500</Badge>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">
              Velocidad del TCP en mm/s.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Steps */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <ClipboardList className="size-4 text-amber-500" />
            Pasos para crear una trayectoria
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ol className="space-y-2">
            {[
              'Crear puntos en las esquinas o posiciones deseadas',
              'Asignar nombres descriptivos (P1, P2, etc.)',
              'Crear un punto Home como posicion segura',
              'Crear la trayectoria con los parametros adecuados (tipo, velocidad, zona)',
              'Verificar la alcanzabilidad de todos los puntos',
              'Transferir al controlador y simular antes de ejecutar',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="flex items-center justify-center size-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================
// Slide 20 - Program with Paths (Code Exercises)
// ============================================================

function Slide20_ProgramPaths() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Ejercicios de Programacion</h2>
        <p className="text-muted-foreground text-sm">
          Practica creando programas con trayectorias y desfases.
        </p>
      </div>
      <CodeExerciseComponent exercise={codeExercises[2]} />
      <div className="border-t" />
      <CodeExerciseComponent exercise={codeExercises[4]} />
    </div>
  );
}

// ============================================================
// Slide 21 - Calibration Counter
// ============================================================

function Slide21_CalibrationCounter() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Calibracion: Contador de Revoluciones</h2>
        <p className="text-muted-foreground text-sm">
          Entiende por que los robots industriales necesitan calibracion y como funciona.
        </p>
      </div>

      {/* Infographic */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <svg viewBox="0 0 440 350" className="w-full max-w-lg mx-auto" role="img" aria-label="Diagrama del contador de revoluciones">
            <defs>
              <pattern id="cal-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
              </pattern>
              <marker id="cal-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#f97316" />
              </marker>
            </defs>
            <rect width="440" height="350" fill="url(#cal-grid)" rx="8" />

            {/* Step 1: Encoder */}
            <rect x="20" y="20" width="180" height="80" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" rx="8" />
            <text x="110" y="42" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">1. Encoder Absoluto</text>
            <text x="110" y="60" textAnchor="middle" fill="#64748b" fontSize="9">Conoce la posicion dentro</text>
            <text x="110" y="74" textAnchor="middle" fill="#64748b" fontSize="9">de 360 grados</text>
            <Compass className="size-6 text-emerald-500" style={{ position: 'absolute', left: '28px', top: '24px' }} />

            {/* Step 2: Gear reduction */}
            <rect x="240" y="20" width="180" height="80" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" rx="8" />
            <text x="330" y="42" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">2. Reductor de Velocidad</text>
            <text x="330" y="60" textAnchor="middle" fill="#64748b" fontSize="9">El motor gira muchas veces</text>
            <text x="330" y="74" textAnchor="middle" fill="#64748b" fontSize="9">por cada movimiento articular</text>
            <Settings className="size-6 text-orange-500" style={{ position: 'absolute', left: '248px', top: '24px' }} />

            {/* Arrow 1->2 */}
            <path d="M 200 60 L 240 60" stroke="#f97316" strokeWidth="2" markerEnd="url(#cal-arrow)" />

            {/* Problem box */}
            <rect x="60" y="120" width="320" height="60" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" rx="8" />
            <text x="220" y="145" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Problema</text>
            <text x="220" y="163" textAnchor="middle" fill="#991b1b" fontSize="10">El encoder NO sabe cuantas revoluciones dio el motor</text>
            <XCircle className="size-6 text-red-500" style={{ position: 'absolute', left: '68px', top: '124px' }} />

            {/* Arrow down */}
            <path d="M 220 180 L 220 200" stroke="#f97316" strokeWidth="2" markerEnd="url(#cal-arrow)" />

            {/* Solution: Battery -> RAM -> Counter -> Controller */}
            <rect x="20" y="210" width="100" height="120" fill="#ecfdf5" stroke="#22c55e" strokeWidth="2" rx="8" />
            <text x="70" y="232" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">Bateria</text>
            <text x="70" y="250" textAnchor="middle" fill="#166534" fontSize="9">Mantiene</text>
            <text x="70" y="263" textAnchor="middle" fill="#166534" fontSize="9">la RAM</text>
            <text x="70" y="282" textAnchor="middle" fill="#166534" fontSize="9">activa</text>
            <text x="70" y="300" textAnchor="middle" fill="#166534" fontSize="9">siempre</text>
            <Battery className="size-6 text-emerald-500" style={{ position: 'absolute', left: '28px', top: '214px' }} />

            <rect x="140" y="210" width="100" height="120" fill="#ecfdf5" stroke="#22c55e" strokeWidth="2" rx="8" />
            <text x="190" y="232" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">RAM</text>
            <text x="190" y="250" textAnchor="middle" fill="#166534" fontSize="9">Almacena</text>
            <text x="190" y="263" textAnchor="middle" fill="#166534" fontSize="9">cuenta de</text>
            <text x="190" y="282" textAnchor="middle" fill="#166534" fontSize="9">revoluciones</text>
            <text x="190" y="300" textAnchor="middle" fill="#166534" fontSize="9">por eje</text>
            <MemoryStick className="size-6 text-emerald-500" style={{ position: 'absolute', left: '148px', top: '214px' }} />

            <rect x="260" y="210" width="160" height="120" fill="#ecfdf5" stroke="#22c55e" strokeWidth="2" rx="8" />
            <text x="340" y="232" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">Controlador</text>
            <text x="340" y="250" textAnchor="middle" fill="#166534" fontSize="9">Usa encoder +</text>
            <text x="340" y="263" textAnchor="middle" fill="#166534" fontSize="9">revoluciones para</text>
            <text x="340" y="282" textAnchor="middle" fill="#166534" fontSize="9">calcular posicion</text>
            <text x="340" y="300" textAnchor="middle" fill="#166534" fontSize="9">exacta del eje</text>
            <Cpu className="size-6 text-emerald-500" style={{ position: 'absolute', left: '268px', top: '214px' }} />

            {/* Arrows between solution boxes */}
            <path d="M 120 270 L 140 270" stroke="#22c55e" strokeWidth="2" markerEnd="url(#cal-arrow)" />
            <path d="M 240 270 L 260 270" stroke="#22c55e" strokeWidth="2" markerEnd="url(#cal-arrow)" />
          </svg>
        </CardContent>
      </Card>

      {/* Key point */}
      <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800">
        <p className="text-sm text-rose-800 dark:text-rose-200">
          <Lightbulb className="size-4 inline mr-2" />
          <strong>Si la bateria se agota</strong>, el contador de revoluciones se pierde y el robot necesita recalibrarse.
          Por eso es importante verificar la bateria periodicamente.
        </p>
      </div>
    </div>
  );
}

// ============================================================
// Slide 22 - Calibration Steps (Interactive Wizard)
// ============================================================

function Slide22_CalibrationSteps() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Llevar articulaciones a cero',
      description: 'Mueve manualmente el robot en modo Joint y ubica cada eje donde coincidan las marcas fisicas de calibracion.',
      icon: <Crosshair className="size-5 text-rose-500" />,
      visual: (
        <svg viewBox="0 0 440 140" className="w-full max-w-lg mx-auto">
          <defs>
            <pattern id="cal1-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="440" height="140" fill="url(#cal1-grid)" rx="8" />
          <text x="220" y="20" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">Modo Joint - Ubicar marcas en cero</text>
          {/* Robot base */}
          <rect x="170" y="90" width="100" height="30" rx="4" fill="#64748b" stroke="#475569" strokeWidth="2" />
          {/* Robot arm */}
          <line x1="220" y1="90" x2="220" y2="50" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
          <line x1="220" y1="50" x2="280" y2="35" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
          {/* Calibration marks */}
          <circle cx="220" cy="90" r="8" fill="none" stroke="#ef4444" strokeWidth="2" />
          <circle cx="220" cy="90" r="2" fill="#ef4444" />
          <line x1="220" y1="80" x2="220" y2="70" stroke="#ef4444" strokeWidth="2" />
          <text x="235" y="75" fill="#ef4444" fontSize="8">MARCA 0</text>
          <circle cx="220" cy="50" r="6" fill="none" stroke="#ef4444" strokeWidth="2" />
          <circle cx="220" cy="50" r="2" fill="#ef4444" />
          <text x="200" y="46" fill="#ef4444" fontSize="8">MARCA 0</text>
          <text x="220" y="132" textAnchor="middle" fill="#64748b" fontSize="9">Mover cada articulacion a su marca de cero</text>
        </svg>
      ),
    },
    {
      title: 'Ir a Calibracion',
      description: 'En el teach pendant, navega al menu de Calibracion para iniciar el proceso.',
      icon: <Settings className="size-5 text-rose-500" />,
      visual: (
        <svg viewBox="0 0 440 140" className="w-full max-w-lg mx-auto">
          <defs>
            <pattern id="cal2-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="440" height="140" fill="url(#cal2-grid)" rx="8" />
          <text x="220" y="20" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">Teach Pendant - Navegacion</text>
          {/* TP representation */}
          <rect x="120" y="30" width="200" height="100" fill="#1e293b" rx="12" stroke="#475569" strokeWidth="2" />
          <rect x="135" y="40" width="170" height="70" fill="#334155" rx="4" />
          <text x="220" y="60" textAnchor="middle" fill="#94a3b8" fontSize="9">Menu Principal</text>
          <text x="150" y="78" fill="#64748b" fontSize="8">|</text>
          <text x="170" y="78" fill="#22c55e" fontSize="9" fontWeight="bold">Calibracion</text>
          <text x="150" y="78" fill="#64748b" fontSize="8"> | Control | Configuracion</text>
          <text x="220" y="100" textAnchor="middle" fill="#f97316" fontSize="9" fontWeight="bold">Selecc. &gt; Calibracion</text>
        </svg>
      ),
    },
    {
      title: 'Metodos de Calibracion > Cuentarrevoluciones',
      description: 'Selecciona el metodo de "Cuentarrevoluciones" (Revolution Counter) del menu de calibracion.',
      icon: <RotateCcw className="size-5 text-rose-500" />,
      visual: (
        <svg viewBox="0 0 440 140" className="w-full max-w-lg mx-auto">
          <defs>
            <pattern id="cal3-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="440" height="140" fill="url(#cal3-grid)" rx="8" />
          <text x="220" y="20" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">Menu de Calibracion</text>
          {/* Menu items */}
          <rect x="100" y="30" width="240" height="90" fill="#1e293b" rx="8" />
          <text x="120" y="52" fill="#94a3b8" fontSize="10">Calibrar posicion...</text>
          <text x="120" y="70" fill="#22c55e" fontSize="10" fontWeight="bold">&gt; Cuentarrevoluciones</text>
          <text x="120" y="88" fill="#94a3b8" fontSize="10">Calibrar cargas...</text>
          <text x="120" y="106" fill="#94a3b8" fontSize="10">Datos del manipulador...</text>
          {/* Highlight */}
          <rect x="104" y="58" width="232" height="18" fill="#22c55e" fillOpacity="0.15" rx="2" />
        </svg>
      ),
    },
    {
      title: 'Seleccionar todos los ejes y Actualizar',
      description: 'Selecciona todos los ejes del robot y presiona "Actualizar" para guardar los nuevos valores del contador de revoluciones.',
      icon: <CheckCircle2 className="size-5 text-emerald-500" />,
      visual: (
        <svg viewBox="0 0 440 140" className="w-full max-w-lg mx-auto">
          <defs>
            <pattern id="cal4-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="440" height="140" fill="url(#cal4-grid)" rx="8" />
          <text x="220" y="20" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">Actualizar Cuentarrevoluciones</text>
          {/* Axis checkboxes */}
          {['Eje 1', 'Eje 2', 'Eje 3', 'Eje 4', 'Eje 5', 'Eje 6'].map((axis, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            return (
              <g key={i}>
                <rect x={60 + col * 120} y={35 + row * 28} width="100" height="22" fill="#22c55e" fillOpacity="0.15" rx="4" stroke="#22c55e" strokeWidth="1" />
                <circle cx={76} cy={46 + row * 28} r="5" fill="#22c55e" />
                <text x={88} y={50 + row * 28} fill="#166534" fontSize="9" fontWeight="bold">{axis}</text>
              </g>
            );
          })}
          {/* Update button */}
          <rect x="160" y="105" width="120" height="28" fill="#22c55e" rx="6" />
          <text x="220" y="124" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Actualizar</text>
          {/* Success check */}
          <circle cx="390" cy="52" r="8" fill="#22c55e" />
          <polyline points="385,52 389,56 396,48" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="390" y="78" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">Calibrado!</text>
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Pasos de Calibracion</h2>
        <p className="text-muted-foreground text-sm">
          Sigue el wizard paso a paso para calibrar el contador de revoluciones.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            className={`flex items-center justify-center size-8 rounded-full text-xs font-bold transition-all ${
              i === currentStep
                ? 'bg-gradient-to-br from-rose-500 to-pink-500 text-white scale-110 shadow-lg'
                : i < currentStep
                  ? 'bg-emerald-500 text-white'
                  : 'bg-muted text-muted-foreground'
            }`}
          >
            {i < currentStep ? <CheckCircle2 className="size-4" /> : i + 1}
          </button>
        ))}
      </div>

      {/* Current step content */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            {steps[currentStep].icon}
            <span className="text-sm">{steps[currentStep].title}</span>
            <Badge variant="secondary" className="text-xs ml-auto">
              Paso {currentStep + 1} de {steps.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
          {steps[currentStep].visual}
          <div className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="gap-1"
            >
              <ChevronLeft className="size-4" />
              Atras
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button
                size="sm"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="gap-1"
              >
                Siguiente paso
                <ChevronRight className="size-4" />
              </Button>
            ) : (
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 gap-1 px-3 py-1">
                <CheckCircle2 className="size-4" />
                Calibracion completada
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================
// Slide 23 - Quiz Calibracion
// ============================================================

function Slide23_QuizCalibracion({ onSaveQuizResult, quizResults }: { onSaveQuizResult: (result: any) => void; quizResults: any[] }) {
  const savedResult = quizResults?.find((r: any) => r.slideId === 23);
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Quiz: Calibracion</h2>
        <p className="text-muted-foreground text-sm">Pon a prueba tus conocimientos sobre calibracion.</p>
      </div>
      <QuizComponent
        questions={quizCalibracion}
        onComplete={(score, total) =>
          onSaveQuizResult({ slideId: 23, score, total, completed: true, answers: {} })
        }
        savedResult={savedResult}
      />
    </div>
  );
}

// ============================================================
// Slide 24 - Equilateral Triangle Center (Interactive)
// ============================================================

function Slide24_TriangleCenter() {
  const [sideLength, setSideLength] = useState(200);
  const L = sideLength;
  const h = (L * Math.sqrt(3)) / 2;
  const r = L / 3;

  const cx = 220;
  const cy = 150;

  // Vertices centered at origin
  const V1 = { x: cx, y: cy - (2 * r) };
  const V2 = { x: cx - L / 2, y: cy + r };
  const V3 = { x: cx + L / 2, y: cy + r };

  // Scale to fit SVG
  const scale = Math.min(380 / L, 250 / h);
  const sV1 = { x: cx + (V1.x - cx) * scale, y: cy + (V1.y - cy) * scale };
  const sV2 = { x: cx + (V2.x - cx) * scale, y: cy + (V2.y - cy) * scale };
  const sV3 = { x: cx + (V3.x - cx) * scale, y: cy + (V3.y - cy) * scale };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Centro del Triangulo Equilatero</h2>
        <p className="text-muted-foreground text-sm">
          Explora como calcular el centro y vertices de un triangulo equilatero para programar figuras.
        </p>
      </div>

      {/* Triangle SVG */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <svg viewBox="0 0 440 300" className="w-full max-w-lg mx-auto" role="img" aria-label="Triangulo equilatero interactivo">
            <defs>
              <pattern id="tri-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="440" height="300" fill="url(#tri-grid)" rx="8" />

            {/* Triangle */}
            <polygon
              points={`${sV1.x},${sV1.y} ${sV2.x},${sV2.y} ${sV3.x},${sV3.y}`}
              fill="#f97316" fillOpacity="0.08"
              stroke="#f97316"
              strokeWidth="2.5"
            />

            {/* Center point */}
            <circle cx={cx} cy={cy} r="5" fill="#ef4444" />
            <text x={cx + 10} y={cy - 8} fill="#ef4444" fontSize="10" fontWeight="bold">Centro (0,0)</text>

            {/* Height line (dashed) */}
            <line
              x1={sV1.x} y1={sV1.y}
              x2={cx} y2={cy + (r * scale)}
              stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4,3"
            />
            <text x={(sV1.x + cx) / 2 - 15} y={(sV1.y + cy + (r * scale)) / 2} fill="#8b5cf6" fontSize="9">h = L*sqrt(3)/2</text>

            {/* r line */}
            <line x1={cx} y1={cy} x2={cx} y2={cy + (r * scale)} stroke="#22c55e" strokeWidth="2" />
            <text x={cx + 8} y={cy + (r * scale) / 2 + 4} fill="#22c55e" fontSize="9">r = L/3</text>

            {/* Vertices with labels */}
            <circle cx={sV1.x} cy={sV1.y} r="6" fill="#22c55e" />
            <text x={sV1.x + 10} y={sV1.y - 4} fill="#22c55e" fontSize="10" fontWeight="bold">V1 (0, 2r)</text>

            <circle cx={sV2.x} cy={sV2.y} r="6" fill="#06b6d4" />
            <text x={sV2.x - 70} y={sV2.y + 15} fill="#06b6d4" fontSize="10" fontWeight="bold">V2 (-L/2, -r)</text>

            <circle cx={sV3.x} cy={sV3.y} r="6" fill="#eab308" />
            <text x={sV3.x + 10} y={sV3.y + 15} fill="#eab308" fontSize="10" fontWeight="bold">V3 (L/2, -r)</text>

            {/* Coordinate system */}
            <line x1={cx} y1={cy} x2={cx + 30} y2={cy} stroke="#ef4444" strokeWidth="1.5" />
            <text x={cx + 33} y={cy + 4} fill="#ef4444" fontSize="8">X</text>
            <line x1={cx} y1={cy} x2={cx} y2={cy - 30} stroke="#22c55e" strokeWidth="1.5" />
            <text x={cx + 4} y={cy - 33} fill="#22c55e" fontSize="8">Z</text>
          </svg>
        </CardContent>
      </Card>

      {/* Slider */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Triangle className="size-4 text-orange-500" />
            Lado L (en mm)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center gap-4">
            <Slider
              value={[sideLength]}
              onValueChange={(v) => setSideLength(v[0])}
              min={50}
              max={300}
              step={10}
              className="flex-1"
            />
            <Badge variant="secondary" className="min-w-[60px] justify-center font-mono">
              {sideLength}mm
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Calculated values */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <span className="text-xs text-muted-foreground">Altura (h)</span>
            <p className="text-lg font-bold font-mono text-violet-600">{h.toFixed(1)} mm</p>
            <p className="text-[10px] text-muted-foreground">h = L x sqrt(3) / 2</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <span className="text-xs text-muted-foreground">Centro a lado (r)</span>
            <p className="text-lg font-bold font-mono text-emerald-600">{r.toFixed(1)} mm</p>
            <p className="text-[10px] text-muted-foreground">r = L / 3</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <span className="text-xs text-muted-foreground">V1</span>
            <p className="text-sm font-bold font-mono">(0, {((2 * r)).toFixed(1)})</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <span className="text-xs text-muted-foreground">V2</span>
            <p className="text-sm font-bold font-mono">({(-L / 2).toFixed(1)}, {-r.toFixed(1)})</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm col-span-2">
          <CardContent className="p-3 text-center">
            <span className="text-xs text-muted-foreground">V3</span>
            <p className="text-sm font-bold font-mono">({(L / 2).toFixed(1)}, {-r.toFixed(1)})</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ============================================================
// Slide 25 - Drawing with Robot
// ============================================================

function Slide25_DrawingRobot() {
  const triangleCode = `PROC DibujarTriangulo()
  ! Calcular vertices
  VAR num L := 200;
  VAR num h := L * Sqrt(3) / 2;
  VAR num r := L / 3;
  
  MoveJ Home, v200, fine, tool1;
  
  MoveL Offs(Centro, 0, 0, r*2), v100, fine, tool1;
  MoveL Offs(Centro, -L/2, 0, -r), v100, fine, tool1;
  MoveL Offs(Centro, L/2, 0, -r), v100, fine, tool1;
  MoveL Offs(Centro, 0, 0, r*2), v100, fine, tool1;
  
  MoveJ Home, v200, fine, tool1;
ENDPROC`;

  const squareCode = `PROC DibujarCuadrado()
  VAR num L := 150;
  
  MoveJ Home, v200, fine, tool1;
  
  MoveL Offs(Centro, -L/2, 0, -L/2), v100, fine, tool1;
  MoveL Offs(Centro, L/2, 0, -L/2), v100, z5, tool1;
  MoveL Offs(Centro, L/2, 0, L/2), v100, z5, tool1;
  MoveL Offs(Centro, -L/2, 0, L/2), v100, z5, tool1;
  MoveL Offs(Centro, -L/2, 0, -L/2), v100, fine, tool1;
  
  MoveJ Home, v200, fine, tool1;
ENDPROC`;

  const circleCode = `PROC DibujarCirculo()
  VAR num radio := 100;
  VAR num pasos := 36;
  VAR num angulo := 0;
  
  MoveJ Home, v200, fine, tool1;
  
  FOR i FROM 1 TO pasos DO
    angulo := i * 360 / pasos;
    MoveL Offs(Centro, \\
      radio * Sin(angulo), \\
      radio * Cos(angulo), \\
      0), v100, z5, tool1;
  ENDFOR
  
  MoveJ Home, v200, fine, tool1;
ENDPROC`;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Dibujando con el Robot</h2>
        <p className="text-muted-foreground text-sm">
          Aprende a programar rutinas para dibujar figuras geometricas con el robot.
        </p>
      </div>

      <Tabs defaultValue="triangle">
        <TabsList>
          <TabsTrigger value="triangle">
            <Triangle className="size-3.5 mr-1" />
            Triangulo
          </TabsTrigger>
          <TabsTrigger value="square">
            <Square className="size-3.5 mr-1" />
            Cuadrado
          </TabsTrigger>
          <TabsTrigger value="circle">
            <Circle className="size-3.5 mr-1" />
            Circulo
          </TabsTrigger>
        </TabsList>
        <TabsContent value="triangle">
          <pre className="rounded-xl bg-slate-900 text-slate-100 p-5 text-sm leading-relaxed overflow-x-auto font-mono">
            <code>{triangleCode}</code>
          </pre>
        </TabsContent>
        <TabsContent value="square">
          <pre className="rounded-xl bg-slate-900 text-slate-100 p-5 text-sm leading-relaxed overflow-x-auto font-mono">
            <code>{squareCode}</code>
          </pre>
        </TabsContent>
        <TabsContent value="circle">
          <pre className="rounded-xl bg-slate-900 text-slate-100 p-5 text-sm leading-relaxed overflow-x-auto font-mono">
            <code>{circleCode}</code>
          </pre>
        </TabsContent>
      </Tabs>

      {/* Exercise */}
      <CodeExerciseComponent exercise={codeExercises[4]} />
    </div>
  );
}

// ============================================================
// Slide 26 - General Summary
// ============================================================

function Slide26_Summary() {
  const summaryCards = [
    {
      section: 'Movimientos',
      color: 'from-orange-500 to-red-500',
      icon: <Move className="size-5" />,
      points: ['MoveJ: movimiento de ejes (rapido)', 'MoveL: movimiento lineal (preciso)', 'Modo de reorientacion para girar herramienta'],
    },
    {
      section: 'Coordenadas',
      color: 'from-emerald-500 to-teal-500',
      icon: <Compass className="size-5" />,
      points: ['Sistema Base: fijo al robot', 'Sistema Mundo: coordenadas absolutas', 'Sistema Objeto: relativo a la pieza'],
    },
    {
      section: 'RAPID',
      color: 'from-violet-500 to-purple-500',
      icon: <Code className="size-5" />,
      points: ['MoveJ/MoveL con velocidad y zona', 'Zona fine = parada exacta', 'Estructura MODULE > PROC > ENDMODULE'],
    },
    {
      section: 'Work Objects',
      color: 'from-sky-500 to-cyan-500',
      icon: <Box className="size-5" />,
      points: ['wobj0 = base por defecto', 'WObj personalizado se mueve con la mesa', 'Parametro \\WObj:= en movimientos'],
    },
    {
      section: 'Trayectorias',
      color: 'from-amber-500 to-yellow-500',
      icon: <Route className="size-5" />,
      points: ['Crear puntos y nombrarlos', 'Elegir tipo, velocidad y zona', 'Verificar alcanzabilidad'],
    },
    {
      section: 'Calibracion',
      color: 'from-rose-500 to-pink-500',
      icon: <RotateCcw className="size-5" />,
      points: ['Encoder conoce posicion en 360 grados', 'Bateria mantiene cuenta de revoluciones', 'Calibrar cuando se pierde la bateria'],
    },
    {
      section: 'Figuras',
      color: 'from-lime-500 to-green-500',
      icon: <Triangle className="size-5" />,
      points: ['Centro del triangulo en (0,0)', 'h = L * sqrt(3)/2, r = L/3', 'Offs() para desfase de puntos'],
    },
    {
      section: 'Repaso',
      color: 'from-slate-500 to-zinc-500',
      icon: <GraduationCap className="size-5" />,
      points: ['Practicar en RobotStudio', 'Siempre verificar en modo manual', 'Documentar programas'],
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Resumen General</h2>
        <p className="text-muted-foreground text-sm">
          Repaso de todos los conceptos clave aprendidos durante el curso.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {summaryCards.map((card) => (
          <Card key={card.section} className="border-0 shadow-sm overflow-hidden">
            <div className={`h-1.5 bg-gradient-to-r ${card.color}`} />
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className={`flex items-center justify-center size-8 rounded-lg bg-gradient-to-br ${card.color} text-white`}>
                  {card.icon}
                </div>
                <span className="text-sm font-semibold">{card.section}</span>
              </div>
              <ul className="space-y-1.5">
                {card.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="mt-1 size-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <Sparkles className="size-4 inline mr-2" />
          <strong>Felicidades!</strong> Has completado todos los modulos del curso de programacion ABB IRB1100.
          Realiza el quiz final para verificar tu conocimiento.
        </p>
      </div>
    </div>
  );
}

// ============================================================
// Slide 27 - Final Quiz
// ============================================================

function Slide27_FinalQuiz({ onSaveQuizResult, quizResults }: { onSaveQuizResult: (result: any) => void; quizResults: any[] }) {
  const savedResult = quizResults?.find((r: any) => r.slideId === 27);
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Quiz Final</h2>
        <p className="text-muted-foreground text-sm">
          Pon a prueba todo lo que aprendiste
        </p>
      </div>
      <QuizComponent
        questions={quizFinal}
        onComplete={(score, total) =>
          onSaveQuizResult({ slideId: 27, score, total, completed: true, answers: {} })
        }
        savedResult={savedResult}
      />
    </div>
  );
}

// ============================================================
// Main Render Function
// ============================================================

export function renderSlideContent(
  slideId: number,
  onSaveQuizResult: (result: any) => void,
  quizResults: any[]
): React.ReactNode {
  switch (slideId) {
    case 0:
      return <Slide0_Cover />;
    case 1:
      return <Slide1_TOC />;
    case 2:
      return <Slide2_MovimientosOverview />;
    case 3:
      return <Slide3_JointMovement />;
    case 4:
      return <Slide4_LinearMovement />;
    case 5:
      return <Slide5_Reorientation />;
    case 6:
      return <Slide6_QuizMovimientos onSaveQuizResult={onSaveQuizResult} quizResults={quizResults} />;
    case 7:
      return <Slide7_CoordenadasOverview />;
    case 8:
      return <Slide8_BaseSystem />;
    case 9:
      return <Slide9_WorldSystem />;
    case 10:
      return <Slide10_ObjectSystem />;
    case 11:
      return <Slide11_ToolSystem />;
    case 12:
      return <Slide12_QuizCoordenadas onSaveQuizResult={onSaveQuizResult} quizResults={quizResults} />;
    case 13:
      return <Slide13_MoveJMoveL />;
    case 14:
      return <Slide14_MovementParams />;
    case 15:
      return <Slide15_CompleteCode />;
    case 16:
      return <Slide16_WorkObjects />;
    case 17:
      return <Slide17_CreateWorkObject />;
    case 18:
      return <Slide18_QuizWorkObjects onSaveQuizResult={onSaveQuizResult} quizResults={quizResults} />;
    case 19:
      return <Slide19_CreatingPaths />;
    case 20:
      return <Slide20_ProgramPaths />;
    case 21:
      return <Slide21_CalibrationCounter />;
    case 22:
      return <Slide22_CalibrationSteps />;
    case 23:
      return <Slide23_QuizCalibracion onSaveQuizResult={onSaveQuizResult} quizResults={quizResults} />;
    case 24:
      return <Slide24_TriangleCenter />;
    case 25:
      return <Slide25_DrawingRobot />;
    case 26:
      return <Slide26_Summary />;
    case 27:
      return <Slide27_FinalQuiz onSaveQuizResult={onSaveQuizResult} quizResults={quizResults} />;
    default:
      return null;
  }
}
