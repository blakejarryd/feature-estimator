import './globals.css';
import { ProjectProvider } from '@/components/providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <ProjectProvider>
          {children}
        </ProjectProvider>
      </body>
    </html>
  )
}