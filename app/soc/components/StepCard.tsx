"use client";

import type { Option } from "../../../lib/scenarios";

export default function StepCard({ step, stepNum, totalSteps, answer, onAnswer }: {
  step: { id: string; title: string; description: string; hint: string; options: Option[] };
  stepNum: number; totalSteps: number;
  answer: Option | null; onAnswer: (opt: Option) => void;
}) {
  const wrongOption = answer && !answer.correct ? answer : null;
  return (
    <div className="step-card">
      <div className="step-card-header">
        <span className="step-counter">Paso {stepNum}/{totalSteps}</span>
      </div>
      <h3>{step.title}</h3>
      <p className="step-description">{step.description}</p>
      <div className="step-hint">{step.hint}</div>
      <div className="step-options">
        {step.options.map((opt, i) => {
          const isSelected = answer?.id === opt.id;
          const showResult = !!answer;
          return (
            <button key={opt.id} className={`step-option ${isSelected ? "selected" : ""} ${showResult && opt.correct ? "correct" : ""} ${showResult && isSelected && !opt.correct ? "wrong" : ""}`}
              onClick={() => !answer && onAnswer(opt)} disabled={!!answer}
              style={{ animationDelay: `${i * 50}ms` }}>
              <span className="step-option-letter">{opt.id.toUpperCase()}</span>
              <div className="step-option-content">
                <span className="step-option-label">{opt.label}</span>
                {showResult && (isSelected || opt.correct) && (
                  <span className={`step-option-explanation ${opt.correct ? "correct" : "wrong"}`}>{opt.explanation}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      {wrongOption && wrongOption.consequence && (
        <div className="consequence-banner">
          <div className="consequence-icon">⚠</div>
          <div className="consequence-text">
            <strong>Consecuencia real:</strong> {wrongOption.consequence}
          </div>
        </div>
      )}
    </div>
  );
}
