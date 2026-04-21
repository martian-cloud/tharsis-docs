---
title: Getting Started
description: "Getting started with the Tharsis CLI"
keywords:
  [tharsis CLI, commands, authentication, SSO, service account, profiles]
---

## What is the Tharsis CLI?

The Tharsis CLI is a command-line interface to the Tharsis remote Terraform backend. It communicates directly with the Tharsis API via gRPC.

For installation instructions, see the [CLI setup guide](/docs/setup/cli.md).

:::note SDK Deprecation
The [Tharsis SDK for Go](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-sdk-go) is deprecated. The CLI now uses the gRPC [client package](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-api/-/tree/main/pkg/client) from the Tharsis API directly.
:::

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

---

## Authentication methods

- The CLI supports two authentication methods:
  1. [Single Sign-On (SSO)](https://en.wikipedia.org/wiki/Single_sign-on)
  2. [Service account](../../guides/service_accounts.md)

### Single Sign-On (SSO)

SSO authentication is meant to be used by human users interacting with Tharsis.

- When using SSO, the CLI:
  1. Temporarily opens up a web browser session.
  2. Gets a token from the configured sign-in provider via a callback server.
  3. Stores that in the credentials file.
  4. Uses the token to authenticate against the Tharsis API via gRPC.

:::caution
The token must be periodically renewed via the SSO process.  
It is recommended that the token be renewed before running a long job to avoid expiration mid-run.
:::

### Service account

A service account is meant to be used for Machine to Machine (M2M) authentication like a CI/CD pipeline.

- The CLI expects the following environment variables:
  - `THARSIS_SERVICE_ACCOUNT_ID`
    - **Required**.
    - The ID or TRN of the service account within Tharsis (e.g., `trn:service_account:my-group/my-sa`).
  - `THARSIS_SERVICE_ACCOUNT_TOKEN`
    - **Required**.
    - The OIDC token to be used for authentication.
    - Must satisfy the `boundClaims` you set in `oidcTrustPolicies` when the service account was created.

:::note
`THARSIS_SERVICE_ACCOUNT_PATH` is deprecated but still supported for backwards compatibility. It cannot be used together with `THARSIS_SERVICE_ACCOUNT_ID`.
:::

- Alternatively, a static token can be supplied via:
  - `THARSIS_STATIC_TOKEN`
    - A pre-existing authentication token (e.g., from an SSO login).

:::info important
Environment variables for service accounts take precedence over SSO authentication.
:::

## Profiles

The CLI includes a profile system making it possible to easily switch back and forth between different Tharsis instances.

Each profile has its own name, the Tharsis API URL, and state token from the SSO process. Profile settings are stored in a settings file, while tokens are stored separately in a credentials file for security.

Switch profiles using the `-p` global option or the `THARSIS_PROFILE` environment variable:

```shell
tharsis -p production workspace list
```

```shell
export THARSIS_PROFILE=production
tharsis workspace list
```

:::info
The `-p` flag takes precedence over the `THARSIS_PROFILE` environment variable. If neither is set, the `default` profile is used.
:::

## Environment variables

| Variable          | Description                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| `THARSIS_PROFILE` | Sets the active profile. Overridden by the `-p` flag.                                            |
| `THARSIS_CLI_LOG` | Sets the log level for debugging (e.g., `debug`, `info`, `warn`, `error`). Defaults to off.      |
| `NO_COLOR`        | Disables colored output when set to any non-empty value. Also available as the `-no-color` flag. |

## Resource identifiers

CLI commands accept both Global IDs and TRNs as resource identifiers. Global IDs are stable across renames and moves, while TRNs provide a human-readable way to reference resources by type and path — avoiding ambiguity between resource types that share similar path structures. See [Resource Identifiers](../../guides/resource_identifiers.md) for details on each format.

```shell title="Using a TRN"
tharsis workspace get trn:workspace:my-group/my-workspace
```

```shell title="Using a Global ID"
tharsis workspace get V1NfZjA5OWVkMmQtNDZmMS00ZmYw...
```

## Shell autocomplete

The CLI supports shell autocompletion for commands and flags. To enable it:

```shell
tharsis -enable-autocomplete
```

To disable it:

```shell
tharsis -disable-autocomplete
```

## Frequently asked questions (FAQ)

### Is it possible to use Terraform CLI with Tharsis?

Yes. Terraform CLI is compatible with Tharsis, although it will only provide a subset of the features that the Tharsis CLI offers. Learn [more](../terraform/usage.md). You can also run Terraform commands directly through the Tharsis CLI using the `tf-exec` subcommand — see the [command reference](commands.md#tf-exec-command).
