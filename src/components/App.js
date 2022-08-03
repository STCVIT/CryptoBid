import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Route, BrowserRouter as Router } from "react-router-dom";
import NavigationBar from "./navigation";
import { Switch , Redirect } from "react-router-dom";
import Main from "./Main/index";
import { Crypt } from "hybrid-crypto-js";
// import Loginpg from './Login'
import React, { Component } from "react";
import "./App.css";
import Web3 from "web3";
import Auction from "../abis/Auction.json";
import Swal from "sweetalert2";
import Footer from "./footer/Footer.js";
import Productpg from "./Productpage";
import Error from './Error'
import LoadingOverlay from 'react-loading-overlay';
// import generateKeyPairSync from "crypto"
var crypt = new Crypt();

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  apiPath: "/ipfs/api/v0",
}); // leaving out the arguments will default to these values
var K;
class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }
  async loadWeb3() {
    if (window.ethereum) {
      try {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      }
      catch(err) {
        if(err.code=4001) {
          K=3;
        }
      }
     
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else  {
      // window.alert(
      //   "Non-Ethereum browser detected. You should consider trying MetaMask!"
      // ); 
      K = 4;
      
    }
  }

  async loadBlockchainData() {

    

    const web3 = window.web3;

    if (web3 !== undefined){

      try{
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] });
      }
      catch(error){
        console.log(error)
      }

      
    
    
    
    const networkId = await web3.eth.net.getId();
    
    const networkData = Auction.networks[networkId];
    if (networkData) {
      const auction = web3.eth.Contract(Auction.abi, networkData.address);
      
      this.setState({ auction });
      const productCount = await auction.methods.productCount().call();
      for (var i = 1; i <= productCount; i++) {
        const product = await auction.methods.products(i).call();
        this.setState({
          products: [...this.state.products, product],
        });
      }
      const userCount = await auction.methods.usercount().call();
      for (var z = 1; z <= userCount; z++) {
        const user = await auction.methods.user(z).call();
        this.setState({
          users: [...this.state.users, user],
        });
      }
     
    } else {
      // window.alert("Make Sure you connected metamask to the Rinkeby Network");
      Swal.fire({
        title: "Failure to Load Data",
        text: "Make sure you connected metamask to the Rinkeby Network",
        type: "success",
        icon: "error",
      })
    }

    }
    else{
      //write here 
      

    }

  //   else{
  // // (()=> {
  // //   render() {
  // //   return (
  // //     <Switch>
  // //     <Route>
  // // <Error />
  // // </Route>
  // //   </Switch>
  // //   )
  // //   }

    
 
  // // })
    
       
  //     }
       
    
  }
       
    
  

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      productCount: 0,
      products: [],
      hash: "",
      hashes: [],
      buffer: null,
      users: [],
    };
    this.createProduct = this.createProduct.bind(this);
    this.createUser = this.createUser.bind(this);
    this.placeBid = this.placeBid.bind(this);
    this.closeAuction = this.closeAuction.bind(this);
    this.AuctionExpiry = this.AuctionExpiry.bind(this);
    this.Capturefile = this.Capturefile.bind(this);
    this.createhash = this.createhash.bind(this);
    this.checkvalidity = this.checkvalidity.bind(this);
    this.closeAuctionOwner = this.closeAuctionOwner.bind(this);
  }

  createProduct(name, baseprice, discription, category, key, bidinc, date) {
    this.setState({loading: true})
    try {
      const hash = this.state.hash;
      this.state.auction.methods
        .createProduct(
          name,
          baseprice,
          discription,
          category,
          key,
          bidinc,
          date,
          hash
        )
        .send({ from: this.state.account })
        .once("confirmation", () => {
          this.setState({loading:false})
          const lenght = this.state.products.length
          
          Swal.fire({
            title: "Success ",
            text: "Your product is live for auction",
            type: "success",
            icon: "success",
          }).then(function(result) {
            //<a className={styles.LinkTag} href={"/product/" + props.Id}></a>
            window.location.href = "/product/" + (lenght+1) ;
          });
        })
        .on("error", (error, receipt) =>  {
          this.setState({loading:false})
          // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
          
          //alert("Transaction Failed")
          Swal.fire({
            title: "Failure",
            text: "Transaction Failed",
            type: "success",
            icon: "error",
          }).then(function(result) {
            window.location.reload();
          });
        });
    } catch (err) {
      alert("Error");
    }
  }

  placeBid(id, value) {
    this.setState({loading: true})
    
    this.state.auction.methods
      .placeBid(id)
      .send({ from: this.state.account, value: value })
     
      
      
      .on("confirmation", () => {
        this.setState({loading:false})
        
        
        Swal.fire({
          title: "Success ",
          text: "Your bid has been placed",
          type: "success",
          icon: "success",
          
        }).then(function(result) {
          window.location.reload();
        });
      })
      .on("error", (error, receipt) => {
        this.setState({loading:false})
       
        // alert("Transaction Failed")
        Swal.fire({
          title: "Failure",
          text: "Transaction Failed",
          type: "success",
          icon: "error",
        }).then(function(result) {
          window.location.reload();
        });
      });
  }

  closeAuction(id) {
    this.state.auction.methods
      .closeAuction(id)
      .send({ from: this.state.account })
      .on("confirmation", () => {
        // alert("your product has been claimed")
        this.setState({loading:false})
        Swal.fire({
          title: "Success ",
          text: "Product claimed successfully",
          type: "success",
          icon: "success",
        }).then(function(result) {
          window.location.reload();
        });
      })
      .on("error",(error, receipt) => {
        this.setState({loading:false})
        
        // alert("Transaction Failed")
        Swal.fire({
          title: "Failure",
          text: "Transaction Failed",
          type: "success",
          icon: "error",
        }).then(function(result) {
          window.location.reload();
        });
      });
  }

  AuctionExpiry(id) {
    this.setState({ loading: true });
    this.state.auction.methods
      .closeAuction(id)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({loading:false})
        return true;
      });
  }

  checkvalidity(account1, newaccount) {
    this.setState({ loading: true });
    this.state.auction.methods
      .checkvalidity(account1, newaccount)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        return true;
      });
  }

  closeAuctionOwner(id) {
    this.setState({ loading: true });
    this.state.auction.methods
      .closeAuctionOwner(id)
      .send({ from: this.state.account })
      .on("confirmation", () => {
        this.setState({loading:false})
        // alert("Your product is now removed from active bidding")
        Swal.fire({
          title: "Success ",
          text: "Your product is now removed from active auction",
          type: "success",
          icon: "success",
        }).then(function(result) {
          window.location.reload();
        });
      })
      .on("error", (error, receipt) => {
        this.setState({loading:false})
       
        // alert("Transaction Failed")
        Swal.fire({
          title: "Failure",
          text: "Transaction Failed",
          type: "success",
          icon: "error",
        }).then(function(result) {
          
          window.location.reload();
        });
      });
  }

  createUser(name, email, address, location, productname) {
    
    this.state.auction.methods
      .createUser(
         name,
        email,
        address,
        location,
        productname
      )
      .send({ from: this.state.account })
      .on("confirmation", () => {
        this.setState({loading:false})
        // alert("User details shared successfully")
        Swal.fire({
          title: "Success ",
          text: "User details shared successfully",
          type: "success",
          icon: "success",
        }).then(function(result) {
          window.location.reload();
        });
      })
      .on("error", (error, receipt) => {
        this.setState({loading:false})
        // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        
        // alert("Transaction Failed")
        Swal.fire({
          title: "Failure",
          text: "Transaction Failed",
          type: "success",
          icon: "error",
        }).then(function(result) {
          window.location.reload();
        });
      });
  }

  Capturefile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer.from(reader.result) });
      ipfs.add(this.state.buffer, (error, result) => {
      
        //  this.setState({hash: result[0].hash})
        if (error) {
          console.error(error);
          return;
        }
        this.setState({ hash: result[0].hash });
        // hashing.push(result[0].hash)
       
        
        this.setState({
          hashes: [...this.state.hashes, result[0].hash],
        });
      });
    };

    
    
  };

  createhash = (event) => {
    
    ipfs.add(this.state.buffer, (error, result) => {
      
      //  this.setState({hash: result[0].hash})
      if (error) {
        console.error(error);
        return;
      }
      this.setState({ hash: result[0].hash });
      // hashing.push(result[0].hash)
     
      
      this.setState({
        hashes: [...this.state.hashes, result[0].hash],
      });
    });
  };

  render() {
    return (
      <Router>
        {this.state.loading ?  <div active={this.state.loading}
        className="cont">
        <LoadingOverlay
            active={this.state.loading}
            spinner
            className="Loader"
            text='Please Wait...'
            style={{
              fontSize: 50,
              animation: 'spin 1s infinite linear'
            }}
        >     
        </LoadingOverlay>
          </div> : null

       }
       
        
     
       { (K ===4) ?
               
             <Route >
               <Error id={K} />
             </Route>
         : 
          <>
          {(K === 3) ?
           <Route >
           <Error id={K} />
         </Route>
          
        :

        <>
        <div className="App"></div>
   <div className="flex-fill sidebar">
     <NavigationBar
       account={this.state.account}
       products={this.state.products}
       hashes={this.state.hashes}
       hash={this.state.hash}
       createProduct={this.createProduct}
       placeBid={this.placeBid}
       closeAuction={this.closeAuction}
       AuctionExpiry={this.AuctionExpiry}
       createhash={this.createhash}
       Capturefile={this.Capturefile}
     />
     <Main
       Data="prerit"
       account={this.state.account}
       products={this.state.products}
       users={this.state.users}
       hashes={this.state.hashes}
       hash={this.state.hash}
       buffer={this.state.buffer}
       createProduct={this.createProduct}
       createUser={this.createUser}
       checkvalidity={this.checkvalidity}
       placeBid={this.placeBid}
       closeAuction={this.closeAuction}
       closeAuctionOwner={this.closeAuctionOwner}
       AuctionExpiry={this.AuctionExpiry}
       createhash={this.createhash}
       Capturefile={this.Capturefile}
     />
   </div>
   <footer>
    <Footer />
   </footer>
   
   <Route exact path="/product" component={Productpg} />
     </>
        
        }
          </>

         

         
        //   <>
        //      <div className="App"></div>
        // <div className="flex-fill sidebar">
        //   <NavigationBar
        //     account={this.state.account}
        //     products={this.state.products}
        //     hashes={this.state.hashes}
        //     hash={this.state.hash}
        //     createProduct={this.createProduct}
        //     placeBid={this.placeBid}
        //     closeAuction={this.closeAuction}
        //     AuctionExpiry={this.AuctionExpiry}
        //     createhash={this.createhash}
        //     Capturefile={this.Capturefile}
        //   />
        //   <Main
        //     Data="prerit"
        //     account={this.state.account}
        //     products={this.state.products}
        //     users={this.state.users}
        //     hashes={this.state.hashes}
        //     hash={this.state.hash}
        //     buffer={this.state.buffer}
        //     createProduct={this.createProduct}
        //     createUser={this.createUser}
        //     checkvalidity={this.checkvalidity}
        //     placeBid={this.placeBid}
        //     closeAuction={this.closeAuction}
        //     closeAuctionOwner={this.closeAuctionOwner}
        //     AuctionExpiry={this.AuctionExpiry}
        //     createhash={this.createhash}
        //     Capturefile={this.Capturefile}
        //   />
        // </div>
        // <Footer />
        // <Route exact path="/product" component={Productpg} />
        //   </>
         
         }
       
      </Router>
    );
  }
}

export default App;
