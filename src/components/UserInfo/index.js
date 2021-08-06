import React from "react";
import styles from "./userInfo.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import Component from "./util/Input";
import { RSA } from "hybrid-crypto-js";

var rsa = new RSA();
 function Generate() {
   const pk = localStorage.getItem("publicKey")
   const pvk = localStorage.getItem("privateKey")
   if (pk === pvk){
    rsa.generateKeyPair(function (keyPair) {
      // Callback function receives new key pair as a first argument
      var publicKey = keyPair.publicKey;
      var privateKey = keyPair.privateKey;
      localStorage.setItem("publicKey", publicKey);
      localStorage.setItem("privateKey", privateKey);
      
    }, 1024)
   }
   localStorage.setItem("generated", "true");

    
}

const signInSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Name is required")
    .max(60, "Name is too long - should be less than 100 chars"),
  streetAdress1: Yup.string().required("Address is required"),
  streetAdress2: Yup.string(),
  state: Yup.string().required("State is Required"),
  location: Yup.string().required(),
  pincode: Yup.number().required("Pincode is Required"),
  phoneNumber: Yup.number().required("Phone Number is Required"),
  email: Yup.string().required("Email is Required"),
});
const initialValues = {
  fullName: "",
  streetAdress1: "",
  streetAdress2: "",
  state: "",
  location: "",
  pincode: "",
  phoneNumber: "",
  email: "",
};
export default function UserInfo() {
  let containerStyle = {
    width: "80%",
  };

    return (
        <div className="container">
        {localStorage.getItem("generated")==="true" ? <h1>Edit Profile</h1> : <h1> Create Account </h1>}
        <Formik
          initialValues={initialValues}
          validationSchema={signInSchema}
          onSubmit={(values) => {
            const name = values.fullName;
            const email = values.email;
            const address = values.streetAdress1;
            const location = values.state + "," + values.location;
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("location", location);
            localStorage.setItem("address", address);
            if(localStorage.getItem("generated") === null){
                 Generate();
            }   
            window.location.href = '/'
                   
          }}
        >
          {(formik) => {
            return (
              <div className={styles.containerStyle + " container"} style={containerStyle}>
                <Form onSubmit={formik.handleSubmit} >
                  <div className="row">
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <Component name="Full Name" formik id={"fullName"} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <h4>Street Adress 1</h4>
                      <Component formik id={"streetAdress1"} />
                    </div>
                    <div className="col-12">
                      <h4>Street Adress 2 (optional)</h4>
                      <Component formik id={"streetAdress2"} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6 col-sm-12 col-lg-6 my-2">
                      <Component name="State" formik id={"state"} />
                    </div>
                    <div className="col-12 col-md-6 col-sm-12 col-lg-6 my-2">
                      <Component name="City/District" formik id={"location"} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6 col-sm-12 col-lg-6 my-2">
                      <Component name="Pincode" formik id={"pincode"} />
                    </div>
                    <div className="col-12 col-md-6 col-sm-12 col-lg-6 my-2">
                      <Component name="Country" formik id={"location1"} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <Component name="Phone Number" formik id={"phoneNumber"} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <Component name="Email" formik id={"email"} />
                    </div>
                  </div>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
    
                  >
                    Save Changes
                  </Button>
                </Form>
              </div>
            );
          }}
        </Formik>
        </div>
      );
}
  