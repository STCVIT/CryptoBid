import "./login.css";
import React from 'react';
import loginimg from "./login_img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function Loginpg() {
  return (
    <div className="conatiner d-flex">
      <div className="col-md-6 lgpgleft">
        <h1>Login</h1>
        <button type="button" className="btn btn-light">
        <i className="fab fa-google"></i> <b className="p-2">Sign in using Google</b>
        </button>
        <form>
          <div className="form-row">
            <label><h4>Email:<span className="str">*</span> </h4>
              
              <input type="text" name="mail"  placeholder="mail@website.com" className="form-control inpbox" />
            </label>
          </div>
          <div className="form-row">
            <label>
              <h4>Password:<span className="str" >*</span></h4> 
              <input type="password" name="password" placeholder="Min. 8 characters"className="form-control inpbox" />
            </label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" for="rememberme">Remember me</label>
            <a href=""><span className="fp">Forgot password</span></a>
          </div>
          <div className="form-row">
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
          <div className="form-row">
            <p>Not registered yet? <a href="">Create account</a></p>
            
          </div>
        </form>
      </div>
      <div className="col-md img">
        <img src={loginimg} alt="" className="img-responsive float-centre" />
      </div>
    </div>
  );
}

export default Loginpg;
