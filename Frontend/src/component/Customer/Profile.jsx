import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { CDBDataTable } from "cdbreact";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Login from "../Auth/Login";

const ProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState("./static/imageUser/");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false); // Modal for appointments
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // For storing selected appointment
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwt_decode(token);
      setName(decodedToken.name);
      setEmail(decodedToken.email);
      const userId = decodedToken.id;
      axios
        .get(`http://localhost:5000/profile-image/${userId}`)
        .then((response) => {
          if (response.data.url) {
            setProfilePicture(response.data.url);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch profile image:", error);
        });
    } else {
      setShowLoginModal(true);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handlePictureUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const userId = jwt_decode(localStorage.getItem("accessToken")).id;
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", userId);

    axios
      .post(`http://localhost:5000/upload-profile-image`, formData)
      .then((response) => {
        setProfilePicture(response.data.url);
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const handlePaymentClick = (order) => {
    setSelectedOrder(order);
    setShowPaymentModal(true);
  };

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  const handleViewAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentModal(true);
  };

  const orderColumns = [
    {
      label: "Nama Produk",
      field: "product",
      width: 150,
    },
    {
      label: "Qty",
      field: "quantity",
      width: 100,
    },
    {
      label: "Total Harga",
      field: "totalPrice",
      width: 150,
    },
    {
      label: "Status",
      field: "status",
      width: 100,
    },
    {
      label: "Aksi",
      field: "actions",
      width: 200,
    },
  ];

  const orderRows = [
    {
      product: "Dog Food",
      quantity: 2,
      totalPrice: "Rp 100,000",
      status: "Pending",
      actions: (
        <>
          <Button
            variant="success"
            onClick={() =>
              handlePaymentClick({ product: "Dog Food", quantity: 2 })
            }
          >
            Payment
          </Button>
          <Button
            variant="info"
            onClick={() =>
              handleViewClick({ product: "Dog Food", status: "Pending" })
            }
            className="ml-2"
          >
            View
          </Button>
        </>
      ),
    },
    {
      product: "Cat Toy",
      quantity: 1,
      totalPrice: "Rp 50,000",
      status: "Delivered",
      actions: (
        <>
          <Button
            variant="success"
            onClick={() =>
              handlePaymentClick({ product: "Cat Toy", quantity: 1 })
            }
          >
            Payment
          </Button>
          <Button
            variant="info"
            onClick={() =>
              handleViewClick({ product: "Cat Toy", status: "Delivered" })
            }
            className="ml-2"
          >
            View
          </Button>
        </>
      ),
    },
  ];

  const appointmentColumns = [
    {
      label: "Jasa",
      field: "service",
      width: 150,
    },
    {
      label: "Status",
      field: "status",
      width: 100,
    },
    {
      label: "Aksi",
      field: "actions",
      width: 200,
    },
  ];

  const appointmentRows = [
    {
      service: "Vet Appointment",
      status: "Menunggu Konfirmasi",
      actions: (
        <>
          <Button
            variant="info"
            onClick={() =>
              handleViewAppointmentClick({
                service: "Vet Appointment",
                status: "Menunggu Konfirmasi",
              })
            }
          >
            View
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Login
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={profilePicture} />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>{email}</Card.Text>
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Ubah Foto Profil
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>Daftar Pesanan</Card.Header>
            <Card.Body>
              <CDBDataTable
                striped
                bordered
                hover
                data={{ columns: orderColumns, rows: orderRows }}
              />
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>Daftar Janji Temu</Card.Header>
            <Card.Body>
              <CDBDataTable
                striped
                bordered
                hover
                data={{ columns: appointmentColumns, rows: appointmentRows }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for changing profile picture */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ubah Foto Profil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFile">
              <Form.Label>Pilih Foto Baru</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handlePictureUpload}>
            Simpan Gambar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Payment Modal */}
      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Pembayaran untuk {selectedOrder?.product}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAccount">
              <Form.Label>Rekening Pembayaran</Form.Label>
              <Form.Control type="text" placeholder="1234-5678-9012" readOnly />
            </Form.Group>
            <Form.Group controlId="formFile">
              <Form.Label>Unggah Bukti Pembayaran</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPaymentModal(false)}
          >
            Tutup
          </Button>
          <Button variant="primary">Unggah Bukti</Button>
        </Modal.Footer>
      </Modal>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Pesanan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Produk: {selectedOrder?.product}</p>
          <p>Status Pembayaran: {selectedOrder?.status}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
