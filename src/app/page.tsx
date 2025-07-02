import { Suspense } from 'react';
import { CharacterGridSkeleton } from '@/components/CharacterGridSkeleton';
import HomePage from '@/app/HomePage';

export default function Page() {
  return (
    <Suspense fallback={<CharacterGridSkeleton />}>
      <HomePage />
    </Suspense>
  );
}
