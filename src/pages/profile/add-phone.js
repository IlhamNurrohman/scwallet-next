import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import styles from "../../styles/Profile.module.css";

import Layout from "../../components/LayoutLoggedIn";
import PageTitle from "../../components/PageTitle";

import { editPhone } from "../../modules/api/user";
import { getDetailUser } from "../../modules/api/user";
import { updateUserData } from "../../redux/actions/user";

function AddPhone(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      noTelp: e.target.phone.value,
    };

    editPhone(props.token, props.id, body)
      .then((res) => {
        if (res.data.status == 200) {
          toast.success("Success");
          getDetailUser(props.token, props.id)
            .then((res) => {
              dispatch(updateUserData(res.data.data));
            })
            .catch((err) => console.log(err));
          router.push("/profile");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (props.userData.noTelp) {
      router.push("/profile/edit-phone");
    }
  }, [props.userData.noTelp, router]);

  return (
    <>
      <PageTitle title="Add Phone" />

      <Layout>
        <div className={styles["main-container"]}>
          <div className={styles["header"]}>
            <p className={styles["title"]}>Add Phone</p>
          </div>
          <p>
            Add at least one phone number for the transfer ID so you can start
            transfering your money to another user.
          </p>
          <form onSubmit={submitHandler} className={styles["form"]}>
            <div className={styles["phone-field"]}>
              <input
                type="text"
                name="phone"
                placeholder="Phone number"
                required
              ></input>
            </div>
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

export default connect(mapStateToProps)(AddPhone);
