import { ACTION_STRING } from "../actions/actionsString";

const initialState = {
  userData: {
    firstName: "",
    lastName: "",
    email: "",
    image: null,
    noTelp: "",
    balance: "",
  },
};

const userReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case ACTION_STRING.userData:
      const data = action.payload;
      const userData = {
        ...prevState.userData,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        email: data.data.email,
        image: data.data.image,
        noTelp: data.data.noTelp,
        balance: data.data.balance,
      };
      return {
        ...prevState,
        userData,
      };

    default:
      return prevState;
  }
};

export default userReducer;
