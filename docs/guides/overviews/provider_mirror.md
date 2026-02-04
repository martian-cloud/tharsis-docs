---
title: Terraform Provider Mirror
description: "Cache and serve Terraform providers locally"
---

Terraform providers are typically downloaded from their origin registries (such as the public Terraform Registry) each time `terraform init` runs. In enterprise environments, this can introduce challenges with network restrictions, bandwidth usage, or external service reliability.

The Tharsis API implements the [Provider Network Mirror Protocol](https://developer.hashicorp.com/terraform/internals/provider-network-mirror-protocol), allowing it to serve as an alternative installation source for Terraform providers. When configured, Tharsis intercepts provider download requests and serves them from its local cache, regardless of their origin registry.

:::tip Did you know...
When automatic provider caching is enabled, providers are cached automatically during Terraform runs—no manual sync required.
:::

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

---

## Why use a provider mirror?

Using the Tharsis API as a network mirror can have the following advantages:

- Reduced network latency
- Increased network throughput
- Reduced likelihood of being rate-limited by an upstream repository
- Offline access to cached providers when upstream registries are unavailable
- Provider authenticity verification before caching

:::info
Tharsis verifies all providers before caching by validating GPG signatures and SHA256 checksums from the upstream registry. This ensures only authentic, unmodified provider packages are stored in the mirror.

When providers are installed from the mirror, job logs will show `Installed hashicorp/random v3.7.2 (verified checksum)` instead of `Installed hashicorp/random v3.7.2 (signed by HashiCorp)`. This is expected with the network mirror protocol—Terraform receives hashes rather than signing information. The GPG signature verification happens during caching, so providers are fully verified before being stored.
:::

## Enabling Provider Mirroring

Provider mirroring must be enabled on a group or workspace before it takes effect. Once enabled on a group, all subgroups and descendant workspaces inherit the setting automatically. You can also enable it explicitly on individual subgroups or workspaces.

To enable provider mirroring:

1. Navigate to the group or workspace settings
2. Under **Provider Mirror Settings**, enable **Automatic Provider Caching** or select **Inherit from parent group** to use the parent's setting
3. Save the changes

## Automatic Provider Caching

When running Terraform jobs in Tharsis workspaces, providers are automatically cached to the mirror. A local proxy intercepts provider download requests and:

1. **Cached providers**: Returns the package directly from the Tharsis mirror
2. **Uncached providers**: Downloads from the upstream registry, returns to Terraform immediately, and caches asynchronously in the background
3. **Offline fallback**: When upstream registries are unavailable, falls back to cached versions

This means you don't need to manually sync providers before running jobs—they're cached automatically on first use. Providers are cached asynchronously to avoid Terraform's HTTP timeout limitations.

:::info
After `terraform init` completes, you'll see a provider caching summary in the job logs:

```
Provider caching summary...
- Used cached hashicorp/http v3.5.0
- Cached hashicorp/null v3.2.4
- Used cached hashicorp/random v3.8.1
Provider caching has been completed
```

:::

## Manual Provider Sync

To pre-populate the mirror before running jobs, use the CLI sync command:

```shell
tharsis terraform-provider-mirror sync --group-path example-group hashicorp/aws
```

:::tip
The registry hostname is only required if not using the default public Terraform registry (`registry.terraform.io`).
:::

See [CLI terraform-provider-mirror command](/cli/tharsis/commands#terraform-provider-mirror-command) for more information.

## Private Registry Authentication

For private Terraform registries, authentication tokens are resolved differently depending on the context:

### Terraform Jobs (in Tharsis)

1. **Group/workspace variable**: Environment variable named `TF_TOKEN_<hostname>` set on the group or workspace (sensitive variables are supported)
2. **Federated registry**: If the hostname points to another Tharsis instance with a [federated registry](/docs/guides/overviews/federated_registries.md) configured, Tharsis automatically generates an OIDC token

### CLI

1. **Environment variable**: `TF_TOKEN_<hostname>` where periods are replaced with underscores and hyphens with double underscores (e.g., `TF_TOKEN_registry_example_com`)
2. **Federated registry**: Uses the token from the CLI profile matching the provider's hostname

## External Network Mirror Configuration

To use Tharsis as a network mirror from outside of Tharsis workspaces (e.g., local development), configure the Terraform CLI:

```hcl showLineNumbers title="~/.terraformrc or terraform.rc"
provider_installation {
  network_mirror {
    url = "https://tharsis.example.io/v1/provider-mirror/providers/example-group/"
  }
}

credentials "tharsis.example.io" {
  token = "..."
}
```

:::note
The credentials block is only necessary when using a service account or accessing from outside Tharsis.
:::

Then reference providers normally in your Terraform configuration:

```hcl showLineNumbers
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.66.0"
    }
  }
}
```

Additional details about using a network mirror can be found in [this Medium article](https://servian.dev/terraform-local-providers-and-registry-mirror-configuration-b963117dfffa).

## Managing Provider Mirrors in the UI

The **Provider Mirrors** tab in the group or workspace sidebar provides a central location to view and manage cached providers.

### Viewing provider mirrors

1. Navigate to a group or workspace
2. Select **Provider Mirrors** from the sidebar
3. The list displays all cached provider versions from the root group's mirror

Use the search box to filter providers by name, namespace, or registry hostname.

:::note
Providers from the default public Terraform registry (`registry.terraform.io`) will not display the registry hostname.
:::

### Viewing version details

Click on any provider version in the list to view its details page. The details page shows:

- Provider address and version
- Creation timestamp and who cached it (hover to see details; a robot icon indicates it was cached by a Terraform job)
- All cached platforms displayed as chips (e.g., `linux/amd64`, `darwin/arm64`)

### Deleting a provider version mirror

Provider version mirrors can only be deleted at the root group level where they were created.

1. Navigate to the root group
2. Select **Provider Mirrors** from the sidebar
3. Click on the provider version to open its details page
4. Click the **Delete Mirror** button at the top
5. Confirm the deletion

:::caution
Deleting a provider version mirror removes all cached platform packages for that version. Subsequent runs will re-download the provider from the upstream registry as needed.
:::

### Deleting individual platform mirrors

To remove a specific platform without deleting the entire version:

1. Open the provider version details page
2. Click the **X** on the platform chip you want to remove
3. Confirm the deletion

This is useful when you need to re-cache a corrupted platform package or remove platforms no longer needed.

## Frequently Asked Questions (FAQ)

### Who can manage provider mirrors?

Owners and deployers can create and delete provider version mirrors. Viewers have read-only access.

### Do I need to manually sync providers before running jobs?

No. When automatic provider caching is enabled, providers are cached automatically on first use during Terraform jobs.

### What happens if the upstream registry is unavailable?

If the upstream registry is unavailable, Tharsis falls back to cached versions in the provider mirror. This allows jobs to continue running with previously cached providers.

### Can I use providers from private registries?

Yes. For Terraform jobs, configure authentication using group/workspace environment variables (`TF_TOKEN_<hostname>`) or federated registries. For the CLI, set the `TF_TOKEN_<hostname>` environment variable (with underscores) or use a federated registry.

### How do I know which providers are cached?

Navigate to the **Provider Mirrors** tab in the group or workspace sidebar to view, search, and manage cached providers. At the root group level, you can also delete version mirrors. Alternatively, use the CLI command `tharsis terraform-provider-mirror list-versions <group-path>`.

### Why do I see "<span style={{ color: 'orange' }}>Warning</span>: Incomplete lock file information for providers"?

This warning appears when the `.terraform.lock.hcl` file doesn't contain checksums for all platforms. When using a network mirror, Terraform only records the checksum for the current platform. This is expected behavior and doesn't affect functionality.

:::tip
There's an open issue to add an option to suppress this warning: [hashicorp/terraform#31856](https://github.com/hashicorp/terraform/issues/31856). If this affects your workflow, consider adding a 👍 to help prioritize it.
:::
