// src/screens/Upload/UploadDevice.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Image, Video, Box } from "lucide-react";
import "./UploadDevice.scss";

export const UploadDevice: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="upload-device">
      <button className="upload-device__back" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="upload-device__content"
      >
        <h1>Upload from Device</h1>
        <p className="upload-device__subtitle">
          Upload images, videos, or 3D models to create your NFT
        </p>

        <div
          className={`upload-device__dropzone ${
            dragActive ? "active" : ""
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload size={64} className="upload-device__icon" />
          <h3>Drag and drop your file here</h3>
          <p>or</p>
          <input
            type="file"
            onChange={(e) =>
              e.target.files && setFile(e.target.files[0])
            }
            id="file-input"
            accept="image/*,video/*,.glb,.gltf"
          />
          <label htmlFor="file-input" className="upload-device__browse">
            Browse Files
          </label>
          {file && (
            <p className="upload-device__filename">
              ✓ {file.name}
            </p>
          )}
        </div>

        <div className="upload-device__formats">
          <div className="format-card">
            <Image size={32} />
            <h4>Images</h4>
            <p>JPG, PNG, GIF, SVG</p>
          </div>
          <div className="format-card">
            <Video size={32} />
            <h4>Videos</h4>
            <p>MP4, WEBM</p>
          </div>
          <div className="format-card">
            <Box size={32} />
            <h4>3D Models</h4>
            <p>GLB, GLTF</p>
          </div>
        </div>

        <button
          disabled={!file}
          className={`upload-device__continue ${file ? "active" : ""}`}
        >
          Continue to Details
        </button>
      </motion.div>
    </div>
  );
};
