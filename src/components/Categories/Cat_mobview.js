
import React from 'react';
import styles from "./mobview.module.css";
function Mobileview(){
  return(
    <div>
      <div className="dropdown">
  <button className={"btn btn-secondary dropdown-toggle "+styles.btndrp} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    All
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a className="dropdown-item" href="#">Action</a>
    <a className="dropdown-item" href="#">Another action</a>
    <a className="dropdown-item" href="#">Something else here</a>
  </div>
</div>
    </div>

  )
}

export default Mobileview