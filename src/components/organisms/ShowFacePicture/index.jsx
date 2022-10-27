import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../../context/StoreProvider/StoreProvider";
import SelfieTitle from "../../atoms/SelfieTitle.jsx";
import * as faceapi from "@vladmandic/face-api";
import { MODEL_URL, THRESHOLD } from "../../../constants/config";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Toast from "../../atoms/ReactToast";

export default function ShowFacePicture() {
  const { straightPhoto, frontCard, setCompareFace } = useContext(StoreContext);
  const [compareFaceLoading, setCompareFaceLoading] = useState(false);
  const [isCompareFail, setIsCompareFail] = useState(false);

  useEffect(() => {
    const compareFace = async () => {
      setCompareFaceLoading(true);
      Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
      ]).then(async () => {
        Promise.all([fetch(frontCard), fetch(straightPhoto)])
          .then(async function (response) {
            return [await response[0].blob(), await response[1].blob()];
          })
          .then(async function (blob) {
            const frontCardImage = await faceapi.bufferToImage(blob[0]);
            const straightImage = await faceapi.bufferToImage(blob[1]);
            const res = faceapi.utils.round(
              faceapi.euclideanDistance(
                await faceapi.computeFaceDescriptor(frontCardImage),
                await faceapi.computeFaceDescriptor(straightImage)
              )
            );
            console.log("🚀 ~ file: index.jsx ~ line 42 ~ res", res);
            if (res > THRESHOLD) {
              toast.error("So sánh khuôn mặt không trùng khớp với CMND/CCCD", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              setCompareFace(false);
              setCompareFaceLoading(false);
            } else {
              toast.success("So sánh khuôn mặt thành công", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              setCompareFaceLoading(false);
            }
          });
      });
    };

    compareFace();
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "50px",
        bgcolor: "#000",
      }}
    >
      <SelfieTitle />
      <Box
        className="image"
        component={"img"}
        src={straightPhoto}
        alt="Straight Photo"
        sx={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          objectFit: "cover",
          marginTop: "27px",
        }}
      />
      {compareFaceLoading && (
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
            Đang so sánh khuôn mặt
          </Typography>
          <CircularProgress color="secondary" />
        </Box>
      )}
      <ToastContainer />
    </Box>
  );
}
