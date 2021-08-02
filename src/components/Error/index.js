import React from "react";
import styles from "./style.module.css"
import i404 from './404.png';
import Login from './Login.png';
import Account from './Account.png';
import Metamask from './Metamask.png';
function Error(props){
    const Err = {
        1 : {
            Name : "Page Not Found" ,
            img : i404,
            Link: '/'
        },
        2 : {
            Name : "Not Signed in" ,
            img: Login,
            Link: '/profile'
        },
        3 : {
            Name : "Account not connected" ,
            img: Account,
            Link: '/'
        },
        4 : {
            Name : "Metamask not installed" ,
            img : Metamask,
            Link: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en'
        }

};
console.log(Err);
    return(
        <div className={styles.Cont + " text-center container my-3 "}>
            <h3>{Err[props.id].Name}</h3>
            <p>Head back to the homepage <a href={Err[props.id].Link} >CryptoAuction</a></p>
            <img src={Err[props.id].img } className={styles.e404} width="50%" alt="error" />
            </div>
         
    );
}

export default Error;
