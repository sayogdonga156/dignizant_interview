import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleLogOut = () => {
    dispatch({ type: "LOGOUT_USER" });
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className=" border-gray-200 bg-gray-800 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
        <div className=" w-full  md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0  bg-gray-900 border-gray-700">
            <li>
              <Link
                to="/home"
                className={`block py-2 pl-3 pr-4 ${
                  pathname === "/home" ? "text-blue-300" : "text-white"
                } `}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className={`block py-2 pl-3 pr-4 ${
                  pathname === "/about-us" ? "text-blue-300" : "text-white"
                } `}
              >
                About
              </Link>
            </li>
            
            <li>
              <Link
                to="/form"
                className={`block py-2 pl-3 pr-4 ${
                  pathname === "/form" ? "text-blue-300" : "text-white"
                } `}
              >
                Forms
              </Link>
            </li>
            <li
              onClick={() => handleLogOut()}
              className="block py-2 pl-3 pr-4 text-white cursor-pointer"
            >
              Log-out
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
