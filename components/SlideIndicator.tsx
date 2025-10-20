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
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor:
              currentSlide === index ? "#ef629f" : "rgba(0,0,0,0.2)",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
            "&:hover": {
              backgroundColor:
                currentSlide === index ? "#ef629f" : "rgba(0,0,0,0.4)",
            },
          }}
        />
      ))}
      <Typography
        sx={{
          fontSize: "12px",
          color: "#666",
          mt: 1,
          textAlign: "center",
        }}
      >
        {currentSlide + 1}/{totalSlides}
      </Typography>
    </Box>
  );
};
