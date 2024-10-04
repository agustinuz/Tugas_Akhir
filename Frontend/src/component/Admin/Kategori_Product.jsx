import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import {
  CDBCard,
  CDBCardBody,
  CDBDataTable,
  CDBContainer,
  CDBBtn,
} from "cdbreact";
import axios from "axios";
import Swal from "sweetalert2";

const Kategori_Table = () => {
  const [kategoris, setKategoris] = useState([]);
  const [newKategori, setNewKategori] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [kategoriNameToDelete, setKategoriNameToDelete] = useState("");
  const [currentKategori, setCurrentKategori] = useState({
    id: "",
    nameKategori: "",
    Description: "",
  });

  useEffect(() => {
    fetchKategoris();
  }, []);

  const fetchKategoris = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getKategori");
      setKategoris(response.data);
    } catch (error) {
      console.error("Error fetching kategoris:", error);
    }
  };

  const handleCreateKategori = async () => {
    try {
      await axios.post("http://localhost:5000/createKategori", {
        nameKategori: newKategori,
        Description: newDescription,
      });
      fetchKategoris();
      setNewKategori("");
      setNewDescription("");
      setShowModal(false);
      Swal.fire({
        title: "Kategori created successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error creating kategori:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/deleteKategori", {
        data: { nameKategori: kategoriNameToDelete },
      });
      setShowDeleteModal(false);
      fetchKategoris();
      Swal.fire({
        title: "Kategori deleted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error deleting kategori:", error);
    }
  };

  const handleShowUpdateModal = (kategori) => {
    setCurrentKategori(kategori);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentKategori({ ...currentKategori, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/updateKategori/${currentKategori.id}`,
        {
          newNameKategori: currentKategori.nameKategori, // sesuai dengan controller backend
          newDescription: currentKategori.Description, // sesuai dengan controller backend
        }
      );
      fetchKategoris();
      handleCloseUpdateModal();
      Swal.fire({
        title: "Kategori updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error updating kategori:", error);
    }
  };

  const data = {
    columns: [
      { label: "#", field: "index", sort: "asc" },
      { label: "Kategori", field: "nameKategori", sort: "asc" },
      { label: "Description", field: "Description", sort: "asc" },
      { label: "Action", field: "action" },
    ],
    rows: kategoris.map((kategori, index) => ({
      index: index + 1,
      nameKategori: kategori.nameKategori,
      Description: kategori.Description,
      action: (
        <>
          <Button
            className="btn btn-danger btn-sm text-capitalize"
            variant="danger"
            onClick={() => {
              setShowDeleteModal(true);
              setKategoriNameToDelete(kategori.nameKategori);
            }}
          >
            Delete
          </Button>
          <Button
            className="btn btn-primary btn-sm text-capitalize mx-3"
            variant="primary"
            onClick={() => handleShowUpdateModal(kategori)}
          >
            Update
          </Button>
        </>
      ),
    })),
  };

  return (
    <div>
      <div className="container-fluid px-4">
        <h2 className="mb-3">
          <strong>Kategori</strong>
        </h2>
        <figcaption className="blockquote-footer mb-5">
          Kategori for <cite title="Source Title">Product</cite>
        </figcaption>

        {/* Modal for Create Kategori */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Kategori</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              value={newKategori}
              onChange={(e) => setNewKategori(e.target.value)}
              placeholder="Enter new kategori name"
              className="form-control mb-3"
            />
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Enter Description"
              className="form-control"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCreateKategori}>
              Create Kategori
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal for Update Kategori */}
        <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Kategori</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formMerkNameToUpdate">
              <Form.Label>Kategori Name</Form.Label>
              <Form.Control
                type="text"
                name="nameKategori"
                value={currentKategori.nameKategori}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formNewDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="Description"
                value={currentKategori.Description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdateModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal for Delete Confirmation */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete the kategori?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <CDBContainer fluid>
          <CDBCard style={{ borderRadius: "15px" }}>
            <CDBCardBody>
              <CDBBtn
                color="primary"
                size="large"
                circle
                onClick={() => setShowModal(true)}
              >
                Create New Kategori
              </CDBBtn>
              <CDBDataTable
                responsive
                striped
                bordered
                hover
                data={data}
                pagination
                materialSearch={true}
              />
            </CDBCardBody>
          </CDBCard>
        </CDBContainer>
      </div>
    </div>
  );
};

export default Kategori_Table;
