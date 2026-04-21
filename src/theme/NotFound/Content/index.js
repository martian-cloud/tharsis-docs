import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function NotFoundContent() {
    const docsUrl = useBaseUrl('/');

    return (
        <>
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes twinkle {
                    0%, 100% { opacity: 0.1; }
                    50% { opacity: 0.9; }
                }
            `}</style>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                textAlign: 'center',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <Stars />
                <p style={{
                    fontSize: '5rem',
                    marginBottom: '0',
                    animation: 'float 3s ease-in-out infinite',
                    zIndex: 1,
                }}>🔭</p>
                <h1 style={{
                    animation: 'fadeInUp 0.6s ease-out both',
                    fontSize: '2.5rem',
                    marginBottom: '0.5rem',
                    animationDelay: '0.1s',
                    zIndex: 1,
                }}>
                    Lost in space
                </h1>
                <p style={{
                    animation: 'fadeInUp 0.6s ease-out both',
                    fontSize: '1.1rem',
                    color: 'var(--ifm-color-emphasis-600)',
                    marginBottom: '2rem',
                    maxWidth: '600px',
                    animationDelay: '0.2s',
                    zIndex: 1,
                }}>
                    This page doesn't exist. Try searching or head back to the docs.
                </p>
                <a href={docsUrl} className="button button--secondary button--lg" style={{
                    animation: 'fadeInUp 0.6s ease-out both',
                    animationDelay: '0.3s',
                    zIndex: 1,
                }}>
                    ← Back to docs
                </a>
            </div>
        </>
    );
}

function Stars() {
    const stars = React.useMemo(() =>
        Array.from({ length: 20 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
            size: Math.random() * 3 + 1,
            delay: Math.random() * 3,
            duration: Math.random() * 2 + 1.5,
        })), []);

    return (
        <>
            {stars.map(s => (
                <div key={s.id} style={{
                    position: 'absolute',
                    left: s.left,
                    top: s.top,
                    width: s.size,
                    height: s.size,
                    borderRadius: '50%',
                    background: 'var(--ifm-color-primary-light)',
                    animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
                    opacity: 0,
                }} />
            ))}
        </>
    );
}
