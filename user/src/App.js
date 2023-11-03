import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./pages/Navbar/Navbar";
import Home from "./pages/home/Home";
import AboutUs from "./pages/aboutUs/AboutUs";
import { useSelector } from "react-redux";
import PageNotFound from "./pages/PageNotFound";
import Form from "./pages/form/Form";
import UserForm from "./pages/form/UserForm";

function App() {
  const { pathname } = useLocation();
  const { isAuth } = useSelector((state) => state.User);
  const isKnownPath = ["/", "/signup", "/home","/form", "/about-us"].includes(pathname);
  return (
    <>
      {isKnownPath && isAuth && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route
          exact
          path="/home"
          element={isAuth ? <Home /> : <PageNotFound />}
        />

        <Route
          exact
          path="/about-us"
          element={isAuth ? <AboutUs /> : <PageNotFound />}
        />
        <Route
          exact
          path="/form"
          element={isAuth ? <Form /> : <PageNotFound />}
        />
        <Route
          exact
          path="/form/:id"
          element={isAuth ? <UserForm /> : <PageNotFound />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
