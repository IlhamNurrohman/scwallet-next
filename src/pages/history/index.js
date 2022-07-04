import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { connect, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import styles from "../../styles/History.module.css";

import Layout from "../../components/LayoutLoggedIn";
import PageTitle from "../../components/PageTitle";

import { getHistory } from "../../modules/api/history";
import currencyPeriod from "../../modules/helpers/currencyPeriod";
import { resetTransferAction } from "../../redux/actions/transfer";

function Card({ data }) {
  return (
    <Link href={`/history/${data.id}`} passHref>
      <div className={styles["transaction-item"]}>
        <div className={styles["left"]}>
          <div className={styles["img"]}>
            <Image
              alt="profile"
              src={
                data.image
                  ? `${data.image}`
                  : "/images/default.jpg"
              }
              placeholder="blur"
              blurDataURL="/images/default.jpg"
              onError={() => "/images/default.jpg"}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={styles["name-type"]}>
            <p className={styles["name"]}>{data.fullName}</p>
            <p className={styles["type"]}>{data.type}</p>
          </div>
        </div>
        <div
          className={`${styles["transaction-amount"]} ${
            data.type === "topup" || data.type === "accept"
              ? styles["green"]
              : styles["red"]
          }`}
        >
          {data.type === "topup" || data.type === "accept" ? "+" : "-"}Rp.{" "}
          {currencyPeriod(data.amount)}
        </div>
      </div>
    </Link>
  );
}

function History(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [historyData, setHistoryData] = useState([]);
  const [paginationData, setPaginationData] = useState({});

  console.log(router);

  let page, filter;
  // if (!router.query.page)
  // if (!router.query.filter)
  page = parseInt(router.query.page) || 1;
  filter = router.query.filter || "WEEK";

  useEffect(() => {
    getHistory(props.token, 6, filter, page)
      .then((res) => {
        setHistoryData(res.data.data);
        const pagination = res.data.pagination;
        setPaginationData({ ...pagination });
        console.log(filter, res.data.data);
        console.log("pagination", paginationData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.token, filter, page]);

  useEffect(() => {
    dispatch(resetTransferAction());
  });

  return (
    <>
      <PageTitle title="History" />

      <Layout>
        <div className={styles["main"]}>
          <div className={styles["header"]}>
            <p className={styles["title"]}>Transaction History</p>
            <select
              name="filter"
              onChange={(e) =>
                router.push(
                  e.target.value === "WEEK"
                    ? "/history"
                    : `/history?filter=${e.target.value}`
                )
              }
            >
              <option value="WEEK">WEEK</option>
              <option value="MONTH">MONTH</option>
              <option value="YEAR">YEAR</option>
            </select>
          </div>
          <div className={styles["transaction-list"]}>
            {historyData.length === 0 && (
              <div>
                No transaction made this {filter}, made one by top up or
                transfer now!
              </div>
            )}
            {historyData.length > 0 &&
              historyData.map((data, idx) => <Card data={data} key={idx} />)}
          </div>
          <div className={styles["pagination-buttons"]}>
            <button
              disabled={paginationData.page == 1 ? true : false}
              className={`btn btn-primary ${styles["prev"]}`}
              onClick={() => {
                if (router.query.page && page > 1) {
                  router.push(`/history/?page=${page - 1}`);
                }
                if (router.query.filter && router.query.page && page > 1) {
                  router.push(
                    `/history/?filter=${router.query.filter}&page=${page - 1}`
                  );
                }
              }}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              disabled={
                paginationData.page == paginationData.totalPage ? true : false
              }
              className={`btn btn-primary ${styles["next"]}`}
              onClick={() => {
                if (!router.query.filter && !router.query.page) {
                  router.push(`${router.asPath}?page=${page + 1}`);
                }
                if (!router.query.filter) {
                  router.push(`${router.asPath}?page=${page + 1}`);
                }
                if (router.query.filter) {
                  router.push(`${router.asPath}&page=${page + 1}`);
                }
                if (!router.query.q && page > 1) {
                  router.push(`${router.pathname}?page=${page + 1}`);
                }
                if (router.query.filter && page > 1) {
                  router.push(
                    `${router.pathname}?filter=${router.query.filter}&page=${page + 1}`
                  );
                }
              }}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.auth.userData.id,
    token: state.auth.userData.token,
  };
};

export default connect(mapStateToProps)(History);
