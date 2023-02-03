---
title: Runners
description: "All about runners"
---

### What are runners?

Runners are responsible for launching Terraform jobs that deploy your infrastructure to the cloud.

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

#### Tharsis runner

#### Caveats

- Currently supports a default job timeout of 720 minutes or 12 hours, although, this is configurable with the Tharsis CLI's [workspace create subcommand](../../cli/tharsis/commands.md#workspace-create-subcommand).

- Maximum memory of 512MB per job.

#### Built-in environment variables

The following environment variables are made available via Tharsis job executor:

- `THARSIS_GROUP_PATH`: full resource path of the group the job is executing inside.
- `THARSIS_ENDPOINT`: URL to the Tharsis API instance.
- `TF_TOKEN_<api_host>`: used by Tharsis Terraform Provider.

### Frequently asked questions (FAQ)

- Can I bring my own runner?
  - This is not yet supported. Tharsis currently uses its own runner, although, custom runners are on our roadmap.
