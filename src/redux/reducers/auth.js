import { ActionType } from "redux-promise-middleware";

import { ACTION_STRING } from "../actions/actionsString";

const initialState = {
  userData: { token: "", id: null, pin: null },
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  err: {},
};

const authReducer = (prevState = initialState, action) => {
  const { authLogin } = ACTION_STRING;
  const { Pending, Fulfilled, Rejected } = ActionType;

  switch (action.type) {
    case `${authLogin}_${Pending}`:
      return {
        ...prevState,
        isPending: true,
      };
    case `${authLogin}_${Fulfilled}`:
      const data = action.payload.data;
      const userData = {
        ...prevState.userData,
        token: data.data.token,
        id: data.data.id,
        pin: data.data.pin,
      };
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        userData,
      };
    case `${authLogin}_${Rejected}`:
      const err = action.payload;
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err,
      };
    default:
      return prevState;
  }
};

export default authReducer;
