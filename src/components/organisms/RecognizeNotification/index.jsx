import { Box, Typography } from "@mui/material";
import React from "react";

export default function RecognizeNotification({ notiData }) {
  console.log(
    "🚀 ~ file: index.jsx ~ line 5 ~ RecognizeNotification ~ notiData",
    notiData
  );
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        backgroundColor: "#221F3A",
        paddingTop: "100px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box component={"img"} src={notiData.icon} alt="notification icon" />
        <Typography
          component={"p"}
          sx={{
            fontSize: "18px",
            color: "#fff",
            fontWeight: "bold",
            marginTop: "30px",
          }}
        >
          {notiData.title}
        </Typography>
      </Box>
    </Box>
  );
}
