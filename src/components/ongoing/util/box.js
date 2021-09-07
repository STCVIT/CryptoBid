import styles from "../postCard.module.css";
import Eth from "../../icons/Eth";
import React from "react";
function Box(props) {
  const Hbid = props.HBid;
  const Ubid = props.UBid;

  const Data = [
    {
      Title: "Highest Bid",
      className: styles.Hbid,
      dat: Hbid,
    },
    {
      Title: "Your Bid",
      className: styles.Ubid,
      dat: Ubid,
    },
  ];
  return (
    <div className={styles.Box + " container "}>
      <div className={"d-flex row" + styles.text}>
        <div className="col">
          <div className="row">
            <img
              src={props.img}
              className={"align-self-start " + styles.img}
              height="120px"
              width="120px"
              alt="prod-img"
            />
            <div className={"align-self-start text-left " + styles.TitleCont}>
              <h4 className="p-2 font-weight-bold">{props.Name}</h4>
              <div className="row">
                <div className="col">
                  <p className={"px-2 " + styles.underTitle}>
                    Bids:{" "}
                    <span className={styles.purpleText}>{props.Bids}</span>
                  </p>
                  <p className={"px-2 " + styles.underTitle}>
                    End Date:{props.Endtime}
                    <span className={styles.purpleText}>{props.TimeLeft}</span>
                  </p>
                </div>
                <div className={"col " + styles.Mob}>
                  {Data.map((Data) => {
                    return (
                      <div className={"row px-2 "}>
                        <p>{Data.Title}</p>
                        <p className={Data.className}>
                          <Eth className={styles.EthIcon} />
                          {Data.dat} wETH
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Box;
