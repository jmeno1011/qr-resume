import React, { useState } from "react";

interface Props {
  url: string;
  fileName: string;
}

export default function PdfViewer({ url, fileName }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-5 py-2.5 border-b border-black/10 shrink-0"
        style={{ background: "var(--surface)" }}
      >
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
            📄
          </span>
          <span
            className="font-mono text-xs truncate max-w-xs"
            style={{ color: "var(--ink)" }}
          >
            {fileName}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--accent)" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--muted)", opacity: 0.4 }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--muted)", opacity: 0.4 }} />
        </div>
      </div>

      {/* PDF iframe */}
      <div className="relative flex-1">
        {!loaded && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "var(--cream)" }}
          >
            <p className="font-mono text-xs animate-pulse" style={{ color: "var(--muted)" }}>
              로딩 중...
            </p>
          </div>
        )}
        <iframe
          src={url}
          title={fileName}
          className="pdf-embed"
          style={{ height: "100%", opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
