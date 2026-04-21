---
title: CI/CD Deployments
description: "Deploying Terraform modules from CI/CD pipelines"
keywords:
  [
    tharsis,
    CI/CD,
    GitLab CI,
    GitHub Actions,
    OIDC,
    service accounts,
    pipeline,
    automation,
  ]
---

Tharsis integrates with any CI/CD platform that supports [OIDC](https://openid.net/connect/) by using [service accounts](../guides/service_accounts.md) for authentication. This allows pipelines to trigger plans and applies without human interaction and without storing long-lived secrets.

## Prerequisites

1. A [service account](../guides/service_accounts.md#create-a-service-account) with OIDC federation enabled.
2. The service account added as a [member](../guides/memberships.md) of the target group or workspace with at least a **Deployer** role.
3. The [Tharsis CLI](../setup/cli.md) available in your CI/CD environment.

## Authentication

The CLI automatically uses service account credentials from environment variables, taking precedence over SSO authentication.

| Variable                        | Description                                                                   |
| ------------------------------- | ----------------------------------------------------------------------------- |
| `THARSIS_SERVICE_ACCOUNT_ID`    | ID or TRN of the service account (e.g. `trn:service_account:my-group/my-sa`). |
| `THARSIS_SERVICE_ACCOUNT_TOKEN` | OIDC token from the CI/CD platform's identity provider.                       |

## GitLab CI

GitLab CI provides OIDC tokens via the `id_tokens` keyword. Configure the service account's OIDC trust policy with:

- **Issuer URL**: `https://gitlab.com` (or your self-hosted GitLab URL)
- **Bound claims**: e.g. `namespace_path`, `project_id`, `ref`

```yaml showLineNumbers title=".gitlab-ci.yml"
# Reusable anchor that downloads the latest Tharsis CLI and authenticates via OIDC.
.tharsis_setup:
  image: alpine:latest
  id_tokens:
    THARSIS_SERVICE_ACCOUNT_TOKEN:
      aud: https://api.tharsis.example.com
  variables:
    THARSIS_SERVICE_ACCOUNT_ID: "trn:service_account:my-group/deploy-sa"
    THARSIS_CLI_PROJECT_PATH: "infor-cloud/martian-cloud/tharsis/tharsis-cli"
    GITLAB_API_URL: "https://gitlab.com/api/v4"
    CLI_PACKAGE_NAME: "tharsis-cli"
    CLI_BINARY_NAME: "tharsis"
    WORKSPACE: "my-group/my-workspace"
  before_script:
    - apk add --no-cache curl jq
    # Resolve the latest CLI version from the GitLab package registry.
    - ENCODED_PROJECT_PATH=$(echo -n $THARSIS_CLI_PROJECT_PATH | jq -sRr @uri)
    - |
      LATEST_VERSION=$(curl --silent -XGET \
        "${GITLAB_API_URL}/projects/${ENCODED_PROJECT_PATH}/packages?sort=desc" | \
        jq -r '[.[] | select(.version|match("^v\\d+\\.\\d+\\.\\d+$")) | {id,version}] | sort_by(.id)[-1] | .version')
    # Download and install the CLI binary.
    - |
      curl --fail --silent --show-error --location \
        "${GITLAB_API_URL}/projects/${ENCODED_PROJECT_PATH}/packages/generic/${CLI_PACKAGE_NAME}/${LATEST_VERSION}/${CLI_BINARY_NAME}_${LATEST_VERSION}_linux_amd64" \
        --output "${CLI_BINARY_NAME}"
    - chmod 755 "${CLI_BINARY_NAME}"
    - export PATH="$PWD:$PATH"
    # Configure the CLI to point to the Tharsis API endpoint.
    - tharsis configure -http-endpoint https://api.tharsis.example.com

# Run a speculative plan to preview changes. Runs on every pipeline.
plan:
  extends: .tharsis_setup
  stage: plan
  script:
    - tharsis plan -directory-path ./terraform $WORKSPACE

# Apply the Terraform configuration. Only runs on the default branch.
apply:
  extends: .tharsis_setup
  stage: deploy
  script:
    - tharsis apply -directory-path ./terraform -auto-approve -input=false $WORKSPACE
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

# Destroy all resources. Only runs when ALLOW_DESTROY_JOBS is set.
destroy:
  extends: .tharsis_setup
  stage: deploy
  script:
    - tharsis destroy -directory-path ./terraform -auto-approve $WORKSPACE
  rules:
    - if: $ALLOW_DESTROY_JOBS == "true"
      when: manual # Requires manual confirmation in the GitLab UI.
```

## GitHub Actions

GitHub Actions provides OIDC tokens via the `ACTIONS_ID_TOKEN_REQUEST_URL`. Configure the service account's OIDC trust policy with:

- **Issuer URL**: `https://token.actions.githubusercontent.com`
- **Bound claims**: e.g. `sub` (matches `repo:<owner>/<repo>:ref:refs/heads/<branch>`)

```yaml showLineNumbers title=".github/workflows/deploy.yml"
name: Deploy
on:
  push:
    branches: [main]

permissions:
  id-token: write

env:
  THARSIS_SERVICE_ACCOUNT_ID: "trn:service_account:my-group/deploy-sa"
  THARSIS_API_ENDPOINT: "https://api.tharsis.example.com"
  THARSIS_CLI_PROJECT_PATH: "infor-cloud/martian-cloud/tharsis/tharsis-cli"
  GITLAB_API_URL: "https://gitlab.com/api/v4"
  CLI_PACKAGE_NAME: "tharsis-cli"
  CLI_BINARY_NAME: "tharsis"

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Download the latest Tharsis CLI from the GitLab package registry.
      - name: Install Tharsis CLI
        run: |
          ENCODED_PROJECT_PATH=$(echo -n $THARSIS_CLI_PROJECT_PATH | jq -sRr @uri)
          LATEST_VERSION=$(curl --silent -XGET \
            "${GITLAB_API_URL}/projects/${ENCODED_PROJECT_PATH}/packages?sort=desc" | \
            jq -r '[.[] | select(.version|match("^v\\d+\\.\\d+\\.\\d+$")) | {id,version}] | sort_by(.id)[-1] | .version')
          curl --fail --silent --show-error --location \
            "${GITLAB_API_URL}/projects/${ENCODED_PROJECT_PATH}/packages/generic/${CLI_PACKAGE_NAME}/${LATEST_VERSION}/${CLI_BINARY_NAME}_${LATEST_VERSION}_linux_amd64" \
            --output "${CLI_BINARY_NAME}"
          chmod 755 "${CLI_BINARY_NAME}"
          echo "$PWD" >> "$GITHUB_PATH"

      # Configure the CLI to point to the Tharsis API endpoint.
      - name: Configure Tharsis CLI
        run: tharsis configure -http-endpoint $THARSIS_API_ENDPOINT

      # Request an OIDC token from GitHub's identity provider.
      - name: Get OIDC token
        id: oidc
        run: |
          TOKEN=$(curl -s -H "Authorization: bearer $ACTIONS_ID_TOKEN_REQUEST_TOKEN" \
            "$ACTIONS_ID_TOKEN_REQUEST_URL&audience=$THARSIS_API_ENDPOINT" | jq -r '.value')
          echo "token=$TOKEN" >> "$GITHUB_OUTPUT"

      - name: Deploy
        env:
          THARSIS_SERVICE_ACCOUNT_TOKEN: ${{ steps.oidc.outputs.token }}
        run: tharsis apply -directory-path ./terraform -auto-approve -input=false my-group/my-workspace
```

## Tips

- Use `-auto-approve` in CI/CD to skip the interactive confirmation prompt.
- Use `-json` on commands to get machine-readable output for scripting.
- Pin the CLI version in your pipeline image or download step to avoid unexpected changes.
- Set `THARSIS_PROFILE` if your CLI configuration has multiple profiles.
- The CLI automatically renews tokens for service accounts, so long-running pipelines won't fail due to token expiration.
