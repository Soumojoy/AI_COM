import React, { useRef } from "react";
import { FaDownload, FaArrowLeft, FaExpand, FaDesktop, FaMobileAlt } from "react-icons/fa";

export default function WebsitePreview({ html, onBack }) {
  const iframeRef = useRef(null);
  const [viewMode, setViewMode] = React.useState("desktop");

  const handleDownload = () => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-store-website.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFullscreen = () => {
    if (iframeRef.current) {
      iframeRef.current.requestFullscreen?.();
    }
  };

  return (
    <div className="preview-container">
      <div className="preview-toolbar">
        <button className="btn-secondary" onClick={onBack}>
          <FaArrowLeft /> Back to Editor
        </button>

        <div className="preview-view-toggle">
          <button
            className={`view-btn ${viewMode === "desktop" ? "active" : ""}`}
            onClick={() => setViewMode("desktop")}
            title="Desktop view"
          >
            <FaDesktop />
          </button>
          <button
            className={`view-btn ${viewMode === "mobile" ? "active" : ""}`}
            onClick={() => setViewMode("mobile")}
            title="Mobile view"
          >
            <FaMobileAlt />
          </button>
        </div>

        <div className="preview-actions">
          <button className="btn-secondary" onClick={handleFullscreen}>
            <FaExpand /> Fullscreen
          </button>
          <button className="btn-primary" onClick={handleDownload}>
            <FaDownload /> Download HTML
          </button>
        </div>
      </div>

      <div className={`preview-frame-wrapper ${viewMode}`}>
        <iframe
          ref={iframeRef}
          title="Website Preview"
          className="preview-iframe"
          srcDoc={html}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}
