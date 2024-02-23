---
title: Getting Started
description: "Getting started with the Tharsis CLI"
---

### What is the Tharsis CLI?

The Tharsis CLI is a command-line interface to the Tharsis remote Terraform backend.

While many features are available in the Tharsis UI, creating runs from Terraform modules, module registry, running in a CI/CD pipeline, etc. are all done with the CLI.

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

---

### Authentication methods

- The CLI supports two authentication methods:
  1. [Single Sign-On (SSO)](https://en.wikipedia.org/wiki/Single_sign-on)
  2. [Service account](../../guides/overviews/service_accounts.md)

#### Single Sign-On (SSO)

SSO authentication is meant to be used by human users interacting with Tharsis.

- When using SSO the CLI...
  1. temporarily opens up a web browser session.
  2. gets a token from the configured sign-in provider via a callback server.
  3. stores that in the settings file.
  4. uses the token to authenticate against the Tharsis API.

:::caution
The token must be periodically renewed via the SSO process.  
It is recommended that the token be renewed before running a long job to avoid expiration mid-run.
:::

#### Service account

Service account is meant to be used for Machine to Machine (M2M) authentication like a CI/CD pipeline.

- The CLI expects three environment variables:
  - `THARSIS_SERVICE_ACCOUNT_PATH`
    - **Required**.
    - The full path to the service account within Tharsis.
  - `THARSIS_SERVICE_ACCOUNT_TOKEN`
    - **Required**.
    - The token to be used for authentication.
    - Must satisfy the `boundClaims` you set in `oidcTrustPolicies` when service account was created.
  - `THARSIS_ENDPOINT`
    - **Optional**.
    - The full URI to the Tharsis API instance. If empty, uses default.

:::info important
Environment variables for service accounts take precedence over SSO authentication.
:::

### Profiles

The CLI includes profile system making it possible to easily switch back-and-forth between different Tharsis instances.

Each profile has its own name, the Tharsis API URL and state token from the SSO process, all stored in the settings file.

:::info
The profile is a global option meaning a user can simply switch to another profile with just an option!
:::

### Frequently asked questions (FAQ)

#### Is it possible to use Terraform CLI with Tharsis?

Yes. Terraform CLI is compatible with Tharsis, although, it will only provide a subset of the features that the Tharsis CLI offers. Learn [more](../terraform/usage.md).
