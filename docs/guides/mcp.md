---
title: Model Context Protocol
description: "Using Tharsis MCP servers for AI assistant integration"
keywords:
  [tharsis, MCP, model context protocol, AI assistant, Claude, Cursor, Kiro]
---

## What is MCP?

The Model Context Protocol (MCP) is an open standard that allows AI assistants like Kiro, Claude, and Cursor to securely access external tools and data sources. Tharsis implements MCP to expose infrastructure management capabilities—enabling AI assistants to query workspaces, diagnose failed runs, manage configurations, and execute Terraform operations through natural conversation.

:::tip Did you know...
AI assistants using Tharsis MCP can not only diagnose issues but also fix them by uploading corrected configurations and creating new runs.
:::

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

Tharsis offers two MCP server options: a local server that runs with the CLI, and a remote server accessible via the API for cloud-based AI platforms.

---

## Local MCP Server

The Tharsis CLI includes a built-in MCP server that runs locally on your machine and uses your CLI authentication.

**Use cases:**

- Personal AI assistant integration (Kiro, Claude Desktop, Cursor)
- Local development workflows
- Direct CLI-based automation

See the [CLI MCP documentation](../cli/tharsis/mcp.md) for setup and configuration.

---

## Remote MCP Server

The Tharsis API exposes an MCP server endpoint that AI platforms can connect to remotely. Unlike the local MCP server which runs on your machine, the remote server is hosted by the Tharsis API.

**Endpoint:** `https://<your-tharsis-api-url>/mcp`

**Use cases:**

- Cloud-based AI platforms and agents
- Multi-user AI assistant deployments
- Centralized infrastructure management through AI

### Authentication

The remote MCP server supports all Tharsis authentication methods. For AI tool integration, you'll need to use service account client credentials.

See [Service Accounts](./service_accounts.md) for instructions on creating a service account with client credentials authentication.

You'll need:

- Client ID
- Client Secret
- Token Exchange URL: `https://<your-tharsis-api-url>/v1/serviceaccounts/oauth/token`

:::warning
The client secret is only displayed once during service account creation. Save these values immediately—you'll need them to configure the MCP server.
:::

### Available Tools

The remote MCP server provides read-only tools for querying Tharsis resources:

#### apply

Tools for retrieving apply status and execution details.

| Tool        | Description                  |
| ----------- | ---------------------------- |
| `get_apply` | Get apply status and details |

#### documentation

Tools for searching and retrieving Tharsis documentation.

| Tool                     | Description                                |
| ------------------------ | ------------------------------------------ |
| `search_documentation`   | Search documentation by keywords           |
| `get_documentation_page` | Fetch full content of a documentation page |

#### job

Tools for retrieving job status and logs.

| Tool             | Description                                     |
| ---------------- | ----------------------------------------------- |
| `get_job`        | Get job status and details                      |
| `get_latest_job` | Get the most recent job for a run               |
| `get_job_logs`   | Retrieve paginated logs from plan or apply jobs |

#### plan

Tools for retrieving plan status and resource changes.

| Tool       | Description                          |
| ---------- | ------------------------------------ |
| `get_plan` | Get plan status and resource changes |

#### run

Tools for retrieving run status and configuration details.

| Tool      | Description                                         |
| --------- | --------------------------------------------------- |
| `get_run` | Get run details including status and error messages |

#### workspace

Tools for retrieving workspace configuration.

| Tool            | Description                             |
| --------------- | --------------------------------------- |
| `get_workspace` | Get workspace configuration and details |

---

### Using with AWS DevOps Agent

AWS DevOps Agent supports custom MCP servers, allowing you to connect Tharsis as a capability within your Agent Space.

#### Prerequisites

- Access to AWS DevOps Agent console
- Tharsis service account with client credentials (see [Authentication](#authentication))
  - The service account only needs viewer-level access since the remote MCP server is read-only

#### Create an Agent Space

1. Navigate to AWS DevOps Agent console
2. Click **Create Agent Space**
3. Enter Agent Space details:
   - **Agent Space Name** (e.g., `tharsis-operations`)
   - **Description** (optional)
4. Configure AWS resource access:
   - Choose **Auto-create a new DevOps Agent role** (recommended)
   - Or select an existing IAM role
5. Configure web app access (optional):
   - Enable if you want browser-based access
   - Choose **Auto-create a new DevOps Agent role** (recommended)
6. Click **Create**

#### Register Tharsis MCP Server

1. In AWS DevOps Agent, go to **Capabilities** → **MCP Servers** and click **Add**
2. In the popup, click **Register** under "New MCP Server Registration"
3. Fill in MCP server details:
   - **Name** (e.g., `Tharsis`)
   - **Endpoint URL:** `https://<your-tharsis-api-url>/mcp`
     - Use your Tharsis API URL, which may differ from the UI URL
   - **Description:** (optional)
   - Keep **Enable Dynamic Client Registration** unchecked
   - Click **Next**
4. Select **Authorization Flow:** `OAuth Client Credentials` and click **Next**
5. Enter the credentials from your Tharsis service account: **Client ID**, **Client Secret**, and **Token Exchange URL**, then click **Next**
6. Review the configuration and click **Submit**

#### Enable Tharsis in Agent Space

1. Navigate to your Agent Space
2. Go to **Capabilities** → **Add MCP Server**
3. Select the **Tharsis** MCP server you created
4. Choose tool access:
   - **Allow all tools** (recommended for initial setup)
   - **Allowlist specific tools** (for restricted access)
5. Click **Add**

#### Verification

Test the integration:

1. In AWS DevOps Agent, go to **Operator Access** → **Start Investigation**
2. Ask the agent to diagnose a Tharsis run:
   ```
   Diagnose Tharsis run trn:run:my-org/my-workspace/run-abc123
   ```

The agent should retrieve run details and job logs from Tharsis.

:::tip
Once verified, continue using the Operator Access chat interface to interact with Tharsis through natural conversation. Ask questions about workspaces, diagnose failures, or check run status—AWS DevOps Agent will use the MCP connection to retrieve Tharsis information automatically.
:::

#### Client Credential Management

When credentials expire or need rotation, see [Service Accounts - Secret Expiration](./service_accounts.md#secret-expiration) for instructions on resetting credentials. After resetting in Tharsis, remove the MCP server from your Agent Space and deregister it under **Settings** → **MCP Server**. Then repeat the Register Tharsis MCP Server and Enable Tharsis in Agent Space steps using the new credentials.

---

## Frequently asked questions (FAQ)

### What level of access does the service account need?

The service account only needs viewer-level access since the remote MCP server currently provides read-only tools.

### Who can create service accounts with client credentials?

Deployer or higher roles. See [Service Accounts](./service_accounts.md) for role requirements.

### What happens when client credentials expire?

You'll receive an email notification before the credentials expire. Once expired, the service account will no longer be able to authenticate. You'll need to reset the credentials and update them in your AI platform.

### Can I restrict which operations the remote MCP server can perform?

Yes. Configure service account role assignments in Tharsis to limit group/workspace access. AI platforms may also provide tool-level access controls.
