'use client';

import { useState } from 'react';
import { Trophy, CheckCircle2, XCircle, Lightbulb, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { QuizQuestion } from '@/lib/slide-data';

interface Props {
  questions: QuizQuestion[];
  label?: string;
}

export function QuizComponent({ questions, label }: Props) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[idx];
  const total = questions.length;

  function handleConfirm() {
    if (selected === null) return;
    setConfirmed(true);
    if (selected === q.correct) setScore((s) => s + 1);
  }

  function handleNext() {
    if (idx + 1 >= total) {
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setSelected(null);
      setConfirmed(false);
    }
  }

  function handleRetry() {
    setIdx(0);
    setSelected(null);
    setConfirmed(false);
    setScore(0);
    setDone(false);
  }

  if (done) {
    const pct = Math.round((score / total) * 100);
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col items-center gap-4">
          <div className="size-20 rounded-full bg-amber-100 flex items-center justify-center">
            <Trophy className="size-10 text-amber-500" />
          </div>
          <h3 className="text-xl font-bold">{label ?? 'Quiz'} Completado</h3>
          <div className="text-3xl font-extrabold">
            {score}/{total}
          </div>
          <Badge variant={pct >= 60 ? 'default' : 'destructive'} className="text-sm px-3 py-1">
            {pct}% {pct >= 60 ? 'Aprobado' : 'Intentalo de nuevo'}
          </Badge>
          <Button variant="outline" onClick={handleRetry} className="gap-2 mt-2">
            <RotateCcw className="size-4" />
            Intentar de nuevo
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {label && (
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{label}</Badge>
          <span className="text-sm text-muted-foreground">
            Pregunta {idx + 1} de {total}
          </span>
        </div>
      )}

      <Card className="border-0 shadow-sm">
        <CardContent className="p-5 space-y-4">
          <p className="font-semibold text-base">{q.question}</p>

          <div className="space-y-2">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correct;
              const isSelected = i === selected;
              let bg = 'bg-muted/50 hover:bg-muted';
              if (confirmed) {
                if (isCorrect) bg = 'bg-emerald-100 border-emerald-500';
                else if (isSelected) bg = 'bg-red-100 border-red-500';
              } else if (isSelected) {
                bg = 'bg-primary/10 border-primary';
              }

              return (
                <button
                  key={i}
                  onClick={() => !confirmed && setSelected(i)}
                  disabled={confirmed}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${bg} ${!confirmed && 'cursor-pointer'}`}
                >
                  <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                  {confirmed && isCorrect && (
                    <CheckCircle2 className="inline size-4 text-emerald-600 ml-2" />
                  )}
                  {confirmed && isSelected && !isCorrect && (
                    <XCircle className="inline size-4 text-red-600 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {confirmed && (
            <div className={`p-3 rounded-lg text-sm ${selected === q.correct ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
              <div className="flex items-start gap-2">
                {selected === q.correct ? (
                  <CheckCircle2 className="size-4 mt-0.5 shrink-0" />
                ) : (
                  <XCircle className="size-4 mt-0.5 shrink-0" />
                )}
                <span>{q.explanation}</span>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            {!confirmed ? (
              <Button onClick={handleConfirm} disabled={selected === null} size="sm">
                Confirmar
              </Button>
            ) : (
              <Button onClick={handleNext} size="sm">
                {idx + 1 >= total ? 'Ver resultado' : 'Siguiente pregunta'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
