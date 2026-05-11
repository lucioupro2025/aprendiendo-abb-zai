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
    if (selected === q.c) setScore((s) => s + 1);
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
      <Card className="border-0 shadow-xl bg-card/50">
        <CardContent className="p-8 flex flex-col items-center gap-6">
          <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Trophy className="size-12 text-primary" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold">{label ?? 'Quiz'} Completado</h3>
          <div className="text-5xl font-black text-primary">
            {score}/{total}
          </div>
          <Badge variant={pct >= 70 ? 'default' : 'destructive'} className="text-lg px-4 py-1.5">
            {pct}% {pct >= 70 ? 'Aprobado' : 'Sigue practicando'}
          </Badge>
          <Button size="lg" onClick={handleRetry} className="gap-2 mt-4 w-full sm:w-auto h-12 text-lg">
            <RotateCcw className="size-5" />
            Reintentar
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {label && (
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-sm border-primary/30 text-primary px-3 py-1">{label}</Badge>
          <span className="text-base font-medium text-muted-foreground">
            Pregunta <span className="text-primary font-bold">{idx + 1}</span> de {total}
          </span>
        </div>
      )}

      <Card className="border-0 shadow-xl bg-card/50">
        <CardContent className="p-6 md:p-8 space-y-6">
          <p className="font-bold text-xl md:text-2xl leading-tight">{q.q}</p>

          <div className="space-y-3">
            {q.a.map((opt, i) => {
              const isCorrect = i === q.c;
              const isSelected = i === selected;
              let bg = 'bg-muted/30 border-transparent hover:border-primary/50';
              if (confirmed) {
                if (isCorrect) bg = 'bg-[#00D390]/20 border-[#00D390] text-[#00D390]';
                else if (isSelected) bg = 'bg-destructive/20 border-destructive text-destructive';
              } else if (isSelected) {
                bg = 'bg-primary/20 border-primary text-primary';
              }

              return (
                <button
                  key={i}
                  onClick={() => !confirmed && setSelected(i)}
                  disabled={confirmed}
                  className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all text-base md:text-lg ${bg} ${!confirmed && 'active:scale-95'}`}
                >
                  <span className="font-black mr-3 opacity-60">{String.fromCharCode(65 + i)}.</span>
                  <span className="font-medium">{opt}</span>
                  {confirmed && isCorrect && (
                    <CheckCircle2 className="inline size-6 text-[#00D390] ml-auto float-right" />
                  )}
                  {confirmed && isSelected && !isCorrect && (
                    <XCircle className="inline size-6 text-destructive ml-auto float-right" />
                  )}
                </button>
              );
            })}
          </div>

          {confirmed && (
            <div className={`p-5 rounded-xl border-l-4 text-base md:text-lg ${selected === q.c ? 'bg-[#00D390]/10 border-l-[#00D390] text-[#00D390]' : 'bg-destructive/10 border-l-destructive text-destructive'}`}>
              <div className="flex items-start gap-3">
                <Lightbulb className="size-6 mt-0.5 shrink-0" />
                <span className="font-medium italic">Respuesta correcta confirmada</span>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            {!confirmed ? (
              <Button onClick={handleConfirm} disabled={selected === null} size="lg" className="w-full sm:w-auto h-12 text-lg font-bold">
                Confirmar
              </Button>
            ) : (
              <Button onClick={handleNext} size="lg" className="w-full sm:w-auto h-12 text-lg font-bold">
                {idx + 1 >= total ? 'Ver resultado' : 'Siguiente pregunta'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
