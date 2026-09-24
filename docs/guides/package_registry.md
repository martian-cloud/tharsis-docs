---
title: Package Registry
description: "What the Tharsis package registry is and how to publish and manage packages"
keywords:
  [
    tharsis,
    package registry,
    packages,
    OPA,
    rego,
    versioning,
    visibility,
  ]
---

The Tharsis package registry is a central place to publish, version, and share packages across groups.

## What is the package registry?

The package registry stores [group](./groups.md)-owned, versioned packages. A package holds content published as versions, and each package has a type that identifies what it holds. Today the registry supports one package type, `OPA`, which holds [Rego](https://www.openpolicyagent.org/docs/latest/policy-language/) rule content used by [OPA policies](./policies.md). More package types may be supported over time.

---

## Create a package

Packages are managed from the group's `Packages` page on the left sidebar, under the `Registry` section. Managing packages is controlled by separate view, create, update, and delete permissions; see the [permissions section](./policies.md#permissions-and-access) of the Policies guide for how the built-in roles map to package access.

1. Navigate to the target group and click on `Packages` on the left sidebar, under the `Registry` section.
2. Click on `New Package`.
3. Enter a `Name` and an optional `Description`.
4. Select a `Type`. Only `OPA` is available today.
5. Select a `Visibility` (see below).
6. Turn on `Allow mutable versions` if you want versions to be re-uploadable in place (see below).
7. Click on `Create Package`.

## Publish a version

Each version of a package carries the content for a specific release. A version can be published through the [API](/docs/setup/api.md), for example from a CI/CD pipeline, or through the version editor in the UI.

To publish through the UI, open the package, click on `Create new version`, enter the `Version`, edit the content, and click on `Publish`.

- A version is identified by a [semantic version](https://semver.org/spec/v2.0.0.html) string, such as `1.0.0`.
- **Mutable** versions can have their content re-uploaded in place without changing the version number. **Fixed** (immutable) versions cannot be changed once uploaded. Whether a package allows mutable versions is set by the `Allow mutable versions` toggle on the package.

Each version has an upload status:

| Status | Meaning |
| --- | --- |
| `Pending` | The version exists but its content has not been uploaded yet. |
| `Upload in progress` | The content is being uploaded. |
| `Uploaded` | The content is uploaded and ready to use. |
| `Errored` | The upload did not complete successfully. |

## Package visibility

Visibility controls which groups can use a package:

- `Private`: the parent group and its subgroups.
- `Root Group`: every group in the root group hierarchy.
- `Global`: all groups.

## Delete a version

To delete a version, open the package, select the version, and choose `Delete version`. You can delete a version, including the one currently marked as the latest. When you delete the latest version, the highest remaining version number becomes the new latest.
