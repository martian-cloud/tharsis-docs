---
title: Getting Started
description: "Using the Tharsis Terraform Provider"
keywords:
  [tharsis, terraform provider, workspace outputs, HCL, infrastructure as code]
---

The [Tharsis Terraform Provider](https://github.com/martian-cloud/terraform-provider-tharsis) allows you to interact with Tharsis resources directly from your Terraform configuration. The primary use case is reading workspace outputs to share data between workspaces. Full documentation is available on the [Terraform Registry](https://registry.terraform.io/providers/martian-cloud/tharsis/latest).

## Provider configuration

Add the provider to your `required_providers` block:

```hcl showLineNumbers title="main.tf"
terraform {
  required_providers {
    tharsis = {
      source  = "registry.terraform.io/martian-cloud/tharsis"
      version = "0.15.1"
    }
  }
}

provider "tharsis" {}
```

When running inside a Tharsis workspace, the provider is automatically configured by the job executor — no `host` or `static_token` needed.

### Running outside Tharsis

When running outside of Tharsis (e.g. locally), you must provide the API endpoint and a token:

```hcl showLineNumbers title="Provider with explicit configuration"
provider "tharsis" {
  host         = "https://api.tharsis.example.com"
  static_token = var.tharsis_token
}
```

These can also be set via environment variables:

| Environment Variable   | Description                                |
| ---------------------- | ------------------------------------------ |
| `THARSIS_ENDPOINT`     | The Tharsis API URL.                       |
| `THARSIS_STATIC_TOKEN` | The static token to use with the provider. |

:::note
Provider block values take precedence over environment variables.
:::

## Retrieving workspace outputs

The most common use case is sharing outputs between workspaces. Tharsis provides two data sources for this:

- `tharsis_workspace_outputs` — returns outputs as strings
- `tharsis_workspace_outputs_json` — returns outputs as JSON strings (for complex types)

### String outputs

```hcl showLineNumbers title="Read outputs from another workspace"
data "tharsis_workspace_outputs" "network" {
  path = "infrastructure/networking/vpc"
}

resource "aws_instance" "app" {
  subnet_id = data.tharsis_workspace_outputs.network.outputs.subnet_id
}
```

### JSON outputs

For outputs that contain objects, lists, or maps, use the JSON data source with [`jsondecode`](https://www.terraform.io/language/functions/jsondecode):

```hcl showLineNumbers title="Read JSON outputs from another workspace"
data "tharsis_workspace_outputs_json" "network" {
  path = "infrastructure/networking/vpc"
}

locals {
  subnets = jsondecode(data.tharsis_workspace_outputs_json.network.outputs.subnet_ids)
}
```

### Relative paths

When running inside a Tharsis workspace, you can use relative paths to reference sibling workspaces:

```
group/
├── networking/
│   └── vpc          ← source workspace
└── compute/
    └── app          ← current workspace
```

```hcl title="Relative path from app to vpc"
data "tharsis_workspace_outputs" "network" {
  path = "../networking/vpc"
}
```

### Data source attributes

| Name               | Type          | Required  | Description                                     |
| ------------------ | ------------- | --------- | ----------------------------------------------- |
| `path`             | String        | Yes       | Path of the workspace to retrieve outputs from. |
| `full_path`        | String        | Read-only | Full path of the resolved workspace.            |
| `outputs`          | Map of String | Read-only | The workspace outputs.                          |
| `state_version_id` | String        | Read-only | ID of the workspace's current state version.    |
| `workspace_id`     | String        | Read-only | ID of the workspace.                            |
