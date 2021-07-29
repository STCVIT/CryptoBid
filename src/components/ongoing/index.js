import React, { useState } from "react";
import Box from "./util/box.js";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import styles from "./style.module.css";
import Error from '../Error'
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

  return (
    <>
      {localStorage.getItem("generated") ? (
        <div className={styles.main}>
          <h1 className="text-center">Ongoing</h1>
          <div className={"text-center p-2 my-3 container  " + styles.cont}>
            <ButtonGroup toggle className="d-flex  ">
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  type="radio"
                  variant="secondary"
                  name="radio"
                  className={
                    styles.toggleButton +
                    " mx-1 text-center " +
                    styles.btnSecondary
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
          {radioValue === "1" ? (
            <div className={"my-2 container  " + styles.ListCont}>
              {props.products.map((product, key) => {
                return (
                  <div>
                    {product.currentBidder === props.account &&
                    !product.purchased
                      ? ((buyy = buyy + 1),
                        (
                          <div key={key}>
                            <Box
                              Name={product.name}
                              HBid={window.web3.utils.fromWei(
                                product.currentBid.toString(),
                                "Ether"
                              )}
                              img={`https://ipfs.infura.io/ipfs/${product.infoArray.hash}`}
                              UBid={window.web3.utils.fromWei(
                                product.baseprice.toString(),
                                "Ether"
                              )}
                              Bids={parseInt(product.bidcount)}
                              Endtime={new Date(
                                parseInt(product.infoArray.endtime)
                              ).toLocaleDateString()}
                            />
                          </div>
                        ))
                      : null}
                  </div>
                );
              })}
              {buyy === 0 ? (
                <p className=" text-center ">No products bought</p>
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
                              img={`https://ipfs.infura.io/ipfs/${product.infoArray.hash}`}
                              UBid={window.web3.utils.fromWei(
                                product.baseprice.toString(),
                                "Ether"
                              )}
                              Bids={parseInt(product.bidcount)}
                              Endtime={new Date(
                                parseInt(product.infoArray.endtime)
                              ).toLocaleDateString()}
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
      ) : (
        <div className="container"> <Error id={2}/></div>
      )}
    </>
  );
}

export default Ongoing;
