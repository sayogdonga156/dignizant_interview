import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { getNames } from "country-list";
import { ToastContainer, toast } from "react-toastify";
import { axiosClient } from "../../components/axios/axiosClient";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter email address")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Please enter password")
    .min(8, "Password must be at least 8 characters"),
  country: Yup.string().required("Please enter country name"),
  gender: Yup.string().required("Please enter gender"),
  name: Yup.string().required("Please enter name"),
  mobile: Yup.string()
    .required("Please enter mobile number")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const countries = getNames();
  return (
    <>
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
      <Formik
        validationSchema={schema}
        initialValues={{
          email: "",
          password: "",
          country: "",
          gender: "",
          name: "",
          mobile: "",
        }}
        onSubmit={async (values) => {
          try {
            const user = await axiosClient.post("/signup", values);
            // console.log(user, "user");
            if (user.data.success) {
              navigate("/");
            }
          } catch (error) {
            toast.error(error.response.data.message);
            // console.log(error.response.data.message);
          }
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
            <div className="rounded-lg w-[600px]">
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4 h-[86px]">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    autoComplete="off"
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder="Please enter your Name"
                  />
                  <p className="text-xs text-[red] mt-1">
                    {errors.name && touched.name && errors.name}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-0 md:gap-3 md:grid-cols-2">
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
                      autoComplete="off"
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Please enter your Email"
                    />
                    <p className="text-xs text-[red] mt-1">
                      {errors.email && touched.email && errors.email}
                    </p>
                  </div>
                  <div className="mb-4 h-[86px]">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Phone No.
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
                      type="number"
                      name="mobile"
                      onChange={handleChange}
                      autoComplete="off"
                      onBlur={handleBlur}
                      value={values.mobile}
                      placeholder="Please enter your Phone no."
                    />
                    <p className="text-xs text-[red] mt-1">
                      {errors.mobile && touched.mobile && errors.mobile}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-0 md:gap-3 md:grid-cols-2">
                  <div className="mb-4 h-[86px]">
                    <label
                      htmlFor="countries"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Country
                    </label>
                    <select
                      name="country"
                      value={values.country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
                    >
                      <option>Choose a country</option>
                      {countries.map((country, i) => (
                        <option key={i} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-[red] mt-1">
                      {errors.country && touched.country && errors.country}
                    </p>
                  </div>
                  <div className="mb-4 h-[86px]">
                    <label
                      htmlFor="countries"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={values.gender}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
                    >
                      <option>Choose a gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <p className="text-xs text-[red] mt-1">
                      {errors.gender && touched.gender && errors.gender}
                    </p>
                  </div>
                </div>
                <div className="mb-4 h-[86px]">
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
                    Sign Up
                  </button>
                  <p className="inline-block align-baseline font-bold text-sm text-gray-700">
                    Already have an account ?{" "}
                    <Link className="text-blue-500 hover:text-blue-800" to="/">
                      Log in
                    </Link>
                  </p>
                </div>
              </form>
            
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
