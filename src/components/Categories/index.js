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
import Search from "../Search";



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
              Name: "NFT",
              icon: "NFT",
            },
            {
              Name: "Crypto Collectibles",
              icon: "CryptoCollectibles",
            },
            {
              Name: "Licenses",
              icon: "Licenses",
            },
            {
              Name: "Games",
              icon: "Games",
            },
            {
              Name: "Softwares",
              icon: "Softwares",
            },
          ].map((categories, index) => {
            return <CatButton key={index} categories={categories}></CatButton>;
          })}
        </div>
        <div>
          <Search Category={CurrentCategory} products={props.products} placeBid={props.placeBid} closeAuction={props.closeAuction}  />
        </div>
    </div>
  )
}

export default Categories;
