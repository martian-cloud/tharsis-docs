import { useEffect, useState, useRef } from "react";

const lines = [
  { type: "prompt", text: "Why did my last run in prod/api-service fail?" },
  { type: "loading", text: "Fetching run details..." },
  {
    type: "response",
    content: (
      <>
        The run{" "}
        <code
          style={{
            background: "#2d2d2d",
            padding: "2px 6px",
            borderRadius: "4px",
            color: "#f59e0b",
          }}
        >
          run-abc123
        </code>{" "}
        failed during the <span style={{ color: "#ef4444" }}>plan</span> stage.
      </>
    ),
  },
  {
    type: "error",
    text: "Error assuming role: Not authorized to perform sts:AssumeRoleWithWebIdentity",
  },
  {
    type: "response",
    content:
      "The managed identity aws-deployer is trying to assume an IAM role, but the role's trust policy doesn't allow it. You'll need to add the Tharsis OIDC provider to the trusted entities.",
  },
  { type: "prompt", text: "How do I fix it?" },
  { type: "loading", text: "Searching docs..." },
  { type: "doc", text: "AWS Managed Identity Setup" },
  {
    type: "code",
    content: `"Principal": {
  "Federated": "arn:aws:iam::123456789:oidc-provider/tharsis.example.com"
}`,
  },
  {
    type: "response",
    content: "Add this to your IAM role's trust policy, then retry the run.",
  },
  { type: "prompt", text: "Retry the run" },
  { type: "loading", text: "Creating run..." },
  { type: "success", text: "✓ Run started: run-def456" },
];

export function TerminalConversation() {
  const [visibleLines, setVisibleLines] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (visibleLines < lines.length) {
      const delay = lines[visibleLines]?.type === "loading" ? 800 : 400;
      const timer = setTimeout(() => setVisibleLines((v) => v + 1), delay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setVisibleLines(0), 3000);
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [visibleLines]);

  const renderLine = (line, i) => {
    const style = { marginTop: i > 0 ? "12px" : 0 };
    switch (line.type) {
      case "prompt":
        return (
          <div key={i} style={style}>
            <span style={{ color: "#10b981" }}>❯</span> {line.text}
          </div>
        );
      case "loading":
        return (
          <div key={i} style={{ ...style, color: "#9ca3af", fontSize: "12px" }}>
            ⠋ {line.text}
          </div>
        );
      case "response":
        return (
          <div key={i} style={style}>
            {line.content}
          </div>
        );
      case "error":
        return (
          <div
            key={i}
            style={{
              ...style,
              padding: "8px 12px",
              background: "#2d2d2d",
              borderLeft: "3px solid #ef4444",
              borderRadius: "0 4px 4px 0",
            }}
          >
            {line.text}
          </div>
        );
      case "code":
        return (
          <div
            key={i}
            style={{
              ...style,
              background: "#2d2d2d",
              padding: "8px 12px",
              borderRadius: "4px",
              fontSize: "12px",
              whiteSpace: "pre",
            }}
          >
            {line.content}
          </div>
        );
      case "doc":
        return (
          <div key={i} style={{ ...style, color: "#60a5fa", fontSize: "12px" }}>
            📄 {line.text}
          </div>
        );
      case "success":
        return (
          <div key={i} style={{ ...style, color: "#10b981" }}>
            {line.text}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        margin: "1.5rem 0",
        borderRadius: "8px",
        overflow: "hidden",
        fontSize: "14px",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          background: "#333",
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#ff5f56",
          }}
        ></span>
        <span
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#ffbd2e",
          }}
        ></span>
        <span
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#27ca40",
          }}
        ></span>
      </div>
      <div
        ref={contentRef}
        style={{
          background: "#1e1e1e",
          padding: "16px",
          color: "#d4d4d4",
          lineHeight: "1.6",
          height: "400px",
          overflowY: "auto",
        }}
      >
        {lines.slice(0, visibleLines).map(renderLine)}
        {visibleLines < lines.length && (
          <div style={{ marginTop: "12px", opacity: 0.5 }}>▌</div>
        )}
      </div>
    </div>
  );
}
