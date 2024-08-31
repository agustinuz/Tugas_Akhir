import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <body>
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-7">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Create Account
                      </h3>
                    </div>
                    <div className="card-body">
                      <p className="font-italic"></p>
                      <form>
                        <div className="row mb-3">
                          <div className="col">
                            <div className="form-floating mb-3 mb-md-0">
                              <input
                                className="form-control"
                                id="inputName"
                                type="text"
                                placeholder="Enter your name"
                                name="name"
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
                        <Link to="/login">Have an account? Go to login</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </body>
  );
};

export default Register;
