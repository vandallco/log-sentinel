"use client";

import type { Option } from "../../../lib/scenarios";
import type { StepId } from "../types";
import { STEP_LABELS, STEP_ICONS } from "../types";

export default function ProgressBar({ steps, current, answers }: { steps: StepId[]; current: StepId; answers: Record<string, Option | null> }) {
  return (
    <div className="progress-bar">
      {steps.map((stepId, i) => {
        const isActive = stepId === current;
        const isDone = !!answers[stepId];
        const isCorrect = answers[stepId]?.correct ?? false;
        return (
          <div key={stepId} className={`progress-step ${isActive ? "active" : ""} ${isDone ? "done" : ""} ${isDone && !isCorrect ? "wrong" : ""}`}>
            <div className="progress-step-number">{isDone ? (isCorrect ? "✓" : "✗") : STEP_ICONS[stepId]}</div>
            <div className="progress-step-label">{STEP_LABELS[stepId]}</div>
            {i < steps.length - 1 && <div className={`progress-connector ${isDone ? "filled" : ""}`} />}
          </div>
        );
      })}
    </div>
  );
}
