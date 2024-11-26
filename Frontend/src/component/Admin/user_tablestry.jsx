import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CDBCard,
  CDBCardBody,
  CDBDataTable,
  CDBContainer,
  CDBBtn,
} from "cdbreact";
import { Modal, Button, Form } from "react-bootstrap";
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
  // Define the columns for CDBDataTable
  const columns = [
    {
      label: "#",
      field: "index",
      sort: "asc",
      width: 50,
    },
    {
      label: "Name Users",
      field: "name",
      sort: "asc",
      width: 150,
    },
    {
      label: "Email",
      field: "email",
      sort: "asc",
      width: 270,
    },
    {
      label: "Role",
      field: "role",
      sort: "asc",
      width: 100,
    },
    {
      label: "Action",
      field: "action",
      width: 150,
    },
  ];

  // Format the user data for the DataTable
  const data = {
    columns: columns,
    rows: users.map((user, index) => ({
      index: index + 1,
      name: user.name,
      email: user.email,
      role: user.role,
      action: (
        <>
          <Button
            className="btn btn-danger btn-sm text-capitalize"
            onClick={() => handleOpenDeleteModal(user.id)} // Set ID user untuk hapus
          >
            Delete
          </Button>
        </>
      ),
    })),
  };

  return (
    <CDBContainer fluid>
      <div className="container-fluid px-4">
        <h2 className="mb-3">
          <strong>Users</strong>
        </h2>
        <figcaption className="blockquote-footer mb-5">
          Data <cite title="Source Title">User</cite>
        </figcaption>
        <CDBCard style={{ borderRadius: "15px" }}>
          <CDBCardBody>
            <CDBBtn
              color="primary"
              size="large"
              circle
              onClick={handleOpenCreateModal}
            >
              Create New User
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
      </div>
    </CDBContainer>
  );
};

export default User_Table;