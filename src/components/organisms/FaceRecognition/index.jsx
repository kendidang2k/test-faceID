import React, { useContext, useRef, useState } from "react";
import Webcam from "react-webcam";
import Action from "../../molecules/Action";
import * as facemesh from "@mediapipe/face_mesh";
import * as tf from "@tensorflow/tfjs";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import { Box, Typography } from "@mui/material";
import dontWearGlassesIcon from "../../../assets/icons/dont-wear-glasses.png";
import look90degIcon from "../../../assets/icons/look-90deg.png";
import Warning from "../../molecules/Warning";
import CameraAction from "../../molecules/CameraAction";
import { StoreContext } from "../../../context/StoreProvider/StoreProvider";
import { Camera } from "react-camera-pro";
import SelfieTitle from "../../atoms/SelfieTitle.jsx";
import "./index.css";

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

export default function FaceRecognition({ actionFn }) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;

  const [straight, setStraight] = useState(false);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const { setStraightPhoto } = useContext(StoreContext);

  const detectorConfig = {
    runtime: "mediapipe",
    solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
    // or 'base/node_modules/@mediapipe/face_mesh' in npm.
  };

  const runFacemess = async () => {
    const net = await facemesh.load({
      inputResolution: {
        width: 300,
        height: 300,
      },
      scale: 0.98,
    });
    // const detector = await faceLandmarksDetection.createDetector(
    //   model,
    //   detectorConfig
    // );
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    try {
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const faces = await net.estimateFaces(video);
        const leftCoordinates = faces[0].mesh[234];
        const rightCoordinates = faces[0].mesh[356];
        const topCoordinates = faces[0].mesh[10];
        const bottomCoordinates = faces[0].mesh[152];
        if (
          leftCoordinates[2] - rightCoordinates[2] > 20 &&
          straight == false
        ) {
          setStraight(true);
          setStraightPhoto(webcamRef.current.getScreenshot());
          return;
        }
        if (leftCoordinates[2] - rightCoordinates[2] > 50 && right == false) {
          setRight(true);
          return;
        }
        if (rightCoordinates[2] - leftCoordinates[2] > 70 && left == false) {
          setLeft(true);
          return;
        }
        if (bottomCoordinates[2] - topCoordinates[2] > 70 && down == false) {
          setDown(true);
          return;
        }
        if (topCoordinates[2] - bottomCoordinates[2] > 50 && up == false) {
          setUp(true);
          return;
        }
      }
    } catch (error) {
      console.log("🚀 ~ file: index.jsx ~ line 110 ~ detect ~ error", error);
    }
  };

  if (straight && left && right && up && down) {
    actionFn();
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
        <SelfieTitle />
        <Webcam className="webcam" ref={webcamRef} />
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
      <CameraAction />
    </div>
  );
}
