import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  ListGroup,
  Table,
  Modal,
} from "react-bootstrap";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [appointments, setAppointments] = useState([]); // State for appointments
  const [transactions, setTransactions] = useState([]); // State for transactions
  const [selectedTransaction, setSelectedTransaction] = useState(null); // State for transaction details
  const [showModal, setShowModal] = useState(false); // Modal for viewing transaction details
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwt_decode(token);
      setName(decodedToken.name);
      setEmail(decodedToken.email);
      const userRole = decodedToken.userRole;
      if (userRole === "admin")
        Swal.fire({
          icon: "warning",
          title: "Access denied",
          text: "your account is admin you cannot use profile Page ",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      else {
        // appointments, and transactions
        fetchUserAppointments(decodedToken.userId);
        fetchUserTransactions(decodedToken.userId);
      } // Fetch transactions based on userId
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

  const fetchUserAppointments = async (userId) => {
    try {
      const response = await axios.get(`/api/appointments/${userId}`);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchUserTransactions = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/transaksi/User`, {
        params: { userId },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleShowDetails = async (transactionId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/transaksi-detail/${transactionId}`
      );
      setSelectedTransaction(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching transaction details", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
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

          {/* Transaksi Table */}
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Orders</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Subtotal</th>
                    <th>Paid</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length > 0 ? (
                    transactions.map((transaction, index) => (
                      <tr key={transaction.transaction_id}>
                        <td>{index + 1}</td>
                        <td>{transaction.name}</td>
                        <td>
                          {new Date(
                            transaction.transaction_date
                          ).toLocaleDateString("en-US")}
                        </td>
                        <td>{transaction.status}</td>
                        <td>Rp.{Number(transaction.subtotal).toFixed(0)}</td>

                        <td>{transaction.paid ? "Yes" : "No"}</td>
                        <td>
                          <Button
                            className="btn btn-primary btn-sm text-capitalize"
                            variant="primary"
                            onClick={() =>
                              handleShowDetails(transaction.transaction_id)
                            }
                          >
                            View Details
                          </Button>
                          <Button
                            className="btn btn-primary btn-sm text-capitalize mx-3"
                            variant="primary"
                            onClick={() =>
                              handleShowDetails(transaction.transaction_id)
                            }
                          >
                            Payment
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No transactions found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {/* Modal for Transaction Details */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>List Shopping</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedTransaction ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th>Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTransaction.map((detail) => (
                      <tr key={detail.transaction_detail_id}>
                        <td>{detail.namaProduct}</td>
                        <td>Rp.{Number(detail.hargaProduct).toFixed(0)}</td>
                        <td>{detail.qty}</td>
                        <td>Rp.{Number(detail.totalHarga).toFixed(0)}</td>
                        <td>
                          <img
                            src={detail.url}
                            alt={detail.namaProduct}
                            width="50"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No details available</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
