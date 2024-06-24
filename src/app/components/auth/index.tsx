import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Box, Container, Fab, Stack, TextField } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import "../../css/login._form.css";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
// import assert from "assert";
// import { Definer } from "../../../lib/Definer";
// import MemberApiService from "../../apiServices/memberApiService";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
}));

export default function AuthenticationModal(props: any) {
  //   /**INITIALIZATIONS */
  const classes = useStyles();

  const [mb_nick, set_mb_nick] = useState<string>("");
  const [mb_phone, set_mb_phone] = useState<number>(0);
  const [mb_password, set_mb_password] = useState<string>("");
  /**Handlers */
  const handleUsername = (e: any) => {
    set_mb_nick(e.target.value);
  };
  const handlePhone = (e: any) => {
    set_mb_phone(e.target.value);
  };
  const handlePassword = (e: any) => {
    set_mb_password(e.target.value);
  };

  const handleSignupRequest = async () => {
    try {
      const is_fulfilled =
        mb_nick !== "" && mb_password !== "" && mb_phone !== 0;
      assert.ok(is_fulfilled, Definer.input_err1);

      const signup_data = {
        mb_nick: mb_nick,
        mb_phone: mb_phone,
        mb_password: mb_password,
      };

      const memberApiService = new MemberApiService();
      await memberApiService.signupRequest(signup_data);

      props.handleSignUpClose();
      window.location.reload();
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      const is_fulfilled = mb_nick !== "" && mb_password !== "";
      assert.ok(is_fulfilled, Definer.input_err1);

      const login_data = {
        mb_nick: mb_nick,
        mb_password: mb_password,
      };

      const memberApiService = new MemberApiService();
      await memberApiService.loginRequest(login_data);

      props.handleLoginClose();
      window.location.reload();
    } catch (err) {
      console.log(err);
      props.handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

  const passwordKeyPressHandler = (e: any) => {
    if (e.key === "Enter" && props.signUpOpen) {
      handleSignupRequest().then();
    } else if (e.key === "Enter" && props.loginOpen) {
      handleLoginRequest().then();
    }
  };
  return (
    <div className="contact_us">
      <Container className={classes.modal}>
        <Modal
          className="container"
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          // className={classes.modal}
          open={props.signUpOpen}
          onClose={props.handleSignUpClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={props.signUpOpen}>
            <Stack className={"container_form"} style={{}}>
              <Stack className="form">
                <h2>Sign-Up Form</h2>
                <Box className="input_box" onChange={handleUsername}>
                  <input type="text" name="" />
                  <span> Name</span>
                </Box>

                <Box className="input_box" onChange={handlePhone}>
                  <input type="text" name="" />
                  <span>phone</span>
                </Box>
                <Box
                  className="input_box"
                  onChange={handlePassword}
                  onKeyDown={passwordKeyPressHandler}
                >
                  <input type="paasword" name="" />
                  <span>Password</span>
                </Box>

                <Box className="input_box" onClick={handleSignupRequest}>
                  <input className="submit" type="submit" value="sign-up" />
                </Box>
              </Stack>
            </Stack>
          </Fade>
        </Modal>

        {/*@ts-ignore*/}
        <Modal
          className="container"
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={props.loginOpen}
          onClose={props.handleLoginClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          
        >
          <Fade in={props.loginOpen}>
            <Stack className={"container_form"}>
              <Stack className="form">
                <h2>Login Form</h2>

                <Box className="input_box" onChange={handleUsername}>
                  <input type="text" name="" />
                  <span> Name</span>
                </Box>
                <Box
                  className="input_box"
                  onChange={handlePassword}
                  onKeyDown={passwordKeyPressHandler}
                >
                  <input type="paasword" name="" />
                  <span>Password</span>
                </Box>

                <Box className="input_box" onClick={handleLoginRequest}>
                  <input className="submit" type="submit" value="Login-in" />
                </Box>
              </Stack>
            </Stack>
          </Fade>
        </Modal>
      </Container>
    </div>
  );
}
