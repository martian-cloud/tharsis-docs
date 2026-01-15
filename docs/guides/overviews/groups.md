---
title: Groups
description: "What are groups and why they are important"
---

## What are groups?

Groups are containers that hold configuration information to help organize workspaces in a hierarchical manner.

Tharsis UI's groups page provides access to global Terraform/environment variables shared by all nested workspaces/groups, managed identities for assuming roles when deploying in workspaces, a members page, and a settings page as well (coming soon!).

:::tip did you know...
Groups can be nested like a tree structure, meaning subgroups can be created as needed. Any given group may optionally contain one or more workspaces.
:::

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

---

## Create a group

Groups can be created directly via the UI or the [Tharsis-CLI](../../cli/tharsis/intro.md).
:::caution top-level groups
**Top-level** groups may only be created by system administrators.
:::

### Creating a subgroup via the UI

1. From the group details page, click the `New Subgroup` button in the upper right-hand corner:
   ![Screenshot of the Tharsis UI showing new subgroup button](/img/groups/create-subgroup.png "Creating subgroup")

2. Provide the group name, optionally a short memorable description, and click <span style={{ color: '#4db6ac' }}>`CREATE GROUP`</span>:
   ![Screenshot of the Tharsis UI showing new group details page](/img/groups/new-group.png "New group details page")

   :::caution
   Group names may only contain **digits**, **lowercase** letters with a **hyphen** or an **underscore** in non-leading or trailing positions.

   A group's name **cannot** be changed once created. It will have to be deleted and recreated, which is **dangerous**.
   :::

## Update a group

1. Click `Settings` on the left-hand side navigation menu to navigate to the group settings page:
   ![Screenshot of the Tharsis UI showing group details with Settings highlighted](/img/groups/update-group.png "Navigating to settings")

2. Provide a new group description (can be empty) and click <span style={{ color: '#4db6ac' }}>`SAVE CHANGES`</span>:
   ![Screenshot of the Tharsis UI showing group settings page](/img/groups/update-group-description.png "Settings page")

## Advanced Settings

### Migrate a group

1. From the group settings page, click the <span style={{ color: '#ffa726' }}>`MIGRATE GROUP`</span> button:
   ![Screenshot of the Tharsis UI showing group settings page](/img/groups/group-settings.png "Settings page")

2. Select the new parent group and then click <span style={{ color: '#4db6ac' }}>`MIGRATE`</span>:
   ![Screenshot of the Tharsis UI showing migrate group confirmation](/img/groups/migrate-group-confirmation.png "Confirm to migrate a group")

:::info
To migrate a group, the user must have permissions to create a group in the new hierarchy and delete the group from the current hierarchy. Without these permissions, the migration will not succeed. To migrate a group to root level, the user must have system administrator permissions.
:::

:::danger migration is dangerous
Migrating a group will remove <u>**any inherited resource assignments**</u>, such as managed identities, service accounts, etc., that are not available in the new group hierarchy.
:::

### Delete a group

1. From the group settings page, click the <span style={{ color: 'red' }}>`DELETE GROUP`</span> button:
   ![Screenshot of the Tharsis UI showing group settings page](/img/groups/group-settings.png "Settings page")

2. Enter the group path to confirm deleting and then click <span style={{ color: 'red' }}>`DELETE`</span>:
   ![Screenshot of the Tharsis UI showing delete group confirmation](/img/groups/delete-group-confirmation.png "Confirm to delete a group")

:::danger deletion is dangerous
Deleting a group is an <u>**irreversible**</u> operation. All nested groups and/or workspaces with their associated deployment states will be deleted and <u>**cannot be recovered**</u>.

Proceed with **extreme** caution as deletion **permanently** removes <u>**ALL**</u> nested groups and/or workspaces with their associated deployment states. If unsure, **do not** proceed.
:::

## Frequently asked questions (FAQ)

### Who can create/update/migrate/delete groups?

- Owner can delete top-level groups; deployer can delete lower-level groups.
- Owner and deployer can migrate a group. They must also be an owner or deployer in the target parent group.
- Viewer **cannot** modify a group.
- System administrator can create/migrate/delete **any** group.
