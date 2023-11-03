import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import { clearErrors, loginAdmin } from "../../redux/actions/loginAction";
import { useDispatch, useSelector } from "react-redux";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter email address")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Please enter password")
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuth, admin } = useSelector((state) => state.Admin);
  console.log(isAuth, "isAuth");
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuth) {
      localStorage.setItem("adminId", admin._id);
      localStorage.setItem("token", admin.token);
      navigate("/dashboard");
    }
    // eslint-disable-next-line
  }, [dispatch, error, isAuth]);
  const id = localStorage.getItem("adminId");
  return (
    <>
      {id || isAuth ? (
        <></>
      ) : (
        <Formik
          validationSchema={schema}
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            dispatch(loginAdmin(values.email, values.password));
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <div
              onSubmit={handleSubmit}
              className="w-screen h-screen bg-slate-900"
            >
              <div className="flex flex-col min-h-full justify-center">
                <div className="mx-auto flex-all-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-24 h-24 stroke-white"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M11.667 6c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 2 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968zm-4 6.5c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 1.975 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968z"></path>
                  </svg>
                </div>
                <h1 className="mb-6 text-2xl font-semibold text-center text-white">
                  Sign in to account
                </h1>
                <form className="flex-col items-center justify-center flex-auto w-full h-full p-12 mx-auto bg-white sm:flex-none sm:rounded-2xl sm:max-w-lg">
                  <div className="pb-4">
                    <div className="h-[92px]">
                      <label className="block font-medium">Email address</label>
                      <div className="mt-1">
                        <input
                        autoComplete="off"
                          name="email"
                          type="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          placeholder=""
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-none outline-none focus:border-primary-500 focus:shadow-lg focus:shadow-primary-100"
                        />
                      </div>
                      <p className="text-xs text-[red] mt-1">
                        {errors.email && touched.email && errors.email}
                      </p>
                    </div>
                    <div className="h-[92px]">
                      <label className="block font-medium mt-2">Password</label>
                      <div className="mt-1">
                        <input
                          name="password"
                          type="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          autoComplete=""
                          placeholder=""
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-none outline-none focus:border-primary-500 focus:shadow-lg focus:shadow-primary-100"
                        />
                      </div>
                      <p className="text-xs text-[red] mt-1">
                        {errors.password && touched.password && errors.password}
                      </p>
                    </div>
                    <button
                      // onClick={handelSubmit}
                      type="submit"
                      className="text-white bg-slate-900 mt-5 flex justify-center w-full px-4 py-2 text-base font-semibold duration-300 border border-transparent rounded-md shadow flex-all-center bg-primary-500 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-100"
                    >
                      <svg
                        className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                        x-show="formloading"
                        style={{ display: "none" }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Submit</span>
                    </button>
                  </div>
                </form>
                <ToastContainer
                  position="top-center"
                  autoClose={700}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </div>
            </div>
          )}
        </Formik>
      )}
    </>
  );
};

export default Login;
