import React, { useCallback, useState } from "react";

interface Props {
  onFile: (file: File) => void;
}

export default function UploadZone({ onFile }: Props) {
  const [dragging, setDragging] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file?.type === "application/pdf") onFile(file);
    },
    [onFile]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
  };

  return (
    <div className="fade-up flex flex-col items-center text-center max-w-md w-full">
      {/* Decorative label */}
      <p
        className="font-mono text-xs uppercase tracking-widest mb-6"
        style={{ color: "var(--muted)" }}
      >
        — PDF 이력서를 업로드하세요 —
      </p>

      {/* Drop zone */}
      <button
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className="w-full aspect-square max-w-xs flex flex-col items-center justify-center gap-4 border-2 border-dashed transition-all duration-300 cursor-pointer group"
        style={{
          borderColor: dragging ? "var(--accent)" : "var(--ink)",
          background: dragging ? "var(--accent)08" : "transparent",
        }}
      >
        <div
          className="transition-transform duration-300 group-hover:scale-110"
          style={{ color: dragging ? "var(--accent)" : "var(--muted)" }}
        >
          <FileIcon size={48} />
        </div>
        <div>
          <p className="font-display text-lg" style={{ color: "var(--ink)" }}>
            {dragging ? "여기에 놓으세요" : "파일 선택 또는 드래그"}
          </p>
          <p className="font-mono text-xs mt-1" style={{ color: "var(--muted)" }}>
            .pdf 파일만 지원됩니다
          </p>
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleChange}
      />

      {/* Corner decorations */}
      <div className="fade-up-delay mt-8 flex items-center gap-3">
        <div className="h-px w-16" style={{ background: "var(--ink)" }} />
        <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
          QR 코드로 바로 공유
        </span>
        <div className="h-px w-16" style={{ background: "var(--ink)" }} />
      </div>
    </div>
  );
}

function FileIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
