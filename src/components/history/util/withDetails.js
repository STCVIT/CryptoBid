import React, { useState } from "react";
//import exampleimg from "./example.jpg";
import styles from "./hstyle.module.css";

function HistComponent(props) {
  var [state, setState] = useState("");
  state = {
    name: "",
    phoneno: "",
    Address: "",
  };
  function handleChange() {
    setState(true);
  }
  return (
    <tr className={"" + styles.tbrow}>
      <td className={"" + styles.imgrow} scope="col">
        {/* <img src={exampleimg} alt="" className={styles.img + "  "} /> */}
        <span> Product</span>
        <div className={styles.info}>
          <p>{props.Name}</p>
          <p>{props.Phoneno}</p>
          <p>{props.Address}</p>
        </div>
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
        <span className={"my-auto " + styles.cost}>1 ETH </span>{" "}
      </td>
      <td className={styles.test}>{props.Date}</td>
      <td className={styles.test}>
        <div class="dropdown">
          <button className={"btn dropleft " + styles.drpdwn} type="button">
            <svg
              width="17"
              height="10"
              viewBox="0 0 17 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.13286 0.792893C1.52338 0.402369 2.15655 0.402368 2.54707 0.792893L8.83997 7.08579L15.1329 0.792893C15.5234 0.402368 16.1565 0.402368 16.5471 0.792893C16.9376 1.18342 16.9376 1.81658 16.5471 2.20711L9.54707 9.20711C9.15655 9.59763 8.52338 9.59763 8.13286 9.20711L1.13286 2.20711C0.742334 1.81658 0.742334 1.18342 1.13286 0.792893Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default HistComponent;
