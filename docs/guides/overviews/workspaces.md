---
title: Workspaces
description: "What workspaces help us accomplish"
---

## What are workspaces?

Workspaces contain the actual Terraform deployments and allow the planning, applying, or destroying of infrastructure defined by a Terraform module. In addition, workspaces provide access to a list of runs and their details (logs) among other things like Terraform and environment variables.

Tharsis UI's workspace details page provides access to the deployed resources, input variables, outputs, dependencies, and state file for a given deployment.

> Learn [more](https://www.terraform.io/language/state/workspaces).

:::tip did you know...
[Tharsis Terraform Provider](../../provider/intro) provides access to a workspace's outputs allowing it to be used in a different deployment.
:::

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

---

## Create a workspace

Workspaces can be created directly via the Tharsis UI or the [Tharsis-CLI](../../cli/tharsis/intro.md).

1. From the group details page, click <span style={{ color: '#4db6ac' }}>`NEW WORKSPACE`</span>:
   ![Screenshot of the Tharsis UI showing new workspace button](/img/workspaces/create-workspace.png "Creating workspace")

2. Provide the workspace name, optionally a short memorable description, and click <span style={{ color: '#4db6ac' }}>`CREATE WORKSPACE`</span>:
   ![Screenshot of the Tharsis UI showing new workspace details page](/img/workspaces/new-workspace.png "New workspace details page")

   :::caution
   Workspace names may only contain **digits**, **lowercase** letters with a **hyphen** or an **underscore** in non-leading or trailing positions.

   A workspace's name **cannot** be changed once created. It will have to be deleted and recreated which is **dangerous**.
   :::

## Update a workspace

1. From the workspace details page, click <span style={{ color: '#4db6ac' }}>`EDIT`</span>:
   ![Screenshot of the Tharsis UI showing workspace details page edit button](/img/workspaces/update-workspace.png "Updating a workspace")

2. Provide a new workspace description (can be empty) and click <span style={{ color: '#4db6ac' }}>`UPDATE WORKSPACE`</span>:
   ![Screenshot of the Tharsis UI showing update workspace details page](/img/workspaces/update-workspace-description.png "Update workspace details page")

## Advanced Settings

### Migrate a workspace

1. From the workspace settings page, click the <span style={{ color: '#ffa726' }}>`MIGRATE WORKSPACE`</span> button:
   ![Screenshot of the Tharsis UI showing workspace settings page](/img/workspaces/workspace-settings.png "Settings page")

2. Select the new parent group and then click <span style={{ color: '#4db6ac' }}>`MIGRATE`</span>:
   ![Screenshot of the Tharsis UI showing migrate workspace confirmation](/img/workspaces/migrate-workspaces-confirmation.png "Confirm to migrate a workspace")

:::info
To migrate a workspace, the user must have permissions to create workspaces in the new group hierarchy and delete the workspace from the current group. Without these permissions, the migration will fail.
:::

:::danger migration is dangerous
Migrating a workspace will remove <u>**any inherited resource assignments**</u> (e.g., managed identities, service account memberships, VCS provider links) that are not available in the new group hierarchy. This may result in a failed deployment if not reconfigured. However, resources within the workspace, such as variables, outputs, and state files, will remain intact.
:::

### Delete a workspace

1. From the workspace settings page, click the <span style={{ color: 'red' }}>`DELETE WORKSPACE`</span> button:
   ![Screenshot of the Tharsis UI showing delete workspace dropdown](/img/workspaces/workspace-settings.png "Deleting a workspace")

2. Enter the workspace path to confirm deleting and then click <span style={{ color: 'red' }}>`DELETE`</span>:
   ![Screenshot of the Tharsis UI showing delete workspace confirmation](/img/workspaces/delete-workspace-confirmation.png "Confirm to delete a workspace")

:::danger deletion is dangerous
Deleting a workspace is an <u>**irreversible**</u> operation. All workspace resources such as runs, state files, and outputs will automatically be deleted and <u>**cannot be recovered**</u>.

Proceed with **extreme** caution as force deletion **permanently** removes <u>**ALL**</u> deployment state files and related information from Tharsis. If unsure, **do not** proceed.
:::

## Frequently asked questions (FAQ)

### Who can create / update / delete workspaces?

- A deployer or higher (owner, administrator) can create a workspace.
- Viewer **cannot** modify a workspace.
- System administrator can create / delete **any** workspace.

### Why can't I delete a workspace?

Either you don't have appropriate privileges, or the workspace has resources deployed and Tharsis prevented an accidental deletion.

### I'm confident my Terraform configuration is correct but my runs keep failing. What could be a potential issue?

If your configuration is correct and no other errors are suspected, it could be that you simply forgot to [assign a managed identity](./managed_identities#assign-a-managed-identity) to your workspace. A deployment to AWS or Azure will fail if no IAM role can be assumed.

### How many jobs can simultaneously run on a workspace?

All jobs process in a first in, first out order. A workspace can only have one active job at any given moment.

### Where can I find an overview of my deployed resources, outputs, state file, etc.?

Once a run completes its apply stage, the run populates the workspace details page. The user can view deployed resources, input variables, outputs, dependencies, and of course the state file right from the Tharsis UI.

<details>
<summary>Populated workspace details page</summary>

![Screenshot of the Tharsis UI showing workspace details page](/img/workspaces/workspace-details.png "Workspace details page")

</details>

### How do I assign a managed identity to a workspace?

See [assign a managed identity](./managed_identities.md#assign-a-managed-identity) for the Tharsis UI.
