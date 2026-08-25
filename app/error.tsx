"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div style={{ padding: "2rem", fontFamily: "monospace", background: "#06090f", color: "#e2e8f0", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
      <h2 style={{ color: "#ef4444" }}>Algo salió mal</h2>
      <p>{error.message}</p>
      <button onClick={reset} style={{ padding: "0.5rem 1rem", background: "#22d3ee", color: "#06090f", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 700 }}>
        Reintentar
      </button>
    </div>
  );
}
