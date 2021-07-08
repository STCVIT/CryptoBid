import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlus,
  faExchangeAlt,
  faFile,
  faList,
} from "@fortawesome/free-solid-svg-icons";

const NavItem = ({ navItem }) => {
  let IconStyle = {
    marginRight: "1.5em",
  };
  return (
    <Link
      className="py-2 px-4 d-flex m-2 rounded-pill list-group-item list-group-item-action border-0 "
      to={`/${navItem.link}`}
    >
      <FontAwesomeIcon className="m-1"
        icon={
          {
            home: faHome,
            categories: faList,
            addnew: faPlus,
            transactions: faExchangeAlt,
            ongoing: faFile,
          }[navItem.icon]
        }
        style={IconStyle}
      />
      <div className="px-4">{navItem.text}</div>
    </Link>
  );
};

class Header extends Component{

  // let AuctionHeading = {
  //   color: "#2F80EC",
  //   fontWeight: "600",
  // };
  render() {
  return (
    <div className="d-flex" id="wrapper">
      <div className="border-right" id="sidebar-wrapper">
        <div className="sidebar-heading">
        <a href="/"> <img src="https://via.placeholder.com/48"  alt="logo"/> </a> 
          <br />
          {/* <span style={AuctionHeading}>Auction</span> */}
        </div>
        <br />
        <div className="list-group list-group-flush align-items-center text-left " >
          {[
            {
              link: "home",
              text: "Home",
              icon: "home",
            },
            {
              link: "categories",
              text: "Categories",
              icon: "categories",
            },
            {
              link: "addnew",
              text: "Add New",
              icon: "addnew",
            },
            {
              link: "ongoing",
              text: "Ongoing",
              icon: "transactions",
            },
            {
              link: "assests",
              text: "Assests",
              icon: "ongoing",
            },
            {
              link: "signup",
              text: "Signup",
              icon: "ongoing",
            }
          ].map((navItem, index) => {
            return <NavItem key={index} navItem={navItem} />;
          })}
        </div>
      </div>
    </div>
  );
}
}

export default Header;
