import { Box } from "@mui/material";
import React, { useContext, useRef } from "react";
import { StoreContext } from "../../../context/StoreProvider/StoreProvider";
import IdentityCardSteps from "../../molecules/IdentityCardSteps";
import * as faceapi from "face-api.js";

export default function ShowPicture({ isFrontCard }) {
  const { frontCard, backCard } = useContext(StoreContext);
  const imageRef = useRef(frontCard);
  console.log(
    "🚀 ~ file: index.jsx ~ line 9 ~ ShowPicture ~ imageRef",
    imageRef
  );

  const detectFace = async () => {
    await faceapi.nets.faceRecognitionNet.loadFromUri(
      "/Project/FaceID/face-id/src/models"
    );
    await faceapi.nets.faceLandmark68Net.loadFromUri(
      "/Project/FaceID/face-id/src/models"
    );
    await faceapi.nets.ssdMobilenetv1.loadFromUri(
      "/Project/FaceID/face-id/src/models"
    );
    fetch(frontCard)
      .then((res) => res.blob())
      .then(async (blob) => {
        console.log("blob", blob);
        const frontImage = await faceapi.bufferToImage(blob);
        const res = await faceapi
          .detectAllFaces(frontImage)
          .withFaceLandmarks()
          .withFaceDescriptors();
        console.log("res", res);
      });
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
