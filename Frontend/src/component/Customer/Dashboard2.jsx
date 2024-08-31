// Dashboard .jsx
import React from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import "../../Css/Main.css";
import { useEffect, useState } from "react";
import UserTable from "../Admin/User_Table";
import { jwtDecode as jwt_decode } from "jwt-decode";
// import HomePage from "./nav";

const Dashboard_2 = () => {
  const [isLight, setIsLight] = useState(() => localStorage.getItem("light"));
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    if (isLight) {
      toggleRootClass();
    }
  }, [isLight]);

  const handleSidebarToggle = () => {
    document.querySelector("#sidebar").classList.toggle("collapsed");
  };

  const handleThemeToggle = () => {
    toggleLocalStorage();
    toggleRootClass();
  };

  function toggleRootClass() {
    const current = document.documentElement.getAttribute("data-bs-theme");
    const inverted = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-bs-theme", inverted);
  }

  function toggleLocalStorage() {
    if (isLight) {
      localStorage.removeItem("light");
      setIsLight(false);
    } else {
      localStorage.setItem("light", "set");
      setIsLight(true);
    }
  }

  useEffect(() => {
    // Cek apakah pengguna sudah login sebelumnya
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login");
    } else {
      const decodedToken = jwt_decode(accessToken);
      const name = decodedToken.name; // Mengambil nama pengguna dari token
      setName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Hapus token dari localStorage
    navigate("/login"); // Redirect ke halaman login setelah logout
    navigate(0);
  };

  return (
    <>
      <div className="wrapper">
        <aside id="sidebar" className="js-sidebar">
          <div className="h-100">
            <div className="sidebar-logo">
              <Link>
                <img
                  src="/Picture/pet-shop.gif"
                  className="avatar img-fluid rounded me-3"
                  alt=""
                />
                Pet <span style={{ color: "yellow" }}>Sanctuary</span>
              </Link>
            </div>
            <ul className="sidebar-nav">
              <li className="sidebar-header">Admin Elements</li>
              <li className="sidebar-item">
                <Link to="/Dashboard/*" className="sidebar-link icon">
                  <i className="fi fi-rr-tachometer-alt-slow me-3"></i>
                  Dashboard
                </Link>
              </li>
              <li className="sidebar-item">
                <a
                  href="#"
                  className="sidebar-link collapsed"
                  data-bs-target="#pages"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                >
                  <i className="fi fi-br-menu-burger me-3"></i>
                  Menu
                </a>
                <ul
                  id="pages"
                  className="sidebar-dropdown list-unstyled collapse"
                  data-bs-parent="#sidebar"
                >
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                      Brand Product
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                      Kategori Product
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                      Product
                    </a>
                  </li>
                </ul>
              </li>
              <li className="sidebar-item">
                <a
                  href="#"
                  className="sidebar-link collapsed"
                  data-bs-target="#posts"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                >
                  <i className="fi fi-rr-envelope me-3"></i>
                  All Info
                </a>
                <ul
                  id="posts"
                  className="sidebar-dropdown list-unstyled collapse"
                  data-bs-parent="#sidebar"
                >
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                      List Appoitnment
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                      List Order
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <Link to="user" className="sidebar-link">
                      List User
                    </Link>
                  </li>
                </ul>
              </li>
              {/* <li className="sidebar-item">
                <a
                  href="#"
                  className="sidebar-link collapsed"
                  data-bs-target="#auth"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                >
                  <i className="fa-regular fa-user pe-2"></i>
                  Auth
                </a>
                <ul
                  id="auth"
                  className="sidebar-dropdown list-unstyled collapse"
                  data-bs-parent="#sidebar"
                >
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                      Login
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                      Register
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                      Forgot Password
                    </a>
                  </li>
                </ul>
              </li> */}
              <li className="sidebar-header">More</li>
              {/* <li className="sidebar-item">
                <a
                  href="#"
                  className="sidebar-link collapsed"
                  data-bs-target="#multi"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-share-nodes pe-2"></i>
                  Multi Dropdown
                </a>
                <ul
                  id="multi"
                  className="sidebar-dropdown list-unstyled collapse"
                  data-bs-parent="#sidebar"
                >
                  <li className="sidebar-item">
                    <a
                      href="#"
                      className="sidebar-link collapsed"
                      data-bs-target="#level-1"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                    >
                      Level 1
                    </a>
                    <ul
                      id="level-1"
                      className="sidebar-dropdown list-unstyled collapse"
                    >
                      <li className="sidebar-item">
                        <a href="#" className="sidebar-link">
                          Level 1.1
                        </a>
                      </li>
                      <li className="sidebar-item">
                        <a href="#" className="sidebar-link">
                          Level 1.2
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li> */}
            </ul>
            <li className="sidebar-item">
              <Link className="sidebar-link" onClick={handleLogout}>
                <img
                  src="/Picture/import.gif"
                  className="avatar img-fluid rounded me-2 p-2"
                  alt=""
                />
                Logout
              </Link>
            </li>
          </div>
        </aside>
        <div className="main">
          <nav className="navbar navbar-expand px-3 border-bottom">
            <button
              className="btn"
              id="sidebar-toggle"
              onClick={handleSidebarToggle}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse navbar">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    data-bs-toggle="dropdown"
                    className="nav-icon pe-md-0"
                  >
                    <img
                      src="/Picture/user.gif"
                      className="avatar img-fluid rounded"
                      alt=""
                    />
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a href="#" className="dropdown-item">
                      Profile
                    </a>
                    <a href="#" className="dropdown-item">
                      Setting
                    </a>
                    <Link className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <main className="content px-3 py-2">
            <div className="container-fluid">
              <div className="mb-3">
                <h4>Admin Dashboard</h4>
              </div>
              <div className="row">
                <div className="col-12 col-md-6 d-flex">
                  <div className="card flex-fill border-0 illustration">
                    <div className="card-body p-0 d-flex flex-fill">
                      <div className="row g-0 w-100">
                        <div className="col-6">
                          <div className="p-2 m-3">
                            <h4>Welcome Back, {name}</h4>
                          </div>
                        </div>
                        <div className="col-6 align-self-end text-end">
                          <img
                            src="image/customer-support.jpg"
                            className="img-fluid illustration-img"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-12 col-md-6 d-flex">
                  <div className="card flex-fill border-0">
                    <div className="card-body py-4">
                      <div className="d-flex align-items-start">
                        <div className="flex-grow-1">
                          <h4 className="mb-2">$ 78.00</h4>
                          <p className="mb-2">Total Earnings</p>
                          <div className="mb-0">
                            <span className="badge text-success me-2">
                              +9.0%
                            </span>
                            <span className="text-muted">Since Last Month</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              <Routes>
                <Route path="/user" element={<UserTable />} />
                {/* <Route path="/home_page" element={<HomePage />} /> */}
              </Routes>
            </div>
          </main>
          <a href="#" className="theme-toggle" onClick={handleThemeToggle}>
            <i className="fi fi-ss-moon-stars"></i>
            <i className="fi fi-rr-brightness"></i>
          </a>
          <footer className="footer">
            <div className="container-fluid">
              <div className="row text-muted">
                <div className="col-6 text-start">
                  <p className="mb-0">
                    <a href="#" className="text-muted">
                      <strong>CodzSwod</strong>
                    </a>
                  </p>
                </div>
                <div className="col-6 text-end">
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <a href="#" className="text-muted">
                        Contact
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="text-muted">
                        About Us
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="text-muted">
                        Terms
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="text-muted">
                        Booking
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};
export default Dashboard_2;
