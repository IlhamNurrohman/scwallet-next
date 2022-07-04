import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { logoutAction } from "../../redux/actions/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Logout(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  dispatch(logoutAction());

  useEffect(() => {
    if (!props.auth.userData.token) {
      toast.success("Logout success, redirecting to login page.");
      router.push("/login");
    }
  });

  return <></>;
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Logout);
