import { Container } from "@mui/material";
import React from "react";

export function Advertisement() {
  return (
    <div className="ads_frame">
      <video
        className={"ads_video"}
        autoPlay={true}
        loop
        muted
        playsInline
        data-video-media=""
      >
        <source
          data-src="/ads/video ads (1).mp4"
          type="video/mp4"
          src="/ads/video ads (1).mp4"
        />
      </video>
    </div>
  );
}
