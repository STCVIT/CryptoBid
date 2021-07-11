import React, { Component} from 'react'
import styles from './styles.module.css'
import exampleimg from "./example.jpg"
import moment from 'moment';
moment().format();
const Productpg = (props)=>  {
  var productid = window.location.pathname.split('/');
  console.log(productid[2]);
  const tagarray=['automobile','cheems']
  // console.log("Hels",Dat);
  console.log(props.products[productid[2]])
  return(
    <div>

    {props.products.map((product,key)=> {
      const d1 = moment.unix(parseInt(product.createdAt))
      const dz = moment(d1).format("hh:mm:ss")
      console.log(dz)
      
      const a1 = moment.unix(parseInt(product.currentbidtime))
      const az = moment(a1).format("hh:mm:ss")
      console.log(az)
      const d2 = new Date()
      const d3 = new Date(parseInt(product.createdAt))
      // const t1 = d3.getSeconds()
       console.log(d2.getSeconds())
       console.log(d3.getSeconds())

      console.log(new Date(parseInt(product.createdAt)).toTimeString())
      console.log(parseInt(product.bidcount))
      return(
        <div>
        {key === productid[2]-1 ? 

               <div key={key} className={styles.product}>
        <button className="btn btn-dark backbtn"  > <span>&#60;</span> Back</button>
        <div className="container">
        <div className="row">
        <div className="col-md">
          <img src={`https://ipfs.infura.io/ipfs/${props.hashes[key]}`} alt="" className={styles.productimg}/>
        </div>
        <div className="col-md">
           <span className={styles.purpletext}><h3>{product.infoArray.category} </h3></span> 
           <h1>{product.name}</h1>
           <h6>Created At:  <span className={styles.purpletext}>{dz}</span></h6>
           <h6>Last Bid Time:  <span className={styles.purpletext}>{az}</span></h6>
           {/* <p className="desc">{product.purchased}</p> */}
           <p className={styles.purpletext}>{product.infoArray.discription}</p>
           {product.purchased.toString() === "false" && d3.getSeconds() - d2.getSeconds() <=60 ?
           <p className={styles.price}>Status : Available</p>
          
          :  <p className={styles.price}>Sold</p>}
           
           <h6>BasePrice  <span className={styles.purpletext}>{window.web3.utils.fromWei(
                  product.baseprice.toString(),
                  "Ether")}</span></h6>
           <h4>
           <svg width="26" height="35" viewBox="0 0 26 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.9044 31.4462L0.0117188 23.8376L12.8965 42.0013L25.7958 23.8376L12.8965 31.4462H12.9044ZM13.096 0L0.208594 21.3898L13.096 29.0115L25.9887 21.3977L13.096 0Z" fill="#BE95FF"/>
           </svg><span className="price">{window.web3.utils.fromWei(
                  product.currentBid.toString(),
                  "Ether")} ETH </span></h4> 
                    <div className="pb-2">
                    {!product.purchased && product.currentBidder !== props.account && product.owner !== props.account // && ( (dz.getSeconds() - d3.getSeconds() <= 60 && dz.getMinutes() === d3.getMinutes() ) || (d3.getSeconds() - dz.getSeconds() <= 60 && dz.getMinutes() - d3.getMinutes()) )
                      ? 
                      <button className="btn btn-dark plcbid"
                            // type="submit"
                            // value="Submit"
                            // onSubmit={this.handleSubmit}
                          name={product.Id}
                          value = {product.currentBid}
                          // bid =  {this.state.value}
                          onClick={(event) => {props.placeBid(event.target.name, event.target.value)}
                        }
                        >
                        Place Bid
                        </button>
                      : null}
                      </div>
                    <div className="pb-2">

                    {!product.purchased && product.currentBidder === props.account && product.owner !== props.account  // && (dz.getMinutes() - d3.getMinutes() > 1)
                      ? 
                      <button className="btn btn-dark plcbid"
                          name={product.Id}
                          value = {product.currentBid}
                          onClick={(event) => {props.closeAuction(event.target.name)}
                        }
                        >
                        Pay
                        </button>
                      : null}
                      </div> 
           
              
          
          <div className="tags">
          <div> <button className="btn btn-dark like">♡ {parseInt(product.bidcount)}</button></div>
              {/* <button className={`btn btn-dark ${styles.backbtn} ${styles.tag}`}>#{tagarray[0]}</button>
              <button className={`btn btn-dark ${styles.backbtn} ${styles.tag}`}>#{tagarray[1]}</button>
               */}
              <h6 className={styles.disclaimer}> <br /> Pls Give permission to share details to seller in the Assests tab</h6>
           </div>
          
        </div>
        </div>
        </div>
      </div> 
        


      :null}
        </div>
      )


    })}
    



    </div>
    
  )  
}


export default Productpg
