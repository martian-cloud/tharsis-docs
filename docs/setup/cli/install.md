---
title: Installation and Build Guide
description: "An installation and build guide for the Tharsis CLI"
---

<!-- Import for Tabs used below -->

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

The [Tharsis CLI](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-cli) supports all major platforms and binaries are released via [GitLab releases](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-cli/-/releases).

:::tip Have a question?
Check the [FAQ](#frequently-asked-questions-faq) to see if there's already an answer.
:::

### Download binary

- Two options available for downloading:

  1. Directly from GitLab releases page if access to a web browser is available.

  2. Using cURL command for CI/CD or headless setup.

#### Directly from GitLab Releases

Latest binaries are available to download from [GitLab releases](https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-cli/-/releases).

Download the respective binary for the platform and run using `./tharsis`.

#### Using [cURL](https://en.wikipedia.org/wiki/CURL) command

<h4>Available Platforms</h4>
<Tabs groupId="operating-systems">
  <TabItem value="win" label="Windows">

    windows_amd64
    windows_386

  </TabItem>
  <TabItem value="mac" label="macOS">

    darwin_arm64
    darwin_amd64

  </TabItem>
  <TabItem value="linux" label="Linux">

    linux_arm64
    linux_arm
    linux_amd64
    linux_386

  </TabItem>
  <TabItem value="solaris" label="Oracle Solaris">

    solaris_amd64

  </TabItem>
  <TabItem value="open" label="OpenBSD">

    openbsd_amd64
    openbsd_386

  </TabItem>
  <TabItem value="free" label="FreeBSD">

    freebsd_arm
    freebsd_amd64
    freebsd_386

  </TabItem>
</Tabs>

To download the desired binary, copy the following command and replace `{access-token-here}` with a personal access token from GitLab, `{version-here}` with the desired version like 0.0.3 or 0.0.4 and `{platform}` with one of the respective values above.

```shell title="Copy the command and replace values"
curl --header "PRIVATE-TOKEN: {access-token-here}" \
  https://gitlab.com/api/v4/projects/39923532/packages/generic/tharsis-cli/{version-here}/tharsis_{version-here}_{platform} \
  --output tharsis
```

:::note
The GitLab personal access token will need permission to access the CLI project in order to download the binary.
:::

:::tip
It is helpful to replace the values prior to pasting in terminal.
:::

:::caution
Installing the Tharsis CLI on other platforms may be possible, but it is not recommended nor supported.
:::

### Build from source

While downloading a pre-built binary meets most use-cases, it may be desired to build a binary from source. Doing so will allow changing the default Tharsis endpoint (`DEFAULT_ENDPOINT_URL`) the CLI uses, which offers some convenience when configuring the CLI.

The CLI project includes a handy `Makefile` to help the build process be a little easier.

#### Requirements

- [Go](https://go.dev/doc/install)
- [Make](https://www.gnu.org/software/make/)

```shell title="Git clone the project to the local machine"
git clone https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-cli.git
```

```shell showLineNumbers title="Use make to compile a binary"
cd <project-directory>
export DEFAULT_ENDPOINT_URL='https://api.tharsis.example.com' # Optional.
make build
```

### Frequently asked questions (FAQ)

#### How can I make the binary an executable?

On a Linux system, `cd` into the CLI's directory and run `chmod +x tharsis`. Run with `./tharsis`

For Windows users, it _may_ be necessary to append `.exe` to the binary name to make it an executable. For example `--output tharsis.exe` in the `cURL` command.

#### Is there a way to run the CLI from any directory?

Yes. If on the Linux system, and using [Bash shell](<https://en.wikipedia.org/wiki/Bash_(Unix_shell)>) run the following command in a terminal window:

```bash
echo "PATH=\$PATH:[binary path]" >> ~/.bashrc && source ~/.bashrc
```

> Replace `[binary path]` with the full path to the CLI binary.

Please consult the internet for exporting to `PATH` on different platforms.

#### Does the CLI auto-update?

At the moment, it does not. A new binary will have to be manually downloaded using the above methods.

#### Is the CLI binary signed?

Not yet, although, this is on our roadmap.
