import { ACTION_STRING } from "./actionsString";

export const updateUserData = (data) => {
  return {
    type: ACTION_STRING.userData,
    payload: { data },
  };
};
