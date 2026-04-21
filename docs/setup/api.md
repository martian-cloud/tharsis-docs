---
title: API
description: "An installation and build guide for the Tharsis API"
keywords:
  [
    tharsis api,
    installation,
    build,
    environment variables,
    configuration,
    docker,
    unified binary,
  ]
---

The Tharsis API is a unified binary that includes both the API server and the web UI. It can be run locally or via Docker.

## Docker images

The recommended way to run Tharsis is using the provided Docker images. Three images are published to the [GitLab container registry](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-api/container_registry):

| Image                      | Description                     |
| -------------------------- | ------------------------------- |
| `tharsis-api/tharsis`      | Unified API + UI server         |
| `tharsis-api/runner`       | Runner agent for executing jobs |
| `tharsis-api/job-executor` | Job executor used by runners    |

:::tip
Use the provided [Docker Compose](docker.md) setup to get started quickly.
:::

## Build from source

### Requirements

- [Go](https://go.dev/doc/install)
- [Node.js](https://nodejs.org/) and npm (for the UI)
- [Make](https://www.gnu.org/software/make/)

```shell title="Git clone the project to the local machine"
git clone https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-api.git
```

### Build the unified binary (API + UI)

```shell showLineNumbers title="Build the Tharsis binary with the embedded UI"
cd <project-directory>
make build-tharsis
```

This builds the frontend, embeds it into the Go binary, and produces the `apiserver` executable.

### Build the API-only binary (no UI)

```shell showLineNumbers title="Build the API binary without the UI"
cd <project-directory>
make build-api
```

This uses the `noui` build tag to skip embedding the frontend.

### Build Docker images

```shell title="Build the unified Tharsis Docker image"
make build-tharsis-docker
```

```shell title="Build the runner Docker image"
make build-runner-docker
```

```shell title="Build the job executor Docker image"
make build-job-docker
```

### Database setup

```shell title="Start the PostgreSQL database"
make db-start
```

```shell title="Run database migrations"
make migrate
```

## Environment variables

### Admin

#### `THARSIS_ADMIN_USER_EMAIL`

Email for the default API admin user.

#### `THARSIS_ADMIN_USER_PASSWORD`

Password for the default API admin user.

### Database

#### `THARSIS_DB_USERNAME`

The username for the PostgreSQL database.

#### `THARSIS_DB_NAME`

Name of the PostgreSQL database.

#### `THARSIS_DB_PASSWORD`

The password for the PostgreSQL database.

#### `THARSIS_DB_HOST`

Host address for the database.

#### `THARSIS_DB_PORT`

Port number for the database.

#### `THARSIS_DB_SSL_MODE`

SSL mode for the database connection.

#### `THARSIS_DB_MAX_CONNECTIONS`

Maximum number of database connections.

#### `THARSIS_DB_AUTO_MIGRATE_ENABLED`

Automatically run database migrations on startup.

Default: `true`

### Authentication

Tharsis supports two authentication modes:

- **External OIDC provider** — Uses `THARSIS_OAUTH_PROVIDERS_*` to configure an external identity provider (e.g. Keycloak, Okta). This is the mode used in production deployments and the full-stack [Docker Compose](docker.md) setup.
- **Built-in identity provider** — Uses `THARSIS_ADMIN_USER_EMAIL` and `THARSIS_ADMIN_USER_PASSWORD` to create a local admin user. No external OIDC provider is needed. This is the mode used by the default [Docker Compose](docker.md) setup.

**OIDC**

#### `THARSIS_OAUTH_PROVIDERS_0_ISSUER_URL`

Configured OIDC provider's issuer URL.

#### `THARSIS_OAUTH_PROVIDERS_0_CLIENT_ID`

Client ID for identity provider.

#### `THARSIS_OAUTH_PROVIDERS_0_USERNAME_CLAIM`

Supported username claim.

Default: `sub`

#### `THARSIS_OAUTH_PROVIDERS_0_SCOPE`

OAuth scopes used by the Tharsis UI.

#### `THARSIS_OIDC_INTERNAL_IDENTITY_PROVIDER_CLIENT_ID`

Client ID for the internal OIDC identity provider.

Default: `tharsis`

#### `THARSIS_JWT_ISSUER_URL`

Issuer URL for Tharsis service account tokens. Defaults to the API URL.

#### `THARSIS_CLI_LOGIN_OIDC_CLIENT_ID`

Client ID for CLI OIDC login.

#### `THARSIS_CLI_LOGIN_OIDC_SCOPES`

OIDC scopes for CLI login.

Default: `openid tharsis`

#### `THARSIS_ASYMMETRIC_SIGNING_KEY_ROTATION_PERIOD_DAYS`

Number of days after which an asymmetric signing key should be rotated. Set to `0` to disable rotation.

Default: `0`

#### `THARSIS_ASYMMETRIC_SIGNING_KEY_DECOMMISSION_PERIOD_DAYS`

Number of days after which a rotated asymmetric signing key should be decommissioned.

Default: `7`

#### `THARSIS_SERVICE_ACCOUNT_CLIENT_SECRET_MAX_EXPIRATION_DAYS`

Maximum number of days a service account client secret can be valid.

Default: `90`

**User sessions**

#### `THARSIS_USER_SESSION_ACCESS_TOKEN_EXPIRATION_MINUTES`

Access token expiration time in minutes.

Default: `5`

#### `THARSIS_USER_SESSION_REFRESH_TOKEN_EXPIRATION_MINUTES`

Refresh token expiration time in minutes.

Default: `720`

#### `THARSIS_USER_SESSION_MAX_SESSIONS_PER_USER`

Maximum concurrent sessions per user.

Default: `20`

### Server

#### `THARSIS_API_URL`

External URL where the Tharsis API is accessible.

Default: `http://localhost:8000`

#### `THARSIS_UI_URL`

External URL for the Tharsis UI. Defaults to the API URL.

#### `THARSIS_SUPPORT_URL`

URL to display for support links.

#### `THARSIS_SERVER_PORT`

HTTP server port.

Default: `8000`

#### `THARSIS_GRPC_SERVER_PORT`

gRPC server port.

Default: `50051`

#### `THARSIS_EXTERNAL_GRPC_PORT`

External gRPC port when using a reverse proxy. Defaults to the gRPC server port.

#### `THARSIS_SERVICE_DISCOVERY_HOST`

Hostname for Terraform service discovery. Defaults to the API URL host.

#### `THARSIS_TLS_ENABLED`

Enable TLS for the API server.

Default: `false`

#### `THARSIS_TLS_CERT_FILE`

Path to the TLS certificate file.

#### `THARSIS_TLS_KEY_FILE`

Path to the TLS key file.

#### `THARSIS_CORS_ALLOWED_ORIGINS`

Comma-delimited list of allowed CORS origins. Defaults to the UI URL.

#### `THARSIS_HTTP_RATE_LIMIT`

HTTP requests per second allowed by the rate limiter.

Default: `60`

#### `THARSIS_MAX_GRAPHQL_COMPLEXITY`

Maximum allowed GraphQL query complexity.

Default: `0` (unlimited)

#### `THARSIS_ASYNC_TASK_TIMEOUT`

Timeout in seconds for async background tasks.

Default: `180`

#### `THARSIS_MODULE_REGISTRY_MAX_UPLOAD_SIZE`

Maximum upload size in bytes for module registry uploads.

Default: `134217728`

#### `THARSIS_VCS_REPOSITORY_SIZE_LIMIT`

Maximum VCS repository size in bytes.

Default: `5242880`

#### `THARSIS_TERRAFORM_CLI_VERSION_CONSTRAINT`

Comma-separated version constraints for allowed Terraform CLI versions.

Default: `>= 1.0.0`

### Object store

Configures where Tharsis stores objects (Terraform modules, state files, etc.):

- **`aws_s3`** — Amazon S3 or an S3-compatible service (e.g. Minio). Used in production and the full-stack Docker Compose setup.
- **`filesystem`** — Local filesystem storage. Used in the default Docker Compose setup for simplicity.

#### `THARSIS_OBJECT_STORE_PLUGIN_TYPE`

Object store plugin type: `aws_s3` or `filesystem`.

**aws_s3**

#### `THARSIS_OBJECT_STORE_PLUGIN_DATA_BUCKET`

Name of the bucket where objects will be stored.

#### `THARSIS_OBJECT_STORE_PLUGIN_DATA_REGION`

Region where the object store is hosted.

#### `THARSIS_OBJECT_STORE_PLUGIN_DATA_AWS_ACCESS_KEY_ID`

AWS access key ID used to access the object store.

#### `THARSIS_OBJECT_STORE_PLUGIN_DATA_AWS_SECRET_ACCESS_KEY`

AWS secret access key used to access the object store.

#### `THARSIS_OBJECT_STORE_PLUGIN_DATA_ENDPOINT`

Custom endpoint URL (e.g. for Minio).

#### `THARSIS_OBJECT_STORE_PLUGIN_DATA_AWS_PARTITION_ID`

AWS partition ID. Defaults to `aws`.

**filesystem**

#### `THARSIS_OBJECT_STORE_PLUGIN_DATA_DIRECTORY`

Directory path where objects will be stored.

#### `THARSIS_OBJECT_STORE_PLUGIN_DATA_SECRET_KEY`

Secret key for signing presigned URLs. Auto-generated if not provided.

### JWS provider

Configures how JSON Web Signatures are generated for service account tokens:

- **`memory`** — In-memory key generation. Suitable for development and single-instance deployments.
- **`awskms`** — AWS Key Management Service. Recommended for production.

#### `THARSIS_JWS_PROVIDER_PLUGIN_TYPE`

JWS provider plugin type: `memory` or `awskms`.

Default: `memory`

**awskms**

#### `THARSIS_JWS_PROVIDER_PLUGIN_DATA_REGION`

AWS region where the KMS key is hosted. Required.

#### `THARSIS_JWS_PROVIDER_PLUGIN_DATA_KEY_SPEC`

KMS key spec (e.g. `RSA_4096`). Optional.

#### `THARSIS_JWS_PROVIDER_PLUGIN_DATA_ALIAS_PREFIX`

Prefix for the KMS key alias. Optional.

#### `THARSIS_JWS_PROVIDER_PLUGIN_DATA_TAGS`

Comma-separated `key=value` tags for the KMS key. Optional.

### Secret manager

Configures encryption for sensitive variables:

- **`awskms`** — AWS Key Management Service for encrypting secrets.
- **empty** — Disabled (no encryption).

#### `THARSIS_SECRET_MANAGER_PLUGIN_TYPE`

Secret manager plugin type: `awskms` or empty (disabled).

**awskms**

#### `THARSIS_SECRET_MANAGER_PLUGIN_DATA_REGION`

AWS region for the KMS key.

#### `THARSIS_SECRET_MANAGER_PLUGIN_DATA_KEY_ID`

KMS key ID for encrypting secrets.

### Job execution

Configures internal runners that execute Terraform jobs. Tharsis supports four dispatcher types:

- **`docker`** — Runs jobs in Docker containers. Simplest setup for local development.
- **`kubernetes`** — Runs jobs as Kubernetes pods. Recommended for production.
- **`ecs`** — Runs jobs as AWS ECS tasks.
- **`local`** — Runs jobs as local processes. For development only.

#### `THARSIS_INTERNAL_RUNNERS_0_NAME`

Name of the internal runner.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_TYPE`

Job dispatcher type: `local`, `docker`, `kubernetes`, or `ecs`.

**docker**

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_API_URL`

Tharsis API URL for the job executor to communicate with.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_HOST`

Docker host (e.g. `unix:///var/run/docker.sock`).

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_IMAGE`

Docker image for the job executor.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_LOCAL_IMAGE`

Use a local Docker image instead of pulling from a registry.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_EXTRA_HOSTS`

Extra hosts to add to the container (e.g. `localhost:host-gateway`).

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_MEMORY_LIMIT`

Memory limit for the container.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_BIND_PATH`

Host path to bind mount into the container.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_REGISTRY_USERNAME`

Registry username for pulling the job executor image.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_REGISTRY_PASSWORD`

Registry password for pulling the job executor image.

**kubernetes**

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_API_URL`

Tharsis API URL for the job executor to communicate with.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_IMAGE`

Container image for the job executor pod.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_NAMESPACE`

Kubernetes namespace to run jobs in.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_KUBE_SERVER`

Kubernetes API server URL.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_KUBE_CONFIG_PATH`

Path to a kubeconfig file.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_AUTH_TYPE`

Authentication type for the Kubernetes cluster.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_EKS_CLUSTER`

EKS cluster name (when using EKS authentication).

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_REGION`

AWS region (when using EKS authentication).

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_CA_CERT`

Kubernetes CA certificate.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_CLIENT_CERT`

Client certificate for Kubernetes authentication.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_CLIENT_KEY`

Client key for Kubernetes authentication.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_MEMORY_REQUEST`

Memory request for the job pod.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_MEMORY_LIMIT`

Memory limit for the job pod.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_NODE_SELECTOR`

Kubernetes node selector for scheduling jobs.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_POD_LABELS`

Labels to apply to job pods.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_POD_ANNOTATIONS`

Annotations to apply to job pods.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_HOST_ALIASES`

Host aliases for the job pod.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_SECURITY_CONTEXT_RUN_AS_USER`

UID to run the job container as.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_SECURITY_CONTEXT_RUN_AS_GROUP`

GID to run the job container as.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_SECURITY_CONTEXT_RUN_AS_NON_ROOT`

Require the container to run as a non-root user.

**ecs**

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_API_URL`

Tharsis API URL for the job executor to communicate with.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_REGION`

AWS region for the ECS cluster.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_CLUSTER`

ECS cluster name.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_TASK_DEFINITION`

ECS task definition to use for jobs.

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_LAUNCH_TYPE`

ECS launch type (e.g. `FARGATE`).

#### `THARSIS_INTERNAL_RUNNERS_0_JOB_DISPATCHER_DATA_SUBNETS`

Comma-separated subnet IDs for the ECS tasks.

### Observability

#### `THARSIS_OTEL_TRACE_ENABLED`

Enable OpenTelemetry tracing.

Default: `false`

#### `THARSIS_OTEL_TRACE_TYPE`

Type of tracing exporter: `otlp` or `xray`.

#### `THARSIS_OTEL_TRACE_HOST`

Host to send trace data to.

#### `THARSIS_OTEL_TRACE_PORT`

Port to send trace data to.

### Rate limiting

Configures the backing store for API rate limiting:

- **`memory`** — In-memory store. Suitable for single-instance deployments.
- **`redis`** — Redis-backed store. Recommended for multi-instance deployments.

#### `THARSIS_RATE_LIMIT_STORE_PLUGIN_TYPE`

Rate limit store plugin type: `memory` or `redis`.

Default: `memory`

**redis**

#### `THARSIS_RATE_LIMIT_STORE_PLUGIN_DATA_REDIS_ENDPOINT`

Redis connection URL.

### Email

Configures the email provider for sending notifications:

- **`smtp`** — Standard SMTP server.
- **`ses`** — Amazon Simple Email Service.
- **`plunk`** — Plunk email API.
- **empty** — Disabled (no emails sent).

#### `THARSIS_EMAIL_CLIENT_PLUGIN_TYPE`

Email client plugin type: `smtp`, `ses`, `plunk`, or empty (disabled).

#### `THARSIS_EMAIL_FOOTER`

Footer text for emails sent by Tharsis.

**smtp**

#### `THARSIS_EMAIL_CLIENT_PLUGIN_DATA_SMTP_HOST`

SMTP server hostname.

#### `THARSIS_EMAIL_CLIENT_PLUGIN_DATA_SMTP_PORT`

SMTP server port.

#### `THARSIS_EMAIL_CLIENT_PLUGIN_DATA_FROM_ADDRESS`

Sender email address.

#### `THARSIS_EMAIL_CLIENT_PLUGIN_DATA_SMTP_USERNAME`

SMTP authentication username.

#### `THARSIS_EMAIL_CLIENT_PLUGIN_DATA_SMTP_PASSWORD`

SMTP authentication password.

#### `THARSIS_EMAIL_CLIENT_PLUGIN_DATA_DISABLE_TLS`

Disable TLS for the SMTP connection.

Default: `false`

**ses**

#### `THARSIS_EMAIL_CLIENT_PLUGIN_DATA_FROM_ADDRESS`

Sender email address.

#### `THARSIS_EMAIL_CLIENT_PLUGIN_DATA_AWS_CONFIGURATION_SET_NAME`

AWS SES configuration set name.

#### `THARSIS_EMAIL_CLIENT_PLUGIN_DATA_REGION`

AWS region for SES.

**plunk**

#### `THARSIS_EMAIL_CLIENT_PLUGIN_DATA_ENDPOINT`

Plunk API endpoint.

#### `THARSIS_EMAIL_CLIENT_PLUGIN_DATA_API_KEY`

Plunk API key.

### MCP

#### `THARSIS_MCP_ENABLED_TOOLSETS`

Comma-separated list of enabled MCP toolsets.

#### `THARSIS_MCP_ENABLED_TOOLS`

Comma-separated list of enabled MCP tools.

#### `THARSIS_MCP_READ_ONLY`

Enable read-only mode for MCP.

### Workspace assessments

#### `THARSIS_WORKSPACE_ASSESSMENT_INTERVAL_HOURS`

Minimum interval in hours between workspace assessments.

Default: `24`

#### `THARSIS_WORKSPACE_ASSESSMENT_RUN_LIMIT`

Maximum number of assessment runs that can be created at a time.

Default: `20`

### Federated registry

#### `THARSIS_FEDERATED_REGISTRY_TRUST_POLICIES`

JSON-encoded array of trust policies for federated registry access.

## Supported databases

The Tharsis API requires a database to store persistent information such as groups, workspaces, users, etc. It currently supports [PostgreSQL](https://www.postgresql.org/).

## Open Telemetry (OTel) tracing

The Tharsis API supports Open Telemetry (OTel) tracing. To enable it, set the following environment variables:

#### `THARSIS_OTEL_TRACE_ENABLED`

Set to `true` to enable tracing.

#### `THARSIS_OTEL_TRACE_TYPE`

The tracing exporter type. Supported values are `otlp` and `xray`.

#### `THARSIS_OTEL_TRACE_HOST`

The hostname or IP address of the trace collector (e.g. `localhost` or `jaeger`).

#### `THARSIS_OTEL_TRACE_PORT`

The port of the trace collector (e.g. `4317` for OTLP gRPC).

## Rate limit

The Tharsis API rate limits inbound HTTP requests for GraphQL queries and mutations. Environment variable `THARSIS_HTTP_RATE_LIMIT` specifies the number of requests per second allowed by the rate limiter. The default is 60.

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

```graphql title="Update a resource limit" showLineNumbers
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
