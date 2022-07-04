import { ACTION_STRING } from "./actionsString";
import { login } from "../../modules/api/auth";

export const loginAction = (body) => {
  return {
    type: ACTION_STRING.authLogin,
    payload: login(body),
  };
};

export const logoutAction = (userData) => {
  return {
    type: ACTION_STRING.authLogout,
    payload: { userData },
  };
};
