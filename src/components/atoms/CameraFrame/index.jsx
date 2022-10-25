import { Box } from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Camera } from "react-camera-pro";
import cameraFrame from "../../../assets/icons/camera-frame.png";
import cameraFrame2 from "../../../assets/icons/camera-frame2.png";
import { StoreContext } from "../../../context/StoreProvider/StoreProvider";
import CameraAction from "../../molecules/CameraAction";
import * as faceapi from "face-api.js";
import test1 from "../../../assets/images/test1.jpg";

import "./index.css";

export default function CameraFrame({ takePhotoFn, isFrontCard }) {
  const videoRef = useRef(null);
  const cameraRef = useRef(null);

  const [testValue, setTestValue] = useState();

  const { setFrontCard, setBackCard } = useContext(StoreContext);

  const urltoFile = async (url, filename, mimeType) => {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  };

  const takePhotoAction = async () => {
    if (isFrontCard) {
      setFrontCard(cameraRef.current.takePhoto());
    } else {
      setBackCard(cameraRef.current.takePhoto());
    }
    takePhotoFn();
  };

  const handleClick = async (e) => {
    setTestValue(e.target.value);
    // console.log(
    //   "🚀 ~ file: index.jsx ~ line 82 ~ handleClick ~ e.target.value",
    //   e.target.value
    // );
    // const input1 = await faceapi.bufferToImage(test1);
    // console.log(
    //   "🚀 ~ file: index.jsx ~ line 89 ~ handleClick ~ input1",
    //   input1
    // );

    // const testVa = await faceapi.detectAllFaces(e.target.value);
    // console.log(
    //   "🚀 ~ file: index.jsx ~ line 29 ~ takePhotoAction ~ testVa",
    //   testVa
    // );
    fetch(test1)
      .then(function (response) {
        return response.blob();
      })
      .then(async function (blob) {
        console.log("🚀 ~ file: index.jsx ~ line 132 ~ blob", blob);
        const input1 = await faceapi.bufferToImage(blob);
        const res = faceapi
          .detectAllFaces(input1)
          .withFaceLandmarks()
          .withFaceDescriptors();
        console.log("🚀 ~ file: index.jsx ~ line 74 ~ res", res);
        console.log("🚀 ~ file: index.jsx ~ line 134 ~ input1", input1);
      });

    // var blob = new Blob([test1], { type: "image/svg+xml" });
    // const input1 = await faceapi.bufferToImage(
    //   new Blob([test1], { type: "image/svg+xml" })
    // );
    // console.log(
    //   "🚀 ~ file: index.jsx ~ line 130 ~ handleClick ~ input1",
    //   input1
    // );
  };

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
