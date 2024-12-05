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
    fetchProjects();
  }, [fetchProjects]);

  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}