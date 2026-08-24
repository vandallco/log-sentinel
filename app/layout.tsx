import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Log Sentinel — Análisis de logs con detección de amenazas",
  description:
    "Subí tus logs (auth.log, syslog, UFW) y detectá fuerza bruta, accesos sospechosos y escaneos de puertos. Procesamiento local en el navegador.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
