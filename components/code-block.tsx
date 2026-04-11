"use client";

import { useEffect, useState } from "react";
import "flourite";
import Prism from "prismjs";

// Prism themes + languages
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import flourite from "flourite";

type Props = {
  code: string;
};

export default function CodeViewer({ code }: Props) {
  const [language, setLanguage] = useState("javascript");
  const [highlighted, setHighlighted] = useState("");

  // Detect language whenever code changes
  useEffect(() => {
    if (!code) return;

    const result = flourite(code);
    setLanguage(result.language || "javascript");
  }, [code]);

  // Highlight code when language or code changes
  useEffect(() => {
    if (!code) return;

    const html = Prism.highlight(
      code,
      Prism.languages[language] || Prism.languages.javascript,
      language
    );

    setHighlighted(html);
  }, [code, language]);

  return (
    <div style={{ borderRadius: 8, overflow: "hidden",  maxWidth: "500pt" }}>
      <div
        style={{
          padding: "2px 12px",
          background: "#222",
          color: "#aaa",
          fontSize: 10,
          fontFamily: "monospace",
					marginLeft: "auto"
        }}
      >
        Detected: {language}
      </div>

      <pre
        style={{
          margin: 0,
          padding: 6,
          background: "#2f2f2f",
          // overflowX: "auto",
					overflow: "scroll",
					// height: "500pt",
					// width: "500pt"
					
        }}
      >
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
}
