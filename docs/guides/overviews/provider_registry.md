---
title: Terraform Provider Registry
description: "All about the Tharsis Terraform Provider Registry"
---

Tharsis Terraform Provider Registry offers a central place to publish, version, and share Terraform providers with your community.

### What are Terraform Providers?

[Terraform Providers](https://developer.hashicorp.com/terraform/language/providers) are plugins that interact with other services and they can be imported into [Terraform Modules](module_registry.md#what-are-terraform-modules).

:::tip did you know?

The Tharsis Terraform Provider is readily available at the [Terraform Registry](https://registry.terraform.io/providers/martian-cloud/tharsis/latest) and allows interacting with the Tharsis API.

See our [Getting Started](/docs/provider/intro.md) guide!

:::

### Upload a Terraform provider

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

   a. `GPG_PASSPHRASE` can be empty string if your GPG key has no passphrase.

   b. For `GPG_FINGERPRINT`, do `gpg --list-keys --fingerprint` and copy the string of HEX digits (and spaces) after the `pub` line.

5. Run this command: `goreleaser release --snapshot --rm-dist`

6. Make sure your GPG key exists in Tharsis. Add it as a new group-level GPG key if necessary:

   a. In the Tharsis UI, go to the group where you want to add the GPG key.

   b. Click on `GPG Keys` in the left sidebar.

   c. Click on <span style={{ color: '#4db6ac' }}>`NEW GPG KEY`</span> in the upper right-hand corner.

   d. Paste in your ASCII armored public key block from step 1.

   e. Click on <span style={{ color: '#4db6ac' }}>`CREATE KEY`</span>.

7. The first time you upload a provider with a given name, one time, run a command similar to the following:

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
- Reduced likelihood of being rate limited by an upstream repository

To configure the network mirror feature via the Tharsis CLI, do something similar to

```tharsis terraform-provider-mirror sync --group-path example-group registry.terraform.io/hashicorp/aws```

See [CLI terraform-provider-mirror command](/cli/tharsis/commands#terraform-provider-mirror-command) for more information about that CLI command.

Additional detail about using a network mirror can be found here: https://servian.dev/terraform-local-providers-and-registry-mirror-configuration-b963117dfffa

For example from the above page, to configure the actual network mirror, put something similar to this in the Terraform CLI configuration file

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
