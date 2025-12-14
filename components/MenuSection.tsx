"use client";

import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Chip,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import menuData from "@/assets/menuitems.json";

interface MenuItem {
  id: number;
  name: string;
  price: string;
  description?: string;
  tag?: string;
  size?: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
  note?: string;
}

export const MenuSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const restaurant = menuData.restaurant;
  const categories: MenuCategory[] = restaurant.menu;

  // Filter items by search
  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ??
            false)
      ),
    }))
    .filter((cat) => cat.items.length > 0 || !searchQuery);

  // Filter by selected category
  const displayedCategories = selectedCategory
    ? filteredCategories.filter((cat) => cat.category === selectedCategory)
    : filteredCategories;

  const allergenMap = restaurant.allergene;

  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#171717",
        py: { xs: 3, sm: 4, md: 6 },
        px: { xs: 1.5, sm: 2, md: 6 },
      }}
    >
      {/* Header */}
      <Stack
        sx={{
          mb: { xs: 3, sm: 4, md: 6 },
          maxWidth: "1200px",
          mx: "auto",
          width: "100%",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "rgb(199, 184, 130)",
            fontFamily: "Playfair Display",
            fontSize: { xs: 22, sm: 28, md: 36 },
            fontWeight: 300,
            letterSpacing: 1,
            mb: { xs: 2, sm: 3, md: 4 },
            textAlign: "center",
          }}
        >
          Unser Menü
        </Typography>

        {/* Search Bar */}
        <TextField
          placeholder="Speisen suchen..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <SearchIcon
                sx={{
                  mr: 1,
                  color: "rgb(199, 184, 130)",
                  fontSize: { xs: 18, sm: 20 },
                }}
              />
            ),
          }}
          sx={{
            mb: { xs: 2, sm: 3, md: 4 },
            "& .MuiOutlinedInput-root": {
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              fontFamily: "Montserrat",
              fontSize: { xs: 12, sm: 14 },
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
          }}
        />

        {/* Category Chips */}
        <Stack
          direction="row"
          spacing={{ xs: 0.5, sm: 1 }}
          sx={{
            overflowX: "auto",
            pb: 2,
            mb: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Chip
            label="Alle"
            onClick={() => setSelectedCategory(null)}
            sx={{
              backgroundColor:
                selectedCategory === null
                  ? "rgb(199, 184, 130)"
                  : "rgba(199, 184, 130, 0.2)",
              color:
                selectedCategory === null ? "#171717" : "rgb(199, 184, 130)",
              fontFamily: "Montserrat",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontSize: { xs: 11, sm: 12 },
            }}
          />
          {categories.map((cat) => (
            <Chip
              key={cat.category}
              label={cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              sx={{
                backgroundColor:
                  selectedCategory === cat.category
                    ? "rgb(199, 184, 130)"
                    : "rgba(199, 184, 130, 0.2)",
                color:
                  selectedCategory === cat.category
                    ? "#171717"
                    : "rgb(199, 184, 130)",
                fontFamily: "Montserrat",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontSize: { xs: 11, sm: 12 },
              }}
            />
          ))}
        </Stack>
      </Stack>

      {/* Menu Items */}
      <Stack
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          width: "100%",
        }}
      >
        {displayedCategories.map((category) => (
          <Box key={category.category} sx={{ mb: { xs: 3, sm: 4, md: 6 } }}>
            {/* Category Title */}
            <Typography
              variant="h5"
              sx={{
                color: "rgb(199, 184, 130)",
                fontFamily: "Playfair Display",
                fontSize: { xs: 16, sm: 20, md: 24 },
                fontWeight: 400,
                letterSpacing: 0.5,
                mb: 1,
              }}
            >
              {category.category}
            </Typography>

            {/* Category Note */}
            {category.note && (
              <Typography
                sx={{
                  color: "rgba(199, 184, 130, 0.7)",
                  fontFamily: "Montserrat",
                  fontSize: { xs: 11, sm: 12 },
                  mb: 2,
                  fontStyle: "italic",
                }}
              >
                {category.note}
              </Typography>
            )}

            {/* Items Grid */}
            <Grid
              container
              spacing={{ xs: 1.5, sm: 2 }}
              sx={{ mb: { xs: 2, sm: 3, md: 4 } }}
            >
              {category.items.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card
                    sx={{
                      backgroundColor: "rgba(23, 23, 23, 0.6)",
                      border: "1px solid rgba(199, 184, 130, 0.3)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "rgba(23, 23, 23, 0.9)",
                        borderColor: "rgb(199, 184, 130)",
                        boxShadow: "0 4px 16px rgba(199, 184, 130, 0.1)",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Item Header: Name + Price */}
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        sx={{ mb: 1 }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontFamily: "Montserrat",
                            fontSize: { xs: 12, sm: 14 },
                            fontWeight: 600,
                            flex: 1,
                            pr: 1,
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: "rgb(199, 184, 130)",
                            fontFamily: "Montserrat",
                            fontSize: { xs: 12, sm: 13 },
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                            ml: 1,
                          }}
                        >
                          {item.price}€
                        </Typography>
                      </Stack>

                      {/* Item Number */}
                      <Typography
                        sx={{
                          color: "rgba(199, 184, 130, 0.6)",
                          fontFamily: "Montserrat",
                          fontSize: { xs: 10, sm: 11 },
                          mb: 1,
                        }}
                      >
                        #{item.id}
                      </Typography>

                      {/* Item Description */}
                      <Typography
                        sx={{
                          color: "rgba(255, 255, 255, 0.7)",
                          fontFamily: "Montserrat",
                          fontSize: { xs: 11, sm: 12 },
                          mb: 2,
                          lineHeight: 1.4,
                          flexGrow: 1,
                        }}
                      >
                        {item.description}
                      </Typography>

                      {/* Allergen Tags */}
                      {item.tag && (
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{ mt: "auto", flexWrap: "wrap" }}
                        >
                          {item.tag.split("/").map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              sx={{
                                backgroundColor: "rgba(211, 47, 47, 0.2)",
                                color: "#EF5350",
                                fontFamily: "Montserrat",
                                fontSize: 10,
                                fontWeight: 600,
                                height: 20,
                                "& .MuiChip-label": {
                                  px: 1,
                                },
                              }}
                              title={
                                allergenMap[tag as keyof typeof allergenMap]
                              }
                            />
                          ))}
                        </Stack>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

        {/* No Results */}
        {displayedCategories.length === 0 && (
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              py: 8,
            }}
          >
            <Typography
              sx={{
                color: "rgba(199, 184, 130, 0.6)",
                fontFamily: "Montserrat",
                fontSize: 16,
              }}
            >
              Keine Speisen gefunden
            </Typography>
          </Stack>
        )}
      </Stack>

      {/* Footer Note */}
      <Stack
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          width: "100%",
          mt: 8,
          pt: 4,
          borderTop: "1px solid rgba(199, 184, 130, 0.2)",
        }}
      >
        <Typography
          sx={{
            color: "rgba(199, 184, 130, 0.6)",
            fontFamily: "Montserrat",
            fontSize: 11,
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          {restaurant.note}
          <br />
          <br />
          <strong>Allergene Kennzeichnung:</strong> Klicken Sie auf die roten
          Tags um mehr Informationen zu erhalten.
        </Typography>
      </Stack>
    </Stack>
  );
};
