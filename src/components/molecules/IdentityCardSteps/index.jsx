import { Box, Typography } from "@mui/material";
import React from "react";
import arrowRight from "../../../assets/icons/arrow-right.png";
import frontCard from "../../../assets/icons/front-card.png";
import backCard from "../../../assets/icons/back-card.png";

export default function IdentityCardSteps({ isFrontCard, isBackCard }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        component={"p"}
        sx={{ fontSize: "17px", color: "#fff", marginBottom: "23px" }}
      >
        Chụp ảnh CMND/CCCD
      </Typography>
      <Box
        sx={{
          width: "40%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Box component={"img"} src={frontCard} alt="front card" />
          {isFrontCard && (
            <Box
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "90%",
                backgroundColor: "#00000080",
                zIndex: "100",
                borderRadius: "4px",
              }}
            ></Box>
          )}
        </Box>
        <Box component={"img"} src={arrowRight} alt="arrow right" />
        <Box sx={{ position: "relative" }}>
          {isBackCard && (
            <Box
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "90%",
                backgroundColor: "#00000080",
                zIndex: "100",
                borderRadius: "4px",
              }}
            ></Box>
          )}
          <Box component={"img"} src={backCard} alt="back card" />
        </Box>
      </Box>
    </Box>
  );
}
