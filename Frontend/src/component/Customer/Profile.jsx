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
  Form,
} from "react-bootstrap";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [services, setServices] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSchedules, setShowSchedules] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [alamat, setAlamat] = useState("");
  const [noHp, setNoHp] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [noRekening] = useState("1119923041 - BCA"); // No rekening statis
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
          text: "Your account is admin. You cannot use this profile page.",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      else {
        fetchUserServices(decodedToken.userId);
        fetchUserTransactions(decodedToken.userId);
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Cannot Access",
        text: "Please log in to your account first!",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
      });
    }
  }, [navigate]);

  const fetchUserServices = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/getservice/${userId}`
      );
      setServices(response.data.services); // Simpan data services ke state
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleViewSchedule = async (ServiceId) => {
    try {
      const serviceSchedules = await axios.get(
        `http://localhost:5000/Schedule/${ServiceId}`
      );
      setSchedules(serviceSchedules.data); // Perbarui status jadwal
      setShowSchedules(true);
    } catch (error) {
      console.error("Error fetching services:", error);
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

  const handlePayment = (transactionId) => {
    setSelectedTransactionId(transactionId);
    setShowPaymentModal(true);
  };

  const loadImage = (e) => {
    const image = e.target.files[0];

    // Validasi tipe file
    if (!image.type.startsWith("image/")) {
      Swal.fire("Error", "Please upload an image file!", "error");
      return;
    }

    setFile(image);
    setPreview(URL.createObjectURL(image)); // Pratinjau gambar
  };

  const handlePaymentSubmit = async () => {
    if (!file || !alamat || !noHp) {
      Swal.fire("Error", "Please fill all fields and upload a file!", "error");
      return;
    }
    const phoneRegex = /^0\d{8,14}$/;
    if (!phoneRegex.test(noHp)) {
      Swal.fire({
        title: "Phone Number tidak Valid",
        text: "Masukan Phone number yang benar.",
        icon: "warning",
      });
      return;
    }

    const formData = new FormData();
    formData.append("transaction_id", selectedTransactionId);
    formData.append("file", file);
    formData.append("alamat", alamat);
    formData.append("no_hp", noHp);
    formData.append("no_rekening", noRekening); // Nomor rekening disertakan dalam form

    try {
      const response = await axios.post(
        "http://localhost:5000/transaksi-payment",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire("Success", "Payment submitted successfully!", "success");
      window.location.reload();
      setShowPaymentModal(false);
    } catch (error) {
      console.error("Error submitting payment", error);
      Swal.fire("Error", "Failed to submit payment.", "error");
    }
  };

  const cancelOrder = async (transaction_id) => {
    Swal.fire({
      title: "Apakah Anda ingin menghapus?",
      text: "Order yang dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Tidak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:5000/transaksi/${transaction_id}`
          );

          if (response.status === 200) {
            Swal.fire("Success", "Order item has been canceled.", "success");

            // Panggil ulang fungsi untuk memperbarui data transaksi setelah penghapusan
            fetchUserTransactions(
              jwt_decode(localStorage.getItem("accessToken")).userId
            );
          } else {
            Swal.fire("Error", "Order item not found.", "error");
          }
        } catch (error) {
          console.error("Error deleting transaction:", error);
          Swal.fire("Error", "Failed to delete order item.", "error");
        }
      }
    });
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
          {/* Section untuk Services */}
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Service List</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name Owner</th>
                    <th>Name Animal</th>
                    <th>Birthday Animal</th>
                    <th>Jenis</th>
                    <th>RAS</th>
                    <th>Quantity</th>
                    <th>Kategori Service</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {services.length > 0 ? (
                    services.map((service, index) => (
                      <tr key={service.ServiceId}>
                        <td>{index + 1}</td>
                        <td>{service.Name_Owner}</td>
                        <td>{service.Name_Animal}</td>

                        <td>
                          {new Date(service.birthday_Animal).toLocaleDateString(
                            "en-US"
                          )}
                        </td>
                        <td>{service.Jenis}</td>
                        <td>{service.RAS}</td>
                        <td>{service.Quantity}</td>
                        <td>{service.kategori_service}</td>
                        <td>{service.status}</td>
                        <td>
                          <Button
                            className="btn btn-primary btn-sm text-capitalize mx-3"
                            variant="primary"
                            onClick={() =>
                              handleViewSchedule(service.ServiceId)
                            }
                            disabled={service.status === "Reject"}
                          >
                            View Schedule
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10">No services found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

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
                              handlePayment(transaction.transaction_id)
                            }
                            disabled={transaction.paid}
                          >
                            Payment
                          </Button>
                          <Button
                            // className="btn btn-primary btn-sm text-capitalize mx-3"
                            // variant="primary"
                            onClick={() =>
                              cancelOrder(transaction.transaction_id)
                            }
                            disabled={transaction.paid}
                          >
                            <i className="fi fi-br-square-x"></i>
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

          <Modal show={showSchedules} onHide={() => setShowSchedules(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Schedule List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {schedules.length > 0 ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Antrian Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedules.map((schedule) => (
                      <tr key={schedule.service_id}>
                        <td>{schedule.date}</td>
                        <td>{schedule.time}</td>
                        <td>{schedule.antrian}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No schedules available for this service.</p>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowSchedules(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>

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
                <p>No details found.</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showPaymentModal}
            onHide={() => setShowPaymentModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Submit Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="alamat">
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your address"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="noHp">
                  <Form.Label>No HP</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    value={noHp}
                    onChange={(e) => {
                      const input = e.target.value;
                      // Menghapus karakter non-digit agar hanya angka yang diizinkan
                      const numericInput = input.replace(/[^0-9]/g, "");
                      setNoHp(numericInput);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="noRekening">
                  <Form.Label>No Rekening</Form.Label>
                  <Form.Control
                    type="text"
                    value={noRekening} // Nomor rekening statis ditampilkan di sini
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="file">
                  <Form.Label>Upload Payment Proof</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={loadImage}
                  />
                  {preview && (
                    <Image src={preview} className="img-thumbnail mt-3" />
                  )}
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowPaymentModal(false)}
              >
                Close
              </Button>
              <Button variant="primary" onClick={handlePaymentSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
