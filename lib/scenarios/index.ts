import type { Scenario } from "./types";
import bruteForceSsh from "./brute-force-ssh";
import dnsTunneling from "./dns-tunneling";
import lateralMovement from "./lateral-movement";
import phishingCredentials from "./phishing-credentials";
import c2Beaconing from "./c2-beaconing";
import insiderThreat from "./insider-threat";

export const SCENARIOS: Scenario[] = [
  bruteForceSsh,
  lateralMovement,
  c2Beaconing,
  dnsTunneling,
  phishingCredentials,
  insiderThreat,
];

export type { Option, Step, LogEntry, Scenario } from "./types";
