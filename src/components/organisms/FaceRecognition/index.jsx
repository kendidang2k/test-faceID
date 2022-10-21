import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Action from "../../molecules/Action";
import * as facemesh from "@tensorflow-models/facemesh";
import * as tf from "@tensorflow/tfjs";
import { FaceMesh } from "@mediapipe/face_mesh";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import "./index.css";
import { Box, Typography } from "@mui/material";
import dontWearGlassesIcon from "../../../assets/icons/dont-wear-glasses.png";
import look90degIcon from "../../../assets/icons/look-90deg.png";
import Warning from "../../molecules/Warning";
import { Camera } from "react-camera-pro";

const warningContent = [
  {
    icon: look90degIcon,
    content: "Keep your face straight at a 90 degree angle",
  },
  {
    icon: dontWearGlassesIcon,
    content: "Don’t wear glasses",
  },
];

export default function FaceRecognition() {
  const webcamRef = useRef(null);
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);
  const [noti, setNoti] = useState("");
  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
  const [faceStatus, setFaceStatus] = useState({
    straight: false,
    left: false,
    right: false,
    up: false,
    down: false,
  });

  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [straight, setStraight] = useState(false);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);

  const detectorConfig = {
    runtime: "mediapipe",
    solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
    // or 'base/node_modules/@mediapipe/face_mesh' in npm.
  };

  const runFacemess = async () => {
    const net = await facemesh.load({
      inputResolution: {
        width: 700,
        height: 700,
      },
      scale: 0.98,
    });
    const detector = await faceLandmarksDetection.createDetector(
      model,
      detectorConfig
    );
    setInterval(() => {
      detect(detector);
    }, 100);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      console.log(
        "🚀 ~ file: index.jsx ~ line 28 ~ FaceRecognition ~ webcamRef",
        webcamRef
      );
      console.log(
        "🚀 ~ file: index.jsx ~ line 30 ~ FaceRecognition ~ cameraRef",
        cameraRef
      );

      navigator.getUserMedia(
        { audio: true, video: true },
        function (stream) {
          stream.getTracks().forEach((x) => x.stop());
        },
        (err) => console.log(err)
      );

      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const faces = await net.estimateFaces(video);
      const leftCoordinates = faces[0].keypoints[234];
      const rightCoordinates = faces[0].keypoints[356];
      const topCoordinates = faces[0].keypoints[10];
      const bottomCoordinates = faces[0].keypoints[152];
      const centerCoordinates = faces[0].keypoints;
      if (leftCoordinates.z - rightCoordinates.z > 20 && straight == false) {
        setStraight(true);
        return;
      }
      if (leftCoordinates.z - rightCoordinates.z > 50 && right == false) {
        setRight(true);
        return;
      }
      if (rightCoordinates.z - leftCoordinates.z > 70 && left == false) {
        setLeft(true);
        return;
      }
      if (bottomCoordinates.z - topCoordinates.z > 70 && down == false) {
        setDown(true);
        return;
      }
      if (topCoordinates.z - bottomCoordinates.z > 50 && up == false) {
        setUp(true);
        return;
      }
    }
  };

  if (straight && left && right && up && down) {
    return;
  } else {
    runFacemess();
  }

  return (
    <div className="cover__face__reconitions">
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "370px",
        }}
      >
        <Typography
          component={"p"}
          sx={{ color: "#fff", fontSize: "17px", lineHeight: "23px" }}
        >
          Chụp ảnh Selfie
        </Typography>
        <Webcam className="webcam" ref={webcamRef} />
        {/* <Camera
          className="webcam"
          numberOfCamerasCallback={setNumberOfCameras}
          facingMode="environment"
          ref={cameraRef}
        /> */}
        <canvas className="webcam" ref={canvasRef} />
      </Box>
      <Action
        straight={straight}
        left={left}
        right={right}
        up={up}
        down={down}
      />
      <Warning warningContent={warningContent} />
    </div>
  );
}
