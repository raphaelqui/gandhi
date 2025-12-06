import React from "react";
import { Stack, Box } from "@mui/material";

interface OrnamentProps {
  color?: string;
  opacity?: number;
  lineWidth?: number;
  marginBottom?: number;
}

const Ornament: React.FC<OrnamentProps> = ({
  color = "rgb(199, 184, 130)",
  opacity = 0.6,
  lineWidth = 60,
  marginBottom = 3,
}) => {
  return (
    <Stack
      sx={{
        position: "relative",
        mx: "auto",
        height: 10,
        width: 22,
        mb: marginBottom,
      }}
    >
      {/* Linke horizontale Linie */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: -68,
          transform: "translateY(-50%)",
          width: `${lineWidth}px`,
          height: "1px",
          bgcolor: `${color
            .replace("rgb", "rgba")
            .replace(")", `, ${opacity})`)}`,
        }}
      />

      {/* Linker kleiner Diamant */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          transform: "rotate(45deg) translateY(-50%)",
          left: "-10px",
          height: 8,
          width: 8,
          border: `1px solid ${color}`,
        }}
      />

      {/* Mittlerer großer Diamant */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          transform: "rotate(45deg) translateY(-50%)",
          left: "0px",
          height: 12,
          width: 12,
          border: `1px solid ${color}`,
        }}
      />

      {/* Rechter kleiner Diamant */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          transform: "rotate(45deg) translateY(-50%)",
          left: "17px",
          height: 8,
          width: 8,
          border: `1px solid ${color}`,
        }}
      />

      {/* Rechte horizontale Linie */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: 28,
          transform: "translateY(-50%)",
          width: `${lineWidth}px`,
          height: "1px",
          bgcolor: `${color
            .replace("rgb", "rgba")
            .replace(")", `, ${opacity})`)}`,
        }}
      />
    </Stack>
  );
};

export default Ornament;
