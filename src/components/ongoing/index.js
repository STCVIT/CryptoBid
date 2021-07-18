import React, { useState } from "react";
import Box from "./util/box.js";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import styles from "./style.module.css";

function Ongoing(props) {
  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: "Buying", value: "1" },
    { name: "Selling", value: "2" },
  ];
  const ActiveStyle = {
    backgroundColor: "#6d28d9",
  };
  var sell = 0;
  var buyy = 0;

  // function checker() {
  //   props.products.map((product, key) => {
  //     product.currentBidder === props.account &&
  //       !product.purchased ?
  //           buyy =  buyy+ 1 : none
  //   }
  // }
  return (<>
  { localStorage.getItem("generated") ? 
     <div className={styles.main}>
      <h1 className="text-center">Ongoing</h1>
      {/* <button className={"btn btn-dark " + styles.backbtn}>
        {" "}
        <span>&#60;</span> Back
      </button> */}
      <div className={"text-center p-2 my-3 container  " + styles.cont}>
        <ButtonGroup toggle className="d-flex  ">
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              name="radio"
              className={styles.toggleButton + " mx-1 " + styles.btnSecondary}
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
      {radioValue === "1" ? (
        <div className={"my-2 container  " + styles.ListCont}>
          {props.products.map((product, key) => {
            console.log(buyy);
            return (
              <div>
                {product.currentBidder === props.account && !product.purchased
                  ? ((buyy = buyy + 1),
                    (
                      <div key={key}>
                        <Box
                          Name={product.name}
                          HBid={window.web3.utils.fromWei(
                            product.currentBid.toString(),
                            "Ether"
                          )}
                          img={`https://ipfs.infura.io/ipfs/${props.hashes[key]}`}
                          UBid={window.web3.utils.fromWei(
                            product.baseprice.toString(),
                            "Ether"
                          )}
                          Bids={parseInt(product.bidcount)}
                        />
                      </div>
                    ))
                  : null}
              </div>
            );
          })}
          {buyy === 0 ? (
            <p className= " text-center ">No products bought</p>
          ) : null}
        </div>
      ) : (
        <div className={"my-2 container " + styles.ListCont}>
          {props.products.map((product, key) => {
            return (
              <div>
                {product.owner === props.account && !product.purchased
                  ? ((sell = sell + 1),
                    (
                      <div key={key}>
                        <Box
                          Name={product.name}
                          HBid={window.web3.utils.fromWei(
                            product.currentBid.toString(),
                            "Ether"
                          )}
                          img={`https://ipfs.infura.io/ipfs/${props.hashes[key]}`}
                          UBid={window.web3.utils.fromWei(
                            product.baseprice.toString(),
                            "Ether"
                          )}
                          Bids={parseInt(product.bidcount)}
                        />
                      </div>
                    ))
                  : null}
              </div>
            );
          })}
          {sell === 0 ? (
            <>
              <p className=" text-center ">No current bidding</p>{" "}
            </>
          ) : null}
        </div>
      )}
    </div> 
    : <div className="container"> Sign In to view </div> 
    }
    </>
  );
}


export default Ongoing;
