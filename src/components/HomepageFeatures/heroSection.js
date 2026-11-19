import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import DemoVideo from "./demoVideo";
import styles from "../../css/hero-section.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.backdrop} aria-hidden="true">
        <span className={`${styles.orb} ${styles.orb1}`} />
        <span className={`${styles.orb} ${styles.orb2}`} />
        <span className={`${styles.orb} ${styles.orb3}`} />
        <span className={`${styles.orb} ${styles.orb4}`} />
      </div>
      <div className={styles.container}>
        <div className={styles.copy}>
          <span className={styles.pill}>Open source</span>
          <Heading as="h1" className={styles.title}>
            Open-source <span className={styles.gradientText}>Terraform platform</span>
          </Heading>
          <p className={styles.description}>
            Tharsis is an enterprise scale Terraform platform that offers a
            complete solution for managing your Terraform deployments, state
            and workspaces.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} to="/quickstart">
              Get Started <span aria-hidden="true">→</span>
            </Link>
            <Link className={styles.secondary} to="/intro">
              Learn More
            </Link>
          </div>
        </div>
        <div className={styles.visual}>
          <DemoVideo />
        </div>
      </div>
    </section>
  );
}
