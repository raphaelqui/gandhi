import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "@/styles/globals.css"; // CSS Import hier

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#d32f2f",
    },
    secondary: {
      main: "#ffa000",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
  },
});

const paypalOptions = {
  clientId: "YOUR_PAYPAL_CLIENT_ID", // Ersetze mit deiner PayPal Client ID
  currency: "EUR",
};

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PayPalScriptProvider options={paypalOptions}>
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </ThemeProvider>
  );
}

export default App;
