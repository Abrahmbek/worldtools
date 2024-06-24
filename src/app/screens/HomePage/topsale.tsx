import { Box, Button, Container, Stack } from "@mui/material";
import React, { useRef } from "react";

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

// REDUX
import { useSelector } from "react-redux";

import { createSelector } from "reselect";
import { Shop } from "../../../types/user";
import { retrieveTopSaleShop } from "../../screens/HomePage/selector";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { verifiedMemberData } from "../../apiServices/verify";
import MemberApiService from "../../apiServices/memberApiService";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { useHistory } from "react-router-dom";

// REDUX SELECTOR
const topSaleShopRetriever = createSelector(
  retrieveTopSaleShop,
  (topSaleShop) => ({
    topSaleShop,
  })
);

//const topSaleShop = Array.from(Array(9).keys());
export function TopSale() {
  /**INITIALIZATIONS */
  const history = useHistory();
  const refs: any = useRef([]);
  const { topSaleShop } = useSelector(topSaleShopRetriever);
  console.log("topsaleshops:::", topSaleShop);

  /* HANDLERS*/
  const chosenShopHandler = (id: string) => {
    history.push(`/shop/${id}`);
  };
  /* Related for Like*/

  const targetLikeTop = async (e: any, id: string) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: id,
          group_type: "member",
        });
      assert.ok(like_result, Definer.general_err1);

      if (like_result.like_status > 0) {
        e.target.style.fill = "red";
        refs.current[like_result.like_ref_id].innerHTML++;
      } else {
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
      }
      sweetTopSmallSuccessAlert("success", 700, false);
    } catch (err: any) {
      console.log("targetLikeTop, EROOR:", err);
      sweetErrorHandling(err).then();
    }
  };
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
              TopSale <span> Shops</span>
            </h1>
          </Stack>
        </Stack>
        <Stack className="sale_wrapper">
          {topSaleShop.map((ele: Shop) => {
            const image_path = `${serverApi}/${ele.mb_image}`;
            console.log("Imagess:::", ele);
            return (
              <CssVarsProvider key={ele._id}>
                <Card
                  onClick={() => chosenShopHandler(ele._id)}
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
                    <img
                      className="sale_wrap_img"
                      src={image_path}
                      loading="lazy"
                      alt=""
                    />
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
                      {ele.mb_address}
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
                        onClick={(e) => targetLikeTop(e, ele._id)}
                        style={{
                          fill:
                            ele?.me_liked && ele?.me_liked[0]?.my_favorite
                              ? "red"
                              : "white",
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
                      {ele.mb_views}
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
                      <div ref={(element) => (refs.current[ele._id] = element)}>
                        {ele.mb_likes}
                      </div>

                      <Favorite
                        sx={{ fontsize: 20, marginLeft: "5px", color: "red" }}
                      />
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
