import { useState } from "react";
import Layout from "@/components/Layout";
import { Navbar } from "@/components/Navbar";
import { SlideIndicator } from "@/components/SlideIndicator";
import { SwipeXYControl, SwipeXYElement } from "@/components/swipexy";
import { Typography, Box, Stack } from "@mui/material";
import ReviewCarousel from "@/components/atoms/ReviewCarousel";
import RestaurantMap from "@/components/atoms/RestaurantMap";
import Ornament from "@/components/atoms/Ornament";
import halal from "@/assets/Halal_logo.svg.png";
import trip from "@/assets/trip.png.png";
import Interior from "@/assets/interior.png";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
import Image from "next/image";
import { ReservationForm } from "@/components/ReservationForm";
import { MenuSection } from "@/components/MenuSection";

export default function Home() {
  const [xy, setXY] = useState("0/0");

  // xy may include an optional flag suffix after a pipe, e.g. "0/2|top".
  // Parse coordinates robustly for the SlideIndicator and other consumers.
  const coords = xy.split("|")[0];
  const parts = coords.split("/");
  const currentSlide = Number(parts[1] ?? 0);

  // handleNavigate accepts an optional `top` flag; Navbar will pass true
  // to reset inner scroll when jumping from the nav.
  const handleNavigate = (slideIndex: number, top = false) => {
    setXY(top ? `0/${slideIndex}|top` : `0/${slideIndex}`);
  };

  return (
    <Layout>
      <Navbar onNavigate={handleNavigate} />
      <SlideIndicator
        currentSlide={currentSlide}
        totalSlides={3}
        onNavigate={handleNavigate}
      />

      <SwipeXYControl xy={xy} changeXY={setXY}>
        {/* Slide 1 */}
        <SwipeXYElement>
          <Stack
            sx={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              minHeight: {
                xs: "200vh",
                sm: "220vh",
                md: "240vh",
                lg: "200vh",
              },
              background: "#171717",
              display: "flex",
            }}
          >
            <Stack position={"relative"}>
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  pointerEvents: "none",
                  opacity: 0.7,
                }}
              >
                <source src="/videos/badshaimosque.mp4" type="video/mp4" />
              </video>
            </Stack>
            <Box
              sx={{
                width: "120%",
                height: 100,
                transform: "rotate(4deg) translateX(-50px)",
                boxShadow:
                  "0 -60px 90px rgba(23, 23, 23, 1), 0 -60px 90px rgba(23, 23, 23, 1),0 -60px 90px rgba(23, 23, 23, 1)",
                bgcolor: "#171717",
              }}
            />
            <Box
              sx={{
                height: 100,
                width: 100,
                position: "absolute",
                right: 12,
                top: "80px",
              }}
            >
              <Image src={halal} alt="" height={50} />
            </Box>
            <Box
              sx={{
                height: 100,
                width: 100,
                position: "absolute",
                right: 80,
                top: "74px",
              }}
            >
              <Image src={trip} alt="" height={65} />
            </Box>

            <Stack
              sx={{
                pt: 10,
                position: "absolute",
                height: "100%",
                width: "100%",
              }}
            >
              <Stack
                sx={{
                  pt: 80,
                }}
              >
                <Stack sx={{ position: "relative", width: "100%" }}>
                  <Ornament />
                  <Typography
                    sx={{
                      mx: "auto",
                      color: "rgb(199, 184, 130)",
                      fontFamily: "Playfair Display",
                      fontSize: { xs: 18, sm: 24, md: 30 },
                      fontWeight: 200,
                      height: "auto",
                      px: 2,
                      textAlign: "center",
                    }}
                  >
                    Das sagen unsere Gäste
                  </Typography>
                  <Typography
                    sx={{
                      mx: "auto",
                      mt: 1,
                      height: "auto",
                      color: "rgba(199, 184, 130, 0.35)",
                      fontFamily: "Playfair Display",
                      fontSize: { xs: 40, sm: 60, md: 80 },
                      fontWeight: 400,
                    }}
                  >
                    "
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      mx: "auto",
                      px: { xs: 2, md: 0 },
                    }}
                  >
                    <ReviewCarousel />
                  </Box>
                  <Stack
                    sx={{
                      mt: 6.5,
                      pb: 8,
                      width: "100%",
                      height: 340,
                      bgcolor: "#0a1314",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <Stack
                      direction={"column"}
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          zIndex: 0,
                          width: "100%",
                          opacity: 0.3,
                        }}
                      >
                        <Image src={Interior} alt="" height={645} />
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            zIndex: 1,
                            height: 340,
                            width: "100%",
                            boxShadow: "inset 0px -45px 65px -5px #000000",
                          }}
                        />
                      </Box>
                      <Typography
                        sx={{
                          mt: 4.5,
                          zIndex: 2,
                          mx: "auto",
                          color: "white",
                          fontFamily: "Montserrat",
                          fontSize: 13,
                          fontWeight: 400,
                          height: 25,
                        }}
                      >
                        Gemütliches Restaurant in bester Lage Siegburgs
                      </Typography>
                      <Typography
                        sx={{
                          zIndex: 2,
                          mx: "auto",
                          color: "rgb(199, 184, 130)",
                          fontFamily: "Playfair Display",
                          fontSize: 26,
                          fontWeight: 200,
                          height: 25,
                        }}
                      >
                        Besuchen Sie unser Restaurant in Siegburg
                      </Typography>
                      <Typography
                        sx={{
                          mt: 6,
                          zIndex: 2,
                          mx: "auto",
                          color: "white",
                          fontFamily: "Montserrat",
                          fontSize: 13,
                          fontWeight: 400,
                          px: 20,
                          textAlign: "center",
                        }}
                      >
                        Tauche ein in die Welt aromatischer Gewürze, warmer
                        Farben und authentischer indischer Küche – frisch,
                        duftend und mit Liebe zubereitet. Ob romantisches Dinner
                        oder Abend mit Freunden – bei uns findest du den
                        perfekten Platz zum Genießen und Entspannen.
                        <br /> 👉 Jetzt sofort Tisch reservieren – einfach auf
                        den unteren Button klicken oder direkt anrufen, um
                        deinen Platz zu sichern. Wir freuen uns auf dich!
                      </Typography>
                      {/* BETRUGS WARNUNG */}
                      {/* WENN EIN GAST VON EINEM NETZWERK; MEHR ALS EIN TISCH ODER DESGLEICHEN RESERVIEREN
                      MÖCHTE DANN BRAUCHT ER EINE BESTÄTIGUNG PER TELEFON SOLANGE WIRD ES NICHT BESTÄTIGT */}
                      <Stack
                        direction={"row"}
                        mx={"auto"}
                        gap={2}
                        sx={{
                          zIndex: 4,
                        }}
                      >
                        <Stack
                          sx={{
                            cursor: "pointer",
                            mt: 2,
                            height: { xs: 36, sm: 30 },
                            px: 1.5,
                            border: "1px solid rgb(199, 184, 130)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: { xs: 11, sm: 12 },
                              fontWeight: 600,
                              textAlign: "center",
                              color: "rgb(199, 184, 130)",
                            }}
                          >
                            Tisch reservieren
                          </Box>
                        </Stack>
                        <Stack
                          gap={1}
                          direction={"row"}
                          sx={{
                            cursor: "pointer",
                            px: 1.5,
                            mt: 2,
                            height: { xs: 36, sm: 30 },
                            border: "1px solid rgb(199, 184, 130)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CallIcon
                            sx={{
                              my: "auto",
                              fontSize: "14px",
                              color: "rgb(199, 184, 130)",
                            }}
                          />
                          <Box
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: { xs: 11, sm: 12 },
                              fontWeight: 600,
                              textAlign: "center",
                              color: "rgb(199, 184, 130)",
                            }}
                          >
                            Anrufen
                          </Box>
                        </Stack>
                        <Stack
                          gap={1}
                          direction={"row"}
                          sx={{
                            cursor: "pointer",
                            px: 1.5,
                            mt: 2,
                            height: { xs: 36, sm: 30 },
                            border: "1px solid rgb(199, 184, 130)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <WhatsAppIcon
                            sx={{
                              my: "auto",
                              fontSize: { xs: 12, sm: 14 },
                              color: "rgb(199, 184, 130)",
                            }}
                          />
                          <Box
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: { xs: 11, sm: 12 },
                              fontWeight: 600,
                              textAlign: "center",
                              color: "rgb(199, 184, 130)",
                            }}
                          >
                            Whatsapp
                          </Box>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>

                  <Stack
                    width={"100%"}
                    mt={{ xs: 6, md: 12 }}
                    mx={{ xs: 0, md: 10 }}
                    direction={{ xs: "column", md: "row" }}
                    px={{ xs: 2, md: 0 }}
                    gap={{ xs: 4, md: 3 }}
                  >
                    <Stack
                      sx={{
                        height: { xs: "250px", sm: "300px", md: "312px" },
                        width: "100%",
                        borderBottomLeftRadius: 3,
                      }}
                    >
                      <RestaurantMap />
                    </Stack>
                    <Box
                      sx={{
                        display: { xs: "none", md: "block" },
                        width: "1px",
                        bgcolor: "rgba(199, 184, 130, 0.75)",
                      }}
                    />
                    <Stack
                      sx={{
                        ml: { xs: 0, md: 3 },
                        flex: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "rgb(199, 184, 130)",
                          fontFamily: "Playfair Display",
                          fontSize: { xs: 13, sm: 15, md: 17 },
                          fontWeight: 400,
                          letterSpacing: 0.75,
                          height: "auto",
                          mt: 2,
                        }}
                      >
                        Unsere Öffnungszeiten
                      </Typography>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        gap={{ xs: 1, sm: 2 }}
                      >
                        <Box
                          sx={{
                            zIndex: 2,
                            color: "white",
                            fontFamily: "Montserrat",
                            fontSize: { xs: 12, md: 13 },
                            mt: 0.5,
                            mb: 2,
                            fontWeight: 400,
                            lineHeight: 1.5,
                          }}
                        >
                          Mo:
                          <br />
                          Di:
                          <br />
                          Mi:
                          <br />
                          Do:
                          <br />
                          Fr:
                          <br />
                          Sa:
                          <br />
                          So:
                        </Box>
                        <Box
                          sx={{
                            zIndex: 2,
                            color: "white",
                            fontFamily: "Montserrat",
                            fontSize: { xs: 12, md: 13 },
                            mt: 0.5,
                            mb: 2,
                            fontWeight: 400,
                            lineHeight: 1.5,
                          }}
                        >
                          09:00 – 18:00 Uhr
                          <br />
                          09:00 – 18:00 Uhr
                          <br />
                          09:00 – 18:00 Uhr
                          <br />
                          09:00 – 18:00 Uhr
                          <br />
                          09:00 – 18:00 Uhr
                          <br />
                          10:00 – 16:00 Uhr
                          <br />
                          Geschlossen
                        </Box>
                      </Stack>

                      <Typography
                        sx={{
                          color: "rgb(199, 184, 130)",
                          fontFamily: "Playfair Display",
                          fontSize: { xs: 13, sm: 15, md: 17 },
                          fontWeight: 400,
                          letterSpacing: 0.75,
                          height: "auto",
                          mt: 3,
                        }}
                      >
                        Adresse
                      </Typography>
                      <Box
                        sx={{
                          zIndex: 2,
                          color: "white",
                          fontFamily: "Montserrat",
                          fontSize: { xs: 12, md: 13 },
                          mt: 0.5,
                          mb: 2,
                          fontWeight: 400,
                          lineHeight: 1.5,
                        }}
                      >
                        Kaiserstraße 139, 53721 Siegburg
                      </Box>
                      <Stack
                        gap={1}
                        direction={"row"}
                        sx={{
                          width: "fit-content",
                          cursor: "pointer",
                          px: 1.5,
                          mt: 2,
                          height: { xs: 36, sm: 30 },
                          bgcolor: "rgb(199, 184, 130)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MyLocationRoundedIcon
                          sx={{
                            my: "auto",
                            fontSize: { xs: 12, sm: 14 },
                            color: "#171717",
                          }}
                        />
                        <Box
                          sx={{
                            fontFamily: "Montserrat",
                            fontSize: { xs: 11, sm: 12 },
                            fontWeight: 600,
                            textAlign: "center",
                            color: "#171717",
                          }}
                        >
                          Starte Navigation
                        </Box>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </SwipeXYElement>

        {/* Slide 2 - Menü */}
        <SwipeXYElement>
          <MenuSection />
        </SwipeXYElement>

        {/* Slide 3 - Tisch reservieren */}
        <SwipeXYElement>
          <Stack
            sx={{
              width: "100%",
              minHeight: "100vh",
              background: "#171717",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pt: { xs: 8, sm: 10 },
              pb: { xs: 8, sm: 10 },
              px: { xs: 1, sm: 2, md: 2 },
            }}
          >
            <ReservationForm />
          </Stack>
        </SwipeXYElement>
      </SwipeXYControl>
    </Layout>
  );
}
