---
title: Managed Identities
description: "Configuring and using managed identities to deploy resources"
---

### What are managed identities?

Managed identities are used to assume cloud provider credentials using OIDC federation. They provide credentials to the Terraform providers without having to store credentials.

Tharsis supports Amazon Web Services (AWS), Microsoft Azure managed identities for assuming [IAM role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) and [Azure Service Principal](https://docs.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli#what-is-an-azure-service-principal) respectively. These managed identities can be created in a group via Tharsis UI and assigned to a workspace for deploying resources.

:::tip did you know...
Tharsis CLI includes a `--managed-identity` flag to automatically assign the given managed identity to a workspace when its created, meaning a workspace is ready to go with just once command!
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

    <details><summary>Extra step for a group's first managed identity</summary>

  From the group details page, click `Managed Identities` on the left sidebar and then <span style={{ color: '#4db6ac' }}>`NEW MANAGED IDENTITY`</span>:
  ![Screenshot of Tharsis UI showing managed identity page](/img/managed_identities/new-managed-identity.png "Managed identity page")

    </details>

  - Select `AWS` as type, provide a name, optionally a short memorable description, the IAM role for provider configuration and click on <span style={{ color: '#4db6ac' }}>`CREATE MANAGED IDENTITY`</span>:
    ![Screenshot of Tharsis UI showing new managed identity page](/img/managed_identities/tharsis-aws-identity.png "New managed identity page")

    :::caution
    Managed identity names may only contain **digits**, **lowercase** letters with a **dash** or an **underscore** in non-leading or trailing positions.

    A managed identity's name **cannot** be changed once created. It will have to be deleted and recreated which is **dangerous**.
    :::

    - Once an identity is created, copy the `IAM Trust Policy` Tharsis provides and add it to the IAM role in AWS.

    - The managed identity can now be [assigned](#assign-a-managed-identity) to any workspace within the group.

#### Azure Managed Identity

- Create an [app registration](https://docs.microsoft.com/en-us/graph/auth-register-app-v2) in Azure.

- Create the managed identity in the appropriate Tharsis group:

    <details><summary>Extra step for a group's first managed identity</summary>

  From the group details page, click `Managed Identities` on the left sidebar and then <span style={{ color: '#4db6ac' }}>`NEW MANAGED IDENTITY`</span>:
  ![Screenshot of Tharsis UI showing managed identity page](/img/managed_identities/new-managed-identity.png "Managed identity page")

    </details>

  - Select `Azure` as type, provide a name, optionally a short memorable description, the Client ID, Tenant ID and click on <span style={{ color: '#4db6ac' }}>`CREATE MANAGED IDENTITY`</span>:
    ![Screenshot of Tharsis UI showing new managed identity page](/img/managed_identities/tharsis-azure-identity.png "New managed identity page")

    :::caution
    Managed identity names may only contain **digits**, **lowercase** letters with a **dash** or an **underscore** in non-leading or trailing positions.

    A managed identity's name **cannot** be changed once created. It will have to be deleted and recreated which is **dangerous**.
    :::

  - Once created, the `Issuer`, `Audience`, and `Subject` will be displayed in Tharsis. In the Azure portal, select your app registration. Under `Certificates & Secrets` -> `Federated Credentials` select the `Add Credentials` button and provide the `Issuer`, `Audience`, and `Subject` fields.

  - The managed identity can now be [assigned](#assign-a-managed-identity) to any workspace within the group.

### Update a managed identity

1. From the group details page, click `Managed Identities` on the sidebar and select the appropriate managed identity:
   ![Screenshot of Tharsis UI showing populated managed identities page](/img/managed_identities/managed-identity-list.png "Managed Identities page")

2. Click on <span style={{ color: '#4db6ac' }}>`EDIT`</span>:
   ![Screenshot of Tharsis UI showing managed identities details page](/img/managed_identities/update-managed-identity.png "Managed Identities details page")

3. Now the description and provider configuration can be updated.

### Delete a managed identity

1. From the group details page, click `Managed Identities` on the sidebar and select the appropriate managed identity:
   ![Screenshot of Tharsis UI showing populated managed identities page](/img/managed_identities/managed-identity-list.png "Managed Identities page")

2. Click on <span style={{ color: '#4db6ac' }}>&#9660;</span> next to <span style={{ color: '#4db6ac' }}>`EDIT`</span>, then `Delete Managed Identity`:
   ![Screenshot of Tharsis UI showing edit managed identity dropdown](/img/managed_identities/delete-managed-identity.png "Deleting a managed identity")

   :::danger deletion is dangerous

   Deleting a managed identity is an <u>**irreversible**</u> operation. Proceed with **extreme** caution.

   :::

### Assign a managed identity

1. Navigate to the workspace where this managed identity will be used, and click on `Managed Identities` on the left sidebar and search for a managed identity in the search box.
   ![Screenshot of Tharsis UI showing assign managed identity page](/img/managed_identities/assign-managed-identity.png "Assign a managed identity")

2. Select the appropriate managed identity and it is now assigned to the workspace.

### Frequently asked questions (FAQ)

- Who can create / update / delete managed identities?
  - Deployer role or higher can modify managed identities.
  - Viewer **cannot** modify managed identities.
- Can multiple managed identities of the same type be created in a group?
  - Yes. However, multiple identities of the same type cannot be assigned to a workspace.
- Is there a way to "mask" managed identities to prevent inheritance?
  - Not at the moment.
