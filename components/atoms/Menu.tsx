import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  IconButton,
  Chip,
  Divider,
  Button,
  useTheme,
  alpha,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

// ============================================
// TYPESCRIPT INTERFACES - SO MUSS DEINE JSON AUFGEBAUT SEIN
// ============================================

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Optional für Angebote
  image?: string; // Optional
  isPopular?: boolean; // Optional
  isAvailable?: boolean; // Optional, default true
  customizable?: boolean; // Optional
  allergens?: string[]; // Optional
  nutritionInfo?: {
    // Optional
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string; // Optional
  items: MenuItem[];
}

export interface RestaurantMenuData {
  restaurantName: string;
  categories: MenuCategory[];
}

// ============================================
// KOMPONENTEN-PROPS
// ============================================

interface MenuProps {
  menuData: RestaurantMenuData;
  onAddToCart?: (item: MenuItem, quantity: number) => void;
  currency?: string; // Default: '€'
}

// ============================================
// MENU ITEM KOMPONENTE
// ============================================

const MenuItemCard: React.FC<{
  item: MenuItem;
  currency: string;
  onQuantityChange: (item: MenuItem, quantity: number) => void;
}> = ({ item, currency, onQuantityChange }) => {
  const theme = useTheme();
  const [quantity, setQuantity] = useState(0);
  const isAvailable = item.isAvailable !== false;

  const handleAdd = () => {
    if (!isAvailable) return;
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(item, 1);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(item, -1);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        mb: 2,
        boxShadow: "none",
        border: "none",
        borderRadius: 0,
        opacity: isAvailable ? 1 : 0.6,
        cursor: isAvailable ? "pointer" : "default",
        "&:hover": isAvailable
          ? {
              backgroundColor: alpha(theme.palette.action.hover, 0.04),
            }
          : {},
      }}
    >
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: 1, p: 2, "&:last-child": { pb: 2 } }}>
          {/* Name und Badges */}
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Typography
              variant="h6"
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
                lineHeight: 1.3,
                flex: 1,
              }}
            >
              {item.name}
            </Typography>
            {item.isPopular && (
              <Chip
                label="Beliebt"
                size="small"
                sx={{
                  height: 20,
                  fontSize: "0.7rem",
                  backgroundColor: alpha(theme.palette.warning.light, 0.2),
                  color: theme.palette.warning.dark,
                  fontWeight: 600,
                }}
              />
            )}
            {!isAvailable && (
              <Chip
                label="Nicht verfügbar"
                size="small"
                sx={{
                  height: 20,
                  fontSize: "0.7rem",
                  backgroundColor: alpha(theme.palette.error.light, 0.2),
                  color: theme.palette.error.dark,
                }}
              />
            )}
          </Box>

          {/* Beschreibung */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: "0.875rem",
              lineHeight: 1.4,
              mb: 1.5,
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {item.description}
          </Typography>

          {/* Preis */}
          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "0.95rem",
              }}
            >
              {currency}
              {item.price.toFixed(2)}
            </Typography>
            {item.originalPrice && (
              <Typography
                variant="caption"
                sx={{
                  textDecoration: "line-through",
                  color: theme.palette.text.disabled,
                }}
              >
                {currency}
                {item.originalPrice.toFixed(2)}
              </Typography>
            )}
          </Box>

          {/* Allergene */}
          {item.allergens && item.allergens.length > 0 && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: "block" }}
            >
              Allergene: {item.allergens.join(", ")}
            </Typography>
          )}
        </CardContent>
      </Box>

      {/* Bild und Buttons */}
      {item.image ? (
        <Box
          sx={{
            position: "relative",
            width: 120,
            minHeight: 120,
            m: 2,
          }}
        >
          <Box
            component="img"
            src={item.image}
            alt={item.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 1,
            }}
          />

          {/* Quantity Controls über dem Bild */}
          {isAvailable && (
            <Box
              sx={{
                position: "absolute",
                bottom: -8,
                right: -8,
                left: -8,
                display: "flex",
                justifyContent: "center",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {quantity === 0 ? (
                <IconButton
                  onClick={handleAdd}
                  sx={{
                    backgroundColor: theme.palette.common.white,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: theme.shadows[2],
                    width: 36,
                    height: 36,
                    "&:hover": {
                      backgroundColor: theme.palette.common.white,
                      boxShadow: theme.shadows[4],
                    },
                  }}
                  size="small"
                >
                  <AddIcon />
                </IconButton>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: theme.palette.common.white,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 20,
                    boxShadow: theme.shadows[2],
                    px: 0.5,
                  }}
                >
                  <IconButton
                    onClick={handleRemove}
                    sx={{ p: 0.5 }}
                    size="small"
                  >
                    <RemoveIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                  <Typography
                    sx={{
                      mx: 1.5,
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      minWidth: 20,
                      textAlign: "center",
                    }}
                  >
                    {quantity}
                  </Typography>
                  <IconButton onClick={handleAdd} sx={{ p: 0.5 }} size="small">
                    <AddIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Box>
              )}
            </Box>
          )}
        </Box>
      ) : (
        // Buttons ohne Bild
        isAvailable && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pr: 2,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {quantity === 0 ? (
              <IconButton
                onClick={handleAdd}
                sx={{
                  backgroundColor: theme.palette.common.white,
                  border: `1px solid ${theme.palette.divider}`,
                  width: 36,
                  height: 36,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.common.black, 0.04),
                  },
                }}
                size="small"
              >
                <AddIcon />
              </IconButton>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: theme.palette.common.white,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 20,
                  px: 0.5,
                }}
              >
                <IconButton onClick={handleRemove} sx={{ p: 0.5 }} size="small">
                  <RemoveIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <Typography
                  sx={{
                    mx: 1.5,
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    minWidth: 20,
                    textAlign: "center",
                  }}
                >
                  {quantity}
                </Typography>
                <IconButton onClick={handleAdd} sx={{ p: 0.5 }} size="small">
                  <AddIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            )}
          </Box>
        )
      )}
    </Card>
  );
};

// ============================================
// HAUPTKOMPONENTE
// ============================================

const Menu: React.FC<MenuProps> = ({
  menuData,
  onAddToCart = () => {},
  currency = "€",
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeTab, setActiveTab] = useState(0);
  const [isTabsSticky, setIsTabsSticky] = useState(false);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const tabsRef = useRef<HTMLDivElement>(null);

  // Scroll-Spy für aktiven Tab
  useEffect(() => {
    const handleScroll = () => {
      // Check ob Tabs sticky sind
      if (tabsRef.current) {
        const rect = tabsRef.current.getBoundingClientRect();
        setIsTabsSticky(rect.top <= 0);
      }

      // Bestimme aktiven Tab basierend auf Scroll-Position
      const scrollPosition = window.scrollY + 150;

      for (let i = menuData.categories.length - 1; i >= 0; i--) {
        const category = menuData.categories[i];
        const element = categoryRefs.current[category.id];
        if (element && element.offsetTop <= scrollPosition) {
          if (activeTab !== i) {
            setActiveTab(i);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuData.categories, activeTab]);

  // Tab Click Handler
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    const category = menuData.categories[newValue];
    const element = categoryRefs.current[category.id];
    if (element) {
      const yOffset = -120;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleQuantityChange = (item: MenuItem, quantityChange: number) => {
    if (onAddToCart) {
      onAddToCart(item, quantityChange);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      {/* Sticky Navigation Container */}
      <Box
        ref={tabsRef}
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: theme.palette.background.paper,
          zIndex: 100,
          boxShadow: isTabsSticky ? theme.shadows[1] : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Such- und Filter-Buttons */}
        <Box
          sx={{
            px: isMobile ? 2 : 3,
            py: 1.5,
            display: "flex",
            gap: 1,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<SearchIcon />}
            sx={{
              flex: 1,
              justifyContent: "flex-start",
              color: theme.palette.text.secondary,
              borderColor: theme.palette.divider,
              borderRadius: 2,
              textTransform: "none",
              py: 1,
            }}
          >
            Durchsuche {menuData.restaurantName}
          </Button>
          <Button
            variant="outlined"
            startIcon={<TuneIcon />}
            sx={{
              borderColor: theme.palette.divider,
              borderRadius: 2,
              minWidth: "auto",
              px: 2,
              py: 1,
            }}
          >
            Filter
          </Button>
        </Box>

        {/* Kategorie Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            px: isMobile ? 2 : 3,
            "& .MuiTabs-indicator": {
              backgroundColor: theme.palette.common.black,
              height: 3,
            },
            "& .MuiTab-root": {
              textTransform: "none",
              minHeight: 48,
              fontSize: "0.875rem",
              fontWeight: 500,
              color: theme.palette.text.secondary,
              px: 2,
              "&.Mui-selected": {
                color: theme.palette.common.black,
                fontWeight: 600,
              },
            },
            "& .MuiTabs-scrollButtons": {
              "&.Mui-disabled": {
                opacity: 0.3,
              },
            },
          }}
        >
          {menuData.categories.map((category) => (
            <Tab
              key={category.id}
              label={
                <Box display="flex" alignItems="center" gap={0.5}>
                  <span>{category.name}</span>
                  <Typography
                    component="span"
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: "0.75rem" }}
                  >
                    ({category.items.length})
                  </Typography>
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>

      {/* Menü Content */}
      <Box sx={{ px: isMobile ? 2 : 3, py: 3 }}>
        {menuData.categories.map((category) => (
          <Box
            key={category.id}
            ref={(el) => (categoryRefs.current[category.id] = el)}
            sx={{ mb: 6 }}
          >
            {/* Kategorie Header */}
            <Box mb={2.5}>
              <Typography
                variant="h5"
                sx={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  mb: 0.5,
                }}
              >
                {category.name}
              </Typography>
              {category.description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.875rem" }}
                >
                  {category.description}
                </Typography>
              )}
            </Box>

            {/* Items der Kategorie */}
            <Box>
              {category.items.map((item, index) => (
                <React.Fragment key={item.id}>
                  <MenuItemCard
                    item={item}
                    currency={currency}
                    onQuantityChange={handleQuantityChange}
                  />
                  {index < category.items.length - 1 && (
                    <Divider sx={{ my: 0 }} />
                  )}
                </React.Fragment>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Menu;
