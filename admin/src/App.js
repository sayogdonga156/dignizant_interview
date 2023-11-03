import { Route, Routes, useLocation } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import Dashboard from "./pages/dashboard/Dashboard";
import Form from "./pages/form/Form";
import Navbar from "./components/navbar/Navbar";
import AddForm from "./pages/form/AddForm";
import Viewform from "./pages/form/ViewForm";

function App() {
  const { pathname } = useLocation();
  const isKnownPath = ["/dashboard", "/form"].includes(pathname);
  const { isAuth } = useSelector((state) => state.Admin);
  // console.log(isAuth);
  return (
    <>
      {isKnownPath && isAuth && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route
          exact
          path="/dashboard"
          element={isAuth ? <Dashboard /> : <PageNotFound />}
        />
        <Route
          exact
          path="/form"
          element={isAuth ? <Form /> : <PageNotFound />}
        />
        <Route
          exact
          path="/form/:id"
          element={isAuth ? <AddForm /> : <PageNotFound />}
        />
        <Route
          exact
          path="/view/form/:id"
          element={isAuth ? <Viewform /> : <PageNotFound />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
