import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import HeaderCards from "./header_cards.tsx";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={"hero hero--primary"}>
      <div id={styles.parent}>
        <div className="container">
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <p id={styles.description}>
            A remote Terraform backend that provides state management and a full
            execution environment for running Terraform modules. Tharsis
            includes additional capabilities to facilitate the management of
            Terraform workspaces within an organization.
          </p>
        </div>
        <HeaderCards />
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
