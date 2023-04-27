import React from "react";
import styles from "./styles.module.css";
import FeatureCards from "./feature_cards.tsx";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import DownloadCards from "./download_cards.tsx";

export default function HomepageFeatures() {
  return (
    <div>
      <section id={styles.quickStartContainer}>
        <div id={styles.quickStart}>
          <Heading as="h1">New to Tharsis or Terraform?</Heading>
          <p id={styles.quickStartDescription}>
            Follow our quickstart guide to install and use the Tharsis CLI to
            apply a basic Terraform module. It only takes a few minutes!
          </p>
          <Link
            id={styles.quickStartButton}
            to={"quickstart"}
          >
            Great! Show me how!
          </Link>
        </div>
      </section>
      <section id={styles.featureContainer}>
        <Heading as="h1">Features at a glance</Heading>
        <FeatureCards />
      </section>
      <section id={styles.downloadContainer}>
        <Heading as="h1" style={{ marginRight: 30 }}>
          Installation
        </Heading>
        <DownloadCards />
      </section>
    </div>
  );
}
