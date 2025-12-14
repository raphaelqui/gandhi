import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "@/styles/globals.css";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "rgb(199, 184, 130)",
    },
    secondary: {
      main: "#ef629f",
    },
    background: {
      default: "#171717",
      paper: "#1e1e1e",
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontFamily: '"Playfair Display", serif',
    },
    h2: {
      fontWeight: 700,
      fontFamily: '"Playfair Display", serif',
    },
    h3: {
      fontWeight: 700,
      fontFamily: '"Playfair Display", serif',
    },
  },
});

const paypalOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
  currency: "EUR",
};

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#171717" />
        <meta
          name="description"
          content="Gandhi Restaurant - Modernes Restaurant mit Online Menü und Tischreservierung"
        />
        <meta property="og:title" content="Gandhi Restaurant" />
        <meta
          property="og:description"
          content="Authentische Küche mit modernem Touch"
        />
        <meta property="og:type" content="business.business" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PayPalScriptProvider options={paypalOptions}>
          <Component {...pageProps} />
        </PayPalScriptProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
