import React, { useState, useEffect } from "react";
import { Modal, Button, Nav, ListGroup, Row, Col } from "react-bootstrap";
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const ShoppingCartModal = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const getuserId = jwt_decode(token).userId;
      fetchCart(getuserId);
    }
  }, [show]);

  const fetchCart = async (getuserId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/cart/${getuserId}`
      );
      setCartItems(response.data.carts);
      setTotalHarga(response.data.totalHarga);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const updateCart = async (productId, newQty) => {
    try {
      await axios.post("http://localhost:5000/cart", {
        userId: jwt_decode(localStorage.getItem("accessToken")).userId,
        productId,
        qty: newQty,
      });
      fetchCart(jwt_decode(localStorage.getItem("accessToken")).userId);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const deleteCartItem = async (cartId) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${cartId}`);
      // Refresh keranjang setelah item dihapus
      fetchCart(jwt_decode(localStorage.getItem("accessToken")).userId);
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  return (
    <>
      <Nav.Link onClick={handleShow}>
        <FontAwesomeIcon icon={faCartShopping} />
      </Nav.Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems.length > 0 ? (
            <>
              <ListGroup>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.cartId}>
                    <Row>
                      <Col xs={8}>
                        <div>
                          <strong>{item.ProductName}</strong>
                        </div>
                        <div>Price: {Number(item.price).toFixed(0)}</div>
                        <div>Quantity: {Number(item.qty).toFixed(0)}</div>
                        <div>Total: {Number(item.Total_Harga).toFixed(0)}</div>
                      </Col>
                      <Col
                        xs={4}
                        className="d-flex flex-column align-items-end"
                      >
                        <div className="d-flex align-items-center mb-2">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => {
                              updateCart(item.productId, -1);
                            }}
                            disabled={item.qty <= 1}
                          >
                            -
                          </Button>
                          <span className="mx-2">
                            {Number(item.qty).toFixed(0)}
                          </span>
                          {/* Button to increase quantity */}
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => {
                              // const qty = parseFloat(item.qty);
                              // const newQty = qty + 1; // Ensure quantity doesn't go below 1
                              updateCart(item.productId, 1); // Call updateCart with incremented qty
                            }}
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => deleteCartItem(item.cartId)} // Panggil fungsi delete berdasarkan cartId
                        >
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <h4 className="mt-3">Total Price: {totalHarga}</h4>
            </>
          ) : (
            <p>Your cart is empty</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Order now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShoppingCartModal;
