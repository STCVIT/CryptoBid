import React, { Component } from "react";

class Main extends Component {
  render() {
    return (
      <div id="content">
        <h1>Add Product</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const name = this.productName.value;
            const baseprice = window.web3.utils.toWei(
              this.productPrice.value.toString(),
              "Ether"
            );
            this.props.createProduct(name, baseprice);
          }}
        >
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => {
                this.productName = input;
              }}
              className="form-control"
              placeholder="Product Name"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => {
                this.productPrice = input;
              }}
              className="form-control"
              placeholder="Product Price"
              required
            />
          </div>
          <div>
            <input
              id="file"
              type="file"
              ref={(input) => {
                this.file = input;
              }}
              className="form-control"
              placeholder="Product Price"
              onChange={this.props.Capturefile}
            />
          </div>
          <button onClick={this.props.createhash} className="btn btn-primary">
            Add Image
          </button>
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
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
            {this.props.products.map((product, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{product.Id.toString()}</th>
                  <td>
                    {" "}
                    <img
                      src={`https://ipfs.infura.io/ipfs/${this.props.hash}`}
                      className="App-logo"
                      alt="logo"
                    />{" "}
                  </td>
                  <td>{product.name}</td>
                  <td>
                    {window.web3.utils.fromWei(
                      product.baseprice.toString(),
                      "Ether"
                    )}{" "}
                    Eth
                  </td>
                  <td>
                    {window.web3.utils.fromWei(
                      product.currentBid.toString(),
                      "Ether"
                    )}{" "}
                    Eth
                  </td>
                  <td>{product.owner}</td>
                  <td>{product.currentBidder}</td>

                  <td>
                    {!product.purchased ? (
                      <button
                        name={product.Id}
                        onClick={(event) => {
                          this.props.placeBid(event.target.name);
                        }}
                      >
                        Bid
                      </button>
                    ) : null}
                  </td>
                  <td>
                    {
                      <button
                        name={product.Id}
                        value={product.currentBid}
                        onClick={(event) => {
                          this.props.closeAuction(
                            event.target.name,
                            event.target.value
                          );
                        }}
                      >
                        Pay
                      </button>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
