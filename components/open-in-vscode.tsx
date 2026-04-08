"use client";

import React from "react";

type OpenInVSCodeProps = {
  filePath: string;   // Absolute path on your machine
  line?: number;
  column?: number;
  children?: React.ReactNode;
};

export default function OpenInVSCode({
  filePath,
  line = 1,
  column = 1,
  children,
}: OpenInVSCodeProps) {
  const handleClick = () => {
    const encodedPath = encodeURIComponent(filePath);
    const url = `vscode://file/${encodedPath}:${line}:${column}`;

    window.location.href = url;
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "8px 12px",
        background: "#444444",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      {children || "Open in VS Code"}
    </button>
  );
}
