import { Avatar, Box, Stack } from "@mui/material";
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import SendIcon from "@mui/icons-material/Send";

import { verifiedMemberData } from "../../apiServices/verify";
import { RippleBadge } from "./styled";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import { Definer } from "../../../lib/Definer";
import assert from "assert";
import { SocketContext } from "../../context/socket";
import { ChatGreetMsg, ChatInfoMsg, ChatMessage } from "../../../types/others";
import "./chat.css";

const NewMessage = (data: any) => {
  if (data.new_message.mb_id === verifiedMemberData?._id) {
    return (
      <Box
        flexDirection={"row"}
        style={{ display: "flex" }}
        alignItems={"flex-end"}
        justifyContent={"flex-end"}
        sx={{ m: "10px 0px" }}
      >
        <div
          style={{
            backgroundColor: "#3FBFB4",
            borderRadius: "30px",
            color: "#fff",

            padding: "0.5rem",
          }}
          className="msg_right"
        >
          {data.new_message.msg}
        </div>
      </Box>
    );
  } else {
    return (
      <Box
        flexDirection={"row"}
        style={{ display: "flex" }}
        sx={{ m: "10px 0px" }}
      >
        <Avatar
          alt={data.new_message.mb_nick}
          src={data.new_message.mb_image}
        />
        <div className="msg_left">{data.new_message.msg}</div>
      </Box>
    );
  }
};
const SocketChats = () => {
  // INITIALIZATION
  const [messageList, setMessageList] = useState([]);
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const textInput: any = useRef(null);
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    socket.connect();

    socket?.on("connect", function () {
      console.log("CLIENT: connected");
    });

    socket?.on("newMsg", (new_message: ChatMessage) => {
      console.log("CLIENT: new message");
      messageList.push(
        //@ts-ignore
        <NewMessage new_message={new_message} key={messageList.length} />
      );
      setMessageList([...messageList]);
    });

    socket?.on("greetMsg", (msg: ChatGreetMsg) => {
      console.log("CLIENT: greet message");
      messageList.push(
        //@ts-ignore
        <p
          style={{
            textAlign: "center",
            fontSize: "large",
            fontFamily: "serif",
          }}
        >
          {msg.text}, dear {verifiedMemberData?.mb_nick ?? "guest"}
        </p>
      );
      setMessageList([...messageList]);
    });

    socket?.on("infoMsg", (msg: ChatInfoMsg) => {
      console.log("CLIENT: info message");

      setOnlineUsers(msg.total);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  /**HANDLERS */
  const getInputMessageHandler = useCallback(
    (e: any) => {
      e.preventDefault();
      const text = e.target.value;
      setMessage(text);
    },
    [message]
  );
  const onClickHandler = () => {
    try {
      if (!verifiedMemberData) {
        // textInput.current.value = "";
        setMessage("");
        sweetFailureProvider("Please login first", true);
        return false;
      }

      setMessage("");
      assert.ok(message, Definer.input_err3);

      const mb_image_url = verifiedMemberData?.mb_image
        ? verifiedMemberData?.mb_image
        : "/icons/default_user.svg";

      socket.emit("createMsg", {
        msg: message,
        mb_id: verifiedMemberData?._id,
        mb_nick: verifiedMemberData?.mb_nick,
        mb_image: mb_image_url,
      });
      setMessage("");
    } catch (err: any) {
      console.log("onClickHandler, ERROR:::", err);
      sweetErrorHandling(err).then();
    }
  };

  const getKeyHandler = (e: any) => {
    try {
      if (e.key === "Enter") {
        assert.ok(message, Definer.input_err3);
        onClickHandler();
      }
    } catch (err: any) {
      sweetErrorHandling(err).then();
    }
  };
  return (
    <Stack className="chat_frame">
      <Box
        className="chat_top"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <div>LIVE CHAT</div>
        <RippleBadge badgeContent={onlineUsers} />
      </Box>
      <Box className="chat_content">
        <Box className="chat_main">
          <Box
            flexDirection={"row"}
            style={{ display: "flex" }}
            sx={{ m: "10px 0px" }}
          >
            <div className="msg_left">Enjoy chatting</div>
          </Box>
          {messageList}
        </Box>
      </Box>
      <Box className="chat_bott">
        <input
          // ref={textInput}
          type="text"
          name="message"
          className="msg_input"
          placeholder="Send message"
          value={message}
          onChange={getInputMessageHandler}
          onKeyDown={getKeyHandler}
        />
        <button className="send_msg_btn" onClick={onClickHandler}>
          <SendIcon style={{ color: "#fff" }} />
        </button>
      </Box>
    </Stack>
  );
};

export default SocketChats;
