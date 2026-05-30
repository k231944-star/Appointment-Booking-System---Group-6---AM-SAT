import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Pages.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbars from "../components/Navbar";

function Login() { // <-- ĐÃ SỬA THÀNH CHỮ L IN HOA
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSummit = (event) => {
    axios.defaults.withCredentials = true;
    event.preventDefault();
    
    Axios.post("http://localhost:4446/login/", {
      Email: email,
      Password: password,
    }).then((res) => {
      if (res.data.errors) {
        console.log("error");
      } else if (res.data.Login) {
        // Lưu toàn bộ thông tin đăng nhập vào trình duyệt
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("userName", res.data.name);
        localStorage.setItem("email", email); // <-- Dòng quan trọng để trang My Bookings chạy được!

        if (res.data.role === "admin") {
          navigate("/");
        } else {
          navigate("/");
        }
      } else {
        // Thông báo rõ ràng hơn nếu tài khoản không tồn tại
        alert("Login failed! No record found. Please register an account first."); 
      }
    }).catch((err) => {
        console.error("Server connection error:", err);
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
          className="login-form shadow-lg p-4 rounded"
          style={{
            width: "100%",
            maxWidth: "420px",
            backgroundColor: "#ffffff",
            borderTop: "6px solid #ff9800",
          }}
          onSubmit={handleSummit}
        >
          <h2 className="text-center mb-4" style={{ color: "#0f3d2e" }}>
            Login
          </h2>

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
            Don't have an account?{" "}
            <a
              href="/register"
              style={{
                color: "#ff9800",
                fontWeight: "700",
                textDecoration: "none",
              }}
            >
              Register Here!!
            </a>
          </p>
        </Form>
      </div>
    </>
  );
}

export default Login; 