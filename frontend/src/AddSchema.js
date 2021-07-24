import * as Yup from "yup";

const AddSchema = Yup.object().shape({
  city: Yup.string().required("Required"),
  destination: Yup.string()
    .notOneOf([Yup.ref("city")], "Departure and destination can't be the same!")
    .required("Required"),
});

export default AddSchema;
