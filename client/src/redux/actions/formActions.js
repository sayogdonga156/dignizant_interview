import { axiosClient } from "../../components/axios/axiosClient";

export const addForm = (formdata) => {
  // console.log(data, "data");
  return async (dispatch) => {
    try {
      const data = await axiosClient.post(`/create/form`, {
        title: formdata[0].title,
        formUid: formdata[0].id,
        questions: formdata[0].questions,
      });
      // console.log(data.data.form);
      dispatch({ type: "ADD_FORMS", payload: data.data.data });
      // return data.data;
    } catch (error) {
      console.log(error);
      // dispatch({ type: "LOGIN_FAILED", payload: error.response.data.message });
    }
  };
};

export const getForm = () => {
  // console.log(data, "data");
  return async (dispatch) => {
    try {
      const data = await axiosClient.get(`/forms`);
      // console.log(data.data.forms);
      dispatch({ type: "GET_FORMS", payload: data.data.forms });
      // return data.data;
    } catch (error) {
      console.log(error);
      // dispatch({ type: "LOGIN_FAILED", payload: error.response.data.message });
    }
  };
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
