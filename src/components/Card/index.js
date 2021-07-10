import React from "react";
import styles from "./postCard.module.css";
import Post from "../Posts";
import { CardDeck } from "react-bootstrap";
function Pos(props) {
  return (
    <div class="container">
      <div id="content">
        {/* <div className={styles.w}><h1>Trending</h1></div>
    {props.products.map((product, key) => {
      return (
         


        <CardDeck>
          { product.bidcount > 0 ? 
          //  <div key={key} className="card col">
          //    <div className="card-body">
          //    <h5 className="card-title conatina">{product.name}</h5>
          //    <p className="card-text">{product.discription}</p>
          //     <p className="card-text">BasePrice : {window.web3.utils.fromWei(product.baseprice.toString(), 'Ether')} Eth </p>
          //     <p className="card-text">Current Bid :{window.web3.utils.fromWei(product.currentBid.toString(), 'Ether')}  Eth </p>
          //     <p className="card-text">Product discription : {product.discription}</p>

          //     {!product.purchased
          //             ? 
          //             <button className="btn btn-primary"
          //                   // type="submit"
          //                   // value="Submit"
          //                   // onSubmit={this.handleSubmit}
          //                 name={product.Id}
          //                 // bid =  {this.state.value}
          //                 onClick={(event) => {props.placeBid(event.target.name)}
          //               }
          //               >
          //               Bid
          //               </button>
          //             : null}

          //           {!product.purchased
          //             ? 
          //             <button className="btn btn-secondary"
          //                 name={product.Id}
          //                 value = {product.currentBid}
          //                 onClick={(event) => {props.closeAuction(event.target.name , event.target.value)}
          //               }
          //               >
          //               Pay
          //               </button>
          //             : null} 
          //    </div>
          //  </div>      
          <div key={key} className={styles.card + " card + col-md-4 + pb-2"} >
      <div className="overflow">
        <img
          src={`https://ipfs.infura.io/ipfs/${props.hashes[key]}` }
          alt="iwatch"
          className={"card-img-top " + styles.imgWatch}
          width="250px"
          height="250px"
        />
      </div>
      <br></br>
      <div>
        <h6 className={"heading " + styles.heading}>{product.name}</h6>
        <div className={"row " + styles.row}>
          <div className={"col " + styles.col}>
            <p>
              <AiFillThunderbolt color="gold" /> Highest Bid : <span className={styles.bidPrice}> {window.web3.utils.fromWei(product.currentBid.toString(), 'Ether')} wETH</span>
            </p>
          </div>
          </div>
          <div className={"row " + styles.row}>
            <div className={"col " + styles.col}>
            <p>Minimum Bids : {props.MinBid}</p>
            </div>
            <div className={"col " + styles.col}>
            <p style={{ color: "#7d56c2" }}>
            <AiOutlineHeart color="white" fontSize="1em"/> {props.Likes}
            </p>
            </div>

          </div>
      </div>
    </div>
          : null }
        </CardDeck>
      )
    })} */}

<div className={styles.w}>
          <h1>Trending</h1>
        </div>
        <CardDeck>
          {props.products.map((product, key) => {
            return (
              <div key={key}>
              {product.bidcount >0 ?
              
              <Post
                Id = {parseInt(product.Id)}
                Name={product.name}
                Hbid={window.web3.utils.fromWei(
                  product.currentBid.toString(),
                  "Ether"
                
                )}
                discription={product.infoArray.discription}
                img={`https://ipfs.infura.io/ipfs/${props.hashes[key]}`}
              />
              : null}
              {/* <Post
                Id = {parseInt(product.Id)}
                Name={product.name}
                Hbid={window.web3.utils.fromWei(
                  product.currentBid.toString(),
                  "Ether"
                
                )}
                discription={product.infoArray.discription}
                img={`https://ipfs.infura.io/ipfs/${props.hashes[key]}`}
              /> */}
              </div>
            );
          })}
        </CardDeck>





          <p>&nbsp;</p>
        
        <div className={styles.w}>
          <h1>All Posts</h1>
        </div>
        <CardDeck>
          {props.products.map((product, key) => {
            return (
              <Post
                Id = {parseInt(product.Id)}
                Name={product.name}
                Hbid={window.web3.utils.fromWei(
                  product.currentBid.toString(),
                  "Ether"
                
                )}
                discription={product.infoArray.discription}
                img={`https://ipfs.infura.io/ipfs/${props.hashes[key]}`}
              />
            );
          })}
        </CardDeck>
      </div>
    </div>
  );
}

export default Pos;
