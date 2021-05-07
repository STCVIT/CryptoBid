import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import Auction from '../abis/Auction.json'
import Navbar from './Navbar'
import Main from './Main'
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
      }
      this.setState({loading:false})
      console.log(this.state.products)
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
      loading: true
    }
    this.createProduct = this.createProduct.bind(this)
    this.placeBid = this.placeBid.bind(this)
    this.closeAuction = this.closeAuction.bind(this)
    this.AuctionExpiry = this.AuctionExpiry.bind(this)

  }
  createProduct(name , baseprice) {
    this.setState({loading: true})
    this.state.auction.methods.createProduct(name,baseprice).send({from: this.state.account})
    .once('receipt',(receipt) => {
      this.setState.loading({loading:false })
      console.log(receipt)
    })
  }

  placeBid(id){
    this.setState({loading: true})
    this.state.auction.methods.placeBid(id).send({from: this.state.account})
    .once('receipt',(receipt) => {
      this.setState.loading({loading:false})
      // console.log(receipt)
    })
  }

  closeAuction (id, price){
    this.setState({loading: true})
    this.state.auction.methods.closeAuction(id).send({from: this.state.account , value: price})
    .once('receipt',(receipt) => {
      this.setState.loading({loading:false})
      window.location.reload()
    })
  }

  AuctionExpiry(id) {
    this.setState({loading: true})
    this.state.auction.methods.closeAuction(id).send({from: this.state.account})
    .once('receipt',(receipt) => {
      this.setState.loading({loading:false})
      return true
    } )
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main  
                products={this.state.products}  createProduct={this.createProduct} placeBid={this.placeBid} closeAuction={this.closeAuction} AuctionExpiry={this.AuctionExpiry}   />
              }
            </main>
          </div>
        </div>
        </div>
    );
  }
}

export default App;
