import React , {useState} from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import logo from "./Logo.png";
import "@fontsource/metropolis";
import LoginDropdown from "../login-dropdown"
const a = localStorage.getItem("generated");
const NavItem = ({ navItem }) => {
  return (
    <li className="nav-item p-2">
      <Link className={"nav-link " + navItem.style} to={`/${navItem.link}`}>
        {navItem.text} <span className="sr-only">(current)</span>
      </Link>
    </li>
  );
};
const search1 = {}
function NavigationBar() {
  const [value, setValue] = useState("");

  const handleChange = e => {
    setValue(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    window.open('/Search='+value,"_self" );
  };
  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" id={styles.Navbar}>
        <Link className="navbar-brand pl-5" to="/">
          <img src={logo} height="80" width="80"></img>
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav p-2 mr-auto ">
            <div className="search-box">
              <div className="input-group rounded">
                <form>
                
                <input
                  type="search"
                  id="search"
                  className="form-control rounded"
                  placeholder="&#128269; Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  className={styles.Searchbox}
                  ref={(input) => { search1.search= input }}
                  onChange={handleChange}
                  onKeyPress={handleKeypress}
                />
                
                    <button hidden onClick={handleSubmit} type="submit">
                      Submit
                    </button>
                </form>
              
                
                
              </div>
            </div>
            <div></div>
            {[
              {
                link: "",
                text: "Home",
              },
              {
                link: "history",
                text: "History",
              },
              {
                link: "ongoing",
                text: "Ongoing",
              },
            ].map((navItem, index) => {
              return <NavItem key={index} navItem={navItem} />;
            })}
          </ul>
          {a === "true" ? (
            <ul className={"navbar-nav p-2 " + styles.navbarNav + " " + styles.Right}>
              {[
                {
                  link: "addnew",
                  text: "Add New",
                  icon: "addnew",
                  style: "AddProduct",
                },
              ].map((navItem, index) => {
                return <NavItem key={index} navItem={navItem} />;
              })}

              <LoginDropdown className={styles.User}/>
            </ul>
          ) : (
            <ul className={"navbar-nav  ml-auto p-2 "+  styles.navbarNav}>
              {[
                {
                  link: "signup",
                  text: "Signup",
                  style: "connect",
                },
              ].map((navItem, index) => {
                return <NavItem key={index} navItem={navItem} />;
              })}
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
            }
export default NavigationBar;

