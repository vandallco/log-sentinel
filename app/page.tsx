"use client";

import { useCallback, useRef, useState } from "react";
import { parseLog, SAMPLE_LOG, type AnalysisResult, type Severity } from "../lib/parser";

const SEV_ORDER: Severity[] = ["critical", "high", "medium", "low"];
const SEV_LABEL: Record<Severity, string> = {
  critical: "crítico",
  high: "alto",
  medium: "medio",
  low: "bajo",
};

export default function Home() {
  const [raw, setRaw] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [dragging, setDragging] = useState(false);
  const [fileError, setFileError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const analyze = (text: string) => {
    setRaw(text);
    setResult(text.trim() ? parseLog(text) : null);
  };

  const loadFile = useCallback((file: File) => {
    setFileError("");
    if (file.size > 5 * 1024 * 1024) {
      setFileError("El archivo supera 5 MB. Intentá con uno más pequeño.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => analyze(String(reader.result ?? ""));
    reader.onerror = () => setFileError("Error al leer el archivo.");
    reader.readAsText(file);
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  };

  return (
    <div className="container">
      <header className="top">
        <div className="logo">🛡️</div>
        <div>
          <h1>Log Sentinel</h1>
          <p className="tagline">
            Detección de fuerza bruta, accesos sospechosos y escaneos de
            puertos · todo se procesa en tu navegador
          </p>
        </div>
        <a href="/soc" className="soc-link">
          SOC Lab →
        </a>
      </header>

      <section className="panel">
        <textarea
          value={raw}
          onChange={(e) => analyze(e.target.value)}
          placeholder={"Pegá acá tu auth.log, syslog o output de UFW...\n\nEj: Jul 24 03:12:01 srv sshd[2231]: Failed password for root from 45.155.204.10 port 42122 ssh2"}
          spellCheck={false}
          onDrop={onDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          className={dragging ? "over" : ""}
        />
        <div className="row">
          <button onClick={() => analyze(raw)}>Analizar</button>
          <div
            className={`dropzone${dragging ? " over" : ""}`}
            onClick={() => fileRef.current?.click()}
            onDrop={onDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileRef.current?.click(); }}
            aria-label="Subir archivo de log"
          >
            o arrastrá un archivo .log / hacé click para subirlo
          </div>
          <input
            ref={fileRef}
            type="file"
            accept=".log,.txt,text/plain"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) loadFile(f);
              e.target.value = "";
            }}
          />
          {result && (
            <button className="ghost" onClick={() => { setRaw(""); setResult(null); }}>
              Limpiar
            </button>
          )}
        </div>
      </section>

      {fileError && (
        <div className="panel" style={{ color: "var(--critical)", borderColor: "var(--critical)" }}>
          {fileError}
        </div>
      )}

      {!result && (
        <div className="panel empty">
          Sin datos todavía.{" "}
          <a
            href="#"
            style={{ color: "var(--accent)" }}
            onClick={(e) => {
              e.preventDefault();
              analyze(SAMPLE_LOG);
            }}
          >
            Cargar log de ejemplo
          </a>{" "}
          para ver una demo con ataques simulados.
        </div>
      )}

      {result && (
        <>
          <div className="stats">
            <Stat num={result.totalLines} label="líneas analizadas" />
            <Stat
              num={[...result.failedByIp.values()].reduce((a, b) => a + b, 0)}
              label="auth fallidas"
            />
            <Stat
              num={[...result.acceptedByIp.values()].reduce((a, b) => a + b, 0)}
              label="logins exitosos"
            />
            <Stat num={result.alerts.length} label="alertas" danger />
          </div>

          <h2 className="section">Alertas</h2>
          {result.alerts.length === 0 ? (
            <span className="ok-banner">Sin amenazas detectadas ✓</span>
          ) : (
            result.alerts.map((a, i) => (
              <div key={i} className={`alert ${a.severity}`}>
                <span className={`badge ${a.severity}`}>
                  {SEV_LABEL[a.severity]}
                </span>
                <div>
                  <h3>{a.title}</h3>
                  <p>{a.detail}</p>
                </div>
              </div>
            ))
          )}

          <h2 className="section">
            Eventos relevantes ({result.parsedEvents.length})
          </h2>
          {result.parsedEvents.length > 200 && (
            <p style={{ fontSize: "0.72rem", color: "var(--muted)", margin: "0.5rem 0" }}>
              Mostrando 200 de {result.parsedEvents.length} eventos.
            </p>
          )}
          <div className="panel" style={{ overflowX: "auto", padding: 0 }}>
            <table>
              <thead>
                <tr>
                  <th>Línea</th>
                  <th>Timestamp</th>
                  <th>IP</th>
                  <th>Usuario</th>
                  <th>Puerto</th>
                  <th>Mensaje</th>
                </tr>
              </thead>
              <tbody>
                {result.parsedEvents.slice(0, 200).map((ev) => (
                  <tr key={ev.line}>
                    <td>{ev.line}</td>
                    <td>{ev.timestamp ?? "—"}</td>
                    <td className="ip-tag">{ev.ip ?? "—"}</td>
                    <td>{ev.user ?? "—"}</td>
                    <td>{ev.port ?? "—"}</td>
                    <td className="msg">{ev.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <footer>
        Log Sentinel · análisis 100% client-side, ningún dato sale de tu
        navegador
      </footer>
    </div>
  );
}

function Stat({
  num,
  label,
  danger,
}: {
  num: number;
  label: string;
  danger?: boolean;
}) {
  return (
    <div className="stat">
      <div
        className="num"
        style={
          danger && num > 0 ? { color: "var(--critical)" } : undefined
        }
      >
        {num}
      </div>
      <div className="label">{label}</div>
    </div>
  );
}
