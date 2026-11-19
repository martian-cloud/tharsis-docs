import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import { useInView } from "../../hooks/useInView";
import styles from "../../css/cta-section.module.css";

export default function CtaSection() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} data-in-view={inView} className={styles.cta}>
      <div className={styles.band}>
        <span className={styles.glow} aria-hidden="true" />
        <Heading as="h2" className={styles.title}>Ready to Get Started?</Heading>
        <p className={styles.text}>
          Run your first Terraform deployment with Tharsis in minutes. Choose
          your preferred way to begin.
        </p>
        <div className={styles.actions}>
          <Link className={styles.solid} to="/quickstart">Start Building</Link>
          <Link className={styles.outline} to="/intro">View Documentation</Link>
        </div>
      </div>
    </section>
  );
}
