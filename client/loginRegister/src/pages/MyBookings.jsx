import React, { useState, useEffect } from "react";
import { Container, Table, Card, Badge } from "react-bootstrap";
import Axios from "axios";
import Navbars from "../components/Navbar";

function MyBookings() {
  const [appointments, setAppointments] = useState([]);
  
  // Lấy email người dùng đang đăng nhập từ localStorage
  // (Lưu ý: Bạn hãy đảm bảo lúc làm trang Login, bạn có lưu email vào localStorage với tên 'email' nhé)
  const userEmail = localStorage.getItem("email"); 

  useEffect(() => {
    if (userEmail) {
      Axios.get(`http://localhost:4446/my-appointments?email=${userEmail}`)
        .then((response) => {
          setAppointments(response.data);
        })
        .catch((error) => console.error("Error fetching appointments:", error));
    }
  }, [userEmail]);

  // Format ngày cho đẹp (YYYY-MM-DD)
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div
        className="py-5"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f4f7f6, #e0e8e5)",
        }}
      >
        <Container>
          <Card className="shadow-sm border-0" style={{ borderTop: "5px solid #0f3d2e" }}>
            <Card.Body className="p-4">
              <h2 className="mb-4" style={{ color: "#0f3d2e", fontWeight: "bold" }}>
                My Appointments
              </h2>
              
              {appointments.length === 0 ? (
                <div className="text-center py-5">
                  <h5 className="text-muted">You have no appointments booked yet.</h5>
                </div>
              ) : (
                <Table responsive hover className="align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Service</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Notes</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appt, index) => (
                      <tr key={appt.id}>
                        <td>{index + 1}</td>
                        <td className="fw-bold">{appt.service}</td>
                        <td>{formatDate(appt.appointment_date)}</td>
                        <td>{appt.appointment_time}</td>
                        <td>{appt.notes || "-"}</td>
                        <td>
                          <Badge bg={appt.status === "Booked" ? "success" : "secondary"}>
                            {appt.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
}

export default MyBookings;