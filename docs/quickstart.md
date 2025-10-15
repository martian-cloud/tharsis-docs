---
title: Quickstart
description: "Begin using Tharsis in 5 mins"
---

Get up to speed with Tharsis quickly! We recommend starting with the video demo below to see Tharsis in action, then follow the hands-on guide to create your first group, workspace, and run.

## Tharsis on YouTube

Watch this quick intro and demo to see Tharsis in action:

<iframe width="560" height="315" src="https://www.youtube.com/embed/zhkfyRugk_I" title="Getting Started with Tharsis: An Open Source, DevOps Platform for Terraform" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

**Getting Started with Tharsis: An Open Source, DevOps Platform for Terraform**

This demo shows launching an EC2 instance with Tharsis, highlighting key features like plan visualization, drift detection, and the benefits of using Tharsis for your Terraform workflows.

## Getting Started

To begin, download the latest CLI release. Learn [more](setup/cli/install).

:::tip want to try it out locally?

Pre-built Docker images are available in our GitLab registry and allow running the entire Tharsis suite in minutes!

Check out our Docker installation guide [here](/docs/setup/docker/install.md).

:::

Use the CLI to run the following commands to get set up:

<details>
<summary>Expand if using Docker Compose locally</summary>

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
