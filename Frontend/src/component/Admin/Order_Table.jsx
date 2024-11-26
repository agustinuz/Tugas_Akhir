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
  Card,
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
        <Row className="align-items-center mb-4">
          <Col md={8} className="d-flex">
            <Form.Label className="mb-0 me-2" style={{ flexShrink: 0 }}>
              Show entries:
            </Form.Label>
            <Form.Control
              as="select"
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              style={{ maxWidth: "80px" }} // Membatasi lebar form dropdown
              // Memindahkan dropdown ke kanan
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </Form.Control>

            <Form.Control
              type="text"
              placeholder="Search Orders"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ms-2"
              style={{ maxWidth: "200px" }} // Membatasi lebar pencarian
            />
          </Col>
        </Row>

        <Table striped bordered hover className="mb-0">
          <thead>
            <tr>
              <th className="fw-bold fs-6">No.</th>
              <th className="fw-bold fs-6">Name</th>
              <th className="fw-bold fs-6">Date</th>
              <th className="fw-bold fs-6">Status</th>
              <th className="fw-bold fs-6">SubTotal</th>
              <th className="fw-bold fs-6">Paid</th>
              <th className="fw-bold fs-6">Action</th>
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

        {/* Pagination Controls */}
        <div className="d-flex justify-content-center mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              variant="outline-secondary"
              className={`mx-1 ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => handlePagination(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>

      {/* Modal for Transaction Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTransaction ? (
            <Table striped bordered hover>
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
            </Table>
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
            <Card>
              <Card.Body>
                <Card.Title>Payment Information</Card.Title>
                <Card.Text>
                  <strong>Address:</strong> {selectedPayment[0].alamat}
                </Card.Text>
                <Card.Text>
                  <strong>Phone:</strong> {selectedPayment[0].no_hp}
                </Card.Text>
                <Card.Text>
                  <strong>Total Payment:</strong>{" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(selectedPayment[0].total)}
                </Card.Text>
                <Button variant="primary" onClick={handleConfirmPayment}>
                  Confirm Payment
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <p>No payment information available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPaymentModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminTransactions;
