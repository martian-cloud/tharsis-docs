import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import DemoVideo from "./demoVideo";
import styles from "../../css/hero-section.module.css";

// Constants
const HERO_CONTENT = {
  title: "Open-source Terraform Platform",
  description:
    "Tharsis is an enterprise scale Terraform platform that offers a complete solution for managing your Terraform deployments, state and workspaces.",
  stats: [
    { number: "Cloud", label: "Native" },
    { number: "Enterprise", label: "Scale" },
    { number: "Open", label: "Source" },
  ],
  actions: [
    { text: "Get Started", link: "/quickstart", type: "primary", icon: "→" },
    { text: "Learn More", link: "/intro", type: "secondary" },
  ],
};

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.heroPattern}></div>
      </div>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            {HERO_CONTENT.title}
          </Heading>
          <p className={styles.heroDescription}>{HERO_CONTENT.description}</p>

          <div className={styles.heroStats}>
            {HERO_CONTENT.stats.map((stat, index) => (
              <div key={index} className={styles.stat}>
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.heroActions}>
            {HERO_CONTENT.actions.map((action, index) => (
              <Link
                key={index}
                className={
                  action.type === "primary"
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                to={action.link}
              >
                <span>{action.text}</span>
                {action.icon && (
                  <span className={styles.buttonIcon}>{action.icon}</span>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.heroVideo}>
          <div className={styles.videoWrapper}>
            <DemoVideo />
          </div>
        </div>
      </div>
    </section>
  );
}
