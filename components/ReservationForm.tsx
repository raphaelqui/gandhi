"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Stack,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    color: "white",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    fontFamily: "Montserrat",
    fontSize: 13,
    "& fieldset": {
      borderColor: "rgb(199, 184, 130)",
    },
    "&:hover fieldset": {
      borderColor: "rgb(199, 184, 130)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgb(199, 184, 130)",
    },
  },
  "& .MuiInputBase-input": {
    color: "white",
    fontFamily: "Montserrat",
    fontSize: 13,
    "&::placeholder": {
      color: "rgba(199, 184, 130, 0.5)",
      opacity: 1,
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgb(199, 184, 130)",
    fontFamily: "Montserrat",
    fontSize: 13,
    "&.Mui-focused": {
      color: "rgb(199, 184, 130)",
    },
  },
};

export const ReservationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Reservierung erfolgreich versendet! Wir kontaktieren Sie in Kürze.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          guests: "",
        });
      } else {
        setMessage({
          type: "error",
          text: data.message || "Fehler beim Versenden der Reservierung.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: "550px" },
        mx: "auto",
        p: { xs: 2, sm: 3, md: 4 },
        backgroundColor: "rgba(23, 23, 23, 0.8)",
        border: "1px solid rgb(199, 184, 130)",
        borderRadius: 0,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 300,
          color: "rgb(199, 184, 130)",
          textAlign: "center",
          fontFamily: "Playfair Display",
          fontSize: { xs: 24, sm: 32 },
          letterSpacing: 1,
        }}
      >
        Tisch Reservieren
      </Typography>

      {message && (
        <Alert
          severity={message.type}
          sx={{
            mb: 3,
            backgroundColor:
              message.type === "success"
                ? "rgba(76, 175, 80, 0.1)"
                : "rgba(211, 47, 47, 0.1)",
            color: message.type === "success" ? "#66BB6A" : "#EF5350",
            border: `1px solid ${
              message.type === "success" ? "#66BB6A" : "#EF5350"
            }`,
          }}
        >
          {message.text}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                fontFamily: "Montserrat",
                fontSize: 13,
                "& fieldset": {
                  borderColor: "rgb(199, 184, 130)",
                },
                "&:hover fieldset": {
                  borderColor: "rgb(199, 184, 130)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgb(199, 184, 130)",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(199, 184, 130, 0.5)",
                opacity: 1,
              },
              "& .MuiInputLabel-root": {
                color: "rgb(199, 184, 130)",
                fontFamily: "Montserrat",
                fontSize: 13,
                "&.Mui-focused": {
                  color: "rgb(199, 184, 130)",
                },
              },
            }}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                fontFamily: "Montserrat",
                fontSize: 13,
                "& fieldset": {
                  borderColor: "rgb(199, 184, 130)",
                },
                "&:hover fieldset": {
                  borderColor: "rgb(199, 184, 130)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgb(199, 184, 130)",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(199, 184, 130, 0.5)",
                opacity: 1,
              },
              "& .MuiInputLabel-root": {
                color: "rgb(199, 184, 130)",
                fontFamily: "Montserrat",
                fontSize: 13,
                "&.Mui-focused": {
                  color: "rgb(199, 184, 130)",
                },
              },
            }}
          />

          <TextField
            label="Telefon"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            size="small"
            sx={textFieldSx}
          />

          <TextField
            label="Datum"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            sx={textFieldSx}
          />

          <TextField
            label="Uhrzeit"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            sx={textFieldSx}
          />

          <TextField
            label="Anzahl Gäste"
            name="guests"
            type="number"
            inputProps={{ min: 1, max: 20 }}
            value={formData.guests}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            size="small"
            sx={textFieldSx}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              backgroundColor: "rgb(199, 184, 130)",
              color: "#171717",
              fontWeight: 600,
              fontFamily: "Montserrat",
              fontSize: 13,
              letterSpacing: 0.5,
              border: "1px solid rgb(199, 184, 130)",
              "&:hover": {
                backgroundColor: "rgba(199, 184, 130, 0.85)",
                color: "#171717",
              },
              "&:disabled": {
                backgroundColor: "rgba(199, 184, 130, 0.5)",
                color: "#171717",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={20} sx={{ color: "#171717" }} />
            ) : (
              "Reservierung Absenden"
            )}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
