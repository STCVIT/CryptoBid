import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle';
import {Switch,Route, BrowserRouter as Router } from "react-router-dom";
import Header from './Navbar/index'
import Main from './Main/index'
import Loginpg from './Login'
import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import Auction from '../abis/Auction.json'
// import Navbar from './Navbar'
// import Main from './Main'
// import Post from "./Card";
// import Search from './Search'


const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', apiPath: '/ipfs/api/v0' }) // leaving out the arguments will default to these values
let hashing = []
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
        hashing.push(hash)
        this.setState({ hash })
        this.setState({
          hashes: [...this.state.hashes,hash ]
        })
      }
      // const hash = await auction.methods.get().call()
      // this.setState({ hash })
      // this.setState({
      //   hashes: [...this.state.hashes,this.state.hash ]
      // })
      hashing.push(this.state.hash)
      console.log(hashing)
      console.log(this.state.products)
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
      buffer:null
    }
    this.createProduct = this.createProduct.bind(this)
    this.placeBid = this.placeBid.bind(this)
    this.closeAuction = this.closeAuction.bind(this)
    this.AuctionExpiry = this.AuctionExpiry.bind(this)
    this.Capturefile = this.Capturefile.bind(this)
    this.createhash = this.createhash.bind(this)
  }
  createProduct(name , baseprice, discription, category) {
    this.state.auction.methods.createProduct(name,baseprice, discription, category).send({from: this.state.account})
    .once('receipt',(receipt) => {
      this.setState.loading({loading:false })
      console.log(receipt)
    })
  }

  placeBid(id){
    this.state.auction.methods.placeBid(id).send({from: this.state.account})
    .once('receipt',(receipt) => {
      console.log(receipt)
    })
  }

  closeAuction(id, price){
    this.state.auction.methods.closeAuction(id).send({from: this.state.account , value: price})
    .once('receipt',(receipt) => {
      window.location.reload()
    })
  }

  AuctionExpiry(id) {
    this.setState({loading: true})
    this.state.auction.methods.closeAuction(id).send({from: this.state.account})
    .once('receipt',(receipt) => {
      return true
    } )
  }


  Capturefile = (event) => {
    event.preventDefault();
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({buffer : Buffer.from(reader.result)})
      console.log('buffer', Buffer(reader.result))
      // console.log("Submitting the form...")
    // ipfs.add(this.state.buffer, (error, result) => {
    //      console.log('IPFS result',result[0].hash)
    //     //  this.setState({hash: result[0].hash})
    //       if(error) {
    //          console.error(error)
    //          return
    //       }
    //       this.setState({hash: result[0].hash}) 
    //       this.setState({
    //         hashes: [...this.state.hashes , result[0].hash]
    //       })

    //       // store file on blockhain
    //  })
      
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
         
          // this.setState({
          //   hashes: [result[0].hash,...this.state.hashes ]
          // })
          // hashes.push(result[0].hash)
          console.log(this.state.hashes[0])
          console.log(this.state.hash)
          this.state.auction.methods.set(result[0].hash).send({ from: this.state.account }).then((r) => {
            return this.setState({ hash: result[0].hash })
          })
          

          //store file on blockhain
     })
    }
 

  render() {
    return (

      <Router>
        {/* <Loginpg />  */}
      <div className="App"></div>
        <div className="d-flex container-fluid">
          <div className="flex-fill sidebar">
            <Header 
            account={this.state.account} products={this.state.products} hashes={this.state.hashes} hash={this.state.hash}  createProduct={this.createProduct} placeBid={this.placeBid} closeAuction={this.closeAuction} AuctionExpiry={this.AuctionExpiry} createhash={this.createhash} Capturefile={this.Capturefile}  
            />
          
            
          </div>
          <div className="flex-fill col-sm-12 main">
            <Main Data= 'prerit' 
              account={this.state.account} products={this.state.products} hashes={this.state.hashes} hash={this.state.hash}  createProduct={this.createProduct} placeBid={this.placeBid} closeAuction={this.closeAuction} AuctionExpiry={this.AuctionExpiry} createhash={this.createhash} Capturefile={this.Capturefile}  
              />
           
             
       
      </div>
 </div>      
         {/* <Switch > <Route exact path="/" component={Addpost}> </Route> </Switch> 
         <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Addpost
                products={this.state.products} hashes={this.state.hashes} hash={this.state.hash}  createProduct={this.createProduct} placeBid={this.placeBid} closeAuction={this.closeAuction} AuctionExpiry={this.AuctionExpiry} createhash={this.createhash} Capturefile={this.Capturefile}    />
              }
            </main>
          </div> 
        </div> */}
        
        </Router>
    );
  }
}

export default App;
