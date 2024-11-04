import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Layout from "@theme/Layout";
import React from "react";
import ReactPlayer from 'react-player';
import styles from "./index.module.css";

function DemoVideo() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <ReactPlayer
            config={{
                file: {
                    attributes: {
                        style: {
                            width: "100%",
                            height: "100%",
                            display: "block",
                            borderRadius: "0.5rem"
                        }
                    }
                }
            }}
            width="100%"
            height="100%"
            playing
            muted
            loop
            controls
            url={`${siteConfig.baseUrl}img/demo.mp4`}
        />
    );
}

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={"hero hero--primary"}>
            <div className={styles.heroContent}>
                <div className={styles.heroBanner}>
                    <h1 className={styles.heroTitle}>
                        {siteConfig.tagline}
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Tharsis is an enterprise scale Terraform platform that offers a complete solution for managing your Terraform deployments, state and workspaces
                    </p>
                </div>
                <div className={styles.demoVideo}>
                    <DemoVideo />
                </div>
            </div>
        </header>
    );
}

export default function Home() {
    return (
        <Layout title={`Documentation`} description="Tharsis Documentation site">
            <HomepageHeader />
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    );
}
