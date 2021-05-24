import React,{useState} from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./addPost.css";
// import { render } from "react-dom";

var obj = { };
function Addpost(props) {
  
  const [value,setValue]=useState('Choose a Category');
  const handleSelect=(e)=>{
    console.log(e.toString());
    console.log("hello")
    obj.category = e
    setValue(e)
  }
  console.log(obj)
  return (
    <div>
       <h1>Create a Post</h1>
      <DropdownButton id="Categories" title= {value}  onSelect={handleSelect} >
        <Dropdown.Item  eventKey="NFT">NFT</Dropdown.Item>
        <Dropdown.Item  eventKey="Crypto Collectibles">Crypto Collectibles</Dropdown.Item>
        <Dropdown.Item  eventKey="Licenses">Licenses</Dropdown.Item>
        <Dropdown.Item  eventKey="Games">Games</Dropdown.Item>
        <Dropdown.Item  eventKey="Softwares">Softwares</Dropdown.Item>
      </DropdownButton>
     
      <div className="addPost-form">
        <Form  onSubmit={(event) => {
          event.preventDefault()
          const name = obj.name.value
          const baseprice = window.web3.utils.toWei(obj.productPrice.value.toString(), 'Ether')
          const discription = obj.discription.value
          const category = {value}
          const ncategory = Object.values(category)
          console.log(ncategory)
          props.createProduct(name, baseprice, discription, ncategory[0])
          
            }} >
          <Form.Row>
            <Form.Group as={Col} controlId="formGridTitle">
              <Form.Control
                className="Field"
                required
                type="text"
                placeholder="Title"
                ref={(input) => { obj.name = input }}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridPrice">
            <Form.Control
              required
              className="Field"
              type="number"
              placeholder="Price"
              ref={(input) => { obj.productPrice = input }}
            />
          </Form.Group>

          <Form.Group controlId="formGridDescription">
            <Form.Control
              type="text"
              className="Field"
              placeholder="Description"
              ref={(input) => { obj.discription = input }}
            />
          </Form.Group>
          <div>
            <input 
            id = "file"
            type="file"
            // ref={(input) => {this.file = input}  }
            className="form-control"
            placeholder="Product Price"
            onChange={props.Capturefile}
            />
          </div>
        
          {/* <Form.File
            id="custom-file"
            label="Upload Images"
            custom
            className="custom-file"
            onChange={props.Capturefile}
           
          /> */}
          {/* below format for file in form  */}
          {/* <Form.Group>
              <Form.File   onChange={props.Capturefile} id="exampleFormControlFile1" label="Example file input" />
          </Form.Group> */}
           <div className="text-right">
            <Button  onClick={props.createhash} variant="primary" >
              Add Image
            </Button>
          </div>
          <div className="text-right">
            <Button variant="primary" id="AddPost" type="submit">
              Add Product
            </Button>
          </div>
        </Form>
      </div>
      
    </div>
  )
 
}

export default Addpost
