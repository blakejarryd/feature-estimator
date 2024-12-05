'use client';

import { useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { useProjectStore } from '../lib/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fetchProjects } = useProjectStore();

  useEffect(() => {
    console.log('Layout mounted, fetching projects...');
    fetchProjects();
  }, [fetchProjects]);

  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <div className="flex h-full">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}