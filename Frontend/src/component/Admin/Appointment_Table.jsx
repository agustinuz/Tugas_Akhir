import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

const AppointmetTable = () => {
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

  return (
    <div className="card border-0">
      <div className="card-header">
        <div className="me-3">
          <button className="btn btn-primary text-capitalize">
            Create New Appointment
          </button>
        </div>
      </div>
      <div className="card-body">
        <table className="table table-hover caption-top">
          <caption>List of users</caption>
          <thead className="table-secondary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name Users</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    type="button"
                    class=" btn btn-secondary btn-sm me-3 text-capitalize"
                  >
                    Edit
                  </button>
                  <button className="btn btn-outline-danger btn-sm text-capitalize">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AppointmetTable;
