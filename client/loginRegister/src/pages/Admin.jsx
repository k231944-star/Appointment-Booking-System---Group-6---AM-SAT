import React, { useEffect, useState } from "react";
import Axios from "axios";
import Navbars from "../components/Navbar";

export const Admin = () => {
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const response = await Axios.get("http://localhost:4446/admin/bookings");
      setBookings(response.data);
    } catch (error) {
      alert("Only admin can access this page");
    }
  };

  const cancelBooking = async (id) => {
    try {
      await Axios.put(`http://localhost:4446/admin/bookings/cancel/${id}`);
      alert("Booking cancelled");
      getBookings();
    } catch (error) {
      alert("Failed to cancel booking");
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <>
      <Navbars />

      <div className="container mt-5">
        <div className="card shadow p-4">
          <h2 className="text-center mb-4" style={{ color: "#0f7a3b" }}>
            Admin Dashboard
          </h2>

          <div className="alert alert-success text-center">
            Total Bookings: <strong>{bookings.length}</strong>
          </div>

          <table className="table table-bordered table-hover text-center">
            <thead style={{ backgroundColor: "#ff9800", color: "#0f3d2e" }}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Notes</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.name}</td>
                    <td>{booking.email}</td>
                    <td>{booking.service}</td>
                    <td>{booking.appointment_date?.slice(0, 10)}</td>
                    <td>{booking.appointment_time}</td>
                    <td>{booking.notes}</td>
                    <td>{booking.status}</td>
                    <td>
                      {booking.status === "Booked" ? (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => cancelBooking(booking.id)}
                        >
                          Cancel
                        </button>
                      ) : (
                        <span className="text-muted">Cancelled</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No bookings found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Admin;