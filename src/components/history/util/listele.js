import React from "react";
import styles from "../style.module.css";
import { Crypt } from "hybrid-crypto-js";
var crypt = new Crypt();
const name = localStorage.getItem("name");
const email = localStorage.getItem("email");
const address = localStorage.getItem("address");
const location = localStorage.getItem("location");

function Listele(props) {
  const pname = props.Name;
  return (
    <tr>
      <td>
        <img
          src={`https://ipfs.infura.io/ipfs/${props.hash}`}
          alt=""
          className={styles.img + " p-2"}
        />
        <span> {props.Name}</span>
      </td>
      <td className={styles.test}>
        <svg
          width="21"
          height="30"
          viewBox="0 0 26 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.9044 31.4462L0.0117188 23.8376L12.8965 42.0013L25.7958 23.8376L12.8965 31.4462H12.9044ZM13.096 0L0.208594 21.3898L13.096 29.0115L25.9887 21.3977L13.096 0Z"
            fill="#BE95FF"
          />
        </svg>
        <span className={"my-auto " + styles.cost}>{props.Cost} </span>{" "}
      </td>
      <td className={styles.test}>{props.Time}</td>
      <td className={styles.test}>
        {props.radioValue === "1" && !props.Claimed ? (
          <>
            {props.users.map((user, key) => {
              return (
                <>
                  {user.productname !== props.Name ? (
                    <button
                      className="btn btn-primary"
                      onClick={(event) => {
                        event.preventDefault();

                        //const productname =

                        props.createUser(
                          crypt.encrypt(props.publicKey, name),
                          crypt.encrypt(props.publicKey, email),
                          crypt.encrypt(props.publicKey, address),
                          crypt.encrypt(props.publicKey, location),
                          pname
                        );
                      }}
                    >
                      Claim
                    </button>
                  ) : 
                  null
                  }
                  
                </>
              );
            })}
           
           
          </>
        ) : null}
      </td>
    </tr>
  );
}

export default Listele;
