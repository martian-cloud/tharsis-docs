---
title: Module Sources
description: "Using Tharsis and third-party module registries"
keywords:
  [
    tharsis,
    module sources,
    private registry,
    terraform registry,
    TF_TOKEN,
    authentication,
  ]
---

Tharsis supports deploying Terraform modules from its own built-in registry and any third-party registry that adheres to the [Terraform Module Registry Protocol](https://www.terraform.io/internals/module-registry-protocol).

## Tharsis module registry

Workspaces can reference modules from Tharsis's own [module registry](../guides/module_registry.md) directly in Terraform configuration:

```hcl title="main.tf"
module "vpc" {
  source  = "<tharsis-hostname>/my-group/vpc/aws"
  version = "1.0.0"
}
```

No additional authentication is needed — Tharsis automatically handles credentials for its own registry when running plans and applies.

## Third-party registries

### Authentication

Private registries require a credential token. Tharsis uses the standard Terraform `TF_TOKEN_*` environment variable format:

```
TF_TOKEN_<domain_name>=<access_token>
```

The domain name uses underscores in place of dots and hyphens. For example:

| Registry domain        | Environment variable            |
| ---------------------- | ------------------------------- |
| `registry.example.com` | `TF_TOKEN_registry_example_com` |
| `app.terraform.io`     | `TF_TOKEN_app_terraform_io`     |

Learn more about [Terraform credential environment variables](https://www.terraform.io/cli/config/config-file#environment-variable-credentials).

### Usage

Reference a private registry module in your Terraform config:

```hcl title="main.tf"
module "network" {
  source  = "registry.example.com/org/network/aws"
  version = "2.3.0"
}
```

Set the token as a workspace environment variable so it persists across runs:

1. Navigate to the workspace in the UI.
2. Go to the **Variables** tab.
3. Add an environment variable with the key `TF_TOKEN_registry_example_com` and the access token as the value. Mark it as **sensitive** to prevent it from being displayed in the UI or logs.

Alternatively, you can pass the token during a CLI run using the `-env-var` flag without storing it in the workspace:

```shell
tharsis apply -env-var "TF_TOKEN_registry_example_com=<access_token>" my-group/my-workspace
```

This approach works for both CLI-triggered and VCS-driven runs.

## Troubleshooting

### `failed to resolve module source`

This typically means Tharsis couldn't reach the registry or authenticate with it.

- Check that the `TF_TOKEN_*` variable name exactly matches the registry domain (dots and hyphens become underscores). A typo like `TF_TOKEN_registry_example_com` vs `TF_TOKEN_registry_exmple_com` will silently fail.
- If using a sensitive workspace variable, verify it hasn't been accidentally overwritten or deleted — sensitive values are only visible to users with sufficient permissions.
- If passing the token via `-env-var` on the CLI, make sure the value isn't being shell-expanded or truncated (wrap in quotes).
- For self-hosted registries, confirm the registry is reachable from the Tharsis runner executing the job.
- If using a private module from Tharsis's own registry, the module must be either public or within the workspace's group hierarchy. The job executor can only access modules available in its hierarchy.

### `must supply either configuration version ID or module source`

A run was created without specifying how to get the Terraform configuration. Either upload a configuration via `-directory-path` or specify a `-module-source`.

### `module version is not allowed without module source`

The `-module-version` flag was used without `-module-source`. Version pinning only applies to remote modules.

### `workspace's current state version was either not created by a module source or a different module source than expected`

The workspace has a module attestation rule with **verify state lineage** enabled. This means the workspace only accepts applies from the same module source that created the current state. If you're switching module sources, the attestation rule needs to be updated or removed first.

### Run succeeds but Terraform shows `401` or `403` during init

Terraform itself is failing to download the module during `terraform init`. This is separate from Tharsis's module resolution.

- The `TF_TOKEN_*` variable must be set as an **environment** variable, not a Terraform variable.
- Verify the token has the correct scopes/permissions for the registry.
- If the registry uses IP allowlisting, ensure the runner's IP is permitted.
