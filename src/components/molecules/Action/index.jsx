import React from "react";
import "./index.css";
import straightIcon from "../../../assets/icons/straight.png";
import leftIcon from "../../../assets/icons/turn-left.png";
import rightIcon from "../../../assets/icons/turn-right.png";
import lookUpIcon from "../../../assets/icons/look-up.png";
import lookDownIcon from "../../../assets/icons/look-down.png";
import { Box, Grid, Typography } from "@mui/material";

const actionList = [
  {
    name: "straight",
    icon: straightIcon,
  },
  {
    name: "left",
    icon: leftIcon,
  },
  {
    name: "right",
    icon: rightIcon,
  },
  {
    name: "up",
    icon: lookUpIcon,
  },
  {
    name: "down",
    icon: lookDownIcon,
  },
];

export default function Action({ stepActived }) {
  return (
    <Grid
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "13px",
      }}
    >
      <div className="cover__action">
        {actionList.map((item, index) => {
          return (
            <Grid key={index}>
              <Box
                className={`${
                  index < stepActived
                    ? `action ${item.name} active`
                    : `action ${item.name}`
                } ${index == stepActived ? "step__processing" : ""}`}
              >
                <Box component={"img"} src={item.icon} alt={item.name} />
              </Box>
            </Grid>
          );
        })}
      </div>
    </Grid>
  );
}
