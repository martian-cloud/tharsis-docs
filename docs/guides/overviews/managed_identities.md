---
title: Managed Identities
description: "Configuring and using managed identities to deploy resources"
---

### What are managed identities?

Managed identities are used to assume cloud provider credentials using OIDC federation. They provide credentials to the Terraform providers without having to store credentials.

Tharsis supports Amazon Web Services (AWS) and Microsoft Azure managed identities for assuming [IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) and [Azure Service Principals](https://docs.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli#what-is-an-azure-service-principal) respectively. These managed identities can be created in a group via the UI and assigned to a workspace for deploying resources.

:::tip Did you know...
The Tharsis CLI includes a `--managed-identity` flag to automatically assign the given managed identity to a workspace when it's created, meaning a workspace is ready to go with just one command!
:::

:::tip Managed identities are inherited
Once a managed identity is created in a Tharsis group, it is inherited by all its child groups. Just be sure to [assign](#assign-a-managed-identity) it to the workspace!

**NOTE**: There may be limitations to this in the future.
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

  - Select `AWS` as type, provide a name, optionally a short memorable description, the IAM role for provider configuration, and click on <span style={{ color: '#4db6ac' }}>`CREATE MANAGED IDENTITY`</span>:
    ![Screenshot of the Tharsis UI showing new managed identity page](/img/managed_identities/tharsis-aws-identity.png "New managed identity page")

    :::caution
    Managed identity names may only contain **digits**, **lowercase** letters with a **hyphen** or an **underscore** in non-leading or trailing positions.

    A managed identity's name **cannot** be changed once created. It will have to be deleted and recreated, which is **dangerous**.
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

  - Select `Azure` as type, provide a name, optionally a short memorable description, the Client ID, Tenant ID, and click on <span style={{ color: '#4db6ac' }}>`CREATE MANAGED IDENTITY`</span>:
    ![Screenshot of the Tharsis UI showing new managed identity page](/img/managed_identities/tharsis-azure-identity.png "New managed identity page")

    :::caution
    Managed identity names may only contain **digits**, **lowercase** letters with a **hyphen** or an **underscore** in non-leading or trailing positions.

    A managed identity's name **cannot** be changed once created. It will have to be deleted and recreated, which is **dangerous**.
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

   :::danger Deletion is dangerous

   Deleting a managed identity is an <u>**irreversible**</u> operation. Proceed with **extreme** caution.

   :::

### Assign a managed identity

1. Navigate to the workspace where this managed identity will be used, and click on `Managed Identities` on the left sidebar and search for a managed identity in the search box.
   ![Screenshot of the Tharsis UI showing assign managed identity page](/img/managed_identities/assign-managed-identity.png "Assign a managed identity")

2. Select the appropriate managed identity and it is now assigned to the workspace.

### Assign multiple managed identities

Tharsis supports the ability to assign multiple [AWS](#aws-managed-identity) managed identities to a workspace. However, to make use of them, the provider configuration must be updated to use the correct identity.

<details>
<summary>Expand for a sample Terraform configuration</summary>

```hcl showLineNumbers title="main.tf"
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.70.0"
    }
    null = {
      source  = "hashicorp/null"
      version = "~> 3.2.3"
    }
  }
}

provider "aws" {
  alias   = "data-provider"
  region  = "us-east-2"
  profile = "my-group/identity-two"
}

provider "null" {}

resource "null_resource" "download_s3_file" {
  triggers = {
    always_run = "${timestamp()}"
  }

  provisioner "local-exec" {
    command = <<EOF
      set -e

      # Where the AWS CLI is installed to. Must use full path or won't resolve.
      CLI_BINARY="/home/tharsis/.local/bin/aws"

      echo "Installing AWS CLI"
      pip3 install --user --no-cache-dir awscli
      "$CLI_BINARY" --version

      # Download the file from S3
      "$CLI_BINARY" --profile my-group/identity-one s3 cp s3://data/large_file.zip ${path.module}/large_file.zip
    EOF

    interpreter = ["/bin/sh", "-c"]
  }
}

resource "aws_s3_object" "object" {
  bucket     = "consolidated-bucket"
  key        = "large_file_copy.zip"
  source     = "${path.module}/large_file.zip"
  depends_on = [null_resource.download_s3_file]
  provider   = aws.data-provider
}
```

Let's break down the configuration:

- The `aws` provider is aliased to `data-provider` and the `profile` is set to `my-group/identity-two`. This is the resource path of the managed identity in Tharsis.
- The `null` provider is used to download the file from S3 using the `my-group/identity-one` profile.
- The `aws_s3_object` resource uses the `data-provider` provider to upload the file to `consolidated-bucket`.

:::note
The `profile` attribute in the `aws` provider configuration is set to the managed identity's resource path. This is how Terraform knows which credentials to use. The `alias` attribute can be used to differentiate between different AWS provider instances. The `provider` attribute in the `aws_s3_object` resource is set to the alias of the provider.
:::

:::caution
Failure to set the `profile` attribute when multiple managed identities are assigned to a workspace will result in an error during the Terraform plan/apply phase.
:::

</details>

### Access rules

While managed identities are really powerful on their own, the addition of access rules takes things a step further and allows fine-grained control on who or what can assume the credentials of the identity. In order for someone/something to use a managed identity, the access rules (if specified) must be satisfied.

:::info

Access rules can be created when a managed identity is created or edited in the UI.

:::

:::caution Important!

Tharsis, by default, allows anyone with deployer access to a managed identity to assume it. So, if you wish to limit access to an identity, formulate the access rules accordingly.

:::

#### Rule evaluation

Access rules of the same type (either eligible principals or module attestation) use an **OR** condition, meaning, the first one that matches, passes. However, if rules of multiple types are specified (eligible principals and module attestation) then they use an **AND** condition, meaning, at least one rule from each access rule type must match successfully.

As of now, there are currently two different types:

- Eligible principals
- Module attestations

#### Eligible principal rules

Eligible principal rules are meant to limit the usage of a managed identity to a certain set of principals or users/service accounts. There might be use-cases where particular individuals or service accounts should assume a managed identity for creating speculative plans, but not applying them. To address this, Tharsis allows assigning a set of principals to `plan` and `apply` stages separately.

:::caution

Tharsis, by default, will allow any principal to assume a managed identity if an access rule is not defined for that run stage.

:::

#### Module attestation rules

Module attestation rules prohibit a module from assuming a managed identity unless it has an attestation signed with a public key defined on the access rule. Like eligible principal rules, these rules can also be defined separately for `plan` and `apply` run stages and only [root modules](https://developer.hashicorp.com/terraform/language/modules#the-root-module) that satisfy the attestation policy will be allowed.

:::info What are Terraform modules and how do I attest them?

We're glad you asked! See [here](module_registry.md) for more information.

:::

:::caution Important

Managed identity module attestation rules only support modules in the Tharsis registry!

:::

### Aliases

Perhaps you've run into a situation where your workflow requires the same managed identity under a different namespace or a parent group and creating a duplicate is not practical—that's where aliases come in. Aliases are resources that allow using a managed identity's data and access rules _without_ the need to duplicate the data and still permit inheritance. They can be used just like a regular managed identity.

:::info

Aliases can be...

- Resources with their own unique name.
- Inherited like any managed identity.
- Shared with a parent or sibling group.
- Deleted if the principal is an owner in _either_ the source identity's or alias' group.

Aliases cannot be...

- Created for namespaces the source managed identity\* is already available under through inheritance.
- Updated and must use the same data from the source managed identity.
- Created unless the principal is an owner of _both_ the source identity's and alias' groups.

\*Source managed identity refers to the identity being aliased.

:::

#### Creating an alias

To create an alias, navigate to the target group's details page and click on `Managed Identities` on the left sidebar. Then click on the `Aliases` tab and select `CREATE ALIAS`. Give it a name and search for the group where the alias should be available and hit `CREATE ALIAS`. The alias is now available in the target group and can be assigned to a workspace.

:::note
An alias' data is inherited from the source managed identity and cannot be updated. Any changes to the source managed identity will be reflected in the alias.
:::

#### Deleting an alias

To delete an alias, navigate to the target group's details page and click on `Managed Identities` on the left sidebar. Then click on the `Aliases` tab and select the alias to be deleted. Select the alias and once on the alias details page, click on the `DELETE ALIAS` button. The alias is now deleted.

### Frequently asked questions (FAQ)

#### Who can create/update/delete managed identities?

- Owner role can modify managed identities.
- Deployer or lower **cannot** modify managed identities.

#### Can multiple managed identities of the same type be created in a group?

Yes, currently only multiple AWS managed identities can be assigned to a workspace. Other types of managed identities are limited to one per workspace. For more information, see [Assign multiple managed identities](#assign-multiple-managed-identities).

#### Is there a way to "mask" managed identities to prevent inheritance?

Managed identity [access rules](#access-rules) can be used to limit who may assume the identity, which achieves a similar effect.

#### When do I need to use AWS profiles in the Terraform provider configuration?

When multiple AWS managed identities are assigned to a workspace, the `profile` attribute in the provider configuration must be set to the managed identity's resource path. For more information, see [Assign multiple managed identities](#assign-multiple-managed-identities).

#### Can I still assign other managed identities types if multiple AWS managed identities are assigned to a workspace?

Yes, other managed identity types like Azure, Tharsis, etc., can still be assigned to a workspace but they're limited to one per workspace.
