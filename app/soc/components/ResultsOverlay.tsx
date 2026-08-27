"use client";

import { useEffect, useState } from "react";
import type { Scenario, Option } from "../../../lib/scenarios";
import { STEP_ORDER, STEP_LABELS } from "../types";

export default function ResultsOverlay({ score, total, scenario, answers, onBack }: {
  score: number; total: number; scenario: Scenario;
  answers: Record<string, Option | null>; onBack: () => void;
}) {
  const [showSteps, setShowSteps] = useState(false);
  const pct = Math.round((score / total) * 100);
  const grade = pct === 100 ? { label: "EXCELENTE", color: "var(--soc-ok)", icon: "🏆" } : pct >= 60 ? { label: "BUENO", color: "var(--soc-accent)", icon: "✓" } : { label: "NECESITA MEJORA", color: "var(--soc-high)", icon: "📚" };

  useEffect(() => { setTimeout(() => setShowSteps(true), 400); }, []);

  return (
    <div className="results-overlay">
      <div className="results-card">
        <div className="results-header">
          <div className="results-icon" style={{ color: grade.color }}>{grade.icon}</div>
          <h2>Investigación completada</h2>
          <div className="results-score" style={{ color: grade.color }}>{score}/{total}</div>
          <div className="results-grade" style={{ color: grade.color }}>{grade.label} — {pct}%</div>
        </div>
        <div className={`results-steps ${showSteps ? "visible" : ""}`}>
          {STEP_ORDER.map((stepId, i) => {
            const a = answers[stepId];
            const s = scenario.steps.find((st) => st.id === stepId);
            return (
              <div key={stepId} className={`results-step ${a?.correct ? "correct" : "wrong"}`} style={{ animationDelay: `${i * 100}ms` }}>
                <div className="results-step-header">
                  <span className="results-step-icon">{a?.correct ? "✓" : "✗"}</span>
                  <span className="results-step-title">{STEP_LABELS[stepId]}</span>
                </div>
                {a && (
                  <div className="results-step-answer">
                    <strong>Tu respuesta:</strong> {a.label}
                    {!a.correct && s && (
                      <div className="results-step-correct"><strong>Correcta:</strong> {s.options.find((o) => o.correct)?.label}</div>
                    )}
                    {!a.correct && a.consequence && (
                      <div className="results-step-consequence"><strong>Consecuencia:</strong> {a.consequence}</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="results-summary">
          <h3>Resumen del incidente</h3>
          <p>{scenario.summary}</p>
        </div>
        <div className="results-actions">
          <button className="soc-btn primary large" onClick={onBack}>Volver al panel de casos</button>
        </div>
      </div>
    </div>
  );
}
