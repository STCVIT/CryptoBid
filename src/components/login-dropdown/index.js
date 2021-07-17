import React from "react";
import { Dropdown } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";
import styles from "./styles.module.css";
function LoginDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle className={styles.But}>
        <AiOutlineUser />
      </Dropdown.Toggle>
      <Dropdown.Menu
        style={{ backgroundColor: "#131a3e" }}
        className={styles.textcard}
      >
         {
           [
      {
        Name: "Edit Profile",
        Link: "/profile",
      },
      {
        Name: "Feedback",
        Link: "/feedback",
      },
      {
        Name: "Contact Us",
        Link: "/contact-us",
      }].map((List) => {
      return (
        <Dropdown.Item
          className={styles.action}
          style={{ color: "white" }}
          href={List.Link}
        >
          {List.Name}
        </Dropdown.Item>
      );
    })}

        <Dropdown.Item style={{ color: "red" }} href="#/action-3">
          <i className="fas fa-sign-in-alt fa-rotate-180"></i> Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LoginDropdown;
