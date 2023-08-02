import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem, Navbar, NavbarBrand } from "reactstrap";

import { showConfirmation } from "../../utils";
import { handleUserLogout } from "../../redux/action/authActions";

const NavBarComponent = () => {
  const logoutHandler = useCallback(async () => {
    return showConfirmation({ text: "You want to logout." }).then(async (e) => {
      if (e.isConfirmed) {
        try {
          await handleUserLogout();
        } catch (e) {}
      }
    });
  }, [handleUserLogout]);

  return (
    <Navbar color="light" className="mb-3">
      <div>
        <NavbarBrand>
          <span className="h3">
            <i className="bi bi-book-half text-primary" /> Harsh Patel CRUD
            Project
          </span>
          <br />
        </NavbarBrand>
        <div className="d-flex flex-row mt-3 mb-2 gap-3 me-auto">
          <Link
            className="text-reset text-light-emphasis text-decoration-none"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-reset text-light-emphasis text-decoration-none"
            to="/add"
          >
            Add Book
          </Link>
        </div>
      </div>
      <Nav className="ml-auto d-flex flex-row align-items-center gap-5" navbar>
        <NavItem
          onClick={logoutHandler}
          className="cursor-pointer border px-2 py-1 rounded border-3 border-primary"
        >
          Logout
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default NavBarComponent;
