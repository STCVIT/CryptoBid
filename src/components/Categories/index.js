import {
  faCoins,
  faCompactDisc,
  faDiceThree,
  faIdBadge,
  faLaptopCode,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import "./search-item.css";
import Category from "./Cat"
import { Button } from 'react-bootstrap';


function Categories(props) {
 const [CurrentCategory, setCurrentCategory] = useState('')

  const CatButton = ({ categories }) => {
    const buttonStyle = {
      height: "16vh",
      width: "18vh",
      backgroundColor: "#ffffff",
      color: "black",
      border: "none",
    };
    const IconStyle = {
      fontSize: "2em",
    };
    return (
      <button
        className="btn btn-primary mx-2 CatButton"
        style={buttonStyle}
        onClick={()=>{
          setCurrentCategory(categories.Name)
        }}
      >
        <FontAwesomeIcon
          style={IconStyle}
          className="w-100 my-2"
          icon={
            {
              NFT: faCoins,
              CryptoCollectibles: faCompactDisc,
              Licenses: faIdBadge,
              Games: faDiceThree,
              Softwares: faLaptopCode,
            }[categories.icon]
          }
        />
         {categories.Name}
      </button>
    );
  };
  return (
    <div>
         <div>
          {" "}
          <h1>Explore Categories</h1>
        </div>

        <div className="d-flex py-4">
          {[
            {
              Name: "design"
              
            },
            {
              Name: "Crypto Collectibles"
              
            },
            {
              Name: "Licenses"
             
            },
            {
              Name: "Games"
              
            },
            {
              Name: "Softwares"
              
            },
            {
              Name: "Softwares"
             
            },
            {
              Name: "Softwares"
              
            },
            {
              Name: "Softwares"
              
            },
            {
              Name: "NFT"
             
            },
          ].map((categories, index) => {
            return <CatButton key={index} categories={categories}></CatButton>;
           
          })}
        </div>
        <div>
          <Category Category={CurrentCategory} hashes={props.hashes} hash={props.hash} products={props.products} placeBid={props.placeBid} closeAuction={props.closeAuction}  />
        </div>
    </div>
  )
}

export default Categories;
