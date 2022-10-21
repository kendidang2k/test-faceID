import { Box, Grid, Typography } from "@mui/material";
import React from "react";

export default function Warning({ warningContent }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
      }}
    >
      <Grid
        container
        sx={{
          width: "90%",
          height: "130px",
          borderRadius: "20px",
          backgroundColor: "rgba(46, 46, 46, 0.8)",
          padding: "20px",
        }}
      >
        {warningContent.map((item, index) => {
          return (
            <Grid
              item
              key={index}
              xs={12 / warningContent.length}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Box component={"img"} src={item.icon} alt="warning icon" />
              <Typography
                component={"p"}
                sx={{
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#fff",
                  marginTop: "10px",
                }}
              >
                {item.content}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
