import React from "react";
import styles from "./postCard.module.css";
import Post from "../Posts";
import { CardDeck } from "react-bootstrap";
function Pos(props) {
  return (
    <div class="container">
      <div id="content">
        <div className={styles.w}>
          <h1>Trending</h1>
        </div>
        <CardDeck>
          {props.products.map((product, key) => {
            return (
              <div key={key}>
                {product.bidcount > 0 ? (
                  <Post
                    Id={parseInt(product.Id)}
                    Name={product.name}
                    Hbid={window.web3.utils.fromWei(
                      product.currentBid.toString(),
                      "Ether"
                    )}
                    discription={product.infoArray.discription}
                    img={`https://ipfs.infura.io/ipfs/${props.hashes[key]}`}
                  />
                ) : null}
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
                Id={parseInt(product.Id)}
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
