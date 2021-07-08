import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import logo from "./Logo.png"
import "@fontsource/metropolis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";

const NavItem = ({ navItem }) => {
  let IconStyle = {
    marginRight: "1.5em",
  };
  return (
    <li className="nav-item p-2">
      <Link className={"nav-link " + navItem.style} to={`/${navItem.link}`}>
        {navItem.text} <span className="sr-only">(current)</span>
      </Link>
    </li>
  );
};

function NavigationBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" id="Navbar">
        <Link className="navbar-brand pl-5" to="/">
          <img src={logo} height="80" width="80"></img>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto p-2">
          <div className="search-box">
            <div className="input-group rounded">
              <input
                type="search"
                className="form-control rounded"
                placeholder= "&#128269; Search"  
                aria-label="Search"
                aria-describedby="search-addon"
                className="Searchbox"
              />
            </div>
          </div>
          <div>
            
          </div>
          {[
              {
                link: "home",
                text: "Home",
                icon: "home",
              },
              {
                link: "assests",
                text: "Assests",
                icon: "ongoing",
              },
              {
                link: "ongoing",
                text: "Ongoing",
                icon: "ongoing",
              }].map((navItem, index) => {
                return <NavItem key={index} navItem={navItem} />;
              })}
          </ul>
          <ul className="navbar-nav  ml-auto p-2 " >
          {[
              {
                link: "addnew",
                text: "Add New",
                icon: "addnew",
                style: "AddProduct"
              },
              {
                link: "signup",
                text: "Signup",
                style: "connect"
              }
            ].map((navItem, index) => {
              return <NavItem key={index} navItem={navItem} />;
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavigationBar;