"use client";

import { useState } from "react";
import { COMPANY } from "../../../lib/company";

export default function CompanyPanel() {
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
