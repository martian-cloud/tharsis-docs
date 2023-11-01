---
title: Memberships, Roles and Namespaces
description: "How memberships, roles and namespaces interconnect"
---

### What are memberships, roles and namespaces?

Memberships are the link between group hierarchy, workspaces and user, teams and other workloads.

Groups and workspaces represent namespace types, which memberships are associated with. Within a group hierarchy, memberships are inherited by nested groups and workspaces.

Each membership is associated with a role (viewer, deployer, owner) that determines the access level and therefore the capabilities of the membership. A viewer, for example, is a read-only role and therefore cannot modify any of data within namespaces. A deployer or higher, however, can modify (create, update, delete) groups, workspaces, service accounts, etc.

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

---

### Membership types and differences

- Tharsis offers three types of memberships:

  - User (a human user)
  - Team (collection of human users)
  - Service Account (M2M)

:::note
While user and team interconnect to represent human users, a [service account](./service_accounts.md#what-are-service-accounts) on the other hand, is used for Machine to Machine (M2M) authentication like a CI/CD pipeline interfacing with Tharsis.
:::

### Membership breakdown

#### Non-visual representation

- Each group, workspace has a membership list.
- A membership list can include users, teams and service accounts.
- Only a human user (not a service account, etc.) can be member of a team.
- Making a team a member of a group (or workspace) gives all users who are members of that team access.

#### Visual representation

![Membership and namespace flowchart](/img/memberships/flowchart.png "Memberships and namespaces")

:::note
A group can have one or more subgroups and/or workspaces.

A team can also be assigned a role, making the process of access control more streamlined.
:::

### Roles and permissions

- Tharsis offers three types of roles out-of-the-box:

  - **Viewer**
    - Read-only permissions to group or workspace.
    - Can view all workspace data except sensitive data like the state file and variables.
  - **Deployer**
    - Has all required permissions to configure and deploy modules.
    - Can modify (create / update / delete) groups, workspaces, service accounts, etc.
    - Can execute plan, apply and teardown operations
    - Primarily for day-to-day DevOps roles.
  - **Owner**
    - Group admin permissions.
    - Can manage group memberships, managed identities.
    - Sets group / workspace policies.

- Custom roles <span style={{ color: 'red' }}>`(NOT YET SUPPORTED)`</span>

  - Useful when default roles are not sufficient.
  - Provide a mechanism for assigning granular permissions to roles.
  - Can only be created by system admins.

### Frequently asked questions (FAQ)

- If multiple memberships are specified for the same subject in a namespace hierarchy, which one takes precedence?

  - The first membership found while traversing up the hierarchy will take precedence.

- Where can I manage the members for a group or a workspace?

  - From the group / workspace details page, select `Members` tab on the left sidebar.
    <details>
    <summary>Click here for a visual</summary>

    ![Screenshot of the Tharsis UI showing members page](/img/memberships/members.png "Members")

    </details>
