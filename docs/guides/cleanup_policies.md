---
title: Cleanup Policies
description: "What are cleanup policies and how do you use them in Tharsis?"
keywords:
  [
    tharsis,
    cleanup policies,
    retention,
    runs,
    terraform modules,
    terraform providers,
    pruning,
    housekeeping,
  ]
---

## What are cleanup policies?

A cleanup policy automatically deletes resources a namespace no longer needs. Each policy covers one resource kind, and a policy set on a [group](./groups.md) also applies to every namespace beneath it, until a namespace below sets its own policy for that kind. Tharsis carries out the deletions on its own, on a recurring schedule in the background, so you set the rules once and let Tharsis keep things tidy.

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

---

## The three resource kinds

A separate policy covers each kind of resource:

- **Runs**: a [workspace](./workspaces.md)'s runs. A runs policy can be set on a group or a workspace.
- **Terraform Modules**: [module](./module_registry.md) versions. A modules policy can be set on a group only.
- **Terraform Providers**: [provider](./provider_registry.md) versions. A providers policy can be set on a group only.

## Where to find it

Cleanup policies live under the `Administration` section of the left sidebar:

- On a group, click on `Cleanup` under `Administration`.
- On a workspace, click on `Cleanup` under `Administration`.

When no policy applies yet, the screen shows a get started message and a <span style={{ color: '#4db6ac' }}>`NEW CLEANUP POLICY`</span> button. Once policies apply, the screen lists the policies in effect, each as a row you can expand to see its rules.

## Creating a policy

1. Navigate to the group or workspace and click on `Cleanup` under `Administration`.
2. Click on <span style={{ color: '#4db6ac' }}>`NEW CLEANUP POLICY`</span>.
3. Choose the resource kind. A kind already covered by a policy here, or already inherited from above, cannot be chosen again, and the reason is shown when you hover over it.
4. Set the policy to `Enabled` or `Disabled`. A disabled policy deletes nothing for that kind while it is off.
5. Add [rules](#rules-and-how-they-are-evaluated).
6. Click on <span style={{ color: '#4db6ac' }}>`CREATE POLICY`</span>.

:::note
Creating a policy requires the create cleanup policy permission. See [Permissions and access](#permissions-and-access).
:::

:::important
A policy's resource kind cannot be changed after it is created. Everything else can be edited later.
:::

## Rules and how they are evaluated

A policy holds an ordered list of rules, and a policy can hold up to twenty. Each resource is checked against the rules from top to bottom, and the first rule that matches decides its fate, so order matters.

### Rule order

Because the first match wins, a broad rule placed above a narrower one hides the narrower one. For example:

- A `Delete past an age` rule that matches every run, placed first.
- A `Keep a fixed number` rule for speculative runs, placed below it.

Here the `Keep a fixed number` rule never fires, because the delete rule above it already matched every run first. Saving the policy is rejected if one rule already covers everything a later rule would match, with a message saying the later rule can never apply. Separately, the editor always keeps `Never delete` rules ahead of the others, so a protecting rule can never be stranded below a deleting one.

### Strategies

Each rule uses one of three strategies:

- `Keep a fixed number`: keep a set number of the newest items and delete the rest. Runs only.
- `Delete past an age`: delete items older than a set number of days. For runs, it also keeps a set number of the newest items.
- `Never delete`: keep every matching item, so nothing below the rule can delete it.

Which strategies a kind offers depends on the kind:

| Resource kind | `Keep a fixed number` | `Delete past an age` | `Never delete` |
| --- | --- | --- | --- |
| Runs | Yes | Yes | Yes |
| Terraform Modules | No | Yes | Yes |
| Terraform Providers | No | Yes | Yes |

Limits apply to the numbers a rule can use:

- For a `Delete past an age` rule, the age in days must be between seven and about ten years.
- For runs, the number of newest items to keep must be between one and one thousand.

### The fields for each kind

Every rule can carry a short description.

**Runs**

- `Run kind`: speculative, assessment, or both. Selecting none matches every run kind.
- `Statuses`: pick any of `planned_and_finished`, `errored`, `canceled`, and `discarded`. Selecting none matches every finished run.
- `Keep newest` or `Always keep`: the same field under two labels. It is labeled `Keep newest` for a `Keep a fixed number` rule and `Always keep` for a `Delete past an age` rule, and in both it sets how many of the newest runs to keep.
- `Days`: the age past which a run can be deleted.

:::note
A run-kind filter can also match its opposite, meaning no speculative or no assessment. This is set through the JSON editor.
:::

**Terraform Modules**

- `Module name`, `System`, and `Module version` patterns.
- `Days`.

**Terraform Providers**

- `Provider name` and `Provider version` patterns.
- `Days`.

A name or version pattern can be an exact value or a glob pattern. For example, `aws-*` matches any name starting with `aws-`, and `1.*` matches any version starting with `1.`.

### What is always protected

Some resources are never deleted, no matter what the rules say:

- The latest version of each module is never deleted.
- The latest version of each provider is never deleted.
- A run that produced a state version is never deleted, and does not count toward the number of newest runs a rule keeps.
- The run behind the workspace's current drift assessment is never deleted.

### Editing rules two ways

You can enter rules in either of two ways, through the `Visual` and `JSON` tabs:

- The **visual editor** builds a rule through fields. When you add a new rule, it offers ready-made starting points for the chosen kind that you can take as a base and adjust.
- The **JSON editor** lets you enter rules directly as JSON.

:::note
Only the JSON editor can hold rules that do not parse. The screen prevents saving until the rules are valid.
:::

### Example

A runs policy that tidies a busy workspace without losing what matters uses three rules, in this order:

- **Protect drift history** — a `Never delete` rule for assessment runs, placed first so nothing below can remove them.
- **Trim speculative plans** — a `Keep a fixed number` rule that keeps the 20 newest speculative runs and deletes the older ones.
- **Clear out the rest** — a `Delete past an age` rule that removes any remaining finished run older than 90 days.

Because the first matching rule wins, the `Never delete` rule has to come first. If it came last, the deleting rules above would have already removed the assessment runs before it was ever reached.

## Reading an existing policy

Each kind in effect shows as a row. A policy row shows the kind, a `Disabled` marker when it is turned off, and when it was last swept. Expanding a policy lists its rules in order, with the plain-language outcome of each rule and what each rule applies to.

A row shows:

- <span style={{ color: '#4db6ac' }}>`EDIT`</span> for a policy set here.
- <span style={{ color: '#4db6ac' }}>`OVERRIDE POLICY`</span> for a policy inherited from above, along with a link back to the namespace the inherited policy comes from.

## Managing an existing policy

- **Edit a policy** to change its rules or turn it on or off. The resource kind cannot be changed after creation.
- **Delete a policy** to stop its deletions and remove it.

## Inheritance and override

A policy set on a group also applies to every namespace beneath it, so one policy on a parent group can keep a whole subtree tidy. A namespace below takes over for a kind only when it sets its own policy for that kind, and from that namespace down the closer policy wins.

On a namespace that inherits a policy, the row shows <span style={{ color: '#4db6ac' }}>`OVERRIDE POLICY`</span> with a link back to the namespace the inherited policy comes from. Creating your own policy for that kind there overrides the inherited one from that point down.

## When deletion happens

Tharsis sweeps on a recurring schedule in the background, so deletion is not immediate after a policy is saved. Deletions land on the next sweep rather than the moment you save. Turning a policy off, or deleting it, stops its deletions.

Creating, updating, or deleting a cleanup policy is recorded in the namespace activity history, so you can see who changed a policy over time.

## Permissions and access

Viewing and managing cleanup policies are separate permissions, and managing is broken down into create, update, and delete. The built-in roles map to cleanup policy access like this:

| Role | Cleanup policies |
| --- | --- |
| `Owner` | Full manage |
| `Maintainer` | Full manage |
| `Deployer` | View only |
| `Publisher` | View only |
| `Viewer` | View only |

## Frequently asked questions (FAQ)

### Who can create, edit, and delete cleanup policies, and who can view them?

Creating, editing, and deleting each need their own permission, held by the `Owner` and `Maintainer` roles. Viewing is a separate permission, which the `Deployer`, `Publisher`, and `Viewer` roles also have. See [Permissions and access](#permissions-and-access).

### How does a policy on a group affect the namespaces beneath it?

A policy set on a group also applies to every namespace beneath it, until a namespace below sets its own policy for that kind. From that namespace down, the closer policy takes over for that kind.

### Why did a resource I expected to be removed survive?

A resource is kept when any of these is true: it is the latest version of a module or provider, it is a run that produced a state version, a `Never delete` rule matches it, it falls within the number of newest items a rule keeps, or it has not yet reached the age a rule deletes after.

### How soon after saving a policy does anything get deleted?

Not right away. Tharsis sweeps on a recurring schedule in the background, so deletions happen on the next sweep rather than the moment you save.
