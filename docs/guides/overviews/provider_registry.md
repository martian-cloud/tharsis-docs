---
title: Terraform Provider Registry
description: "All about the Tharsis Terraform Provider Registry"
---

Tharsis Terraform Provider Registry offers a central place to publish, version, and share Terraform providers with your community.

### What are Terraform Providers?

[Terraform Providers](https://developer.hashicorp.com/terraform/language/providers) are plugins that interact with other services and can be imported into [Terraform Modules](module_registry.md#what-are-terraform-modules).

:::tip Did you know?

The Tharsis Terraform Provider is readily available at the [Terraform Registry](https://registry.terraform.io/providers/martian-cloud/tharsis/latest) and allows interacting with the Tharsis API.

See our [Getting Started](/docs/provider/intro.md) guide!

:::

### Provider Addresses

Tharsis adheres to the [Terraform Provider Registry](https://developer.hashicorp.com/terraform/internals/provider-registry-protocol)'s format for provider addresses. A provider address is a string that uniquely identifies a provider within a registry's namespace.

The format is:

```
<hostname>/<namespace>/<type>
```

| Component   | Description                                                                                                                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `hostname`  | The hostname of the registry. For example, `registry.terraform.io`.                                                                                                                                                            |
| `namespace` | The namespace of the provider. For Tharsis, this is the path to an existing group like `networking/operations`.                                                                                                                |
| `type`      | The type of the provider like `aws`, `random`, `azurerm`, etc. It's unique within a hostname and namespace and may only contain digits, lowercase letters with a hyphen or an underscore in non-leading or trailing positions. |

For example:

```
tharsis.example.io/networking/bitbucket
```

This is the hypothetical address for the Bitbucket provider in the `networking` group on the `tharsis.example.io` registry.

:::note
After creation, the provider source will only show the top-level group path, instead of the full source. For example, `networking/operations/bitbucket` will be displayed as `networking/bitbucket`. This is to match the Terraform Provider Registry's address format. The `type` must be unique within a namespace.
:::

### Provider Versions

A provider version is a specific release of a provider. Each version is identified by a version string, which is a sequence of numbers separated by periods, such as `1.0.0`. We support the [Semantic Versioning 2.0](https://semver.org/spec/v2.0.0.html) specification.

### Provider Usage

To use a provider in a Terraform configuration, you must specify the provider's source in the `required_providers` block. The `source` argument is the provider address and the `version` argument is the semver version string.

```hcl showLineNumbers title="Using a provider in a Terraform configuration"
terraform {
  required_providers {
    bitbucket = {
      source  = "tharsis.example.io/networking/bitbucket"
      version = "1.0.0"
    }
  }
}

provider "bitbucket" {
  # Configuration options
}
```

:::tip
You can always locate the usage example for any provider version in the Tharsis UI by clicking on the `How to Use` tab in the provider version details page.
:::

### Upload a Terraform Provider

1. If you don't already have a GPG key, create one by executing something similar to these commands:

   ```shell title="Create a GPG key" showLineNumbers
   gpg --gen-key --armor
   gpg --export --armor > some-file
   ```

2. Create a `.goreleaser.yml` file. An example is provided in our [Terraform Provider Tharsis repository](https://raw.githubusercontent.com/martian-cloud/terraform-provider-tharsis/main/.goreleaser.yml).

3. Optionally, modify the `signs` section of the `.goreleaser.yml` file to avoid needing to import the GPG key:

   a. Remove the `--batch` option.

   b. In place of that option, add the following:

   ```shell showLineNumbers
   --passphrase
   {{ .Env.GPG_PASSPHRASE }}
   --pinentry-mode=loopback
   ```

4. Set environment variables `GPG_PASSPHRASE` and `GPG_FINGERPRINT` appropriately.

   a. `GPG_PASSPHRASE` can be an empty string if your GPG key has no passphrase.

   b. For `GPG_FINGERPRINT`, do `gpg --list-keys --fingerprint` and copy the string of HEX digits (and spaces) after the `pub` line.

5. Run this command: `goreleaser release --snapshot --rm-dist`

6. Make sure your GPG key exists in Tharsis. Add it as a new group-level GPG key if necessary:

   a. In the Tharsis UI, go to the group where you want to add the GPG key.

   b. Click on `GPG Keys` in the left sidebar.

   c. Click on <span style={{ color: '#4db6ac' }}>`NEW GPG KEY`</span> in the upper right-hand corner.

   d. Paste in your ASCII armored public key block from step 1.

   e. Click on <span style={{ color: '#4db6ac' }}>`CREATE KEY`</span>.

7. The first time you upload a provider with a given name, run a command similar to the following:

   ```shell
   tharsis provider create your-parent-group/provider-name
   ```

8. Run a command similar to the following to upload each new version:

   ```shell
   tharsis provider upload-version \
    --directory-path your-provider-directory \
    your-parent-group/provider-name
   ```

### Using a Terraform Provider Network Mirror

The Tharsis API implements the Provider Network Mirror Protocol and can function as a network mirror: https://developer.hashicorp.com/terraform/internals/provider-network-mirror-protocol

Using the Tharsis API as a network mirror can have the following advantages:

- Reduced network latency
- Increased network throughput
- Reduced likelihood of being rate-limited by an upstream repository

To configure the network mirror feature via the Tharsis CLI, do something similar to

`tharsis terraform-provider-mirror sync --group-path example-group registry.terraform.io/hashicorp/aws`

See [CLI terraform-provider-mirror command](/cli/tharsis/commands#terraform-provider-mirror-command) for more information about that CLI command.

Additional details about using a network mirror can be found here: https://servian.dev/terraform-local-providers-and-registry-mirror-configuration-b963117dfffa

For example, from the above page, to configure the actual network mirror, put something similar to this in the Terraform CLI configuration file:

```
provider_installation {
  network_mirror {
    url = "https://tharsis.example.io/v1/provider-mirror/providers/example-group/"
  }
}

credentials "tharsis.example.io" {
  token = "..."
}
```

(The credentials block should only be necessary when using a service account.)

And something similar to this in a relevant HCL file:

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
