import React from "react";
import styles from "./addPost.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import DatePickerField from "./util/DatePicker";
import Component from "./util/Input";
import Tags from "./util/Tags";


const signInSchema = Yup.object().shape({
  productName: Yup.string()
    .required("Product Name is required")
    .min(0, " Name is too short - should be 10 chars min")
    .max(10, "Product Name is too long - should be less than 100 chars"),
  productDesc: Yup.string()
    .required("Description is required")
    .min(2, " Description is too short - should be 20 chars min")
    .max(300, "Description is too long - should be less than 300 chars"),
  startingPrice: Yup.number().required("Price is Required"),
  minimumBids: Yup.number().required("Minimum bids are required"),
  category: Yup.string().required("Select Category"),
  tags: Yup.string(),
  startingDate: Yup.date().default(function () {
    return new Date();
  }).min(new Date(Date.now())).required()
  ,
  endingDate: Yup.date().default(function () {
    return new Date();
  }).min(new Date(Date.now())).required(),
});
const initialValues = {
  productName: "",
  productDesc: "",
  startingPrice: "",
  minimumBids: "",
  category: "",
  tags: "",
  startingDate: "",
  endingDate: "",
};
function Addpost(props) {
  let containerStyle = {
    width: "70%",
  };
  return (
    <Formik
    initialValues={initialValues}
    validationSchema={signInSchema}
    onSubmit={(values) => {
      const publicKey = localStorage.getItem("publicKey")
      console.log(JSON.stringify(values));
      console.log(values);
      let endtime = Date.parse(values.endingDate)
      console.log(endtime)
      console.log(values.startingPrice)
      console.log(values.startingPrice.toString())
      let baseprice = window.web3.utils.toWei(values.startingPrice.toString(), 'Ether')
      let bidinc = window.web3.utils.toWei(values.minimumBids.toString(), 'Ether')
      // const bidinc1 = parseInt(values.minimumBids , 2)
      // let baseprice1 = parseInt(baseprice)
      // console.log(typeof(baseprice1))
      console.log(baseprice)
      console.log(values.endingDate)
      props.createProduct(values.productName, baseprice , values.productDesc, values.category,publicKey, bidinc, parseInt(endtime))
    }}
  >
    {(formik) => {
      const { errors, touched } = formik;
      return (
        <div className="container" style={containerStyle}>
          <Form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-12 col-md-6 col-sm-12 col-lg-6 col-xs-12 my-2">
                <h2>Product Image</h2>
                <div className={styles.formContainer}>
                  <div className={styles.imageUploadWrap}>
                    <input
                      className={styles.fileUploadInput}
                      type="file"
                      onChange={props.Capturefile}
                      accept="image/*"
                    />
                    <div className={styles.dragText}>
                      <h3>Drop a file or select to Add</h3>
                    </div>
                  </div>
                  <Button  onClick={props.createhash} variant="primary" >
                          Add Image
                      </Button>
                  <div className={styles.fileUploadContent}>
                    <img
                      className={styles.fileUploadImage}
                      src=""
                      alt="   file"
                    />
                    <div className={styles.imageTitleWrap}>
                      <button
                        type="button"
                        // onClick="removeUpload()"
                        className={styles.removeImage}
                      >
                        Remove{" "}
                        <span className={styles.imageTitle}>Uploaded Image</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-sm-12 col-lg-6 my-2">
                <div>
                  <div>
                    <Component
                      name="Product Name"
                      formik
                      id={"productName"}
                    />
                  </div>
                </div>
                <div>
                  <h2>Description</h2>
                  <Field
                    as="textarea"
                    control="textarea"
                    type="string"
                    name="productDesc"
                    id={styles.prodDesc}
                    className={
                      (errors.productDesc && touched.productDesc
                        ? "input-error"
                        : null,
                      styles.ProductForm)
                    }
                  />
                  <ErrorMessage name="productDesc" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-sm-12 col-lg-6 my-2">
                <Component
                  name="Starting Price (in Eth)"
                  formik
                  id={"startingPrice"}
                />
              </div>
              <div className="col-12 col-md-6 col-sm-12 col-lg-6 my-2">
                <Component name="Bid Increment (in Eth)" formik id={"minimumBids"} />
              </div>
            </div>
            <h2>Starting and Ending time</h2>
            <div className="row">
              <div className="col-12 col-md-6 col-sm-12 col-lg-6 my-2">
              <Field name="startingDate" component={DatePickerField} />
              </div>
              <div className="col-12 col-md-6 col-sm-12 col-lg-6 my-2">
              <Field name="endingDate" component={DatePickerField} />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-sm-12 col-lg-6 my-2">
                <Component name="Category" formik id={"category"} />
              </div>
              <div className="col-12 col-md-6 col-sm-12 col-lg-6 my-2">
                <Tags id="tags" />
              </div>
            </div>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      );
    }}
  </Formik>
);
}
export default Addpost

