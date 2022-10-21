import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Camera } from "react-camera-pro";
import cameraFrame from "../../../assets/icons/camera-frame.png";
import cameraFrame2 from "../../../assets/icons/camera-frame2.png";
import "./index.css";

export default function CameraFrame({ isFrontCard }) {
  const videoRef = useRef(null);
  const cameraRef = useRef(null);
  //   const canvasRef = useRef(null);

  useEffect(() => {
    const getUserCamera = () => {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          let video = videoRef.current;

          video.srcObject = stream;
          video.play();
        });
    };

    getUserCamera();
  }, [videoRef]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "72px",
        zIndex: 10,
      }}
    >
      <Box sx={{ width: "90%", height: "220px", position: "relative" }}>
        <Camera facingMode="environment" className="camera" ref={cameraRef} />
        {/* <video className="camera" ref={videoRef} /> */}
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
    </Box>
  );
}
