import React, { useState, useEffect } from "react";
import axios from "axios";
import { CDBBtn } from "cdbreact";
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
import Swal from "sweetalert2"; // Import SweetAlert

const AppointmentTable = () => {
  const [service, setService] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [schedule, setSchedule] = useState({
    date: "",
    time: "",
    antrian: "",
  }); // State for schedule form inputs
  const [selectedService, setSelectedService] = useState(null); // State to hold selected service for the schedule

  const kategoriId = 1;
  const fetchService = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/getservice/${kategoriId}`
      );
      setService(response.data.services);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchService();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSchedule({
      ...schedule,
      [name]: value,
    });
  };

  // Handle confirm button click, opening modal
  const handleConfirmClick = (serviceItem) => {
    setSelectedService(serviceItem); // Set the selected service for which schedule is being confirmed
    setShowModal(true); // Show modal
  };

  const sendConfirmService = async (serviceId, status, _schedule) => {
    const payload = {
      id: serviceId,
      status: status,
    };
    if (_schedule != null) payload.schedule = _schedule;
    const res = await axios.post(`http://localhost:5000/form-service`, payload);
    await fetchService(res.data);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const _schedule = {
      ...schedule,
      service_id: selectedService.ServiceId,
    };
    await sendConfirmService(selectedService.ServiceId, "Confirm", _schedule);

    // Show SweetAlert success message
    Swal.fire({
      icon: "success",
      title: "Appointment Confirmed",
      text: "Your appointment has been successfully scheduled.",
    });

    // Close modal after submission
    setShowModal(false);
  };

  const handleReject = async (serviceId) => {
    await sendConfirmService(serviceId, "Reject", null);
    Swal.fire({
      icon: "success",
      title: "Appointment Reject",
      text: "Your appointment has been successfully Reject.",
    });
  };

  const filteredKategoris = service.filter((serviceitem) =>
    serviceitem.Name_Owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEntries = filteredKategoris.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayedService = filteredKategoris.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <Container fluid className="px-3">
      <h2 className="mb-3">
        <strong>Appoitment</strong>
      </h2>
      <figcaption className="blockquote-footer mb-5">
        List <cite title="Source Title">Appoitment</cite>
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

        {/* Data Table */}
        <Table striped bordered hover className="mb-0">
          <thead>
            <tr>
              <th className="fw-bold fs-4">#</th>
              <th className="fw-bold fs-5">Name Owner</th>
              <th className="fw-bold fs-5">Animal</th>
              <th className="fw-bold fs-5">Birthday Animal</th>
              <th className="fw-bold fs-5">Jenis</th>
              <th className="fw-bold fs-5">Ras</th>
              <th className="fw-bold fs-5">Quantity</th>
              <th className="fw-bold fs-5">Kategori</th>
              <th className="fw-bold fs-5">Status</th>
              <th className="fw-bold fs-5">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedService.map((serviceitem, index) => (
              <tr key={serviceitem.id}>
                <td>{(currentPage - 1) * entriesPerPage + index + 1}</td>
                <td>{serviceitem.Name_Owner}</td>
                <td>{serviceitem.Name_Animal}</td>
                <td>
                  {new Date(serviceitem.birthday_Animal).toLocaleDateString(
                    "en-US"
                  )}
                </td>
                <td>{serviceitem.Jenis}</td>
                <td>{serviceitem.RAS}</td>
                <td>{serviceitem.Quantity}</td>
                <td>{serviceitem.kategori_service}</td>
                <td>{serviceitem.status}</td>
                <td>
                  <Button
                    className="btn btn-primary btn-sm text-capitalize"
                    variant="primary"
                    onClick={() => handleConfirmClick(serviceitem)}
                    disabled={serviceitem.status === "Confirm"} // Disable button if status is 'Confirm'
                  >
                    Confirm
                  </Button>
                  <Button
                    onClick={() => handleReject(serviceitem.ServiceId)}
                    className="btn btn-danger btn-sm text-capitalize mx-3"
                    variant="danger"
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal for schedule confirmation */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Schedule</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={schedule.date}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formTime" className="mt-3">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={schedule.time}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formQueue" className="mt-3">
                <Form.Label>Queue</Form.Label>
                <Form.Control
                  type="number"
                  name="antrian"
                  value={schedule.antrian}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-4">
                Confirm
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
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
      </div>
    </Container>
  );
};

export default AppointmentTable;
