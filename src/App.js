import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { Nav, NavItem, Navbar, NavbarBrand } from "reactstrap";
import "./App.css";
import { handleUserLogout } from "./redux/action/auth";
import { showConfirmation } from "./utils";

import ErrorPage from "./view/error";
import Home from "./view/home";
import LoginPage from "./view/login";
import SignUpPage from "./view/signup";

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  // const navigate = useNavigate();

  const logoutHandler = useCallback(async () => {
    return showConfirmation({ text: "you want to logout?" }).then(async (e) => {
      if (e.isConfirmed) {
        try {
          await handleUserLogout();
        } catch (e) {}
      }
    });
  }, [handleUserLogout]);

  const ProtectedRoute = ({ ChildComponent }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace={true} />;
    }

    return <ChildComponent />;
  };

  return (
    <>
      {isLoggedIn && (
        <Navbar color="light" className="mb-3">
          <NavbarBrand>
            Harsh Patel CRUD Project
            <br />
            <Nav className="d-flex flex-row gap-3 me-auto" navbar>
              <NavItem
                tag={Link}
                className="text-reset text-light-emphasis text-decoration-none"
                to="/"
              >
                Home
              </NavItem>
            </Nav>
          </NavbarBrand>

          <Nav
            className="ml-auto d-flex flex-row align-items-center gap-5"
            navbar
          >
            <NavItem onClick={logoutHandler} className="cursor-pointer">
              Logout
            </NavItem>
          </Nav>
        </Navbar>
      )}
      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={<ProtectedRoute ChildComponent={Home} />}
          />
          <Route
            path="*"
            element={<ProtectedRoute ChildComponent={ErrorPage} />}
          />
          <Route path="login" element={<LoginPage />} exact={true} />
          <Route path="signup" element={<SignUpPage />} exact={true} />
        </Routes>
      </div>
    </>
  );
};

export default App;
