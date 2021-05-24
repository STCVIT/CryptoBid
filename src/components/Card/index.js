import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './postCard.css';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import {CardDeck} from 'react-bootstrap';
function Post(props) {
  
    return(
  <div id="content">
    
    <div><h1>Trending</h1></div>
    {props.products.map((product, key) => {
      return (
         


        <CardDeck>
          { product.bidcount > 0 ? 
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
    <div><h1>All Posts</h1></div>
    {props.products.map((product,key) => {
        return(
            <div key={key} className="card col">
            {/* <img className="card-img-top" src="sofa.jpg" alt="ProductImage" /> */}
            <div className="card-body">
               <img src= { `https://ipfs.infura.io/ipfs/${props.hashes[key]}` } className="App-logo" alt="logo" />           
              <h5 className="card-title conatina">{product.name}</h5>
              <p className="card-text">{product.discription}</p>
              <p className="card-text">BasePrice : {window.web3.utils.fromWei(product.baseprice.toString(), 'Ether')} Eth </p>
              <p className="card-text">Current Bid :{window.web3.utils.fromWei(product.currentBid.toString(), 'Ether')}  Eth </p>
              <p className="card-text">Product discription : {product.discription}</p>              
             {!product.purchased
                      ? 
                      <button
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
                      <button
                            // type="submit"
                            // value="Submit"
                            // onSubmit={this.handleSubmit}
                          name={product.Id}
                          value = {product.currentBid}
                          // bid =  {this.state.value}
                          onClick={(event) => {props.closeAuction(event.target.name , event.target.value)}
                        }
                        >
                        Pay
                        </button>
                      : null}     
              <p href="#" className="conatina rupee">{product.productPrice}</p>
              
              <div className="card-footer d-flex">
            {/* <p className="text-muted">{product.createdAt}</p> */}
            <FontAwesomeIcon className="icon ml-auto" icon={faShare}/>
          </div>
          <p>&nbsp;</p>
            </div>
            <p>&nbsp;</p>
          </div>   
          )
           })}

           </div>
    )
}




export default Post
