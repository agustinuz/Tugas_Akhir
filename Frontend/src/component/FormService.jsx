import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const CreateServiceModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    Name_Owner: "",
    Name_Animal: "",
    birthday_Animal: "",
    Jenis: "",
    RAS: "",
    Quantity: "",
    kategori_service: "",
  });

  const [categories, setCategories] = useState([]); // State untuk menyimpan daftar kategori

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
    try {
      const response = await axios.post(
        "http://localhost:5000/createService",
        formData
      );
      console.log(response.data);
      Swal.fire({
        title: "Login successful!",
        text: "You will be redirected shortly.",
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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNameOwner">
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
          <Form.Group controlId="formNameAnimal">
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
          <Form.Group controlId="formBirthdayAnimal">
            <Form.Label>Tanggal Lahir Hewan</Form.Label>
            <Form.Control
              type="date"
              name="birthday_Animal"
              value={formData.birthday_Animal}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formJenis">
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
          <Form.Group controlId="formRAS">
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
          <Form.Group controlId="formQuantity">
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
          <Form.Group controlId="formKategoriService">
            <Form.Label>Kategori Service</Form.Label>
            <Form.Control
              as="select"
              name="kategori_service"
              value={formData.kategori_service}
              onChange={handleChange}
              required
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
