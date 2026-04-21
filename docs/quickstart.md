---
title: Quickstart
description: "Begin using Tharsis in 5 mins"
keywords:
  [tharsis, quickstart, getting started, terraform, first deployment, tutorial]
---

Get up to speed with Tharsis quickly! We recommend starting with the video demo below to see Tharsis in action, then follow the hands-on guide to create your first group, workspace, and run.

## Tharsis on YouTube

Watch this quick intro and demo to see Tharsis in action:

<iframe width="560" height="315" src="https://www.youtube.com/embed/zhkfyRugk_I" title="Getting Started with Tharsis: An Open Source, DevOps Platform for Terraform" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

**Getting Started with Tharsis: An Open Source, DevOps Platform for Terraform**

This demo shows launching an EC2 instance with Tharsis, highlighting key features like plan visualization, drift detection, and the benefits of using Tharsis for your Terraform workflows.

## Prerequisites

- A running Tharsis instance (see [Docker setup](/docs/setup/docker.md) for the quickest option)
- [Tharsis CLI](/docs/setup/cli.md) installed and configured

After installing the CLI, configure it to point to your Tharsis instance and log in:

```shell
tharsis configure
tharsis sso login
```

## Create a group and workspace

```shell title="Create a subgroup"
tharsis group create <parent-group>/<subgroup>
```

```shell title="Create a workspace"
tharsis workspace create <parent-group>/<subgroup>/<workspace>
```

:::note
If you don't have a top-level group, ask a system administrator to create one for you.
:::

## Apply a sample Terraform module

Create a new directory and save the following as `module.tf`:

```hcl showLineNumbers title="Sample Terraform Module using null resource"
# Simulate creating a resource which takes a minute.
resource "time_sleep" "wait_60_seconds" {
  create_duration = "60s"
}

resource "null_resource" "next" {
  depends_on = [time_sleep.wait_60_seconds]
}
```

```shell title="Apply the Terraform module"
tharsis apply -directory-path "/path/to/directory/containing/module/file" <parent-group>/<subgroup>/<workspace>
```

<span style={{ fontSize: '1.5em', color: 'orange' }}>🔥🔥 Congratulations! You've just learned the basics of Tharsis 🔥🔥</span>
