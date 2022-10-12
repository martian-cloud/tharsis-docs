---
title: Installation and Build Guide
description: "An installation and build guide for the Tharsis API"
---

At the moment, Tharsis API does not provide any binaries. However, it is possible to run it locally with the following instructions.

### Build and run locally (Docker)

#### Requirements

- [Go](https://go.dev/doc/install)
- [Make](https://www.gnu.org/software/make/)
- Optional Go packages for linting and testing:
  ```shell showLineNumbers
  go install golang.org/x/lint/golint@latest
  go install github.com/vektra/mockery/v2@latest
  ```

#### Build from source (Docker)

<!-- TODO: Replace with actual project URL -->

```shell title="Git clone the project to the local machine"
git clone <project-url>
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
make build-docker
make run-docker
```

### Environment variables

<details><summary>Expand for a complete list and explanation</summary>

|                                         Name |     Generic Value     | Description                                                    |
| -------------------------------------------: | :-------------------: | -------------------------------------------------------------- |
|       `THARSIS_OAUTH_PROVIDERS_0_ISSUER_URL` |           -           | Configured OIDC provider's issuer URL.                         |
|        `THARSIS_OAUTH_PROVIDERS_0_CLIENT_ID` |           -           | Client ID for identity provider.                               |
|   `THARSIS_OAUTH_PROVIDERS_0_USERNAME_CLAIM` |           -           | Supported username claim.                                      |
|                  `THARSIS_TFE_LOGIN_ENABLED` |         true          | Boolean specifying if Terraform Login is enabled.              |
|                `THARSIS_TFE_LOGIN_CLIENT_ID` |           -           | Client ID for Terraform login.                                 |
|                   `THARSIS_TFE_LOGIN_SCOPES` |           -           | Login scopes for Terraform login.                              |
|                        `THARSIS_DB_PASSWORD` |       postgres        | The clear-text password for the PostgreSQL database.           |
|                        `THARSIS_DB_USERNAME` |       postgres        | The username for the PostgreSQL database.                      |
|                  `THARSIS_DB_PASSWORD_CRYPT` |           -           | Encrypted version of the password for the PostgreSQL database. |
|                    `THARSIS_DB_PASSWORD_ARN` |         none          | The Amazon Resource Number (ARN) where DB password is stored.  |
|                            `THARSIS_DB_NAME` |        tharsis        | Username for PostgreSQL database.                              |
|                            `THARSIS_DB_HOST` |       localhost       | Host address the database container binds to.                  |
|                            `THARSIS_DB_PORT` |         5432          | Port number where API connects with the database.              |
|                        `THARSIS_DB_SSL_MODE` |         false         | Boolean indicating if database uses SSL.                       |
|           `THARSIS_OBJECT_STORE_PLUGIN_TYPE` |           -           | Object store plugin type.                                      |
|    `THARSIS_OBJECT_STORE_PLUGIN_DATA_BUCKET` |           -           | Name of the bucket where objects will be stored.               |
|    `THARSIS_OBJECT_STORE_PLUGIN_DATA_REGION` |           -           | Region where the object store is hosted.                       |
|           `THARSIS_JWS_PROVIDER_PLUGIN_TYPE` |           -           | JSON Web Signature (JWS) provider plugin type.                 |
|    `THARSIS_JWS_PROVIDER_PLUGIN_DATA_KEY_ID` |           -           | JWS provider key ID.                                           |
|    `THARSIS_JWS_PROVIDER_PLUGIN_DATA_REGION` |           -           | Region where plugin is hosted.                                 |
|         `THARSIS_JOB_DISPATCHER_PLUGIN_TYPE` |           -           | Type of job executor plugin: kubernetes, ecs, docker.          |
| `THARSIS_JOB_DISPATCHER_PLUGIN_DATA_API_URL` | http://localhost:8000 | Job dispatcher API URL.                                        |
|                            `THARSIS_API_URL` | http://localhost:8000 | Endpoint where Tharsis API will be accessible.                 |
|         `THARSIS_SERVICE_ACCOUNT_ISSUER_URL` |           -           | Issuer URL for Tharsis service account authentication.         |

</details>

:::note
If running within WSL using Docker Desktop it might be necessary to change: `THARSIS_DB_HOST=kubernetes.docker.internal`.
:::

### Supported databases

Tharsis API requires a database to store persistent information such as, groups, workspaces, users, etc. It currently supports PostgreSQL.
