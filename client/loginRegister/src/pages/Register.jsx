import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Pages.css";
import Axios from "axios";
import Navbars from "../components/Navbar";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");

  const createUser = (event) => {
    event.preventDefault();

    Axios.post("http://localhost:4446/register/", {
      Name: name,
      Email: email,
      Password: password,
      Role: role,
    }).then(() => {
      console.log("user is created");
      alert("User registered successfully");
    });
  };

  return (
    <>
      <Navbars />

      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "90vh",
          background: "linear-gradient(135deg, #0f3d2e, #145c43)",
        }}
      >
        <Form
          className="register-form shadow-lg p-4 rounded"
          style={{
            width: "100%",
            maxWidth: "450px",
            backgroundColor: "#ffffff",
            borderTop: "6px solid #ff9800",
          }}
          onSubmit={createUser}
        >
          <h2 className="text-center mb-4" style={{ color: "#0f3d2e" }}>
            Register
          </h2>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label style={{ color: "#0f3d2e", fontWeight: "600" }}>
              Full Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ color: "#0f3d2e", fontWeight: "600" }}>
              Email address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ color: "#0f3d2e", fontWeight: "600" }}>
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicRole">
            <Form.Label style={{ color: "#0f3d2e", fontWeight: "600" }}>
              Role
            </Form.Label>
            <Form.Select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>

          <Button
            type="submit"
            className="w-100 border-0"
            style={{
              backgroundColor: "#ff9800",
              color: "#0f3d2e",
              fontWeight: "700",
            }}
          >
            Submit
          </Button>

          <p className="text-center mt-3 mb-0">
            Have an account?{" "}
            <a
              href="/login"
              style={{
                color: "#ff9800",
                fontWeight: "700",
                textDecoration: "none",
              }}
            >
              Login Here!!
            </a>
          </p>
        </Form>
      </div>
    </>
  );
}

export default Register;
