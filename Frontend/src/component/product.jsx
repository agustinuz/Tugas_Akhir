import React from "react";
import { Link } from "react-router-dom";
import "../Css/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Product = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm py-2 py-lg-0 px-3 px-lg-0 sticky-top">
        <Link href="/" className="navbar-brand ms-lg-5">
          <h3 className="m-0 text-uppercase text-primary">
            <img
              src="Picture/pet-shop.gif"
              className="avatar img-fluid rounded me-2"
              alt=""
            />
            Pet Shop
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
            <Link to="/" className="nav-item nav-link active">
              Home
            </Link>
            <a href="#aboutUS" className="nav-item nav-link">
              About
            </a>
            <a href="#service" className="nav-item nav-link">
              {" "}
              Service
            </a>
            <Link to="/product" className="nav-item nav-link">
              Product
            </Link>
            <Link to="/product" className="nav-item nav-link me-5 ">
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
          </div>
        </div>
      </nav>

      {/* <!-- Products Start --> */}
      <div className="container-fluid py-5">
        <div className="container">
          <div
            className="border-start border-5 border-primary ps-5 mb-5"
            style={{ maxwidth: "600px" }}
          >
            <h6 className="text-primary text-uppercase">Products</h6>
            <h1 className="display-5 text-uppercase mb-0">
              Products For Your Best Friends
            </h1>
          </div>
          <div className="owl-carousel product-carousel">
            <div className="pb-5">
              <div className="product-item position-relative bg-light d-flex flex-column text-center">
                <img
                  className="img-fluid mb-4"
                  src="img/product-1.png"
                  alt=""
                />
                <h6 className="text-uppercase">Quality Pet Foods</h6>
                <h5 className="text-primary mb-0">$199.00</h5>
                <div className="btn-action d-flex justify-content-center">
                  <a className="btn btn-primary py-2 px-3" href="">
                    <i className="bi bi-cart"></i>
                  </a>
                  <a className="btn btn-primary py-2 px-3" href="">
                    <i className="bi bi-eye"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="pb-5">
              <div className="product-item position-relative bg-light d-flex flex-column text-center">
                <img
                  className="img-fluid mb-4"
                  src="img/product-2.png"
                  alt=""
                />
                <h6 className="text-uppercase">Quality Pet Foods</h6>
                <h5 className="text-primary mb-0">$199.00</h5>
                <div className="btn-action d-flex justify-content-center">
                  <a className="btn btn-primary py-2 px-3" href="">
                    <i className="bi bi-cart"></i>
                  </a>
                  <a className="btn btn-primary py-2 px-3" href="">
                    <i className="bi bi-eye"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="pb-5">
              <div className="product-item position-relative bg-light d-flex flex-column text-center">
                <img
                  className="img-fluid mb-4"
                  src="img/product-3.png"
                  alt=""
                />
                <h6 className="text-uppercase">Quality Pet Foods</h6>
                <h5 className="text-primary mb-0">$199.00</h5>
                <div className="btn-action d-flex justify-content-center">
                  <a className="btn btn-primary py-2 px-3" href="">
                    <i className="bi bi-cart"></i>
                  </a>
                  <a className="btn btn-primary py-2 px-3" href="">
                    <i className="bi bi-eye"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="pb-5">
              <div className="product-item position-relative bg-light d-flex flex-column text-center">
                <img
                  className="img-fluid mb-4"
                  src="img/product-4.png"
                  alt=""
                />
                <h6 className="text-uppercase">Quality Pet Foods</h6>
                <h5 className="text-primary mb-0">$199.00</h5>
                <div className="btn-action d-flex justify-content-center">
                  <a className="btn btn-primary py-2 px-3" href="">
                    <i className="bi bi-cart"></i>
                  </a>
                  <a className="btn btn-primary py-2 px-3" href="">
                    <i className="bi bi-eye"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="pb-5">
              <div className="product-item position-relative bg-light d-flex flex-column text-center">
                <img
                  className="img-fluid mb-4"
                  src="img/product-2.png"
                  alt=""
                />
                <h6 className="text-uppercase">Quality Pet Foods</h6>
                <h5 className="text-primary mb-0">$199.00</h5>
                <div className="btn-action d-flex justify-content-center">
                  <a className="btn btn-primary py-2 px-3" href="">
                    <i className="bi bi-cart"></i>
                  </a>
                  <a className="btn btn-primary py-2 px-3" href="">
                    <i className="bi bi-eye"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Products End --> */}
    </div>
  );
};
export default Product;
