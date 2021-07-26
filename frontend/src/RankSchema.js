import * as Yup from "yup";

const RankSchema = Yup.object().shape({
  position: Yup.string().required("Required"),
});

export default RankSchema;
