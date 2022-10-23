import { Box } from "@mui/material";
import React, { useCallback, useContext, useRef } from "react";
import CameraFrame from "../../atoms/CameraFrame";
import IdentityCardSteps from "../../molecules/IdentityCardSteps";
import Warning from "../../molecules/Warning";
import handCover from "../../../assets/icons/hand-cover.png";
import lossAngle from "../../../assets/icons/loss-angle.png";
import glare from "../../../assets/icons/glare.png";
import CameraAction from "../../molecules/CameraAction";
import { StoreContext } from "../../../context/StoreProvider/StoreProvider";

import "./index.css";
import { Camera } from "react-camera-pro";

const warningContent = [
  {
    icon: handCover,
    content: "Don't let your hands cover",
  },
  {
    icon: lossAngle,
    content: "No loss of angle",
  },
  {
    icon: glare,
    content: "No glare",
  },
];

export default function TakePhoto({ actionFn, setCard }) {
  const cameraRef = useRef(null);

  return (
    <Box sx={{ paddingTop: "40px" }}>
      <IdentityCardSteps isFrontCard={true} isBackCard={false} />
      <CameraFrame takePhotoFn={actionFn} />
      <Box sx={{ zIndex: "-1" }} className="cover__single__camera">
        <Camera ref={cameraRef} />
      </Box>
      <Box sx={{ marginTop: "320px" }}>
        <Warning warningContent={warningContent} />
      </Box>
    </Box>
  );
}
