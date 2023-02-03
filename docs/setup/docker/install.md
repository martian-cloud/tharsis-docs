---
title: Tharsis in Docker
description: "Running Tharsis using provided Docker images"
---

If you wish to try out the Tharsis-suite in Docker, there are currently two options available.

- Tharsis [all-in-one](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-all-in-one-docker) Docker image (for CICD applications).
- Tharsis [docker-compose](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-api/-/blob/4dd253589259beaf6f9358316855c73cda584b5b/docker-compose/docker-compose.yml) (for users).

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

### All-in-one Docker image

The all-in-one Docker image is mainly targeted towards headless or CICD applications where a single Docker image becomes more practical.

#### Requirements

- [Docker](https://docs.docker.com/get-docker/)

The following tools are built right into the image:

- [PostgreSQL](https://www.postgresql.org/) database
- [Minio](https://min.io/) object store
- [Keycloak](https://www.keycloak.org/) identity provider (IDP)
- [Supervisor](https://github.com/Supervisor/supervisor) process manager

:::note
Unlike the docker-compose image, the all-in-one does not include the [Tharsis UI](/docs/setup/ui/install.md).
:::

:::warning not for production use!
Tharsis all-in-one Docker image is **only** meant for testing and should **not** be used in production or be exposed to the internet.
:::

#### Downloading the latest image

The latest images are always available in our [GitLab container registry](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-all-in-one-docker/container_registry).

#### Usage guide

```shell title="Run the image with docker"
docker run --rm -d -p 8000:8000 -p 8080:8080 registry.gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-all-in-one-docker
```

<details><summary>Expand for explanation</summary>

Above command will run the latest all-in-one Docker image in the background and bind the API to port 8000 and Keycloak IDP to port 8080.

The Tharsis API is available at `http://localhost:8000`.  
Keycloak is available at `http://localhost:8080`.

When the image starts, a default admin user with credentials `martian` is created automatically. A token can be requested from Keycloak. For [example](https://github.com/martian-cloud/terraform-provider-tharsis/blob/90366750099b2c3ceaa26e5db4dcf1429337b940/.github/workflows/test.yml#L91). Once authenticated, the [Tharsis CLI](../cli/install.md) can be used to issue commands to the API.

</details>

:::info What about Github actions?
Say less. Click [here](https://github.com/martian-cloud/terraform-provider-tharsis/blob/90366750099b2c3ceaa26e5db4dcf1429337b940/.github/workflows/test.yml#L56) for an example.
:::

### Docker Compose

The docker-compose is meant for users wishing to try out Tharsis and can be run with a simple command. It includes all the components necessary to create Terraform runs within Tharsis.

#### Requirements

- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/) (only for cloning)

The `docker-compose.yml` defines the following services:

| Service      | Container name | Purpose                                             |
| ------------ | -------------- | --------------------------------------------------- |
| postgres     | tharsis-db     | A database for the Tharsis API                      |
| kc_postgres  | keycloak-db    | A database for Keycloak IDP                         |
| keycloak     | tharsis-idp    | An IDP for authenticating with the Tharsis API      |
| minio        | tharsis-store  | An object storage (like AWS S3) for the Tharsis API |
| minioconsole | tharsis-mc     | Configures minio or Tharsis API's object store      |
| api          | tharsis-api    | The Tharsis API                                     |
| ui           | tharsis-ui     | The Tharsis UI                                      |

:::warning not for production use!
Tharsis docker-compose should **not** be used in production or be exposed to the internet.
:::

#### Usage guide

Either clone the [Tharsis API](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-api.git) repository or download the contents of the `docker-compose` directory.

```shell title="Cloning the Tharsis API repository and using docker-compose" showLineNumbers
git clone https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-api.git
cd tharsis-api/docker-compose  # directory might be different!
[sudo] docker compose up -d    # "-d" means start in the background.
[sudo] docker logs tharsis-api # Optionally, check for Tharsis API logs.
```

<details><summary>Expand for explanation</summary>

Above will begin pulling the latest images from the appropriate sources and start them up in the background. Once all the services have finished booting up, we can visit the UI at `http://localhost:3000`, which should immediately redirect us to Keycloak for authentication. Just like the all-in-one docker image, an admin user is already created with credentials `martian`.

:::info what about the tharsis cli?
Consult the Tharsis CLI [configure command](/docs/cli/tharsis/commands.md#configure-command) for help on creating a new profile. Once done, the [sso login subcommand](/docs/cli/tharsis/commands.md#sso-login-subcommand) will help us authenticate with Tharsis.
:::

:::note
The Tharsis API may take some time starting up as it waits for other services to be in a functioning state.
:::

</details>

### Frequently asked questions (FAQ)

- Can I create Terraform runs with a local Docker Compose instance?

  - Yes! The Docker Compose includes all the service dependencies for applying Terraform modules and managing states with Tharsis. The database will store all the resource information and Minio will store the objects (Terraform modules).
