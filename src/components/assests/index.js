import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { CardDeck} from 'react-bootstrap';

import { Crypt, RSA } from 'hybrid-crypto-js';
var crypt = new Crypt();
var rsa = new RSA();
const name = localStorage.getItem("name");
const email = localStorage.getItem("email")
const address = localStorage.getItem("address")

const pk = localStorage.getItem("privateKey")

function Assests(props){
    return(
        <div id="content">
            <div className="light" ><h1>Assests Bought</h1></div>
            {props.products.map((product, key) => {
                
                return(
                    <CardDeck>
                        {product.currentBidder === props.account && product.purchased  ?
                            <div key={key} className="card col">
                                <div className="card-body">
                                <img src= { `https://ipfs.infura.io/ipfs/${props.hashes[key]}` } className="App-logo" alt="logo" />   
                                    <h5 className="card-title conatina">{product.name}</h5>
                                    <p className="card-text">{product.discription}</p>
                                    <p className="card-text">BasePrice : {window.web3.utils.fromWei(product.baseprice.toString(), 'Ether')} Eth </p>
                                    <p className="card-text">Current Bid :{window.web3.utils.fromWei(product.currentBid.toString(), 'Ether')}  Eth </p>
                                    <p className="card-text">Product discription : {product.discription}</p>
                                    
                                 
                                 
                                     <button onClick= {(event) => {
                                         event.preventDefault();
                                         props.createUser(name,email,address,product.name) 
                                        }
                                         }   >
                                         Share Details
                                    </button>
                                 </div>
                            </div>:null
                    }
                    </CardDeck>
                )
            })}

         <div className="light"><h1>Sold</h1></div>
            {props.products.map((product, key) => {
                return(
                    <CardDeck>

                        {product.owner === props.account && product.purchased  ?
                            <div key={key} className="card col">
                                <div className="card-body">
                                <img src= { `https://ipfs.infura.io/ipfs/${props.hashes[key]}` } className="App-logo" alt="logo" />   
                                    <h5 className="card-title conatina">{product.name}</h5>
                                    <p className="card-text">{product.discription}</p>
                                    <p className="card-text">BasePrice : {window.web3.utils.fromWei(product.baseprice.toString(), 'Ether')} Eth </p>
                                    <p className="card-text">Sold For :{window.web3.utils.fromWei(product.currentBid.toString(), 'Ether')}  Eth </p>
                                    <p className="card-text">Product discription : {product.discription}</p>


                                    <h3 className="b">Buyer details</h3> 
                                  {props.users.map((user ,key) => {
                                      return (
                                        <div key = {key}  >
                                       {user.productname === product.name ?
                                       <div>
                                            <p>Name : {crypt.decrypt(pk, user.name).message}</p> 
                                            <p>Name : {crypt.decrypt(pk, user.addres).message}</p>  
                                            <p>Name : {crypt.decrypt(pk, user.email).message}</p>   
                                            {/* <p>Email: {decrypt(user.email)} </p>
                                            <p>Address: {decrypt(user.addres)}</p> */}
                                       </div>
                                       
                                    :null}
                                    </div>
                                      )
                                  })}
                                 </div>
                            </div>
                            
                            :null
                    }
                    </CardDeck>
                )
                
            })}
        </div>
    )
}

export default Assests
