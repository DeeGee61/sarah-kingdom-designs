"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Step {
  task: string
  hours: number
  prompt: string
}

interface Phase {
  name: string
  steps: Step[]
}

const DEFAULT_PHASES: Phase[] = [
  {
    name: "Preliminary Design",
    steps: [
      { task: "Initial client consultation & site visit", hours: 4, prompt: "Describe client's vision, lifestyle needs, and aesthetic preferences" },
      { task: "Existing conditions documentation & measurements", hours: 6, prompt: "Document current space dimensions, architectural features, and pain points" },
      { task: "Mood board & concept direction development", hours: 8, prompt: "Create visual direction boards reflecting client's style and project goals" },
      { task: "Preliminary space planning & layout options", hours: 10, prompt: "Develop 2-3 layout options addressing flow, function, and spatial hierarchy" },
      { task: "Initial budget framework & material palette", hours: 4, prompt: "Outline anticipated budget allocation across categories with preliminary material selections" },
    ],
  },
  {
    name: "Schematics",
    steps: [
      { task: "Refined floor plans & furniture layouts", hours: 8, prompt: "Finalize space plan with exact furniture placement, clearances, and traffic flow" },
      { task: "Elevation drawings & millwork details", hours: 12, prompt: "Produce elevation views of key walls, built-ins, and custom millwork specifications" },
      { task: "Lighting plan & fixture selections", hours: 6, prompt: "Map ambient, task, and accent lighting layers with specific fixture recommendations" },
      { task: "Material & finish specifications", hours: 8, prompt: "Select and specify all hard surfaces, fabrics, wall treatments, and hardware" },
      { task: "Client presentation & revision round", hours: 4, prompt: "Present schematic package, gather feedback, and document required revisions" },
    ],
  },
  {
    name: "Design Development",
    steps: [
      { task: "Detailed construction drawings", hours: 14, prompt: "Produce dimensioned drawings for contractor bidding and permitting" },
      { task: "Custom furniture & built-in specifications", hours: 10, prompt: "Detail custom pieces with dimensions, materials, joinery, and finish specifications" },
      { task: "Procurement schedule & vendor coordination", hours: 8, prompt: "Create itemized procurement list with lead times, vendors, and order sequencing" },
      { task: "Finish schedule & sample approvals", hours: 6, prompt: "Compile all finish selections with physical samples for client sign-off" },
      { task: "Final design package & budget reconciliation", hours: 6, prompt: "Deliver complete design package and reconcile budget against all selections" },
    ],
  },
  {
    name: "Construction",
    steps: [
      { task: "Pre-construction meeting & contractor coordination", hours: 4, prompt: "Align contractor, trades, and design team on scope, schedule, and design intent" },
      { task: "Weekly site visits & progress monitoring", hours: 16, prompt: "Conduct regular site inspections to verify installation quality and design compliance" },
      { task: "Material delivery coordination & quality checks", hours: 8, prompt: "Manage delivery logistics and inspect all materials/furniture upon receipt" },
      { task: "Design clarifications & field decisions", hours: 6, prompt: "Resolve on-site design questions and make real-time aesthetic decisions" },
      { task: "Installation oversight & styling", hours: 12, prompt: "Direct furniture placement, art hanging, accessory styling, and final vignettes" },
    ],
  },
  {
    name: "Construction Administration",
    steps: [
      { task: "Final walkthrough & punch list creation", hours: 4, prompt: "Comprehensive space review documenting all items requiring correction or completion" },
      { task: "Punch list oversight & resolution tracking", hours: 8, prompt: "Monitor contractor progress on punch list items and verify completion quality" },
      { task: "Final photography coordination", hours: 4, prompt: "Schedule and art-direct professional photography of completed spaces" },
      { task: "Client handover & maintenance guide", hours: 3, prompt: "Deliver care instructions, vendor contacts, paint codes, and warranty information" },
      { task: "Post-project follow-up & satisfaction review", hours: 2, prompt: "30-day check-in to address any issues and gather testimonial" },
    ],
  },
]

const SCOPE_OPTIONS = [
  "Whole House", "Kitchen", "Master Bedroom", "Master Bathroom", "Living Room",
  "Dining Room", "Home Office", "Outdoor Living", "Basement", "Guest Suite", "Multi-Room",
]

const SCOPE_MULTIPLIERS: Record<string, number> = {
  "Whole House": 1.0, Kitchen: 0.45, "Master Bedroom": 0.3, "Master Bathroom": 0.3,
  "Living Room": 0.3, "Dining Room": 0.25, "Home Office": 0.25, "Outdoor Living": 0.35,
  Basement: 0.4, "Guest Suite": 0.3, "Multi-Room": 0.6,
}

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em",
  textTransform: "uppercase", color: "#999", marginBottom: 6,
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px", fontSize: 14, border: "1px solid #E0E0E0",
  background: "#FAFAF8", outline: "none", fontFamily: "inherit",
}

export default function ProposalWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [clientName, setClientName] = useState("")
  const [scope, setScope] = useState("Whole House")
  const [startDate, setStartDate] = useState("")
  const [targetDate, setTargetDate] = useState("")
  const [hourlyRate, setHourlyRate] = useState(175)
  const [upfrontFee, setUpfrontFee] = useState(0)
  const [phases, setPhases] = useState<Phase[]>(DEFAULT_PHASES)

  useEffect(() => {
    const mult = SCOPE_MULTIPLIERS[scope] || 1
    setPhases(
      DEFAULT_PHASES.map((phase) => ({
        ...phase,
        steps: phase.steps.map((s) => ({ ...s, hours: Math.max(1, Math.round(s.hours * mult)) })),
      }))
    )
  }, [scope])

  const totalHours = phases.reduce((sum, p) => sum + p.steps.reduce((s, step) => s + step.hours, 0), 0)
  const totalCost = totalHours * hourlyRate + upfrontFee

  const updateStepHours = (phaseIdx: number, stepIdx: number, newHours: string) => {
    setPhases((prev) => {
      const updated = [...prev]
      updated[phaseIdx] = {
        ...updated[phaseIdx],
        steps: updated[phaseIdx].steps.map((s, i) =>
          i === stepIdx ? { ...s, hours: Number(newHours) || 0 } : s
        ),
      }
      return updated
    })
  }

  const wizardSteps = ["Project Info", ...phases.map((p) => p.name), "Review"]
  const canProceed = () => {
    if (currentStep === 0) return clientName.trim() && startDate && targetDate
    return true
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: "var(--font-sans, 'Cabinet Grotesk', system-ui, sans-serif)" }}>
      {/* Top Bar */}
      <div style={{ background: "#111", color: "#fff", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/admin" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.5, color: "#fff", textDecoration: "none" }}>
            ← Admin
          </Link>
          <span style={{ opacity: 0.15 }}>|</span>
          <span style={{ fontSize: 13, fontWeight: 500 }}>Proposal Wizard</span>
        </div>
        {clientName && (
          <div style={{ fontSize: 13, opacity: 0.7 }}>{clientName} — {scope}</div>
        )}
      </div>

      {/* Step Indicator */}
      <div style={{ display: "flex", gap: 0, padding: "0 32px", background: "#fff", borderBottom: "1px solid #E8E8E4", overflowX: "auto" }}>
        {wizardSteps.map((label, i) => (
          <button
            key={i}
            onClick={() => i <= (clientName ? wizardSteps.length - 1 : 0) && setCurrentStep(i)}
            style={{
              padding: "14px 20px", fontSize: 11, fontWeight: currentStep === i ? 600 : 400,
              letterSpacing: "0.06em", textTransform: "uppercase",
              color: currentStep === i ? "#111" : i < currentStep ? "#888" : "#CCC",
              background: "none", border: "none",
              borderBottom: currentStep === i ? "2px solid #111" : "2px solid transparent",
              cursor: i <= (clientName ? wizardSteps.length - 1 : 0) ? "pointer" : "default",
              whiteSpace: "nowrap", transition: "all 0.2s", fontFamily: "inherit",
            }}
          >
            <span style={{ opacity: 0.4, marginRight: 6 }}>{String(i + 1).padStart(2, "0")}</span>
            {label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div style={{ maxWidth: 840, margin: "0 auto", padding: "40px 32px" }}>

        {/* Step 0: Project Info */}
        {currentStep === 0 && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "#111", letterSpacing: "-0.02em" }}>Project Information</h2>
            <p style={{ fontSize: 14, color: "#888", marginBottom: 36, lineHeight: 1.5 }}>
              Set the financial parameters and project scope. Hours auto-adjust based on scope selection.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32, padding: 24, background: "#fff", border: "1px solid #E8E8E4" }}>
              <div>
                <label style={labelStyle}>Hourly Rate ($)</label>
                <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Upfront Fee ($)</label>
                <input type="number" value={upfrontFee} onChange={(e) => setUpfrontFee(Number(e.target.value))} style={inputStyle} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <div>
                <label style={labelStyle}>Client Name</label>
                <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="e.g. The Henderson Residence" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Project Scope</label>
                <select value={scope} onChange={(e) => setScope(e.target.value)} style={inputStyle}>
                  {SCOPE_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <label style={labelStyle}>Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Target Completion</label>
                <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} style={inputStyle} />
              </div>
            </div>

            <div style={{ marginTop: 32, padding: 20, background: "#111", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14 }}>
              <div><span style={{ opacity: 0.5 }}>Estimated Total:</span> <strong>{totalHours} hrs</strong></div>
              <div><span style={{ opacity: 0.5 }}>Project Value:</span> <strong>${totalCost.toLocaleString()}</strong></div>
            </div>
          </div>
        )}

        {/* Steps 1-5: Phase Detail */}
        {currentStep >= 1 && currentStep <= 5 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: "#111", letterSpacing: "-0.02em" }}>{phases[currentStep - 1].name}</h2>
              <span style={{ fontSize: 13, color: "#888" }}>Phase {currentStep} of 5</span>
            </div>
            <p style={{ fontSize: 14, color: "#888", marginBottom: 32, lineHeight: 1.5 }}>
              Review tasks, adjust hours, and use prompts to customize scope for this client.
            </p>

            {phases[currentStep - 1].steps.map((step, si) => (
              <div key={si} style={{ background: "#fff", border: "1px solid #E8E8E4", padding: 24, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#111", marginBottom: 4 }}>{step.task}</div>
                    <div style={{ fontSize: 12, color: "#999", padding: "6px 10px", background: "#F8F8F6", borderLeft: "2px solid #DDD", marginTop: 8, lineHeight: 1.5, fontStyle: "italic" }}>
                      <span style={{ fontWeight: 600, fontStyle: "normal", color: "#777" }}>Prompt: </span>
                      {step.prompt}
                    </div>
                  </div>
                  <div style={{ marginLeft: 24, textAlign: "right", flexShrink: 0 }}>
                    <label style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#AAA", display: "block", marginBottom: 4 }}>Hours</label>
                    <input
                      type="number" value={step.hours}
                      onChange={(e) => updateStepHours(currentStep - 1, si, e.target.value)}
                      style={{ width: 64, padding: "8px 10px", fontSize: 16, fontWeight: 600, textAlign: "center", border: "1px solid #E0E0E0", background: "#FAFAF8", fontFamily: "inherit" }}
                    />
                    <div style={{ fontSize: 11, color: "#AAA", marginTop: 4 }}>${(step.hours * hourlyRate).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 16, padding: "14px 20px", background: "#111", color: "#fff", display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span>Phase Subtotal: <strong>{phases[currentStep - 1].steps.reduce((s, st) => s + st.hours, 0)} hrs</strong></span>
              <span><strong>${(phases[currentStep - 1].steps.reduce((s, st) => s + st.hours, 0) * hourlyRate).toLocaleString()}</strong></span>
            </div>
          </div>
        )}

        {/* Step 6: Review */}
        {currentStep === 6 && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "#111" }}>Proposal Summary</h2>
            <p style={{ fontSize: 14, color: "#888", marginBottom: 32 }}>Review the complete proposal before generating.</p>

            <div style={{ padding: 28, background: "#111", color: "#fff", marginBottom: 24 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.4, marginBottom: 12 }}>Design Proposal</div>
              <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{clientName || "Client Name"}</div>
              <div style={{ fontSize: 14, opacity: 0.6 }}>{scope} — {startDate} to {targetDate}</div>
              <div style={{ marginTop: 20, display: "flex", gap: 32, fontSize: 14 }}>
                <div>
                  <div style={{ opacity: 0.4, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>Rate</div>
                  <div style={{ fontWeight: 600 }}>${hourlyRate}/hr</div>
                </div>
                <div>
                  <div style={{ opacity: 0.4, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>Upfront</div>
                  <div style={{ fontWeight: 600 }}>${upfrontFee.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ opacity: 0.4, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>Total Hours</div>
                  <div style={{ fontWeight: 600 }}>{totalHours}</div>
                </div>
                <div>
                  <div style={{ opacity: 0.4, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>Total Investment</div>
                  <div style={{ fontWeight: 600, fontSize: 18 }}>${totalCost.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {phases.map((phase, pi) => {
              const phaseHours = phase.steps.reduce((s, st) => s + st.hours, 0)
              return (
                <div key={pi} style={{ marginBottom: 16, background: "#fff", border: "1px solid #E8E8E4" }}>
                  <div style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #F0F0EC", alignItems: "center" }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{phase.name}</div>
                    <div style={{ fontSize: 13, color: "#888" }}>{phaseHours} hrs — ${(phaseHours * hourlyRate).toLocaleString()}</div>
                  </div>
                  {phase.steps.map((step, si) => (
                    <div key={si} style={{ padding: "10px 20px", display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: si < phase.steps.length - 1 ? "1px solid #F8F8F6" : "none", color: "#555" }}>
                      <span>{step.task}</span>
                      <span style={{ color: "#AAA", flexShrink: 0, marginLeft: 16 }}>{step.hours} hrs</span>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, paddingTop: 20, borderTop: "1px solid #E8E8E4" }}>
          <button
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={currentStep === 0}
            style={{ padding: "10px 24px", fontSize: 13, background: "none", border: "1px solid #DDD", cursor: currentStep === 0 ? "default" : "pointer", opacity: currentStep === 0 ? 0.3 : 1, fontFamily: "inherit" }}
          >
            ← Back
          </button>
          <button
            onClick={() => setCurrentStep((s) => Math.min(wizardSteps.length - 1, s + 1))}
            disabled={!canProceed() || currentStep === wizardSteps.length - 1}
            style={{ padding: "10px 24px", fontSize: 13, fontWeight: 600, background: canProceed() ? "#111" : "#DDD", color: "#fff", border: "none", cursor: canProceed() ? "pointer" : "default", fontFamily: "inherit" }}
          >
            {currentStep === wizardSteps.length - 2 ? "Review Proposal →" : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  )
}
