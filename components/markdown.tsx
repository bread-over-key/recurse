"use client";

import { marked } from "marked";
import { useEffect, useState } from "react";

type Props = {
  content: string;
};

export default function Markdown({ content }: Props) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    const parseMarkdown = async () => {
      const result = await marked.parse(content);
      setHtml(result);
    };

    parseMarkdown();
  }, [content]);

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
