"use client";

import React, { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Typography,
  Avatar,
  Rating,
  CircularProgress,
  Fade,
} from "@mui/material";

interface GooglePlacesReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface ApiResponse {
  reviews: GooglePlacesReview[];
  totalReviews: number;
}

export default function ReviewCarousel() {
  const [reviews, setReviews] = useState<GooglePlacesReview[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(true); // Fade-In/Fade-Out Steuerung

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch("/api/reviews");
        const data: ApiResponse = await response.json();

        if (!response.ok) {
          throw new Error(
            "error" in data ? String(data) : "Failed to fetch reviews"
          );
        }

        if (data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
        } else {
          setError("Keine Bewertungen gefunden");
        }
      } catch (err) {
        console.error("Error:", err);
        setError(
          err instanceof Error ? err.message : "Ein Fehler ist aufgetreten"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  /*
  useEffect(() => {
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setVisible(false); // ausblenden
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
        setVisible(true); // nächste Bewertung einblenden
      }, 500); // 0.5s Fade-Out Dauer
    }, 7000); // ⏱️ jetzt alle 7 Sekunden

    return () => clearInterval(interval);
  }, [reviews.length]);
*/
  if (loading) {
    return (
      <Box
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          padding: 3,
          minHeight: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #e0e0e0",
          borderRadius: 2,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          padding: 3,
          minHeight: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #e0e0e0",
          borderRadius: 2,
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (reviews.length === 0) {
    return (
      <Box
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          padding: 3,
          minHeight: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #e0e0e0",
          borderRadius: 2,
        }}
      >
        <Typography>Keine Bewertungen verfügbar</Typography>
      </Box>
    );
  }

  const currentReview = reviews[currentIndex];

  return (
    <Stack
      sx={{
        width: 500,
        height: 190,
      }}
    >
      <Fade in={visible} timeout={500}>
        <Box
          sx={{
            margin: "0 auto",
            padding: 3,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          {/* Bewertungskopf */}

          {/* Bewertungstext */}
          <Box
            sx={{
              textAlign: "center",
              maxHeight: 105,
              overflow: "hidden",
              fontSize: 13,
              fontFamily: "Montserrat",
              color: "white",
              mb: 1.8,
            }}
          >
            {currentReview.text}
          </Box>
          {/* Autor */}
          <Stack
            sx={{
              mx: "auto",
              width: "fit-content",
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                gap: 1.5,
                width: "auto",
                ml: 4,
              }}
            >
              <Avatar
                src={currentReview.profile_photo_url}
                alt={currentReview.author_name}
                sx={{
                  mt: 1.2,
                  width: 30,
                  height: 30,
                  bgcolor: "#ff9800",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {currentReview.author_name?.charAt(0) || "?"}
              </Avatar>
              <Stack
                sx={{
                  width: "fit-content",
                }}
              >
                <Box
                  sx={{
                    transform: "translateY(4px)",
                    fontWeight: 500,
                    color: "white",
                    fontFamily: "Montserrat",
                  }}
                >
                  {currentReview.author_name}
                </Box>
                <Box
                  sx={{
                    pt: 0.5,
                    fontSize: 9,
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {currentReview.relative_time_description}
                </Box>
                <Box
                  sx={{
                    position: "relative",
                    width: "100px",
                    height: "20px",
                  }}
                >
                  <Stack
                    sx={{
                      top: "-3px",
                      left: -5,
                      scale: 0.5,
                      position: "absolute",
                      width: "20px",
                    }}
                  >
                    <Rating value={currentReview.rating} readOnly />
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Fade>
    </Stack>
  );
}
