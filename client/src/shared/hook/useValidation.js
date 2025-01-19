import { useEffect } from "react";
import { useFormik } from "formik";

export const useValidation = ({ state, handleSubmit, validationSchema }) => {
  const formik = useFormik({
    initialValues: state,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  useEffect(() => {
    formik.setValues(state);
  }, [state]);

  const isErrorField = (fieldName) => {
    return formik.touched[fieldName] && Boolean(formik.errors[fieldName]);
  };

  const getErrorMessage = (fieldName) => {
    return formik.touched[fieldName] && formik.errors[fieldName];
  };

  return { formik, isErrorField, getErrorMessage };
};
