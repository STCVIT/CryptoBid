import React from "react";
import "./main.css";
import { Switch, Route } from "react-router-dom";
import Addpost from "../Addpost";
import Categories from "../Categories";
import Home from "../Home";

import Ongoing from "../ongoing";
import UserInfo from "../UserInfo";
import Productpg from "../Productpage";
import Historypg from "../history";
import SearchPg from "../Search";
import Error from '../Error'
function Main(props) {
  return (
    <div className="main-container">
      <div className="Content">
        <Switch>
          <Route exact path="/AddNew">
            <Addpost
              hashes={props.hashes}
              hash={props.hash}
              buffer={props.buffer}
              createProduct={props.createProduct}
              closeAuction={props.closeAuction}
              AuctionExpiry={props.AuctionExpiry}
              createhash={props.createhash}
              Capturefile={props.Capturefile}
            />
          </Route>
          <Route exact path="/">
            <Home
              hashes={props.hashes}
              hash={props.hash}
              account={props.account}
              products={props.products}
              createProduct={props.createProduct}
              closeAuction={props.closeAuction}
              placeBid={props.placeBid}
              AuctionExpiry={props.AuctionExpiry}
            />
          </Route>
          <Route exact path="/categories">
            <Categories
              hashes={props.hashes}
              hash={props.hash}
              account={props.account}
              products={props.products}
              placeBid={props.placeBid}
              closeAuction={props.closeAuction}
            />
          </Route>
          <Route exact path="/ongoing">
            <Ongoing
              hashes={props.hashes}
              hash={props.hash}
              account={props.account}
              products={props.products}
              users={props.users}
              createUser={props.createUser}
            />
          </Route>
          <Route exact path="/profile">
            <UserInfo
              hashes={props.hashes}
              hash={props.hash}
              account={props.account}
              products={props.products}
              users={props.users}
              createUser={props.createUser}
            />
          </Route>
          <Route exact path="/product/:id">
            <Productpg
              hashes={props.hashes}
              closeAuctionOwner={props.closeAuctionOwner}
              hash={props.hash}
              account={props.account}
              products={props.products}
              createProduct={props.createProduct}
              closeAuction={props.closeAuction}
              placeBid={props.placeBid}
              AuctionExpiry={props.AuctionExpiry}
            />
          </Route>
          <Route exact path="/history">
            <Historypg
              hashes={props.hashes}
              hash={props.hash}
              account={props.account}
              products={props.products}
              users={props.users}
              createUser={props.createUser}
              createProduct={props.createProduct}
              closeAuction={props.closeAuction}
              placeBid={props.placeBid}
              AuctionExpiry={props.AuctionExpiry}
            />
          </Route>
         
          <Route exact path="/Search=:q">
            <SearchPg
              hashes={props.hashes}
              hash={props.hash}
              account={props.account}
              products={props.products}
              users={props.users}
              createUser={props.createUser}
              createProduct={props.createProduct}
              closeAuction={props.closeAuction}
              placeBid={props.placeBid}
              AuctionExpiry={props.AuctionExpiry}
            />
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Main;
