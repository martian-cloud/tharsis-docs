import React from "react";
import laptop from "@site/static/img/laptop.png";
import styles from "./styles.module.css";

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h1 className="section__title">Modern</h1>
        <img id={styles.laptop} src={laptop}></img>
        <p id={styles.description}>
          Written in TypeScript, the Tharsis UI provides an elegant approach to
          managing groups, workspaces, Terraform runs and much more. With
          GraphQL subscriptions and WebSocket driven updates, the UI seamlessly
          displays real-time changes to your Terraform infrastructure and offers
          deeper insights via job logs.
          <br />
          <br />
          Stay tuned for more changes...
        </p>
      </div>
    </section>
  );
}
