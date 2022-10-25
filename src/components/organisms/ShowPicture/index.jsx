import { Box } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { StoreContext } from "../../../context/StoreProvider/StoreProvider";
import IdentityCardSteps from "../../molecules/IdentityCardSteps";
import * as tf from "@tensorflow/tfjs";
import * as faceapi from "face-api.js";
import { Canvas, Image, ImageData, loadImage } from "canvas";
import test1 from "../../../assets/images/test1.jpg";
import * as facemesh from "@mediapipe/face_mesh";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
// import * as tfnode from "@tensorflow/tfjs-node";
import * as tfjsBackendWebgl from "@tensorflow/tfjs-backend-webgl";

export default function ShowPicture({ isFrontCard }) {
  const { frontCard, backCard } = useContext(StoreContext);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const imageRef = useRef(frontCard);
  const MODEL_URL = "/models";

  // aw
  // const detectorConfig = {
  //   runtime: "mediapipe",
  //   solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
  //   // or 'base/node_modules/@mediapipe/face_mesh' in npm.
  // };

  React.useEffect(() => {
    const loadModels = async () => {
      // Promise.all([
      //   faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      //   faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      //   faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      //   faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      //   faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      // ]).then(async () => {
      //   fetch(test1)
      //     .then(function (response) {
      //       return response.blob();
      //     })
      //     .then(async function (blob) {
      //       const input1 = await faceapi.bufferToImage(blob);
      //       const res = await faceapi.detectAllFaces(input1);
      //       // .withFaceLandmarks()
      //       // .withFaceDescriptors();
      //       console.log("🚀 ~ file: index.jsx ~ line 74 ~ res", res);
      //       // console.log("🚀 ~ file: index.jsx ~ line 134 ~ input1", input1);
      //     });
      // });

      const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
      const detectorConfig = {
        runtime: "tfjs",
      };
      const detector = await faceLandmarksDetection.createDetector(
        model,
        detectorConfig
      );

      const estimationConfig = { flipHorizontal: false };
      const faces = await detector.estimateFaces(
        imageRef.current,
        estimationConfig
      );
      console.log("🚀 ~ file: index.jsx ~ line 60 ~ loadModels ~ faces", faces);
      // const net = await facemesh.load({
      //   inputResolution: {
      //     width: 300,
      //     height: 300,
      //   },
      //   scale: 0.98,
      // });

      // const face = await net.estimateFaces(imageRef.current);
      // console.log("🚀 ~ file: index.jsx ~ line 50 ~ loadModels ~ face", face);
    };
    loadModels();
  }, []);

  const detectFace = async () => {
    // await faceapi.nets.faceRecognitionNet.loadFromUri(
    //   "/Project/FaceID/face-id/src/models"
    // );
    // await faceapi.nets.faceLandmark68Net.loadFromUri(
    //   "/Project/FaceID/face-id/src/models"
    // );
    // await faceapi.nets.ssdMobilenetv1.loadFromUri(
    //   "/Project/FaceID/face-id/src/models"
    // );
    // if (!isFaceDetectionModelLoaded()) {
    //   return;
    // }
    // const displaySize = {
    //   width: 300,
    //   height: 300,
    // };
    // faceapi.matchDimensions(imageRef, displaySize);
    // const detections = await faceapi
    //   .detectAllFaces(imageRef, new faceapi.TinyFaceDetectorOptions())
    //   .withFaceLandmarks()
    //   .withFaceExpressions();
    // console.log(
    //   "🚀 ~ file: index.jsx ~ line 51 ~ updateResults ~ detections",
    //   detections
    // );
    // const inputImgEl = imageRef;
    // const options = faceapi.TinyFaceDetectorOptions();
    // const results = await faceapi.detectAllFaces(inputImgEl, options);
    // const canvas = imageRef;
    // faceapi.matchDimensions(canvas, inputImgEl);
    // faceapi.draw.drawDetections(
    //   canvas,
    //   faceapi.resizeResults(results, inputImgEl)
    // );
    // async function run() {
    //   // load face detection
    //   // await changeFaceDetector(SSD_MOBILENETV1);
    //   // start processing image
    //   updateResults();
    // }
    // run();
    // fetch(frontCard)
    //   .then((res) => res.blob())
    //   .then(async (blob) => {
    //     console.log("blob", blob);
    //     const frontImage = await faceapi.bufferToImage(blob);
    //     const res = await faceapi
    //       .detectAllFaces(frontImage)
    //       .withFaceLandmarks()
    //       .withFaceDescriptors();
    //     console.log("res", res);
    //   });
  };

  detectFace();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        paddingTop: "40px",
      }}
    >
      <IdentityCardSteps isFrontCard={isFrontCard} />
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
          <Box
            id="image"
            component={"img"}
            ref={isFrontCard ? imageRef : null}
            src={isFrontCard ? frontCard : backCard}
            alt="img"
            sx={{
              width: "100vw",
              height: "100vh",
              position: "absolute",
              left: 0,
              top: 0,
              objectFit: "cover",
              transform: "translate(0, -177px)",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
