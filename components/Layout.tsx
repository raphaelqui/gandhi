import React, { ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useTranslation } from "@/lib/useTranslation";

interface LayoutProps {
  children: ReactNode;
}

// Flaggen-Emojis für Sprachen
const languages = [
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
];

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
    handleLanguageMenuClose();
  };

  const currentLanguage =
    languages.find((lang) => lang.code === router.locale) || languages[0];

  return children;
}
