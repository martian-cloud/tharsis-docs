import Heading from "@theme/Heading";
import { useInView } from "../../hooks/useInView";
import styles from "../../css/workflow-section.module.css";

const STEPS = [
  { number: "01", title: "Write", description: "Create Terraform configurations with your infrastructure as code." },
  { number: "02", title: "Deploy", description: "Deploy using Tharsis CLI locally, from CI/CD pipelines, or trigger runs via VCS integration." },
  { number: "03", title: "Share", description: "Publish modules to private registries for team collaboration." },
];

export default function WorkflowSection() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} data-in-view={inView} className={styles.workflow}>
      <div className={styles.container}>
        <Heading as="h2" className={styles.title}>Simple. Secure. Scalable.</Heading>
        <div className={styles.track}>
          <span className={styles.line} aria-hidden="true" />
          <ol className={styles.steps}>
            {STEPS.map((s, i) => (
              <li key={s.number} className={styles.step} style={{ "--i": i }}>
                <span className={styles.badge} aria-hidden="true">{s.number}</span>
                <Heading as="h3" className={styles.stepTitle}>{s.title}</Heading>
                <p className={styles.stepText}>{s.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
