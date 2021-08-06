import React from "react";
import styles from "./Footer.module.css";
import { BsFillSquareFill } from "react-icons/bs";
import { FiGithub, FiInstagram, FiFacebook, FiLinkedin } from "react-icons/fi";

function Footer() {
  return (
    <footer className={styles.mainFooter}>
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className={"col col-md-3 "+ styles.respfooter}>
            <h3>
              <BsFillSquareFill color="#6D28D9" /> CryptoBid
            </h3>
          </div>
          {/* Space */}
          <div className="col col-md-3"> </div>
   
        
        </div>
        <hr color="#2D396B" />
        <div className={ " row"}>
          <p className={"col-sm-3 "}>
            &copy;{new Date().getFullYear()} CryptoAuction, Inc. All Rights
            Reserved
          </p>
          <p className={"col-sm-3 ml-auto "}>
           Made with &#9829; by STC
          </p>
         
        </div>
      </div>
    </footer>
  );
}

export default Footer;
