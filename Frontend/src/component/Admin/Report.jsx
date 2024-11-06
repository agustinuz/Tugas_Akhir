import React, { useEffect, useState } from "react";
import { CDBDataTable } from "cdbreact";
import axios from "axios";

const ReportTable = () => {
  const [filter, setFilter] = useState("Transaksi");
  const [transactionData, setTransactionData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);

  useEffect(() => {
    // Fetch data transaksi dan appointment dari backend
    const fetchData = async () => {
      try {
        const transactionResponse = await axios.get("/api/transactions"); // Endpoint untuk transaksi
        const appointmentResponse = await axios.get("/api/appointments"); // Endpoint untuk appointment
        setTransactionData(transactionResponse.data);
        setAppointmentData(appointmentResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Kolom untuk tabel Transaksi
  const transactionColumns = [
    { label: "No", field: "no", sort: "asc", width: 50 },
    { label: "Nama Pemilik", field: "name_owner", sort: "asc", width: 150 },
    {
      label: "Tanggal Transaksi",
      field: "transaction_date",
      sort: "asc",
      width: 150,
    },
    {
      label: "Status Pembayaran",
      field: "status_payment",
      sort: "asc",
      width: 150,
    },
    { label: "Total Harga", field: "total_price", sort: "asc", width: 100 },
    { label: "Bukti Pembayaran", field: "payment_proof", width: 100 },
  ];

  // Kolom untuk tabel Appointment
  const appointmentColumns = [
    { label: "No", field: "no", sort: "asc", width: 50 },
    { label: "Nama Pemilik", field: "name_owner", sort: "asc", width: 150 },
    { label: "Nama Hewan", field: "name_animal", sort: "asc", width: 150 },
    { label: "Jenis", field: "jenis", sort: "asc", width: 100 },
    { label: "Ras", field: "ras", sort: "asc", width: 100 },
    {
      label: "Kategori Layanan",
      field: "kategori_service",
      sort: "asc",
      width: 150,
    },
    { label: "Status", field: "status_service", sort: "asc", width: 100 },
  ];

  // Data rows untuk transaksi
  const transactionRows = transactionData.map((item, index) => ({
    no: index + 1,
    name_owner: item.name_owner,
    transaction_date: item.transaction_date,
    status_payment: item.status_payment || "Pending",
    total_price: `Rp${item.total_price.toLocaleString()}`,
    payment_proof: item.payment_url ? (
      <a href={item.payment_url}>Lihat Bukti</a>
    ) : (
      "-"
    ),
  }));

  // Data rows untuk appointment
  const appointmentRows = appointmentData.map((item, index) => ({
    no: index + 1,
    name_owner: item.Name_Owner,
    name_animal: item.Name_Animal,
    jenis: item.Jenis,
    ras: item.RAS,
    kategori_service: item.kategori_service, // Sesuaikan jika membutuhkan nama kategori
    status_service: item.status,
  }));

  const data = {
    columns: filter === "Transaksi" ? transactionColumns : appointmentColumns,
    rows: filter === "Transaksi" ? transactionRows : appointmentRows,
  };

  return (
    <div>
      <h2>Laporan</h2>
      <div style={{ marginBottom: "20px" }}>
        <label>Pilih Tipe Laporan: </label>
        <select
          value={filter}
          onChange={handleFilterChange}
          style={{ marginLeft: "10px" }}
        >
          <option value="Transaksi">List Transaksi</option>
          <option value="Appointment">List Appointment</option>
        </select>
      </div>

      <CDBDataTable
        striped
        bordered
        hover
        data={data}
        entriesOptions={[5, 10, 20]}
        entries={10}
        pagesAmount={4}
        pagination
      />
    </div>
  );
};

export default ReportTable;
