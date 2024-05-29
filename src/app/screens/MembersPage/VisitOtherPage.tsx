import React, { useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import {
  Box,
  Container,
  Tab,
  Stack,
  Pagination,
  PaginationItem,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
//import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
//import SettingsIcon from "@mui/icons-material/Settings";
import { MemberPosts } from "./memberPosts"; //this
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import TViewer from "../../components/tuiEditor/TViewer"; //this
//import { MySettings } from "./mySettings.tsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import assert from "assert";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

/** REDUX Slice */

/** REDUX SELECTOR */

export function VisitOtherPage(props: any) {
  /**INITIALIZATIONS */

  const [value, setValue] = React.useState("1");
  return (
    <div className="my_page">
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <Stack className="my_page_frame">
          <TabContext value={value}>
            <Stack className={"my_page_right"}>
              <Box className={"order_info_box"}>
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
                    Followers: {3}
                    Following: {4}
                  </p>
                </Box>
                <p className="user_desc">"qo'shimcha malumot kiritilmagan</p>
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  sx={{ mt: "10px" }}
                >
                  <TabList aria-label="lab API tabs example">
                    {true ? (
                      <Tab
                        style={{ flexDirection: "column" }}
                        value={"4"}
                        component={() => (
                          <Button
                            value={"4"}
                            variant={"contained"}
                            style={{ backgroundColor: "#30945e" }}
                          >
                            UNFOLLOW
                          </Button>
                        )}
                      />
                    ) : (
                      <Tab
                        style={{ flexDirection: "column" }}
                        value={"4"}
                        component={() => (
                          <Button
                            variant={"contained"}
                            style={{ backgroundColor: "#30945e" }}
                          >
                            FOLLOW
                          </Button>
                        )}
                      />
                    )}
                  </TabList>
                </Box>
              </Box>

              <Box className="my_page_menu">
                <TabList aria-label="lab API tabs example">
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"1"}
                    component={() => (
                      <div className={`menu_box`} onClick={() => setValue("1")}>
                        <img src="/icons/Pencil.svg" alt="" />
                        <span>My Articles</span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"2"}
                    component={() => (
                      <div className={`menu_box ${value}`}>
                        <img src="/icons/Group.svg" alt="" />
                        <span>Followers</span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"3"}
                    component={() => (
                      <div className={`menu_box ${value}`}>
                        <img src="/icons/User.svg" alt="" />
                        <span>Following</span>
                      </div>
                    )}
                  />
                </TabList>
              </Box>
            </Stack>
            <Stack className="my_page_left">
              <Box display={"flex"} flexDirection={"column"}>
                <TabPanel value={"1"}>
                  <Box className="menu_name"> Articles</Box>
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
                          page={2}
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
                    <MemberFollowers actions_enabled={false} />
                  </Box>
                </TabPanel>
                <TabPanel value={"3"}>
                  <Box className={"menu_name"}>Following</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowing actions_enabled={false} />
                  </Box>
                </TabPanel>

                <TabPanel value={"4"}>
                  <Box className={"menu_name"}> Choosen Article </Box>
                  <Box className={"menu_content"}>
                    <TViewer />
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
