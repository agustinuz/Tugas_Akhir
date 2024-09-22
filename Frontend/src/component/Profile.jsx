import React, { useState } from "react";
import { Form, ListGroup, Image, Badge } from "react-bootstrap";

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState("default-profile.png");
  const [notifications, setNotifications] = useState({
    orders: 3,
    appointments: 1,
  });
  const [orderHistory, setOrderHistory] = useState([
    { id: 1, name: "Dog Food", status: "Delivered" },
    { id: 2, name: "Cat Toy", status: "Shipped" },
  ]);
  const [appointments, setAppointments] = useState([
    { id: 1, date: "2024-09-25", time: "10:00 AM", service: "Vet Checkup" },
  ]);
  const [paymentHistory, setPaymentHistory] = useState([
    { id: 1, date: "2024-09-20", amount: "$50", method: "Credit Card" },
  ]);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container mt-5">
      {/* Profile Picture Section */}
      <div className="text-center mb-4">
        <Image src={profileImage} roundedCircle width="150" height="150" />
        <Form.Group className="mt-3">
          <Form.File
            label="Ganti Foto Profil"
            onChange={handleProfileImageChange}
          />
        </Form.Group>
      </div>

      {/* Name and Email */}
      <p>
        <strong>Nama:</strong> John Doe
      </p>
      <p>
        <strong>Email:</strong> johndoe@example.com
      </p>

      {/* Order List with Notifications */}
      <h5>
        Pesanan Anda{" "}
        {notifications.orders > 0 && (
          <Badge bg="danger">{notifications.orders}</Badge>
        )}
      </h5>
      <ListGroup>
        {orderHistory.map((order) => (
          <ListGroup.Item key={order.id}>
            {order.name} - {order.status}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Appointment List with Notifications */}
      <h5 className="mt-4">
        Janji Temu{" "}
        {notifications.appointments > 0 && (
          <Badge bg="danger">{notifications.appointments}</Badge>
        )}
      </h5>
      <ListGroup>
        {appointments.map((appointment) => (
          <ListGroup.Item key={appointment.id}>
            {appointment.date} {appointment.time} - {appointment.service}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Payment History */}
      <h5 className="mt-4">Riwayat Pembayaran</h5>
      <ListGroup>
        {paymentHistory.map((payment) => (
          <ListGroup.Item key={payment.id}>
            {payment.date} - {payment.amount} via {payment.method}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default UserProfile;
