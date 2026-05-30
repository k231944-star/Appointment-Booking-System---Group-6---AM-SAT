import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink, useNavigate } from "react-router-dom"; 
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navbars() {
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");

    navigate("/login");
    window.location.reload();
  };

  return (
    <Navbar
      expand="lg"
      className="shadow"
      style={{ backgroundColor: "#0f7a3b" }}
    >
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="fw-bold"
          style={{ color: "#ff9800" }}
        >
          AppointSync
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            {isAuthenticated ? (
              <>
                <span
                  className="me-3 fw-bold"
                  style={{ color: "#ff9800" }}
                >
                  Hi, {userName}
                </span>

                <Nav.Link as={NavLink} to="/" style={navLinkStyle}>
                  Home
                </Nav.Link>

                <Nav.Link as={NavLink} to="/booking" style={navLinkStyle}>
                  Booking
                </Nav.Link>

                <Nav.Link as={Link} to="/my-bookings" className="text-white fw-bold mx-2">
                  My Bookings
                </Nav.Link>

                <Nav.Link as={NavLink} to="/profile" style={navLinkStyle}>
                  My Profile
                </Nav.Link>

                {role === "admin" && (
                  <Nav.Link
                    as={NavLink}
                    to="/admin"
                    style={adminButtonStyle}
                  >
                    Admin Dashboard
                  </Nav.Link>
                )}

                <Nav.Link onClick={handleLogout} style={navLinkStyle}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" style={navLinkStyle}>
                  Login
                </Nav.Link>

                <Nav.Link as={NavLink} to="/register" style={navLinkStyle}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const navLinkStyle = {
  color: "#fff",
  fontWeight: "500",
  marginLeft: "12px",
};

const adminButtonStyle = {
  backgroundColor: "#ff9800",
  color: "#0f3d2e",
  fontWeight: "700",
  marginLeft: "12px",
  borderRadius: "6px",
  padding: "8px 14px",
  textDecoration: "none",
};

export default Navbars;