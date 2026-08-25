"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { COMPANY } from "../../lib/company";
import { SCENARIOS, type Scenario, type Option, type LogEntry } from "../../lib/scenarios";

type View = "dashboard" | "investigation";
type StepId = "identify" | "assign" | "playbook" | "classify" | "writeup" | "return";

const STEP_ORDER: StepId[] = ["identify", "assign", "playbook", "classify", "writeup", "return"];
const STEP_LABELS: Record<StepId, string> = { identify: "Identificar logs", assign: "Asignar caso", playbook: "Consultar playbook", classify: "Clasificar", writeup: "Redactar reporte", return: "Volver al panel" };
const STEP_ICONS: Record<StepId, string> = { identify: "1", assign: "2", playbook: "3", classify: "4", writeup: "5", return: "6" };

export default function SOCPage() {
  const [view, setView] = useState<View>("dashboard");
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [currentStep, setCurrentStep] = useState<StepId>("identify");
  const [answers, setAnswers] = useState<Record<string, Option | null>>({});
  const [showCompany, setShowCompany] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(400);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const userScrolledUp = useRef(false);
  const streamingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const allLogs = selectedScenario?.logs ?? [];
  const visibleLogs = allLogs.slice(0, visibleCount);

  useEffect(() => {
    if (!isStreaming || isPaused || visibleCount >= allLogs.length) {
      if (streamingRef.current) clearInterval(streamingRef.current);
      return;
    }
    streamingRef.current = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= allLogs.length) {
          if (streamingRef.current) clearInterval(streamingRef.current);
          setIsStreaming(false);
          return prev;
        }
        return prev + 1;
      });
    }, speed);
    return () => { if (streamingRef.current) clearInterval(streamingRef.current); };
  }, [isStreaming, isPaused, speed, allLogs.length, visibleCount]);

  useEffect(() => {
    if (visibleCount > 0 && !userScrolledUp.current && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [visibleCount]);

  const handleScroll = useCallback(() => {
    const el = logContainerRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    userScrolledUp.current = !atBottom;
  }, []);

  const startInvestigation = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setCurrentStep("identify");
    setAnswers({});
    setScore(0);
    setCompleted(false);
    setVisibleCount(0);
    setIsStreaming(true);
    setIsPaused(false);
    userScrolledUp.current = false;
    setView("investigation");
  };

  const handleAnswer = (stepId: string, option: Option) => {
    setAnswers((prev) => ({ ...prev, [stepId]: option }));
    if (option.correct) setScore((s) => s + 1);
  };

  const goNext = () => {
    const idx = STEP_ORDER.indexOf(currentStep);
    if (idx < STEP_ORDER.length - 1) setCurrentStep(STEP_ORDER[idx + 1]);
    else setCompleted(true);
  };

  const goBack = () => {
    const idx = STEP_ORDER.indexOf(currentStep);
    if (idx > 0) setCurrentStep(STEP_ORDER[idx - 1]);
  };

  const resetToDashboard = () => {
    setView("dashboard");
    setSelectedScenario(null);
    setCurrentStep("identify");
    setAnswers({});
    setScore(0);
    setCompleted(false);
    setVisibleCount(0);
    setIsStreaming(false);
    setIsPaused(false);
    if (streamingRef.current) clearInterval(streamingRef.current);
  };

  const skipToEnd = () => {
    setVisibleCount(allLogs.length);
    setIsStreaming(false);
    if (streamingRef.current) clearInterval(streamingRef.current);
  };

  const currentStepData = selectedScenario?.steps.find((s) => s.id === currentStep);
  const currentAnswer = currentStep ? answers[currentStep] : null;

  return (
    <div className="soc">
      <header className="soc-header">
        <div className="soc-header-left">
          <div className="soc-logo">SOC</div>
          <div>
            <h1>SOC Practice Lab</h1>
            <p className="soc-subtitle">Simulador de operaciones de seguridad · {COMPANY.name}</p>
          </div>
        </div>
        <div className="soc-header-actions">
          <button className="soc-btn ghost" onClick={() => setShowCompany(!showCompany)}>
            {showCompany ? "Ocultar" : "Ver"} empresa
          </button>
          {view === "investigation" && (
            <button className="soc-btn ghost" onClick={resetToDashboard}>Volver al panel</button>
          )}
        </div>
      </header>

      {showCompany && <CompanyPanel />}

      {view === "dashboard" && <Dashboard onSelect={startInvestigation} />}

      {view === "investigation" && selectedScenario && (
        <div className="investigation">
          <ScenarioHeader scenario={selectedScenario} />
          <div className="investigation-body">
            <div className="investigation-left">
              <ProgressBar steps={STEP_ORDER} current={currentStep} answers={answers} />
              {currentStepData && (
                <StepCard step={currentStepData} answer={currentAnswer} onAnswer={(opt) => handleAnswer(currentStep, opt)} />
              )}
              <div className="investigation-nav">
                <button className="soc-btn ghost" onClick={goBack} disabled={STEP_ORDER.indexOf(currentStep) === 0}>Anterior</button>
                <button className="soc-btn primary" onClick={goNext} disabled={!currentAnswer}>
                  {STEP_ORDER.indexOf(currentStep) === STEP_ORDER.length - 1 ? "Finalizar" : "Siguiente"}
                </button>
              </div>
            </div>
            <div className="investigation-right">
              <LogPanel
                logs={visibleLogs}
                totalLogs={allLogs.length}
                isStreaming={isStreaming}
                isPaused={isPaused}
                speed={speed}
                containerRef={logContainerRef}
                onScroll={handleScroll}
                onPauseToggle={() => setIsPaused(!isPaused)}
                onSpeedChange={setSpeed}
                onSkip={skipToEnd}
              />
            </div>
          </div>
          {completed && (
            <ResultsOverlay score={score} total={STEP_ORDER.length} scenario={selectedScenario} answers={answers} onBack={resetToDashboard} />
          )}
        </div>
      )}
    </div>
  );
}

/* ── STREAMING LOG PANEL ── */

function LogPanel({
  logs, totalLogs, isStreaming, isPaused, speed, containerRef, onScroll,
  onPauseToggle, onSpeedChange, onSkip,
}: {
  logs: LogEntry[];
  totalLogs: number;
  isStreaming: boolean;
  isPaused: boolean;
  speed: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onScroll: () => void;
  onPauseToggle: () => void;
  onSpeedChange: (s: number) => void;
  onSkip: () => void;
}) {
  const flaggedCount = logs.filter((l) => l.flagged).length;
  const isDone = logs.length >= totalLogs;
  const speeds = [800, 400, 200, 80, 30];

  return (
    <div className="log-panel">
      <div className="log-panel-header">
        <div className="log-panel-title">
          <h3>Logs del sistema</h3>
          {isStreaming && (
            <span className={`live-indicator ${isPaused ? "paused" : ""}`}>
              <span className="live-dot" />
              {isPaused ? "PAUSA" : "LIVE"}
            </span>
          )}
          {isDone && <span className="live-indicator done">COMPLETO</span>}
        </div>
        <div className="log-panel-controls">
          <span className="log-panel-count">{logs.length}/{totalLogs} · {flaggedCount} marcados</span>
          {isStreaming && (
            <>
              <button className="log-ctrl-btn" onClick={onPauseToggle} title={isPaused ? "Reanudar" : "Pausar"}>
                {isPaused ? "▶" : "❚❚"}
              </button>
              <div className="speed-selector">
                {speeds.map((s) => (
                  <button key={s} className={`speed-btn ${speed === s ? "active" : ""}`} onClick={() => onSpeedChange(s)}>
                    {s >= 400 ? "1x" : s >= 200 ? "2x" : s >= 80 ? "5x" : "15x"}
                  </button>
                ))}
              </div>
              <button className="log-ctrl-btn skip" onClick={onSkip} title="Saltar al final">⏩</button>
            </>
          )}
        </div>
      </div>
      <div className="log-entries" ref={containerRef} onScroll={onScroll}>
        {logs.map((log) => (
          <div key={log.line} className={`log-entry ${log.severity} ${log.flagged ? "flagged" : ""} ${log.line === logs.length ? "newest" : ""}`}>
            <div className="log-entry-header">
              <span className="log-line">#{log.line}</span>
              <span className="log-timestamp">{log.timestamp}</span>
              <span className="log-source">{log.source}</span>
              {log.flagged && <span className="log-flag">!</span>}
            </div>
            <div className="log-message">{log.message}</div>
          </div>
        ))}
        {!isDone && logs.length === 0 && (
          <div className="log-waiting">Esperando logs...</div>
        )}
      </div>
    </div>
  );
}

/* ── COMPANY PANEL ── */

function CompanyPanel() {
  return (
    <div className="company-panel">
      <div className="company-grid">
        <div className="company-section">
          <h3>Empleados</h3>
          <div className="company-list">
            {COMPANY.employees.map((e) => (
              <div key={e.ip} className="company-card">
                <div className="company-card-name">{e.name}</div>
                <div className="company-card-detail">{e.role}</div>
                <div className="company-card-detail">{e.department}</div>
                <div className="company-card-ip">{e.ip}</div>
                <div className="company-card-detail">{e.equipment}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="company-section">
          <h3>Servidores</h3>
          <div className="company-list">
            {COMPANY.servers.map((s) => (
              <div key={s.ip} className="company-card">
                <div className="company-card-name">{s.hostname}</div>
                <div className="company-card-detail">{s.purpose}</div>
                <div className="company-card-ip">{s.ip}</div>
                <div className="company-card-detail">{s.vlan}</div>
                <div className="company-card-detail">{s.os}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="company-section">
          <h3>Red</h3>
          <div className="company-list">
            {COMPANY.networkRanges.map((r) => (
              <div key={r.cidr} className="company-card">
                <div className="company-card-name">{r.name}</div>
                <div className="company-card-ip">{r.cidr}</div>
                <div className="company-card-detail">{r.vlan}</div>
              </div>
            ))}
            <div className="company-card">
              <div className="company-card-name">VPN</div>
              <div className="company-card-ip">{COMPANY.vpnRange}</div>
            </div>
          </div>
        </div>
        <div className="company-section">
          <h3>Notas</h3>
          <ul className="company-notes">
            {COMPANY.notes.map((n, i) => <li key={i}>{n}</li>)}
          </ul>
          <div className="company-meta">
            <div><strong>SOC:</strong> {COMPANY.socEmail}</div>
            <div><strong>Escalamiento:</strong> {COMPANY.escalationContact}</div>
            <div><strong>Horario:</strong> {COMPANY.workHours}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── DASHBOARD ── */

function Dashboard({ onSelect }: { onSelect: (s: Scenario) => void }) {
  return (
    <div className="dashboard">
      <div className="dashboard-intro">
        <h2>Casos de investigación disponibles</h2>
        <p>Seleccioná un caso para iniciar la investigación. Los logs llegarán en tiempo real como en un SIEM.</p>
      </div>
      <div className="scenario-grid">
        {SCENARIOS.map((s) => (
          <div key={s.id} className={`scenario-card severity-${s.severity}`} onClick={() => onSelect(s)}>
            <div className="scenario-card-header">
              <span className={`severity-badge ${s.severity}`}>{s.severity.toUpperCase()}</span>
              <span className="scenario-source">{s.alertSource}</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <div className="scenario-card-footer">
              <span>{s.alertTime}</span>
              <span>{s.logs.length} logs</span>
              <span>{s.steps.length} pasos</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── SCENARIO HEADER ── */

function ScenarioHeader({ scenario }: { scenario: Scenario }) {
  return (
    <div className={`scenario-header severity-bg-${scenario.severity}`}>
      <div className="scenario-header-top">
        <span className={`severity-badge ${scenario.severity}`}>{scenario.severity.toUpperCase()}</span>
        <span className="scenario-header-source">{scenario.alertSource}</span>
        <span className="scenario-header-time">{scenario.alertTime}</span>
      </div>
      <h2>{scenario.title}</h2>
      <p>{scenario.description}</p>
    </div>
  );
}

/* ── PROGRESS BAR ── */

function ProgressBar({ steps, current, answers }: { steps: StepId[]; current: StepId; answers: Record<string, Option | null> }) {
  return (
    <div className="progress-bar">
      {steps.map((stepId) => {
        const isActive = stepId === current;
        const isDone = !!answers[stepId];
        const isCorrect = answers[stepId]?.correct ?? false;
        return (
          <div key={stepId} className={`progress-step ${isActive ? "active" : ""} ${isDone ? "done" : ""} ${isDone && !isCorrect ? "wrong" : ""}`}>
            <div className="progress-step-number">{isDone ? (isCorrect ? "✓" : "✗") : STEP_ICONS[stepId]}</div>
            <div className="progress-step-label">{STEP_LABELS[stepId]}</div>
          </div>
        );
      })}
    </div>
  );
}

/* ── STEP CARD ── */

function StepCard({ step, answer, onAnswer }: {
  step: { id: string; title: string; description: string; hint: string; options: Option[] };
  answer: Option | null;
  onAnswer: (opt: Option) => void;
}) {
  return (
    <div className="step-card">
      <h3>{step.title}</h3>
      <p className="step-description">{step.description}</p>
      <div className="step-hint">{step.hint}</div>
      <div className="step-options">
        {step.options.map((opt) => {
          const isSelected = answer?.id === opt.id;
          const showResult = !!answer;
          return (
            <button key={opt.id} className={`step-option ${isSelected ? "selected" : ""} ${showResult && opt.correct ? "correct" : ""} ${showResult && isSelected && !opt.correct ? "wrong" : ""}`}
              onClick={() => !answer && onAnswer(opt)} disabled={!!answer}>
              <span className="step-option-label">{opt.label}</span>
              {showResult && (isSelected || opt.correct) && (
                <span className={`step-option-explanation ${opt.correct ? "correct" : "wrong"}`}>{opt.explanation}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── RESULTS OVERLAY ── */

function ResultsOverlay({ score, total, scenario, answers, onBack }: {
  score: number; total: number; scenario: Scenario;
  answers: Record<string, Option | null>; onBack: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const grade = pct === 100 ? { label: "EXCELENTE", color: "var(--ok)" } : pct >= 60 ? { label: "BUENO", color: "var(--accent)" } : { label: "NECESITA MEJORA", color: "var(--high)" };

  return (
    <div className="results-overlay">
      <div className="results-card">
        <div className="results-header">
          <h2>Investigación completada</h2>
          <div className="results-score" style={{ color: grade.color }}>{score}/{total}</div>
          <div className="results-grade" style={{ color: grade.color }}>{grade.label} — {pct}%</div>
        </div>
        <div className="results-steps">
          {STEP_ORDER.map((stepId) => {
            const a = answers[stepId];
            const s = scenario.steps.find((st) => st.id === stepId);
            return (
              <div key={stepId} className={`results-step ${a?.correct ? "correct" : "wrong"}`}>
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
          <button className="soc-btn primary" onClick={onBack}>Volver al panel de casos</button>
        </div>
      </div>
    </div>
  );
}
