---
title: Terraform Module Registry
description: "All about the Tharsis Terraform Module Registry"
---

Tharsis Terraform Module Registry provides a central place to publish, version, attest and share Terraform modules.

Whether you're a Terraform veteran or a newcomer, the module registry is the perfect place to share Terraform modules with your community and unlocks a whole new world of collaboration and module management.

### What are Terraform modules?

[Terraform modules](https://developer.hashicorp.com/terraform/language/modules) are collections of Terraform configuration `(*.tf)` files (that often perform the same task) packaged together to allow importing shared code into other Terraform resources. Rather than writing the same code multiple times, Terraform provides a way for importing existing modules and extending their capabilities as needed. The Tharsis Terraform Module Registry takes this notion a step further and allows sharing, versioning and attesting Terraform modules all within the Tharsis ecosystem and makes it much easier to collaborate and distribute modules at a greater scale.

### What attestation specification does Tharsis support?

Tharsis currently supports the [in-toto](https://in-toto.io/) specification, a system that attests to the integrity and verifiability of a software supply chain. A compromised supply chain immensely decreases the overall security of a software product and threat actors can impact several users at once. in-toto helps a user verify if a step in the supply chain process was intended and performed by the right individual, thus, decreasing the likelihood of a compromised end product. Learn [more](https://github.com/in-toto/docs/blob/d416c1f334ac6b581f75c0fa65125fb434d7a610/in-toto-spec.md).

:::tip did you know?

The attestation process can be streamlined by using the Cosign binary in a CICD pipeline to create an attestation and upload to the Tharsis API via the CLI? See [module create-attestation subcommand](/docs/cli/tharsis/commands.md#module-create-attestation-subcommand).

:::

### Create a Terraform module

Either the [API](/docs/setup/api/install.md) or the [CLI](/docs/cli/tharsis/intro.md) can be used to create a new module.

#### Tharsis API

The UI does not yet support creating modules, so we must interface with the API directly. The `GraphiQL Editor` allows querying and mutating data on the backend. To begin, simply click on your profile icon in top-right corner and select `GraphiQL Editor`.

<details>
<summary>Create Terraform module GraphQL mutation</summary>

```graphql showLineNumbers
mutation {
  createTerraformModule(
    input: {
      groupPath: "top-level"
      name: "module-name"
      system: "aws"
      private: true
    }
  ) {
    module {
      id
      name
      system
      resourcePath
    }
    problems {
      message
      field
    }
  }
}
```

:::tip

Run with **&#9655;** (play) button in GraphiQL Editor.

:::

:::caution

Terraform module names may only contain **digits**, **lowercase** letters with a **hyphen** or an **underscore** in non-leading or trailing positions.

:::

:::caution api is not yet stable!

Mutations are subject to change with improvements to the Tharsis API.

:::

</details>

<details>
<summary>Successful module creation GraphQL response</summary>

```graphql showLineNumbers
{
  "data": {
    "createTerraformModule": {
      "module": {
        "id": "VE1PXzYwM2UxNGMyLTVmZjAtNDFkZi1iYTlhLTRjMzM3ZTJhMWE2MQ",
        "name": "module-name",
        "system": "aws",
        "resourcePath": "top-level/module-name/aws"
      },
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

#### Tharsis CLI (recommended)

See [module create subcommand](/docs/cli/tharsis/commands.md#module-create-subcommand) to create a module.

### Version a Terraform module

Either the [API](/docs/setup/api/install.md) or the [CLI](/docs/cli/tharsis/intro.md) can be used to create a new module version.

:::tip did you know?

When a Terraform module version is uploaded to the API, it will automatically extract useful metadata information, such as, contents of the README.md, Terraform variables, outputs, managed resources, required providers and more!

:::

#### Tharsis API

The UI does not yet support creating module versions, so we must interface with the API directly. The `GraphiQL Editor` allows querying and mutating data on the backend. To begin, simply click on your profile icon in top-right corner and select `GraphiQL Editor`.

<details>
<summary>Create Terraform module version GraphQL mutation</summary>

```graphql showLineNumbers
mutation {
  createTerraformModuleVersion(
    input: {
      modulePath: "top-level/module-name/aws"
      version: "v0.1.0"
      shaSum: "47de3df1623f03038b484445b9e0efb139634dd48c5c13dcf4e06eeadf39a4d1"
    }
  ) {
    moduleVersion {
      id
      version
      status
      error
    }
    problems {
      message
      field
    }
  }
}
```

:::tip

Run with **&#9655;** (play) button in GraphiQL Editor.

:::

:::info

Version string must be [semver](https://github.com/Masterminds/semver) compliant.

Checksum must be the Terraform Module's SHA256 hash.

:::

:::caution api is not yet stable!

Mutations are subject to change with improvements to the Tharsis API.

:::

</details>

<details>
<summary>Successful module version creation GraphQL response</summary>

```graphql showLineNumbers
{
  "data": {
    "createTerraformModuleVersion": {
      "moduleVersion": {
        "id": "VE1WX2IxZDBiN2Q2LTRlYjQtNDU0My04OTFhLWJjNjJjZWY1NjM5MQ",
        "version": "0.1.0",
        "status": "pending",
        "error": ""
      },
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

#### Tharsis CLI

The CLI allows us to kill two birds with one stone. We can simultaneously upload a module package and create a new version without much manual input. Learn more about the [module upload-version subcommand](/docs/cli/tharsis/commands.md#module-upload-version-subcommand).

### Attest a Terraform module

Either the [API](/docs/setup/api/install.md) or the [CLI](/docs/cli/tharsis/intro.md) can be used to create a new module attestation.

#### Requirements

- Sigstore [Cosign](https://docs.sigstore.dev/cosign/overview/)

:::tip did you know?

Cosign supports various cloud KMS services for signing to avoid managing private keys. See [here](https://docs.sigstore.dev/cosign/kms_support/).

:::

#### Creating an attestation with Cosign

```shell title="Using Cosign to attest a Terraform module"
cosign attest-blob --tlog-upload=false --predicate [path to predicate.json file] --key [key-file] --hash [sha256sum of the module]  [path to the module] | base64 -w 0
```

<details>
<summary>Expand for explanation</summary>

Above command will attest a Terraform module specified by the parameters and output a Base64-encoded string that can be passed in for attestation data to either the API or the CLI.

:::note

Depending on the version of the Cosign binary, the above command may be slightly different. Some binaries may output Base64 encoded format automatically, whereas others only output JSON. Adjust the options accordingly.

:::

</details>

#### Tharsis API

The UI does not yet support creating module attestations, so we must interface with the API directly. The `GraphiQL Editor` allows querying and mutating data on the backend. To begin, simply click on your profile icon in top-right corner and select `GraphiQL Editor`.

<details>
<summary>Create Terraform module attestation GraphQL mutation</summary>

```graphql showLineNumbers
mutation {
  createTerraformModuleAttestation(
    input: {
      modulePath: "top-level/module-name/aws"
      description: "This is an attestation for module-name"
      attestationData: "..."
    }
  ) {
    moduleAttestation {
      id
      schemaType
      predicateType
      digests
      data
    }
    problems {
      message
      field
    }
  }
}
```

:::tip

Run with **&#9655;** (play) button in GraphiQL Editor.

:::

:::info

Attestation data must only be a Base64-encoded string.

:::

:::caution api is not yet stable!

Mutations are subject to change with improvements to the Tharsis API.

:::

</details>

<details>
<summary>Successful module attestation creation GraphQL response</summary>

```graphql showLineNumbers
{
  "data": {
    "createTerraformModuleAttestation": {
      "moduleAttestation": {
        "id": "VE1BXzIwMDZkZmRiLTBmNjUtNGFhMS04OTM1LWJkZDAxOTAwZjUxZQ",
        "schemaType": "https://in-toto.io/Statement/v0.1",
        "predicateType": "cosign.sigstore.dev/attestation/v1",
        "digests": [
          "47de3df1623f03038b484445b9e0efb139634dd48c5c13dcf4e06eeadf39a4d1"
        ]
      },
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

:::note

The API has automatically extracted some metadata from the attestation data. In particular, the schemaType, predicateType and the digest of the module the attestation belongs to.

:::

:::caution api is not yet stable!

Responses are subject to change with improvements to the Tharsis API.

:::

</details>

#### Tharsis CLI

See [module create-attestation subcommand](/docs/cli/tharsis/commands.md#module-create-attestation-subcommand) to create a module attestation.

### Access rules and Terraform modules

Terraform Module attestations become really powerful when they're used in conjunction with access rules to enforce which modules can assume a managed identity. Learn more about managed identities and access rules [here](managed_identities.md#access-rules).
