import { useEffect, useState } from "react";
import styles from "./attestation-flow.module.css";

// AttestationFlow: two independent setup tracks that converge at the check.
//
//   Track 1 (the module): Sign the module -> Create the attestation
//   Track 2 (the policy):  Create the policy
//   Converge:              The policy checks the module -> {Passed, Failed}
//
// The two tracks are independent: the attestation does not feed policy
// creation (the policy takes a public key). They meet only at the check,
// where the module's attestation is verified against the policy's public key
// when a run reaches the policy's stage.
//
// The animation is SMIL inside a single self-contained SVG. One invisible
// "clock" repeats every CYCLE seconds; every element begins relative to that
// clock, so the whole sequence plays once per cycle and loops as a unit.
// Each connector draws itself (stroke-dashoffset full -> 0) while its arrowhead
// rides the growing tip via animateMotion on the same segment and timing.
//
// prefers-reduced-motion: a static, fully drawn diagram with no SMIL.

const VIEW_W = 1810;
const VIEW_H = 476;
const BOX_W = 210;
const BOX_H = 76;

// Track 1 (top): Sign -> Create the attestation. Track 2 (bottom): Create the
// policy, placed below Create the attestation. Both converge at the check: the
// module track drops from the bottom of Create the attestation, the policy
// track comes up from its right, so the lines meet without crossing.
const sign = { key: "sign", title: ["Sign the module"], x: 230, y: 30 };
const createAtt = { key: "createAtt", title: ["Create the", "attestation"], x: 680, y: 30 };
const createPolicy = { key: "createPolicy", title: ["Create the policy"], x: 680, y: 360 };
const check = { key: "check", title: ["The policy checks", "the module"], x: 1180, y: 195 };
const pass = { key: "pass", title: ["Passed"], x: 1560, y: 30, accent: "#10b981" };
const fail = { key: "fail", title: ["Failed"], x: 1560, y: 360, accent: "#ef4444" };

const ENTRY_X = 40; // where the captioned entry arrows start

const BOX_DUR = 0.5; // s, box fade/scale in
const DRAW_DUR = 1.1; // s, a connector draws
const STEP = 1.4; // s between consecutive events
const TAIL = 2.5; // s hold on the finished diagram
const SLOTS = 14; // 0..13
const CYCLE = SLOTS * STEP + TAIL;

const OFFSET = 0.15;
const begin = (slot) => `clock.begin+${(slot * STEP + OFFSET).toFixed(2)}s`;
const resetBegin = "clock.begin";

function reducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AttestationFlow() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(reducedMotion()), []);

  const primary = "var(--ifm-color-primary)";
  const cardBg = "var(--ifm-card-background-color, var(--ifm-background-color))";
  const headSize = 9;

  // One box: hidden until its slot, then fades + scales in. A tinted fill
  // overlay turns on when the box is the active step (slot) and off when the
  // flow moves on (unfillSlot); outcome boxes pass unfillSlot=null so they stay
  // filled at the end.
  const Box = ({ n, slot, accent, unfillSlot, fillAccent }) => {
    const fill = fillAccent || accent;
    return (
    <g opacity={reduced ? 1 : 0} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
      {!reduced && (
        <>
          <animate attributeName="opacity" from="0" to="1" dur={`${BOX_DUR}s`} begin={begin(slot)} fill="freeze" />
          <animateTransform attributeName="transform" type="scale" from="0.92" to="1" dur={`${BOX_DUR}s`} begin={begin(slot)} fill="freeze" additive="sum" />
          <set attributeName="opacity" to="0" begin={resetBegin} />
        </>
      )}
      <rect x={n.x} y={n.y} width={BOX_W} height={BOX_H} rx={10} fill={cardBg} stroke={accent} strokeWidth={2} />
      <rect x={n.x} y={n.y} width={BOX_W} height={BOX_H} rx={10} fill={fill} opacity={reduced ? 0.18 : 0}>
        {!reduced && (
          <>
            <animate attributeName="opacity" from="0" to="0.18" dur="0.35s" begin={begin(slot)} fill="freeze" />
            {unfillSlot != null && (
              <animate attributeName="opacity" from="0.18" to="0" dur="0.35s" begin={begin(unfillSlot)} fill="freeze" />
            )}
            <set attributeName="opacity" to="0" begin={resetBegin} />
          </>
        )}
      </rect>
      <text
        x={n.x + BOX_W / 2}
        y={n.y + BOX_H / 2 - (n.title.length - 1) * 11 + 7}
        textAnchor="middle"
        fontSize="21"
        fontWeight="600"
        fill="var(--ifm-font-color-base)"
      >
        {n.title.map((line, li) => (
          <tspan key={li} x={n.x + BOX_W / 2} dy={li === 0 ? 0 : 24}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
    );
  };

  // A connector: the line draws from (x1,y1) to (x2,y2); a separate arrowhead
  // rides the tip via animateMotion along the same segment, same timing.
  const Conn = ({ x1, y1, x2, y2, slot, color, caption, captionSide, capXOverride, capYOverride }) => {
    const len = Math.hypot(x2 - x1, y2 - y1);
    const ang = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
    const b = begin(slot);
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    let capX = midX;
    let capY = midY - 12;
    let anchor = "middle";
    if (captionSide === "right") {
      capX = midX + 16;
      capY = midY + 6;
      anchor = "start";
    } else if (captionSide === "left") {
      capX = midX - 16;
      capY = midY + 6;
      anchor = "end";
    } else if (captionSide === "above") {
      capY = midY - 16;
      anchor = "middle";
    } else if (captionSide === "below") {
      capY = midY + 26;
      anchor = "middle";
    }
    // Explicit overrides let two related captions share an x and sit level,
    // instead of each floating at its own slanted-line midpoint.
    if (capXOverride != null) {
      capX = capXOverride;
      anchor = "start";
    }
    if (capYOverride != null) capY = capYOverride;
    const Caption = () =>
      caption ? (
        <text x={capX} y={capY} textAnchor={anchor} fontSize="17" fontWeight="600" fill="var(--ifm-color-emphasis-700)" opacity={reduced ? 1 : 0}>
          {!reduced && (
            <>
              <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin={b} fill="freeze" />
              <set attributeName="opacity" to="0" begin={resetBegin} />
            </>
          )}
          {caption}
        </text>
      ) : null;
    if (reduced) {
      return (
        <g>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2.5} />
          <path d={`M ${-headSize} ${-headSize * 0.6} L 0 0 L ${-headSize} ${headSize * 0.6} Z`} fill={color} transform={`translate(${x2} ${y2}) rotate(${ang})`} />
          <Caption />
        </g>
      );
    }
    return (
      <g>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2.5} strokeDasharray={len} strokeDashoffset={len}>
          <animate attributeName="stroke-dashoffset" from={len} to="0" dur={`${DRAW_DUR}s`} begin={b} fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" keyTimes="0;1" values={`${len};0`} />
          <set attributeName="stroke-dashoffset" to={len} begin={resetBegin} />
        </line>
        <path d={`M ${-headSize} ${-headSize * 0.6} L 0 0 L ${-headSize} ${headSize * 0.6} Z`} fill={color} opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.01s" begin={b} fill="freeze" />
          <set attributeName="opacity" to="0" begin={resetBegin} />
          <animateMotion dur={`${DRAW_DUR}s`} begin={b} fill="freeze" rotate="auto" calcMode="spline" keySplines="0.4 0 0.2 1" keyTimes="0;1" path={`M ${x1} ${y1} L ${x2} ${y2}`} />
        </path>
        <Caption />
      </g>
    );
  };

  const cy = (n) => n.y + BOX_H / 2;

  return (
    <div
      role="img"
      aria-label="Module attestation flow in two tracks that meet at the check. The module track: sign the module with cosign, then create the attestation, which is bound to that module version. The policy track: create the policy with a public key, which applies to the group's runs. When a run reaches the policy's stage, the policy checks the module, then forks to Passed when the signature is valid or Failed when it is invalid."
      className={styles.flow}
    >
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}>
        {!reduced && (
          <rect x="0" y="0" width="1" height="1" fill="none" opacity="0">
            <animate id="clock" attributeName="opacity" from="0" to="0" dur={`${CYCLE}s`} begin="0s;clock.end" />
          </rect>
        )}

        {/* Rule for the whole sequence: each arrow draws fully first, then its
            destination box appears one slot later. Track 1 finishes entirely
            (including its convergence arrow) before Track 2 begins. */}

        {/* Track 1 (the module) */}
        <Conn x1={ENTRY_X} y1={cy(sign)} x2={sign.x} y2={cy(sign)} slot={0} color={primary} caption="with cosign" captionSide="above" />
        <Conn x1={sign.x + BOX_W} y1={cy(sign)} x2={createAtt.x} y2={cy(createAtt)} slot={2} color={primary} caption="a signed attestation" />
        <Conn x1={createAtt.x + BOX_W} y1={cy(createAtt)} x2={check.x} y2={cy(check) - 20} slot={4} color={primary} caption="the version's attestation" captionSide="above" />

        {/* Track 2 (the policy), after Track 1 */}
        <Conn x1={ENTRY_X} y1={cy(createPolicy)} x2={createPolicy.x} y2={cy(createPolicy)} slot={5} color={primary} caption="with a public key" captionSide="below" />
        <Conn x1={createPolicy.x + BOX_W} y1={cy(createPolicy)} x2={check.x} y2={cy(check) + 20} slot={7} color={primary} caption="applies to the group's runs" captionSide="below" />

        {/* fork out of the check */}
        <Conn x1={check.x + BOX_W} y1={cy(check)} x2={pass.x} y2={cy(pass)} slot={10} color="#10b981" caption="signature valid" captionSide="above" />
        <Conn x1={check.x + BOX_W} y1={cy(check)} x2={fail.x} y2={cy(fail)} slot={12} color="#ef4444" caption="signature invalid" captionSide="below" />

        {/* boxes appear one slot after their incoming arrow finishes drawing */}
        <Box n={sign} slot={1} accent={primary} unfillSlot={2} />
        <Box n={createAtt} slot={3} accent={primary} unfillSlot={4} />
        <Box n={createPolicy} slot={6} accent={primary} unfillSlot={7} />
        <Box n={check} slot={9} accent={primary} fillAccent="#f59e0b" unfillSlot={10} />

        {/* the check is evaluated when a run reaches its stage */}
        <text x={check.x + BOX_W / 2} y={check.y + BOX_H + 30} textAnchor="middle" fontSize="16" fontStyle="italic" fill="var(--ifm-color-emphasis-600)" opacity={reduced ? 1 : 0}>
          {!reduced && (
            <>
              <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin={begin(9)} fill="freeze" />
              <set attributeName="opacity" to="0" begin={resetBegin} />
            </>
          )}
          when a run reaches the policy's stage
        </text>

        <Box n={pass} slot={11} accent={pass.accent} unfillSlot={null} />
        <Box n={fail} slot={13} accent={fail.accent} unfillSlot={null} />
      </svg>
    </div>
  );
}

export default AttestationFlow;
