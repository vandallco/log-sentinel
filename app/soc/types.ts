"use client";

import type { Option } from "../../lib/scenarios";

export type View = "dashboard" | "investigation";
export type StepId = "identify" | "assign" | "playbook" | "classify" | "writeup" | "return";
export type LogFilter = "all" | "flagged" | "warning" | "critical";

export const STEP_ORDER: StepId[] = ["identify", "assign", "playbook", "classify", "writeup", "return"];
export const STEP_LABELS: Record<StepId, string> = {
  identify: "Identificar logs",
  assign: "Asignar caso",
  playbook: "Consultar playbook",
  classify: "Clasificar",
  writeup: "Redactar reporte",
  return: "Volver al panel",
};
export const STEP_ICONS: Record<StepId, string> = {
  identify: "1",
  assign: "2",
  playbook: "3",
  classify: "4",
  writeup: "5",
  return: "6",
};
