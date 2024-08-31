import React, { useState, useEffect } from "react";
import axios from "axios";
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from "cdbreact";

const User_Table = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getUsers");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
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
      label: "Name Users",
      field: "name",
      sort: "asc",
      width: 150,
    },
    {
      label: "Email",
      field: "email",
      sort: "asc",
      width: 270,
    },
    {
      label: "Role",
      field: "role",
      sort: "asc",
      width: 100,
    },
    {
      label: "Action",
      field: "action",
      width: 150,
    },
  ];

  // Format the user data for the DataTable
  const data = {
    columns: columns,
    rows: users.map((user, index) => ({
      index: index + 1,
      name: user.name,
      email: user.email,
      role: user.role,
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
    <CDBContainer>
      <div className="card-header">
        <div className="me-3">
          <button className="btn btn-primary text-capitalize">
            Create New User
          </button>
        </div>
      </div>
      <CDBCard>
        <CDBCardBody>
          <CDBDataTable
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

export default User_Table;
