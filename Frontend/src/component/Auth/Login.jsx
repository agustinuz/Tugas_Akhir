import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode as jwt_decode } from "jwt-decode";
import Swal from "sweetalert2";

const Login = ({ show, handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });

      const accessToken = response.data.accessToken; // Tangkap token dari respons
      localStorage.setItem("accessToken", accessToken); // Simpan token di localStorage
      const decodedToken = jwt_decode(accessToken); // Ambil peran (role) pengguna dari token
      const userRole = decodedToken.userRole;

      Swal.fire({
        title: "Login successful!",
        text: "You will be redirected shortly.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        handleClose();
        if (userRole === "admin") {
          navigate("/Dashboard/*");
        } else if (userRole === "customer") {
          navigate("/");
        }
      });
    } catch (error) {
      console.error(error);
      // Tampilkan SweetAlert2 popup untuk error
      Swal.fire({
        title: "Login failed!",
        text: "Wrong email or password. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col">
                <div className="card shadow-lg border-0 rounded-lg mt-5 bg-white">
                  <div className="card-header">
                    <h3 className="text-center font-weight-light my-4">
                      Login
                    </h3>
                  </div>
                  <div className="card-body">
                    <p className="font-italic"></p>
                    <form onSubmit={handleSubmit}>
                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter Email"
                        />
                        <label htmlFor="email">Email address</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          name="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                        />
                        <label htmlFor="password">Password</label>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          id="inputRememberPassword"
                          type="checkbox"
                          value=""
                        />
                        <label
                          className="form-check-label"
                          for="inputRememberPassword"
                        >
                          Remember Password
                        </label>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                        <Link className="small" to="/Dashboard">
                          Forgot Password?
                        </Link>
                        <button type="submit" className="btn btn-primary">
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* <div className="card-footer text-center py-3">
                      <div className="small">
                        <Link to="/Register">Need an account? Sign up!</Link>
                      </div>
                    </div> */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default Login;
