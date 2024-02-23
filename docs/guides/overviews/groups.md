---
title: Groups
description: "What are groups and why they are important"
---

### What are groups?

Groups are containers that hold configuration information to help organize workspaces in a hierarchical manner.

Tharsis UI's groups page provides access to global Terraform / environment variables shared by all nested workspaces / groups, managed identities for assuming roles when deploying in workspaces, a members page and a settings page as well (coming soon!).

:::tip did you know...
Groups can be nested like a tree structure, meaning subgroups can be created as needed. Any given group may optionally contain one or more workspaces.
:::

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

---

### Create a group

Groups can be created directly via the UI or the [Tharsis-CLI](../../cli/tharsis/intro.md).
:::caution top-level groups
**Top-level** groups may only be created by system administrators.
:::

#### Creating a subgroup via the UI

1. From the group details page, click <span style={{ color: '#4db6ac' }}>&#9660;</span> next to <span style={{ color: '#4db6ac' }}>`NEW WORKSPACE`</span>, then `New Subgroup`:
   ![Screenshot of the Tharsis UI showing create subgroup dropdown](/img/groups/create-subgroup.png "Creating subgroup")

2. Provide the group name, optionally a short memorable description and click <span style={{ color: '#4db6ac' }}>`CREATE GROUP`</span>:
   ![Screenshot of the Tharsis UI showing new group details page](/img/groups/new-group.png "New group details page")

   :::caution
   Group names may only contain **digits**, **lowercase** letters with a **hyphen** or an **underscore** in non-leading or trailing positions.

   A group's name **cannot** be changed once created. It will have to be deleted and recreated which is **dangerous**.
   :::

### Update a group

1. From group details page, click <span style={{ color: '#4db6ac' }}>&#9660;</span> next to <span style={{ color: '#4db6ac' }}>`NEW WORKSPACE`</span>, then `Edit Group`:
   ![Screenshot of the Tharsis UI showing edit group dropdown](/img/groups/update-group.png "Updating a group")

2. Provide a new group description (can be empty) and click <span style={{ color: '#4db6ac' }}>`UPDATE GROUP`</span>:
   ![Screenshot of the Tharsis UI showing update group details page](/img/groups/update-group-description.png "Update group details page")

### Delete a group

1. From group details page, click <span style={{ color: '#4db6ac' }}>&#9660;</span> next to <span style={{ color: '#4db6ac' }}>`NEW WORKSPACE`</span>, then `Delete Group`:
   ![Screenshot of the Tharsis UI showing delete group dropdown](/img/groups/delete-group.png "Deleting a group")

2. Click <span style={{ color: 'red' }}>`DELETE`</span>:

   ![Screenshot of the Tharsis UI showing delete group confirmation](/img/groups/delete-group-confirmation.png "Confirm to delete a group")

:::danger deletion is dangerous
Deleting a group is an <u>**irreversible**</u> operation. Although, Tharsis will try to prevent a deletion where nested groups / workspaces are present, an option to forcefully delete may be introduced in the Tharsis UI in the near future to override that behavior.

Proceed with **extreme** caution as force deletion **permanently** removes <u>**ALL**</u> nested groups and/or workspaces with their associated deployment states. If unsure, **do not** proceed.
:::

### Frequently asked questions (FAQ)

#### Who can create / update / delete groups?

- Owner can delete top-level group; deployer can delete lower-level groups.
- Viewer **cannot** modify a group.
- System administrator can create / delete **any** group.
