import { useState } from "react";
import Layout from "@/components/Layout";
import { Navbar } from "@/components/Navbar";
import { SlideIndicator } from "@/components/SlideIndicator";
import { SwipeXYControl, SwipeXYElement } from "@/components/swipexy";
import { Typography, Button, Box, Stack } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "@/lib/useTranslation";

export default function Home() {
  const { t } = useTranslation();
  const [xy, setXY] = useState("0/0");
  const [, currentSlide] = xy.split("/").map(Number);

  const handleNavigate = (slideIndex: number) => {
    setXY(`0/${slideIndex}`);
  };

  return (
    <Layout>
      <Navbar onNavigate={handleNavigate} />
      <SlideIndicator
        currentSlide={currentSlide}
        totalSlides={4}
        onNavigate={handleNavigate}
      />

      <SwipeXYControl xy={xy} changeXY={setXY}>
        {/* Slide 1 */}
        <SwipeXYElement>
          <Stack
            sx={{
              width: "100%",
              minHeight: {
                xs: "100vh",
                sm: "1200px",
                md: "1400px",
                lg: "1600px",
              },
              background: "linear-gradient(to bottom, #eecda3, #ef629f)",
              pt: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Stack>
        </SwipeXYElement>

        {/* Slide 2 - Menü */}
        <SwipeXYElement>
          <Stack
            sx={{
              width: "100%",
              minHeight: "2000px",
              background: "linear-gradient(to top, #FAFFD1, #A1FFCE)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h2">Menü</Typography>
          </Stack>
        </SwipeXYElement>

        {/* Slide 3 - Tisch reservieren */}
        <SwipeXYElement>
          <Stack
            sx={{
              width: "100%",
              minHeight: "100vh",
              background: "linear-gradient(to top, #e0eafc, #cfdef3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h2">Tisch reservieren</Typography>
          </Stack>
        </SwipeXYElement>

        {/* Slide 4 */}
        <SwipeXYElement>
          <Stack
            sx={{
              width: "100%",
              minHeight: "100vh",
              background: "linear-gradient(to bottom, #834d9b, #d04ed6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h2">Kontakt</Typography>
          </Stack>
        </SwipeXYElement>
      </SwipeXYControl>
    </Layout>
  );
}
