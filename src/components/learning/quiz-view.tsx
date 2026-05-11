'use client';

import React from 'react';
import { QuizComponent } from './quiz-component';
import { quizMap, SlideData } from '@/lib/slide-data';

interface Props {
  slide: SlideData;
}

export function QuizView({ slide }: Props) {
  const questions = quizMap[slide.id] || [];
  
  if (questions.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground border-2 border-dashed rounded-xl">
        No hay preguntas configuradas para este quiz (ID: {slide.id})
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <QuizComponent 
        questions={questions} 
        label={slide.title} 
      />
    </div>
  );
}
