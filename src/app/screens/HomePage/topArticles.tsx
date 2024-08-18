import React, { useEffect, useState } from "react";
import { Avatar, Box, Container, Stack } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Typography } from "@mui/joy";
import { Link } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveBestArticles } from "./selector";
import { useSelector } from "react-redux";
import { BoArticle } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";
import "../../css/homepage.css";

import moment from "moment";
SwiperCore.use([Autoplay, Navigation, Pagination]);

/**REDUX SELECTOR */
const bestArticlesRetriever = createSelector(
  retrieveBestArticles,
  (bestArticles) => ({
    bestArticles,
  })
);
const TopArticles = (props: any) => {
  /**INITIALIZATION */

  const { bestArticles } = useSelector(bestArticlesRetriever);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const updateSlidesPerView = () => {
    if (window.innerWidth < 768) {
      // Set to 1 for mobile screens
      setSlidesPerView(1);
    } else {
      // Set to 3 for desktop screens
      setSlidesPerView(3);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", updateSlidesPerView);
    // Initial setup
    updateSlidesPerView();
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);
  return (
    <div
      className="articles_frame"
      // onClick={() => props.setPath(`/member-page}`)}
      style={{ marginBottom: "-270px" }}
    >
      <Container sx={{ overflow: "hidden" }} style={{ marginBottom: "-200px" }}>
        <Stack className="articles_main">
          <Box className="artTitle">
            <span className="article_category_title">{"mostly_read"}</span>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                color: "#fff",

                display: "flex",
                alignItems: "center",
              }}
            >
              <Link
                style={{ color: "#000", textDecoration: "none" }}
                to={"/blog"}
              >
                {"view_all"}
              </Link>

              <span style={{ margin: "5px 0  0 2px", color: "#000" }}>
                <ArrowForward />
              </span>
            </Link>
          </Box>

          <Swiper
            className={"articles_info swiper-wrapper"}
            slidesPerView={slidesPerView}
            // centeredSlides={true}
            spaceBetween={30}
            autoplay={{ delay: 2000, disableOnInteraction: true }}
            navigation
          >
            {bestArticles.map((article: BoArticle) => {
              const art_image_url = article?.art_image
                ? `${serverApi}/${article.art_image}`
                : "/set/bread-new.jpg";
              const art_member_url = article?.member_data?.mb_image
                ? `${serverApi}/${article?.member_data?.mb_image}`
                : "/icons/default_user.svg";
              const formattedCreatedAt = moment(article.createdAt).format(
                "YYYY-MM-DD HH:mm"
              );
              const truncatedArtContent =
                article?.art_content?.length > 30
                  ? article?.art_content?.substring(0, 30) + "..."
                  : article?.art_content;
              function removePTags(data: any) {
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = data;

                // Get the text content without <p> tags
                const textWithoutPTags = tempDiv.textContent;

                return textWithoutPTags;
              }
              const content = removePTags(truncatedArtContent);
              return (
                <SwiperSlide key={article._id} className="article_info_frame">
                  <Link
                    className="all_article_box"
                    style={{ textDecoration: "none", color: "#fff" }}
                    to={`member-page/other?mb_id=${article.mb_id}&art_id=${article._id}`}
                  >
                    <div className="articles_img">
                      <img src={art_image_url} className="articleImg" alt="" />
                    </div>
                    <Box className="articles_desc">
                      <Box className="articles_bott">
                        <Box className="articles_left">
                          <div className="article_author">
                            <Avatar
                              src={art_member_url}
                              alt=""
                              sx={{
                                marginLeft: "1rem",
                                width: "60px",
                                backgroundSize: "contain",
                                height: "50px",
                                borderRadius: "50%",
                              }}
                            />
                            <span> {article?.member_data?.mb_nick}</span>
                          </div>

                          <Box className="article_title">{content}</Box>
                        </Box>
                        <Box className="article_right">
                          <Box className="article_createdAt">
                            {formattedCreatedAt}
                          </Box>
                          <Box
                            //   variant="soft"
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 1.5,
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: "md",
                                color: "text.secondary",
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              {article.art_views}
                              <VisibilityIcon
                                sx={{ fontSize: 20, marginLeft: "5px" }}
                              />
                            </Typography>
                            <Box sx={{ width: 2, bgcolor: "divider" }} />
                            <Typography
                              sx={{
                                fontWeight: "md",
                                color: "text.secondary",
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              <div>{article.art_likes}</div>
                              <FavoriteIcon
                                sx={{ fontSize: 20, marginLeft: "5px" }}
                              />
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
      </Container>
    </div>
  );
};

export default TopArticles;
