import React from "react";
import styles from "../../css/workflow-section.module.css";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function WorkflowSection() {
  const [ref, isVisible] = useScrollAnimation(0.1);
  const steps = [
    {
      number: "01",
      title: "Write",
      description:
        "Create Terraform configurations with your infrastructure as code",
      icon: "📝",
    },
    {
      number: "02",
      title: "Deploy",
      description:
        "Deploy using Tharsis CLI locally, from CI/CD pipelines, or trigger runs via VCS integration",
      icon: "🚀",
    },
    {
      number: "03",
      title: "Share",
      description:
        "Publish modules to private registries for team collaboration",
      icon: "📦",
    },
  ];

  return (
    <section
      ref={ref}
      className={`${styles.workflow} ${isVisible ? styles.animate : ""}`}
    >
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Simple. Secure. Scalable.</h2>
        <div className={styles.stepsContainer}>
          {steps.map((step, idx) => (
            <div key={idx} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
              {idx < steps.length - 1 && (
                <div className={styles.connector}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
