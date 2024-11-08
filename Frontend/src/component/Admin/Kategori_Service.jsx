import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Table,
  Form,
  InputGroup,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { CDBBtn } from "cdbreact";
import axios from "axios";
import Swal from "sweetalert2";

const KategoriService = () => {
  const [kategoris, setKategoris] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newKategori, setNewKategori] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedKategoriId, setSelectedKategoriId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

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
      await axios.post("http://localhost:5000/kategoriService", {
        nameKategori: newKategori,
      });
      fetchKategoris();
      setNewKategori("");
      setShowModal(false);
      Swal.fire({
        icon: "success",
        title: "Kategori Created",
        text: "Kategori service success created.",
      });
    } catch (error) {
      console.error("Error creating kategori:", error);
    }
  };

  const deleteKategori = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/kategoriService/${id}`);
      fetchKategoris();
      setShowDeleteModal(false);
      Swal.fire({
        icon: "success",
        title: "kategori deleted",
        text: "Your kategori has deleted.",
      });
    } catch (error) {
      console.error("Error deleting kategori:", error);
    }
  };

  const filteredKategoris = kategoris.filter((kategori) =>
    kategori.nameKategori.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEntries = filteredKategoris.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayedKategoris = filteredKategoris.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <Container fluid className="px-3">
      <h2 className="mb-3">
        <strong>Kategori Service</strong>
      </h2>
      <figcaption className="blockquote-footer mb-5">
        kategori for <cite title="Source Title">Appoitment</cite>
      </figcaption>

      <div className="bg-white rounded p-5 shadow-sm">
        <Row className="align-items-center">
          <Col md={6} className="align-items-center gap-3">
            {/* <Button className="mb-2" onClick={() => setShowModal(true)}>
              Create New Service
            </Button> */}
            <CDBBtn
              className="mb-2"
              color="primary"
              size="large"
              circle
              onClick={() => setShowModal(true)}
            >
              Create New Service
            </CDBBtn>
            <Form.Group controlId="entriesPerPage" className="col-1 ms-4">
              <Form.Control
                as="select"
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={{ span: 2, offset: 10 }} className="text-md-end">
            <InputGroup className="mb-2">
              <Form.Control
                type="text"
                placeholder="Search Kategori"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>

        {/* Data Table */}
        <Table striped bordered hover className="mb-0">
          <thead>
            <tr>
              <th className="fw-bold fs-4">#</th>
              <th className="fw-bold fs-5">Kategori</th>
              <th className="fw-bold fs-5">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedKategoris.map((kategori, index) => (
              <tr key={kategori.id}>
                <td>{(currentPage - 1) * entriesPerPage + index + 1}</td>
                <td>{kategori.nameKategori}</td>
                <td>
                  <Button
                    variant="danger"
                    size="md"
                    onClick={() => {
                      setShowDeleteModal(true);
                      setSelectedKategoriId(kategori.id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-between align-items-center mt-2">
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePagination(currentPage - 1)}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePagination(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Create Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Kategori</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={newKategori}
            onChange={(e) => setNewKategori(e.target.value)}
            placeholder="Enter new kategori name"
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

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this kategori?</Modal.Body>
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
    </Container>
  );
};

export default KategoriService;
