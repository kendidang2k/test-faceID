import { Box } from "@mui/material";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { Camera } from "react-camera-pro";
import cameraFrame from "../../../assets/icons/camera-frame.png";
import cameraFrame2 from "../../../assets/icons/camera-frame2.png";
import { StoreContext } from "../../../context/StoreProvider/StoreProvider";
import CameraAction from "../../molecules/CameraAction";
import "./index.css";

export default function CameraFrame({ takePhotoFn, isFrontCard }) {
  const videoRef = useRef(null);
  const cameraRef = useRef(null);
  //   const canvasRef = useRef(null);

  const { setFrontCard, setBackCard } = useContext(StoreContext);

  const takePhotoAction = () => {
    if (isFrontCard) {
      setFrontCard(cameraRef.current.takePhoto());
    } else {
      setBackCard(cameraRef.current.takePhoto());
    }
    takePhotoFn();
  };

  const handleSwitchCamera = useCallback(() => {
    cameraRef.current.switchCamera();
  }, []);

  useEffect(() => {
    const getUserCamera = () => {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          let video = videoRef.current;
          console.log("🚀 ~ file: index.jsx ~ line 30 ~ .then ~ video", video);

          if (video != null) {
            video.srcObject = stream;
            video.play();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getUserCamera();
  }, [videoRef]);

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
        <Camera facingMode="environment" ref={cameraRef} />
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
      <CameraAction
        takePhotoAction={takePhotoAction}
        switchCam={handleSwitchCamera}
      />
    </Box>
  );
}
