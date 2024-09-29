import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Button,
  Modal,
  Container,
  Carousel,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { jwtDecode as jwt_decode } from "jwt-decode";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);
  const [qty, setQty] = useState(1); // Default quantity is 1
  const [message, setMessage] = useState("");

  const getUserData = () => {
    // Decode token untuk mendapatkan userId

    const token = localStorage.getItem("accessToken"); // Ambil token dari localStorage
    if (token) {
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);
      console.log("Decoded Token:", decodedToken); // Lihat struktur token di console
      //      userId = decodedToken.id || decodedToken.userId || decodedToken.sub; // Sesuaikan key yang mengandung ID user
      //      console.log("User ID from Token:", userId);
      return decodedToken;
    } else {
      console.error("Token is missing!");
      return null;
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getproducts");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleShow = (product) => {
    setSelectedProduct(product);
    setQty(1); // Reset jumlah produk
    setMessage(""); // Reset pesan
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleAddToCart = async () => {
    const userId = getUserData().userId;
    if (!userId) {
      setMessage("User ID not found in token.");
      return;
    }
    const userData = getUserData();
    console.log(userData);
    try {
      const response = await axios.post(
        "http://localhost:5000/cart", // Ganti dengan URL API backend
        {
          userId: userData.userId, // Gunakan userId yang sudah di-decode dari token
          productId: selectedProduct.id,
          qty: qty,
        },
        {
          headers: {
            Authorization: `Bearer ${getUserData().userId}`, // Sertakan token untuk autentikasi
          },
        }
      );
      setMessage("Product added to cart successfully!", response);
    } catch (error) {
      setMessage("Failed to add product to cart.");
      console.error(error);
    }
  };

  // Function to group products into chunks of 4
  const groupProducts = (arr, chunkSize) => {
    const grouped = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      grouped.push(arr.slice(i, i + chunkSize));
    }
    return grouped;
  };

  const groupedProducts = groupProducts(products, 4); // Group products into chunks of 4

  return (
    <Container
      className="mt-5 p-4"
      style={{ backgroundColor: "#f8f9fa", borderRadius: "10px" }}
    >
      {/* Carousel for grouped product list */}
      <Carousel
        interval={null}
        indicators={true}
        controls={true}
        prevIcon={
          <span className="carousel-control-prev-icon" style={{ zIndex: 1 }} />
        }
        nextIcon={
          <span className="carousel-control-next-icon" style={{ zIndex: 1 }} />
        }
      >
        {groupedProducts.map((group, index) => (
          <Carousel.Item key={index}>
            <Row>
              {group.map((product) => (
                <Col md={3} key={product.id}>
                  <Card
                    className="shadow-sm h-100 mx-auto"
                    style={{ width: "18rem" }}
                  >
                    <Card.Img
                      variant="top"
                      src={`http://localhost:5000/imageProduct/${product.image}`}
                      alt={product.name}
                      className="img-fluid"
                      style={{ height: "15rem", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title
                        className="text-truncate"
                        title={product.name}
                      >
                        {product.name}
                      </Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                      <strong>Stock : {product.stock}</strong> Pcs
                      <Card.Text>
                        <strong>Price: Rp. {product.price}</strong>
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => handleShow(product)}
                        style={{ zIndex: 2, position: "relative" }} // Ensure button is on top
                      >
                        Add To Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Modal for adding product to cart */}
      {selectedProduct && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add {selectedProduct.name} to Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={`http://localhost:5000/imageProduct/${selectedProduct.image}`}
              alt={selectedProduct.name}
              className="img-fluid mb-3"
            />
            <p>
              <strong>Price: Rp. {selectedProduct.price}</strong>
            </p>
            <p>
              <strong>Description : </strong>
              {selectedProduct.description}
            </p>
            <Form.Group controlId="formQty">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </Form.Group>
            {message && <p>{message}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default ProductList;
