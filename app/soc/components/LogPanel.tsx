"use client";

import type { LogEntry } from "../../../lib/scenarios";
import type { LogFilter } from "../types";

export default function LogPanel({
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
