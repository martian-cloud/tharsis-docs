---
title: Managed Identities
description: "Configuring and using managed identities to deploy resources"
---

### What are managed identities?

Managed identities are used to assume cloud provider credentials using OIDC federation. They provide credentials to the Terraform providers without having to store credentials.

Tharsis supports Amazon Web Services (AWS), Microsoft Azure managed identities for assuming [IAM role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) and [Azure Service Principal](https://docs.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli#what-is-an-azure-service-principal) respectively. These managed identities can be created in a group via the UI and assigned to a workspace for deploying resources.

:::tip did you know...
The Tharsis CLI includes a `--managed-identity` flag to automatically assign the given managed identity to a workspace when its created, meaning a workspace is ready to go with just once command!
:::

:::tip managed identities are inherited
Once a managed identity is created in a Tharsis group, it is inherited by all its child groups. Just be sure to [assign](#assign-a-managed-identity) it to the workspace!

**NOTE**: there may be limitations to this in the future.
:::

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

---

### Create a managed identity

#### AWS Managed Identity

- Create an [OpenID Connect identity provider](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html) in the AWS account where the IAM role will be linked to the managed identity.
  ![Screenshot of AWS showing OIDC provider creation](/img/managed_identities/aws-managed-identity.png "Creating an OIDC provider (AWS)")

  > Enter Provider URL: `https://api.tharsis.example.com`, and Audience: `aws`. Click <span style={{ color: 'cyan' }}>`Add provider`</span>.

- Create the managed identity in the appropriate Tharsis group:

    <details>
    <summary>Extra step for a group's first managed identity</summary>

  From the group details page, click `Managed Identities` on the left sidebar and then <span style={{ color: '#4db6ac' }}>`NEW MANAGED IDENTITY`</span>:
  ![Screenshot of the Tharsis UI showing managed identity page](/img/managed_identities/new-managed-identity.png "Managed identity page")

    </details>

  - Select `AWS` as type, provide a name, optionally a short memorable description, the IAM role for provider configuration and click on <span style={{ color: '#4db6ac' }}>`CREATE MANAGED IDENTITY`</span>:
    ![Screenshot of the Tharsis UI showing new managed identity page](/img/managed_identities/tharsis-aws-identity.png "New managed identity page")

    :::caution
    Managed identity names may only contain **digits**, **lowercase** letters with a **hyphen** or an **underscore** in non-leading or trailing positions.

    A managed identity's name **cannot** be changed once created. It will have to be deleted and recreated which is **dangerous**.
    :::

    - Once an identity is created, copy the `IAM Trust Policy` Tharsis provides and add it to the IAM role in AWS.

    - The managed identity can now be [assigned](#assign-a-managed-identity) to any workspace within the group.

#### Azure Managed Identity

- Create an [app registration](https://docs.microsoft.com/en-us/graph/auth-register-app-v2) in Azure.

- Create the managed identity in the appropriate Tharsis group:

    <details>
    <summary>Extra step for a group's first managed identity</summary>

  From the group details page, click `Managed Identities` on the left sidebar and then <span style={{ color: '#4db6ac' }}>`NEW MANAGED IDENTITY`</span>:
  ![Screenshot of the Tharsis UI showing managed identity page](/img/managed_identities/new-managed-identity.png "Managed identity page")

    </details>

  - Select `Azure` as type, provide a name, optionally a short memorable description, the Client ID, Tenant ID and click on <span style={{ color: '#4db6ac' }}>`CREATE MANAGED IDENTITY`</span>:
    ![Screenshot of the Tharsis UI showing new managed identity page](/img/managed_identities/tharsis-azure-identity.png "New managed identity page")

    :::caution
    Managed identity names may only contain **digits**, **lowercase** letters with a **hyphen** or an **underscore** in non-leading or trailing positions.

    A managed identity's name **cannot** be changed once created. It will have to be deleted and recreated which is **dangerous**.
    :::

  - Once created, the `Issuer`, `Audience`, and `Subject` will be displayed in Tharsis. In the Azure portal, select your app registration. Under `Certificates & Secrets` -> `Federated Credentials` select the `Add Credentials` button and provide the `Issuer`, `Audience`, and `Subject` fields.

  - The managed identity can now be [assigned](#assign-a-managed-identity) to any workspace within the group.

### Update a managed identity

1. From the group details page, click `Managed Identities` on the sidebar and select the appropriate managed identity:
   ![Screenshot of the Tharsis UI showing populated managed identities page](/img/managed_identities/managed-identity-list.png "Managed Identities page")

2. Click on <span style={{ color: '#4db6ac' }}>`EDIT`</span>:
   ![Screenshot of the Tharsis UI showing managed identities details page](/img/managed_identities/update-managed-identity.png "Managed Identities details page")

3. Now the description and provider configuration can be updated.

### Delete a managed identity

1. From the group details page, click `Managed Identities` on the sidebar and select the appropriate managed identity:
   ![Screenshot of the Tharsis UI showing populated managed identities page](/img/managed_identities/managed-identity-list.png "Managed Identities page")

2. Click on <span style={{ color: '#4db6ac' }}>&#9660;</span> next to <span style={{ color: '#4db6ac' }}>`EDIT`</span>, then `Delete Managed Identity`:
   ![Screenshot of the Tharsis UI showing edit managed identity dropdown](/img/managed_identities/delete-managed-identity.png "Deleting a managed identity")

   :::danger deletion is dangerous

   Deleting a managed identity is an <u>**irreversible**</u> operation. Proceed with **extreme** caution.

   :::

### Assign a managed identity

1. Navigate to the workspace where this managed identity will be used, and click on `Managed Identities` on the left sidebar and search for a managed identity in the search box.
   ![Screenshot of the Tharsis UI showing assign managed identity page](/img/managed_identities/assign-managed-identity.png "Assign a managed identity")

2. Select the appropriate managed identity and it is now assigned to the workspace.

### Access rules

While managed identities are really powerful on their own, the addition of access rules takes things a step further and allows fine-grained control on who or what can assume the credentials of the identity. In order for someone / something to use a managed identity, the access rules (if specified) must be satisfied.

:::info

Access rules can be created when a managed identity is created or edited in the UI.

:::

:::caution important!

Tharsis, by default, allows anyone with deployer access to a managed identity to assume it. So, if you wish to limit access to an identity, formulate the access rules accordingly.

:::

#### Rule evaluation

Access rules of the same type (either eligible principals or module attestation) use an **OR** condition, meaning, the first one that matches, passes. However, if rules of multiple types are specified (eligible principals and module attestation) then they use an **AND** condition, meaning, at least one rule from each access rule type must match successfully.

As of now, there are currently two different types:

- Eligible principals
- Module attestations

#### Eligible principal rules

Eligible principal rules are meant to limit the usage of a managed identity to a certain set of principals or users / service accounts. There might be use-cases where particular individuals or service accounts should assume a managed identity for creating speculative plans, but not applying them. To address this, Tharsis allows assigning a set of principals to `plan` and `apply` stages separately.

:::caution

Tharsis, by default, will allow any principal to assume a managed identity if an access rule is not defined for that run stage.

:::

#### Module attestation rules

Module attestation rules prohibit a module from assuming a managed identity unless it has an attestation signed with a public key defined on the access rule. Like eligible principal rules, these rules can also be defined separately for `plan` and `apply` run stages and only [root modules](https://developer.hashicorp.com/terraform/language/modules#the-root-module) that satisfy the attestation policy will be allowed.

:::info What are terraform modules and how do I attest them?

We're glad you asked! See [here](module_registry.md) for more information.

:::

:::caution important

Managed identity module attestation rules only support modules in the Tharsis registry!

:::

### Aliases

Perhaps you've run into a situation where your workflow requires the same managed identity under a different namespace or a parent group and creating a duplicate is not practical—that's where aliases come in. Aliases are resources that allow using a managed identity's data and access rules _without_ the need to duplicate the data and still permit inheritance. They can be used just like a regular managed identity.

:::info

Aliases can be...

- resources with their own unique name.
- inherited like any managed identity.
- shared with a parent or sibling group.
- deleted if principal is an owner in _either_ source identity's or alias' group.

Aliases cannot be...

- created for namespaces the source managed identity\* is already available under through inheritance.
- updated and must use the same data from the source managed identity.
- created unless the principal is an owner of _both_ the source identity's and alias' groups.

\*source managed identity refers to the identity being aliased.

:::

#### Creating an alias

The UI does not yet support creating aliases, so we must interface with the API directly. The `GraphiQL Editor` allows querying and mutating data on the backend. To begin, simply click on your profile icon in top-right corner and select `GraphiQL Editor`.

<details>
<summary>Create Managed Identity Alias GraphQL mutation</summary>

```graphql showLineNumbers
mutation {
  createManagedIdentityAlias(
    input: {
      name: "a-managed-identity-alias"
      aliasSourcePath: "top-level/mid-level/source-identity"
      groupPath: "top-level/mid-level-sibling"
    }
  ) {
    managedIdentity {
      id
      resourcePath
      isAlias
      aliasSource {
        id
        resourcePath
      }
    }
    problems {
      message
      field
    }
  }
}
```

:::note

Above mutation creates an alias in group `top-level/mid-level-sibling` of the source managed identity in `top-level/mid-level/source-identity`.

:::

:::tip

Run with **&#9655;** (play) button in GraphiQL Editor.

:::

:::caution api is not yet stable!

Mutations are subject to change with improvements to the Tharsis API.

:::

</details>

<details>
<summary>Successful Managed Identity Alias creation GraphQL response</summary>

```graphql showLineNumbers
{
  "data": {
    "createManagedIdentityAlias": {
      "managedIdentity": {
        "id": "TV85YzhhMTIwYS05NDZlLTQyM2UtOTkzOC1jMDQwZGU3NGZhNjE",
        "resourcePath": "top-level/mid-level-sibling/a-managed-identity-alias",
        "isAlias": true,
        "aliasSource": {
          "id": "TV9jZmY1OGJiMS0wMmViLTQ4NTMtOGJkNy00NjNlMmYwNDc0MGE",
          "resourcePath": "top-level/mid-level/source-identity"
        }
      },
      "problems": []
    }
  },
  "extensions": {
    "cost": {
      "throttled": false,
      "requestedQueryCost": 11,
      "maxQueryCost": 4000,
      "remaining": 3989
    }
  }
}
```

:::note

The alias has its own unique resource path `top-level/mid-level-sibling/a-managed-identity-alias` with the `aliasSource` field indicating the source managed identity. This alias is now ready to be [assigned to any workspace](#assign-a-managed-identity) within that namespace.

:::

:::caution api is not yet stable!

Responses are subject to change with improvements to the Tharsis API.

:::

</details>

#### Deleting an alias

The UI does not yet support deleting aliases, so we must interface with the API directly. The `GraphiQL Editor` allows querying and mutating data on the backend. To begin, simply click on your profile icon in top-right corner and select `GraphiQL Editor`.

<details>
<summary>Delete Managed Identity Alias GraphQL mutation</summary>

```graphql showLineNumbers
mutation {
  deleteManagedIdentityAlias(
    input: {
      id: "TV85YzhhMTIwYS05NDZlLTQyM2UtOTkzOC1jMDQwZGU3NGZhNjE" # Replace me!
      force: true
    }
  ) {
    problems {
      message
      field
    }
  }
}
```

> Replace the `id` field value with the one you copied when creating the alias.

:::tip

Run with **&#9655;** (play) button in GraphiQL Editor.

:::

:::caution api is not yet stable!

Mutations are subject to change with improvements to the Tharsis API.

:::

:::danger deletion is dangerous

Deleting a managed identity alias is an <u>**irreversible**</u> operation. Although, the API will try to prevent a deletion when the alias is assigned to a workspace, setting `force: true` will override that behavior.

Proceed with **extreme** caution as anything making use of the alias will no longer be able to assume it. If unsure, **do not** proceed.
:::

</details>

<details>
<summary>Successful Managed Identity Alias deletion GraphQL response</summary>

```graphql showLineNumbers
{
  "data": {
    "deleteManagedIdentityAlias": {
      "problems": []
    }
  },
  "extensions": {
    "cost": {
      "throttled": false,
      "requestedQueryCost": 10,
      "maxQueryCost": 4000,
      "remaining": 3990
    }
  }
}
```

:::caution api is not yet stable!

Responses are subject to change with improvements to the Tharsis API.

:::

</details>

### Frequently asked questions (FAQ)

- Who can create / update / delete managed identities?

  - Owner role can modify managed identities.
  - Deployer or lower **cannot** modify managed identities.

- Can multiple managed identities of the same type be created in a group?

  - Yes. However, multiple identities of the same type cannot be assigned to a workspace.

- Is there a way to "mask" managed identities to prevent inheritance?

  - Not at the moment.

- Is managed identity support available through the Tharsis CLI?

  - Not yet, although, it is on our roadmap.
