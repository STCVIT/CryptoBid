import React from 'react';
import "./search.css";
import itemimg from "./chair.png";
import SearchDefaultImg from "./SearchDefault.png";
import { CardDeck} from 'react-bootstrap';
function Search(props) {
    const ImageContainerStyle ={
        height : "300px"
    }
     return (
      <div>
         <div id="content">
            {props.products.map((product, key) => {
                return(
                    <CardDeck>
                        {product.category === props.Category ?
                            <div key={key} className="card col">
                                <div className="card-body">
                                <div className="p-0">
                                    <img src={itemimg} alt="item-img" className="item-img" />
                                </div>
                                    <h5 className="card-title conatina">{product.name}</h5>
                                    <p className="card-text">{product.discription}</p>
                                    <p className="card-text">BasePrice : {window.web3.utils.fromWei(product.baseprice.toString(), 'Ether')} Eth </p>
                                    <p className="card-text">Current Bid :{window.web3.utils.fromWei(product.currentBid.toString(), 'Ether')}  Eth </p>
                                    <p className="card-text">Product discription : {product.discription}</p>
                                    {!product.purchased? 
                                        <button
                                          name={product.Id}
                                          onClick={(event) => {props.placeBid(event.target.name)}
                                    }>
                                  Bid
                                  </button>
                                : null}

                    {!product.purchased
                      ? 
                      <button
                          name={product.Id}
                          value = {product.currentBid}
                          onClick={(event) => {props.closeAuction(event.target.name , event.target.value)}
                        }
                        >
                              Pay
                              </button>
                      : null}

                          </div>
                            </div>:null
                            
                    }
                    </CardDeck>
                    
                )
                
            })}
        </div>
        


       {/* props.Category ? 
        <div>
               <div className="d-flex justify-content-start item">
        <div className="p-0">
          <img src={itemimg} alt="item-img" className="item-img" />
        </div>
        <div className="Desc p-3">
          <h4 className="Item-heading">{props.Category}</h4>
          <p className="lead fw-normal time">6hrs ago | 1d 4hrs left</p>
          <h5 className="Item-price">4500 $</h5>
        </div>
      </div>
        </div> : 
   
        <div className="text-center"  >
            <img className="img-fluid my-5"  alt="Magnifying Glass" style={ImageContainerStyle} src={SearchDefaultImg}/>
        </div> */}

        </div>
    )
}

export default Search
