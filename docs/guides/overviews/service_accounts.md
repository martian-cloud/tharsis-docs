---
title: Service Accounts
description: "What are service accounts and when to use them"
---

### What are service accounts?

Service Accounts are used for Machine to Machine (M2M) authentication and use [OIDC](https://openid.net/connect/) federation to login to Tharsis. For instance, they allow a CI/CD pipeline to authenticate and interface with Tharsis.

:::tip did you know...
Service accounts allow the Tharsis CLI to be directly integrated into a [CI/CD](https://en.wikipedia.org/wiki/CI/CD) pipeline. [Tharsis demo Terraform module](https://changeme.example.com) provides an example CI/CD configuration with GitLab to help you get started.
:::

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

---

### Create a service account

1. At the moment, a service account can only be created with a GraphQL [mutation](https://graphql.org/learn/queries/#mutations) using GraphiQL Editor in the Tharsis UI. Simply click on your profile icon in top-right corner and select `GraphiQL Editor`.

   <details><summary>Create service account GraphQL mutation</summary>

   ```graphql showLineNumbers
   mutation {
     createServiceAccount(
       input: {
         name: "enter-service-account-name-here"
         description: "Enter a description of your service account here."
         groupPath: "topGroup/nextGroup/.../lowestGroup"
         oidcTrustPolicies: [
           {
             issuer: "https://git.example.com"
             boundClaims: [
               {
                 name: "namespace_path"
                 value: "path to git group that will be granted access"
               }
             ]
           }
         ]
       }
     ) {
       serviceAccount {
         id
         resourcePath
       }
       problems {
         type
         message
       }
     }
   }
   ```

   > Add the `name` you want to use for your service account, an optional `description`, the `groupPath` starting with your top-level group down to the group where this service account will be used. Also, add the value of the `boundClaims` from the service account trust policy.

   :::tip

   Run with **&#9655;** (play) button in GraphiQL Editor.

   :::

   :::caution
   Service account names may only contain **digits**, **lowercase** letters with a **hyphen** or an **underscore** in non-leading or trailing positions.

   A service account's name **cannot** be changed once created. It will have to be deleted and recreated which is **dangerous**.
   :::

   :::caution api is not yet stable!

   Mutations are subject to change with improvements to the Tharsis API.

   :::

   </details>

      <details><summary>Successful service account creation GraphQL response</summary>

   ```graphql showLineNumbers
   {
      "data": {
        "createServiceAccount": {
          "serviceAccount": {
            "id": "U0FfNGIyYWNkMmYtYTAxNy00MzljLTliYzItYzc4NWU5MzM5NWE5",
            "resourcePath": "test/a-sample-service-account"
          },
          "problems": [] # This must be empty.
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

   :::info important!

   Note down the service account `id` somewhere safe incase you would like to modify the service account after creation. This will not be necessary after after more service account support is added to the Tharsis UI and is only needed for GraphQL mutations through `GraphiQL Editor`.

   :::

   :::caution api is not yet stable!

   Responses are subject to change with improvements to the Tharsis API.

   :::

   </details>

2. Add the service account as a member to a group or workspace:

   - Navigate to the group or workspace where this service account will be used and head to the `Members` page on the left and click on <span style={{ color: '#4db6ac' }}>`ADD MEMBER`</span>:
     ![Screenshot of the Tharsis UI showing members page](/img/service_accounts/members-page.png "Members page")

   - Click on `Service Account` in `Add Member` page:
     ![Screenshot of the Tharsis UI showing add member page](/img/service_accounts/add-member-page.png "Add member page")

   - Click on the `Service Account` field and select the appropriate service account that was just created, a role and click <span style={{ color: '#4db6ac' }}>`ADD MEMBER`</span>:
     ![Screenshot of the Tharsis UI showing add member details](/img/service_accounts/add-member-details.png "Add member details")

3. Update your GitLab pipeline to use the service account to authenticate with Tharsis:

   - Use the [Tharsis demo Terraform module](https://changeme.example.com) project to get started.

### Update a service account

1. At the moment, a service account can only be updated with a GraphQL [mutation](https://graphql.org/learn/queries/#mutations) using GraphiQL Editor in the Tharsis UI. Simply click on your profile icon in top-right corner and select `GraphiQL Editor`.

   Updating a service accounts allows for setting a new `description`, `issuer` and `boundClaims` in `oidcTrustPolicies` fields.

   <details><summary>Update service account GraphQL mutation</summary>

   ```graphql showLineNumbers
   mutation {
     updateServiceAccount(
       input: {
         id: "U0FfMWI0MDljOWMtMDgxMy00ZmJjLTliM2EtM2YzNmRkNDIwYmI5" # Replace me!
         description: "This is the new description and its optional"
         oidcTrustPolicies: {
           issuer: "https://git.example.com"
           boundClaims: [
             {
               name: "namespace_path"
               value: "path to git group that will be granted access"
             }
           ]
         }
       }
     ) {
       problems {
         type
         message
       }
     }
   }
   ```

   > Replace the `id` field value with the one you copied when creating the service account.

   :::tip

   Run with **&#9655;** (play) button in GraphiQL Editor.

   :::

   :::caution api is not yet stable!

   Mutations are subject to change with improvements to the Tharsis API.

   :::

   </details>

   <details><summary>Successful update service account GraphQL response</summary>

   ```graphql
   {
      "data": {
        "updateServiceAccount": {
          "problems": [] # This must be empty.
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

### Delete a service account

1. At the moment, a service account can only be deleted with a GraphQL [mutation](https://graphql.org/learn/queries/#mutations) using GraphiQL Editor in the Tharsis UI. Simply click on your profile icon in top-right corner and select `GraphiQL Editor`.

   <details><summary>Delete service account GraphQL mutation</summary>

   ```graphql showLineNumbers
   mutation {
     deleteServiceAccount(
       input: { id: "U0FfNGIyYWNkMmYtYTAxNy00MzljLTliYzItYzc4NWU5MzM5NWE5" } # Replace me!
     ) {
       problems {
         type
         message
       }
       clientMutationId
     }
   }
   ```

   > Replace the `id` field value with the one you copied when creating the service account.

   :::tip

   Run with **&#9655;** (play) button in GraphiQL Editor.

   :::

   :::caution api is not yet stable!

   Mutations are subject to change with improvements to the Tharsis API.

   :::

   :::danger deletion is dangerous

   Deleting a service account is an <u>**irreversible**</u> operation. Anything making use of this service account will **not** be able to authenticate with Tharsis such as a CI/CD pipeline. Proceed with **extreme** caution.

   :::

   </details>

   <details><summary>Successful delete service account GraphQL response</summary>

   ```graphql
   {
      "data": {
        "deleteServiceAccount": {
          "problems": [], # This must be empty.
          "clientMutationId": null
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

   Response are subject to change with improvements to the Tharsis API.

   :::

   </details>

### Frequently asked questions (FAQ)

- Who can create / update / delete service accounts?
  - Deployer role or higher can modify service accounts.
  - Viewer **cannot** modify service accounts.
