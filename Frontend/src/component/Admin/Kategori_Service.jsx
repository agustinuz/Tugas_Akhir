import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  CDBCard,
  CDBCardBody,
  CDBDataTable,
  CDBContainer,
  CDBBtn,
} from "cdbreact";
import axios from "axios";

const Kategori_Service = () => {
  const [kategoris, setKategoris] = useState([]);
  const [newKategori, setNewKategori] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedKategoriId, setSelectedKategoriId] = useState(null); // State untuk melacak id kategori yang ingin dihapus

  useEffect(() => {
    fetchKategoris();
  }, []);

  const fetchKategoris = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kategoriService");
      setKategoris(response.data);
    } catch (error) {
      console.error("Error fetching kategoris:", error);
    }
  };

  const handleCreateKategori = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/kategoriService",
        {
          nameKategori: newKategori,
        }
      );
      console.log("Response from creating kategori:", response.data);
      fetchKategoris();
      setNewKategori("");
      setShowModal(false);
    } catch (error) {
      console.error("Error creating kategori:", error);
    }
  };

  const deleteKategori = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/kategoriService/${id}`);
      fetchKategoris();
      setShowDeleteModal(false); // Tutup modal setelah menghapus
    } catch (error) {
      console.log(error);
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
        label: "Action",
        field: "action",
      },
    ],
    rows: kategoris.map((kategori, index) => ({
      index: index + 1,
      nameKategori: kategori.nameKategori,
      action: (
        <>
          <Button
            className="btn btn-danger btn-sm text-capitalize"
            variant="danger"
            onClick={() => {
              setShowDeleteModal(true);
              setSelectedKategoriId(kategori.id);
            }}
          >
            Delete
          </Button>
        </>
      ),
      clickEvent: () => alert("Klik Oke Untuk Melanjutkan Delete"),
    })),
  };

  return (
    <div>
      <div className="container-fluid px-4">
        <h2 className="mb-3">
          <strong>Kategori Service</strong>
        </h2>
        <figcaption className="blockquote-footer mb-5">
          Kategori for <cite title="Source Title">Service</cite>
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

      {/* Modal Delete */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the kategori?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteKategori(selectedKategoriId)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Kategori_Service;
