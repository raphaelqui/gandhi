"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

interface NavbarProps {
  onNavigate: (slideIndex: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#333",
            cursor: "pointer",
          }}
          onClick={() => onNavigate(0)}
        >
          Restaurant
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="text"
            sx={{
              color: "#333",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.05)",
              },
            }}
            onClick={() => onNavigate(1)}
          >
            Menü sehen
          </Button>
          <Button
            variant="contained"
            sx={{
              fontWeight: 500,
              backgroundColor: "#ef629f",
              "&:hover": {
                backgroundColor: "#d04ed6",
              },
            }}
            onClick={() => onNavigate(2)}
          >
            Tisch reservieren
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
