'use client';

import { useState } from 'react';
import { Lightbulb, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { CodeExercise } from '@/lib/slide-data';

interface Props {
  exercise: CodeExercise;
}

export function CodeExerciseComponent({ exercise }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Parse template into segments: text and blanks
  const blankIds = exercise.blanks.map((b) => b.id);
  const wrappedIds = blankIds.map((id) => `__${id}__`);
  const blankIdSet = new Set(wrappedIds);
  const regex = new RegExp(`(${wrappedIds.join('|')})`, 'g');
  const segments = exercise.template.split(regex).filter(Boolean);

  function handleSelect(blankId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [blankId]: value }));
  }

  function handleCheck() {
    setChecked(true);
  }

  function handleRetry() {
    setAnswers({});
    setChecked(false);
    setShowHint(false);
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4 space-y-3">
        <div>
          <h4 className="font-semibold text-sm">{exercise.title}</h4>
          <p className="text-xs text-muted-foreground mt-1">{exercise.description}</p>
        </div>

        {/* Code block */}
        <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="whitespace-pre leading-relaxed">
            {segments.map((seg, i) => {
              if (blankIdSet.has(seg)) {
                const blankId = seg.replace(/__/g, '');
                const blank = exercise.blanks.find((b) => b.id === blankId);
                const current = answers[blankId] ?? '';

                let border = 'border-slate-600';
                if (checked && blank) {
                  border = current === blank.answer ? 'border-emerald-500' : 'border-red-500';
                }

                return (
                  <select
                    key={i}
                    value={current}
                    onChange={(e) => handleSelect(blankId, e.target.value)}
                    disabled={checked}
                    className={`inline-block bg-slate-800 text-amber-300 border ${border} rounded px-2 py-0.5 text-sm font-mono appearance-none cursor-pointer mx-0.5`}
                  >
                    <option value="">???</option>
                    {blank?.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                );
              }
              return <span key={i}>{seg}</span>;
            })}
          </pre>
        </div>

        {/* Hint */}
        {exercise.hint && (
          <div>
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {showHint ? <EyeOff className="size-3" /> : <Lightbulb className="size-3" />}
              {showHint ? 'Ocultar pista' : 'Mostrar pista'}
            </button>
            {showHint && (
              <p className="text-xs text-amber-700 bg-amber-50 rounded p-2 mt-1">
                {exercise.hint}
              </p>
            )}
          </div>
        )}

        {/* Check result */}
        {checked && (
          <div className="flex items-center gap-2 text-sm">
            {exercise.blanks.every((b) => answers[b.id] === b.answer) ? (
              <>
                <CheckCircle2 className="size-4 text-emerald-500" />
                <span className="text-emerald-700 font-medium">Todo correcto!</span>
              </>
            ) : (
              <>
                <XCircle className="size-4 text-red-500" />
                <span className="text-red-700 font-medium">
                  Algunas respuestas son incorrectas. Revisa e intenta de nuevo.
                </span>
              </>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2 pt-1">
          {!checked ? (
            <Button size="sm" onClick={handleCheck} disabled={Object.keys(answers).length < exercise.blanks.length}>
              Verificar
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={handleRetry}>
              Reintentar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
