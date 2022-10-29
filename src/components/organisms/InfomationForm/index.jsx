import {
  Box,
  ButtonBase,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { toast } from "react-toastify";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import { basicSchema } from "../../../constants/config";
import FormField from "../../atoms/FormField";

const formField = [
  {
    name: "Họ và tên",
    placeholder: "Nhập họ tên",
    repreName: "fullName",
  },
  {
    name: "Ngày sinh",
    placeholder: "Nhập hoặc chọn",
    repreName: "dateOfBirth",
  },
  {
    name: "Ngành nghề",
    placeholder: "Nhập ngành nghề",
    repreName: "career",
  },
  {
    name: "Địa chỉ",
    placeholder: "Nhập địa chỉ",
    repreName: "address",
  },
  {
    name: "Tỉnh/ thành phố",
    isDropDown: true,
    repreName: "city",
  },
];

export default function InfomationForm({ actionNextStep }) {
  return (
    <Box
      sx={{
        padding: "10px 20px",
        backgroundColor: "#221F3A",
        height: " 100%",
        overflow: "scroll",
      }}
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
      {/* <Formik
        initialValues={{
          fullName: "",
          dateOfBirth: "",
          career: "",
          address: "",
          city: "",
        }}
        validationSchema={basicSchema}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
          actionNextStep();
        }}
      >
        {({ isSubmitting, values, errors, setFieldValue }) => (
          <Form>
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
                    marginBottom: "16px",
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
                    <Field
                      className="city__options"
                      component="select"
                      id="city"
                      name="city"
                      multiple={false}
                    >
                      <option value="Huế">Huế</option>
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="HCM">TP.Hồ Chí Minh</option>
                    </Field>
                  ) : (
                    <>
                      {item.repreName == "dateOfBirth" ? (
                        <ReactDatePicker
                          placeholderText={item.placeholder}
                          selected={values.dateOfBirth}
                          dateFormat="MMMM d, yyyy"
                          className="date__picker"
                          name="startDate"
                          onChange={(date) =>
                            setFieldValue("dateOfBirth", date)
                          }
                        />
                      ) : (
                        <InputBase
                          onChange={(e) =>
                            setFieldValue(item.repreName, e.target.value)
                          }
                          name={item.repreName}
                          id={item.repreName}
                          sx={{
                            width: "100%",
                            height: "48px",
                            padding: "10px 16px",
                            border: "1px solid #fff",
                            borderRadius: "6px",
                            boxShadow: "0px 7px 64px rgba(0, 0, 0, 0.07)",
                            color: "#D1D1D1",
                          }}
                          placeholder={item.placeholder}
                        />
                        <FormField
                          placeholder={item.placeholder}
                          name={item.repreName}
                        />
                      )}
                    </>
                  )}
                  {errors.address && (
                    <Typography sx={{ color: "red" }}>
                      {errors.address}
                    </Typography>
                  )}
                </Box>
              );
            })}
            <Box
              sx={{
                position: "fixed",
                left: 0,
                bottom: 0,
                width: "100%",
                height: "113px",
                zIndex: 10000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ButtonBase
                type="submit"
                sx={{
                  width: "85%",
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(267.74deg, #6359D9 -4.45%, #B147F8 105.31%)",
                  borderRadius: "15px",
                  color: "#fff",
                  fontSize: "16px",
                }}
              >
                Tiếp theo
              </ButtonBase>
            </Box>
          </Form>
        )}
      </Formik> */}
    </Box>
  );
}
