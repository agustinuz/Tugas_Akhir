import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { jwtDecode as jwt_decode } from "jwt-decode";
// import "./CreateServiceModal.css"; // Tambahkan CSS eksternal jika diperlukan

const CreateServiceModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    Name_Owner: "",
    Name_Animal: "",
    birthday_Animal: "",
    Jenis: "",
    RAS: "",
    Quantity: "",
    kategori_service: "",
    userId: "", // Tambahkan field userId ke formData
  });

  const [categories, setCategories] = useState([]); // State untuk menyimpan daftar kategori

  // Fungsi untuk mendapatkan userId dari token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("accessToken"); // Ambil token dari localStorage
    if (token) {
      const decoded = jwt_decode(token); // Decode token untuk mendapatkan userId
      return decoded.userId;
    }
    return null;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/kategoriService"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (show) {
      fetchCategories(); // Memanggil fungsi hanya ketika modal ditampilkan
    }
  }, [show]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dapatkan userId dari token sebelum submit
    const userId = getUserIdFromToken();

    if (!userId) {
      Swal.fire({
        title: "Login required!",
        text: "You need to log in to submit the form.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/createService",
        { ...formData, userId } // Sertakan userId dalam data yang dikirim
      );
      console.log(response.data);
      Swal.fire({
        title: "Service created successfully!",
        text: "Your service request has been submitted.",
        icon: "success",
        confirmButtonText: "OK",
      });
      handleClose();
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Terjadi kesalahan saat menambahkan data");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="md">
      {" "}
      {/* Set size to large */}
      <Modal.Header closeButton>
        <Modal.Title>Create New Service</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        {" "}
        {/* Add custom class for padding */}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNameOwner" className="mb-3">
            <Form.Label>Nama Pemilik</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan Nama Pemilik"
              name="Name_Owner"
              value={formData.Name_Owner}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formNameAnimal" className="mb-3">
            <Form.Label>Nama Hewan</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan Nama Hewan"
              name="Name_Animal"
              value={formData.Name_Animal}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBirthdayAnimal" className="mb-3">
            <Form.Label>Tanggal Lahir Hewan</Form.Label>
            <Form.Control
              type="date"
              name="birthday_Animal"
              value={formData.birthday_Animal}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formJenis" className="mb-3">
            <Form.Label>Jenis</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan Jenis Hewan"
              name="Jenis"
              value={formData.Jenis}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formRAS" className="mb-3">
            <Form.Label>Ras</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan Ras Hewan"
              name="RAS"
              value={formData.RAS}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formQuantity" className="mb-3">
            <Form.Label>Jumlah</Form.Label>
            <Form.Control
              type="number"
              placeholder="Masukkan Jumlah"
              name="Quantity"
              value={formData.Quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formKategoriService" className="mb-3">
            <Form.Label>Kategori Service</Form.Label>
            <Form.Control
              as="select"
              name="kategori_service"
              value={formData.kategori_service}
              onChange={handleChange}
              required
              style={{ maxHeight: "200px", overflowY: "auto" }} // Membatasi tinggi dropdown
            >
              <option value="">Pilih Kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nameKategori}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button className="mt-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateServiceModal;
