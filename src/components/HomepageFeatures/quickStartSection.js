import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "../../css/quick-start-section.module.css";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function QuickStartSection() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section
      ref={ref}
      className={`${styles.quickStart} ${isVisible ? styles.animate : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.quickStartContent}>
          <Heading as="h2" className={styles.quickStartTitle}>
            Ready to Get Started?
          </Heading>
          <p className={styles.quickStartDescription}>
            Deploy your first Terraform module with Tharsis in minutes. Choose
            your preferred way to begin.
          </p>
          <div className={styles.buttonGroup}>
            <Link className={styles.primaryButton} to="/quickstart">
              Start Building
            </Link>
            <Link className={styles.secondaryButton} to="/intro">
              View Documentation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
