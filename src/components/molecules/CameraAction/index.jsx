import {
  Box,
  ButtonBase,
  FormControlLabel,
  styled,
  Switch,
} from "@mui/material";
import React from "react";

export default function CameraAction({ takePhotoAction }) {
  const handleChangeSwitch = () => {};

  const IOSSwitch = styled((props) => (
    <Switch
      onChange={handleChangeSwitch}
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 54,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(28px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#B147F8",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#fff" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    <Box
      sx={{
        width: "100%",
        height: "113px",
        position: "fixed",
        left: 0,
        bottom: 0,
        backgroundColor: "#221F3A",
        boxShadow: "0px -7px 64px rgba(0, 0, 0, 0.07)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ButtonBase
        sx={{
          width: "62px",
          height: "62px",
          borderRadius: "50%",
          border: "1px solid #fff",
          overflow: "hidden",
          padding: "3px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#B147F8",
            borderRadius: "50%",
          }}
        ></Box>
      </ButtonBase>
      <IOSSwitch
        sx={{ m: 1, position: "absolute", right: "20px" }}
        defaultChecked
      />
    </Box>
  );
}
