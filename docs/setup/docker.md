---
title: Docker
description: "Running Tharsis using provided Docker images"
keywords:
  [tharsis, docker, docker compose, local development, containers, keycloak]
---

Tharsis provides Docker Compose files for running the full platform locally. These are meant for development and testing purposes only.

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

## Docker Compose

Two Docker Compose configurations are available depending on your needs:

### Default (`docker-compose.yml`)

A minimal setup with built-in authentication — no external identity provider required. This is the quickest way to get started.

| Service  | Container name | Purpose                      |
| -------- | -------------- | ---------------------------- |
| postgres | tharsis-db     | Database for the Tharsis API |
| tharsis  | tharsis        | Unified Tharsis API + UI     |

### Full stack (`docker-compose-full-stack.yml`)

Includes all services from the default setup plus additional services for a more complete development environment.

| Service      | Container name | Purpose                                       |
| ------------ | -------------- | --------------------------------------------- |
| postgres     | tharsis-db     | Database for the Tharsis API                  |
| kc_postgres  | keycloak-db    | Database for Keycloak IDP                     |
| keycloak     | tharsis-idp    | External identity provider for authentication |
| minio        | tharsis-store  | S3-compatible object storage                  |
| minioconsole | tharsis-mc     | Configures the Minio bucket                   |
| jaeger       | tharsis-jaeger | Distributed tracing UI                        |
| tharsis      | tharsis        | Unified Tharsis API + UI                      |

:::warning not for production use!
Tharsis Docker Compose should **not** be used in production or be exposed to the internet.
:::

### Usage guide

Either clone the [Tharsis API](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-api.git) repository or download the contents of the `docker-compose` directory.

#### Default setup

```shell title="Start Tharsis with the default Docker Compose" showLineNumbers
git clone https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-api.git
cd tharsis-api/docker-compose
docker compose up -d
```

Once all services have started, visit the UI at `http://localhost:6560`. A default admin user is created with the credentials configured in the environment variables.

#### Full stack setup

```shell title="Start Tharsis with the full stack Docker Compose" showLineNumbers
git clone https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-api.git
cd tharsis-api/docker-compose
docker compose -f docker-compose-full-stack.yml up -d
```

Once all services have started, visit the UI at `http://localhost:6560`, which will redirect to Keycloak for authentication. A default user is already created with the username and password `martian`.

Additional services are available at:

- Jaeger UI: `http://localhost:16686`
- Minio Console: `http://localhost:9010`

:::note
The Tharsis API may take some time starting up as it waits for other services to be in a functioning state.
:::

## All-in-one Docker image

For an even simpler setup, the [Tharsis all-in-one Docker](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-all-in-one-docker) image bundles Tharsis, PostgreSQL, Minio, and Keycloak into a single container managed by Supervisord. This is useful for quick demos, testing, and CI/CD applications.

```shell title="Run the all-in-one image"
docker run -p 8000:8000 -p 8080:8080 registry.gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-all-in-one-docker
```

The Tharsis API is available at `http://localhost:8000` and Keycloak at `http://localhost:8080`. A default admin user with username `martian` and password `martian` is created automatically.

:::info What about GitHub Actions?
See [this example](https://github.com/martian-cloud/terraform-provider-tharsis/blob/90366750099b2c3ceaa26e5db4dcf1429337b940/.github/workflows/test.yml#L56) for using the all-in-one image in CI.
:::

## Frequently asked questions (FAQ)

### Can I create Terraform runs with a local Docker Compose instance?

Yes! The Docker Compose includes all the service dependencies for applying Terraform modules and managing states with Tharsis. The database stores all resource information and Minio stores the objects (Terraform modules).
