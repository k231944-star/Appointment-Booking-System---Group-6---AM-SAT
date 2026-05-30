import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import Axios from "axios";
import Navbars from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Lấy email gốc lúc user đăng nhập
  const currentEmail = localStorage.getItem("email");

  // Tự động load thông tin khi vừa mở trang
  useEffect(() => {
    if (currentEmail) {
      Axios.get(`http://localhost:4446/user/profile?email=${currentEmail}`)
        .then((response) => {
          setName(response.data.name || "");
          setEmail(response.data.email || "");
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [currentEmail]);

  // Xử lý khi bấm nút "Save Changes"
  const handleUpdate = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:4446/user/profile/update", {
      currentEmail: currentEmail,
      newName: name,
      newEmail: email,
    })
      .then(() => {
        alert("Profile updated successfully!");
        // Nếu user đổi email, bắt họ đăng nhập lại để làm mới token
        if (email !== currentEmail) {
          localStorage.setItem("email", email); // Lưu email mới
          alert("Your email has changed. Please login again for security.");
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Update failed! Email might already exist.");
      });
  };

  return (
    <>
      <Navbars />
      <div
        className="py-5 d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f3d2e, #145c43)",
        }}
      >
        <Container className="d-flex justify-content-center">
          <Card className="shadow-lg p-4 rounded w-100" style={{ maxWidth: "500px", borderTop: "6px solid #ff9800", border: "none" }}>
            <Card.Body>
              <h2 className="text-center mb-4" style={{ color: "#0f3d2e", fontWeight: "bold" }}>
                My Profile
              </h2>
              <Form onSubmit={handleUpdate}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#0f3d2e", fontWeight: "600" }}>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ color: "#0f3d2e", fontWeight: "600" }}>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button 
                  type="submit" 
                  className="w-100 py-2" 
                  style={{ backgroundColor: "#ff9800", color: "#0f3d2e", fontWeight: "bold", border: "none", fontSize: "1.1rem" }}
                >
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
}

export default Profile;