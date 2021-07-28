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
          {/* Column2 */}
          <div className={"col col-md-3 "+ styles.pagescol}>
            <h3>Pages</h3>
            <ui className="list-unstyled  " >
              <li >
              <a style={{ color: "white" }} href="/">Home</a></li>
              <li>
              <a style={{ color: "white" }} href="/history">History</a></li>
              <li>
              <a style={{ color: "white" }} href="/ongoing">Ongoing</a></li>
              <li>
              <a style={{ color: "white" }} href="/addnew">Add New</a></li>
            </ui>
          </div>
          {/* Column3 */}
          <div className={"col col-md-3 "+ styles.connectcol}>
            <h3>Connect</h3>
            <ui className="list-unstyled ">
              <li>FAQ</li>
              <li>Support</li>
              <li>Feedback</li>
            </ui>
          </div>
        </div>
        <hr color="#2D396B" />
        <div className={ " row"}>
          <p className={"col-sm-3 "}>
            &copy;{new Date().getFullYear()} CryptoAuction, Inc. All Rights
            Reserved
          </p>
          <a className={"col-sm-3 " + styles.last1}>T&C</a>
          <a className={"col-sm-3 "+styles.last}>Privacy Policy</a>
          <p className={"col-sm-3 "+styles.last2}>
            <FiGithub />
            &nbsp;
            <FiInstagram />
            &nbsp;
            <FiFacebook />
            &nbsp;
            <FiLinkedin />
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
