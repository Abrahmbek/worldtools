import React from "react";
import { Box, Checkbox, Link, Stack } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
//import moment from "moment";

export function TargetArticles(props: any) {
  const { setArticlesRebuild } = props;

  return (
    <div>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
      >
        {props.targetBoArticles?.map((article: any, index: string) => {
          const art_image_url = "/public/icons/default_user1.svg";

          return (
            <Stack className="article_wrapper">
              <Link
                className={"all_article_box"}
                sx={{ textDecoration: "none" }}
                // href={`/member-page/other?mb_id=${article.mb_id}&art_id=${article._id}`}
              >
                <Box
                  className={"all_article_img"}
                  sx={{ backgroundImage: `url(${"/product/set1.webp"})` }}
                ></Box>
                <Box className={"all_article_container"}>
                  <Box alignItems={"center"} display={"flex"}>
                    <img
                      src={"/icons/default_user1.svg"}
                      width={"60px"}
                      style={{
                        borderRadius: "20%",
                        backgroundSize: "cover",
                        marginLeft: "-40px",
                      }}
                      alt=""
                    />
                    <span className={"all_article_auth_user"}>user</span>
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    sx={{ mt: "15px" }}
                  >
                    <span className={"all_article_title"}>jvery nice</span>
                    <p className={"all_article_desc"}>dkshd</p>
                  </Box>
                  <Box>
                    <Box
                      className="article_share"
                      style={{ width: "100%", height: "auto" }}
                    >
                      <Box className="article_share_main">
                        <span> 2020.10.19</span>
                        <Checkbox
                          sx={{ ml: "40px" }}
                          icon={<FavoriteBorder />}
                          id={article?._id}
                          checkedIcon={<Favorite style={{ color: "red" }} />}
                        />

                        <span style={{ marginRight: "18px" }}>3</span>
                        <RemoveRedEyeIcon />
                        <span style={{ marginLeft: "10px" }}>5</span>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Link>
            </Stack>
          );
        })}
      </Stack>
    </div>
  );
}
