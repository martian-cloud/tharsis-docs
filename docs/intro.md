---
title: Introduction
description: "What is Tharsis?"
---

A tool to deploy automated infrastructure in a consistent manner, and provide for separation of duties between products and business functions.

Tharsis builds on top of [Terraform](https://www.terraform.io/), i.e. it uses [Terraform modules](https://www.terraform.io/language/modules/develop) to deploy resources using environment-specific configuration. It stores the state data, and outputs that can be used for other deployments.

### Some key features

#### Tharsis API

&#10004; Configurable job executor plugin.

&#10004; Machine to Machine (M2M) authentication with service accounts.

&#10004; Managed identity support to securely authenticate with cloud providers (no credential storage).

&#10004; Users are not required to handle secrets.

&#10004; Compatible with the Terraform CLI remote backend.

&#10004; Ability to quickly cancel jobs.

&#10004; Support for uploading and downloading Terraform modules.

&#10004; Written in [The Go Programming Language](https://go.dev/).

#### Tharsis UI

&#10004; Modern and user-friendly access to group, workspace management, access control, etc.

&#10004; Ability to trigger runs, view live logs, all with GraphQL subscriptions and WebSockets to provide event driven UI updates.

#### Tharsis CLI

&#10004; A command language that interfaces with Tharsis remote Terraform backend.

&#10004; Supports both SSO and service account based authentication.

&#10004; Ready for use in CI/CD pipeline.

&#10004; Written in [The Go Programming Language](https://go.dev/) and available for all major platforms.
