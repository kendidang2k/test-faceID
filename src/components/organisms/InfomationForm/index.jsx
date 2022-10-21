import { Box, InputBase, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";

const formField = [
  {
    name: "Họ và tên",
    placeholder: "Nhập họ tên",
  },
  {
    name: "Ngày sinh",
    placeholder: "Nhập hoặc chọn",
  },
  {
    name: "Ngành nghề",
    placeholder: "Nhập ngành nghề",
  },
  {
    name: "Địa chỉ",
    placeholder: "Nhập địa chỉ",
  },
  {
    name: "Tỉnh/ thành phố",
    isDropDown: true,
  },
];

export default function InfomationForm() {
  const [district, setDistrict] = useState("TP.Hồ Chí Minh");

  const handleChangeDistrict = (e) => {
    setDistrict(e.target.value);
  };

  return (
    <Box
      sx={{ padding: "10px 20px", backgroundColor: "#221F3A", height: " 100%" }}
    >
      <Typography
        component={"p"}
        sx={{
          fontSize: "18px",
          fontWeight: 700,
          color: "#fff",
          lineHeight: "35px",
          marginBottom: "33px",
        }}
      >
        Thông tin cá nhân
      </Typography>
      {formField.map((item, index) => {
        return (
          <Box
            key={index}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Typography
              component={"p"}
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#fff",
              }}
            >
              {item.name}
            </Typography>
            {item.isDropDown ? (
              <Select
                sx={{ width: "100%" }}
                value={district}
                label="Tỉnh"
                onChange={handleChangeDistrict}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            ) : (
              <InputBase
                sx={{
                  width: "100%",
                  height: "48px",
                  padding: "10px 16px",
                  border: "1px solid #fff",
                  borderRadius: "6px",
                  boxShadow: "0px 7px 64px rgba(0, 0, 0, 0.07)",
                  marginBottom: "16px",
                  color: "#D1D1D1",
                }}
                placeholder={item.placeholder}
              />
            )}
          </Box>
        );
      })}
      <Box></Box>
    </Box>
  );
}
