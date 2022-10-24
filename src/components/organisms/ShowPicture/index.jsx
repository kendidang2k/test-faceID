import { Box } from "@mui/material";
import React, { useContext, useRef } from "react";
import { StoreContext } from "../../../context/StoreProvider/StoreProvider";
import IdentityCardSteps from "../../molecules/IdentityCardSteps";

export default function ShowPicture({ isFrontCard }) {
  const { frontCard, backCard } = useContext(StoreContext);

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
    </Box>
  );
}
