import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CDBCard,
  CDBCardBody,
  CDBDataTable,
  CDBContainer,
  CDBBtn,
} from "cdbreact";
import { Button, Modal, Form } from "react-bootstrap";

const AppointmentTable = () => {
  const [service, setService] = useState([]);
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
  const sendConfirmService =async (serviceId,status,_schedule) =>{
    const payload = {
      id: serviceId,
      status:status
    }
    if (_schedule != null)
      payload.schedule = _schedule;
    const res = await axios.post(`http://localhost:5000/form-service`,payload);
    await fetchService();
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle schedule submission logic here (e.g., send data to the backend)
    console.log("Schedule submitted for service:", selectedService);
    console.log("Schedule details:", schedule);

    const _schedule = {
      ...schedule,
      service_id: selectedService.ServiceId,
    };
    await sendConfirmService(selectedService.ServiceId,"Confirm",_schedule);
    // Close modal after submission
    setShowModal(false);
  };
  const handleReject = async (serviceId)=>{
    await sendConfirmService(serviceId,'Reject',null);
}

  const columns = [
    {
      label: "#",
      field: "index",
      sort: "asc",
      width: 50,
    },
    {
      label: "Name Owner",
      field: "Name_Owner",
      sort: "asc",
      width: 150,
    },
    {
      label: "Animal",
      field: "Name_Animal",
      sort: "asc",
      width: 270,
    },
    {
      label: "Birthday Animal",
      field: "birthday_Animal",
      sort: "asc",
      width: 100,
    },
    {
      label: "Jenis",
      field: "Jenis",
      sort: "asc",
      width: 100,
    },
    {
      label: "RAS",
      field: "RAS",
      sort: "asc",
      width: 100,
    },
    {
      label: "Quantity",
      field: "Quantity",
      sort: "asc",
      width: 100,
    },
    {
      label: "Kategori",
      field: "kategori_service",
      sort: "asc",
      width: 100,
    },
    {
      label: "status",
      field: "status",
      sort: "asc",
      width: 80,
    },
    {
      label: "Action",
      field: "action",
      width: 150,
    },
  ];

  const data = {
    columns: columns,
    rows: service.map((serviceitem, index) => ({
      index: index + 1,
      Name_Owner: serviceitem.Name_Owner,
      Name_Animal: serviceitem.Name_Animal,
      birthday_Animal: new Date(serviceitem.birthday_Animal).toLocaleDateString(
        "en-US"
      ),
      Jenis: serviceitem.Jenis,
      RAS: serviceitem.RAS,
      Quantity: serviceitem.Quantity,
      kategori_service: serviceitem.kategori_service,
      status: serviceitem.status,
      action: (
        <>
          <Button
            className="btn btn-primary btn-sm text-capitalize"
            variant="primary"
            onClick={() => handleConfirmClick(serviceitem)} // Open modal on click
          >
            Confirm
          </Button>
          <Button
          onClick={()=> handleReject(serviceitem.ServiceId)}
            className="btn btn-danger btn-sm text-capitalize mx-3"
            variant="danger"
          >
            Reject
          </Button>
        </>
      ),
    })),
  };


  return (
    <CDBContainer fluid>
      <div className="container-fluid px-4">
        <h2 className="mb-3">
          <strong>Appointment</strong>
        </h2>
        <figcaption className="blockquote-footer mb-5">
          List <cite title="Source Title">Appointment</cite>
        </figcaption>
        <CDBCard style={{ borderRadius: "15px" }}>
          <CDBCardBody>
            <CDBBtn color="primary" size="large" circle>
              Create New Appointment
            </CDBBtn>
            <CDBDataTable
              responsive
              striped
              bordered
              hover
              data={data}
              pagination
              materialSearch={true}
            />
          </CDBCardBody>
        </CDBCard>
      </div>

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
    </CDBContainer>
  );
};

export default AppointmentTable;
