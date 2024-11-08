import React, { useState, useEffect } from "react";
import axios from "axios";

const HomePage = ({ id }) => {
  const [transactionCount, setTransactionCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [loadingReport, setLoadingReport] = useState(false);

  useEffect(() => {
    const fetchTransactionCount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/transaksi/${id}`
        );
        if (response.data.success) {
          setTransactionCount(response.data.count);
        }
      } catch (error) {
        console.error("Error fetching transaction count:", error);
      }
    };

    const fetchAppointmentCount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/appointments/count/${id}`
        );
        if (response.data.success) {
          setAppointmentCount(response.data.count);
        }
      } catch (error) {
        console.error("Error fetching appointment count:", error);
      }
    };

    fetchTransactionCount();
    fetchAppointmentCount();
  }, [id]);

  const downloadTransactionReport = async () => {
    setLoadingReport(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/report/transactions",
        {
          responseType: "blob",
        }
      );

      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement("a");
      fileLink.href = fileURL;
      fileLink.setAttribute("download", "Transaction_Report.pdf");
      document.body.appendChild(fileLink);
      fileLink.click();
      fileLink.remove();
    } catch (error) {
      console.error("Error downloading transaction report:", error);
    } finally {
      setLoadingReport(false);
    }
  };

  const downloadAppointmentReport = async () => {
    setLoadingReport(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/report/appointments",
        {
          responseType: "blob",
        }
      );

      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement("a");
      fileLink.href = fileURL;
      fileLink.setAttribute("download", "Appointment_Report.pdf");
      document.body.appendChild(fileLink);
      fileLink.click();
      fileLink.remove();
    } catch (error) {
      console.error("Error downloading appointment report:", error);
    } finally {
      setLoadingReport(false);
    }
  };

  return (
    <div>
      <style>{`
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
      `}</style>

      <div className="row d-flex justify-content-end flex-row">
        {/* Card: Total Earnings */}
        <div className="col-12 col-md-4 d-flex">
          <div className="card flex-fill border-0 shadow hover-card">
            <div className="card-body py-4">
              <h4 className="mb-2">$ 00.00</h4>
              <p className="mb-2">Total Earnings</p>
              <div className="mb-0">
                <span className="badge text-success me-2">+0.0%</span>
                <span className="text-muted">Since Last Month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card: Unique Transactions */}
        <div className="col-12 col-md-4 d-flex">
          <div className="card flex-fill border-0 shadow hover-card">
            <div className="card-body py-4">
              <h5 className="mb-3">Unique Transactions</h5>
              <h2>{transactionCount}</h2>
            </div>
          </div>
        </div>

        {/* Card: Total Appointments */}
        <div className="col-12 col-md-4 d-flex">
          <div className="card flex-fill border-0 shadow hover-card">
            <div className="card-body py-4">
              <h5 className="mb-3">Total Appointments Registered</h5>
              <h2>{appointmentCount}</h2>
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* <h1>Report Page</h1> */}
        {/* <button onClick={downloadTransactionReport} disabled={loadingReport}>
          {loadingReport
            ? "Downloading Transaction Report..."
            : "Download Transaction Report"}
        </button>
        <button onClick={downloadAppointmentReport} disabled={loadingReport}>
          {loadingReport
            ? "Downloading Appointment Report..."
            : "Download Appointment Report"}
        </button> */}
      </div>
    </div>
  );
};

export default HomePage;
