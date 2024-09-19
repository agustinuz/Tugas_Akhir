import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import "../Css/Navbar.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ServiceFormModal from "./FormService";
import ProductList from "./ShowProduct";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm py-2 py-lg-0 px-3 px-lg-0 sticky-top">
        <Link href="/" className="navbar-brand ms-lg-5">
          <h3 className="m-0 text-capitalize text-secondary">
            <img
              src="Picture/pet-shop.gif"
              className="avatar img-fluid rounded me-2 mb-3"
              alt=""
            />
            <strong>
              <span className="fw-light">Pet</span> Santuary
            </strong>
          </h3>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0 ">
            <a href="#home" className="nav-item nav-link active">
              Home
            </a>
            <a href="#listproduct" className="nav-item nav-link">
              Product
            </a>
            <a href="#aboutUS" className="nav-item nav-link">
              {" "}
              News
            </a>
            <a href="#service" className="nav-item nav-link">
              Service
            </a>
            <Link to="/product" className="nav-item nav-link me-5 ">
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Start */}
      <div class="container-fluid bg-primary py-5 mb-5 hero-header" id="home">
        <div class="container py-5">
          <div class="row justify-content-start">
            <div class="col-lg-8 text-center text-lg-start">
              <h1 class="display-1 text-uppercase text-secondary mb-lg-4">
                Pet Shop
              </h1>
              <h1 class="text-uppercase text-white mb-lg-4">
                Make Your Pets Happy
              </h1>
              <p class="fs-4 text-white mb-lg-4">
                Dolore tempor clita lorem rebum kasd eirmod dolore diam eos
                kasd. Kasd clita ea justo est sed kasd erat clita sea
              </p>
              <div class="d-flex align-items-center justify-content-center justify-content-lg-start pt-5">
                <Link
                  to="/login"
                  class="btn btn-outline-light border-2 py-md-3 px-md-5 me-5"
                >
                  Shop Now!!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero End */}

      {/* product list */}
      <div className="container-fluid py-5" id="listproduct">
        <div className="container">
          <div className="row gx-5">
            <div
              class="border-start border-5 border-primary ps-5 mb-5"
              style={{ maxwidth: "600px" }}
            >
              <h6 class="text-primary text-uppercase">Product</h6>
              <h1 class="display-5 text-uppercase mb-0">All Of Products</h1>
            </div>
            <ProductList />
          </div>
        </div>
      </div>

      {/* end product */}

      {/* About Us */}
      <div className="container-fluid py-5" id="aboutUS">
        <div className="container">
          <div className="row gx-5">
            <div
              className="col-lg-5 mb-5 mb-lg-0"
              style={{ minheight: "500px" }}
            >
              <div className="position-relative h-100">
                <img
                  className="position-absolute w-100 h-100 rounded"
                  src="Picture/about.jpg"
                  style={{ objectFit: "cover" }}
                  alt="Gambar Tentang Kami"
                />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="border-start border-5 border-primary ps-5 mb-5">
                <h6 className="text-primary text-uppercase">About Us</h6>
                <h1 className="display-5 text-uppercase mb-0">
                  We Keep Your Pets Happy All Time
                </h1>
              </div>
              <h4 className="text-body mb-4">
                Diam dolor diam ipsum tempor sit. Clita erat ipsum et lorem stet
                no labore lorem sit clita duo justo magna dolore
              </h4>
              <div className="bg-light p-4">
                <ul
                  className="nav nav-pills justify-content-between mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item w-50" role="presentation">
                    <button
                      className="nav-link text-uppercase w-100 active"
                      id="pills-1-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-1"
                      type="button"
                      role="tab"
                      aria-controls="pills-1"
                      aria-selected="true"
                    >
                      Our Mission
                    </button>
                  </li>
                  <li className="nav-item w-50" role="presentation">
                    <button
                      className="nav-link text-uppercase w-100"
                      id="pills-2-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-2"
                      type="button"
                      role="tab"
                      aria-controls="pills-2"
                      aria-selected="false"
                    >
                      Our Vission
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-1"
                    role="tabpanel"
                    aria-labelledby="pills-1-tab"
                  >
                    <p className="mb-0">
                      Tempor erat elitr at rebum at at clita aliquyam
                      consetetur. Diam dolor diam ipsum et, tempor voluptua sit
                      consetetur sit. Aliquyam diam amet diam et eos sadipscing
                      labore. Clita erat ipsum et lorem et sit, sed stet no
                      labore lorem sit. Sanctus clita duo justo et tempor
                      consetetur takimata eirmod, dolores takimata consetetur
                      invidunt magna dolores aliquyam dolores dolore. Amet erat
                      amet et magna
                    </p>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-2"
                    role="tabpanel"
                    aria-labelledby="pills-2-tab"
                  >
                    <p className="mb-0">
                      Tempor erat elitr at rebum at at clita aliquyam
                      consetetur. Diam dolor diam ipsum et, tempor voluptua sit
                      consetetur sit. Aliquyam diam amet diam et eos sadipscing
                      labore. Clita erat ipsum et lorem et sit, sed stet no
                      labore lorem sit. Sanctus clita duo justo et tempor
                      consetetur takimata eirmod, dolores takimata consetetur
                      invidunt magna dolores aliquyam dolores dolore. Amet erat
                      amet et magna
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* about us end */}

      {/* Service start */}
      <div class="container-fluid py-5" id="service">
        <div class="container">
          <div
            class="border-start border-5 border-primary ps-5 mb-5"
            style={{ maxwidth: "600px" }}
          >
            <h6 class="text-primary text-uppercase">Services</h6>
            <h1 class="display-5 text-uppercase mb-0">
              Our Excellent Pet Care Services
            </h1>
          </div>
          <div class="row g-5">
            <div class="col-md-6">
              <div class="service-item bg-light d-flex p-4">
                <i class="fi fi-br-house-chimney-heart display-1 text-primary me-4"></i>
                <div>
                  <h5 class="text-uppercase mb-3">Pet Boarding</h5>
                  <p>
                    Kasd dolor no lorem sit tempor at justo rebum rebum stet
                    justo elitr dolor amet sit
                  </p>
                  <Button
                    className="text-white text-uppercase"
                    variant="primary"
                    onClick={handleShow}
                  >
                    Click Here
                    <i>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </i>
                  </Button>

                  <ServiceFormModal
                    show={showModal}
                    handleClose={handleClose}
                  />
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="service-item bg-light d-flex p-4">
                <i class="fi fi-sr-truck-utensils display-1 text-primary me-4"></i>
                <div>
                  <h5 class="text-uppercase mb-3">Pet Feeding</h5>
                  <p>
                    Kasd dolor no lorem sit tempor at justo rebum rebum stet
                    justo elitr dolor amet sit
                  </p>
                  <Button
                    className="text-white text-uppercase"
                    variant="primary"
                    onClick={handleShow}
                  >
                    Click Here
                    <i>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </i>
                  </Button>

                  <ServiceFormModal
                    show={showModal}
                    handleClose={handleClose}
                  />
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="service-item bg-light d-flex p-4">
                <i class="fi fi-ss-shower display-1 text-primary me-4"></i>
                <div>
                  <h5 class="text-uppercase mb-3">Pet Grooming</h5>
                  <p>
                    Kasd dolor no lorem sit tempor at justo rebum rebum stet
                    justo elitr dolor amet sit
                  </p>
                  <Button
                    className="text-white text-uppercase"
                    variant="primary"
                    onClick={handleShow}
                  >
                    Click Here
                    <i>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </i>
                  </Button>

                  <ServiceFormModal
                    show={showModal}
                    handleClose={handleClose}
                  />
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="service-item bg-light d-flex p-4">
                <i class="fi fi-tr-cat display-1 text-primary me-4"></i>
                <div>
                  <h5 class="text-uppercase mb-3">Pet Training</h5>
                  <p>
                    Kasd dolor no lorem sit tempor at justo rebum rebum stet
                    justo elitr dolor amet sit
                  </p>
                  <Button
                    className="text-white text-uppercase"
                    variant="primary"
                    onClick={handleShow}
                  >
                    Click Here
                    <i>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </i>
                  </Button>

                  <ServiceFormModal
                    show={showModal}
                    handleClose={handleClose}
                  />
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="service-item bg-light d-flex p-4">
                <i class="fi fi-rr-dog display-1 text-primary me-4"></i>
                <div>
                  <h5 class="text-uppercase mb-3">Pet Exercise</h5>
                  <p>
                    Kasd dolor no lorem sit tempor at justo rebum rebum stet
                    justo elitr dolor amet sit
                  </p>
                  <Button
                    className="text-white text-uppercase"
                    variant="primary"
                    onClick={handleShow}
                  >
                    Click Here
                    <i>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </i>
                  </Button>

                  <ServiceFormModal
                    show={showModal}
                    handleClose={handleClose}
                  />
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="service-item bg-light d-flex p-4">
                <i class="fi fi-ts-hand-holding-medical display-1 text-primary me-4"></i>
                <div>
                  <h5 class="text-uppercase mb-3">Pet Treatment</h5>
                  <p>
                    Kasd dolor no lorem sit tempor at justo rebum rebum stet
                    justo elitr dolor amet sit
                  </p>
                  <Button
                    className="text-white text-uppercase"
                    variant="primary"
                    onClick={handleShow}
                  >
                    Click Here
                    <i>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </i>
                  </Button>

                  <ServiceFormModal
                    show={showModal}
                    handleClose={handleClose}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Footer Start --> */}
      <div class="container-fluid bg-light mt-5 py-5">
        <div class="container pt-5">
          <div class="row g-5">
            <div class="col-lg-3 col-md-6">
              <h5 class="text-uppercase border-start border-5 border-primary ps-3 mb-4">
                Get In Touch
              </h5>
              <p class="mb-4">
                No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita
                et et dolor sed dolor
              </p>
              <p class="mb-2">
                <i class="bi bi-geo-alt text-primary me-2"></i>123 Street, New
                York, USA
              </p>
              <p class="mb-2">
                <i class="bi bi-envelope-open text-primary me-2"></i>
                info@example.com
              </p>
              <p class="mb-0">
                <i class="bi bi-telephone text-primary me-2"></i>+012 345 67890
              </p>
            </div>
            <div class="col-lg-3 col-md-6">
              <h5 class="text-uppercase border-start border-5 border-primary ps-3 mb-4">
                Quick Links
              </h5>
              <div class="d-flex flex-column justify-content-start">
                <a class="text-body mb-2" href="#">
                  <i class="bi bi-arrow-right text-primary me-2"></i>Home
                </a>
                <a class="text-body mb-2" href="#">
                  <i class="bi bi-arrow-right text-primary me-2"></i>About Us
                </a>
                <a class="text-body mb-2" href="#">
                  <i class="bi bi-arrow-right text-primary me-2"></i>Our
                  Services
                </a>
                <a class="text-body mb-2" href="#">
                  <i class="bi bi-arrow-right text-primary me-2"></i>Meet The
                  Team
                </a>
                <a class="text-body mb-2" href="#">
                  <i class="bi bi-arrow-right text-primary me-2"></i>Latest Blog
                </a>
                <a class="text-body" href="#">
                  <i class="bi bi-arrow-right text-primary me-2"></i>Contact Us
                </a>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <h5 class="text-uppercase border-start border-5 border-primary ps-3 mb-4">
                Popular Links
              </h5>
              <div class="d-flex flex-column justify-content-start">
                <a class="text-body mb-2" href="#">
                  <i class="bi bi-arrow-right text-primary me-2"></i>Home
                </a>
                <a class="text-body mb-2" href="#">
                  <i class="bi bi-arrow-right text-primary me-2"></i>About Us
                </a>
                <a class="text-body mb-2" href="#">
                  <i class="bi bi-arrow-right text-primary me-2"></i>Our
                  Services
                </a>
                <a class="text-body mb-2" href="#">
                  <i class="bi bi-arrow-right text-primary me-2"></i>Meet The
                  Team
                </a>
                <a class="text-body mb-2" href="#">
                  <i class="bi bi-arrow-right text-primary me-2"></i>Latest Blog
                </a>
                <a class="text-body" href="#">
                  <i class="bi bi-arrow-right text-primary me-2"></i>Contact Us
                </a>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <h5 class="text-uppercase border-start border-5 border-primary ps-3 mb-4">
                Newsletter
              </h5>
              <form action="">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control p-3"
                    placeholder="Your Email"
                  />
                  <button class="btn btn-primary">Sign Up</button>
                </div>
              </form>
              <h6 class="text-uppercase mt-4 mb-3">Follow Us</h6>
              <div class="d-flex">
                <a class="btn btn-outline-primary btn-square me-2" href="#">
                  <i class="bi bi-twitter"></i>
                </a>
                <a class="btn btn-outline-primary btn-square me-2" href="#">
                  <i class="bi bi-facebook"></i>
                </a>
                <a class="btn btn-outline-primary btn-square me-2" href="#">
                  <i class="bi bi-linkedin"></i>
                </a>
                <a class="btn btn-outline-primary btn-square" href="#">
                  <i class="bi bi-instagram"></i>
                </a>
              </div>
            </div>
            <div class="col-12 text-center text-body">
              <a class="text-body" href="">
                Terms & Conditions
              </a>
              <span class="mx-1">|</span>
              <a class="text-body" href="">
                Privacy Policy
              </a>
              <span class="mx-1">|</span>
              <a class="text-body" href="">
                Customer Support
              </a>
              <span class="mx-1">|</span>
              <a class="text-body" href="">
                Payments
              </a>
              <span class="mx-1">|</span>
              <a class="text-body" href="">
                Help
              </a>
              <span class="mx-1">|</span>
              <a class="text-body" href="">
                FAQs
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid bg-dark text-white-50 py-4">
        <div class="container">
          <div class="row g-5">
            <div class="col-md-6 text-center text-md-start">
              <p class="mb-md-0">
                &copy;{" "}
                <a class="text-white" href="#">
                  Your Site Name
                </a>
                . All Rights Reserved.
              </p>
            </div>
            <div class="col-md-6 text-center text-md-end">
              <p class="mb-0">
                Designed by{" "}
                <a class="text-white" href="https://htmlcodex.com">
                  HTML Codex
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Footer End --> */}
      {/* <!-- Services End --> */}
    </div>
  );
};
export default Navbar;
