import React from "react";
import styles from "./Footer.module.css";
import { BsFillSquareFill } from 'react-icons/bs';
import { FiGithub } from 'react-icons/fi';
import { FiInstagram } from 'react-icons/fi';
import { FiFacebook } from 'react-icons/fi';
import { FiLinkedin } from 'react-icons/fi';

function Footer() {
  return (
    <footer className={styles.mainFooter}>
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col col-md-3">
            <h3><BsFillSquareFill color="#6D28D9"/> Crypto Auction</h3>
          </div>
          {/* Space */}
          <div className="col col-md-3"> </div>
          {/* Column2 */}
          <div className="col col-md-3">
            <h3>Pages</h3>
            <ui className="list-unstyled">
              <li>Seasonal</li>
              <li>Add Product</li>
              <li>History</li>
              <li>Ongoing</li>
            </ui>
          </div>
          {/* Column3 */}
          <div className="col col-md-3">
            <h3>Connect</h3>
            <ui className="list-unstyled">
              <li>FAQ</li>
              <li>Support</li>
              <li>Feedback</li>
            </ui>
          </div>
        </div>
        <hr color="#2D396B"/>
        <div className={styles.last + " row"}>
          <p className="col-sm-3">
            &copy;{new Date().getFullYear()} CryptoAuction, Inc. All Rights Reserved
          </p>
          <a className={"col-sm-3 " + styles.last}>T&C
          </a>
          <a className="col-sm-3 last">Privacy Policy
          </a>
          <p className="col-sm-3 last"><FiGithub />&nbsp;<FiInstagram />&nbsp;<FiFacebook />&nbsp;<FiLinkedin />
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
