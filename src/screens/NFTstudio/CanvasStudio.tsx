import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

/**
 * CanvasStudio (web placeholder)
 * - Exposes a ref with exportAssets({size}) => { pngBase64, svgString }
 * - You can replace internals with a proper WebGL/Skia implementation later.
 */

type ExportResult = {
  pngBase64: string;
  svgString: string;
};

const CanvasStudio = forwardRef((_props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // simple demo drawing on mount
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#60519B";
    ctx.fillRect(30, 30, 200, 120);
    ctx.fillStyle = "#BFC0D1";
    ctx.fillRect(80, 80, 120, 60);
  }, []);

  // export function
  const exportAssets = async ({ size = 1000 } = {}) : Promise<ExportResult> => {
    const c = canvasRef.current!;
    // scale to requested size
    const tmp = document.createElement("canvas");
    tmp.width = size;
    tmp.height = size;
    const tctx = tmp.getContext("2d")!;
    // draw original canvas scaled
    tctx.drawImage(c, 0, 0, size, size);
    const pngBase64 = tmp.toDataURL("image/png");
    // naive svg stub — in a real app you would construct svg from vector paths
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <rect x="0" y="0" width="${size}" height="${size}" fill="#ffffff"/>
      <rect x="30" y="30" width="200" height="120" fill="#60519B"/>
      <rect x="80" y="80" width="120" height="60" fill="#BFC0D1"/>
    </svg>`;
    return { pngBase64, svgString };
  };

  // expose to parent via ref compatibility
  useImperativeHandle(ref, () => ({
    exportAssets,
  }));

  // also attach to window for debugging if needed
  useEffect(() => {
    (window as any).__CanvasStudioExport = exportAssets;
  }, []);

  return (
    <div style={{ width: "100%", height: 420 }}>
      <canvas
        ref={canvasRef}
        width={1000}
        height={1000}
        style={{ width: "100%", height: "100%", borderRadius: 8, display: "block" }}
      />
    </div>
  );
});

export default CanvasStudio;
