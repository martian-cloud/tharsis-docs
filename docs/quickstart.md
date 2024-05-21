---
title: Quickstart
description: "Begin using Tharsis in 5 mins"
---

The following guide will walk us through the basics of creating a group, workspace, and finally a sample run with Tharsis.

To begin, download the latest CLI release. Learn [more](setup/cli/install).

:::tip want to try it out locally?

Pre-built Docker images are available in our GitLab registry and allow running the entire Tharsis suite in minutes!

Check out our Docker installation guide [here](/docs/setup/docker/install.md).

:::

Use the CLI to run the following commands to get setup:

<details>
<summary>Expand if using Docker compose locally</summary>

```shell title="Create a profile to use with Docker"
tharsis configure --endpoint-url http://localhost:6560 --profile dc
```

Above command will create a profile named `dc` to use against the Docker compose.

```shell title="Sample usage"
tharsis -p dc ...
```

</details>

```shell title="Login to the default Tharsis API endpoint"
tharsis sso login
```

```shell title="Create a subgroup if needed"
tharsis group create quickstart/sample
```

> Creates subgroup `sample` under top-level group `quickstart`. Group path will be different for you.

```shell title="Create a workspace"
tharsis workspace create quickstart/sample/demo
```

> Creates workspace `demo` under subgroup `sample`.

Apply a sample Terraform module:

Copy the sample module below and save it to a new directory in a file called `module.tf`:

```hcl showLineNumbers title="Sample Terraform Module using null resource"
# Simulate creating a resource which takes a minute.
resource "time_sleep" "wait_60_seconds" {
  create_duration = "60s"
}

resource "null_resource" "next" {
  depends_on = [time_sleep.wait_60_seconds]
}
```

```shell title="Apply the Terraform module in quickstart/sample/demo workspace"
tharsis apply --directory-path "/path/to/directory/containing/module/file" quickstart/sample/demo
```

<span style={{ fontSize: '1.5em', color: 'orange' }}>🔥🔥 Congratulations! You've just learned the basics of Tharsis 🔥🔥</span>
