---
title: CLI
description: "An installation and build guide for the Tharsis CLI"
keywords: [tharsis cli, installation, download, binary, command line]
---

import CLIDownloadScripts from "@site/src/components/CLIDownloadScripts";

The [Tharsis CLI](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-cli) supports all major platforms, and binaries are released via [GitLab releases](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-cli/-/releases).

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

## Download binary

<CLIDownloadScripts />

:::caution
Installing the Tharsis CLI on other platforms may be possible, but it is not recommended nor supported.
:::

## Build from source

While downloading a pre-built binary meets most use-cases, it may be desired to build a binary from source. Doing so will allow changing the default Tharsis HTTP endpoint (`DefaultHTTPEndpoint`) the CLI uses, which offers some convenience when configuring the CLI.

The CLI project includes a handy `Makefile` to help the build process be a little easier.

### Requirements

- [Go](https://go.dev/doc/install)
- [Make](https://www.gnu.org/software/make/)

```shell title="Git clone the project to the local machine"
git clone https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-cli.git
```

```shell showLineNumbers title="Use make to compile a binary"
cd <project-directory>
make build
```

To set a custom default endpoint at build time, pass it via ldflags:

```shell title="Build with a custom default endpoint"
go build -ldflags "-X main.DefaultHTTPEndpoint=https://api.tharsis.example.com" -o tharsis ./cmd/tharsis
```

## Frequently asked questions (FAQ)

### Is there a way to run the CLI from any directory?

Yes. Add the directory containing the binary to your system's `PATH`.

On Linux/macOS (Bash):

```bash
echo "PATH=\$PATH:[binary path]" >> ~/.bashrc && source ~/.bashrc
```

On Windows (PowerShell):

```powershell
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";[binary path]", "User")
```

> Replace `[binary path]` with the full path to the directory containing the CLI binary.

### Does the CLI auto-update?

At the moment, it does not. However, running `tharsis version` will show when a newer version is available and provide the download URL.

### Is the CLI binary signed?

Not yet, although, this is on our roadmap.
