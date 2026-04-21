---
title: Introduction
description: "What is Tharsis?"
keywords:
  [
    tharsis,
    terraform,
    infrastructure as code,
    open source,
    devops,
    state management,
    deployment platform,
  ]
---

A modern, [open-source](https://gitlab.com/groups/infor-cloud/martian-cloud/tharsis), self-hosted Terraform platform that provides a complete solution for managing your infrastructure deployments, state, and workspaces.

Tharsis eliminates the complexity of running Terraform at scale. It provides secure state management, OIDC-based managed identities for cloud authentication without storing secrets, built-in module and provider registries, VCS-driven workflows, and a powerful CLI with gRPC and MCP support. Whether you're a single team or an enterprise with hundreds of workspaces, Tharsis gives you the control, visibility, and automation to deploy infrastructure with confidence.

## Some key features

### Tharsis API + UI

&#10004; Hierarchical group structure with variable and managed identity inheritance.

&#10004; Managed identities for secure cloud authentication via OIDC — no secrets to store or rotate.

&#10004; Service accounts with OIDC federation and client credentials for M2M authentication.

&#10004; Role-based access control (RBAC) with viewer, deployer, and owner roles.

&#10004; Terraform module and provider registries with versioning and attestation support.

&#10004; Federated registries for cross-instance module and provider sharing.

&#10004; Provider mirror for air-gapped and restricted environments.

&#10004; VCS integration with GitHub and GitLab for automatic run triggering.

&#10004; Workspace drift detection and scheduled assessments.

&#10004; Module attestation for supply chain security.

&#10004; Configurable job executors (Docker, Kubernetes, ECS).

&#10004; Live run logs and real-time UI updates powered by GraphQL subscriptions.

&#10004; Activity events for full audit trail of resource modifications.

&#10004; Built-in GraphiQL editor for direct API exploration.

&#10004; Compatible with the Terraform CLI remote backend.

&#10004; SCIM support for user and team provisioning.

&#10004; Email notifications for key events.

&#10004; GraphQL and gRPC APIs for programmatic access.

&#10004; Built-in remote [MCP server](guides/mcp.md) for AI assistant integration without a local CLI.

&#10004; Written in [Go](https://go.dev/) and [TypeScript](https://www.typescriptlang.org/).

:::note
The [Tharsis SDK for Go](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-sdk-go) is deprecated. The CLI now communicates directly with the Tharsis API via gRPC using the [client package](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-api/-/tree/main/pkg/client).
:::

### Tharsis CLI

&#10004; Full CLI for managing groups, workspaces, runs, modules, providers, and more.

&#10004; Run Terraform commands directly via the `tf-exec` subcommand.

&#10004; SSO and service account authentication with multi-profile support.

&#10004; Built-in [MCP server](cli/tharsis/mcp.md) for AI assistant integration (Claude, Cursor, etc.).

&#10004; Ready for use in CI/CD pipelines.

&#10004; Written in [Go](https://go.dev/) and available for [all major platforms](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-cli/-/releases).

### Tharsis Terraform Provider

&#10004; Manage Tharsis resources (groups, workspaces, variables, managed identities, and more) using Terraform.

&#10004; Share workspace outputs across deployments.

&#10004; Available on the [Terraform Registry](https://registry.terraform.io/providers/martian-cloud/tharsis/latest).

## Deploying with Tharsis

| Method                                          | Description                                                   |
| ----------------------------------------------- | ------------------------------------------------------------- |
| [Module Sources](deployments/module_sources.md) | Use Tharsis's built-in registry or third-party registries     |
| [CLI](deployments/cli.md)                       | Deploy directly from the command line                         |
| [VCS](deployments/vcs.md)                       | Automatically trigger runs from Git commits                   |
| [CI/CD](deployments/cicd.md)                    | Integrate with GitLab CI, GitHub Actions, and other pipelines |
