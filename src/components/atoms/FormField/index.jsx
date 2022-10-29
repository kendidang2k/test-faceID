import { Box, InputBase, Typography } from "@mui/material";
import { useField } from "formik";
import React from "react";

export default function FormField({ placeholder, ...props }) {
  const [field, meta] = useField(props);
  console.log("🚀 ~ file: index.jsx ~ line 7 ~ FormField ~ field", field);
  console.log("🚀 ~ file: index.jsx ~ line 7 ~ FormField ~ meta", meta);
  return (
    <Box sx={{ width: "100%" }}>
      <InputBase
        sx={{
          width: "100%",
          height: "48px",
          padding: "10px 16px",
          border: "1px solid #fff",
          borderRadius: "6px",
          boxShadow: "0px 7px 64px rgba(0, 0, 0, 0.07)",
          color: "#D1D1D1",
        }}
        placeholder={placeholder}
      />
      {meta.touched && meta.error && (
        <Typography sx={{ color: "red" }}>{meta.error}</Typography>
      )}
    </Box>
  );
}
