import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(6, "Too short!").required("Required"),
  password: Yup.string().min(8, "Too short!").required("Required"),
  passwconf: Yup.string()
    .oneOf([Yup.ref("password")], "The passwords entered don't match!")
    .required("Required"),
});

export default RegisterSchema;
