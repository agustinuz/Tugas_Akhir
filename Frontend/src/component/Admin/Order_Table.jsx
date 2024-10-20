import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { CDBDataTable } from "cdbreact"; // Import CDBDataTable

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null); // State for payment data
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false); // State for payment modal

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/transaksi/Admin"
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };

    fetchTransactions();
  }, []);

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
      setSelectedPayment(response.data); // Store payment data
      setShowPaymentModal(true); // Show payment modal
    } catch (error) {
      console.error("Error fetching payment details", error);
    }
  };

  const columns = [
    { label: "ID", field: "transaction_id", sort: "asc", width: 150 },
    { label: "Name", field: "name", sort: "asc", width: 270 },
    { label: "Date", field: "transaction_date", sort: "asc", width: 200 },
    { label: "Status", field: "status", sort: "asc", width: 150 },
    { label: "Subtotal", field: "subtotal", sort: "asc", width: 100 },
    { label: "Paid", field: "paid", sort: "asc", width: 100 },
    {
      label: "Actions",
      field: "actions",
      sort: "asc",
      width: 150,
      default: true,
    },
  ];

  const data = transactions.map((transaction) => ({
    transaction_id: transaction.transaction_id,
    name: transaction.name,
    transaction_date: transaction.transaction_date,
    status: transaction.status,
    subtotal: `$${transaction.subtotal}`,
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
          disabled={!transaction.paid} // Disable if not paid
        >
          View Payment
        </Button>
      </>
    ),
  }));

  return (
    <div>
      <h2>All Transactions (Admin)</h2>
      <CDBDataTable
        striped
        bordered
        hover
        data={{
          columns,
          rows: data,
        }}
        noBottomColumns
      />

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
                    <td>{detail.hargaProduct}</td>
                    <td>{detail.qty}</td>
                    <td>{detail.totalHarga}</td>
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
                <strong>Total Payment:</strong> $
                {selectedPayment[0].totalPembayaran}
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
          <Button variant="primary">Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminTransactions;
