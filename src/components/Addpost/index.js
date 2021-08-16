import React, { useState } from "react";
import styles from "./addPost.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import DatePickerField from "./util/DatePicker";
import Component from "./util/Input";
function DateInc() {
  var date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
}
const signInSchema = Yup.object().shape({
  productName: Yup.string()
    .required("Product Name is required")
    .min(0, " Name is too short - should be 10 chars min")
    .max(30, "Product Name is too long - should be less than 100 chars"),
  productDesc: Yup.string()
    .required("Description is required")
    .min(2, " Description is too short - should be 20 chars min")
    .max(400, "Description is too long - should be less than 300 chars"),
  startingPrice: Yup.number().required("Price is Required"),
  minimumBids: Yup.number().required("Minimum bids are required"),
  category: Yup.string().required("Select Category"),
  tags: Yup.string(),
  endingDate: Yup.string(),
});

const initialValues = {
  productName: "",
  productDesc: "",
  startingPrice: "",
  minimumBids: "",
  category: "",
  tags: "",
  startingDate: "",
  endingDate: Date.now(),
};
function Addpost(props) {
  // let containerStyle = {
  //   width: "70%",
  // };
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  function validateFile (file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
    if (validTypes.indexOf(file.type) === -1) {
        return false;
    }
    return true;
}
  const onChangePicture = (e) => {
   
    
    if (e.target.files[0]) {
      if(validateFile(e.target.files[0]))
      {
        setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      props.Capturefile(e);
      }
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={(values) => {
        const publicKey = localStorage.getItem("publicKey");
        let endtime = Date.parse(values.endingDate);
        let baseprice = window.web3.utils.toWei(
          values.startingPrice.toString(),
          "Ether"
        );
        let bidinc = window.web3.utils.toWei(
          values.minimumBids.toString(),
          "Ether"
        );
        props.createProduct(
          values.productName,
          baseprice,
          values.productDesc,
          values.category,
          publicKey,
          bidinc,
          parseInt(endtime)
        );
      }}
    >
      {(formik) => {
        const { errors, touched } = formik;
        return (
           <div className={"container " + styles.container} >
            <Form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-12 col-md-6 col-sm-12 col-lg-6 col-xs-12 my-2">
                  <h2>Product Image</h2>
                  <div className={styles.formContainer}>
                    <div className={styles.imageUploadWrap}>
                      <input
                        className={styles.fileUploadInput}
                        type="file"
                        onChange={onChangePicture}
                        accept="image/*"
                      />
                      {imgData === null ? (
                        <>
                          <div className={styles.dragText}>
                            <h3>Drop a file or select to Add</h3>
                          </div>
                        </>
                      ) : (
                        <div className="text-center">
                          <img
                            className={styles.fileUploadImage + " text-center "}
                            src={imgData}
                            type="image"
                            alt="Productimage"
                            required
                          />
                        </div>
                      )}
                    </div>
                    {/* <Button
                      className={styles.upload}
                      onClick={props.createhash}
                      variant="primary"
                      required
                     
                    >
                      Upload Image
                    </Button> */}
                    <div className={styles.fileUploadContent}></div>
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
                  <Component
                    name="Bid Increment (in Eth)"
                    formik
                    id={"minimumBids"}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6 col-sm-12 col-lg-6 my-2">
                  <Field name="endingDate" component={DatePickerField} />
                </div>
                <div className="col-12 col-md-6 col-sm-12 col-lg-6 my-2">
                  <Component name="Category" formik id={"category"} />
                </div>
              </div>
              <div className="row">
              
                <div className="col-12 col-md-6 col-sm-12 col-lg-6 my-2">
                  <Button
                    //color="primary"
                    className={styles.cb}
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Cancel
                  </Button>
                </div>
                <div className="col-12 col-md-6 col-sm-12 col-lg-6 my-2">
                  <Button
                    className={styles.sb}
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
                
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
export default Addpost;
