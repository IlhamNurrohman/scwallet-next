import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

const ReactCodeInput = dynamic(import("react-code-input"));

import styles from "../../styles/Auth.module.css";

import Layout from "../../components/LayoutAuth";
import PageTitle from "../../components/PageTitle";
import { editPin } from "../../modules/api/user";

function CreatePin(props) {
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

    editPin(props.auth.userData.token, props.auth.userData.id, body)
      .then((res) => {
        if (res.data.status === 200) {
          toast.success("Success");
          router.push("/dashboard");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (props.auth.userData.pin) {
      router.push("/dashboard");
    }
  }, [props.auth.userData.pin, router]);

  return (
    <>
      <PageTitle title="Create Pin" />

      <Layout>
        <h2 className={styles["h2"]}>
          Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That
          You Created Yourself.
        </h2>
        <p className={styles["description"]}>
          Create 6 digits pin to secure all your money and your data in SCWallet
          app. Keep it secret and don’t tell anyone about your SCWallet account
          password and the PIN.
        </p>
        <form onSubmit={submitHandler} className={styles["form"]}>
          <ReactCodeInput type="password" fields={6} onChange={formChange} />
          <button type="submit" className="btn btn-primary">
            Confirm
          </button>
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

export default connect(mapStateToProps)(CreatePin);
