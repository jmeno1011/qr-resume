import React, { useCallback, useEffect, useState } from "react";
import QRCodeCanvas from "./components/QRCodeCanvas";
import PdfViewer from "./components/PdfViewer";
import UploadZone from "./components/UploadZone";

const REPO_PDF_FILE_NAME = "resume.pdf";
const REPO_PDF_PATH = `${import.meta.env.BASE_URL}${encodeURIComponent(REPO_PDF_FILE_NAME)}`;

export type AppState =
  | { phase: "idle" }
  | {
      phase: "viewing";
      pdfUrl: string;
      fileName: string;
      shareUrl: string;
      source: "blob" | "static";
    };

export default function App() {
  const [state, setState] = useState<AppState>({ phase: "idle" });
  const [showQR, setShowQR] = useState(false);

  const handleFile = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    // Uploaded blobs are local-only, so the app URL is the least-misleading share target.
    const shareUrl = window.location.href;
    setState({ phase: "viewing", pdfUrl: url, fileName: file.name, shareUrl, source: "blob" });
    setShowQR(false);
  }, []);

  useEffect(() => {
    let active = true;

    const loadRepoPdf = async () => {
      try {
        const response = await fetch(REPO_PDF_PATH, { method: "HEAD" });
        const contentType = response.headers.get("content-type") ?? "";

        if (!active || !response.ok || !contentType.includes("pdf")) {
          return;
        }

        setState((current) => {
          if (current.phase === "viewing") {
            return current;
          }

          return {
            phase: "viewing",
            pdfUrl: REPO_PDF_PATH,
            fileName: REPO_PDF_FILE_NAME,
            shareUrl: new URL(REPO_PDF_PATH, window.location.href).toString(),
            source: "static",
          };
        });
      } catch {
        // Leave the app in upload mode when no committed PDF is present.
      }
    };

    void loadRepoPdf();

    return () => {
      active = false;
    };
  }, []);

  const handleReset = () => {
    if (state.phase === "viewing" && state.source === "blob") {
      URL.revokeObjectURL(state.pdfUrl);
    }
    setState({ phase: "idle" });
    setShowQR(false);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--cream)" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-black/10">
        <div className="fade-up">
          <span className="font-display text-2xl tracking-tight" style={{ color: "var(--ink)" }}>
            résumé
          </span>
          <span
            className="ml-2 text-xs font-mono uppercase tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            viewer
          </span>
        </div>

        {state.phase === "viewing" && (
          <div className="flex items-center gap-3 fade-up-delay">
            <button
              onClick={() => setShowQR(!showQR)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider border transition-all duration-200"
              style={{
                borderColor: showQR ? "var(--accent)" : "var(--ink)",
                color: showQR ? "var(--accent)" : "var(--ink)",
                background: showQR ? "var(--accent)10" : "transparent",
              }}
            >
              <QRIcon />
              QR Code
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider border border-black/20 text-black/40 hover:border-black/60 hover:text-black/70 transition-all duration-200"
            >
              Reset
            </button>
          </div>
        )}
      </header>

      {/* Body */}
      <main className="flex flex-1 overflow-hidden">
        {state.phase === "idle" ? (
          <div className="flex flex-1 items-center justify-center p-8">
            <UploadZone onFile={handleFile} />
          </div>
        ) : (
          <>
            {/* PDF Viewer */}
            <div className="flex-1 relative overflow-hidden">
              <PdfViewer url={state.pdfUrl} fileName={state.fileName} />
            </div>

            {/* QR Sidebar */}
            {showQR && (
              <aside
                className="w-72 border-l border-black/10 flex flex-col items-center justify-center gap-6 p-8 fade-up"
                style={{ background: "var(--surface)" }}
              >
                <div className="text-center">
                  <p className="font-display text-xl mb-1">Share</p>
                  <p className="text-xs font-mono" style={{ color: "var(--muted)" }}>
                    Share this resume with a QR code
                  </p>
                </div>

                <div className="p-4 bg-white shadow-sm">
                  <QRCodeCanvas value={state.shareUrl} size={180} />
                </div>

                <div className="w-full text-center">
                  <p className="text-xs font-mono break-all" style={{ color: "var(--muted)" }}>
                    {state.shareUrl}
                  </p>
                </div>

                <a
                  href={state.pdfUrl}
                  download={state.fileName}
                  className="w-full py-2.5 text-center text-xs font-mono uppercase tracking-widest border transition-all duration-200"
                  style={{
                    borderColor: "var(--accent)",
                    color: "var(--accent)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                  }}
                >
                  ↓ Download PDF
                </a>
              </aside>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function QRIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="3" height="3" />
      <rect x="18" y="14" width="3" height="3" />
      <rect x="14" y="18" width="3" height="3" />
      <rect x="18" y="18" width="3" height="3" />
    </svg>
  );
}
