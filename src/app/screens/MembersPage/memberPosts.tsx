import { Box, Stack } from "@mui/material";
import React, { ChangeEvent, useRef, useState } from "react";
//import moment from "moment";
import Checkbox from "@mui/material/Checkbox";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export function MemberPosts(props: any) {
  return (
    <Box className={"post_content"}>
      {["1", "2", "3"].map(() => {
        const image_path = "/icons/odamcha.svg";
        return (
          <Stack
            className="all_article_box"
            sx={{ cursor: "pointer" }}
            //onClick={() => renderChosenArticleHandler(article?._id)}
          >
            <Box
              className="all_article_img"
              sx={{
                backgroundImage: `url(${"/icons/default_user1.svg"})`,
              }}
            ></Box>
            <Box className="all_article_container">
              <Box alignItems={"center"} display={"flex"}>
                <img
                  src={"/icons/odamcha.svg"}
                  alt=""
                  width={"35px"}
                  height={"35px"}
                  style={{ borderRadius: "50%", backgroundSize: "cover" }}
                />
                <span className="all_article_author_user">zarina</span>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{ mt: "15px" }}
              >
                <span className="all_article_title">very nice</span>
                <p className="all_article_desc">this is very strong </p>
              </Box>
              <Box>
                <Box
                  className="article_share"
                  style={{ width: "100%", height: "auto" }}
                  sx={{ mb: "10px" }}
                >
                  <Box
                    className="article_share_main"
                    style={{
                      color: "#fff",
                      marginLeft: "150px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span>2024.05.20</span>
                    <Checkbox
                      sx={{ ml: "40px" }}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite style={{ color: "red" }} />}
                      //     checked={
                      //       article?.me_liked && article.me_liked[0]?.my_favorite
                      //         ? true
                      //         : false
                      //     }
                      //onClick={targetLikeHandler}
                    />
                    <span style={{ marginRight: "18px" }}>34</span>

                    <RemoveRedEyeIcon />
                    <span style={{ marginLeft: "18px" }}>22</span>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Stack>
        );
      })}
    </Box>
  );
}
