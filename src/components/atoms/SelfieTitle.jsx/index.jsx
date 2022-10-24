import { Typography } from "@mui/material";
import React from "react";

export default function SelfieTitle() {
  return (
    <Typography
      component={"p"}
      sx={{ color: "#fff", fontSize: "17px", lineHeight: "23px" }}
    >
      Chụp ảnh Selfie
    </Typography>
  );
}
