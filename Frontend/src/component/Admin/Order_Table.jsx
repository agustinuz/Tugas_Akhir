import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, FormControl } from "react-bootstrap";
import { CDBCard, CDBCardBody, CDBContainer, CDBDataTable } from "cdbreact";

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

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

  const filteredTransactions = transactions.filter((transaction) => {
    const name = transaction.name || "";
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const data = {
    columns: [
      { label: "#", field: "index", width: 50 },
      { label: "Name", field: "name", width: 150 },
      { label: "Date", field: "date", width: 150 },
      { label: "Status", field: "status", width: 100 },
      { label: "Subtotal", field: "subtotal", width: 100 },
      { label: "Paid", field: "paid", width: 50 },
      { label: "Actions", field: "actions", width: 200 },
    ],
    rows: filteredTransactions.map((transaction, index) => ({
      index: index + 1,
      name: transaction.name,
      date: new Date(transaction.transaction_date).toISOString().split("T")[0],
      status: transaction.status,
      subtotal: new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(transaction.subtotal),
      paid: transaction.paid ? "Success" : "No",
      actions: (
        <>
          <Button
            onClick={() => handleShowDetails(transaction.transaction_id)}
            size="sm"
            className="me-2"
          >
            View Details
          </Button>
          <Button
            onClick={() => handleViewPayment(transaction.transaction_id)}
            size="sm"
            disabled={!transaction.paid}
          >
            View Payment
          </Button>
        </>
      ),
    })),
  };

  return (
    <CDBContainer fluid>
      <div className="container-fluid px-4">
        <h2 className="mb-3">
          <strong>Orders</strong>
        </h2>

        <CDBCard style={{ borderRadius: "15px" }}>
          <CDBCardBody>
            <CDBDataTable
              striped
              bordered
              hover
              entries={5}
              data={data}
              search={
                <FormControl
                  type="text"
                  placeholder="Search by Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-3"
                />
              }
              pagination
            />
          </CDBCardBody>
        </CDBCard>
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
    </CDBContainer>
  );
};

export default AdminTransactions;
