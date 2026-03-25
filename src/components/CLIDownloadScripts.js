import { useState, useEffect } from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

const API_URL =
  "https://gitlab.com/api/v4/projects/39923532/releases";
const STABLE_TAG = /^v\d+\.\d+\.\d+$/;
const BASE =
  "https://gitlab.com/api/v4/projects/39923532/packages/generic/tharsis-cli";

const platforms = [
  {
    os: "linux", label: "Linux", default: true, archs: [
      { value: "amd64", label: "amd64", default: true },
      { value: "arm64", label: "arm64" },
      { value: "arm", label: "arm" },
      { value: "386", label: "386" },
    ],
  },
  {
    os: "darwin", label: "macOS", archs: [
      { value: "arm64", label: "Apple Silicon", default: true },
      { value: "amd64", label: "Intel" },
    ],
  },
  {
    os: "windows", label: "Windows", archs: [
      { value: "amd64", label: "amd64", default: true },
      { value: "386", label: "386" },
    ],
  },
  {
    os: "freebsd", label: "FreeBSD", archs: [
      { value: "amd64", label: "amd64", default: true },
      { value: "arm", label: "arm" },
      { value: "386", label: "386" },
    ],
  },
  {
    os: "openbsd", label: "OpenBSD", archs: [
      { value: "amd64", label: "amd64", default: true },
      { value: "386", label: "386" },
    ],
  },
  {
    os: "solaris", label: "Solaris", archs: [
      { value: "amd64", label: "amd64", default: true },
    ],
  },
];

function downloadURL(version, os, arch) {
  return `${BASE}/${version}/tharsis_${version}_${os}_${arch}`;
}

function bashScript(version, os, arch) {
  const name = `tharsis_${version}_${os}_${arch}`;
  return `curl -LO "${downloadURL(version, os, arch)}"
mv ${name} tharsis
chmod +x tharsis`;
}

function psScript(version, os, arch) {
  return `Invoke-WebRequest -Uri "${downloadURL(version, os, arch)}" -OutFile tharsis.exe`;
}

export default function CLIDownloadScripts() {
  const [version, setVersion] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((releases) => {
        const stable = releases.find((r) => STABLE_TAG.test(r.tag_name));
        if (stable) setVersion(stable.tag_name);
      })
      .catch(() => {});
  }, []);

  const v = version || "<VERSION>";

  return (
    <>
      <p>
        Latest version: <code>{v}</code>
      </p>
      <Tabs groupId="os">
        {platforms.map((p) => (
          <TabItem key={p.os} value={p.os} label={p.label} default={p.default}>
            <Tabs groupId="arch">
              {p.archs.map((a) => {
                const filename = `tharsis_${v}_${p.os}_${a.value}`;
                const isWindows = p.os === "windows";
                return (
                  <TabItem key={a.value} value={`${p.os}-${a.value}`} label={a.label} default={a.default}>
                    <CodeBlock language={isWindows ? "powershell" : "bash"} showLineNumbers title={filename}>
                      {isWindows ? psScript(v, p.os, a.value) : bashScript(v, p.os, a.value)}
                    </CodeBlock>
                  </TabItem>
                );
              })}
            </Tabs>
          </TabItem>
        ))}
      </Tabs>
    </>
  );
}
