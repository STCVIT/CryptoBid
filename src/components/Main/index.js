import React, { Component } from "react";
import "./main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Switch, Route } from "react-router-dom";
import Addpost from "../Addpost";
import Categories from "../Categories";
import Post from '../Card';
import Assests from '../assests'
import Search from '../Search'
import Ongoing from '../ongoing'
import Signup from '../signup'
import Productpg from "../Productpage"
// function Main(props) {
//   return (
//     <div>
//        <div className="main-container">
//         <div className="p-2 top-section container-fluid ">
//           <div className="d-flex justify-content-start">
//             <div className="p-2 ml-1">
//               <div className="search-box ">
//                 <div className="input-group rounded">
//                   <input
//                     type="search"
//                     className="form-control rounded"
//                     placeholder="Search"
//                     aria-label="Search"
//                     aria-describedby="search-addon"
//                   />
//                   <span className="input-group-text border-0" id="search-addon">
//                     <FontAwesomeIcon icon={faSearch} />
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="p-2 ml-auto mr-5">
//               <div className="d-flex">
//                 <button className="btn p-2 mx-3" href="#">
//                   {" "}
//                   <FontAwesomeIcon icon={faBell} />
//                 </button>
//                 <div className="p-2 userBox dropdown">
//                   <button
//                     className="dropdown-toggle"
//                     type="button"
//                     id="dropdownMenuButton"
//                     data-toggle="dropdown"  
//                     aria-haspopup="true"
//                     aria-expanded="false"
//                   >
//                     <img
//                       className="userPic"
//                       alt="user-img"
//                       src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
//                     />
//                     <span className="p-2">{props.Data.Name}</span>
//                   </button>
//                   <div
//                     className="dropdown-menu"
//                     aria-labelledby="dropdownMenuButton"
//                   >
//                     <a className="dropdown-item" href="/">
//                       Settings
//                     </a>
//                     <a className="dropdown-item" href="/">
//                      LogOut
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="Content">
          
//           <Switch>
        //     <Route exact path="/AddNew">
        //       <Addpost   hashes={props.hashes} hash={props.hash}  createProduct={props.createProduct}  closeAuction={props.closeAuction} AuctionExpiry={props.AuctionExpiry} createhash={props.createhash} Capturefile={props.Capturefile}  />
        //     </Route>
        //     <Route exact path="/home">
        //       <Post   hashes={props.hashes} hash={props.hash} account={props.account} products={props.products} createProduct={props.createProduct}  closeAuction={props.closeAuction} placeBid={props.placeBid} AuctionExpiry={props.AuctionExpiry}  />
        //     </Route>
        //     <Route exact path="/categories"> 
        //     <Categories hashes={props.hashes} hash={props.hash}  account={props.account} products={props.products} placeBid={props.placeBid} closeAuction={props.closeAuction} />
        //  </Route>
        //  <Route exact path="/ongoing"> 
        //     <Ongoing hashes={props.hashes} hash={props.hash} account={props.account} products={props.products}  />
        //  </Route>
        //  <Route exact path="/assests"> 
        //     <Assests  hashes={props.hashes} hash={props.hash} account={props.account} products={props.products} users={props.users} checkvalidity={props.checkvalidity}  />
        //  </Route>
        //  <Route exact path="/signup"> 
        //     <Signup   hashes={props.hashes} hash={props.hash} account={props.account} products={props.products} users={props.users} createUser={props.createUser} />
        //  </Route>
        //  {/* <Route>
        //  <Search products={props.products} placeBid={props.placeBid} closeAuction={props.closeAuction}/>
        //  </Route> */}
          
//           </Switch>
//         </div>
//       </div>
//     </div>
//   )
// }


function Main(props) {
    return (
      <div className="main-container">
      
        <div className="Content">
          <Switch>
          <Route exact path="/AddNew">
              <Addpost   hashes={props.hashes} hash={props.hash}  createProduct={props.createProduct}  closeAuction={props.closeAuction} AuctionExpiry={props.AuctionExpiry} createhash={props.createhash} Capturefile={props.Capturefile}  />
            </Route>
            <Route exact path="/home">
              <Post   hashes={props.hashes} hash={props.hash} account={props.account} products={props.products} createProduct={props.createProduct}  closeAuction={props.closeAuction} placeBid={props.placeBid} AuctionExpiry={props.AuctionExpiry}  />
            </Route>
            <Route exact path="/categories"> 
            <Categories hashes={props.hashes} hash={props.hash}  account={props.account} products={props.products} placeBid={props.placeBid} closeAuction={props.closeAuction} />
         </Route>
         <Route exact path="/ongoing"> 
            <Ongoing hashes={props.hashes} hash={props.hash} account={props.account} products={props.products} users={props.users} createUser={props.createUser} />
         </Route>
         <Route exact path="/assests"> 
            <Assests  hashes={props.hashes} hash={props.hash} account={props.account} products={props.products} users={props.users} checkvalidity={props.checkvalidity} createUser={props.createUser}  />
         </Route>
         <Route exact path="/signup"> 
            <Signup   hashes={props.hashes} hash={props.hash} account={props.account} products={props.products} users={props.users} createUser={props.createUser} />
         </Route>
         <Route exact path="/product/:id">
              <Productpg hashes={props.hashes} hash={props.hash} account={props.account} products={props.products} createProduct={props.createProduct}  closeAuction={props.closeAuction} placeBid={props.placeBid} AuctionExpiry={props.AuctionExpiry}  />
            </Route>
         {/* <Route exact path='/product/:id' component={Productpg} />
         {/* <Route>
         <Search products={props.products} placeBid={props.placeBid} closeAuction={props.closeAuction}/>
         </Route> */}
          </Switch>
        </div>
      </div>
    );
}


export default Main;
