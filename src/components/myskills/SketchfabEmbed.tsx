// components/SketchfabEmbed.tsx
"use client";

import React, { useState, useEffect } from "react";
import styles from "./SketchfabEmbed.module.css";

interface SketchfabEmbedProps {
  title?: string;
  modelId?: string;
}

const SketchfabEmbed: React.FC<SketchfabEmbedProps> = ({
  title = "Rubik's Cube Speed Solving",
  modelId = "7472d2f875fc43bd9ddac4a611cd80ce",
}) => {
  const [error, setError] = useState(false);
  const embedUrl = `https://sketchfab.com/models/${modelId}/embed?autoplay=1`;

  // Check if the iframe loads successfully
  useEffect(() => {
    const checkModelAvailability = async () => {
      try {
        const response = await fetch(`https://sketchfab.com/models/${modelId}`);
        if (!response.ok) {
          setError(true);
        }
      } catch {
        setError(true);
      }
    };
    checkModelAvailability();
  }, [modelId]);

  if (error) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.error}>
          Failed to load 3D model. It may have been removed or is unavailable.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <iframe
        title={title}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src={embedUrl}
        className={styles.iframe}
        onError={() => setError(true)} // Fallback if iframe fails
      />
    </div>
  );
};

export default SketchfabEmbed;
