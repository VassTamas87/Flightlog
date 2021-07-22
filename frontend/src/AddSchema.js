import * as Yup from "yup";

const AddSchema = Yup.object().shape({
  city: Yup.string().required("Required"),
  destination: Yup.string().required("Required"),
});

export default AddSchema;
