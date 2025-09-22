import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCurrentUser, logout } from "../libs";

const NavBar = () => {
  const user = getCurrentUser();
  return (
    <Navbar bg="dark" variant="dark" expand="sm" className="mb-3 rounded">
      <Navbar.Brand as={Link} to="/">Notefy</Navbar.Brand>
      <Navbar.Toggle aria-controls="nav" />
      <Navbar.Collapse id="nav" className="justify-content-between">
        <Nav>
          <Nav.Link as={Link} to="/">Notes</Nav.Link>
          <Nav.Link as={Link} to="/note/new">New</Nav.Link>
          <Nav.Link as={Link} to="/tasks">Tasks</Nav.Link>
        </Nav>
        <div className="ml-3">
          {user ? (
            <Button size="sm" variant="outline-light" onClick={() => { logout(); window.location.href = "/login"; }}>Logout {user.username}</Button>
          ) : (
            <Button as={Link as any} to="/login" size="sm" variant="outline-light">Login</Button>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export { NavBar };


