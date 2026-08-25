import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOC Practice Lab — Simulador de operaciones de seguridad",
  description:
    "Practicá investigaciones de seguridad como en un SOC real. Casos interactivos con logs, playbooks, y clasificación de alertas.",
};

export default function SOCLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
