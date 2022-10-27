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

export default function ShowPicture({ isFrontCard }) {
  const {
    frontCard,
    backCard,
    detectFailModalVisible,
    setDetectFailModalVisible,
  } = useContext(StoreContext);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isDetectFail, setIsDetectFail] = useState(false);

  React.useEffect(() => {
    const loadModels = async () => {
      if (isFrontCard) {
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
          if (faceRes.length == 0) {
            console.log("asdasdsd1");
            setIsDetectFail(true);
            setDetectFailModalVisible(true);
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
          } else {
            console.log("3");
            toast.success("Nhận diện thành công !", {
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
        });
      }
    };

    return () => loadModels();
  }, [isFrontCard]);

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
