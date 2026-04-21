const fs = require('fs');
const path = require('path');

// How many days after publishing a blog post should the announcement bar be shown.
const ANNOUNCEMENT_DAYS = 7;

// Pattern for blog post filenames: YYYY-MM-DD-slug.md(x)
const BLOG_FILENAME_PATTERN = /^\d{4}-\d{2}-\d{2}/;
const BLOG_DATE_PATTERN = /^(\d{4}-\d{2}-\d{2})/;
const FRONTMATTER_TITLE_PATTERN = /^title:\s*["']?(.+?)["']?\s*$/m;

const BLOG_DIR = path.join(__dirname, '..', '..', 'blog');
const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Returns the most recent blog post file, sorted by filename date descending.
 */
function getLatestBlogFile() {
    if (!fs.existsSync(BLOG_DIR)) return null;

    const files = fs.readdirSync(BLOG_DIR)
        .filter(f => BLOG_FILENAME_PATTERN.test(f))
        .sort()
        .reverse();

    return files[0] || null;
}

/**
 * Extracts the publish date from a blog filename.
 */
function getPublishDate(filename) {
    const match = filename.match(BLOG_DATE_PATTERN);
    return match ? new Date(match[1]) : null;
}

/**
 * Extracts the title from a markdown file's frontmatter.
 */
function getTitle(filepath) {
    const content = fs.readFileSync(filepath, 'utf-8');
    const match = content.match(FRONTMATTER_TITLE_PATTERN);
    return match ? match[1] : null;
}

/**
 * Converts a blog filename to its URL slug.
 * e.g. "2026-04-09-my-post.mdx" -> "/blog/2026/04/09/my-post"
 */
function toSlug(filename) {
    return '/blog/' + filename
        .replace(/\.(mdx?|md)$/, '')
        .replace(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/, '$1/$2/$3/$4');
}

/**
 * Docusaurus plugin that shows an announcement bar for recent blog posts.
 * Automatically hides after ANNOUNCEMENT_DAYS days.
 */
function announcementBarPlugin() {
    return {
        name: 'dynamic-announcement-bar',
        async loadContent() {
            const filename = getLatestBlogFile();
            if (!filename) return null;

            const publishDate = getPublishDate(filename);
            if (!publishDate) return null;

            const daysSince = (new Date() - publishDate) / MS_PER_DAY;
            if (daysSince > ANNOUNCEMENT_DAYS) return null;

            const title = getTitle(path.join(BLOG_DIR, filename));
            if (!title) return null;

            return { title, slug: toSlug(filename) };
        },
        async contentLoaded({ content, actions }) {
            // Always set global data so usePluginData() doesn't throw when there's no recent blog post.
            actions.setGlobalData(content || {});
        },
    };
}

module.exports = announcementBarPlugin;
