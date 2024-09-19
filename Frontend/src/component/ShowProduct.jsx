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
} from "react-bootstrap";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);

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
    setShow(true);
  };

  const handleClose = () => setShow(false);

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
                      style={{ height: "20rem", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title
                        className="text-truncate"
                        title={product.name}
                      >
                        {product.name}
                      </Card.Title>
                      <Card.Text>
                        <strong>Price: </strong> ${product.price}
                      </Card.Text>
                      <Button
                        variant="outline-primary"
                        onClick={() => handleShow(product)}
                        style={{ zIndex: 2, position: "relative" }}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline-primary ms-2"
                        onClick={() => handleShow(product)}
                        style={{ zIndex: 2, position: "relative" }}
                      >
                        Checkout
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Modal to display product details */}
      {selectedProduct && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={`http://localhost:5000/imageProduct/${selectedProduct.image}`}
              alt={selectedProduct.name}
              className="img-fluid"
            />
            <p>
              <strong>Category: </strong>
              {selectedProduct.kategori_id}
            </p>
            <p>
              <strong>Price: </strong>${selectedProduct.price}
            </p>
            <p>
              <strong>Stock: </strong>
              {selectedProduct.stock}
            </p>
            <p>
              <strong>Description: </strong>
              {selectedProduct.description}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default ProductList;
