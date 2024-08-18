import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../../css/blog.css";
import { TargetArticles } from "./targetArticles"; //this
import CommunityApiService from "../../apiServices/blogApiService";
import { BoArticle, SearchArticlesObj } from "../../../types/boArticle";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { setTargetBoArticles } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { retrieveTargetBoArticles } from "./selector";

/** REDUX Slice */
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetBoArticles: (data: BoArticle[]) =>
    dispatch(setTargetBoArticles(data)),
});
/** REDUX SELECTOR */
const targetBoArticlesRetriever = createSelector(
  retrieveTargetBoArticles,
  (targetBoArticles) => ({
    targetBoArticles,
  })
);
export function BlogPage(props: any) {
  /**INITIALIZATION */

  const { setTargetBoArticles } = actionDispatch(useDispatch());
  const { targetBoArticles } = useSelector(targetBoArticlesRetriever);

  const [value, setValue] = React.useState("1");

  const [searchArticlesObj, setSerachArticlesObj] = useState<SearchArticlesObj>(
    {
      bo_id: "all",
      page: 1,
      limit: 4,
    }
  );
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());

  useEffect(() => {
    const communityService = new CommunityApiService();
    communityService
      .getTargetArticles(searchArticlesObj)
      .then((data) => setTargetBoArticles(data))
      .catch((err) => console.log(err));
  }, [searchArticlesObj, articlesRebuild]);

  /**HANDLERS */

  // const handleChange = (event: any, newValue: string) => {
  //   searchArticlesObj.page = 1;
  //   switch (newValue) {
  //     case "1":
  //       searchArticlesObj.bo_id = "all";
  //       break;
  //     case "2":
  //       searchArticlesObj.bo_id = "celebrity";
  //       break;
  //     case "3":
  //       searchArticlesObj.bo_id = "evaluation";
  //       break;
  //     case "4":
  //       searchArticlesObj.bo_id = "story";
  //       break;
  //     default:
  //       searchArticlesObj.bo_id = "all"; // Default case qo'shild
  //   }
  //   setSerachArticlesObj({ ...searchArticlesObj });
  //   setValue(newValue);
  // };
  // const handlePaginationChange = (event: any, value: number) => {
  //   searchArticlesObj.page = value;
  //   setSerachArticlesObj({ ...searchArticlesObj });
  // };

  const handleChange = (event: any, newValue: string) => {
    const updatedSearchArticlesObj = { ...searchArticlesObj };
    updatedSearchArticlesObj.page = 1;
    switch (newValue) {
      case "1":
        updatedSearchArticlesObj.bo_id = "all";
        break;
      case "2":
        updatedSearchArticlesObj.bo_id = "celebrity";
        break;
      case "3":
        updatedSearchArticlesObj.bo_id = "evaluation";
        break;
      case "4":
        updatedSearchArticlesObj.bo_id = "story";
        break;
      default:
        updatedSearchArticlesObj.bo_id = "all";
    }
    setSerachArticlesObj(updatedSearchArticlesObj);
    setValue(newValue);
  };
  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    searchArticlesObj.page = value;
    setSerachArticlesObj({ ...searchArticlesObj });
  };

  return (
    <div className={"community_page"}>
      <div className={"community_frame"}>
        <Container sx={{ mt: "50px", mb: "50px" }}>
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <Stack
              className={"community_all_frame"}
              inputMode={"text"}
              style={{ border: "1px solid #fff" }}
            >
              <TabContext value={value}>
                <Box className={"article_tabs"}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      // value={value}
                      aria-label="basic tabs example"
                      style={{ borderColor: "#" }}
                    >
                      <Tab label="All Articles" value={"1"} />
                      <Tab label="Product Review" value={"2"} />
                      <Tab label="Store Evaluation" value={"3"} />
                      <Tab label="Story" value={"4"} />
                    </TabList>
                  </Box>
                </Box>
                <Box className={"article_main"} overflow={"hidden"}>
                  <TabPanel value={"1"}>
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                  <TabPanel value={"2"}>
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                  <TabPanel value={"3"}>
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                  <TabPanel value={"4"}>
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                </Box>

                <Box className={"article_bott"}>
                  <Pagination
                    count={
                      searchArticlesObj.page >= 3
                        ? searchArticlesObj.page + 1
                        : 3
                    }
                    page={searchArticlesObj.page}
                    renderItem={(item) => (
                      <PaginationItem
                        components={{
                          previous: ArrowBackIcon,
                          next: ArrowForwardIcon,
                        }}
                        {...item}
                        color={"secondary"}
                      />
                    )}
                    onChange={handlePaginationChange}
                  />
                </Box>
              </TabContext>
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
