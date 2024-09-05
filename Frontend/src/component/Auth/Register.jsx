import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfpassword] = useState("");
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
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      Swal.fire({
        title: "Register successful!",
        text: "You will be redirected shortly.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/Login");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <body className="bg-transparent">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <div className="card shadow-lg border-0 rounded-lg mt-5 bg-white">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Create Account
                      </h3>
                    </div>
                    <div className="card-body">
                      <p className="font-italic">{msg}</p>
                      <form onSubmit={Register}>
                        <div className="row mb-3">
                          <div className="col">
                            <div className="form-floating mb-3 mb-md-0">
                              <input
                                className="form-control"
                                id="inputName"
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                              <label for="inputName">Name</label>
                            </div>
                          </div>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            id="inputEmail"
                            type="email"
                            placeholder="Create email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label for="inputEmail">Email address</label>
                        </div>
                        <div className="row mb-3">
                          <div className="col">
                            <div className="form-floating mb-3 mb-md-0">
                              <input
                                className="form-control"
                                id="inputPassword"
                                type="password"
                                placeholder="Create a password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <label for="inputPassword">Password</label>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col">
                            <div className="form-floating mb-3 mb-md-0">
                              <input
                                className="form-control"
                                id="confPassword"
                                type="password"
                                placeholder="Create a password"
                                name="confPassword"
                                value={confPassword}
                                onChange={(e) =>
                                  setConfpassword(e.target.value)
                                }
                              />
                              <label for="inputPassword">
                                Confirm Password
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 mb-0">
                          <div className="d-grid">
                            <button
                              className="btn btn-primary btn-block"
                              type="submit"
                            >
                              Create Account
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center py-3">
                      <div className="small">
                        <Link to="/Login">Have an account? Go to login</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        {/* <div id="layoutAuthentication_footer">
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">
                  Copyright &copy; Website PetShop
                </div>
                <div>
                  <Link href="#">Privacy Policy</Link>
                  &middot;
                  <Link href="#">Terms &amp; Conditions</Link>
                </div>
              </div>
            </div>
          </footer>
        </div> */}
      </div>
    </body>
  );
}

export default Register;
