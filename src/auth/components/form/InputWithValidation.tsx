import { FormikProps } from "formik";
import Form from "react-bootstrap/Form";

export const InputWithValidation = ({
  label,
  formik,
  id,
  type,
  placeholder,
}: {
  label: string;
  formik: FormikProps<any>;
  id: string;
  type: string;
  placeholder: string;
}) => {
  return (
    <Form.Group>
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <Form.Control
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[id] ?? ""}
        isInvalid={formik.touched[id] && !!formik.errors[id]}
        isValid={formik.touched[id] && !formik.errors[id]}
      />
      <Form.Control.Feedback type="invalid">
        {formik.errors[id]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
