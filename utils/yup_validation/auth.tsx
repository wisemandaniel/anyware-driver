import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  confirmPassword: Yup.string()
    .min(2, "shortPassword")
    .max(50, "longPassword")
    .oneOf([Yup.ref("password"), undefined], "passwordMatch")
    .required("Required"),
  password: Yup.string()
    .min(2, "shortPassword")
    .max(50, "longPassword")
    .required("Required"),
  phoneNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  gender: Yup.string()
    .min(2, "shortName")
    .max(50, "longName")
    .required("Required"),
});

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export const CooperativeSchema = Yup.object().shape({
  cooperative: Yup.string().required("Required"),
  branch: Yup.string().required("Required"),
});

export const SecurityQuestionSchema = Yup.object().shape({
  securityQuestionId: Yup.string().required("Required"),
  response: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export const DocumentSchema = Yup.object().shape({
  document: Yup.string().required("Required"),
});

export const ConfirmationSchema = Yup.object().shape({
  confirmation: Yup.string().length(6, "Invalid length!").required("Required"),
});

export const PaymentNumberSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
