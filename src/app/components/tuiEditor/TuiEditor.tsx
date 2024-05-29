import React, { useCallback, useState } from "react";
import { useRef } from "react";
//import { Editor } from "@toast-ui/react-editor";
//import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Stack,
  Typography,
  Select,
  TextField,
} from "@mui/material";

import { useHistory } from "react-router-dom";

export function TuiEditor(props: any) {
  /**INITIALIZATIONS */

  /**HANDLERS */
  const editorRef = useRef();
  return (
    <Stack>
      <Stack
        direction="row"
        style={{ margin: "40px" }}
        justifyContent={"space-between"}
      >
        <Box className="form_row" style={{ width: "300px" }}>
          <Typography
            style={{ color: "rgb(225 255 233)", margin: "10px" }}
            variant="h3"
          >
            Category
          </Typography>
          <FormControl sx={{ width: "100%", background: "white" }}>
            <Select
              //value={communityArticleData.bo_id}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              //onChange={changeCategoryHandler}
            >
              <MenuItem value="">
                <span>Choose Category</span>
              </MenuItem>
              <MenuItem value={"celebrity"}>Famous</MenuItem>
              <MenuItem value={"evaluation"}>Store evaluation</MenuItem>
              <MenuItem value={"story"}>My Story</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className="form_row" style={{ width: "300px" }}>
          <Typography
            style={{ color: "rgb(225 255 233)", margin: "10px" }}
            variant="h3"
          >
            Topic
          </Typography>
          <TextField
            id="filled-basic"
            label="Topic"
            variant="filled"
            sx={{ width: "300px", background: "white" }}
            // onChange={changeTitleHandler}
          />
        </Box>
      </Stack>

      {/* <Editor
        initialValue="  "
        placeholder="Type Here"
        previewStyle="vertical"
        height="640px"
        initialEditType="wysiwyg"
        useCommandShortcut={false}
        // @ts-ignore
        ref={editorRef}
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["image", "table", "link"],
          ["ul", "ol", "task"],
        ]}
        hooks={{
          addImageBlobHook: async (image: any, callback: any) => {
            return false;
          },
        }}
        events={{
          load: function (param: any) {},
        }}
      /> */}
      <Stack direction="row" justifyContent={"center"}>
        <Button
          variant="contained"
          color="primary"
          style={{ width: "250px", height: "45px", margin: "10px" }}
          //onClick={handleRegisterButton}
        >
          Register
        </Button>
      </Stack>
    </Stack>
  );
}
