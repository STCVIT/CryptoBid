import React from 'react'
import {Field, ErrorMessage } from "formik";
import styles from "../../addPost.module.css";
function Component(props) {
    return (
      <div>
        <h2>{props.name}</h2>
        <Field type="string" name={props.id} className={styles.ProductForm} />
        <ErrorMessage name={props.id} />
      </div>
    );  
  }
  export default  Component