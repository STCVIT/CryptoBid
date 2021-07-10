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
    backgroundColor:"#6d28d9"
  }
  return (
    <div className={styles.main}>
      <h1 className="text-center">OnGoing</h1>
      <button className={"btn btn-dark " + styles.backbtn}>
        {" "}
        <span>&#60;</span> Back
      </button>
      <div className={"text-center p-2 my-3 container " + styles.cont}>
        <ButtonGroup toggle>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              name="radio"
              className={styles.toggleButton  + " " + styles.btnSecondary }
              size="lg"
              value={radio.value}
              checked={radioValue === radio.value}
              style={radioValue===radio.value ? ActiveStyle : null}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>
      {console.log(radioValue)}
      {radioValue === "1" ? (
        <div className={"my-2 container  " + styles.ListCont}>
          {props.products.map((product, key) => {
            return (
              <div className={styles.abc}>
                {product.currentBidder === props.account &&
                !product.purchased ? (
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
                ) : null}
              </div>
            );
          })}
        </div>
      ) : (
        <div className={"my-2 container " + styles.ListCont}>
          {props.products.map((product, key) => {
            return (
              <div>
                {product.owner === props.account && !product.purchased ? (
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
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Ongoing;
