import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect, useDispatch } from "react-redux";
import Image from "next/image";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import dynamic from "next/dynamic";

const ReactCodeInput = dynamic(import("react-code-input"));

import styles from "../../styles/Transfer.module.css";

import Layout from "../../components/LayoutLoggedIn";
import PageTitle from "../../components/PageTitle";

import currencyPeriod from "../../modules/helpers/currencyPeriod";
import { transferAction } from "../../redux/actions/transfer";
import { getDetailUser } from "../../modules/api/user";
import { updateUserData } from "../../redux/actions/user";
import { checkPin } from "../../modules/api/user";

function TransferConfirmation(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [shownModal, setShownModal] = useState(false);
  const [pin, setPin] = useState(null);

  const formChange = (e) => {
    setPin(e);
  };

  const showModal = () => {
    setShownModal(true);
  };

  const hideModal = () => {
    setShownModal(false);
  };

  const transferHandler = (e) => {
    e.preventDefault();

    const body = {
      receiverId: props.transferData.receiverId,
      amount: props.transferData.amount,
      notes: props.transferData.notes,
    };

    checkPin(props.token, pin)
      .then((res) => {
        if (res.data.status == 200) {
          dispatch(transferAction(props.token, body));
        }
      })
      .catch((err) => {
        toast.error("Wrong pin !")
        console.log(err)
      });
  };

  useEffect(() => {
    if (props.transferResult.isFulfilled) {
      toast.success("Transfer success!");
      getDetailUser(props.token, props.id)
        .then((res) => {
          dispatch(updateUserData(res.data.data));
        })
        .catch((err) => console.log(err));
      router.push("/transfer/status");
    }
  },[props.transferResult.isFulfilled, dispatch, props.token, props.id]);

  return (
    <>
      <PageTitle title="Transfer Confirmation" />

      <Layout>
        <div className={styles["main"]}>
          <div className={styles["confirmation-content"]}>
            <p className={styles["title"]}>Transfer To</p>
            <div className={styles["contact-item"]}>
              <div className={styles["img"]}>
                <Image
                  src={
                    props.transferData.receiverData.image
                      ? `${props.transferData.receiverData.image}`
                      : "/images/default.jpg"
                  }
                  placeholder={"empty"}
                  alt="profile"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className={styles["name-phone"]}>
                <p
                  className={styles["name"]}
                >{`${props.transferData.receiverData.firstName} ${props.transferData.receiverData.lastName}`}</p>
                <p className={styles["phone"]}>
                  {props.transferData.receiverData.noTelp | "-"}
                </p>
              </div>
            </div>
            <section className={styles["details"]}>
              <div className={styles["details-info"]}>
                <p className={styles["title"]}>Details</p>
                <div className={styles["item-container"]}>
                  <p className={styles["info-label"]}>Amount</p>
                  <p className={styles["info-value"]}>
                    {`Rp. ${currencyPeriod(props.transferData.amount)}`}
                  </p>
                </div>
                <div className={styles["item-container"]}>
                  <p className={styles["info-label"]}>Balance Left</p>
                  <p className={styles["info-value"]}>{`Rp. ${currencyPeriod(
                    props.userData.balance - props.transferData.amount
                  )}`}</p>
                </div>
                <div className={styles["item-container"]}>
                  <p className={styles["info-label"]}>Date & Time</p>
                  <p className={styles["info-value"]}>
                    {Date(props.transferData.date)}
                  </p>
                </div>
                <div className={styles["item-container"]}>
                  <p className={styles["info-label"]}>Notes</p>
                  <p className={styles["info-value"]}>
                    {props.transferData.notes}
                  </p>
                </div>
              </div>
              <button className={`btn btn-primary ${styles["confirm"]}`} onClick={showModal}>
                Continue
              </button>
            </section>
          </div>
        </div>
      </Layout>
      <Modal
        show={shownModal}
        onHide={hideModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter pin to transfer</Modal.Title>
        </Modal.Header>
        <form onSubmit={transferHandler} className={styles["form"]}>
          <Modal.Body>
            <p>
              Enter your 6 digits PIN for confirmation to continue transferring
              money.{" "}
            </p>
            <div className={styles["center"]}>
              <ReactCodeInput
                type="password"
                fields={6}
                name="pin"
                onChange={formChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Confirm
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.auth.userData.id,
    token: state.auth.userData.token,
    userData: state.user.userData,
    transferData: state.transfer.transferData,
    transferResult: state.transfer.transferResult,
  };
};

export default connect(mapStateToProps)(TransferConfirmation);
