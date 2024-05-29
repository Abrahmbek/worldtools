import { Box, Pagination, PaginationItem, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

/** REDUX Slice */

/** REDUX SELECTOR */

const followers = [
  { mb_nick: "john", following: true },
  { mb_nick: "john", following: true },
  { mb_nick: "john", following: true },
];
export function MemberFollowers(props: any) {
  /**INITIALIZATION */

  /**HANDLERS */

  const handlePaginationChange = (event: any, value: number) => {};

  return (
    <Stack>
      {followers.map((follower) => {
        const image_url = "/icons/odamcha.svg";
        return (
          <Box className="follow_box">
            <Avatar
              style={{ cursor: "pointer" }}
              alt=""
              src={image_url}
              sx={{ width: 89, height: 89 }}
            />
            <div
              style={{
                width: "400px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "25px",
                height: "85%",
              }}
            >
              <span className="username_text">User</span>
              <span className="name_text" style={{ cursor: "pointer" }}>
                {follower.mb_nick}
              </span>
            </div>
            <Stack className="btn_follow">
              {props.actions_enabled &&
                (follower.following ? (
                  <Button
                    className="following-already"
                    style={{
                      background: "#68C5CB",
                      color: "#ffffff",
                      borderRadius: "50px",
                      marginTop: "18px",
                      width: "160px",
                    }}
                  >
                    FOLLOWING
                  </Button>
                ) : (
                  <Button
                    variant={"contained"}
                    startIcon={
                      <img
                        src="/icons/Group.svg"
                        alt=""
                        style={{ width: "40px" }}
                      />
                    }
                    className="follow_btn"
                  >
                    Follow Back
                  </Button>
                ))}
            </Stack>
          </Box>
        );
      })}
      <Stack
        sx={{ my: "40px" }}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box className="bottom_box">
          <Pagination
            count={3}
            page={3}
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
    </Stack>
  );
}
