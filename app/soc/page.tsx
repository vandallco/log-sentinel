"use client";

import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { COMPANY } from "../../lib/company";
import { type Scenario, type Option, type LogEntry } from "../../lib/scenarios";
import { type View, type StepId, type LogFilter, STEP_ORDER } from "./types";
import LogPanel from "./components/LogPanel";
import CompanyPanel from "./components/CompanyPanel";
import Dashboard from "./components/Dashboard";
import ScenarioHeader from "./components/ScenarioHeader";
import ProgressBar from "./components/ProgressBar";
import StepCard from "./components/StepCard";
import ResultsOverlay from "./components/ResultsOverlay";

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
  const visibleCountRef = useRef(0);

  useEffect(() => { visibleCountRef.current = visibleCount; }, [visibleCount]);

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
    if (!isStreaming || isPaused || visibleCountRef.current >= allLogs.length) {
      if (streamingRef.current) clearInterval(streamingRef.current);
      if (visibleCountRef.current >= allLogs.length && isStreaming) setIsStreaming(false);
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
  }, [isStreaming, isPaused, speed, allLogs.length]);

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
    setTimeout(() => URL.revokeObjectURL(url), 5000);
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
