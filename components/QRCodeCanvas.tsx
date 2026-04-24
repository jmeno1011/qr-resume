/**
 * Pure-canvas QR code renderer using the qrcode library.
 * We use a lightweight inline QR encoder to avoid external CDN deps.
 *
 * For a real project: `npm install qrcode` and use its types.
 * Here we load it via CDN script tag on mount.
 */
import React, { useEffect, useRef } from "react";

interface Props {
  value: string;
  size?: number;
}

declare const QRCode: {
  toCanvas: (
    canvas: HTMLCanvasElement,
    text: string,
    options: { width: number; margin: number; color: { dark: string; light: string } },
    cb: (err: unknown) => void
  ) => void;
};

let scriptLoaded = false;
const callbacks: (() => void)[] = [];

function loadQRScript(cb: () => void) {
  if (scriptLoaded) { cb(); return; }
  callbacks.push(cb);
  if (document.getElementById("qrcode-script")) return;
  const s = document.createElement("script");
  s.id = "qrcode-script";
  s.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
  s.onload = () => {
    scriptLoaded = true;
    callbacks.forEach((fn) => fn());
    callbacks.length = 0;
  };
  document.head.appendChild(s);
}

export default function QRCodeCanvas({ value, size = 180 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const render = () => {
      // Clear previous
      container.innerHTML = "";
      // Use QRCode library (loaded via CDN)
      if (typeof (window as any).QRCode !== "undefined") {
        new (window as any).QRCode(container, {
          text: value,
          width: size,
          height: size,
          colorDark: "#1a1612",
          colorLight: "#ffffff",
          correctLevel: (window as any).QRCode.CorrectLevel.H,
        });
      }
    };

    const script = document.getElementById("qrcode-lib-script");
    if (script && (window as any).QRCode) {
      render();
    } else if (!script) {
      const s = document.createElement("script");
      s.id = "qrcode-lib-script";
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
      s.onload = render;
      document.head.appendChild(s);
    } else {
      script.addEventListener("load", render);
    }
  }, [value, size]);

  return (
    <div
      ref={containerRef}
      style={{ width: size, height: size }}
      className="flex items-center justify-center"
    />
  );
}
