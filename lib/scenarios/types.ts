import type { PlaybookEntry } from "../company";

export type Option = {
  id: string;
  label: string;
  correct: boolean;
  explanation: string;
  consequence?: string;
};

export type Step = {
  id: string;
  title: string;
  description: string;
  hint: string;
  options: Option[];
};

export type LogEntry = {
  line: number;
  timestamp: string;
  source: string;
  message: string;
  severity: "info" | "warning" | "critical";
  flagged: boolean;
};

export type Scenario = {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium";
  description: string;
  alertSource: string;
  alertTime: string;
  logs: LogEntry[];
  playbook: PlaybookEntry[];
  steps: Step[];
  summary: string;
};
