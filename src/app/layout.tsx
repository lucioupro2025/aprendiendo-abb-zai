import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PinnaLMS - Aprendizaje Interactivo de Robotica",
  description: "Guia didactica interactiva para aprender a programar robots industriales. Incluye modos de movimiento, sistemas de coordenadas, programacion RAPID, objetos de trabajo, trayectorias y calibracion.",
  keywords: ["PinnaLMS", "Robotica", "ABB", "RAPID", "Programacion de Robots", "Movimientos", "Coordenadas", "Calibracion"],
  authors: [{ name: "Fede Pinna" }],
  openGraph: {
    title: "PinnaLMS - Aprendizaje Interactivo",
    description: "Guia didactica interactiva para programar robots industriales",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
