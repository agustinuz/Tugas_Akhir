import React, { useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ForgotPassword = ({ show, handleClose }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/forgot-password",
        { email }
      );
      Swal.fire({
        title: "Link send successful!",
        text: "Clinc your Link.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        handleClose();
        navigate("/Login");
      });
      console.log(response.data.msg);
    } catch (error) {
      Swal.fire(error.response.data.msg || "Terjadi kesalahan");
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
                      Forgor Password
                    </h3>
                  </div>
                  <div className="card-body">
                    <p className="font-italic"></p>
                    <form onSubmit={handleSubmit}>
                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="Enter Email"
                        />
                        <label htmlFor="email">Email address</label>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                        <button type="submit" className="btn btn-primary">
                          Sent Reset Link
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

export default ForgotPassword;
