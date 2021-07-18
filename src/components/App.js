import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle';
import {Switch,Route, BrowserRouter as Router } from "react-router-dom";
import NavigationBar from './navigation'
import Main from './Main/index'
import { Crypt, RSA } from 'hybrid-crypto-js';
// import Loginpg from './Login'
import React, { Component , useState} from 'react';
import './App.css';
import Web3 from 'web3'
import Auction from '../abis/Auction.json'
import { Modal, Col, Row, Button, Alert} from 'react-bootstrap'
import Swal from 'sweetalert2'
import Footer from './footer/Footer.js'
import Productpg from './Productpage'
// import generateKeyPairSync from "crypto"
var crypt = new Crypt();
var rsa = new RSA();
// const k = localStorage.getItem("publicKey");
// const { generateKeyPairSync } = require('crypto')

// import Navbar from './Navbar'
// import Main from './Main'
// import Post from "./Card";
// import Search from './Search'



const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', apiPath: '/ipfs/api/v0' }) // leaving out the arguments will default to these values
// let hashing = []
// const ethereumButton = document.querySelector('.enableEthereumButton');

class App extends Component {


  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()

  }


  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }
}

  async loadBlockchainData() {
    const web3 = window.web3
    //load account 
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })
    console.log(Auction.abi)
    const networkId = await web3.eth.net.getId()
    console.log(networkId)
    const networkData = Auction.networks[networkId]
    if (networkData){
      const auction = web3.eth.Contract(Auction.abi, networkData.address)
      console.log(auction)
      this.setState({auction})
      const productCount = await auction.methods.productCount().call()
       // Load products
       for (var i = 1; i <= productCount; i++) {
        const product = await auction.methods.products(i).call()
        this.setState({
          products: [...this.state.products, product]
          
        })
        const hash = await auction.methods.get().call()
        this.setState({ hash })


      //   const hashes = await auction.methods.hashes(i).call()
      //   console.log(hashes)
      //   this.setState({
      //   hashes: [...this.state.hashes, hashes]
      // })
        
        // const hash = await auction.methods.get().call()
        // // hashing.push(hash)
        // this.setState({ hash })
        // this.setState({
        //   hashes: [...this.state.hashes,hash ]
        // })
      }
      const userCount = await auction.methods.usercount().call()
      for (var z = 1; z <= userCount; z++) {
        const user = await auction.methods.user(z).call()
        this.setState({
          users: [...this.state.users, user]
        })
        console.log(this.state.users)
     
      }


      for (var y = 0; y< productCount;y++){
          const hashes = await auction.methods.arrayhashes(y).call()
          console.log(hashes)
          this.setState({
          hashes: [...this.state.hashes, hashes]
        })
        console.log(hashes)
        
      }
      const hash = await auction.methods.get().call()
      this.setState({ hash })
      // this.setState({
      //   hashes: [...this.state.hashes, this.state.hash ]
      // })
      // hashing.push(this.state.hash)
      // console.log(hashing)
      console.log(this.state.products)
      console.log(this.state.users)
      console.log(this.state.hashes)
    }else {
      window.alert('Auction contract not deployed to detected network.')
    }
    
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      hash:'',
      hashes: [],
      buffer:null,
      users:[]
    }
    this.createProduct = this.createProduct.bind(this)
    this.createUser = this.createUser.bind(this)
    this.placeBid = this.placeBid.bind(this)
    this.closeAuction = this.closeAuction.bind(this)
    this.AuctionExpiry = this.AuctionExpiry.bind(this)
    this.Capturefile = this.Capturefile.bind(this)
    this.createhash = this.createhash.bind(this)
    this.checkvalidity = this.checkvalidity.bind(this)
    this.closeAuctionOwner = this.closeAuctionOwner.bind(this)
    // this.metamaskbutton = this.metamaskbutton.bind(this)
  }

  // async metamaskbutton() {
  //   const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //   const accountts = accounts[0];
  //   console.log("account", accountts)
    
  // }

  

  // createProduct(name , baseprice, discription, category, key, bidinc,date) {
  //   this.state.auction.methods.createProduct(name,baseprice, discription, category, key, bidinc,date).send({from: this.state.account})
  //   .on('receipt',(receipt) => {
  //     this.setState.loading({loading:false })
  //     console.log( "reciept",receipt)
  //   }).once('receipt', () => {
  //     console.log('hello')
  //   })
  // }
  
 
  // createUser(name,email,address,location,productname){
  //   // const a = this.state.account
  //   const k = localStorage.getItem("publicKey");
  //   this.state.auction.methods.createUser(crypt.encrypt(k,name),crypt.encrypt(k,email),crypt.encrypt(k,address),crypt.encrypt(k,location), productname).send({from: this.state.account})
  //   .once('receipt',(receipt) => {
  //     console.log(receipt)
  //   })

  //   //updated
  //   // this.state.auction.methods.createUser(encrypt(name,a), encrypt(password,a), encrypt(email,a),encrypt(address,a)).send({from: this.state.account})
  //   // .once('receipt',(receipt) => {
  //   //   console.log(receipt)
  //   // })
  // }
  createProduct(name , baseprice, discription, category, key, bidinc,date) {
    try{
      this.state.auction.methods.createProduct(name,baseprice, discription, category, key, bidinc,date).send({from: this.state.account})
      .once('confirmation',() => {
        console.log( "confirmation")
        //swal("success you product is live for auction","success")
        Swal.fire(
          {
              title: "Success ", 
              text: "Your product is live for auction", 
              type: "success",
              icon: 'success',
          }
      ).then(function (result) {
          window.location.reload()
      })
      })
      .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        console.log("transaction rejected", error, receipt)
        //alert("Transaction Failed")
        Swal.fire(
          {
              title: "Failure", 
              text: "Transaction Failed", 
              type: "success",
              icon: 'error'
          }
      ).then(function (result) {
          window.location.reload()
      })
    });
    }catch(err){
      alert("fool")
    }
  }
  
  placeBid(id, value){
    // const price = prompt("enter bid")
    // console.log(price)
    // const price1 = parseInt(price)
    // const price2 =  window.web3.utils.toWei(price, 'ether');
    this.state.auction.methods.placeBid(id).send({from: this.state.account, value: value})
    .on('confirmation',() => {
      console.log()
      // alert("your bid has been accepted")
      // window.location.reload()
      Swal.fire(
        {
            title: "Success ", 
            text: "Your bid has been placed", 
            type: "success",
            icon: 'success',
        }
    ).then(function (result) {
        window.location.reload()
    })
      
    })
    .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
      console.log("transaction rejected", error, receipt)
      // alert("Transaction Failed")
      Swal.fire(
        {
            title: "Failure", 
            text: "Transaction Failed", 
            type: "success",
            icon: 'error'
        }
    ).then(function (result) {
        window.location.reload()
    })
  });
  }

  closeAuction(id){
    this.state.auction.methods.closeAuction(id).send({from: this.state.account })
    .on('confirmation',() => {
      // alert("your product has been claimed")
      Swal.fire(
        {
            title: "Success ", 
            text: "Product claimed successfully", 
            type: "success",
            icon: 'success',
        }
    ).then(function (result) {
        window.location.reload()
    })
    })
    .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
      console.log("transaction rejected", error, receipt)
      // alert("Transaction Failed")
      Swal.fire(
        {
            title: "Failure", 
            text: "Transaction Failed", 
            type: "success",
            icon: 'error'
        }
    ).then(function (result) {
        window.location.reload()
    })
  });
  }

  AuctionExpiry(id) {
    this.setState({loading: true})
    this.state.auction.methods.closeAuction(id).send({from: this.state.account})
    .once('receipt',(receipt) => {
      return true
    } )
  }

  checkvalidity(account1, newaccount) {
    this.setState({loading: true})
    this.state.auction.methods.checkvalidity(account1, newaccount).send({from: this.state.account})
    .once('receipt',(receipt) => {
      return true
    } )
  }


  closeAuctionOwner(id){
    this.state.auction.methods.closeAuctionOwner(id).send({from: this.state.account })
    .on('confirmation',() => {
      // alert("Your product is now removed from active bidding")
      Swal.fire(
        {
            title: "Success ", 
            text: "Your product is now removed from active auction", 
            type: "success",
            icon: 'success',
        }
    ).then(function (result) {
        window.location.reload()
    })
    })
    .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
      console.log("transaction rejected", error, receipt)
      // alert("Transaction Failed")
      Swal.fire(
        {
            title: "Failure", 
            text: "Transaction Failed", 
            type: "success",
            icon: 'error'
        }
    ).then(function (result) {
        window.location.reload()
    })
    })
  }

  createUser(name,email,address,location,productname){
    // const a = this.state.account
    const k = localStorage.getItem("publicKey");
    this.state.auction.methods.createUser(crypt.encrypt(k,name),crypt.encrypt(k,email),crypt.encrypt(k,address),  crypt.encrypt(k,location),productname).send({from: this.state.account})
    .on('confirmation',() => {
      // alert("User details shared successfully")
      Swal.fire(
        {
            title: "Success ", 
            text: "User details shared successfully", 
            type: "success",
            icon: 'success',
        }
    ).then(function (result) {
        window.location.reload()
    })
    })
    .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
      console.log("transaction rejected", error, receipt)
      // alert("Transaction Failed")
      Swal.fire(
        {
            title: "Failure", 
            text: "Transaction Failed", 
            type: "success",
            icon: 'error'
        }
    ).then(function (result) {
        window.location.reload()
    })
    })

    //updated
    // this.state.auction.methods.createUser(encrypt(name,a), encrypt(password,a), encrypt(email,a),encrypt(address,a)).send({from: this.state.account})
    // .once('receipt',(receipt) => {
    //   console.log(receipt)
    // })
  }
  

  

  Capturefile = (event) => {
    event.preventDefault();
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({buffer : Buffer.from(reader.result)})
      console.log('buffer', Buffer(reader.result))
    }
  }

  createhash =  (event) => {
    event.preventDefault()
    console.log("Submitting the form...")
    ipfs.add(this.state.buffer, (error, result) => {
         console.log('IPFS result',result[0].hash)
        //  this.setState({hash: result[0].hash})
          if(error) {
             console.error(error)
             return
          }
          this.setState({hash: result[0].hash})
          // hashing.push(result[0].hash)
          console.log(this.state.hashes[0])
          console.log(this.state.hash)
          this.setState({
            hashes: [...this.state.hashes, result[0].hash]
          })
          this.state.auction.methods.set(result[0].hash).send({ from: this.state.account }).then((r) => {
            return this.setState({ hash: result[0].hash })
          })
     })
    }
 
   
  
  

  render() {
    return (
      <Router>
        {/* <Loginpg />  */}
      <div className="App"></div>
        {/* <div className="d-flex container-fluid"> */}
          <div className="flex-fill sidebar">
            <NavigationBar 
            account={this.state.account} products={this.state.products} hashes={this.state.hashes} hash={this.state.hash}  createProduct={this.createProduct} placeBid={this.placeBid} closeAuction={this.closeAuction} AuctionExpiry={this.AuctionExpiry} createhash={this.createhash} Capturefile={this.Capturefile}  
            /> 
            <Main Data= 'prerit' 
              account={this.state.account} products={this.state.products} users={this.state.users} hashes={this.state.hashes} hash={this.state.hash} buffer={this.state.buffer}  createProduct={this.createProduct} createUser={this.createUser} checkvalidity= {this.checkvalidity} placeBid={this.placeBid} closeAuction={this.closeAuction} closeAuctionOwner={this.closeAuctionOwner} AuctionExpiry={this.AuctionExpiry} createhash={this.createhash} Capturefile={this.Capturefile}  
              />
 </div>     
          <Footer />
          <Route exact path="/product" component={Productpg} />
        
          {/* {JSON.stringify(this.state.products)} */}
        </Router>
    );
  }
}


export default App;