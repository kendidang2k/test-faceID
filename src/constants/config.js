import * as yup from 'yup'

export const MODEL_URL = "/models";
export const THRESHOLD = 0.4

export const basicSchema = yup.object().shape({
    fullName: yup.string().required("Trường này là bắt buộc !"),
    dateOfBirth: yup.string().required("Trường này là bắt buộc !"),
    career: yup.string().required("Trường này là bắt buộc !"),
    address: yup.string().required("Trường này là bắt buộc !"),
    city: yup.string().required("Trường này là bắt buộc !")
})
