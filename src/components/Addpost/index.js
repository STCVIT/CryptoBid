
import React from "react";
import * as Yup from "yup";
import "./addPost.css";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

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
  startingDate: Yup.date().required(),
  endingDate: Yup.date().required(),
});

const initialValues = {
  productName: "",
  productDesc: "",
  startingPrice: 0,
  minimumBids: 0,
  category: "",
  tags: "",
  startingDate: "",
  endingDate: "",
};

function Addpost(props) {
  let containerStyle = {
    width: "70%",
  };
  function Component(props, formik) {
    return (
      <div>
        <h2>{props.name}</h2>
        <Field type="string" name={props.id} className={"Product-form"} />
        <ErrorMessage name={props.id} />
      </div>
    );
  }
  function Tags(props) {
    const classes = useStyles();
    const [field] = useField(props.id);
    return (
      <div>
        <h2>Tags</h2>
        <div className={(classes.root, "Product-form")}>
          <Autocomplete
            multiple
            id="tags-filled"
            options={taglist.map((option) => option.title)}
            defaultValue={[taglist[0].title]}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  id="tags-filled"
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                {...field}
                id="TextfieldTag"
                variant="filled"
                placeholder="Tags"
              />
            )}
          />
        </div>
      </div>
    );
  }
  const taglist = [{ title: "Games" }, { title: "NFT" }];

  function DatePicker(props) {
    const [field] = useField(props.id);
    return (
      <div className="Product-form">
        <TextField
          {...field}
          id="datetime-local"
          label={props.label}
          type="date"
          defaultValue="2017-05-24"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <ErrorMessage name={props.id} />
      </div>
    );
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={(values) => {
        const publicKey = localStorage.getItem("publicKey")
        console.log(JSON.stringify(values));
        console.log(values);
        console.log(values.startingPrice)
        console.log(values.startingPrice.toString())
        let baseprice = window.web3.utils.toWei(values.startingPrice.toString(), 'Ether')
        let baseprice1 = parseInt(baseprice)
        // console.log(typeof(baseprice1))
        console.log(baseprice)
        props.createProduct(values.productName, baseprice , values.productDesc, values.category,publicKey)
      }}
    >
      {(formik) => {
        const { values, errors, touched, isValid, dirty } = formik;

        return (
          <div className="container" style={containerStyle}>
            <Form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-12 col-md-6 col-sm-12 col-lg-6 col-xs-12 my-2">
                  <h2>Product Image</h2>
                  <div className="form-container">
                    <div className="image-upload-wrap">
                      <input
                        className="file-upload-input"
                        type="file"
                        onChange={props.Capturefile}
                        accept="image/*"
                      />
                      <div className="drag-text">
                        <h3>Drop a file or select to Add</h3>
                      </div>
                      
                    </div>
                    <Button  onClick={props.createhash} variant="primary" >
                          Add Image
                      </Button>
                    <div className="file-upload-content">
                      <img
                        className="file-upload-image"
                        src="#"
                        alt="your image"
                      />
                      
                      
                      <div className="image-title-wrap">
                        <button
                          type="button"
                          onclick="removeUpload()"
                          className="remove-image"
                        >
                          Remove{" "}
                          <span className="image-title">Uploaded Image</span>
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
                      id="prod-desc"
                      className={
                        (errors.productDesc && touched.productDesc
                          ? "input-error"
                          : null,
                        "Product-form")
                      }
                    />
                    <ErrorMessage name="productDesc" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6 col-sm-12 col-lg-6 my-2">
                  <Component
                    name="Starting Price"
                    formik
                    type="number"
                    id={"startingPrice"}
                  />
                </div>
                <div className="col-12 col-md-6 col-sm-12 col-lg-6 my-2">
                  <Component name="Minimum Bids" formik id={"minimumBids"} />
                </div>
              </div>
              <h2>Starting and Ending time</h2>
              <div className="row">
                <div className="col-12 col-md-6 col-sm-12 col-lg-6 my-2">
                  <DatePicker label="Starting time" id="startingDate" />
                </div>
                <div className="col-12 col-md-6 col-sm-12 col-lg-6 my-2">
                  <DatePicker label="Ending time" id="endingDate" />
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

// import { render } from "react-dom";

// var obj = { };
// function Addpost(props) {
  
//   const [value,setValue]=useState('Choose a Category');
//   const handleSelect=(e)=>{
//     console.log(e.toString());
//     console.log("hello")
//     obj.category = e
//     setValue(e)
//   }
//   console.log(obj)
//   return (
//     <div>
//        <h1>Create a Post</h1>
//       <DropdownButton id="Categories" title= {value}  onSelect={handleSelect} >
//         <Dropdown.Item  eventKey="NFT">NFT</Dropdown.Item>
//         <Dropdown.Item  eventKey="Crypto Collectibles">Crypto Collectibles</Dropdown.Item>
//         <Dropdown.Item  eventKey="Licenses">Licenses</Dropdown.Item>
//         <Dropdown.Item  eventKey="Games">Games</Dropdown.Item>
//         <Dropdown.Item  eventKey="Softwares">Softwares</Dropdown.Item>
//       </DropdownButton>
     
//       <div className="addPost-form">
//         <Form  onSubmit={(event) => {
//           event.preventDefault()
//           const name = obj.name.value
//           const baseprice = window.web3.utils.toWei(obj.productPrice.value.toString(), 'Ether')
//           const discription = obj.discription.value
//           const category = {value}
//           const ncategory = Object.values(category)
//           console.log(ncategory)
//           props.createProduct(name, baseprice, discription, ncategory[0])
          
//             }} >
//           <Form.Row>
//             <Form.Group as={Col} controlId="formGridTitle">
//               <Form.Control
//                 className="Field"
//                 required
//                 type="text"
//                 placeholder="Title"
//                 ref={(input) => { obj.name = input }}
//               />
//             </Form.Group>
//           </Form.Row>

//           <Form.Group controlId="formGridPrice">
//             <Form.Control
//               required
//               className="Field"
//               type="number"
//               placeholder="Price"
//               ref={(input) => { obj.productPrice = input }}
//             />
//           </Form.Group>

//           <Form.Group controlId="formGridDescription">
//             <Form.Control
//               type="text"
//               className="Field"
//               placeholder="Description"
//               ref={(input) => { obj.discription = input }}
//             />
//           </Form.Group>
//           <div>
//             <input 
//             id = "file"
//             type="file"
//             // ref={(input) => {this.file = input}  }
//             className="form-control"
//             placeholder="Product Price"
//             onChange={props.Capturefile}
//             />
//           </div>
        
//           {/* <Form.File
//             id="custom-file"
//             label="Upload Images"
//             custom
//             className="custom-file"
//             onChange={props.Capturefile}
           
//           /> */}
//           {/* below format for file in form  */}
//           {/* <Form.Group>
//               <Form.File   onChange={props.Capturefile} id="exampleFormControlFile1" label="Example file input" />
//           </Form.Group> */}
          //  <div className="text-right">
          //   <Button  onClick={props.createhash} variant="primary" >
          //     Add Image
          //   </Button>
          // </div>
//           <div className="text-right">
//             <Button variant="primary" id="AddPost" type="submit">
//               Add Product
//             </Button>
//           </div>
//         </Form>
//       </div>
      
//     </div>
//   )
 
// }

// export default Addpost


