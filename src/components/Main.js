import React, { Component } from 'react';
// const ipfsClient = require('ipfs-http-client')
// const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', apiPath: '/ipfs/api/v0' }) // leaving out the arguments will default to these values

// const hashes = []
// console.log(hashes)
class Main extends Component {

  

    // constructor(props) {
    //     super(props);
    //     this.state = {value: 0};

    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    //   }




    // handleChange(event) {
    //     this.setState({value: event.target.value});
    //     console.log(event.target.value)
    // }

    // handleSubmit(event) {
    //   event.preventDefault();
    //     alert('A name was submitted: ' + this.state.value);
    //     this.props.placebid(1,this.state.value)
    //     console.log(this.state.value)
        
    //   }

    // constructor(props) {
    //   super(props)
    //   this.state = {
    //     hash: '',
    //     buffer: null,
    //     hashes:[]
    //   }

    // }

    // Capturefile = (event) => {
    //   event.preventDefault();
    //   const file = event.target.files[0]
    //   const reader = new window.FileReader()
    //   reader.readAsArrayBuffer(file)
    //   reader.onloadend = () => {
    //     this.setState({buffer : Buffer.from(reader.result)})
    //     console.log('buffer', Buffer(reader.result))
    //     // console.log("Submitting the form...")
    //   // ipfs.add(this.state.buffer, (error, result) => {
    //   //      console.log('IPFS result',result[0].hash)
    //   //     //  this.setState({hash: result[0].hash})
    //   //       if(error) {
    //   //          console.error(error)
    //   //          return
    //   //       }
    //   //       this.setState({hash: result[0].hash}) 
    //   //       this.setState({
    //   //         hashes: [...this.state.hashes , result[0].hash]
    //   //       })
  
    //   //       // store file on blockhain
    //   //  })
        
    //   }
    // }
  
    // createhash =  (event) => {
    //   event.preventDefault()
    //   console.log("Submitting the form...")
    //   ipfs.add(this.state.buffer, (error, result) => {
    //        console.log('IPFS result',result[0].hash)
    //       //  this.setState({hash: result[0].hash})
    //         if(error) {
    //            console.error(error)
    //            return
    //         }
    //         this.setState({hash: result[0].hash})
           
    //         this.setState({
    //           hashes: [result[0].hash,...this.state.hashes ]
    //         })
    //         // hashes.push(result[0].hash)
    //         console.log(this.state.hashes)
    //         console.log(this.state.hash)
  
    //         //store file on blockhain
    //    })
    //   }
   

    

  render() {
    return (
      <div id="content">
        <h1>Add Product</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const baseprice = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.createProduct(name, baseprice)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Product Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Product Price"
              required />
          </div>
          <div>
            <input 
            id = "file"
            type="file"
            ref={(input) => {this.file = input}  }
            className="form-control"
            placeholder="Product Price"
            onChange={this.props.Capturefile}
            />
          </div>
          <button  onClick={this.props.createhash} className="btn btn-primary">Add Image</button>
          <button  type="submit"  className="btn btn-primary">Add Product</button>
        </form>
        <p>&nbsp;</p>
        <h2>Buy Product</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Picture</th>
              <th scope="col">Name</th>
              <th scope="col">BasePrice</th>
              <th scope="col">Current Bid</th>
              <th scope="col">Owner</th>
              <th scope="col">Current Bidder</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
          { this.props.products.map((product, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{product.Id.toString()}</th>
                  <td> <img src= { `https://ipfs.infura.io/ipfs/${this.props.hash}` } className="App-logo" alt="logo" />  </td>
                  <td>{product.name}</td>
                  <td>{window.web3.utils.fromWei(product.baseprice.toString(), 'Ether')} Eth</td>
                  <td>{window.web3.utils.fromWei(product.currentBid.toString(), 'Ether')} Eth</td>
                  <td>{product.owner}</td>
                  <td>{product.currentBidder}</td>
                  
                  {/* <td> <form onSubmit={this.handleSubmit} >
                  <input id="bidding" value={this.state.value} onChange={(e) => { this.setState({ value: e.target.value }) }  } />
                  </form> */}
                  <td>  
                    { !product.purchased
                      ? 
                      <button
                            // type="submit"
                            // value="Submit"
                            // onSubmit={this.handleSubmit}
                          name={product.Id}
                          // bid =  {this.state.value}
                          onClick={(event) => {this.props.placeBid(event.target.name)}
                        }
                        >
                        Bid
                        </button>
                      : null
                    }
                    </td>
                    <td>  
                    { 
                      <button
                            // type="submit"
                            // value="Submit"
                            // onSubmit={this.handleSubmit}
                          name={product.Id}
                          value = {product.currentBid}
                          // bid =  {this.state.value}
                          onClick={(event) => {this.props.closeAuction(event.target.name , event.target.value)}
                        }
                        >
                        Pay
                        </button>
                    }
                    </td>
                </tr>
              )
          })}  
          </tbody>
        </table>
      </div>
    );
  }
}


export default Main;
