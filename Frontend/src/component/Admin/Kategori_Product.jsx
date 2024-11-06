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

const Kategori_Table = () => {
  const [kategoris, setKategoris] = useState([]);
  const [newKategori, setNewKategori] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [kategoriNameToDelete, setKategoriNameToDelete] = useState("");
  const [currentKategori, setCurrentKategori] = useState({
    id: "",
    nameKategori: "",
    Description: "",
  });
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

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
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="bg-white rounded p-5 shadow-sm">
        <Row className="align-items-center">
          <Col md={6} className=" align-items-center gap-3">
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
              Create New Kategori
            </CDBBtn>
            Show entries
            <Form.Group controlId="entriesPerPage" className="col-3 ms-4 mb-1">
              <Form.Control
                as="select"
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                Show
                entries
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
        <Table striped bordered hover responsive className="mb-4">
          <thead>
            <tr>
              <th className="fw-bold fs-4">##</th>
              <th className="fw-bold fs-5">Kategori</th>
              <th className="fw-bold fs-5">Description</th>
              <th className="fw-bold fs-5">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedKategoris.map((kategori, index) => (
              <tr key={kategori.id}>
                <td>{(currentPage - 1) * entriesPerPage + index + 1}</td>
                <td>{kategori.nameKategori}</td>
                <td>{kategori.Description}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      className="btn btn-primary btn-md text-capitalize ms-6 "
                      variant="primary"
                      onClick={() => handleShowUpdateModal(kategori)}
                    >
                      Update
                    </Button>
                    <Button
                      className="btn btn-danger btn-md text-capitalize ms-2"
                      variant="danger"
                      onClick={() => {
                        setShowDeleteModal(true);
                        setKategoriNameToDelete(kategori.nameKategori);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
    </Container>
  );
};

export default Kategori_Table;
