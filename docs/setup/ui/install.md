---
title: Installation and Build Guide
description: "An installation and build guide for the Tharsis UI"
---

The UI does not yet have any binaries. However, it is possible to run it locally with the following instructions.

### Build and run locally (Docker)

:::tip
Even easier, use the provided Docker images. Learn [more](../docker/install.md).
:::

#### Requirements

- The [Tharsis API](../api/install.md)
- [Node](https://nodejs.org/en/download/)

#### Build from source

Prior to proceeding ensure the Tharsis API is up and running.

```shell title="Git clone the project to the local machine"
git clone https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-ui.git
```

```shell showLineNumbers title="Build and start the server with npm"
cd tharsis-ui
npm install
npm start
```

- Point web browser to http://localhost:3000/ if not done automatically.

### Environment variables

<details>
<summary>Expand for a complete list and explanation</summary>

|                             Name |     Generic Value     | Description              |
| -------------------------------: | :-------------------: | ------------------------ |
| `REACT_APP_THARSIS_API_ENDPOINT` | http://localhost:8000 | URL for the Tharsis API. |

</details>
