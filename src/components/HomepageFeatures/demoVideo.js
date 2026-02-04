import { useState, useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import ReactPlayer from "react-player/lazy";
import BrowserOnly from "@docusaurus/BrowserOnly";
import styles from "../../css/demo-video.module.css";

// Constants
const VIDEO_CONFIG = {
  file: {
    attributes: {
      style: { width: "100%", height: "100%", display: "block" },
      disablePictureInPicture: true,
      controlsList: "nodownload nofullscreen noremoteplayback",
      playsInline: true,
    },
  },
};

const TERMINAL_TITLE = "tharsis-demo.mp4";
const STATUS_TEXT = "LIVE";

export default function DemoVideo() {
  const { siteConfig } = useDocusaurusContext();
  const [progress, setProgress] = useState(0);
  const [key, setKey] = useState(0);

  const handleProgress = ({ played }) => setProgress(played * 100);

  // Force re-render when component mounts to fix blank video issue
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, []);

  return (
    <div className={styles.terminalWrapper}>
      <div className={styles.terminalHeader}>
        <div className={styles.terminalButtons}>
          <span className={styles.closeBtn}></span>
          <span className={styles.minimizeBtn}></span>
          <span className={styles.maximizeBtn}></span>
        </div>
        <div className={styles.terminalTitle}>{TERMINAL_TITLE}</div>
        <div className={styles.statusIndicators}>
          <div className={styles.statusDot}></div>
          <span className={styles.statusText}>{STATUS_TEXT}</span>
        </div>
      </div>
      <div className={styles.videoWrapper}>
        <BrowserOnly>
          {() => (
            <ReactPlayer
              key={key}
              config={VIDEO_CONFIG}
              width="100%"
              height="100%"
              playing
              muted
              loop
              controls={false}
              onProgress={handleProgress}
              url={`${siteConfig.baseUrl}img/demo.mp4`}
            />
          )}
        </BrowserOnly>
        <div className={styles.videoOverlay}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
