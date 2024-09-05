import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CDBCard,
  CDBCardBody,
  CDBDataTable,
  CDBContainer,
  CDBBtn,
} from "cdbreact";

const AppointmentTable = () => {
  const [service, setService] = useState([]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getservice");
        setService(response.data);
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
      field: "kategori_service",
      sort: "asc",
      width: 100,
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
      birthday_Animal: serviceitem.birthday_Animal,
      Jenis: serviceitem.Jenis,
      RAS: serviceitem.RAS,
      Quantity: serviceitem.Quantity,
      kategori_service: serviceitem.kategori_service,
      action: (
        <>
          <button
            type="button"
            className="btn btn-secondary btn-sm me-3 text-capitalize"
          >
            Edit
          </button>
          <button className="btn btn-outline-danger btn-sm text-capitalize">
            Delete
          </button>
        </>
      ),
    })),
  };

  return (
    <CDBContainer fluid>
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
    </CDBContainer>
  );
};

export default AppointmentTable;
