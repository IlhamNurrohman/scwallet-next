import { transfer } from "../../modules/api/transfer";
import { ACTION_STRING } from "./actionsString";

export const inputTransferData = (data) => {
  return {
    type: ACTION_STRING.transferData,
    payload: { data },
  };
};

export const transferAction = (token, body) => {
  return {
    type: ACTION_STRING.transferResult,
    payload: transfer(token, body),
  };
};

export const resetTransferAction = () => {
  return {
    type: ACTION_STRING.transferReset,
    // payload: transfer(token, body),
  };
};
