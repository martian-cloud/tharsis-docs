---
title: Service Accounts
description: "What are service accounts and when to use them"
---

## What are service accounts?

Service Accounts are used for Machine to Machine (M2M) authentication and use [OIDC](https://openid.net/connect/) federation to log in to Tharsis. For instance, they allow a CI/CD pipeline to authenticate and interface with Tharsis.

:::tip Did you know...
Service accounts allow the Tharsis CLI to be directly integrated into a [CI/CD](https://en.wikipedia.org/wiki/CI/CD) pipeline.
:::

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

---

## Create a service account

1. Navigate to the target group's page and click on the `Service Accounts` tab to get to the service accounts page. Click on the `NEW SERVICE ACCOUNT` button. Give it a name, an optional description, and add information about Trusted Identity Providers with their issuer URL and bound claims.

2. Add the service account as a member to a group or workspace:

   - Navigate to the group or workspace where this service account will be used and head to the `Members` page on the left and click on <span style={{ color: '#4db6ac' }}>`ADD MEMBER`</span>:
     ![Screenshot of the Tharsis UI showing members page](/img/service_accounts/members-page.png "Members page")

   - Click on `Service Account` in the `Add Member` page:
     ![Screenshot of the Tharsis UI showing add member page](/img/service_accounts/add-member-page.png "Add member page")

   - Click on the `Service Account` field and select the appropriate service account that was just created, a role, and click <span style={{ color: '#4db6ac' }}>`ADD MEMBER`</span>:
     ![Screenshot of the Tharsis UI showing add member details](/img/service_accounts/add-member-details.png "Add member details")

3. Update your GitLab pipeline to use the service account to authenticate with Tharsis:

## Update a service account

To update a service account, navigate to the "Service Accounts" page, select the service account you want to update, and click on the "Edit" button.

You can update the description and Identity Provider information with bound claims. Click `Update Service Account` to save the changes.

## Delete a service account

To delete a service account, navigate to the "Service Accounts" page, select the service account you want to delete, and click on the upside-down caret next to the "Edit" button. Then click on the "Delete Service Account" button.

:::danger
Deleting a service account will break any integrations that rely on it, such as CI/CD pipelines.
:::

## Assigning Roles to a Service Account

After creating a service account, you can assign roles to it. Navigate to the target group or workspace page and click on the "Members" tab. Then click on the "Add Member" button.

Select "Service Account" from the options and search for the service account you want to assign a role to. Then select the role you want to assign to the service account and click `Add Member`. Generally, a `deployer` role is sufficient for most use cases.

:::warning
Without a role, the service account will not be able to access any resources in the group or workspace.
:::

## Frequently asked questions (FAQ)

### Who can create / update / delete service accounts?

Deployer or higher roles can create a service account.

### How do I use a service account with the Phobos CLI?

See the [CLI documentation](/docs/cli/tharsis/intro.md#service-account) for more information.

### Why is my service account not working?

Please make sure that the service account is a member of the group or workspace and has the necessary role assigned to it. Also, ensure that the service account has the correct Identity Provider information with bound claims.

### What are bound claims?

Bound claims are used to verify the JSON Web Token (JWT) that is issued by the Identity Provider against the service account upon login. Some common claims are `aud`, `sub`, `namespace_path`, `job_id`, etc., depending on the Identity Provider.

### What is the difference between a service account and a user account?

A service account is used for Machine to Machine (M2M) authentication and uses [OIDC](https://openid.net/connect/) federation to log in to Tharsis. For instance, they allow a CI/CD pipeline to authenticate and interface with Tharsis.

### How do I use a service account with the Tharsis CLI?

The Tharsis CLI can be directly integrated into a [CI/CD](https://en.wikipedia.org/wiki/CI/CD) pipeline using a service account.

### Should I just give my service account an owner role?

No, it is not recommended to give a service account an owner role. Generally, a `deployer` role is sufficient for most use cases. An owner role will allow the service account to manage the group, its members, and arbitrarily perform any action within the namespace. This goes against the principle of least privilege.

### Can a service account from one group access resources in another group?

No, a service account can only access resources within the group it is a member of.

### Will the CLI periodically renew the token for the service account?

Yes, the CLI will periodically renew the token for the service account. The token should be renewed a short period of time before it expires.
