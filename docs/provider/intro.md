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

### Using a Terraform Provider Network Mirror

The Tharsis API implements the Provider Network Mirror Protocol and can function as a network mirror: https://developer.hashicorp.com/terraform/internals/provider-network-mirror-protocol

Using the Tharsis API as a network mirror can have the following advantages:
- Reduced network latency
- Increased network throughput
- Reduced likelihood of being rate limited by an upstream repository

To configure the network mirror feature via the Tharsis CLI, do something similar to

```tharsis terraform-provider-mirror sync --group-path test registry.terraform.io/hashicorp/aws```

See [CLI terraform-provider-mirror command](../../cli/tharsis/commands/#terraform-provider-mirror-command) for more information about that CLI command.

Additional detail about using a network mirror can be found here: https://servian.dev/terraform-local-providers-and-registry-mirror-configuration-b963117dfffa

For example from the above page, to configure the actual network mirror, put something similar to this in the CLI configuration file

```
provider_installation {
  network_mirror {
    url = "https://tharsis.example.io/v1/provider-mirror/providers/example-root-group/"
  }
}

credentials "tharsis.example.io" {
  token = "..."
}
```

(The credentials block should only be necessary when using a service account.)

and something similar to this in a relevant HCL file:

```
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.66.0"
    }
  }
}
```
