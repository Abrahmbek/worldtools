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
import { MemberPosts } from "./memberPosts"; //tjids
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import { MySettings } from "./mySettings"; ///this
// Others
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TuiEditor } from "../../components/tuiEditor/TuiEditor"; //this
import TViewer from "../../components/tuiEditor/TViewer"; //this

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  setChosenMember,
  setChosenMemberBoArticles,
  setChosenSingleBoArticle,
} from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import {
  retrieveChosenMember,
  retrieveChosenMemberBoArticles,
  retrieveChosenSingleBoArticle,
} from "./selector";
import { Member } from "../../../types/user";
import { BoArticle, SearchMemeberArticlesObj } from "../../../types/boArticle";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import CommunityApiService from "../../apiServices/blogApiService";
import MemberApiService from "../../apiServices/memberApiService";
import { verifiedMemberData } from "../../apiServices/verify";
import { serverApi } from "../../../lib/config";

/** REDUX Slice */
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
  setChosenMemberBoArticles: (data: BoArticle[]) =>
    dispatch(setChosenMemberBoArticles(data)),
  setChosenSingleBoArticle: (data: BoArticle) =>
    dispatch(setChosenSingleBoArticle(data)),
});
/** REDUX SELECTOR */
const chosenMemberRetriever = createSelector(
  retrieveChosenMember,
  (chosenMember) => ({
    chosenMember,
  })
);
const chosenMemberBoArticlesRetriever = createSelector(
  retrieveChosenMemberBoArticles,
  (chosenMemberBoArticles) => ({
    chosenMemberBoArticles,
  })
);
const chosenSingleBoArticleRetriever = createSelector(
  retrieveChosenSingleBoArticle,
  (chosenSingleBoArticle) => ({
    chosenSingleBoArticle,
  })
);

export function VisitMyPage(props: any) {
  /**INITIALIZATIONS */

  const {
    setChosenMember,
    setChosenMemberBoArticles,
    setChosenSingleBoArticle,
  } = actionDispatch(useDispatch());
  const { chosenMember } = useSelector(chosenMemberRetriever);
  const { chosenMemberBoArticles } = useSelector(
    chosenMemberBoArticlesRetriever
  );
  const { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriever);
  const [value, setValue] = useState("1");
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
  const [followRebuild, setFollowRebuild] = useState<boolean>(false);
  const [memberArticleSearchObj, setMemberArticlesSearchObj] =
    useState<SearchMemeberArticlesObj>({ mb_id: "none", page: 1, limit: 4 });

  useEffect(() => {
    if (!verifiedMemberData) {
      sweetFailureProvider("please Login first", true, true);
    }

    const communityService = new CommunityApiService();
    const memberService = new MemberApiService();

    communityService
      .getMemberCommunityArticles(memberArticleSearchObj)
      .then((data) => setChosenMemberBoArticles(data))
      .catch((err) => console.log(err));

    memberService
      .getChosenMember(verifiedMemberData?._id)
      .then((data) => setChosenMember(data))
      .catch((err) => console.log(err));
  }, [memberArticleSearchObj, articlesRebuild, followRebuild]);

  /**  HANDLERS */
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  const handlePaginationChange = (event: any, value: number) => {
    memberArticleSearchObj.page = value;
    setMemberArticlesSearchObj({ ...memberArticleSearchObj });
  };
  const renderChosenArticleHandler = async (art_id: string) => {
    try {
      const communityService = new CommunityApiService();
      communityService
        .getChosenArticle(art_id)
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("5");
        })
        .catch((err) => console.log(err));
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
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
                      src={
                        chosenMember?.mb_image
                          ? `${serverApi}/${chosenMember?.mb_image}`
                          : "/auth/odamcha.svg"
                      }
                      className={"order_user_avatar"}
                      alt="rasm"
                    />
                  </div>
                  <span className="order_user_name">
                    {" "}
                    {verifiedMemberData?.mb_nick}
                  </span>
                  <span className="order_user_prof">
                    {" "}
                    {verifiedMemberData?.mb_type}
                  </span>
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
                    Followers: {verifiedMemberData?.mb_subscriber_cnt} <br />
                    Following: {verifiedMemberData?.mb_follow_cnt}
                  </p>
                </Box>
                <p className="user_desc">
                  {" "}
                  {verifiedMemberData?.mb_description ??
                    "No additional information entered"}
                </p>
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
                    onChange={handleChange}
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
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    style={{
                      flexDirection: "column",
                      cursor: "pointer",
                    }}
                    value={"4"}
                    component={() => (
                      <div
                        className={`menu_box ${value}`}
                        onClick={() => setValue("1")}
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
                    <MemberPosts
                      chosenMemberBoArticles={chosenMemberBoArticles}
                      renderChosenArticleHandler={renderChosenArticleHandler}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                    <Stack
                      sx={{ my: "40px" }}
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Box className="bottom_box">
                        <Pagination
                          count={
                            memberArticleSearchObj.page >= 3
                              ? memberArticleSearchObj.page + 1
                              : 3
                          }
                          page={memberArticleSearchObj.page}
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
                    </Stack>
                  </Box>
                </TabPanel>
                <TabPanel value={"2"}>
                  <Box className={"menu_name"}>Followers</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowers
                      actions_enabled={true}
                      setFollowRebuild={setFollowRebuild}
                      followRebuild={followRebuild}
                      mb_id={verifiedMemberData?._id}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value={"3"}>
                  <Box className={"menu_name"}>Following</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowing
                      actions_enabled={true}
                      setFollowRebuild={setFollowRebuild}
                      followRebuild={followRebuild}
                      mb_id={verifiedMemberData?._id}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value={"4"}>
                  <Box className={"menu_name"}>Add Article</Box>
                  <Box className={"write_content"}>
                    <TuiEditor
                      setValue={setValue}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value={"5"}>
                  <Box className={"menu_name"}> Choosen Article </Box>
                  <Box className={"menu_content"}>
                    <TViewer chosenSingleBoArticle={chosenSingleBoArticle} />
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
