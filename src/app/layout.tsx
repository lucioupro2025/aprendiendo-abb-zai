import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABB IRB1100 - Aprendizaje Interactivo de Robotica",
  description: "Guia didactica interactiva para aprender a programar el robot ABB IRB1100. Incluye modos de movimiento, sistemas de coordenadas, programacion RAPID, objetos de trabajo, trayectorias y calibracion.",
  keywords: ["ABB IRB1100", "Robotica", "RAPID", "Programacion de Robots", "Movimientos", "Coordenadas", "Calibracion"],
  authors: [{ name: "Guruweb" }],
  openGraph: {
    title: "ABB IRB1100 - Aprendizaje Interactivo",
    description: "Guia didactica interactiva para programar el robot ABB IRB1100",
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
