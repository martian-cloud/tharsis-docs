---
title: Resource Identifiers
description: "Understanding Global IDs and Tharsis Resource Names (TRNs)"
---

Tharsis uses two types of identifiers to reference resources: Global IDs and Tharsis Resource Names (TRNs).

## Global IDs

Global IDs are unique identifiers assigned to every resource. They are base64-encoded strings containing a type prefix and UUID:

```
U0FfZjA5OWVkMmQtNDZmMS00ZmYwLTkyYmItZjAyOTYwNmFjYTVj
↓ base64 decode
SA_f099ed2d-46f1-4ff0-92bb-f029606aca5c
```

The type prefix (e.g., `SA_` for service account, `R_` for run) is internal—treat Global IDs as opaque strings.

:::info
Global IDs and TRNs are typically found in the `metadata` object of API responses, or sometimes at the top level of a resource.
:::

**Use Global IDs when:**

- You have a reference from a previous API call
- Storing references in external systems
- The resource path might change

## Tharsis Resource Names (TRNs)

TRNs are human-readable identifiers that encode the resource type and path:

```
trn:TYPE:PATH
```

**Use TRNs when:**

- You know the resource path but don't have the Global ID
- Writing scripts or configuration files
- Running CLI commands

:::info
For nested resources like runs and jobs, the final path segment is the resource's Global ID. For example: `trn:run:my-org/my-workspace/Ul83MWQ...`
:::

### Supported Types

| Type                          | Path Format                                | Example                                                          |
| ----------------------------- | ------------------------------------------ | ---------------------------------------------------------------- |
| `group`                       | `parent/child`                             | `trn:group:infrastructure/production`                            |
| `workspace`                   | `group-path/workspace-name`                | `trn:workspace:infrastructure/production/web-app`                |
| `run`                         | `workspace-path/run-id`                    | `trn:run:infra/prod/web-app/Ul83MWQ...`                          |
| `plan`                        | `workspace-path/plan-id`                   | `trn:plan:infra/prod/web-app/UGxhbl8...`                         |
| `apply`                       | `workspace-path/apply-id`                  | `trn:apply:infra/prod/web-app/QXBwbH...`                         |
| `job`                         | `workspace-path/job-id`                    | `trn:job:infra/prod/web-app/Sm9iXzE...`                          |
| `state_version`               | `workspace-path/state-version-id`          | `trn:state_version:infra/prod/web-app/U1ZfMT...`                 |
| `configuration_version`       | `workspace-path/config-version-id`         | `trn:configuration_version:infra/web-app/Q1ZfMT...`              |
| `managed_identity`            | `group-path/identity-name`                 | `trn:managed_identity:infrastructure/aws-deploy`                 |
| `service_account`             | `group-path/service-account-name`          | `trn:service_account:infrastructure/ci-runner`                   |
| `terraform_module`            | `group-path/module-name/system`            | `trn:terraform_module:infra/vpc/aws`                             |
| `terraform_module_version`    | `group-path/module-name/system/version`    | `trn:terraform_module_version:infra/vpc/aws/1.0.0`               |
| `terraform_provider`          | `group-path/provider-name`                 | `trn:terraform_provider:infrastructure/custom`                   |
| `terraform_provider_version`  | `group-path/provider-name/version`         | `trn:terraform_provider_version:infra/custom/1.0.0`              |
| `terraform_provider_platform` | `group-path/provider-name/version/os_arch` | `trn:terraform_provider_platform:infra/custom/1.0.0/linux_amd64` |
| `runner`                      | `group-path/runner-name`                   | `trn:runner:infrastructure/shared-runner`                        |
| `variable`                    | `namespace-path/variable-name`             | `trn:variable:infra/prod/web-app/api_key`                        |
| `vcs_provider`                | `group-path/vcs-provider-name`             | `trn:vcs_provider:infrastructure/github`                         |

## Which to Use?

| Scenario                      | Recommended |
| ----------------------------- | ----------- |
| Storing references long-term  | Global ID   |
| Scripts with known paths      | TRN         |
| Following up on API responses | Global ID   |
| Human-readable configuration  | TRN         |
| Resources that might be moved | Global ID   |

:::tip
Most Tharsis APIs and tools accept either format. Use whichever is more convenient for your use case.
:::
