import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import { useInView } from "../../hooks/useInView";
import styles from "../../css/features-section.module.css";

const FEATURES = [
  {
    title: "Plan Visualization",
    tag: "Change preview",
    wide: true,
    icon: "M3 12h4l3-8 4 16 3-8h4",
    description:
      "Visual diff of infrastructure changes with streaming logs and plan summaries. See exactly what will be created, updated, or destroyed, with drift detection before you apply.",
  },
  {
    title: "Managed Identities",
    tag: "Enterprise Scale",
    icon: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z",
    description:
      "Secure cloud authentication using OIDC without storing static credentials. AWS and Azure support with access policies and module attestation.",
  },
  {
    title: "Private Registry",
    tag: "Module management",
    icon: "M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v8",
    description:
      "Built-in Terraform registry for private modules and providers with versioning, visibility controls, and attestation.",
  },
  {
    title: "Group Hierarchy",
    tag: "Organization",
    icon: "M12 3v6M5 21v-6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v6M10 9h4",
    description:
      "Organize workspaces with nested groups that model your products and environments. Variables and permissions inherit downward.",
  },
  {
    title: "VCS Integration",
    tag: "Git workflows",
    icon: "M6 3v12M18 9a3 3 0 1 0 0 .01M6 21a3 3 0 1 0 0 .01M18 12c0 4-6 3-12 6",
    description:
      "Automatic Terraform deployments triggered by GitHub and GitLab repository changes.",
  },
  {
    title: "AI Assistant Integration",
    tag: "MCP server",
    wide: true,
    icon: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
    description:
      "A built-in MCP server lets AI assistants like Kiro, Claude, and Cursor create runs, troubleshoot failures, and deploy changes through natural language, with configurable access controls.",
  },
];

function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function FeaturesSection() {
  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <section ref={ref} data-in-view={inView} className={styles.features}>
      <div className={styles.container}>
        <Heading as="h2" className={styles.title}>Core capabilities</Heading>
        <p className={styles.lead}>
          Everything between your Terraform code and your cloud, in one place.
        </p>
        <ul className={styles.grid}>
          {FEATURES.map((f, i) => (
            <li
              key={f.title}
              className={`${styles.card} ${f.wide ? styles.wide : ""}`}
              style={{ "--i": i }}
              onMouseMove={spotlight}
            >
              <span className={styles.icon} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={f.icon} />
                </svg>
              </span>
              <span className={styles.tag}>{f.tag}</span>
              <Heading as="h3" className={styles.cardTitle}>{f.title}</Heading>
              <p className={styles.cardText}>{f.description}</p>
            </li>
          ))}
        </ul>
        <p className={styles.more}>
          <Link to="/intro">Explore all capabilities →</Link>
        </p>
      </div>
    </section>
  );
}
