import { Box, Pagination, PaginationItem, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import assert from "assert";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

/** REDUX Slice */

/** REDUX SELECTOR */

export function MemberFollowing(props: any) {
  /**INITIALIZATION */

  /**HANDLERS */

  const following = [
    { mb_nick: "john", followers: true },
    { mb_nick: "john", followers: true },
    { mb_nick: "john", followers: true },
  ];
  return (
    <Stack>
      {following.map((following) => {
        const image_url = "/icons/odamcha.svg";
        return (
          <Box className="follow_box">
            <Avatar
              alt=""
              src={image_url}
              sx={{ width: 89, height: 89 }}
              style={{ cursor: "pointer" }}
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
              <span
                className="name_text"
                style={{ cursor: "pointer" }}
                // onClick={() => visitMemberHandler(following?.follow_id)}
              >
                {following.mb_nick}
              </span>
            </div>
            {props.actions_enabled && (
              <Button
                variant={"contained"}
                startIcon={
                  <img
                    src="/icons/User.svg"
                    alt=""
                    style={{ width: "40px", marginLeft: "16px" }}
                  />
                }
                className="follow_cancel_btn"
                // onClick={(e) => unsubscribeHandler(e, following?.follow_id)}
              >
                Cancel
              </Button>
            )}
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
            // onChange={handlePaginationChange}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
