let initialState = {
  loading: true,
  user: {},
  error: "",
  isAuth: false,
};

export const loginReduser = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        loading: true,
      };
    case "LOGIN":
      return {
        loading: false,
        user: action.payload,
        isAuth: true,
      };
    case "LOGIN_FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        loading: false,
        error: "",
      };
    case "LOGOUT_USER":
      return {
        loading: false,
        error: "",
        user: {},
        isAuth: false,
      };

    default:
      return state;
  }
};
