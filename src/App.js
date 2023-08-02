import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import AddEditBook from "./view/books/addEdit/AddEditBook";
import ErrorPage from "./view/error";
import Home from "./view/home";
import LoginPage from "./view/login";
import SignUpPage from "./view/signup";
import NavBarComponent from "./view/navbar/NavBarComponent";

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const ProtectedRoute = ({ ChildComponent }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace={true} />;
    }

    return <ChildComponent />;
  };

  return (
    <>
      {isLoggedIn && <NavBarComponent />}
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
          <Route path="add" element={<AddEditBook />} exact={true} />
          <Route path="edit/:bookId" element={<AddEditBook />} exact={true} />
        </Routes>
      </div>
    </>
  );
};

export default App;
