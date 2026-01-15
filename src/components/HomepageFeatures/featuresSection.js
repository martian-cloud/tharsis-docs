import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "../../css/features-section.module.css";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function FeaturesSection() {
  const { siteConfig } = useDocusaurusContext();
  const [ref, isVisible] = useScrollAnimation(0.05);

  const features = [
    {
      title: "Home Dashboard",
      description:
        "Centralized dashboard displaying run status, workspace access, recent activity events, and team memberships. Single view for managing all your infrastructure deployments and monitoring system health.",
      icon: "🏠",
      highlight: "Central control",
    },
    {
      title: "Plan Visualization",
      description:
        "Visual diff of infrastructure changes with streaming logs and plan summaries. See exactly what resources will be created, updated, or destroyed with drift detection before applying changes.",
      icon: "📊",
      highlight: "Visual insights",
    },
    {
      title: "Role-Based Access Control",
      description:
        "Hierarchical permissions with inherited memberships across groups and workspaces. User, team, and service account management with viewer, deployer, and owner roles for streamlined access control.",
      icon: "👥",
      highlight: "RBAC & teams",
    },
    {
      title: "Group Hierarchy",
      description:
        "Organize workspaces using nested groups that model your product and environment structure. Terraform variables and permissions set at group level are inherited by all subgroups and workspaces.",
      icon: "🏗️",
      highlight: "Organization",
    },
    {
      title: "Private Registry",
      description:
        "Built-in Terraform registry for private modules and providers with versioning, visibility controls, and attestation. Central location to store, discover, and share infrastructure patterns.",
      icon: "📦",
      highlight: "Module management",
    },
    {
      title: "No-Code Deployments",
      description:
        "Deploy Terraform modules directly from the registry without writing wrapper code. Create and manage infrastructure through UI or CLI without maintaining root Terraform configurations.",
      icon: "🚀",
      highlight: "Simplified deployment",
    },
    {
      title: "Managed Identities",
      description:
        "Secure cloud authentication using OIDC without storing static credentials. AWS and Azure support with access policies and module attestation for zero-credential infrastructure management.",
      icon: "🔐",
      highlight: "Enterprise Scale",
    },
    {
      title: "Service Accounts",
      description:
        "Machine-to-machine authentication for CI/CD pipelines using OIDC tokens. Assign roles within groups or workspaces without managing static API keys or secrets.",
      icon: "🤖",
      highlight: "M2M authentication",
    },
    {
      title: "VCS Integration",
      description:
        "Automatic Terraform deployments triggered by Git repository changes. GitHub and GitLab support with webhook automation to keep infrastructure in sync with your codebase.",
      icon: "🔗",
      highlight: "Git workflows",
    },
    {
      title: "Runner Agents",
      description:
        "Scalable job execution with pluggable container runtimes including Docker, Kubernetes, and AWS Fargate. Deploy shared or dedicated runners within private networks for secure deployments.",
      icon: "⚡",
      highlight: "Flexible execution",
    },
    {
      title: "Terraform Provider",
      description:
        "Native Terraform provider for managing Tharsis resources and consuming workspace outputs. Create and manage Tharsis infrastructure using familiar Terraform workflows and syntax.",
      icon: "🔧",
      highlight: "Native integration",
    },
    {
      title: "Workspace Dependencies",
      description:
        "Visual dependency tracking and cross-workspace data sharing through output consumption. Understand infrastructure relationships and manage complex multi-workspace deployments.",
      icon: "🔄",
      highlight: "Dependency management",
    },
    {
      title: "AI Assistant Integration",
      description:
        "Built-in MCP server enables AI assistants like Kiro, Claude, and Cursor to manage infrastructure. Create runs, troubleshoot failures, and deploy changes through natural language with configurable access controls.",
      icon: "🤖",
      highlight: "MCP server",
    },
  ];

  return (
    <section
      ref={ref}
      className={`${styles.features} ${isVisible ? styles.animate : ""}`}
    >
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Core Capabilities</h2>
        <div className={styles.featuresWrapper}>
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`${styles.featureRow} ${
                idx % 2 === 1 ? styles.reverse : ""
              }`}
            >
              <div className={styles.featureContent}>
                <div className={styles.featureText}>
                  <span className={styles.featureHighlight}>
                    {feature.highlight}
                  </span>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>
                </div>
              </div>
              <div className={styles.featureVisual}>
                {idx === 0 ? (
                  <img
                    src={`${siteConfig.baseUrl}posts/tharsis-oss-terraform-platform/home_dashboard.png`}
                    alt="Home Dashboard Screenshot"
                    className={styles.dashboardImage}
                  />
                ) : idx === 5 ? (
                  <div className={styles.deploymentVisual}>
                    <div className={styles.deploymentContent}>
                      <div className={styles.deploymentForm}>
                        <div className={styles.deploymentField}>
                          <span>Registry:</span> registry.tharsis.io
                        </div>
                        <div className={styles.deploymentField}>
                          <span>Module:</span> aws-vpc/network
                        </div>
                        <div className={styles.deploymentField}>
                          <span>Version:</span> v2.1.0
                        </div>
                        <div className={styles.deploymentField}>
                          <span>Workspace:</span> prod-network
                        </div>
                      </div>
                      <div className={styles.deploymentButtons}>
                        <div className={styles.planButton}>Plan</div>
                        <div className={styles.applyButton}>Apply</div>
                      </div>
                    </div>
                  </div>
                ) : idx === 6 ? (
                  <div className={styles.identityVisual}>
                    <div className={styles.identityContent}>
                      <div className={styles.identityFlow}>
                        <div className={styles.flowStep}>
                          <div className={styles.stepNumber}>1</div>
                          <div className={styles.stepText}>
                            Tharsis → AWS STS
                          </div>
                        </div>
                        <div className={styles.flowArrow}>↓</div>
                        <div className={styles.flowStep}>
                          <div className={styles.stepNumber}>2</div>
                          <div className={styles.stepText}>Token Exchange</div>
                        </div>
                        <div className={styles.flowArrow}>↓</div>
                        <div className={styles.flowStep}>
                          <div className={styles.stepNumber}>3</div>
                          <div className={styles.stepText}>Assume Role</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : idx === 7 ? (
                  <div className={styles.serviceAccountVisual}>
                    <div className={styles.serviceAccountContent}>
                      <div className={styles.pipelineFlow}>
                        <div className={styles.pipelineStep}>
                          <div className={styles.pipelineIcon}>🔧</div>
                          <div className={styles.pipelineText}>
                            GitHub Action
                          </div>
                        </div>
                        <div className={styles.pipelineArrow}>→</div>
                        <div className={styles.pipelineStep}>
                          <div className={styles.pipelineIcon}>🎫</div>
                          <div className={styles.pipelineText}>OIDC Token</div>
                        </div>
                        <div className={styles.pipelineArrow}>→</div>
                        <div className={styles.pipelineStep}>
                          <div className={styles.pipelineIcon}>🚀</div>
                          <div className={styles.pipelineText}>Deploy</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : idx === 8 ? (
                  <div className={styles.vcsVisual}>
                    <div className={styles.vcsContent}>
                      <div className={styles.vcsFlow}>
                        <div className={styles.vcsStep}>
                          <div className={styles.vcsIcon}>📝</div>
                          <div className={styles.vcsText}>Code Push</div>
                        </div>
                        <div className={styles.vcsArrow}>→</div>
                        <div className={styles.vcsStep}>
                          <div className={styles.vcsIconDual}>
                            <span className={styles.githubLogo}>⚫</span>
                            <span className={styles.gitlabLogo}>🟠</span>
                          </div>
                          <div className={styles.vcsText}>Webhook</div>
                        </div>
                        <div className={styles.vcsArrow}>→</div>
                        <div className={styles.vcsStep}>
                          <div className={styles.vcsIcon}>🚀</div>
                          <div className={styles.vcsText}>Auto Deploy</div>
                        </div>
                      </div>
                      <div className={styles.vcsPlatforms}>
                        <span className={styles.platformBadge}>⚫ GitHub</span>
                        <span className={styles.platformBadge}>🟠 GitLab</span>
                      </div>
                    </div>
                  </div>
                ) : idx === 9 ? (
                  <div className={styles.runnerVisual}>
                    <div className={styles.runnerContent}>
                      <div className={styles.runnerGrid}>
                        <div className={styles.runnerItem}>
                          <div className={styles.runnerIcon}>🐳</div>
                          <div className={styles.runnerText}>Docker</div>
                        </div>
                        <div className={styles.runnerItem}>
                          <div className={styles.runnerIcon}>☸️</div>
                          <div className={styles.runnerText}>Kubernetes</div>
                        </div>
                        <div className={styles.runnerItem}>
                          <div className={styles.runnerIcon}>☁️</div>
                          <div className={styles.runnerText}>AWS Fargate</div>
                        </div>
                      </div>
                      <div className={styles.runnerTypes}>
                        <span className={styles.runnerBadge}>Shared</span>
                        <span className={styles.runnerBadge}>Dedicated</span>
                      </div>
                    </div>
                  </div>
                ) : idx === 10 ? (
                  <div className={styles.providerVisual}>
                    <div className={styles.providerContent}>
                      <div className={styles.providerFlow}>
                        <div className={styles.providerStep}>
                          <div className={styles.providerIcon}>🔧</div>
                          <div className={styles.providerText}>Terraform</div>
                        </div>
                        <div className={styles.providerArrow}>↔</div>
                        <div className={styles.providerStep}>
                          <div className={styles.providerIcon}>🏗️</div>
                          <div className={styles.providerText}>Tharsis</div>
                        </div>
                      </div>
                      <div className={styles.providerActions}>
                        <span className={styles.actionBadge}>
                          Manage Resources
                        </span>
                        <span className={styles.actionBadge}>
                          Consume Outputs
                        </span>
                      </div>
                    </div>
                  </div>
                ) : idx === 11 ? (
                  <div className={styles.dependencyVisual}>
                    <div className={styles.dependencyContent}>
                      <div className={styles.dependencyFlow}>
                        <div className={styles.workspaceBox}>
                          <div className={styles.workspaceTitle}>vpc-prod</div>
                          <div className={styles.outputItem}>subnet_ids</div>
                          <div className={styles.outputItem}>vpc_id</div>
                        </div>
                        <div className={styles.dependencyLines}>
                          <div className={styles.dependencyLine}>→</div>
                          <div className={styles.dependencyLine}>→</div>
                        </div>
                        <div className={styles.workspaceBox}>
                          <div className={styles.workspaceTitle}>app-prod</div>
                          <div className={styles.inputItem}>← subnet_ids</div>
                          <div className={styles.inputItem}>← vpc_id</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : idx === 12 ? (
                  <div className={styles.mcpVisual}>
                    <div className={styles.mcpContent}>
                      <div className={styles.mcpFlow}>
                        <div className={styles.mcpStep}>
                          <div className={styles.mcpIcon}>💬</div>
                          <div className={styles.mcpText}>AI Assistant</div>
                        </div>
                        <div className={styles.mcpArrow}>↔</div>
                        <div className={styles.mcpStep}>
                          <div className={styles.mcpIcon}>🔌</div>
                          <div className={styles.mcpText}>MCP Server</div>
                        </div>
                        <div className={styles.mcpArrow}>↔</div>
                        <div className={styles.mcpStep}>
                          <div className={styles.mcpIcon}>🏗️</div>
                          <div className={styles.mcpText}>Tharsis</div>
                        </div>
                      </div>
                      <div className={styles.mcpActions}>
                        <span className={styles.mcpBadge}>Plan & Apply</span>
                        <span className={styles.mcpBadge}>Diagnose</span>
                        <span className={styles.mcpBadge}>Manage</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`${styles.customVisual} ${
                      styles[`visual${idx + 1}`]
                    }`}
                  ></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
