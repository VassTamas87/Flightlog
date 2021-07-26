import { ErrorMessage, useField } from "formik";
import React from "react";

const Field = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label>{label} </label>
      <select
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
    </>
  );
};

export default Field;
