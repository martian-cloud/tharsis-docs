import { useEffect, useRef, useState } from "react";
import styles from "./attestation-flow.module.css";

// AttestationGate illustrates the concept: the policy is a gate in front of a
// run. A run deploys ONE module, which either passes (signed by a trusted key)
// or fails (unsigned or tampered). The animation shows one module at a
// time and alternates the two cases each loop, matching a real run.
//
// The module moves up to the gate, PAUSES while the gate checks the signature
// (a "signature?" cue), then:
//   signed   -> gate unlocks, "signature OK", module continues to Passed
//   tampered -> gate stays locked, "signature invalid", module Fails here
//
// Movement is SMIL (constant speed); a JS toggle flips the case each cycle and
// remounts the SVG so SMIL restarts cleanly.

const VIEW_W = 1200;
const VIEW_H = 220;
const BOX_W = 170;
const BOX_H = 64;

const GATE_W = 170;
const GATE_H = 150;
const GATE_X = 520;
const GATE_Y = (VIEW_H - GATE_H) / 2;

const BOX_H_HALF = BOX_H / 2;
const LANE_Y = (VIEW_H - BOX_H) / 2;
const MID_Y = VIEW_H / 2;
const START_X = 30;
const OUTCOME_X = 1000;

const GATE_ENTRY_X = GATE_X - BOX_W - 10; // where the module stops to be checked
const SPEED = 150; // px/sec, constant

// Timeline (s):
//  t0  module starts moving toward the gate
//  t1  module arrives at the gate entry -> pause + "checking"
//  t2  decision shown (OK / invalid)
//  t3  signed only: module resumes and travels to Passed; outcome box appears
const T_START = 0.3;

function reducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const cases = {
  signed: { label: ["Signed or trusted", "module"], accent: "#10b981", through: true, outcome: "Passed", verdict: "signature valid" },
  tampered: { label: ["Tampered or unsigned", "module"], accent: "#ef4444", through: false, outcome: "Failed", verdict: "signature invalid" },
};

export function AttestationGate() {
  const [reduced, setReduced] = useState(false);
  const [which, setWhich] = useState("signed");
  const cycleRef = useRef(null);

  useEffect(() => setReduced(reducedMotion()), []);

  const c = cases[which];

  // phase 1: start -> gate entry
  const d1 = GATE_ENTRY_X - START_X;
  const move1 = d1 / SPEED;
  const tArrive = T_START + move1;
  const CHECK = 1.1; // pause at the gate while it checks
  const tDecision = tArrive + CHECK;
  // phase 2 (signed only): gate entry -> outcome
  const d2 = OUTCOME_X - BOX_W - 24 - GATE_ENTRY_X;
  const move2 = d2 / SPEED;
  const tThroughDone = tDecision + move2;

  const holdEnd = (c.through ? tThroughDone : tDecision) + 2.4;
  const CYCLE = holdEnd * 1000;

  useEffect(() => {
    if (reduced) return;
    cycleRef.current = setTimeout(() => setWhich((w) => (w === "signed" ? "tampered" : "signed")), CYCLE);
    return () => clearTimeout(cycleRef.current);
  }, [which, reduced, CYCLE]);

  const cardBg = "var(--ifm-card-background-color, var(--ifm-background-color))";
  const dim = "var(--ifm-color-emphasis-400)";
  const fontColor = "var(--ifm-font-color-base)";
  const sub = "var(--ifm-color-emphasis-700)";

  return (
    <div
      role="img"
      aria-label="A module attestation policy acts as a gate that holds the policy's public key. A run deploys one module; it moves to the gate, its signature is checked against that key, then a signed module from a trusted key passes through to Passed while a tampered or unsigned module Fails at the gate."
      className={styles.flow}
    >
      <svg key={which} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}>
        {/* lane guide */}
        <line x1={START_X + BOX_W} y1={MID_Y} x2={OUTCOME_X} y2={MID_Y} stroke={dim} strokeWidth="1" strokeDasharray="4 5" opacity="0.5" />

        {/* the gate */}
        <rect x={GATE_X} y={GATE_Y} width={GATE_W} height={GATE_H} rx={14} fill={cardBg} stroke={dim} strokeWidth={2} />
        {/* gate fill: an AMBER "checking" tint while it verifies (not yet
            decided, so no green/red here), then it un-fills at the decision. */}
        <rect x={GATE_X} y={GATE_Y} width={GATE_W} height={GATE_H} rx={14} fill="#f59e0b" opacity={reduced ? 0 : 0}>
          {!reduced && (
            <>
              <animate attributeName="opacity" from="0" to="0.16" dur="0.3s" begin={`${tArrive.toFixed(2)}s`} fill="freeze" />
              <animate attributeName="opacity" from="0.16" to="0" dur="0.3s" begin={`${tDecision.toFixed(2)}s`} fill="freeze" />
            </>
          )}
        </rect>
        <text x={GATE_X + GATE_W / 2} y={GATE_Y + 28} textAnchor="middle" fontSize="13" fontWeight="700" fill={sub} style={{ letterSpacing: "1px" }}>
          POLICY GATE
        </text>
        {/* the policy's public key the gate checks against; static, always
            present, since the policy holds it (guide: a PEM-encoded public
            key). This mirrors the overview, where the key is one of the two
            inputs that meet at the check. */}
        <text x={GATE_X + GATE_W / 2} y={GATE_Y + 48} textAnchor="middle" fontSize="12" fontWeight="600" fill={sub}>
          🔑 public key
        </text>
        {/* lock is always present: closed from the start, through approach and
            checking. At the verdict it opens for a signed module and stays
            closed for a tampered one. */}
        <text x={GATE_X + GATE_W / 2} y={GATE_Y + GATE_H / 2 + 12} textAnchor="middle" fontSize="30" opacity={reduced && c.through ? 0 : 1}>
          {!reduced && c.through && <set attributeName="opacity" to="0" begin={`${tDecision.toFixed(2)}s`} />}
          🔒
        </text>
        {c.through && (
          <text x={GATE_X + GATE_W / 2} y={GATE_Y + GATE_H / 2 + 12} textAnchor="middle" fontSize="30" opacity={reduced ? 1 : 0}>
            {!reduced && <set attributeName="opacity" to="1" begin={`${tDecision.toFixed(2)}s`} />}
            🔓
          </text>
        )}
        {/* verdict text under the gate, appears at the decision */}
        <text x={GATE_X + GATE_W / 2} y={GATE_Y + GATE_H - 14} textAnchor="middle" fontSize="13" fontWeight="700" fill={c.accent} opacity={reduced ? 1 : 0}>
          {!reduced && <set attributeName="opacity" to="1" begin={`${tDecision.toFixed(2)}s`} />}
          {c.verdict}
        </text>
        {/* "checking..." while paused, hidden at the decision */}
        {!reduced && (
          <text x={GATE_X + GATE_W / 2} y={GATE_Y + GATE_H - 14} textAnchor="middle" fontSize="12" fontWeight="600" fill="#f59e0b" opacity="0">
            <set attributeName="opacity" to="1" begin={`${tArrive.toFixed(2)}s`} />
            <set attributeName="opacity" to="0" begin={`${tDecision.toFixed(2)}s`} />
            checking...
          </text>
        )}

        {/* outcome box: fills when it appears (end of the flow) */}
        <g opacity={reduced ? 1 : 0}>
          {!reduced && <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin={`${(c.through ? tThroughDone : tDecision).toFixed(2)}s`} fill="freeze" />}
          <rect x={OUTCOME_X} y={LANE_Y} width={BOX_W} height={BOX_H} rx={10} fill={cardBg} stroke={c.accent} strokeWidth={2} />
          <rect x={OUTCOME_X} y={LANE_Y} width={BOX_W} height={BOX_H} rx={10} fill={c.accent} opacity="0.18" />
          <text x={OUTCOME_X + BOX_W / 2} y={LANE_Y + BOX_H / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill={fontColor}>
            {c.outcome}
          </text>
        </g>

        {/* the single module */}
        <g>
          {!reduced && (
            <>
              {/* phase 1: move to the gate */}
              <animateMotion dur={`${move1.toFixed(2)}s`} begin={`${T_START}s`} fill="freeze" calcMode="linear" path={`M 0 0 L ${d1} 0`} />
              {/* phase 2: signed continues to the outcome after the decision */}
              {c.through && (
                <animateMotion dur={`${move2.toFixed(2)}s`} begin={`${tDecision.toFixed(2)}s`} fill="freeze" calcMode="linear" path={`M ${d1} 0 L ${d1 + d2} 0`} />
              )}
            </>
          )}
          <g transform={reduced ? `translate(${c.through ? OUTCOME_X - BOX_W - 24 : GATE_ENTRY_X} ${LANE_Y})` : `translate(${START_X} ${LANE_Y})`}>
            {/* base box: neutral border during approach + check, then switches
                to the case colour at the decision. */}
            <rect x="0" y="0" width={BOX_W} height={BOX_H} rx={10} fill={cardBg} stroke={reduced ? c.accent : dim} strokeWidth={2}>
              {!reduced && <set attributeName="stroke" to={c.accent} begin={`${tDecision.toFixed(2)}s`} />}
            </rect>
            {/* module fill = the verdict: empty through the approach and the
                check, then fills with the case colour only at the decision
                (green as a signed module crosses, red as a tampered one is
                stopped). */}
            <rect x="0" y="0" width={BOX_W} height={BOX_H} rx={10} fill={c.accent} opacity={reduced ? 0.18 : 0}>
              {!reduced && <animate attributeName="opacity" from="0" to="0.18" dur="0.3s" begin={`${tDecision.toFixed(2)}s`} fill="freeze" />}
            </rect>
            <text x={BOX_W / 2} y={BOX_H_HALF - (c.label.length - 1) * 9 + 5} textAnchor="middle" fontSize="15" fontWeight="600" fill={fontColor}>
              {c.label.map((l, i) => (
                <tspan key={i} x={BOX_W / 2} dy={i === 0 ? 0 : 18}>
                  {l}
                </tspan>
              ))}
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default AttestationGate;
