import React from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

interface HeaderProps {
  title: string;
  url: string;
  buttonLabel: string;
  description: string;
}

function HeaderCard({ title, url, description, buttonLabel }: HeaderProps) {
  return (
    <div className="col col--6 margin-top--md">
      <div className={styles.headerCard}>
        <div className={styles.headerCardBody}>
          <Heading as="h2">{title}</Heading>
          <div>
            <p>{description}</p>
          </div>
        </div>
        <Link className={styles.headerCardLink} to={url}>
          {buttonLabel}
          <div className={styles.headerCardArrow}>→</div>
        </Link>
      </div>
    </div>
  );
}

function HeaderCards() {
  return (
    <div id={styles.headerCardContainer}>
      <HeaderCard
        title="Open Source"
        url="https://gitlab.com/infor-cloud/martian-cloud/tharsis"
        buttonLabel="Check the code"
        description="Tharsis suite is free and open source software available on both 
        our GitHub (mirrored) and GitLab. We welcome users to audit the codebase for 
        themselves and learn the inner workings of our software product."
      ></HeaderCard>
      <HeaderCard
        title="Docker ready"
        url="setup/docker/install"
        buttonLabel="Try it out!"
        description="The Tharsis API, UI and all of their counterparts are available 
        as Docker images on our GitLab registry. It's the quickest way to experience 
        everything Tharsis has to offer. Ready to give it a shot? Learn more below."
      ></HeaderCard>
    </div>
  );
}

export default HeaderCards;
