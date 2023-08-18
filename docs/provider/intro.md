---
title: Getting started
description: "Using Tharsis Terraform Provider"
---

### What is the Tharsis Terraform Provider?

[Tharsis Terraform Provider](https://github.com/martian-cloud/terraform-provider-tharsis) provides a way to represent some of Tharsis' functionalities using Terraform.

### Using the provider

To use this provider, you must add the provider definition to your configuration. You can use either a static token or service account for authentication.

#### Static token

```hcl showLineNumbers
provider "tharsis" {}
```

<details><summary>Expand for explanation</summary>

|           Name | Type   | Definition                                                           |
| -------------: | ------ | -------------------------------------------------------------------- |
|         `host` | string | Hostname for the Tharsis API (e.g. https://api.tharsis.example.com). |
| `static_token` | string | Static token for authenticating with the Tharsis API.                |

:::note
`host` and `static_token` are set automatically by the job executor. However, they are required when running outside Tharsis.
:::

Alternatively, you can provide these values by environment variables.

|   Environment Variable | Definition                                 |
| ---------------------: | ------------------------------------------ |
|     `THARSIS_ENDPOINT` | The host for Tharsis.                      |
| `THARSIS_STATIC_TOKEN` | The static token to use with the provider. |

:::info important
The `provider` block values take precedence over environment variables. It is **recommended** to use configuration values to define the provider over environment variables, especially if you are defining the provider more than once.

:::

</details>

### Retrieving workspace outputs

`tharsis_workspace_outputs` data source is used to retrieve outputs from workspace under a given path.

<details><summary>Terraform module for retrieving outputs from another workspace</summary>

```hcl showLineNumbers
terraform {
  required_providers {
    tharsis = {
      source = "registry.terraform.io/martian-cloud/tharsis"
    }
  }
}

provider "tharsis" {}

data "tharsis_workspace_outputs" "this" {
  path = "group/sub-group/workspace"
}

# When running via a Tharsis executor, in a workspace,
# the path can be relative to the workspace.
#
# For instance, if you had the following structure where
# you are operating from myworkspace:
#   group
#   |- sub-group
#   |--|- workspace
#   |--my-group
#   |--|- myworkspace  <- this is the current workspace
#
#  You can access `workspace` relative to your `myworkspace`
#  by using the relative path `../sub-group/workspace`
#
# data "tharsis_workspace_outputs" "this" {
#   path = "../sub-group/workspace"
# }

output "str" {
  value = data.tharsis_workspace_outputs.this.outputs.output_name
}
```

<details><summary>Expand for explanation</summary>

|               Name | Read-Only |     Type      | Required | Description                                         |
| -----------------: | :-------: | :-----------: | :------: | --------------------------------------------------- |
|             `path` |     -     |    String     |   Yes    | The path of the workspace to retrieve outputs.      |
|        `full_path` |    Yes    |    String     |    -     | The full path of the workspace.                     |
|          `outputs` |    Yes    | Map of String |    -     | The outputs of the workspace specified by the path. |
| `state_version_id` |    Yes    |    String     |    -     | The ID of the workspace's current state version.    |
|     `workspace_id` |    Yes    |    String     |    -     | The ID of the workspace.                            |

</details>

</details>

<details><summary>Terraform module for retrieving JSON outputs from another workspace</summary>

```hcl showLineNumbers
terraform {
  required_providers {
    tharsis = {
      source = "registry.terraform.io/martian-cloud/tharsis"
    }
  }
}

provider "tharsis" {}

data "tharsis_workspace_outputs_json" "this" {
  path = "group/sub-group/workspace"
}

# When running via a Tharsis executor, in a workspace,
# the path can be relative to the workspace.
#
# For instance, if you had the following structure where
# you are operating from myworkspace:
#   group
#   |- sub-group
#   |--|- workspace
#   |--my-group
#   |--|- myworkspace  <- this is the current workspace
#
#  You can access `workspace` relative to your `myworkspace`
#  by using the relative path `../sub-group/workspace`
#
# data "tharsis_workspace_outputs" "this" {
#   path = "../sub-group/workspace"
# }

output "object" {
  value = jsondecode(data.tharsis_workspace_outputs_json.this.outputs.object)
}
```

<details><summary>Expand for explanation</summary>

[`jsondecode`](https://www.terraform.io/language/functions/jsondecode) maps JSON values to [Terraform language values](https://www.terraform.io/language/expressions/types).

|               Name | Read-Only |     Type      | Required | Description                                         |
| -----------------: | :-------: | :-----------: | :------: | --------------------------------------------------- |
|             `path` |     -     |    String     |   Yes    | The path of the workspace to retrieve outputs.      |
|        `full_path` |    Yes    |    String     |    -     | The full path of the workspace.                     |
|          `outputs` |    Yes    | Map of String |    -     | The outputs of the workspace specified by the path. |
| `state_version_id` |    Yes    |    String     |    -     | The ID of the workspace's current state version.    |
|     `workspace_id` |    Yes    |    String     |    -     | The ID of the workspace.                            |

</details>

</details>
