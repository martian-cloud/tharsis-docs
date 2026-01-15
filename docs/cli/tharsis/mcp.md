---
title: MCP Server
description: "Using the Tharsis CLI MCP server for AI assistant integration"
---

The [Tharsis CLI](intro.md) includes a built-in [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server that enables AI assistants to interact with Tharsis resources programmatically.

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

## What is MCP?

The Model Context Protocol is an open standard that allows AI assistants (like Kiro, Claude, Cursor, or other LLM-based tools) to securely access external tools and data sources. The Tharsis MCP server exposes Tharsis functionality as tools that AI assistants can use to help you manage infrastructure.

## Starting the MCP Server

Start the MCP server using the `tharsis mcp` command:

```bash
tharsis mcp
```

The server communicates over stdio, making it compatible with any MCP client.

:::info
You don't need to run this command manually. Your AI client starts the MCP server automatically based on its configuration.
:::

## Configuration

The MCP server is configured through environment variables:

| Variable                             | Description                                                           |
| ------------------------------------ | --------------------------------------------------------------------- |
| `THARSIS_MCP_TOOLSETS`               | Comma-separated list of toolsets to enable                            |
| `THARSIS_MCP_TOOLS`                  | Comma-separated list of specific tools to enable (overrides toolsets) |
| `THARSIS_MCP_READ_ONLY`              | Set to `true` to disable all write operations                         |
| `THARSIS_MCP_NAMESPACE_MUTATION_ACL` | ACL patterns for allowed namespaces (groups and workspaces)           |

:::info
Command-line options (`--toolsets`, `--tools`, `--read-only`, `--namespace-mutation-acl`) take precedence over environment variables.
:::

:::info Default Behavior
When no environment variables are set, all toolsets are enabled in read-only mode for safety.
:::

The MCP server uses the same authentication as the CLI.

### Examples

Enable only workspace and run management:

```bash
THARSIS_MCP_TOOLSETS=workspace,run tharsis mcp
```

Enable read-only mode for safe exploration:

```bash
THARSIS_MCP_READ_ONLY=true tharsis mcp
```

Restrict access to production namespaces:

```bash
THARSIS_MCP_NAMESPACE_MUTATION_ACL="prod/*,prod-*" tharsis mcp
```

---

## Available Toolsets

Tools are organized into logical toolsets that can be enabled or disabled as a group.

### auth

Authentication tools for managing Tharsis connections.

| Tool                  | Type | Destructive | Description                                       |
| --------------------- | ---- | ----------- | ------------------------------------------------- |
| `login`               | read | no          | Authenticate with Tharsis using SSO               |
| `get_connection_info` | read | no          | Get current connection status and caller identity |

### run

Tools for managing Terraform runs (plan and apply workflows).

| Tool         | Type  | Destructive | Description                                         |
| ------------ | ----- | ----------- | --------------------------------------------------- |
| `list_runs`  | read  | no          | List runs with optional workspace filtering         |
| `get_run`    | read  | no          | Get run details including status and error messages |
| `create_run` | write | no          | Create a new run from configuration or module       |
| `apply_run`  | write | yes         | Apply a planned run                                 |
| `cancel_run` | write | yes         | Cancel a running or queued run                      |

### job

Tools for accessing Terraform job execution details.

| Tool           | Type | Destructive | Description                                     |
| -------------- | ---- | ----------- | ----------------------------------------------- |
| `get_job_logs` | read | no          | Retrieve paginated logs from plan or apply jobs |

### configuration_version

Tools for managing Terraform configuration uploads.

| Tool                             | Type  | Destructive | Description                                           |
| -------------------------------- | ----- | ----------- | ----------------------------------------------------- |
| `get_configuration_version`      | read  | no          | Get configuration version status                      |
| `download_configuration_version` | read  | no          | Download configuration to a local directory           |
| `create_configuration_version`   | write | no          | Upload Terraform configuration from a local directory |

### workspace

Tools for workspace lifecycle management.

| Tool                    | Type  | Destructive | Description                                   |
| ----------------------- | ----- | ----------- | --------------------------------------------- |
| `list_workspaces`       | read  | no          | List workspaces with optional group filtering |
| `get_workspace`         | read  | no          | Get workspace configuration and details       |
| `get_workspace_outputs` | read  | no          | Retrieve Terraform state outputs              |
| `create_workspace`      | write | no          | Create a new workspace                        |
| `update_workspace`      | write | no          | Update workspace settings                     |
| `delete_workspace`      | write | yes         | Delete a workspace (irreversible)             |

### group

Tools for group hierarchy management.

| Tool           | Type  | Destructive | Description                                |
| -------------- | ----- | ----------- | ------------------------------------------ |
| `list_groups`  | read  | no          | List groups with optional parent filtering |
| `get_group`    | read  | no          | Get group details                          |
| `create_group` | write | no          | Create a new subgroup                      |
| `update_group` | write | no          | Update group description                   |
| `delete_group` | write | yes         | Delete a group (irreversible)              |

### variable

Tools for managing Terraform and environment variables.

| Tool                                  | Type  | Destructive | Description                                            |
| ------------------------------------- | ----- | ----------- | ------------------------------------------------------ |
| `set_variable`                        | write | yes         | Set a single Terraform or environment variable         |
| `set_terraform_variables_from_file`   | write | yes         | Set multiple Terraform variables from a `.tfvars` file |
| `set_environment_variables_from_file` | write | yes         | Set multiple environment variables from a file         |
| `delete_variable`                     | write | yes         | Delete a variable                                      |

### managed_identity

Tools for managed identity assignments.

| Tool                        | Type  | Destructive | Description                                |
| --------------------------- | ----- | ----------- | ------------------------------------------ |
| `assign_managed_identity`   | write | no          | Assign a managed identity to a workspace   |
| `unassign_managed_identity` | write | yes         | Remove a managed identity from a workspace |

### documentation

Tools for searching Tharsis documentation.

| Tool                     | Type | Destructive | Description                                |
| ------------------------ | ---- | ----------- | ------------------------------------------ |
| `search_documentation`   | read | no          | Search documentation by keywords           |
| `get_documentation_page` | read | no          | Fetch full content of a documentation page |

### terraform_module

Tools for the Terraform module registry.

| Tool                      | Type  | Destructive | Description                    |
| ------------------------- | ----- | ----------- | ------------------------------ |
| `list_terraform_modules`  | read  | no          | List modules in the registry   |
| `get_terraform_module`    | read  | no          | Get module details             |
| `create_terraform_module` | write | no          | Create a new module            |
| `update_terraform_module` | write | no          | Update module settings         |
| `delete_terraform_module` | write | yes         | Delete a module (irreversible) |

### terraform_module_version

Tools for managing module versions.

| Tool                              | Type  | Destructive | Description                                        |
| --------------------------------- | ----- | ----------- | -------------------------------------------------- |
| `list_terraform_module_versions`  | read  | no          | List versions of a module                          |
| `get_terraform_module_version`    | read  | no          | Get version details                                |
| `upload_module_version`           | write | no          | Upload a new module version from a local directory |
| `delete_terraform_module_version` | write | yes         | Delete a module version (irreversible)             |

### terraform_provider

Tools for the Terraform provider registry.

| Tool                     | Type | Destructive | Description          |
| ------------------------ | ---- | ----------- | -------------------- |
| `get_terraform_provider` | read | no          | Get provider details |

### terraform_provider_platform

Tools for provider platform binaries.

| Tool                              | Type | Destructive | Description                            |
| --------------------------------- | ---- | ----------- | -------------------------------------- |
| `get_terraform_provider_platform` | read | no          | Get platform-specific provider details |

---

## Workflow Prompts

The MCP server includes pre-built workflow prompts that guide AI assistants through common multi-step operations.

### diagnose_run

Diagnose issues with a Terraform run. Retrieves run details and error messages, fetches job logs for detailed context, and analyzes the errors to explain what went wrong.

### fix_run

Fix a failed Terraform run. Determines whether the run used a configuration version or module source, downloads and fixes the configuration if applicable, uploads the corrected version, creates a new run, and verifies the fix worked.

### plan_run

Create a speculative plan to preview changes. Asks whether to deploy from a local directory or module source, uploads configuration if using local files, creates a speculative run, polls until planning completes, and displays the plan output.

### apply_run

Plan and apply Terraform changes with confirmation. Uploads configuration if needed, creates a run and waits for planning, shows planned changes, requests explicit user confirmation, applies changes after approval, and displays the apply results.

### setup_workspace

Create and configure a new workspace. Creates the workspace, sets variables individually or from files (.tfvars or environment files), and assigns managed identities as needed.

### publish_module

Publish a Terraform module version to the registry. Checks if the module exists, creates it if needed, uploads the module version from a local directory, and confirms successful publication.

### inspect_workspace

Get comprehensive workspace status. Retrieves workspace configuration and details, fetches current Terraform state outputs, and summarizes the workspace state.

---

## Access Control Lists (ACLs)

ACLs restrict which namespaces (groups and workspaces) the MCP server can modify. This is useful for limiting AI assistant write access to specific environments.

:::info
Read operations are not restricted by ACLs.
:::

### Pattern Syntax

Patterns support simple wildcard matching (case-insensitive):

| Pattern       | Matches                              |
| ------------- | ------------------------------------ |
| `prod`        | Exact match for "prod"               |
| `prod/*`      | Any path starting with "prod/"       |
| `prod/**`     | Same as `prod/*` (all nested levels) |
| `prod/team-*` | Paths starting with "prod/team-"     |

### Restrictions

- Wildcard-only patterns (`*`) are not allowed
- Patterns cannot start with a wildcard (`*/...`)
- Patterns should not start or end with `/`

### Examples

Allow only production namespaces:

```bash
THARSIS_MCP_NAMESPACE_MUTATION_ACL="production/*" tharsis mcp
```

Allow multiple environments:

```bash
THARSIS_MCP_NAMESPACE_MUTATION_ACL="prod/*,staging/*,dev/my-team/*" tharsis mcp
```

---

## Client Configuration

Most MCP clients use a similar JSON configuration format. Add the following to your client's MCP settings:

| Client         | Configuration File                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Kiro           | `~/.kiro/settings/mcp.json`                                                                                                          |
| Claude Desktop | `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows) |
| Cursor         | `~/.cursor/mcp.json` or via Settings → MCP                                                                                           |

```json showLineNumbers
{
  "mcpServers": {
    "tharsis": {
      "command": "tharsis",
      "args": ["mcp"],
      "env": {
        "THARSIS_MCP_READ_ONLY": "true"
      }
    }
  }
}
```

### Multiple Tharsis Instances

Use CLI profiles (`-p` flag) to connect to different Tharsis instances. Each MCP server entry can target a different profile:

```json showLineNumbers title="Multiple instances with profiles"
{
  "mcpServers": {
    "tharsis-prod": {
      "command": "tharsis",
      "args": ["-p", "production", "mcp"],
      "env": {
        "THARSIS_MCP_READ_ONLY": "true"
      }
    },
    "tharsis-staging": {
      "command": "tharsis",
      "args": ["-p", "staging", "mcp"],
      "env": {
        "THARSIS_MCP_READ_ONLY": "false",
        "THARSIS_MCP_NAMESPACE_MUTATION_ACL": "staging/*"
      }
    },
    "tharsis-dev": {
      "command": "tharsis",
      "args": ["-p", "development", "mcp"],
      "env": {}
    }
  }
}
```

See [CLI Profiles](intro.md#profiles) for setting up profiles.

### Custom MCP Clients

The server uses stdio transport. Connect by spawning the `tharsis mcp` process and communicating via stdin/stdout using the MCP protocol.

---

## Resource Identifiers

The MCP server accepts two types of resource identifiers. See [Resource Identifiers](../../guides/overviews/resource_identifiers.md) for full details.

- **Global IDs** - Opaque identifiers returned in tool responses (e.g., `run.id`, `workspace.id`)
- **TRNs** - Human-readable identifiers in the format `trn:TYPE:PATH` (e.g., `trn:workspace:my-group/my-workspace`)

---

## Limitations

To prevent accidental exposure of secrets in AI assistant conversations:

- **Sensitive variables** - Cannot set or read sensitive variables
- **Sensitive outputs** - Workspace outputs marked as sensitive are filtered out

For safety:

- **Root groups** - Cannot create or delete root-level groups
- **Force delete** - Cannot force delete any resource; must be done manually via CLI or UI

---

## Best Practices

### Safety

- Use `THARSIS_MCP_READ_ONLY=true` when exploring or debugging
- Configure ACL patterns to limit access to appropriate environments
- AI assistants should always request confirmation before write operations

### Performance

- When polling run status, use reasonable intervals (5-10 seconds)
- Use pagination for large result sets
- Job logs are paginated to avoid overwhelming context windows

### Troubleshooting

- Use `get_connection_info` to verify authentication status
- Check run status and job logs for detailed error messages
- Use `search_documentation` to find relevant guides

---

## Frequently asked questions (FAQ)

### Why are no tools showing up in my AI assistant?

Check that the MCP server is configured correctly in your client's settings. Verify the `tharsis` command is in your PATH or use the full path to the binary.

### Why am I getting "access denied" errors?

If you have `THARSIS_MCP_NAMESPACE_MUTATION_ACL` set, ensure your patterns match the namespaces you're trying to access. ACLs only restrict write operations—reads are always allowed.

### How do I enable write operations?

Set `THARSIS_MCP_READ_ONLY=false` in your client configuration. By default, the server runs in read-only mode for safety.

### Why is my tool call timing out?

Long-running operations like applies may take time. Ensure your MCP client has appropriate timeout settings. For job logs, use pagination parameters to fetch smaller chunks.

### How do I restrict access to specific workspaces?

Use the `THARSIS_MCP_NAMESPACE_MUTATION_ACL` environment variable with patterns like `prod/*` or `my-org/production/*`. Multiple patterns can be comma-separated.

### How do I connect to multiple Tharsis instances?

Use CLI profiles. Add separate MCP server entries with different profile flags:

```json
"tharsis-prod": { "args": ["-p", "production", "mcp"] },
"tharsis-dev": { "args": ["-p", "development", "mcp"] }
```

See [Multiple Tharsis Instances](#multiple-tharsis-instances) for a full example.
