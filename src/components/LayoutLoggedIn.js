import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "../styles/LayoutLoggedIn.module.css";

import NavBar from "./NavBar";
import Footer from "./Footer";

import { topUp } from "../modules/api/topUp";
import { logoutAction } from "../redux/actions/auth";

function LayoutLoggedIn({ children, auth }) {
  const router = useRouter();
  const dispatch = useDispatch;
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [shownNav, setShownNav] = useState(false);
  const [shownLogoutModal, setShownLogoutModal] = useState(false);
  const [shownTopUpModal, setShownTopUpModal] = useState(false);

  const showTopUpModal = () => {
    setActive1(!active1);
    setShownTopUpModal(true);
  };

  const hideTopUpModal = () => {
    setActive1(!active1);
    setShownTopUpModal(false);
  };

  const showLogoutModal = () => {
    setActive2(!active2);
    setShownLogoutModal(true);
  };

  const hideLogoutModal = () => {
    setActive2(!active2);
    setShownLogoutModal(false);
  };

  const toggleNav = () => {
    setShownNav(!shownNav);
  };

  const topUpHandler = (e) => {
    e.preventDefault();
    const body = {
      amount: e.target.amount.value,
    };
    // console.log(auth.userData.token);
    topUp(body, auth.userData.token)
      .then((res) => {
        hideTopUpModal;
        toast.info("Complete your payment method.");
        window.open(
          res.data.data.redirectUrl,
          "_blank" // <- This is what makes it open in a new window.
        );
      })
      .catch((err) => {
        toast.error("Top up error.", { autoClose: false });
        console.log(err);
      });
    // console.log(body);
  };

  return (
    <main className={styles["main"]}>
      <NavBar />
      <section
        className={`${styles["main-container"]} ${
          router.pathname === "/dashboard" ? styles["dashboard"] : ""
        }`}
      >
        <div className={styles["openNav"]} onClick={toggleNav}>
          <i className={`bi bi-list`}></i>
        </div>
        <section className={styles["left"]}>
          <div className={styles["side-nav"]}>
            <div className={styles["side-nav-top"]}>
              <Link href="/dashboard" passHref>
                <div
                  className={`${styles["nav-item-container"]} ${
                    router.pathname.startsWith("/dashboard")
                      ? styles["active"]
                      : ""
                  }`}
                  title="Dashboard"
                >
                  <div className={styles["nav-item"]}>
                    <i className={`${styles["nav-icon"]} bi bi-grid`}></i>
                    <p className={styles["nav-label"]}>Dashboard</p>
                  </div>
                </div>
              </Link>
              <Link href="/transfer" passHref>
                <div
                  className={`${styles["nav-item-container"]} ${
                    router.pathname.startsWith("/transfer")
                      ? styles["active"]
                      : ""
                  }`}
                  title="Transfer"
                >
                  <div className={styles["nav-item"]}>
                    <i className={`${styles["nav-icon"]} bi bi-arrow-up`}></i>
                    <p className={styles["nav-label"]}>Transfer</p>
                  </div>
                </div>
              </Link>
              <div
                className={`${styles["nav-item-container"]} ${
                  active1 ? styles["active"] : ""
                }`}
                title="Top Up"
                onClick={showTopUpModal}
              >
                <div className={styles["nav-item"]}>
                  <i className={`${styles["nav-icon"]} bi bi-plus-lg`}></i>
                  <p className={styles["nav-label"]}>Top Up</p>
                </div>
              </div>
              {/* <Link href="/history" passHref>
                <div
                  className={`${styles["nav-item-container"]} ${
                    router.pathname.startsWith("/history")
                      ? styles["active"]
                      : ""
                  }`}
                  title="History"
                >
                  <div className={styles["nav-item"]}>
                    <i
                      className={`${styles["nav-icon"]} bi bi-clock-history`}
                    ></i>
                    <p className={styles["nav-label"]}>History</p>
                  </div>
                </div>
              </Link> */}
              <Link href="/profile" passHref>
                <div
                  className={`${styles["nav-item-container"]} ${
                    router.pathname.startsWith("/profile")
                      ? styles["active"]
                      : ""
                  }`}
                  title="Profile"
                >
                  <div className={styles["nav-item"]}>
                    <i className={`${styles["nav-icon"]} bi bi-person`}></i>
                    <p className={styles["nav-label"]}>Profile</p>
                  </div>
                </div>
              </Link>
            </div>
            <div
              className={`${styles["nav-item-container"]} ${
                active2 ? styles["active"] : ""
              }`}
              title="Logout"
              onClick={showLogoutModal}
            >
              <div className={styles["nav-item"]}>
                <i className={`${styles["nav-icon"]} bi bi-box-arrow-left`}></i>
                <p className={styles["nav-label"]}>Logout</p>
              </div>
            </div>
          </div>
        </section>
        <section
          className={`${styles["right"]} ${
            router.pathname !== "/dashboard" ? styles["not-dashboard"] : ""
          }`}
        >
          <div className={styles["child"]}>{children}</div>
        </section>
      </section>
      <Footer />
      <div
        id={styles["myNav"]}
        className={`${styles["overlay"]} ${
          shownNav ? styles["w100"] : styles["w0"]
        }`}
      >
        <p className={styles["closebtn"]} onClick={toggleNav}>
          &times;
        </p>
        <div className={styles["overlay-content"]}>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
          <Link href="/transfer">
            <a>Transfer</a>
          </Link>
          <a href="#" onClick={showTopUpModal}>
            Topup
          </a>
          <Link href="/profile">
            <a>Profile</a>
          </Link>
          <a href="#" onClick={showLogoutModal}>
            Logout
          </a>
        </div>
      </div>
      <Modal
        show={shownLogoutModal}
        onHide={hideLogoutModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => router.push("/logout")}>
            Logout
          </Button>
          <Button variant="secondary" onClick={hideLogoutModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={shownTopUpModal}
        onHide={hideTopUpModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Topup</Modal.Title>
        </Modal.Header>
        <form onSubmit={topUpHandler}>
          <Modal.Body>
            <p>Enter the amount of money, and click submit</p>
            <input className={styles["input-amount"]} type="text" name="amount"></input>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(LayoutLoggedIn);
