import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './postCard.css';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import {CardDeck} from 'react-bootstrap';
function Ongoing(props) {
    return(
  <div id="content">   
    <div className="light" ><h1>Your Products</h1></div>
    {props.products.map((product, key) => {
      return (
        <CardDeck>
          { props.account === product.owner && !product.purchased ? 
           <div key={key} className="card col">
             <div className="card-body">
             <h5 className="card-title conatina">{product.name}</h5>
             <p className="card-text">{product.discription}</p>
              <p className="card-text">BasePrice : {window.web3.utils.fromWei(product.baseprice.toString(), 'Ether')} Eth </p>
              <p className="card-text">Current Bid :{window.web3.utils.fromWei(product.currentBid.toString(), 'Ether')}  Eth </p>
              <p className="card-text">Product discription : {product.discription}</p>

              {!product.purchased
                      ? 
                      <button className="btn btn-primary"
                            // type="submit"
                            // value="Submit"
                            // onSubmit={this.handleSubmit}
                          name={product.Id}
                          // bid =  {this.state.value}
                          onClick={(event) => {props.placeBid(event.target.name)}
                        }
                        >
                        Bid
                        </button>
                      : null}
                    {!product.purchased
                      ? 
                      <button className="btn btn-secondary"
                          name={product.Id}
                          value = {product.currentBid}
                          onClick={(event) => {props.closeAuction(event.target.name , event.target.value)}
                        }
                        >
                        Pay
                        </button>
                      : null} 
             </div>
           </div>      
          : null }
        </CardDeck>
      )
    })}
<p>&nbsp;</p>
    <div className="light" ><h1>Your Biddings</h1></div>
    {props.products.map((product,key) => {
        return(
            <CardDeck>
            { props.account === product.currentBidder && !product.purchased ? 
             <div key={key} className="card col">
               <div className="card-body">
               <h5 className="card-title conatina">{product.name}</h5>
               <p className="card-text">{product.discription}</p>
                <p className="card-text">BasePrice : {window.web3.utils.fromWei(product.baseprice.toString(), 'Ether')} Eth </p>
                <p className="card-text">Current Bid :{window.web3.utils.fromWei(product.currentBid.toString(), 'Ether')}  Eth </p>
                <p className="card-text">Product discription : {product.discription}</p>
  
                {!product.purchased
                        ? 
                        <button className="btn btn-primary"
                              // type="submit"
                              // value="Submit"
                              // onSubmit={this.handleSubmit}
                            name={product.Id}
                            // bid =  {this.state.value}
                            onClick={(event) => {props.placeBid(event.target.name)}
                          }
                          >
                          Bid
                          </button>
                        : null}
                      {!product.purchased
                        ? 
                        <button className="btn btn-secondary"
                            name={product.Id}
                            value = {product.currentBid}
                            onClick={(event) => {props.closeAuction(event.target.name , event.target.value)}
                          }
                          >
                          Pay
                          </button>
                        : null} 
               </div>
             </div>      
            : null }
          </CardDeck>
          )
           })}
           </div>
    )
}
export default Ongoing
