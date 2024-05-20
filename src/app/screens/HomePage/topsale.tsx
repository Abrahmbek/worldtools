import { Box, Button, Container, Stack } from "@mui/material";
import React from "react";

import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { CssVarsProvider } from "@mui/joy/styles";
import { CardOverflow, IconButton } from "@mui/joy";
//import { FavoriteIcon} from '@mui/icons-material';
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Favorite } from "@mui/icons-material";

const sale_list = Array.from(Array(9).keys());
export function TopSale() {
  return (
    <div className="bestsale_frame">
      <Container>
        <Stack
          sx={{ mt: "35px" }}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Stack className="heading_content">
            <h1>
              TopSale <span> Products</span>
            </h1>
          </Stack>
        </Stack>
        <Stack className="sale_wrapper">
          {sale_list.map((ele, index) => {
            return (
              <CssVarsProvider key={`${index}`}>
                <Card
                  className="sale_card"
                  sx={{
                    minHeight: 390,
                    minWidth: 280,
                    mr: ".3rem",
                    mt: ".4rem",
                    mb: "0rem",
                    cursor: "pointer",
                    overflow: "hidden",
                  }}
                >
                  <CardCover>
                    <img src="/product/set1.webp" loading="lazy" alt="" />
                  </CardCover>

                  <CardCover
                    sx={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                    }}
                  />
                  <div className="sale_content">sale</div>
                  <CardContent sx={{ justifyContent: "flex-end" }}>
                    <Typography
                      level="h2"
                      fontSize="lg"
                      textColor="#fff"
                      mb={1}
                    ></Typography>{" "}
                    <Typography
                      startDecorator={<LocationOnRoundedIcon />}
                      textColor="neutral.300"
                    >
                      South Korea
                    </Typography>
                  </CardContent>
                  <CardOverflow
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1.5,
                      py: 1.5,
                      px: "var-(--Card-padding)",
                      borderTop: "1px solid",
                    }}
                  >
                    <IconButton
                      aria-label="like minimal photography"
                      size="md"
                      variant="solid"
                      color="neutral"
                      sx={{
                        position: "absolute",
                        zIndex: 2,
                        borderRadius: "50%",
                        right: "1rem",
                        bottom: 45,
                        transform: "translateY(50%)",
                        color: "rgba(0,0,0,.4)",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Favorite
                        style={{
                          color: "red",
                        }}
                      />
                    </IconButton>
                    <Typography
                      level="body-sm"
                      sx={{
                        fontSize: "16px",
                        lineHeight: "1.5",
                        fontWeight: "md",
                        color: "neutral.300",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      12
                      <VisibilityIcon
                        sx={{ fontsize: 20, marginLeft: "5px" }}
                      />
                    </Typography>
                    <Box sx={{ width: 2, bgcolor: "divider" }} />
                    <Typography
                      sx={{
                        fontWeight: "md",
                        color: "neutral.300",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      8
                      <Favorite sx={{ fontsize: 20, marginLeft: "5px" }} />
                    </Typography>
                  </CardOverflow>
                </Card>
              </CssVarsProvider>
            );
          })}
        </Stack>
      </Container>
    </div>
  );
}
