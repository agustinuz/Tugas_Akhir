import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const RegisterModal = ({ show, handleClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s:]).{1,}$/;
    return passwordRegex.test(password);
  };

  const Register = async (e) => {
    e.preventDefault();
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
        title: "Register successful!",
        text: "You will Login now!!.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        handleClose();
      });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="font-italic text-danger">{msg}</p>
        <Form onSubmit={Register}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formConfPassword" className="mt-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="confPassword"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button className="mt-4" variant="primary" type="submit" block>
            Create Account
          </Button>
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
        <p className="text-center">
          <Link to="/Login" onClick={handleClose}>
            Have an account? Go to login
          </Link>
        </p>
      </Modal.Footer> */}
    </Modal>
  );
};

export default RegisterModal;
