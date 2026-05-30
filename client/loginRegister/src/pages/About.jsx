import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import Axios from "axios";

function About() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const today = new Date().toISOString().split('T')[0];
  const submitBooking = (event) => {
    event.preventDefault();

    // Gửi dữ liệu đặt lịch xuống Backend (Đã sửa tên biến cho khớp với Backend)
    Axios.post("http://localhost:4446/appointments", {
      name: name,
      email: email,
      service: service,
      date: date,   // <-- Đã sửa ở đây
      time: time,   // <-- Đã sửa ở đây
      notes: notes
    }).then(() => {
      alert("Appointment booked successfully! We will see you soon.");
      // Xóa trắng form sau khi đặt thành công
      setName(""); setEmail(""); setService(""); 
      setDate(""); setTime(""); setNotes("");
    }).catch((error) => {
      console.error("Error creating appointment:", error);
      alert("Booking failed. Please try again.");
    });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center py-5"
      style={{
        minHeight: "90vh",
        background: "linear-gradient(135deg, #0f3d2e, #145c43)",
      }}
    >
      <Container className="d-flex justify-content-center">
        <Card 
          className="shadow-lg p-4 rounded w-100" 
          style={{ 
            maxWidth: "600px", 
            borderTop: "6px solid #ff9800",
            border: "none"
          }}
        >
          <Card.Body>
            <h2 className="text-center mb-4" style={{ color: "#0f3d2e", fontWeight: "bold" }}>
              Book an Appointment
            </h2>
            
            <Form onSubmit={submitBooking}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#0f3d2e", fontWeight: "600" }}>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#0f3d2e", fontWeight: "600" }}>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#0f3d2e", fontWeight: "600" }}>Select Service</Form.Label>
                <Form.Select 
                  value={service} 
                  onChange={(e) => setService(e.target.value)} 
                  required
                >
                  <option value="">-- Choose a service --</option>
                  <option value="Dental Checkup">Dental Checkup</option>
                  <option value="Teeth Cleaning">Teeth Cleaning</option>
                  <option value="Tooth Treatment">Tooth Treatment</option>
                  <option value="Whitening">Teeth Whitening</option>
                </Form.Select>
              </Form.Group>

              <div className="d-flex gap-3 mb-3">
                <Form.Group className="w-50">
                  <Form.Label style={{ color: "#0f3d2e", fontWeight: "600" }}>Date</Form.Label>
                  <Form.Control
                    min={today}
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="w-50">
                  <Form.Label style={{ color: "#0f3d2e", fontWeight: "600" }}>Time</Form.Label>
                  <Form.Select 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                    required
                  >
                    <option value="">-- Time --</option>
                    <option value="09:00:00">09:00 AM</option>
                    <option value="10:00:00">10:00 AM</option>
                    <option value="11:00:00">11:00 AM</option>
                    <option value="13:00:00">01:00 PM</option>
                    <option value="14:00:00">02:00 PM</option>
                    <option value="15:00:00">03:00 PM</option>
                    <option value="16:00:00">04:00 PM</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <Form.Group className="mb-4">
                <Form.Label style={{ color: "#0f3d2e", fontWeight: "600" }}>Additional Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Any specific symptoms or requests?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-100 border-0 py-2"
                style={{
                  backgroundColor: "#ff9800",
                  color: "#0f3d2e",
                  fontWeight: "700",
                  fontSize: "1.1rem"
                }}
              >
                Confirm Booking
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default About; 