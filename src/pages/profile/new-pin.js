import { connect } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

const ReactCodeInput = dynamic(import("react-code-input"));

import styles from "../../styles/Profile.module.css";

import Layout from "../../components/LayoutLoggedIn";
import PageTitle from "../../components/PageTitle";
import { editPin } from "../../modules/api/user";

function NewPin(props) {
  const router = useRouter();
  const [pin, setPin] = useState(null);

  const formChange = (e) => {
    setPin(e);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      pin: pin,
    };

    editPin(props.token, props.id, body)
      .then((res) => {
        if (res.data.status == 200) {
          toast.success("Success");
          router.push("/profile");
        }
      })
      .catch((err) => {
        toast.error("Length pin 6 number")
        console.log(err)
      });
  };

  return (
    <>
      <PageTitle title="New Pin" />

      <Layout>
        <div className={styles["main-container"]}>
          <div className={styles["header"]}>
            <p className={styles["title"]}>Change Pin</p>
          </div>
          <p>Type your new 6 digits security PIN to use in SCWallet.</p>
          <form onSubmit={submitHandler} className={styles["form"]}>
            <ReactCodeInput
              type="password"
              fields={6}
              name="pin"
              onChange={formChange}
            />
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

export default connect(mapStateToProps)(NewPin);
