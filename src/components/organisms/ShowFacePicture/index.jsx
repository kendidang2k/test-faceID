import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../../context/StoreProvider/StoreProvider";
import SelfieTitle from "../../atoms/SelfieTitle.jsx";
import * as faceapi from "face-api.js";

import test1 from "../../../assets/images/test1.jpg";
import test2 from "../../../assets/images/test2.jpg";

export default function ShowFacePicture() {
  const { straightPhoto, frontCard } = useContext(StoreContext);
  console.log(
    "🚀 ~ file: index.jsx ~ line 9 ~ ShowFacePicture ~ straightPhoto",
    straightPhoto
  );

  const net = new faceapi.SsdMobilenetv1();

  //   async function onSelectionChanged(which, uri) {
  //     const input = await faceapi.fetchImage(uri);
  //     const imgEl = $(`#face${which}`).get(0);
  //     imgEl.src = input.src;
  //     descriptors[`desc${  which}`] = await faceapi.computeFaceDescriptor(input);
  //   }

  useEffect(() => {
    const compareFace = async () => {
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");

      const input1 = await faceapi.bufferToImage(test1.bold());
      const input2 = await faceapi.bufferToImage(test2.bold());
      const detection1 = await faceapi.computeFaceDescriptor(input1);
      console.log(
        "🚀 ~ file: index.jsx ~ line 29 ~ compareFace ~ detection1",
        detection1
      );
      const detection2 = await faceapi.computeFaceDescriptor(input2);

      const distance = await faceapi.euclideanDistance(detection1, detection2);
      console.log(
        "🚀 ~ file: index.jsx ~ line 42 ~ compareFace ~ distance",
        distance
      );

      // const fullFaceDescriptions = await faceapi.detectAllFaces
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
      {/* <Box
        className="image"
        component={"img"}
        src={frontCard}
        alt="Straight Photo"
        sx={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          objectFit: "cover",
          marginTop: "27px",
        }}
      /> */}
    </Box>
  );
}
