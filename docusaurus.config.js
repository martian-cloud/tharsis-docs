// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Tharsis",
  titleDelimiter: "🚀",
  tagline: "Terraform deployments made easy.",
  url: String(process.env.DOCS_URL),
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // TODO: Replace this with Tharsis logo when that happens.
  favicon: "img/favicon.ico",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        id: "work_in_progress",
        content:
          "The documentation is a work in progress. Information is subject to change.",
        backgroundColor: "#2e854f",
        textColor: "#fff",
        isCloseable: false,
      },
      navbar: {
        title: "Tharsis",
        logo: {
          alt: "Tharsis Logo",

          // TODO: Replace this with Tharsis logo when that happens.
          src: "img/favicon.ico",
        },
        hideOnScroll: true,
        items: [
          {
            to: "intro",
            position: "left",
            label: "Docs",
          },
          {
            href: "https://gitlab.com/groups/infor-cloud/martian-cloud/tharsis",
            label: "It's open source",
            position: "right",
          },
        ],
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      footer: {
        style: "dark",
        logo: {
          alt: "Infor Logo",
          src: "img/favicon.ico",
          href: "https://www.infor.com/",
          target: "_blank",
          style: { marginTop: 0 },
          width: 100,
          height: 100,
        },
        links: [
          {
            title: "Get Started",
            items: [
              {
                label: "Introduction",
                to: "intro",
              },
              {
                label: "Quickstart",
                to: "quickstart",
              },
            ],
          },
          {
            title: "CLI",
            items: [
              {
                label: "Tharsis",
                to: "cli/tharsis/intro",
              },
              {
                label: "Terraform",
                to: "cli/terraform/usage",
              },
            ],
          },
          {
            title: "Feature Requests",
            items: [
              {
                label: "GitLab",

                // TODO: Replace with GitLab OSS repo.
                href: "https://gitlab.com",
              },
            ],
          },
          {
            title: "Follow Us",
            items: [
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/infor",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/infor",
              },
              {
                label: "Facebook",
                href: "https://facebook.com/infor",
              },
              {
                label: "YouTube",
                href: "https://www.youtube.com/c/InforGlobal",
              },
              {
                label: "Instagram",
                href: "https://instagram.com/infor",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Infor. All rights reserved. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,

        // Add any additional languages go here for syntax highlighting.
        additionalLanguages: ["hcl"],
      },
    }),
};

module.exports = config;
