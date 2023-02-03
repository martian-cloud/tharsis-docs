---
title: Commands
description: "An introduction to the CLI commands"
---

### What commands are available?

Currently, the CLI supports the following commands:

```
apply            Apply a single run.
configure        Set, update, or remove a profile.
destroy          Destroy the workspace state.
group            Do operations on groups.
module           Do operations on a terraform module.
plan             Create a speculative plan
provider         Do operations on a terraform provider.
run              Do operations on runs.
service-account  Create an authentication token for a service account.
sso              Log in to the OAuth2 provider and return an authentication token
workspace        Do operations on workspaces.
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
tharsis [global options] [command name]   [options]         [arguments]
tharsis     -p profile-name       apply     --auto-approve   path/to/workspace
```

:::note
Options, if any, **must** come before any arguments, they cannot be interchanged.

Global options, command options and arguments may not be necessary in some scenarios.

Commands shown on this page assume the user has exported the CLI's directory to PATH. See Getting Started [FAQ](intro.md#frequently-asked-questions-faq)
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

<details><summary>Expand for explanation</summary>

- Above command does not require changing into Terraform module's directory prior to apply command since `--directory-path` accomplishes the same thing.

- `--tf-var` and `--env-var`: quickly allow creating simple `key=value` Terraform and environment variable pairs respectively. Use `--tf-var-file` or `--env-var-file` for [variable files](https://www.terraform.io/language/configuration-0-11/variables#variable-files) which also support HCL Terraform variables.

- `--auto-approve`: bypass the need to confirm changes to the Terraform configuration and automatically run the apply stage after planning is complete.

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

<details><summary>Expand for explanation</summary>

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

<details><summary>Expand for explanation</summary>

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

<details><summary>Expand for explanation</summary>

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
Deleting a group is an <u>**irreversible**</u> operation. Although, Tharsis will try to prevent a deletion where nested groups / workspaces are present, an option to forcefully delete may be introduced in the near future to override that behavior.

Proceed with **extreme** caution as force deletion **permanently** removes <u>**ALL**</u> nested groups and/or workspaces with their associated deployment states. If unsure, **do not** proceed.
:::

#### group get subcommand

```shell title="Get subgroup bottom-level"
tharsis group get \
  --json \
  top-level/mid-level/bottom-level
```

<details><summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.

</details>

#### group list subcommand

```shell title="List groups under top-level"
tharsis group list \
  --json \
  --parent-path top-level
```

<details><summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.
- `--parent-path`: include only subgroups under top-level group. Optional.

</details>

#### group set-environment-vars subcommand

```shell title="Set environment variables in subgroup mid-level"
tharsis group set-environment-vars \
  --env-var-file /path/to/env/vars/file \
  top-level/mid-level
```

<details><summary>Expand for explanation</summary>

- `--env-var-file`: path to an environment variables file. Required.

</details>

#### group set-terraform-vars subcommand

```shell title="Set Terraform variables in subgroup mid-level"
tharsis group set-terraform-vars \
  --tf-var-file /path/to/.tfvars/vars/file \
  top-level/mid-level
```

<details><summary>Expand for explanation</summary>

- `--tf-var-file`: path to a .tfvars Terraform variables file. Required.

</details>

#### group update subcommand

```shell title="Update a subgroup bottom-level to have no description"
tharsis group update \
  --json \
  top-level/mid-level/bottom-level
```

<details><summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.

</details>

### Module command

Performs operations on Terraform modules hosted on Tharsis Terraform Registry.

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

```shell title="Create module top-level/parameter/aws"
tharsis module create \
  --json \
  --private false \
  top-level/parameter/aws
```

<details><summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.
- `--private`: prevent all groups from viewing and using the module (default=true). Optional.

</details>

:::caution
Module names may only contain **digits**, **lowercase** letters with a **hyphen** or an **underscore** in non-leading or trailing positions.
:::

:::info
Module paths consist of at least three components, group path `top-level`, module name `parameter`, and module system `aws`.

System is the remote system the module is intended to target.
:::

#### module create-attestation subcommand

```shell title="Create an attestation for module top-level/parameter/aws"
tharsis module create-attestation \
  --json \
  --data [Base64-encoded attestation data] \
  --description "This will create a module attestation" \
  top-level/parameter/aws
```

<details><summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.
- `--data`: the Base64-encoded DSSE envelop which contains the in-toto attestation. Required.
- `--description`: a short description for the attestation being created. Optional.

</details>

#### module delete subcommand

```shell title="Delete module top-level/parameter/aws"
tharsis module delete top-level/parameter/aws
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

```shell title="Get module top-level/parameter/aws"
tharsis module get \
  --json \
  top-level/parameter/aws
```

<details><summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.

</details>

#### module get-version subcommand

```shell title="Get a version for module top-level/parameter/aws"
tharsis module get-version \
  --json \
  --version "0.2.0" \
  top-level/parameter/aws
```

<details><summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.
- `--version`: a semver compliant version tag to use as a filter. Optional.

</details>

#### module list subcommand

```shell title="List modules"
tharsis module list \
  --json \
  --limit 5
```

<details><summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.
- `--limit`: restrict number of modules returned. Optional.

</details>

#### module list-attestations subcommand

```shell title="List attestations for module top-level/parameter/aws"
tharsis module list-attestations \
  --json \
  --limit 5 \
  top-level/parameter/aws
```

<details><summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.
- `--limit`: restrict number of module attestations returned. Optional.

</details>

#### module list-versions subcommand

```shell title="List versions for module top-level/parameter/aws"
tharsis module list-versions \
  --json \
  --limit 5 \
  top-level/parameter/aws
```

<details><summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.
- `--limit`: restrict number of module attestations returned. Optional.

</details>

#### module update subcommand

```shell title="Update module top-level/parameter/aws' name"
tharsis module update \
  --json \
  --name "a-new-name" \
  top-level/parameter/aws
```

<details><summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.

</details>

:::caution
Module names may only contain **digits**, **lowercase** letters with a **hyphen** or an **underscore** in non-leading or trailing positions.
:::

#### module update-attestation subcommand

```shell title="Update module top-level/parameter/aws attestation description"
tharsis module update-attestation \
  --json \
  --description "This is a new description for this module attestation" \
  [id]
```

<details><summary>Expand for explanation</summary>

- `--json`: display final output in formatted JSON. Optional.
- `--description`: a short description for the module attestation being updated. Optional.

</details>

#### module upload-version subcommand

```shell title="Upload a version for module top-level/parameter/aws"
tharsis module upload-version \
  --directory-path "path/to/module/directory" \
  --version "v0.2.0" \
  top-level/parameter/aws
```

<details><summary>Expand for explanation</summary>

- `--directory-path`: full path to the Terraform module's directory. Optional.
- `--version`: a semver compliant version tag. Required.

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

<details><summary>Expand for explanation</summary>

- Above command does not require changing into Terraform module's directory prior to plan command since `--directory-path` accomplishes the same thing.

- `--destroy`: designate this as a _speculative_ destroy run, allows the user to view the outcome of destroying the workspace state. Optional.

- `--tf-var` and `--env-var`: quickly allow creating simple `key=value` Terraform and environment variable pairs respectively. Use `--tf-var-file` or `--env-var-file` for [variable files](https://www.terraform.io/language/configuration-0-11/variables#variable-files) which also support HCL Terraform variables. Optional.

</details>

### Provider command

Performs operations on a terraform provider.

**Subcommands**:

```
create            Create a new provider.
upload-version    Upload a new provider version to the provider registry.
```

#### provider create subcommand

```shell title="Create provider top-level/mid-level/provider"
tharsis provider create \
  --json \
  --private \
  --repository-url "..." \
  top-level/mid-level/provider
```

<details><summary>Expand for explanation</summary>

- `--json`: Show final output as JSON.
- `--private`: Set private to false to allow all groups to view and use the provider (default=true).
- `--repository-url`: The repository URL for this provider.

</details>

#### provider upload-version subcommand

```shell title="Upload a version for provider top-level/mid-level/provider"
tharsis provider upload-version \
  --directory-path
  top-level/mid-level/provider
```

<details><summary>Expand for explanation</summary>

- `--directory-path`: The path of the terraform provider's directory.

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

### Service-account command

Performs operations on [service accounts](/docs/guides/overviews/service_accounts.md) used for Machine-to-Machine (M2M) authentication.

**Subcommands**:

```
create-token    Create a token for a service account.
```

#### service-account create-token subcommand

```shell title="Create a token for service account runner"
tharsis service-account create-token \
  --json \
  --token [authentication token] \
  top-level/mid-level/runner
```

<details><summary>Expand for explanation</summary>

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

### Workspace command

Performs operations on Tharsis workspaces, such as, creating, updating, deleting, creating variables, etc.

**Subcommands**:

```
assign-managed-identity      Assign a managed identity to a workspace.
create                       Create a new workspace.
delete                       Delete a workspace.
get                          Get a single workspace.
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

<details><summary>Expand for explanation</summary>

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

<details><summary>Expand for explanation</summary>

- `--if-not-exists`: create the workspace if its not there. Idempotent. Optional.
- `--description`: a short description for the workspace being created. Optional.
- `--managed-identity`: path to the managed identity for this workspace. Optional.
- `--max-job-duration`: number of minutes before a job is gracefully canceled by Tharsis. Optional.

</details>

:::caution
Workspace names may only contain **digits**, **lowercase** letters with a **hyphen** or an **underscore** in non-leading or trailing positions.

A workspace's name **cannot** be changed once created. It will have to be deleted and recreated which is **dangerous**.
:::

#### workspace delete subcommand

```shell title="Delete workspace hero in subgroup mid-level"
tharsis workspace delete top-level/mid-level/hero
```

:::danger deletion is dangerous
Deleting a workspace is an <u>**irreversible**</u> operation. Although, the API will try to prevent a deletion with potential deployments, a `--force` option will override that behavior.

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

<details><summary>Expand for explanation</summary>

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

<details><summary>Expand for explanation</summary>

- `--output-name`: filter to only include this output variable. Required for `--raw`, optional otherwise.
- `--json`: display final output in formatted JSON. Optional.

</details>

#### workspace set-environment-vars subcommand

```shell title="Set environment variables in workspace hero in subgroup mid-level"
tharsis workspace set-environment-vars \
  --env-var-file /path/to/env/vars/file \
  top-level/mid-level/hero
```

<details><summary>Expand for explanation</summary>

- `--env-var-file`: path to an environment variables file. Required.

</details>

#### workspace set-terraform-vars subcommand

```shell title="Set Terraform variables in workspace hero in subgroup mid-level"
tharsis workspace set-terraform-vars \
  --tf-var-file /path/to/.tfvars/vars/file \
  top-level/mid-level/hero
```

<details><summary>Expand for explanation</summary>

- `--tf-var-file`: path to a .tfvars Terraform variables file. Required.

</details>

### Frequently asked questions (FAQ)

- Is configuring a profile necessary?

  - By default, the CLI will use the default Tharsis endpoint passed in at build-time. Unless a different endpoint is needed, no profile configuration is necessary. Simply run `tharsis sso login` and the `default` profile will be created and stored in the settings file.

- Can service accounts use profile?

  - Yes, service accounts can use profiles in the same manner as a human user.

- Does the documentation show all options for every command?

  - It does not. Only the "most common" options are shown, although, different variations are present throughout the examples.

- Where is the settings file located?

  - By default, the settings file is located in the user's home directory under `.tharsis` hidden directory or `~/.tharsis/settings.json`.

    :::caution
    **Never** share the settings file as it contains sensitive data like the authentication token from SSO!
    :::

- How do I use profiles?

  - The profile can be specified using a global flag `-p`. It **must** come before a command name. For example, the command `tharsis -p local group list` will list all the groups using the Tharsis endpoint in the `local` profile.

- I have a service account token, how do I use it?

  - [Tharsis-sdk-go](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-sdk-go) and therefore, the [Tharsis CLI](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-cli) support environment variables. See [here](./intro.md#service-account).
