import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ABB IRB1100 - Aprendizaje Interactivo de Robotica",
  description: "Guia didactica interactiva para aprender a programar el robot ABB IRB1100. Incluye modos de movimiento, sistemas de coordenadas, programacion RAPID, objetos de trabajo, trayectorias y calibracion.",
  keywords: ["ABB IRB1100", "Robotica", "RAPID", "Programacion de Robots", "Movimientos", "Coordenadas", "Calibracion"],
  authors: [{ name: "Tecnicatura en Robotica Avanzada" }],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
