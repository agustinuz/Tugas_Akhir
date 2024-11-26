import React, { useState, useEffect } from "react";
import axios from "axios";
import { CDBBtn } from "cdbreact";
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
import Swal from "sweetalert2";

const User_Table = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); // ID user yang dipilih untuk dihapus
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Untuk modal konfirmasi hapus
  const [showCreateModal, setShowCreateModal] = useState(false); // State untuk modal create user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfpassword] = useState("");
  const [msg, setMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getUsers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle Create User
  const handleCreateUser = async (e) => {
    e.preventDefault();

    const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s:]).{1,}$/;
      return passwordRegex.test(password);
    };

    if (!validatePassword(password)) {
      setMsg(
        "Password harus memiliki setidaknya satu huruf besar, satu karakter khusus, dan satu angka."
      );
      return;
    }

    try {
      await axios.post("http://localhost:5000/users", {
        name,
        email,
        password,
        confPassword,
      });
      Swal.fire({
        title: "User created successfully!",
        text: "User has been added to the list.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setShowCreateModal(false);
      fetchUsers(); // Refresh user list
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  // Open and Close modal
  const handleOpenCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setMsg("");
  };

  // Handle delete user
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/deleteuser/${selectedUserId}`);
      Swal.fire({
        title: "User Delete successfully!",
        text: "User has been added to the list.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setShowDeleteModal(false);
      fetchUsers(); // Ambil ulang data setelah penghapusan
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Open modal and set selected user id
  const handleOpenDeleteModal = (id) => {
    setSelectedUserId(id);
    setShowDeleteModal(true);
  };

  // Close modal
  const handleCloseDeleteModal = () => {
    setSelectedUserId(null);
    setShowDeleteModal(false);
  };

  const filteredUsers = users.filter((Users) =>
    Users.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEntries = filteredUsers.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayedUser = filteredUsers.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <Container fluid className="px-4">
      <h2 className="mb-3">
        <strong>Users</strong>
      </h2>
      <figcaption className="blockquote-footer mb-5">
        Data <cite title="Source Title">User</cite>
      </figcaption>

      <div className="bg-white rounded p-5 shadow-sm">
        <Row className="align-items-center">
          <Col md={6} className="d-flex gap-3">
            <CDBBtn
              className="mb-2"
              color="primary"
              size="large"
              circle
              onClick={() => setShowCreateModal(true)}
            >
              Create New User
            </CDBBtn>
            <Form.Label className="my-auto">Show entries:</Form.Label>

            <Form.Control
              as="select"
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="w-auto ms-2"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </Form.Control>
          </Col>

          <Col md={{ span: 2, offset: 10 }} className="text-md-end">
            <InputGroup className="mb-2">
              <Form.Control
                type="text"
                placeholder="Search Kategori"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-auto"
              />
            </InputGroup>
          </Col>
        </Row>

        {/* Data Table */}
        <Table striped bordered hover responsive className="mb-4">
          <thead>
            <tr>
              <th className="fw-bold fs-6">No.</th>
              <th className="fw-bold fs-6">Nama</th>
              <th className="fw-bold fs-6">Email</th>
              <th className="fw-bold fs-6">Role</th>
              <th className="fw-bold fs-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedUser.map((Users, index) => (
              <tr key={Users.id}>
                <td>{(currentPage - 1) * entriesPerPage + index + 1}</td>
                <td>{Users.name}</td>
                <td>{Users.email}</td>
                <td>{Users.role}</td>
                <td>
                  <Button
                    variant="danger"
                    size="md"
                    onClick={() => {
                      setShowDeleteModal(true);
                      setSelectedUserId(Users.id);
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
        <div className="d-flex justify-content-center mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              variant="outline-secondary"
              className={`mx-1 ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => handlePagination(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>

      {/* Modal Create User */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateUser}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confPassword}
                onChange={(e) => setConfpassword(e.target.value)}
                required
              />
            </Form.Group>

            <p className="text-danger">{msg}</p>

            <Button variant="primary" type="submit">
              Create User
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Modal Konfirmasi Hapus */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default User_Table;
