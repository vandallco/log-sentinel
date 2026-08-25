"use client";

import { SCENARIOS, type Scenario } from "../../../lib/scenarios";

export default function Dashboard({ onSelect }: { onSelect: (s: Scenario) => void }) {
  return (
    <div className="dashboard">
      <div className="dashboard-intro">
        <h2>Casos de investigación disponibles</h2>
        <p>Seleccioná un caso para iniciar la investigación. Los logs llegarán en tiempo real como en un SIEM.</p>
      </div>
      <div className="scenario-grid">
        {SCENARIOS.map((s) => (
          <button key={s.id} className={`scenario-card severity-${s.severity}`} onClick={() => onSelect(s)}>
            <div className="scenario-card-header">
              <span className={`severity-badge ${s.severity}`}>{s.severity.toUpperCase()}</span>
              <span className="scenario-source">{s.alertSource}</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <div className="scenario-card-footer">
              <span>🕐 {s.alertTime}</span>
              <span>📋 {s.logs.length} logs</span>
              <span>🔍 {s.steps.length} pasos</span>
            </div>
            <div className="scenario-card-cta">Iniciar investigación →</div>
          </button>
        ))}
      </div>
    </div>
  );
}
