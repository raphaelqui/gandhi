import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Box, Stack, Typography } from "@mui/material";

const RestaurantMap = () => {
  // Ersetze diese Koordinaten mit den genauen Koordinaten deines Restaurants
  // Du kannst sie direkt aus Google Maps kopieren (Rechtsklick auf den Standort -> Koordinaten)
  const center = {
    lat: 50.803684,
    lng: 7.204315,
  };

  const mapContainerStyle = {
    width: "100%",
    maxWidth: "420px",
    height: "auto",
    aspectRatio: "420/312",
    borderRadius: "3px",
  };

  const mapOptions = {
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    gestureHandling: "none",
    draggable: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
  };

  return (
    <Box>
      <Stack
        sx={{
          width: "auto",
          height: "auto",
        }}
      >
        <LoadScript googleMapsApiKey={process.env.GOOGLE_PLACES_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
            options={mapOptions}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </Stack>
    </Box>
  );
};

export default RestaurantMap;
