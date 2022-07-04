import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { connect, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import styles from "../../styles/Profile.module.css";

import Layout from "../../components/LayoutLoggedIn";
import PageTitle from "../../components/PageTitle";

import { deleteImage, getDetailUser, editImage } from "../../modules/api/user";
import { resetTransferAction } from "../../redux/actions/transfer";
import { updateUserData } from "../../redux/actions/user";

function Profile(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [shownLogoutModal, setShownLogoutModal] = useState(false);
  const [shownImageModal, setShownImageModal] = useState(false);

  const showImageModal = () => {
    setShownImageModal(true);
  };

  const hideImageModal = () => {
    setShownImageModal(false);
  };

  const showLogoutModal = () => {
    setShownLogoutModal(true);
  };

  const hideLogoutModal = () => {
    setShownLogoutModal(false);
  };

  const inputFileRef = React.createRef();

  const inputImage = () => {
    inputFileRef.current.click();
  };

  const editImageHandler = (e) => {
    const body = new FormData();
    body.append("image", e.target.files[0]);

    editImage(props.token, props.id, body)
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
    dispatch(resetTransferAction());
  });

  return (
    <>
      <PageTitle title="Profile" />

      <Layout>
        <div className={styles["main"]}>
          <div onClick={showImageModal} className={styles["img"]} title="edit or delete photo">
            <Image
              alt="profile"
              src={
                props.userData.image
                  ? `${props.userData.image}`
                  : "/images/default.jpg"
              }
              placeholder="blur"
              blurDataURL="/images/default.jpg"
              onError={() => "/images/default.jpg"}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <input
            type="file"
            name="image"
            hidden={true}
            ref={inputFileRef}
            onChange={(e) => {
              editImageHandler(e);
            }}
          />
          <div className={styles["name-type"]}>
            <p
              className={styles["name"]}
            >{`${props.userData.firstName} ${props.userData.lastName}`}</p>
            <p className={styles["type"]}>{props.userData.noTelp || "-"}</p>
          </div>
          <Link href="/profile/info" passHref>
            <div className={styles["link-container"]}>
              <p>Personal Information</p>
              <i className="bi bi-arrow-right"></i>
            </div>
          </Link>
          <Link href="/profile/change-password" passHref>
            <div className={styles["link-container"]}>
              <p>Change Password</p>
              <i className="bi bi-arrow-right"></i>
            </div>
          </Link>
          <Link href="/profile/change-pin" passHref>
            <div className={styles["link-container"]}>
              <p>Change Pin</p>
              <i className="bi bi-arrow-right"></i>
            </div>
          </Link>
          <div className={styles["link-container"]} onClick={showLogoutModal}>
            <p>Logout</p>
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
          show={shownImageModal}
          onHide={hideImageModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton></Modal.Header>

          <Modal.Body>
            <div className={styles["img-center"]}>
              <div className={styles["img-modal"]}>
                <Image
                  alt="profile"
                  src={
                    props.userData.image
                      ? `${props.userData.image}`
                      : "/images/default.jpg"
                  }
                  placeholder="blur"
                  blurDataURL="/images/default.jpg"
                  onError={() => "/images/default.jpg"}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="danger" onClick={deleteImageHandler}>
              Delete
            </Button> */}
            <Button variant="secondary" onClick={inputImage}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
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

export default connect(mapStateToProps)(Profile);
