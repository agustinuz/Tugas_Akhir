import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";
import {
  CDBCard,
  CDBCardBody,
  CDBDataTable,
  CDBContainer,
  CDBBtn,
} from "cdbreact";
import axios from "axios";

const Kategori_Table = ({ fetchData }) => {
  const [kategoris, setKategoris] = useState([]);
  const [newKategori, setNewKategori] = useState("");
  const [NewDescription, setNewDescription] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [kategoriNameToDelete, setKategoriNameToDelete] = useState("");
  const [kategoriNameToUpdate, setKategoriNameToUpdate] = useState("");
  const [newName, setNewName] = useState("");
  function testClickEvent(param) {
    alert("Row Click Event");
  }

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
      const response = await axios.post(
        "http://localhost:5000/createKategori",
        {
          nameKategori: newKategori,
          Description: NewDescription,
        }
      );
      console.log("Response from creating kategori:", response.data);
      fetchKategoris();
      setNewKategori("");
      setNewDescription("");
      setShowModal(false);
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
      // Lakukan hal lain yang diperlukan setelah penghapusan
      fetchKategoris(); // Ambil ulang kategoris setelah penghapusan
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:5000/updateKategori", {
        nameKategori: kategoriNameToUpdate,
        newNameKategori: newName,
      });
      setShowUpdateModal(false);
      // Lakukan hal lain yang diperlukan setelah pembaruan
      fetchKategoris(); // Ambil ulang kategoris setelah pembaruan
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Data for CDBDataTable
  const data = {
    columns: [
      {
        label: "#",
        field: "index",
        sort: "asc",
      },
      {
        label: "Kategori",
        field: "nameKategori",
        sort: "asc",
      },
      {
        label: "Description",
        field: "Description",
        sort: "asc",
      },
      {
        label: "Action",
        field: "action",
      },
    ],
    rows: kategoris.map((kategori, index) => ({
      index: index + 1,
      nameKategori: kategori.nameKategori,
      Description: kategori.Description,
      action: (
        <>
          <Button
            variant="danger"
            onClick={() => {
              setShowDeleteModal(true);
              setKategoriNameToDelete(kategori.nameKategori);
            }}
          >
            Delete
          </Button>
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete the kategori?
            </Modal.Body>
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
          <Button
            className="mx-4"
            variant="primary"
            onClick={() => {
              setShowUpdateModal(true);
              setKategoriNameToUpdate(kategori.nameKategori);
            }}
          >
            Update
          </Button>
          <Modal
            show={showUpdateModal}
            onHide={() => setShowUpdateModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Update Kategori</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="formMerkNameToUpdate">
                <Form.Label>Kategori Name</Form.Label>
                <Form.Control
                  type="text"
                  value={kategoriNameToDelete}
                  onChange={(e) => setKategoriNameToUpdate(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formNewName">
                <Form.Label>New Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowUpdateModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ),
      clickEvent: () => testClickEvent(kategori.nameKategori),
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
              value={NewDescription}
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
        <CDBContainer fluid>
          <CDBCard style={{ borderRadius: "15px" }}>
            <CDBCardBody>
              <CDBBtn
                color="primary"
                size="large"
                circle
                onClick={() => setShowModal(true)}
              >
                Create New Service
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
