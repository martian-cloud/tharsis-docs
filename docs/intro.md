---
title: Introduction
description: "What is Tharsis?"
---

A tool to deploy automated infrastructure in a consistent manner, and provide for separation of duties between products and business functions.

Tharsis builds on top of [Terraform](https://www.terraform.io/), i.e. it uses [Terraform modules](https://www.terraform.io/language/modules/develop) to deploy resources using environment-specific configuration. It stores the state data and outputs that can be used for other deployments.

## Some key features

### Tharsis API

&#10004; Configurable job executor plugin.

&#10004; Machine to Machine (M2M) authentication with service accounts (OIDC federation or client credentials).

&#10004; Managed identity support to securely authenticate with cloud providers (no credential storage).

&#10004; Users are not required to handle secrets.

&#10004; Compatible with the Terraform CLI remote backend.

&#10004; Ability to quickly cancel jobs.

&#10004; Support for uploading and downloading Terraform modules.

&#10004; Version Control System (VCS) integration with GitHub and GitLab.

&#10004; Terraform module and provider registries.

&#10004; Written in [The Go Programming Language](https://go.dev/) and available as a [Docker image](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-api/container_registry).

&#10004; Develop your own tools with the [Tharsis SDK for Go](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-sdk-go).

### Tharsis UI

&#10004; Simple, modern, and intuitive.

&#10004; User-friendly access to group, workspace management, access control, etc.

&#10004; Real-time activity events to associate resource modifications with users making them.

&#10004; Effortless access to the Tharsis Terraform module and provider registries.

&#10004; Access to GraphiQL editor to interface directly with the GraphQL API.

&#10004; Ability to gracefully and forcefully cancel runs with a click of a button.

&#10004; Ability to trigger runs, view live logs, all powered by GraphQL subscriptions and WebSockets to provide event-driven UI updates.

&#10004; Written in [TypeScript](https://www.typescriptlang.org/) and available as a [Docker image](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-ui/container_registry).

### Tharsis CLI

&#10004; A command language that interfaces with Tharsis remote Terraform backend.

&#10004; Supports both SSO and service account-based authentication.

&#10004; Ready for use in CI/CD pipelines.

&#10004; Support for most Tharsis API operations.

&#10004; Built-in [MCP server](cli/tharsis/mcp.md) for AI assistant integration (Claude, Cursor, etc.).

&#10004; Written in [The Go Programming Language](https://go.dev/) and available for [all major platforms](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-cli/-/releases).
