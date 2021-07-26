import * as Yup from "yup";

export const AddSchema = Yup.object().shape({
  city: Yup.string().required("Required"),
  destination: Yup.string()
    .notOneOf([Yup.ref("city")], "Departure and destination can't be the same!")
    .required("Required"),
});

export const ChangeSchema = Yup.object().shape({
  username: Yup.string().min(6, "Too Short!"),
  usernameconf: Yup.string().oneOf(
    [Yup.ref("username")],
    "The usernames entered don't match!"
  ),
  password: Yup.string().min(8, "Too short!"),
  passwconf: Yup.string().oneOf(
    [Yup.ref("password")],
    "The passwords entered don't match!"
  ),
});

export const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export const RankSchema = Yup.object().shape({
  position: Yup.string().required("Required"),
});

export const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(6, "Too short!").required("Required"),
  password: Yup.string().min(8, "Too short!").required("Required"),
  passwconf: Yup.string()
    .oneOf([Yup.ref("password")], "The passwords entered don't match!")
    .required("Required"),
  position: Yup.string().required("Required"),
});
