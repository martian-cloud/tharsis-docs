---
title: Usage Guide
description: "Using Terraform CLI with Tharsis"
---

In addition to the [Tharsis CLI](../tharsis/intro.md), the [Terraform CLI](https://www.terraform.io/cli) can be used with Tharsis as well.

:::info
Please refer to the [Terraform CLI documentation](https://www.terraform.io/cli) for the latest information.
:::

### Login

```shell title="Authenticate using the Tharsis API's hostname"
terraform login api.tharsis.example.com
```

### Configure the provider

The Terraform backend must be configured so it can communicate with Tharsis.

```hcl showLineNumbers title="Sample module.tf provider configuration"
terraform {
  backend "remote" {
    hostname     = "api.tharsis.example.com" # API Endpoint
    organization = "top-level.bottom-level"  # Existing group's path with '/' as '.'
    workspaces {
      name = "demo" # Workspace name
    }
  }
}
```

> Replace `hostname`, `organization`, and `workspace.name` with appropriate values. Please refer to the code comments.

### Initialize the backend

Once the Terraform module has been completed, initialize the module and then _optionally_ validate it.

```shell showLineNumbers
cd <directory containing module>
terraform init     # Creates the workspace at the specified group.
terraform validate # Optional, although recommended.
```

:::info
If the `backend` configuration changes, running `terraform init -reconfigure` might be necessary.
:::

### Create a speculative plan

```shell
terraform plan
```

> If the configuration was correct, Terraform should display job logs and exit with a message <span style={{ color: 'aqua' }}>Uploaded plan output to object store</span>.

:::info important
Before deploying to AWS or Azure, a managed identity must be created. Learn [more](../../guides/overviews/managed_identities.md#create-a-managed-identity).
:::

