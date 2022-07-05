import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import styles from "../../styles/Profile.module.css";

import Layout from "../../components/LayoutLoggedIn";
import PageTitle from "../../components/PageTitle";
import { editPassword } from "../../modules/api/user";

function ChangePassword(props) {
  const router = useRouter();
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [similarity1, setSimilarity1] = useState(false);
  const [similarity2, setSimilarity2] = useState(false);
  const [value, setValue] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
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
      oldPassword: e.target.password.value,
      newPassword: e.target.password1.value,
      confirmPassword: e.target.password2.value,
    };

    if (
      e.target.password1.value !== e.target.password2.value ||
      e.target.password.value === e.target.password1.value
    ) {
      if (e.target.password1.value !== e.target.password2.value)
        return setSimilarity2(true);
      if (e.target.password.value === e.target.password1.value)
        return setSimilarity1(true);
    }
    editPassword(props.token, props.id, body)
      .then((res) => {
        if (res.data.status == 200) {
          toast.success("Success");
          router.push("/profile");
        }
      })
      .catch((err) => {
        toast.error("Password wrong !")
        console.log(err)
      });
  };

  return (
    <>
      <PageTitle title="Change Password" />

      <Layout>
        <div className={styles["main-container"]}>
          <div className={styles["header"]}>
            <p className={styles["title"]}>Change Password</p>
          </div>
          <p>
            You must enter your current password and then type your new password
            twice.
          </p>
          <form onSubmit={submitHandler} className={styles["form-password"]}>
            <div className={styles["password"]}>
              <i className="bi bi-lock"></i>
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                placeholder="Enter your old password"
                required
                onChange={handleChange}
                onClick={() => setSimilarity1(false)}
              ></input>
              <i
                className={`bi ${passwordShown ? `bi-eye-slash` : `bi-eye`} 
            ${styles["toggle-password"]}`}
                onClick={togglePassword}
              ></i>
            </div>
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
                !similarity1 ? styles["show"] : styles["hide"]
              }`}
            >
              Your new password cannot be the same as your old password!
            </p>
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
          </form>
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

export default connect(mapStateToProps)(ChangePassword);
