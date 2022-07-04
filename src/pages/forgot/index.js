import Link from "next/link";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import styles from "../../styles/Auth.module.css";

import Layout from "../../components/LayoutAuth";
import PageTitle from "../../components/PageTitle";

import { forgotPassword } from "../../modules/api/auth";

function Forgot(props) {
  const router = useRouter();

  useEffect(() => {
    if (props.auth.isFulfilled) {
      router.push("/dashboard");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      email: e.target.email.value
    };

    forgotPassword(body)
      .then((res) => {
        if (res.data.status == 200) {
          toast.success("Success, check your email.");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <PageTitle title="Forgot Password" />

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
          <div className={styles["email"]}>
            <i className="bi bi-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Enter your e-mail"
              required
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Confirm
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Forgot);
