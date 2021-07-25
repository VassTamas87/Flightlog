import * as Yup from "yup";

const ChangeSchema = Yup.object().shape({
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

export default ChangeSchema;
