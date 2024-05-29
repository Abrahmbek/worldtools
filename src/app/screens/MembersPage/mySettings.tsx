import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Box, Stack } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";


export function MySettings(props: any) {
  /**INITIALIZATIONS */


  /**  HANDLERS */

 

  return (
    <Stack className="my_settings_page">
      <Box className="member_media_frame">
        <img
          // src={file}
          className="mb_image"
          style={{ borderRadius: "50%" }}
          width={"100px"}
          height={"100px"}
          alt=""
        />
        <div className="media-change_box">
          <span>Upload picture</span>
          <p> you can upload: jpg, jpeg, png</p>
          <div className="up_del_box">
            <Button
              component="label"
              style={{ minWidth: "0" }}
              // onChange={handleImagePreviewer}
            >
              <CloudDownloadIcon />
              <input type="file" hidden />
            </Button>
          </div>
        </div>
      </Box>
      <Box className="input_frame">
        <div className="long_input">
          <label className="spec_label">Name</label>
          <input
            className="spec_input mb_nick"
            type="text"
            // placeholder={verifiedMemberData?.mb_nick}
            name="mb_nick"
            // onChange={changeMemberNickHandler}
          />
        </div>
      </Box>
      <Box className="input_frame">
        <div className="short_input">
          <label className="spec_label">Phone Number</label>
          <input
            className="spec_input mb_phone"
            type="text"
            //placeholder={verifiedMemberData?.mb_phone}
            name="mb_phone"
            // onChange={changeMemberPhoneHandler}
          />
        </div>
        <div className="short_input">
          <label className="spec_label">Address</label>
          <input
            className="spec_input mb_phone"
            type="text"
            placeholder={"Address not found"}
            name="mb_address"
            // onChange={changeMemberAddressHandler}
          />
        </div>
      </Box>
      <Box className="input_frame">
        <div className="long_input">
          <label className="spec_label">Information</label>
          <textarea
            className="spec_input mb_phone"
            placeholder={"not found"}
            name="mb_description"
            //onChange={changeMemberDescriptionHandler}
          />
        </div>
      </Box>
      <Box display={"flex"} justifyContent={"flex-end"} sx={{ mt: "25px" }}>
        <Button
          variant={"contained"}
          //      onClick={handleSubmitButton}
        >
          {" "}
          Save{" "}
        </Button>
      </Box>
    </Stack>
  );
}
