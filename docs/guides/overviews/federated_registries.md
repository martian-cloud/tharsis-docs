---
title: Federated Registries
description: "What are federated registries and how can they help us"
---

## What are federated registries?

Federated registries are a [group](../overviews/groups.md) resource that enable access to Terraform modules and providers from external Tharsis registries. They allow you to consume resources from other Tharsis instances without having to duplicate or manually copy modules and providers between registries.

:::tip Did you know...
Federated registries allow you to seamlessly access Terraform modules and providers across multiple Tharsis instances, enabling better collaboration and resource sharing.
:::

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

---

## Viewing federated registries

To view a group's federated registries, select **Federated Registries** from the group sidebar. The federated registries page displays a list of all federated registries in the group. Select a federated registry to view its details page.

![Screenshot of the Tharsis UI showing list of federated registries](/img/federated_registries/federated-registries-list.png "Federated registries list")

## Federated registry details page

The federated registry details page lists the `hostname` and the `audience` for the selected federated registry.

![Screenshot of the Tharsis UI showing federated registries details page](/img/federated_registries/federated-registry-details-page.png "Federated registries details page")

## Federated registry configuration in Tharsis

Creating a federated registry in Tharsis requires a `hostname` and an `audience`.

### hostname

The network address of the federated registry server. This field specifies where the registry can be reached and supports multiple
formats:

- **Fully qualified domain names**: registry.example.com
- **Subdomains**: dev-registry.company.io
- **Local development addresses**: localhost:5000
- **IP addresses with ports**: 192.168.1.100:8080

The `hostname` is used by Tharsis to establish network connections to the federated registry for module and provider sharing
operations.

### audience

A unique identifier that represents the intended recipient of authentication tokens when communicating with the federated registry.
This value is used in OIDC (OpenID Connect) token-based authentication between federated registries and must match the audience claim expected by the
target registry. Common formats include:

- **API endpoints**: `https://registry.example.com/api/v1`
- **Service identifiers**: tharsis-registry-production
- **URN format**: urn:tharsis:registry:staging
- **UUIDs**: 550e8400-e29b-41d4-a716-446655440000
- **Simple names**: registry-service-internal

The audience value ensures that tokens issued for one registry cannot be misused with another, providing security isolation between
different federated registry instances.

:::tip Reminder
Both the `hostname` and `audience` must be coordinated with the target federated registry's configuration to ensure successful
authentication and communication.
:::

## Configuring registry trust policies

To allow federated access to your registry, you must configure trust policies that define which external Tharsis instances can access your modules and providers. This is done through the `FederatedRegistryTrustPolicy` configuration.

### Configuration parameters

- **IssuerURL** (required): The URL for the Tharsis API server that will be consuming modules/providers from the registry
- **Subject** (optional): Must match the `sub` claim in the token, which will be set to the ID of the federated registry
- **Audience** (optional): Must match the `audience` field in the federated registry settings
- **GroupGlobPatterns** (optional): A list of groups with potential wildcards in the path for access to private modules and providers. The federated registry will automatically have access to modules and providers that are not private

### Example configurations

Set `THARSIS_FEDERATED_REGISTRY_TRUST_POLICIES` to:

**Basic configuration:**
```json
[
  {
    "issuer_url": "https://client.example",
    "audience": "tharsis"
  }
]
```

**Advanced configuration with all fields:**
```json
[
  {
    "issuer_url": "https://client.example",
    "subject": "federated-registry-id-123",
    "audience": "tharsis",
    "group_glob_patterns": ["mygroup/*", "shared/*/modules"]
  }
]
```

These example configurations show:

**Basic configuration:**
- Allows the Tharsis instance at `https://client.example` to access public resources
- Sets the audience to `tharsis` for token validation
- No group patterns specified, so only public modules/providers are accessible

**Advanced configuration:**
- Includes a specific `subject` for additional token validation
- Grants access to private resources in `mygroup/*` and `shared/*/modules` using wildcard patterns
- Shows how multiple glob patterns can be specified

:::info Access control
Federated registries automatically have access to public modules and providers. The `group_glob_patterns` configuration is only needed for accessing private resources.
:::

## Create a federated registry

1. Navigate to the group sidebar and select **Federated Registries**.
2. Click **New Federated Registry**.
3. Enter the hostname and the audience (both required).
4. Click **Create Federated Registry**.

## Update a federated registry

1. Navigate to the group sidebar and select **Federated Registries**.
2. Click on the federated registry you want to update.
3. Select **Edit**.
4. Update the hostname or audience.
5. Click **Update Federated Registry**.

## Delete a federated registry

1. Navigate to the group sidebar and select **Federated Registries**.
2. Click on the federated registry you want to delete.
3. Select the upside-down caret next to **Edit**.
4. Click **Delete Federated Registry**.
5. A confirmation dialog will appear. Click **Delete** to confirm. Click **Cancel** to cancel the deletion.

:::danger
Deleting a federated registry will break any modules or providers that depend on resources from the external registry.
:::

## Frequently asked questions (FAQ)

### Who can create / update / delete federated registries?

Owners and deployers can create, update, and delete federated registries. Viewers have read-only access.

### How do I access modules from a federated registry?

Once a federated registry is configured, you can reference modules from the external registry in your Terraform configurations using the standard module syntax. The federated registry will automatically resolve and fetch the modules.

### What happens if the external registry is unavailable?

If the external registry becomes unavailable, any operations that depend on modules or providers from that registry may fail. It's recommended to have fallback strategies or local copies of critical resources.

### Can I federate with multiple registries?

Yes, you can create multiple federated registries within a group to access resources from different external Tharsis instances.

### Are there any authentication requirements?

Tharsis uses OIDC to authenticate with federated registries. The external registry must be configured to accept OIDC tokens from your Tharsis instance, using the `audience` value specified in the federated registry configuration for token validation.

### How are permissions handled for federated resources?

Permissions for accessing federated resources are controlled by your local Tharsis instance. Users must have appropriate permissions in the local group to access federated registry resources.

### Can I publish modules to a federated registry?

Federated registries are typically read-only connections to external registries. To publish modules, you would need direct access to the external registry itself.

### What types of resources can be accessed through federated registries?

Federated registries primarily provide access to Terraform modules and providers from external Tharsis registries.
