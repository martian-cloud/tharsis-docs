---
title: Quickstart
description: "Begin using Tharsis in 5 mins"
---

The following guide will walk us through the basics of creating a group, workspace, and finally a sample run with Tharsis.

To begin, download the latest CLI release. Learn [more](setup/cli/install).

Use the CLI to run the following commands to get setup:

```tharsis title="Login to default Tharsis API endpoint"
tharsis sso login
```

```tharsis title="Create a subgroup if needed"
tharsis group create quickstart/sample
```

> Creates subgroup `sample` under top-level group `quickstart`. Group path will be different for you.

```tharsis title="Create a workspace"
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

```tharsis title="Apply the Terraform module in quickstart/sample/demo workspace"
tharsis apply --directory-path "/path/to/module.tf" quick/sample/demo
```

<span style={{ fontSize: '1.5em', color: 'orange' }}>🔥🔥 Congratulations! You've just learned the basics of Tharsis 🔥🔥</span>
