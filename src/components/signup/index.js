import React from "react";
import "./styles.css";
import styleimg from "./login_img.png";
// import {abc} from "../encrypt/index"
import { Crypt, RSA } from 'hybrid-crypto-js';
var obj = {};
var crypt = new Crypt({
  md:'sha1',
  aesStandard: 'AES-CBC',
  aesKeySize: 128
});
var rsa = new RSA();
// const abc = require("../encrypt")
// const iv = crypto.randomBytes(16);
// const IV_LENGTH = 16;
// let iv = crypto.randomBytes(IV_LENGTH);
function Signup(props) {
  
  return (
    <div className="row main-container">
      <div className="col left-side ">
        <form className="form-signin" 
        onSubmit={(event) => {
          event.preventDefault()
          const name = obj.name.value
          const email = obj.email.value
          const password = obj.password.value
          const address = obj.address.value
          localStorage.setItem("name",name)
          localStorage.setItem("email",email)
          localStorage.setItem("password",password)
          localStorage.setItem("address",address)
          
          rsa.generateKeyPair(function(keyPair) {
            // Callback function receives new key pair as a first argument
          var publicKey = keyPair.publicKey;
          var privateKey = keyPair.privateKey;
          console.log(publicKey)
          console.log(privateKey)
          localStorage.setItem("publicKey", publicKey)
          localStorage.setItem("privateKey", privateKey)
  },1024);

          
            }} >
          <h1>Sign Up</h1>
          <div className="text-center mb-4">
            <button className="btn btn-outline-dark google">
              <img
                src="https://img.icons8.com/fluent/48/000000/google-logo.png"
                alt=""
              />
              Sign in with Google
            </button>
          </div>

          <label htmlFor="inputName">
            Name
            <div className="form-label-group">
              <input
                type="text"
                id="inputName"
                className="form-control"
                placeholder="Name"
                ref={(input) => { obj.name = input }}
                required
                autoFocus
              />
            </div>
          </label>
          <label htmlFor="inputEmail">
            Email address
            <div className="form-label-group">
              <input
                type="email"
                id="inputEmail"
                className="form-control"
                placeholder="Email address"
                ref={(input) => { obj.email = input }}
                required
                autoFocus
              />
            </div>
          </label>
          <label htmlFor="inputPassword">
            Password
            <div className="form-label-group">
              <input
                type="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                ref={(input) => { obj.password = input }}
                required
              />
            </div>
          </label><label htmlFor="inputPassword">
            Address
            <div className="form-label-group">
              <input
                type="text"
                id="homeaddress"
                className="form-control"
                placeholder="home address"
                ref={(input) => { obj.address = input }}
                required
              />
            </div>
          </label>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="termsAndCondition" required />
                I agree to the Terms and Conditions
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit" >
            Sign in
          </button>
          <span>Already have an Account? </span>
          <a href="\">Log in</a>
        </form>
      </div>
      <div className="col right-side">
        <img className="img-fluid" src={styleimg} alt="" />
      </div>
    </div>
  );
}
export default Signup;