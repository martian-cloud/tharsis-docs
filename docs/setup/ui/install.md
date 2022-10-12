---
title: Installation and Build Guide
description: "An installation and build guide for the Tharsis UI"
---

At the moment, Tharsis API does not provide any binaries. However, it is possible to run it locally with the following instructions.

### Build and run locally (Docker)

#### Requirements

- [Tharsis API](../api/install.md)
- [Node](https://nodejs.org/en/download/)

#### Build from source

<!-- TODO: Replace with actual project URL -->

Prior to proceeding ensure Tharsis API is up and running.

```shell title="Git clone the project to the local machine"
git clone <project-url>
```

```shell showLineNumbers title="Build and start the server with npm"
cd <project-directory>
npm install
npm start
```

- Point web browser to <http://localhost:3000/> if not done automatically.

### Environment variables

<details><summary>Expand for a complete list and explanation</summary>

|                                           Name | Generic Value | Description                               |
| ---------------------------------------------: | :-----------: | ----------------------------------------- |
|                   `REACT_APP_THARSIS_API_HOST` |   localhost   | Hostname for the Tharsis API.             |
|                `REACT_APP_THARSIS_API_USE_SSL` |     false     | Boolean indicating if API is using SSL.   |
|                   `REACT_APP_THARSIS_API_PORT` |     8000      | Port where the UI connects to the API.    |
|           `REACT_APP_OAUTH_PROVIDER_AUTHORITY` |       -       | URL to the OAuth provider endpoint.       |
|           `REACT_APP_OAUTH_PROVIDER_CLIENT_ID` |       -       | Client ID for the OAuth provider.         |
|               `REACT_APP_OAUTH_PROVIDER_SCOPE` |       -       | Scope for the OAuth provider.             |
| `REACT_APP_OAUTH_PROVIDER_LOGOUT_REDIRECT_URL` |       -       | OAuth provider's redirect URL for logout. |
|                  `REACT_APP_JWT_SUBJECT_FIELD` |       -       | Subject field for JSON Web Token (JWT).   |

</details>
