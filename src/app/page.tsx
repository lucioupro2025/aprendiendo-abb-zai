import { LearningApp } from '@/components/learning/learning-app';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Cargando...</div>}>
      <LearningApp />
    </Suspense>
  );
}
