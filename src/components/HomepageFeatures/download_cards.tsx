import React from "react";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

interface DownloadProps {
  title: string;
  url: string;
  description: string;
  buttonLabel: string;
}

function DownloadCard({ title, description, url, buttonLabel }: DownloadProps) {
  return (
    <div id={styles.downloadCardContainer}>
      <div id={styles.downloadCard}>
        <h4>{title}</h4>
        {description}
        <footer>
          <Link id={styles.downloadButton} to={url}>
            {buttonLabel}
          </Link>
        </footer>
      </div>
    </div>
  );
}

function DownloadCards() {
  return (
    <div id={styles.downloadList}>
      <DownloadCard
        title="Docker Compose"
        description="Run Tharsis in Docker with just one command."
        buttonLabel="Get started"
        url="setup/docker/install#docker-compose"
      />
      <DownloadCard
        title="API Image"
        description="Pre-built API, runner agent, and job executor Docker containers."
        buttonLabel="Download"
        url="https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-api/container_registry"
      />
      <DownloadCard
        title="UI Image"
        description="Pre-built UI Docker container."
        buttonLabel="Download"
        url="https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-ui/container_registry"
      />
      <DownloadCard
        title="CLI Binary"
        description="Ready-to-use CLI binaries supported on all major platforms."
        buttonLabel="Download"
        url="https://gitlab.com/infor-cloud/martian-cloud/tharsis/tharsis-cli/-/releases"
      />
    </div>
  );
}

export default DownloadCards;
