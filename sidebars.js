/**
Any new items added to the docs will need to be updated
in this sidebar as well or else they won't show up.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    "intro",
    "quickstart",
    {
      type: "category",
      label: "Setup",
      link: {
        type: "generated-index",
        description: "Setup guides for Tharsis API, CLI and UI",
        keywords: [
          "setup",
          "install",
          "installation",
          "configure",
          "configuration",
        ],
        slug: "setup",
      },
      items: [
        {
          type: "category",
          label: "Tharsis API",
          link: {
            type: "generated-index",
            keywords: [
              "tharsis api",
              "api",
              "setup",
              "installation",
              "install",
            ],
            slug: "setup/api",
          },
          items: ["setup/api/install"],
        },
        {
          type: "category",
          label: "Tharsis UI",
          link: {
            type: "generated-index",
            keywords: ["tharsis ui", "ui", "setup", "installation", "install"],
            slug: "setup/ui",
          },
          items: ["setup/ui/install"],
        },
        {
          type: "category",
          label: "Tharsis CLI",
          link: {
            type: "generated-index",
            keywords: [
              "tharsis cli",
              "cli",
              "setup",
              "installation",
              "install",
            ],
            slug: "setup/cli",
          },
          items: ["setup/cli/install"],
        },
        {
          type: "category",
          label: "Docker",
          link: {
            type: "generated-index",
            keywords: [
              "docker",
              "docker-compose",
              "tharsis in docker",
              "docker image",
              "image",
            ],
            slug: "setup/docker",
          },
          items: ["setup/docker/install"],
        },
      ],
    },
    {
      type: "category",
      label: "Basic Guides",
      link: {
        type: "generated-index",
        description:
          "A general summary and guide to different Tharsis functionalities",
        keywords: ["tharsis", "overview", "deployments", "guide"],
        slug: "guides",
      },
      items: [
        {
          type: "category",
          label: "Overviews",
          link: {
            type: "generated-index",
            description:
              "A general overview of different features within Tharsis.",
            keywords: [
              "overviews",
              "group",
              "workspace",
              "general",
              "module registry",
              "provider registry",
              "registry",
            ],
            slug: "guides/overviews",
          },
          items: [
            "guides/overviews/groups",
            "guides/overviews/workspaces",
            "guides/overviews/service_accounts",
            "guides/overviews/managed_identities",
            "guides/overviews/memberships",
            "guides/overviews/runners",
            "guides/overviews/module_registry",
            "guides/overviews/provider_registry",
          ],
        },
        {
          type: "category",
          label: "Deployments",
          link: {
            type: "generated-index",
            description: "Deploying from private registries.",
            keywords: ["deployments", "private", "registry", "terraform"],
            slug: "deployments",
          },
          items: ["guides/deployments/private_registry"],
        },
      ],
    },
    {
      type: "category",
      label: "Command Line Interface (CLI)",
      link: {
        type: "generated-index",
        description: "Using Tharsis and Terraform CLI",
        keywords: [
          "command line",
          "command",
          "command line interface",
          "cli",
          "shell",
        ],
        slug: "cli",
      },
      items: [
        {
          type: "category",
          label: "Tharsis",
          link: {
            type: "generated-index",
            description: "Everything about the Tharsis CLI",
            keywords: [
              "cli",
              "command",
              "command line interface",
              "shell",
              "tharsis cli",
              "tharsis",
            ],
            slug: "cli/tharsis",
          },
          items: ["cli/tharsis/intro", "cli/tharsis/commands"],
        },
        {
          type: "category",
          label: "Terraform",
          link: {
            type: "generated-index",
            description: "Using Terraform CLI with Tharsis",
            keywords: [
              "cli",
              "command",
              "command line interface",
              "shell",
              "terraform cli",
              "terraform",
            ],
            slug: "cli/terraform",
          },
          items: ["cli/terraform/usage"],
        },
      ],
    },
    {
      type: "category",
      label: "Tharsis Terraform Provider",
      link: {
        type: "generated-index",
        description: "Guide for Tharsis Terraform Provider.",
        keywords: ["terraform", "tharsis", "provider"],
        slug: "provider",
      },
      items: ["provider/intro"],
    },
  ],
};

module.exports = sidebars;
