import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";

export default function Footer() {
  const { siteConfig } = useDocusaurusContext();
  const { footer } = siteConfig.themeConfig;

  if (!footer) {
    return null;
  }

  const { copyright, links, logo } = footer;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Logo and Description */}
          <div className={styles.footerBrand}>
            {logo && (
              <div className={styles.footerLogo}>
                <Link
                  href={logo.href}
                  target={logo.target}
                  className={styles.logoLink}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    style={logo.style}
                  />
                </Link>
              </div>
            )}
            <div className={styles.brandDescription}>
              <h3>Tharsis</h3>
              <p>
                Enterprise Terraform platform for secure, scalable
                infrastructure management.
              </p>
            </div>
          </div>

          {/* Links */}
          <div className={styles.footerLinks}>
            {links.map((linkColumn, i) => (
              <div key={i} className={styles.footerColumn}>
                <h4 className={styles.footerTitle}>{linkColumn.title}</h4>
                <ul className={styles.footerList}>
                  {linkColumn.items.map((item, j) => (
                    <li key={j} className={styles.footerItem}>
                      {item.to ? (
                        <Link to={item.to} className={styles.footerLink}>
                          {item.label}
                        </Link>
                      ) : (
                        <Link href={item.href} className={styles.footerLink}>
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>{copyright}</div>
        </div>
      </div>
    </footer>
  );
}
