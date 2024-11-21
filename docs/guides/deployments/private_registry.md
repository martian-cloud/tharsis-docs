---
title: Private Registries
description: "Guide to deploying from module sources"
---

In addition to using local modules, Tharsis also supports deploying them from a third-party Terraform registry. It supports any registry that adheres to the [Terraform Module Registry Protocol](https://www.terraform.io/internals/module-registry-protocol).

## Using the [Tharsis CLI](../../cli/tharsis/intro.md#what-is-the-tharsis-cli)

The CLI includes some built-in flags which make deploying remote Terraform modules possible. The same is possible with the [destroy command](../../cli/tharsis/commands.md#destroy-command).

### [Apply](../../cli/tharsis/commands.md#apply-command) command

```shell title="Apply a remote Terraform module in workspace hero"
tharsis apply \
  --env-var "TF_TOKEN_<example_com>=<access_token>" \
  --module-source https://example.com/some-module \
  --module-version "2.3.2" \
  --auto-approve \
  top-level/mid-level/hero
```

<details>
<summary>Expand for explanation</summary>

- `--tf-var` and `--env-var`: quickly allow creating simple `key=value` Terraform and environment variable pairs respectively. Use `--tf-var-file` or `--env-var-file` for [variable files](https://www.terraform.io/language/configuration-0-11/variables#variable-files) which also support HCL Terraform variables. Optional.

- `--module-source`: URI to the module. Required for module source, optional otherwise.

- `--module-version`: module version, defaults to the latest. Optional.

- `--auto-approve`: bypass the need to confirm changes to the Terraform configuration and automatically run the apply stage after planning is complete. Optional.

</details>

:::note
Tharsis expects the `TF_TOKEN_<domain_name>=<access_token>` environment variable to authenticate with the private registry. Learn [more](https://www.terraform.io/cli/config/config-file#environment-variable-credentials).
:::

:::info don't forget the managed identity!
If deploying to AWS or Azure, be sure to [assign a managed identity](../overviews/managed_identities.md#assign-a-managed-identity) to the target workspace!
:::
