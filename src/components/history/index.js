import React, { useState } from "react";
import styles from "./style.module.css";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import exampleimg from "./maxresdefault.jpg";
import Listele from "./util/listele";
import HistComponent from "./util/withDetails";
const a = localStorage.getItem("generated")
function Historypg(props) {
  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: "Bought", value: "1" },
    { name: "Sold", value: "2" },
  ];
  const ActiveStyle = {
    backgroundColor: "#6d28d9",
  };
  return (
    <div className={styles.main + " container " + styles.container}>
      <h1 class=" text-center font-weight-bold">History</h1>

      <div className={"row  " + styles.fromto}>
        <div className="col-md-6 container">
          <h5 className="font-weight-bold">From</h5>
          <input
            type="date"
            class="form-control"
            id={styles.date}
            name="fromdate"
          />
        </div>
        <div className="col-md-6 container">
          <h5 className="font-weight-bold">To</h5>
          <input
            type="date"
            class="form-control"
            id={styles.date}
            name="todate"
          />
        </div>
      </div>

      <div className={"text-center p-2 my-4 w-100 " + styles.cont}>
        <ButtonGroup toggle className="d-flex ">
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              name="radio"
              className={
                styles.toggleButton +
                " flex-fill  mx-2 " +
                styles.btnSecondary +
                " " +
                styles.but
              }
              size="lg"
              value={radio.value}
              checked={radioValue === radio.value}
              style={radioValue === radio.value ? ActiveStyle : null}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>
      <div className=" table-responsive ">
        <table
          class={"table table-borderless table-dark  mx-auto " + styles.table}
        >
          <thead className="head">
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Final Amount</th>
              <th scope="col">Purchase Date</th>
              <th scope="col">Claim</th>
            </tr>
          </thead>
          {a === "true" ?
          <>
          {radioValue === '1' ?
          <tbody>
            {props.products.map((product, k) => {
              return (
                <>
                {product.currentBidder === props.account && product.purchased ?
                          <Listele  Name= {product.name}  createUser={props.createUser} Cost = {window.web3.utils.fromWei(
                        product.currentBid.toString(),
                        "Ether" 
                      )} radioValue={radioValue} />
            
               
              
              :null}
    </>
              )
            })}

         
        </tbody>
        :

        <tbody>
            {props.products.map((product, k) => {
              return (
                <>
                {product.owner === props.account && product.purchased ?
                          <HistComponent  Name= {product.name} Cost = {window.web3.utils.fromWei(
                        product.currentBid.toString(),
                        "Ether"
                      )} pname={product.name}/>
              :null}
    </>
              )
            })}

         
        </tbody>
        }

          </>
          
          :
          <tbody>
          <td><p>You need to be logged in to view data</p></td>
          </tbody>
}
         
          

        </table>
      </div>

      <button className={"btn " + styles.vm}>View More</button>
    </div>
  );
}

export default Historypg;
