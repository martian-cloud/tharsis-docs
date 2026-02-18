import styles from "../../css/features-section.module.css";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import Heading from "@theme/Heading";

export default function FeaturesSection() {
  const [ref, isVisible] = useScrollAnimation(0.05);

  const features = [
    {
      title: "Home Dashboard",
      description:
        "Centralized dashboard displaying run status, workspace access, recent activity events, and team memberships. Single view for managing all your infrastructure deployments and monitoring system health.",
      highlight: "Central control",
    },
    {
      title: "Plan Visualization",
      description:
        "Visual diff of infrastructure changes with streaming logs and plan summaries. See exactly what resources will be created, updated, or destroyed with drift detection before applying changes.",
      highlight: "Change preview",
    },
    {
      title: "Role-Based Access Control",
      description:
        "Hierarchical permissions with inherited memberships across groups and workspaces. User, team, and service account management with viewer, deployer, and owner roles for streamlined access control.",
      highlight: "RBAC & teams",
    },
    {
      title: "Group Hierarchy",
      description:
        "Organize workspaces using nested groups that model your product and environment structure. Terraform variables and permissions set at group level are inherited by all subgroups and workspaces.",
      highlight: "Organization",
    },
    {
      title: "Private Registry",
      description:
        "Built-in Terraform registry for private modules and providers with versioning, visibility controls, and attestation. Central location to store, discover, and share infrastructure patterns.",
      highlight: "Module management",
    },
    {
      title: "Terraform Provider Mirror",
      description:
        "Automatic caching of Terraform providers with GPG signature verification. Reduces network latency, avoids rate limiting, and enables offline access to cached providers when upstream registries are unavailable.",
      highlight: "Provider caching",
    },
    {
      title: "No-Code Deployments",
      description:
        "Deploy Terraform modules directly from the registry without writing wrapper code. Create and manage infrastructure through UI or CLI without maintaining root Terraform configurations.",
      highlight: "Simplified deployment",
    },
    {
      title: "Managed Identities",
      description:
        "Secure cloud authentication using OIDC without storing static credentials. AWS and Azure support with access policies and module attestation for zero-credential infrastructure management.",
      highlight: "Enterprise Scale",
    },
    {
      title: "Service Accounts",
      description:
        "Machine-to-machine authentication for CI/CD pipelines and automated systems. Supports OIDC federation for platforms like GitLab CI and GitHub Actions, or client credentials for direct authentication without managing static API keys.",
      highlight: "M2M authentication",
    },
    {
      title: "VCS Integration",
      description:
        "Automatic Terraform deployments triggered by Git repository changes. GitHub and GitLab support with webhook automation to keep infrastructure in sync with your codebase.",
      highlight: "Git workflows",
    },
    {
      title: "Runner Agents",
      description:
        "Scalable job execution with pluggable container runtimes including Docker, Kubernetes, and AWS Fargate. Deploy shared or dedicated runners within private networks for secure deployments.",
      highlight: "Flexible execution",
    },
    {
      title: "Terraform Provider",
      description:
        "Native Terraform provider for managing Tharsis resources and consuming workspace outputs. Create and manage Tharsis infrastructure using familiar Terraform workflows and syntax.",
      highlight: "Native integration",
    },
    {
      title: "Workspace Dependencies",
      description:
        "Visual dependency tracking and cross-workspace data sharing through output consumption. Understand infrastructure relationships and manage complex multi-workspace deployments.",
      highlight: "Dependency management",
    },
    {
      title: "AI Assistant Integration",
      description:
        "Built-in MCP server enables AI assistants like Kiro, Claude, and Cursor to manage infrastructure. Create runs, troubleshoot failures, and deploy changes through natural language with configurable access controls.",
      highlight: "MCP server",
    },
  ];

  return (
    <section
      ref={ref}
      className={`${styles.features} ${isVisible ? styles.animate : ""}`}
    >
      <div className={styles.container}>
        <Heading as="h2" className={styles.sectionTitle}>
          Core Capabilities
        </Heading>
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
                  <Heading as="h3" className={styles.featureTitle}>
                    {feature.title}
                  </Heading>
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>
                </div>
              </div>
              <div className={styles.featureVisual}>
                {idx === 0 ? (
                  <div className={styles.dashboardVisual}>
                    <div className={styles.dashboardNavbar}>
                      <span className={styles.dashboardLogo}>Tharsis</span>
                      <div className={styles.dashboardSearch}>🔍 Search</div>
                      <div className={styles.dashboardNavLinks}>
                        <span>Groups</span>
                        <span>Workspaces</span>
                        <span>Registry</span>
                      </div>
                    </div>
                    <div className={styles.dashboardBody}>
                      <div className={styles.dashboardDrawer}>
                        <div className={styles.dashboardDrawerSection}>
                          <div className={styles.dashboardDrawerHeader}>
                            Workspaces
                          </div>
                          <div className={styles.dashboardDrawerSearch}>🔍</div>
                          <div className={styles.dashboardDrawerItem}>
                            <span className={styles.drawerIcon}>P</span>
                            prod-vpc
                          </div>
                          <div className={styles.dashboardDrawerItem}>
                            <span className={styles.drawerIcon}>S</span>
                            staging-api
                          </div>
                          <div className={styles.dashboardDrawerItem}>
                            <span className={styles.drawerIcon}>D</span>
                            dev-db
                          </div>
                        </div>
                        <div className={styles.dashboardDrawerSection}>
                          <div className={styles.dashboardDrawerHeader}>
                            Teams
                          </div>
                          <div className={styles.dashboardDrawerItem}>
                            <span className={styles.drawerIcon}>P</span>
                            platform
                          </div>
                          <div className={styles.dashboardDrawerItem}>
                            <span className={styles.drawerIcon}>D</span>
                            devops
                          </div>
                        </div>
                      </div>
                      <div className={styles.dashboardMain}>
                        <div className={styles.dashboardActivity}>
                          <div className={styles.dashboardHeader}>Activity</div>
                          <div className={styles.dashboardEvent}>
                            <div className={styles.dashboardEventIcon}>🚀</div>
                            <div className={styles.dashboardEventText}>
                              Run applied in prod-vpc
                            </div>
                          </div>
                          <div className={styles.dashboardEvent}>
                            <div className={styles.dashboardEventIcon}>🚀</div>
                            <div className={styles.dashboardEventText}>
                              Run created in staging-api
                            </div>
                          </div>
                          <div className={styles.dashboardEvent}>
                            <div className={styles.dashboardEventIcon}>📁</div>
                            <div className={styles.dashboardEventText}>
                              Group dev-team created
                            </div>
                          </div>
                          <div className={styles.dashboardEvent}>
                            <div className={styles.dashboardEventIcon}>⚙</div>
                            <div className={styles.dashboardEventText}>
                              Variable added to prod-app
                            </div>
                          </div>
                          <div className={styles.dashboardEvent}>
                            <div className={styles.dashboardEventIcon}>🚀</div>
                            <div className={styles.dashboardEventText}>
                              Run planned in test-infra
                            </div>
                          </div>
                        </div>
                        <div className={styles.dashboardSidebar}>
                          <div className={styles.dashboardCard}>
                            <span className={styles.dashboardCardIcon}>🚀</span>
                            <span className={styles.dashboardCardText}>
                              Get Started
                            </span>
                          </div>
                          <div className={styles.dashboardRuns}>
                            <div className={styles.dashboardHeader}>
                              Recent Runs
                            </div>
                            <div className={styles.dashboardRunItem}>
                              <div
                                className={`${styles.dashboardRunStatus} ${styles.applied}`}
                              ></div>
                              <span className={styles.dashboardRunId}>
                                Ul83YmM1YWQ3
                              </span>
                            </div>
                            <div className={styles.dashboardRunItem}>
                              <div
                                className={`${styles.dashboardRunStatus} ${styles.pending}`}
                              ></div>
                              <span className={styles.dashboardRunId}>
                                Nzk2ZTRiOWE4
                              </span>
                            </div>
                            <div className={styles.dashboardRunItem}>
                              <div
                                className={`${styles.dashboardRunStatus} ${styles.applied}`}
                              ></div>
                              <span className={styles.dashboardRunId}>
                                MmFlNjc0YzU2
                              </span>
                            </div>
                            <div className={styles.dashboardRunItem}>
                              <div
                                className={`${styles.dashboardRunStatus} ${styles.applied}`}
                              ></div>
                              <span className={styles.dashboardRunId}>
                                YjRkOGUyMTNh
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : idx === 1 ? (
                  <div className={styles.planVisual}>
                    <div className={styles.planHeader}>Plan Changes</div>
                    <div className={styles.planResources}>
                      <div className={styles.planResource}>
                        <div className={styles.planResourceHeader}>
                          <span className={styles.planResourceName}>
                            aws_instance.web
                          </span>
                          <span
                            className={`${styles.planAction} ${styles.create}`}
                          >
                            create
                          </span>
                        </div>
                        <div className={styles.planDiff}>
                          <div
                            className={`${styles.planDiffLine} ${styles.add}`}
                          >
                            + ami = "ami-0c02fb55"
                          </div>
                          <div
                            className={`${styles.planDiffLine} ${styles.add}`}
                          >
                            + instance_type = "t3.micro"
                          </div>
                        </div>
                      </div>
                      <div className={styles.planResource}>
                        <div className={styles.planResourceHeader}>
                          <span className={styles.planResourceName}>
                            aws_security_group.web
                          </span>
                          <span
                            className={`${styles.planAction} ${styles.update}`}
                          >
                            update
                          </span>
                        </div>
                        <div className={styles.planDiff}>
                          <div
                            className={`${styles.planDiffLine} ${styles.remove}`}
                          >
                            - cidr = ["10.0.0.0/8"]
                          </div>
                          <div
                            className={`${styles.planDiffLine} ${styles.add}`}
                          >
                            + cidr = ["0.0.0.0/0"]
                          </div>
                        </div>
                      </div>
                      <div className={styles.planResource}>
                        <div className={styles.planResourceHeader}>
                          <span className={styles.planResourceName}>
                            aws_s3_bucket.old
                          </span>
                          <span
                            className={`${styles.planAction} ${styles.delete}`}
                          >
                            delete
                          </span>
                        </div>
                        <div className={styles.planDiff}>
                          <div
                            className={`${styles.planDiffLine} ${styles.remove}`}
                          >
                            - bucket = "old-assets"
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : idx === 2 ? (
                  <div className={styles.rbacVisual}>
                    <div className={styles.rbacHeader}>Members</div>
                    <div className={styles.rbacTable}>
                      <div
                        className={`${styles.rbacRow} ${styles.rbacRowHeader}`}
                      >
                        <span>Name</span>
                        <span>Type</span>
                        <span>Role</span>
                        <span>Updated</span>
                        <span>Source</span>
                      </div>
                      <div className={styles.rbacRow}>
                        <div className={styles.rbacMember}>
                          <div className={styles.rbacAvatar}>A</div>
                          <span className={styles.rbacName}>alice.jones</span>
                        </div>
                        <span className={styles.rbacType}>User</span>
                        <span className={`${styles.rbacRole} ${styles.owner}`}>
                          owner
                        </span>
                        <span className={styles.rbacType}>9mo ago</span>
                        <span className={styles.rbacType}>acme</span>
                      </div>
                      <div className={styles.rbacRow}>
                        <div className={styles.rbacMember}>
                          <div className={styles.rbacAvatar}>B</div>
                          <span className={styles.rbacName}>bob.smith</span>
                        </div>
                        <span className={styles.rbacType}>User</span>
                        <span
                          className={`${styles.rbacRole} ${styles.deployer}`}
                        >
                          deployer
                        </span>
                        <span className={styles.rbacType}>4d ago</span>
                        <span className={styles.rbacType}>Direct</span>
                      </div>
                      <div className={styles.rbacRow}>
                        <div className={styles.rbacMember}>
                          <div className={`${styles.rbacAvatar} ${styles.sa}`}>
                            C
                          </div>
                          <span className={styles.rbacName}>ci-runner</span>
                        </div>
                        <span className={styles.rbacType}>ServiceAccount</span>
                        <span
                          className={`${styles.rbacRole} ${styles.deployer}`}
                        >
                          deployer
                        </span>
                        <span className={styles.rbacType}>9mo ago</span>
                        <span className={styles.rbacType}>acme</span>
                      </div>
                    </div>
                  </div>
                ) : idx === 3 ? (
                  <div className={styles.groupVisual}>
                    <div className={styles.groupHeader}>Groups</div>
                    <div className={styles.groupList}>
                      <div className={styles.groupItem}>
                        <div className={styles.groupAvatar}>O</div>
                        <div className={styles.groupInfo}>
                          <div className={styles.groupName}>organization</div>
                          <div className={styles.groupMeta}>3 subgroups</div>
                        </div>
                      </div>
                      <div
                        className={styles.groupItem}
                        style={{ marginLeft: "16px" }}
                      >
                        <div className={styles.groupAvatar}>P</div>
                        <div className={styles.groupInfo}>
                          <div className={styles.groupName}>production</div>
                          <div className={styles.groupMeta}>
                            2 subgroups · 3 workspaces
                          </div>
                        </div>
                      </div>
                      <div
                        className={styles.groupItem}
                        style={{ marginLeft: "16px" }}
                      >
                        <div className={styles.groupAvatar}>S</div>
                        <div className={styles.groupInfo}>
                          <div className={styles.groupName}>staging</div>
                          <div className={styles.groupMeta}>2 workspaces</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : idx === 4 ? (
                  <div className={styles.registryVisual}>
                    <div className={styles.registryHeader}>Modules</div>
                    <div className={styles.registryList}>
                      <div className={styles.registryItem}>
                        <span className={styles.registryIcon}></span>
                        <div className={styles.registryInfo}>
                          <div className={styles.registryName}>aws-vpc/aws</div>
                          <div className={styles.registryVersion}>
                            2.1.0 published 3mo ago by alice
                          </div>
                        </div>
                        <span className={styles.registryBadge}>private</span>
                      </div>
                      <div className={styles.registryItem}>
                        <span className={styles.registryIcon}></span>
                        <div className={styles.registryInfo}>
                          <div className={styles.registryName}>
                            azure-network/azure
                          </div>
                          <div className={styles.registryVersion}>
                            1.3.2 published 1mo ago by bob
                          </div>
                        </div>
                      </div>
                      <div className={styles.registryItem}>
                        <span className={styles.registryIcon}></span>
                        <div className={styles.registryInfo}>
                          <div className={styles.registryName}>
                            k8s-cluster/kubernetes
                          </div>
                          <div className={styles.registryVersion}>
                            3.0.1 published 2w ago by carol
                          </div>
                        </div>
                        <span className={styles.registryBadge}>private</span>
                      </div>
                    </div>
                  </div>
                ) : idx === 5 ? (
                  <div className={styles.mirrorVisual}>
                    <div className={styles.mirrorHeader}>terraform init</div>
                    <div className={styles.mirrorFlow}>
                      <div className={styles.mirrorSource}>
                        <span className={styles.mirrorIcon}>🌐</span>
                        <span className={styles.mirrorLabel}>Upstream</span>
                      </div>
                      <div className={styles.mirrorProxy}>
                        <span className={styles.mirrorProxyIcon}>🔀</span>
                        <span className={styles.mirrorProxyLabel}>Proxy</span>
                      </div>
                      <div className={styles.mirrorCache}>
                        <span className={styles.mirrorCacheIcon}>⚡</span>
                        <span className={styles.mirrorCacheLabel}>Cache</span>
                      </div>
                    </div>
                    <div className={styles.mirrorOutput}>
                      <div>
                        Installed hashicorp/aws v5.31.0{" "}
                        <span className={styles.mirrorVerified}>
                          ✓ verified
                        </span>
                      </div>
                      <div className={styles.mirrorOffline}>
                        📴 Offline ready
                      </div>
                    </div>
                  </div>
                ) : idx === 6 ? (
                  <div className={styles.deploymentVisual}>
                    <div className={styles.deploymentContent}>
                      <div className={styles.deploymentSection}>
                        Select Source
                      </div>
                      <div className={styles.deploymentSources}>
                        <div
                          className={`${styles.deploymentSource} ${styles.active}`}
                        >
                          Module
                        </div>
                        <div className={styles.deploymentSource}>Config</div>
                        <div className={styles.deploymentSource}>VCS</div>
                      </div>
                      <div className={styles.deploymentSection}>Run Type</div>
                      <div className={styles.deploymentSources}>
                        <div className={styles.deploymentSource}>Plan</div>
                        <div
                          className={`${styles.deploymentSource} ${styles.active}`}
                        >
                          Apply
                        </div>
                      </div>
                      <div className={styles.deploymentSection}>Module</div>
                      <div className={styles.deploymentForm}>
                        <div className={styles.deploymentField}>
                          acme/aws-vpc/aws · 2.1.0
                        </div>
                      </div>
                    </div>
                  </div>
                ) : idx === 7 ? (
                  <div className={styles.identityVisual}>
                    <div className={styles.identityHeader}>OIDC Federation</div>
                    <div className={styles.identityFlow}>
                      <div className={styles.identityStep}>
                        <span className={styles.identityIcon}>🔐</span>
                        <span className={styles.identityLabel}>Tharsis</span>
                      </div>
                      <div className={styles.identityArrow}>
                        <span className={styles.identityArrowLine}>→</span>
                        <span className={styles.identityArrowText}>
                          OIDC Token
                        </span>
                      </div>
                      <div className={styles.identityStep}>
                        <span className={styles.identityIcon}>☁️</span>
                        <span className={styles.identityLabel}>
                          AWS / Azure
                        </span>
                      </div>
                    </div>
                    <div className={styles.identityBenefit}>
                      <span className={styles.identityCheck}>✓</span> No stored
                      credentials
                    </div>
                  </div>
                ) : idx === 8 ? (
                  <div className={styles.serviceAccountVisual}>
                    <div className={styles.serviceAccountHeader}>
                      CI/CD Authentication
                    </div>
                    <div className={styles.serviceAccountFlow}>
                      <div className={styles.serviceAccountStep}>
                        <span className={styles.serviceAccountIcon}>⚙️</span>
                        <span className={styles.serviceAccountLabel}>
                          GitLab CI
                        </span>
                      </div>
                      <div className={styles.serviceAccountArrow}>→</div>
                      <div className={styles.serviceAccountStep}>
                        <span className={styles.serviceAccountIcon}>🎫</span>
                        <span className={styles.serviceAccountLabel}>OIDC</span>
                      </div>
                      <div className={styles.serviceAccountArrow}>→</div>
                      <div className={styles.serviceAccountStep}>
                        <span className={styles.serviceAccountIcon}>🏗️</span>
                        <span className={styles.serviceAccountLabel}>
                          Tharsis
                        </span>
                      </div>
                    </div>
                    <div className={styles.serviceAccountBenefit}>
                      <span className={styles.serviceAccountCheck}>✓</span> No
                      secrets in pipelines
                    </div>
                  </div>
                ) : idx === 9 ? (
                  <div className={styles.vcsVisual}>
                    <div className={styles.vcsHeader}>
                      <span className={styles.vcsPrIcon}>⎇</span>
                      <span className={styles.vcsPrTitle}>
                        feat: add vpc module
                      </span>
                      <span className={styles.vcsPrBadge}>Open</span>
                    </div>
                    <div className={styles.vcsChecks}>
                      <div className={styles.vcsCheck}>
                        <span className={styles.vcsCheckIcon}>✓</span>
                        <span>tharsis/plan</span>
                        <span className={styles.vcsCheckStatus}>passed</span>
                      </div>
                      <div className={styles.vcsCheck}>
                        <span className={styles.vcsCheckPending}>○</span>
                        <span>tharsis/apply</span>
                        <span className={styles.vcsCheckWaiting}>waiting</span>
                      </div>
                    </div>
                    <div className={styles.vcsPlanSummary}>
                      Plan: <span className={styles.vcsAdd}>+3</span>{" "}
                      <span className={styles.vcsChange}>~1</span>{" "}
                      <span className={styles.vcsDestroy}>-0</span>
                    </div>
                  </div>
                ) : idx === 10 ? (
                  <div className={styles.runnerVisual}>
                    <div className={styles.runnerGraph}>
                      <div className={styles.runnerQueue}>
                        <div className={styles.runnerJob}>Job</div>
                        <div className={styles.runnerJob}>Job</div>
                      </div>
                      <div className={styles.runnerArrowFlow}>→</div>
                      <div className={styles.runnerAgent}>
                        <span className={styles.runnerAgentIcon}>⚙️</span>
                        <span className={styles.runnerAgentLabel}>Runner</span>
                      </div>
                      <div className={styles.runnerArrowFlow}>→</div>
                      <div className={styles.runnerAgent}>
                        <span className={styles.runnerAgentIcon}>🐳</span>
                        <span className={styles.runnerAgentLabel}>
                          Executor
                        </span>
                      </div>
                      <div className={styles.runnerArrowFlow}>→</div>
                      <div className={styles.runnerCloud}>
                        <span className={styles.runnerCloudIcon}>☁️</span>
                        <span className={styles.runnerCloudLabel}>Deploy</span>
                      </div>
                    </div>
                    <div className={styles.runnerLabel}>
                      Execute Terraform in your environment
                    </div>
                  </div>
                ) : idx === 11 ? (
                  <div className={styles.providerVisual}>
                    <div className={styles.providerHeader}>main.tf</div>
                    <div className={styles.providerCode}>
                      <span className={styles.providerKeyword}>provider</span>{" "}
                      <span className={styles.providerString}>"tharsis"</span>{" "}
                      {"{"}
                      <br />
                      &nbsp;&nbsp;
                      <span className={styles.providerAttr}>
                        endpoint
                      </span> ={" "}
                      <span className={styles.providerString}>
                        "https://tharsis.example.com"
                      </span>
                      <br />
                      {"}"}
                      <br />
                      <span className={styles.providerKeyword}>data</span>{" "}
                      <span className={styles.providerString}>
                        "tharsis_workspace_outputs"
                      </span>{" "}
                      <span className={styles.providerString}>"vpc"</span> {"{"}
                      <br />
                      &nbsp;&nbsp;
                      <span className={styles.providerAttr}>
                        full_path
                      </span> ={" "}
                      <span className={styles.providerString}>
                        "acme/prod/vpc"
                      </span>
                      <br />
                      {"}"}
                      <br />
                      <br />
                      <span className={styles.providerKeyword}>
                        locals
                      </span>{" "}
                      {"{"}
                      <br />
                      &nbsp;&nbsp;
                      <span className={styles.providerAttr}>
                        subnet_id
                      </span> ={" "}
                      data.tharsis_workspace_outputs.vpc.outputs.subnet_id
                      <br />
                      &nbsp;&nbsp;
                      <span className={styles.providerAttr}>vpc_id</span> ={" "}
                      data.tharsis_workspace_outputs.vpc.outputs.vpc_id
                      <br />
                      {"}"}
                    </div>
                  </div>
                ) : idx === 12 ? (
                  <div className={styles.dependencyVisual}>
                    <div className={styles.dependencyGraph}>
                      <div className={styles.depUpstream}>
                        <div className={styles.depNode}>vpc</div>
                        <div className={styles.depNode}>database</div>
                        <div className={styles.depNode}>secrets</div>
                      </div>
                      <div className={styles.depArrows}>
                        <span>↘</span>
                        <span>→</span>
                        <span>↗</span>
                      </div>
                      <div className={styles.depMain}>
                        <div className={styles.depNodeMain}>app-prod</div>
                      </div>
                    </div>
                    <div className={styles.depLabel}>
                      Share outputs across workspaces
                    </div>
                  </div>
                ) : idx === 13 ? (
                  <div className={styles.mcpVisual}>
                    <div className={styles.mcpTerminalBar}>
                      <span
                        className={styles.mcpDot}
                        style={{ background: "#ff5f56" }}
                      ></span>
                      <span
                        className={styles.mcpDot}
                        style={{ background: "#ffbd2e" }}
                      ></span>
                      <span
                        className={styles.mcpDot}
                        style={{ background: "#27ca40" }}
                      ></span>
                      <span className={styles.mcpTerminalTitle}>
                        AI Assistant
                      </span>
                    </div>
                    <div className={styles.mcpChat}>
                      <div className={styles.mcpMessage}>
                        <span className={styles.mcpUser}>❯</span> Why did my run
                        fail?
                      </div>
                      <div className={styles.mcpResponse}>
                        Analyzing run logs for acme/prod...
                      </div>
                      <div className={styles.mcpResponse}>
                        <span className={styles.mcpError}>Error:</span>{" "}
                        InvalidAMIID.NotFound
                      </div>
                      <div className={styles.mcpResponse}>
                        The AMI{" "}
                        <span className={styles.mcpCode}>ami-old123</span>{" "}
                        doesn&apos;t exist in us-east-1.
                      </div>
                      <div className={styles.mcpResponse}>
                        <span className={styles.mcpFix}>Fix:</span> Update{" "}
                        <span className={styles.mcpCode}>aws_instance.web</span>{" "}
                        to <span className={styles.mcpCode}>ami-0abc123</span>
                      </div>
                      <div className={styles.mcpMessage}>
                        <span className={styles.mcpUser}>❯</span> Apply the fix
                        and run plan
                      </div>
                      <div className={styles.mcpResponse}>
                        Updating configuration...
                      </div>
                      <div className={styles.mcpResponse}>
                        Running terraform plan...
                      </div>
                      <div className={styles.mcpResponse}>
                        <span className={styles.mcpSuccess}>✓</span> Plan
                        succeeded: <span className={styles.mcpAdd}>+0</span>{" "}
                        <span className={styles.mcpChange}>~1</span>{" "}
                        <span className={styles.mcpRemove}>-0</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
