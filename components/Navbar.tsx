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
      p={0.7}
      sx={{
        width: "100%",
        zIndex: 1000,
        bgcolor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(5px)",
      }}
    >
      <Stack
        direction={"row"}
        mx={1}
        sx={{
          borderRadius: 1,
          width: "100%",
        }}
      >
        <Stack direction={"row"}>
          <Image src={Logo} alt="Logo" width={46} height={46} />
          <Stack>
            <Typography
              sx={{
                height: 20,
                fontFamily: "Great Vibes",
                fontWeight: 600,
                pt: 0.5,
                fontSize: 25,
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
        <Stack direction={"row"} sx={{ gap: 1 }} ml={1.5}>
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
        <Stack direction={"row"} sx={{ gap: 1 }} ml={"auto"} mr={1}>
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
              fontSize: 13,
              // backgroundColor: "#c7b882",
            }}
          >
            <ShoppingBagOutlinedIcon
              sx={{
                fontSize: 16,
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
            0,00 EUR
          </Stack>
          <Box
            sx={{
              my: "auto",
              height: "18px",
              width: "1px",
              bgcolor: "rgba(255,255,255,0.55)",
            }}
          />
          <Stack
            gap={0.6}
            direction={"row"}
            sx={{
              cursor: "pointer",
              py: 0.8,
              px: 1.2,
              my: "auto",
              fontFamily: "Montserrat",
              color: "rgba(0,0,0,0.65)",
              fontWeight: 600,
              fontSize: 13,
              backgroundColor: "#c7b882",
            }}
          >
            <LanguageIcon
              sx={{
                fontSize: 16,
                transform: "translateY(2.2px)",
              }}
            />
            DE
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
