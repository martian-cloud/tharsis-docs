---
title: Workspaces
description: "What workspaces help us accomplish"
---

### What are workspaces?

Workspaces contain the actual Terraform deployments and allow the planning, applying or destroying of infrastructure defined by a Terraform module. In addition, workspaces provide access to a list of runs and their details (logs) among other things like Terraform and environment variables.

Tharsis UI's workspace details page provides access to the deployed resources, input variables, outputs, dependencies and state file for a given deployment.

> Learn [more](https://www.terraform.io/language/state/workspaces).

:::tip did you know...
[Tharsis Terraform Provider](../../provider/intro) provides access to a workspace's outputs allowing it to be used in a different deployment.
:::

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

---

### Create a workspace

Workspaces can be created directly via the Tharsis UI or the [Tharsis-CLI](../../cli/tharsis/intro.md).

1. From the group details page, click <span style={{ color: '#4db6ac' }}>`NEW WORKSPACE`</span>:
   ![Screenshot of the Tharsis UI showing new workspace button](/img/workspaces/create-workspace.png "Creating workspace")

2. Provide the workspace name, optionally a short memorable description and click <span style={{ color: '#4db6ac' }}>`CREATE WORKSPACE`</span>:
   ![Screenshot of the Tharsis UI showing new workspace details page](/img/workspaces/new-workspace.png "New workspace details page")

   :::caution
   Workspace names may only contain **digits**, **lowercase** letters with a **hyphen** or an **underscore** in non-leading or trailing positions.

   A workspace's name **cannot** be changed once created. It will have to be deleted and recreated which is **dangerous**.
   :::

### Update a workspace

1. From the workspace details page, click <span style={{ color: '#4db6ac' }}>`EDIT`</span>:
   ![Screenshot of the Tharsis UI showing workspace details page edit button](/img/workspaces/update-workspace.png "Updating a workspace")

2. Provide a new workspace description (can be empty) and click <span style={{ color: '#4db6ac' }}>`UPDATE WORKSPACE`</span>:
   ![Screenshot of the Tharsis UI showing update workspace details page](/img/workspaces/update-workspace-description.png "Update workspace details page")

### Delete a workspace

1. From the workspace details page, select <span style={{ color: '#4db6ac' }}>&#9660;</span> next to <span style={{ color: '#4db6ac' }}>`EDIT`</span>, then `Delete Workspace`:
   ![Screenshot of the Tharsis UI showing delete workspace dropdown](/img/workspaces/delete-workspace.png "Deleting a workspace")

2. Click <span style={{ color: 'red' }}>`DELETE`</span>:

   ![Screenshot of the Tharsis UI showing delete workspace confirmation](/img/workspaces/delete-workspace-confirmation.png "Confirm to delete a workspace")

:::danger deletion is dangerous
Deleting a workspace is an <u>**irreversible**</u> operation. Although, the API will try to prevent a deletion with potential deployments, an option to forcefully delete may be introduced in the Tharsis UI in the near future to override that behavior.

Proceed with **extreme** caution as force deletion **permanently** removes <u>**ALL**</u> deployment state files and related information from Tharsis. If unsure, **do not** proceed.
:::

### Frequently asked questions (FAQ)

- Who can create / update / delete workspaces?

  - A deployer or higher (owner, administrator) can create a workspace.
  - Viewer **cannot** modify a workspace.
  - System administrator can create / delete **any** workspace.

- Is there a limit to how many workspaces can be created?

  - At the moment, there is no limit.

- Why can't I delete a workspace?

  - Either you don't have appropriate privileges, or the workspace has resources deployed and Tharsis prevented an accidental deletion.

- I don't see an option to **forcefully** delete my workspace in the UI, is there another way?

  - See and understand the warning <span style={{ color: 'red' }}>`DELETION IS DANGEROUS`</span> in [deleting a workspace](#delete-a-workspace).
  - At the moment, a workspace can be forcefully deleted only with a GraphQL [mutation](https://graphql.org/learn/queries/#mutations) using GraphiQL editor in Tharsis UI. Simply click on your profile icon in top-right corner and select `GraphiQL Editor`. On the left side of the editor copy and paste this mutation.

    <details><summary>Force delete workspace GraphQL mutation</summary>

    ```graphql collapsed showLineNumbers
    mutation {
      deleteWorkspace(
        input: {
          workspacePath: "the/full-path/to/the/workspace/goes/here"
          force: true
        }
      ) {
        problems {
          type
          message
        }
      }
    }
    ```

    :::tip

    Run with **&#9655;** (play) button in GraphiQL Editor.

    :::

    :::caution api is not yet stable!

    Mutations are subject to change with improvements to the Tharsis API.

    :::

    </details>

  - If the force deletion is successful, the following response is returned:
    <details><summary>Successful delete workspace GraphQL response</summary>

    ```graphql
    {
      "data": {
        "deleteWorkspace": {
          "problems": []  # This must be empty.
        }
      },
      "extensions": {
        "cost": {
          "throttled": false,
          "requestedQueryCost": 10,
          "maxQueryCost": 0,
          "remaining": 0
        }
      }
    }
    ```

    :::caution api is not yet stable!

    Responses are subject to change with improvements to the Tharsis API.

    :::

    </details>

- I'm confident my Terraform configuration is correct but my runs keep failing. What could be a potential issue?

  - If your configuration is correct and no other errors are suspected, it could be that you simply forgot to [assign a managed-identity](./managed_identities#assign-a-managed-identity) to your workspace. A deployment to AWS or Azure will fail if no IAM role can be assumed.

- How many jobs can simultaneously run on a workspace?

  - All jobs process in a first in, first out order. A workspace can only have one active job at any given moment.

- Where can I find my an overview of my deployed resources, outputs, state file etc.?

  - Once a run completes its apply stage, the run populates the workspace details page. The user can view deployed resources, input variables, outputs, dependencies and of course the state file right from the Tharsis UI.
    <details><summary>Populated workspace details page</summary>

    ![Screenshot of the Tharsis UI showing workspace details page](/img/workspaces/workspace-details.png "Workspace details page")

    </details>

- How do I assign a managed identity to a workspace?

  - See [assign a managed identity](./managed_identities.md#assign-a-managed-identity) for the Tharsis UI.
