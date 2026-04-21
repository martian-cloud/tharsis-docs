import { usePluginData } from '@docusaurus/useGlobalData';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function AnnouncementBar() {
    let data;
    try {
        data = usePluginData('dynamic-announcement-bar');
    } catch {
        return null;
    }

    const url = useBaseUrl(data?.slug);

    if (!data?.title) return null;

    return (
        <div
            role="banner"
            style={{
                background: 'var(--ifm-color-primary-darkest)',
                color: '#fff',
                textAlign: 'center',
                padding: '8px 16px',
                fontSize: '0.9rem',
            }}
        >
            📢 New post: <a href={url} style={{ color: '#fff', fontWeight: 600, textDecoration: 'underline' }}>{data.title}</a> — Read more →
        </div>
    );
}
