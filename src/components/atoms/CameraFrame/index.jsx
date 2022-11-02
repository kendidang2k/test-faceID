import { Box } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
// import { Camera } from "react-camera-pro";
import cameraFrame from "../../../assets/icons/camera-frame.png";
import cameraFrame2 from "../../../assets/icons/camera-frame2.png";
import { StoreContext } from "../../../context/StoreProvider/StoreProvider";
import CameraAction from "../../molecules/CameraAction";
// import * as faceapi from "@vladmandic/face-api";
import { SystemCore } from "../../../core";
import { useState } from "react";
import "./index.css";
import { Camera } from "react-camera-pro";

export default function CameraFrame({ takePhotoFn, isFrontCard }) {
  // const cameraRef = useRef(null);
  const { setFrontCard, setBackCard } = useContext(StoreContext);
  const [videoFronCard, setVideoFrontCard] = useState("");

  const takePhotoAction = async () => {
    SystemCore.send({
      command: "take-picture",
      value: {
        type: isFrontCard ? "front-card" : "back-card",
      },
    });
    // if (isFrontCard) {
    //   setFrontCard(cameraRef.current.takePhoto());
    // } else {
    //   setBackCard(cameraRef.current.takePhoto());
    // }
    // takePhotoFn();
  };

  useEffect(() => {
    const listenTakePhoto = (res) => {
      if (!res.success) {
        return;
      }
      if (isFrontCard) {
        setFrontCard(res.data);
      } else {
        setBackCard(res.data);
      }
      takePhotoFn();
    };

    SystemCore.on("on-take-picture", listenTakePhoto);
    return () => {
      SystemCore.removeEventListener("on-take-picture", listenTakePhoto);
    };
  }, [isFrontCard]);

  return (
    <Box
      className="cover__camera__frame"
      sx={{
        position: " fixed",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "72px",
        zIndex: 10,
      }}
    >
      <Box
        sx={{
          width: "335px",
          height: "220px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* <Camera facingMode="environment" ref={cameraRef} /> */}
        {isFrontCard ? (
          <Box
            className="camera__frame"
            component={"img"}
            src={cameraFrame}
            alt="Camera Frame"
          />
        ) : (
          <Box
            className="camera__frame"
            component={"img"}
            src={cameraFrame2}
            alt="Camera Frame"
          />
        )}
      </Box>
      <CameraAction takePhotoAction={takePhotoAction} />
    </Box>
  );
}
