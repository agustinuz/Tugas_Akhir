import React, { useState } from "react";
import { CDBDataTable, CDBCard } from "cdbreact";
import { Button, Modal, Image } from "react-bootstrap";

const OrderListTable = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handlePaymentModal = (order) => {
    setSelectedOrder(order);
    setShowPaymentModal(true);
  };

  const handleDetailModal = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const closeModal = () => {
    setShowPaymentModal(false);
    setShowDetailModal(false);
  };

  const orders = [
    {
      id: 1,
      buyer: "John Doe",
      date: "2024-10-03",
      subtotal: "$200",
      status: "Menunggu Pembayaran",
      paymentProof: "payment-proof-url.jpg",
      orderDetails: [
        {
          image: "product1.jpg",
          name: "Product A",
          price: "$50",
          qty: 2,
          totalPrice: "$100",
        },
        {
          image: "product2.jpg",
          name: "Product B",
          price: "$50",
          qty: 2,
          totalPrice: "$100",
        },
      ],
    },
    {
      id: 2,
      buyer: "Jane Smith",
      date: "2024-10-02",
      subtotal: "$150",
      status: "Menunggu Pembayaran",
      paymentProof: "payment-proof-url2.jpg",
      orderDetails: [
        {
          image: "product3.jpg",
          name: "Product C",
          price: "$75",
          qty: 2,
          totalPrice: "$150",
        },
      ],
    },
    // Tambahkan data lain di sini
  ];

  const data = {
    columns: [
      {
        label: "Nama Pembeli",
        field: "buyer",
        sort: "asc",
      },
      {
        label: "Tanggal Transaksi",
        field: "date",
        sort: "asc",
      },
      {
        label: "Subtotal",
        field: "subtotal",
        sort: "asc",
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
      },
      {
        label: "Actions",
        field: "actions",
        sort: "asc",
      },
    ],
    rows: orders.map((order) => ({
      buyer: order.buyer,
      date: order.date,
      subtotal: order.subtotal,
      status: order.status,
      actions: (
        <>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handlePaymentModal(order)}
          >
            View Payment
          </Button>{" "}
          <Button
            variant="info"
            size="sm"
            onClick={() => handleDetailModal(order)}
          >
            Detail Pesanan
          </Button>
        </>
      ),
    })),
  };

  return (
    <div>
      <div className="container-fluid px-4">
        <h2 className="mb-3">
          <strong>Orders</strong>
        </h2>
        <figcaption className="blockquote-footer mb-5">
          List <cite title="Source Title">Order</cite>
        </figcaption>
        <CDBCard style={{ borderRadius: "15px" }}>
          <CDBDataTable striped bordered hover data={data} responsive />
        </CDBCard>
        {/* Modal for View Payment */}
        <Modal show={showPaymentModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Payment Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Render payment details for the selected order */}
            {selectedOrder && (
              <div>
                <p>Nama Pembeli: {selectedOrder.buyer}</p>
                <Image src={selectedOrder.paymentProof} fluid />
                {/* Tambahkan informasi lainnya di sini */}
                <p>Total Pembayaran: {selectedOrder.totalPrice}</p>
                <p>Status: {selectedOrder.status}</p>
                {/* Contoh tambahan data */}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              // onClick={() => handleReject(selectedOrder.id)}
            >
              Tolak
            </Button>
            <Button
              variant="success"
              // onClick={() => handleConfirm(selectedOrder.id)}
            >
              Konfirmasi
            </Button>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal for Detail Pesanan */}
        <Modal show={showDetailModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Render order details for the selected order */}
            {selectedOrder &&
            selectedOrder.orderDetails &&
            selectedOrder.orderDetails.length > 0 ? (
              <div>
                {selectedOrder.orderDetails.map((item, index) => (
                  <div key={index} style={{ marginBottom: "15px" }}>
                    <Image
                      src={item.image}
                      fluid
                      style={{ width: "100px", marginRight: "10px" }}
                    />
                    <p>Nama Product: {item.name}</p>
                    <p>Harga per Product: {item.price}</p>
                    <p>Qty: {item.qty}</p>
                    <p>Total Harga: {item.totalPrice}</p>
                    <hr />
                  </div>
                ))}
              </div>
            ) : (
              <p>Tidak ada detail pesanan tersedia.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default OrderListTable;
