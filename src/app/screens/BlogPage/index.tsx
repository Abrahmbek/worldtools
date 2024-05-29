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

const targetBoArticles = [1, 2, 3, 4];
export function BlogPage(props: any) {
  /**INITIALIZATION */
  const [value, setValue] = React.useState("1");
  /**HANDLERS */
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  const handlePaginationChange = (event: any, value: number) => {
    console.log(value);
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
                    <TargetArticles targetBoArticles={targetBoArticles} />
                  </TabPanel>
                  <TabPanel value={"2"}>
                    <TargetArticles targetBoArticles={targetBoArticles} />
                  </TabPanel>
                  <TabPanel value={"3"}>
                    <TargetArticles targetBoArticles={targetBoArticles} />
                  </TabPanel>
                  <TabPanel value={"4"}>
                    <TargetArticles targetBoArticles={targetBoArticles} />
                  </TabPanel>
                </Box>

                <Box className={"article_bott"}>
                  <Pagination
                    count={3}
                    page={1}
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
