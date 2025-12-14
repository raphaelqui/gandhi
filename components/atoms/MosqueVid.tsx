// components/VideoGif.jsx
"use client";

import { useRef, useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";

export default function MosqueVid() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay blockiert:", error);
      });
    }
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/9",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {loading && (
        <Skeleton
          variant="rectangular"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "inherit",
          }}
        />
      )}

      <Box
        component="video"
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setLoading(false)}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          opacity: loading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <source src="/videos/badshaimosque.mp4" type="video/mp4" />
      </Box>
    </Box>
  );
}
