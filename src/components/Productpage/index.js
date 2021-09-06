import React from "react";
import styles from "./styles.module.css";
import moment from "moment";
import Card from "../Posts";
import { CardDeck } from "react-bootstrap";
moment().format();
const a = localStorage.getItem("generated");
const Productpg = (props) => {
  var productid = window.location.pathname.split("/");


  return (
    <div>
      {props.products.map((product, key) => {
        
        const time = Date.now();
        const biddate = new Date(
          parseInt(product.currentbidtime)
        ).toLocaleDateString();
        const bidtime = new Date(
          parseInt(product.currentbidtime)
        ).toLocaleTimeString();

     
        const enddate = new Date(
          parseInt(product.infoArray.endtime)
        ).toLocaleDateString();
        const endtime =  new Date(
          parseInt(product.infoArray.endtime)
        ).toLocaleTimeString();

    
        return (
          <div>
            {key === productid[2] - 1 ? (
              <div key={key} className={styles.product}>
                <div className="container">
                  <div className="row">
                    {" "}
                    <div className="col-md"> </div>{" "}
                    <div className="col-md">
                      {" "}
                      <span className={styles.purpletext}>
                        <h3>{product.infoArray.category} </h3>
                      </span>{" "}
                    </div>{" "}
                  </div>
                  <div className="row">
                    <div className="col-md">
                      <img
                        src={`https://ipfs.infura.io/ipfs/${product.infoArray.hash}`}
                        alt=""
                        className={styles.productimg + " my-2"}
                      />
                    </div>
                    <div className="col-md">
                      <h1>{product.name}</h1>
                      <h6>
                        End At:{" "}
                        <span className={styles.purpletext}>{endtime}  {enddate}</span>
                      </h6>
                      <h6>
                        Last Bid Time:{" "}
                        <span className={styles.purpletext}>{bidtime}  {biddate}</span>
                      </h6>
                      <p className={styles.purpletext}>
                        {product.infoArray.discription}
                      </p>
                      {product.purchased.toString() === "false" && time < product.infoArray.endtime ? (
                        <p className={styles.price}>Status : Available</p>
                      ) : (
                        <p className={styles.price}>Sold</p>
                      )}

                      <h6>
                        BasePrice{" "}
                        <span className={styles.purpletext}>
                          {window.web3.utils.fromWei(
                            product.baseprice.toString(),
                            "Ether"
                          )}
                        </span>
                      </h6>
                      <h4>
                        <svg
                          width="26"
                          height="35"
                          viewBox="0 0 26 42"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.9044 31.4462L0.0117188 23.8376L12.8965 42.0013L25.7958 23.8376L12.8965 31.4462H12.9044ZM13.096 0L0.208594 21.3898L13.096 29.0115L25.9887 21.3977L13.096 0Z"
                            fill="#BE95FF"
                          />
                        </svg>
                        <span className="price">
                          {window.web3.utils.fromWei(
                            product.currentBid.toString(),
                            "Ether"
                          )}{" "}
                          ETH{" "}
                        </span>
                      </h4>
                      { a === "true" ?

                      <>
                      <div className="pb-2">
                        {!product.purchased &&
                        product.currentBidder !== props.account &&
                        product.owner !== props.account  && time < product.infoArray.endtime ? (
                          <button
                            className="btn btn-dark plcbid"
                            name={product.Id}
                            value={product.currentBid}
                            onClick={(event) => {
                              props.placeBid(
                                event.target.name,
                                event.target.value
                              );
                            }}
                          >
                            Place Bid
                          </button>
                        ) : null}
                      </div>
                      <div className="pb-2">
                        {!product.purchased &&
                        product.currentBidder === props.account &&
                        product.owner !== props.account &&
                        time > parseInt(product.infoArray.endtime) ? (
                          <button
                            className="btn btn-dark plcbid"
                            name={product.Id}
                            value={product.currentBid}
                            onClick={(event) => {
                              props.closeAuction(event.target.name);
                            }}
                          >
                            Claim Product
                          </button>
                        ) : null}
                      </div>
                      <div className="pb-2">
                        {!product.purchased &&
                        product.owner === props.account ? (
                          <button
                            className="btn btn-dark plcbid"
                            name={product.Id}
                            value={product.currentBid}
                            onClick={(event) => {
                              props.closeAuctionOwner(event.target.name);
                            }}
                          >
                            Close Auction
                          </button>
                        ) : null}
                      </div>

                      </>
                      
                    
                    : null}
                      
                      <div className="tags">
                        <div>
                          {" "}
                          <button className="btn btn-dark like " disabled>
                            ♡ {parseInt(product.bidcount)}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                 
                  <div  className="container my-2 " >
                  <h3 className="p-3 my-2 ">Explore More</h3>
                  <CardDeck>
                    {props.products.map((product, key) => {
                      return (
                        <>
                          {key < 3 ? (
                            <div className="my-2 col-12 col-md-4 col-sm-12">
                              <Card
                                Id={parseInt(product.Id)}
                                Name={product.name}
                                Hbid={window.web3.utils.fromWei(
                                  product.currentBid.toString(),
                                  "Ether"
                                )}
                                discription={product.infoArray.discription}
                                img={`https://ipfs.infura.io/ipfs/${product.infoArray.hash}`}
                              />
                            </div>
                          ) : null}
                        </>
                      );
                    })}
                  </CardDeck>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Productpg;
