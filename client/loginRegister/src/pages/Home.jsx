import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleBooking = () => {
    navigate("/booking");
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-light py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-5 fw-bold text-primary">
                Welcome to AppointSync Booking System
              </h1>

              <p className="lead mt-3">
                Book your dental appointment easily and manage your visits with
                our simple online booking system.
              </p>

              <div className="mt-4">
                <Button variant="primary" size="lg" onClick={handleBooking}>
                  Book Appointment
                </Button>

                <Button
                  variant="outline-danger"
                  size="lg"
                  className="ms-3"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </Col>

            <Col md={6} className="text-center mt-4 mt-md-0">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
                alt="Dental Care"
                className="img-fluid"
                style={{ maxHeight: "300px" }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-4">Our Dental Services</h2>

          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <h4>Dental Checkup</h4>
                  <p>
                    Regular dental checkups help keep your teeth and gums
                    healthy.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <h4>Teeth Cleaning</h4>
                  <p>
                    Professional teeth cleaning removes plaque and improves oral
                    hygiene.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <h4>Tooth Treatment</h4>
                  <p>
                    Get proper treatment for tooth pain, cavities, and other
                    dental issues.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Information Section */}
      <section className="bg-primary text-white py-5">
        <Container className="text-center">
          <h2>Easy Dental Appointment Booking</h2>
          <p className="mt-3">
            Choose your service, select your time, and confirm your appointment
            online.
          </p>

          <Button variant="light" size="lg" onClick={handleBooking}>
            Make a Booking
          </Button>
        </Container>
      </section>
    </>
  );
}

export default Home;