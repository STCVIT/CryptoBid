import React from "react";
import styles from "./postCards.module.css";
import { AiFillInfoCircle, AiFillThunderbolt } from "react-icons/ai";
function Card(props) {
  
  return (
    <>
      <a className={styles.LinkTag} href={"/product/" + props.Id}>
      <div className={styles.card + " card"}>
        <div>
          { props.img === "https://ipfs.infura.io/ipfs/" ? 
           <img
           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
           alt="Product-Img"
           className={"card-img-top " + styles.imgWatch}
           width="250px"
           height="250px"
         /> : 

         <img
            src={props.img}
            alt="Product-Img"
            className={"card-img-top " + styles.imgWatch}
            width="250px"
            height="250px"
          />

          
        
        }
          
        </div>
        <div>
          <h6 className={"heading " + styles.heading}>{props.Name}</h6>
          <div className={"row " + styles.row}>
            <div className={"col " + styles.col}>
              <p>
                <AiFillThunderbolt color="gold" /> Highest Bid :{" "}
                <span className={styles.bidPrice}>{props.Hbid} wETH</span>
              </p>
            </div>
          </div>
          <div className={"row " + styles.row}>
            <div className={"col " + styles.col}>
              <p>
                <AiFillInfoCircle color="white" /> <span> Description :{" "} </span>
                <span className={styles.bidPrice}>{props.discription} </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      </a>
    </>
  );
}
export default Card;
