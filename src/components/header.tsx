'use client';

export function Header() {
  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center gap-2">
        <span className="text-2xl">🦊</span>
        <h1 className="text-2xl font-bold">Honest Fox Feature Estimator</h1>
      </div>
    </header>
  );
}