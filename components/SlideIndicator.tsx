"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

interface SlideIndicatorProps {
  currentSlide: number;
  totalSlides: number;
  onNavigate: (slideIndex: number) => void;
}

export const SlideIndicator: React.FC<SlideIndicatorProps> = ({
  currentSlide,
  totalSlides,
  onNavigate,
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        right: 30,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        zIndex: 999,
      }}
    >
      {Array.from({ length: totalSlides }).map((_, index) => (
        <Box
          key={index}
          onClick={() => onNavigate(index)}
          sx={{
            width: 3,
            height: 70,
            backgroundColor:
              currentSlide === index ? "white" : "rgba(255,255,255,0.4)",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
            "&:hover": {
              backgroundColor:
                currentSlide === index ? "white" : "rgba(0,0,0,0.4)",
            },
          }}
        />
      ))}
    </Box>
  );
};
