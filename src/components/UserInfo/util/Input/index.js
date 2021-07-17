import React from "react";
import { Field, ErrorMessage } from "formik";
import styles from "../../userInfo.module.css";
function Component(props) {
  return (
    <div>
      <h4>{props.name}</h4>
      <Field type="string" name={props.id} className={styles.ProductForm} />
      <ErrorMessage name={props.id} />
    </div>
  );
}
export default Component;