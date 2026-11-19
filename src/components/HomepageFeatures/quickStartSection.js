import { useEffect, useRef, useState } from "react";
import Heading from "@theme/Heading";
import { useInView } from "../../hooks/useInView";
import styles from "../../css/quick-start-section.module.css";

const TABS = [
  { id: "configure", label: "Configure", code: "tharsis configure\ntharsis sso login" },
  {
    id: "create",
    label: "Create",
    code: "tharsis group create -parent-group-id trn:group:my-org my-team\ntharsis workspace create -parent-group-id trn:group:my-org/my-team dev",
  },
  { id: "apply", label: "Apply", code: "tharsis apply trn:workspace:my-org/my-team/dev" },
];

export default function QuickStartSection() {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef();

  useEffect(() => () => clearTimeout(copiedTimer.current), []);

  const select = (i) => {
    clearTimeout(copiedTimer.current);
    setActive(i);
    setCopied(false);
  };

  const copy = async () => {
    clearTimeout(copiedTimer.current);
    try {
      await navigator.clipboard.writeText(TABS[active].code);
      setCopied(true);
      copiedTimer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const onKey = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (active + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length;
    select(next);
    document.getElementById(`qs-tab-${TABS[next].id}`)?.focus();
  };

  return (
    <section ref={ref} data-in-view={inView} className={styles.quickStart}>
      <div className={styles.container}>
        <Heading as="h2" className={styles.title}>Up and running in minutes</Heading>
        <p className={styles.lead}>Create a group and workspace, then apply the Terraform configuration in your current directory.</p>
        <div className={styles.code}>
          <div className={styles.bar}>
            <div role="tablist" aria-label="Quickstart steps" className={styles.tabs} onKeyDown={onKey}>
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  id={`qs-tab-${t.id}`}
                  role="tab"
                  type="button"
                  aria-selected={i === active}
                  aria-controls="qs-panel"
                  tabIndex={i === active ? 0 : -1}
                  className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
                  onClick={() => select(i)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <button type="button" className={styles.copy} onClick={copy} aria-label="Copy code">
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <pre id="qs-panel" role="tabpanel" aria-labelledby={`qs-tab-${TABS[active].id}`} className={styles.pre}>
            <code>{TABS[active].code}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
