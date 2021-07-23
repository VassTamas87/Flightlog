import { ErrorMessage, useField } from "formik";
import React from "react";

const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        {...field}
        {...props}
        className={`form-control ${
          meta.touched && meta.error ? "is-invalid" : ""
        }`}
      />
      <ErrorMessage
        name={props.name}
        className="invalid-feedback"
        component="div"
      />
    </div>
  );
};

export default MyTextField;
