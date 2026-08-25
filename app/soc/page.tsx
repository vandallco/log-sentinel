"use client";

import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { COMPANY } from "../../lib/company";
import { SCENARIOS, type Scenario, type Option, type LogEntry } from "../../lib/scenarios";

type View = "dashboard" | "investigation";
type StepId = "identify" | "assign" | "playbook" | "classify" | "writeup" | "return";
type LogFilter = "all" | "flagged" | "warning" | "critical";

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
  const [logFilter, setLogFilter] = useState<LogFilter>("all");
  const [logSearch, setLogSearch] = useState("");
  const [stepAnimating, setStepAnimating] = useState(false);
  const [fullscreenLogs, setFullscreenLogs] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const userScrolledUp = useRef(false);
  const streamingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const allLogs = selectedScenario?.logs ?? [];
  const visibleLogs = allLogs.slice(0, visibleCount);

  const filteredLogs = useMemo(() => {
    let logs = visibleLogs;
    if (logFilter === "flagged") logs = logs.filter((l) => l.flagged);
    else if (logFilter === "warning") logs = logs.filter((l) => l.severity === "warning");
    else if (logFilter === "critical") logs = logs.filter((l) => l.severity === "critical" || l.flagged);
    if (logSearch.trim()) {
      const q = logSearch.toLowerCase();
      logs = logs.filter((l) => l.message.toLowerCase().includes(q) || l.source.toLowerCase().includes(q) || l.timestamp.toLowerCase().includes(q));
    }
    return logs;
  }, [visibleLogs, logFilter, logSearch]);

  useEffect(() => {
    if (!isStreaming || isPaused || visibleCount >= allLogs.length) {
      if (streamingRef.current) clearInterval(streamingRef.current);
      if (visibleCount >= allLogs.length && isStreaming) setIsStreaming(false);
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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (view !== "investigation") return;
      if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA") return;
      if (e.code === "Space") { e.preventDefault(); setIsPaused((p) => !p); }
      if (e.code === "ArrowRight" || e.code === "Enter") {
        const idx = STEP_ORDER.indexOf(currentStep);
        if (answers[currentStep] && idx < STEP_ORDER.length - 1) {
          setStepAnimating(true);
          setTimeout(() => { setCurrentStep(STEP_ORDER[idx + 1]); setStepAnimating(false); }, 150);
        }
      }
      if (e.code === "ArrowLeft") {
        const idx = STEP_ORDER.indexOf(currentStep);
        if (idx > 0) { setStepAnimating(true); setTimeout(() => { setCurrentStep(STEP_ORDER[idx - 1]); setStepAnimating(false); }, 150); }
      }
      if (e.code === "Escape") {
        if (fullscreenLogs) setFullscreenLogs(false);
        else resetToDashboard();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [view, currentStep, answers, fullscreenLogs]);

  const startInvestigation = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setCurrentStep("identify");
    setAnswers({});
    setScore(0);
    setCompleted(false);
    setVisibleCount(0);
    setIsStreaming(true);
    setIsPaused(false);
    setLogFilter("all");
    setLogSearch("");
    userScrolledUp.current = false;
    setView("investigation");
  };

  const handleAnswer = (stepId: string, option: Option) => {
    setAnswers((prev) => ({ ...prev, [stepId]: option }));
    if (option.correct) setScore((s) => s + 1);
  };

  const goNext = () => {
    const idx = STEP_ORDER.indexOf(currentStep);
    if (idx < STEP_ORDER.length - 1) { setStepAnimating(true); setTimeout(() => { setCurrentStep(STEP_ORDER[idx + 1]); setStepAnimating(false); }, 150); }
    else setCompleted(true);
  };

  const goBack = () => {
    const idx = STEP_ORDER.indexOf(currentStep);
    if (idx > 0) { setStepAnimating(true); setTimeout(() => { setCurrentStep(STEP_ORDER[idx - 1]); setStepAnimating(false); }, 150); }
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
    setLogFilter("all");
    setLogSearch("");
    setFullscreenLogs(false);
    if (streamingRef.current) clearInterval(streamingRef.current);
  };

  const skipToEnd = () => {
    setVisibleCount(allLogs.length);
    setIsStreaming(false);
    if (streamingRef.current) clearInterval(streamingRef.current);
  };

  const openLogsInNewTab = () => {
    if (!selectedScenario) return;
    const logLines = filteredLogs.map((l) =>
      `[${l.timestamp}] [${l.severity.toUpperCase()}] [${l.source}] ${l.message}${l.flagged ? " ⚠ FLAGGED" : ""}`
    ).join("\n");
    const blob = new Blob([logLines], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const currentStepData = selectedScenario?.steps.find((s) => s.id === currentStep);
  const currentAnswer = currentStep ? answers[currentStep] : null;
  const stepIdx = STEP_ORDER.indexOf(currentStep);

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

      <div className={`company-panel-wrap ${showCompany ? "open" : ""}`}>
        <CompanyPanel />
      </div>

      {view === "dashboard" && <Dashboard onSelect={startInvestigation} />}

      {view === "investigation" && selectedScenario && (
        <div className="investigation">
          <ScenarioHeader scenario={selectedScenario} />
          <div className="investigation-body">
            <div className="investigation-left">
              <ProgressBar steps={STEP_ORDER} current={currentStep} answers={answers} />
              <div className={`step-card-wrap ${stepAnimating ? "slide-out" : "slide-in"}`}>
                {currentStepData && (
                  <StepCard
                    step={currentStepData}
                    stepNum={stepIdx + 1}
                    totalSteps={STEP_ORDER.length}
                    answer={currentAnswer}
                    onAnswer={(opt) => handleAnswer(currentStep, opt)}
                  />
                )}
              </div>
              <div className="investigation-nav">
                <button className="soc-btn ghost" onClick={goBack} disabled={stepIdx === 0}>
                  ← Anterior
                </button>
                <span className="nav-hint">{stepIdx + 1} de {STEP_ORDER.length}</span>
                <button className="soc-btn primary" onClick={goNext} disabled={!currentAnswer}>
                  {stepIdx === STEP_ORDER.length - 1 ? "Finalizar ✓" : "Siguiente →"}
                </button>
              </div>
              <div className="keyboard-hint">
                <kbd>Espacio</kbd> pausa · <kbd>←</kbd><kbd>→</kbd> navegar · <kbd>Esc</kbd> salir
              </div>
            </div>
            <div className="investigation-right">
              <LogPanel
                logs={filteredLogs}
                allVisible={visibleLogs}
                totalLogs={allLogs.length}
                isStreaming={isStreaming}
                isPaused={isPaused}
                speed={speed}
                logFilter={logFilter}
                logSearch={logSearch}
                containerRef={logContainerRef}
                onScroll={handleScroll}
                onPauseToggle={() => setIsPaused(!isPaused)}
                onSpeedChange={setSpeed}
                onSkip={skipToEnd}
                onFilterChange={setLogFilter}
                onSearchChange={setLogSearch}
                onFullscreen={() => setFullscreenLogs(true)}
                onOpenNewTab={openLogsInNewTab}
              />
            </div>
          </div>
          {completed && (
            <ResultsOverlay score={score} total={STEP_ORDER.length} scenario={selectedScenario} answers={answers} onBack={resetToDashboard} />
          )}
        </div>
      )}

      {fullscreenLogs && (
        <div className="fullscreen-overlay" onClick={() => setFullscreenLogs(false)}>
          <div className="fullscreen-card" onClick={(e) => e.stopPropagation()}>
            <div className="fullscreen-header">
              <h3>Logs del sistema — Vista completa</h3>
              <div className="fullscreen-actions">
                <button className="soc-btn ghost" onClick={openLogsInNewTab}>Abrir en nueva pestaña</button>
                <button className="soc-btn ghost" onClick={() => setFullscreenLogs(false)}>Cerrar ✕</button>
              </div>
            </div>
            <div className="fullscreen-filters">
              <div className="log-filter-tabs">
                {(["all", "flagged", "warning", "critical"] as LogFilter[]).map((f) => (
                  <button key={f} className={`log-filter-tab ${logFilter === f ? "active" : ""}`} onClick={() => setLogFilter(f)}>
                    {f === "all" ? "Todos" : f === "flagged" ? "Marcados" : f === "warning" ? "Warnings" : "Críticos"}
                    <span className="filter-count">
                      {f === "all" ? visibleLogs.length : f === "flagged" ? visibleLogs.filter((l) => l.flagged).length : f === "warning" ? visibleLogs.filter((l) => l.severity === "warning").length : visibleLogs.filter((l) => l.severity === "critical" || l.flagged).length}
                    </span>
                  </button>
                ))}
              </div>
              <input className="log-search" type="text" placeholder="Buscar en logs..." value={logSearch} onChange={(e) => setLogSearch(e.target.value)} />
            </div>
            <div className="fullscreen-logs">
              {filteredLogs.map((log, i) => (
                <div key={log.line} className={`log-entry ${log.severity} ${log.flagged ? "flagged" : ""}`}>
                  <div className="log-entry-header">
                    <span className="log-line">#{log.line}</span>
                    <span className="log-timestamp">{log.timestamp}</span>
                    <span className="log-source">{log.source}</span>
                    {log.flagged && <span className="log-flag">!</span>}
                  </div>
                  <div className="log-message">{log.message}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── STREAMING LOG PANEL ── */

function LogPanel({
  logs, allVisible, totalLogs, isStreaming, isPaused, speed, logFilter, logSearch,
  containerRef, onScroll, onPauseToggle, onSpeedChange, onSkip, onFilterChange, onSearchChange,
  onFullscreen, onOpenNewTab,
}: {
  logs: LogEntry[]; allVisible: LogEntry[]; totalLogs: number;
  isStreaming: boolean; isPaused: boolean; speed: number;
  logFilter: LogFilter; logSearch: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onScroll: () => void; onPauseToggle: () => void;
  onSpeedChange: (s: number) => void; onSkip: () => void;
  onFilterChange: (f: LogFilter) => void; onSearchChange: (s: string) => void;
  onFullscreen: () => void; onOpenNewTab: () => void;
}) {
  const flaggedCount = allVisible.filter((l) => l.flagged).length;
  const warnCount = allVisible.filter((l) => l.severity === "warning").length;
  const critCount = allVisible.filter((l) => l.severity === "critical").length;
  const isDone = allVisible.length >= totalLogs;
  const speeds = [800, 400, 200, 80, 30];
  const progress = totalLogs > 0 ? (allVisible.length / totalLogs) * 100 : 0;
  const lastTimestamp = allVisible.length > 0 ? allVisible[allVisible.length - 1].timestamp : "";

  const filters: { key: LogFilter; label: string; count: number }[] = [
    { key: "all", label: "Todos", count: allVisible.length },
    { key: "flagged", label: "Marcados", count: flaggedCount },
    { key: "warning", label: "Warnings", count: warnCount },
    { key: "critical", label: "Críticos", count: critCount },
  ];

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
          {lastTimestamp && <span className="log-timestamp-current">{lastTimestamp}</span>}
          <span className="log-panel-count">{allVisible.length}/{totalLogs}</span>
          <button className="log-ctrl-btn expand-btn" onClick={onFullscreen} title="Pantalla completa">⛶</button>
          <button className="log-ctrl-btn expand-btn" onClick={onOpenNewTab} title="Abrir en nueva pestaña">⧉</button>
          {isStreaming && (
            <>
              <button className="log-ctrl-btn" onClick={onPauseToggle} title={isPaused ? "Reanudar (Espacio)" : "Pausar (Espacio)"}>
                {isPaused ? "▶" : "❚❚"}
              </button>
              <div className="speed-selector">
                {speeds.map((s) => (
                  <button key={s} className={`speed-btn ${speed === s ? "active" : ""}`} onClick={() => onSpeedChange(s)}>
                    {s >= 400 ? "1x" : s >= 200 ? "2x" : s >= 80 ? "5x" : "15x"}
                  </button>
                ))}
              </div>
              <button className="log-ctrl-btn skip" onClick={onSkip} title="Skip to end">⏩</button>
            </>
          )}
        </div>
      </div>

      {!isDone && isStreaming && (
        <div className="log-progress-bar">
          <div className="log-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}

      <div className="log-filters">
        <div className="log-filter-tabs">
          {filters.map((f) => (
            <button key={f.key} className={`log-filter-tab ${logFilter === f.key ? "active" : ""}`} onClick={() => onFilterChange(f.key)}>
              {f.label} <span className="filter-count">{f.count}</span>
            </button>
          ))}
        </div>
        <input className="log-search" type="text" placeholder="Buscar en logs..." value={logSearch} onChange={(e) => onSearchChange(e.target.value)} />
      </div>

      <div className="log-entries" ref={containerRef} onScroll={onScroll}>
        {logs.map((log, i) => (
          <div key={log.line} className={`log-entry ${log.severity} ${log.flagged ? "flagged" : ""} ${i === logs.length - 1 ? "newest" : ""}`}>
            <div className="log-entry-header">
              <span className="log-line">#{log.line}</span>
              <span className="log-timestamp">{log.timestamp}</span>
              <span className="log-source">{log.source}</span>
              {log.flagged && <span className="log-flag">!</span>}
            </div>
            <div className="log-message">{log.message}</div>
          </div>
        ))}
        {logs.length === 0 && allVisible.length === 0 && !isDone && (
          <div className="log-waiting">
            <div className="log-waiting-spinner" />
            Esperando logs del servidor...
          </div>
        )}
        {logs.length === 0 && allVisible.length > 0 && (
          <div className="log-empty-filter">Ningún log coincide con el filtro actual</div>
        )}
      </div>
    </div>
  );
}

/* ── COMPANY PANEL (with playbooks) ── */

function CompanyPanel() {
  const [playbookOpen, setPlaybookOpen] = useState(true);
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
        <div className="company-section company-section-full">
          <div className="playbook-toggle" onClick={() => setPlaybookOpen(!playbookOpen)}>
            <h3>📖 Playbooks</h3>
            <span className={`playbook-chevron ${playbookOpen ? "open" : ""}`}>▼</span>
          </div>
          {playbookOpen && (
            <div className="playbook-list">
              {COMPANY.playbooks.map((entry) => (
                <div key={entry.id} className="playbook-entry">
                  <div className="playbook-entry-header">
                    <span className="playbook-id">{entry.id}</span>
                    <span className="playbook-title">{entry.title}</span>
                    <span className="playbook-category">{entry.category}</span>
                  </div>
                  <pre className="playbook-content">{entry.content}</pre>
                </div>
              ))}
            </div>
          )}
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
              <span>🕐 {s.alertTime}</span>
              <span>📋 {s.logs.length} logs</span>
              <span>🔍 {s.steps.length} pasos</span>
            </div>
            <div className="scenario-card-cta">Iniciar investigación →</div>
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
        <span className="scenario-header-time">🕐 {scenario.alertTime}</span>
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

/* ── STEP CARD (with consequences) ── */

function StepCard({ step, stepNum, totalSteps, answer, onAnswer }: {
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

/* ── RESULTS OVERLAY ── */

function ResultsOverlay({ score, total, scenario, answers, onBack }: {
  score: number; total: number; scenario: Scenario;
  answers: Record<string, Option | null>; onBack: () => void;
}) {
  const [showSteps, setShowSteps] = useState(false);
  const pct = Math.round((score / total) * 100);
  const grade = pct === 100 ? { label: "EXCELENTE", color: "var(--ok)", icon: "🏆" } : pct >= 60 ? { label: "BUENO", color: "var(--accent)", icon: "✓" } : { label: "NECESITA MEJORA", color: "var(--high)", icon: "📚" };

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
