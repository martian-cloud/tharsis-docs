import Layout from "@theme/Layout";
import HeroSection from "@site/src/components/HomepageFeatures/heroSection";
import FeaturesSection from "@site/src/components/HomepageFeatures/featuresSection";
import WorkflowSection from "@site/src/components/HomepageFeatures/workflowSection";
import QuickStartSection from "@site/src/components/HomepageFeatures/quickStartSection";

export default function Home() {
  return (
    <Layout
      title="Documentation"
      description="Tharsis is an enterprise scale Terraform platform that offers a complete solution for managing your Terraform deployments, state and workspaces"
    >
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <QuickStartSection />
    </Layout>
  );
}
