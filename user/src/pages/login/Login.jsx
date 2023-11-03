import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loginUser } from "../../redux/actions/loginAction";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

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
  const { error, isAuth, user } = useSelector((state) => state.User);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuth) {
      localStorage.setItem("userId", user?._id);
      localStorage.setItem("token", user?.token);
      navigate("/home");
    }
    // eslint-disable-next-line
  }, [dispatch, error, isAuth]);

  const id = localStorage.getItem("userId");
  return (
    <>
      {id ||isAuth ? (
        <></>
      ) : (
        <Formik
          validationSchema={schema}
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            dispatch(loginUser(values.email, values.password));
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
              className="bg-slate-200 flex justify-center items-center w-full h-screen"
            >
              <div className="rounded-lg w-[500px]">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4 h-[86px]">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Email
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      autoComplete="off"
                      placeholder="Please enter your Email"
                    />
                    <p className="text-xs text-[red] mt-1">
                      {errors.email && touched.email && errors.email}
                    </p>
                  </div>
                  <div className="mb-6 h-[86px]">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      autoComplete="off"
                      placeholder="Please enter your password"
                    />
                    <p className="text-xs text-[red] mt-1">
                      {errors.password && touched.password && errors.password}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Sign In
                    </button>
                    <p className="inline-block align-baseline font-bold text-sm text-gray-700">
                      Don’t have an account ?{" "}
                      <Link
                        className="text-blue-500 hover:text-blue-800"
                        to="/signup"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                  &copy;2023 All rights reserved.
                </p>
              </div>
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
          )}
        </Formik>
       )}
    </>
  );
};

export default Login;
