import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { StoreContext } from "../../../context/StoreProvider/StoreProvider";
import IdentityCardSteps from "../../molecules/IdentityCardSteps";
import * as faceapi from "@vladmandic/face-api/dist/face-api.esm";
import * as facemesh from "@tensorflow-models/facemesh";
import * as tf from "@tensorflow/tfjs";
import { toast, ToastContainer } from "react-toastify";
import { MODEL_URL } from "../../../constants/config";
// import test1 from "../../../assets/images/test1.jpg";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../../atoms/ReactToast";
import { SystemCore } from "../../../core";
import { useEffect } from "react";

export default function ShowPicture({ isFrontCard }) {
  const { frontCard, backCard, setStatusUploadFrontCard, setStatusUploadBackCard, setVideoFrontCard,
setVideoBackCard } = useContext(StoreContext);
  // const isLoading = useRef(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  // const [isDetectFail, setIsDetectFail] = useState(false);

  React.useEffect(() => {
    const loadModels = async () => {
      if (isFrontCard && !modelsLoaded) {
        setModelsLoaded(true);
        Promise.all([
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
          faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
        ]).then(async () => {
          const faceRes = await fetch(isFrontCard ? frontCard : backCard)
            .then(function (response) {
              return response.blob();
            })
            .then(async function (blob) {
              const input1 = await faceapi.bufferToImage(blob);
              const res = await faceapi
                .detectAllFaces(
                  input1,
                  new faceapi.SsdMobilenetv1Options({
                    minConfidence: 0.5,
                    maxResults: 1,
                  })
                )
                .withFaceLandmarks()
                .withFaceExpressions()
                .withFaceDescriptors()
                .withAgeAndGender();
              setModelsLoaded(false);
              return res;
            });
          console.log(
            "🚀 ~ file: index.jsx ~ line 37 ~ ]).then ~ faceRes",
            faceRes
          );
          if (faceRes.length == 0) {
            toast.error("Nhận diện thất bại, vui lòng thử lại !", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            return;
          }
          toast.success("Nhận diện thành công !", {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          // start upload video
          setStatusUploadFrontCard(true);
          SystemCore.send({
            command: "upload-front-card-video",
          }).then(res => {

          }).catch(err => {
            setStatusUploadFrontCard(false);
          })

        });
      } else {

          setStatusUploadBackCard(true);
          SystemCore.send({
            command: "upload-back-card-video",
          }).then(res => {

          }).catch(err => {
            setStatusUploadBackCard(false);
          })
      }
    };
    loadModels();

    const listenUploadVideo =  res => {
      console.log("on-upload-video ----- ", res, isFrontCard);
      if (isFrontCard) {
        setStatusUploadFrontCard(false);
      } else {
        setStatusUploadBackCard(false);
      }
      if (!res.success) return;

      if (isFrontCard) {
        setVideoFrontCard(res.data);
      } else {
        setVideoBackCard(res.data);
      }
      
    };

    SystemCore.on("on-upload-video", listenUploadVideo);

    return () => {
      SystemCore.removeEventListener("on-upload-video", listenUploadVideo);
    }
  }, [frontCard]);
  

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
            width: "90%",
            height: "50%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            id="image"
            component={"img"}
            src={isFrontCard ? frontCard : backCard}
            alt="img"
            sx={{
              background: "green",
              width: "100%",
              height: "auto",
              // position: "absolute",
              // left: 0,
              // top: 0,
              objectFit: "contain",
              // transform: "translate(0, -181px)",
            }}
          />
        </Box>
      </Box>
      {modelsLoaded && (
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
            Đang nhận diện khuôn mặt
          </Typography>
          <CircularProgress color="secondary" />
        </Box>
      )}
      {isFrontCard && <ToastContainer />}
    </Box>
  );
}
