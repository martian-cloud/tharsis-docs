import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37 + 8) % 100}%`,
  top: `${(i * 53 + 11) % 100}%`,
  delay: `${-((i * 1.7) % 14)}s`,
  duration: `${14 + ((i * 3) % 9)}s`,
  size: `${8 + ((i * 5) % 9)}px`,
}));

export default function EventAmbience() {
  const { siteConfig } = useDocusaurusContext();
  const event = siteConfig.customFields?.event;
  const kind = styles[event];
  if (!kind) return null;

  return (
    <div className={`${styles.ambience} ${kind}`} aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={styles.particle}
          style={{
            left: p.left,
            "--t": p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
