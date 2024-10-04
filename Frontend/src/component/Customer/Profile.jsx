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

  const handlePaymentClick = (orders) => {
    setSelectedOrder(orders);
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

  // Contoh pesanan
  const orderRows = [
    {
      product: "Dog Food",
      quantity: 2,
      totalPrice: "Rp 100,000",
      status: "Menunggu Pembayaran",
    },
    {
      product: "Cat Toy",
      quantity: 1,
      totalPrice: "Rp 50,000",
      status: "Menunggu Pembayaran",
    },
    {
      product: "Bird Cage",
      quantity: 1,
      totalPrice: "Rp 150,000",
      status: "Sudah Dibayar",
    },
  ];

  // Filter pesanan yang menunggu pembayaran
  const pendingOrders = orderRows.filter(
    (order) => order.status === "Menunggu Pembayaran"
  );

  // Gabungkan pesanan menunggu pembayaran ke dalam satu baris
  const consolidatedOrderRow = {
    product: pendingOrders.map((order) => order.product).join(", "),
    quantity: pendingOrders.reduce((acc, order) => acc + order.quantity, 0),
    totalPrice: `Rp ${pendingOrders
      .reduce(
        (acc, order) =>
          acc + parseInt(order.totalPrice.replace("Rp ", "").replace(",", "")),
        0
      )
      .toLocaleString()}`,
    status: "Menunggu Pembayaran",
    actions: (
      <Button
        variant="success"
        onClick={() => handlePaymentClick(pendingOrders)}
      >
        Payment
      </Button>
    ),
  };

  // Pesanan yang akan ditampilkan dalam tabel
  const updatedOrderRows = [
    consolidatedOrderRow,
    ...orderRows.filter((order) => order.status !== "Menunggu Pembayaran"),
  ];

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
      ),
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Hapus token dari localStorage
    navigate("/"); // Redirect ke halaman login setelah logout
    navigate(0);
  };

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
              <div>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Ubah Foto Profil
                </Button>
              </div>
              <div className="mt-3">
                <Button variant="primary" size="sm" onClick={handleLogout}>
                  <img
                    src="./Picture/import.gif"
                    className="avatar img-fluid rounded me-2 p-2"
                    alt=""
                  />
                  Logout
                </Button>
              </div>
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
                data={{ columns: orderColumns, rows: updatedOrderRows }}
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
          <Modal.Title>Pembayaran untuk Pesanan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAccount">
              <Form.Label>Rekening Pembayaran</Form.Label>
              <Form.Control type="text" placeholder="1234-567" />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Alamat Pengiriman</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan alamat pengiriman"
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>No Handphone</Form.Label>
              <Form.Control type="number" placeholder="Masukkan no hanphone" />
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
