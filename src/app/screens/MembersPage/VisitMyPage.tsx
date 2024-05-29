import React, { ChangeEvent, useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import { Box, Container, Tab, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
//import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import SettingsIcon from "@mui/icons-material/Settings";
import { MemberPosts } from "./memberPosts";    //tjids
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import { MySettings } from "./mySettings";  ///this
// Others
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TuiEditor } from "../../components/tuiEditor/TuiEditor";  //this
import TViewer from "../../components/tuiEditor/TViewer";  //this

// REDUX

/** REDUX Slice */

export function VisitMyPage(props: any) {
  /**INITIALIZATIONS */
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="my_page">
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <Stack className="my_page_frame">
          <TabContext value={value}>
            <Stack className={"my_page_right"}>
              <Box className={"order_info_box"}>
                <a onClick={() => setValue("6")} className={"settings_btn"}>
                  <SettingsIcon />
                </a>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <div className="order_user_img">
                    <img
                      src={"/auth/odamcha.svg"}
                      className={"order_user_avatar"}
                      alt="rasm"
                    />
                  </div>
                  <span className="order_user_name">zarina</span>
                  <span className="order_user_prof">user</span>
                </Box>
                <Box className="user_media_box">
                  <FacebookIcon />
                  <InstagramIcon />
                  <TelegramIcon />
                  <YouTubeIcon />
                </Box>
                <Box
                  className={"user_media_box_follow"}
                  sx={{
                    flexDirection: "row",
                  }}
                >
                  <p className={"follows"}>
                    Followers: {3} <br />
                    Following: {2}
                  </p>
                </Box>
                <p className="user_desc">{"qo'shimcha malumot kiritilmagan"}</p>
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  sx={{ mt: "10px" }}
                >
                  <TabList
                    orientation="vertical"
                    variant="scrollable"
                    sx={{
                      borderRight: 1,
                      borderColor: "divider",
                      width: "95%",
                    }}
                    aria-label="Vertical tabs example"
                  >
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={4}
                      component={() => (
                        <Button
                          variant={"contained"}
                          onClick={() => setValue("4")}
                        >
                          Add your Article
                        </Button>
                      )}
                    />
                  </TabList>
                </Box>
              </Box>

              <Box className="my_page_menu">
                <TabList aria-label="lab API tabs example">
                  <Tab
                    style={{
                      flexDirection: "column",
                      cursor: "pointer",
                    }}
                    value={"4"}
                    component={() => (
                      <div
                        className={`menu_box ${value}`}
                        onClick={() => setValue("2")}
                      >
                        <img src="/icons/Pencil.svg" alt="" />
                        <span style={{ cursor: "pointer" }}>My Articles</span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value="2"
                    component={() => (
                      <div
                        className={`menu_box ${value}`}
                        onClick={() => setValue("2")}
                      >
                        <img src="/icons/Group.svg" alt="" />
                        <span style={{ cursor: "pointer" }}>Follower</span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value="3"
                    component={() => (
                      <div
                        className={`menu_box ${value}`}
                        onClick={() => setValue("3")}
                      >
                        <img src="/icons/User.svg" alt="" />
                        <span style={{ cursor: "pointer" }}>Following</span>
                      </div>
                    )}
                  />
                </TabList>
              </Box>
            </Stack>
            <Stack className="my_page_left">
              <Box display={"flex"} flexDirection={"column"}>
                <TabPanel value={"1"}>
                  <Box className="menu_name">My Articles</Box>
                  <Box className="menu_content">
                    <MemberPosts />
                    <Stack
                      sx={{ my: "40px" }}
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Box className="bottom_box">
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
                        />
                      </Box>
                    </Stack>
                  </Box>
                </TabPanel>
                <TabPanel value={"2"}>
                  <Box className={"menu_name"}>Followers</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowers actions_enabled={true} />
                  </Box>
                </TabPanel>
                <TabPanel value={"3"}>
                  <Box className={"menu_name"}>Following</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowing actions_enabled={true} />
                  </Box>
                </TabPanel>
                <TabPanel value={"4"}>
                  <Box className={"menu_name"}>Add Article</Box>
                  <Box className={"write_content"}>
                    <TuiEditor />
                  </Box>
                </TabPanel>
                <TabPanel value={"5"}>
                  <Box className={"menu_name"}> Choosen Article </Box>
                  <Box className={"menu_content"}>
                    <TViewer />
                  </Box>
                </TabPanel>
                <TabPanel value={"6"}>
                  <Box className={"menu_name"}>My Setting</Box>
                  <Box className={"write_content"}>
                    <MySettings />
                  </Box>
                </TabPanel>
              </Box>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}