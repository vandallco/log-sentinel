"use client";

import type { Scenario } from "../../../lib/scenarios";

export default function ScenarioHeader({ scenario }: { scenario: Scenario }) {
  return (
    <div className={`scenario-header severity-bg-${scenario.severity}`}>
      <div className="scenario-header-top">
        <span className={`severity-badge ${scenario.severity}`}>{scenario.severity.toUpperCase()}</span>
        <span className="scenario-header-source">{scenario.alertSource}</span>
        <span className="scenario-header-time">🕐 {scenario.alertTime}</span>
      </div>
      <h2>{scenario.title}</h2>
      <p>{scenario.description}</p>
    </div>
  );
}
