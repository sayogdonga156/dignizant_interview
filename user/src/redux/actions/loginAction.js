import { axiosClient } from "../../components/axios/axiosClient";

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOGIN_REQUEST" });
      // console.log(email, password);
      const data = await axiosClient.post(`/login`, {
        email: email,
        password: password,
      });
      console.log(data, "data");
      dispatch({ type: "LOGIN", payload: data.data.data });
      return data.data;
    } catch (error) {
        console.log(error)
      dispatch({ type: "LOGIN_FAILED", payload: error.response.data.message });
    }
  };
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
