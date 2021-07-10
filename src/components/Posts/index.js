import React , { useState }  from "react";
import styles from "./postCards.module.css";
import { render } from "@testing-library/react";
import { AiFillThunderbolt } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Productpg from "../Productpage"
import { Switch, Route } from "react-router-dom";


function Post(props) {
  const [View, setView] = useState("");

  return (
    <div className={styles.card + " card"} >
      <div className={ styles.imgcont + " text-center"}>
        <img
          src={props.img}
          alt="iwatch"
          className={"card-img-top " + styles.imgWatch}
          width="50%"
          height="100%"
        />
      </div>
      <div  >
        <h6 className={"heading " + styles.heading}>{props.Name}</h6>
        <div className={"row " + styles.row}>
          <div className={"col " + styles.col}>
            <p>
              <AiFillThunderbolt color="gold" /> Highest Bid : <span className={styles.bidPrice}>{props.Hbid} ETH</span>
            </p>
            <p>
              <AiFillThunderbolt color="gold" /> Discription : <span className={styles.bidPrice}>{props.discription} </span>
            </p>
            <div className="pb-2 pr-2 text-right"><Redirect Id={props.Id} /></div>
            

          </div>
          {/* <div className="col">

            <Redirect Id={props.Id} />
         
            {/* <a href="#">Click here</a> */}
            {/* </div> */} 
            
          </div>
          
          <div className={"row " + styles.row}>
            
            <div className={"col " + styles.col}>
             {/* ♡ {parseInt(props.bitcount)} */}
            </div>
            
            <div className={"col " + styles.col}>
           
            {/* <p style={{ color: "#7d56c2" }}>
            <AiOutlineHeart color="white" fontSize="1em"/> {props.Likes}
            </p> */}
            </div>
            
           

          </div>
      </div>
    </div>
  );
}


function Redirect(props) {
  return(
  <Link to={"/product/"+props.Id}>
  <button className="btn btn-light plcbid">See More </button>
  </Link>
  )
}


export default Post;
