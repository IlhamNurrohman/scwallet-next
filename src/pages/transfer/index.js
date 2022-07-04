import Link from "next/link";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";

import styles from "../../styles/Transfer.module.css";

import Layout from "../../components/LayoutLoggedIn";
import PageTitle from "../../components/PageTitle";

import { getAllUser } from "../../modules/api/transfer";
import { resetTransferAction } from "../../redux/actions/transfer";

function Card({ data }) {
  return (
    <Link href={`/transfer/amount?receiver=${data.id}`} passHref>
      <div className={styles["contact-item"]}>
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
        <div className={styles["name-phone"]}>
          <p
            className={styles["name"]}
          >{`${data.firstName} ${data.lastName}`}</p>
          <p className={styles["phone"]}>{data.noTelp | "-"}</p>
        </div>
      </div>
    </Link>
  );
}

function Transfer(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userData, setUserData] = useState([]);
  const [paginationData, setPaginationData] = useState({});

  let page = parseInt(router.query.page) || 1;

  useEffect(() => {
    router.query.q
      ? getAllUser(props.token, page, router.query.q)
          .then((res) => {
            setUserData(res.data.data);
            console.log(router.query.q);
            const { pagination } = res.data;
            setPaginationData({ ...pagination });
            console.log(res.data.data);
            console.log("pagination", paginationData);
          })
          .catch((err) => console.log(err))
      : getAllUser(props.token, page)
          .then((res) => {
            setUserData(res.data.data);
            const { pagination } = res.data;
            setPaginationData({ ...pagination });
            console.log(res.data.data);
            console.log("pagination", paginationData);
          })
          .catch((err) => console.log(err));

    dispatch(resetTransferAction());
  }, [router.query, dispatch, page, paginationData, props.token]);

  return (
    <>
      <PageTitle title="Transfer" />

      <Layout>
        <div className={styles["main"]}>
          <div className={styles["content"]}>
            <p className={styles["title"]}>Search Receiver</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push(`/transfer?q=${e.target.q.value}`);
              }}
            >
              <input
                name="q"
                className={styles["search"]}
                placeholder="Search..."
                defaultValue={!router.query.q ? null : router.query.q}
              ></input>
            </form>
            <div className={styles["contact-list"]}>
              {userData &&
                userData.length > 0 &&
                userData.map((data, idx) => <Card data={data} key={idx} />)}
            </div>
          </div>
          <div className={styles["pagination-buttons"]}>
            <button
              disabled={paginationData.page == 1 ? true : false}
              className={`btn btn-primary ${styles["prev"]}`}
              onClick={() => {
                if (router.query.page && page > 1) {
                  router.push(`/transfer/?page=${page - 1}`);
                }
                if (router.query.q && router.query.page && page > 1) {
                  router.push(
                    `/transfer/?q=${router.query.q}&page=${page - 1}`
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
                if (!router.query.q && !router.query.page) {
                  router.push(`${router.asPath}?page=${page + 1}`);
                }
                if (!router.query.q) {
                  router.push(`${router.asPath}?page=${page + 1}`);
                }
                if (router.query.q) {
                  router.push(`${router.asPath}&page=${page + 1}`);
                }
                if (!router.query.q && page > 1) {
                  router.push(`${router.pathname}?page=${page + 1}`);
                }
                if (router.query.q && page > 1) {
                  router.push(
                    `${router.pathname}?q=${router.query.q}&page=${page + 1}`
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
    userData: state.user.userData,
  };
};

export default connect(mapStateToProps)(Transfer);
