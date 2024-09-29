import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Modal,
  Form,
} from "react-bootstrap";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Login from "../Auth/Login";

const ProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState("./static/imageUser/");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // Untuk menyimpan file yang dipilih
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwt_decode(token);
      setName(decodedToken.name);
      setEmail(decodedToken.email);
      // Ambil gambar berdasarkan userId
      const userId = decodedToken.id;
      axios
        .get(`http://localhost:5000/profile-image/${userId}`)
        .then((response) => {
          if (response.data.url) {
            setProfilePicture(response.data.url); // Set gambar profil dari database
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
    setSelectedFile(file); // Simpan file yang dipilih di state
  };

  const handlePictureUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const userId = jwt_decode(localStorage.getItem("accessToken")).id;
    const formData = new FormData();
    formData.append("file", selectedFile); // Gunakan file dari state
    formData.append("userId", userId); // Kirim userId ke server

    axios
      .post(`http://localhost:5000/upload-profile-image`, formData)
      .then((response) => {
        setProfilePicture(response.data.url); // Set gambar baru
        setShowModal(false); // Tutup modal setelah unggah berhasil
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
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
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Produk</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Dog Food</td>
                    <td>20/09/2024</td>
                    <td>Selesai</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Cat Toy</td>
                    <td>18/09/2024</td>
                    <td>Dalam Pengiriman</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Header>Daftar Janji Temu</Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Jasa</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Vet Appointment</td>
                    <td>15/09/2024</td>
                    <td>Berhasil</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>Riwayat Pembayaran</Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tanggal</th>
                    <th>Jumlah</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>20/09/2024</td>
                    <td>Rp 150,000</td>
                    <td>Berhasil</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal untuk mengunggah foto baru */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ubah Foto Profil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFile">
              <Form.Label>Pilih Foto Baru</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange} // Ganti file yang dipilih
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handlePictureUpload}>
            Save Image
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
