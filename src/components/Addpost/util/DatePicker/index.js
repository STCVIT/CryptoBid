import React from 'react'
import { ErrorMessage, useField } from "formik";
import TextField from "@material-ui/core/TextField";
import styles from "../../addPost.module.css";

function DatePicker(props) {
    const [field] = useField(props.id);
    return (
      <div className={styles.ProductForm}>
        <TextField
          {...field}
          id={styles.datetimeLocal}
          label={props.label}
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <ErrorMessage name={props.id} />
      </div>
    );
  }

export default DatePicker
