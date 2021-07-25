
import React, {useState} from 'react';
import styles from "./mobview.module.css";
import Category from "./Cat";
function Mobileview(props){
  const [CurrentCat, setCurrentCat] = useState("");
  const [Act, setAct] = useState(1);

  function handleChange(id,name) {
    setCurrentCat(name);
    setAct(id);
  }
  return(
    <div>
      <div className="dropdown">
  <button className={"btn btn-secondary dropdown-toggle "+styles.btndrp} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    All
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
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
          return     <button className="btn dropdown-item" href="" onClick={() => {
            handleChange(categories.id,categories.Name);
          }} >{categories.Name}</button>
        })}
  </div>
</div>
<div>
        <Category
          Category={CurrentCat}
          Id={Act}
          hashes={props.hashes}
          hash={props.hash}
          products={props.products}
          placeBid={props.placeBid}
          closeAuction={props.closeAuction}
        />
      </div>
    </div>

  )
}

export default Mobileview