import { Box } from "@mui/material";
import React, { useContext, useRef } from "react";
import { StoreContext } from "../../../context/StoreProvider/StoreProvider";
import IdentityCardSteps from "../../molecules/IdentityCardSteps";

export default function ShowPicture() {
  const { photoRef, setPhotoRef } = useContext(StoreContext);
  // ctx.drawImage(video, 0, 0, photoRef.width, photoRef.height);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        paddingTop: "40px",
      }}
    >
      <IdentityCardSteps isFrontCard={true} isBackCard={false} />
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
            component={"img"}
            src={photoRef}
            alt="img"
            sx={{
              width: "100vw",
              height: "100vh",
              position: "absolute",
              left: 0,
              top: 0,
              objectFit: "cover",
              transform: "translate(0, -160px)",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
