import React from "react";
//import "./search.css";
import { CardDeck } from "react-bootstrap";
import Card from "../../Posts";
import styles from "./postCard.module.css";



function Category(props) {
  const ImageContainerStyle = {
    height: "300px",
  };

  return (
    <div>
      <div id="content">
        <CardDeck>
          {props.products.map((product, key) => {
            return (
              <>
                {props.Id === 1 ? (
                  <div className="my-2 col-12 col-md-4 col-sm-12">
                    <Card
                      Id={parseInt(product.Id)}
                      Name={product.name}
                      Hbid={window.web3.utils.fromWei(
                        product.currentBid.toString(),
                        "Ether"
                      )}
                      discription={product.infoArray.discription}
                      img={`https://ipfs.infura.io/ipfs/${props.hashes[key]}`}
                    />
                  </div>
                ) : (
                  <>
                    {product.infoArray.category === props.Category ? (
                      <div className="my-2 col-12 col-md-4 col-sm-12">
                        <Card
                          Id={parseInt(product.Id)}
                          Name={product.name}
                          Hbid={window.web3.utils.fromWei(
                            product.currentBid.toString(),
                            "Ether"
                          )}
                          discription={product.infoArray.discription}
                          img={`https://ipfs.infura.io/ipfs/${props.hashes[key]}`}
                        />
                      </div>
                    ) : null}
                  </>
                )}
              </>
            );
          })}
        </CardDeck>
      </div>
    </div>
  );
}

export default Category;
