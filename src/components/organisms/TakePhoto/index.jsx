import { Box } from "@mui/material";
import React from "react";
import IdentityCardSteps from "../../molecules/IdentityCardSteps";

export default function TakePhoto() {
  return (
    <Box sx={{ paddingTop: "40px" }}>
      <IdentityCardSteps isFrontCard={true} isBackCard={false} />
    </Box>
  );
}
