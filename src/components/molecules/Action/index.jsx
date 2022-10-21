import React from "react";
import "./index.css";
import straightIcon from "../../../assets/icons/straight.png";
import leftIcon from "../../../assets/icons/turn-left.png";
import rightIcon from "../../../assets/icons/turn-right.png";
import lookUpIcon from "../../../assets/icons/look-up.png";
import lookDownIcon from "../../../assets/icons/look-down.png";
import { Box, Grid } from "@mui/material";

export default function Action({ straight, left, right, up, down }) {
  const actionList = [
    {
      name: "straight",
      icon: straightIcon,
      status: straight,
    },
    {
      name: "left",
      icon: leftIcon,
      status: left,
    },
    {
      name: "right",
      icon: rightIcon,
      status: right,
    },
    {
      name: "up",
      icon: lookUpIcon,
      status: up,
    },
    {
      name: "down",
      icon: lookDownIcon,
      status: down,
    },
  ];

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
                className={
                  item.status
                    ? `action ${item.name} active`
                    : `action ${item.name}`
                }
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
