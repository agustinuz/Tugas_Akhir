import React, { useState, useEffect } from "react";
import axios from "axios"; // Uncomment this if not already imported
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  ListGroup,
} from "react-bootstrap";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]); // State for orders
  const [appointments, setAppointments] = useState([]); // State for appointments
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwt_decode(token);
      setName(decodedToken.name);
      setEmail(decodedToken.email);

      // Fetch orders and appointments
      fetchUserOrders(decodedToken.userId); // Pass userId from decoded token
      fetchUserAppointments(decodedToken.userId);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Cannot Access",
        text: "First login to your account!",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
      });
    }
  }, [navigate]);

  const fetchUserOrders = async (userId) => {
    try {
      const response = await axios.get(`/api/orders/${userId}`); // Adjust API endpoint as needed
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchUserAppointments = async (userId) => {
    try {
      const response = await axios.get(`/api/appointments/${userId}`); // Adjust API endpoint as needed
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Hapus token dari localStorage
    navigate("/"); // Redirect ke halaman login setelah logout
    navigate(0);
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Col xs={6} md={4}>
              <Image src="../Picture/profile.jpeg" roundedCircle />
            </Col>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>{email}</Card.Text>
              <Button variant="primary" onClick={handleLogout}>
                Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Order List</Card.Title>
              <ListGroup>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <ListGroup.Item key={order.id}>
                      Order ID: {order.id} - Total: ${order.total} - Status:{" "}
                      {order.status}
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item>No orders found.</ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Appointment List</Card.Title>
              <ListGroup>
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <ListGroup.Item key={appointment.id}>
                      Appointment ID: {appointment.id} - Date:{" "}
                      {appointment.date} - Status: {appointment.status}
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item>No appointments found.</ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
