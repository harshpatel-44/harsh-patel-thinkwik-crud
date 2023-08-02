import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem, Navbar, NavbarBrand } from "reactstrap";
import { handleUserLogout } from "../../redux/action/auth";
import { showConfirmation } from "../../utils";

const NavBarComponent = () => {
  const logoutHandler = useCallback(async () => {
    return showConfirmation({ text: "you want to logout?" }).then(async (e) => {
      if (e.isConfirmed) {
        try {
          await handleUserLogout();
        } catch (e) {}
      }
    });
  }, [handleUserLogout]);

  return (
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
          <NavItem
            tag={Link}
            className="text-reset text-light-emphasis text-decoration-none"
            to="/add"
          >
            Add Book
          </NavItem>
        </Nav>
      </NavbarBrand>

      <Nav className="ml-auto d-flex flex-row align-items-center gap-5" navbar>
        <NavItem onClick={logoutHandler} className="cursor-pointer">
          Logout
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default NavBarComponent;
