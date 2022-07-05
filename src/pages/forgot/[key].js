import Link from "next/link";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import styles from "../../styles/Auth.module.css";

import Layout from "../../components/LayoutAuth";
import PageTitle from "../../components/PageTitle";

import { resetPassword } from "../../modules/api/auth";

export default function ResetPassword() {
  const router = useRouter();
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [similarity2, setSimilarity2] = useState(false);
  const [value, setValue] = useState(false);

  const togglePassword1 = () => {
    setPasswordShown1(!passwordShown1);
  };
  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
  };

  const handleChange = (e) => {
    if (e.target.value) setValue(true);
    else setValue(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      keysChangePassword: router.query.key,
      newPassword: e.target.password1.value,
      confirmPassword: e.target.password2.value,
    };

    if (e.target.password1.value !== e.target.password2.value)
      return setSimilarity2(true);

    console.log(body)

    resetPassword(body)
      .then((res) => {
        if (res.data.status == 200) {
          toast.success("Success, redirecting to login");
          router.push("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <PageTitle title="Reset Password" />

      <Layout>
        <h2 className={styles["h2"]}>
          Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password
          In a Minutes.
        </h2>
        <p className={styles["description"]}>
          To reset your password, you must type your e-mail and we will send a
          link to your email and you will be directed to the reset password
          screens.
        </p>
        <form onSubmit={submitHandler} className={styles["form"]}>
          <div className={styles["password"]}>
            <i className="bi bi-lock"></i>
            <input
              type={passwordShown1 ? "text" : "password"}
              name="password1"
              placeholder="Enter your new password"
              required
              onChange={handleChange}
              onClick={() => setSimilarity2(false)}
            ></input>
            <i
              className={`bi ${passwordShown1 ? `bi-eye-slash` : `bi-eye`} 
            ${styles["toggle-password"]}`}
              onClick={togglePassword1}
            ></i>
          </div>
          <div className={styles["password"]}>
            <i className="bi bi-lock"></i>
            <input
              type={passwordShown2 ? "text" : "password"}
              name="password2"
              placeholder="Re-enter your password"
              required
              onChange={handleChange}
              onClick={() => setSimilarity2(false)}
            ></input>
            <i
              className={`bi ${passwordShown2 ? `bi-eye-slash` : `bi-eye`} 
            ${styles["toggle-password"]}`}
              onClick={togglePassword2}
            ></i>
          </div>
          <p
            className={`${styles["password-notif"]} ${
              similarity2 ? styles["hide"] : styles["show"]
            }`}
          >
            Retyped password didn&apos;t match!
          </p>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <div className={styles["link-blue"]}>
            Back to{"  "}
            <Link href="/login">
              <a>Login</a>
            </Link>
          </div>
        </form>
      </Layout>
    </>
  );
}
