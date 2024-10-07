import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Nav, ListGroup, Row, Col } from "react-bootstrap";
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const ShoppingCartModal = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const removeCartItem = async (cartId, qty) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/cart/${cartId}`,
        {
          data: { qty: qty }, // Sending qty in the request body
        }
      );

      if (response.status === 200) {
        Swal.fire(
          "Removed!",
          "The product has been removed from your cart.",
          "success"
        );
        fetchCart(jwt_decode(localStorage.getItem("accessToken")).userId); // Refresh the cart
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
      Swal.fire(
        "Error",
        "An error occurred while removing the product.",
        "error"
      );
    }
  };

  // Confirmation handler before removing an item
  const handleRemoveConfirmation = (cartId, qty) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this product from the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCartItem(cartId, qty); // Call the remove function with cartId and qty
      }
    });
  };

  const handleOrderNow = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const userId = jwt_decode(token).userId;

      try {
        //step 1 create transaction
        const response = await axios.post("http://localhost:5000/transaksi", {
          userId: userId,
        });
        console.log(response.data);
        setError(null);

        // Step 2: Clear the cart after successful transaction
        await axios.delete(`http://localhost:5000/cart/${userId}`);

        // Optionally: Clear the cart from the frontend as well
        setCartItems([]);
        setTotalHarga(0);

        Swal.fire({
          title: "Pesanan berhasil!",
          text: "Anda dapat melihat pesanan di profil Anda.",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Check Pesanan",
          cancelButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/profile"); // Arahkan ke halaman profil
          }
        });
        handleClose(); // Close the modal after successful order
      } catch (error) {
        console.error("Error creating transaction:", error);
        setError(
          error.response?.data?.msg ||
            "An error occurred while creating the transaction"
        );
      }
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
                            onClick={() => updateCart(item.productId, -1)}
                            disabled={item.qty <= 1}
                          >
                            -
                          </Button>
                          <span className="mx-2">
                            {Number(item.qty).toFixed(0)}
                          </span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateCart(item.productId, 1)}
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() =>
                            handleRemoveConfirmation(item.cartId, item.qty)
                          } // Updated button to call confirmation handler
                        >
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <h4 className="mt-3">Total Price: {totalHarga}</h4>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </>
          ) : (
            <p>Your cart is empty</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOrderNow}>
            Order Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShoppingCartModal;
