import React, { useState } from "react";
import "./search-item.css";
import Category from "./Cat";

function Categories(props) {
  const [CurrentCategory, setCurrentCategory] = useState("");
  const [Active, setActive] = useState(1);

  function handleChange(id, name) {
    setCurrentCategory(name);
    setActive(id);
  }
  function CatButton(prop) {
    return (
      <button
        className="btn btn-primary mx-2 CatButton"
        id={Active === prop.categories.id ? "Active" : null}
        onClick={(e) => {
          handleChange(prop.categories.id, prop.categories.Name);
        }}
      >
        {prop.categories.Name}
      </button>
    );
  }
  return (
    <div>
      <div className="d-flex ">
        {[
          {
            Name: "All",
            id: 1,
          },
          {
            Name: "Electronics",
            id: 2,
          },
          {
            Name: "Games",
            id: 3,
          },
          {
            Name: "NFT",
            id: 4,
          },
          {
            Name: "Softwares",
            id: 5,
          },
          {
            Name: "Motors",
            id: 6,
          },
          {
            Name: "Patents",
            id: 7,
          },
          {
            Name: "Sports",
            id: 8,
          },
          {
            Name: "Health",
            id: 9,
          },
          {
            Name: "Real Estate",
            id: 10,
          },
        ].map((categories, index) => {
          return <CatButton key={index} categories={categories}></CatButton>;
        })}
      </div>
      <div>
        <Category
          Category={CurrentCategory}
          Id={Active}
          hashes={props.hashes}
          hash={props.hash}
          products={props.products}
          placeBid={props.placeBid}
          closeAuction={props.closeAuction}
        />
      </div>
    </div>
  );
}

export default Categories;
