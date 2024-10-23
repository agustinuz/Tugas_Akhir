import React, { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [totalSoldProducts, setTotalSoldProducts] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);

  useEffect(() => {
    // Fetch data for total sold products
    axios
      .get("/api/products/sold")
      .then((response) => {
        setTotalSoldProducts(response.data.totalSoldProducts);
      })
      .catch((error) => {
        console.error("Error fetching sold products data:", error);
      });

    // Fetch data for total appointments
    axios
      .get("/api/appointments/count")
      .then((response) => {
        setTotalAppointments(response.data.totalAppointments);
      })
      .catch((error) => {
        console.error("Error fetching appointments data:", error);
      });
  }, []);

  return (
    <div>
      {/* Inline CSS in JSX */}
      <style>
        {`
          .hover-card {
            transition: transform 0.2s, box-shadow 0.2s;
          }

          .hover-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
            cursor: pointer;
          }

          .card {
            border-radius: 15px;
            background-color: #f9f9f9;
          }
        `}
      </style>

      <div className="row d-flex justify-content-end flex-row">
        {/* Card: Total Earnings */}
        <div className="col-12 col-md-4 d-flex">
          <div className="card flex-fill border-0 shadow hover-card">
            <div className="card-body py-4">
              <div className="d-flex align-items-start">
                <div className="flex-grow-1">
                  <h4 className="mb-2">$ 00.00</h4>
                  <p className="mb-2">Total Earnings</p>
                  <div className="mb-0">
                    <span className="badge text-success me-2">+0.0%</span>
                    <span className="text-muted">Since Last Month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card: Total Products Sold */}
        <div className="col-12 col-md-4 d-flex">
          <div className="card flex-fill border-0 shadow hover-card">
            <div className="card-body py-4">
              <h5 className="mb-3">Total Products Sold</h5>
              <h2>{totalSoldProducts}</h2>
            </div>
          </div>
        </div>

        {/* Card: Total Appointments */}
        <div className="col-12 col-md-4 d-flex">
          <div className="card flex-fill border-0 shadow hover-card">
            <div className="card-body py-4">
              <h5 className="mb-3">Total Appointments Registered</h5>
              <h2>{totalAppointments}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
