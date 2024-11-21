---
title: Installation and Build Guide
description: "An installation and build guide for the Tharsis API"
---

At the moment, the Tharsis API does not provide any binaries. However, it is possible to run it locally with the following instructions.

## Build and run locally (Docker)

:::tip
Even easier, use the provided Docker images. Learn [more](../docker/install.md).
:::

### Requirements

- [Go](https://go.dev/doc/install)
- [Make](https://www.gnu.org/software/make/)
- Optional Go packages for linting and testing:
  ```shell showLineNumbers
  go install golang.org/x/lint/golint@latest
  go install github.com/vektra/mockery/v2@latest
  ```

### Build from source (Docker)

```shell title="Git clone the project to the local machine"
git clone https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-api.git
```

```shell showLineNumbers title="Start the PostgreSQL database"
cd <project-directory>
make db-start
```

```shell title="Prepare the database"
make migrate
```

```shell title="Build the API binary"
make build-api
```

```shell showLineNumbers title="Build the API Docker image and run it"
make build-api-docker
make run-api-docker
```

## Environment variables

<details>
<summary>Expand for a list and explanation</summary>

|                                                     Name |        Generic Value        | Description                                                      |
| -------------------------------------------------------: | :-------------------------: | ---------------------------------------------------------------- |
|                   `THARSIS_OAUTH_PROVIDERS_0_ISSUER_URL` |              -              | Configured OIDC provider's issuer URL.                           |
|                    `THARSIS_OAUTH_PROVIDERS_0_CLIENT_ID` |              -              | Client ID for identity provider.                                 |
|               `THARSIS_OAUTH_PROVIDERS_0_USERNAME_CLAIM` |              -              | Supported username claim.                                        |
|                        `THARSIS_OAUTH_PROVIDERS_0_SCOPE` |              -              | OAuth scopes used by the Tharsis UI.                             |
|                   `THARSIS_OAUTH_PROVIDERS_0_LOGOUT_URL` |              -              | Logout URL for the Tharsis UI.                                   |
|                              `THARSIS_TFE_LOGIN_ENABLED` |            true             | Boolean specifying if Terraform Login is enabled.                |
|                            `THARSIS_TFE_LOGIN_CLIENT_ID` |              -              | Client ID for Terraform login.                                   |
|                               `THARSIS_TFE_LOGIN_SCOPES` |              -              | Login scopes for Terraform login.                                |
|                               `THARSIS_ADMIN_USER_EMAIL` |              -              | Email for the default API admin user if one is to be created.    |
|                                    `THARSIS_DB_PASSWORD` |          postgres           | The clear-text password for the PostgreSQL database.             |
|                                    `THARSIS_DB_USERNAME` |          postgres           | The username for the PostgreSQL database.                        |
|                              `THARSIS_DB_PASSWORD_CRYPT` |              -              | Encrypted version of the password for the PostgreSQL database.   |
|                                `THARSIS_DB_PASSWORD_ARN` |            none             | The Amazon Resource Number (ARN) where DB password is stored.    |
|                                        `THARSIS_DB_NAME` |           tharsis           | Username for PostgreSQL database.                                |
|                                        `THARSIS_DB_HOST` |          localhost          | Host address the database container binds to.                    |
|                                        `THARSIS_DB_PORT` |            5432             | Port number where API connects with the database.                |
|                                    `THARSIS_DB_SSL_MODE` |            false            | Boolean indicating if database uses SSL.                         |
|                       `THARSIS_OBJECT_STORE_PLUGIN_TYPE` |           aws_s3            | Object store plugin type.                                        |
|                `THARSIS_OBJECT_STORE_PLUGIN_DATA_BUCKET` |              -              | Name of the bucket where objects will be stored.                 |
|                `THARSIS_OBJECT_STORE_PLUGIN_DATA_REGION` |              -              | Region where the object store is hosted.                         |
|     `THARSIS_OBJECT_STORE_PLUGIN_DATA_AWS_ACCESS_KEY_ID` |              -              | AWS access key ID used to access the object store.               |
| `THARSIS_OBJECT_STORE_PLUGIN_DATA_AWS_SECRET_ACCESS_KEY` |              -              | AWS secret access key used to access the object store.           |
|              `THARSIS_OBJECT_STORE_PLUGIN_DATA_ENDPOINT` |    http://localhost:9000    | URL to the object store.                                         |
|                       `THARSIS_JWS_PROVIDER_PLUGIN_TYPE` |              -              | JSON Web Signature (JWS) provider plugin type.                   |
|                `THARSIS_JWS_PROVIDER_PLUGIN_DATA_KEY_ID` |              -              | JWS provider key ID.                                             |
|                `THARSIS_JWS_PROVIDER_PLUGIN_DATA_REGION` |              -              | Region where plugin is hosted.                                   |
|                     `THARSIS_JOB_DISPATCHER_PLUGIN_TYPE` |           docker            | Type of job executor plugin: kubernetes, ecs, docker, local.     |
|             `THARSIS_JOB_DISPATCHER_PLUGIN_DATA_API_URL` |    http://localhost:8000    | Job dispatcher API URL.                                          |
|                `THARSIS_JOB_DISPATCHER_PLUGIN_DATA_HOST` | unix:///var/run/docker.sock | Host for the job dispatcher.                                     |
|         `THARSIS_JOB_DISPATCHER_PLUGIN_DATA_EXTRA_HOSTS` |              -              | Extra hosts for job executor docker configuration.               |
|               `THARSIS_JOB_DISPATCHER_PLUGIN_DATA_IMAGE` |              -              | Docker image used for the job executor.                          |
|         `THARSIS_JOB_DISPATCHER_PLUGIN_DATA_LOCAL_IMAGE` |            true             | Boolean specifying if job executor image is using a local image. |
|                                        `THARSIS_API_URL` |    http://localhost:8000    | Endpoint where the Tharsis API will be accessible.               |
|                     `THARSIS_SERVICE_ACCOUNT_ISSUER_URL` |    http://localhost:8000    | Issuer URL for Tharsis service account authentication.           |
|                             `THARSIS_OTEL_TRACE_ENABLED` |            true             | Boolean specifying whether tracing is enabled.                   |
|                                `THARSIS_OTEL_TRACE_TYPE` |        otlp or xray         | Type of tracing data to send.                                    |
|                                `THARSIS_OTEL_TRACE_HOST` |              -              | Host name or IP address to send trace data to.                   |
|                                `THARSIS_OTEL_TRACE_PORT` |            4317             | Port to send trace data to.                                      |
|                                        `HTTP_RATE_LIMIT` |             60              | HTTP requests per second allowed by the rate limiter             |

</details>

:::note
If running within WSL using Docker Desktop it might be necessary to change: `THARSIS_DB_HOST=kubernetes.docker.internal`.
:::

## Supported databases

The Tharsis API requires a database to store persistent information such as, groups, workspaces, users, etc. It currently supports PostgreSQL.

## Open Telemetry (OTel) tracing

The Tharsis API supports Open Telemetry (OTel) tracing. To enable it, set the following environment variables. The list above has more information about the variables.

- THARSIS_OTEL_TRACE_ENABLED
- THARSIS_OTEL_TRACE_TYPE
- THARSIS_OTEL_TRACE_HOST
- THARSIS_OTEL_TRACE_PORT

## Rate limit

The Tharsis API rate limits inbound HTTP requests for GraphQL queries and mutations. Environment variable HTTP_RATE_LIMIT specifies the number of requests per second allowed by the rate limiter. The default is 60.

## Resource limits

The Tharsis API limits the numbers of certain resources in order to avoid performance breakdown or other problems. The default values are intended to not be overly restrictive. The current active limit values can be seen via this GraphQL query:

```graphql showLineNumbers
query AllResourceLimits {
  resourceLimits {
    id
    name
    value
  }
}
```

A specific limit's value can be modified via a GraphQL mutation similar to this:

```graphql showLineNumbers
mutation UpdateResourceLimit {
  updateResourceLimit(
    input: {
      name: "ResourceLimitAssignedManagedIdentitiesPerWorkspace"
      value: 45
    }
  ) {
    clientMutationId
    resourceLimit {
      id
      name
      value
    }
  }
}
```
