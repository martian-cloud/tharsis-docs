---
title: Commands
description: "An introduction to the CLI commands"
---

### What commands are available?

Currently, the CLI supports the following commands:

```
apply                      Apply a single run.
configure                  Set, update, or remove a profile.
destroy                    Destroy the workspace state.
group                      Do operations on groups.
mcp                        Start the MCP server for AI assistant integration.
module                     Do operations on a terraform module.
plan                       Create a speculative plan
run                        Do operations on runs.
runner-agent               Do operations on runner agents.
service-account            Create an authentication token for a service account.
sso                        Log in to the OAuth2 provider and return an authentication token.
terraform-provider         Do operations on a terraform provider.
terraform-provider-mirror  Mirror Terraform providers from any Terraform registry.
workspace                  Do operations on workspaces.
```

:::tip
`tharsis [command]` or `tharsis [command] -h` will output the help menu for that specific command.
:::

:::caution cli is not yet stable!
Commands and options are subject to change with improvements to the Tharsis CLI.
:::

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

---

### Command syntax

The CLI expects commands in the following format:

```
tharsis     [global options]  [command name]      [options]      [arguments]
tharsis     -p profile-name       apply        -auto-approve   path/to/workspace
```

:::info
Options, if any, **must** come before any arguments. They **cannot** be interchanged.

Global options, command options and arguments may not be necessary in some scenarios.

Commands shown on this page assume the user has exported the CLI's directory to `$PATH`.
:::

### Apply command

Applies a Terraform module and modifies the workspace state. Changes can be viewed in the workspace details page in the UI.

**Subcommands**: none.

```shell showLineNumbers title="Simple example of applying a Terraform module in current directory"
cd <local directory with Terraform module>
tharsis apply path/to/tharsis/workspace
```

```shell title="Slightly complex apply command with Terraform module in another directory"
tharsis apply \
  --directory-path /home/user/path/to/terraform/module \
  --tf-var "some_token=token-value" \
  --env-var "TF_AWS_REGION=us-east-1" \
  --auto-approve \
  path/to/tharsis/workspace
```

<details>
<summary>Expand for explanation</summary>

- Above command does not require changing into Terraform module's directory prior to apply command since `--directory-path` accomplishes the same thing.

- `--tf-var` and `--env-var`: quickly allow creating simple `key=value` Terraform and environment variable pairs respectively. Use `--tf-var-file` or `--env-var-file` for [variable files](https://www.terraform.io/language/configuration-0-11/variables#variable-files) which also support HCL Terraform variables.

- `--auto-approve`: bypass the need to confirm changes to the Terraform configuration and automatically run the apply stage after planning is complete.

- `--target`: allows you to specify the address of a target resource for this operation. The option can be repeated on one command line to specify multiple target resources. For a run with this option, only the specified resources will be considered and acted upon.

:::caution The --target option is not recommended for frequent use
This option should be used only in rare cases where it is necessary to operate on only a small subset of the total set of resources that would otherwise be affected. When using this option, there is no guarantee of consistency between the contents of your .tf files and the final resource arrangement.
:::

- `--refresh`: allows you to disable the refresh operation that normally takes place at the beginning of an apply operation. It accepts a boolean argument with a default value of true. Generally this option should be used as --refresh=false.

</details>

### Configure command

Sets, updates, or removes a profile.

**Subcommands**:

```
list    Show all profiles
```

```shell title="Long configure command"
tharsis configure \
  --endpoint-url https://api.tharsis.example.com \
  --profile personal
```

<details>
<summary>Expand for explanation</summary>

- `--endpoint-url`: the Tharsis API endpoint. Can be "-" to delete the profile.
- `--profile`: name for the profile.

</details>

:::tip shortcut
Don't want to type out the options? Do `tharsis configure` and type in the values when asked!
:::

:::info
If **only** using the default Tharsis API endpoint, this command is optional. Proceed with `tharsis sso login` to accomplish the same thing.
:::

#### configure list subcommand

```shell title="List all profiles"
tharsis configure list
```

### Destroy command

Destroys a workspace state, and therefore, remote objects for a particular Terraform configuration.

**Subcommands**: none.

```shell showLineNumbers title="Simple example of destroying a workspace state"
cd <local directory with Terraform module>
tharsis destroy path/to/tharsis/workspace
```

```shell title="Slightly complex destroy command with Terraform module in another directory"
tharsis destroy \
  --directory-path /home/user/path/to/terraform/module \
  --tf-var-file /path/to/.tfvars/file \
  --env-var-file /path/to/environment/vars/file \
  --input false \
  path/to/tharsis/workspace
```

<details>
<summary>Expand for explanation</summary>

- Above command does not require changing into Terraform module's directory prior to destroy command since `--directory-path` accomplishes the same thing.

- `--tf-var-file` and `--env-var-file`: allow using [variable files](https://www.terraform.io/language/configuration-0-11/variables#variable-files) which also support HCL Terraform variables. Use`--tf-var` and `--env-var` to quickly create simple `key=value` Terraform and environment variable pairs respectively. Optional.

- `--input`: disable any user input. Useful if the plan needs to be reviewed before applying (therefore destroying) it. Optional.

</details>

### Group command

Performs operations on Tharsis groups, such as, creating, updating, deleting, creating variables, etc.

**Subcommands**:

```
create                  Create a new group.
delete                  Delete a group.
get                     Get a single group.
list                    List groups.
migrate                 Migrate a group.
set-environment-vars    Set environment variables for a group.
set-terraform-vars      Set terraform variables for a group.
update                  Update a group.
```

#### group create subcommand

```shell title="Create subgroup bottom-level"
tharsis group create \
  --json \
  --if-not-exists \
  --description "This will create subgroup bottom-level" \
  top-level/mid-level/bottom-level
```

<details>
<summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.
- `--if-not-exists`: create the group if its not there. Idempotent. Optional.
- `--description`: a short description for the group being created. Optional.

</details>

:::caution
Group names may only contain **digits**, **lowercase** letters with a **hyphen** or an **underscore** in non-leading or trailing positions.

A group's name **cannot** be changed once created. It will have to be deleted and recreated which is **dangerous**.
:::

#### group delete subcommand

```shell title="Delete subgroup bottom-level"
tharsis group delete top-level/mid-level/bottom-level
```

:::danger deletion is dangerous
Deleting a group is an <u>**irreversible**</u> operation. Although, Tharsis will try to prevent a deletion where nested groups / workspaces are present, the `--force` option will override that behavior.

Proceed with **extreme** caution as force deletion **permanently** removes <u>**ALL**</u> nested groups and/or workspaces with their associated deployment states. If unsure, **do not** proceed.
:::

#### group get subcommand

```shell title="Get subgroup bottom-level"
tharsis group get \
  --json \
  top-level/mid-level/bottom-level
```

<details>
<summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.

</details>

#### group list subcommand

```shell title="List groups under top-level"
tharsis group list \
  --json \
  --parent-path top-level
```

<details>
<summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.
- `--parent-path`: include only subgroups under top-level group. Optional.

</details>

#### group migrate subcommand

```shell title="Migrate group mid-level to another parent group named spectre"
tharsis group migrate \
  --new-parent-path spectre \
  --json \
  top-level/mid-level
```

<details>
<summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.
- `--new-parent-path`: path of the new parent this group will move to. Required if not using `--to-top-level`.

</details>

:::caution Migrating a group can be a destructive operation!
Although, all the resources _within_ the group and child groups are automatically migrated to the new group path, <u>**any**</u> inherited resource assignments, such as, managed identities, service accounts, etc. that are **not** available in the new group hierarchy **<u>will automatically be removed</u>**. However, this will not apply if the group is being migrated to a sibling group or within the current group's hierarchy since those resources are already available.
:::

#### group set-environment-vars subcommand

```shell title="Set environment variables in subgroup mid-level"
tharsis group set-environment-vars \
  --env-var-file /path/to/env/vars/file \
  top-level/mid-level
```

<details>
<summary>Expand for explanation</summary>

- `--env-var-file`: path to an environment variables file. Required.

</details>

#### group set-terraform-vars subcommand

```shell title="Set Terraform variables in subgroup mid-level"
tharsis group set-terraform-vars \
  --tf-var-file /path/to/.tfvars/vars/file \
  top-level/mid-level
```

<details>
<summary>Expand for explanation</summary>

- `--tf-var-file`: path to a .tfvars Terraform variables file. Required.

</details>

#### group update subcommand

```shell title="Update a subgroup bottom-level to have no description"
tharsis group update \
  --json \
  top-level/mid-level/bottom-level
```

<details>
<summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.

</details>

### MCP command

Starts the Model Context Protocol (MCP) server for AI assistant integration. The MCP server allows AI assistants like Kiro, Claude, and Cursor to interact with Tharsis resources.

:::info
You don't need to run this command manually. Your AI client starts the MCP server automatically based on its configuration.
:::

**Subcommands**: none.

```shell title="Start the MCP server"
tharsis mcp
```

```shell title="Start with specific toolsets"
tharsis mcp --toolsets workspace,run,job
```

```shell title="Start in read-only mode"
tharsis mcp --read-only
```

<details>
<summary>Expand for explanation</summary>

- `--toolsets`: comma-separated list of toolsets to enable. Optional.
- `--tools`: comma-separated list of specific tools to enable (overrides toolsets). Optional.
- `--read-only`: disable write operations. Optional.

</details>

:::info
See the [MCP Server documentation](mcp.md) for full details on configuration, available tools, and client setup.
:::

### Module command

Performs operations on Terraform modules hosted on Tharsis Terraform Registry.

:::info
See our [Terraform Module Registry overview](/docs/guides/overviews/module_registry.md) for more information on how to use the Tharsis Terraform Registry.
:::

**Subcommands**:

```
create                       Create a new module.
create-attestation           Create a new module attestation.
delete                       Delete a module.
delete-attestation           Delete a module attestation.
delete-version               Delete a module version.
get                          Get a single module.
get-version                  Get a single module version.
list                         List modules.
list-attestations            List attestations for a module.
list-versions                List module versions.
update                       Update a module.
update-attestation           Update a module attestation.
upload-version               Upload a new module version to the module registry.
```

#### module create subcommand

```shell title="Create module networking/operations/ssm-params/aws"
tharsis module create \
  --json \
  --private false \
  networking/operations/ssm-params/aws
```

<details>
<summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.
- `--private`: prevent other groups from viewing and using the module (default=true). Optional.

</details>

:::caution
Module names may only contain **digits**, **lowercase** letters with a **hyphen** or an **underscore** in non-leading or trailing positions.
:::

:::info
Every module source consists of four parts: `<hostname>/<namespace>/<name>/<system>` where:

- `hostname`: the hostname of the registry serving the module. For example, `registry.terraform.io`.
- `namespace`: the location of the module within the registry. For Tharsis, this is the top-level group's name.
- `name`: the name of the module. Must be unique within the namespace (top-level group).
- `system`: the remote system the module is primarily targeted at. Generally, this should match the provider's official name. For example, `aws`, `azurerm`, `google`, `oci`, etc.

After creation, the module source will only show the top-level group after creation. So, our module source will show up as `networking/ssm-params/aws` even though it actually lives in `networking/operations/ssm-params/aws`. This is to conform to the [Terraform Module Registry](https://developer.hashicorp.com/terraform/internals/module-registry-protocol)'s naming convention. However, we can still interact with the module using the full path in the CLI.
:::

#### module create-attestation subcommand

```shell title="Create an attestation for module networking/ssm-params/aws"
tharsis module create-attestation \
  --json \
  --data [Base64-encoded attestation data] \
  --description "This will create a module attestation" \
  networking/ssm-params/aws
```

<details>
<summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.
- `--data`: the Base64-encoded DSSE envelop which contains the in-toto attestation. Required.
- `--description`: a short description for the attestation being created. Optional.

</details>

#### module delete subcommand

```shell title="Delete module networking/ssm-params/aws"
tharsis module delete networking/ssm-params/aws
```

:::danger deletion is dangerous
Deleting a Terraform module is an <u>**irreversible**</u> operation. Tharsis will <u>**not**</u> prevent a deletion!
:::

#### module delete-attestation subcommand

```shell title="Delete an attestation for a module"
tharsis module delete-attestation [attestation id]
```

:::danger deletion is dangerous
Deleting a Terraform module attestation is an <u>**irreversible**</u> operation. Tharsis will <u>**not**</u> prevent a deletion!
:::

#### module delete-version subcommand

```shell title="Delete a version for a module"
tharsis module delete-version [version id]
```

:::danger deletion is dangerous
Deleting a Terraform module version is an <u>**irreversible**</u> operation. Tharsis will <u>**not**</u> prevent a deletion!
:::

#### module get subcommand

```shell title="Get module networking/ssm-params/aws"
tharsis module get \
  --json \
  networking/ssm-params/aws
```

<details>
<summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.

</details>

#### module get-version subcommand

```shell title="Get a version for module networking/ssm-params/aws"
tharsis module get-version \
  --json \
  --version "0.2.0" \
  networking/ssm-params/aws
```

<details>
<summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.
- `--version`: a semver compliant version tag to use as a filter. Optional.

</details>

#### module list subcommand

```shell title="List modules"
tharsis module list \
  --json \
  --limit 5
```

<details>
<summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.
- `--limit`: restrict number of modules returned. Optional.

</details>

#### module list-attestations subcommand

```shell title="List attestations for module networking/ssm-params/aws"
tharsis module list-attestations \
  --json \
  --limit 5 \
  networking/ssm-params/aws
```

<details>
<summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.
- `--limit`: restrict number of module attestations returned. Optional.

</details>

#### module list-versions subcommand

```shell title="List versions for module networking/ssm-params/aws"
tharsis module list-versions \
  --json \
  --limit 5 \
  networking/ssm-params/aws
```

<details>
<summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.
- `--limit`: restrict number of module attestations returned. Optional.

</details>

#### module update subcommand

```shell title="Update module networking/ssm-params/aws to be public"
tharsis module update \
  --json \
  --private=false \
  networking/ssm-params/aws
```

<details>
<summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.

</details>

:::caution
Module names may only contain **digits**, **lowercase** letters with a **hyphen** or an **underscore** in non-leading or trailing positions.
:::

#### module update-attestation subcommand

```shell title="Update module networking/ssm-params/aws attestation description"
tharsis module update-attestation \
  --json \
  --description "This is a new description for this module attestation" \
  [id]
```

<details>
<summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.
- `--description`: a short description for the module attestation being updated. Optional.

</details>

#### module upload-version subcommand

```shell title="Upload a version for module networking/ssm-params/aws"
tharsis module upload-version \
  --directory-path "path/to/module/directory" \
  --version "0.2.0" \
  networking/ssm-params/aws
```

<details>
<summary>Expand for explanation</summary>

- `--directory-path`: full path to the Terraform module's directory. Optional.
- `--version`: a [Semantic Version 2.0](https://semver.org/spec/v2.0.0.html) compliant version tag. Required.

</details>

### Plan command

Creates a speculative plan based on the Terraform configuration and allows user to view the changes.

**Subcommands**: none.

```shell showLineNumbers title="Simple example of planning a Terraform module in current directory"
cd <local directory with Terraform module>
tharsis plan path/to/tharsis/workspace
```

```shell title="Slightly complex plan command with Terraform module in another directory"
tharsis plan \
  --directory-path /home/user/path/to/terraform/module \
  -- destroy \
  --tf-var "some_token=token-value" \
  --env-var "TF_AWS_REGION=us-east-1" \
  path/to/tharsis/workspace
```

<details>
<summary>Expand for explanation</summary>

- Above command does not require changing into Terraform module's directory prior to plan command since `--directory-path` accomplishes the same thing.

- `--destroy`: designate this as a _speculative_ destroy run, allows the user to view the outcome of destroying the workspace state. Optional.

- `--tf-var` and `--env-var`: quickly allow creating simple `key=value` Terraform and environment variable pairs respectively. Use `--tf-var-file` or `--env-var-file` for [variable files](https://www.terraform.io/language/configuration-0-11/variables#variable-files) which also support HCL Terraform variables. Optional.

- `--target`: allows you to specify the address of a target resource for this operation. The option can be repeated on one command line to specify multiple target resources. For a run with this option, only the specified resources will be considered and acted upon.

:::caution The --target option is not recommended for frequent use
This option should be used only in rare cases where it is necessary to operate on only a small subset of the total set of resources that would otherwise be affected. When using this option, there is no guarantee of consistency between the contents of your .tf files and the final resource arrangement.
:::

- `--refresh`: allows you to disable the refresh operation that normally takes place at the beginning of a plan operation. It accepts a boolean argument with a default value of true. Generally this option should be used as --refresh=false.

</details>

### Run command

Performs operations on runs.

**Subcommands**:

```
cancel    Cancel a run.
```

#### run cancel subcommand

```shell title="Cancel a run with an ID"
tharsis run cancel [run id]
```

:::info
A run must receive a graceful cancellation request prior to a forced cancellation.
:::

### Runner-agent command

Performs operations on [runner agents](/docs/guides/overviews/runner_agents.md) used for launching Terraform jobs.

**Subcommands**:

```
assign-service-account      Assign a service account to a runner agent.
create                      Create a new runner agent.
delete                      Delete a runner agent.
get                         Get a single runner agent.
unassign-service-account    Unassign a service account to a runner agent.
update                      Update a runner agent.
```

#### runner-agent assign-service-account subcommand

```shell title="Assign service account bot to runner agent backup"
tharsis runner-agent assign-service-account networking/bot networking/backup
```

#### runner-agent create subcommand

```shell title="Create runner agent backup in group networking"
tharsis runner-agent create \
  --json \
  --description "A backup runner agent for all our networking tasks." \
  --group-path "networking" \
  --runner-name "backup"
```

<details>
<summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.
- `--description`: a short description for the runner agent being created. Optional.
- `--group-path`: full path to the group where runner agent will be created. Required.
- `--runner-name`: name of the new runner agent. Required.

</details>

:::caution
Runner agent names may only contain **digits**, **lowercase** letters with a **hyphen** or an **underscore** in non-leading or trailing positions.

A runner agent's name **cannot** be changed once created. It will have to be deleted and recreated which is **dangerous**.
:::

#### runner-agent delete subcommand

```shell title="Delete a runner agent"
tharsis runner-agent delete [id]
```

:::danger deletion is dangerous
Deleting a runner agent is an <u>**irreversible**</u> operation. Tharsis will <u>**not**</u> prevent a deletion!
:::

#### runner-agent get subcommand

```shell title="Get a runner agent"
tharsis runner-agent get --json [id]
```

<details>
<summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.

</details>

#### runner-agent unassign-service-account subcommand

```shell title="Unassign service account from runner agent backup"
tharsis runner-agent unassign-service-account networking/bot networking/backup
```

#### runner-agent update subcommand

```shell title="Update runner agent to have no description"
tharsis runner-agent update [id]
```

### Service-account command

Performs operations on [service accounts](/docs/guides/overviews/service_accounts.md) used for Machine-to-Machine (M2M) authentication.

**Subcommands**:

```
create-token    Create a token for a service account.
```

#### service-account create-token subcommand

```shell title="Create a token for service account bot"
tharsis service-account create-token \
  --json \
  --token [authentication token] \
  networking/bot
```

<details>
<summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.
- `--token`: initial authentication token from a OIDC provider in service account's trust policy. Required.

</details>

### SSO command

Authenticates the user using [Single Sign-On (SSO)](https://en.wikipedia.org/wiki/Single_sign-on).

**Subcommands**:

```
login    Log in to the OAuth2 provider and return an authentication token
```

#### sso login subcommand

The login command starts an embedded web server and opens a web browser page
or tab pointed at said web server. That redirects to the OAuth2 provider's
login page, where the user can sign in. If there is an SSO scheme active,
that will sign in the user. The login command captures the authentication
token for use in subsequent commands.

```shell title="Login using a specified profile"
tharsis sso login
```

:::tip did you know...
`tharsis sso login` command can bypass the need to configure a profile if only using the default Tharsis API endpoint.
:::

### Terraform-provider command

Performs operations on a terraform provider.

:::info
See our [Terraform Provider Registry overview](/docs/guides/overviews/provider_registry.md) for more information on how to use the Tharsis Terraform Registry.
:::

**Subcommands**:

```
create            Create a new Terraform provider.
upload-version    Upload a new Terraform provider version to the provider registry.
```

#### terraform-provider create subcommand

```shell title="Create provider networking/destination/toolchain"
tharsis terraform-provider create \
  --json \
  --private \
  --repository-url "https://gitlab.com/tools/toolchain" \
  networking/destination/toolchain
```

<details>
<summary>Expand for explanation</summary>

- `--json`: Show final output as JSON.
- `--private`: Set private to false to allow all groups to view and use the Terraform provider (default=true).
- `--repository-url`: The repository URL for this Terraform provider.

</details>

:::caution
Module names may only contain **digits**, **lowercase** letters with a **hyphen** or an **underscore** in non-leading or trailing positions.
:::

:::info
Every Terraform provider consists of three parts: `<registry-hostname>/<namespace>/<type>` where:

- `registry-hostname`: the hostname of the registry serving the provider. For example, `registry.terraform.io`.
- `namespace`: the location of the provider within the registry. For Tharsis, this is the top-level group's name.
- `type`: the type of the provider. For example, `azurerm`, `aws`, `google`, `oci`, etc. It's unique within the namespace (top-level group).

In the UI, the provider will only show the top-level group after creation. So, our provider will show up as `networking/toolchain` even though it actually lives in `networking/destination/toolchain`. This is to conform to the [Terraform Provider Registry](https://developer.hashicorp.com/terraform/internals/provider-registry-protocol)'s naming convention. However, we can still interact with the provider using the full path in the CLI.
:::

#### terraform-provider upload-version subcommand

```shell title="Upload a version for provider networking/destination/toolchain"
tharsis terraform-provider upload-version \
  --directory-path "my-providers/toolchain" \
  networking/destination/toolchain
```

<details>
<summary>Expand for explanation</summary>

- `--directory-path`: The path of the terraform provider's directory.

</details>

### Terraform-provider-mirror command

The terraform-provider-mirror command allows interacting with the Tharsis Terraform provider mirror, which supports Terraform's Provider Network Mirror Protocol. The Tharsis provider mirror hosts a set of Terraform providers for use within a group's hierarchy and gives root group owners full control on which providers, platform packages and registries are available via their mirror. Subcommands help upload provider packages from any Terraform Provider Registry to the mirror. Uploaded packages will be verified for legitimacy against the provider's Terraform Registry API.

**Subcommands**:

```
delete-platform    Delete a Terraform provider platform from mirror.
delete-version     Delete a Terraform provider version from mirror.
get-version        Get a mirrored Terraform provider version.
list-platforms     List all platforms associated with a mirrored provider version.
list-versions      List Terraform Provider versions available via Tharsis provider mirror.
sync               Upload Terraform provider platform packages to the provider mirror.
```

#### terraform-provider-mirror delete-platform subcommand

```shell title="Delete a platform"
tharsis terraform-provider-mirror delete-platform  <id> \
```

<details>
<summary>Expand for explanation</summary>

Specify the ID of the platform to delete.

</details>

#### terraform-provider-mirror delete-version subcommand

```shell title="Delete a version"
tharsis terraform-provider-mirror delete-version <id> \
  --force
```

<details>
<summary>Expand for explanation</summary>

- `--force`: Force the deletion of a provider version from mirror.

Specify the ID of the version to delete.

</details>

#### terraform-provider-mirror get-version subcommand

```shell title="Get a version"
tharsis terraform-provider-mirror get-version \
  --json \
  <id>
```

<details>
<summary>Expand for explanation</summary>

- `--json`: Show final output as JSON.

Specify the ID of the version to get.

</details>

#### terraform-provider-mirror list-platforms subcommand

```shell title="List platforms"
tharsis terraform-provider-mirror list-platforms \
  --json \
  <version_id>
```

<details>
<summary>Expand for explanation</summary>

- `--json`: Show final output as JSON.

Specify the ID of the version for which to list the platforms.

</details>

#### terraform-provider-mirror list-versions subcommand

```shell title="List versions"
tharsis terraform-provider-mirror list-versions \
  --cursor \
  --json \
  --limit \
  --sort-order \
  <root-group-path>
```

<details>
<summary>Expand for explanation</summary>

- `--cursor`: The cursor string for manual pagination.
- `--json`: Show final output as JSON.
- `--limit`: Maximum number of result elements to return.
- `--sort-order`: Sort in this direction, ASC or DESC.

Specify the name (same as the path) of the root group.

</details>

#### terraform-provider-mirror sync subcommand

```shell title="sync"
tharsis terraform-provider-mirror sync \
  --platform="windows_amd64" \
  --platform="linux_386" \
  --group-path "top-level" \
  registry.terraform.io/hashicorp/aws
```

<details>
<summary>Expand for explanation</summary>

- `--group-path`: Full path to the root group where this Terraform provider version will be mirrored. Required.
- `--platform`: Specifies which platform (os_arch) the packages should be uploaded for. Defaults to all supported.
- `--version`: The semantic version of the target Terraform provider. Defaults to latest.

Specify the Fully Qualified Name (FQN), which must be formatted as:

`{registry hostname}/{registry namespace}/{provider name}`

Example: `registry.terraform.io/hashicorp/aws`

</details>

### Workspace command

Performs operations on Tharsis workspaces, such as, creating, updating, deleting, creating variables, etc.

**Subcommands**:

```
assign-managed-identity      Assign a managed identity to a workspace.
create                       Create a new workspace.
delete                       Delete a workspace.
get                          Get a single workspace.
label                        Manage labels on a workspace.
list                         List workspaces.
outputs                      Get the state version outputs for a workspace.
set-environment-vars         Set environment variables for a workspace.
set-terraform-vars           Set terraform variables for a workspace.
unassign-managed-identity    Unassign a managed identity from a workspace.
update                       Update a workspace.
```

#### workspace assign-managed-identity subcommand

```shell title="Assign managed identity aws-deployment to workspace_3"
tharsis -p profile-name workspace assign-managed-identity \
  --json \
  top-level/mid-level/workspace_3 \
  top-level/aws-deployment
```

<details>
<summary>Expand for explanation</summary>

- `-p`: profile name. Optional.
- `--json`: display final output in formatted JSON. Optional.

</details>

#### workspace create subcommand

```shell title="Create workspace hero in subgroup bottom-level"
tharsis workspace create \
  --if-not-exists \
  --description "This will create hero in subgroup bottom-level" \
  --managed-identity top-level/aws-deployment \
  --max-job-duration 300 \
  top-level/mid-level/bottom-level/hero
```

<details>
<summary>Expand for explanation</summary>

- `--if-not-exists`: create the workspace if its not there. Idempotent. Optional.
- `--description`: a short description for the workspace being created. Optional.
- `--managed-identity`: path to the managed identity for this workspace. Optional.
- `--max-job-duration`: number of minutes before a job is gracefully canceled by Tharsis. Optional.
- `--label`: add a label to the workspace in `key=value` format. Can be specified multiple times. Optional.

</details>

**Create workspace with a single label:**

```shell title="Create workspace with environment label"
tharsis workspace create \
  --label environment=production \
  top-level/mid-level/api-server
```

**Create workspace with multiple labels:**

```shell title="Create workspace with multiple labels"
tharsis workspace create \
  --label environment=production \
  --label team=platform \
  --label cost-center=engineering \
  top-level/mid-level/api-server
```

**Create workspace with label containing spaces:**

```shell title="Create workspace with label value containing spaces"
tharsis workspace create \
  --label "description=Production API Server" \
  top-level/mid-level/api-server
```

:::info Label Format
Labels must be specified in `key=value` format. Label keys can only contain lowercase letters, numbers, hyphens, and underscores (max 64 characters). Label values can contain alphanumeric characters, hyphens, underscores, and spaces (max 255 characters). A workspace can have a maximum of 10 labels.
:::

:::caution
Workspace names may only contain **digits**, **lowercase** letters with a **hyphen** or an **underscore** in non-leading or trailing positions.

A workspace's name **cannot** be changed once created. It will have to be deleted and recreated which is **dangerous**.
:::

#### workspace delete subcommand

```shell title="Delete workspace hero in subgroup mid-level"
tharsis workspace delete top-level/mid-level/hero
```

:::danger deletion is dangerous
Deleting a workspace is an <u>**irreversible**</u> operation. Although, the API will try to prevent a deletion with potential deployments, the `--force` option will override that behavior.

Proceed with **extreme** caution as force deletion **permanently** removes <u>**ALL**</u> deployment state files and related information from Tharsis. If unsure, **do not** proceed.
:::

#### workspace get subcommand

```shell title="Get workspace hero in subgroup bottom-level"
tharsis workspace get top-level/mid-level/bottom-level/hero
```

#### workspace list subcommand

```shell title="List five workspaces"
tharsis -p profile-name workspace list \
  --json \
  --limit 5
```

<details>
<summary>Expand for explanation</summary>

- `-p`: profile name. Optional.
- `--json`: display final output in formatted JSON. Optional.
- `--limit`: restrict number of workspaces returned. Optional.

</details>

#### workspace outputs subcommand

```shell title="Get a specific state version output for workspace hero"
tharsis workspace outputs \
  --output-name some_output_name \
  --json \
  top-level/mid-level/hero
```

<details>
<summary>Expand for explanation</summary>

- `--output-name`: filter to only include this output variable. Required for `--raw`, optional otherwise.
- `--json`: display final output in formatted JSON. Optional.

</details>

#### workspace set-environment-vars subcommand

```shell title="Set environment variables in workspace hero in subgroup mid-level"
tharsis workspace set-environment-vars \
  --env-var-file /path/to/env/vars/file \
  top-level/mid-level/hero
```

<details>
<summary>Expand for explanation</summary>

- `--env-var-file`: path to an environment variables file. Required.

</details>

#### workspace set-terraform-vars subcommand

```shell title="Set Terraform variables in workspace hero in subgroup mid-level"
tharsis workspace set-terraform-vars \
  --tf-var-file /path/to/.tfvars/vars/file \
  top-level/mid-level/hero
```

<details>
<summary>Expand for explanation</summary>

- `--tf-var-file`: path to a .tfvars Terraform variables file. Required.

</details>

#### workspace unassign-managed-identity subcommand

```shell title="Unassign managed identity aws-deployment from workspace_3"
tharsis workspace unassign-managed-identity \
  --json \
  top-level/mid-level/workspace_3 \
  top-level/aws-deployment
```

<details>
<summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.

</details>

#### workspace update subcommand

```shell title="Update workspace hero with new description"
tharsis workspace update \
  --description "Updated workspace description" \
  top-level/mid-level/hero
```

<details>
<summary>Expand for explanation</summary>

- `--description`: a short description for the workspace. Optional.
- `--max-job-duration`: number of minutes before a job is gracefully canceled by Tharsis. Optional.
- `--label`: set workspace labels in `key=value` format. Can be specified multiple times. **Replaces all existing labels**. Optional.

</details>

**Update workspace with labels:**

```shell title="Update workspace with labels and description"
tharsis workspace update \
  --description "Production API workspace" \
  --label environment=production \
  --label team=platform \
  top-level/mid-level/api-server
```

**Update only labels:**

```shell title="Update workspace labels only"
tharsis workspace update \
  --label environment=staging \
  --label cost-center=engineering \
  top-level/mid-level/api-server
```

**Remove all labels from a workspace:**

```shell title="Remove all labels by updating with no label flags"
tharsis workspace update \
  --description "Workspace with no labels" \
  top-level/mid-level/api-server
```

:::caution Label Replacement Behavior
The `--label` flag **replaces ALL existing labels** on the workspace. If you want to add or remove individual labels without affecting others, use the `workspace label` subcommand instead, which provides additive label operations.
:::

:::info Label Format
Labels must be specified in `key=value` format. Label keys can only contain lowercase letters, numbers, hyphens, and underscores (max 64 characters). Label values can contain alphanumeric characters, hyphens, underscores, and spaces (max 255 characters). A workspace can have a maximum of 10 labels.
:::

#### workspace label subcommand

The `workspace label` subcommand provides incremental label management, allowing you to add, update, or remove individual labels without affecting other labels on the workspace.

**Command syntax:**

```bash
tharsis workspace label [options] <workspace_path> [label_operations...]
```

**Label operations:**

- `key=value` - Add a new label or update an existing label's value
- `key-` - Remove a label (trailing hyphen indicates removal)

**Options:**

- `--overwrite` - Replace all existing labels with the specified labels (cannot be used with removal operations)
- `--json` - Output the result in JSON format

**Add or update labels (additive):**

```shell title="Add a single label"
tharsis workspace label my-group/my-workspace environment=production
```

```shell title="Add multiple labels"
tharsis workspace label my-group/my-workspace \
  environment=production \
  team=platform \
  owner=john-doe
```

```shell title="Update an existing label value"
tharsis workspace label my-group/my-workspace environment=staging
```

**Remove labels:**

```shell title="Remove a single label"
tharsis workspace label my-group/my-workspace environment-
```

```shell title="Remove multiple labels"
tharsis workspace label my-group/my-workspace \
  environment- \
  team- \
  owner-
```

**Mix add and remove operations:**

```shell title="Update and remove labels in one command"
tharsis workspace label my-group/my-workspace \
  environment=staging \
  team- \
  cost-center=engineering \
  owner-
```

**Replace all labels (overwrite):**

```shell title="Replace with new labels"
tharsis workspace label --overwrite my-group/my-workspace \
  environment=production \
  version=v2 \
  team=platform
```

```shell title="Remove all labels"
tharsis workspace label --overwrite my-group/my-workspace
```

:::tip workspace label vs workspace update
Use `workspace label` for label-specific operations. The default behavior is additive - existing labels are preserved unless explicitly updated or removed. Use `workspace update --label` only when you need to modify other workspace properties at the same time, but note that it replaces ALL existing labels.
:::

**Common validation errors:**

- **Invalid label key format**: Keys must be lowercase letters, numbers, hyphens, and underscores only. Cannot start or end with hyphen or underscore.
- **Invalid label value**: Values can only contain alphanumeric characters, hyphens, underscores, and spaces.
- **Maximum labels exceeded**: A workspace can have a maximum of 10 labels.
- **Empty key or value**: Both key and value must be provided in `key=value` format.

For detailed information about workspace labels, constraints, and best practices, see the [workspace overview documentation](../../guides/overviews/workspaces).

## Frequently asked questions (FAQ)

### Is configuring a profile necessary?

By default, the CLI will use the default Tharsis endpoint passed in at build-time. Unless a different endpoint is needed, no profile configuration is necessary. Simply run `tharsis sso login` and the `default` profile will be created and stored in the settings file.

### Can service accounts use profile?

Yes, service accounts can use profiles in the same manner as a human user.

### Does the documentation show all options for every command?

It does not. Only the "most common" options are shown, although, different variations are present throughout the examples.

### Where is the settings file located?

By default, the settings file is located in the user's home directory under `.tharsis` hidden directory or `~/.tharsis/settings.json`.

:::caution
**Never** share the settings file as it contains sensitive data like the authentication token from SSO!
:::

### How do I use profiles?

The profile can be specified using a global flag `-p`. It **must** come before a command name. For example, the command `tharsis -p local group list` will list all the groups using the Tharsis endpoint in the `local` profile.

### I have a service account token, how do I use it?

[Tharsis-sdk-go](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-sdk-go) and the [Tharsis CLI](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-cli) support service account authentication with environment variables. See [here](./intro.md#service-account).

### Can I use Terraform variables from the CLI's environment inside a run?

Yes, you can use Terraform variables from the CLI's environment inside a run. The environment variables names must have the "TF*VAR*" prefix. That prefix is trimmed from the name of the Terraform variable that will be set to the value of the environment variable. For example, if the CLI receives an environment variable named TF_VAR_Something with a value of "else", then there will be a Terraform variable named "Something" set to a value of "else".
