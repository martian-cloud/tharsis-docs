import React from "react";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

interface FeatureProps {
  title: string;
  url: string;
  description: string;
}

function FeatureCard({ title, url, description }: FeatureProps) {
  return (
    <div id={styles.featureCardItem}>
      <Link className={styles.featureCardLink} to={url}>
        <div className={styles.featureCard}>
          <div className={styles.featureCardBody}>
            <p id={styles.featureCardTitle}>{title}</p>
            <div>
              <p id={styles.featureCardDescription}>{description}</p>
              <div className={styles.featureCardArrow}>→</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function FeatureCards() {
  return (
    <div id={styles.featureCardsContainer}>
      <FeatureCard
        title="No static credentials"
        url="guides/overviews/managed_identities"
        description="Managed identities allow a subject to assume an IAM or Azure role
            and perform the actions they need without having to manage
            passwords, registration keys or other sensitive credentials. There
            are even access rules to control who or what may assume a managed
            identity."
      ></FeatureCard>
      <FeatureCard
        title="Effortless Machine to Machine (M2M) authentication"
        url="guides/overviews/service_accounts"
        description="Service accounts make it painless for an external entity (CICD
            pipeline, runner agent) to authenticate with Tharsis using OIDC
            federation, eliminating the need for an extensive setup or
            credential management."
      ></FeatureCard>
      <FeatureCard
        title="Integration with Version Control Systems (VCS)"
        url="guides/overviews/vcs_providers"
        description="Whether it's GitHub or GitLab, VCS integration makes it a no-brainer
            to launch a Terraform run right from the repository, all of which can
            be fine-tuned with advanced controls to your liking. Simply push a
            commit to a linked repository and view the run within the Tharsis UI!"
      ></FeatureCard>
      <FeatureCard
        title="Built-in Terraform Module Registry"
        url="guides/overviews/module_registry"
        description="Unlock a whole new world of collaboration and Terraform module
            distribution. Create, upload and share modules within your
            organization or group, all within the Tharsis ecosystem with added
            benefits like, attesting modules using the in-toto specification and
            limiting managed identity usage to only modules meeting those
            attestations."
      ></FeatureCard>
      <FeatureCard
        title="Built-in Terraform Provider Registry"
        url="guides/overviews/provider_registry"
        description="Publish, version and share Terraform providers within your
            organization without having to rely on public registries, all with
            the help of GoReleaser and a few commands in the Tharsis CLI."
      ></FeatureCard>
      <FeatureCard
        title="Powerful Command Line Interface (CLI)"
        url="cli/tharsis/intro"
        description="Written in Go, fueled by the Tharsis SDK and GraphQL API, our CLI
            exposes most API functionalities and makes it straightforward to
            interact with the remote Terraform backend right from the terminal.
            Perfect for the CICD operations where command lines are a must."
      ></FeatureCard>
      <FeatureCard
        title="Hashicorp Configuration Language (HCL) ready"
        url="provider/intro"
        description="Leverage the power of Tharsis through HCL by using our Terraform
            Provider readily available on our GitHub and the public Terraform
            Provider Registry."
      ></FeatureCard>
      <FeatureCard
        title="Write custom tools with our SDK"
        url="https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-sdk-go"
        description="The Tharsis SDK powers our Terraform Provider, the job executor and
            the CLI. For power users, if the provided functionality is not
            enough, it's possible to implement custom tools that fit your needs
            with usage examples available in our repository to help anyone get
            started."
      ></FeatureCard>
    </div>
  );
}

export default FeatureCards;
