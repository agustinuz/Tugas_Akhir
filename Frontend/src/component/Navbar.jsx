import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Css/Navbar.css";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import ServiceFormModal from "./FormService";
import ProductList from "./ShowProduct";
// import UserProfile from "./ShoppingCard";
import Login from "./Auth/Login";
import ShoppingCartModal from "./ShoppingCard";
import RegisterModal from "./Auth/Register";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [showLogin, setShowLogin] = useState(false);
  const CloseLogin = () => setShowLogin(false);
  const ShowModalLogin = () => setShowLogin(true);

  const [showRegis, setShowRegis] = useState(false);
  const CloseRegis = () => setShowRegis(false);
  const ShowModalRegis = () => setShowRegis(true);

  const [showCartModal, setShowCartModal] = useState(false);
  const handleCartModalClose = () => setShowCartModal(false);
  const handleCartModalShow = () => setShowCartModal(true);

  // // const [showProfile, setShowProfile] = useState(false);
  // const handleShowProfile = () => setShowProfile(true);
  // const CloseProfile = () => setShowProfile(false);

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
            <ShoppingCartModal
              show={showCartModal}
              handleClose={handleCartModalClose}
            />
            <li class="nav-item dropdown me-3">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={faAddressBook} />
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a
                    className="dropdown-item nav-item nav-link me-1"
                    href="#"
                    onClick={ShowModalLogin}
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item nav-item nav-link me-1"
                    href="#"
                    onClick={ShowModalRegis}
                  >
                    Register
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-item nav-link me-1"
                    to="/profile"
                  >
                    My Profile
                  </Link>
                </li>
                {/* Modal Profil
                <Modal show={showProfile} onHide={CloseProfile}>
                  <Modal.Header closeButton>
                    <Modal.Title>Profil</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <UserProfile />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={CloseProfile}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal> */}
                {/* Modal Shopping Cart */}
                <Login show={showLogin} handleClose={CloseLogin} />
                <RegisterModal show={showRegis} handleClose={CloseRegis} />
              </ul>
            </li>
          </div>
        </div>
      </nav>
      {/* Hero Start */}
      <div
        className="container-fluid bg-primary py-5 mb-5 hero-header"
        id="home"
      >
        <div className="container py-5">
          <div className="row justify-content-start">
            <div className="col-lg-8 text-center text-lg-start">
              {/* Hero Title */}
              <h5
                className="display-1  text-primary mb-lg-5"
                style={{
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                Welcome to Our Pet Shop
              </h5>
              <h1
                className=" text-white mb-lg-5"
                style={{
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                Your Pet's Happiness is Our Priority
              </h1>
              {/* Tagline */}
              <figcaption
                className="blockquote-footer mb-5 text-white"
                style={{
                  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                }}
              >
                <h5
                  style={{
                    fontStyle: "italic",
                    fontWeight: 600,
                  }}
                >
                  Providing the Best{" "}
                  <cite title="Source Title">Care & Love for Your Pets</cite>
                </h5>
              </figcaption>
              {/* Button */}
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start pt-5">
                <Link
                  to="/"
                  className="btn btn-outline-light border-2 py-md-3 px-md-5 me-5"
                  style={{ fontWeight: "bold" }}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero End */}
      {/* product list */}
      <div className="container-fluid py-2 " id="listproduct">
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
                fasilitas kesehatan khusus yang menyediakan layanan medis untuk
                hewan peliharaan, seperti anjing, kucing,kelinci dan hewan kecil
                lainnya. Layanan yang ditawarkan oleh klinik hewan biasanya
                meliputi pemeriksaan kesehatan rutin, vaksinasi, pengobatan
                penyakit,
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
                      <ol>
                        <li>
                          Menjadi klinik hewan terdepan yang menyediakan layanan
                          kesehatan berkualitas tinggi untuk meningkatkan
                          kesejahteraan hewan peliharaan dan kepuasan pemilik.
                        </li>
                        <li>
                          Menjadi pusat kesehatan hewan yang diakui atas
                          dedikasi, profesionalisme, dan kepedulian terhadap
                          hewan peliharaan.
                        </li>
                      </ol>
                    </p>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-2"
                    role="tabpanel"
                    aria-labelledby="pills-2-tab"
                  >
                    <p className="mb-0">
                      Memberikan perawatan medis yang komprehensif, berkualitas,
                      dan berbasis ilmu pengetahuan modern untuk semua jenis
                      hewan peliharaan. Menjaga dan meningkatkan kesehatan hewan
                      melalui program preventif seperti vaksinasi, pencegahan
                      penyakit, dan edukasi kepada pemilik. Memberikan pelayanan
                      yang ramah, cepat tanggap, dan penuh kasih terhadap hewan
                      peliharaan dan pemiliknya. Menyediakan lingkungan yang
                      aman dan nyaman untuk perawatan, pembedahan, serta
                      penanganan kasus darurat hewan. Melakukan inovasi
                      terus-menerus dalam teknik dan teknologi perawatan hewan
                      untuk mendukung kualitas hidup yang lebih baik bagi hewan
                      peliharaan.
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
      <div className="container-fluid py-5" id="service">
        <div className="container">
          <div
            className="border-start border-5 border-primary ps-5 mb-5"
            style={{ maxWidth: "600px" }}
          >
            <h6 className="text-primary text-uppercase">Services</h6>
            <h1 className="display-5 text-uppercase mb-0">
              Our Excellent Pet Care Services
            </h1>
          </div>
          <div className="row g-5">
            {[
              {
                icon: "fi-br-house-chimney-heart",
                title: "Pet Boarding",
                description:
                  "Pet boarding adalah layanan penitipan hewan peliharaan, seperti anjing atau kucing, di tempat khusus saat pemiliknya tidak dapat merawatnya untuk sementara waktu, misalnya saat bepergian atau ada keperluan mendesak.",
              },
              {
                icon: "fi-sr-truck-utensils",
                title: "Pet Feeding",
                description:
                  "Pet feeding adalah aktivitas memberikan makanan kepada hewan peliharaan sesuai dengan jadwal dan kebutuhan nutrisi mereka. Layanan pet feeding sering kali disediakan oleh pet sitters atau fasilitas penitipan hewan lainnya saat pemiliknya tidak ada.",
              },
              {
                icon: "fi-ss-shower",
                title: "Pet Grooming",
                description:
                  "Pet grooming adalah perawatan kebersihan dan penampilan hewan peliharaan, mencakup berbagai aktivitas seperti memandikan, menyisir bulu, dan merapikan bulu.",
              },
              {
                icon: "fi-tr-cat",
                title: "Pet Training",
                description:
                  "Pet training adalah proses melatih hewan peliharaan untuk mempelajari perilaku yang diinginkan, menaati perintah, dan mengembangkan kebiasaan yang baik.",
              },
              {
                icon: "fi-rr-dog",
                title: "Pet Exercise",
                description:
                  "Pet exercise adalah aktivitas fisik yang dilakukan oleh hewan peliharaan untuk menjaga kesehatan dan kebugaran mereka, seperti berjalan-jalan atau bermain.",
              },
              {
                icon: "fi-ts-hand-holding-medical",
                title: "Pet Treatment",
                description:
                  "Pet treatment adalah perawatan medis atau non-medis yang diberikan kepada hewan peliharaan untuk menjaga kesehatannya atau mengobati penyakit tertentu.",
              },
            ].map((service, index) => (
              <div className="col-md-6" key={index}>
                <div className="service-item bg-light d-flex p-4">
                  <i
                    className={`fi ${service.icon} display-1 text-primary me-4`}
                  ></i>
                  <div>
                    <h5 className="text-uppercase mb-3">{service.title}</h5>
                    <p>{service.description}</p>
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
                    Pet feeding adalah aktivitas memberikan makanan kepada hewan
                    peliharaan sesuai dengan jadwal dan kebutuhan nutrisi
                    mereka. Layanan pet feeding sering kali disediakan oleh pet
                    sitters, pet boarding, atau fasilitas penitipan hewan
                    lainnya saat pemiliknya tidak ada.
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
                    Pet grooming adalah perawatan kebersihan dan penampilan
                    hewan peliharaan, seperti anjing atau kucing. Layanan pet
                    grooming mencakup berbagai aktivitas, seperti memandikan,
                    menyisir bulu, memotong kuku, membersihkan telinga,
                    merapikan bulu, dan terkadang juga menyikat gigi hewan.
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
                    Pet training adalah proses melatih hewan peliharaan, seperti
                    anjing atau kucing, untuk mempelajari perilaku yang
                    diinginkan, menaati perintah, dan mengembangkan kebiasaan
                    yang baik. Pet training melibatkan mengajarkan keterampilan
                    dasar, seperti duduk, datang saat dipanggil, atau berjalan
                    dengan tali, hingga perilaku yang lebih kompleks, seperti
                    mengikuti aturan rumah atau melakukan trik tertentu.
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
                    Pet exercise adalah aktivitas fisik yang dilakukan oleh
                    hewan peliharaan, seperti anjing atau kucing, untuk menjaga
                    kesehatan dan kebugaran mereka. Pet exercise meliputi
                    berbagai kegiatan, seperti berjalan-jalan, berlari, bermain
                    lempar tangkap (fetch), melompat, atau menggunakan mainan
                    interaktif untuk merangsang gerakan dan aktivitas mental
                    hewan. Latihan ini penting untuk menjaga berat badan yang
                    sehat, meningkatkan kesehatan jantung, serta mengurangi
                    stres dan kecemasan pada hewan peliharaan
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
                    Pet treatment adalah perawatan medis atau non-medis yang
                    diberikan kepada hewan peliharaan untuk menjaga kesehatannya
                    atau mengobati penyakit atau kondisi tertentu. Pet treatment
                    mencakup berbagai layanan, seperti pemeriksaan kesehatan
                    rutin, vaksinasi, pengobatan penyakit, perawatan gigi,
                    pemberian obat-obatan, perawatan luka, dan pencegahan
                    parasit (seperti kutu atau cacing).
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
              <p class="mb-4">Click below to find us on Google Maps.</p>
              <p class="mb-2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0830798146567!2d104.03094067592389!3d1.0999740988894822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d98f550077fe3d%3A0x9cbb00b8b3e3ee6a!2sPet%20Sanctuary%20Animal%20Care!5e0!3m2!1sid!2sid!4v1728751235132!5m2!1sid!2sid"
                  style={{ width: "500", height: "400", border: 0 }}
                  allowfullscreen
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </p>
              <p class="mb-2">
                <i class="bi bi-envelope-open text-primary me-2"></i>
                petsantuary@gmail.com
              </p>
              <p class="mb-0">
                <i class="bi bi-telephone text-primary me-2"></i>
                +62 813-5816-0338
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
                WhatsApp
              </h5>
              <p>Contact us via WhatsApp:</p>
              <a
                href="https://api.whatsapp.com/send/?phone=6281358160338&text&type=phone_number&app_absent=0"
                class="btn btn-primary"
              >
                Send Message
              </a>

              <h6 class="text-uppercase mt-4 mb-3">Follow Us</h6>
              <div class="d-flex">
                <a class="btn btn-outline-primary btn-square me-2" href="#">
                  <i class="fi fi-brands-facebook"></i>
                </a>
                <a class="btn btn-outline-primary btn-square me-2" href="#">
                  <i class="fi fi-brands-instagram"></i>
                </a>
                <a class="btn btn-outline-primary btn-square me-2" href="#">
                  <i class="fi fi-brands-youtube"></i>
                </a>
                <a class="btn btn-outline-primary btn-square me-2" href="#">
                  <i class="fi fi-brands-tik-tok"></i>
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
                . Agustinus Sitompul
              </p>
            </div>
            <div class="col-md-6 text-center text-md-end">
              <p class="mb-0">
                Designed by{" "}
                <a
                  class="text-white"
                  href="https://react-bootstrap.netlify.app/"
                >
                  React-Bootstrap
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
