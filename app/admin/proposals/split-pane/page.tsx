"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Step { task: string; hours: number; prompt: string }
interface Phase { name: string; icon: string; steps: Step[] }

const PHASES_DATA: Phase[] = [
  {
    name: "Preliminary Design", icon: "◇",
    steps: [
      { task: "Initial client consultation & site visit", hours: 4, prompt: "Describe client's vision, lifestyle needs, and aesthetic preferences" },
      { task: "Existing conditions documentation", hours: 6, prompt: "Document current space dimensions, architectural features, and pain points" },
      { task: "Mood board & concept direction", hours: 8, prompt: "Create visual direction boards reflecting client's style and project goals" },
      { task: "Preliminary space planning", hours: 10, prompt: "Develop 2-3 layout options addressing flow, function, and spatial hierarchy" },
      { task: "Budget framework & material palette", hours: 4, prompt: "Outline anticipated budget allocation with preliminary material selections" },
    ],
  },
  {
    name: "Schematics", icon: "△",
    steps: [
      { task: "Refined floor plans & furniture layouts", hours: 8, prompt: "Finalize space plan with exact furniture placement and clearances" },
      { task: "Elevation drawings & millwork details", hours: 12, prompt: "Produce elevation views of key walls and custom millwork specifications" },
      { task: "Lighting plan & fixture selections", hours: 6, prompt: "Map ambient, task, and accent lighting layers with fixture recommendations" },
      { task: "Material & finish specifications", hours: 8, prompt: "Select and specify all surfaces, fabrics, wall treatments, and hardware" },
      { task: "Presentation & revision round", hours: 4, prompt: "Present schematic package, gather feedback, document revisions" },
    ],
  },
  {
    name: "Design Development", icon: "□",
    steps: [
      { task: "Detailed construction drawings", hours: 14, prompt: "Produce dimensioned drawings for contractor bidding and permitting" },
      { task: "Custom furniture specifications", hours: 10, prompt: "Detail custom pieces with dimensions, materials, and finish specs" },
      { task: "Procurement schedule & vendor coordination", hours: 8, prompt: "Create itemized procurement list with lead times and order sequencing" },
      { task: "Finish schedule & sample approvals", hours: 6, prompt: "Compile all finish selections with physical samples for sign-off" },
      { task: "Final package & budget reconciliation", hours: 6, prompt: "Deliver complete design package and reconcile budget against selections" },
    ],
  },
  {
    name: "Construction", icon: "▽",
    steps: [
      { task: "Pre-construction meeting", hours: 4, prompt: "Align contractor, trades, and design team on scope and schedule" },
      { task: "Weekly site visits & monitoring", hours: 16, prompt: "Conduct regular inspections to verify quality and design compliance" },
      { task: "Material delivery & quality checks", hours: 8, prompt: "Manage delivery logistics and inspect materials upon receipt" },
      { task: "Design clarifications & field decisions", hours: 6, prompt: "Resolve on-site questions and make real-time aesthetic decisions" },
      { task: "Installation oversight & styling", hours: 12, prompt: "Direct furniture placement, art hanging, and accessory styling" },
    ],
  },
  {
    name: "Construction Admin", icon: "○",
    steps: [
      { task: "Final walkthrough & punch list", hours: 4, prompt: "Comprehensive review documenting items requiring correction" },
      { task: "Punch list resolution tracking", hours: 8, prompt: "Monitor contractor progress on punch list and verify completion" },
      { task: "Final photography coordination", hours: 4, prompt: "Schedule and art-direct professional photography of completed spaces" },
      { task: "Client handover & maintenance guide", hours: 3, prompt: "Deliver care instructions, vendor contacts, and warranty info" },
      { task: "Post-project follow-up", hours: 2, prompt: "30-day check-in, address issues, gather testimonial" },
    ],
  },
]

const SCOPES = [
  { label: "Whole House", mult: 1.0 }, { label: "Kitchen", mult: 0.45 },
  { label: "Master Bedroom", mult: 0.3 }, { label: "Master Bathroom", mult: 0.3 },
  { label: "Living Room", mult: 0.3 }, { label: "Dining Room", mult: 0.25 },
  { label: "Home Office", mult: 0.25 }, { label: "Outdoor Living", mult: 0.35 },
  { label: "Basement", mult: 0.4 }, { label: "Guest Suite", mult: 0.3 },
  { label: "Multi-Room", mult: 0.6 },
]

const lbl: React.CSSProperties = { display: "block", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", marginBottom: 5 }
const inp: React.CSSProperties = { width: "100%", padding: "9px 12px", fontSize: 13, border: "1px solid #E0DED8", background: "#fff", fontFamily: "inherit", outline: "none" }

const phaseColors = ["#2D5A3D", "#8B6914", "#6B3A5B", "#1A4A6B", "#444"]

export default function ProposalSplitPane() {
  const [clientName, setClientName] = useState("")
  const [scope, setScope] = useState("Whole House")
  const [startDate, setStartDate] = useState("")
  const [targetDate, setTargetDate] = useState("")
  const [hourlyRate, setHourlyRate] = useState(175)
  const [upfrontFee, setUpfrontFee] = useState(0)
  const [phases, setPhases] = useState<Phase[]>(PHASES_DATA)
  const [expandedPhase, setExpandedPhase] = useState(0)

  const mult = SCOPES.find((s) => s.label === scope)?.mult || 1

  useEffect(() => {
    setPhases(PHASES_DATA.map((p) => ({
      ...p, steps: p.steps.map((s) => ({ ...s, hours: Math.max(1, Math.round(s.hours * mult)) })),
    })))
  }, [mult])

  const totalHours = phases.reduce((s, p) => s + p.steps.reduce((a, st) => a + st.hours, 0), 0)
  const totalCost = totalHours * hourlyRate + upfrontFee

  const updateHours = (pi: number, si: number, val: string) => {
    setPhases((prev) => {
      const u = [...prev]
      u[pi] = { ...u[pi], steps: u[pi].steps.map((s, i) => (i === si ? { ...s, hours: Number(val) || 0 } : s)) }
      return u
    })
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "var(--font-sans, 'Cabinet Grotesk', system-ui, sans-serif)", background: "#F5F4F0" }}>

      {/* LEFT: Editor Panel */}
      <div style={{ width: "50%", overflowY: "auto", borderRight: "1px solid #E0DED8", background: "#fff" }}>
        <div style={{ padding: "16px 28px", borderBottom: "1px solid #EEEDEA", background: "#111", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <Link href="/admin" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.5, color: "#fff", textDecoration: "none" }}>← Admin</Link>
            <span style={{ margin: "0 10px", opacity: 0.15 }}>|</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Split Pane Builder</span>
          </div>
        </div>

        {/* Financials */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "#E8E7E3" }}>
          <div style={{ padding: "14px 20px", background: "#1a1a1a", color: "#fff" }}>
            <label style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.4, display: "block", marginBottom: 4 }}>Hourly Rate</label>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ opacity: 0.5 }}>$</span>
              <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))}
                style={{ background: "transparent", border: "none", color: "#fff", fontSize: 18, fontWeight: 700, width: 80, fontFamily: "inherit", outline: "none" }} />
            </div>
          </div>
          <div style={{ padding: "14px 20px", background: "#222", color: "#fff" }}>
            <label style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.4, display: "block", marginBottom: 4 }}>Upfront Fee</label>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ opacity: 0.5 }}>$</span>
              <input type="number" value={upfrontFee} onChange={(e) => setUpfrontFee(Number(e.target.value))}
                style={{ background: "transparent", border: "none", color: "#fff", fontSize: 18, fontWeight: 700, width: 100, fontFamily: "inherit", outline: "none" }} />
            </div>
          </div>
        </div>

        {/* Client Info */}
        <div style={{ padding: "20px 28px", borderBottom: "1px solid #EEEDEA" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div><label style={lbl}>Client Name</label><input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="The Henderson Residence" style={inp} /></div>
            <div><label style={lbl}>Scope</label><select value={scope} onChange={(e) => setScope(e.target.value)} style={inp}>{SCOPES.map((s) => <option key={s.label}>{s.label}</option>)}</select></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div><label style={lbl}>Start Date</label><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={inp} /></div>
            <div><label style={lbl}>Target Completion</label><input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} style={inp} /></div>
          </div>
        </div>

        {/* Phase Accordions */}
        <div style={{ padding: "8px 0" }}>
          {phases.map((phase, pi) => {
            const phaseHours = phase.steps.reduce((s, st) => s + st.hours, 0)
            const isOpen = expandedPhase === pi
            return (
              <div key={pi}>
                <button onClick={() => setExpandedPhase(isOpen ? -1 : pi)} style={{
                  width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "14px 28px", background: isOpen ? "#FAFAF8" : "#fff", border: "none",
                  borderBottom: "1px solid #F0EFEB", cursor: "pointer", fontFamily: "inherit",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: phaseColors[pi], fontSize: 14 }}>{phase.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{phase.name}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 12, color: "#999" }}>{phaseHours} hrs</span>
                    <span style={{ fontSize: 12, color: "#999" }}>${(phaseHours * hourlyRate).toLocaleString()}</span>
                    <span style={{ fontSize: 10, color: "#CCC", transform: isOpen ? "rotate(180deg)" : "none", transition: "0.2s", display: "inline-block" }}>▼</span>
                  </div>
                </button>
                {isOpen && (
                  <div style={{ background: "#FAFAF8", padding: "12px 28px 20px" }}>
                    {phase.steps.map((step, si) => (
                      <div key={si} style={{ padding: "12px 0", borderBottom: si < phase.steps.length - 1 ? "1px solid #EEEDEA" : "none" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <span style={{ fontSize: 13, fontWeight: 500, color: "#333" }}>{step.task}</span>
                          <input type="number" value={step.hours} onChange={(e) => updateHours(pi, si, e.target.value)}
                            style={{ width: 52, padding: "4px 8px", fontSize: 13, fontWeight: 600, textAlign: "center", border: "1px solid #E0E0E0", background: "#fff", fontFamily: "inherit" }} />
                        </div>
                        <div style={{ fontSize: 11, color: "#999", fontStyle: "italic", paddingLeft: 12, borderLeft: `2px solid ${phaseColors[pi]}33`, lineHeight: 1.5 }}>
                          {step.prompt}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* RIGHT: Live Preview */}
      <div style={{ width: "50%", overflowY: "auto", background: "#F5F4F0", padding: 32 }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "#AAA", marginBottom: 16 }}>Design Proposal</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: "#111", lineHeight: 1.1, marginBottom: 8, letterSpacing: "-0.03em" }}>{clientName || "Client Name"}</div>
            <div style={{ fontSize: 14, color: "#888", marginBottom: 20 }}>{scope} {startDate && targetDate ? `· ${startDate} → ${targetDate}` : ""}</div>
            <div style={{ height: 1, background: "#111", marginBottom: 20 }} />
            <div style={{ display: "flex", gap: 32, fontSize: 13 }}>
              <div><div style={{ color: "#AAA", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Rate</div><div style={{ fontWeight: 600 }}>${hourlyRate}/hr</div></div>
              {upfrontFee > 0 && <div><div style={{ color: "#AAA", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Upfront</div><div style={{ fontWeight: 600 }}>${upfrontFee.toLocaleString()}</div></div>}
              <div><div style={{ color: "#AAA", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Hours</div><div style={{ fontWeight: 600 }}>{totalHours}</div></div>
              <div><div style={{ color: "#AAA", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Investment</div><div style={{ fontWeight: 700, fontSize: 16 }}>${totalCost.toLocaleString()}</div></div>
            </div>
          </div>

          {phases.map((phase, pi) => {
            const phaseHours = phase.steps.reduce((s, st) => s + st.hours, 0)
            const phasePct = totalHours > 0 ? ((phaseHours / totalHours) * 100).toFixed(0) : "0"
            return (
              <div key={pi} style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#111", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: phaseColors[pi] }}>{phase.icon}</span>{phase.name}
                  </div>
                  <div style={{ fontSize: 12, color: "#888" }}>{phaseHours} hrs · ${(phaseHours * hourlyRate).toLocaleString()} · {phasePct}%</div>
                </div>
                <div style={{ height: 3, background: "#E8E7E3", marginBottom: 10 }}>
                  <div style={{ height: "100%", width: `${phasePct}%`, background: phaseColors[pi], transition: "width 0.3s" }} />
                </div>
                {phase.steps.map((step, si) => (
                  <div key={si} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 12, color: "#666", borderBottom: si < phase.steps.length - 1 ? "1px solid #F0EFEB" : "none" }}>
                    <span>{step.task}</span>
                    <span style={{ color: "#BBB", flexShrink: 0, marginLeft: 12 }}>{step.hours}h</span>
                  </div>
                ))}
              </div>
            )
          })}

          <div style={{ padding: 20, background: "#111", color: "#fff", marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.4, marginBottom: 4 }}>Total Investment</div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>${totalCost.toLocaleString()}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, opacity: 0.6 }}>{totalHours} hours × ${hourlyRate}/hr</div>
              {upfrontFee > 0 && <div style={{ fontSize: 12, opacity: 0.4 }}>+ ${upfrontFee.toLocaleString()} upfront</div>}
            </div>
          </div>
          <div style={{ marginTop: 20, fontSize: 10, color: "#BBB", textAlign: "center", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Sarah Kingdom Designs · Boulder, Colorado
          </div>
        </div>
      </div>
    </div>
  )
}
