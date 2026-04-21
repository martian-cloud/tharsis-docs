---
title: CLI Deployments
description: "Deploying Terraform modules using the Tharsis CLI"
keywords:
  [
    tharsis,
    CLI deployments,
    terraform apply,
    terraform plan,
    remote modules,
    local modules,
  ]
---

The Tharsis CLI provides flags for deploying Terraform modules directly from the command line. You can deploy from a local directory or a remote module source.

:::tip
You can also manage deployments via AI assistants using the CLI's built-in [MCP server](../cli/tharsis/mcp.md).
:::

## Local modules

Upload and apply a local Terraform configuration directory:

```shell title="Apply a local module"
tharsis apply -directory-path /path/to/terraform/config my-group/my-workspace
```

## Remote modules

Deploy a module from a registry without writing Terraform configuration locally. This works with the [plan](../cli/tharsis/commands.md#plan-command), [apply](../cli/tharsis/commands.md#apply-command), and [destroy](../cli/tharsis/commands.md#destroy-command) commands.

```shell title="Plan a remote module"
tharsis plan \
  -module-source https://registry.example.com/org/network/aws \
  -module-version "2.3.0" \
  my-group/my-workspace
```

```shell title="Apply a remote module"
tharsis apply \
  -module-source https://registry.example.com/org/network/aws \
  -module-version "2.3.0" \
  -auto-approve \
  my-group/my-workspace
```

```shell title="Destroy resources from a remote module"
tharsis destroy \
  -module-source https://registry.example.com/org/network/aws \
  -module-version "2.3.0" \
  -auto-approve \
  my-group/my-workspace
```

For private registries, pass the credential token as an environment variable:

```shell title="Apply from a private registry"
tharsis apply \
  -env-var "TF_TOKEN_registry_example_com=<access_token>" \
  -module-source https://registry.example.com/org/network/aws \
  -module-version "2.3.0" \
  my-group/my-workspace
```

See [Module Sources](module_sources.md) for details on registry authentication.

## Flags

| Flag              | Description                                                                         | Required |
| ----------------- | ----------------------------------------------------------------------------------- | -------- |
| `-directory-path` | Path to a local Terraform configuration directory. Conflicts with `-module-source`. | No       |
| `-module-source`  | URI to a remote module. Conflicts with `-directory-path`.                           | No       |
| `-module-version` | Module version. Defaults to latest.                                                 | No       |
| `-env-var`        | Environment variable as a `key=value` pair. Can be specified multiple times.        | No       |
| `-env-var-file`   | Path to a file containing environment variables.                                    | No       |
| `-tf-var`         | Terraform variable as a `key=value` pair. Can be specified multiple times.          | No       |
| `-tf-var-file`    | Path to a `.tfvars` file. Supports HCL variables.                                   | No       |
| `-auto-approve`   | Skip the confirmation prompt and automatically apply after planning.                | No       |

:::info don't forget the managed identity!
If deploying to AWS or Azure, be sure to [assign a managed identity](../guides/managed_identities.md#assign-a-managed-identity) to the target workspace!
:::
