import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect, useDispatch } from "react-redux";
import Image from "next/image";

import styles from "../../styles/HistoryId.module.css";

import Layout from "../../components/LayoutLoggedIn";
import PageTitle from "../../components/PageTitle";

import { exportTransaction, getHistoryDetail } from "../../modules/api/history";
import currencyPeriod from "../../modules/helpers/currencyPeriod";

function HistoryId(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [historyData, setHistoryData] = useState({});
  const [exportData, setExportData] = useState("");
  //   console.log(router.query.id);

  const backHomeHandler = () => {
    router.push("/dashboard");
  };

  useEffect(() => {
    getHistoryDetail(props.token, router.query.id)
      .then((res) => {
        console.log(res.data.data[0]);
        setHistoryData(res.data.data[0]);
        exportTransaction(props.token, router.query.id)
          .then((res) => {
            setExportData(res.data.data.url);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router.query.id]);

  return (
    <>
      <PageTitle title="Transfer Status" />

      <Layout>
        <div className={styles["main-status"]}>
          <div className={styles["status-info"]}>
            <div
              className={`${styles["status"]} ${
                historyData.status && historyData.status === "success"
                  ? styles["success"]
                  : styles["failed"]
              }`}
            >
              {historyData.status && historyData.status === "success" ? (
                <i className={`bi bi-check-lg`}></i>
              ) : (
                <i className={`bi bi-x-lg`}></i>
              )}
            </div>
            <p className={styles["status-text"]}>
              {historyData.status ? historyData.status : ""}
            </p>
            <section className={styles["receiver"]}>
              {/* <p className={styles["title"]}>Transfer to</p> */}
              <div className={styles["contact-item"]}>
                <div className={styles["img"]}>
                  <Image
                    alt="profile"
                    src={
                      historyData.image
                        ? `${historyData.image}`
                        : "/images/default.jpg"
                    }
                    placeholder="blur"
                    blurDataURL="/images/default.jpg"
                    onError={() => "/images/default.jpg"}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className={styles["name-phone"]}>
                  <p className={styles["name"]}>
                    {historyData
                      ? `${historyData.firstName} ${historyData.lastName}`
                      : ""}
                  </p>
                </div>
              </div>
            </section>
            <div className={styles["item-container"]}>
              <p className={styles["info-label"]}>Type</p>
              <p className={styles["info-value"]}>
                {historyData.type ? historyData.type : ""}
              </p>
            </div>
            <div className={styles["info"]}>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Amount</p>
                <p className={styles["info-value"]}>
                  {historyData.amount
                    ? `Rp. ${currencyPeriod(historyData.amount)}`
                    : ""}
                </p>
              </div>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Date & Time</p>
                <p className={styles["info-value"]}>
                  {historyData.createdAt ? historyData.createdAt : ""}
                </p>
              </div>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Notes</p>
                <p className={styles["info-value"]}>
                  {historyData.notes ? historyData.notes : "-"}
                </p>
              </div>
            </div>
          </div>

          <section className={styles["buttons"]}>
            <a href={exportData} target="_blank" rel="noreferrer">
              <button className={`btn ${styles["download"]}`}>
                Download PDF
              </button>
            </a>
            <button
              className={`btn btn-primary ${styles["home"]}`}
              onClick={backHomeHandler}
            >
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
  };
};

export default connect(mapStateToProps)(HistoryId);
