import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect, useDispatch } from "react-redux";
import Image from "next/image";

import styles from "../../styles/Transfer.module.css";

import Layout from "../../components/LayoutLoggedIn";
import PageTitle from "../../components/PageTitle";

import currencyPeriod from "../../modules/helpers/currencyPeriod";
import { exportTransaction } from "../../modules/api/transfer";

function TransferStatus(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [exportData, setExportData] = useState("");

  const backHomeHandler = () => {
    router.push("/dashboard");
  };

  useEffect(() => {
    exportTransaction(props.token, props.transferResult.data.id)
      .then((res) => {
        setExportData(res.data.data.url);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <PageTitle title="Transfer Status" />

      <Layout>
        <div className={styles["main-status"]}>
          <div className={styles["status-info"]}>
            <div
              className={`${styles["status"]} ${
                props.transferResult.status &&
                props.transferResult.status === 200
                  ? styles["success"]
                  : styles["failed"]
              }`}
            >
              {props.transferResult.status &&
              props.transferResult.status === 200 ? (
                <i className={`bi bi-check-lg`}></i>
              ) : (
                <i className={`bi bi-x-lg`}></i>
              )}
            </div>
            <p className={styles["status-text"]}>
              {props.transferResult.msg || ""}
            </p>
            <div className={styles["info"]}>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Amount</p>
                <p className={styles["info-value"]}>
                  {`Rp. ${
                    currencyPeriod(props.transferResult.data.amount) || ""
                  }`}
                </p>
              </div>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Balance Left</p>
                <p className={styles["info-value"]}>
                  {`Rp. ${
                    currencyPeriod(props.transferResult.data.balance) || ""
                  }`}
                </p>
              </div>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Date & Time</p>
                <p className={styles["info-value"]}>
                  {Date(props.transferData.date) || ""}
                </p>
              </div>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Notes</p>
                <p className={styles["info-value"]}>
                  {props.transferResult.data.notes || "-"}
                </p>
              </div>
            </div>
          </div>
          <section className={styles["receiver"]}>
            <p className={styles["title"]}>Transfer to</p>
            <div className={styles["contact-item"]}>
              <div className={styles["img"]}>
                <Image
                  src={"/images/default.jpg"}
                  placeholder={"empty"}
                  alt="profile"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className={styles["name-phone"]}>
                <p
                  className={styles["name"]}
                >{`${props.transferData.receiverData.firstName} ${props.transferData.receiverData.lastName}`}</p>
                <p className={styles["phone"]}>
                  {props.transferData.receiverData.noTelp | "-"}
                </p>
              </div>
            </div>
          </section>
          <section className={styles["buttons"]}>
            <a href={exportData} target="_blank" rel="noreferrer">
              <button className={`btn ${styles["download"]}`}>Download PDF</button>
            </a>
            <button className={`btn btn-primary ${styles["home"]}`} onClick={backHomeHandler}>
              Back to Home
            </button>
          </section>
        </div>
      </Layout>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.auth.userData.id,
    token: state.auth.userData.token,
    userData: state.user.userData,
    transferData: state.transfer.transferData,
    transferResult: state.transfer.transferResult,
  };
};

export default connect(mapStateToProps)(TransferStatus);
