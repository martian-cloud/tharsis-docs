import { useEffect, useRef, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "../../css/demo-video.module.css";

export default function DemoVideo() {
  const video = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const src = useBaseUrl("/img/demo.mp4");

  // Autoplay from the client so reduced-motion users get a paused video with controls instead.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
      return;
    }
    video.current.muted = true;
    video.current.play().catch(() => setReducedMotion(true));
  }, []);

  return (
    <div className={styles.frame}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.title}>tharsis-demo.mp4</span>
      </div>
      <video
        ref={video}
        className={styles.video}
        src={src}
        aria-label="Demo of the Tharsis CLI and UI"
        controls={reducedMotion}
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}
