"use client";
import LanguageIcon from "@mui/icons-material/Language";
import DeliveryDiningTwoToneIcon from "@mui/icons-material/DeliveryDiningTwoTone";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Image from "next/image";
import React from "react";
import Logo from "@/assets/logoneu_gold.png";
import { Stack, Toolbar, Typography, Button, Box } from "@mui/material";

interface NavbarProps {
  onNavigate: (slideIndex: number, top?: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <Stack
      direction={"row"}
      position="fixed"
      p={{ xs: 0.5, sm: 0.7 }}
      sx={{
        width: "100%",
        zIndex: 1000,
        bgcolor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(5px)",
      }}
    >
      <Stack
        direction={"row"}
        mx={{ xs: 0.5, sm: 1 }}
        sx={{
          borderRadius: 1,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Stack direction={"row"} sx={{ alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
          <Image src={Logo} alt="Logo" width={40} height={40} />
          <Stack sx={{ display: { xs: "none", sm: "flex" } }}>
            <Typography
              sx={{
                height: 20,
                fontFamily: "Great Vibes",
                fontWeight: 600,
                pt: 0.5,
                fontSize: { xs: 18, sm: 25 },
                color: "white",
              }}
            >
              Gandhi
            </Typography>
            <Typography
              sx={{
                height: 20,
                fontFamily: "Quicksand",
                fontWeight: 600,
                pt: 1.2,
                pl: 2.4,
                fontSize: 7,
                color: "white",
              }}
            >
              RESTAURANT
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} sx={{ gap: { xs: 0.5, sm: 1 }, ml: { xs: 0.5, sm: 1.5 }, display: { xs: "none", md: "flex" } }}>
          <Stack
            gap={0.6}
            direction={"row"}
            sx={{
              cursor: "pointer",
              py: 0.8,
              px: 1.2,
              my: "auto",
              fontFamily: "Montserrat",
              color: "white",
              fontWeight: 400,
              fontSize: 11,
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.05)",
              },
            }}
            onClick={() => onNavigate(1, true)}
          >
            ANRUFEN
          </Stack>
          <Stack
            sx={{
              cursor: "pointer",
              my: "auto",
              p: 1,
              color: " white",
              fontWeight: 400,
              fontFamily: "Montserrat",
              fontSize: 11,
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.05)",
              },
            }}
            onClick={() => onNavigate(2, true)}
          >
            TISCH RESERVIEREN
          </Stack>
          <Stack
            gap={0.6}
            direction={"row"}
            sx={{
              cursor: "pointer",
              py: 0.8,
              px: 1.2,
              my: "auto",
              fontFamily: "Montserrat",
              color: "white",
              fontWeight: 400,
              fontSize: 11,
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.05)",
              },
            }}
            onClick={() => onNavigate(1, true)}
          >
            MENU & KARTE
          </Stack>
        </Stack>
        <Stack direction={"row"} sx={{ gap: { xs: 0.5, sm: 1 } }} ml={"auto"} mr={{ xs: 0.5, sm: 1 }}>
          <Stack
            gap={0.6}
            direction={"row"}
            sx={{
              cursor: "pointer",
              py: 0.8,
              px: { xs: 0.8, sm: 1.2 },
              my: "auto",
              fontFamily: "Montserrat",
              color: "white",
              fontWeight: 400,
              fontSize: { xs: 10, sm: 13 },
            }}
          >
            <ShoppingBagOutlinedIcon
              sx={{
                fontSize: { xs: 14, sm: 16 },
                transform: "translateY(1.5px)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                transform: "translateX(8px) translateY(-4px)",
                height: 15,
                width: 15,
                bgcolor: "black",
                borderRadius: "100%",
                textAlign: "center",
                fontSize: 11,
                fontWeight: 600,
                color: "white",
                lineHeight: "13px",
              }}
            >
              2
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>0,00 EUR</Box>
          </Stack>
          <Box
            sx={{
              my: "auto",
              height: "18px",
              width: "1px",
              bgcolor: "rgba(255,255,255,0.55)",
              display: { xs: "none", sm: "block" },
            }}
          />
          <Stack
            gap={0.6}
            direction={"row"}
            sx={{
              cursor: "pointer",
              py: 0.8,
              px: { xs: 0.8, sm: 1.2 },
              my: "auto",
              fontFamily: "Montserrat",
              color: "rgba(0,0,0,0.65)",
              fontWeight: 600,
              fontSize: { xs: 10, sm: 13 },
              backgroundColor: "#c7b882",
            }}
          >
            <LanguageIcon
              sx={{
                fontSize: { xs: 14, sm: 16 },
                transform: "translateY(2.2px)",
              }}
            />
            <Box sx={{ display: { xs: "none", sm: "block" } }}>DE</Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
