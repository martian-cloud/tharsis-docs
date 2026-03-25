// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const { themes } = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;
const defaultURI = "http://localhost:3000";

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "Tharsis",
    titleDelimiter: "🚀",
    tagline: "Open-source Terraform Platform",
    url: String(process.env.DOCS_URL || defaultURI),
    baseUrl: String(process.env.DOCS_BASE_URL || "/"),
    onBrokenLinks: "throw",

    markdown: {
        hooks: {
            onBrokenMarkdownLinks: "warn",
        },
    },

    // TODO: Replace this with Tharsis logo when that happens.
    favicon: "img/favicon.ico",

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },

    plugins: [
        'docusaurus-markdown-source-plugin',
        function copyRemoteMarkdown() {
            // Files fetched by docusaurus-plugin-remote-content that need
            // to be copied to the build output for the markdown source plugin.
            const remoteFiles = [
                { src: 'docs/cli/tharsis/commands.md', dest: 'cli/tharsis/commands.md' },
            ];
            return {
                name: 'copy-remote-markdown',
                async postBuild({ outDir }) {
                    const fs = require('fs');
                    const path = require('path');
                    for (const { src, dest } of remoteFiles) {
                        const srcPath = path.join(__dirname, src);
                        const destPath = path.join(outDir, dest);
                        if (fs.existsSync(srcPath)) fs.copyFileSync(srcPath, destPath);
                    }
                },
            };
        },
        [
            require.resolve("@easyops-cn/docusaurus-search-local"),
            /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} **/
            {
                indexBlog: false,
                docsRouteBasePath: "/",
                hashed: true
            }
        ],
        [
            "docusaurus-plugin-remote-content",
            {
                name: "tharsis-cli-generated-markdown",
                sourceBaseUrl: "https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-cli/-/raw/main/docs/",
                outDir: "docs/cli/tharsis",
                documents: ["commands.md"],
            },
        ],
    ],

    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: "/",
                    sidebarPath: require.resolve("./sidebars.js"),
                },
                blog: {
                    routeBasePath: "/blog",
                    blogSidebarCount: 0,
                    onInlineAuthors: 'ignore', // Change to 'throw' to force the use of a authors.yml file.
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // SEO metadata
            metadata: [
                {name: 'description', content: 'Tharsis is an enterprise scale Terraform platform that offers a complete solution for managing your Terraform deployments, state and workspaces.'},
                {name: 'keywords', content: 'terraform, infrastructure as code, devops, automation, enterprise, platform, state management, open source'},
                {name: 'author', content: 'Infor'},
            ],
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
                        to: "/intro",
                        position: "left",
                        label: "Docs",
                    },
                    {
                        to: 'blog',
                        label: 'Blog',
                        position: 'left'
                    },
                    {
                        href: "https://gitlab.com/groups/infor-cloud/martian-cloud/tharsis",
                        position: "right",
                        className: "header-gitlab-link",
                        "aria-label": "GitLab repository",
                        title: "View on GitLab",
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
                                to: "/intro",
                            },
                            {
                                label: "Quickstart",
                                to: "/quickstart",
                            },
                        ],
                    },
                    {
                        title: "CLI",
                        items: [
                            {
                                label: "Tharsis",
                                to: "/cli/tharsis/intro",
                            },
                            {
                                label: "Terraform",
                                to: "/cli/terraform/usage",
                            },
                        ],
                    },
                    {
                        title: "Feature Requests",
                        items: [
                            {
                                label: "GitLab",
                                href: "https://gitlab.com/groups/infor-cloud/martian-cloud/tharsis",
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
                copyright: `Copyright © ${new Date().getFullYear()} Infor. All rights reserved.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,

                // Add any additional languages go here for syntax highlighting.
                additionalLanguages: ["hcl", "json", "bash", "powershell"],
            },
        }),
};

module.exports = config;
