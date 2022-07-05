import { connect } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

const ReactCodeInput = dynamic(import("react-code-input"));

import styles from "../../styles/Profile.module.css";

import Layout from "../../components/LayoutLoggedIn";
import PageTitle from "../../components/PageTitle";
import { checkPin } from "../../modules/api/user";

function ChangePin(props) {
  const router = useRouter();
  const [pin, setPin] = useState(null);

  const formChange = (e) => {
    setPin(e);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // const body = {
    //   pin: pin,
    // };
    checkPin(props.token, pin)
      .then((res) => {
        if (res.data.status == 200) {
          toast.success("Correct pin");
          router.push("/profile/new-pin");
        }
      })
      .catch((err) => {
        toast.error("Wrong pin !")  
        console.log(err)
      });
  };

  return (
    <>
      <PageTitle title="Change Pin" />

      <Layout>
        <div className={styles["main-container"]}>
          <div className={styles["header"]}>
            <p className={styles["title"]}>Change Pin</p>
          </div>
          <p>
            Enter your current 6 digits SCWallet PIN below to continue to the
            next steps.
          </p>
          <form onSubmit={submitHandler} className={styles["form"]}>
            <ReactCodeInput
              type="password"
              fields={6}
              name="pin"
              onChange={formChange}
            />
            {/* <div className={styles["pin"]}>
              <input
                type="password"
                name="pin"
                placeholder="6 digits pin"
                minLength="6"
                maxLength="6"
                required
              ></input>
            </div> */}
            <button type="submit" className="btn btn-primary">
              Confirm
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

export default connect(mapStateToProps)(ChangePin);
