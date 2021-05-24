import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { CardDeck} from 'react-bootstrap';

function Assests(props){
    return(
        <div id="content">
            <div><h1>Assets</h1></div>
            {props.products.map((product, key) => {
                return(
                    <CardDeck>
                        {product.owner === props.account ?
                            <div key={key} className="card col">
                                <div className="card-body">
                                <img src= { `https://ipfs.infura.io/ipfs/${props.hashes[key]}` } className="App-logo" alt="logo" />   
                                    <h5 className="card-title conatina">{product.name}</h5>
                                    <p className="card-text">{product.discription}</p>
                                    <p className="card-text">BasePrice : {window.web3.utils.fromWei(product.baseprice.toString(), 'Ether')} Eth </p>
                                    <p className="card-text">Current Bid :{window.web3.utils.fromWei(product.currentBid.toString(), 'Ether')}  Eth </p>
                                    <p className="card-text">Product discription : {product.discription}</p>
                                 </div>
                            </div>:null
                    }
                    </CardDeck>
                )
            })}
        </div>
    )
}

export default Assests
