import Layout from "@theme/Layout";
import styles from "../css/page.module.css";
import EventAmbience from "@site/src/components/EventAmbience";
import HeroSection from "@site/src/components/HomepageFeatures/heroSection";
import FeaturesSection from "@site/src/components/HomepageFeatures/featuresSection";
import WorkflowSection from "@site/src/components/HomepageFeatures/workflowSection";
import QuickStartSection from "@site/src/components/HomepageFeatures/quickStartSection";
import CtaSection from "@site/src/components/HomepageFeatures/ctaSection";

export default function Home() {
  return (
    <Layout
      title="Documentation"
      description="Tharsis is an enterprise scale Terraform platform that offers a complete solution for managing your Terraform deployments, state and workspaces"
    >
      <div className={styles.page}>
        <EventAmbience />
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <QuickStartSection />
        <CtaSection />
      </div>
    </Layout>
  );
}
