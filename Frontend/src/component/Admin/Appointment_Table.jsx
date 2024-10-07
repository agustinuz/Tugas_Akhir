import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CDBCard,
  CDBCardBody,
  CDBDataTable,
  CDBContainer,
  CDBBtn,
} from "cdbreact";
import { Button } from "react-bootstrap";

const AppointmentTable = () => {
  const [service, setService] = useState([]);
  const kategoriId = 1; // Misalkan kita mengambil kategori dengan ID 1

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getservice/${kategoriId}`
        );
        console.log(response.data.services);
        setService(response.data.services); // Ubah untuk mengakses array services
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchService();
  }, []);

  // Define the columns for CDBDataTable
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
      field: "kategori_service", // Ubah ke 'KategoriName'
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
          >
            Confirm
          </Button>
          <Button
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
    </CDBContainer>
  );
};

export default AppointmentTable;
