import { axiosClient } from "../../components/axios/axiosClient";

export const loginAdmin = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOGIN_REQUEST" });
      const data = await axiosClient.post(`/admin/login`, {
        email: email,
        password: password,
      });
      // console.log(data.data.data);
      dispatch({ type: "LOGIN", payload: data.data.data });
      return data.data;
    } catch (error) {
      // console.log(error);
      dispatch({ type: "LOGIN_FAILED", payload: error.response.data.message });
    }
  };
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
