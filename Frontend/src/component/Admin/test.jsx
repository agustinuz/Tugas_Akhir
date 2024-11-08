import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  Table,
  Form,
  InputGroup,
  Row,
  Col,
  Container,
} from "react-bootstrap";

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/transaksi/Admin");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  };

  const handleShowDetails = async (transactionId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/transaksi-detail/${transactionId}`
      );
      setSelectedTransaction(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching transaction details", error);
    }
  };

  const handleViewPayment = async (transactionId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/transaksi-payment/${transactionId}`
      );
      setSelectedPayment(response.data);
      setShowPaymentModal(true);
    } catch (error) {
      console.error("Error fetching payment details", error);
    }
  };

  const handleConfirmPayment = async () => {
    try {
      const transactionId = selectedPayment[0].transaction_id;
      const response = await axios.put(
        `http://localhost:5000/transaksi/${transactionId}`,
        {
          status: "Terkirim",
        }
      );
      setMessage("Payment confirmed successfully!");
      setShowPaymentModal(false);
      fetchTransactions();
    } catch (error) {
      console.error("Error confirming payment:", error);
      setMessage("Failed to confirm payment");
    }
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEntries = filteredTransactions.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayedTransaction = filteredTransactions.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <Container fluid className="px-3">
      <h2 className="mb-3">
        <strong>Order</strong>
      </h2>
      <figcaption className="blockquote-footer mb-5">
        List <cite title="Source Title">Orders</cite>
      </figcaption>
      <div className="bg-white rounded p-5 shadow-sm">
        <Row className="align-items-center">
          {/* <Button className="mb-2" onClick={() => setShowModal(true)}>
              Create New Service
            </Button> */}

          <Col md={{ span: 2, offset: 10 }} className="text-md-end">
            <InputGroup className="mb-2">
              <Form.Control
                type="text"
                placeholder="Search Kategori"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
        <Form.Group controlId="entriesPerPage" className="col-1 mb-2">
          <Form.Control
            as="select"
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </Form.Control>
        </Form.Group>
        <Table striped bordered hover className="mb-0">
          <thead>
            <tr>
              <th className="fw-bold fs-4">#</th>
              <th className="fw-bold fs-5">Name</th>
              <th className="fw-bold fs-5">Date</th>
              <th className="fw-bold fs-5">Status</th>
              <th className="fw-bold fs-5">SubTotal</th>
              <th className="fw-bold fs-5">Paid</th>
              <th className="fw-bold fs-5">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedTransaction.map((transaction, index) => (
              <tr key={transaction.id}>
                <td>{(currentPage - 1) * entriesPerPage + index + 1}</td>
                <td>{transaction.name}</td>

                <td>
                  {new Date(transaction.transaction_date).toLocaleDateString(
                    "en-US"
                  )}
                </td>
                <td>{transaction.status}</td>
                <td>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(transaction.subtotal)}
                </td>
                <td>{transaction.paid ? "Success" : "No"}</td>
                <td>
                  <Button
                    onClick={() =>
                      handleShowDetails(transaction.transaction_id)
                    }
                    size="sm"
                    className="me-2"
                  >
                    View Details
                  </Button>
                  <Button
                    onClick={() =>
                      handleViewPayment(transaction.transaction_id)
                    }
                    size="sm"
                    disabled={!transaction.paid}
                  >
                    View Payment
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal for Transaction Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTransaction ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {selectedTransaction.map((detail) => (
                  <tr key={detail.transaction_detail_id}>
                    <td>{detail.namaProduct}</td>
                    <td>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(detail.hargaProduct)}
                    </td>
                    <td>{detail.qty}</td>
                    <td>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(detail.totalHarga)}
                    </td>
                    <td>
                      <img
                        src={detail.url}
                        alt={detail.namaProduct}
                        width="50"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No details available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Payment Details */}
      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment ? (
            <div>
              <p>
                <strong>Address:</strong> {selectedPayment[0].alamat}
              </p>
              <p>
                <strong>Phone:</strong> {selectedPayment[0].no_hp}
              </p>
              <p>
                <strong>Total Payment:</strong>{" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(selectedPayment[0].totalPembayaran)}
              </p>
              <p>
                <strong>Payment Proof:</strong>
              </p>
              <img
                src={selectedPayment[0].url}
                alt="Payment Proof"
                width="200"
              />
            </div>
          ) : (
            <p>No payment details available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPaymentModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirmPayment}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      {message && <p>{message}</p>}
      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-2">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePagination(currentPage - 1)}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePagination(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default AdminTransactions;
