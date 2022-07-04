import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-toastify";
import { connect } from "react-redux";

import styles from "../../styles/Profile.module.css";

import Layout from "../../components/LayoutLoggedIn";
import PageTitle from "../../components/PageTitle";

function PersonalInfo(props) {
  const router = useRouter();
  console.log(router);
  return (
    <>
      <PageTitle title="Personal Information" />

      <Layout>
        <div className={styles["main-container"]}>
          <div className={styles["header"]}>
            <p className={styles["title"]}>Personal Information</p>
          </div>
          <p>
            We got your personal information from the sign up proccess. If you
            want to make changes on your information, contact our support.
          </p>
          <div className={styles["item-container"]}>
            <p className={styles["info-label"]}>First Name</p>
            <p className={styles["info-value"]}>{props.userData.firstName}</p>
          </div>
          <div className={styles["item-container"]}>
            <p className={styles["info-label"]}>Last Name</p>
            <p className={styles["info-value"]}>{props.userData.lastName}</p>
          </div>
          <div className={styles["item-container"]}>
            <p className={styles["info-label"]}>Verified E-mail</p>
            <p className={styles["info-value"]}>{props.userData.email}</p>
          </div>
          <div className={`${styles["item-container"]} ${styles["phone"]}`}>
            <div>
              <p className={styles["info-label"]}>Phone Number</p>
              <p className={styles["info-value"]}>
                {props.userData.noTelp || "-"}
              </p>
            </div>
            {props.userData.noTelp ? (
              <Link href="/profile/edit-phone">
                <a>Manage</a>
              </Link>
            ) : (
              <Link href="/profile/add-phone">
                <a>Add</a>
              </Link>
            )}
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

export default connect(mapStateToProps)(PersonalInfo);
