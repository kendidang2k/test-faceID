import React, { useContext, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "@vladmandic/face-api/dist/face-api.esm";
import Action from "../../molecules/Action";
import * as facemesh from "@tensorflow-models/facemesh";
import * as tf from "@tensorflow/tfjs";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import { Box, CircularProgress, Typography } from "@mui/material";
import dontWearGlassesIcon from "../../../assets/icons/dont-wear-glasses.png";
import look90degIcon from "../../../assets/icons/look-90deg.png";
import Warning from "../../molecules/Warning";
import CameraAction from "../../molecules/CameraAction";
import { StoreContext } from "../../../context/StoreProvider/StoreProvider";
import SelfieTitle from "../../atoms/SelfieTitle.jsx";
import "./index.css";
import { useEffect } from "react";
import { SystemCore } from "../../../core";

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
  const [message, setMessage] = useState("Vui lòng nhìn thẳng !!");
  const { setStraightPhoto, setStatusUploadLiveNess, setVideoLiveNess } =
    useContext(StoreContext);
  const [activedStep, setActivedStep] = useState(0);
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadModel = async () => {
      const facemeshLoad = await facemesh.load();
      console.log(
        "🚀 ~ file: index.jsx ~ line 41 ~ loadModel ~ facemeshLoad",
        facemeshLoad
      );
      setModel(facemeshLoad);
      setIsLoading(false);
      SystemCore.send({
        command: "start-video-detect",
      });
    };

    SystemCore.send({
      command: "change-camera",
      value: {
        type: "front",
      },
    });

    loadModel();

    const listenUploadVideo = (res) => {
      setStatusUploadLiveNess(false);
      if (!res.success) return;
      setVideoLiveNess(res.data);

      actionFn();
    };

    SystemCore.on("on-upload-video", listenUploadVideo);

    return () => {
      SystemCore.removeEventListener("on-upload-video", listenUploadVideo);
    };
  }, []);

  useEffect(() => {
    if (activedStep == 5) {
      SystemCore.send({
        command: "stop-video-detect",
      });
      return;
    }
    const listenFrame = (res) => {
      console.log("<<<<<on-detect-frame>>>>>", res);
      if (!res.success) return;
      detect(res.data);
    };
    SystemCore.on("on-detect-frame", listenFrame);
    // let runFacemess;
    // if (model) {
    //   runFacemess = setInterval(async () => {
    //     detect(model);
    //   }, 500);
    // }

    return () => {
      SystemCore.removeEventListener("on-detect-frame", listenFrame);
    };
  }, [activedStep, model]);

  const detect = async (frame) => {
    try {
      console.log("<<<<<on-detect-frame>>>>> --- 1", frame);
      // if (
      //   typeof webcamRef.current !== "undefined" &&
      //   webcamRef.current !== null &&
      //   webcamRef.current.video.readyState === 4
      // ) {
      await fetch(frame)
        .then(function (response) {
          return response.blob();
        })
        .then(async function (blob) {
          const input1 = await faceapi.bufferToImage(blob);
          const faces = await model.estimateFaces(input1);

          const leftCoordinates = faces[0].mesh[234];
          const rightCoordinates = faces[0].mesh[356];
          const topCoordinates = faces[0].mesh[10];
          const bottomCoordinates = faces[0].mesh[152];

          switch (activedStep) {
            case 0:
              if (
                leftCoordinates[2] - rightCoordinates[2] <= 20 &&
                leftCoordinates[2] - rightCoordinates[2] > -20
              ) {
                setStraightPhoto(frame);
                setActivedStep(1);
                setMessage("Vui lòng nhìn sang trái !");
              }
              break;
            case 1:
              if (rightCoordinates[2] - leftCoordinates[2] > 70) {
                setActivedStep(2);
                setMessage("Vui lòng nhìn sang phải !");
              }
              break;
            case 2:
              if (leftCoordinates[2] - rightCoordinates[2] > 50) {
                setMessage("Vui lòng nhìn lên trên !");
                setActivedStep(3);
              }
              break;
            case 3:
              if (topCoordinates[2] - bottomCoordinates[2] > 50) {
                setMessage("Vui lòng nhìn xuống dưới !");
                setActivedStep(4);
              }
              break;
            case 4:
              if (bottomCoordinates[2] - topCoordinates[2] > 70) {
                setActivedStep(5);
              }
              break;
            default:
              break;
          }
        });
    } catch (error) {
      console.log("🚀 ~ file: index.jsx ~ line 110 ~ detect ~ error", error);
    }
  };

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
      <Box>
        <Typography sx={{ color: "#fff" }} component={"p"}>
          {message}
        </Typography>
      </Box>
      <Action stepActived={activedStep} />
      <Warning warningContent={warningContent} />
      <CameraAction />
      {isLoading && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#080808a6",
            flexDirection: "column",
          }}
        >
          <Typography
            component={"p"}
            sx={{ fontSize: "17px", fontWeight: "bold", color: "#fff" }}
          >
            Đang load model
          </Typography>
          <CircularProgress color="secondary" />
        </Box>
      )}
    </div>
  );
}
