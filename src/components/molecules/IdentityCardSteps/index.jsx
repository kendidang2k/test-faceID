import { Box, Typography } from "@mui/material";
import React from "react";
import arrowRight from "../../../assets/icons/arrow-right.png";
import frontCard from "../../../assets/icons/front-card.png";
import backCard from "../../../assets/icons/back-card.png";
import "./index.css";

export default function IdentityCardSteps({ isFrontCard }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "35px",
        zIndex: 10,
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
          alignItems: "flex-start",
          justifyContent: "space-evenly",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Box component={"img"} src={frontCard} alt="front card" />
          {!isFrontCard && (
            <Box
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "61%",
                backgroundColor: "#00000080",
                zIndex: "100",
                borderRadius: "4px",
              }}
            ></Box>
          )}
          <Typography
            className={isFrontCard ? "" : "title__blur"}
            component={"p"}
            sx={{ color: "#fff", fontSize: "12px" }}
          >
            Front
          </Typography>
        </Box>
        <Box
          component={"img"}
          src={arrowRight}
          alt="arrow right"
          sx={{ marginTop: "12px" }}
        />
        <Box sx={{ position: "relative" }}>
          {isFrontCard && (
            <Box
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "61%",
                backgroundColor: "#00000080",
                zIndex: "100",
                borderRadius: "4px",
              }}
            ></Box>
          )}
          <Box component={"img"} src={backCard} alt="back card" />
          <Typography
            className={isFrontCard ? "title__blur" : ""}
            component={"p"}
            sx={{ color: "#fff", fontSize: "12px" }}
          >
            Back
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
