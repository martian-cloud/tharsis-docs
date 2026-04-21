---
title: VCS-Driven Deployments
description: "Automatically deploying Terraform modules from version control"
keywords:
  [tharsis, VCS deployments, git, automatic runs, webhooks, GitHub, GitLab]
---

Tharsis can automatically trigger runs when changes are pushed to a connected Git repository. This is powered by [VCS providers](../guides/vcs_providers.md) — integrations with GitHub and GitLab.

## How it works

1. A VCS provider is configured in a group with OAuth credentials for GitHub or GitLab.
2. A workspace is linked to a repository and branch via a Workspace VCS Provider Link.
3. When a commit is pushed to the configured branch, Tharsis automatically creates a run (plan + apply) using the Terraform configuration from the repository.

## Setup

### 1. Create a VCS provider

Navigate to your group and create a VCS provider. See [VCS Providers](../guides/vcs_providers.md#create-a-vcs-provider) for detailed instructions on configuring OAuth applications for GitHub or GitLab.

### 2. Link a workspace to a repository

Once the VCS provider is authenticated, link it to a workspace:

1. Navigate to the workspace.
2. Go to the **VCS** tab.
3. Select the VCS provider, repository, and branch.
4. Optionally configure the module directory if your Terraform files are in a subdirectory.

See [Workspace VCS Provider Links](../guides/vcs_providers.md#create-a-workspace-vcs-provider-link) for details.

### 3. Set workspace variables

Since there's no CLI involved in VCS-driven runs, any variables needed by the Terraform configuration must be set as workspace variables:

1. Navigate to the workspace in the UI.
2. Go to the **Variables** tab.
3. Add Terraform variables and environment variables as needed.

This includes registry credentials (`TF_TOKEN_*`) if your configuration references [private module sources](module_sources.md#third-party-registries).

## Automatic run triggers

Once linked, Tharsis creates a run whenever:

- A commit is pushed to the configured branch.
- A merge/pull request is merged into the configured branch.

The run uses the Terraform configuration from the commit that triggered it.

:::info don't forget the managed identity!
If deploying to AWS or Azure, be sure to [assign a managed identity](../guides/managed_identities.md#assign-a-managed-identity) to the target workspace!
:::
