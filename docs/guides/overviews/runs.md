---
title: Runs
description: "What are runs and why they are important"
---

## What are runs?

A run is a unit of execution, either a plan or apply, to create, update, or destroy resources.

Tharsis UI's workspace page shows whether there is a run currently active in the workspace. From the `Runs` tab, the runs page shows a list of the current and past runs for the workspace. Clicking on the run ID will show more detail about the selected run.

:::tip Did you know...
A run can be of type speculative plan, non-speculative plan, or apply. Any plan can be set to either destroy or to create or update the module resources. When created via the Tharsis UI, a run can execute either a stored module, a configuration version, or a VCS workspace link.
:::

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

---

## Create or launch a run

Runs can be created directly via the UI or the [Tharsis-CLI](../../cli/tharsis/intro.md).

### Creating a run via the UI

1. From the workspace page, click the left-hand `Runs` tab to get to the runs page.

![Screenshot of the Tharsis UI page - Workspace page, Runs tab](/img/runs/run-tab.png "Workspace Detail page, Runs tab")

2. Then, click the <span style={{ color: '#4db6ac' }}>`CREATE RUN`</span> button.

![Screenshot of the Tharsis UI page - Runs page](/img/runs/runs-page.png "Runs page")

3. Select the `Module`, `Configuration Version`, or `VCS Workspace Link` button and then follow the UI's prompts to specify the details of the run to be created.

![Screenshot of the Tharsis UI page - Create Run page](/img/runs/create-run-page.png "Create Run page")

4. Finally, select the <span style={{ color: '#4db6ac' }}>`CREATE RUN`</span> button to create or launch the run. The run details page will open, which allows you to see the job logs and status updates as the run executes. You can also see the effective run variables by selecting the `VARIABLES` tab.

![Screenshot of the Tharsis UI page - Create Run final page](/img/runs/create-run-final.png "Create Run final page")

## Cancel a run in progress

1. From the run details page of an active run, click the <span style={{ color: '#f44336' }}>CANCEL</span> button in the upper right-hand corner. That will initiate the process to gracefully cancel the run.

![Screenshot of the Tharsis UI page - Cancel Run page](/img/runs/cancel-run.png "Cancel Run page")

2. If the graceful cancellation does not succeed within a preset time limit (normally 30 minutes), you can force the run to be canceled.

3. If you need to forcibly cancel a run without waiting for the graceful cancellation attempt to finish, one option is to delete the workspace.

:::caution Deleting a workspace is not usually recommended
Deleting a workspace is an <u>**irreversible**</u> operation and will remove everything that you have set up in the workspace, including variables, run history, state versions, managed identities, members, and other settings.
:::

## Destroy a workspace's current resources with one click

1. From the workspace page, select the <span style={{ color: '#f44336' }}>`DESTROY WORKSPACE`</span> button.

:::caution
Please note that this button will launch a destroy run that will destroy the deployed resources, but it does not delete the workspace itself.
:::

![Screenshot of the Tharsis UI page - Destroy Workspace button](/img/runs/destroy-workspace-button.png "Destroy Workspace button")

## Frequently asked questions (FAQ)

### Who can create or launch runs?

- Owner and deployer can launch a run.
- Viewer **cannot** launch a run.
- System administrator can launch a run in any workspace.

### What is the difference between a speculative plan and a non-speculative plan?

A speculative plan is used to preview the changes that will be made to the resources if the plan is applied without actually making the changes. A non-speculative plan is used to create, update, or destroy resources.

### Where can I find the run variables?

From the run details page, select the `VARIABLES` tab to see the run variables.

### Why can't I see the values for the run variables?

You may not have the necessary permissions to view the run variables. Please contact the workspace owner or a system administrator for assistance.

### Why is my run stuck in the `QUEUED` state when using a group runner agent?

The runner agent may not be able to connect to the Tharsis server. Please make sure the runner has a service account assigned to it. This can be done via the UI or the [Tharsis-CLI](/docs/cli/tharsis/commands.md#runner-agent-assign-service-account-subcommand).
