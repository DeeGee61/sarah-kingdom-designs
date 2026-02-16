"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Step { task: string; hours: number; prompt: string }
interface Phase { name: string; color: string; steps: Step[] }

const PHASE_TEMPLATES: Phase[] = [
  {
    name: "Preliminary Design", color: "#3A7D5C",
    steps: [
      { task: "Initial client consultation & site visit", hours: 4, prompt: "Describe client's vision, lifestyle needs, and aesthetic preferences" },
      { task: "Existing conditions documentation", hours: 6, prompt: "Document current space dimensions, architectural features, and pain points" },
      { task: "Mood board & concept direction", hours: 8, prompt: "Create visual direction boards reflecting client's style and project goals" },
      { task: "Preliminary space planning", hours: 10, prompt: "Develop 2-3 layout options addressing flow, function, and spatial hierarchy" },
      { task: "Budget framework & material palette", hours: 4, prompt: "Outline budget allocation with preliminary material selections" },
    ],
  },
  {
    name: "Schematics", color: "#B8860B",
    steps: [
      { task: "Refined floor plans & layouts", hours: 8, prompt: "Finalize space plan with exact furniture placement and clearances" },
      { task: "Elevation drawings & millwork", hours: 12, prompt: "Produce elevation views of key walls and custom millwork specs" },
      { task: "Lighting plan & fixtures", hours: 6, prompt: "Map lighting layers with specific fixture recommendations" },
      { task: "Material & finish specs", hours: 8, prompt: "Select all surfaces, fabrics, wall treatments, and hardware" },
      { task: "Client presentation & revisions", hours: 4, prompt: "Present schematic package, gather feedback, document revisions" },
    ],
  },
  {
    name: "Design Development", color: "#8B4573",
    steps: [
      { task: "Construction drawings", hours: 14, prompt: "Produce dimensioned drawings for contractor bidding and permitting" },
      { task: "Custom furniture specs", hours: 10, prompt: "Detail custom pieces with dimensions, materials, and finishes" },
      { task: "Procurement & vendor coordination", hours: 8, prompt: "Create procurement list with lead times and order sequencing" },
      { task: "Finish schedule & approvals", hours: 6, prompt: "Compile finish selections with physical samples for sign-off" },
      { task: "Final package & budget reconciliation", hours: 6, prompt: "Deliver complete package and reconcile budget against selections" },
    ],
  },
  {
    name: "Construction", color: "#2B5F8A",
    steps: [
      { task: "Pre-construction meeting", hours: 4, prompt: "Align contractor, trades, and team on scope and schedule" },
      { task: "Weekly site visits", hours: 16, prompt: "Conduct inspections to verify quality and design compliance" },
      { task: "Material delivery & QC", hours: 8, prompt: "Manage delivery logistics and inspect materials upon receipt" },
      { task: "Field decisions & clarifications", hours: 6, prompt: "Resolve on-site questions and real-time aesthetic decisions" },
      { task: "Installation & styling", hours: 12, prompt: "Direct furniture placement, art hanging, and styling" },
    ],
  },
  {
    name: "Construction Admin", color: "#555",
    steps: [
      { task: "Walkthrough & punch list", hours: 4, prompt: "Review documenting items requiring correction or completion" },
      { task: "Punch list tracking", hours: 8, prompt: "Monitor progress on punch list and verify completion quality" },
      { task: "Photography coordination", hours: 4, prompt: "Schedule and art-direct professional photography" },
      { task: "Client handover", hours: 3, prompt: "Deliver care instructions, vendor contacts, warranty info" },
      { task: "Post-project follow-up", hours: 2, prompt: "30-day check-in, address issues, gather testimonial" },
    ],
  },
]

const SCOPES = ["Whole House", "Kitchen", "Master Bedroom", "Master Bathroom", "Living Room", "Dining Room", "Home Office", "Outdoor Living", "Basement", "Guest Suite", "Multi-Room"]
const SCOPE_MULT: Record<string, number> = { "Whole House": 1.0, Kitchen: 0.45, "Master Bedroom": 0.3, "Master Bathroom": 0.3, "Living Room": 0.3, "Dining Room": 0.25, "Home Office": 0.25, "Outdoor Living": 0.35, Basement: 0.4, "Guest Suite": 0.3, "Multi-Room": 0.6 }

const card: React.CSSProperties = { background: "#fff", border: "1px solid #E8E7E3", padding: 16 }
const lbl: React.CSSProperties = { display: "block", fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#AAA", marginBottom: 5 }
const inp: React.CSSProperties = { width: "100%", padding: "8px 10px", fontSize: 13, border: "1px solid #E0DED8", background: "#FAFAF8", fontFamily: "inherit", outline: "none" }

export default function ProposalDashboard() {
  const [client, setClient] = useState("")
  const [scope, setScope] = useState("Whole House")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [rate, setRate] = useState(175)
  const [upfront, setUpfront] = useState(0)
  const [phases, setPhases] = useState<Phase[]>(PHASE_TEMPLATES)
  const [activePhase, setActivePhase] = useState<number | null>(null)
  const [showPrompts, setShowPrompts] = useState(true)

  useEffect(() => {
    const m = SCOPE_MULT[scope] || 1
    setPhases(PHASE_TEMPLATES.map((p) => ({ ...p, steps: p.steps.map((s) => ({ ...s, hours: Math.max(1, Math.round(s.hours * m)) })) })))
  }, [scope])

  const totalHours = phases.reduce((s, p) => s + p.steps.reduce((a, st) => a + st.hours, 0), 0)
  const totalCost = totalHours * rate + upfront
  const maxPhaseHours = Math.max(...phases.map((p) => p.steps.reduce((a, st) => a + st.hours, 0)))

  const updateHours = (pi: number, si: number, val: string) => {
    setPhases((prev) => {
      const u = [...prev]
      u[pi] = { ...u[pi], steps: u[pi].steps.map((s, i) => (i === si ? { ...s, hours: Number(val) || 0 } : s)) }
      return u
    })
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F7F6F3", fontFamily: "var(--font-sans, 'Cabinet Grotesk', system-ui, sans-serif)" }}>

      {/* Sticky Top Bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "#111", color: "#fff", padding: "0 32px", display: "flex", alignItems: "stretch", height: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginRight: "auto" }}>
          <Link href="/admin" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.4, color: "#fff", textDecoration: "none" }}>← Admin</Link>
          <span style={{ opacity: 0.15 }}>|</span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Proposal Dashboard</span>
        </div>
        {[
          { label: "Rate", val: `$${rate}/hr` },
          { label: "Hours", val: String(totalHours) },
          { label: "Upfront", val: `$${upfront.toLocaleString()}` },
          { label: "Total", val: `$${totalCost.toLocaleString()}`, highlight: true },
        ].map((m, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 20px", borderLeft: "1px solid #222" }}>
            <div style={{ fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.3 }}>{m.label}</div>
            <div style={{ fontSize: m.highlight ? 16 : 13, fontWeight: m.highlight ? 700 : 500 }}>{m.val}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: "28px 32px", maxWidth: 1200, margin: "0 auto" }}>

        {/* Project Info Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 28 }}>
          <div style={{ ...card, gridColumn: "span 2" }}>
            <label style={lbl}>Client Name</label>
            <input type="text" value={client} onChange={(e) => setClient(e.target.value)} placeholder="The Henderson Residence" style={{ ...inp, fontSize: 16, fontWeight: 600, padding: "10px 12px" }} />
          </div>
          <div style={card}>
            <label style={lbl}>Scope</label>
            <select value={scope} onChange={(e) => setScope(e.target.value)} style={{ ...inp, fontWeight: 600 }}>
              {SCOPES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={card}>
            <label style={lbl}>Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={inp} />
          </div>
          <div style={card}>
            <label style={lbl}>Target Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={inp} />
          </div>
          <div style={{ ...card, display: "flex", flexDirection: "column", gap: 8 }}>
            <div><label style={lbl}>Rate ($/hr)</label><input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} style={{ ...inp, fontWeight: 700, fontSize: 16 }} /></div>
            <div><label style={lbl}>Upfront ($)</label><input type="number" value={upfront} onChange={(e) => setUpfront(Number(e.target.value))} style={inp} /></div>
          </div>
        </div>

        {/* Budget Bar Chart */}
        <div style={{ background: "#fff", border: "1px solid #E8E7E3", padding: 24, marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>Budget Distribution</div>
            <button onClick={() => setShowPrompts(!showPrompts)} style={{ fontSize: 11, color: "#888", background: "none", border: "1px solid #E0E0E0", padding: "4px 12px", cursor: "pointer", fontFamily: "inherit" }}>
              {showPrompts ? "Hide" : "Show"} Prompts
            </button>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "end", height: 80, marginBottom: 8 }}>
            {phases.map((phase, pi) => {
              const hrs = phase.steps.reduce((s, st) => s + st.hours, 0)
              const pct = maxPhaseHours > 0 ? (hrs / maxPhaseHours) * 100 : 0
              return (
                <div key={pi} onClick={() => setActivePhase(activePhase === pi ? null : pi)} style={{
                  flex: 1, height: `${pct}%`, minHeight: 12,
                  background: activePhase === pi ? phase.color : `${phase.color}88`,
                  cursor: "pointer", transition: "all 0.25s", position: "relative",
                }}>
                  <div style={{ position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)", fontSize: 11, fontWeight: 600, color: "#555", whiteSpace: "nowrap" }}>{hrs}h</div>
                </div>
              )
            })}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {phases.map((phase, pi) => (
              <div key={pi} style={{ flex: 1, fontSize: 9, textAlign: "center", color: activePhase === pi ? "#111" : "#AAA", fontWeight: activePhase === pi ? 600 : 400, textTransform: "uppercase", letterSpacing: "0.06em", cursor: "pointer" }} onClick={() => setActivePhase(activePhase === pi ? null : pi)}>
                {phase.name.replace("Construction Admin", "CA")}
              </div>
            ))}
          </div>
        </div>

        {/* Phase Cards */}
        <div style={{ display: "grid", gridTemplateColumns: activePhase !== null ? "1fr" : "1fr 1fr", gap: 16 }}>
          {phases.map((phase, pi) => {
            if (activePhase !== null && activePhase !== pi) return null
            const phaseHours = phase.steps.reduce((s, st) => s + st.hours, 0)
            const isExpanded = activePhase === pi
            return (
              <div key={pi} style={{ background: "#fff", border: `1px solid ${isExpanded ? phase.color + "44" : "#E8E7E3"}`, overflow: "hidden", transition: "all 0.25s" }}>
                <div onClick={() => setActivePhase(isExpanded ? null : pi)} style={{
                  padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center",
                  borderBottom: `2px solid ${phase.color}`, cursor: "pointer",
                }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{phase.name}</div>
                    <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{phase.steps.length} tasks · {phaseHours} hours · ${(phaseHours * rate).toLocaleString()}</div>
                  </div>
                  <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: phase.color + "11", color: phase.color, fontSize: 12, fontWeight: 700 }}>
                    {isExpanded ? "−" : "+"}
                  </div>
                </div>

                {!isExpanded && (
                  <div style={{ padding: "8px 20px 12px" }}>
                    {phase.steps.map((step, si) => (
                      <div key={si} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: 12, color: "#777", borderBottom: si < phase.steps.length - 1 ? "1px solid #F5F4F0" : "none" }}>
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "75%" }}>{step.task}</span>
                        <span style={{ color: "#BBB", fontWeight: 500 }}>{step.hours}h</span>
                      </div>
                    ))}
                  </div>
                )}

                {isExpanded && (
                  <div style={{ padding: "4px 0" }}>
                    {phase.steps.map((step, si) => (
                      <div key={si} style={{ padding: "16px 20px", borderBottom: si < phase.steps.length - 1 ? "1px solid #F0EFEB" : "none" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: showPrompts ? 8 : 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 500, color: "#222" }}>{step.task}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <input type="number" value={step.hours} onChange={(e) => updateHours(pi, si, e.target.value)}
                              style={{ width: 56, padding: "6px 8px", fontSize: 14, fontWeight: 600, textAlign: "center", border: "1px solid #E0E0E0", fontFamily: "inherit", background: "#FAFAF8" }} />
                            <span style={{ fontSize: 11, color: "#AAA", minWidth: 60, textAlign: "right" }}>${(step.hours * rate).toLocaleString()}</span>
                          </div>
                        </div>
                        {showPrompts && (
                          <div style={{ fontSize: 12, color: "#999", fontStyle: "italic", paddingLeft: 14, borderLeft: `2px solid ${phase.color}33`, lineHeight: 1.5, marginTop: 4 }}>
                            {step.prompt}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Summary Footer */}
        <div style={{ marginTop: 28, background: "#111", color: "#fff", padding: 24, display: "grid", gridTemplateColumns: "repeat(5, 1fr) 2fr", gap: 16, alignItems: "end" }}>
          {phases.map((phase, pi) => {
            const hrs = phase.steps.reduce((s, st) => s + st.hours, 0)
            return (
              <div key={pi}>
                <div style={{ fontSize: 8, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.3, marginBottom: 4 }}>{phase.name.split(" ").map(w => w[0]).join("")}</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{hrs}h</div>
                <div style={{ fontSize: 11, opacity: 0.4 }}>${(hrs * rate).toLocaleString()}</div>
              </div>
            )
          })}
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 8, textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.3, marginBottom: 4 }}>Total Investment</div>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>${totalCost.toLocaleString()}</div>
            <div style={{ fontSize: 11, opacity: 0.4 }}>{totalHours} hours × ${rate}/hr{upfront > 0 ? ` + $${upfront.toLocaleString()} upfront` : ""}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
