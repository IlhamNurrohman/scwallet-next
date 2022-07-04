import { ACTION_STRING } from "../actions/actionsString";
import { ActionType } from "redux-promise-middleware";

const initialState = {
  transferData: {
    receiverId: "",
    amount: "",
    notes: "",
    date: "",
    receiverData: null,
  },
  transferResult: {
    isPending: false,
    isFulfilled: false,
    isRejected: false,
    status: 0,
    msg: "",
    data: null,
  },
};

const transferReducer = (prevState = initialState, action) => {
  const { Pending, Fulfilled, Rejected } = ActionType;
  switch (action.type) {
    case ACTION_STRING.transferData:
      const data = action.payload;
      const transferData = {
        ...prevState.transferData,
        receiverId: data.data.receiverId,
        amount: data.data.amount,
        notes: data.data.notes,
        date: data.data.date,
        receiverData: data.data.receiverData,
      };
      return {
        ...prevState,
        transferData,
      };

    case `${ACTION_STRING.transferResult}_${Pending}`:
      const transferResult = {
        ...prevState.transferResult,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
        msg: "",
        status: "",
        data: null,
      };
      return {
        ...prevState,
        transferResult,
      };

    case `${ACTION_STRING.transferResult}_${Fulfilled}`:
      const dataTransfer = action.payload.data;
      transferResult = {
        ...prevState.transferResult,
        isPending: false,
        isFulfilled: true,
        isRejected: false,
        status: dataTransfer.status,
        msg: dataTransfer.msg,
        data: dataTransfer.data,
      };
      return {
        ...prevState,
        transferResult,
      };

    case `${ACTION_STRING.transferResult}_${Rejected}`:
      transferResult = {
        ...prevState.transferResult,
        isPending: false,
        isFulfilled: false,
        isRejected: true,
        msg: "",
        status: "",
        data: null,
      };
      return {
        ...prevState,
        transferResult,
      };

    case `${ACTION_STRING.transferReset}`:
      return initialState;

    default:
      return prevState;
  }
};

export default transferReducer;
